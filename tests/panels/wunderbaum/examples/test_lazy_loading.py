# pytest test_lazy_loading.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.wunderbaum.lazy_loading import app, tree


def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)

    assert len(tree.source) == 3
    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    # Tree rows must be visible (at least 3 root nodes)
    rows = page.locator(".wb-row")
    assert rows.count() >= 3, f"Expected >= 3 .wb-row elements, got {rows.count()}"

    server.stop()
