"""Frontend UI layer for the AI chat panel."""

from collections.abc import AsyncGenerator
from pathlib import Path
from typing import Any

import panel as pn

from panelini.user import UserResolver, ensure_anonymous_cookie, resolve_user

from .backend import AiBackend
from .history.default import default_history_store
from .history.store import ChatHistoryStore
from .tools.basic_tools import AVAILABLE_TOOLS

# No focus outline on the sidebar icon tabs (browsers draw a dotted frame)
_TABS_CSS = """
.bk-tab:focus, .bk-tab:focus-visible { outline: none; box-shadow: none; }
"""


# Tabler glyphs inlined as CSS masks: no webfont round trip, and a mask
# reads alpha only, so the stroke colour below is arbitrary.
def _tabler_mask(paths: str) -> str:
    """Data URI of an inline tabler-style glyph for use as a CSS mask."""
    return (
        "data:image/svg+xml;utf8,"
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000'"
        " stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>" + paths + "</svg>"
    )


_ARROW_BASE = "<path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2'/><path d='M12 4v12'/>"
_DOWNLOAD_MASK = _tabler_mask(_ARROW_BASE + "<path d='M7 11l5 5l5 -5'/>")
_UPLOAD_MASK = _tabler_mask(_ARROW_BASE + "<path d='M7 9l5 -5l5 5'/>")
# tabler "folders" and "list": the view toggle shows the view it switches to
_TREE_MASK = _tabler_mask(
    "<path d='M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2'/>"
    "<path d='M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2'/>"
)
_LIST_MASK = _tabler_mask(
    "<path d='M9 6l11 0'/><path d='M9 12l11 0'/><path d='M9 18l11 0'/>"
    "<path d='M5 6l0 .01'/><path d='M5 12l0 .01'/><path d='M5 18l0 .01'/>"
)

# Import/export icons in the New Chat row. min-height 0 is needed because
# bokeh gives inputs and buttons a text-sized minimum that would otherwise
# win over the height.
_ICON_GLYPH_PX = 18
_ICON_BOX = "width: 28px; height: 24px; min-height: 0; padding: 0; margin: 0; border: none; border-radius: 6px;"


def _glyph_css(mask: str) -> str:
    """Paint a box as a flat glyph in the surrounding text colour.

    Both icons go through this, so a button and a file input end up with the
    same glyph size and position instead of each widget sizing its own icon.
    """
    return f"""
    {_ICON_BOX}
    /* !important: bokeh's own button fill is more specific than any selector
       a stylesheet can reach the widget with */
    background: currentColor !important; box-shadow: none;
    color: inherit; cursor: pointer; opacity: 0.55; transition: opacity 0.15s ease;
    -webkit-mask: url("{mask}") center / {_ICON_GLYPH_PX}px no-repeat;
    mask: url("{mask}") center / {_ICON_GLYPH_PX}px no-repeat;
    """


def _icon_action_css(mask: str) -> str:
    """Stylesheet turning a bare Button into a flat icon of ``mask``."""
    return f"""
:host {{ margin: 0; }}
.bk-btn, .bk-btn:focus {{ {_glyph_css(mask)} }}
.bk-btn:hover {{ opacity: 1; }}
"""


# Icon-only file picker: the input loses its own chrome, font-size 0
# collapses the native "no file chosen" label, and the file-selector
# button is left as a bare upload glyph
_FILE_ICON_CSS = f"""
:host {{ width: 28px; margin: 0; }}
input[type="file"] {{
    {_ICON_BOX}
    font-size: 0; overflow: hidden; background: transparent; box-shadow: none; color: inherit;
}}
input[type="file"]::file-selector-button {{ {_glyph_css(_UPLOAD_MASK)} }}
input[type="file"]::file-selector-button:hover {{ opacity: 1; }}
"""


class _ChatSession:
    """One conversation's feed and model context."""

    def __init__(self, feed: pn.chat.ChatInterface, conversation_id: str | None = None) -> None:
        self.feed = feed
        self.conversation_id = conversation_id
        self.history: list[Any] = []


def _resolve_history_user(user_resolver: UserResolver | None) -> tuple[str, pn.viewable.Viewable | None]:
    """Resolve the history owner id and an optional cookie-persisting pane."""
    if user_resolver is not None:
        return resolve_user(user_resolver), None
    return ensure_anonymous_cookie()


