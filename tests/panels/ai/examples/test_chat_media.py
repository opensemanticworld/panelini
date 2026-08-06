"""Docs-media stills for the AI chat examples.

The chat needs an LLM, so we reuse the ``mock_langchain`` fixture (see the sibling
``conftest.py``) to serve each example with a fake provider + model. That is enough to
render the panel at its welcome state - the chat card, input, and provider/model
sidebar - which is what the docs pages illustrate. These use the standard ``page`` /
``port`` fixtures (not the module-scoped ``ready_page``) so the media plugin records them.
"""

import importlib
import time

import panel as pn
import pytest
from playwright.sync_api import Page

_VIEWPORT = (1500, 900)


def _shoot_chat(page, port, mock_langchain, module_name, ready_selector):
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module(module_name))
        server = pn.serve(module.app.servable(), port=port, threaded=True, show=False)
        time.sleep(0.5)
        page.goto(f"http://localhost:{port}")
        page.locator(ready_selector).first.wait_for(timeout=20000)
        time.sleep(1.5)  # settle so the still is clean
        assert page.locator(ready_selector).first.is_visible()
        server.stop()


@pytest.mark.media(role="feature", capture="screenshot", name="chat_min", viewport=_VIEWPORT)
def test_chat_min_media(page: Page, port, mock_langchain):
    _shoot_chat(page, port, mock_langchain, "examples.panels.ai.chat_min", "text=Hello! 👋")


@pytest.mark.media(role="feature", capture="screenshot", name="chat_custom_tool", viewport=_VIEWPORT)
def test_chat_custom_tool_media(page: Page, port, mock_langchain):
    _shoot_chat(page, port, mock_langchain, "examples.panels.ai.chat_custom_tool", "text=Hello! 👋")


@pytest.mark.media(role="feature", capture="screenshot", name="chat_multi_tab", viewport=_VIEWPORT)
def test_chat_multi_tab_media(page: Page, port, mock_langchain):
    # Scoped to .main: this app mirrors tabs into the (collapsed-by-default)
    # sidebar too, and a bare ".bk-tab" can resolve to that hidden copy.
    _shoot_chat(page, port, mock_langchain, "examples.panels.ai.chat_multi_tab", ".main .bk-tab")
