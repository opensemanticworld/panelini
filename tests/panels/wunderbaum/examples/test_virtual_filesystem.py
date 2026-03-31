# pytest test_virtual_filesystem.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.virtual_filesystem import app, tree


def _expand_controls(page: Page) -> None:
    """Ensure the Python API Controls card is expanded."""
    card = page.locator("text=Python API Controls")
    card.click()
    time.sleep(0.3)
    btn = page.locator("button:has-text('Add Folder')").first
    if not btn.is_visible():
        card.click()
        time.sleep(0.3)


def test_tree_renders(page: Page, port):
    """Tree renders with rows and column headers."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert len(tree.source) >= 2

    # Column headers visible
    header = page.locator(".wb-header")
    assert header.count() > 0, "No .wb-header — tree did not render"

    # Tree rows visible
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row — tree did not render"

    server.stop()


def test_python_api_add_folder(page: Page, port):
    """Add Folder button creates a new folder."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    _expand_controls(page)
    page.locator("button:has-text('Add Folder')").first.click()
    time.sleep(1)

    assert page.locator(".wb-row:has-text('new_folder')").first.is_visible()

    server.stop()


def test_python_api_add_file(page: Page, port):
    """Add File button creates a new file."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    _expand_controls(page)
    page.locator("button:has-text('Add File')").first.click()
    time.sleep(1)

    assert page.locator(".wb-row:has-text('new_file')").first.is_visible()

    server.stop()


def test_python_api_delete(page: Page, port):
    """Delete removes a node from the tree."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert page.locator(".wb-row:has-text('cache.dat')").first.is_visible()

    tree.remove_node("/tmp/cache.dat")  # noqa: S108
    time.sleep(1)

    assert page.locator(".wb-row:has-text('cache.dat')").count() == 0

    server.stop()


@pytest.mark.xfail(reason="contextmenu event unreliable in shadow DOM via Playwright")
def test_context_menu_visible(page: Page, port):
    """Right-clicking shows context menu."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    row = page.locator(".wb-row").first
    row.click(button="right")
    time.sleep(1)

    menu = page.locator(".wb-context-menu")
    assert menu.is_visible()

    server.stop()
