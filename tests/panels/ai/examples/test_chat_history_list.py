"""Playwright UI tests for examples/panels/ai/chat_history_list.py."""

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

_PORT = 6360


@pytest.fixture(scope="module")
def panel_server(mock_langchain, tmp_path_factory):
    """Serve the example with a stubbed model and a temp history database."""
    db_path = tmp_path_factory.mktemp("history") / "history.sqlite3"
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
            module = importlib.reload(importlib.import_module("examples.panels.ai.chat_history_list"))
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
    """Browser page with the sidebar opened."""
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


def _send_message(page: Page, text: str) -> None:
    # inactive session feeds stay mounted but hidden; target the visible one
    box = page.locator("textarea:visible").first
    box.click()
    box.fill(text)
    box.press("Enter")
    page.locator("text=simulated reply >> visible=true").first.wait_for(timeout=20000)


def test_conversation_appears_after_first_exchange(ready_page: Page):
    page = ready_page
    # header shows the current (anonymous) user
    assert page.locator(".user-chip", has_text="Guest").first.is_visible()
    assert page.locator("text=No conversations yet").first.is_visible()

    _send_message(page, "Hello history")

    row = page.locator(".history-title button").first
    row.wait_for()
    assert "New Chat" in row.inner_text()


def test_new_chat_and_reopen_replays_conversation(ready_page: Page):
    page = ready_page

    page.locator(".history-new-chat").first.click()
    page.locator("text=Hello! 👋").first.wait_for()
    # the previous conversation's feed stays mounted but hidden
    page.locator("text=Hello history").first.wait_for(state="hidden")
    assert not page.locator("text=Hello history").first.is_visible()
    # the new chat is materialized immediately: two rows now
    assert page.locator(".history-title").count() == 2

    # the newest (empty) chat sorts first; reopen the original below it
    page.locator(".history-title").nth(1).click()
    page.locator("text=Hello history").first.wait_for()
    # messages replay sequentially; wait for the assistant reply too
    reply = page.get_by_text("simulated reply", exact=False).first
    reply.wait_for()
    assert reply.is_visible()


def test_rename_conversation(ready_page: Page):
    page = ready_page

    page.locator(".history-rename").first.click()
    rename_input = page.locator(".history-rename-input input").first
    rename_input.wait_for()
    rename_input.fill("Renamed chat")
    rename_input.press("Enter")

    renamed = page.locator(".history-title", has_text="Renamed chat").first
    renamed.wait_for()
    assert renamed.is_visible()


def test_delete_requires_confirmation(ready_page: Page):
    page = ready_page

    # delete the first row (the renamed, non-active chat)
    rows_before = page.locator(".history-title").count()
    page.locator(".history-delete").first.click()  # arm
    time.sleep(0.3)
    assert page.locator(".history-title").count() == rows_before

    page.locator(".history-delete").first.click()  # confirm
    page.locator(".history-title", has_text="Renamed chat").first.wait_for(state="detached")
    assert page.locator(".history-title").count() == rows_before - 1


def test_card_collapse_survives_tab_switch(ready_page: Page):
    """Regression: dynamic tabs broke Card expand bindings after a round-trip."""
    page = ready_page

    page.locator("text=Conversations").first.click()  # collapse
    page.locator(".history-new-chat").first.wait_for(state="hidden")

    page.locator(".bk-tab", has_text="⚙️").first.click()
    page.locator("text=Provider Settings").first.wait_for()
    page.locator(".bk-tab", has_text="💬").first.click()
    page.locator("text=Conversations").first.wait_for()

    page.locator("text=Conversations").first.click()  # expand again
    page.locator(".history-new-chat").first.wait_for(state="visible")


def test_history_is_per_user(browser, panel_server, ready_page: Page):
    """A second browser context (own cookie jar) sees its own empty history."""
    _, port = panel_server

    _send_message(ready_page, "Private note of user A")
    ready_page.locator(".history-title").first.wait_for()

    context_b = browser.new_context()
    try:
        page_b = context_b.new_page()
        page_b.goto(f"http://localhost:{port}")
        page_b.locator("text=Hello! 👋").first.wait_for()
        page_b.locator(".left-navbar-button").first.click()
        page_b.locator("text=Conversations").first.wait_for()
        page_b.locator("text=No conversations yet").first.wait_for()
        assert page_b.locator(".history-title").count() == 0
        assert page_b.locator("text=Private note of user A").count() == 0
    finally:
        context_b.close()
