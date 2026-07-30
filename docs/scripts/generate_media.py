"""Generate docs media (still screenshots + animated GIF walkthroughs).

Pure Python: Playwright drives each example headless; still frames are captured
with ``page.screenshot()`` and GIFs are assembled with Pillow (no ffmpeg).

Interactive examples get a GIF (with a synthetic pointer + highlight ring);
everything else gets a single screenshot. A GIF entry whose interaction raises
falls back to a screenshot, so fragile interactions (drag and drop) degrade
gracefully instead of failing the run.

Media is committed to the repo and consumed by the Sphinx build as-is; it is
NOT regenerated in CI. Regenerate locally and review before committing:

    uv run python docs/scripts/generate_media.py            # everything
    uv run python docs/scripts/generate_media.py checkbox_tree visnetwork  # subset
"""

from __future__ import annotations

import contextlib
import io
import sys
import time
from pathlib import Path
from typing import Callable

import panel as pn
from PIL import Image, ImageChops
from playwright.sync_api import Page, sync_playwright

from panelini.testing import (
    disable_panelini_backgrounds,
    drag,
    free_port,
    node_dom_pos,
    wb_checkbox,
    wb_row_center,
    wb_title_center,
    wb_wait,
)

REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

# Keep captured media small and focused on the widget, not the page chrome.
disable_panelini_backgrounds()

GIF_DIR = REPO_ROOT / "docs" / "_static" / "gifs"
SHOT_DIR = REPO_ROOT / "docs" / "_static" / "screenshots"
VIEWPORT = {"width": 1000, "height": 640}
GIF_WIDTH = 680
GIF_COLORS = 96
SETTLE = 3.5  # seconds to let a widget render before capturing

Shot = Callable[[int], None]

_CURSOR_JS = """
() => {
    if (document.getElementById('__gif_cursor')) return;
    const c = document.createElement('div');
    c.id = '__gif_cursor';
    c.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;'
        + 'z-index:2147483647;will-change:transform;';
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
        // Skip the spurious (0,0) some browsers emit on the final drag event.
        if (e.clientX || e.clientY) {
            c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
        }
    };
    // Capture phase + drag events so the cursor keeps tracking during a DnD,
    // when the widget may stop propagation of mousemove.
    ['mousemove', 'pointermove', 'dragover', 'drag'].forEach(
        ev => document.addEventListener(ev, move, true)
    );
}
"""


def _glide(
    page: Page,
    shot: Shot,
    start: tuple[float, float],
    end: tuple[float, float],
    steps: int = 8,
    dur: int = 70,
) -> None:
    x0, y0 = start
    x1, y1 = end
    for i in range(1, steps + 1):
        page.mouse.move(x0 + (x1 - x0) * i / steps, y0 + (y1 - y0) * i / steps)
        shot(dur)


def _wait_wb(page: Page) -> None:
    """Wait for the tree to render, then a beat for row population."""
    wb_wait(page)
    time.sleep(1.2)


def _save_gif(frames: list[bytes], durations: list[int], out_path: Path) -> int:
    images = [Image.open(io.BytesIO(b)).convert("RGB") for b in frames]
    canvas_w = max(im.width for im in images)
    canvas_h = max(im.height for im in images)
    padded = []
    for im in images:
        if im.size != (canvas_w, canvas_h):
            bg = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
            bg.paste(im, (0, 0))
            im = bg
        padded.append(im)

    kept = [padded[0]]
    kept_dur = [durations[0]]
    for im, dur in zip(padded[1:], durations[1:]):
        if ImageChops.difference(im, kept[-1]).getbbox() is None:
            kept_dur[-1] += dur
        else:
            kept.append(im)
            kept_dur.append(dur)

    if canvas_w > GIF_WIDTH:
        new_h = round(canvas_h * GIF_WIDTH / canvas_w)
        kept = [im.resize((GIF_WIDTH, new_h), Image.LANCZOS) for im in kept]

    quantised = [im.convert("P", palette=Image.ADAPTIVE, colors=GIF_COLORS) for im in kept]
    out_path.parent.mkdir(parents=True, exist_ok=True)
    quantised[0].save(
        out_path,
        save_all=True,
        append_images=quantised[1:],
        duration=kept_dur,
        loop=0,
        optimize=True,
        disposal=2,
    )
    return len(quantised)


