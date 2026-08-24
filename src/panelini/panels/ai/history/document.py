"""Document-shaped chat history: schema, converters, shared store logic.

The conversation document defined by ``chat_history_schema_v2.json`` (an
OO-LD document: JSON-Schema plus a JSON-LD ``@context``) is both the storage
model and the import/export interchange format. :class:`DocumentHistoryStore`
implements every :class:`~.store.ChatHistoryStore` semantic once, on top of
a minimal per-document CRUD that each backend provides.
"""

from __future__ import annotations

import copy
import json
import threading
from abc import abstractmethod
from collections.abc import Iterator, Sequence
from contextlib import contextmanager
from datetime import datetime
from functools import lru_cache
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

SCHEMA_VERSION = 2
KIND_CONVERSATION = "conversation"
KIND_FOLDER = "folder"

_SCHEMA_PATH = Path(__file__).parent / f"chat_history_schema_v{SCHEMA_VERSION}.json"


@lru_cache(maxsize=1)
def load_schema() -> dict[str, Any]:
    """Return the bundled conversation document schema."""
    return json.loads(_SCHEMA_PATH.read_text(encoding="utf-8"))


def document_context() -> dict[str, Any]:
    """Return the schema's JSON-LD ``@context`` block."""
    return copy.deepcopy(load_schema()["@context"])


def validate_conversation_document(document: dict[str, Any]) -> None:
    """Validate a conversation document against the v2 schema.

    A no-op when :mod:`jsonschema` is not installed (e.g. Pyodide builds).

    Raises:
        ValueError: When the document does not match the schema.
    """
    try:
        import jsonschema
    except ImportError:  # pragma: no cover - optional dependency
        return
    try:
        jsonschema.validate(document, load_schema())
    except jsonschema.ValidationError as err:
        raise ValueError(err.message) from err


# ── record <-> document converters ─────────────────────────────────────────


def message_to_dict(record: MessageRecord) -> dict[str, Any]:
    """Return the embedded-message dict for one message record."""
    return {
        "id": record.id,
        "role": record.role,
        "content": record.content,
        "extra": record.extra,
        "parent_message_id": record.parent_message_id,
        "created_at": record.created_at.isoformat(),
    }


def conversation_to_document(record: ConversationRecord, messages: Sequence[MessageRecord] = ()) -> dict[str, Any]:
    """Compose the v2 conversation document from records."""
    return {
        "schema_version": SCHEMA_VERSION,
        "type": "Conversation",
        "id": record.id,
        "user_id": record.user_id,
        "title": record.title,
        "pinned": record.pinned,
        "archived": record.archived,
        "folder_id": record.folder_id,
        "current_message_id": record.current_message_id,
        "created_at": record.created_at.isoformat(),
        "updated_at": record.updated_at.isoformat(),
        "messages": [message_to_dict(message) for message in messages],
    }


def conversation_from_document(document: dict[str, Any]) -> ConversationRecord:
    """Extract the conversation record (without messages) from a document."""
    return ConversationRecord(
        id=document["id"],
        user_id=document["user_id"],
        title=document["title"],
        pinned=bool(document.get("pinned", False)),
        archived=bool(document.get("archived", False)),
        folder_id=document.get("folder_id"),
        current_message_id=document.get("current_message_id"),
        created_at=datetime.fromisoformat(document["created_at"]),
        updated_at=datetime.fromisoformat(document["updated_at"]),
    )


def messages_from_document(document: dict[str, Any]) -> list[MessageRecord]:
    """Extract the embedded message records from a conversation document."""
    return [
        MessageRecord(
            id=message["id"],
            conversation_id=document["id"],
            user_id=document["user_id"],
            role=message["role"],
            content=message["content"],
            extra=message.get("extra"),
            parent_message_id=message.get("parent_message_id"),
            created_at=datetime.fromisoformat(message["created_at"]),
        )
        for message in document.get("messages", [])
    ]


def folder_to_document(record: FolderRecord) -> dict[str, Any]:
    """Compose the folder document from a record."""
    return {
        "schema_version": SCHEMA_VERSION,
        "type": "Folder",
        "id": record.id,
        "user_id": record.user_id,
        "name": record.name,
        "parent_id": record.parent_id,
        "created_at": record.created_at.isoformat(),
        "updated_at": record.updated_at.isoformat(),
    }


