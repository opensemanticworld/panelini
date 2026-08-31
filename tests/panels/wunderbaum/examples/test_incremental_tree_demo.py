# pytest test_incremental_tree_demo.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.incremental_tree_demo import SEQUENCE, app
from panelini.testing import stop_server, wb_wait


@pytest.mark.media(role="feature", capture="gif")
def test_incremental_build(page: Page, port):
    """Stepping through the playbook builds the project tree node by node."""
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    wb_wait(page)
    assert page.locator("text=Next Step").is_visible()

    step_btn = page.locator("button:has-text('Next Step')")
    box = step_btn.bounding_box()
    assert box is not None
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=20)

    for step in SEQUENCE:  # add nodes, rename, move -> full structure
        step_btn.click()
        # Every step sets the status text before executing its actions, in the
        # same synchronous callback - waiting for it confirms this step's
        # actions have already been applied server-side. status is always a
        # str (only "actions" holds a list); str() narrows ty's inferred
        # union of all SEQUENCE dict value types.
        page.get_by_text(str(step["status"])).wait_for()

    # The playbook builds ~12 nodes (files/folders across src, models, tests).
    assert page.locator(".wb-row").count() >= 8

    stop_server(server)
