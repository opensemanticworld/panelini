# pytest test_incremental_tree_demo.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.incremental_tree_demo import SEQUENCE, app
from panelini.testing import wb_wait


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
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=20)

    for _ in range(len(SEQUENCE)):  # add nodes, rename, move -> full structure
        step_btn.click()
        time.sleep(0.7)

    # The playbook builds ~12 nodes (files/folders across src, models, tests).
    assert page.locator(".wb-row").count() >= 8

    server.stop()
