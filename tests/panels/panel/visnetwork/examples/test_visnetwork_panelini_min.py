# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_panelini_min.py --headed --slowmo 1000

import os
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.visnetwork_panelini_min import app, visnetwork_panel


# Skip in CI environments, run locally via command line
@pytest.mark.skipif(os.getenv("CI") is not None, reason="Playwright tests do not run in CI")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # Verify the VisNetwork component has the expected nodes and edges
    assert len(visnetwork_panel.nodes) == 3
    assert len(visnetwork_panel.edges) == 2

    # Check that the vis-network canvas is rendered within the Panelini app
    assert page.locator(".vis-network canvas").first.is_visible()

    # Check that the Panelini Card title is present
    assert page.locator("text=VisNetwork").is_visible()

    server.stop()
