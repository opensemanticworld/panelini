# AI Chat Panel

```{image} /_static/media/ai/chat_min_overview.webp
:alt: chat min feature
:class: docs-media
```

A chat interface for any Panel app or Panelini dashboard, with several LLM providers, tools, streaming replies and a markdown preview pane.

## Installation

```bash
uv add panelini[ai]    # or: pip install panelini[ai]
```

## Quick Start

```python
from panelini import Panelini

app = Panelini(title="My AI App", use_ai=True)
app.servable()
```

`use_ai=True` adds the chat to the main area and the controls to the left sidebar.

Without Panelini, place the widget lists in any Panel layout:

```python
import panel as pn

from panelini.panels.ai import AiChat

chat = AiChat(system_message="You are a helpful assistant.")
pn.Row(*chat.main_objects).servable()  # chat.sidebar_objects holds the controls
```

## Parameters

```{list-table}
:header-rows: 1
:widths: 28 27 45

* - Parameter
  - Default
  - Description
* - `use_ai`
  - `False`
  - Enable the AI chat.
* - `ai_system_message`
  - `"You are a helpful assistant."`
  - System message.
* - `ai_welcome_message`
  - `None`
  - Greeting posted into a new chat.
* - `ai_show_preview`
  - `False`
  - Show the markdown preview pane next to the chat.
* - `ai_config_path`
  - `None`
  - Custom `config.yml`, auto-discovered if unset.
* - `ai_history_store`
  - `None`
  - Where conversations are kept, see [Conversation History](#conversation-history).
* - `ai_history_view`
  - `"tree"`
  - Initial sidebar style, `"tree"` or `"list"`.
```

`AiChat` takes the same options without the `ai_` prefix (`system_message`, `show_preview`, ...) plus `tools`.

## Providers and Models

Providers and models are defined in YAML. The panel looks for the file in this order:

1. the `PANELINI_AI_CONFIG_PATH` environment variable
2. `config.yml` or `config.yaml`, searched upward from the working directory
3. the bundled `default_config.yml`

```yaml
providers:
  anthropic:
    display_name: "Anthropic"
    client_type: "anthropic"
    env_vars:
      api_key: "${ANTHROPIC_API_KEY}"
      endpoint: "${ANTHROPIC_ENDPOINT}"
    models:
      - name: "Claude Sonnet 5.5"
        value: "anthropic/claude-sonnet-5-5"

  azure_openai:
    display_name: "Azure OpenAI"
    client_type: "azure_openai"
    env_vars:
      api_key: "${AZURE_OPENAI_API_KEY}"
      endpoint: "${AZURE_OPENAI_ENDPOINT}"
      api_version: "${AZURE_OPENAI_API_VERSION}"
    models:
      - name: "GPT-6.1 Sol"
        value: "azure_openai/gpt-6.1-sol"
```

