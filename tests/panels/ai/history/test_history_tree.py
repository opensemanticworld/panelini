"""Tests for panelini.panels.ai.history.tree."""

from __future__ import annotations

from typing import Any

import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.tree import HistoryTree, folder_key, folder_of, placement, placement_key

pytestmark = pytest.mark.ai

USER = "alice"

ROOT = ""  # the folder part of a key for a chat filed nowhere


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


def _drop(tree: HistoryTree, key: str, target_key: str, instruction: str = "make-child", copy: bool = False) -> None:
    """Replay a drop the way the browser reports one, veto included."""
    tree.tree.handle_event(
        "move",
        {"key": key, "keys": [key], "targetKey": target_key, "instruction": instruction, "copy": copy},
    )


def _reparent(tree: HistoryTree, key: str, anchor_key: str, position: str) -> None:
    """Replay what Alt+Arrow reports: outdent is ``after`` the parent row,
    indent is ``child`` of the row above."""
    tree.tree.handle_event("move", {"key": key, "keys": [key], "anchorKey": anchor_key, "position": position})


class TestKeys:
    def test_a_placement_key_round_trips(self) -> None:
        assert placement(placement_key("c1", "f1")) == ("c1", "f1")

    def test_a_chat_filed_nowhere_keys_on_the_root(self) -> None:
        assert placement(placement_key("c1", None)) == ("c1", None)

    def test_a_folder_row_is_not_a_placement(self) -> None:
        assert placement(folder_key("f1")) is None
        assert folder_of(folder_key("f1")) == "f1"
        assert folder_of(placement_key("c1", "f1")) is None


