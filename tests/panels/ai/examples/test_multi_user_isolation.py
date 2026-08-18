"""Playwright test: each browser session gets its own app instance.

Served via the ``create_app`` factory, two independent browser contexts
(two users with separate cookie jars) must not share chat state. Regression
guard for the shared module-level ``app`` pattern, where every browser saw
the same ChatInterface and conversation history.
"""

import importlib
import time

import panel as pn
import pytest

_PORT = 6350


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the chat_min example through its per-session factory."""
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_min"))
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT
        server.stop()


def _open_page(browser, port):
    """Open a fresh browser context (own cookie jar) on the served app."""
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Hello! 👋").first.wait_for()
    return context, page


def test_sessions_are_isolated(browser, panel_server):
    """Clearing the chat in one browser context must not affect another."""
    _, port = panel_server
    context_a, page_a = _open_page(browser, port)
    context_b, page_b = _open_page(browser, port)
    try:
        # User A clears their chat (the button lives in the collapsed sidebar).
        page_a.locator(".left-navbar-button").first.click()
        clear_button = page_a.locator("button:has-text('Clear Chat')")
        clear_button.wait_for()
        clear_button.click()
        page_a.locator("text=Chat and conversation history cleared").first.wait_for()

        # Give any hypothetical cross-session sync a moment before the
        # negative assertion; with per-session instances nothing propagates.
        time.sleep(0.5)

        # User B's session is untouched: welcome intact, no cleared notice.
        assert page_b.locator("text=Hello! 👋").first.is_visible()
        assert page_b.locator("text=Chat and conversation history cleared").count() == 0
    finally:
        context_a.close()
        context_b.close()