class AiChat:
    """Standalone AI chat panel.

    Can be used independently in any Panel app or integrated into Panelini.
    Exposes :attr:`sidebar_objects` and :attr:`main_objects` widget lists.
    """

    def __init__(
        self,
        system_message: str = "You are a helpful assistant.",
        welcome_message: str | None = None,
        config_path: Path | None = None,
        tools: list | None = None,
        show_tools: bool = True,
        show_preview: bool = False,
        history_store: ChatHistoryStore | str | None = None,
        history_view: str = "tree",
        user_resolver: UserResolver | None = None,
        user_id: str | None = None,
        cookie_pane: pn.viewable.Viewable | None = None,
    ) -> None:
        """Initialize the AI chat frontend.

        Args:
            system_message: System message passed to the AI backend.
            welcome_message: Optional greeting posted into a new chat.
                *None* starts the chat empty.
            config_path: Optional path to a custom config.yml file.
            tools: Optional list of custom ``BaseTool`` instances to make
                available alongside the built-in tools.
            show_tools: When *False*, the "Basic Tools" sidebar card is
                hidden and tool toggles are not rendered.
            show_preview: When *True*, the preview split-pane is shown next
                to the chat; by default the chat fills the full main area.
            history_store: Per-user chat history store. Defaults to the
                shared store: SQLite at ``PANELINI_HISTORY_DB`` when set,
                otherwise in-memory for the lifetime of the process. The
                string ``"browser"`` keeps this session's history in the
                browser's localStorage instead (per-browser persistence).
            history_view: Initial history sidebar style: "tree"
                (drag-and-drop folders, the default) or "list"
                (date-grouped); a toggle switches at runtime.
            user_resolver: Optional callable resolving the history owner id;
                defaults to Panel auth user or an anonymous browser cookie.
                Only used standalone, i.e. when ``user_id`` is not given.
            user_id: Pre-resolved history owner (e.g. by Panelini); skips
                the panel's own resolution.
            cookie_pane: Cookie-persisting pane accompanying a pre-resolved
                anonymous ``user_id``, embedded in the main area.
        """
        self._show_tools = show_tools
        self._show_preview = show_preview
        self._welcome_message = welcome_message

        # Called after each persisted exchange (used by history UIs).
        self.on_history_changed: Any = None

        self._storage_pane: pn.viewable.Viewable | None = None
        history_store = self._resolve_history_store(history_store)
        # Resolve the history owner only when used standalone; embedded in
        # Panelini the pre-resolved identity is passed in
        if user_id is None:
            user_id, cookie_pane = _resolve_history_user(user_resolver)
        self._cookie_pane = cookie_pane

        # Initialize backend
        self.backend = AiBackend(
            system_message=system_message,
            config_path=config_path,
            history_store=history_store,
            user_id=user_id,
        )

        # Initialize with get_current_time + any user-supplied tools enabled by default
        from .tools.basic_tools import get_current_time_tool

        self.backend.update_tools([get_current_time_tool, *(tools or [])])

        # Initialize preview content with proper overflow handling (starts empty)
        self.preview_content = pn.pane.Markdown(
            "",
            sizing_mode="stretch_both",
            styles={
                "overflow-y": "auto",  # Vertical scroll when content is too long
                "overflow-x": "auto",  # Horizontal scroll when content is too wide
                "max-width": "100%",  # Don't exceed parent width
                "word-wrap": "break-word",  # Break long words
                "overflow-wrap": "break-word",  # Break long words (alternative)
            },
        )

        # Create provider selection widget dynamically from backend
        provider_options = self.backend.get_available_providers()
        self.provider_selector = pn.widgets.Select(
            name="Provider",
            options=provider_options,
            value=self.backend.current_provider,
            sizing_mode="stretch_width",
            margin=(5, 5, 10, 5),
        )

        # Create model selection widget (starts with current provider's models)
        initial_models = self.backend.get_available_models(self.backend.current_provider)
        self.model_selector = pn.widgets.Select(
            name="Model Selection",
            options=initial_models,
            value=self.backend.current_model,
            sizing_mode="stretch_width",
            margin=(5, 5, 10, 5),
        )

        # Temperature slider
        self.temperature_slider = pn.widgets.FloatSlider(
            name="Temperature",
            start=0.0,
            end=1.0,
            step=0.05,
            value=self.backend.current_temperature,
            sizing_mode="stretch_width",
            margin=(5, 5, 10, 5),
        )

        # Create tool selection checkboxes
        self.tool_checkboxes: dict[str, dict[str, Any]] = {}
        self.tool_checkbox_group = pn.Column(sizing_mode="stretch_width")

        all_tools = list(AVAILABLE_TOOLS)
        user_tool_names = {t.name for t in tools} if tools else set()
        if tools:
            all_tools.extend(tools)

        for tool in all_tools:
            # Enable "get_current_time" + any user-supplied tools by default
            default_enabled = tool.name == "get_current_time" or tool.name in user_tool_names
            checkbox = pn.widgets.Checkbox(
                name=tool.name.replace("_", " ").title(),
                value=default_enabled,
                sizing_mode="stretch_width",
                margin=(0, 0, 5, 0),
            )
            checkbox.param.watch(self._on_tool_change, "value")
            self.tool_checkboxes[tool.name] = {"checkbox": checkbox, "tool": tool}
            self.tool_checkbox_group.append(checkbox)

        # Flag to prevent duplicate notifications during provider changes
        self._provider_changing = False

        # Import/export and the view toggle ride along the New Chat row as
        # bare icons; each mounted view card needs its own instances, so the
        # primary set doubles as the public attributes
        primary_icons = self._make_action_icons(history_view)
        self.upload_chat_input, self.download_chat_button, self.view_toggle_button = primary_icons

        # Watch for changes
        self.provider_selector.param.watch(self._on_provider_change, "value")
        self.model_selector.param.watch(self._on_model_change, "value")
        self.temperature_slider.param.watch(self._on_temperature_change, "value")

        # One feed and model context per conversation; generations stay
        # bound to their session, so switching chats mid-response is safe
        self._sessions: dict[pn.chat.ChatInterface, _ChatSession] = {}
        self._generating_ids: set[str] = set()
        self._ready_ids: set[str] = set()  # finished while not being viewed
        self._active_session = self._new_session(welcome=True)

        # Add custom CSS to handle preview content overflow
        pn.config.raw_css.append("""
        /* Ensure preview content elements don't overflow */
        .markdown-body pre {
            overflow-x: auto !important;
            max-width: 100% !important;
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
        }

        .markdown-body table {
            display: block !important;
            overflow-x: auto !important;
            max-width: 100% !important;
        }

        .markdown-body img {
            max-width: 100% !important;
            height: auto !important;
        }

        .markdown-body code {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
        }
        """)

        # Build the sidebar and main objects
        _general_setup_items: list[pn.viewable.Viewable] = [
            pn.Card(
                title="Provider Settings",
                sizing_mode="stretch_width",
                collapsible=True,
                collapsed=False,
                objects=[
                    pn.Column(
                        self.provider_selector,
                    )
                ],
                styles={
                    "margin-top": "10px",
                    "margin-bottom": "12px",
                    "padding": "12px",
                },
            ),
            pn.Card(
                title="Model Settings",
                sizing_mode="stretch_width",
                collapsible=True,
                collapsed=False,
                objects=[
                    pn.Column(
                        self.model_selector,
                        self.temperature_slider,
                    )
                ],
                styles={
                    "margin-bottom": "12px",
                    "padding": "12px",
                },
            ),
        ]
        if show_tools:
            _general_setup_items.append(
                pn.Card(
                    title="Basic Tools",
                    sizing_mode="stretch_width",
                    collapsible=True,
                    collapsed=False,
                    objects=[
                        pn.Column(
                            pn.pane.Markdown("**Enable tools for the assistant:**", margin=(0, 0, 10, 0)),
                            self.tool_checkbox_group,
                        )
                    ],
                    styles={
                        "margin-bottom": "12px",
                        "padding": "12px",
                    },
                )
            )
        self._history_store = history_store
        self._history_view = history_view
        self._history_panel = self._build_history_panel(history_store, history_view, primary_icons)
        self._history_panels: dict[str, Any] = {history_view: self._history_panel}
        # Icon tabs: setup leftmost, conversations active by default.
        # dynamic=True must not be used: it re-renders panes on switch
        # and breaks Card expand/collapse bindings (Panel bug, verified)
        self._chat_tab = pn.Column(
            self._history_panel.card,
            sizing_mode="stretch_width",
            margin=0,
        )
        _chat_tab = self._chat_tab
        # The setting cards sit directly in their pane, without a wrapper card
        _setup_tab = pn.Column(*_general_setup_items, sizing_mode="stretch_width", margin=0)
        # No sizing_mode on the Tabs: Panelini assigns a fixed width to
        # sidebar objects, and stretch_width would override it and let
        # the tabs hug each pane's content (width jumps between tabs)
        self._sidebar_objects = [
            pn.Tabs(
                ("⚙️", _setup_tab),
                ("\U0001f4ac", _chat_tab),
                active=1,
                css_classes=["ai-sidebar-tabs"],
                stylesheets=[_TABS_CSS],
            )
        ]

        # Build the chat card; its content swaps to the active session's feed
        self._chat_card = pn.Card(
            title="Chat",
            collapsible=False,
            objects=[self._active_session.feed],
            sizing_mode="stretch_both",
            min_height=350,
            styles={"padding": "15px", "margin-right": "10px"},
        )
        chat_card = self._chat_card

        # Build the preview card
        preview_card = pn.Card(
            title="Preview",
            collapsible=False,
            objects=[self.preview_content],
            sizing_mode="stretch_both",
            min_height=350,
            styles={
                "padding": "15px",
                "margin-left": "10px",
                "overflow": "hidden",
            },
        )

        # Two-column layout (or single-column when preview is disabled)
        if show_preview:
            main_layout = pn.Row(
                chat_card,
                preview_card,
                sizing_mode="stretch_both",
                min_height=350,
            )
        else:
            main_layout = pn.Row(
                chat_card,
                sizing_mode="stretch_both",
                min_height=350,
            )

        self._main_objects: list[pn.viewable.Viewable] = [main_layout]
        if self._cookie_pane is not None:
            self._main_objects.append(self._cookie_pane)
        if self._storage_pane is not None:
            self._main_objects.append(self._storage_pane)

    # ── Public properties ────────────────────────────────────────────────

    @property
    def chat_interface(self) -> pn.chat.ChatInterface:
        """The active conversation's chat feed."""
        return self._active_session.feed

    @property
    def sidebar_objects(self) -> list[pn.viewable.Viewable]:
        """Sidebar cards (provider, model, tools, chat management)."""
        return list(self._sidebar_objects)

    @property
    def main_objects(self) -> list[pn.viewable.Viewable]:
        """Main area content (chat + preview two-column layout)."""
        return list(self._main_objects)

    def _make_action_icons(self, current_view: str) -> list[Any]:
        """Create one view's New Chat row icons: upload, download, view toggle.

        Every mounted view card needs its own widget instances (a widget
        cannot sit in two containers); all sets share the same handlers.
        """
        upload = pn.widgets.FileInput(
            accept=".json",
            width=28,
            # bottom margin matches the New Chat button, so centering lands
            # on its axis and not on the row's
            margin=(0, 0, 4, 4),
            align="center",
            stylesheets=[_FILE_ICON_CSS],
            css_classes=["chat-upload"],
        )
        upload.param.watch(self._on_upload_chat, "value")
        download = pn.widgets.Button(
            width=28,
            margin=(0, 0, 4, 4),
            align="center",
            stylesheets=[_icon_action_css(_DOWNLOAD_MASK)],
            css_classes=["chat-download"],
            description="Download chat (JSON)",
        )
        download.on_click(self._on_download_chat)
        # the toggle shows the view it switches to
        to_tree = current_view == "list"
        toggle = pn.widgets.Button(
            width=28,
            margin=(0, 0, 4, 4),
            align="center",
            stylesheets=[_icon_action_css(_TREE_MASK if to_tree else _LIST_MASK)],
            css_classes=["history-view-toggle"],
            description="Switch to folder tree" if to_tree else "Switch to list",
        )
        toggle.on_click(self._toggle_history_view)
        return [upload, download, toggle]

    def _toggle_history_view(self, event: Any = None) -> None:
        """Flip between the list and tree view (session state only).

        The other view is built lazily on first switch, then both cards stay
        mounted and only ``visible`` flips (re-attaching would double-mount).
        The typed search query carries over so switching keeps the filter.
        """
        _ = event
        target = "tree" if self._history_view == "list" else "list"
        current = self._history_panel
        panel = self._history_panels.get(target)
        if panel is None:
            panel = self._build_history_panel(self._history_store, target, self._make_action_icons(target))
            panel.card.visible = False
            self._history_panels[target] = panel
            self._chat_tab.append(panel.card)
        query = current.search_input.value_input or current.search_input.value
        panel.search_input.value = query
        panel.search_input.value_input = query
        panel.refresh()
        current.card.visible = False
        panel.card.visible = True
        self._history_panel = panel
        self._history_view = target

    def _build_history_panel(self, history_store: ChatHistoryStore, history_view: str, actions: list[Any]) -> Any:
        """Build the history sidebar component: date-grouped list or folder tree."""
        user_id = self.backend.user_id
        if user_id is None:  # resolved in __init__ before this runs
            msg = "History panel requires a resolved user."
            raise ValueError(msg)
        common = {
            "store": history_store,
            "user_id": user_id,
            "on_open": self.open_conversation,
            "on_new_chat": self.start_new_chat,
            "get_active_id": lambda: self.backend.conversation_id,
            "get_busy_ids": lambda: self._generating_ids,
            "get_ready_ids": lambda: self._ready_ids,
            "actions": actions,
        }
        if history_view == "tree":
            from .history.tree import HistoryTree

            return HistoryTree(**common)
        from .history.panel import HistoryPanel

        return HistoryPanel(**common)

    # ── Session management ───────────────────────────────────────────────

    def _new_session(self, welcome: bool = False, conversation_id: str | None = None) -> "_ChatSession":
        feed = pn.chat.ChatInterface(
            callback=self._handle_message,
            callback_user="🤖 Assistant",
            placeholder_text="💭 Thinking...",
            placeholder_threshold=0.2,
            user="🧑 User",
            min_width=330,
            show_send=True,
            show_rerun=False,
            show_undo=False,
            show_timestamp=False,
            show_button_name=False,
            show_reaction_icons=False,
            callback_exception="verbose",
            css_classes=["chat-interface"],
            sizing_mode="stretch_both",
        )
        if welcome and self._welcome_message:
            feed.send(value=self._welcome_message, user="🤖 Assistant", respond=False)
        session = _ChatSession(feed=feed, conversation_id=conversation_id)
        self._sessions[feed] = session
        return session

    def _activate_session(self, session: "_ChatSession") -> None:
        self._active_session = session
        self.backend.conversation_id = session.conversation_id
        if session.conversation_id is not None:
            self._ready_ids.discard(session.conversation_id)  # viewed
        if hasattr(self, "_chat_card"):
            # Feeds stay mounted and only toggle visibility: re-attaching an
            # already-registered component triggers Bokeh "reference already
            # known" warnings and re-renders on every switch
            if session.feed not in self._chat_card.objects:
                self._chat_card.append(session.feed)
            for feed in self._chat_card.objects:
                feed.visible = feed is session.feed

    def _session_for_conversation(self, conversation_id: str) -> "_ChatSession | None":
        for session in self._sessions.values():
            if session.conversation_id == conversation_id:
                return session
        return None

    # ── Private helpers ──────────────────────────────────────────────────

    def _update_preview_content(self, title: str, content: str) -> None:
        """Update the preview window with markdown content.

        Args:
            title: Title for the preview
            content: Markdown content to display
        """
        if not self._show_preview:
            return
        # Check if content already starts with a heading to avoid duplicates
        if content.strip().startswith("#"):
            self.preview_content.object = content
        else:
            self.preview_content.object = f"# {title}\n\n{content}"

    def _get_selected_tools(self) -> list:
        """Get list of currently selected tools.

        Returns:
            List of enabled tool instances
        """
        selected_tools = []
        for tool_info in self.tool_checkboxes.values():
            if tool_info["checkbox"].value:
                selected_tools.append(tool_info["tool"])
        return selected_tools

    def _on_provider_change(self, event: Any) -> None:
        """Handle provider selection changes."""
        self._provider_changing = True

        new_models = self.backend.get_available_models(event.new)
        self.model_selector.options = new_models
        self.model_selector.value = next(iter(new_models.values()))

        provider_display_name, model_name = self.backend.update_provider(event.new)

        # Provider switch clears the active session's model context; the
        # stored conversation stays intact, new messages open a fresh one
        self._active_session.history.clear()
        self._active_session.conversation_id = None

        self.chat_interface.send(
            f"Switched to **{provider_display_name}** provider with model `{model_name}`. Conversation history cleared.",
            user="⚙️ System",
            respond=False,
        )

        self._provider_changing = False

    def _on_model_change(self, event: Any) -> None:
        """Handle model selection changes."""
        if self._provider_changing:
            return

        model_name = self.backend.update_model(event.new)

        self.chat_interface.send(
            f"Switched to model `{model_name}`. Conversation history preserved.",
            user="⚙️ System",
            respond=False,
        )

    def _on_temperature_change(self, event: Any) -> None:
        """Handle temperature slider changes."""
        self.backend.update_temperature(event.new)

    def _on_tool_change(self, event: Any) -> None:
        """Handle tool selection changes.

        Suppressed when _suppress_tool_notifications is True
        (for bulk updates from external tool trees).
        """
        _ = event

        if getattr(self, "_suppress_tool_notifications", False):
            return

        tool_count = self.backend.update_tools(self._get_selected_tools())

        self.chat_interface.send(
            f"Tools updated. {tool_count} tool(s) now available. Conversation history preserved.",
            user="⚙️ System",
            respond=False,
        )

    def batch_update_tools(self, tool_names_checked: set[str]) -> int:
        """Update tool checkboxes in bulk without chat spam.

        Sets checkbox values, updates backend once, sends a
        single notification. Returns the number of enabled tools.

        Args:
            tool_names_checked: Set of tool names to enable.
                All others are disabled.
        """
        self._suppress_tool_notifications = True
        try:
            for name, info in self.tool_checkboxes.items():
                info["checkbox"].value = name in tool_names_checked
        finally:
            self._suppress_tool_notifications = False

        tool_count = self.backend.update_tools(
            self._get_selected_tools(),
        )
        return tool_count

    def start_new_chat(self) -> None:
        """Switch to a fresh conversation; stored conversations stay intact.

        The conversation row is created immediately so it appears (and is
        selected) in the sidebar right away.
        """
        self.backend.start_new_conversation()
        session = self._new_session(welcome=True)
        session.conversation_id = self.backend.create_conversation_id()
        self._activate_session(session)

    def open_conversation(self, conversation_id: str) -> None:
        """Show a stored conversation in its own feed (created on first open)."""
        session = self._session_for_conversation(conversation_id)
        if session is None:
            pairs = self.backend.load_conversation(conversation_id)
            session = self._new_session(conversation_id=conversation_id)
            session.history = self.backend.history_from_pairs(pairs)
            for role, content in pairs:
                user = "🧑 User" if role == "human" else "🤖 Assistant"
                session.feed.send(content, user=user, respond=False)
        self._activate_session(session)

    def _resolve_history_store(self, history_store: ChatHistoryStore | str | None) -> ChatHistoryStore:
        """Resolve the store argument to an instance.

        The string ``"browser"`` builds a per-session store persisting into
        the page's localStorage; its pane rides along in the main area.
        *None* falls back to the shared default store.
        """
        if isinstance(history_store, str):
            if history_store != "browser":
                msg = f"Unknown history_store {history_store!r}; expected 'browser' or a ChatHistoryStore."
                raise ValueError(msg)
            from .history.local_storage_store import LocalStorageHistoryStore

            browser_store = LocalStorageHistoryStore()
            browser_store.on_loaded = self._notify_history_changed
            self._storage_pane = browser_store.pane
            return browser_store
        return history_store if history_store is not None else default_history_store()

    def _notify_history_changed(self) -> None:
        self._history_panel.refresh()
        if self.on_history_changed is not None:
            self.on_history_changed()

    def _on_download_chat(self, event: Any) -> None:
        """Handle download chat button click."""
        import base64
        import json
        from datetime import datetime

        _ = event

        provider_name = self.backend.get_provider_display_name(self.backend.current_provider)
        chat_data = self.backend.export_chat_data(
            provider=provider_name,
            model=self.backend.current_model.value,
            temperature=self.backend.current_temperature,
        )

        json_str = json.dumps(chat_data, indent=2, ensure_ascii=False)

        filename = f"chat_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        b64 = base64.b64encode(json_str.encode()).decode()
        download_html = f'<a href="data:application/json;base64,{b64}" download="{filename}">Download {filename}</a>'

        self.chat_interface.send(
            download_html,
            user="⚙️ System",
            respond=False,
        )

    def _on_upload_chat(self, event: Any) -> None:
        """Handle chat upload from JSON file (v2 document or legacy format)."""
        import json

        if not event.new:
            return

        source = event.obj  # either view's upload icon
        try:
            filename = source.filename if getattr(source, "filename", None) else "unknown"

            chat_data = json.loads(event.new.decode("utf-8"))
            pairs = self.backend.restore_chat_data(chat_data)

            self.chat_interface.clear()
            for role, content in pairs:
                user = "🧑 User" if role == "human" else "🤖 Assistant"
                self.chat_interface.send(content, user=user, respond=False)

            title = chat_data.get("title") or f"Imported: {filename}"
            self.backend.persist_imported_history(title=title)
            self._active_session.history = list(self.backend.get_conversation_history())
            self._active_session.conversation_id = self.backend.conversation_id
            self._notify_history_changed()

            self.chat_interface.send(
                f"Chat restored from JSON ({len(pairs)} messages).",
                user="⚙️ System",
                respond=False,
            )

            pn.state.execute(lambda: setattr(source, "value", b""))

        except Exception as e:
            self.chat_interface.send(
                f"Error restoring chat: {e!s}",
                user="⚙️ System",
                respond=False,
            )
            pn.state.execute(lambda: setattr(source, "value", b""))

    async def _handle_message(
        self, contents: str, user: str, instance: pn.chat.ChatInterface
    ) -> AsyncGenerator[str, None]:
        """Handle incoming messages, yielding streaming updates or final responses.

        When no tools are selected the response is streamed token-by-token inside
        a collapsed ``<details>`` block.  Once generation is complete the final
        response is yielded normally (expanded, no wrapper).

        When tools are selected, streaming is not feasible (multi-step tool loop),
        so only the placeholder is shown until the final response is ready.

        Args:
            contents: The user's message
            user: The user identifier (unused but required by Panel)
            instance: The ChatInterface instance (unused but required by Panel)
        """
        _ = user

        use_tools = len(self._get_selected_tools()) > 0

        # The exchange is bound to the session whose feed fired it: its own
        # model context and its own stored conversation. Switching chats
        # mid-response therefore cannot reroute messages.
        session = self._sessions.get(instance, self._active_session)
        if session.conversation_id is None:
            session.conversation_id = self.backend.create_conversation_id()
            if session is self._active_session:
                self.backend.conversation_id = session.conversation_id

        if session.conversation_id is not None:
            self._generating_ids.add(session.conversation_id)
            self._notify_history_changed()  # row appears with its busy indicator
        try:
            if not use_tools and self.backend.ai_interface:
                full = ""
                async for chunk in self.backend.stream_message(contents, history=session.history):
                    full += chunk
                    yield (f"<details>\n<summary>Generating response...</summary>\n\n{full}\n\n</details>")
                yield full
                self.backend.persist_exchange(contents, full, conversation_id=session.conversation_id)
            else:
                result = await self.backend.process_message(contents, use_tools=use_tools, history=session.history)
                for preview_update in result.get("preview_updates", []):
                    self._update_preview_content(preview_update["title"], preview_update["content"])
                yield result["response"]
                self.backend.persist_exchange(contents, result["response"], conversation_id=session.conversation_id)
        finally:
            if session.conversation_id is not None:
                self._generating_ids.discard(session.conversation_id)
                if session is not self._active_session:
                    # done while the user was in another chat: flag as ready
                    self._ready_ids.add(session.conversation_id)
        self._notify_history_changed()
