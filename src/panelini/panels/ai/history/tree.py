"""Drag-and-drop folder tree view for the AI chat history.

Wraps the Wunderbaum panel: folders as nestable ``folder:<id>`` nodes,
conversations as ``conv:<id>`` leaves. Drops persist through the store,
which stays the source of truth; every change rebuilds the tree from it.
"""

from __future__ import annotations

from collections.abc import Callable, Sequence
from typing import Any

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

from .icons import (
    CHAT_MASK,
    FOLDER_PLUS_MASK,
    NEW_CHAT_MASK,
    PENCIL_MASK,
    TRASH_MASK,
    icon_button_css,
)
from .store import ChatHistoryStore

_CONV = "conv:"
_FOLDER = "folder:"

# Hover icons on every row (rendered by the Wunderbaum wrapper from node
# data; clicks come back as click events with an `action` param). The
# classes are styled as tabler masks in _TREE_CSS, matching the list view.
_ROW_ACTIONS = [
    {"action": "rename", "icon": "history-action-rename", "tooltip": "Rename"},
    {"action": "delete", "icon": "history-action-delete", "tooltip": "Delete"},
]

# The component inlines fixed 800x500 defaults on the container; override so
# the tree hugs the sidebar width and grows with content, with a vertical
# scrollbar only when needed and never a horizontal one. Below that: the
# busy/ready node icon states.
_TREE_CSS = f"""
.wunderbaum-wrapper, .tree-container, div.wunderbaum {{
    overflow-y: auto !important;
    overflow-x: hidden !important;
}}
.tree-container {{
    width: 100% !important;
    height: auto !important;
    min-height: 120px;
    max-height: 420px;
}}
/* Rotate the glyph box itself, not the <i>: the icon font's baseline
   offset would make the whole element orbit instead of spin in place */
.history-busy i.bi-arrow-repeat::before {{
    display: inline-block;
    animation: history-spin 1s linear infinite;
}}
@keyframes history-spin {{ to {{ transform: rotate(360deg); }} }}
.history-ready i.bi-check-circle-fill {{ color: #22a06b; }}

/* Tabler glyphs (masks over currentColor), matching the list view. The
   chat glyph keeps the standard wb-icon box so the icon-to-title spacing
   matches the folder rows, and draws smaller inside it. */
i.history-icon-chat {{
    background-color: currentColor;
    opacity: 0.8;
    -webkit-mask: url("{CHAT_MASK}") center / 13px no-repeat;
    mask: url("{CHAT_MASK}") center / 13px no-repeat;
}}
i.history-action-rename, i.history-action-delete {{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: currentColor;
    opacity: 0.8;
}}
i.history-action-rename {{
    -webkit-mask: url("{PENCIL_MASK}") center / contain no-repeat;
    mask: url("{PENCIL_MASK}") center / contain no-repeat;
}}
i.history-action-delete, i.history-action-delete-armed {{
    -webkit-mask: url("{TRASH_MASK}") center / contain no-repeat;
    mask: url("{TRASH_MASK}") center / contain no-repeat;
}}
/* armed folder delete: the second click wipes the folder and its chats */
i.history-action-delete-armed {{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #d1242f;
    opacity: 1;
}}
"""

_SEARCH_CSS = """
:host { width: 100%; margin: 0; }
.bk-input {
    font-size: 0.82em; padding: 4px 26px 4px 8px; border-radius: 6px;
}
"""

_SEARCH_CLEAR_CSS = """
:host {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    margin: 0; z-index: 1;
}
.bk-btn, .bk-btn:focus {
    width: 20px; height: 20px; min-height: 0; padding: 0;
    background: transparent; border: none; border-radius: 4px;
    opacity: 0.5; cursor: pointer; transition: opacity 0.15s ease;
    display: flex; align-items: center; justify-content: center;
}
.bk-btn:hover { opacity: 1; background: rgba(120, 120, 120, 0.12); }
"""

# Same empty-state styling as the list view
_EMPTY_STATE_TEMPLATE = (
    '<div style="font-size: 0.8em; font-style: italic; opacity: 0.5;'
    ' text-align: center; margin: 12px 0 6px 0;">{message}</div>'
)


