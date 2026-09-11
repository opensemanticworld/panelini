"""Playwright UI tests for examples/panels/ai/chat_min.py.

The standard chat opens with the folder tree; the same suite covers the
tree flows, the runtime toggle, and the list flows behind it.
"""

import importlib
import os
import time
import warnings
from collections.abc import Callable
from unittest.mock import patch

import panel as pn
import pytest
from bokeh.util.warnings import BokehUserWarning
from playwright.sync_api import Locator, Page, expect
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError

from panelini.ai_testing import StubChatModel
from panelini.testing import free_port, stop_server, wait_until


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
            port = free_port()
            server = pn.serve(module.create_app, port=port, threaded=True, show=False)
            time.sleep(0.5)
            yield server, port
            stop_server(server)
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
    return page.locator(".pnl-tst-row", has_text=title).count()


def _row_action(page: Page, title: str, action: str, applied: Callable[[], None]) -> None:
    """Right-click a conversation row and run one of its menu items.

    A refresh rebuilds every row, so a click landing mid-rebuild misses the
    row it aimed at and the menu never opens. ``applied`` must raise on a
    bounded timeout; it is what tells the two cases apart.
    """
    for _ in range(5):
        page.locator(".pnl-tst-row", has_text=title).first.click(button="right")
        try:
            page.locator(f".pnl-tst-mitem:has(.pnl-tst-mlabel:text-is('{action}'))").click(timeout=5000)
            applied()
        except PlaywrightTimeoutError:
            page.keyboard.press("Escape")
            continue
        return
    msg = f"{action} on {title!r} never took effect"
    raise AssertionError(msg)


def _row_trash(page: Page, title: str, applied: Callable[[], None]) -> None:
    """Click the delete button on a row, retrying across a rebuild.

    Same hazard ``_row_action`` guards: a refresh replaces every row, so a click
    landing mid-rebuild misses the button it aimed at.
    """
    for _ in range(5):
        try:
            page.locator(f".pnl-tst-rbtn[aria-label='Delete {title}']").first.click(timeout=5000)
            applied()
        except PlaywrightTimeoutError:
            continue
        return
    msg = f"the trash on {title!r} never took effect"
    raise AssertionError(msg)


def _drag_onto(page: Page, source: Locator, target: Locator) -> None:
    """Drop one row into the middle of another, which is ``make-child``.

    A short first move starts the drag session before the long travel, and the
    pointer has to settle on the target before the button comes back up or the
    drop reads a stale hitbox.
    """
    src = source.bounding_box()
    dst = target.bounding_box()
    assert src and dst

    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2)
    page.mouse.down()
    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2 + 6, steps=2)
    expect(page.locator(".pnl-tst-row--dragging")).to_have_count(1, timeout=5000)
    page.mouse.move(dst["x"] + dst["width"] / 2, dst["y"] + dst["height"] / 2, steps=12)
    page.wait_for_timeout(120)
    page.mouse.up()


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

    # a fresh tree shows the hint instead of an empty grid
    page.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
    assert page.locator(".history-tree:visible").count() == 0

    # Sidebar: conversations tab is the one shown, setup sits next to it
    page.locator(".bk-tab", has_text="⚙️").first.click()
    page.locator("text=Provider Settings").first.wait_for()
    page.locator(".bk-tab", has_text="💬").first.click()
    page.locator("text=Conversations").first.wait_for()


def test_new_chat_button_creates_and_selects_node(ready_page: Page):
    page = ready_page
    assert _chat_rows(page) == 0

    page.locator(".history-new-chat:visible").first.click()

    # the chat is materialized immediately and opened; the hint yields
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(timeout=10000)
    page.locator(".pnl-tst-row.history-active", has_text="New Chat").first.wait_for(timeout=10000)
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
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(timeout=10000)
    # the previous conversation's feed stays mounted but hidden
    hidden = page.locator(".chat-interface").locator("text=Hello history").first
    hidden.wait_for(state="hidden")

    # reopen the original by activating its row; messages replay
    page.locator(".pnl-tst-row", has_text="Hello history").first.click()
    page.locator(".chat-interface").locator("text=Hello history >> visible=true").first.wait_for()
    reply = page.get_by_text("simulated reply", exact=False).first
    reply.wait_for()
    assert reply.is_visible()


