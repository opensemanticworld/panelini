"""Docs media for the AI chat examples: a scripted question and answer.

The chat needs an LLM, so the model is replaced with
:class:`panelini.ai_testing.StubChatModel`, which streams a fixed reply. That is the
same stand-in the Pyodide portfolio apps run on, so the recorded clip and the live
player behave identically. Nothing is sent anywhere and no credentials are involved.

These use the standard ``page`` / ``port`` fixtures (not the module-scoped
``ready_page``) so the media plugin records them.
"""

import contextlib
import importlib
import time
from unittest.mock import patch

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.ai_testing import StubChatModel
from panelini.testing import stop_server

_VIEWPORT = (1500, 900)
_QUESTION = "What can panelini do?"


@contextlib.contextmanager
def _served(page, port, mock_langchain, module_name, ready_selector):
    """Serve *module_name* with a stubbed model and open the sidebar, then hand over."""
    config_patch, _ = mock_langchain
    model_patch = patch(
        "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
        return_value=StubChatModel(),
    )
    with config_patch, model_patch:
        module = importlib.reload(importlib.import_module(module_name))
        server = pn.serve(module.create_app, port=port, threaded=True, show=False)
        time.sleep(0.5)
        page.goto(f"http://localhost:{port}")
        page.locator(ready_selector).first.wait_for(timeout=20000)
        time.sleep(1.0)

        # The sidebar starts collapsed (panelini's default); open it so the clip shows
        # the provider/model controls that make the chat example what it is.
        toggle = page.locator(".left-navbar-button").first
        if toggle.count():
            toggle.click()
            time.sleep(1.2)  # let the open transition finish
        time.sleep(1.0)  # settle so the capture starts on a clean frame
        try:
            yield
        finally:
            stop_server(server)


def _ask(page, question=_QUESTION):
    """Type *question* into the prompt and hold on the streamed reply."""
    box = page.locator("textarea").first
    box.click()
    box.type(question, delay=45)
    box.press("Enter")
    page.get_by_text("simulated reply", exact=False).first.wait_for(timeout=20000)
    time.sleep(1.5)  # hold on the finished answer


def _sidebar_tab(page, index):
    """Select a sidebar tab: 0 is the gear (settings), 1 the conversation list."""
    page.locator(".ai-sidebar-tabs .bk-tab").nth(index).click()
    time.sleep(1.2)


@pytest.mark.media(role="overview", capture="gif", name="chat_min", viewport=_VIEWPORT)
def test_chat_min_media(page: Page, port, mock_langchain):
    with _served(page, port, mock_langchain, "examples.panels.ai.chat_min", ".chat-interface textarea"):
        _ask(page)


@pytest.mark.media(role="feature", capture="gif", name="chat_custom_tool", viewport=_VIEWPORT)
def test_chat_custom_tool_media(page: Page, port, mock_langchain):
    module = "examples.panels.ai.chat_custom_tool"
    with _served(page, port, mock_langchain, module, ".chat-interface textarea"):
        # The point of this example is the custom tool, so show where it is
        # switched on before prompting: settings tab -> Basic Tools -> Local Storage.
        # User-supplied tools start enabled, so clear it first to make the enabling
        # click a real state change rather than a no-op.
        _sidebar_tab(page, 0)
        # Bokeh renders the checkbox and its label as siblings inside a shadow root
        # with no for/aria wiring, so the input has to be reached through the label.
        checkbox = page.locator(".bk-Checkbox", has_text="Local Storage").locator("input[type=checkbox]")
        checkbox.wait_for(timeout=10000)
        checkbox.uncheck()
        time.sleep(1.0)
        checkbox.check()
        assert checkbox.is_checked()
        time.sleep(1.2)
        _sidebar_tab(page, 1)
        _ask(page, "Save my project name in local storage")


@pytest.mark.media(role="feature", capture="gif", name="chat_multi_tab", viewport=_VIEWPORT)
def test_chat_multi_tab_media(page: Page, port, mock_langchain):
    # Scoped to .main: this app mirrors tabs into the (collapsed) sidebar too, and a
    # bare ".bk-tab" can resolve to that hidden copy.
    module = "examples.panels.ai.chat_multi_tab"
    with _served(page, port, mock_langchain, module, ".main .bk-tab"):
        _ask(page)
        # Switching to Digest AI (and back) is the feature: each tab is its own
        # chat, and the main/sidebar tab pairs move together.
        tabs = page.locator(".main .bk-tab")
        tabs.nth(1).click()
        time.sleep(2.0)
        tabs.nth(0).click()
        time.sleep(2.0)


@pytest.mark.media(role="feature", capture="gif", name="chat_no_preview_no_tools", viewport=_VIEWPORT)
def test_chat_no_preview_media(page: Page, port, mock_langchain):
    module = "examples.panels.ai.chat_no_preview_no_tools"
    with _served(page, port, mock_langchain, module, ".chat-interface textarea"):
        # show_tools=False is invisible from the chat alone; open settings so the
        # clip shows Provider/Model Settings with no Basic Tools card.
        _sidebar_tab(page, 0)
        time.sleep(2.0)
        _sidebar_tab(page, 1)
        _ask(page)
