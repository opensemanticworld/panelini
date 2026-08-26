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


@pytest.fixture(scope="module")
def mock_anthropic_sdk():
    """Patch the Anthropic SDK + the config lookup used by drawai_beautify.

    Returns a tuple of (config_patch, anthropic_patch, canned_xml). The UI test
    applies both patches under ``with`` before reloading the example module.

    The config patch supplies an ``anthropic`` provider (the drawai example
    looks it up by key in its ``_anthropic_credentials_from_config`` helper).
    This is separate from ``mock_langchain``'s patch, which targets the
    backend's ``load_config`` reference with a generic "test" provider.
    """
    from unittest.mock import AsyncMock

    canned_xml = "<mxfile><diagram id='beautified'/></mxfile>"

    block = MagicMock()
    block.text = canned_xml
    response = MagicMock()
    response.content = [block]

    anthropic_client = MagicMock()
    anthropic_client.messages = MagicMock()
    anthropic_client.messages.create = AsyncMock(return_value=response)

    fake_provider = ProviderConfig(
        key="anthropic",
        display_name="Anthropic",
        client_type="anthropic",
        env_vars={"api_key": "fake-key", "endpoint": "https://localhost"},
        models=(ModelConfig(name="Claude Opus 4.7", value="anthropic/claude-opus-4-7"),),
    )
    fake_config = AppConfig(providers={"anthropic": fake_provider})

    config_patch = patch(
        "examples.panels.ai.drawai_beautify.load_config",
        return_value=fake_config,
    )
    anthropic_patch = patch(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        return_value=anthropic_client,
    )
    return config_patch, anthropic_patch, canned_xml
