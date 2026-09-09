"""Playwright E2E tests for what each drop band on a row means.

A row is split into three bands: the top quarter inserts before it, the bottom
quarter after it, the middle half drops into it. On an expanded parent the
``after`` band is drawn in the gap above the first child, so it inserts there
rather than at the parent's own level. A collapsed parent has nothing below it
to be confused with and keeps ``after`` meaning "sibling of the parent".

Dropping a node before or after its own parent is a real reparent and is
allowed. Only moves that would change nothing are rejected.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import drag, wait_until, wb_row, wb_title_center, wb_wait

_PORT = 6426

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
            {"title": "File 5", "key": "b/5"},
        ],
    },
]

_events: list = []


def _on_event(name: str, params: dict) -> None:
    _events.append({"name": name, **params})


tree = Wunderbaum(
    source=copy.deepcopy(SOURCE),
    options={"dnd": True, "selectMode": "multi"},
    tree_event_callback=_on_event,
)


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override the parent fixture - don't reset Panel state mid-run."""
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


def _band(page: Page, title: str, frac: float) -> tuple[float, float]:
    """Point at *frac* of a row's height, horizontally on its title cell."""
    x, _ = wb_title_center(page, title)
    box = wb_row(page, title).bounding_box()
    return x, box["y"] + frac * box["height"]


def _click(page: Page, title: str, *modifiers: str) -> None:
    """Click a node's title cell, holding *modifiers* for the duration."""
    x, y = wb_title_center(page, title)
    for key in modifiers:
        page.keyboard.down(key)
    page.mouse.click(x, y)
    for key in modifiers:
        page.keyboard.up(key)
    page.wait_for_timeout(150)


def _collapse(page: Page, title: str) -> None:
    wb_row(page, title).locator(".wb-expander").click()
    page.wait_for_timeout(250)


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


def _client_root_keys(page: Page) -> list[str]:
    """Root-level keys of the client-side wunderbaum tree."""
    return page.evaluate(
        """() => {
        const found = [];
        function search(root) {
            root.querySelectorAll('.tree-container').forEach(el => found.push(el));
            root.querySelectorAll('*').forEach(el => {
                if (el.shadowRoot) search(el.shadowRoot);
            });
        }
        search(document);
        const container = found[0];
        if (!container || !container._wunderbaum) return [];
        return container._wunderbaum.root.children.map(c => c.key);
    }"""
    )


def _below_last_row(page: Page) -> tuple[float, float]:
    """A point in the blank area under the last row, still inside the tree."""
    box = page.locator(".tree-container").first.bounding_box()
    last = page.locator(".wb-row").last.bounding_box()
    assert box is not None, "tree container is not visible"
    assert last is not None, "no rows are visible"
    y = last["y"] + last["height"] + 30
    assert y < box["y"] + box["height"], "no blank area below the last row"
    return box["x"] + box["width"] / 2, y


def _drops() -> list:
    return [e for e in _events if e["name"] == "drop"]


def test_below_an_expanded_parent_inserts_as_first_child(ready_page: Page):
    """The band is drawn above the first child, so that is where the node goes.

    Wunderbaum's own geometry would make this a sibling of the parent, two
    indent levels away from where the insert arrow points.
    """
    page = ready_page

    drag(page, wb_title_center(page, "File 4"), _band(page, "Folder A", 0.86), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _root_keys(tree.source) == ["a", "b"]
    assert _child_keys(tree.source, "a") == ["b/4", "a/1", "a/2", "a/3"]
    assert _child_keys(tree.source, "b") == ["b/5"]


def test_below_a_collapsed_parent_inserts_as_a_sibling(ready_page: Page):
    """Nothing is displayed below a collapsed parent, so ``after`` stands.

    Kept brisk on purpose: hovering a collapsed folder for longer than
    ``autoExpandMS`` (1.5 s) expands it, after which the test above applies.
    """
    page = ready_page
    _collapse(page, "Folder A")

    drag(page, wb_title_center(page, "File 4"), _band(page, "Folder A", 0.86), steps=6)
    wait_until(lambda: bool(_drops()))

    assert _root_keys(tree.source) == ["a", "b/4", "b"]
    assert _child_keys(tree.source, "a") == ["a/1", "a/2", "a/3"]


def test_above_own_parent_moves_the_node_up_a_level(ready_page: Page):
    """A child dropped before its own parent leaves the folder.

    Wunderbaum's ``preventVoidMoves`` used to veto this as a void move, but it
    is a real reparent, so the panel switches that check off and rejects only
    genuine no-ops itself.
    """
    page = ready_page

    drag(page, wb_title_center(page, "File 1"), _band(page, "Folder A", 0.12), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _root_keys(tree.source) == ["a/1", "a", "b"]
    assert _child_keys(tree.source, "a") == ["a/2", "a/3"]


def test_onto_own_parent_does_nothing(ready_page: Page):
    """Dropping into the folder a node already sits in is a no-op."""
    page = ready_page

    drag(page, wb_title_center(page, "File 1"), _band(page, "Folder A", 0.5), steps=8)
    page.wait_for_timeout(600)

    assert not _drops()
    assert _child_keys(tree.source, "a") == ["a/1", "a/2", "a/3"]


def test_before_own_next_sibling_does_nothing(ready_page: Page):
    """The node is already in that slot, so no move is emitted."""
    page = ready_page

    drag(page, wb_title_center(page, "File 1"), _band(page, "File 2", 0.12), steps=8)
    page.wait_for_timeout(600)

    assert not _drops()
    assert _child_keys(tree.source, "a") == ["a/1", "a/2", "a/3"]


def test_drop_in_the_blank_area_appends_at_root(ready_page: Page):
    """The empty space under the last row is the only way back to root level.

    Folder B is the last top-level node and is expanded, so its own bottom band
    inserts as its first child and every row below it is one of its children.
    No row is left whose band could mean "after Folder B".
    """
    page = ready_page

    drag(page, wb_title_center(page, "File 4"), _below_last_row(page), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _client_root_keys(page) == ["a", "b", "b/4"]
    assert _root_keys(tree.source) == ["a", "b", "b/4"]
    assert _child_keys(tree.source, "b") == ["b/5"]


def test_multi_drop_below_an_expanded_parent_keeps_order(ready_page: Page):
    """Each node after the first anchors on the one before it.

    Inserting every node at the head would otherwise reverse the selection.
    """
    page = ready_page

    _click(page, "File 4")
    _click(page, "File 5", "Shift")

    drag(page, wb_title_center(page, "File 4"), _band(page, "Folder A", 0.86), steps=8)
    wait_until(lambda: bool(_drops()))

    assert _child_keys(tree.source, "a") == ["b/4", "b/5", "a/1", "a/2", "a/3"]
    assert _child_keys(tree.source, "b") == []
