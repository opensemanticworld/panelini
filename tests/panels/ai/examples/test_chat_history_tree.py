"""Playwright smoke test for examples/panels/ai/chat_history_tree.py."""

import importlib
import os
import time
import warnings
from unittest.mock import patch

import panel as pn
import pytest
from bokeh.util.warnings import BokehUserWarning
from playwright.sync_api import Page

from panelini.ai_testing import StubChatModel
from panelini.testing import wait_until

_PORT = 6370


@pytest.fixture(scope="module")
def panel_server(mock_langchain, tmp_path_factory):
    """Serve the tree example with a stubbed model and temp database."""
    db_path = tmp_path_factory.mktemp("history_tree") / "history.sqlite3"
    previous = os.environ.get("PANELINI_HISTORY_DB")
    os.environ["PANELINI_HISTORY_DB"] = str(db_path)
    config_patch, _ = mock_langchain
    model_patch = patch(
        "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
        return_value=StubChatModel(),
    )
    try:
        with warnings.catch_warnings(), config_patch, model_patch:
            # tripwire: any double-attached component fails the suite
            warnings.simplefilter("error", BokehUserWarning)
            module = importlib.reload(importlib.import_module("examples.panels.ai.chat_history_tree"))
            server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
            time.sleep(0.5)
            yield server, _PORT
            server.stop()
    finally:
        if previous is None:
            os.environ.pop("PANELINI_HISTORY_DB", None)
        else:
            os.environ["PANELINI_HISTORY_DB"] = previous


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    _, port = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Hello! 👋").first.wait_for()
    page.locator(".left-navbar-button").first.click()
    page.locator("text=Conversations").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def _chat_rows(page: Page) -> int:
    # an empty tree renders one blank placeholder .wb-row; count real chats
    return page.locator(".wb-row", has_text="New Chat").count()


def test_new_chat_button_creates_and_selects_node(ready_page: Page):
    page = ready_page
    page.locator(".wunderbaum-wrapper").first.wait_for()
    assert _chat_rows(page) == 0

    page.locator(".history-new-chat").first.click()

    # the chat is materialized immediately and selected
    page.locator(".wb-row", has_text="New Chat").first.wait_for(timeout=10000)
    page.locator(".wb-row.wb-active", has_text="New Chat").first.wait_for(timeout=10000)
    assert _chat_rows(page) == 1


def test_message_goes_into_selected_chat(ready_page: Page):
    page = ready_page
    box = page.locator("textarea:visible").first
    box.click()
    box.fill("Hello tree")
    box.press("Enter")
    page.locator("text=simulated reply >> visible=true").first.wait_for(timeout=20000)
    # persisted into the already-selected chat: still a single node
    assert _chat_rows(page) == 1


def test_context_delete_removes_nonactive_chat(ready_page: Page):
    page = ready_page
    page.locator(".history-new-chat").first.click()  # second chat, becomes active
    wait_until(lambda: _chat_rows(page) == 2)

    target = page.locator(".wb-row:not(.wb-active)", has_text="New Chat").first
    target.click(button="right")
    menu = page.locator(".wb-context-menu")
    menu.wait_for(state="visible", timeout=5000)
    page.locator(".wb-context-menu-item", has_text="Delete").first.click()

    wait_until(lambda: _chat_rows(page) == 1)
