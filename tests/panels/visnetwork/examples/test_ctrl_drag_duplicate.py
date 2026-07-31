# pip install panel pytest pytest-playwright
# playwright install
# pytest test_ctrl_drag_duplicate.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.ctrl_drag_duplicate import demo, panel
from panelini.testing import node_dom_pos


def test_component(page: Page, port):
    """The demo renders, seeds its graph, and wires the duplication callback."""
    url = f"http://localhost:{port}"

    server = pn.serve(panel, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # Three seed nodes, two seed edges
    assert len(demo.vis.nodes) == 3
    assert len(demo.vis.edges) == 2

    # Ctrl+drag duplication callback is wired
    assert demo.vis._nodes_duplicated_callback is not None

    # Canvas renders and the post-processing control is present
    assert page.locator(".vis-network canvas").first.is_visible()
    assert page.locator("text=Enable Post-Processing").is_visible()

    server.stop()


# Open the clip after the graph has fitted (a ResizeObserver frames it ~5s in).
@pytest.mark.media(role="feature", capture="gif@5.2")
def test_ctrl_drag_duplicates(page: Page, port):
    """Ctrl+dragging a node duplicates it, adding a node to the graph."""
    server = pn.serve(panel, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    time.sleep(3)  # let the page load + graph draw (load is reliably under 3s)
    # Physics is disabled, so vis-network draws at 1:1 (zoomed in); fit without
    # animation so the fitted view is in place immediately (default fit animates
    # over ~1-2s, which would leave the clip opening on the zoomed state).
    page.locator(".network-canvas").first.evaluate("el => el._visNetwork && el._visNetwork.fit({animation: false})")
    time.sleep(1)  # fitted graph is static from ~4s
    before = len(demo.vis.nodes)
    x, y = node_dom_pos(page, 1)
    page.mouse.move(x, y)
    page.keyboard.down("Control")
    page.mouse.down()
    page.mouse.move(x + 190, y + 120)
    page.mouse.up()
    page.keyboard.up("Control")
    time.sleep(1.2)
    assert len(demo.vis.nodes) > before
    server.stop()
