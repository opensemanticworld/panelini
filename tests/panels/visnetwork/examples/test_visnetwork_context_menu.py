# pip install panel pytest pytest-playwright
# playwright install
# pytest test_context_menu.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.visnetwork.context_menu import demo, panel
from panelini.testing import node_dom_pos


def test_component(page: Page, port):
    """The demo renders and its graph carries the expected data."""
    url = f"http://localhost:{port}"

    server = pn.serve(panel, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # Three seed nodes, two seed edges
    assert len(demo.vis.nodes) == 3
    assert len(demo.vis.edges) == 2

    # Context menu callback is wired
    assert demo.vis._context_menu_callback is not None

    # Canvas renders
    assert page.locator(".vis-network canvas").first.is_visible()

    server.stop()


def test_right_click_opens_context_menu(page: Page, port):
    """Right-clicking a node with a callback_name_dict shows its context menu."""
    url = f"http://localhost:{port}"

    server = pn.serve(panel, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)

    # "Root Folder" (id 1) is fixed at network coords (0, 0); map to DOM pixels.
    x, y = node_dom_pos(page, 1)
    page.mouse.click(x, y, button="right")

    menu = page.locator(".vn-context-menu")
    menu.wait_for(state="visible", timeout=5000)

    # The Root Folder menu offers "Edit Label"
    assert "Edit Label" in menu.inner_text()

    server.stop()
