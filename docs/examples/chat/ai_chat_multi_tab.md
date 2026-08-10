# Multi-tab AI chats

```{image} /_static/media/ai/chat_multi_tab_feature.png
:alt: chat multi tab feature
:class: docs-media
```

```{note}
Shown as a screen capture rather than a live in-browser demo. The chat cannot run in the browser: `langchain-core` depends on `uuid-utils` and `zstandard`, native extensions with no pure-Python wheel, so the stack cannot be installed under Pyodide - and a real chat would additionally need provider credentials, which do not belong in a public page. Run it locally to try it.
```

**Source:** [`examples/panels/ai/chat_multi_tab.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_multi_tab.py)
**Test:** [`tests/panels/ai/examples/test_chat_multi_tab.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_multi_tab.py)

Two specialised AI chats, one layout. The left sidebar switches tabs in sync with the main area.

## The shape

```{mermaid}
graph TB
    subgraph layout [" Panelini "]
        direction LR
        subgraph sidebar [" Sidebar ( pn.Tabs ) "]
            ingest_s(["Ingest AI"])
            digest_s(["Digest AI"])
        end
        subgraph main [" Main ( pn.Tabs ) "]
            ingest_m(["Ingest AI"])
            digest_m(["Digest AI"])
        end
    end

    sidebar -. "jslink active" .-> main
    main -. "jslink active" .-> sidebar

    classDef side fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef main fill:#0d7377,stroke:#095c5f,color:#ffffff
    class ingest_s,digest_s side
    class ingest_m,digest_m main
```

Each tab hosts an independent `AiChat` instance with its own system prompt and welcome message. `jslink` keeps the active tab indices of the sidebar and main tabs in sync - clicking either one switches both.

## The code (condensed)

```python
import panel as pn

from panelini import Panelini
from panelini.panels.ai import AiChat

ingest_ai = AiChat(
    system_message="You are an assistant specialized in data ingestion tasks.",
    welcome_message="Hi! I'm **Ingest AI**. I can help you with data ingestion tasks.",
)

digest_ai = AiChat(
    system_message="You are an assistant specialized in data analysis and summarization.",
    welcome_message="Hi! I'm **Digest AI**. I can help you analyze and summarize data.",
)

main_tabs = pn.Tabs(
    ("Ingest AI", pn.Row(*ingest_ai.main_objects)),
    ("Digest AI", pn.Row(*digest_ai.main_objects)),
)

sidebar_tabs = pn.Tabs(
    ("Ingest AI", pn.Card(*ingest_ai.sidebar_objects, title="Ingest AI Settings")),
    ("Digest AI", pn.Card(*digest_ai.sidebar_objects, title="Digest AI Settings")),
)

main_tabs.jslink(sidebar_tabs, active="active")
sidebar_tabs.jslink(main_tabs, active="active")

app = Panelini(title="AI Chat Multi Tab", sidebar_enabled=True)
app.main_set(objects=[main_tabs])
app.sidebar_set(objects=[sidebar_tabs])
```

## Why two `AiChat` instances?

Each `AiChat` carries its own:

- conversation history
- provider / model / temperature selection
- tool set
- preview pane

That's exactly the isolation you want for domain-specialised assistants - the *Ingest* bot's conversation can't leak into *Digest*'s context.

## The `jslink` trick

```python
main_tabs.jslink(sidebar_tabs, active="active")
sidebar_tabs.jslink(main_tabs, active="active")
```

`jslink` is a Panel feature that syncs properties **purely in the browser** - no Python round-trip on every click. The `active` property is each `Tabs` widget's integer index; keeping them equal means the sidebar and main area always show the same AI.

```{tip}
Need more than two? Just add more tabs - `jslink` scales trivially. The test exercises the sync: it clicks each tab header and asserts that every DOM element with the same tab name ends up with the `active` class.
```

## See also

- {doc}`ai_chat_min` - the single-tab minimal form
- {doc}`ai_chat_custom_tool` - adding tools to a chat
- [Panel `jslink` docs](https://panel.holoviz.org/how_to/links/examples/jslink_async.html)
