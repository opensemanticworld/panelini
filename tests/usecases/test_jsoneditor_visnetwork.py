import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.usecases.jsoneditor_visnetwork import app, visnetwork
from panelini.testing import node_dom_pos, stop_server, vn_wait, wait_for_port, wait_until


def settled_node_pos(page: Page, node_id: int, timeout: float = 15.0) -> tuple[float, float]:
    """Position of a node once it has held still for 0.5 s.

    The graph runs physics, so nodes keep moving after the canvas appears and a
    click at an early position can miss. Gives up after *timeout* and returns where
    the node is, so a layout that never fully rests cannot hang the test.
    """
    deadline = time.monotonic() + timeout
    last, still = None, 0
    pos = node_dom_pos(page, node_id)
    while time.monotonic() < deadline:
        pos = node_dom_pos(page, node_id)
        still = still + 1 if last and abs(pos[0] - last[0]) < 1 and abs(pos[1] - last[1]) < 1 else 0
        if still >= 5:
            break
        last = pos
        time.sleep(0.1)
    return pos


@pytest.mark.media(role="overview", capture="gif", viewport=(1400, 820))
def test_click_node_edit_name(page: Page, port):
    server = pn.serve(app, port=port, threaded=True, show=False)
    wait_for_port(port)
    page.goto(f"http://localhost:{port}")
    vn_wait(page)
    x, y = settled_node_pos(page, 0)  # Alice
    page.mouse.click(x, y)  # select -> form edits this node
    name = page.locator("#root\\[name\\]").first
    # The form field exists before selection; wait for the round trip that
    # loads the clicked node's data into it (value starts empty/stale).
    wait_until(lambda: name.input_value() == "Alice")
    name.click()
    name.fill("Peter")
    page.locator('[for="root[name]"]').first.click()  # blur -> commit -> graph relabels
    wait_until(lambda: visnetwork.nodes[0].get("label") == "Peter")
    stop_server(server)
