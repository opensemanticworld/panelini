# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_json_data.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.visnetwork.visnetwork_json_data_min import nodes, vis
from panelini.testing import node_dom_pos, vn_wait


@pytest.mark.media(role="feature", capture="gif")
def test_json_data_tooltip(page: Page, port):
    """Test that hovering over a node with json_data shows a YAML tooltip."""
    url = f"http://localhost:{port}"

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    vn_wait(page)

    # Inject a visible cursor indicator (Playwright doesn't show the system cursor)
    page.evaluate("""
        const cursor = document.createElement('div');
        cursor.style.cssText = 'width:20px;height:20px;border:2px solid red;border-radius:50%;'
            + 'position:fixed;pointer-events:none;z-index:999999;transform:translate(-50%,-50%);';
        document.body.appendChild(cursor);
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    """)

    # Verify the node was created with json_data
    assert vis.nodes == nodes
    assert len(vis.nodes) == 1
    assert vis.nodes[0]["json_data"]["temperature"] == 25.0

    # Check that the vis-network canvas is rendered
    canvas = page.locator(".vis-network canvas").first
    assert canvas.is_visible()

    # Move the mouse onto node 'n1'. node_dom_pos() resolves the shadow-DOM
    # coordinates via vis-network's canvasToDOM (shared with the media generator).
    x, y = node_dom_pos(page, "n1")
    page.mouse.move(x, y)

    # Wait for the tooltip to appear
    tooltip = page.locator("div.vis-tooltip")
    tooltip.wait_for(state="visible", timeout=5000)

    # Verify tooltip contains expected YAML content
    tooltip_text = tooltip.inner_text()
    assert "temperature" in tooltip_text
    assert "25" in tooltip_text
    assert "unit" in tooltip_text
    assert "celsius" in tooltip_text
    assert "active" in tooltip_text
    assert "true" in tooltip_text

    # Verify tooltip has colored spans (DOM element rendering)
    spans = tooltip.locator("span")
    assert spans.count() > 0, "Tooltip should contain colored <span> elements"

    server.stop()
