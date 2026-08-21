"""Example: AI chat history organized in a drag-and-drop folder tree.

Like ``chat_min.py`` but with ``ai_history_view="tree"``: conversations are
leaves in a Wunderbaum tree, folders are created via the context menu, and
dragging a conversation onto a folder moves it there. Inline rename via
click-active or F2; delete and new chat via the context menu. The chat fills
the main area (no preview pane) and the header shows the current user
(``show_user=True``).

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/chat_tree_view.py``

The app is served through a factory so every browser session gets its own
instance (multi-user isolation). A module-level ``app`` shares one instance
across all browsers and is kept here only for Pyodide/portfolio builds.
History is in-memory unless ``PANELINI_HISTORY_DB`` points at a SQLite file.
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(
        title="Panelini AI Chat Tree View",
        use_ai=True,
        ai_history_view="tree",
        show_user=True,
    )


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat Tree View", port=5010)
