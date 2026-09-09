"""Per-user chat history storage: records and the store interface.

Contract for all backends: every method is scoped by ``user_id``; mutations
on another user's (or a missing) row are silent no-ops, invalid references
(unowned conversation or folder) raise ``ValueError``. Only
``append_message`` bumps ``updated_at`` and ``current_message_id``.
Backends are implemented over the document layer in :mod:`.document`.
"""

from __future__ import annotations

import base64
import mimetypes
import uuid
from abc import ABC, abstractmethod
from collections.abc import Sequence
from dataclasses import dataclass, field
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
class Attachment:
    """One file sent with a message.

    ``url`` carries the payload inline as a ``data:`` URI or points at it;
    ``text`` is what was extracted from the file for model context. A store
    too small for the payload keeps the reference and sets ``omitted``.
    """

    id: str
    name: str
    media_type: str | None = None
    size: int | None = None
    url: str | None = None
    text: str | None = None
    width: int | None = None
    height: int | None = None
    omitted: bool = False


# Media types read as text although their top-level type is not "text"
TEXT_MEDIA_TYPES = frozenset({
    "application/json",
    "application/xml",
    "application/x-yaml",
    "application/yaml",
    "image/svg+xml",
})


def attachment_from_bytes(name: str, data: bytes, media_type: str | None = None) -> Attachment:
    """Build an attachment from an uploaded file.

    The payload is carried inline as a ``data:`` URI; text-ish files keep
    their decoded content in ``text`` as well, so a model can read them.
    """
    media_type = media_type or mimetypes.guess_type(name)[0] or "application/octet-stream"
    text = None
    if media_type.startswith("text/") or media_type in TEXT_MEDIA_TYPES:
        text = data.decode("utf-8", errors="replace")
    return Attachment(
        id=new_id(),
        name=name,
        media_type=media_type,
        size=len(data),
        url=f"data:{media_type};base64,{base64.b64encode(data).decode('ascii')}",
        text=text,
    )


@dataclass(frozen=True)
class ConversationRecord:
    """One chat conversation owned by a user.

    Folders are virtual: ``folder_ids`` holds every folder the conversation
    is filed under, empty for the root. ``parent_id`` is set on a fork and
    names the conversation it branched off.
    """

    id: str
    user_id: str
    title: str
    pinned: bool
    archived: bool
    folder_ids: tuple[str, ...]
    current_message_id: str | None
    created_at: datetime
    updated_at: datetime
    parent_id: str | None = None
    forked_from_message_id: str | None = None


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
    attachments: tuple[Attachment, ...] = field(default_factory=tuple)


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
        self, user_id: str, title: str = DEFAULT_TITLE, folder_ids: Sequence[str] = ()
    ) -> ConversationRecord:
        """Create and return a new conversation, filed under ``folder_ids``.

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
        """File a conversation under ``folder_id`` only (``None``: the root).

        Replaces every existing membership; :meth:`link_conversation` adds
        one instead.

        Raises:
            ValueError: On a folder the user does not own.
        """

    @abstractmethod
    def link_conversation(self, user_id: str, conversation_id: str, folder_id: str) -> None:
        """File a conversation under one more folder (already there: no-op).

        Raises:
            ValueError: On a folder the user does not own.
        """

    @abstractmethod
    def unlink_conversation(self, user_id: str, conversation_id: str, folder_id: str) -> None:
        """Remove one folder membership; the conversation itself stays.

        Dropping the last one leaves the conversation at the root.
        """

    @abstractmethod
    def fork_conversation(self, user_id: str, conversation_id: str, title: str | None = None) -> ConversationRecord:
        """Copy a conversation into a new one branching off its last message.

        The fork carries the source's messages (with fresh ids) and folders,
        and records the source in ``parent_id``.

        Raises:
            ValueError: On a conversation the user does not own.
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
        attachments: Sequence[Attachment] = (),
    ) -> MessageRecord:
        """Append a message; bumps ``updated_at`` and ``current_message_id``.

        ``parent_message_id`` defaults to the previous ``current_message_id``.
        Backends may store ``attachments`` without their payload (see
        :class:`Attachment`).

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
        """Delete a folder; its subfolders move to the root.

        Conversations lose this membership only, so one filed under another
        folder as well stays there.
        """

    # -- lifecycle ----------------------------------------------------------

    @abstractmethod
    def close(self) -> None:
        """Release backend resources (no-op where nothing is held open)."""


def validate_role(role: str) -> None:
    """Raise ``ValueError`` for roles outside :data:`VALID_ROLES`."""
    if role not in VALID_ROLES:
        msg = f"Invalid message role {role!r}; expected one of {sorted(VALID_ROLES)}."
        raise ValueError(msg)
