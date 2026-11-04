"""Chat model factories against the real LangChain provider classes (no network)."""

from __future__ import annotations

import pytest
from langchain_anthropic import ChatAnthropic
from langchain_openai import AzureChatOpenAI

from panelini.panels.ai.utils.ai_interface import _create_anthropic_client, _create_azure_openai_client
from panelini.panels.ai.utils.config import ProviderConfig


def _provider(client_type: str, **env_vars: str) -> ProviderConfig:
    return ProviderConfig(key="p", display_name="P", client_type=client_type, env_vars=env_vars, models=())


class TestAnthropicFactory:
    def test_passes_limits_and_endpoint(self) -> None:
        provider = _provider("anthropic", api_key="k", endpoint="https://proxy.example")
        model = _create_anthropic_client(provider, "claude-sonnet-4-5", 0.3, 2048)
        assert isinstance(model, ChatAnthropic)
        assert model.max_tokens == 2048
        assert model.temperature == 0.3
        assert model.anthropic_api_url == "https://proxy.example"

    @pytest.mark.parametrize("endpoint", ["", None])
    def test_empty_endpoint_keeps_default_url(self, endpoint: str | None, monkeypatch: pytest.MonkeyPatch) -> None:
        for name in ("ANTHROPIC_API_URL", "ANTHROPIC_BASE_URL", "LANGSMITH_GATEWAY"):
            monkeypatch.delenv(name, raising=False)
        env = {"api_key": "k"} if endpoint is None else {"api_key": "k", "endpoint": endpoint}
        model = _create_anthropic_client(_provider("anthropic", **env), "claude-sonnet-4-5", 0.7, 4096)
        assert isinstance(model, ChatAnthropic)
        assert model.anthropic_api_url == "https://api.anthropic.com"


class TestAzureFactory:
    def test_builds_with_deployment_and_temperature(self) -> None:
        provider = _provider(
            "azure_openai", api_key="k", endpoint="https://x.openai.azure.com", api_version="2024-10-21"
        )
        model = _create_azure_openai_client(provider, "gpt-4o-2024-11-20", 0.5, 4096)
        assert isinstance(model, AzureChatOpenAI)
        assert model.deployment_name == "gpt-4o-2024-11-20"
        assert model.temperature == 0.5
