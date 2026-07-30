"""Shared Playwright + Panel helpers for UI tests and the docs media generator.

These are the low-level primitives that both ``tests/`` and
``docs/scripts/generate_media.py`` rely on, kept in one place so the selectors,
the shadow-DOM ``canvasToDOM`` trick and the drag gesture cannot drift between
the test suite and the media generator.

The functions take a Playwright ``Page``/``Locator`` but this module does not
import Playwright itself, so importing it is cheap and dependency-free.
"""

from __future__ import annotations

import socket
import time
from typing import Any, Callable

Point = tuple[float, float]


def free_port() -> int:
    """Return a free localhost TCP port (used to serve Panel apps in tests)."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(("", 0))
        return s.getsockname()[1]


def disable_panelini_backgrounds() -> None:
    """Drop the heavy base64 background-image CSS from Panelini.

    Keeps captured media small and UI tests fast (the ~530 KB base64 CSS is
    injected at every ``Panelini(...)`` call otherwise).
    """
    from panelini import Panelini

    Panelini.param.header_background_image.default = None
    Panelini.param.content_background_image.default = None


def center(box: dict) -> Point:
    """Center point of a Playwright bounding box."""
    return box["x"] + box["width"] / 2, box["y"] + box["height"] / 2


def node_dom_pos(page: Any, node_id: Any) -> Point:
    """Absolute DOM pixel position of a vis-network node id.

    vis-network lives in a shadow DOM, so we call its ``canvasToDOM`` API on the
    ``.network-canvas`` container (which exposes ``_visNetwork``) and offset by
    the container's page position.
    """
    network_canvas = page.locator(".network-canvas").first
    box = network_canvas.bounding_box()
    pos = network_canvas.evaluate(
        """
        (el, id) => {
            const network = el._visNetwork;
            const positions = network.getPositions([id]);
            return network.canvasToDOM(positions[id]);
        }
        """,
        node_id,
    )
    return box["x"] + pos["x"], box["y"] + pos["y"]


def wb_wait(page: Any, timeout: int = 10000) -> None:
    """Wait for a Wunderbaum tree to render.

    Wunderbaum virtualises rows, so the first ``.wb-row`` is often reported as
    not visible even though rows are present and clickable; wait on the wrapper.
    """
    page.locator(".wunderbaum-wrapper").first.wait_for(state="visible", timeout=timeout)


def wb_row(page: Any, title: str) -> Any:
    """Locator for the Wunderbaum row whose title is exactly *title*."""
    return page.locator(f".wb-row:has(.wb-title:text-is('{title}'))").first


def wb_row_center(page: Any, title: str) -> Point:
    return center(wb_row(page, title).bounding_box())


def wb_title_center(page: Any, title: str) -> Point:
    """Center of a node's title cell.

    In treegrid mode the row spans every column (including editable cells), so
    interactions that target the node (DnD, activate) must grab ``.wb-title``,
    not the row center.
    """
    return center(page.locator(f".wb-title:text-is('{title}')").first.bounding_box())


def wb_checkbox(page: Any, title: str) -> Any:
    """Locator for the checkbox of the Wunderbaum row titled *title*."""
    return wb_row(page, title).locator(".wb-checkbox")


def drag(
    page: Any,
    start: Point,
    end: Point,
    steps: int = 10,
    dwell: float = 0.06,
    shot: Callable[[int], None] | None = None,
) -> None:
    """Pointer drag from *start* to *end* in steps, dwelling so the target
    registers ``dragover`` on each row (matches test_wunderbaum_dnd).

    Pass ``shot`` to capture a frame per step (used by the media generator);
    omit it in tests.
    """
    sx, sy = start
    ex, ey = end
    page.mouse.move(sx, sy)
    if shot:
        shot(300)
    page.mouse.down()
    for i in range(1, steps + 1):
        page.mouse.move(sx + (ex - sx) * i / steps, sy + (ey - sy) * i / steps)
        time.sleep(dwell)
        if shot:
            shot(90)
    if shot:
        shot(400)
    page.mouse.up()
