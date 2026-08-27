# pip install panel pytest pytest-playwright
# playwright install
# pytest test_images.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.images import edges, nodes
from panelini.panels.visnetwork import VisNetwork


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    vis = VisNetwork(nodes=nodes, edges=edges)

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    canvas = page.locator(".vis-network canvas").first
    canvas.wait_for(state="visible", timeout=15000)

    # The image nodes fetch remote Wikimedia photos; vis-network only paints them once
    # each Image has loaded. Give the downloads time, then force a redraw + fit so the
    # captured frame shows the images rather than the empty placeholders.
    time.sleep(12)  # remote images download
    page.locator(".network-canvas").first.evaluate(
        "el => el._visNetwork && (el._visNetwork.redraw(), el._visNetwork.fit({animation: false}))"
    )
    time.sleep(3)  # let the redraw settle before the frame is captured

    # Verify the VisNetwork component has the expected nodes and edges
    assert vis.nodes == nodes
    assert vis.edges == edges
    assert len(vis.nodes) == 7
    assert len(vis.edges) == 6
    assert canvas.is_visible()

    server.stop()
