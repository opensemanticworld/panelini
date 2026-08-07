# pip install panel pytest pytest-playwright
# playwright install
# pytest test_terminalmirror_panelini_min.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.terminalmirror.terminalmirror_panelini_min import app
from panelini.testing import xterm_wait_for_text


@pytest.mark.media(role="feature", capture="gif")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    # The terminal widget (xterm.js) is rendered within the Panelini app.
    page.locator(".xterm").first.wait_for()

    # Check that the Panelini Card title is present.
    assert page.locator("text=Terminal Mirror").first.is_visible()

    # Click the button: output should be mirrored into the terminal widget.
    page.locator(".print_btn button").first.click()
    xterm_wait_for_text(page, "Hello from TerminalMirror!")

    # Collapsing and re-expanding the card must not lose the mirrored output
    # (replayed via redraw() on expand). `.xterm` visibility is a client-only
    # toggle and doesn't imply the server has redrawn yet, so check the
    # actual rendered buffer instead of racing it.
    header = page.locator(".card-header").first
    header.click()  # collapse
    page.locator(".xterm").first.wait_for(state="hidden")
    header.click()  # expand
    page.locator(".xterm").first.wait_for(state="visible")
    xterm_wait_for_text(page, "Hello from TerminalMirror!")

    server.stop()
