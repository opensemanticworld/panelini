# pip install panel pytest pytest-playwright
# playwright install
# pytest test_context_menu.py --headed --slowmo 1000

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.context_menu import demo, panel
from panelini.testing import node_dom_pos, vn_wait, wait_until

_PORT = 6520
_ORIGINAL_NODES = copy.deepcopy(demo.vis.nodes)
_ORIGINAL_EDGES = copy.deepcopy(demo.vis.edges)
_ORIGINAL_NEXT_ID = demo.next_id


@pytest.fixture(scope="module")
def panel_server():
    """Serve the context-menu demo once for the whole module."""
    server = pn.serve(panel, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server.

    ``demo`` is a module-level singleton mutated by the add-child test, so
    its nodes/edges/id counter are reset here before navigating.
    """
    demo.vis.nodes = copy.deepcopy(_ORIGINAL_NODES)
    demo.vis.edges = copy.deepcopy(_ORIGINAL_EDGES)
    demo.next_id = _ORIGINAL_NEXT_ID
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    vn_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def test_component(ready_page: Page):
    """The demo renders and its graph carries the expected data."""
    page = ready_page

    # Three seed nodes, two seed edges
    assert len(demo.vis.nodes) == 3
    assert len(demo.vis.edges) == 2

    # Context menu callback is wired
    assert demo.vis._context_menu_callback is not None

    # Canvas renders
    assert page.locator(".vis-network canvas").first.is_visible()


@pytest.mark.media(role="feature", capture="gif")
def test_right_click_adds_child(ready_page: Page):
    """Right-clicking a node and choosing "Add Child" appends a child node."""
    page = ready_page

    # "Root Folder" (id 1) is fixed at network coords (0, 0); map to DOM pixels.
    x, y = node_dom_pos(page, 1)
    page.mouse.click(x, y, button="right")

    menu = page.locator(".vn-context-menu")
    menu.wait_for(state="visible", timeout=5000)
    assert "Add Child" in menu.inner_text()

    before = len(demo.vis.nodes)
    menu.locator(".vn-context-menu-item", has_text="Add Child").click()
    wait_until(lambda: len(demo.vis.nodes) == before + 1)
