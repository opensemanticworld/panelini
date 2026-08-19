"""Example: AI chat with per-user persistent conversation history.

Each browser gets its own history (anonymous cookie identity by default,
Panel auth user when configured). Conversations persist in a SQLite file
across page reloads and server restarts. The sidebar shows two icon tabs:
conversations (grouped by date, with rename and delete) and general setup.
The preview pane is disabled so the chat fills the main area; the header
shows the current user (``show_user=True``).

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/chat_history.py``

The app is served through a factory so every browser session gets its own
instance (multi-user isolation). A module-level ``app`` shares one instance
across all browsers and is kept here only for Pyodide/portfolio builds.
Set ``PANELINI_HISTORY_DB`` to change the SQLite location (default:
``./panelini_history.sqlite3``).
"""

import sys

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    kwargs = {}
    if sys.platform == "emscripten":
        # Pyodide has no reliable file storage; keep history in memory
        from panelini.panels.ai.history import InMemoryHistoryStore

        kwargs["ai_history_store"] = InMemoryHistoryStore()
    return Panelini(
        title="Panelini AI Chat History",
        use_ai=True,
        use_ai_history=True,
        ai_show_preview=False,
        show_user=True,
        **kwargs,
    )


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat History", port=5009)
