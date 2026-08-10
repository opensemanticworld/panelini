# AI chat without preview or tools

```{image} /_static/media/ai/chat_no_preview_no_tools_feature.png
:alt: AI chat filling the full main area with no preview pane
:class: docs-media
```

```{note}
Shown as a screen capture rather than a live in-browser demo. The chat cannot run in the browser: `langchain-core` depends on `uuid-utils` and `zstandard`, native extensions with no pure-Python wheel, so the stack cannot be installed under Pyodide - and a real chat would additionally need provider credentials, which do not belong in a public page. Run it locally to try it.
```

**Source:** [`examples/panels/ai/chat_no_preview_no_tools.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/ai/chat_no_preview_no_tools.py)
**Test:** [`tests/panels/ai/examples/test_chat_media.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/ai/examples/test_chat_media.py)

`AiChat(show_preview=False, show_tools=False)` strips the chat down to just the conversation. With the preview pane disabled, the chat window fills the whole main area instead of sharing it with a markdown preview, and with tools disabled the "Basic Tools" card is dropped from the sidebar.

Use this when you want a focused, no-frills assistant: the sidebar still carries the provider, model, and temperature controls, but nothing else competes with the chat for space.

## The code

```python
import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat

load_dotenv()

chat = AiChat(
    system_message="You are a helpful assistant.",
    show_tools=False,
    show_preview=False,
)

app = Panelini(title="AI Chat (no preview, no tools)", sidebar_enabled=True)
app.main_set(objects=[pn.Row(*chat.main_objects)])
app.sidebar_set(objects=chat.sidebar_objects)

if __name__ == "__main__":
    pn.serve(app.servable(), title="AI Chat (no preview, no tools)", port=5008)
```

## See also

- {doc}`../../panels/ai`
