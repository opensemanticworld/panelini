# pip install panel pytest pytest-playwright
# playwright install
# pytest test_device_hierarchy.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.device_hierarchy import edges, nodes, options
from panelini.panels.visnetwork import VisNetwork
from panelini.testing import stop_server


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    vis = VisNetwork(nodes=nodes, edges=edges, options=options)

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    # Large hierarchical graph draws slowly; give it extra time to lay out.
    canvas = page.locator(".vis-network canvas").first
    canvas.wait_for(state="visible", timeout=10000)
    time.sleep(6)

    # Verify the VisNetwork component has the expected nodes and edges
    assert vis.nodes == nodes
    assert vis.edges == edges

    # Check that the vis-network canvas is rendered
    assert canvas.is_visible()

    stop_server(server)
