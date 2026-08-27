import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.usecases.jsoneditor_visnetwork import app, visnetwork
from panelini.testing import node_dom_pos, vn_wait, wait_until


@pytest.mark.media(role="overview", capture="gif", viewport=(1400, 820))
def test_click_node_edit_name(page: Page, port):
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    vn_wait(page)
    x, y = node_dom_pos(page, 0)  # Alice
    page.mouse.click(x, y)  # select -> form edits this node
    name = page.locator("#root\\[name\\]").first
    # The form field exists before selection; wait for the round trip that
    # loads the clicked node's data into it (value starts empty/stale).
    wait_until(lambda: name.input_value() == "Alice")
    name.click()
    name.fill("Peter")
    page.locator('[for="root[name]"]').first.click()  # blur -> commit -> graph relabels
    wait_until(lambda: visnetwork.nodes[0].get("label") == "Peter")
    server.stop()
