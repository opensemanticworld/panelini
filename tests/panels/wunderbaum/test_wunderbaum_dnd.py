"""Playwright E2E tests for Wunderbaum drag-and-drop.

Tests both default drag (move) and copy-drag. The copy modifier is Ctrl on
Windows and Linux, Option on macOS, following Finder.

``test_dnd_copy`` drives the copy through the ``window.__wbForceCopy`` test
hook. ``test_dnd_copy_with_real_key`` presses the key itself, which reaches
the panel because it listens on ``document`` in the capture phase.
"""

import copy
import sys
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import center, drag, wait_until, wb_wait

_PORT = 6420
_COPY_KEY = "Alt" if sys.platform == "darwin" else "Control"

DND_SOURCE = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "children": [
            {"title": "File 1", "key": "a/1"},
            {"title": "File 2", "key": "a/2"},
        ],
    },
    {
        "title": "Folder B",
        "key": "b",
        "expanded": True,
        "children": [
            {"title": "File 3", "key": "b/3"},
        ],
    },
]

_events: list = []


def _on_event(name: str, params: dict) -> None:
    _events.append({"name": name, **params})


tree = Wunderbaum(
    source=copy.deepcopy(DND_SOURCE),
    options={"dnd": True},
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
    """Serve the shared dnd tree once for the whole module."""
    server = pn.serve(tree, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    # kill_all_servers() (not server.stop()) so panel's own server/thread
    # registry is cleared too - a bare .stop() leaves a stale entry that a
    # later, unrelated test's pn.state.reset() can trip over.
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server.

    ``tree``/``_events`` are module-level singletons shared by every test, so
    state is reset here before navigating - a fresh session per test avoids
    reloading a page whose previous session might still have an in-flight
    server round-trip (observed to be flaky), while still avoiding the
    per-test ``pn.serve()`` startup cost this replaces.
    """
    tree.source = copy.deepcopy(DND_SOURCE)
    _events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _get_titles(page: Page) -> list[str]:
    rows = page.locator("css=.wb-row .wb-title")
    count = rows.count()
    return [(rows.nth(i).text_content() or "").strip() for i in range(count)]


def _find_in_source(source: list[dict], key: str) -> tuple[dict, str | None] | None:
    """Find node and its parent key in the source tree."""

    def search(nodes, parent_key=None):
        for node in nodes:
            if node["key"] == key:
                return node, parent_key
            if "children" in node:
                result = search(node["children"], node["key"])
                if result:
                    return result
        return None

    return search(source)


def _get_client_children(page: Page, parent_key: str) -> list[str]:
    """Get child keys of a node in the client-side wunderbaum tree."""
    return page.evaluate(
        """(parentKey) => {
        function findInShadowRoots(selector) {
            const results = [];
            function search(root) {
                root.querySelectorAll(selector).forEach(el => results.push(el));
                root.querySelectorAll('*').forEach(el => {
                    if (el.shadowRoot) search(el.shadowRoot);
                });
            }
            search(document);
            return results;
        }
        const container = findInShadowRoots('.tree-container')[0];
        if (!container || !container._wunderbaum) return [];
        const wb = container._wunderbaum;
        const node = wb.findFirst(n => n.key === parentKey);
        if (!node || !node.children) return [];
        return node.children.map(c => c.key);
    }""",
        parent_key,
    )


def test_dnd_move(ready_page: Page):
    """Default drag moves: emits drop with movedNodeId."""
    page = ready_page

    src = page.locator(
        "css=.wb-row .wb-title",
        has_text="File 1",
    ).first
    tgt = page.locator(
        "css=.wb-row .wb-title",
        has_text="Folder B",
    ).first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    drag(page, center(s), center(t), steps=5)
    wait_until(lambda: any(e["name"] == "drop" for e in _events))

    drops = [e for e in _events if e["name"] == "drop"]
    assert len(drops) == 1
    d = drops[0]
    assert d["sourceKey"] == "a/1"
    assert d["targetKey"] == "b"
    assert "movedNodeId" in d
    assert "copy" not in d

    # Server-side: File 1 moved from Folder A to Folder B
    result = _find_in_source(tree.source, "a/1")
    assert result is not None, "a/1 not in server source"
    _, parent_key = result
    assert parent_key == "b", f"Server: parent={parent_key}, expected 'b'"

    # Client-side: Folder B has File 1, Folder A does not
    b_children = _get_client_children(page, "b")
    assert "a/1" in b_children, f"Client: 'a/1' not in Folder B children {b_children}"
    a_children = _get_client_children(page, "a")
    assert "a/1" not in a_children, f"Client: 'a/1' still in Folder A children {a_children}"


def test_dnd_copy(ready_page: Page):
    """Ctrl+drag copies: emits drop with copy=true."""
    page = ready_page

    src = page.locator(
        "css=.wb-row .wb-title",
        has_text="File 1",
    ).first
    tgt = page.locator(
        "css=.wb-row .wb-title",
        has_text="Folder B",
    ).first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    page.evaluate("window.__wbForceCopy = true")
    assert page.evaluate("window.__wbForceCopy")
    drag(page, center(s), center(t), steps=5)
    wait_until(lambda: any(e["name"] == "drop" for e in _events))
    page.evaluate("window.__wbForceCopy = false")

    drops = [e for e in _events if e["name"] == "drop"]
    assert len(drops) == 1
    d = drops[0]
    assert d["sourceKey"] == "a/1"
    assert d["targetKey"] == "b"
    assert d.get("copy") is True
    assert "copiedNodeId" in d
    assert "movedNodeId" not in d

    # Server-side: source still under Folder A (copy doesn't move)
    result = _find_in_source(tree.source, "a/1")
    assert result is not None, "a/1 not in server source"
    _, parent_key = result
    assert parent_key == "a", f"Server: source parent={parent_key}, expected 'a'"

    # Client-side: source still under Folder A
    a_children = _get_client_children(page, "a")
    assert "a/1" in a_children, f"Client: 'a/1' not in Folder A children {a_children}"


def test_dnd_copy_with_real_key(ready_page: Page):
    """Holding the real copy modifier key copies, without the test hook.

    ``test_dnd_copy`` sets ``window.__wbForceCopy`` and never presses a key,
    so it never exercises the actual modifier. Ctrl is the copy modifier on
    Windows and Linux; macOS Finder uses Option instead.
    """
    page = ready_page

    src = page.locator(
        "css=.wb-row .wb-title",
        has_text="File 1",
    ).first
    tgt = page.locator(
        "css=.wb-row .wb-title",
        has_text="Folder B",
    ).first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    # Click first so the page has keyboard focus and the node is selected.
    src.click()

    page.keyboard.down(_COPY_KEY)
    drag(page, center(s), center(t), steps=5)
    wait_until(lambda: any(e["name"] == "drop" for e in _events))
    page.keyboard.up(_COPY_KEY)

    drops = [e for e in _events if e["name"] == "drop"]
    assert len(drops) == 1
    d = drops[0]
    assert d["sourceKey"] == "a/1"
    assert d["targetKey"] == "b"
    assert d.get("copy") is True
    assert "copiedNodeId" in d
    assert "movedNodeId" not in d


def test_dnd_move_no_duplicate(ready_page: Page):
    """After move, File 1 appears only once."""
    page = ready_page

    src = page.locator(
        "css=.wb-row .wb-title",
        has_text="File 1",
    ).first
    tgt = page.locator(
        "css=.wb-row .wb-title",
        has_text="Folder B",
    ).first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    drag(page, center(s), center(t), steps=5)
    wait_until(lambda: any(e["name"] == "drop" for e in _events))

    titles = _get_titles(page)
    assert titles.count("File 1") == 1

    # Server-side: only one node with key a/1, under Folder B
    result = _find_in_source(tree.source, "a/1")
    assert result is not None, "a/1 not in server source"
    _, parent_key = result
    assert parent_key == "b", f"Server: parent={parent_key}, expected 'b'"

    # Folder A should have only File 2 left
    a_result = _find_in_source(tree.source, "a")
    assert a_result is not None
    a_node, _ = a_result
    a_child_keys = [c["key"] for c in a_node.get("children", [])]
    assert "a/1" not in a_child_keys, f"Server: a/1 still in Folder A: {a_child_keys}"

    # Client-side: same
    a_children = _get_client_children(page, "a")
    assert "a/1" not in a_children
    b_children = _get_client_children(page, "b")
    assert "a/1" in b_children


def test_dnd_copy_preserves_source(ready_page: Page):
    """After copy, source node is still in place."""
    page = ready_page

    before = _get_titles(page).count("File 1")

    src = page.locator(
        "css=.wb-row .wb-title",
        has_text="File 1",
    ).first
    tgt = page.locator(
        "css=.wb-row .wb-title",
        has_text="Folder B",
    ).first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    page.evaluate("window.__wbForceCopy = true")
    drag(page, center(s), center(t), steps=5)
    wait_until(lambda: any(e["name"] == "drop" for e in _events))
    page.evaluate("window.__wbForceCopy = false")

    after = _get_titles(page).count("File 1")
    assert after == before

    # Server-side: source still under Folder A
    result = _find_in_source(tree.source, "a/1")
    assert result is not None, "a/1 not in server source after copy"
    _, parent_key = result
    assert parent_key == "a", f"Server: parent={parent_key}, expected 'a'"

    # Server-side: Folder A still has both children
    a_result = _find_in_source(tree.source, "a")
    assert a_result is not None
    a_node, _ = a_result
    a_child_keys = [c["key"] for c in a_node.get("children", [])]
    assert "a/1" in a_child_keys, f"Server: a/1 missing from Folder A: {a_child_keys}"
    assert "a/2" in a_child_keys, f"Server: a/2 missing from Folder A: {a_child_keys}"

    # Client-side: source still under Folder A
    a_children = _get_client_children(page, "a")
    assert "a/1" in a_children, f"Client: a/1 not in Folder A: {a_children}"
