"""Drag-and-drop folder tree view for the AI chat history.

Wraps the TanstackTable panel: folders as nestable ``folder:<id>`` rows and
conversations as ``conv:<id>@<folder_id>`` leaves, one row per filing, so a
chat kept in three folders is three rows. The store stays the source of
truth: every intent the panel reports is refused there and replayed against
the store, which the tree is then rebuilt from.
"""

from __future__ import annotations

from collections.abc import Callable, Sequence
from typing import Any

import panel as pn

from panelini.panels.tanstack.table import TanstackTable

from .icons import (
    CHAT_PATHS,
    CHECK_PATHS,
    FOLDER_OPEN_PATHS,
    FOLDER_PATHS,
    FOLDER_PLUS_MASK,
    NEW_CHAT_MASK,
    REFRESH_PATHS,
    icon_button_css,
    tabler_icon,
)
from .store import ChatHistoryStore

_CONV = "conv:"
_FOLDER = "folder:"
_AT = "@"


def placement_key(conversation_id: str, folder_id: str | None) -> str:
    """Row key for one filing of a conversation (``None`` is the root)."""
    return f"{_CONV}{conversation_id}{_AT}{folder_id or ''}"


def placement(key: str) -> tuple[str, str | None] | None:
    """Split a conversation row key into its chat and the folder holding it.

    Returns ``None`` for a row that is not a conversation, which is what
    tells a folder row apart from a chat without a second lookup.
    """
    if not key.startswith(_CONV):
        return None
    conversation_id, _, folder_id = key[len(_CONV) :].partition(_AT)
    return conversation_id, folder_id or None


def folder_key(folder_id: str) -> str:
    """Row key for a folder."""
    return f"{_FOLDER}{folder_id}"


def folder_of(key: str) -> str | None:
    """The folder a folder row names, or ``None`` for any other row."""
    return key[len(_FOLDER) :] if key.startswith(_FOLDER) else None


# Named once here rather than on every node: a chat declares its type and takes
# the icon and the leaf flag from it.
_TYPES = {
    "conv": {"icon": "history-chat", "allow_children": False},
    "folder": {"icon": "history-folder"},
}

# An expanded node prefers the "-open" entry, which is how the folder opens.
_ICONS = {
    "history-chat": tabler_icon(CHAT_PATHS),
    "history-folder": tabler_icon(FOLDER_PATHS),
    "history-folder-open": tabler_icon(FOLDER_OPEN_PATHS),
    "history-busy": tabler_icon(REFRESH_PATHS),
    "history-ready": tabler_icon(CHECK_PATHS),
}

# Every row action lives in the context menu, which is also what gives it a
# keyboard shortcut: F2, Delete and Alt+Arrow. Outdent is how a chat leaves a
# folder and indent is how it joins the one above, both reported as the same
# move a drag is. Delete is also a button on the row, because it is the one
# action people reach for constantly and a right click is not a discoverable
# way to get at it. No toolbar: the sidebar's own header row is already the
# place for the buttons that act on it as a whole rather than on one row.
_OPTIONS = {
    "aria_label": "Conversations",
    "menu_label": "Conversation actions",
    "enable_dnd": True,
    "select_mode": "single",
    "show_checkboxes": False,
    "menu": ["rename", "delete", "|", "outdent", "indent"],
    "row_actions": ["delete"],
}

