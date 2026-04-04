"""Playwright E2E tests for Wunderbaum drag-and-drop.

Tests both default drag (move) and Ctrl+drag (copy).
Uses ``window.__wbForceCopy`` test hook to simulate Ctrl
since Playwright keyboard events don't reach shadow DOM.
"""

import time

import panel as pn
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum

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
    return [rows.nth(i).text_content().strip() for i in range(count)]


def _center(box: dict) -> tuple[float, float]:
    return (
        box["x"] + box["width"] / 2,
        box["y"] + box["height"] / 2,
    )


def _drag(
    page: Page,
    sx: float,
    sy: float,
    tx: float,
    ty: float,
    steps: int = 5,
):
    page.mouse.move(sx, sy)
    page.mouse.down()
    for i in range(steps):
        frac = (i + 1) / steps
        page.mouse.move(
            sx + (tx - sx) * frac,
            sy + (ty - sy) * frac,
        )
        time.sleep(0.05)
    page.mouse.up()


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

        _drag(page, *_center(s), *_center(t))
        time.sleep(2)

        drops = [e for e in events if e["name"] == "drop"]
        assert len(drops) == 1
        d = drops[0]
        assert d["sourceKey"] == "a/1"
        assert d["targetKey"] == "b"
        assert "movedNodeId" in d
        assert "copy" not in d
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
        _drag(page, *_center(s), *_center(t))
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

        _drag(page, *_center(s), *_center(t))
        time.sleep(2)

        titles = _get_titles(page)
        assert titles.count("File 1") == 1
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
        _drag(page, *_center(s), *_center(t))
        page.evaluate("window.__wbForceCopy = false")
        time.sleep(2)

        after = _get_titles(page).count("File 1")
        assert after == before
    finally:
        server.stop()
