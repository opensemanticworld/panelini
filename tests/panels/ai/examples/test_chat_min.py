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
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
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

    # Chat and Preview cards are visible. Exact heading match: a plain
    # text=Chat/text=Preview locator also matches unrelated sidebar
    # substrings ("Chat Management", "Update Preview" checkbox label).
    assert page.get_by_role("heading", name="Chat", exact=True).is_visible()
    assert page.get_by_role("heading", name="Preview", exact=True).is_visible()

    # Welcome message is shown
    assert page.locator("text=Hello! 👋").first.is_visible()

    # The left sidebar starts collapsed (Panelini's sidebar_visible defaults
    # to False), so it must be opened before its contents are interactable.
    # ready_page is module-scoped and shared with other tests in this file,
    # so only toggle if it's still closed. Wait for the open transition to
    # finish; is_visible() checks instantaneously and does not auto-wait.
    general_setup = page.locator("text=General Setup").first
    if not general_setup.is_visible():
        page.locator(".left-navbar-button").first.click()
        general_setup.wait_for()

    # Sidebar: General Setup card is present
    assert page.locator("text=General Setup").first.is_visible()

    # Sidebar: Provider Settings card is present
    assert page.locator("text=Provider Settings").first.is_visible()


def test_chat_min_clear_chat(ready_page: Page):
    """Verify the Clear Chat button works."""
    page = ready_page

    # Welcome message should be visible before clearing
    assert page.locator("text=Hello! 👋").first.is_visible()

    # Clear Chat lives in the sidebar's General Setup card, which starts
    # collapsed (Panelini's sidebar_visible defaults to False). ready_page is
    # module-scoped and shared with test_chat_min_renders, which may have
    # already opened it, so only toggle if it's still closed.
    clear_chat_button = page.locator("button:has-text('Clear Chat')")
    if not clear_chat_button.is_visible():
        page.locator(".left-navbar-button").first.click()

    # Click clear chat button
    clear_chat_button.click()

    # System message about clearing should appear
    page.locator("text=Chat and conversation history cleared").first.wait_for()
    assert page.locator("text=Chat and conversation history cleared").first.is_visible()