# The panel grows with its content up to a point and scrolls past it, so a long
# history does not push the rest of the sidebar off screen. Below that: the row
# states, which the panel ships no styling for by design.
_TREE_CSS = """
.pnl-tst { min-height: 120px; max-height: 420px; }

/* The chat this sidebar has open, which is not the same as the row the user
   picked: several rows are the one chat when it is filed in several folders. */
.history-active { background: var(--pnl-tst-active); }

/* Rotate the glyph rather than the row it sits in. */
.history-busy .pnl-tst-icon svg { animation: history-spin 1s linear infinite; }
@keyframes history-spin { to { transform: rotate(360deg); } }
.history-ready .pnl-tst-icon { color: #22a06b; }

/* Armed folder delete: the second Delete wipes the folder and its chats. */
.history-delete-armed { color: #d1242f; }
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

# One line, always: the sidebar is narrow and the Cancel button sits beside this,
# so a message that wrapped would push the row to two lines and shift the tree.
_CONFIRM_TEMPLATE = (
    '<div style="font-size: 0.8em; color: #d1242f; text-align: center; margin: 0;'
    ' white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{message}</div>'
)

# `!important` because Panel's own button rules are loaded after a widget
# stylesheet and would otherwise win, which is what the icon buttons do too.
_CONFIRM_CANCEL_CSS = """
:host { margin: 0; }
.bk-btn, .bk-btn:focus {
    height: 20px; min-height: 0; padding: 0 8px; font-size: 0.78em; line-height: 1;
    border: 1px solid rgba(209, 36, 47, 0.5) !important; border-radius: 6px;
    background: transparent !important; box-shadow: none;
    color: #d1242f !important; cursor: pointer;
}
.bk-btn:hover { background: rgba(209, 36, 47, 0.1) !important; }
"""


class HistoryTree:
    """Sidebar card with folders and conversations as a drag-and-drop tree.

    A chat kept in several folders is one row under each of them. Dragging a
    row moves that filing; holding Ctrl or Alt files the chat in the target as
    well, leaving the row it came from. Taking a row to the root takes that
    filing out of its folder and leaves the chat's other rows alone, the root
    being the absence of a folder rather than another folder to file into.

    Rename, delete, outdent and indent are in the row's context menu, on F2,
    Delete and Alt+Arrow. Outdent takes a chat out of its folder and indent
    files it in the one above, both reported as the move a drag is. Delete is
    a button on the row as well, at its trailing edge. New chat and new folder
    are header buttons. Deletes route through the chat's shared undo/redo stack
    when ``on_delete`` is wired. Deleting a folder that holds chats kept nowhere
    else asks for a second Delete first, offering a Cancel beside the warning,
    then removes the folder, its subfolders and those chats (which move to the
    root beforehand, so an undo restores them there). Generating chats show a
    spinner icon, finished ones a green check until opened; an empty tree shows
    a hint instead of a blank panel.
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
        # folder deletes that would take chats with them ask for a second click
        self._pending_folder_delete: str | None = None
        self._get_active_id = get_active_id
        self._get_busy_ids = get_busy_ids or (lambda: set())
        self._get_ready_ids = get_ready_ids or (lambda: set())
        self._query = ""
        # folders already shown, so a collapse survives a rebuild and a folder
        # that has just appeared still opens
        self._known_folders: set[str] = set()

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
        self.tree = TanstackTable(
            source=source,
            options=_OPTIONS,
            types=_TYPES,
            icons=_ICONS,
            # Nothing here rewrites its own tree: the store does, and the tree
            # is rebuilt from it, so there is no panel-side state to step back
            # through. Deletes answer to the chat's own undo stack instead.
            undo_depth=0,
            action_callback=self._refuse,
            move_callback=self._refuse_move,
            event_callback=self._on_tree_event,
            sizing_mode="stretch_width",
            css_classes=["history-tree"],
            stylesheets=[_TREE_CSS],
        )
        # a fresh tree would only show an empty panel; hint instead
        self._empty_hint = pn.pane.HTML(
            "", sizing_mode="stretch_width", margin=0, visible=False, css_classes=["history-empty"]
        )
        self._confirm_hint = pn.pane.HTML(
            "", sizing_mode="stretch_width", margin=0, visible=False, css_classes=["history-confirm"]
        )
        # The way out of an armed folder delete. The panel reports no key events
        # to Python, so Escape cannot reach here; a visible button is what a user
        # who changed their mind has.
        self.cancel_delete_button = pn.widgets.Button(
            label="Cancel",
            width=64,
            align="center",
            margin=0,
            visible=False,
            stylesheets=[_CONFIRM_CANCEL_CSS],
            css_classes=["history-confirm-cancel"],
            description="Leave the folder alone",
        )
        self.cancel_delete_button.on_click(self._handle_cancel_delete)

        self._confirm_row = pn.Row(
            self._confirm_hint,
            self.cancel_delete_button,
            sizing_mode="stretch_width",
            margin=(0, 2),
            visible=False,
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
                    self._confirm_row,
                    self._empty_hint,
                    self.tree,
                    sizing_mode="stretch_width",
                )
            ],
            css_classes=["card", "history-card"],
            styles={"margin-top": "10px", "margin-bottom": "12px", "padding": "12px"},
        )
        self._sync_empty_state(source)
        self._open_new_folders()

    # -- rendering ------------------------------------------------------------

    def _conv_node(self, conversation: Any, folder_id: str | None) -> dict[str, Any]:
        node: dict[str, Any] = {
            "title": conversation.title,
            "key": placement_key(conversation.id, folder_id),
            "type": "conv",
        }
        classes = []
        if conversation.id == self._get_active_id():
            classes.append("history-active")
        if conversation.id in self._get_busy_ids():
            node["icon"] = "history-busy"
            classes.append("history-busy")
        elif conversation.id in self._get_ready_ids():
            node["icon"] = "history-ready"
            classes.append("history-ready")
        if classes:
            node["class"] = " ".join(classes)
        return node

    def _build_source(self) -> list[dict[str, Any]]:
        conversations = self._store.search_conversations(self._user_id, self._query)
        rows_by_folder: dict[str | None, list[dict[str, Any]]] = {}
        for conversation in conversations:
            # one row per filing; a chat in no folder gets its row at the root
            for folder_id in conversation.folder_ids or (None,):
                rows_by_folder.setdefault(folder_id, []).append(self._conv_node(conversation, folder_id))

        folders_by_parent: dict[str | None, list[Any]] = {}
        for folder in self._store.list_folders(self._user_id):
            folders_by_parent.setdefault(folder.parent_id, []).append(folder)

        # while searching, folders without a match would be empty noise
        filtering = bool(self._query.strip())

        def folder_node(folder: Any) -> dict[str, Any] | None:
            children = [node for node in map(folder_node, folders_by_parent.get(folder.id, [])) if node is not None]
            children += rows_by_folder.get(folder.id, [])
            if filtering and not children:
                return None
            node: dict[str, Any] = {
                "title": folder.name,
                "key": folder_key(folder.id),
                "type": "folder",
                "children": children,
            }
            if folder.id == self._pending_folder_delete:
                node["class"] = "history-delete-armed"
            return node

        source = [node for node in map(folder_node, folders_by_parent.get(None, [])) if node is not None]
        source.extend(rows_by_folder.get(None, []))
        return source

    def _sync_empty_state(self, source: list[dict[str, Any]]) -> None:
        """Show the hint instead of an empty tree (and vice versa)."""
        empty = not source
        message = "No matches" if self._query.strip() else "No conversations yet"
        self._empty_hint.object = _EMPTY_STATE_TEMPLATE.format(message=message)
        self._empty_hint.visible = empty
        self.tree.visible = not empty

    def _sync_confirm_hint(self) -> None:
        """Say what a second Delete on the armed folder would take with it."""
        folder_id = self._pending_folder_delete
        armed = folder_id is not None
        self._confirm_hint.visible = armed
        self.cancel_delete_button.visible = armed
        self._confirm_row.visible = armed
        if folder_id is None:
            return
        count = len(self._folder_conversations(folder_id))
        chats = "chat" if count == 1 else "chats"
        self._confirm_hint.object = _CONFIRM_TEMPLATE.format(message=f"Delete again to remove {count} {chats}")

    def _open_new_folders(self) -> None:
        """Open a folder the first time it is shown, leaving collapses alone."""
        keys = {folder_key(folder.id) for folder in self._store.list_folders(self._user_id)}
        fresh = keys - self._known_folders
        self._known_folders = keys
        if fresh:
            self.tree.expanded_keys = sorted(set(self.tree.expanded_keys) | fresh)

    def refresh(self) -> None:
        """Rebuild the tree from the store."""
        source = self._build_source()
        self.tree.set_source(source)
        self._sync_empty_state(source)
        self._sync_confirm_hint()
        self._open_new_folders()

    # -- events ---------------------------------------------------------------

    def _refuse(self, action: str, params: dict[str, Any]) -> bool:
        """Refuse every panel-side edit; the store makes the change instead."""
        _ = action, params
        return False

    def _refuse_move(self, key: str, anchor_key: str, position: str) -> bool:
        """Refuse the panel's own move, for the same reason :meth:`_refuse` does.

        The event still reaches :meth:`_on_tree_event`, which is what carries
        the copy modifier and lets a drop be a second filing rather than a
        relocation.
        """
        _ = key, anchor_key, position
        return False

    def _handle_new_chat(self, event: object = None) -> None:
        _ = event
        self._disarm()
        self._on_new_chat()
        self.refresh()

    def _handle_new_folder(self, event: object = None) -> None:
        _ = event
        self._disarm()
        self._store.create_folder(self._user_id, "New Folder")
        self.refresh()

    def _handle_search(self, event: Any) -> None:
        self._query = event.new or ""
        self._search_clear_button.visible = bool(self._query)
        self._disarm()
        self.refresh()

    def _handle_search_clear(self, event: object = None) -> None:
        _ = event
        self.search_input.value = ""
        self.search_input.value_input = ""
        self._query = ""
        self._search_clear_button.visible = False
        self._disarm()
        self.refresh()

    def _on_tree_event(self, event_name: str, params: dict[str, Any]) -> None:
        # NOTE: "activate" must not dismiss a pending undo: it is echoed by the
        # client after a refresh, indistinguishable from a user click.
        key = str(params.get("key") or "")
        if event_name == "activate":
            self._handle_activate(key)
        elif event_name == "move":
            self._handle_move(params)
        elif event_name == "delete":
            self._handle_delete([str(k) for k in params.get("keys") or []])
        elif event_name == "rename":
            self._handle_rename(key, str(params.get("title") or ""))

    def _handle_activate(self, key: str) -> None:
        split = placement(key)
        if split is None:
            return
        conversation_id = split[0]
        was_ready = conversation_id in self._get_ready_ids()
        self._on_open(conversation_id)
        if was_ready:
            # drop the green check right away (opening clears the flag);
            # guarded, or the echoed activate after refresh would loop
            self.refresh()

    # -- moves ----------------------------------------------------------------

    def _handle_move(self, params: dict[str, Any]) -> None:
        position = params.get("position")
        anchor_key = params.get("anchor_key")
        if not position or not anchor_key:
            return  # a blocked instruction resolves to no placement at all
        self._disarm()
        target = self._anchor_folder(str(position), str(anchor_key))
        try:
            for key in params.get("keys") or []:
                self._move_row(str(key), target, bool(params.get("copy")))
        except ValueError:
            pass  # invalid target (a cycle, say): refresh snaps the row back
        self.refresh()

    def _anchor_folder(self, position: str, anchor_key: str) -> str | None:
        """The folder a drop at this anchor files a row in (``None`` is the root)."""
        folder_id = folder_of(anchor_key)
        if folder_id is not None:
            if position == "child":
                return folder_id
            anchor = next((f for f in self._store.list_folders(self._user_id) if f.id == folder_id), None)
            return anchor.parent_id if anchor is not None else None
        split = placement(anchor_key)
        # landed on a chat: adopt the folder that row is filed in
        return split[1] if split is not None else None

    def _move_row(self, key: str, target: str | None, copy: bool) -> None:
        split = placement(key)
        if split is None:
            folder_id = folder_of(key)
            if folder_id is not None:
                self._store.move_folder(self._user_id, folder_id, target)
            return
        conversation_id, source_folder = split
        if target is None:
            # A row is one filing, so taking it to the root takes that filing out
            # of its folder and leaves the chat's other rows where they are. The
            # root holds no filing to copy into, so a copy here is a plain move.
            if source_folder is not None:
                self._store.unlink_conversation(self._user_id, conversation_id, source_folder)
            return
        self._store.link_conversation(self._user_id, conversation_id, target)
        if not copy and source_folder is not None and source_folder != target:
            self._store.unlink_conversation(self._user_id, conversation_id, source_folder)

    # -- deletion -------------------------------------------------------------

    def _disarm(self) -> None:
        self._pending_folder_delete = None

    def _handle_cancel_delete(self, event: object = None) -> None:
        """Leave the armed folder alone and take the warning down."""
        _ = event
        self._disarm()
        self.refresh()

    def _handle_delete(self, keys: list[str]) -> None:
        for key in keys:
            self._delete_by_key(key)
        self.refresh()

    def _delete_by_key(self, key: str) -> None:
        split = placement(key)
        if split is not None:
            # the row is one filing, the trash is the chat: outdent takes a
            # filing away, delete takes the chat
            self._disarm()
            conversation_id = split[0]
            if self._on_delete is not None:
                self._on_delete(conversation_id)  # shared undo/redo path
                return
            was_active = self._get_active_id() == conversation_id
            self._store.delete_conversation(self._user_id, conversation_id)
            if was_active:
                self._open_fallback()
            return
        folder_id = folder_of(key)
        if folder_id is None:
            return
        contained = self._folder_conversations(folder_id)
        if contained and self._pending_folder_delete != folder_id:
            # chats would go with it: arm and ask for a second Delete
            self._pending_folder_delete = folder_id
            return
        self._disarm()
        self._delete_folder_subtree(folder_id)

    def _folder_conversations(self, folder_id: str) -> list[str]:
        """Chats filed in the folder or its subfolders and nowhere else.

        A chat that is also kept outside survives the folder, so it is not
        something deleting the folder takes with it.
        """
        inside = {folder_id, *self._subfolder_ids(folder_id)}
        return [
            c.id
            for c in self._store.list_conversations(self._user_id)
            if c.folder_ids and inside.issuperset(c.folder_ids)
        ]

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
        """Delete the folder, its subfolders, and the chats kept only there.

        Those chats move to the root first so an undo restores them there (the
        folder structure itself is not restorable); the active chat goes last
        so the open-fallback runs once, at the end. A chat filed elsewhere as
        well keeps those other placements and stays.
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

    # -- rename ---------------------------------------------------------------

    def _handle_rename(self, key: str, title: str) -> None:
        title = title.strip()
        if title:
            split = placement(key)
            if split is not None:
                self._store.rename_conversation(self._user_id, split[0], title)
            else:
                folder_id = folder_of(key)
                if folder_id is not None:
                    self._store.rename_folder(self._user_id, folder_id, title)
        self.refresh()

    def _open_fallback(self) -> None:
        """After deleting the active chat: open the most recent remaining
        conversation, else reset to a fresh feed without creating a row."""
        remaining = self._store.list_conversations(self._user_id)
        if remaining:
            self._on_open(remaining[0].id)
        else:
            self._on_reset()
