# pytest test_wunderbaum_table_min.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.wunderbaum.wunderbaum_table_min import tree


def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(tree, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)

    assert len(tree.source) == 3
    assert len(tree.columns) == 4

    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    # Column headers must be visible
    header = page.locator(".wb-header")
    assert header.count() > 0, "No .wb-header: treegrid did not render"

    # Tree rows must be visible
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row elements: tree did not render"

    server.stop()
