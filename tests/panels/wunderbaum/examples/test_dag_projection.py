# pytest test_dag_projection.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.wunderbaum.dag_projection import app, tree


def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)

    assert len(tree.source) > 0
    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    # Column headers must be visible
    header = page.locator(".wb-header")
    assert header.count() > 0, "No .wb-header: treegrid did not render"

    # Tree rows must be visible
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row elements: tree did not render"

    server.stop()
