import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.graph_detail_tool import tool
from panelini.testing import node_dom_pos


@pytest.mark.media(role="overview", capture="gif", viewport=(1440, 860))
def test_click_node_shows_details(page: Page, port):
    """Clicking a node fills the Details tab with its Node ID heading."""
    server = pn.serve(tool, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    time.sleep(3)

    assert page.locator(".vis-network canvas").first.is_visible()

    # Let physics settle so node 1 (Alpha) stays put before we read its position.
    time.sleep(0.6)
    x, y = node_dom_pos(page, 1)  # Alpha
    page.mouse.click(x, y)
    time.sleep(1.4)

    assert page.get_by_text("Node ID: 1").first.is_visible()

    server.stop()