class TestSourceMapping:
    def test_folders_hold_their_conversations(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        inside = store.create_conversation(USER, title="inside", folder_ids=[folder.id])
        root = store.create_conversation(USER, title="root")

        source = _source(tree_under_test)

        folder_node = next(n for n in source if n["key"] == folder_key(folder.id))
        assert [c["key"] for c in folder_node["children"]] == [placement_key(inside.id, folder.id)]
        assert folder_key(folder.id) in tree_under_test.tree.expanded_keys
        assert any(n["key"] == placement_key(root.id, None) for n in source)

    def test_a_chat_in_two_folders_is_two_rows(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        """One row per filing is the whole point of the composite key."""
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, title="both", folder_ids=[work.id, reading.id])

        source = _source(tree_under_test)

        by_key = {n["key"]: n for n in source}
        assert [c["key"] for c in by_key[folder_key(work.id)]["children"]] == [placement_key(conv.id, work.id)]
        assert [c["key"] for c in by_key[folder_key(reading.id)]["children"]] == [placement_key(conv.id, reading.id)]

    def test_nested_folders_render_recursively(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        conv = store.create_conversation(USER, folder_ids=[child.id])

        source = _source(tree_under_test)

        parent_node = next(n for n in source if n["key"] == folder_key(parent.id))
        child_node = parent_node["children"][0]
        assert child_node["key"] == folder_key(child.id)
        assert [c["key"] for c in child_node["children"]] == [placement_key(conv.id, child.id)]

    def test_empty_store_yields_empty_source(self, tree_under_test: HistoryTree) -> None:
        assert _source(tree_under_test) == []

    def test_rows_carry_their_type_rather_than_an_icon_each(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, title="chat")

        source = {n["key"]: n for n in _source(tree_under_test)}

        assert source[folder_key(folder.id)]["type"] == "folder"
        assert source[placement_key(conv.id, None)]["type"] == "conv"


class TestEvents:
    def test_activate_opens_conversation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER)
        tree_under_test._on_tree_event("activate", {"key": placement_key(conv.id, None)})
        assert callbacks.opened == [conv.id]

    def test_activate_on_folder_is_ignored(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        tree_under_test._on_tree_event("activate", {"key": folder_key(folder.id)})
        assert callbacks.opened == []

    def test_rename_conversation_and_folder(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        folder = store.create_folder(USER, "Projects")
        tree_under_test.refresh()

        tree_under_test.tree.handle_event("rename", {"key": placement_key(conv.id, None), "title": "Renamed chat"})
        tree_under_test.tree.handle_event("rename", {"key": folder_key(folder.id), "title": "Archive"})

        renamed = store.get_conversation(USER, conv.id)
        assert renamed is not None and renamed.title == "Renamed chat"
        assert store.list_folders(USER)[0].name == "Archive"

    def test_rename_to_blank_is_ignored(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="kept")
        tree_under_test._on_tree_event("rename", {"key": placement_key(conv.id, None), "title": "   "})
        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.title == "kept"


class TestDrops:
    def test_drop_into_folder_moves_the_filing(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER)
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, None), folder_key(folder.id))

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == (folder.id,)

    def test_the_panel_never_rewrites_its_own_tree(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        """The move is vetoed; what the rows show comes from the store's reply."""
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER)
        tree_under_test.refresh()

        tree_under_test.tree.handle_event(
            "move",
            {
                "key": placement_key(conv.id, None),
                "keys": [placement_key(conv.id, None)],
                "targetKey": folder_key(folder.id),
                "instruction": "make-child",
            },
        )

        # the row is under the folder because the store put it there, and it
        # carries the folder's key, which a panel-side move could not have minted
        folder_node = next(n for n in tree_under_test.tree.get_source() if n["key"] == folder_key(folder.id))
        assert [c["key"] for c in folder_node["children"]] == [placement_key(conv.id, folder.id)]

    def test_a_copy_drop_files_the_chat_in_both_folders(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id])
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, work.id), folder_key(reading.id), copy=True)

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and set(moved.folder_ids) == {work.id, reading.id}

    def test_a_plain_drop_leaves_the_folder_it_came_from(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        archive = store.create_folder(USER, "Archive")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, work.id), folder_key(archive.id))

        moved = store.get_conversation(USER, conv.id)
        # only the row that was dragged changed folder; the other filing stands
        assert moved is not None and set(moved.folder_ids) == {reading.id, archive.id}

    def test_drop_next_to_a_chat_adopts_its_folder(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        anchor = store.create_conversation(USER, folder_ids=[folder.id])
        conv = store.create_conversation(USER)
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, None), placement_key(anchor.id, folder.id), "reorder-below")

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == (folder.id,)

    def test_drop_at_the_root_takes_that_filing_out_and_keeps_the_rest(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        """A row is one filing, so moving it never touches a row left behind."""
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        loose = store.create_conversation(USER, title="loose")
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, work.id), placement_key(loose.id, None), "reorder-below")

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == (reading.id,)

    def test_drop_at_the_root_from_the_last_folder_leaves_the_chat_unfiled(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        conv = store.create_conversation(USER, folder_ids=[work.id])
        loose = store.create_conversation(USER, title="loose")
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, work.id), placement_key(loose.id, None), "reorder-below")

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == ()

    def test_folder_drop_nests_folder(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child")
        tree_under_test.refresh()

        _drop(tree_under_test, folder_key(child.id), folder_key(parent.id))

        folders = {f.id: f for f in store.list_folders(USER)}
        assert folders[child.id].parent_id == parent.id

    def test_folder_cycle_snaps_back(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        tree_under_test.refresh()

        _drop(tree_under_test, folder_key(parent.id), folder_key(child.id))

        folders = {f.id: f for f in store.list_folders(USER)}
        assert folders[parent.id].parent_id is None  # cycle refused

    def test_a_blocked_instruction_changes_nothing(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_ids=[folder.id])
        tree_under_test.refresh()

        _drop(tree_under_test, placement_key(conv.id, folder.id), folder_key(folder.id), "instruction-blocked")

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (folder.id,)


class TestOutdent:
    """Taking a chat out of a folder, which the panel's own outdent reports."""

    def test_outdent_drops_one_filing_and_keeps_the_others(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        tree_under_test.refresh()

        _reparent(tree_under_test, placement_key(conv.id, work.id), folder_key(work.id), "after")

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (reading.id,)

    def test_outdenting_the_last_filing_leaves_the_chat_at_the_root(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Work")
        conv = store.create_conversation(USER, folder_ids=[folder.id])
        tree_under_test.refresh()

        _reparent(tree_under_test, placement_key(conv.id, folder.id), folder_key(folder.id), "after")

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == ()

    def test_outdent_from_a_subfolder_lands_in_its_parent(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        outer = store.create_folder(USER, "Outer")
        inner = store.create_folder(USER, "Inner", parent_id=outer.id)
        conv = store.create_conversation(USER, folder_ids=[inner.id])
        tree_under_test.refresh()

        _reparent(tree_under_test, placement_key(conv.id, inner.id), folder_key(inner.id), "after")

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (outer.id,)

    def test_outdent_reparents_a_folder_too(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        outer = store.create_folder(USER, "Outer")
        inner = store.create_folder(USER, "Inner", parent_id=outer.id)
        tree_under_test.refresh()

        _reparent(tree_under_test, folder_key(inner.id), folder_key(outer.id), "after")

        moved = next(f for f in store.list_folders(USER) if f.id == inner.id)
        assert moved.parent_id is None

    def test_indent_files_the_chat_in_the_folder_above(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Work")
        conv = store.create_conversation(USER)
        tree_under_test.refresh()

        _reparent(tree_under_test, placement_key(conv.id, None), folder_key(folder.id), "child")

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (folder.id,)


class TestDeletion:
    """Deletes come from the row context menu and its Delete shortcut."""

    def _delete(self, tree: HistoryTree, key: str) -> None:
        tree.tree.handle_event("delete", {"key": key, "keys": [key]})

    def test_delete_conversation(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        tree_under_test.refresh()
        self._delete(tree_under_test, placement_key(conv.id, None))
        assert store.get_conversation(USER, conv.id) is None

    def test_deleting_one_row_deletes_the_chat_from_every_folder(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        """The trash is the chat; taking it out of one folder is outdent."""
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        tree_under_test.refresh()

        self._delete(tree_under_test, placement_key(conv.id, work.id))

        assert store.get_conversation(USER, conv.id) is None

    def test_delete_active_conversation_opens_most_recent_remaining(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        remaining = store.create_conversation(USER, title="remaining")
        active = store.create_conversation(USER, title="active")
        callbacks.active_id = active.id
        tree_under_test.refresh()

        self._delete(tree_under_test, placement_key(active.id, None))

        assert callbacks.opened == [remaining.id]
        assert callbacks.new_chats == 0

    def test_delete_last_active_conversation_resets_without_a_row(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        resets: list[bool] = []
        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
            on_reset=lambda: resets.append(True),
        )
        conv = store.create_conversation(USER)
        callbacks.active_id = conv.id
        tree.refresh()

        tree.tree.handle_event("delete", {"keys": [placement_key(conv.id, None)]})

        # the reset callback runs instead of materializing a new chat
        assert resets == [True]
        assert callbacks.new_chats == 0
        assert store.list_conversations(USER) == []
        assert tree._empty_hint.visible

    def test_reset_falls_back_to_new_chat_when_not_provided(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER)
        callbacks.active_id = conv.id
        tree_under_test.refresh()
        self._delete(tree_under_test, placement_key(conv.id, None))
        assert callbacks.new_chats == 1


class TestHeaderButtons:
    def test_new_chat_button(self, tree_under_test: HistoryTree, callbacks: _Callbacks) -> None:
        tree_under_test.new_chat_button.clicks += 1
        assert callbacks.new_chats == 1

    def test_new_folder_button(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        tree_under_test.new_folder_button.clicks += 1
        assert [f.name for f in store.list_folders(USER)] == ["New Folder"]

    def test_a_new_folder_opens_by_itself(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        tree_under_test.new_folder_button.clicks += 1
        folder = store.list_folders(USER)[0]
        assert folder_key(folder.id) in tree_under_test.tree.expanded_keys

    def test_a_collapsed_folder_stays_collapsed_through_a_rebuild(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Work")
        tree_under_test.refresh()
        tree_under_test.tree.expanded_keys = []

        tree_under_test.refresh()

        assert folder_key(folder.id) not in tree_under_test.tree.expanded_keys


class TestSearch:
    def test_query_filters_conversations(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        wanted = store.create_conversation(USER, title="Budget planning")
        store.create_conversation(USER, title="Holiday photos")
        tree_under_test.search_input.value_input = "budget"
        assert [n["key"] for n in tree_under_test.tree.get_source()] == [placement_key(wanted.id, None)]

    def test_folders_without_matches_are_pruned(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        keeper = store.create_folder(USER, "Work")
        store.create_folder(USER, "Empty")
        conv = store.create_conversation(USER, title="Budget planning", folder_ids=[keeper.id])
        tree_under_test.search_input.value_input = "budget"
        source = tree_under_test.tree.get_source()
        assert [n["key"] for n in source] == [folder_key(keeper.id)]
        assert [c["key"] for c in source[0]["children"]] == [placement_key(conv.id, keeper.id)]

    def test_empty_folders_stay_visible_without_a_query(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Empty")
        tree_under_test.refresh()
        assert [n["key"] for n in tree_under_test.tree.get_source()] == [folder_key(folder.id)]


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
        assert nodes[placement_key(busy.id, None)]["icon"] == "history-busy"
        assert "history-busy" in nodes[placement_key(busy.id, None)]["class"]
        assert nodes[placement_key(ready.id, None)]["icon"] == "history-ready"
        assert "history-ready" in nodes[placement_key(ready.id, None)]["class"]
        # a plain chat names no icon: its type carries one
        assert "icon" not in nodes[placement_key(plain.id, None)]

    def test_every_row_of_the_open_chat_is_marked(self, store: InMemoryHistoryStore, callbacks: _Callbacks) -> None:
        """The open chat is a class, not the selection: it can be several rows."""
        work = store.create_folder(USER, "Work")
        reading = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[work.id, reading.id])
        callbacks.active_id = conv.id
        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
        )
        tree.refresh()

        rows = [child for node in tree.tree.get_source() for child in node["children"]]
        assert [row["class"] for row in rows] == ["history-active", "history-active"]


class TestDeleteDelegation:
    def test_conversation_delete_routes_through_on_delete(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        deleted: list[str] = []
        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
            on_delete=deleted.append,
        )
        conv = store.create_conversation(USER, title="delegated")
        tree.refresh()

        tree.tree.handle_event("delete", {"keys": [placement_key(conv.id, None)]})

        # the tree does not touch the store itself; the owner deletes
        assert deleted == [conv.id]
        assert store.get_conversation(USER, conv.id) is not None


class TestFolderDeletion:
    def _delete(self, tree: HistoryTree, folder_id: str) -> None:
        tree.tree.handle_event("delete", {"keys": [folder_key(folder_id)]})

    def test_empty_folder_deletes_without_confirmation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Empty")
        tree_under_test.refresh()
        self._delete(tree_under_test, folder.id)
        assert store.list_folders(USER) == []

    def test_a_folder_whose_chats_live_elsewhere_too_needs_no_confirmation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        """Nothing is lost, so nothing is asked."""
        folder = store.create_folder(USER, "Work")
        keeper = store.create_folder(USER, "Reading")
        conv = store.create_conversation(USER, folder_ids=[folder.id, keeper.id])
        tree_under_test.refresh()

        self._delete(tree_under_test, folder.id)

        assert [f.id for f in store.list_folders(USER)] == [keeper.id]
        survivor = store.get_conversation(USER, conv.id)
        assert survivor is not None and survivor.folder_ids == (keeper.id,)

    def test_non_empty_folder_arms_then_deletes_subtree(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        child = store.create_folder(USER, "Sub", parent_id=folder.id)
        inside = store.create_conversation(USER, title="inside", folder_ids=[folder.id])
        nested = store.create_conversation(USER, title="nested", folder_ids=[child.id])
        outside = store.create_conversation(USER, title="outside")
        tree_under_test.refresh()

        self._delete(tree_under_test, folder.id)

        # first Delete arms: nothing removed yet, the row is marked and the
        # hint counts what a second one would take
        assert store.get_conversation(USER, inside.id) is not None
        armed = next(n for n in tree_under_test.tree.get_source() if n["key"] == folder_key(folder.id))
        assert armed["class"] == "history-delete-armed"
        assert "2 chats" in str(tree_under_test._confirm_hint.object)
        assert tree_under_test._confirm_hint.visible

        self._delete(tree_under_test, folder.id)

        # second Delete removes the folder, its subfolder, and the chats in it
        assert store.list_folders(USER) == []
        assert store.get_conversation(USER, inside.id) is None
        assert store.get_conversation(USER, nested.id) is None
        assert store.get_conversation(USER, outside.id) is not None
        assert not tree_under_test._confirm_hint.visible

    def test_a_chat_kept_elsewhere_survives_the_subtree_delete(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        keeper = store.create_folder(USER, "Reading")
        doomed = store.create_conversation(USER, title="doomed", folder_ids=[folder.id])
        shared = store.create_conversation(USER, title="shared", folder_ids=[folder.id, keeper.id])
        tree_under_test.refresh()

        self._delete(tree_under_test, folder.id)
        self._delete(tree_under_test, folder.id)

        assert store.get_conversation(USER, doomed.id) is None
        survivor = store.get_conversation(USER, shared.id)
        assert survivor is not None and survivor.folder_ids == (keeper.id,)

    def test_another_action_disarms_the_pending_folder_delete(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        store.create_conversation(USER, folder_ids=[folder.id])
        tree_under_test.refresh()

        self._delete(tree_under_test, folder.id)
        assert tree_under_test._pending_folder_delete == folder.id

        tree_under_test.new_folder_button.clicks += 1
        assert tree_under_test._pending_folder_delete is None

    def test_cancel_leaves_the_armed_folder_alone(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        """The way out: no key event reaches Python, so it has to be a button."""
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_ids=[folder.id])
        tree_under_test.refresh()

        self._delete(tree_under_test, folder.id)
        assert tree_under_test.cancel_delete_button.visible

        tree_under_test.cancel_delete_button.clicks += 1

        assert tree_under_test._pending_folder_delete is None
        assert not tree_under_test._confirm_hint.visible
        assert not tree_under_test.cancel_delete_button.visible
        assert [f.id for f in store.list_folders(USER)] == [folder.id]
        assert store.get_conversation(USER, conv.id) is not None
        # the row is no longer marked, so a later Delete arms afresh
        row = next(n for n in tree_under_test.tree.get_source() if n["key"] == folder_key(folder.id))
        assert "class" not in row

        self._delete(tree_under_test, folder.id)
        assert [f.id for f in store.list_folders(USER)] == [folder.id]

    def test_subtree_chats_route_through_on_delete_at_root(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        deleted: list[str] = []

        def owner_delete(conversation_id: str) -> None:
            deleted.append(conversation_id)
            store.delete_conversation(USER, conversation_id)

        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
            on_delete=owner_delete,
        )
        folder = store.create_folder(USER, "Projects")
        inside = store.create_conversation(USER, title="inside", folder_ids=[folder.id])
        tree.refresh()

        tree.tree.handle_event("delete", {"keys": [folder_key(folder.id)]})
        tree.tree.handle_event("delete", {"keys": [folder_key(folder.id)]})

        assert deleted == [inside.id]
        # moved to the root before deletion, so an undo restores it there
        assert store.list_folders(USER) == []


class TestEmptyState:
    def test_hint_shows_until_the_first_conversation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        tree_under_test.refresh()
        assert tree_under_test._empty_hint.visible
        assert not tree_under_test.tree.visible

        store.create_conversation(USER, title="first")
        tree_under_test.refresh()
        assert not tree_under_test._empty_hint.visible
        assert tree_under_test.tree.visible

    def test_hint_says_no_matches_while_searching(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        from types import SimpleNamespace

        store.create_conversation(USER, title="alpha")
        tree_under_test._handle_search(SimpleNamespace(new="zzz"))
        assert tree_under_test._empty_hint.visible
        assert "No matches" in str(tree_under_test._empty_hint.object)


class TestReadyIndicator:
    def test_ready_check_clears_when_the_row_is_opened(
        self, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        """Opening a ready chat refreshes the tree so the green check drops."""
        ready: set[str] = set()

        def open_and_clear(cid: str) -> None:
            ready.discard(cid)  # AiChat clears the flag when opening
            callbacks.on_open(cid)

        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=open_and_clear,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
            get_ready_ids=lambda: ready,
        )
        conv = store.create_conversation(USER, title="finished")
        ready.add(conv.id)
        tree.refresh()
        node = next(n for n in tree.tree.get_source() if n["key"] == placement_key(conv.id, None))
        assert node["icon"] == "history-ready"

        tree._on_tree_event("activate", {"key": placement_key(conv.id, None)})

        node = next(n for n in tree.tree.get_source() if n["key"] == placement_key(conv.id, None))
        assert "icon" not in node  # check gone immediately
