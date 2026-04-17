"""Shared fixtures for AI panel tests."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import panel as pn
import pytest

# Skip the entire directory when langchain is not installed
langchain = pytest.importorskip("langchain")

from panelini.panels.ai.utils.config import AppConfig, ModelConfig, ProviderConfig  # noqa: E402


@pytest.fixture()
def sample_provider() -> ProviderConfig:
    """A minimal ProviderConfig for unit tests (no real API calls)."""
    return ProviderConfig(
        key="test_provider",
        display_name="Test Provider",
        client_type="anthropic",
        env_vars={"api_key": "fake-key", "endpoint": "https://localhost"},
        models=(
            ModelConfig(name="Model A", value="model-a"),
            ModelConfig(name="Model B", value="model-b"),
        ),
    )


@pytest.fixture()
def sample_config(sample_provider: ProviderConfig) -> AppConfig:
    """An AppConfig containing a single test provider."""
    return AppConfig(providers={"test_provider": sample_provider})


@pytest.fixture()
def config_yml_path(tmp_path: Path) -> Path:
    """Write a minimal valid config.yml and return its path."""
    content = """\
providers:
  test:
    display_name: "Test Provider"
    client_type: "anthropic"
    env_vars:
      api_key: "test-key"
      endpoint: "https://localhost"
    models:
      - name: "Test Model"
        value: "test-model"
"""
    p = tmp_path / "config.yml"
    p.write_text(content)
    return p


@pytest.fixture()
def env_var_config_yml(tmp_path: Path) -> Path:
    """Write a config.yml that references environment variables."""
    content = """\
providers:
  test:
    display_name: "Test"
    client_type: "anthropic"
    env_vars:
      api_key: "${TEST_API_KEY}"
      endpoint: "${TEST_ENDPOINT}"
    models:
      - name: "M1"
        value: "m1"
"""
    p = tmp_path / "config.yml"
    p.write_text(content)
    return p


@pytest.fixture()
def mock_ai_interface(sample_provider: ProviderConfig) -> Any:
    """Return a mock-friendly AiInterface (not connected to any real LLM)."""
    from unittest.mock import AsyncMock, MagicMock

    from panelini.panels.ai.utils.ai_interface import AiInterface

    iface = MagicMock(spec=AiInterface)
    iface.provider = sample_provider
    iface.conversation_history = []
    iface.system_message = "test"
    iface.tools = []
    iface.model = MagicMock()
    iface.clear_history = MagicMock(side_effect=lambda: iface.conversation_history.clear())
    iface.get_response = AsyncMock(return_value="mock response")
    iface.get_response_with_tools = AsyncMock(return_value={"text": "mock tool response", "tool_calls": []})
    return iface


PORT = [6100]  # offset from jsoneditor (6000) to avoid port conflicts


@pytest.fixture
def port():
    PORT[0] += 1
    return PORT[0]


@pytest.fixture(autouse=True)
def server_cleanup():
    """Clean up Panel server state after each test."""
    try:
        yield
    finally:
        pn.state.reset()
