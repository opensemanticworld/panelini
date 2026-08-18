"""Tests for chat history persistence wiring in AiBackend and AiChat."""

from __future__ import annotations

import asyncio
from collections.abc import AsyncGenerator
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from unittest.mock import MagicMock, patch

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
    def test_disabled_without_store(self, config_yml_path: Path) -> None:
        bare = AiBackend(config_path=config_yml_path)
        assert not bare.history_enabled
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

    def test_load_conversation_restores_context(self, backend: AiBackend, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "question")
        store.append_message(USER, conv.id, "ai", "answer")
        store.append_message(USER, conv.id, "tool", "trace")  # skipped on load

        pairs = backend.load_conversation(conv.id)

        assert pairs == [("human", "question"), ("ai", "answer")]
        assert backend.conversation_id == conv.id
        assert backend.ai_interface is not None
        history = backend.ai_interface.conversation_history
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
        assert chat.backend.history_enabled

    def test_button_is_new_chat_with_history(self, chat: AiChat) -> None:
        assert chat.clear_chat_button.name == "New Chat"
        assert chat.clear_chat_button.button_type == "primary"

    def test_button_stays_destructive_without_history(self, _mock_backend_env: None) -> None:
        bare = AiChat(show_tools=False)
        assert bare.clear_chat_button.name == "Clear Chat & History"
        assert bare.clear_chat_button.button_type == "danger"

    def test_default_resolver_falls_back_to_local(self, _mock_backend_env: None, store: InMemoryHistoryStore) -> None:
        chat = AiChat(history_store=store, show_tools=False)  # no session context in unit tests
        assert chat.backend.user_id == "local"

    def test_new_chat_keeps_stored_conversation(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        chat.backend.persist_exchange("q", "a")
        chat._on_clear_chat(event=None)
        assert chat.backend.conversation_id is None
        assert len(store.list_conversations(USER)) == 1
        # feed reset to the welcome message only
        assert len(chat.chat_interface.objects) == 1

    def test_open_conversation_replays_messages(self, chat: AiChat, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "question")
        store.append_message(USER, conv.id, "ai", "answer")

        chat.open_conversation(conv.id)

        contents = [str(m.object) for m in chat.chat_interface.objects]
        assert contents == ["question", "answer"]

    def test_streamed_exchange_is_persisted(
        self, chat: AiChat, store: InMemoryHistoryStore, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        async def fake_stream(message: str) -> AsyncGenerator[str, None]:
            _ = message
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
        assert notified == [True]
