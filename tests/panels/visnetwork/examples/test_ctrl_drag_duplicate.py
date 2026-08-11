# pip install panel pytest pytest-playwright
# playwright install
# pytest test_ctrl_drag_duplicate.py --headed --slowmo 1000

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.ctrl_drag_duplicate import demo, panel
from panelini.testing import node_dom_pos, vn_wait, wait_until

_PORT = 6510
_ORIGINAL_NODES = copy.deepcopy(demo.vis.nodes)
_ORIGINAL_EDGES = copy.deepcopy(demo.vis.edges)


@pytest.fixture(scope="module")
def panel_server():
    """Serve the ctrl-drag-duplicate demo once for the whole module."""
    server = pn.serve(panel, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server.

    ``demo.vis`` is a module-level singleton mutated by the duplicate test,
    so its nodes/edges are reset here before navigating.
    """
    demo.vis.nodes = copy.deepcopy(_ORIGINAL_NODES)
    demo.vis.edges = copy.deepcopy(_ORIGINAL_EDGES)
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    vn_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def test_component(ready_page: Page):
    """The demo renders, seeds its graph, and wires the duplication callback."""
    page = ready_page

    # Three seed nodes, two seed edges
    assert len(demo.vis.nodes) == 3
    assert len(demo.vis.edges) == 2

    # Ctrl+drag duplication callback is wired
    assert demo.vis._nodes_duplicated_callback is not None

    # Canvas renders and the post-processing control is present
    assert page.locator(".vis-network canvas").first.is_visible()
    assert page.locator("text=Enable Post-Processing").is_visible()


# Open the clip after the graph has fitted (a ResizeObserver frames it ~5s in).
@pytest.mark.media(role="feature", capture="gif@5.2")
def test_ctrl_drag_duplicates(ready_page: Page):
    """Ctrl+dragging a node duplicates it, adding a node to the graph."""
    page = ready_page
    # Physics is disabled, so vis-network draws at 1:1 (zoomed in); fit without
    # animation so the fitted view is in place immediately (default fit animates
    # over ~1-2s, which would leave the clip opening on the zoomed state).
    page.locator(".network-canvas").first.evaluate("el => el._visNetwork && el._visNetwork.fit({animation: false})")
    before = len(demo.vis.nodes)
    x, y = node_dom_pos(page, 1)
    page.mouse.move(x, y)
    page.keyboard.down("Control")
    page.mouse.down()
    page.mouse.move(x + 190, y + 120)
    page.mouse.up()
    page.keyboard.up("Control")
    wait_until(lambda: len(demo.vis.nodes) > before)
