"""Playwright E2E tests for Wunderbaum drag-and-drop.

Tests both default drag (move) and Ctrl+drag (copy).
Uses ``window.__wbForceCopy`` test hook to simulate Ctrl
since Playwright keyboard events don't reach shadow DOM.
"""

import time

import panel as pn
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import center, drag

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


def _make_tree(events: list) -> Wunderbaum:
    def on_event(name: str, params: dict) -> None:
        events.append({"name": name, **params})

    return Wunderbaum(
        source=DND_SOURCE,
        options={"dnd": True},
        tree_event_callback=on_event,
    )


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


def test_dnd_move(page: Page, port: int):
    """Default drag moves: emits drop with movedNodeId."""
    events: list = []
    tree = _make_tree(events)
    server = pn.serve(
        tree,
        port=port,
        threaded=True,
        show=False,
    )
    try:
        page.goto(f"http://localhost:{port}")
        time.sleep(5)

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
        time.sleep(2)

        drops = [e for e in events if e["name"] == "drop"]
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
    finally:
        server.stop()


def test_dnd_copy(page: Page, port: int):
    """Ctrl+drag copies: emits drop with copy=true."""
    events: list = []
    tree = _make_tree(events)
    server = pn.serve(
        tree,
        port=port,
        threaded=True,
        show=False,
    )
    try:
        page.goto(f"http://localhost:{port}")
        time.sleep(5)

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
        time.sleep(2)
        page.evaluate("window.__wbForceCopy = false")

        drops = [e for e in events if e["name"] == "drop"]
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
    finally:
        server.stop()


def test_dnd_move_no_duplicate(page: Page, port: int):
    """After move, File 1 appears only once."""
    events: list = []
    tree = _make_tree(events)
    server = pn.serve(
        tree,
        port=port,
        threaded=True,
        show=False,
    )
    try:
        page.goto(f"http://localhost:{port}")
        time.sleep(5)

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
        time.sleep(2)

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
    finally:
        server.stop()


def test_dnd_copy_preserves_source(page: Page, port: int):
    """After copy, source node is still in place."""
    events: list = []
    tree = _make_tree(events)
    server = pn.serve(
        tree,
        port=port,
        threaded=True,
        show=False,
    )
    try:
        page.goto(f"http://localhost:{port}")
        time.sleep(5)

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
        time.sleep(2)
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
    finally:
        server.stop()
