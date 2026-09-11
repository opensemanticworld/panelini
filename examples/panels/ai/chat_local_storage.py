"""Example: AI chat history persisted in the browser's localStorage.

Like ``chat_min.py``, but ``ai_history_store="browser"`` keeps each user's
conversations in their own browser: history survives page reloads and
server restarts without any server-side database. The flip side is
localStorage semantics: per-browser only (no cross-device history) and a
quota of roughly 5MB.

Needs ``pip install panelini[ai]`` and the provider environment variables
listed in ``src/panelini/panels/ai/default_config.yml``. Run with
``python examples/panels/ai/chat_local_storage.py``.
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(
        title="Panelini AI Chat (Browser Storage)",
        use_ai=True,
        show_user=True,
        ai_history_store="browser",
    )


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat (Browser Storage)", port=5012)
