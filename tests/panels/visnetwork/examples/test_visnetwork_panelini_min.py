# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_panelini_min.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.visnetwork_panelini_min import app, visnetwork_panel


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    # GridStack sizes late in the shadow DOM; wait for the graph to draw and fit
    # so the screenshot is not an empty card.
    canvas = page.locator(".vis-network canvas").first
    canvas.wait_for(state="visible", timeout=10000)
    time.sleep(5)

    # Verify the VisNetwork component has the expected nodes and edges
    assert len(visnetwork_panel.nodes) == 3
    assert len(visnetwork_panel.edges) == 2

    # Check that the vis-network canvas is rendered within the Panelini app
    assert canvas.is_visible()

    # Check that the Panelini Card title is present
    assert page.locator("text=VisNetwork").is_visible()

    server.stop()
