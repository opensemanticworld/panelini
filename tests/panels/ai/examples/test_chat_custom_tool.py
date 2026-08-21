"""Playwright UI tests for examples/panels/ai/chat_custom_tool.py."""

import importlib
import time

import panel as pn
import pytest
from playwright.sync_api import Page

_PORT = 6320


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the real custom-tool example module with mocked LangChain."""
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_custom_tool"))
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
    # no welcome message any more: the prompt box is the ready signal
    page.locator(".chat-interface textarea").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_custom_tool_renders(ready_page: Page):
    """Verify the custom-tool chat example renders its main UI elements."""
    page = ready_page

    # Chat and Preview cards are visible. Exact heading match: a plain
    # text=Chat/text=Preview locator also matches unrelated substrings
    # (the sidebar's "Update Preview" checkbox label).
    assert page.get_by_role("heading", name="Chat", exact=True).is_visible()
    assert page.get_by_role("heading", name="Preview", exact=True).is_visible()

    # The chat feed is ready for input
    assert page.locator(".chat-interface textarea").first.is_visible()


def test_local_storage_tool_toggle(ready_page: Page):
    """Clicking the Local Storage checkbox in the sidebar sends a system message."""
    page = ready_page

    # The left sidebar starts collapsed (Panelini's sidebar_visible defaults to
    # False), so it must be opened before its contents are interactable.
    page.locator(".left-navbar-button").first.click()
    # Conversations is the active tab; the tool toggles live under setup.
    page.locator(".bk-tab", has_text="⚙️").first.click()
    page.locator("text=Basic Tools").first.wait_for()

    # Click the actual <input> inside the Bokeh Checkbox shadow DOM.
    # get_by_text("Local Storage") finds the .bk-label sibling, not the input.
    page.locator(".bk-Checkbox", has_text="Local Storage").locator("input[type=checkbox]").click()

    # System message confirming the tool update should appear in the chat
    page.locator("text=Tools updated").first.wait_for(timeout=5000)
    assert page.locator("text=Tools updated").first.is_visible()
    assert page.locator("text=1 tool(s) now available").first.is_visible()
