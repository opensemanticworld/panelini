"""Tests for panelini.panels.ai.history.tree."""

from __future__ import annotations

from typing import Any

import pytest

from panelini.panels.ai.history import InMemoryHistoryStore
from panelini.panels.ai.history.document import KIND_FOLDER
from panelini.panels.ai.history.tree import HistoryTree, conv_key

pytestmark = pytest.mark.ai

USER = "alice"


class _Callbacks:
    def __init__(self) -> None:
        self.opened: list[str] = []
        self.new_chats = 0
        self.active_id: str | None = None
        self.forked: list[str] = []

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
        inside = store.create_conversation(USER, title="inside", folder_ids=[folder.id])
        root = store.create_conversation(USER, title="root")

        source = _source(tree_under_test)

        folder_node = next(n for n in source if n["key"] == f"folder:{folder.id}")
        assert [c["key"] for c in folder_node["children"]] == [conv_key(inside.id, folder.id)]
        assert folder_node["expanded"]
        assert any(n["key"] == conv_key(root.id) for n in source)

    def test_nested_folders_render_recursively(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        parent = store.create_folder(USER, "Parent")
        child = store.create_folder(USER, "Child", parent_id=parent.id)
        conv = store.create_conversation(USER, folder_ids=[child.id])

        source = _source(tree_under_test)

        parent_node = next(n for n in source if n["key"] == f"folder:{parent.id}")
        child_node = parent_node["children"][0]
        assert child_node["key"] == f"folder:{child.id}"
        assert [c["key"] for c in child_node["children"]] == [conv_key(conv.id, child.id)]

    def test_multi_folder_chat_renders_once_per_folder(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        conv = store.create_conversation(USER, title="shared", folder_ids=[work.id, ideas.id])

        source = _source(tree_under_test)

        nodes = {n["key"]: n for n in source}
        # one row per folder, each with its own key, and none at the root
        assert [c["key"] for c in nodes[f"folder:{work.id}"]["children"]] == [conv_key(conv.id, work.id)]
        assert [c["key"] for c in nodes[f"folder:{ideas.id}"]["children"]] == [conv_key(conv.id, ideas.id)]
        assert conv_key(conv.id) not in nodes

    def test_membership_in_a_deleted_folder_falls_back_to_the_root(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, title="orphan", folder_ids=[folder.id])
        # the folder vanishes behind the store's back (another session)
        store._delete(USER, KIND_FOLDER, folder.id)

        source = _source(tree_under_test)

        assert [n["key"] for n in source] == [conv_key(conv.id)]

    def test_active_marker_lands_on_a_placement_row(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, title="filed", folder_ids=[folder.id])
        callbacks.active_id = conv.id

        tree_under_test.refresh()

        action = tree_under_test.tree._tree_action
        assert action["action"] == "setActiveNode"
        assert action["payload"] == {"key": conv_key(conv.id, folder.id)}

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
                "sourceKey": conv_key(conv.id),
                "targetKey": f"folder:{folder.id}",
                "region": "appendChild",
                "movedNodeId": conv_key(conv.id),
                "newParentNodeId": f"folder:{folder.id}",
            },
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == (folder.id,)

    def test_drop_moves_only_the_dragged_placement(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        archive = store.create_folder(USER, "Archive")
        conv = store.create_conversation(USER, folder_ids=[work.id, ideas.id])

        tree_under_test._on_tree_event(
            "drop", {"sourceKey": conv_key(conv.id, work.id), "newParentNodeId": f"folder:{archive.id}"}
        )

        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and set(moved.folder_ids) == {ideas.id, archive.id}

    def test_copy_drop_files_the_chat_under_the_target_as_well(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        conv = store.create_conversation(USER, folder_ids=[work.id])

        tree_under_test._on_tree_event(
            "drop",
            {"sourceKey": conv_key(conv.id, work.id), "newParentNodeId": f"folder:{ideas.id}", "copy": True},
        )

        linked = store.get_conversation(USER, conv.id)
        assert linked is not None and set(linked.folder_ids) == {work.id, ideas.id}

    def test_copy_drop_at_the_root_changes_nothing(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_ids=[folder.id])

        tree_under_test._on_tree_event(
            "drop", {"sourceKey": conv_key(conv.id, folder.id), "newParentNodeId": None, "copy": True}
        )

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (folder.id,)

    def test_drop_next_to_conversation_adopts_its_folder(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        anchor = store.create_conversation(USER, folder_ids=[folder.id])
        conv = store.create_conversation(USER)
        # defensive fallback: some drops report the sibling as the new parent
        anchor_key = conv_key(anchor.id, folder.id)
        tree_under_test._on_tree_event(
            "drop", {"sourceKey": conv_key(conv.id), "targetKey": anchor_key, "newParentNodeId": anchor_key}
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == (folder.id,)

    def test_drop_without_parent_lands_at_root(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, folder_ids=[folder.id])
        tree_under_test._on_tree_event(
            "drop",
            {
                "sourceKey": conv_key(conv.id, folder.id),
                "targetKey": f"folder:{folder.id}",
                "newParentNodeId": None,
            },
        )
        moved = store.get_conversation(USER, conv.id)
        assert moved is not None and moved.folder_ids == ()

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


class TestDeletion:
    """Deletes go through the hover trash icon (there is no context menu)."""

    def _delete(self, tree: HistoryTree, key: str) -> None:
        tree._on_tree_event("click", {"key": key, "action": "delete"})

    def test_delete_conversation(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER)
        self._delete(tree_under_test, f"conv:{conv.id}")
        assert store.get_conversation(USER, conv.id) is None

    def test_delete_active_conversation_opens_most_recent_remaining(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        remaining = store.create_conversation(USER, title="remaining")
        active = store.create_conversation(USER, title="active")
        callbacks.active_id = active.id
        self._delete(tree_under_test, f"conv:{active.id}")
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
        tree._on_tree_event("click", {"key": f"conv:{conv.id}", "action": "delete"})
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
        self._delete(tree_under_test, f"conv:{conv.id}")
        assert callbacks.new_chats == 1


class TestHeaderButtons:
    def test_new_chat_button(self, tree_under_test: HistoryTree, callbacks: _Callbacks) -> None:
        tree_under_test.new_chat_button.clicks += 1
        assert callbacks.new_chats == 1

    def test_new_folder_button(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        tree_under_test.new_folder_button.clicks += 1
        assert [f.name for f in store.list_folders(USER)] == ["New Folder"]


class TestSearch:
    def test_query_filters_conversations(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        wanted = store.create_conversation(USER, title="Budget planning")
        store.create_conversation(USER, title="Holiday photos")
        tree_under_test.search_input.value_input = "budget"
        assert [n["key"] for n in tree_under_test.tree.get_source()] == [f"conv:{wanted.id}"]

    def test_folders_without_matches_are_pruned(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        keeper = store.create_folder(USER, "Work")
        store.create_folder(USER, "Empty")
        conv = store.create_conversation(USER, title="Budget planning", folder_ids=[keeper.id])
        tree_under_test.search_input.value_input = "budget"
        source = tree_under_test.tree.get_source()
        assert [n["key"] for n in source] == [f"folder:{keeper.id}"]
        assert [c["key"] for c in source[0]["children"]] == [conv_key(conv.id, keeper.id)]

    def test_empty_folders_stay_visible_without_a_query(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Empty")
        tree_under_test.refresh()
        assert [n["key"] for n in tree_under_test.tree.get_source()] == [f"folder:{folder.id}"]


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
        assert nodes[f"conv:{plain.id}"]["icon"] == "history-icon-chat"


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

        tree._on_tree_event("click", {"key": f"conv:{conv.id}", "action": "delete"})

        # the tree does not touch the store itself; the owner deletes
        assert deleted == [conv.id]
        assert store.get_conversation(USER, conv.id) is not None


class TestFolderDeletion:
    def test_empty_folder_deletes_without_confirmation(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Empty")
        tree_under_test._on_tree_event("click", {"key": f"folder:{folder.id}", "action": "delete"})
        assert store.list_folders(USER) == []

    def test_non_empty_folder_arms_then_deletes_subtree(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        child = store.create_folder(USER, "Sub", parent_id=folder.id)
        inside = store.create_conversation(USER, title="inside", folder_ids=[folder.id])
        nested = store.create_conversation(USER, title="nested", folder_ids=[child.id])
        outside = store.create_conversation(USER, title="outside")

        key = f"folder:{folder.id}"
        tree_under_test._on_tree_event("click", {"key": key, "action": "delete"})

        # first click arms: nothing deleted yet, node marked, tooltip counts
        assert store.get_conversation(USER, inside.id) is not None
        armed = next(n for n in tree_under_test.tree.get_source() if n["key"] == key)
        assert armed["classes"] == "history-delete-armed"
        assert "2 chats" in armed["actions"][1]["tooltip"]

        tree_under_test._on_tree_event("click", {"key": key, "action": "delete"})

        # second click deletes the folder, its subfolder, and the chats in it
        assert store.list_folders(USER) == []
        assert store.get_conversation(USER, inside.id) is None
        assert store.get_conversation(USER, nested.id) is None
        assert store.get_conversation(USER, outside.id) is not None

    def test_other_action_disarms_the_pending_folder_delete(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        store.create_conversation(USER, folder_ids=[folder.id])
        other = store.create_conversation(USER, title="other")

        tree_under_test._on_tree_event("click", {"key": f"folder:{folder.id}", "action": "delete"})
        assert tree_under_test._pending_folder_delete == folder.id

        tree_under_test._on_tree_event("click", {"key": f"conv:{other.id}", "action": "rename"})
        assert tree_under_test._pending_folder_delete is None

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

        key = f"folder:{folder.id}"
        tree._on_tree_event("click", {"key": key, "action": "delete"})
        tree._on_tree_event("click", {"key": key, "action": "delete"})

        assert deleted == [inside.id]
        # moved to the root before deletion, so an undo restores it there
        assert store.list_folders(USER) == []

    def test_chats_filed_elsewhere_survive_the_folder_delete(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        doomed = store.create_folder(USER, "Doomed")
        keeper = store.create_folder(USER, "Keeper")
        shared = store.create_conversation(USER, title="shared", folder_ids=[doomed.id, keeper.id])
        only_here = store.create_conversation(USER, title="only here", folder_ids=[doomed.id])

        key = f"folder:{doomed.id}"
        tree_under_test._on_tree_event("click", {"key": key, "action": "delete"})

        # only the exclusive chat is counted as lost
        armed = next(n for n in tree_under_test.tree.get_source() if n["key"] == key)
        assert "1 chat" in armed["actions"][1]["tooltip"]

        tree_under_test._on_tree_event("click", {"key": key, "action": "delete"})

        survivor = store.get_conversation(USER, shared.id)
        assert survivor is not None and survivor.folder_ids == (keeper.id,)
        assert store.get_conversation(USER, only_here.id) is None


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


class TestRowActions:
    def test_nodes_carry_the_hover_actions(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, title="chat")

        source = _source(tree_under_test)

        conv_node = next(n for n in source if n["key"] == conv_key(conv.id))
        folder_node = next(n for n in source if n["key"] == f"folder:{folder.id}")
        assert [a["action"] for a in conv_node["actions"]] == ["rename", "fork", "delete"]
        assert [a["action"] for a in folder_node["actions"]] == ["rename", "delete"]

    def test_unlink_only_on_a_chat_filed_more_than_once(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        shared = store.create_conversation(USER, title="shared", folder_ids=[work.id, ideas.id])
        alone = store.create_conversation(USER, title="alone", folder_ids=[work.id])

        source = _source(tree_under_test)

        rows = {n["key"]: n for n in next(f for f in source if f["key"] == f"folder:{work.id}")["children"]}
        assert "unlink" in [a["action"] for a in rows[conv_key(shared.id, work.id)]["actions"]]
        # unlinking the last membership would only hide the row, so no icon
        assert "unlink" not in [a["action"] for a in rows[conv_key(alone.id, work.id)]["actions"]]

    def test_trash_click_deletes(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="via icon")

        tree_under_test._on_tree_event("click", {"key": f"conv:{conv.id}", "action": "delete"})

        assert store.get_conversation(USER, conv.id) is None

    def test_pencil_click_starts_inline_edit(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="rename me")

        tree_under_test._on_tree_event("click", {"key": f"conv:{conv.id}", "action": "rename"})

        action = tree_under_test.tree._tree_action
        assert action["action"] == "startEditTitle"
        assert action["payload"] == {"key": f"conv:{conv.id}"}

    def test_plain_click_is_not_an_action(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="stay")
        tree_under_test._on_tree_event("click", {"key": f"conv:{conv.id}", "region": "title"})
        assert store.get_conversation(USER, conv.id) is not None


class TestUnlinkAction:
    def test_unlink_drops_only_the_clicked_row(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        work = store.create_folder(USER, "Work")
        ideas = store.create_folder(USER, "Ideas")
        conv = store.create_conversation(USER, title="shared", folder_ids=[work.id, ideas.id])

        tree_under_test._on_tree_event("click", {"key": conv_key(conv.id, work.id), "action": "unlink"})

        kept = store.get_conversation(USER, conv.id)
        assert kept is not None and kept.folder_ids == (ideas.id,)

    def test_unlink_at_the_root_is_a_no_op(self, tree_under_test: HistoryTree, store: InMemoryHistoryStore) -> None:
        conv = store.create_conversation(USER, title="root chat")

        tree_under_test._on_tree_event("click", {"key": conv_key(conv.id), "action": "unlink"})

        assert store.get_conversation(USER, conv.id) is not None


class TestForkAction:
    def test_fork_copies_the_chat_and_opens_it(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore, callbacks: _Callbacks
    ) -> None:
        conv = store.create_conversation(USER, title="original")
        store.append_message(USER, conv.id, "human", "hello")

        tree_under_test._on_tree_event("click", {"key": conv_key(conv.id), "action": "fork"})

        fork = next(c for c in store.list_conversations(USER) if c.id != conv.id)
        assert fork.parent_id == conv.id
        assert [m.content for m in store.load_messages(USER, fork.id)] == ["hello"]
        assert callbacks.opened == [fork.id]

    def test_fork_routes_through_on_fork_when_wired(self, store: InMemoryHistoryStore, callbacks: _Callbacks) -> None:
        tree = HistoryTree(
            store=store,
            user_id=USER,
            on_open=callbacks.on_open,
            on_new_chat=callbacks.on_new_chat,
            get_active_id=lambda: callbacks.active_id,
            on_fork=callbacks.forked.append,
        )
        conv = store.create_conversation(USER, title="original")

        tree._on_tree_event("click", {"key": conv_key(conv.id), "action": "fork"})

        # the tree does not touch the store itself; the owner forks
        assert callbacks.forked == [conv.id]
        assert len(store.list_conversations(USER)) == 1

    def test_fork_of_a_filed_chat_keeps_its_folders(
        self, tree_under_test: HistoryTree, store: InMemoryHistoryStore
    ) -> None:
        folder = store.create_folder(USER, "Projects")
        conv = store.create_conversation(USER, title="filed", folder_ids=[folder.id])

        tree_under_test._on_tree_event("click", {"key": conv_key(conv.id, folder.id), "action": "fork"})

        fork = next(c for c in store.list_conversations(USER) if c.id != conv.id)
        assert fork.folder_ids == (folder.id,)


class TestReadyIndicator:
    def test_ready_check_clears_when_the_node_is_opened(
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
        node = next(n for n in tree.tree.get_source() if n["key"] == f"conv:{conv.id}")
        assert node["icon"] == "bi bi-check-circle-fill"

        tree._on_tree_event("activate", {"key": f"conv:{conv.id}"})

        node = next(n for n in tree.tree.get_source() if n["key"] == f"conv:{conv.id}")
        assert node["icon"] == "history-icon-chat"  # check gone immediately
