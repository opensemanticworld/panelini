# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_resize.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from panelini.panels.visnetwork import VisNetwork


def test_canvas_resizes_with_viewport(page: Page, port):
    """A stretch_both VisNetwork canvas follows its container when the viewport changes.

    Regression guard for the ResizeObserver wiring (PR #19 sizing fixes): when the
    container shrinks, the vis-network canvas must shrink with it.
    """
    url = f"http://localhost:{port}"

    vis = VisNetwork(
        nodes=[{"id": 1, "label": "A"}, {"id": 2, "label": "B"}],
        edges=[{"from": 1, "to": 2}],
        sizing_mode="stretch_both",
    )
    assert vis.sizing_mode == "stretch_both"

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.set_viewport_size({"width": 1400, "height": 900})
    page.goto(url)
    time.sleep(3)  # wait for page + network to render

    canvas = page.locator(".vis-network canvas").first
    canvas.wait_for(state="visible", timeout=5000)
    wide = canvas.bounding_box()

    # Shrink the viewport; the ResizeObserver should resize the canvas.
    page.set_viewport_size({"width": 700, "height": 900})
    time.sleep(2)  # allow ResizeObserver -> canvas resize -> redraw
    narrow = canvas.bounding_box()

    assert narrow["width"] < wide["width"] - 50, (
        f"canvas did not shrink with the viewport: {wide['width']} -> {narrow['width']}"
    )

    server.stop()