class HistoryTree:
    """Sidebar card with folders and conversations as a drag-and-drop tree.

    Rename: hover pencil icon, inline edit (click the active node) or F2.
    New chat / new folder: header buttons; delete: hover trash icon (no
    context menu), routed through the chat's shared undo/redo stack when
    ``on_delete`` is wired. Deleting a non-empty folder arms a red trash
    and the second click removes the folder, its subfolders, and every
    chat inside (chats move to the root first, so undo restores them
    there). Drops persist where the node landed. Generating chats show a
    spinner icon, finished ones a green check until opened; an empty tree
    shows a hint instead of a blank row, also after the last conversation
    is deleted.
    """

    def __init__(
        self,
        store: ChatHistoryStore,
        user_id: str,
        on_open: Callable[[str], None],
        on_new_chat: Callable[[], None],
        get_active_id: Callable[[], str | None],
        get_busy_ids: Callable[[], set[str]] | None = None,
        get_ready_ids: Callable[[], set[str]] | None = None,
        actions: Sequence[pn.viewable.Viewable] = (),
        on_reset: Callable[[], None] | None = None,
        trailing: Sequence[pn.viewable.Viewable] = (),
        on_delete: Callable[[str], None] | None = None,
    ) -> None:
        self._store = store
        self._user_id = user_id
        self._on_open = on_open
        self._on_new_chat = on_new_chat
        # after deleting the last chat: fresh feed WITHOUT materializing a row
        self._on_reset = on_reset or on_new_chat
        # conversation deletes route here when provided (shared undo/redo)
        self._on_delete = on_delete
        # non-empty folder deletes arm and ask for a second click
        self._pending_folder_delete: str | None = None
        self._get_active_id = get_active_id
        self._get_busy_ids = get_busy_ids or (lambda: set())
        self._get_ready_ids = get_ready_ids or (lambda: set())
        self._query = ""

        # The whole action row is frameless icon buttons for consistency
        self.new_chat_button = pn.widgets.Button(
            width=28,
            margin=(0, 0, 4, 2),
            align="center",
            stylesheets=[icon_button_css(NEW_CHAT_MASK)],
            css_classes=["history-new-chat"],
            description="New Chat",
        )
        self.new_chat_button.on_click(self._handle_new_chat)

        self.new_folder_button = pn.widgets.Button(
            width=28,
            margin=(0, 0, 4, 4),
            align="center",
            stylesheets=[icon_button_css(FOLDER_PLUS_MASK)],
            css_classes=["history-new-folder"],
            description="New Folder",
        )
        self.new_folder_button.on_click(self._handle_new_folder)

        self.search_input = pn.widgets.TextInput(
            placeholder="Search chats",
            sizing_mode="stretch_width",
            margin=0,
            stylesheets=[_SEARCH_CSS],
            css_classes=["history-search"],
        )
        # value_input fires per keystroke, so results follow typing
        self.search_input.param.watch(self._handle_search, "value_input")

        self._search_clear_button = pn.widgets.Button(
            icon="x",
            width=24,
            align="center",
            margin=0,
            visible=False,
            stylesheets=[_SEARCH_CLEAR_CSS],
            css_classes=["history-search-clear"],
            description="Clear search",
        )
        self._search_clear_button.on_click(self._handle_search_clear)

        self._search_row = pn.Row(
            self.search_input,
            self._search_clear_button,
            sizing_mode="stretch_width",
            margin=(6, 2, 6, 2),
            styles={"position": "relative"},
        )

        source = self._build_source()
        self.tree = Wunderbaum(
            source=source,
            options={"dnd": True, "edit": {"trigger": ["clickActive", "F2"]}},
            tree_event_callback=self._on_tree_event,
            sizing_mode="stretch_width",
            css_classes=["history-tree"],
            stylesheets=[_TREE_CSS],
        )
        # a fresh tree would only show a blank placeholder row; hint instead
        self._empty_hint = pn.pane.HTML(
            "", sizing_mode="stretch_width", margin=0, visible=False, css_classes=["history-empty"]
        )

        self.card = pn.Card(
            title="Conversations",
            collapsible=False,  # it is the whole content of its sidebar tab
            sizing_mode="stretch_width",
            objects=[
                pn.Column(
                    pn.Row(
                        self.new_chat_button,
                        self.new_folder_button,
                        # the first action right-aligns itself and everything
                        # after via margin-left auto (no spacer: a stretching
                        # element keeps the row unstable for clicks)
                        *actions,
                        *trailing,
                        sizing_mode="stretch_width",
                        margin=0,
                    ),
                    self._search_row,
                    self._empty_hint,
                    self.tree,
                    sizing_mode="stretch_width",
                )
            ],
            css_classes=["card", "history-card"],
            styles={"margin-top": "10px", "margin-bottom": "12px", "padding": "12px"},
        )
        self._sync_empty_state(source)

    # -- rendering ------------------------------------------------------------

    def _conv_node(self, conversation: Any) -> dict[str, Any]:
        node: dict[str, Any] = {
            "title": conversation.title,
            "key": f"{_CONV}{conversation.id}",
            "type": "conv",
            "actions": _ROW_ACTIONS,
        }
        classes = []
        if conversation.id in self._get_busy_ids():
            node["icon"] = "bi bi-arrow-repeat"
            classes.append("history-busy")
        elif conversation.id in self._get_ready_ids():
            node["icon"] = "bi bi-check-circle-fill"
            classes.append("history-ready")
        else:
            # the New Chat button's glyph without the plus
            node["icon"] = "history-icon-chat"
        if classes:
            node["classes"] = " ".join(classes)
        return node

    def _build_source(self) -> list[dict[str, Any]]:
        conversations = self._store.search_conversations(self._user_id, self._query)
        convs_by_folder: dict[str | None, list[dict[str, Any]]] = {}
        for conversation in conversations:
            convs_by_folder.setdefault(conversation.folder_id, []).append(self._conv_node(conversation))

        folders_by_parent: dict[str | None, list[Any]] = {}
        for folder in self._store.list_folders(self._user_id):
            folders_by_parent.setdefault(folder.parent_id, []).append(folder)

        # while searching, folders without a match would be empty noise
        filtering = bool(self._query.strip())

        def folder_node(folder: Any) -> dict[str, Any] | None:
            children = [node for node in map(folder_node, folders_by_parent.get(folder.id, [])) if node is not None]
            children += convs_by_folder.get(folder.id, [])
            if filtering and not children:
                return None
            armed = folder.id == self._pending_folder_delete
            actions = _ROW_ACTIONS
            if armed:
                count = len(self._folder_conversations(folder.id))
                actions = [
                    _ROW_ACTIONS[0],
                    {
                        "action": "delete",
                        "icon": "history-action-delete-armed",
                        "tooltip": f"Click again to delete this folder and {count} chats",
                    },
                ]
            node = {
                "title": folder.name,
                "key": f"{_FOLDER}{folder.id}",
                "type": "folder",
                "expanded": True,
                "children": children,
                "actions": actions,
            }
            if armed:
                node["classes"] = "history-delete-armed"
            return node

        source = [node for node in map(folder_node, folders_by_parent.get(None, [])) if node is not None]
        source.extend(convs_by_folder.get(None, []))
        return source

    def _sync_empty_state(self, source: list[dict[str, Any]]) -> None:
        """Show the hint instead of an empty tree (and vice versa)."""
        empty = not source
        message = "No matches" if self._query.strip() else "No conversations yet"
        self._empty_hint.object = _EMPTY_STATE_TEMPLATE.format(message=message)
        self._empty_hint.visible = empty
        self.tree.visible = not empty

    def refresh(self) -> None:
        """Rebuild the tree from the store and restore the active node."""
        source = self._build_source()
        self.tree.set_source(source)
        self._sync_empty_state(source)
        active_id = self._get_active_id()
        if active_id is not None:
            self.tree.set_active_node(f"{_CONV}{active_id}")

    # -- events ---------------------------------------------------------------

    def _handle_new_chat(self, event: object = None) -> None:
        _ = event
        self._pending_folder_delete = None
        self._on_new_chat()
        self.refresh()

    def _handle_new_folder(self, event: object = None) -> None:
        _ = event
        self._store.create_folder(self._user_id, "New Folder")
        self.refresh()

    def _handle_search(self, event: Any) -> None:
        self._query = event.new or ""
        self._search_clear_button.visible = bool(self._query)
        self._pending_folder_delete = None
        self.refresh()

    def _handle_search_clear(self, event: object = None) -> None:
        _ = event
        self.search_input.value = ""
        self.search_input.value_input = ""
        self._query = ""
        self._search_clear_button.visible = False
        self._pending_folder_delete = None
        self.refresh()

    def _on_tree_event(self, event_name: str, params: dict[str, Any]) -> None:
        # NOTE: "activate" must not dismiss a pending undo: set_active_node
        # after the post-delete refresh echoes an activate event from the
        # client, indistinguishable from a user click.
        key = params.get("key", "")
        if event_name == "activate" and key.startswith(_CONV):
            conversation_id = key[len(_CONV) :]
            was_ready = conversation_id in self._get_ready_ids()
            self._on_open(conversation_id)
            if was_ready:
                # drop the green check right away (opening clears the flag);
                # guarded, or the echoed activate after refresh would loop
                self.refresh()
        elif event_name == "click" and params.get("action"):
            self._handle_row_action(str(params["action"]), key)
        elif event_name == "drop":
            self._handle_drop(params)
        elif event_name == "edit.apply":
            self._handle_rename(key, str(params.get("newValue", "")))

    def _handle_row_action(self, action: str, key: str) -> None:
        """Dispatch a hover icon click (the row's rename or delete)."""
        if action != "delete" or key != f"{_FOLDER}{self._pending_folder_delete}":
            self._pending_folder_delete = None  # any other action disarms
        if action == "delete":
            self._delete_by_key(key)
            self.refresh()
        elif action == "rename":
            self.tree.start_edit_title(key)

    def _delete_by_key(self, key: str) -> None:
        if key.startswith(_CONV):
            conversation_id = key[len(_CONV) :]
            if self._on_delete is not None:
                self._on_delete(conversation_id)  # shared undo/redo path
                return
            was_active = self._get_active_id() == conversation_id
            self._store.delete_conversation(self._user_id, conversation_id)
            if was_active:
                self._open_fallback()
        elif key.startswith(_FOLDER):
            folder_id = key[len(_FOLDER) :]
            contained = self._folder_conversations(folder_id)
            if contained and self._pending_folder_delete != folder_id:
                # non-empty folder: arm and ask for a second click
                self._pending_folder_delete = folder_id
                self.refresh()
                return
            self._pending_folder_delete = None
            self._delete_folder_subtree(folder_id)

    def _folder_conversations(self, folder_id: str) -> list[str]:
        """Conversation ids inside the folder, subfolders included."""
        folder_ids = {folder_id} | set(self._subfolder_ids(folder_id))
        return [c.id for c in self._store.list_conversations(self._user_id) if c.folder_id in folder_ids]

    def _subfolder_ids(self, folder_id: str) -> list[str]:
        children: dict[str | None, list[str]] = {}
        for folder in self._store.list_folders(self._user_id):
            children.setdefault(folder.parent_id, []).append(folder.id)
        collected: list[str] = []
        queue = list(children.get(folder_id, []))
        while queue:
            current = queue.pop()
            collected.append(current)
            queue.extend(children.get(current, []))
        return collected

    def _delete_folder_subtree(self, folder_id: str) -> None:
        """Delete the folder, its subfolders, and every chat inside.

        Chats are moved to the root first so an undo restores them there
        (the folder structure itself is not restorable); the active chat
        goes last so the open-fallback runs once, at the end.
        """
        active_id = self._get_active_id()
        conversation_ids = sorted(self._folder_conversations(folder_id), key=lambda cid: cid == active_id)
        for conversation_id in conversation_ids:
            self._store.move_conversation(self._user_id, conversation_id, None)
            if self._on_delete is not None:
                self._on_delete(conversation_id)
            else:
                was_active = self._get_active_id() == conversation_id
                self._store.delete_conversation(self._user_id, conversation_id)
                if was_active:
                    self._open_fallback()
        for fid in [*self._subfolder_ids(folder_id), folder_id]:
            self._store.delete_folder(self._user_id, fid)

    def _handle_drop(self, params: dict[str, Any]) -> None:
        # newParentNodeId is where the node actually landed client-side
        source_key = str(params.get("sourceKey", ""))
        new_parent = str(params.get("newParentNodeId") or "")
        try:
            if source_key.startswith(_CONV):
                self._store.move_conversation(self._user_id, source_key[len(_CONV) :], self._drop_folder_id(new_parent))
            elif source_key.startswith(_FOLDER):
                parent_id = new_parent[len(_FOLDER) :] if new_parent.startswith(_FOLDER) else None
                self._store.move_folder(self._user_id, source_key[len(_FOLDER) :], parent_id)
        except ValueError:
            pass  # invalid target (e.g. cycle): refresh snaps the node back
        self.refresh()

    def _drop_folder_id(self, new_parent_key: str) -> str | None:
        if new_parent_key.startswith(_FOLDER):
            return new_parent_key[len(_FOLDER) :]
        if new_parent_key.startswith(_CONV):
            # landed under a conversation: adopt that conversation's folder
            target = self._store.get_conversation(self._user_id, new_parent_key[len(_CONV) :])
            return target.folder_id if target is not None else None
        return None

    def _handle_rename(self, key: str, title: str) -> None:
        title = title.strip()
        if title:
            if key.startswith(_CONV):
                self._store.rename_conversation(self._user_id, key[len(_CONV) :], title)
            elif key.startswith(_FOLDER):
                self._store.rename_folder(self._user_id, key[len(_FOLDER) :], title)
        self.refresh()

    def _open_fallback(self) -> None:
        """After deleting the active chat: open the most recent remaining
        conversation, else reset to a fresh feed without creating a row."""
        remaining = self._store.list_conversations(self._user_id)
        if remaining:
            self._on_open(remaining[0].id)
        else:
            self._on_reset()
