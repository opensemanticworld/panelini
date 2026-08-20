"""Per-user chat history storage: records, store interface, in-memory backend.

Contract for all backends: every method is scoped by ``user_id``; mutations
on another user's (or a missing) row are silent no-ops, invalid references
(unowned conversation or folder) raise ``ValueError``. Only
``append_message`` bumps ``updated_at`` and ``current_message_id``.
``parent_message_id`` and ``current_message_id`` exist so message branching
can be added later without a schema migration.
"""

from __future__ import annotations

import threading
import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass, replace
from datetime import datetime, timezone
from typing import Any

VALID_ROLES = frozenset({"human", "ai", "tool", "system"})
DEFAULT_TITLE = "New Chat"
TITLE_MAX_LENGTH = 48


def derive_title(text: str, max_length: int = TITLE_MAX_LENGTH) -> str:
    """Return a conversation title derived from a message, cut at a word."""
    collapsed = " ".join(text.split())
    if not collapsed:
        return DEFAULT_TITLE
    if len(collapsed) <= max_length:
        return collapsed
    head = collapsed[:max_length].rsplit(" ", 1)[0] or collapsed[:max_length]
    return f"{head}…"


def utcnow() -> datetime:
    """Return the current UTC time."""
    return datetime.now(timezone.utc)


def new_id() -> str:
    """Return a new random record id."""
    return uuid.uuid4().hex


@dataclass(frozen=True)
class ConversationRecord:
    """One chat conversation owned by a user."""

    id: str
    user_id: str
    title: str
    pinned: bool
    archived: bool
    folder_id: str | None
    current_message_id: str | None
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True)
class MessageRecord:
    """One message inside a conversation."""

    id: str
    conversation_id: str
    user_id: str
    role: str
    content: str
    extra: dict[str, Any] | None
    parent_message_id: str | None
    created_at: datetime


@dataclass(frozen=True)
class FolderRecord:
    """One history folder owned by a user."""

    id: str
    user_id: str
    name: str
    parent_id: str | None
    created_at: datetime
    updated_at: datetime


class ChatHistoryStore(ABC):
    """Abstract per-user conversation storage."""

    # -- conversations ------------------------------------------------------

    @abstractmethod
    def list_conversations(self, user_id: str, include_archived: bool = False) -> list[ConversationRecord]:
        """Return the user's conversations, most recently updated first."""

    @abstractmethod
    def search_conversations(
        self, user_id: str, query: str, include_archived: bool = False
    ) -> list[ConversationRecord]:
        """Return conversations whose title or messages contain ``query``.

        Case-insensitive substring match (ASCII case folding), most recently
        updated first. A blank query behaves like :meth:`list_conversations`.
        """

    @abstractmethod
    def get_conversation(self, user_id: str, conversation_id: str) -> ConversationRecord | None:
        """Return one conversation, or ``None`` if absent for this user."""

    @abstractmethod
    def create_conversation(
        self, user_id: str, title: str = DEFAULT_TITLE, folder_id: str | None = None
    ) -> ConversationRecord:
        """Create and return a new conversation.

        Raises:
            ValueError: On a folder the user does not own.
        """

    @abstractmethod
    def rename_conversation(self, user_id: str, conversation_id: str, title: str) -> None:
        """Set a conversation's title (``updated_at`` is not bumped)."""

    @abstractmethod
    def delete_conversation(self, user_id: str, conversation_id: str) -> None:
        """Delete a conversation and all its messages in one transaction."""

    @abstractmethod
    def move_conversation(self, user_id: str, conversation_id: str, folder_id: str | None) -> None:
        """Move a conversation into a folder (``None`` moves it to the root).

        Raises:
            ValueError: On a folder the user does not own.
        """

    @abstractmethod
    def set_pinned(self, user_id: str, conversation_id: str, pinned: bool) -> None:
        """Pin or unpin a conversation (``updated_at`` is not bumped)."""

    @abstractmethod
    def set_archived(self, user_id: str, conversation_id: str, archived: bool) -> None:
        """Archive or unarchive a conversation (``updated_at`` is not bumped)."""

    # -- messages -----------------------------------------------------------

    @abstractmethod
    def append_message(
        self,
        user_id: str,
        conversation_id: str,
        role: str,
        content: str,
        extra: dict[str, Any] | None = None,
        parent_message_id: str | None = None,
    ) -> MessageRecord:
        """Append a message; bumps ``updated_at`` and ``current_message_id``.

        ``parent_message_id`` defaults to the previous ``current_message_id``.

        Raises:
            ValueError: On invalid ``role`` or unowned conversation.
        """

    @abstractmethod
    def load_messages(self, user_id: str, conversation_id: str) -> list[MessageRecord]:
        """Return a conversation's messages in insertion order."""

    # -- folders ------------------------------------------------------------

    @abstractmethod
    def list_folders(self, user_id: str) -> list[FolderRecord]:
        """Return the user's folders in creation order."""

    @abstractmethod
    def create_folder(self, user_id: str, name: str, parent_id: str | None = None) -> FolderRecord:
        """Create and return a new folder.

        Raises:
            ValueError: On a parent folder the user does not own.
        """

    @abstractmethod
    def rename_folder(self, user_id: str, folder_id: str, name: str) -> None:
        """Set a folder's name."""

    @abstractmethod
    def move_folder(self, user_id: str, folder_id: str, parent_id: str | None) -> None:
        """Move a folder under another folder (``None`` moves it to the root).

        Raises:
            ValueError: On a parent the user does not own, or a move into
                the folder's own subtree.
        """

    @abstractmethod
    def delete_folder(self, user_id: str, folder_id: str) -> None:
        """Delete a folder; its conversations and subfolders move to the root."""

    # -- lifecycle ----------------------------------------------------------

    @abstractmethod
    def close(self) -> None:
        """Release backend resources (no-op where nothing is held open)."""