# --- GIF interaction scripts -----------------------------------------------


def _i_vn_context_menu(page: Page, shot: Shot, served: object) -> None:
    shot(1000)
    root = node_dom_pos(page, 1)
    _glide(page, shot, (root[0] - 180, root[1] - 120), root, steps=8, dur=70)
    shot(400)
    page.mouse.click(root[0], root[1], button="right")
    page.locator(".vn-context-menu").wait_for(state="visible", timeout=5000)
    shot(1200)
    item = page.locator(".vn-context-menu-item", has_text="Add Child")
    ibox = item.bounding_box()
    _glide(page, shot, root, (ibox["x"] + ibox["width"] / 2, ibox["y"] + ibox["height"] / 2), steps=5, dur=90)
    shot(500)
    item.click()
    time.sleep(1.2)
    shot(1800)


def _i_vn_ctrl_drag(page: Page, shot: Shot, served: object) -> None:
    shot(1000)
    n1 = node_dom_pos(page, 1)
    _glide(page, shot, (n1[0] - 160, n1[1] - 110), n1, steps=8, dur=70)
    shot(500)
    page.keyboard.down("Control")
    page.mouse.down()
    _glide(page, shot, n1, (n1[0] + 190, n1[1] + 120), steps=11, dur=70)
    page.mouse.up()
    page.keyboard.up("Control")
    time.sleep(1.0)
    shot(1800)


def _i_vn_resize(page: Page, shot: Shot, served: object) -> None:
    time.sleep(0.4)
    shot(1100)
    for width, height in [(760, 500), (640, 430), (520, 360), (430, 300)]:
        served.width = width
        served.height = height
        time.sleep(0.5)
        shot(360)
    shot(800)
    for width, height in [(520, 360), (660, 440), (860, 560)]:
        served.width = width
        served.height = height
        time.sleep(0.5)
        shot(360)
    shot(1100)


def _i_vn_tooltip(page: Page, shot: Shot, served: object) -> None:
    shot(1000)
    n1 = node_dom_pos(page, "n1")
    _glide(page, shot, (n1[0] - 160, n1[1] - 90), n1, steps=9, dur=80)
    page.locator("div.vis-tooltip").wait_for(state="visible", timeout=5000)
    shot(2400)


def _i_wb_checkbox(page: Page, shot: Shot, served: object) -> None:
    _wait_wb(page)
    shot(1100)
    target = wb_row_center(page, "Vegetables")
    cb = wb_checkbox(page, "Vegetables")
    cbox = cb.bounding_box()
    cb_center = (cbox["x"] + cbox["width"] / 2, cbox["y"] + cbox["height"] / 2)
    _glide(page, shot, (target[0] - 200, target[1] - 60), cb_center, steps=8, dur=70)
    shot(400)
    cb.click()
    time.sleep(1.0)
    shot(2000)


def _i_wb_context_menu(page: Page, shot: Shot, served: object) -> None:
    _wait_wb(page)
    shot(1000)
    target = wb_row_center(page, "src")
    _glide(page, shot, (target[0] - 160, target[1] - 70), target, steps=8, dur=70)
    shot(300)
    page.mouse.click(target[0], target[1], button="right")
    page.locator(".wb-context-menu").wait_for(state="visible", timeout=5000)
    shot(1200)
    item = page.locator(".wb-context-menu-item", has_text="Add Child")
    ibox = item.bounding_box()
    _glide(page, shot, target, (ibox["x"] + ibox["width"] / 2, ibox["y"] + ibox["height"] / 2), steps=5, dur=90)
    shot(500)
    item.click()
    time.sleep(1.1)
    shot(1800)


