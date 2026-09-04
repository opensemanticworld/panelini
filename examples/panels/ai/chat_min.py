"""Minimal example: the AI chat panel inside Panelini.

Two sidebar icon tabs: conversations and setup. Per-user history opens as
a drag-and-drop folder tree (folders via context menu, inline rename,
delete with undo); an icon in the New Chat row switches to the
date-grouped list view at runtime. History is in-memory unless
``PANELINI_HISTORY_DB`` points at a SQLite file.

Needs ``pip install panelini[ai]`` and the provider environment variables
listed in ``src/panelini/panels/ai/default_config.yml``. Run with
``python examples/panels/ai/chat_min.py``.
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(title="Panelini AI Chat", use_ai=True, show_user=True)


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat", port=5006)
