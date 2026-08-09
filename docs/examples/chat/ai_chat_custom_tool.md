# AI chat with a custom tool

```{image} /_static/media/ai/chat_custom_tool_feature.png
:alt: chat custom tool feature
:class: docs-media
```

```{note}
This example needs an LLM backend, so it is shown as a screen capture rather than a live in-browser demo.
```

**Source:** [`examples/panels/ai/chat_custom_tool.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_custom_tool.py)
**Test:** [`tests/panels/ai/examples/test_chat_custom_tool.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_custom_tool.py)

How to hand a custom LangChain `BaseTool` to the chat so the model can call it.

## The scenario

We give the LLM a simple in-memory key-value store with `get` / `set` / `update` / `delete` / `list` operations. The tool appears as a checkbox in the sidebar and becomes available to the model when toggled on.

## The tool

```python
from typing import Literal

from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field


class LocalStorageInput(BaseModel):
    action: Literal["get", "set", "update", "delete", "list"]
    key: str | None = None
    value: str | None = None


class LocalStorageTool(BaseTool):
    name: str = "local_storage"
    description: str = (
        "A simple key-value store. Supported actions: get, set, update, delete, list."
    )
    args_schema: type[BaseModel] = LocalStorageInput
    storage: dict[str, str] = Field(default_factory=dict)

    def _run(self, action, key=None, value=None) -> str:
        # routes to self._action_get / _set / _update / _delete / _list
        ...

    async def _arun(self, action, key=None, value=None) -> str:
        return self._run(action=action, key=key, value=value)
```

See the full source for the per-action handlers - they're straightforward dict operations.

## Wiring it into panelini

```python
import panel as pn

from panelini import Panelini
from panelini.panels.ai import AiChat

chat = AiChat(
    system_message="You are a helpful assistant with access to a local storage tool.",
    tools=[LocalStorageTool()],
)

app = Panelini(title="AI Chat with Custom Tool", sidebar_enabled=True)
app.main_set(objects=[pn.Row(*chat.main_objects)])
app.sidebar_set(objects=chat.sidebar_objects)
```

Two things to notice:

1. We use `AiChat` directly rather than `use_ai=True` - that gives us control over the `tools=` list.
2. We stitch `chat.main_objects` and `chat.sidebar_objects` into the panelini layout by hand. `AiChat` is just a Panel component; you can compose it however you like.

## What you'll see

```{mermaid}
graph TB
    subgraph sidebar [" Sidebar "]
        direction TB
        gen(["General Setup"])
        tools(["Basic Tools<br/>☐ get_current_time<br/>☐ update_preview<br/>☐ local_storage"])
    end
    subgraph main [" Main "]
        chat(["Chat"])
        preview(["Preview"])
    end

    classDef side fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef main fill:#0d7377,stroke:#095c5f,color:#ffffff
    class gen,tools side
    class chat,preview main
```

When you tick the `local_storage` box, the chat posts a system message:

> **Tools updated** - 2 tool(s) now available

From that point on, the model can decide to call `local_storage` when it fits - e.g. ”store this note under `notes/today`”.

## Adding your own tool

Any LangChain `BaseTool` works - including:

- HTTP fetchers
- Database lookups
- Vector-store retrievers
- Your own domain APIs

The checkbox label comes from `tool.name`; the hover/tooltip text comes from `tool.description`. The checkbox state is wired through `AiBackend.update_tools()` - toggling it rebinds the tools on the underlying `AiInterface` without clearing history.

## See also

- {doc}`../../panels/ai` - AI panel guide, including the tool system
- [LangChain tool authoring docs](https://python.langchain.com/docs/concepts/tools/)
