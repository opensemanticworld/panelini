"""Process-wide default history store."""

from __future__ import annotations

import os
from pathlib import Path

from .sqlite_store import SqliteHistoryStore
from .store import ChatHistoryStore, InMemoryHistoryStore

ENV_VAR = "PANELINI_HISTORY_DB"

# Memoized so all sessions in one process share one store; tenancy is by
# user id, not by store instance.
_stores: dict[str, ChatHistoryStore] = {}


def default_history_store() -> ChatHistoryStore:
    """Return the shared store: SQLite at ``PANELINI_HISTORY_DB``, else in-memory.

    Without the environment variable, history lives as long as the process
    and no app writes a database file it did not ask for.
    """
    db_path = os.environ.get(ENV_VAR)
    key = str(Path(db_path).resolve()) if db_path else ""
    if key not in _stores:
        _stores[key] = SqliteHistoryStore(key) if key else InMemoryHistoryStore()
    return _stores[key]
