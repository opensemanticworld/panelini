"""SQLite backend for :class:`~.store.ChatHistoryStore`.

One short-lived connection per call (thread-safe on the tornado loop), WAL
journal mode, ``foreign_keys`` on. Single-machine storage: file locking
covers ``--num-procs``, but not NFS or multi-host; use another
``ChatHistoryStore`` implementation for those.
"""

from __future__ import annotations

import json
import sqlite3
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Any

from .store import (
    DEFAULT_TITLE,
    ChatHistoryStore,
    ConversationRecord,
    FolderRecord,
    MessageRecord,
    new_id,
    utcnow,
    validate_role,
)

_SCHEMA_VERSION = 1
# File name carries the version and must match PRAGMA user_version.
_SCHEMA_PATH = Path(__file__).parent / f"chat_history_schema_v{_SCHEMA_VERSION}.sql"


def _iso(moment: datetime) -> str:
    return moment.isoformat()


def _conversation_from_row(row: sqlite3.Row) -> ConversationRecord:
    return ConversationRecord(
        id=row["id"],
        user_id=row["user_id"],
        title=row["title"],
        pinned=bool(row["pinned"]),
        archived=bool(row["archived"]),
        folder_id=row["folder_id"],
        current_message_id=row["current_message_id"],
        created_at=datetime.fromisoformat(row["created_at"]),
        updated_at=datetime.fromisoformat(row["updated_at"]),
    )


def _message_from_row(row: sqlite3.Row) -> MessageRecord:
    extra = row["extra"]
    return MessageRecord(
        id=row["id"],
        conversation_id=row["conversation_id"],
        user_id=row["user_id"],
        role=row["role"],
        content=row["content"],
        extra=json.loads(extra) if extra is not None else None,
        parent_message_id=row["parent_message_id"],
        created_at=datetime.fromisoformat(row["created_at"]),
    )


def _folder_from_row(row: sqlite3.Row) -> FolderRecord:
    return FolderRecord(
        id=row["id"],
        user_id=row["user_id"],
        name=row["name"],
        parent_id=row["parent_id"],
        created_at=datetime.fromisoformat(row["created_at"]),
        updated_at=datetime.fromisoformat(row["updated_at"]),
    )