def _i_gdt(page: Page, shot: Shot, served: object) -> None:
    # Click a graph node; the Details tab fills with the node's id + JSON editor.
    page.locator(".vis-network canvas").first.wait_for(state="visible", timeout=8000)
    time.sleep(2.0)  # let the physics layout settle before clicking
    shot(1400)
    node = node_dom_pos(page, 1)  # "Alpha"
    _glide(page, shot, (node[0] - 180, node[1] - 120), node, steps=9, dur=70)
    shot(300)
    page.mouse.click(node[0], node[1])
    time.sleep(1.4)
    shot(2600)


def _i_wb_incremental(page: Page, shot: Shot, served: object) -> None:
    # Replay the example's own "Next Step" playbook: build the project tree
    # step by step (add nodes, rename, move), like test_incremental_tree_demo.
    btn = page.locator("button:has-text('Next Step')")
    btn.wait_for(state="visible", timeout=8000)
    shot(1200)  # empty tree + controls
    box = btn.bounding_box()
    centre = (box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
    _glide(page, shot, (centre[0], centre[1] + 110), centre, steps=5, dur=70)
    for _ in range(10):  # SEQUENCE has 10 steps, last is "complete"
        btn.click()
        time.sleep(0.85)
        shot(950)
    shot(1600)


def _i_wb_dnd(page: Page, shot: Shot, served: object) -> None:
    # Move "cache.dat" (under /tmp) into the "user" folder (under /home).
    _wait_wb(page)
    shot(1300)
    src = wb_row_center(page, "cache.dat")
    tgt = wb_row_center(page, "user")
    _glide(page, shot, (src[0] - 180, src[1] - 70), src, steps=7, dur=70)
    drag(page, src, tgt, steps=11, shot=shot)
    time.sleep(1.3)
    shot(2200)  # relocated result


def _i_uc_json_vis(page: Page, shot: Shot, served: object) -> None:
    page.locator(".vis-network canvas").first.wait_for(state="visible", timeout=8000)
    time.sleep(1.5)  # let the physics layout settle
    shot(1300)
    node = node_dom_pos(page, 0)  # "Alice"
    _glide(page, shot, (node[0] - 180, node[1] - 120), node, steps=9, dur=70)
    shot(300)
    page.mouse.click(node[0], node[1])  # select -> form switches to single-node edit
    time.sleep(1.3)
    shot(1800)
    # Edit the node's name in the form; the graph relabels the node live.
    name = page.locator("#root\\[name\\]").first
    nbox = name.bounding_box()
    _glide(page, shot, node, (nbox["x"] + nbox["width"] / 2, nbox["y"] + nbox["height"] / 2), steps=6, dur=80)
    shot(300)
    name.click()
    name.fill("Peter")
    shot(700)
    page.locator('[for="root[name]"]').first.click()  # blur -> commit -> graph relabels
    time.sleep(1.3)
    shot(2600)


def _i_uc_wb_vis(page: Page, shot: Shot, served: object) -> None:
    # Drag "Truck" onto "Animal": the tree reparents it and the graph re-wires
    # the SubClassOf edge (Truck -> Vehicle becomes Truck -> Animal).
    _wait_wb(page)
    time.sleep(1.2)  # let the graph physics settle
    shot(1600)
    src = wb_title_center(page, "Truck")
    tgt = wb_title_center(page, "Animal")
    _glide(page, shot, (src[0] - 200, src[1] - 90), src, steps=8, dur=70)
    drag(page, src, tgt, steps=12, shot=shot)
    time.sleep(1.8)  # graph re-wires + physics re-settles
    shot(3200)


def _i_wb_lazy(page: Page, shot: Shot, served: object) -> None:
    _wait_wb(page)
    shot(1100)
    expander = page.locator(".wb-row .wb-expander").first
    ebox = expander.bounding_box()
    exp_center = (ebox["x"] + ebox["width"] / 2, ebox["y"] + ebox["height"] / 2)
    _glide(page, shot, (ebox["x"] - 150, ebox["y"] - 60), exp_center, steps=7, dur=80)
    shot(400)
    expander.click()
    time.sleep(1.4)
    shot(2200)


# --- factories -------------------------------------------------------------


def _import_attr(module: str, attr: str):
    import importlib

    return getattr(importlib.import_module(module), attr)


def _factory_jsoneditor_pydantic():
    from pydantic import BaseModel, Field

    from examples.panels.jsoneditor.jsoneditor_pydantic import PydanticEditor

    class ASub(BaseModel):
        a: int = Field(..., description="prop a of sub property ASub")
        b: int = Field(..., description="prop b of sub property ASub")

    class A(BaseModel):
        x: int = Field(..., description="x function_config")
        y: int = Field(..., description="y function_config")
        z: int | None = Field(None, description="z function_config")
        sub: list[ASub] = Field([], description="sub property of A")

    a = A(x=1, y=2, z=3, sub=[ASub(a=1, b=2), ASub(a=4, b=3)])
    return PydanticEditor(A, value=a, format_array_tabs=True)


def _factory_resize():
    from panelini.panels.visnetwork import VisNetwork

    vis = VisNetwork(
        nodes=[{"id": 1, "label": "A"}, {"id": 2, "label": "B"}, {"id": 3, "label": "C"}],
        edges=[{"from": 1, "to": 2}, {"from": 2, "to": 3}],
        sizing_mode="stretch_both",
    )
    return pn.Column(
        vis,
        width=860,
        height=560,
        styles={"border": "2px solid #0d7377", "border-radius": "8px", "margin": "24px"},
    )


def _factory_uc_json_vis():
    return _import_attr("examples.usecases.jsoneditor_visnetwork", "app")


def _factory_uc_wb_vis():
    return _import_attr("examples.usecases.wunderbaum_visnetwork", "app")


# name -> spec. kind "gif" needs `interact`; kind "shot" is a still.
# `factory` returns the servable; `ready` is an optional selector to await.
ENTRIES: dict[str, dict] = {
    # --- GIFs: visnetwork ---
    "visnetwork_context_menu": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.visnetwork.context_menu", "panel"),
        "interact": _i_vn_context_menu,
    },
    "visnetwork_ctrl_drag_duplicate": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.visnetwork.ctrl_drag_duplicate", "panel"),
        "interact": _i_vn_ctrl_drag,
    },
    "visnetwork_resize": {"kind": "gif", "factory": _factory_resize, "interact": _i_vn_resize},
    "visnetwork_tooltip": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.visnetwork.visnetwork_json_data_min", "vis"),
        "interact": _i_vn_tooltip,
    },
    # --- GIFs: wunderbaum ---
    "checkbox_tree": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.checkbox_tree", "app"),
        "interact": _i_wb_checkbox,
    },
    "context_menu": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.context_menu", "app"),
        "interact": _i_wb_context_menu,
    },
    "lazy_loading": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.lazy_loading", "app"),
        "interact": _i_wb_lazy,
    },
    "virtual_filesystem": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.virtual_filesystem", "app"),
        "interact": _i_wb_dnd,  # real move: cache.dat -> user folder
    },
    # --- GIFs: combined use cases ---
    "usecase_jsoneditor_visnetwork": {
        "kind": "gif",
        "factory": _factory_uc_json_vis,
        "interact": _i_uc_json_vis,
        "viewport": {"width": 1400, "height": 820},
    },
    "usecase_wunderbaum_visnetwork": {
        "kind": "gif",
        "factory": _factory_uc_wb_vis,
        "interact": _i_uc_wb_vis,
        "viewport": {"width": 1280, "height": 720},
    },
    # --- Screenshots ---
    "jsoneditor": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.jsoneditor.jsoneditor_panelini_min", "app"),
        "viewport": {"width": 1100, "height": 760},
        "global_sizing": "stretch_width",
    },
    "jsoneditor_pydantic": {
        "kind": "shot",
        "factory": _factory_jsoneditor_pydantic,
        "viewport": {"width": 1200, "height": 820},
        "global_sizing": "stretch_width",
    },
    "visnetwork": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.visnetwork.visnetwork_panelini_min", "app"),
        "ready": ".vis-network canvas",
    },
    "graph_detail_tool": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.visnetwork.graph_detail_tool", "tool"),
        "interact": _i_gdt,
        "viewport": {"width": 1440, "height": 860},
    },
    "wunderbaum_panel_min": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.wunderbaum_panel_min", "tree"),
        "ready": ".wb-row",
    },
    "wunderbaum_panelini_min": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.wunderbaum_panelini_min", "app"),
        "ready": ".wb-row",
    },
    "wunderbaum_table_min": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.wunderbaum_table_min", "tree"),
        "ready": ".wb-row",
    },
    "dag_projection": {
        "kind": "shot",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.dag_projection", "app"),
        "ready": ".wb-row",
    },
    "incremental_tree_demo": {
        "kind": "gif",
        "factory": lambda: _import_attr("examples.panels.wunderbaum.incremental_tree_demo", "app"),
        "interact": _i_wb_incremental,
    },
}


