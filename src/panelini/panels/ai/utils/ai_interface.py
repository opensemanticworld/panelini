"""AI interface for interacting with various LLM providers."""

import os
import re
from collections.abc import AsyncGenerator, Callable, Mapping, Sequence
from typing import Any

from langchain_anthropic import ChatAnthropic
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.runnables import Runnable
from langchain_core.tools import BaseTool
from langchain_openai import AzureChatOpenAI, ChatOpenAI

from .config import ModelConfig, ProviderConfig, parse_model_value

# ---------------------------------------------------------------------------
# Provider registry: maps client_type strings to factory functions.
# Each factory receives (provider, model_name, temperature, max_tokens)
# and returns a BaseChatModel.
#
# env_vars values are already resolved; the Azure factory also falls back to the environment.
# ---------------------------------------------------------------------------

_ClientFactory = Callable[[ProviderConfig, str, float, int], BaseChatModel]

# OpenAI reasoning models (o-series, gpt-5 and later, incl. gpt-5.6 and the
# gpt-6 family) accept ``temperature`` only without reasoning, so it is always
# omitted. ``gpt-35`` is Azure's legacy name for GPT-3.5, not a version 35.
_OPENAI_REASONING = re.compile(r"o\d|gpt-(?!35\b)(?:[5-9]|\d{2,})")


def _model_supports_temperature(model_name: str) -> bool:
    """Return False for OpenAI models that reject the ``temperature`` parameter."""
    name = model_name.lower()
    if name.startswith("gpt-") and "chat" in name:
        return True  # gpt-5-chat keeps sampling controls
    return not _OPENAI_REASONING.match(name)


# Reasoning effort levels, weakest to strongest.
_EFFORT_ORDER = ("none", "minimal", "low", "medium", "high", "xhigh", "max")
# Accepted by every OpenAI reasoning model, for those missing from the LangChain profiles.
_OPENAI_BASIC_EFFORT = ("low", "medium", "high")
# Claude models that support all five levels but are missing from the LangChain profiles.
_ANTHROPIC_UNLISTED_EFFORT = ("claude-haiku-5-5",)
_ANTHROPIC_FULL_EFFORT = ("low", "medium", "high", "xhigh", "max")


def _reasoning_effort_levels(client_type: str, model: BaseChatModel, model_name: str) -> tuple[str, ...]:
    """Return the effort levels the model accepts, empty if it has no effort control."""
    profile = getattr(model, "profile", None)
    levels = profile.get("reasoning_effort_levels") if isinstance(profile, Mapping) else None
    if levels:
        return tuple(levels)
    if client_type == "azure_openai" and not _model_supports_temperature(model_name):
        return _OPENAI_BASIC_EFFORT
    if client_type == "anthropic" and model_name.startswith(_ANTHROPIC_UNLISTED_EFFORT):
        return _ANTHROPIC_FULL_EFFORT
    return ()


def _resolve_reasoning_effort(requested: str | None, levels: Sequence[str]) -> str | None:
    """Return ``requested`` if supported, else the nearest lower level, else the lowest."""
    if not requested or not levels:
        return None
    if requested in levels:
        return requested
    rank = _EFFORT_ORDER.index(requested)
    lower = [lvl for lvl in levels if lvl in _EFFORT_ORDER and _EFFORT_ORDER.index(lvl) < rank]
    return max(lower, key=_EFFORT_ORDER.index) if lower else levels[0]


def _create_anthropic_client(
    provider: ProviderConfig,
    model_name: str,
    temperature: float,
    max_tokens: int,
) -> BaseChatModel:
    """Create a ChatAnthropic instance from provider config."""
    # The Anthropic endpoint rejects ``temperature`` ("Extra inputs are not
    # permitted") for current Claude models, so it is never sent.
    _ = temperature

    api_key = provider.env_vars.get("api_key", "")
    endpoint = provider.env_vars.get("endpoint", "")

    # dict[str, Any] (not `object`): these values are passed straight through to
    # ChatAnthropic's pydantic-validated constructor, whose individual keyword
    # parameters accept a variety of concrete types (str, bool, float, ...). Typing
    # this as `object` made every one of them look incompatible to ty; `Any` reflects
    # that the values are genuinely heterogeneous and pydantic validates them at runtime.
    kwargs: dict[str, Any] = {
        "model_name": model_name,
        "max_tokens_to_sample": max_tokens,
        "anthropic_api_key": api_key,
    }
    # An empty base_url reaches the client as-is and overrides its default endpoint.
    if endpoint:
        kwargs["base_url"] = endpoint

    return ChatAnthropic(**kwargs)


