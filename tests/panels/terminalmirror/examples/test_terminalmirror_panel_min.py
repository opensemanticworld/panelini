# pip install panel pytest pytest-playwright
# playwright install
# pytest test_terminalmirror_panel_min.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.terminalmirror.terminalmirror_panel_min import app, terminal
from panelini.testing import stop_server


@pytest.mark.media(role="feature", capture="screenshot")
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # The terminal widget (xterm.js) is rendered in the standalone app.
    assert page.locator(".xterm").first.is_visible()

    # Click the button: output should be mirrored into the terminal widget.
    page.locator(".print_btn button").first.click()
    time.sleep(1)
    assert "Hello from TerminalMirror!" in terminal._terminal.output

    # The terminal container stays visible after printing.
    assert page.locator(".xterm").first.is_visible()

    stop_server(server)
