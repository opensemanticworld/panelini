"""Date-grouped conversation history sidebar for the AI chat panel.

Pure Panel widgets styled for the narrow (~264px) Panelini sidebar: a
"New Chat" button, search over titles and message content, conversations
grouped by last activity (Pinned, Today, Yesterday, Last 7 days, Last 30
days, Older), inline rename, and two-click delete. Rebuilt from the store
on every ``refresh()``.
"""

from __future__ import annotations

from collections.abc import Callable, Sequence
from datetime import datetime
from typing import Any

import panel as pn

from .store import ChatHistoryStore, ConversationRecord, utcnow

_GROUPS = ("Today", "Yesterday", "Last 7 days", "Last 30 days", "Older")

_TITLE_CSS = """
:host { width: 100%; margin: 0; }
.bk-btn, .bk-btn:focus {
    display: block; width: 100%;
    text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    background: transparent; color: inherit;
    border: none; border-left: 2px solid transparent; border-radius: 6px;
    padding: 4px 8px; font-size: 0.85em; line-height: 1.5;
    transition: background 0.15s ease, border-color 0.15s ease;
}
.bk-btn:hover { background: rgba(120, 120, 120, 0.12); border-color: rgba(120, 120, 120, 0.35); }
"""

_TITLE_ACTIVE_CSS = """
:host { width: 100%; margin: 0; }
.bk-btn, .bk-btn:focus, .bk-btn:hover {
    display: block; width: 100%;
    text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    background: color-mix(in srgb, var(--design-primary-color, #0072b5) 12%, transparent);
    color: inherit; font-weight: 600;
    border: none; border-left: 2px solid var(--design-primary-color, #0072b5); border-radius: 6px;
    padding: 4px 8px; font-size: 0.85em; line-height: 1.5;
}
"""

_ICON_CSS = """
:host { margin: 0; }
.bk-btn, .bk-btn:focus {
    background: transparent; border: none; border-radius: 6px; padding: 2px 3px;
    opacity: 0.35; transition: opacity 0.15s ease, background 0.15s ease;
}
.bk-btn:hover { opacity: 1; background: rgba(120, 120, 120, 0.12); }
"""

_ICON_ARMED_CSS = """
:host { margin: 0; }
.bk-btn, .bk-btn:focus { border: none; border-radius: 6px; padding: 2px 3px; opacity: 1; }
"""

# Spinning title icon while the conversation is generating (row stays clickable)
_SPIN_CSS = """
.bk-btn svg { animation: history-spin 1s linear infinite; }
@keyframes history-spin { to { transform: rotate(360deg); } }
"""

# Green check on conversations that finished while not being viewed
_READY_CSS = """
.bk-btn svg { color: #22a06b; }
"""

_SEARCH_CSS = """
:host { width: 100%; margin: 0 2px 6px 2px; }
.bk-input {
    font-size: 0.82em; padding: 4px 8px; border-radius: 6px;
}
"""

_GROUP_HEADER_TEMPLATE = (
    '<div style="font-size: 0.68em; font-weight: 600; letter-spacing: 0.08em;'
    ' text-transform: uppercase; opacity: 0.55; margin: 10px 2px 2px 2px;">{label}</div>'
)

_EMPTY_STATE_TEMPLATE = (
    '<div style="font-size: 0.8em; font-style: italic; opacity: 0.5;'
    ' text-align: center; margin: 12px 0 6px 0;">{message}</div>'
)


def bucket_label(updated_at: datetime, now: datetime | None = None) -> str:
    """Return the date group label for a conversation's last activity."""
    reference = (now or utcnow()).astimezone().date()
    days = (reference - updated_at.astimezone().date()).days
    if days <= 0:
        return "Today"
    if days == 1:
        return "Yesterday"
    if days <= 7:
        return "Last 7 days"
    if days <= 30:
        return "Last 30 days"
    return "Older"


