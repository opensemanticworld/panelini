# pip install panel pytest pytest-playwright
# playwright install
# pytest test_ctrl_drag_duplicate.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.visnetwork.ctrl_drag_duplicate import demo, panel


def test_component(page: Page, port):
    """The demo renders, seeds its graph, and wires the duplication callback."""
    url = f"http://localhost:{port}"

    server = pn.serve(panel, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # Three seed nodes, two seed edges
    assert len(demo.vis.nodes) == 3
    assert len(demo.vis.edges) == 2

    # Ctrl+drag duplication callback is wired
    assert demo.vis._nodes_duplicated_callback is not None

    # Canvas renders and the post-processing control is present
    assert page.locator(".vis-network canvas").first.is_visible()
    assert page.locator("text=Enable Post-Processing").is_visible()

    server.stop()
