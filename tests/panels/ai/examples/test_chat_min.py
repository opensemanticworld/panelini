"""Playwright UI tests for examples/panels/ai/chat_min.py.

The standard chat opens with the folder tree; the same suite covers the
tree flows, the runtime toggle, and the list flows behind it.
"""

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

_PORT = 6310


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
            module = importlib.reload(importlib.import_module("examples.panels.ai.chat_min"))
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
    # no welcome message: the prompt box is the ready signal
    page.locator(".chat-interface textarea").first.wait_for()
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


def _chat_rows(page: Page, title: str = "New Chat") -> int:
    # an empty tree renders one blank placeholder .wb-row; count real chats
    return page.locator(".wb-row", has_text=title).count()


def test_chat_min_renders(ready_page: Page):
    """Chat card, empty feed, the empty-tree hint, and both sidebar tabs."""
    page = ready_page

    # Exact heading match: a plain text=Chat locator also matches unrelated
    # sidebar substrings.
    assert page.get_by_role("heading", name="Chat", exact=True).is_visible()
    # the chat fills the main area: no preview pane unless asked for
    assert page.get_by_role("heading", name="Preview", exact=True).count() == 0
    # the chat starts empty: no greeting is posted
    assert page.locator(".chat-interface .chat-message").count() == 0

    # a fresh tree shows the hint, not a blank placeholder row
    page.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
    assert page.locator(".wunderbaum-wrapper:visible").count() == 0

    # Sidebar: conversations tab is the one shown, setup sits next to it
    page.locator(".bk-tab", has_text="⚙️").first.click()
    page.locator("text=Provider Settings").first.wait_for()
    page.locator(".bk-tab", has_text="💬").first.click()
    page.locator("text=Conversations").first.wait_for()


def test_new_chat_button_creates_and_selects_node(ready_page: Page):
    page = ready_page
    assert _chat_rows(page) == 0

    page.locator(".history-new-chat:visible").first.click()

    # the chat is materialized immediately and selected; the hint yields
    page.locator(".wb-row", has_text="New Chat").first.wait_for(timeout=10000)
    page.locator(".wb-row.wb-active", has_text="New Chat").first.wait_for(timeout=10000)
    assert page.locator(".history-empty:visible").count() == 0


def test_message_goes_into_selected_chat(ready_page: Page):
    page = ready_page
    # header shows the current (anonymous) user
    assert page.locator(".user-chip", has_text="Guest").first.is_visible()

    _send_message(page, "Hello history")

    # persisted into the already-selected chat, which the message renamed
    wait_until(lambda: _chat_rows(page, "Hello history") == 1)
    assert _chat_rows(page) == 0


def test_new_chat_and_reopen_replays_conversation(ready_page: Page):
    page = ready_page

    page.locator(".history-new-chat:visible").first.click()
    page.locator(".wb-row", has_text="New Chat").first.wait_for(timeout=10000)
    # the previous conversation's feed stays mounted but hidden
    hidden = page.locator(".chat-interface").locator("text=Hello history").first
    hidden.wait_for(state="hidden")

    # reopen the original by activating its node; messages replay
    page.locator(".wb-row", has_text="Hello history").first.click()
    page.locator(".chat-interface").locator("text=Hello history >> visible=true").first.wait_for()
    reply = page.get_by_text("simulated reply", exact=False).first
    reply.wait_for()
    assert reply.is_visible()


def test_context_delete_offers_undo(ready_page: Page):
    """Context-menu delete removes the node; Undo re-puts it losslessly."""
    page = ready_page

    target = page.locator(".wb-row", has_text="New Chat").first
    target.click(button="right")
    menu = page.locator(".wb-context-menu")
    menu.wait_for(state="visible", timeout=5000)
    page.locator(".wb-context-menu-item", has_text="Delete").first.click()

    wait_until(lambda: _chat_rows(page) == 0)
    # has_text pierces the shadow DOM; inner_text() would come back empty
    page.locator(".history-undo:visible", has_text="New Chat").first.wait_for()

    page.locator(".history-undo-button button").first.click()
    page.locator(".wb-row", has_text="New Chat").first.wait_for(timeout=10000)
    assert page.locator(".history-undo:visible").count() == 0