class HistoryPanel:
    """Sidebar card listing a user's conversations, grouped by date."""

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
        self._renaming_id: str | None = None
        self._pending_delete_id: str | None = None
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

        self.search_input = pn.widgets.TextInput(
            placeholder="Search chats",
            sizing_mode="stretch_width",
            margin=0,
            stylesheets=[_SEARCH_CSS],
            css_classes=["history-search"],
        )
        # value_input fires per keystroke, so results follow typing
        self.search_input.param.watch(self._handle_search, "value_input")

        self._list = pn.Column(sizing_mode="stretch_width", margin=0)
        self.card = pn.Card(
            title="Conversations",
            collapsible=False,  # it is the whole content of its sidebar tab
            sizing_mode="stretch_width",
            objects=[
                pn.Column(
                    pn.Row(self.new_chat_button, *actions, sizing_mode="stretch_width", margin=0),
                    self.search_input,
                    self._list,
                    sizing_mode="stretch_width",
                )
            ],
            # "card" is Panel's default class carrying the card chrome; a
            # css_classes override must keep it or the surface disappears
            css_classes=["card", "history-card"],
            styles={"margin-top": "10px", "margin-bottom": "12px", "padding": "12px"},
        )
        self.refresh()

    # -- actions --------------------------------------------------------------

    def _handle_new_chat(self, event: object = None) -> None:
        _ = event
        self._renaming_id = None
        self._pending_delete_id = None
        self._on_new_chat()
        self.refresh()

    def _handle_open(self, conversation_id: str) -> None:
        self._renaming_id = None
        self._pending_delete_id = None
        self._on_open(conversation_id)
        self.refresh()

    def _handle_rename_start(self, conversation_id: str) -> None:
        self._renaming_id = conversation_id
        self._pending_delete_id = None
        self.refresh()

    def _handle_rename_commit(self, conversation_id: str, title: str) -> None:
        title = title.strip()
        if title:
            self._store.rename_conversation(self._user_id, conversation_id, title)
        self._renaming_id = None
        self.refresh()

    def _handle_delete(self, conversation_id: str) -> None:
        if self._pending_delete_id != conversation_id:
            self._pending_delete_id = conversation_id  # arm, second click deletes
            self.refresh()
            return
        self._pending_delete_id = None
        was_active = self._get_active_id() == conversation_id
        self._store.delete_conversation(self._user_id, conversation_id)
        if was_active:
            # switch to the most recent remaining chat; fresh one only if none
            remaining = self._store.list_conversations(self._user_id)
            if remaining:
                self._on_open(remaining[0].id)
            else:
                self._on_new_chat()
        self.refresh()

    def _handle_search(self, event: Any) -> None:
        self._query = event.new or ""
        self._pending_delete_id = None
        self.refresh()

    # -- rendering ------------------------------------------------------------

    def _make_row(self, conversation: ConversationRecord) -> pn.Row:
        active = conversation.id == self._get_active_id()
        busy = conversation.id in self._get_busy_ids()

        if self._renaming_id == conversation.id:
            title_widget: pn.viewable.Viewable = pn.widgets.TextInput(
                value=conversation.title,
                sizing_mode="stretch_width",
                margin=0,
                css_classes=["history-rename-input"],
            )
            title_widget.param.watch(
                lambda event, cid=conversation.id: self._handle_rename_commit(cid, event.new), "value"
            )
        else:
            ready = conversation.id in self._get_ready_ids()
            stylesheets = [_TITLE_ACTIVE_CSS if active else _TITLE_CSS]
            icon = None
            description = conversation.title
            if busy:
                # spinner via icon animation; the row stays clickable
                icon = "loader-2"
                stylesheets.append(_SPIN_CSS)
                description = "Generating..."
            elif ready:
                icon = "circle-check"
                stylesheets.append(_READY_CSS)
                description = "Ready"
            title_widget = pn.widgets.Button(
                name=conversation.title,
                icon=icon,
                sizing_mode="stretch_width",
                margin=0,
                stylesheets=stylesheets,
                css_classes=["history-title"],
                description=description,
            )
            title_widget.on_click(lambda event, cid=conversation.id: self._handle_open(cid))

        rename_button = pn.widgets.Button(
            icon="pencil",
            width=26,
            margin=0,
            stylesheets=[_ICON_CSS],
            css_classes=["history-rename"],
            description="Rename",
            disabled=busy,
        )
        rename_button.on_click(lambda event, cid=conversation.id: self._handle_rename_start(cid))

        armed = self._pending_delete_id == conversation.id
        delete_button = pn.widgets.Button(
            icon="trash-x" if armed else "trash",
            button_type="danger" if armed else "default",
            width=26,
            margin=0,
            stylesheets=[_ICON_ARMED_CSS if armed else _ICON_CSS],
            css_classes=["history-delete"],
            description="Click again to delete" if armed else "Delete",
            disabled=busy,
        )
        delete_button.on_click(lambda event, cid=conversation.id: self._handle_delete(cid))

        return pn.Row(
            title_widget,
            rename_button,
            delete_button,
            sizing_mode="stretch_width",
            margin=(1, 0),
            css_classes=["history-row"],
        )

    def refresh(self) -> None:
        """Rebuild the list from the store, honouring the current search."""
        conversations = self._store.search_conversations(self._user_id, self._query)
        if not conversations:
            message = "No matches" if self._query.strip() else "No conversations yet"
            self._list.objects = [
                pn.pane.HTML(_EMPTY_STATE_TEMPLATE.format(message=message), sizing_mode="stretch_width", margin=0)
            ]
            return

        groups: dict[str, list[ConversationRecord]] = {}
        for conversation in conversations:
            key = "Pinned" if conversation.pinned else bucket_label(conversation.updated_at)
            groups.setdefault(key, []).append(conversation)

        objects: list[pn.viewable.Viewable] = []
        for label in ("Pinned", *_GROUPS):
            if label not in groups:
                continue
            objects.append(
                pn.pane.HTML(
                    _GROUP_HEADER_TEMPLATE.format(label=label),
                    sizing_mode="stretch_width",
                    margin=0,
                    css_classes=["history-group"],
                )
            )
            objects.extend(self._make_row(conversation) for conversation in groups[label])
        self._list.objects = objects
