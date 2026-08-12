"""Example: AI chat with preview and tool sidebar disabled.

Demonstrates ``show_preview=False, show_tools=False`` - the chat fills
the full main area and the "Basic Tools" card is omitted from the sidebar.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/chat_no_preview_no_tools.py``
"""

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat

load_dotenv()  # load .env if present

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
