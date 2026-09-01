"""Behavior suite for panelini.panels.ai.history stores.

Runs identically against the in-memory, SQLite, and localStorage backends;
all must honor the same tenant-safety and lifecycle semantics.
"""

from __future__ import annotations

import builtins
import importlib
import json
import sqlite3
import sys
import time
from collections.abc import Iterator
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import pytest

from panelini.panels.ai.history import (
    DEFAULT_TITLE,
    ChatHistoryStore,
    InMemoryHistoryStore,
    LocalStorageHistoryStore,
    SqliteHistoryStore,
    derive_title,
)

pytestmark = pytest.mark.ai

USER = "alice"
OTHER = "bob"


@pytest.fixture(params=["memory", "sqlite", "localstorage"])
def store(request: pytest.FixtureRequest, tmp_path: Path) -> Iterator[ChatHistoryStore]:
    if request.param == "memory":
        backend: ChatHistoryStore = InMemoryHistoryStore()
    elif request.param == "localstorage":
        # headless (pane unrendered): pure in-memory semantics
        backend = LocalStorageHistoryStore()
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


# ── search ────────────────────────────────────────────────────────────────


class TestSearch:
    def test_matches_title_case_insensitively(self, store: ChatHistoryStore) -> None:
        wanted = store.create_conversation(USER, title="Budget planning")
        store.create_conversation(USER, title="Holiday photos")
        assert [c.id for c in store.search_conversations(USER, "BUDGET")] == [wanted.id]

    def test_matches_message_content(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER, title="Untitled")
        store.append_message(USER, conv.id, "human", "How do I deploy to staging?")
        store.create_conversation(USER, title="Unrelated")
        assert [c.id for c in store.search_conversations(USER, "staging")] == [conv.id]

    def test_blank_query_lists_everything(self, store: ChatHistoryStore) -> None:
        store.create_conversation(USER, title="one")
        store.create_conversation(USER, title="two")
        assert len(store.search_conversations(USER, "   ")) == 2

    def test_wildcards_are_literal(self, store: ChatHistoryStore) -> None:
        literal = store.create_conversation(USER, title="100% coverage")
        store.create_conversation(USER, title="no percent here")
        assert [c.id for c in store.search_conversations(USER, "100%")] == [literal.id]
        assert store.search_conversations(USER, "%") == [literal]

    def test_archived_excluded_unless_requested(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(USER, title="Budget planning")
        store.set_archived(USER, conv.id, True)
        assert store.search_conversations(USER, "budget") == []
        assert [c.id for c in store.search_conversations(USER, "budget", include_archived=True)] == [conv.id]

    def test_scoped_to_the_owner(self, store: ChatHistoryStore) -> None:
        conv = store.create_conversation(OTHER, title="their budget")
        store.append_message(OTHER, conv.id, "human", "their secret")
        assert store.search_conversations(USER, "budget") == []
        assert store.search_conversations(USER, "secret") == []

    def test_most_recently_updated_first(self, store: ChatHistoryStore) -> None:
        older = store.create_conversation(USER, title="budget older")
        time.sleep(0.01)
        newer = store.create_conversation(USER, title="budget newer")
        store.append_message(USER, older.id, "human", "bump")
        assert [c.id for c in store.search_conversations(USER, "budget")] == [older.id, newer.id]


# ── derived titles ────────────────────────────────────────────────────────


class TestDeriveTitle:
    def test_short_message_is_used_verbatim(self) -> None:
        assert derive_title("Plot the sales data") == "Plot the sales data"

    def test_whitespace_is_collapsed(self) -> None:
        assert derive_title("  two\n\nlines  ") == "two lines"

    def test_long_message_is_cut_at_a_word(self) -> None:
        title = derive_title("Summarize the quarterly revenue report for the northern region")
        assert title.endswith("…")
        assert len(title) <= 49
        assert not title.rstrip("…").endswith(" ")
        assert title.startswith("Summarize the quarterly revenue report")

    def test_unbroken_message_is_cut_hard(self) -> None:
        assert derive_title("x" * 100) == "x" * 48 + "…"

    def test_blank_message_keeps_the_default(self) -> None:
        assert derive_title("   ") == DEFAULT_TITLE


# ── sqlite specifics ──────────────────────────────────────────────────────


class TestSqliteSpecifics:
    def test_delete_removes_the_document_row(self, tmp_path: Path) -> None:
        """The documents table itself must be emptied, not just the API view."""
        db_path = tmp_path / "history.sqlite3"
        backend = SqliteHistoryStore(db_path)
        conv = backend.create_conversation(USER)
        backend.append_message(USER, conv.id, "human", "hello")
        backend.delete_conversation(USER, conv.id)
        with sqlite3.connect(db_path) as conn:
            count = conn.execute("SELECT COUNT(*) FROM documents").fetchone()[0]
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
        assert version == 2

    def test_body_is_the_schema_document(self, tmp_path: Path) -> None:
        """The stored body is the v2 conversation document, verbatim."""
        db_path = tmp_path / "history.sqlite3"
        backend = SqliteHistoryStore(db_path)
        conv = backend.create_conversation(USER, title="doc shape")
        backend.append_message(USER, conv.id, "human", "hello")
        with sqlite3.connect(db_path) as conn:
            body = conn.execute("SELECT body FROM documents WHERE id = ?", (conv.id,)).fetchone()[0]
        document = json.loads(body)
        assert document["schema_version"] == 2
        assert document["type"] == "Conversation"
        assert document["title"] == "doc shape"
        assert [m["content"] for m in document["messages"]] == ["hello"]


# ── localStorage specifics ────────────────────────────────────────────────


class TestLocalStorageSpecifics:
    def test_writes_mirror_into_the_pane(self) -> None:
        """Every mutation lands in pane.entries, one entry per document."""
        backend = LocalStorageHistoryStore()
        conv = backend.create_conversation(USER, title="mirrored")
        backend.append_message(USER, conv.id, "human", "hello")
        entry = backend.pane.entries[f"conversation:{conv.id}"]
        assert entry["title"] == "mirrored"
        assert [m["content"] for m in entry["messages"]] == ["hello"]

        backend.delete_conversation(USER, conv.id)
        assert backend.pane.entries == {}

    def test_browser_hydration_merges_and_notifies(self) -> None:
        """Entries arriving from the browser fill the mirror; mirror wins."""
        # a donor store produces a valid stored document
        donor = LocalStorageHistoryStore()
        old = donor.create_conversation(USER, title="from the browser")
        donor.append_message(USER, old.id, "human", "restored question")

        backend = LocalStorageHistoryStore()
        fresh = backend.create_conversation(USER, title="pre-hydration")
        loaded: list[bool] = []
        backend.on_loaded = lambda: loaded.append(True)

        # simulate the pane's render script: data arrives, then loaded flips
        backend.pane.entries = {
            **donor.pane.entries,
            f"conversation:{fresh.id}": {"stale": "must not overwrite the mirror"},
        }
        backend.pane.loaded = True

        titles = {c.title for c in backend.list_conversations(USER)}
        assert titles == {"from the browser", "pre-hydration"}
        assert [m.content for m in backend.load_messages(USER, old.id)] == ["restored question"]
        assert loaded == [True]

        # a second loaded event must not re-merge
        backend.pane.loaded = False
        backend.pane.loaded = True
        assert loaded == [True]


# ── restore (delete undo) ─────────────────────────────────────────────────


class TestRestoreConversation:
    def test_restore_reinstates_a_deleted_conversation(self, store: ChatHistoryStore) -> None:
        from panelini.panels.ai.history.document import DocumentHistoryStore, conversation_to_document

        assert isinstance(store, DocumentHistoryStore)
        conv = store.create_conversation(USER, title="come back")
        store.append_message(USER, conv.id, "human", "hi")
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        document = conversation_to_document(record, store.load_messages(USER, conv.id))

        store.delete_conversation(USER, conv.id)
        store.restore_conversation(USER, document)

        assert store.get_conversation(USER, conv.id) == record
        assert [m.content for m in store.load_messages(USER, conv.id)] == ["hi"]

    def test_restore_assigns_the_restoring_owner(self, store: ChatHistoryStore) -> None:
        from panelini.panels.ai.history.document import DocumentHistoryStore, conversation_to_document

        assert isinstance(store, DocumentHistoryStore)
        conv = store.create_conversation(USER, title="mine")
        record = store.get_conversation(USER, conv.id)
        assert record is not None
        document = conversation_to_document(record, [])
        store.delete_conversation(USER, conv.id)

        store.restore_conversation(OTHER, document)

        assert store.get_conversation(USER, conv.id) is None
        adopted = store.get_conversation(OTHER, conv.id)
        assert adopted is not None and adopted.user_id == OTHER


class TestWithoutSqlite3:
    """Pyodide ships no ``sqlite3``; importing the package must not need it."""

    def test_package_imports_and_defaults_to_memory(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for name in [m for m in sys.modules if m.startswith("panelini.panels.ai.history")]:
            monkeypatch.delitem(sys.modules, name)
        monkeypatch.delitem(sys.modules, "sqlite3", raising=False)
        monkeypatch.delenv("PANELINI_HISTORY_DB", raising=False)

        real_import = builtins.__import__

        def _no_sqlite3(name: str, *args: object, **kwargs: object) -> object:
            if name == "sqlite3":
                msg = "No module named 'sqlite3'"
                raise ModuleNotFoundError(msg)
            return real_import(name, *args, **kwargs)  # ty: ignore[invalid-argument-type]

        monkeypatch.setattr(builtins, "__import__", _no_sqlite3)

        module = importlib.import_module("panelini.panels.ai.history")
        assert isinstance(module.default_history_store(), module.InMemoryHistoryStore)