def _create_azure_openai_client(
    provider: ProviderConfig,
    model_name: str,
    temperature: float,
    max_tokens: int,
) -> BaseChatModel:
    """Create an AzureChatOpenAI instance from provider config."""
    _ = max_tokens  # Azure OpenAI does not use max_tokens at init

    # An empty value falls back to the Azure environment variables. Passing ``""``
    # instead would block that fallback and yield a base URL without a host.
    api_key = provider.env_vars.get("api_key") or os.getenv("AZURE_OPENAI_API_KEY") or ""
    endpoint = provider.env_vars.get("endpoint") or os.getenv("AZURE_OPENAI_ENDPOINT") or ""
    api_version = provider.env_vars.get("api_version") or os.getenv("OPENAI_API_VERSION") or ""

    # The key is always passed explicitly, so a stray OPENAI_API_KEY is never sent to Azure.
    kwargs: dict[str, Any] = {"model": model_name, "openai_api_key": api_key}
    if _model_supports_temperature(model_name):
        kwargs["temperature"] = temperature

    # The v1 endpoint takes the deployment as ``model`` and needs no api version.
    if endpoint.rstrip("/").endswith("/openai/v1"):
        return ChatOpenAI(base_url=endpoint, **kwargs)

    # ``model`` lets langchain-openai route GPT-6 tool calls to the Responses API.
    return AzureChatOpenAI(
        azure_deployment=model_name,
        azure_endpoint=endpoint or None,
        openai_api_version=api_version or None,
        **kwargs,
    )


PROVIDER_CLASS_REGISTRY: dict[str, _ClientFactory] = {
    "anthropic": _create_anthropic_client,
    "azure_openai": _create_azure_openai_client,
}