class SqliteHistoryStore(ChatHistoryStore):
    """SQLite-backed chat history store (one file, zero configuration)."""

    def __init__(self, path: str | Path) -> None:
        """Create or open the store at ``path`` (parent dirs are created)."""
        self._path = Path(path)
        self._path.parent.mkdir(parents=True, exist_ok=True)
        with self._connect() as conn:
            conn.execute("PRAGMA journal_mode=WAL")
            conn.executescript(_SCHEMA_PATH.read_text(encoding="utf-8"))
            if conn.execute("PRAGMA user_version").fetchone()[0] == 0:
                conn.execute(f"PRAGMA user_version = {_SCHEMA_VERSION}")

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        """Yield a short-lived connection wrapping one transaction."""
        conn = sqlite3.connect(self._path, timeout=10)
        conn.row_factory = sqlite3.Row
        try:
            conn.execute("PRAGMA foreign_keys=ON")
            yield conn
            conn.commit()
        except BaseException:
            conn.rollback()
            raise
        finally:
            conn.close()

    def _require_folder(self, conn: sqlite3.Connection, user_id: str, folder_id: str | None) -> None:
        if folder_id is None:
            return
        row = conn.execute("SELECT id FROM folders WHERE id = ? AND user_id = ?", (folder_id, user_id)).fetchone()
        if row is None:
            msg = "Unknown folder for this user."
            raise ValueError(msg)

    # -- conversations ------------------------------------------------------

    def list_conversations(self, user_id: str, include_archived: bool = False) -> list[ConversationRecord]:
        query = "SELECT * FROM conversations WHERE user_id = ?"
        if not include_archived:
            query += " AND archived = 0"
        query += " ORDER BY updated_at DESC, rowid DESC"
        with self._connect() as conn:
            rows = conn.execute(query, (user_id,)).fetchall()
        return [_conversation_from_row(row) for row in rows]

    def get_conversation(self, user_id: str, conversation_id: str) -> ConversationRecord | None:
        with self._connect() as conn:
            row = conn.execute(
                "SELECT * FROM conversations WHERE id = ? AND user_id = ?", (conversation_id, user_id)
            ).fetchone()
        return _conversation_from_row(row) if row is not None else None

    def create_conversation(
        self, user_id: str, title: str = DEFAULT_TITLE, folder_id: str | None = None
    ) -> ConversationRecord:
        now = utcnow()
        record = ConversationRecord(
            id=new_id(),
            user_id=user_id,
            title=title,
            pinned=False,
            archived=False,
            folder_id=folder_id,
            current_message_id=None,
            created_at=now,
            updated_at=now,
        )
        with self._connect() as conn:
            self._require_folder(conn, user_id, folder_id)
            conn.execute(
                "INSERT INTO conversations (id, user_id, title, pinned, archived, folder_id,"
                " current_message_id, created_at, updated_at) VALUES (?, ?, ?, 0, 0, ?, NULL, ?, ?)",
                (record.id, user_id, title, folder_id, _iso(now), _iso(now)),
            )
        return record

    def rename_conversation(self, user_id: str, conversation_id: str, title: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "UPDATE conversations SET title = ? WHERE id = ? AND user_id = ?",
                (title, conversation_id, user_id),
            )

    def delete_conversation(self, user_id: str, conversation_id: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "DELETE FROM conversations WHERE id = ? AND user_id = ?",
                (conversation_id, user_id),
            )

    def move_conversation(self, user_id: str, conversation_id: str, folder_id: str | None) -> None:
        with self._connect() as conn:
            self._require_folder(conn, user_id, folder_id)
            conn.execute(
                "UPDATE conversations SET folder_id = ? WHERE id = ? AND user_id = ?",
                (folder_id, conversation_id, user_id),
            )

    def set_pinned(self, user_id: str, conversation_id: str, pinned: bool) -> None:
        with self._connect() as conn:
            conn.execute(
                "UPDATE conversations SET pinned = ? WHERE id = ? AND user_id = ?",
                (int(pinned), conversation_id, user_id),
            )

    def set_archived(self, user_id: str, conversation_id: str, archived: bool) -> None:
        with self._connect() as conn:
            conn.execute(
                "UPDATE conversations SET archived = ? WHERE id = ? AND user_id = ?",
                (int(archived), conversation_id, user_id),
            )

    # -- messages -----------------------------------------------------------

    def append_message(
        self,
        user_id: str,
        conversation_id: str,
        role: str,
        content: str,
        extra: dict[str, Any] | None = None,
        parent_message_id: str | None = None,
    ) -> MessageRecord:
        validate_role(role)
        now = utcnow()
        with self._connect() as conn:
            row = conn.execute(
                "SELECT current_message_id FROM conversations WHERE id = ? AND user_id = ?",
                (conversation_id, user_id),
            ).fetchone()
            if row is None:
                msg = "Unknown conversation for this user."
                raise ValueError(msg)
            record = MessageRecord(
                id=new_id(),
                conversation_id=conversation_id,
                user_id=user_id,
                role=role,
                content=content,
                extra=extra,
                parent_message_id=(parent_message_id if parent_message_id is not None else row["current_message_id"]),
                created_at=now,
            )
            conn.execute(
                "INSERT INTO messages (id, conversation_id, user_id, role, content, extra,"
                " parent_message_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    record.id,
                    conversation_id,
                    user_id,
                    role,
                    content,
                    json.dumps(extra) if extra is not None else None,
                    record.parent_message_id,
                    _iso(now),
                ),
            )
            conn.execute(
                "UPDATE conversations SET updated_at = ?, current_message_id = ? WHERE id = ? AND user_id = ?",
                (_iso(now), record.id, conversation_id, user_id),
            )
        return record

    def load_messages(self, user_id: str, conversation_id: str) -> list[MessageRecord]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT * FROM messages WHERE conversation_id = ? AND user_id = ? ORDER BY created_at, rowid",
                (conversation_id, user_id),
            ).fetchall()
        return [_message_from_row(row) for row in rows]

    # -- folders ------------------------------------------------------------

    def list_folders(self, user_id: str) -> list[FolderRecord]:
        with self._connect() as conn:
            rows = conn.execute("SELECT * FROM folders WHERE user_id = ? ORDER BY rowid", (user_id,)).fetchall()
        return [_folder_from_row(row) for row in rows]

    def create_folder(self, user_id: str, name: str, parent_id: str | None = None) -> FolderRecord:
        now = utcnow()
        record = FolderRecord(
            id=new_id(),
            user_id=user_id,
            name=name,
            parent_id=parent_id,
            created_at=now,
            updated_at=now,
        )
        with self._connect() as conn:
            self._require_folder(conn, user_id, parent_id)
            conn.execute(
                "INSERT INTO folders (id, user_id, name, parent_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                (record.id, user_id, name, parent_id, _iso(now), _iso(now)),
            )
        return record

    def rename_folder(self, user_id: str, folder_id: str, name: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "UPDATE folders SET name = ? WHERE id = ? AND user_id = ?",
                (name, folder_id, user_id),
            )

    def delete_folder(self, user_id: str, folder_id: str) -> None:
        # ON DELETE SET NULL moves the folder's conversations and subfolders
        # to the root as part of the same transaction.
        with self._connect() as conn:
            conn.execute(
                "DELETE FROM folders WHERE id = ? AND user_id = ?",
                (folder_id, user_id),
            )

    # -- lifecycle ----------------------------------------------------------

    def close(self) -> None:
        """Nothing held open: connections are per-call."""
