"""Tests for panelini.panels.ai.backend."""

from __future__ import annotations

from pathlib import Path
from typing import Any
from unittest.mock import MagicMock

import pytest

from panelini.panels.ai.backend import AiBackend
from panelini.panels.ai.utils.config import ModelConfig, ProviderConfig

pytestmark = pytest.mark.ai


@pytest.fixture()
def backend(config_yml_path: Path) -> AiBackend:
    """Create an AiBackend using the test config (no real API calls)."""
    return AiBackend(system_message="test system msg", config_path=config_yml_path)


class TestAiBackendInit:
    def test_loads_config(self, backend: AiBackend) -> None:
        assert backend._config is not None
        assert len(backend._config.providers) >= 1

    def test_default_system_message(self, config_yml_path: Path) -> None:
        b = AiBackend(config_path=config_yml_path)
        assert b._system_message == "You are a helpful assistant."

    def test_custom_system_message(self, backend: AiBackend) -> None:
        assert backend._system_message == "test system msg"

    def test_has_ai_interface(self, backend: AiBackend) -> None:
        assert backend.ai_interface is not None


class TestProviderAndModel:
    def test_get_available_providers(self, backend: AiBackend) -> None:
        providers = backend.get_available_providers()
        assert len(providers) >= 1
        for name, prov in providers.items():
            assert isinstance(name, str)
            assert isinstance(prov, ProviderConfig)

    def test_get_available_models(self, backend: AiBackend) -> None:
        models = backend.get_available_models(backend.current_provider)
        assert len(models) >= 1
        for name, model in models.items():
            assert isinstance(name, str)
            assert isinstance(model, ModelConfig)

    def test_update_model(self, backend: AiBackend) -> None:
        model = backend.current_provider.models[0]
        result = backend.update_model(model)
        assert result == model.value

    def test_update_temperature(self, backend: AiBackend) -> None:
        backend.update_temperature(0.3)
        assert backend.current_temperature == 0.3


class TestHistory:
    def test_clear_history(self, backend: AiBackend) -> None:
        assert backend.ai_interface is not None
        backend.ai_interface.conversation_history = [MagicMock()]
        backend.clear_history()
        assert len(backend.ai_interface.conversation_history) == 0

    def test_get_empty_history(self, backend: AiBackend) -> None:
        assert backend.get_conversation_history() == []


class TestTools:
    def test_update_tools(self, backend: AiBackend) -> None:
        from panelini.panels.ai.tools.basic_tools import get_current_time_tool

        count = backend.update_tools([get_current_time_tool])
        assert count == 1
        assert len(backend.current_tools) == 1


class TestExportRestore:
    def test_export_is_a_v2_conversation_document(self, backend: AiBackend) -> None:
        data = backend.export_chat_data(provider="Test", model="test-model", temperature=0.5)
        assert data["schema_version"] == 2
        assert data["type"] == "Conversation"
        assert "@context" in data
        assert "user_id" not in data  # the importer becomes the owner
        assert data["settings"] == {"provider": "Test", "model": "test-model", "temperature": 0.5}
        assert data["messages"] == []

    def test_restore_v2_document(self, backend: AiBackend) -> None:
        chat_data: dict[str, Any] = {
            "schema_version": 2,
            "type": "Conversation",
            "id": "abc",
            "title": "old chat",
            "created_at": "2026-01-01T10:00:00+00:00",
            "updated_at": "2026-01-01T10:00:00+00:00",
            "messages": [
                {"id": "m1", "role": "human", "content": "hello", "created_at": "2026-01-01T10:00:00+00:00"},
                {"id": "m2", "role": "ai", "content": "hi there", "created_at": "2026-01-01T10:00:01+00:00"},
            ],
        }
        pairs = backend.restore_chat_data(chat_data)
        assert pairs == [("human", "hello"), ("ai", "hi there")]
        assert backend.ai_interface is not None
        assert len(backend.ai_interface.conversation_history) == 2

    def test_restore_legacy_format(self, backend: AiBackend) -> None:
        chat_data: dict[str, Any] = {
            "conversation_history": [
                {"type": "HumanMessage", "content": "hello"},
                {"type": "AIMessage", "content": "hi there"},
            ]
        }
        pairs = backend.restore_chat_data(chat_data)
        assert pairs == [("human", "hello"), ("ai", "hi there")]
        assert backend.ai_interface is not None
        assert len(backend.ai_interface.conversation_history) == 2
