# pip install panel pytest pytest-playwright
# playwright install
# pytest test_rotating_circles.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.rotating_circles import edges, nodes
from panelini.panels.visnetwork import VisNetwork


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    vis = VisNetwork(nodes=nodes, edges=edges, sizing_mode="stretch_both")

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)  # wait for page to load

    # Verify the VisNetwork component has the expected nodes and edges
    assert vis.nodes == nodes
    assert vis.edges == edges
    assert len(vis.nodes) == 10
    assert len(vis.edges) == 10

    # Check that the vis-network canvas is rendered
    assert page.locator(".vis-network canvas").first.is_visible()

    server.stop()
