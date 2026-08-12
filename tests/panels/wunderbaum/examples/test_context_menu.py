# pytest test_context_menu.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.context_menu import app, status, tree
from panelini.testing import wait_until, wb_title_center, wb_wait


@pytest.mark.media(role="feature", capture="gif")
def test_context_menu_add_child(page: Page, port):
    """Right-click a node, then 'Add Child' via the context menu adds a node."""
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    wb_wait(page)
    assert page.locator(".wunderbaum-wrapper").first.is_visible()
    assert len(tree.source) == 1
    rows_before = page.locator(".wb-row").count()

    # Glide to the "src" folder and open its context menu.
    tx, ty = wb_title_center(page, "src")
    page.mouse.move(tx, ty, steps=20)
    page.mouse.click(tx, ty, button="right")
    menu = page.locator(".wb-context-menu")
    menu.wait_for(state="visible", timeout=5000)

    item = page.locator(".wb-context-menu-item", has_text="Add Child")
    ibox = item.bounding_box()
    assert ibox is not None
    page.mouse.move(ibox["x"] + ibox["width"] / 2, ibox["y"] + ibox["height"] / 2, steps=10)
    item.click()
    wait_until(lambda: page.locator(".wb-row").count() > rows_before)

    # A child was added under "src" and the status reflects it.
    assert "Added" in status.object

    server.stop()
