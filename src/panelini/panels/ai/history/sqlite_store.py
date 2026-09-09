"""SQLite backend for :class:`~.store.ChatHistoryStore`.

One ``documents`` row per conversation or folder; the body column holds the
JSON document from ``chat_history_schema_v2.json``. Short-lived connections
per call (thread-safe on the tornado loop), WAL journal mode. Single-machine
storage: file locking covers ``--num-procs``, but not NFS or multi-host; use
another ``ChatHistoryStore`` implementation for those.
"""

from __future__ import annotations

import json
import sqlite3
import threading
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from typing import Any

from .document import SCHEMA_VERSION, DocumentHistoryStore

_SCHEMA_PATH = Path(__file__).parent / f"chat_history_schema_v{SCHEMA_VERSION}.sql"


class SqliteHistoryStore(DocumentHistoryStore):
    """SQLite-backed chat history store (one file, zero configuration)."""

    def __init__(self, path: str | Path) -> None:
        """Create or open the store at ``path`` (parent dirs are created)."""
        self._path = Path(path)
        self._path.parent.mkdir(parents=True, exist_ok=True)
        self._local = threading.local()
        with self._connect() as conn:
            conn.execute("PRAGMA journal_mode=WAL")
            conn.executescript(_SCHEMA_PATH.read_text(encoding="utf-8"))
            if conn.execute("PRAGMA user_version").fetchone()[0] == 0:
                conn.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")

    # -- connections ----------------------------------------------------------

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        """Yield the ambient transaction connection or a short-lived one."""
        ambient = getattr(self._local, "conn", None)
        if ambient is not None:
            yield ambient
            return
        conn = sqlite3.connect(self._path, timeout=10)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        except BaseException:
            conn.rollback()
            raise
        finally:
            conn.close()

    @contextmanager
    def _transaction(self) -> Iterator[None]:
        """Run the enclosed calls on one connection under a write lock."""
        if getattr(self._local, "conn", None) is not None:
            yield
            return
        conn = sqlite3.connect(self._path, timeout=10, isolation_level=None)
        conn.row_factory = sqlite3.Row
        self._local.conn = conn
        try:
            # take the write lock up front: the read-modify-write in
            # append_message must not lose updates across processes
            conn.execute("BEGIN IMMEDIATE")
            yield
            conn.execute("COMMIT")
        except BaseException:
            conn.execute("ROLLBACK")
            raise
        finally:
            self._local.conn = None
            conn.close()

    # -- document CRUD --------------------------------------------------------

    def _get(self, user_id: str, kind: str, doc_id: str) -> dict[str, Any] | None:
        with self._connect() as conn:
            row = conn.execute(
                "SELECT body FROM documents WHERE id = ? AND user_id = ? AND kind = ?",
                (doc_id, user_id, kind),
            ).fetchone()
        return json.loads(row["body"]) if row is not None else None

    def _put(self, user_id: str, kind: str, document: dict[str, Any]) -> None:
        with self._connect() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO documents (id, user_id, kind, updated_at, body) VALUES (?, ?, ?, ?, ?)",
                (document["id"], user_id, kind, document["updated_at"], json.dumps(document, ensure_ascii=False)),
            )

    def _delete(self, user_id: str, kind: str, doc_id: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "DELETE FROM documents WHERE id = ? AND user_id = ? AND kind = ?",
                (doc_id, user_id, kind),
            )

    def _iter(self, user_id: str, kind: str) -> list[dict[str, Any]]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT body FROM documents WHERE user_id = ? AND kind = ? ORDER BY rowid",
                (user_id, kind),
            ).fetchall()
        return [json.loads(row["body"]) for row in rows]

    # -- lifecycle ----------------------------------------------------------

    def close(self) -> None:
        """Nothing held open: connections are per-call."""
