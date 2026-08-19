"""Process-wide default SQLite history store."""

from __future__ import annotations

import os
from pathlib import Path

from .sqlite_store import SqliteHistoryStore

ENV_VAR = "PANELINI_HISTORY_DB"
_DEFAULT_PATH = "panelini_history.sqlite3"

# Memoized per resolved path, so all sessions in one process share one store.
_stores: dict[str, SqliteHistoryStore] = {}


def default_history_store() -> SqliteHistoryStore:
    """Return the shared SQLite store at ``PANELINI_HISTORY_DB``."""
    path = str(Path(os.environ.get(ENV_VAR, _DEFAULT_PATH)).resolve())
    if path not in _stores:
        _stores[path] = SqliteHistoryStore(path)
    return _stores[path]