class AiInterface:
    """Interface for interacting with AI models.

    This class provides a unified interface for working with different LLM providers,
    supporting streaming responses, tool usage, and conversation history management.

    Attributes:
        model: The underlying chat model instance
        provider: The model provider being used
        tools: List of tools available to the model
        conversation_history: List of messages in the conversation
        system_message: Optional system message for the conversation
    """

    def __init__(
        self,
        provider: ProviderConfig,
        model_name: str | ModelConfig,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        tools: list[BaseTool] | None = None,
        system_message: str | None = None,
        reasoning_effort: str | None = None,
    ) -> None:
        """Initialize the AI interface.

        Args:
            provider: The provider configuration
            model_name: The specific model to use (string or ModelConfig)
            temperature: Sampling temperature (0-1)
            max_tokens: Maximum tokens in response
            tools: Optional list of LangChain tools
            system_message: Optional system message for the conversation
            reasoning_effort: Requested effort level; sent only if the model supports
                it, falling back to the nearest lower supported level
        """
        self.provider = provider
        self.tools = tools or []
        self.conversation_history: list[BaseMessage] = []
        self.system_message = system_message

        # Extract model name string from ModelConfig if needed, then strip
        # any LiteLLM provider prefix so LangChain receives bare model names.
        raw_value = model_name.value if isinstance(model_name, ModelConfig) else model_name
        _, model_name_str = parse_model_value(raw_value)

        # Initialize the appropriate model
        base_model = self._initialize_model(
            provider=provider,
            model_name=model_name_str,
            temperature=temperature,
            max_tokens=max_tokens,
        )

        # Effort support is read from the model's profile, so it is set after construction.
        self.reasoning_effort_levels = _reasoning_effort_levels(provider.client_type, base_model, model_name_str)
        self.reasoning_effort = _resolve_reasoning_effort(reasoning_effort, self.reasoning_effort_levels)
        if self.reasoning_effort:
            setattr(base_model, "reasoning_effort", self.reasoning_effort)  # noqa: B010 - not on BaseChatModel

        # Bind tools to model if provided
        self.model: Runnable[Any, Any] = base_model.bind_tools(self.tools) if self.tools else base_model

    @staticmethod
    def _initialize_model(
        provider: ProviderConfig,
        model_name: str,
        temperature: float,
        max_tokens: int,
    ) -> BaseChatModel:
        """Initialize the chat model based on provider.

        Args:
            provider: The provider configuration
            model_name: The model name
            temperature: Sampling temperature
            max_tokens: Maximum tokens

        Returns:
            Initialized chat model

        Raises:
            ValueError: If provider is not supported or required env vars are missing
        """
        factory = PROVIDER_CLASS_REGISTRY.get(provider.client_type)
        if factory is None:
            msg = f"Unsupported client_type: {provider.client_type}"
            raise ValueError(msg)
        return factory(provider, model_name, temperature, max_tokens)

    def add_tool(self, tool: BaseTool) -> None:
        """Add a tool to the interface.

        Args:
            tool: LangChain tool to add
        """
        self.tools.append(tool)
        # Rebind all tools to the model. `self.model` is typed as the generic
        # `Runnable[Any, Any]` (it may be a `RunnableBinding` proxying attribute
        # access to the underlying chat model via `__getattr__`, e.g. after a
        # previous `bind_tools()` call), so `bind_tools` isn't a statically known
        # attribute here; use getattr for the dynamic dispatch this depends on.
        bind_tools = getattr(self.model, "bind_tools", None)
        if bind_tools is not None:
            self.model = bind_tools(self.tools)

    def clear_history(self) -> None:
        """Clear the conversation history."""
        self.conversation_history = []

    def _build_messages(self, user_message: str, history: list[BaseMessage] | None = None) -> list[BaseMessage]:
        """Build the message list for the model.

        Args:
            user_message: The user's message
            history: Conversation context; defaults to the instance history.

        Returns:
            List of messages including system, history, and current user message
        """
        if history is None:
            history = self.conversation_history
        messages: list[BaseMessage] = []

        # Add system message if provided
        if self.system_message:
            messages.append(SystemMessage(content=self.system_message))

        # Add conversation history
        messages.extend(history)

        # Add current user message
        messages.append(HumanMessage(content=user_message))

        return messages

    async def get_response(
        self, user_message: str, stream: bool = True, history: list[BaseMessage] | None = None
    ) -> str | AsyncGenerator[str, None]:
        """Get a response from the AI model.

        Args:
            user_message: The user's input message
            stream: Whether to stream the response
            history: Conversation context to read and append to; defaults to
                the instance history. Passing an explicit list keeps
                concurrent conversations isolated from each other.

        Returns:
            Either a complete response string or an async generator for streaming

        Raises:
            Exception: If the model invocation fails
        """
        if history is None:
            history = self.conversation_history

        # Build messages
        messages = self._build_messages(user_message, history=history)

        # Add user message to history
        history.append(HumanMessage(content=user_message))

        if stream:
            return self._stream_response(messages, history=history)
        else:
            # Non-streaming response
            response = await self.model.ainvoke(messages)
            response_text = response.text

            # Add AI response to history
            history.append(AIMessage(content=response_text))

            return response_text

    async def _stream_response(
        self, messages: list[BaseMessage], history: list[BaseMessage] | None = None
    ) -> AsyncGenerator[str, None]:
        """Stream response from the model.

        Args:
            messages: List of messages to send to the model
            history: Conversation context the response is appended to.

        Yields:
            Chunks of the response text
        """
        if history is None:
            history = self.conversation_history
        full_response = ""

        async for chunk in self.model.astream(messages):
            if chunk.text:
                full_response += chunk.text
                yield chunk.text

        # Add complete response to history
        history.append(AIMessage(content=full_response))

    async def get_response_with_tools(
        self, user_message: str, history: list[BaseMessage] | None = None
    ) -> dict[str, Any]:
        """Get a response that may include tool calls.

        Args:
            user_message: The user's input message
            history: Conversation context; defaults to the instance history.

        Returns:
            Dictionary containing response text and any tool calls

        Raises:
            Exception: If the model invocation fails
        """
        if history is None:
            history = self.conversation_history
        messages = self._build_messages(user_message, history=history)

        # Add user message to history
        history.append(HumanMessage(content=user_message))

        # Invoke model
        response = await self.model.ainvoke(messages)

        # Extract response content and tool calls
        response_text = response.text
        tool_calls = getattr(response, "tool_calls", [])

        # Add AI response to history
        history.append(AIMessage(content=response_text, tool_calls=tool_calls))

        return {
            "text": response_text,
            "tool_calls": tool_calls,
        }


def create_interface(
    provider: ProviderConfig,
    model: str | ModelConfig,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    system_message: str | None = None,
    tools: list[BaseTool] | None = None,
    reasoning_effort: str | None = None,
) -> AiInterface:
    """Create an AI interface for any configured provider.

    Args:
        provider: The provider configuration
        model: The model to use (string or ModelConfig)
        temperature: Sampling temperature
        max_tokens: Maximum tokens in response
        system_message: Optional system message
        tools: Optional list of tools
        reasoning_effort: Requested reasoning effort level

    Returns:
        Configured AiInterface instance
    """
    return AiInterface(
        provider=provider,
        model_name=model,
        temperature=temperature,
        max_tokens=max_tokens,
        tools=tools,
        system_message=system_message,
        reasoning_effort=reasoning_effort,
    )
