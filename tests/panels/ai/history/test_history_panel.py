"""Tests for panelini.panels.ai.history.panel."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import panel as pn
import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.panel import HistoryPanel, bucket_label
from panelini.panels.ai.history.store import utcnow

pytestmark = pytest.mark.ai

USER = "alice"


# ── bucket_label ──────────────────────────────────────────────────────────


class TestBucketLabel:
    @pytest.mark.parametrize(
        ("days_ago", "expected"),
        [
            (0, "Today"),
            (1, "Yesterday"),
            (3, "Last 7 days"),
            (7, "Last 7 days"),
            (8, "Last 30 days"),
            (30, "Last 30 days"),
            (31, "Older"),
            (400, "Older"),
        ],
    )
    def test_buckets(self, days_ago: int, expected: str) -> None:
        now = utcnow()
        assert bucket_label(now - timedelta(days=days_ago), now=now) == expected

    def test_future_timestamps_count_as_today(self) -> None:
        now = utcnow()
        assert bucket_label(now + timedelta(hours=2), now=now) == "Today"


# ── HistoryPanel ──────────────────────────────────────────────────────────


class _Callbacks:
    def __init__(self) -> None:
        self.opened: list[str] = []
        self.new_chats = 0
        self.active_id: str | None = None

    def on_open(self, conversation_id: str) -> None:
        self.opened.append(conversation_id)
        self.active_id = conversation_id

    def on_new_chat(self) -> None:
        self.new_chats += 1
        self.active_id = None


@pytest.fixture()
def store() -> InMemoryHistoryStore:
    return InMemoryHistoryStore()


@pytest.fixture()
def callbacks() -> _Callbacks:
    return _Callbacks()


@pytest.fixture()
def panel_under_test(store: InMemoryHistoryStore, callbacks: _Callbacks) -> HistoryPanel:
    return HistoryPanel(
        store=store,
        user_id=USER,
        on_open=callbacks.on_open,
        on_new_chat=callbacks.on_new_chat,
        get_active_id=lambda: callbacks.active_id,
    )


def _rows(panel: HistoryPanel) -> list[pn.Row]:
    return [obj for obj in panel._list.objects if "history-row" in obj.css_classes]


def _widget(row: pn.Row, index: int) -> Any:
    return row.objects[index]


def _group_labels(panel: HistoryPanel) -> list[str]:
    return [str(obj.object) for obj in panel._list.objects if "history-group" in obj.css_classes]


def _click(button: pn.widgets.Button) -> None:
    button.clicks += 1


class TestHistoryPanel:
    def test_empty_state(self, panel_under_test: HistoryPanel) -> None:
        assert _rows(panel_under_test) == []
        assert "No conversations yet" in str(panel_under_test._list.objects[0].object)

    def test_fresh_conversations_grouped_under_today(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore
    ) -> None:
        store.create_conversation(USER, title="one")
        store.create_conversation(USER, title="two")
        panel_under_test.refresh()
        assert len(_rows(panel_under_test)) == 2
        assert any("Today" in label for label in _group_labels(panel_under_test))

    def test_pinned_conversations_lead_the_list(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore
    ) -> None:
        store.create_conversation(USER, title="normal")
        pinned = store.create_conversation(USER, title="pinned")
        store.set_pinned(USER, pinned.id, True)
        panel_under_test.refresh()
        assert "Pinned" in _group_labels(panel_under_test)[0]

    def test_click_title_opens_conversation(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="chat")
        panel_under_test.refresh()
        _click(_widget(_rows(panel_under_test)[0], 0))
        assert callbacks.opened == [conv.id]

    def test_active_conversation_uses_highlight_style(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="chat")
        callbacks.active_id = conv.id
        panel_under_test.refresh()
        title_button = _widget(_rows(panel_under_test)[0], 0)
        assert "font-weight: 600" in title_button.stylesheets[0]

    def test_new_chat_button_fires_callback(self, panel_under_test: HistoryPanel, callbacks: _Callbacks) -> None:
        _click(panel_under_test.new_chat_button)
        assert callbacks.new_chats == 1

    def test_rename_flow(self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="old title")
        panel_under_test.refresh()
        _click(_widget(_rows(panel_under_test)[0], 1))  # pencil icon
        rename_input = _widget(_rows(panel_under_test)[0], 0)
        assert isinstance(rename_input, pn.widgets.TextInput)
        rename_input.value = "new title"
        renamed = store.get_conversation(USER, conv.id)
        assert renamed is not None and renamed.title == "new title"
        assert isinstance(_widget(_rows(panel_under_test)[0], 0), pn.widgets.Button)

    def test_rename_to_blank_is_ignored(self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="kept")
        panel_under_test.refresh()
        _click(_widget(_rows(panel_under_test)[0], 1))
        _widget(_rows(panel_under_test)[0], 0).value = "   "
        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.title == "kept"

    def test_delete_requires_two_clicks(self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="doomed")
        panel_under_test.refresh()
        _click(_widget(_rows(panel_under_test)[0], 2))  # arm
        assert store.get_conversation(USER, conv.id) is not None
        assert _widget(_rows(panel_under_test)[0], 2).button_type == "danger"
        _click(_widget(_rows(panel_under_test)[0], 2))  # confirm
        assert store.get_conversation(USER, conv.id) is None
        assert _rows(panel_under_test) == []

    def test_deleting_active_conversation_starts_new_chat(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="active")
        callbacks.active_id = conv.id
        panel_under_test.refresh()
        _click(_widget(_rows(panel_under_test)[0], 2))
        _click(_widget(_rows(panel_under_test)[0], 2))
        assert callbacks.new_chats == 1

    def test_other_users_conversations_hidden(
        self, panel_under_test: HistoryPanel, store: InMemoryHistoryStore
    ) -> None:
        store.create_conversation("bob", title="not mine")
        panel_under_test.refresh()
        assert _rows(panel_under_test) == []

    def test_busy_conversation_spins_but_stays_clickable(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="working")
        busy_ids = {conv.id}
        panel = HistoryPanel(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: None,
            get_busy_ids=lambda: busy_ids,
        )
        row = _rows(panel)[0]
        title = _widget(row, 0)
        assert title.icon == "loader-2"  # spinner while generating
        assert _widget(row, 1).disabled
        assert _widget(row, 2).disabled
        _click(title)  # the row must stay clickable while generating
        assert callbacks.opened == [conv.id]

        busy_ids.clear()
        panel.refresh()
        row = _rows(panel)[0]
        assert _widget(row, 0).icon is None
        assert not _widget(row, 1).disabled
        assert not _widget(row, 2).disabled

    def test_ready_conversation_shows_check_until_opened(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="finished")
        ready_ids = {conv.id}
        panel = HistoryPanel(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: None,
            get_busy_ids=lambda: set(),
            get_ready_ids=lambda: ready_ids,
        )
        assert _widget(_rows(panel)[0], 0).icon == "circle-check"

        ready_ids.clear()
        panel.refresh()
        assert _widget(_rows(panel)[0], 0).icon is None