- `client_type` is `anthropic` or `azure_openai`.
- `${VAR}` is resolved from the environment at load time. A missing variable raises `ValueError`.
- Model values are `provider/model-id`, as in [LiteLLM](https://docs.litellm.ai/docs/providers). The prefix is stripped before the name reaches LangChain, and `client_type` defaults to the first model's prefix.

### Model notes

- **Temperature:** not sent to Claude models, which the Anthropic endpoint rejects, nor to OpenAI reasoning models.
- **Reasoning effort:** the setup tab offers the levels the model supports (Low to Max, plus None where allowed) and starts at High. It is disabled for models without effort control. An unsupported level falls back to the nearest lower one.
- **Azure OpenAI:** the model value must be the deployment name. An endpoint ending in `/openai/v1` uses Azure's v1 API and ignores the api version. Otherwise, GPT-6 and `gpt-5.6` tool calls use the Responses API, so `AZURE_OPENAI_API_VERSION` must support it.
- **Replies:** only the text is shown and stored. Reasoning and tool-use blocks are dropped.

## Interface

- **Conversations tab (💬):** new chat and folder, import and export as JSON, search, and your conversations as a folder tree or a date-grouped list.
- **Setup tab (⚙️):** provider, model, reasoning effort and tool toggles.
- **Main area:** the chat with streaming replies. With `ai_show_preview=True` a preview pane sits next to it, filled by the `update_preview` tool.

## Conversation History

Conversations are kept per user. Where they are stored:

- **Default:** in memory, lost on restart.
- **SQLite:** set `PANELINI_HISTORY_DB` to a file path.
- **Browser:** `ai_history_store="browser"` keeps each user's history in their browser's localStorage (about 5 MB, no server database).
- **Custom:** pass any `ChatHistoryStore` as `ai_history_store`.

Conversations belong to the resolved user (see `user_resolver`). Anonymous visitors get a cookie-backed id.

`ai_history_view` sets the initial sidebar style, and an icon in the New Chat row switches it at runtime. In the folder tree:

- A chat can sit in several folders at once. Drag a row to move it, or hold Ctrl or Alt to also file it in the target.
- Rename, delete, indent and outdent are in the row's context menu (F2, Delete, Alt+Arrow).
- Deleting a folder whose chats are filed nowhere else asks for confirmation first.

Each conversation is one JSON document, defined by the bundled [`chat_history_schema.json`](https://github.com/opensemanticworld/panelini/blob/main/src/panelini/panels/ai/history/chat_history_schema.json) ([OO-LD](https://github.com/OO-LD/oold-schema)). The same document is the import and export format, so an exported chat re-imports losslessly. All stores implement `DocumentHistoryStore`.

## Tools

Tools are LangChain `BaseTool`s, toggled with sidebar checkboxes.

- `get_current_time` (on by default): current date and time, with optional timezone.
- `update_preview`: renders markdown in the preview pane.

Without tools, replies stream token by token. With tools, the model runs a tool loop (up to 10 iterations) and the final text appears when it finishes.

### Custom tools

Pass `BaseTool` subclasses to `AiChat(tools=[MyTool()])`. They appear as extra checkboxes next to the built-in tools.

```python
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field


class MyToolInput(BaseModel):
    query: str = Field(description="The search query")


class MyTool(BaseTool):
    name: str = "my_tool"
    description: str = "Describe what this tool does."
    args_schema: type[BaseModel] = MyToolInput

    def _run(self, query: str) -> str:
        return f"Result for: {query}"

    async def _arun(self, query: str) -> str:
        return self._run(query=query)
```

See {doc}`../examples/chat/ai_chat_custom_tool` for a complete example.

## Architecture

```{mermaid}
graph TB
    subgraph ai [" AI Chat Panel "]
        direction TB
        frontend(["AiChat"])
        backend(["AiBackend"])
        iface(["AiInterface"])
        config(["Config Loader"])
        tools(["Tools"])
    end

    subgraph panelini [" Panelini "]
        sidebar(["Left Sidebar"])
        main(["Main Content"])
    end

    subgraph providers [" LLM Providers "]
        anthropic(["Anthropic"])
        azure(["Azure OpenAI"])
    end

    frontend -- "sidebar_objects" --> sidebar
    frontend -- "main_objects" --> main
    frontend --> backend
    backend --> iface
    backend --> config
    backend --> tools
    iface --> anthropic
    iface --> azure

    classDef aiNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef paneliniNode fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef providerNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class frontend,backend,iface,config,tools aiNode
    class sidebar,main paneliniNode
    class anthropic,azure providerNode
```

- `AiChat`: the UI. `sidebar_objects` and `main_objects` return the widgets to place in a layout.
- `AiBackend`: provider and model state, tool execution and message routing.
- `AiInterface`: provider-agnostic LangChain wrapper.
- `load_config`, `AppConfig`, `ProviderConfig`, `ModelConfig`: configuration loading.

Full signatures are in the {doc}`generated API reference <../apidocs/panelini/panelini.panels.ai>`.
