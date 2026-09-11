# pip install panel pytest pytest-playwright
# playwright install
# pytest test_graph_detail_tool_2.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.graph_detail_tool_2 import edges, nodes
from panelini.panels.visnetwork import GraphDetailTool
from panelini.testing import node_dom_pos, stop_server, vn_wait


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    tool = GraphDetailTool(nodes=nodes, edges=edges)
    server = pn.serve(tool, port=port, threaded=True, show=False)  # ty: ignore[invalid-argument-type]
    time.sleep(0.2)

    page.goto(url)
    vn_wait(page)
    time.sleep(1.5)  # let physics settle before reading a node position

    assert page.locator(".vis-network canvas").first.is_visible()

    # Select a node and open Details: the bare graph is two unlabelled-looking
    # drop targets, so the shot needs the detail pane populated to show anything.
    x, y = node_dom_pos(page, 1)
    page.mouse.click(x, y)
    page.locator(".bk-tab", has_text="Details").first.click()
    page.get_by_text("Node ID: 1").first.wait_for()

    stop_server(server)
