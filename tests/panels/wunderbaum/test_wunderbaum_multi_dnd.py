"""Playwright E2E tests for same-tree drag-and-drop of a multi-select.

With ``selectMode: "multi"``, dragging a selected node moves the whole
selection, matching what the cross-tree ``externalDrop`` payload reports.
Dragging an unselected node still moves only that node.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import drag, wait_until, wb_title_center, wb_wait

_PORT = 6423

MULTI_SOURCE = [
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
    source=copy.deepcopy(MULTI_SOURCE),
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
    """Serve the shared multi-select tree once for the whole module."""
    server = pn.serve(tree, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    # kill_all_servers() (not server.stop()) so panel's own server/thread
    # registry is cleared too - see test_wunderbaum_dnd for the full reason.
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server."""
    tree.source = copy.deepcopy(MULTI_SOURCE)
    _events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _child_keys(source: list[dict], key: str) -> list[str]:
    """Child keys of a node in the server-side source tree."""
    for node in source:
        if node["key"] == key:
            return [c["key"] for c in node.get("children", [])]
        found = _child_keys(node.get("children", []), key)
        if found:
            return found
    return []


def _titles(page: Page) -> list[str]:
    rows = page.locator("css=.wb-row .wb-title")
    return [(rows.nth(i).text_content() or "").strip() for i in range(rows.count())]


def _drops() -> list:
    return [e for e in _events if e["name"] == "drop"]


def test_multi_select_drag_moves_whole_selection(ready_page: Page):
    """Dragging a selected node moves every selected node."""
    page = ready_page

    # Select via the tree API rather than Ctrl+click: Playwright cannot push
    # real keyboard modifiers into the shadow DOM.
    tree.select_node("a/1", True)
    tree.select_node("a/2", True)
    wait_until(lambda: page.locator(".wb-row.wb-selected").count() >= 2)

    drag(page, wb_title_center(page, "File 1"), wb_title_center(page, "Folder B"), steps=8)
    wait_until(lambda: bool(_drops()))

    drops = _drops()
    assert len(drops) == 1
    d = drops[0]
    assert d["sourceKey"] == "a/1"
    assert d["sourceKeys"] == ["a/1", "a/2"]
    assert d["targetKey"] == "b"
    assert d["movedNodeIds"] == ["a/1", "a/2"]

    # Server-side: both moved out of Folder A, appended to Folder B in order.
    assert _child_keys(tree.source, "a") == ["a/3"]
    assert _child_keys(tree.source, "b") == ["b/4", "a/1", "a/2"]

    # Client-side: same, and no duplicates left behind.
    titles = _titles(page)
    assert titles.count("File 1") == 1
    assert titles.count("File 2") == 1
    assert titles.index("File 1") > titles.index("Folder B")
    assert titles.index("File 1") < titles.index("File 2")


def test_dragging_unselected_node_moves_only_that_node(ready_page: Page):
    """A selection the dragged node is not part of is left alone."""
    page = ready_page

    tree.select_node("a/1", True)
    wait_until(lambda: page.locator(".wb-row.wb-selected").count() >= 1)

    drag(page, wb_title_center(page, "File 3"), wb_title_center(page, "Folder B"), steps=8)
    wait_until(lambda: bool(_drops()))

    d = _drops()[0]
    assert d["sourceKey"] == "a/3"
    assert d["sourceKeys"] == ["a/3"]

    # a/1 stays selected but unmoved.
    assert _child_keys(tree.source, "a") == ["a/1", "a/2"]
    assert _child_keys(tree.source, "b") == ["b/4", "a/3"]


def test_drop_inside_the_dragged_selection_moves_nothing(ready_page: Page):
    """A selection cannot be moved into a node it already contains.

    wunderbaum's own ``preventRecursion`` only vetoes the *grabbed* node being
    an ancestor of the target. Grabbing File 3 while Folder A is also selected
    gets past that check, so the panel has to drop the whole selection itself
    rather than let ``moveTo`` raise "Cannot move a node to its own descendant".
    """
    page = ready_page

    tree.select_node("a", True)
    tree.select_node("a/3", True)
    wait_until(lambda: page.locator(".wb-row.wb-selected").count() >= 2)

    drag(page, wb_title_center(page, "File 3"), wb_title_center(page, "File 1"), steps=8)
    page.wait_for_timeout(500)

    # The drag itself ran - it is the drop that was skipped, not the gesture.
    assert any(e["name"] == "dragStart" for e in _events)
    assert _drops() == []
    assert _child_keys(tree.source, "a") == ["a/1", "a/2", "a/3"]
