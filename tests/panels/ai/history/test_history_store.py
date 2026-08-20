"""Behavior suite for panelini.panels.ai.history stores.

Runs identically against the in-memory and the SQLite backend; both must
honor the same tenant-safety and lifecycle semantics.
"""

from __future__ import annotations

import sqlite3
import time
from collections.abc import Iterator
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import pytest

from panelini.panels.ai.history import (
    DEFAULT_TITLE,
    ChatHistoryStore,
    InMemoryHistoryStore,
    SqliteHistoryStore,
)

pytestmark = pytest.mark.ai

USER = "alice"
OTHER = "bob"


@pytest.fixture(params=["memory", "sqlite"])
def store(request: pytest.FixtureRequest, tmp_path: Path) -> Iterator[ChatHistoryStore]:
    if request.param == "memory":
        backend: ChatHistoryStore = InMemoryHistoryStore()
    else:
        backend = SqliteHistoryStore(tmp_path / "history.sqlite3")
    yield backend
    backend.close()


# ── conversations ─────────────────────────────────────────────────────────


class TestConversations:
    def test_create_defaults(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        assert conv.title == DEFAULT_TITLE
        assert conv.user_id == USER
        assert conv.folder_id is None
        assert conv.current_message_id is None
        assert not conv.pinned
        assert not conv.archived
        assert conv.created_at == conv.updated_at

    def test_get_roundtrip(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER, title="Data cleanup")
        assert store.get_conversation(USER, conv.id) == conv

    def test_get_unknown_returns_none(self, store: ChatHistoryStore) -> None:
        assert store.get_conversation(USER, "missing") is None

    def test_list_orders_by_recent_activity(self, store: ChatHistoryStore) -> None:
        first = store.create_conversation(USER, title="first")
        time.sleep(0.002)
        store.create_conversation(USER, title="second")
        time.sleep(0.002)
        store.append_message(USER, first.id, "human", "hello")
        assert [c.title for c in store.list_conversations(USER)] == ["first", "second"]

    def test_rename_keeps_updated_at(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.rename_conversation(USER, conv.id, "Renamed")
        after = store.get_conversation(USER, conv.id)
        assert after is not None
        assert after.title == "Renamed"
        assert after.updated_at == conv.updated_at  # renames do not resurface

    def test_delete_removes_conversation_and_messages(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "hello")
        store.delete_conversation(USER, conv.id)
        assert store.get_conversation(USER, conv.id) is None
        assert store.load_messages(USER, conv.id) == []

    def test_pin_and_archive_flags(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.set_pinned(USER, conv.id, True)
        store.set_archived(USER, conv.id, True)
        after = store.get_conversation(USER, conv.id)
        assert after is not None
        assert after.pinned
        assert after.archived
        assert after.updated_at == conv.updated_at

    def test_archived_hidden_unless_included(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.set_archived(USER, conv.id, True)
        assert store.list_conversations(USER) == []
        assert [c.id for c in store.list_conversations(USER, include_archived=True)] == [conv.id]


# ── messages ──────────────────────────────────────────────────────────────


class TestMessages:
    def test_append_builds_linear_parent_chain(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        first = store.append_message(USER, conv.id, "human", "question")
        second = store.append_message(USER, conv.id, "ai", "answer")
        assert first.parent_message_id is None
        assert second.parent_message_id == first.id
        after = store.get_conversation(USER, conv.id)
        assert after is not None
        assert after.current_message_id == second.id
        assert after.updated_at >= conv.updated_at

    def test_load_messages_in_order(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        for index in range(5):
            role = "human" if index % 2 == 0 else "ai"
            store.append_message(USER, conv.id, role, f"msg-{index}")
        contents = [m.content for m in store.load_messages(USER, conv.id)]
        assert contents == [f"msg-{i}" for i in range(5)]

    def test_extra_payload_roundtrip(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        extra = {"tool_calls": [{"name": "get_current_time", "id": "t1"}]}
        store.append_message(USER, conv.id, "ai", "done", extra=extra)
        loaded = store.load_messages(USER, conv.id)
        assert loaded[0].extra == extra

    def test_invalid_role_raises(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        with pytest.raises(ValueError, match="role"):
            store.append_message(USER, conv.id, "robot", "beep")

    def test_append_to_unknown_conversation_raises(self, store: ChatHistoryStore) -> None:
        with pytest.raises(ValueError, match="conversation"):
            store.append_message(USER, "missing", "human", "hello")

    def test_concurrent_appends(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)

        def append_batch(batch: int) -> None:
            for index in range(25):
                store.append_message(USER, conv.id, "human", f"{batch}-{index}")

        with ThreadPoolExecutor(max_workers=4) as pool:
            list(pool.map(append_batch, range(4)))

        messages = store.load_messages(USER, conv.id)
        assert len(messages) == 100
        after = store.get_conversation(USER, conv.id)
        assert after is not None
        assert after.current_message_id in {m.id for m in messages}


# ── folders ───────────────────────────────────────────────────────────────


class TestFolders:
    def test_create_list_rename(self, store: ChatHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        assert [f.id for f in store.list_folders(USER)] == [folder.id]
        store.rename_folder(USER, folder.id, "Archive")
        assert store.list_folders(USER)[0].name == "Archive"

    def test_move_conversation_between_root_and_folder(self, store: ChatHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER)
        store.move_conversation(USER, conv.id, folder.id)
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_id == folder.id
        store.move_conversation(USER, conv.id, None)
        back = store.get_conversation(USER, conv.id)
        assert back is not None and back.folder_id is None

    def test_move_to_unknown_folder_raises(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        with pytest.raises(ValueError, match="folder"):
            store.move_conversation(USER, conv.id, "missing")

    def test_delete_folder_moves_contents_to_root(self, store: ChatHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        conv = store.create_conversation(USER, folder_id=parent.id)
        store.delete_folder(USER, parent.id)
        conv_after = store.get_conversation(USER, conv.id)
        assert conv_after is not None and conv_after.folder_id is None
        folders = store.list_folders(USER)
        assert [f.id for f in folders] == [child.id]
        assert folders[0].parent_id is None

    def test_create_conversation_in_unknown_folder_raises(self, store: ChatHistoryStore) -> None:
        with pytest.raises(ValueError, match="folder"):
            store.create_conversation(USER, folder_id="missing")

    def test_move_folder_nests_and_returns_to_root(self, store: ChatHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child")
        store.move_folder(USER, child.id, parent.id)
        assert {f.id: f.parent_id for f in store.list_folders(USER)}[child.id] == parent.id
        store.move_folder(USER, child.id, None)
        assert {f.id: f.parent_id for f in store.list_folders(USER)}[child.id] is None

    def test_move_folder_into_own_subtree_raises(self, store: ChatHistoryStore) -> None:
        top = store.create_folder(USER, "Top")
        mid = store.create_folder(USER, "Mid", parent_id=top.id)
        deep = store.create_folder(USER, "Deep", parent_id=mid.id)
        with pytest.raises(ValueError, match="subtree"):
            store.move_folder(USER, top.id, deep.id)
        with pytest.raises(ValueError, match="subtree"):
            store.move_folder(USER, top.id, top.id)

    def test_move_folder_to_unknown_parent_raises(self, store: ChatHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        with pytest.raises(ValueError, match="folder"):
            store.move_folder(USER, folder.id, "missing")


# ── tenant safety ─────────────────────────────────────────────────────────


class TestUserIsolation:
    def test_lists_are_scoped(self, store: ChatHistoryStore) -> None:
        store.create_conversation(USER)
        store.create_folder(USER, "Projects")
        assert store.list_conversations(OTHER) == []
        assert store.list_folders(OTHER) == []

    def test_reads_are_scoped(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        store.append_message(USER, conv.id, "human", "secret")
        assert store.get_conversation(OTHER, conv.id) is None
        assert store.load_messages(OTHER, conv.id) == []

    def test_mutations_are_scoped_no_ops(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER, title="mine")
        store.rename_conversation(OTHER, conv.id, "hijacked")
        store.set_pinned(OTHER, conv.id, True)
        store.set_archived(OTHER, conv.id, True)
        store.delete_conversation(OTHER, conv.id)
        after = store.get_conversation(USER, conv.id)
        assert after is not None
        assert after.title == "mine"
        assert not after.pinned
        assert not after.archived

    def test_append_to_foreign_conversation_raises(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER)
        with pytest.raises(ValueError, match="conversation"):
            store.append_message(OTHER, conv.id, "human", "intrusion")

    def test_foreign_folder_reference_raises(self, store: ChatHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(OTHER)
        with pytest.raises(ValueError, match="folder"):
            store.move_conversation(OTHER, conv.id, folder.id)

    def test_folder_mutations_are_scoped_no_ops(self, store: ChatHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        store.rename_folder(OTHER, folder.id, "hijacked")
        store.delete_folder(OTHER, folder.id)
        folders = store.list_folders(USER)
        assert [f.name for f in folders] == ["Projects"]

    def test_move_folder_is_scoped(self, store: ChatHistoryStore) -> None:
        mine = store.create_folder(USER, "Mine")
        other_parent = store.create_folder(OTHER, "Theirs")
        with pytest.raises(ValueError, match="folder"):
            store.move_folder(USER, mine.id, other_parent.id)
        store.move_folder(OTHER, mine.id, None)  # foreign folder id: no-op
        assert {f.id: f.parent_id for f in store.list_folders(USER)}[mine.id] is None


# ── sqlite specifics ──────────────────────────────────────────────────────


class TestSqliteSpecifics:
    def test_delete_cascades_message_rows(self, tmp_path: Path) -> None:
        """The messages table itself must be emptied, not just the API view."""
        db_path = tmp_path / "history.sqlite3"
        backend = SqliteHistoryStore(db_path)
        conv = backend.create_conversation(USER)
        backend.append_message(USER, conv.id, "human", "hello")
        backend.delete_conversation(USER, conv.id)
        with sqlite3.connect(db_path) as conn:
            count = conn.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
        assert count == 0

    def test_reopen_persists_data(self, tmp_path: Path) -> None:
        db_path = tmp_path / "history.sqlite3"
        first = SqliteHistoryStore(db_path)
        conv = first.create_conversation(USER, title="persisted")
        first.append_message(USER, conv.id, "human", "hello")
        first.close()
        second = SqliteHistoryStore(db_path)
        assert [c.title for c in second.list_conversations(USER)] == ["persisted"]
        assert [m.content for m in second.load_messages(USER, conv.id)] == ["hello"]

    def test_schema_version_is_set(self, tmp_path: Path) -> None:
        db_path = tmp_path / "history.sqlite3"
        SqliteHistoryStore(db_path)
        with sqlite3.connect(db_path) as conn:
            version = conn.execute("PRAGMA user_version").fetchone()[0]
        assert version == 1
