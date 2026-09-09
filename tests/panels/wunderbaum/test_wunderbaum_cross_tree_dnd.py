"""Playwright E2E tests for dragging nodes between two Wunderbaum trees.

The internal wunderbaum ``dnd`` callbacks never fire for a drag that started in
another tree, because there is no ``sourceNode``. The container-level listeners
in ``setupDragDrop()`` are what see it, and they emit ``externalDrop``.

Two trees are served side by side so the receiving tree's event can be checked
for the *other* tree's id.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import center, drag, wait_until

_PORT = 6421

LEFT_SOURCE = [
    {
        "title": "Left Folder",
        "key": "l",
        "expanded": True,
        "children": [
            {"title": "Left 1", "key": "l/1"},
            {"title": "Left 2", "key": "l/2"},
        ],
    },
]

RIGHT_SOURCE = [
    {
        "title": "Right Folder",
        "key": "r",
        "expanded": True,
        "children": [
            {"title": "Right 1", "key": "r/1"},
        ],
    },
]

_left_events: list = []
_right_events: list = []


def _on_left(name: str, params: dict) -> None:
    _left_events.append({"name": name, **params})


def _on_right(name: str, params: dict) -> None:
    _right_events.append({"name": name, **params})


left_tree = Wunderbaum(
    source=copy.deepcopy(LEFT_SOURCE),
    options={"dnd": True, "selectMode": "multi", "checkbox": True},
    tree_id="tree-left",
    tree_event_callback=_on_left,
)

right_tree = Wunderbaum(
    source=copy.deepcopy(RIGHT_SOURCE),
    options={"dnd": True},
    tree_id="tree-right",
    tree_event_callback=_on_right,
)


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override the parent fixture - don't reset Panel state mid-run.

    Both trees share one module-scoped ``pn.serve()``; ``pn.state.reset()``
    after every test would tear down that shared server's session state.
    """
    yield


@pytest.fixture(scope="module")
def panel_server():
    """Serve both trees side by side once for the whole module."""
    server = pn.serve(pn.Row(left_tree, right_tree), port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    # kill_all_servers() (not server.stop()) so panel's own server/thread
    # registry is cleared too - see test_wunderbaum_dnd for the full reason.
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server."""
    left_tree.source = copy.deepcopy(LEFT_SOURCE)
    right_tree.source = copy.deepcopy(RIGHT_SOURCE)
    _left_events.clear()
    _right_events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    # Both trees must be up, not just the first one wb_wait would find.
    wait_until(lambda: page.locator(".wunderbaum-wrapper").count() == 2)
    page.locator(".wunderbaum-wrapper").first.wait_for(state="visible")
    page.locator(".wunderbaum-wrapper").last.wait_for(state="visible")
    yield page
    page.goto("about:blank")
    context.close()


def _title_center(page: Page, title: str) -> tuple[float, float]:
    box = page.locator(f".wb-title:text-is('{title}')").first.bounding_box()
    assert box, f"no bounding box for {title!r}"
    return center(box)


def _external_drops(events: list) -> list:
    return [e for e in events if e["name"] == "externalDrop"]


def test_cross_tree_drop_reports_source_tree(ready_page: Page):
    """Dragging Left 1 onto Right Folder emits externalDrop on the right tree."""
    page = ready_page

    drag(page, _title_center(page, "Left 1"), _title_center(page, "Right Folder"), steps=8)
    wait_until(lambda: bool(_external_drops(_right_events)))

    drops = _external_drops(_right_events)
    assert len(drops) == 1
    d = drops[0]
    assert d["external"] is True
    assert d["source_tree_id"] == "tree-left"
    assert d["source_keys"] == ["l/1"]
    assert d["target_key"] == "r"
    assert d["region"] in ("before", "over", "after")

    # The source tree saw the drag start but no drop of its own.
    assert any(e["name"] == "dragStart" for e in _left_events)
    assert not _external_drops(_left_events)
    assert not [e for e in _left_events if e["name"] == "drop"]


def test_cross_tree_drop_leaves_source_tree_intact(ready_page: Page):
    """A cross-tree drag does not move the node out of the source tree.

    The receiving tree only reports the drop; what happens to either tree is
    the Python consumer's decision.
    """
    page = ready_page

    drag(page, _title_center(page, "Left 1"), _title_center(page, "Right Folder"), steps=8)
    wait_until(lambda: bool(_external_drops(_right_events)))

    left_keys = [c["key"] for c in left_tree.source[0]["children"]]
    assert left_keys == ["l/1", "l/2"]


def test_same_tree_drag_emits_drop_not_external_drop(ready_page: Page):
    """A drag that stays inside one tree keeps the existing `drop` payload."""
    page = ready_page

    drag(page, _title_center(page, "Left 1"), _title_center(page, "Left 2"), steps=8)
    wait_until(lambda: any(e["name"] == "drop" for e in _left_events))

    assert not _external_drops(_left_events)
    assert not _external_drops(_right_events)


def test_cross_tree_multi_select_sends_all_keys(ready_page: Page):
    """With selectMode 'multi', dragging a selected node drags the selection."""
    page = ready_page

    # Select via the tree API rather than Ctrl+click: Playwright cannot push
    # real keyboard modifiers into the shadow DOM.
    left_tree.select_node("l/1", True)
    left_tree.select_node("l/2", True)
    wait_until(lambda: page.locator(".wb-row.wb-selected").count() >= 2)

    drag(page, _title_center(page, "Left 1"), _title_center(page, "Right Folder"), steps=8)
    wait_until(lambda: bool(_external_drops(_right_events)))

    d = _external_drops(_right_events)[0]
    assert sorted(d["source_keys"]) == ["l/1", "l/2"]
