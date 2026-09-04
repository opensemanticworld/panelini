# Minimal AI chat

```{image} /_static/media/ai/chat_min_overview.webp
:alt: A panelini AI chat answering a question
:class: docs-media
```

```{note}
The capture above and the live demo below both run against a stand-in model that streams one fixed answer: **no language model is running and no request leaves your browser**. LangChain cannot be installed under Pyodide (`langchain-core` needs `uuid-utils` and `zstandard`, native extensions with no pure-Python wheel), and provider credentials do not belong in a public page. Run the example locally with your own credentials to chat for real.
```

**Source:** [`examples/panels/ai/chat_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_min.py)
**Test:** [`tests/panels/ai/examples/test_chat_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_min.py)

The shortest path to a working LLM chat inside panelini.

## The code

```python
from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(title="Panelini AI Chat", use_ai=True, show_user=True)


if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat", port=5006)
```

Serving the factory (not a single instance) gives every browser session its
own app, so conversations stay per user.

## What you get

```{mermaid}
graph LR
    subgraph dashboard [" Panelini ( use_ai=True ) "]
        direction LR
        subgraph sidebar [" Left sidebar "]
            conv(["Conversations"])
            prov(["Provider Settings"])
            model(["Model Settings"])
            tools(["Basic Tools"])
        end
        subgraph main [" Main area "]
            chat(["Chat"])
        end
    end

    classDef side fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef main fill:#0d7377,stroke:#095c5f,color:#ffffff
    class conv,prov,model,tools side
    class chat main
```

- **Left sidebar** - two icon tabs: conversations (per-user history as a drag-and-drop folder tree with new chat, folders, import/export, search, inline rename, delete with undo, and a toggle to a date-grouped list view) and setup (provider/model pickers, temperature slider, tool toggles).
- **Main area** - the chat window, filling the width. Add `ai_show_preview=True` for a markdown preview pane next to it that the `update_preview` tool can write to.

## Configuration

panelini reads provider credentials from environment variables. Drop a `.env` file next to your script:

```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_ENDPOINT=https://api.anthropic.com
```

The bundled [`default_config.yml`](https://github.com/opensemanticworld/panelini/blob/main/src/panelini/panels/ai/default_config.yml) covers Anthropic and Azure OpenAI. Point at a custom config with `ai_config_path="config.yml"` or the `PANELINI_AI_CONFIG_PATH` env var.

## How the test exercises it

```python
@pytest.fixture(scope="module")
def panel_server(mock_langchain, tmp_path_factory):
    os.environ["PANELINI_HISTORY_DB"] = str(tmp_path_factory.mktemp("history") / "history.sqlite3")
    with warnings.catch_warnings(), config_patch, model_patch:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_min"))
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
        ...
```

The fixture **imports the real example module** under a LangChain mock, so a regression in `chat_min.py` immediately fails the test. See [`tests/panels/ai/examples/conftest.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/conftest.py) for the shared `mock_langchain` fixture.

## Run it live

This example runs entirely in your browser via Pyodide, with the stand-in model described above. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/ai/chat_min.html" title="Minimal AI chat" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/ai/chat_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`ai_chat_custom_tool` - add your own tools to the chat
- {doc}`ai_chat_multi_tab` - two chats in synced tabs
- {doc}`../../panels/ai` - full AI chat panel guide