def test_menu_delete_offers_undo(ready_page: Page):
    """The row menu deletes without switching chats; Undo re-puts it."""
    page = ready_page

    # the menu is the row's whole action set, nothing else
    page.locator(".pnl-tst-row", has_text="New Chat").first.click(button="right")
    menu = page.locator(".pnl-tst-menu")
    menu.first.wait_for()
    assert [label.strip() for label in menu.locator(".pnl-tst-mlabel").all_text_contents()] == [
        "Rename",
        "Delete",
        "Outdent",
        "Indent",
    ]
    page.keyboard.press("Escape")

    _row_action(
        page,
        "New Chat",
        "Delete",
        lambda: page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(state="detached", timeout=5000),
    )

    wait_until(lambda: _chat_rows(page) == 0)
    # a right-click selects but does not activate: the open chat is unchanged
    assert page.locator(".pnl-tst-row.history-active", has_text="Hello history").first.is_visible()
    # the undo icon in the header becomes clickable
    undo = page.locator(".history-undo button:not([disabled])").first
    undo.wait_for()
    undo.click()
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(timeout=10000)
    # undo drained, redo armed: redo re-deletes, undo brings it back
    page.locator(".history-undo button[disabled]").first.wait_for()
    page.locator(".history-redo button:not([disabled])").first.click()
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(state="detached")
    page.locator(".history-undo button:not([disabled])").first.click()
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(timeout=10000)


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
    page.locator(".pnl-tst-row", has_text="Hello history").first.wait_for()
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
    ready_page.locator(".pnl-tst-row", has_text="Hello history").first.wait_for()

    context_b = browser.new_context()
    try:
        page_b = context_b.new_page()
        page_b.goto(f"http://localhost:{port}")
        page_b.locator(".chat-interface textarea").first.wait_for()
        page_b.locator(".left-navbar-button").first.click()
        page_b.locator("text=Conversations").first.wait_for()
        page_b.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
        assert page_b.locator(".history-tree:visible").count() == 0
        assert page_b.locator("text=Private note of user A").count() == 0
    finally:
        context_b.close()


def test_a_folder_files_a_chat_and_outdent_takes_it_back_out(ready_page: Page):
    """A drag files the chat in the folder; the row menu's outdent takes it out."""
    page = ready_page

    page.locator(".history-new-folder:visible").first.click()
    folder = page.locator(".pnl-tst-row", has_text="New Folder").first
    folder.wait_for(timeout=10000)

    chat = page.locator(".pnl-tst-row", has_text="Hello history").first
    _drag_onto(page, chat, folder)

    # the chat is now the folder's child: one row, indented under it
    filed = page.locator(".pnl-tst-row", has_text="Hello history").first
    expect(filed).to_have_attribute("aria-level", "2", timeout=10000)
    assert _chat_rows(page, "Hello history") == 1

    # the panel's own outdent is what takes a chat out of a folder
    _row_action(
        page,
        "Hello history",
        "Outdent",
        lambda: page.locator(".pnl-tst-row[aria-level='1']", has_text="Hello history").first.wait_for(timeout=5000),
    )

    # tidy up: the folder is empty, so one Delete is enough
    _row_action(
        page,
        "New Folder",
        "Delete",
        lambda: page.locator(".pnl-tst-row", has_text="New Folder").first.wait_for(state="detached", timeout=5000),
    )


