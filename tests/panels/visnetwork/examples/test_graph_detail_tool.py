import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.graph_detail_tool import tool
from panelini.testing import node_dom_pos


@pytest.mark.media(role="overview", capture="gif", viewport=(1440, 860))
def test_click_node_shows_details(page: Page, port):
    """Clicking a node fills the Details tab with its Node ID heading."""
    # GraphDetailTool duck-types as a Viewer (has __panel__) but does not
    # subclass panel.viewable.Viewer, so it does not satisfy serve()'s
    # TViewableFuncOrPath union. Fixing the base class lives in src/, out of
    # scope here.
    server = pn.serve(tool, port=port, threaded=True, show=False)  # ty: ignore[invalid-argument-type]
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
