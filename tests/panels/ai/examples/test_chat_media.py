"""Docs media for the AI chat examples: a scripted question and answer.

The chat needs an LLM, so the model is replaced with
:class:`panelini.ai_testing.StubChatModel`, which streams a fixed reply. That is the
same stand-in the Pyodide portfolio apps run on, so the recorded clip and the live
player behave identically. Nothing is sent anywhere and no credentials are involved.

These use the standard ``page`` / ``port`` fixtures (not the module-scoped
``ready_page``) so the media plugin records them.
"""

import importlib
import time
from unittest.mock import patch

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.ai_testing import StubChatModel

_VIEWPORT = (1500, 900)
_QUESTION = "What can panelini do?"


def _record_exchange(page, port, mock_langchain, module_name, ready_selector):
    """Serve *module_name* with a stubbed model, then ask a question on camera."""
    config_patch, _ = mock_langchain
    model_patch = patch(
        "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
        return_value=StubChatModel(),
    )
    with config_patch, model_patch:
        module = importlib.reload(importlib.import_module(module_name))
        server = pn.serve(module.app.servable(), port=port, threaded=True, show=False)
        time.sleep(0.5)
        page.goto(f"http://localhost:{port}")
        page.locator(ready_selector).first.wait_for(timeout=20000)
        time.sleep(1.5)  # settle so the capture starts on a clean frame

        box = page.locator("textarea").first
        box.click()
        box.type(_QUESTION, delay=45)
        box.press("Enter")
        page.get_by_text("simulated reply", exact=False).first.wait_for(timeout=20000)
        time.sleep(1.5)  # hold on the finished answer

        server.stop()


@pytest.mark.media(role="overview", capture="gif", name="chat_min", viewport=_VIEWPORT)
def test_chat_min_media(page: Page, port, mock_langchain):
    _record_exchange(page, port, mock_langchain, "examples.panels.ai.chat_min", "text=Hello! 👋")


@pytest.mark.media(role="feature", capture="gif", name="chat_custom_tool", viewport=_VIEWPORT)
def test_chat_custom_tool_media(page: Page, port, mock_langchain):
    _record_exchange(page, port, mock_langchain, "examples.panels.ai.chat_custom_tool", "text=Hello! 👋")


@pytest.mark.media(role="feature", capture="gif", name="chat_multi_tab", viewport=_VIEWPORT)
def test_chat_multi_tab_media(page: Page, port, mock_langchain):
    # Scoped to .main: this app mirrors tabs into the (collapsed) sidebar too, and a
    # bare ".bk-tab" can resolve to that hidden copy.
    _record_exchange(page, port, mock_langchain, "examples.panels.ai.chat_multi_tab", ".main .bk-tab")


@pytest.mark.media(role="feature", capture="gif", name="chat_no_preview_no_tools", viewport=_VIEWPORT)
def test_chat_no_preview_media(page: Page, port, mock_langchain):
    module = "examples.panels.ai.chat_no_preview_no_tools"
    _record_exchange(page, port, mock_langchain, module, "text=Hello! 👋")
