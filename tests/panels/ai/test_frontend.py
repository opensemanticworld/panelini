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
