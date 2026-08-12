"""Shared Playwright + Panel helpers for UI tests and docs-media recording.

These are the low-level primitives the test suite relies on (selectors, the
shadow-DOM ``canvasToDOM`` trick, the drag gesture) plus the cursor overlay and
animation assembler used by the ``media`` recording plugin, kept in one place so
nothing drifts between assertions and recorded media.

The Playwright helpers take a ``Page``/``Locator`` but this module does not import
Playwright; ``assemble_animation`` imports Pillow lazily. Importing the module is
therefore cheap and free of hard test-only dependencies.
"""

from __future__ import annotations

import socket
import time
from typing import TYPE_CHECKING, Any, Callable

if TYPE_CHECKING:
    from playwright.sync_api import FloatRect

Point = tuple[float, float]


def free_port() -> int:
    """Return a free localhost TCP port (used to serve Panel apps in tests)."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(("", 0))
        return int(s.getsockname()[1])


def disable_panelini_backgrounds() -> None:
    """Drop the heavy base64 background-image CSS from Panelini.

    Keeps captured media small and UI tests fast (the ~530 KB base64 CSS is
    injected at every ``Panelini(...)`` call otherwise).
    """
    from panelini import Panelini

    Panelini.param.header_background_image.default = None
    Panelini.param.content_background_image.default = None


def center(box: FloatRect) -> Point:
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


def wait_until(
    predicate: Callable[[], bool],
    timeout: float = 2.0,
    interval: float = 0.05,
) -> None:
    """Poll *predicate* until it returns truthy, or raise on *timeout*.

    For pure-Python state (e.g. a callback-recorded events list) that has
    no DOM/JS signal Playwright can wait on directly.
    """
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if predicate():
            return
        time.sleep(interval)
    msg = f"wait_until: condition not met within {timeout}s"
    raise TimeoutError(msg)


def xterm_wait_for_text(page: Any, text: str, timeout: float = 30000) -> None:
    """Wait until an xterm.js ``Terminal`` widget's rendered buffer contains *text*.

    Checks the actual browser-rendered buffer rather than Python-side state,
    via Bokeh's view registry (``Bokeh.index``), since Panel's ``Terminal``
    doesn't expose its xterm.js instance on the DOM element directly.
    """
    page.wait_for_function(
        """
        (text) => {
            function findTerm(view, depth) {
                if (!view || depth > 15) return null;
                if (view.term) return view.term;
                const children = view.child_views;
                if (Array.isArray(children)) {
                    for (const c of children) {
                        const r = findTerm(c, depth + 1);
                        if (r) return r;
                    }
                }
                return null;
            }
            let term = null;
            for (const id in Bokeh.index) {
                term = findTerm(Bokeh.index[id], 0);
                if (term) break;
            }
            if (!term) return false;
            const buf = term.buffer.active;
            let out = '';
            for (let i = 0; i < buf.length; i++) {
                const line = buf.getLine(i);
                if (line) out += line.translateToString(true);
            }
            return out.includes(text);
        }
        """,
        arg=text,
        timeout=timeout,
    )


def vn_wait(page: Any, timeout: int = 10000) -> None:
    """Wait for a VisNetwork canvas to render."""
    page.locator(".vis-network canvas").first.wait_for(state="visible", timeout=timeout)


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


# Injected via page.add_init_script() when recording: a pointer arrow + red ring
# that follows the mouse. Capture-phase + drag listeners keep it tracking during
# a DnD, when the widget may stop propagation of mousemove.
CURSOR_INIT_JS = """
(() => {
    const install = () => {
        if (document.getElementById('__rec_cursor')) return;
        const c = document.createElement('div');
        c.id = '__rec_cursor';
        c.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;'
            + 'z-index:2147483647;will-change:transform;display:none;';
        c.innerHTML =
            '<div style="position:absolute;left:0;top:0;width:22px;height:22px;'
            + 'margin-left:-11px;margin-top:-11px;border:3px solid #e53935;'
            + 'border-radius:50%;box-shadow:0 0 0 2px rgba(255,255,255,.85);"></div>'
            + '<svg width="20" height="28" viewBox="0 0 20 28" '
            + 'style="position:absolute;left:0;top:0;overflow:visible;">'
            + '<path d="M1,1 L1,20 L6,15 L9.5,24 L12.5,23 L9,14.5 L16,14.5 Z" '
            + 'fill="#111827" stroke="#ffffff" stroke-width="1.5" '
            + 'stroke-linejoin="round"/></svg>';
        document.body.appendChild(c);
        const move = e => {
            if (e.clientX || e.clientY) {
                c.style.display = 'block';
                c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            }
        };
        ['mousemove', 'pointermove', 'dragover', 'drag'].forEach(
            ev => document.addEventListener(ev, move, true)
        );
    };
    if (document.body) install();
    else document.addEventListener('DOMContentLoaded', install);
})();
"""


def assemble_animation(
    frames: list,
    out_path: Any,
    *,
    duration_ms: int = 100,
    width: int = 1200,
    fmt: str = "webp",
    quality: int = 80,
    colors: int = 128,
    max_frame_ms: int = 1500,
    diff_threshold: int = 24,
    min_change_frac: float = 0.00005,
) -> int:
    """Assemble RGB PIL frames into a small animated WebP (default) or GIF.

    Pads frames to a common size, merges near-identical consecutive frames (so
    static holds cost one frame), downscales to ``width``, then writes ``fmt``:
    ``"webp"`` uses lossy ``quality``; ``"gif"`` an adaptive ``colors`` palette.
    Returns the number of frames written.

    A frame duplicates its predecessor when, after thresholding the diff and
    eroding away isolated speckle, fewer than ``min_change_frac`` of pixels of
    *solid* change remain. Erosion is the key: a canvas redraw shimmers thin
    anti-aliased speckle across the whole graph area (which must not spawn a
    keyframe) while a dragged node, gliding cursor, or opening menu is a compact
    blob that survives erosion, so drags stay smooth yet static holds collapse.
    """
    from PIL import Image, ImageChops, ImageFilter

    if not frames:
        msg = "assemble_animation needs at least one frame"
        raise ValueError(msg)

    canvas_w = max(f.width for f in frames)
    canvas_h = max(f.height for f in frames)
    padded = []
    for f in frames:
        if f.size != (canvas_w, canvas_h):
            bg = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
            bg.paste(f, (0, 0))
            f = bg
        padded.append(f)

    min_changed_px = max(1, int(min_change_frac * canvas_w * canvas_h))
    kept = [padded[0]]
    durs = [duration_ms]
    for f in padded[1:]:
        diff = ImageChops.difference(f, kept[-1]).convert("L")
        changed = diff.point(lambda p: 255 if p > diff_threshold else 0)
        solid = changed.filter(ImageFilter.MinFilter(3))  # erode away scattered speckle
        if solid.histogram()[255] < min_changed_px:
            # Hold the run, but keep the *latest* image so a final thin change
            # (e.g. a graph node relabel) is the frame that survives, not the
            # stale earlier one it merged into.
            kept[-1] = f
            durs[-1] += duration_ms
        else:
            kept.append(f)
            durs.append(duration_ms)
    # Cap long static holds (e.g. an initial load wait) so the loop stays snappy.
    durs = [min(d, max_frame_ms) for d in durs]

    if canvas_w > width:
        new_h = round(canvas_h * width / canvas_w)
        kept = [f.resize((width, new_h), Image.Resampling.LANCZOS) for f in kept]

    out_path.parent.mkdir(parents=True, exist_ok=True)
    if fmt == "gif":
        pal = [f.convert("P", palette=Image.Palette.ADAPTIVE, colors=colors) for f in kept]
        pal[0].save(
            out_path,
            save_all=True,
            append_images=pal[1:],
            duration=durs,
            loop=0,
            optimize=True,
            disposal=2,
        )
    else:  # webp
        kept[0].save(
            out_path,
            save_all=True,
            append_images=kept[1:],
            duration=durs,
            loop=0,
            quality=quality,
            method=6,
        )
    return len(kept)
