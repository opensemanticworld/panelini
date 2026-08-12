"""Offline stand-ins for the LangChain stack used by ``panelini.panels.ai``.

The AI examples import LangChain and talk to a real provider. Two places need them to
run without either:

- the docs media tests, which record a scripted exchange and must be deterministic
- the Pyodide portfolio apps, where LangChain cannot be installed at all
  (``langchain-core`` requires ``uuid-utils`` and ``zstandard``, native extensions with
  no pure-Python wheel) and where credentials must never be shipped

:func:`install` registers stand-in modules in ``sys.modules`` **before** the example is
imported, so the example's own ``import langchain...`` lines resolve to these. The
example files are never modified: run them normally and they get the real LangChain and
a real model.

The stub answers with a fixed reply, so anything rendered from it is a simulation, not
model output. Label it as such wherever it is shown.
"""

from __future__ import annotations

import asyncio
import os
import sys
import types
from pathlib import Path
from typing import Any, ClassVar

DEFAULT_REPLY = (
    "This is a simulated reply: the demo runs without a language model, so the "
    "answer is canned. Run the example locally with your own provider "
    "credentials to chat for real."
)

# Environment variables referenced by the packaged default_config.yml. Values are
# placeholders; nothing is ever sent anywhere because the model is a stub.
_PLACEHOLDER_ENV = {
    "ANTHROPIC_API_KEY": "stub-key",
    "ANTHROPIC_ENDPOINT": "https://localhost",
    "AZURE_OPENAI_API_KEY": "stub-key",
    "AZURE_OPENAI_ENDPOINT": "https://localhost",
    "AZURE_OPENAI_API_VERSION": "2024-01-01",
}


class _Message:
    """Minimal stand-in for a LangChain message."""

    def __init__(self, content: Any = "", **kwargs: Any) -> None:
        self.content = content
        self.tool_calls = kwargs.pop("tool_calls", []) or []
        self.tool_call_id = kwargs.pop("tool_call_id", None)
        self.additional_kwargs = kwargs

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.content!r})"


class BaseMessage(_Message):
    pass


class AIMessage(_Message):
    pass


class HumanMessage(_Message):
    pass


class SystemMessage(_Message):
    pass


class ToolMessage(_Message):
    pass


class _Chunk:
    """One streamed piece of an assistant reply."""

    def __init__(self, content: str) -> None:
        self.content = content


class StubChatModel:
    """Chat model that streams a fixed reply and never calls a tool.

    Mirrors the slice of the LangChain runnable interface that
    ``panelini.panels.ai`` actually uses: ``bind_tools``, ``ainvoke`` and ``astream``.
    """

    def __init__(self, reply: str = DEFAULT_REPLY, chunk_size: int = 12, delay: float = 0.04) -> None:
        self.reply = reply
        self.chunk_size = chunk_size
        self.delay = delay
        self.tools: list[Any] = []

    def bind_tools(self, tools: Any) -> StubChatModel:
        self.tools = list(tools or [])
        return self

    async def ainvoke(self, messages: Any = None, **kwargs: Any) -> AIMessage:
        return AIMessage(content=self.reply, tool_calls=[])

    async def astream(self, messages: Any = None, **kwargs: Any) -> Any:
        """Yield the reply in small pieces so the UI shows it typing."""
        for start in range(0, len(self.reply), self.chunk_size):
            if self.delay:
                await asyncio.sleep(self.delay)
            yield _Chunk(self.reply[start : start + self.chunk_size])


def _make_base_tool() -> type:
    """Build a ``BaseTool`` base class that examples can subclass.

    It has to be a real class (the custom-tool example subclasses it), and pydantic is
    available both under pytest and in Pyodide, so the shape matches the real one
    closely enough for tool definitions to import and instantiate.
    """
    from pydantic import BaseModel, ConfigDict

    class BaseTool(BaseModel):
        model_config: ClassVar[ConfigDict] = ConfigDict(arbitrary_types_allowed=True)

        name: str = "tool"
        description: str = ""
        args_schema: type | None = None

        def _run(self, *args: Any, **kwargs: Any) -> Any:
            raise NotImplementedError

        async def _arun(self, *args: Any, **kwargs: Any) -> Any:
            return self._run(*args, **kwargs)

        def invoke(self, tool_input: Any = None, **kwargs: Any) -> Any:
            if isinstance(tool_input, dict):
                return self._run(**tool_input)
            return self._run(tool_input) if tool_input is not None else self._run()

        async def ainvoke(self, tool_input: Any = None, **kwargs: Any) -> Any:
            if isinstance(tool_input, dict):
                return await self._arun(**tool_input)
            return await self._arun(tool_input) if tool_input is not None else await self._arun()

    return BaseTool


def _module(name: str, **attrs: Any) -> types.ModuleType:
    mod = types.ModuleType(name)
    for key, value in attrs.items():
        setattr(mod, key, value)
    sys.modules[name] = mod
    return mod


def install(reply: str = DEFAULT_REPLY) -> None:
    """Register the LangChain stand-ins and placeholder credentials.

    Call this **before** importing an AI example (or ``panelini.panels.ai``). It is a
    no-op if the real ``langchain_core`` is already imported, so a normal run is never
    affected.

    Args:
        reply: The canned assistant answer streamed for every prompt.
    """
    if "langchain_core" in sys.modules and not getattr(sys.modules["langchain_core"], "_panelini_stub", False):
        return

    # Pin the packaged config. Discovery otherwise walks up from the working directory
    # and can pick up a developer's own config.yml, whose provider blocks reference
    # environment variables this stub knows nothing about.
    os.environ["PANELINI_AI_CONFIG_PATH"] = str(
        Path(__file__).resolve().parent / "panels" / "ai" / "default_config.yml"
    )
    for key, value in _PLACEHOLDER_ENV.items():
        os.environ.setdefault(key, value)

    base_tool = _make_base_tool()

    def _model_factory(*args: Any, **kwargs: Any) -> StubChatModel:
        return StubChatModel(reply=reply)

    core = _module("langchain_core")
    setattr(core, "_panelini_stub", True)  # noqa: B010 - dynamic module attribute
    _module(
        "langchain_core.messages",
        AIMessage=AIMessage,
        BaseMessage=BaseMessage,
        HumanMessage=HumanMessage,
        SystemMessage=SystemMessage,
        ToolMessage=ToolMessage,
    )
    _module("langchain_core.tools", BaseTool=base_tool)
    _module("langchain_core.runnables", Runnable=StubChatModel, RunnableConfig=dict)
    _module("langchain_core.language_models", BaseChatModel=StubChatModel)
    _module("langchain_core.language_models.chat_models", BaseChatModel=StubChatModel)
    _module("langchain_anthropic", ChatAnthropic=_model_factory)
    _module("langchain_openai", AzureChatOpenAI=_model_factory, ChatOpenAI=_model_factory)
    _module("langchain", __version__="stub")
    _module("langchain_community")

    # ``import langchain_core.messages`` works through sys.modules, but attribute access
    # on the parent package (``langchain_core.messages`` after ``import langchain_core``)
    # needs these bindings too.
    for attr in ("messages", "tools", "runnables", "language_models"):
        setattr(core, attr, sys.modules[f"langchain_core.{attr}"])
