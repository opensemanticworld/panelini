"""Playwright E2E tests for Windows Explorer selection semantics.

A plain click replaces the selection, ctrl+click toggles one row, shift+click
takes the range from the anchor and ctrl+shift+click adds that range to what is
already selected. A checkbox is not a separate state: it is another display of
the selection and another way to add to or remove from it.

Checking a parent checks its children. Checking every child leaves the parent
alone, which is why these run on ``selectMode: "multi"`` rather than ``"hier"``.
"""

import copy
import sys
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import drag, wait_until, wb_checkbox, wb_title_center, wb_wait

_PORT = 6425

# The toggle modifier, per platform. macOS turns Control+click into a secondary
# click, so the primary click never reaches the panel; Cmd is the toggle there
# anyway, both in Finder and in the panel, which reads `ctrlKey || metaKey`.
_CTRL = "Meta" if sys.platform == "darwin" else "Control"

SOURCE = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "children": [
            {"title": "File 1", "key": "a/1"},
            {"title": "File 2", "key": "a/2"},
            {"title": "File 3", "key": "a/3"},
        ],
    },
    {
        "title": "Folder B",
        "key": "b",
        "expanded": True,
        "children": [
            {"title": "File 4", "key": "b/4"},
        ],
    },
]

_events: list = []


def _on_event(name: str, params: dict) -> None:
    _events.append({"name": name, **params})


tree = Wunderbaum(
    source=copy.deepcopy(SOURCE),
    options={"dnd": True, "selectMode": "multi", "checkbox": True},
    tree_event_callback=_on_event,
)


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override the parent fixture - don't reset Panel state mid-run.

    All tests below share one module-scoped ``pn.serve()``; ``pn.state.reset()``
    after every test would tear down that shared server's session state.
    """
    yield


@pytest.fixture(scope="module")
def panel_server():
    """Serve the shared tree once for the whole module."""
    server = pn.serve(tree, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server."""
    tree.source = copy.deepcopy(SOURCE)
    _events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _click(page: Page, title: str, *modifiers: str) -> None:
    """Click a node's title cell, holding *modifiers* for the duration."""
    x, y = wb_title_center(page, title)
    for key in modifiers:
        page.keyboard.down(key)
    page.mouse.click(x, y)
    for key in modifiers:
        page.keyboard.up(key)
    page.wait_for_timeout(150)


def _selected(page: Page) -> list[str]:
    """Titles of the selected rows, in the order they are rendered."""
    rows = page.locator("css=.wb-row.wb-selected .wb-title")
    return [(rows.nth(i).text_content() or "").strip() for i in range(rows.count())]


def _child_keys(source: list[dict], key: str) -> list[str]:
    """Child keys of a node in the server-side source tree."""
    for node in source:
        if node["key"] == key:
            return [c["key"] for c in node.get("children", [])]
        found = _child_keys(node.get("children", []), key)
        if found:
            return found
    return []


def _root_keys(source: list[dict]) -> list[str]:
    return [n["key"] for n in source]


def _drops() -> list:
    return [e for e in _events if e["name"] == "drop"]


def test_plain_click_replaces_the_selection(ready_page: Page):
    """A click without modifiers drops whatever else was selected."""
    page = ready_page

    _click(page, "File 1")
    assert _selected(page) == ["File 1"]

    _click(page, "File 3")
    assert _selected(page) == ["File 3"]


def test_ctrl_click_adds_and_removes(ready_page: Page):
    """Ctrl+click toggles one row without touching the rest."""
    page = ready_page

    _click(page, "File 1")
    _click(page, "File 3", _CTRL)
    assert _selected(page) == ["File 1", "File 3"]

    _click(page, "File 1", _CTRL)
    assert _selected(page) == ["File 3"]


