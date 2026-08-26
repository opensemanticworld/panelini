# Minimal AI chat

**Source:** [`examples/panels/ai/chat_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_min.py)
**Test:** [`tests/panels/ai/examples/test_chat_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_min.py)

The shortest path to a working LLM chat inside panelini.

## The code

```python
from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()

app = Panelini(title="Panelini AI Chat", use_ai=True)

if __name__ == "__main__":
    serve(app.servable(), title="Panelini AI Chat", port=5006)
```

## What you get

```{mermaid}
graph LR
    subgraph dashboard [" Panelini ( use_ai=True ) "]
        direction LR
        subgraph sidebar [" Left sidebar "]
            gen(["General Setup"])
            prov(["Provider Settings"])
            model(["Model Settings"])
            tools(["Basic Tools"])
        end
        subgraph main [" Main area "]
            chat(["Chat"])
            preview(["Preview"])
        end
    end

    classDef side fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef main fill:#0d7377,stroke:#095c5f,color:#ffffff
    class gen,prov,model,tools side
    class chat,preview main
```

- **Left sidebar** — provider/model pickers, temperature slider, tool toggles, chat export/clear.
- **Main area** — a chat window on the left, a live markdown preview pane on the right that the `update_preview` tool can write to.

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
def panel_server(mock_langchain):
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_min"))
        server = pn.serve(module.app.servable(), port=_PORT, threaded=True, show=False)
        ...
```

The fixture **imports the real example module** under a LangChain mock, so a regression in `chat_min.py` immediately fails the test. See [`tests/panels/ai/examples/conftest.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/conftest.py) for the shared `mock_langchain` fixture.

## See also

- {doc}`ai_chat_custom_tool` — add your own tools to the chat
- {doc}`ai_chat_multi_tab` — two chats in synced tabs
- {doc}`../panels/ai` — full AI chat panel guide
