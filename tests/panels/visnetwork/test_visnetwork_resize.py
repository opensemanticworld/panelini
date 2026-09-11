# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_resize.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.visnetwork import VisNetwork
from panelini.testing import stop_server, vn_wait, wait_until


# The recorder fixes the video size to this viewport, so it must match the wide
# state below; otherwise the shrink is letterboxed and the clip records blank.
@pytest.mark.media(role="feature", capture="gif", viewport=(1400, 900))
def test_canvas_resizes_with_viewport(page: Page, port):
    """A stretch_both VisNetwork canvas follows its container when the viewport changes.

    Regression guard for the ResizeObserver wiring (PR #19 sizing fixes): when the
    container shrinks, the vis-network canvas must shrink with it.
    """
    url = f"http://localhost:{port}"

    # Sized up so the wide state clears the recorder's blank-frame ink floor;
    # at the default size the pre-shrink frames are trimmed and the clip is static.
    vis = VisNetwork(
        nodes=[{"id": 1, "label": "A", "size": 40}, {"id": 2, "label": "B", "size": 40}],
        edges=[{"from": 1, "to": 2}],
        sizing_mode="stretch_both",
    )
    assert vis.sizing_mode == "stretch_both"

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.set_viewport_size({"width": 1400, "height": 900})
    page.goto(url)
    vn_wait(page)
    time.sleep(1.5)  # let physics settle so the A-B pair is drawn before we shrink

    canvas = page.locator(".vis-network canvas").first
    wide = canvas.bounding_box()
    assert wide is not None

    # Shrink the viewport; the ResizeObserver should resize the canvas.
    page.set_viewport_size({"width": 700, "height": 900})
    wait_until(lambda: (canvas.bounding_box() or {"width": wide["width"]})["width"] < wide["width"] - 50)
    narrow = canvas.bounding_box()
    time.sleep(1.5)  # hold on the shrunk canvas

    assert narrow is not None
    assert narrow["width"] < wide["width"] - 50, (
        f"canvas did not shrink with the viewport: {wide['width']} -> {narrow['width']}"
    )

    stop_server(server)
