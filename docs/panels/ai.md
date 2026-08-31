# AiChat

```{image} /_static/media/ai/chat_min_overview.webp
:alt: A panelini AI chat dashboard - chat, live preview, and a provider/model sidebar
:class: docs-media
```

`AiChat` adds an LLM-powered chat to any Panel application or Panelini dashboard: multiple providers, a tool-calling loop, streaming responses, per-user conversation history, and an optional markdown preview pane. It is a plain Panel component that exposes two widget lists (`sidebar_objects`, `main_objects`), so it drops into the Panelini shell with one flag or composes by hand anywhere else.

```{note}
Every live demo on this page runs against a stand-in model that streams one fixed answer: **no language model is running and no request leaves your browser**. LangChain cannot be installed under Pyodide (`langchain-core` needs `uuid-utils` and `zstandard`, native extensions with no pure-Python wheel), and provider credentials do not belong in a public page. Run the examples locally with your own credentials to chat for real.
```

## Quickstart

The chat is an optional extra:

```bash
uv add "panelini[ai]"          # or: pip install "panelini[ai]"
```

That pulls in `langchain`, `langchain-anthropic`, `langchain-openai`, `pyyaml`, and `python-dotenv`. Credentials come from the environment, so drop a `.env` next to your script:

```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_ENDPOINT=https://api.anthropic.com
```

Then one flag is enough:

```python
from panelini import Panelini

app = Panelini(title="My AI App", use_ai=True)
app.servable()
```

`use_ai=True` puts the chat interface in the main area and the provider, model, and history controls in the left sidebar.

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

- **AiChat** - UI widgets: chat interface, sidebar controls, preview pane
- **AiBackend** - business logic: provider management, tool execution, message routing
- **AiInterface** - provider-agnostic LLM wrapper built on LangChain
- **Config** - YAML configuration with environment variable resolution
- **Tools** - extensible LangChain tool system

A single message makes the round trip like this:

```{mermaid}
sequenceDiagram
    participant User as User
    participant Chat as ChatInterface
    participant FE as AiChat
    participant BE as AiBackend
    participant AI as AiInterface
    participant LLM as LLM Provider

    User->>Chat: Type message
    Chat->>FE: _handle_message()
    FE->>BE: process_message() or stream_message()
    BE->>AI: get_response() or get_response_with_tools()
    AI->>LLM: ainvoke() / astream()
    LLM-->>AI: Response / chunks
    AI-->>BE: Text + tool_calls
    BE->>BE: Execute tools (if any)
    BE-->>FE: {"response", "preview_updates"}
    FE-->>Chat: Yield response
    Chat-->>User: Display message
```

## Minimal chat

```{image} /_static/media/ai/chat_min_overview.webp
:alt: A panelini AI chat answering a question
:class: docs-media
```

The shortest working chat. Serving the *factory* rather than a single instance gives every browser session its own app, so conversations stay per user.

```{literalinclude} ../../examples/panels/ai/chat_min.py
:language: python
:pyobject: create_app
```

What that gives you:

- **Left sidebar** - two icon tabs: conversations (per-user history as a drag-and-drop folder tree with new chat, folders, import/export, search, inline rename, delete with undo, and a toggle to a date-grouped list view) and setup (provider/model pickers, temperature slider, tool toggles).
- **Main area** - the chat window, filling the width. Add `ai_show_preview=True` for a markdown preview pane next to it that the `update_preview` tool can write to.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/ai/chat_min.html" title="Minimal AI chat" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/ai/chat_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Standalone, without the Panelini shell

`AiChat` never imports Panelini. Build it directly and place its widget lists wherever you like:

```python
import panel as pn

from panelini.panels.ai import AiChat

chat = AiChat(system_message="You are a helpful assistant.")

pn.Row(*chat.main_objects).servable()
```

## Without preview or tools

```{image} /_static/media/ai/chat_no_preview_no_tools_feature.webp
:alt: AI chat filling the full main area with no preview pane
:class: docs-media
```

`AiChat(show_preview=False, show_tools=False)` strips the panel down to the conversation: the chat window fills the whole main area instead of sharing it with the preview, and the "Basic Tools" card is dropped from the sidebar. The provider, model, and temperature controls stay. Constructing `AiChat` by hand and stitching its two widget lists into the layout is what buys that control - `use_ai=True` is the convenience path, not the only one.

