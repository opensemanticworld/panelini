# pip install panel pytest pytest-playwright
# playwright install
# pytest test_terminalmirror_panelini_min.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.terminalmirror.terminalmirror_panelini_min import app, terminalmirror_panel
from panelini.testing import wait_until


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
    wait_until(lambda: "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output)

    # Collapsing and re-expanding the card must not lose the mirrored output:
    # the buffer is replayed via redraw() on expand.
    clears_before = terminalmirror_panel.terminal._terminal._clears
    header = page.locator(".card-header").first
    header.click()  # collapse
    page.locator(".xterm").first.wait_for(state="hidden")
    header.click()  # expand
    page.locator(".xterm").first.wait_for(state="visible")
    # redraw() clears first, then rewrites the buffer - the clear count can
    # tick up slightly before the output text is restored, so wait on both.
    # A longer timeout than the default: this round trip (collapse, expand,
    # clear, rewrite) was observed to occasionally exceed 2s on loaded
    # shared CI runners (e.g. 12 concurrent OS/Python matrix jobs), despite
    # never doing so across repeated local runs.
    wait_until(
        lambda: terminalmirror_panel.terminal._terminal._clears == clears_before + 1
        and "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output,
        timeout=5.0,
    )
    assert "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output

    server.stop()
