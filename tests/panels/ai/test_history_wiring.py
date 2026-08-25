"""Tests for chat history persistence wiring in AiBackend and AiChat."""

from __future__ import annotations

import asyncio
from collections.abc import AsyncGenerator
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock, patch

import panel as pn
import pytest
from langchain_core.messages import AIMessage, HumanMessage

from panelini.panels.ai.backend import AiBackend
from panelini.panels.ai.frontend import AiChat
from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.utils.config import AppConfig, ModelConfig, ProviderConfig

pytestmark = pytest.mark.ai

USER = "alice"


def _run_async(coro_func, *args, **kwargs):
    """Run an async function in a fresh thread to avoid event-loop conflicts
    with Playwright (which leaves a running loop in the main thread)."""
    with ThreadPoolExecutor(1) as pool:
        return pool.submit(lambda: asyncio.run(coro_func(*args, **kwargs))).result()


@pytest.fixture()
def store() -> InMemoryHistoryStore:
    return InMemoryHistoryStore()


@pytest.fixture()
def backend(config_yml_path: Path, store: InMemoryHistoryStore) -> AiBackend:
    return AiBackend(config_path=config_yml_path, history_store=store, user_id=USER)


# ── AiBackend ─────────────────────────────────────────────────────────────


class TestBackendPersistence:
    def test_no_op_without_store(self, config_yml_path: Path) -> None:
        bare = AiBackend(config_path=config_yml_path)
        assert bare.history_store is None
        bare.persist_exchange("hi", "hello")  # no-op, must not raise
        assert bare.load_conversation("anything") == []

    def test_exchange_creates_conversation_lazily(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        assert store.list_conversations(USER) == []
        backend.persist_exchange("question", "answer")
        conversations = store.list_conversations(USER)
        assert len(conversations) == 1
        assert backend.conversation_id == conversations[0].id
        roles = [(m.role, m.content) for m in store.load_messages(USER, conversations[0].id)]
        assert roles == [("human", "question"), ("ai", "answer")]

    def test_second_exchange_appends_to_same_conversation(
        self, backend: AiBackend, store: InMemoryHistoryStore
    ) -> None:
        backend.persist_exchange("q1", "a1")
        backend.persist_exchange("q2", "a2")
        conversations = store.list_conversations(USER)
        assert len(conversations) == 1
        assert len(store.load_messages(USER, conversations[0].id)) == 4

    def test_load_conversation_returns_replay_pairs(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "question")
        store.append_message(USER, conv.id, "ai", "answer")
        store.append_message(USER, conv.id, "tool", "trace")  # skipped on load

        pairs = backend.load_conversation(conv.id)

        assert pairs == [("human", "question"), ("ai", "answer")]
        assert backend.conversation_id == conv.id
        history = backend.history_from_pairs(pairs)
        assert isinstance(history[0], HumanMessage)
        assert isinstance(history[1], AIMessage)
        assert len(history) == 2

    def test_persist_after_load_appends_to_loaded_conversation(
        self, backend: AiBackend, store: InMemoryHistoryStore
    ) -> None:
        conv = store.create_conversation(USER)
        backend.load_conversation(conv.id)
        backend.persist_exchange("q", "a")
        assert len(store.load_messages(USER, conv.id)) == 2

    def test_start_new_conversation_keeps_store(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        backend.persist_exchange("q", "a")
        backend.start_new_conversation()
        assert backend.conversation_id is None
        assert backend.ai_interface is not None
        assert backend.ai_interface.conversation_history == []
        assert len(store.list_conversations(USER)) == 1

    def test_provider_switch_opens_fresh_conversation(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        backend.persist_exchange("q", "a")
        old_id = backend.conversation_id
        backend.update_provider(backend.current_provider)
        assert backend.conversation_id is None
        backend.persist_exchange("q2", "a2")
        assert backend.conversation_id != old_id
        assert len(store.list_conversations(USER)) == 2

    def test_persist_exchange_pinned_to_send_time_conversation(
        self, backend: AiBackend, store: InMemoryHistoryStore
    ) -> None:
        target_id = backend.create_conversation_id()
        assert target_id is not None
        other = store.create_conversation(USER, title="other")
        backend.load_conversation(other.id)  # user switched mid-response
        backend.persist_exchange("q", "a", conversation_id=target_id)
        assert [m.content for m in store.load_messages(USER, target_id)] == ["q", "a"]
        assert store.load_messages(USER, other.id) == []

    def test_first_exchange_titles_the_conversation(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        backend.persist_exchange("How do I deploy to staging?", "Like this.")
        conversations = store.list_conversations(USER)
        assert [c.title for c in conversations] == ["How do I deploy to staging?"]

    def test_later_exchanges_keep_the_first_title(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        backend.persist_exchange("first question", "answer")
        backend.persist_exchange("second question", "answer")
        assert [c.title for c in store.list_conversations(USER)] == ["first question"]

    def test_manual_title_is_never_overwritten(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        backend.load_conversation(conv.id)
        store.rename_conversation(USER, conv.id, "My own name")
        backend.persist_exchange("a question", "answer")
        renamed = store.get_conversation(USER, conv.id)
        assert renamed is not None and renamed.title == "My own name"

    def test_persist_imported_history(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        assert backend.ai_interface is not None
        backend.ai_interface.conversation_history = [HumanMessage(content="q"), AIMessage(content="a")]
        backend.persist_imported_history(title="Imported: old.json")
        conversations = store.list_conversations(USER)
        assert [c.title for c in conversations] == ["Imported: old.json"]
        roles = [m.role for m in store.load_messages(USER, conversations[0].id)]
        assert roles == ["human", "ai"]


# ── AiChat ────────────────────────────────────────────────────────────────


@pytest.fixture()
def _mock_backend_env():
    """Patch config loading + model init so AiChat builds without credentials."""
    fake_provider = ProviderConfig(
        key="test",
        display_name="Test",
        client_type="anthropic",
        env_vars={"api_key": "fake", "endpoint": "https://localhost"},
        models=(ModelConfig(name="M", value="m"),),
    )
    fake_config = AppConfig(providers={"test": fake_provider})
    mock_model = MagicMock()
    mock_model.bind_tools = MagicMock(return_value=mock_model)
    with (
        patch("panelini.panels.ai.backend.load_config", return_value=fake_config),
        patch(
            "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
            return_value=mock_model,
        ),
    ):
        yield


@pytest.fixture()
def chat(_mock_backend_env: None, store: InMemoryHistoryStore) -> AiChat:
    return AiChat(history_store=store, user_resolver=lambda: USER, show_tools=False)


class TestChatHistoryWiring:
    def test_user_resolved_via_custom_resolver(self, chat: AiChat) -> None:
        assert chat.backend.user_id == USER
        assert chat.backend.history_store is not None

    def test_default_view_is_the_tree(self, chat: AiChat) -> None:
        from panelini.panels.ai.history import HistoryTree

        assert isinstance(chat._history_panel, HistoryTree)
        assert chat._history_view == "tree"

    def test_action_row_order_and_alignment(self, chat: AiChat) -> None:
        # card body is a Column whose first object is the action row: new
        # chat + folder on the left, everything else right-aligned behind
        # a spacer, the view toggle at the very right
        row = list(chat._history_panel.card[0][0])
        assert row[:2] == [
            chat._history_panel.new_chat_button,
            chat._history_panel.new_folder_button,
        ]
        assert row[2:] == [
            chat.upload_chat_input,
            chat.download_chat_button,
            chat.undo_button,
            chat.redo_button,
            chat.view_toggle_button,
        ]
        assert chat.undo_button.disabled  # nothing to undo yet
        assert chat.redo_button.disabled

    def test_deleting_the_last_chat_leaves_no_row(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        chat.backend.persist_exchange("only chat", "reply")
        conv_id = chat.backend.conversation_id
        assert conv_id is not None

        chat._history_panel._on_tree_event("click", {"key": f"conv:{conv_id}", "action": "delete"})

        # nothing rematerializes: no rows, fresh lazy feed, hint shown
        assert store.list_conversations(USER) == []
        assert chat.backend.conversation_id is None
        assert chat._history_panel._empty_hint.visible
        assert not chat.undo_button.disabled  # undo still offered

    def test_undo_redo_stack_is_view_independent(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        """Delete in the tree, undo from the list: one session-level stack."""
        chat.backend.persist_exchange("cross view", "reply")
        conv_id = chat.backend.conversation_id
        assert conv_id is not None

        chat.delete_conversation(conv_id)
        chat._toggle_history_view()  # now on the list view

        # both views' button pairs mirror the same stack state
        assert len(chat._undo_buttons) == 2
        assert all(not b.disabled for b in chat._undo_buttons)
        assert all(b.disabled for b in chat._redo_buttons)

        chat._undo_delete()
        assert [c.title for c in store.list_conversations(USER)] == ["cross view"]
        assert all(b.disabled for b in chat._undo_buttons)
        assert all(not b.disabled for b in chat._redo_buttons)

        chat._redo_delete()
        assert store.list_conversations(USER) == []
        assert all(not b.disabled for b in chat._undo_buttons)
        assert all(b.disabled for b in chat._redo_buttons)

    def test_list_view_delete_feeds_the_same_stack(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        chat.backend.persist_exchange("from the list", "reply")
        conv_id = chat.backend.conversation_id
        assert conv_id is not None
        chat._toggle_history_view()  # list view
        list_panel = chat._history_panel

        list_panel._handle_delete(conv_id)  # arm
        list_panel._handle_delete(conv_id)  # delete -> shared stack

        assert store.list_conversations(USER) == []
        assert not chat.undo_button.disabled
        chat._undo_delete()
        assert [c.title for c in store.list_conversations(USER)] == ["from the list"]

    def test_undo_restores_in_lifo_order_and_new_delete_clears_redo(
        self, chat: AiChat, store: InMemoryHistoryStore
    ) -> None:
        first = store.create_conversation(USER, title="first")
        second = store.create_conversation(USER, title="second")
        chat.delete_conversation(first.id)
        chat.delete_conversation(second.id)

        chat._undo_delete()
        assert store.get_conversation(USER, second.id) is not None
        assert store.get_conversation(USER, first.id) is None
        assert not chat.redo_button.disabled

        other = store.create_conversation(USER, title="other")
        chat.delete_conversation(other.id)
        assert chat.redo_button.disabled  # new delete invalidates redo

        chat._undo_delete()  # restores "other"
        chat._undo_delete()  # restores "first"
        titles = {c.title for c in store.list_conversations(USER)}
        assert titles == {"first", "second", "other"}

    def test_view_toggle_switches_and_carries_the_search(self, chat: AiChat) -> None:
        """The toggle lazily mounts the list, flips visibility, keeps the filter."""
        tree_panel = chat._history_panel
        tree_panel.search_input.value_input = "deploy"

        chat._toggle_history_view()

        list_panel = chat._history_panel
        assert list_panel is not tree_panel
        assert chat._history_view == "list"
        # both cards stay mounted; only visibility flips
        assert list(chat._chat_tab) == [tree_panel.card, list_panel.card]
        assert not tree_panel.card.visible
        assert list_panel.card.visible
        # the typed filter carried over
        assert list_panel.search_input.value == "deploy"
        # each view has its own action icons; the list card carries a toggle too
        list_row: Any = list_panel.card[0][0]
        assert list_row[0] is list_panel.new_chat_button
        assert chat.upload_chat_input not in list(list_row)

        chat._toggle_history_view()

        # back to the same tree instance, no rebuild
        assert chat._history_panel is tree_panel
        assert tree_panel.card.visible
        assert not list_panel.card.visible

    def test_history_store_defaults_when_omitted(self, _mock_backend_env: None) -> None:
        # every chat gets history; without a store argument it is the shared default
        bare = AiChat(show_tools=False)
        assert bare.backend.history_store is not None

    def test_default_resolver_falls_back_to_local(self, _mock_backend_env: None, store: InMemoryHistoryStore) -> None:
        chat = AiChat(history_store=store, show_tools=False)  # no session context in unit tests
        assert chat.backend.user_id == "local"

    def test_new_chat_keeps_stored_conversation(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        chat.backend.persist_exchange("q", "a")
        old_id = chat.backend.conversation_id
        chat.start_new_chat()
        # the new chat is materialized immediately and selected
        assert chat.backend.conversation_id is not None
        assert chat.backend.conversation_id != old_id
        assert len(store.list_conversations(USER)) == 2
        # the new chat starts on an empty feed
        assert chat.chat_interface.objects == []

    def test_start_new_chat_materializes_and_selects(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        chat.start_new_chat()
        conversations = store.list_conversations(USER)
        assert len(conversations) == 1
        assert chat.backend.conversation_id == conversations[0].id
        assert chat._active_session.conversation_id == conversations[0].id

    def test_open_conversation_replays_messages(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "question")
        store.append_message(USER, conv.id, "ai", "answer")

        chat.open_conversation(conv.id)

        contents = [str(m.object) for m in chat.chat_interface.objects]
        assert contents == ["question", "answer"]

    def test_generation_routes_to_origin_conversation(
        self, chat: AiChat, store: InMemoryHistoryStore, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        """Switching chats mid-generation must not reroute the exchange."""
        origin_feed = chat.chat_interface

        busy_during_stream: list[set[str]] = []

        async def fake_stream(message: str, history: list | None = None) -> AsyncGenerator[str, None]:
            _ = (message, history)
            busy_during_stream.append(set(chat._generating_ids))
            chat.start_new_chat()  # user switches away mid-response
            yield "answer"

        chat.batch_update_tools(set())
        monkeypatch.setattr(chat.backend, "stream_message", fake_stream)

        async def consume() -> list[str]:
            return [c async for c in chat._handle_message("q", "user", origin_feed)]

        _run_async(consume)

        origin_session = chat._sessions[origin_feed]
        assert chat._active_session is not origin_session  # switch took effect
        assert origin_session.conversation_id is not None
        stored = store.load_messages(USER, origin_session.conversation_id)
        assert [(m.role, m.content) for m in stored] == [("human", "q"), ("ai", "answer")]
        # busy indicator was set during the stream and cleared afterwards
        assert busy_during_stream == [{origin_session.conversation_id}]
        assert chat._generating_ids == set()
        # finished while another chat was active: flagged ready until opened
        assert chat._ready_ids == {origin_session.conversation_id}
        chat.open_conversation(origin_session.conversation_id)
        assert chat._ready_ids == set()

    def test_open_conversation_reuses_session_feed(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "question")
        chat.open_conversation(conv.id)
        first_feed = chat.chat_interface
        chat.start_new_chat()
        chat.open_conversation(conv.id)
        assert chat.chat_interface is first_feed  # same feed, no re-replay

    def test_upload_creates_history_entry(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        import json
        from types import SimpleNamespace

        chat_data = {
            "messages": [{"user": "🧑 User", "content": "old question"}],
            "conversation_history": [
                {"type": "HumanMessage", "content": "old question"},
                {"type": "AIMessage", "content": "old answer"},
            ],
        }
        chat.upload_chat_input.filename = "old_chat.json"
        chat._on_upload_chat(SimpleNamespace(new=json.dumps(chat_data).encode(), obj=chat.upload_chat_input))

        conversations = store.list_conversations(USER)
        assert [c.title for c in conversations] == ["Imported: old_chat.json"]
        assert chat.backend.conversation_id == conversations[0].id
        # the imported conversation shows up as a history row
        titles = [node["title"] for node in chat._history_panel.tree.source]
        assert titles == ["Imported: old_chat.json"]

    def test_export_import_roundtrip_via_document(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        """The exported v2 document re-imports as a new conversation."""
        import json
        from types import SimpleNamespace

        chat.backend.persist_exchange("original question", "original answer")
        document = chat.backend.export_chat_data(provider="Test", model="m", temperature=0.7)
        assert document["schema_version"] == 2
        assert document["title"] == "original question"
        assert [m["role"] for m in document["messages"]] == ["human", "ai"]

        chat._on_upload_chat(SimpleNamespace(new=json.dumps(document).encode(), obj=chat.upload_chat_input))

        titles = [c.title for c in store.list_conversations(USER)]
        # the import keeps the document title and creates a second conversation
        assert titles.count("original question") == 2
        imported = store.load_messages(USER, chat.backend.conversation_id or "")
        assert [(m.role, m.content) for m in imported] == [
            ("human", "original question"),
            ("ai", "original answer"),
        ]

    def test_user_resolved_once_for_badge_and_history(
        self, _mock_backend_env: None, store: InMemoryHistoryStore
    ) -> None:
        calls: list[int] = []

        def resolver() -> str:
            calls.append(1)
            return USER

        from panelini import Panelini

        app = Panelini(use_ai=True, ai_history_store=store, show_user=True, user_resolver=resolver)
        assert app._ai_frontend.backend.user_id == USER
        badges = [o for col in app._navbar for o in col if "user-chip-pane" in getattr(o, "css_classes", [])]
        assert len(badges) == 1
        assert len(calls) == 1  # header badge and history share one resolution

    def test_list_view_selected_via_param(self, _mock_backend_env: None, store: InMemoryHistoryStore) -> None:
        from panelini import Panelini
        from panelini.panels.ai.history import HistoryPanel

        app = Panelini(
            use_ai=True,
            ai_history_store=store,
            ai_history_view="list",
            user_resolver=lambda: USER,
        )
        assert isinstance(app._ai_frontend._history_panel, HistoryPanel)
        tabs: Any = app._ai_frontend.sidebar_objects[0]
        assert tabs.objects[1][0].title == "Conversations"  # list card leads the chat tab

    def test_panelini_history_params(self, _mock_backend_env: None, store: InMemoryHistoryStore) -> None:
        from panelini import Panelini

        app = Panelini(use_ai=True, ai_history_store=store, user_resolver=lambda: USER)
        sidebar = app._ai_frontend.sidebar_objects
        tabs: Any = sidebar[0]
        assert isinstance(tabs, pn.Tabs)
        assert tabs.active == 1  # conversations tab active, setup leftmost
        setup_tab: Any = tabs.objects[0]
        chat_tab: Any = tabs.objects[1]
        # no "General Setup" wrapper: the setting cards sit directly in the tab
        assert [card.title for card in setup_tab] == ["Provider Settings", "Model Settings", "Basic Tools"]
        assert len(chat_tab) == 1  # the conversations card is the whole tab
        assert chat_tab[0].title == "Conversations"
        assert not chat_tab[0].collapsible  # the tab has nothing else to show
        assert app._ai_frontend.backend.user_id == USER

    def test_streamed_exchange_is_persisted(
        self, chat: AiChat, store: InMemoryHistoryStore, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        async def fake_stream(message: str, history: list | None = None) -> AsyncGenerator[str, None]:
            _ = (message, history)
            yield "streamed "
            yield "reply"

        chat.batch_update_tools(set())  # force the streaming (no-tools) branch
        monkeypatch.setattr(chat.backend, "stream_message", fake_stream)
        notified: list[bool] = []
        chat.on_history_changed = lambda: notified.append(True)

        async def consume() -> list[str]:
            return [chunk async for chunk in chat._handle_message("question", "user", chat.chat_interface)]

        chunks = _run_async(consume)

        assert chunks[-1] == "streamed reply"
        conversations = store.list_conversations(USER)
        assert len(conversations) == 1
        roles = [(m.role, m.content) for m in store.load_messages(USER, conversations[0].id)]
        assert roles == [("human", "question"), ("ai", "streamed reply")]
        # once when the row is created at send time, once after persisting
        assert notified == [True, True]
