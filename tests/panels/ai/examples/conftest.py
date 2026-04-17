"""Shared fixtures for AI examples Playwright tests."""

from unittest.mock import MagicMock, patch

import pytest

from panelini.panels.ai.utils.config import AppConfig, ModelConfig, ProviderConfig


@pytest.fixture(scope="module")
def mock_langchain():
    """Context managers that mock the LangChain backend (config + model)."""
    fake_provider = ProviderConfig(
        key="test",
        display_name="Test Provider",
        client_type="anthropic",
        env_vars={"api_key": "fake-key", "endpoint": "https://localhost"},
        models=(ModelConfig(name="Test Model", value="test-model"),),
    )
    mock_model = MagicMock()
    mock_model.bind_tools = MagicMock(return_value=mock_model)
    return (
        patch(
            "panelini.panels.ai.backend.load_config",
            return_value=AppConfig(providers={"test": fake_provider}),
        ),
        patch(
            "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
            return_value=mock_model,
        ),
    )


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override parent fixture — don't reset Panel state mid-run."""
    yield
