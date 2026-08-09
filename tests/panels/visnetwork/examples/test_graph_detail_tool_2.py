# pip install panel pytest pytest-playwright
# playwright install
# pytest test_graph_detail_tool_2.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.graph_detail_tool_2 import edges, nodes
from panelini.panels.visnetwork import GraphDetailTool


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    tool = GraphDetailTool(nodes=nodes, edges=edges)
    server = pn.serve(tool, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)  # wait for the graph and detail pane to render

    assert page.locator(".vis-network canvas").first.is_visible()

    server.stop()
