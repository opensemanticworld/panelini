"""Tests for panelini.panels.ai.history.tree."""

from __future__ import annotations

from typing import Any

import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.tree import HistoryTree

pytestmark = pytest.mark.ai

USER = "alice"


class _Callbacks:
    def __init__(self) -> None:
        self.opened: list[str] = []
        self.new_chats = 0
        self.active_id: str | None = None

    def on_open(self, conversation_id: str) -> None:
        self.opened.append(conversation_id)
        self.active_id = conversation_id

    def on_new_chat(self) -> None:
        self.new_chats += 1
        self.active_id = None


@pytest.fixture()
def store() -> InMemoryHistoryStore:
    return InMemoryHistoryStore()


@pytest.fixture()
def callbacks() -> _Callbacks:
    return _Callbacks()


@pytest.fixture()
def tree_under_test(store: InMemoryHistoryStore, callbacks: _Callbacks) -> HistoryTree:
    return HistoryTree(
        store=store,
        user_id=USER,
        on_open=callbacks.on_open,
        on_new_chat=callbacks.on_new_chat,
        get_active_id=lambda: callbacks.active_id,
    )


def _source(tree: HistoryTree) -> list[dict[str, Any]]:
    tree.refresh()
    return tree.tree.get_source()


class TestSourceMapping:
    def test_folders_hold_their_conversations(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        inside = store.create_conversation(USER, title="inside", folder_id=folder.id)
        root = store.create_conversation(USER, title="root")

        source = _source(tree_under_test)

        folder_node = next(n for n in source if n["key"] == f"folder:{folder.id}")
        assert [c["key"] for c in folder_node["children"]] == [f"conv:{inside.id}"]
        assert folder_node["expanded"]
        assert any(n["key"] == f"conv:{root.id}" for n in source)

    def test_nested_folders_render_recursively(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        conv = store.create_conversation(USER, folder_id=child.id)

        source = _source(tree_under_test)

        parent_node = next(n for n in source if n["key"] == f"folder:{parent.id}")
        child_node = parent_node["children"][0]
        assert child_node["key"] == f"folder:{child.id}"
        assert [c["key"] for c in child_node["children"]] == [f"conv:{conv.id}"]

    def test_empty_store_yields_empty_source(self, tree_under_test: HistoryTree) -> None:
        assert _source(tree_under_test) == []


class TestEvents:
    def test_activate_opens_conversation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER)
        tree_under_test._on_tree_event("activate", {"key": f"conv:{conv.id}"})
        assert callbacks.opened == [conv.id]

    def test_activate_on_folder_is_ignored(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        tree_under_test._on_tree_event("activate", {"key": f"folder:{folder.id}"})
        assert callbacks.opened == []

    def test_drop_into_folder_moves_conversation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER)
        tree_under_test._on_tree_event(
            "drop",
            {
                "sourceKey": f"conv:{conv.id}",
                "targetKey": f"folder:{folder.id}",
                "region": "appendChild",
                "movedNodeId": f"conv:{conv.id}",
                "newParentNodeId": f"folder:{folder.id}",
            },
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_id == folder.id

    def test_drop_next_to_conversation_adopts_its_folder(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        anchor = store.create_conversation(USER, folder_id=folder.id)
        conv = store.create_conversation(USER)
        # defensive fallback: some drops report the sibling as the new parent
        tree_under_test._on_tree_event(
            "drop",
            {"sourceKey": f"conv:{conv.id}", "targetKey": f"conv:{anchor.id}", "newParentNodeId": f"conv:{anchor.id}"},
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_id == folder.id

    def test_drop_without_parent_lands_at_root(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_id=folder.id)
        tree_under_test._on_tree_event(
            "drop", {"sourceKey": f"conv:{conv.id}", "targetKey": f"folder:{folder.id}", "newParentNodeId": None}
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_id is None

    def test_folder_drop_nests_folder(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child")
        tree_under_test._on_tree_event(
            "drop", {"sourceKey": f"folder:{child.id}", "newParentNodeId": f"folder:{parent.id}"}
        )
        folders = {f.id: f for f in store.list_folders(USER)}
        assert folders[child.id].parent_id == parent.id

    def test_folder_cycle_snaps_back(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        tree_under_test._on_tree_event(
            "drop", {"sourceKey": f"folder:{parent.id}", "newParentNodeId": f"folder:{child.id}"}
        )
        folders = {f.id: f for f in store.list_folders(USER)}
        assert folders[parent.id].parent_id is None  # cycle refused

    def test_rename_conversation_and_folder(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        folder = store.create_folder(USER, "Projects")
        tree_under_test._on_tree_event("edit.apply", {"key": f"conv:{conv.id}", "newValue": "Renamed chat"})
        tree_under_test._on_tree_event("edit.apply", {"key": f"folder:{folder.id}", "newValue": "Archive"})
        renamed = store.get_conversation(USER, conv.id)
        assert renamed is not None and renamed.title == "Renamed chat"
        assert store.list_folders(USER)[0].name == "Archive"

    def test_rename_to_blank_is_ignored(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="kept")
        tree_under_test._on_tree_event("edit.apply", {"key": f"conv:{conv.id}", "newValue": "   "})
        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.title == "kept"


class TestContextMenu:
    def test_new_folder(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        tree_under_test._on_tree_event("contextmenu", {"action": "new_folder", "key": ""})
        assert [f.name for f in store.list_folders(USER)] == ["New Folder"]

    def test_new_chat(self, tree_under_test: HistoryTree, callbacks: _Callbacks) -> None:
        tree_under_test._on_tree_event("contextmenu", {"action": "new_chat", "key": ""})
        assert callbacks.new_chats == 1

    def test_delete_conversation(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        tree_under_test._on_tree_event("contextmenu", {"action": "delete", "key": f"conv:{conv.id}"})
        assert store.get_conversation(USER, conv.id) is None

    def test_delete_active_conversation_opens_most_recent_remaining(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        remaining = store.create_conversation(USER, title="remaining")
        active = store.create_conversation(USER, title="active")
        callbacks.active_id = active.id
        tree_under_test._on_tree_event("contextmenu", {"action": "delete", "key": f"conv:{active.id}"})
        assert callbacks.opened == [remaining.id]
        assert callbacks.new_chats == 0

    def test_delete_last_active_conversation_starts_new_chat(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER)
        callbacks.active_id = conv.id
        tree_under_test._on_tree_event("contextmenu", {"action": "delete", "key": f"conv:{conv.id}"})
        assert callbacks.new_chats == 1

    def test_delete_folder_moves_contents_to_root(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_id=folder.id)
        tree_under_test._on_tree_event("contextmenu", {"action": "delete", "key": f"folder:{folder.id}"})
        assert store.list_folders(USER) == []
        remaining = store.get_conversation(USER, conv.id)
        assert remaining is not None and remaining.folder_id is None

    def test_new_chat_button(self, tree_under_test: HistoryTree, callbacks: _Callbacks) -> None:
        tree_under_test.new_chat_button.clicks += 1
        assert callbacks.new_chats == 1

    def test_new_folder_button(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        tree_under_test.new_folder_button.clicks += 1
        assert [f.name for f in store.list_folders(USER)] == ["New Folder"]


class TestIndicators:
    def test_busy_and_ready_icons(self, store: InMemoryHistoryStore, callbacks: _Callbacks) -> None:
        busy = store.create_conversation(USER, title="busy")
        ready = store.create_conversation(USER, title="ready")
        plain = store.create_conversation(USER, title="plain")
        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: None,
            get_busy_ids=lambda: {busy.id},
            get_ready_ids=lambda: {ready.id},
        )
        tree.refresh()
        nodes = {n["key"]: n for n in tree.tree.get_source()}
        assert nodes[f"conv:{busy.id}"]["icon"] == "bi bi-arrow-repeat"
        assert "history-busy" in nodes[f"conv:{busy.id}"]["classes"]
        assert nodes[f"conv:{ready.id}"]["icon"] == "bi bi-check-circle-fill"
        assert "history-ready" in nodes[f"conv:{ready.id}"]["classes"]
        assert "icon" not in nodes[f"conv:{plain.id}"]
