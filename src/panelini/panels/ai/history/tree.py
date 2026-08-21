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

from .store import ChatHistoryStore

_CONV = "conv:"
_FOLDER = "folder:"

_CONTEXT_MENU = [
    {"id": "new_chat", "label": "New Chat"},
    {"id": "new_folder", "label": "New Folder"},
    {"id": "delete", "label": "Delete"},
]

# The component inlines fixed 800x500 defaults on the container; override so
# the tree hugs the sidebar width and grows with content, with a vertical
# scrollbar only when needed and never a horizontal one. Below that: the
# busy/ready node icon states.
_TREE_CSS = """
.wunderbaum-wrapper, .tree-container, div.wunderbaum {
    overflow-y: auto !important;
    overflow-x: hidden !important;
}
.tree-container {
    width: 100% !important;
    height: auto !important;
    min-height: 120px;
    max-height: 420px;
}
.history-busy i.bi-arrow-repeat {
    display: inline-block;
    animation: history-spin 1s linear infinite;
}
@keyframes history-spin { to { transform: rotate(360deg); } }
.history-ready i.bi-check-circle-fill { color: #22a06b; }
"""

_SEARCH_CSS = """
:host { width: 100%; margin: 0 2px 6px 2px; }
.bk-input {
    font-size: 0.82em; padding: 4px 8px; border-radius: 6px;
}
"""


class HistoryTree:
    """Sidebar card with folders and conversations as a drag-and-drop tree.

    Rename: inline edit (click the active node or F2). New chat / new
    folder: header buttons or context menu; delete: context menu. Drops
    persist where the node landed: conversations into folders, folders
    into folders (nested), anything to the root. Generating chats show a
    spinner icon, finished ones a green check until opened.
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
    ) -> None:
        self._store = store
        self._user_id = user_id
        self._on_open = on_open
        self._on_new_chat = on_new_chat
        self._get_active_id = get_active_id
        self._get_busy_ids = get_busy_ids or (lambda: set())
        self._get_ready_ids = get_ready_ids or (lambda: set())
        self._query = ""

        self.new_chat_button = pn.widgets.Button(
            name="New Chat",
            icon="plus",
            button_type="primary",
            button_style="outline",
            sizing_mode="stretch_width",
            margin=(0, 2, 4, 2),
            css_classes=["history-new-chat"],
        )
        self.new_chat_button.on_click(self._handle_new_chat)

        self.new_folder_button = pn.widgets.Button(
            icon="folder-plus",
            button_type="primary",
            button_style="outline",
            width=38,
            margin=(0, 2, 4, 2),
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

        self.tree = Wunderbaum(
            source=self._build_source(),
            options={"dnd": True, "edit": {"trigger": ["clickActive", "F2"]}},
            context_menu_items=_CONTEXT_MENU,
            tree_event_callback=self._on_tree_event,
            sizing_mode="stretch_width",
            css_classes=["history-tree"],
            stylesheets=[_TREE_CSS],
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
                        *actions,
                        sizing_mode="stretch_width",
                        margin=0,
                    ),
                    self.search_input,
                    self.tree,
                    sizing_mode="stretch_width",
                )
            ],
            css_classes=["card", "history-card"],
            styles={"margin-top": "10px", "margin-bottom": "12px", "padding": "12px"},
        )

    # -- rendering ------------------------------------------------------------

    def _conv_node(self, conversation: Any) -> dict[str, Any]:
        node: dict[str, Any] = {
            "title": conversation.title,
            "key": f"{_CONV}{conversation.id}",
            "type": "conv",
        }
        classes = []
        if conversation.id in self._get_busy_ids():
            node["icon"] = "bi bi-arrow-repeat"
            classes.append("history-busy")
        elif conversation.id in self._get_ready_ids():
            node["icon"] = "bi bi-check-circle-fill"
            classes.append("history-ready")
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
            return {
                "title": folder.name,
                "key": f"{_FOLDER}{folder.id}",
                "type": "folder",
                "expanded": True,
                "children": children,
            }

        source = [node for node in map(folder_node, folders_by_parent.get(None, [])) if node is not None]
        source.extend(convs_by_folder.get(None, []))
        return source

    def refresh(self) -> None:
        """Rebuild the tree from the store and restore the active node."""
        self.tree.set_source(self._build_source())
        active_id = self._get_active_id()
        if active_id is not None:
            self.tree.set_active_node(f"{_CONV}{active_id}")

    # -- events ---------------------------------------------------------------

    def _handle_new_chat(self, event: object = None) -> None:
        _ = event
        self._on_new_chat()
        self.refresh()

    def _handle_new_folder(self, event: object = None) -> None:
        _ = event
        self._store.create_folder(self._user_id, "New Folder")
        self.refresh()

    def _handle_search(self, event: Any) -> None:
        self._query = event.new or ""
        self.refresh()

    def _on_tree_event(self, event_name: str, params: dict[str, Any]) -> None:
        key = params.get("key", "")
        if event_name == "activate" and key.startswith(_CONV):
            self._on_open(key[len(_CONV) :])
        elif event_name == "drop":
            self._handle_drop(params)
        elif event_name == "edit.apply":
            self._handle_rename(key, str(params.get("newValue", "")))
        elif event_name == "contextmenu":
            self._handle_context_action(str(params.get("action", "")), key)

    def _delete_by_key(self, key: str) -> None:
        if key.startswith(_CONV):
            conversation_id = key[len(_CONV) :]
            was_active = self._get_active_id() == conversation_id
            self._store.delete_conversation(self._user_id, conversation_id)
            if was_active:
                self._open_fallback()
        elif key.startswith(_FOLDER):
            self._store.delete_folder(self._user_id, key[len(_FOLDER) :])

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

    def _handle_context_action(self, action: str, key: str) -> None:
        if action == "new_chat":
            self._handle_new_chat()
            return
        if action == "new_folder":
            self._store.create_folder(self._user_id, "New Folder")
        elif action == "delete":
            self._delete_by_key(key)
        self.refresh()

    def _open_fallback(self) -> None:
        """After deleting the active chat: most recent remaining, else new."""
        remaining = self._store.list_conversations(self._user_id)
        if remaining:
            self._on_open(remaining[0].id)
        else:
            self._on_new_chat()
