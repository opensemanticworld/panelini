# pip install panel pytest pytest-playwright
# playwright install
# pytest test_visnetwork_json_data.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.visnetwork.visnetwork_json_data_min import nodes, vis


def test_json_data_tooltip(page: Page, port):
    """Test that hovering over a node with json_data shows a YAML tooltip."""
    url = f"http://localhost:{port}"

    server = pn.serve(vis, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

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

    # To hover precisely on the node we need its pixel position.
    # The node is at (0,0) in vis-network coordinates, but that doesn't map to the
    # container's pixel center because vis-network applies a view transform (fit/zoom).
    # The component lives inside a shadow DOM, so page.evaluate() can't reach it.
    # Playwright's locator() pierces shadow DOM, so we use locator.evaluate() to call
    # vis-network's canvasToDOM() API on the container element directly.

    # 1. Get the .network-canvas container's bounding box in page coordinates
    network_canvas = page.locator(".network-canvas").first
    container_box = network_canvas.bounding_box()

    # 2. Use canvasToDOM() to convert network coords → container-relative pixel coords
    node_pos = network_canvas.evaluate("""
        (el) => {
            const network = el._visNetwork;
            const positions = network.getPositions(['n1']);
            return network.canvasToDOM(positions['n1']);
        }
    """)

    # 3. Move mouse to the node's exact page-level position
    page.mouse.move(container_box["x"] + node_pos["x"], container_box["y"] + node_pos["y"])

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