def test_import_export_icons_sit_in_the_new_chat_row(ready_page: Page):
    """Both icons share the Conversations card's first row, same size."""
    page = ready_page

    new_chat = page.locator(".history-new-chat button:visible").first.bounding_box()
    upload = page.locator(".chat-upload input:visible").first.bounding_box()
    download = page.locator(".chat-download button:visible").first.bounding_box()
    assert new_chat and upload and download

    # same row: the icons overlap the New Chat button vertically
    assert upload["y"] < new_chat["y"] + new_chat["height"]
    assert download["y"] == upload["y"]
    # matched icon boxes, download to the right of upload
    assert (upload["width"], upload["height"]) == (download["width"], download["height"])
    assert download["x"] > upload["x"]


def test_toggle_to_list_for_rename_and_delete(ready_page: Page):
    """The list view behind the toggle keeps its rename/delete flows."""
    page = ready_page

    page.locator(".history-view-toggle button:visible").first.click()
    page.locator(".history-title:visible").first.wait_for()
    assert page.locator("text=Today").first.is_visible()
    assert page.locator(".history-title:visible").count() == 2

    page.locator(".history-rename").first.click()
    rename_input = page.locator(".history-rename-input input").first
    rename_input.wait_for()
    rename_input.fill("Renamed chat")
    rename_input.press("Enter")
    page.locator(".history-title", has_text="Renamed chat").first.wait_for()

    # two-click delete: first click arms, second deletes
    page.locator(".history-delete").first.click()
    time.sleep(0.3)
    assert page.locator(".history-title:visible").count() == 2
    page.locator(".history-delete").first.click()
    page.locator(".history-title", has_text="Renamed chat").first.wait_for(state="detached")
    assert page.locator(".history-title:visible").count() == 1

    # back to the tree; the surviving conversation is there
    page.locator(".history-view-toggle button:visible").first.click()
    page.locator(".wb-row", has_text="Hello history").first.wait_for()
    assert page.locator(".history-title:visible").count() == 0


def test_card_collapse_survives_tab_switch(ready_page: Page):
    """Regression: dynamic tabs broke Card expand bindings after a round-trip.

    The Conversations card is not collapsible, so this rides on a card in
    the setup tab that still is.
    """
    page = ready_page

    page.locator(".bk-tab", has_text="⚙️").first.click()
    provider_label = page.get_by_text("Provider", exact=True)
    provider_label.wait_for()

    page.locator("text=Provider Settings").first.click()  # collapse
    provider_label.wait_for(state="hidden")

    page.locator(".bk-tab", has_text="💬").first.click()
    # both view cards carry this title; wait for the visible one
    page.locator("text=Conversations >> visible=true").first.wait_for()
    page.locator(".bk-tab", has_text="⚙️").first.click()

    page.locator("text=Provider Settings").first.click()  # expand again
    provider_label.wait_for(state="visible")
    page.locator(".bk-tab", has_text="💬").first.click()  # leave the tab as found


def test_history_is_per_user(browser, panel_server, ready_page: Page):
    """A second browser context (own cookie jar) sees its own empty history."""
    _, port = panel_server

    _send_message(ready_page, "Private note of user A")
    ready_page.locator(".wb-row", has_text="Hello history").first.wait_for()

    context_b = browser.new_context()
    try:
        page_b = context_b.new_page()
        page_b.goto(f"http://localhost:{port}")
        page_b.locator(".chat-interface textarea").first.wait_for()
        page_b.locator(".left-navbar-button").first.click()
        page_b.locator("text=Conversations").first.wait_for()
        page_b.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
        assert page_b.locator(".wunderbaum-wrapper:visible").count() == 0
        assert page_b.locator("text=Private note of user A").count() == 0
    finally:
        context_b.close()