def test_the_row_trash_deletes_the_chat_it_sits_on(ready_page: Page):
    """No right click, and no switch of the open chat: the button only deletes."""
    page = ready_page

    page.locator(".history-new-chat:visible").first.click()
    page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(timeout=10000)
    assert page.locator(".pnl-tst-rbtn[aria-label='Delete New Chat']").count() == 1

    _row_trash(
        page,
        "New Chat",
        lambda: page.locator(".pnl-tst-row", has_text="New Chat").first.wait_for(state="detached", timeout=5000),
    )

    wait_until(lambda: _chat_rows(page) == 0)
    # the same undo stack the menu's Delete feeds
    page.locator(".history-undo button:not([disabled])").first.wait_for()


def test_cancel_takes_back_an_armed_folder_delete(ready_page: Page):
    """A folder holding a chat arms rather than deleting, and Cancel is the way out."""
    page = ready_page

    page.locator(".history-new-folder:visible").first.click()
    folder = page.locator(".pnl-tst-row", has_text="New Folder").first
    folder.wait_for(timeout=10000)
    _drag_onto(page, page.locator(".pnl-tst-row", has_text="Hello history").first, folder)
    expect(page.locator(".pnl-tst-row", has_text="Hello history").first).to_have_attribute(
        "aria-level", "2", timeout=10000
    )

    # the first Delete only arms: nothing is removed, the folder turns red and
    # the warning counts what a second one would take
    _row_trash(
        page,
        "New Folder",
        lambda: page.locator(".history-confirm:visible", has_text="remove 1 chat").first.wait_for(timeout=5000),
    )
    expect(page.locator(".pnl-tst-row.history-delete-armed")).to_have_count(1, timeout=10000)

    # one line however narrow the sidebar is, so the warning does not shift the
    # tree below it: a second line would be taller than the button beside it
    hint = page.locator(".history-confirm:visible div").first.bounding_box()
    cancel = page.locator(".history-confirm-cancel button:visible").first.bounding_box()
    assert hint and cancel
    assert hint["height"] <= cancel["height"]

    page.locator(".history-confirm-cancel button:visible").first.click()

    page.locator(".history-confirm").first.wait_for(state="hidden", timeout=10000)
    expect(page.locator(".pnl-tst-row.history-delete-armed")).to_have_count(0, timeout=10000)
    assert page.locator(".pnl-tst-row", has_text="New Folder").count() >= 1
    assert _chat_rows(page, "Hello history") == 1

    # tidy up: take the chat back out, then the empty folder goes in one click
    _row_action(
        page,
        "Hello history",
        "Outdent",
        lambda: page.locator(".pnl-tst-row[aria-level='1']", has_text="Hello history").first.wait_for(timeout=5000),
    )
    _row_trash(
        page,
        "New Folder",
        lambda: page.locator(".pnl-tst-row", has_text="New Folder").first.wait_for(state="detached", timeout=5000),
    )


def test_row_actions_rename_delete_and_empty_end_state(ready_page: Page):
    """The menu renames inline; deleting the last chat leaves NO ghost row.

    Runs last: it renames and finally deletes the surviving conversation.
    """
    page = ready_page

    _row_action(
        page,
        "Hello history",
        "Rename",
        lambda: page.locator("input.pnl-tst-edit").first.wait_for(timeout=5000),
    )
    edit = page.locator("input.pnl-tst-edit").first
    edit.fill("Renamed via menu")
    edit.press("Enter")
    page.locator(".pnl-tst-row", has_text="Renamed via menu").first.wait_for(timeout=10000)

    # delete the last (active) conversation: no "New Chat" row respawns,
    # the empty hint returns, and undo is still offered
    _row_action(
        page,
        "Renamed via menu",
        "Delete",
        lambda: page.locator(".pnl-tst-row", has_text="Renamed via menu").first.wait_for(
            state="detached", timeout=5000
        ),
    )
    page.locator(".history-empty:visible", has_text="No conversations yet").first.wait_for()
    assert _chat_rows(page) == 0  # no ghost "New Chat" row

    undo = page.locator(".history-undo button:not([disabled])").first
    undo.wait_for()
    undo.click()
    page.locator(".pnl-tst-row", has_text="Renamed via menu").first.wait_for(timeout=10000)
    assert page.locator(".history-empty:visible").count() == 0
