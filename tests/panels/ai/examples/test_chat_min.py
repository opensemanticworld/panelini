"""Playwright UI tests for examples/panels/ai/chat_min.py."""

import importlib
import time

import panel as pn
import pytest
from playwright.sync_api import Page

_PORT = 6310


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the real example module with mocked LangChain."""
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_min"))
        server = pn.serve(module.app.servable(), port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT
        server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    """Browser page navigated and ready."""
    _, port = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Hello! 👋").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_chat_min_renders(ready_page: Page):
    """Verify the minimal AI chat example renders its main UI elements."""
    page = ready_page

    # Chat and Preview cards are visible
    assert page.locator("text=Chat").first.is_visible()
    assert page.locator("text=Preview").first.is_visible()

    # Welcome message is shown
    assert page.locator("text=Hello! 👋").first.is_visible()

    # Sidebar: General Setup card is present
    assert page.locator("text=General Setup").first.is_visible()

    # Sidebar: Provider Settings card is present
    assert page.locator("text=Provider Settings").first.is_visible()


def test_chat_min_clear_chat(ready_page: Page):
    """Verify the Clear Chat button works."""
    page = ready_page

    # Welcome message should be visible before clearing
    assert page.locator("text=Hello! 👋").first.is_visible()

    # Click clear chat button
    page.locator("button:has-text('Clear Chat')").click()

    # System message about clearing should appear
    page.locator("text=Chat and conversation history cleared").first.wait_for()
    assert page.locator("text=Chat and conversation history cleared").first.is_visible()
