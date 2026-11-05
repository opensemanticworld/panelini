"""Tests for panelini.panels.ai.frontend.AiChat initialization behavior."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from panelini.panels.ai.utils.config import AppConfig, ModelConfig, ProviderConfig

pytestmark = pytest.mark.ai


class _EchoInput(BaseModel):
    text: str = Field(..., description="text to echo")


class _EchoTool(BaseTool):
    name: str = "echo_tool"
    description: str = "Echo the input."
    args_schema: type[BaseModel] = _EchoInput

    def _run(self, text: str) -> str:
        return text

    async def _arun(self, text: str) -> str:
        return text


@pytest.fixture()
def _mock_backend_env():
    """Patch config loading + model init so AiChat can be built without credentials."""
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


class TestUserSuppliedToolsDefaultEnabled:
    def test_user_tool_checkbox_ticked_by_default(self, _mock_backend_env) -> None:
        from panelini.panels.ai.frontend import AiChat

        echo = _EchoTool()
        chat = AiChat(tools=[echo])

        assert "echo_tool" in chat.tool_checkboxes
        assert chat.tool_checkboxes["echo_tool"]["checkbox"].value is True

    def test_builtin_update_preview_stays_off_by_default(self, _mock_backend_env) -> None:
        """Regression guard: only ``get_current_time`` is on by default among built-ins."""
        from panelini.panels.ai.frontend import AiChat

        chat = AiChat(tools=None)

        assert chat.tool_checkboxes["get_current_time"]["checkbox"].value is True
        assert chat.tool_checkboxes["update_preview"]["checkbox"].value is False

    def test_backend_seeded_with_user_tools(self, _mock_backend_env) -> None:
        """The backend must hold user-supplied tools so the first message can dispatch them."""
        from panelini.panels.ai.frontend import AiChat

        echo = _EchoTool()
        chat = AiChat(tools=[echo])

        tool_names = {t.name for t in chat.backend.current_tools}
        assert "echo_tool" in tool_names
        assert "get_current_time" in tool_names


@pytest.fixture()
def _effort_providers():
    """Real Claude and GPT-4o models (no network): effort levels come from their profiles."""
    claude = ProviderConfig(
        key="claude",
        display_name="Claude",
        client_type="anthropic",
        env_vars={"api_key": "fake", "endpoint": "https://localhost"},
        models=(ModelConfig(name="Opus", value="claude-opus-5-5"), ModelConfig(name="Haiku", value="claude-haiku-4-5")),
    )
    azure = ProviderConfig(
        key="azure",
        display_name="Azure",
        client_type="azure_openai",
        env_vars={"api_key": "fake", "endpoint": "https://x.openai.azure.com", "api_version": "v"},
        models=(ModelConfig(name="GPT-4o", value="gpt-4o-2024-11-20"),),
    )
    config = AppConfig(providers={"claude": claude, "azure": azure})
    with patch("panelini.panels.ai.backend.load_config", return_value=config):
        yield claude, azure


class TestReasoningEffortSelector:
    def test_lists_supported_levels_with_high_selected(self, _effort_providers) -> None:
        from panelini.panels.ai.frontend import AiChat

        selector = AiChat(tools=None).reasoning_effort_selector

        assert list(selector.options) == ["Low", "Medium", "High", "Extra high", "Max"]
        assert selector.value == "high"
        assert not selector.disabled

    def test_choosing_a_level_reaches_the_model(self, _effort_providers) -> None:
        from panelini.panels.ai.frontend import AiChat

        chat = AiChat(tools=None)
        chat.reasoning_effort_selector.value = "max"

        assert chat.backend.ai_interface is not None
        assert chat.backend.ai_interface.reasoning_effort == "max"

    def test_disabled_while_the_model_has_no_effort_support(self, _effort_providers) -> None:
        from panelini.panels.ai.frontend import AiChat

        claude, _ = _effort_providers
        opus, haiku = claude.models
        chat = AiChat(tools=None)
        selector = chat.reasoning_effort_selector
        selector.value = "low"

        chat.model_selector.value = haiku
        assert selector.disabled

        chat.model_selector.value = opus
        assert not selector.disabled
        assert selector.value == "low"

    def test_disabled_after_switching_to_a_provider_without_effort_support(self, _effort_providers) -> None:
        from panelini.panels.ai.frontend import AiChat

        _, azure = _effort_providers
        chat = AiChat(tools=None)

        chat.provider_selector.value = azure

        assert chat.reasoning_effort_selector.disabled