def folder_from_document(document: dict[str, Any]) -> FolderRecord:
    """Extract the folder record from a document."""
    return FolderRecord(
        id=document["id"],
        user_id=document["user_id"],
        name=document["name"],
        parent_id=document.get("parent_id"),
        created_at=datetime.fromisoformat(document["created_at"]),
        updated_at=datetime.fromisoformat(document["updated_at"]),
    )


# ── shared store logic ──────────────────────────────────────────────────────


class DocumentHistoryStore(ChatHistoryStore):
    """Implements every store semantic over a minimal document CRUD.

    Backends provide only :meth:`_get`, :meth:`_put`, :meth:`_delete`,
    :meth:`_iter` (all scoped by ``user_id``) and :meth:`_transaction`, a
    context manager making the enclosed read-modify-write atomic.
    """

    # -- backend seam ---------------------------------------------------------

    @abstractmethod
    def _get(self, user_id: str, kind: str, doc_id: str) -> dict[str, Any] | None:
        """Return one document owned by ``user_id``, or ``None``."""

    @abstractmethod
    def _put(self, user_id: str, kind: str, document: dict[str, Any]) -> None:
        """Insert or replace one document (keyed by ``document['id']``)."""

    @abstractmethod
    def _delete(self, user_id: str, kind: str, doc_id: str) -> None:
        """Delete one document owned by ``user_id`` (missing is a no-op)."""

    @abstractmethod
    def _iter(self, user_id: str, kind: str) -> list[dict[str, Any]]:
        """Return the user's documents of ``kind`` in insertion order."""

    @abstractmethod
    def _transaction(self) -> Any:
        """Context manager making the enclosed calls one atomic unit."""

    # -- internal helpers -----------------------------------------------------

    def _require_folder(self, user_id: str, folder_id: str | None) -> None:
        if folder_id is not None and self._get(user_id, KIND_FOLDER, folder_id) is None:
            msg = "Unknown folder for this user."
            raise ValueError(msg)

    # -- conversations --------------------------------------------------------

    def list_conversations(self, user_id: str, include_archived: bool = False) -> list[ConversationRecord]:
        records = [conversation_from_document(doc) for doc in self._iter(user_id, KIND_CONVERSATION)]
        if not include_archived:
            records = [r for r in records if not r.archived]
        return sorted(records, key=lambda r: r.updated_at, reverse=True)

    def search_conversations(
        self, user_id: str, query: str, include_archived: bool = False
    ) -> list[ConversationRecord]:
        needle = query.strip().lower()
        if not needle:
            return self.list_conversations(user_id, include_archived)
        matches = [
            doc
            for doc in self._iter(user_id, KIND_CONVERSATION)
            if (include_archived or not doc.get("archived"))
            and (
                needle in doc["title"].lower()
                or any(needle in message["content"].lower() for message in doc.get("messages", []))
            )
        ]
        records = [conversation_from_document(doc) for doc in matches]
        return sorted(records, key=lambda r: r.updated_at, reverse=True)

    def get_conversation(self, user_id: str, conversation_id: str) -> ConversationRecord | None:
        doc = self._get(user_id, KIND_CONVERSATION, conversation_id)
        return conversation_from_document(doc) if doc is not None else None

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
        with self._transaction():
            self._require_folder(user_id, folder_id)
            self._put(user_id, KIND_CONVERSATION, conversation_to_document(record))
        return record

    def _update_conversation(self, user_id: str, conversation_id: str, **changes: Any) -> None:
        """Read-modify-write selected fields; silent no-op when unowned."""
        with self._transaction():
            doc = self._get(user_id, KIND_CONVERSATION, conversation_id)
            if doc is None:
                return
            doc.update(changes)
            self._put(user_id, KIND_CONVERSATION, doc)

    def rename_conversation(self, user_id: str, conversation_id: str, title: str) -> None:
        self._update_conversation(user_id, conversation_id, title=title)

    def delete_conversation(self, user_id: str, conversation_id: str) -> None:
        self._delete(user_id, KIND_CONVERSATION, conversation_id)

    def move_conversation(self, user_id: str, conversation_id: str, folder_id: str | None) -> None:
        with self._transaction():
            self._require_folder(user_id, folder_id)
            doc = self._get(user_id, KIND_CONVERSATION, conversation_id)
            if doc is None:
                return
            doc["folder_id"] = folder_id
            self._put(user_id, KIND_CONVERSATION, doc)

    def set_pinned(self, user_id: str, conversation_id: str, pinned: bool) -> None:
        self._update_conversation(user_id, conversation_id, pinned=pinned)

    def set_archived(self, user_id: str, conversation_id: str, archived: bool) -> None:
        self._update_conversation(user_id, conversation_id, archived=archived)

    # -- messages -------------------------------------------------------------

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
        with self._transaction():
            doc = self._get(user_id, KIND_CONVERSATION, conversation_id)
            if doc is None:
                msg = "Unknown conversation for this user."
                raise ValueError(msg)
            now = utcnow()
            record = MessageRecord(
                id=new_id(),
                conversation_id=conversation_id,
                user_id=user_id,
                role=role,
                content=content,
                extra=extra,
                parent_message_id=(
                    parent_message_id if parent_message_id is not None else doc.get("current_message_id")
                ),
                created_at=now,
            )
            doc.setdefault("messages", []).append(message_to_dict(record))
            doc["updated_at"] = now.isoformat()
            doc["current_message_id"] = record.id
            self._put(user_id, KIND_CONVERSATION, doc)
        return record

    def load_messages(self, user_id: str, conversation_id: str) -> list[MessageRecord]:
        doc = self._get(user_id, KIND_CONVERSATION, conversation_id)
        return messages_from_document(doc) if doc is not None else []

    # -- folders ----------------------------------------------------------------

    def list_folders(self, user_id: str) -> list[FolderRecord]:
        return [folder_from_document(doc) for doc in self._iter(user_id, KIND_FOLDER)]

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
        with self._transaction():
            self._require_folder(user_id, parent_id)
            self._put(user_id, KIND_FOLDER, folder_to_document(record))
        return record

    def rename_folder(self, user_id: str, folder_id: str, name: str) -> None:
        with self._transaction():
            doc = self._get(user_id, KIND_FOLDER, folder_id)
            if doc is None:
                return
            doc["name"] = name
            self._put(user_id, KIND_FOLDER, doc)

    def move_folder(self, user_id: str, folder_id: str, parent_id: str | None) -> None:
        with self._transaction():
            self._require_folder(user_id, parent_id)
            doc = self._get(user_id, KIND_FOLDER, folder_id)
            if doc is None:
                return
            current = parent_id
            while current is not None:
                if current == folder_id:
                    msg = "Cannot move a folder into its own subtree."
                    raise ValueError(msg)
                parent = self._get(user_id, KIND_FOLDER, current)
                current = parent.get("parent_id") if parent is not None else None
            doc["parent_id"] = parent_id
            self._put(user_id, KIND_FOLDER, doc)

    def delete_folder(self, user_id: str, folder_id: str) -> None:
        # Contents move to the root in the same transaction.
        with self._transaction():
            if self._get(user_id, KIND_FOLDER, folder_id) is None:
                return
            self._delete(user_id, KIND_FOLDER, folder_id)
            for doc in self._iter(user_id, KIND_CONVERSATION):
                if doc.get("folder_id") == folder_id:
                    doc["folder_id"] = None
                    self._put(user_id, KIND_CONVERSATION, doc)
            for doc in self._iter(user_id, KIND_FOLDER):
                if doc.get("parent_id") == folder_id:
                    doc["parent_id"] = None
                    self._put(user_id, KIND_FOLDER, doc)


