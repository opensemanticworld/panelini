# pytest test_wunderbaum_panel_min.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.wunderbaum_panel_min import source, tree
from panelini.testing import wb_wait


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(tree, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    wb_wait(page)

    assert tree.source == source
    assert len(tree.source) == 3

    # Tree wrapper is rendered
    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    # Actual tree rows are visible (not just empty container)
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row elements - tree did not render"

    server.stop()
