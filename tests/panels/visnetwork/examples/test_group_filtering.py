# pip install panel pytest pytest-playwright
# playwright install
# pytest test_group_filtering.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.group_filtering import edges, nodes, options
from panelini.panels.visnetwork import VisNetwork
from panelini.testing import stop_server


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    vis = VisNetwork(nodes=nodes, edges=edges, options=options)

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(7)  # wait for physics stabilization to settle the layout

    # Verify the VisNetwork component has the expected nodes and edges
    assert vis.nodes == nodes
    assert vis.edges == edges
    assert len(vis.nodes) == 14
    assert len(vis.edges) == 14

    # Check that the vis-network canvas is rendered
    assert page.locator(".vis-network canvas").first.is_visible()

    stop_server(server)