class InMemoryHistoryStore(DocumentHistoryStore):
    """Thread-safe in-memory backend for tests, stubs, and Pyodide builds.

    Documents are copied on the way in and out, mirroring the serialization
    boundary a browser object store would impose.
    """

    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._docs: dict[str, dict[str, dict[str, Any]]] = {KIND_CONVERSATION: {}, KIND_FOLDER: {}}

    def _get(self, user_id: str, kind: str, doc_id: str) -> dict[str, Any] | None:
        with self._lock:
            doc = self._docs[kind].get(doc_id)
            if doc is None or doc["user_id"] != user_id:
                return None
            return copy.deepcopy(doc)

    def _put(self, user_id: str, kind: str, document: dict[str, Any]) -> None:
        with self._lock:
            self._docs[kind][document["id"]] = copy.deepcopy(document)

    def _delete(self, user_id: str, kind: str, doc_id: str) -> None:
        with self._lock:
            doc = self._docs[kind].get(doc_id)
            if doc is not None and doc["user_id"] == user_id:
                del self._docs[kind][doc_id]

    def _iter(self, user_id: str, kind: str) -> list[dict[str, Any]]:
        with self._lock:
            return [copy.deepcopy(doc) for doc in self._docs[kind].values() if doc["user_id"] == user_id]

    @contextmanager
    def _transaction(self) -> Iterator[None]:
        with self._lock:
            yield

    def close(self) -> None:
        """Nothing to release for the in-memory backend."""
