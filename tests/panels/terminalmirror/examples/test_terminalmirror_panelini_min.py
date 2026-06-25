# pip install panel pytest pytest-playwright
# playwright install
# pytest test_terminalmirror_panelini_min.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.terminalmirror.terminalmirror_panelini_min import app, terminalmirror_panel


def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # The terminal widget (xterm.js) is rendered within the Panelini app.
    assert page.locator(".xterm").first.is_visible()

    # Check that the Panelini Card title is present.
    assert page.locator("text=Terminal Mirror").first.is_visible()

    # Click the button: output should be mirrored into the terminal widget.
    page.locator(".print_btn button").first.click()
    time.sleep(1)
    assert "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output

    # Collapsing and re-expanding the card must not lose the mirrored output:
    # the buffer is replayed via redraw() on expand.
    clears_before = terminalmirror_panel.terminal._terminal._clears
    header = page.locator(".card-header").first
    header.click()  # collapse
    time.sleep(1)
    header.click()  # expand
    time.sleep(2)
    assert terminalmirror_panel.terminal._terminal._clears == clears_before + 1
    assert "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output
    assert page.locator(".xterm").first.is_visible()

    server.stop()
