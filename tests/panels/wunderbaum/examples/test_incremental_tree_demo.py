# pytest test_incremental_tree_demo.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.wunderbaum.incremental_tree_demo import app


def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)

    assert page.locator(".wunderbaum-wrapper").first.is_visible()
    assert page.locator("text=Next Step").is_visible()
    assert page.locator("text=Reset").is_visible()

    # Click Next Step to add a node, then verify tree renders
    page.locator("button:has-text('Next Step')").click()
    time.sleep(1)

    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row after step — tree did not render"

    server.stop()
