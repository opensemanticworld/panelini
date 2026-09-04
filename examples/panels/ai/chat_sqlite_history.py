"""Example: AI chat with persistent history in SQLite.

Like ``chat_min.py``, but conversations survive server restarts: one
``SqliteHistoryStore`` is created at module level and passed to every
session via ``ai_history_store``, so all sessions share the store while
each user only sees their own conversations (tenancy is by user id).
``PANELINI_HISTORY_DB`` overrides the database path; without code, setting
that variable alone gives ``chat_min.py`` the same persistence.

Needs ``pip install panelini[ai]`` and the provider environment variables
listed in ``src/panelini/panels/ai/default_config.yml``. Run with
``python examples/panels/ai/chat_sqlite_history.py``.
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini
from panelini.panels.ai.history import SqliteHistoryStore

load_dotenv()  # load .env if present

DB_PATH = Path(os.environ.get("PANELINI_HISTORY_DB", "panelini_history.sqlite3"))

# One store for the whole process; sessions share it, users stay separated.
STORE = SqliteHistoryStore(DB_PATH)


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(
        title="Panelini AI Chat (SQLite)",
        use_ai=True,
        show_user=True,
        ai_history_store=STORE,
    )


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat (SQLite)", port=5011)