def validate_role(role: str) -> None:
    """Raise ``ValueError`` for roles outside :data:`VALID_ROLES`."""
    if role not in VALID_ROLES:
        msg = f"Invalid message role {role!r}; expected one of {sorted(VALID_ROLES)}."
        raise ValueError(msg)


class InMemoryHistoryStore(ChatHistoryStore):
    """Thread-safe in-memory backend for tests, stubs, and Pyodide builds."""

    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._conversations: dict[str, ConversationRecord] = {}
        self._messages: dict[str, list[MessageRecord]] = {}
        self._folders: dict[str, FolderRecord] = {}

    # -- internal helpers ---------------------------------------------------

    def _own_conversation(self, user_id: str, conversation_id: str) -> ConversationRecord | None:
        record = self._conversations.get(conversation_id)
        if record is not None and record.user_id == user_id:
            return record
        return None

    def _own_folder(self, user_id: str, folder_id: str) -> FolderRecord | None:
        record = self._folders.get(folder_id)
        if record is not None and record.user_id == user_id:
            return record
        return None

    def _require_folder(self, user_id: str, folder_id: str | None) -> None:
        if folder_id is not None and self._own_folder(user_id, folder_id) is None:
            msg = "Unknown folder for this user."
            raise ValueError(msg)

    # -- conversations ------------------------------------------------------

    def list_conversations(self, user_id: str, include_archived: bool = False) -> list[ConversationRecord]:
        with self._lock:
            records = [
                r for r in self._conversations.values() if r.user_id == user_id and (include_archived or not r.archived)
            ]
        return sorted(records, key=lambda r: r.updated_at, reverse=True)

    def search_conversations(
        self, user_id: str, query: str, include_archived: bool = False
    ) -> list[ConversationRecord]:
        needle = query.strip().lower()
        if not needle:
            return self.list_conversations(user_id, include_archived)
        with self._lock:
            matches = [
                record
                for record in self._conversations.values()
                if record.user_id == user_id
                and (include_archived or not record.archived)
                and (
                    needle in record.title.lower()
                    or any(needle in message.content.lower() for message in self._messages.get(record.id, ()))
                )
            ]
        return sorted(matches, key=lambda r: r.updated_at, reverse=True)

    def get_conversation(self, user_id: str, conversation_id: str) -> ConversationRecord | None:
        with self._lock:
            return self._own_conversation(user_id, conversation_id)

    def create_conversation(
        self, user_id: str, title: str = DEFAULT_TITLE, folder_id: str | None = None
    ) -> ConversationRecord:
        with self._lock:
            self._require_folder(user_id, folder_id)
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
            self._conversations[record.id] = record
            self._messages[record.id] = []
            return record

    def rename_conversation(self, user_id: str, conversation_id: str, title: str) -> None:
        with self._lock:
            record = self._own_conversation(user_id, conversation_id)
            if record is not None:
                self._conversations[conversation_id] = replace(record, title=title)

    def delete_conversation(self, user_id: str, conversation_id: str) -> None:
        with self._lock:
            if self._own_conversation(user_id, conversation_id) is not None:
                del self._conversations[conversation_id]
                self._messages.pop(conversation_id, None)

    def move_conversation(self, user_id: str, conversation_id: str, folder_id: str | None) -> None:
        with self._lock:
            self._require_folder(user_id, folder_id)
            record = self._own_conversation(user_id, conversation_id)
            if record is not None:
                self._conversations[conversation_id] = replace(record, folder_id=folder_id)

    def set_pinned(self, user_id: str, conversation_id: str, pinned: bool) -> None:
        with self._lock:
            record = self._own_conversation(user_id, conversation_id)
            if record is not None:
                self._conversations[conversation_id] = replace(record, pinned=pinned)

    def set_archived(self, user_id: str, conversation_id: str, archived: bool) -> None:
        with self._lock:
            record = self._own_conversation(user_id, conversation_id)
            if record is not None:
                self._conversations[conversation_id] = replace(record, archived=archived)

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
        with self._lock:
            conversation = self._own_conversation(user_id, conversation_id)
            if conversation is None:
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
                    parent_message_id if parent_message_id is not None else conversation.current_message_id
                ),
                created_at=now,
            )
            self._messages[conversation_id].append(record)
            self._conversations[conversation_id] = replace(conversation, updated_at=now, current_message_id=record.id)
            return record

    def load_messages(self, user_id: str, conversation_id: str) -> list[MessageRecord]:
        with self._lock:
            if self._own_conversation(user_id, conversation_id) is None:
                return []
            return list(self._messages.get(conversation_id, []))

    # -- folders ------------------------------------------------------------

    def list_folders(self, user_id: str) -> list[FolderRecord]:
        with self._lock:
            return [r for r in self._folders.values() if r.user_id == user_id]

    def create_folder(self, user_id: str, name: str, parent_id: str | None = None) -> FolderRecord:
        with self._lock:
            self._require_folder(user_id, parent_id)
            now = utcnow()
            record = FolderRecord(
                id=new_id(),
                user_id=user_id,
                name=name,
                parent_id=parent_id,
                created_at=now,
                updated_at=now,
            )
            self._folders[record.id] = record
            return record

    def rename_folder(self, user_id: str, folder_id: str, name: str) -> None:
        with self._lock:
            record = self._own_folder(user_id, folder_id)
            if record is not None:
                self._folders[folder_id] = replace(record, name=name)

    def move_folder(self, user_id: str, folder_id: str, parent_id: str | None) -> None:
        with self._lock:
            self._require_folder(user_id, parent_id)
            record = self._own_folder(user_id, folder_id)
            if record is None:
                return
            current = parent_id
            while current is not None:
                if current == folder_id:
                    msg = "Cannot move a folder into its own subtree."
                    raise ValueError(msg)
                parent = self._folders.get(current)
                current = parent.parent_id if parent is not None else None
            self._folders[folder_id] = replace(record, parent_id=parent_id)

    def delete_folder(self, user_id: str, folder_id: str) -> None:
        with self._lock:
            if self._own_folder(user_id, folder_id) is None:
                return
            del self._folders[folder_id]
            for conv_id, conv in self._conversations.items():
                if conv.folder_id == folder_id:
                    self._conversations[conv_id] = replace(conv, folder_id=None)
            for fid, folder in self._folders.items():
                if folder.parent_id == folder_id:
                    self._folders[fid] = replace(folder, parent_id=None)

    # -- lifecycle ----------------------------------------------------------

    def close(self) -> None:
        """Nothing to release for the in-memory backend."""
