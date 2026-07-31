import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.usecases.jsoneditor_visnetwork import app, visnetwork
from panelini.testing import node_dom_pos


@pytest.mark.media(role="overview", capture="gif", viewport=(1400, 820))
def test_click_node_edit_name(page: Page, port):
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    time.sleep(3)
    assert page.locator(".vis-network canvas").first.is_visible()
    x, y = node_dom_pos(page, 0)  # Alice
    page.mouse.click(x, y)  # select -> form edits this node
    time.sleep(1.2)
    name = page.locator("#root\\[name\\]").first
    name.click()
    name.fill("Peter")
    page.locator('[for="root[name]"]').first.click()  # blur -> commit -> graph relabels
    time.sleep(1.3)
    assert visnetwork.nodes[0].get("label") == "Peter"
    server.stop()
