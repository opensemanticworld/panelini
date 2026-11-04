"""Chat model factories against the real LangChain provider classes (no network)."""

from __future__ import annotations

import asyncio
import concurrent.futures
from collections.abc import Coroutine
from typing import Any
from unittest.mock import patch

import pytest
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import AIMessage, AIMessageChunk
from langchain_openai import AzureChatOpenAI, ChatOpenAI

from panelini.panels.ai.utils.ai_interface import (
    AiInterface,
    _create_anthropic_client,
    _create_azure_openai_client,
    _model_supports_temperature,
)
from panelini.panels.ai.utils.config import ProviderConfig


def _provider(client_type: str, **env_vars: str) -> ProviderConfig:
    return ProviderConfig(key="p", display_name="P", client_type=client_type, env_vars=env_vars, models=())


TEMPERATURE_FREE = [
    "claude-opus-4-7",
    "claude-opus-5",
    "claude-sonnet-5-5",
    "claude-sonnet-5-5-20260101",
    "claude-fable-5-1",
    "o1",
    "o1-preview",
    "o3-mini",
    "o4-mini",
    "gpt-5",
    "gpt-5-mini",
    "GPT-5.1",
    "gpt-5.6-sol",
    "gpt-6-astra",
    "gpt-6-sol",
    "gpt-6-luna",
    "gpt-6.1-sol",
    "gpt-6.1-terra",
    "gpt-7",
    "gpt-10",
    "o5-mini",
]
TEMPERATURE_OK = [
    "claude-sonnet-4-5",
    "claude-haiku-4-5",
    "claude-opus-4-6",
    "gpt-4o-2024-11-20",
    "gpt-4.1",
    "gpt-5-chat",
    "gpt-4",
    "gpt-4-turbo",
    "gpt-35-turbo",
    "ollama-3",
]


class TestTemperaturePolicy:
    @pytest.mark.parametrize("name", TEMPERATURE_FREE)
    def test_rejecting_models(self, name: str) -> None:
        assert not _model_supports_temperature(name)

    @pytest.mark.parametrize("name", TEMPERATURE_OK)
    def test_accepting_models(self, name: str) -> None:
        assert _model_supports_temperature(name)


class TestAnthropicFactory:
    def test_passes_limits_and_endpoint(self) -> None:
        provider = _provider("anthropic", api_key="k", endpoint="https://proxy.example")
        model = _create_anthropic_client(provider, "claude-sonnet-4-5", 0.3, 2048)
        assert isinstance(model, ChatAnthropic)
        assert model.max_tokens == 2048
        assert model.temperature == 0.3
        assert model.anthropic_api_url == "https://proxy.example"

    @pytest.mark.parametrize("name", ["claude-sonnet-5-5", "claude-fable-5-1", "claude-opus-4-7"])
    def test_temperature_omitted_for_rejecting_models(self, name: str) -> None:
        model = _create_anthropic_client(_provider("anthropic", api_key="k"), name, 0.7, 4096)
        assert isinstance(model, ChatAnthropic)
        assert model.temperature is None

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
        assert model.model_name == "gpt-4o-2024-11-20"
        assert model.temperature == 0.5

    @pytest.mark.parametrize("name", ["gpt-5", "o3-mini", "gpt-6-astra", "gpt-6.1-sol", "gpt-6-luna"])
    def test_temperature_omitted_for_reasoning_models(self, name: str) -> None:
        provider = _provider("azure_openai", api_key="k", endpoint="https://x.openai.azure.com", api_version="v")
        model = _create_azure_openai_client(provider, name, 0.5, 4096)
        assert isinstance(model, AzureChatOpenAI)
        assert model.temperature is None

    @pytest.mark.parametrize("name", ["gpt-6-astra", "gpt-6.1-sol", "gpt-6-luna", "gpt-5.6-sol"])
    def test_gpt6_tool_calls_use_responses_api(self, name: str) -> None:
        provider = _provider("azure_openai", api_key="k", endpoint="https://x.openai.azure.com", api_version="preview")
        model = _create_azure_openai_client(provider, name, 0.5, 4096)
        assert isinstance(model, AzureChatOpenAI)
        tool = {"type": "function", "function": {"name": "t", "parameters": {"type": "object", "properties": {}}}}
        assert model._use_responses_api({"tools": [tool]})

    @pytest.mark.parametrize(
        "endpoint", ["https://x.openai.azure.com/openai/v1", "https://x.openai.azure.com/openai/v1/"]
    )
    def test_v1_endpoint_uses_base_url_without_deployment_path(self, endpoint: str) -> None:
        provider = _provider("azure_openai", api_key="k", endpoint=endpoint, api_version="2024-08-01-preview")
        model = _create_azure_openai_client(provider, "gpt-6-luna", 0.5, 4096)
        assert type(model) is ChatOpenAI
        assert str(model.root_async_client.base_url) == "https://x.openai.azure.com/openai/v1/"
        assert model.temperature is None
        tool = {"type": "function", "function": {"name": "t", "parameters": {"type": "object", "properties": {}}}}
        assert model._use_responses_api({"tools": [tool]})


BLOCKS: list[str | dict[Any, Any]] = [
    {"type": "reasoning", "summary": []},
    {"type": "text", "text": "Hello "},
    {"type": "tool_use", "id": "t1", "name": "x", "input": {}},
    {"type": "text", "text": "world"},
]


class _FakeModel:
    """Chat model returning block-list content, as Anthropic tools and the Responses API do."""

    async def ainvoke(self, messages: object) -> AIMessage:
        return AIMessage(content=BLOCKS)

    async def astream(self, messages: object):
        for block in BLOCKS:
            yield AIMessageChunk(content=[block])


@pytest.fixture
def interface() -> AiInterface:
    provider = _provider("anthropic", api_key="k")
    with patch.object(AiInterface, "_initialize_model", return_value=_FakeModel()):
        return AiInterface(provider, "model-x")


def _run(coro: Coroutine[Any, Any, Any]) -> Any:
    """Run a coroutine on a fresh loop in a worker thread (the main thread may already have one)."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        return pool.submit(asyncio.run, coro).result()


class TestBlockContent:
    def test_non_streaming_returns_text_blocks_only(self, interface: AiInterface) -> None:
        history: list[Any] = []
        assert _run(interface.get_response("hi", stream=False, history=history)) == "Hello world"
        assert history[-1].content == "Hello world"

    def test_streaming_yields_text_blocks_only(self, interface: AiInterface) -> None:
        history: list[Any] = []

        async def collect() -> list[str]:
            stream = await interface.get_response("hi", stream=True, history=history)
            assert not isinstance(stream, str)
            return [chunk async for chunk in stream]

        assert _run(collect()) == ["Hello ", "world"]
        assert history[-1].content == "Hello world"

    def test_with_tools_returns_text_blocks_only(self, interface: AiInterface) -> None:
        result = _run(interface.get_response_with_tools("hi", history=[]))
        assert result["text"] == "Hello world"
