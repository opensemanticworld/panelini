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
    # redraw() clears then rewrites the buffer in one synchronous callback
    # (both change together, see TerminalMirror.redraw()), so the real
    # bottleneck is the browser -> server websocket round trip for the
    # "expand" click landing and the watcher firing, not a gap between the
    # two. A generous timeout: on CI, that round trip was observed to
    # occasionally exceed 2s (ubuntu/macOS) and then 5s (macOS specifically)
    # under a loaded 12-job concurrent OS/Python matrix, despite never doing
    # so across repeated local runs - macOS GitHub-hosted runners are known
    # to be considerably slower/more resource-constrained than ubuntu/windows.
    wait_until(
        lambda: terminalmirror_panel.terminal._terminal._clears == clears_before + 1
        and "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output,
        timeout=15.0,
    )
    assert "Hello from TerminalMirror!" in terminalmirror_panel.terminal._terminal.output

    server.stop()
