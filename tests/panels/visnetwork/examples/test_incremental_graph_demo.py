# pytest test_incremental_graph_demo.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.incremental_graph_demo import SEQUENCE, app


@pytest.mark.media(role="feature", capture="gif@2.8")
def test_incremental_build(page: Page, port):
    """Stepping through the playbook builds the knowledge graph node by node."""
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    time.sleep(3)
    assert page.locator("text=Next Step").is_visible()

    step_btn = page.locator("button:has-text('Next Step')")
    box = step_btn.bounding_box()
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=20)

    steps = min(5, len(SEQUENCE))
    for _ in range(steps):  # addNode / addEdge actions grow the graph
        step_btn.click()
        time.sleep(0.7)

    canvas = page.locator(".vis-network canvas").first
    assert canvas.is_visible()

    # Query the live vis-network instance for the count of drawn nodes.
    node_count = page.locator(".network-canvas").first.evaluate(
        "el => Object.keys(el._visNetwork.getPositions()).length"
    )
    assert node_count > 0

    server.stop()
