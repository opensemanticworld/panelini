"""Playwright UI tests for examples/panels/ai/chat_local_storage.py."""

import importlib
import time
import warnings
from unittest.mock import patch

import panel as pn
import pytest
from bokeh.util.warnings import BokehUserWarning
from playwright.sync_api import Page

from panelini.ai_testing import StubChatModel

_PORT = 6380
_MODULE = "examples.panels.ai.chat_local_storage"


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the example with a stubbed model."""
    config_patch, _ = mock_langchain
    model_patch = patch(
        "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
        return_value=StubChatModel(),
    )
    with warnings.catch_warnings(), config_patch, model_patch:
        # tripwire: any double-attached component fails the suite
        warnings.simplefilter("error", BokehUserWarning)
        module = importlib.reload(importlib.import_module(_MODULE))
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server
        server.stop()


def _open_sidebar(page: Page) -> None:
    page.goto(f"http://localhost:{_PORT}")
    page.locator(".chat-interface textarea").first.wait_for()
    page.locator(".left-navbar-button").first.click()
    page.locator("text=Conversations").first.wait_for()


def _send_message(page: Page, text: str) -> None:
    box = page.locator("textarea:visible").first
    box.click()
    box.fill(text)
    box.press("Enter")
    page.locator("text=simulated reply >> visible=true").first.wait_for(timeout=20000)


def _storage_keys(page: Page) -> list[str]:
    return page.evaluate("Object.keys(window.localStorage).filter(k => k.startsWith('panelini-ai-history:'))")


def test_history_survives_a_page_reload(browser, panel_server):
    """A chat lands in localStorage and replays in a fresh session.

    The reload keeps the context's localStorage and identity cookie; the
    new server session starts empty and hydrates from the browser.
    """
    context = browser.new_context()
    try:
        page = context.new_page()
        _open_sidebar(page)
        _send_message(page, "Remember me in this browser")
        page.locator(".wb-row", has_text="Remember me").first.wait_for()

        # one conversation document is in localStorage
        keys = _storage_keys(page)
        assert len(keys) == 1 and keys[0].startswith("panelini-ai-history:conversation:")

        page.reload()
        page.locator(".chat-interface textarea").first.wait_for()
        page.locator(".left-navbar-button").first.click()
        page.locator("text=Conversations").first.wait_for()

        # the hydrated conversation reappears and replays
        row = page.locator(".wb-row", has_text="Remember me").first
        row.wait_for()
        row.click()
        replayed = page.locator(".chat-interface").locator("text=Remember me in this browser").first
        replayed.wait_for()
        assert replayed.is_visible()
    finally:
        context.close()


def test_history_is_per_browser(browser, panel_server):
    """A second context (own localStorage) starts with no conversations."""
    context = browser.new_context()
    try:
        page = context.new_page()
        _open_sidebar(page)
        page.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
        assert page.locator(".wunderbaum-wrapper:visible").count() == 0
        assert _storage_keys(page) == []
    finally:
        context.close()