```{literalinclude} ../../examples/panels/ai/chat_no_preview_no_tools.py
:language: python
:pyobject: create_app
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_no_preview_no_tools.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_no_preview_no_tools.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/ai/chat_no_preview_no_tools.html" title="AI chat without preview or tools" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/ai/chat_no_preview_no_tools.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Custom tools

```{image} /_static/media/ai/chat_custom_tool_feature.webp
:alt: chat custom tool feature
:class: docs-media
```

Any LangChain `BaseTool` passed to `tools=` shows up as an extra checkbox in the sidebar and becomes callable by the model once ticked. The example gives the model an in-memory key-value store with `get` / `set` / `update` / `delete` / `list`.

A tool is an input schema plus a `_run` / `_arun` pair:

```{literalinclude} ../../examples/panels/ai/chat_custom_tool.py
:language: python
:pyobject: LocalStorageInput
```

````{dropdown} The full tool implementation
```{literalinclude} ../../examples/panels/ai/chat_custom_tool.py
:language: python
:pyobject: LocalStorageTool
```
````

Wiring it in is the same hand-composed layout as above, with the tool handed to the constructor:

```{literalinclude} ../../examples/panels/ai/chat_custom_tool.py
:language: python
:pyobject: create_app
```

The checkbox label comes from `tool.name` and its tooltip from `tool.description`. Ticking it posts a system message into the chat:

> **Tools updated** - 2 tool(s) now available

Toggling routes through `AiBackend.update_tools()`, which rebinds the tools on the underlying `AiInterface` without clearing history. Anything that subclasses `BaseTool` works: HTTP fetchers, database lookups, vector-store retrievers, your own domain APIs. See the [LangChain tool authoring docs](https://python.langchain.com/docs/concepts/tools/) for the full contract.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_custom_tool.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_custom_tool.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/ai/chat_custom_tool.html" title="AI chat with a custom tool" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/ai/chat_custom_tool.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Two chats in synced tabs

```{image} /_static/media/ai/chat_multi_tab_feature.webp
:alt: chat multi tab feature
:class: docs-media
```

Each `AiChat` carries its own conversation history, provider/model/temperature selection, tool set, and preview pane, which is exactly the isolation you want for domain-specialised assistants: the *Ingest* bot's conversation cannot leak into *Digest*'s context. Two `pn.Tabs` (one in the sidebar, one in the main area) are kept in step with `jslink`, which syncs the `active` index **purely in the browser** with no Python round trip per click.

```{literalinclude} ../../examples/panels/ai/chat_multi_tab.py
:language: python
:pyobject: create_app
```

```{tip}
Need more than two? Add more tabs - `jslink` scales trivially. Give each chat its own `history_store` as shown, or the assistants will list one another's conversations, since the default store is shared per process.
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_multi_tab.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_multi_tab.py) - [Panel `jslink` docs](https://panel.holoviz.org/how_to/links/examples/jslink_async.html)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/ai/chat_multi_tab.html" title="Multi-tab AI chats" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/ai/chat_multi_tab.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## History backends

Conversations are owned by the resolved user id and, by default, live in memory for the lifetime of the process. Two other backends need no more than a constructor argument.

### Browser localStorage

`ai_history_store="browser"` keeps each user's conversations in their own browser: history survives reloads and server restarts with no server-side database. The trade-off is localStorage semantics - per browser only (no cross-device history) and a quota of roughly 5MB.

```{literalinclude} ../../examples/panels/ai/chat_local_storage.py
:language: python
:pyobject: create_app
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_local_storage.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_local_storage.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/ai/chat_local_storage.html" title="AI chat with browser-stored history" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/ai/chat_local_storage.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

### SQLite

One `SqliteHistoryStore` is created at module level and handed to every session, so all sessions share the file while each user still only sees their own conversations - tenancy is by user id, not by store.

```{literalinclude} ../../examples/panels/ai/chat_sqlite_history.py
:language: python
:start-at: DB_PATH = Path(
:end-at: STORE = SqliteHistoryStore(DB_PATH)
```

```{literalinclude} ../../examples/panels/ai/chat_sqlite_history.py
:language: python
:pyobject: create_app
```

Setting `PANELINI_HISTORY_DB` alone gives the [minimal chat](#minimal-chat) the same persistence without any code change; the explicit store is for when you want to choose the path yourself or swap in a different backend.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_sqlite_history.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_sqlite_history.py)

## Plot tool

An agent that draws. `PlotPanel` sits beside the chat and five `BaseTool` wrappers (`plot_by_code`, `run_code`, `load_data_from_csv`, `attach_current_plot_to_osw_page`, `document_current_evaluation`) let the model write matplotlib code, run it inside a throwaway `python:3.12-slim` Docker container, and hand the resulting figure back to the panel. The right sidebar keeps the last plot's source, a model picker, and a *Regenerate plot* button for free-text revisions.

When the OSW environment variables are set, `make_osw_tools()` adds eight connector tools on top; without them it returns an empty list and the example still runs.

```{literalinclude} ../../examples/panels/ai/plot_by_code.py
:language: python
:start-at: plot_panel = PlotPanel()
:end-at: app.main_set(objects=[pn.Row(chat_card, plot_card, sizing_mode="stretch_both")])
```

```{note}
This example needs a running Docker daemon and the extra sandbox dependencies:
`uv sync --extra ai --extra ai-llm-sandbox` (add `--extra ai-osw` for the OSW connector). There is no live demo - Pyodide has no Docker.
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/plot_by_code.py)

## DrawAI: a drawio beautifier

```{image} /_static/media/ai/drawai_beautify_feature.png
:alt: DrawAI before and after compare of a drawio diagram
:class: docs-media
```

DrawAI turns the chat into a focused tool. Upload a `.drawio` or `.drawio.png`, chat a beautification intent ("tighter spacing", "align on grid", "recolor to a blue theme"), and the model rewrites the diagram's XML in place. The result is a before/after compare rendered through the drawio web viewer, with a Download button for the cleaned-up file.

The tool calls Claude through the `anthropic` SDK directly, with prompt caching on both the system prompt and the diagram XML. Credentials come from the same `anthropic` provider block in `config.yml` that the chat backend reads, so DrawAI honours whatever endpoint or key the rest of the app is configured with.

```{literalinclude} ../../examples/panels/ai/drawai_beautify.py
:language: python
:start-at: class BeautifyDrawioTool(BaseTool):
:end-at: args_schema: type[BaseModel] = BeautifyDrawioInput
```

````{dropdown} The full tool implementation
```{literalinclude} ../../examples/panels/ai/drawai_beautify.py
:language: python
:pyobject: BeautifyDrawioTool
```
````

The tool is registered like any other, then pre-enabled so the model can reach it from the first message:

```{literalinclude} ../../examples/panels/ai/drawai_beautify.py
:language: python
:start-at: api_key, base_url = _anthropic_credentials_from_config()
:end-at: chat.tool_checkboxes[tool.name]["checkbox"].value = True
:dedent: 4
```

```{note}
Shown as a screen capture rather than a live demo: the chat stack cannot be installed under Pyodide, and a real run needs provider credentials. Install with `pip install "panelini[ai,ai-drawio]"` and run it locally to try it.
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/drawai_beautify.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_drawai_media.py)

## Providers

Providers and models come from a YAML file. The panel looks for one in this order:

1. the `PANELINI_AI_CONFIG_PATH` environment variable
2. walking upward from the working directory for `config.yml` or `config.yaml`
3. the bundled [`default_config.yml`](https://github.com/opensemanticworld/panelini/blob/main/src/panelini/panels/ai/default_config.yml)

### Configuration format

```yaml
providers:
  anthropic:
    display_name: "Anthropic"
    client_type: "anthropic"
    env_vars:
      api_key: "${ANTHROPIC_API_KEY}"
      endpoint: "${ANTHROPIC_ENDPOINT}"
    models:
      - name: "Claude Sonnet 4.5"
        value: "anthropic/claude-sonnet-4-5"
      - name: "Claude Haiku 4.5"
        value: "anthropic/claude-haiku-4-5"

  azure_openai:
    display_name: "Azure OpenAI"
    client_type: "azure_openai"
    env_vars:
      api_key: "${AZURE_OPENAI_API_KEY}"
      endpoint: "${AZURE_OPENAI_ENDPOINT}"
      api_version: "${AZURE_OPENAI_API_VERSION}"
    models:
      - name: "GPT-4o"
        value: "azure_openai/gpt-4o-2024-11-20"
```

Model values use the [LiteLLM naming convention](https://docs.litellm.ai/docs/providers): `provider_prefix/model-id`. The prefix is stripped before the model name reaches LangChain. When `client_type` is omitted it is derived from the first model's prefix; bare model names still work when `client_type` is set explicitly.

Variables referenced as `${VAR_NAME}` are resolved at load time, and a `ValueError` is raised if one is unset.

### Supported providers

```{list-table}
:header-rows: 1
:widths: 25 25 50

* - Provider
  - `client_type`
  - Required environment variables
* - Anthropic
  - `anthropic`
  - `ANTHROPIC_API_KEY`, `ANTHROPIC_ENDPOINT`
* - Azure OpenAI
  - `azure_openai`
  - `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_VERSION`
```

## UI layout

### Sidebar

The left sidebar receives two icon tabs. The conversations tab (💬, active by default) holds a single card:

- **Conversations** - new chat, new folder, import/export chat as JSON, a tree/list view toggle, search over titles and messages, and the user's conversations in a drag-and-drop folder tree (inline rename, delete with undo); the list view groups them by date instead

The setup tab (⚙️) holds the model controls:

- **Provider Settings** - select the LLM provider
- **Model Settings** - select the model and adjust temperature
- **Basic Tools** - toggle available tools on and off

### Main area

The main area receives the chat interface with streaming responses. With `ai_show_preview=True` (`show_preview=True` on `AiChat`) it becomes a two-column layout:

- **Chat** (left) - the conversation
- **Preview** (right) - a markdown pane written to by the `update_preview` tool

### Conversation document model

Each conversation is stored as one JSON document with embedded messages, defined by the bundled [`chat_history_schema_v2.json`](https://github.com/opensemanticworld/panelini/blob/main/src/panelini/panels/ai/history/chat_history_schema_v2.json). The schema is an [OO-LD](https://github.com/OO-LD/oold-schema) document: plain JSON Schema carrying a JSON-LD `@context` that maps properties to vocabulary terms (schema.org where a term exists). The same document is the import/export format behind the sidebar icons, so a downloaded chat re-imports losslessly here or into any other store.

All backends implement the shared `DocumentHistoryStore` contract: SQLite keeps one `documents` row per conversation or folder, the in-memory store keeps plain dicts, and the shape maps 1:1 onto a Postgres JSONB column or a browser object store.

## Built-in tools

```{list-table}
:header-rows: 1
:widths: 25 75

* - Tool
  - Description
* - `get_current_time`
  - Returns the current date and time with optional timezone support. Enabled by default.
* - `update_preview`
  - Renders markdown content in the preview pane. Supports headers, tables, code blocks, and images.
```

**Streaming vs tool mode.** With no tools selected, responses stream token by token inside a collapsible `<details>` block that expands when complete. With tools selected, the model runs a tool execution loop (up to 10 iterations) and the final text is displayed once every call has returned.

## Panelini parameters

These `Panelini` parameters configure the embedded chat. Everything else is available on `AiChat` directly.

```{list-table}
:header-rows: 1
:widths: 25 15 60

* - Parameter
  - Type
  - Description
* - `use_ai`
  - `Boolean`
  - Enable the AI chat panel (default: `False`).
* - `ai_system_message`
  - `String`
  - System message for the AI backend (default: `"You are a helpful assistant."`).
* - `ai_welcome_message`
  - `String`
  - Optional greeting posted into a new chat. `None` (the default) starts it empty.
* - `ai_show_preview`
  - `Boolean`
  - Show the markdown preview pane next to the chat (default: `False`).
* - `ai_config_path`
  - `str | Path`
  - Path to a custom `config.yml`. Auto-discovered when `None`.
* - `ai_history_store`
  - `ChatHistoryStore | str`
  - History backend. `None` uses the shared default (SQLite at `PANELINI_HISTORY_DB`, else in memory); `"browser"` uses localStorage.
* - `ai_history_view`
  - `Selector`
  - Initial history sidebar style: `"tree"` (default) or `"list"`. A toggle switches at runtime; a reload starts from this value again.
* - `show_user`
  - `Boolean`
  - Show the resolved user as a chip in the header (default: `False`).
* - `user_resolver`
  - `Callable`
  - Resolves the application user id that owns the history. Defaults to the Panel auth user, falling back to an anonymous browser cookie.
```

## API reference

- {py:class}`panelini.panels.ai.frontend.AiChat` - the panel itself
- {py:class}`panelini.panels.ai.backend.AiBackend` - providers, tools, message routing
- {py:class}`panelini.panels.ai.utils.ai_interface.AiInterface` - the LangChain wrapper
- {py:func}`panelini.panels.ai.utils.config.load_config` - YAML config loading
- {py:class}`panelini.main.Panelini` - the full parameter list of the shell