def _run(entry: dict, page: Page, served: object, name: str) -> tuple[Path, str]:
    """Return (path, note). Falls back from gif to shot if the interaction fails."""
    if entry["kind"] == "gif":
        page.evaluate(_CURSOR_JS)
        frames: list[bytes] = []
        durations: list[int] = []

        def shot(duration_ms: int = 800) -> None:
            frames.append(page.screenshot())
            durations.append(duration_ms)

        try:
            entry["interact"](page, shot, served)
        except Exception as exc:
            out = SHOT_DIR / f"{name}.png"
            out.parent.mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(out))
            return out, f"gif failed ({type(exc).__name__}), saved still"
        out = GIF_DIR / f"{name}.gif"
        n = _save_gif(frames, durations, out)
        return out, f"gif, {n} frames"

    out = SHOT_DIR / f"{name}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(out))
    return out, "shot"


def generate(name: str, browser) -> tuple[Path, str]:
    entry = ENTRIES[name]
    # Optional default sizing_mode (set before the components are built, reset
    # after so it does not bleed into other captures). Mirrors how some examples
    # call pn.extension(sizing_mode="stretch_width") when served standalone.
    prev_sizing = pn.config.sizing_mode
    if entry.get("global_sizing"):
        pn.config.sizing_mode = entry["global_sizing"]
    try:
        served = entry["factory"]()
        port = free_port()
        server = pn.serve(served, port=port, threaded=True, show=False)
        time.sleep(0.4)
        try:
            viewport = entry.get("viewport", VIEWPORT)
            context = browser.new_context(viewport=dict(viewport), device_scale_factor=1)
            page = context.new_page()
            page.goto(f"http://localhost:{port}")
            with contextlib.suppress(Exception):
                page.wait_for_load_state("networkidle", timeout=8000)
            if entry.get("ready"):
                with contextlib.suppress(Exception):
                    page.locator(entry["ready"]).first.wait_for(state="visible", timeout=8000)
            time.sleep(SETTLE)
            result = _run(entry, page, served, name)
            context.close()
            return result
        finally:
            with contextlib.suppress(RuntimeError):
                server.stop()
    finally:
        pn.config.sizing_mode = prev_sizing


def main(names: list[str]) -> None:
    names = names or list(ENTRIES)
    unknown = [n for n in names if n not in ENTRIES]
    if unknown:
        msg = f"Unknown example(s): {unknown}. Known: {list(ENTRIES)}"
        raise SystemExit(msg)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            for name in names:
                try:
                    out, note = generate(name, browser)
                    size_kb = out.stat().st_size / 1024
                    print(f"[ok] {name} -> {out.relative_to(REPO_ROOT)} ({note}, {size_kb:.0f} kB)")
                except Exception as exc:
                    print(f"[FAIL] {name}: {type(exc).__name__}: {exc}")
        finally:
            browser.close()


if __name__ == "__main__":
    main(sys.argv[1:])