def test_shift_click_selects_the_range(ready_page: Page):
    """Shift+click takes every row between the anchor and the clicked row."""
    page = ready_page

    _click(page, "File 1")
    _click(page, "File 3", "Shift")
    assert _selected(page) == ["File 1", "File 2", "File 3"]

    # The anchor stays put, so the same range can be resized rather than
    # re-anchored on the row that was shift-clicked last.
    _click(page, "File 2", "Shift")
    assert _selected(page) == ["File 1", "File 2"]


def test_ctrl_shift_click_extends_the_selection(ready_page: Page):
    """Ctrl+shift keeps selected rows that fall outside the new range."""
    page = ready_page

    _click(page, "File 4")
    _click(page, "File 1", _CTRL)
    _click(page, "File 3", _CTRL, "Shift")
    assert _selected(page) == ["File 1", "File 2", "File 3", "File 4"]

    # Without ctrl the same gesture replaces instead, dropping File 4.
    _click(page, "File 3", "Shift")
    assert _selected(page) == ["File 1", "File 2", "File 3"]


def test_checkbox_matches_ctrl_click(ready_page: Page):
    """Ticking a box is another way to add to and remove from the selection."""
    page = ready_page

    _click(page, "File 1")
    wb_checkbox(page, "File 3").click()
    page.wait_for_timeout(150)
    assert _selected(page) == ["File 1", "File 3"]

    wb_checkbox(page, "File 3").click()
    page.wait_for_timeout(150)
    assert _selected(page) == ["File 1"]


def test_selecting_a_parent_selects_its_children(ready_page: Page):
    """Selection propagates down, whether it came from a click or a checkbox."""
    page = ready_page

    _click(page, "Folder A")
    assert _selected(page) == ["Folder A", "File 1", "File 2", "File 3"]

    wb_checkbox(page, "Folder A").click()
    page.wait_for_timeout(150)
    assert _selected(page) == []


def test_selecting_every_child_leaves_the_parent_alone(ready_page: Page):
    """No upward propagation, which is what rules out ``selectMode: "hier"``."""
    page = ready_page

    _click(page, "File 1")
    _click(page, "File 3", "Shift")
    assert _selected(page) == ["File 1", "File 2", "File 3"]
    assert "Folder A" not in _selected(page)


def test_drag_of_a_selected_parent_moves_the_folder(ready_page: Page):
    """A selected folder stands in for its selected children.

    ``getSelectedNodes(true)`` stops on parents, so grabbing any row of a
    selected folder drags the folder as one node rather than the folder plus
    each of its children.
    """
    page = ready_page

    _click(page, "Folder A")
    assert _selected(page) == ["Folder A", "File 1", "File 2", "File 3"]

    drag(page, wb_title_center(page, "File 1"), wb_title_center(page, "Folder B"), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _drops()[0]["sourceKeys"] == ["a"]
    assert _root_keys(tree.source) == ["b"]
    assert _child_keys(tree.source, "b") == ["b/4", "a"]
    assert _child_keys(tree.source, "a") == ["a/1", "a/2", "a/3"]


def test_drag_of_selected_children_moves_them_all(ready_page: Page):
    """Selecting every child and dragging one moves all of them, not the parent."""
    page = ready_page

    _click(page, "File 1")
    _click(page, "File 3", "Shift")

    drag(page, wb_title_center(page, "File 1"), wb_title_center(page, "Folder B"), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _drops()[0]["sourceKeys"] == ["a/1", "a/2", "a/3"]
    assert _child_keys(tree.source, "a") == []
    assert _child_keys(tree.source, "b") == ["b/4", "a/1", "a/2", "a/3"]


def test_drag_of_an_unselected_row_selects_it_first(ready_page: Page):
    """Dragging an unselected row selects it, the way a file manager does."""
    page = ready_page

    _click(page, "File 2")
    drag(page, wb_title_center(page, "File 1"), wb_title_center(page, "Folder B"), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _drops()[0]["sourceKeys"] == ["a/1"]
    assert _child_keys(tree.source, "a") == ["a/2", "a/3"]
    assert _child_keys(tree.source, "b") == ["b/4", "a/1"]
    assert _selected(page) == ["File 1"]
