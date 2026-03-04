"""Frontend UI layer for the AI chat component."""

from collections.abc import AsyncGenerator
from pathlib import Path
from typing import Any

import panel as pn

from .backend import AiBackend
from .tools.basic_tools import AVAILABLE_TOOLS

_DEFAULT_WELCOME = """Hello! 👋

I'm your AI Assistant, here to help you with tasks such as:

🕐 Timestamping data and records
📝 Summarizing or formatting notes
📊 Generating reports and previews

Feel free to ask me anything!

What would you like to work on?"""


class Frontend:
    """Frontend class for the AI chat component.

    This is a *component* — it does **not** create its own :class:`Panelini`
    instance.  Instead it exposes :attr:`sidebar_objects` and
    :attr:`main_objects` that the caller can feed into an existing Panelini.
    """

    def __init__(
        self,
        system_message: str = "You are a helpful assistant.",
        welcome_message: str | None = None,
        config_path: Path | None = None,
    ) -> None:
        """Initialize the AI chat frontend.

        Args:
            system_message: System message passed to the AI backend.
            welcome_message: Initial greeting shown in the chat. Uses a
                default if *None*.
            config_path: Optional path to a custom config.yml file.
        """
        # Initialize backend
        self.backend = AiBackend(
            system_message=system_message,
            config_path=config_path,
        )

        # Initialize with get_current_time tool enabled by default
        from .tools.basic_tools import get_current_time_tool

        self.backend.update_tools([get_current_time_tool])

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

        for tool in AVAILABLE_TOOLS:
            # Enable "get_current_time" tool by default
            default_enabled = tool.name == "get_current_time"
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

        # Create chat management buttons
        self.clear_chat_button = pn.widgets.Button(
            name="Clear Chat & History",
            button_type="danger",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self.clear_chat_button.on_click(self._on_clear_chat)

        self.download_chat_button = pn.widgets.Button(
            name="Download Chat (JSON)",
            button_type="primary",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self.download_chat_button.on_click(self._on_download_chat)

        self.upload_chat_input = pn.widgets.FileInput(
            accept=".json",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self.upload_chat_input.param.watch(self._on_upload_chat, "value")

        # Display for uploaded filename
        self.uploaded_filename_display = pn.pane.HTML(
            "",
            sizing_mode="stretch_width",
            margin=(0, 5, 5, 5),
        )

        # Watch for changes
        self.provider_selector.param.watch(self._on_provider_change, "value")
        self.model_selector.param.watch(self._on_model_change, "value")
        self.temperature_slider.param.watch(self._on_temperature_change, "value")

        # Create chat interface
        self.chat_interface = pn.chat.ChatInterface(
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
        self._sidebar_objects = [
            pn.Card(
                title="General Setup",
                collapsible=True,
                collapsed=False,
                objects=[
                    pn.Card(
                        title="Provider Settings",
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
                    pn.Card(
                        title="Basic Tools",
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
                    ),
                    pn.Card(
                        title="Chat Management",
                        collapsible=True,
                        collapsed=False,
                        objects=[
                            pn.Column(
                                pn.pane.Markdown("**Manage conversation:**", margin=(0, 0, 10, 0)),
                                self.clear_chat_button,
                                pn.pane.Markdown("**Export/Import:**", margin=(10, 0, 5, 0)),
                                self.download_chat_button,
                                pn.pane.Markdown("**Restore from JSON:**", margin=(10, 0, 5, 0)),
                                self.upload_chat_input,
                                self.uploaded_filename_display,
                            )
                        ],
                        styles={
                            "margin-bottom": "10px",
                            "padding": "12px",
                        },
                    ),
                ],
                styles={"padding": "8px"},
            ),
        ]

        # Build the chat card
        chat_card = pn.Card(
            title="Chat",
            collapsible=False,
            objects=[self.chat_interface],
            sizing_mode="stretch_both",
            min_height=600,
            styles={"padding": "15px", "margin-right": "10px"},
        )

        # Build the preview card
        preview_card = pn.Card(
            title="Preview",
            collapsible=False,
            objects=[self.preview_content],
            sizing_mode="stretch_both",
            min_height=600,
            styles={
                "padding": "15px",
                "margin-left": "10px",
                "overflow": "hidden",
            },
        )

        # Two-column layout
        main_layout = pn.Row(
            chat_card,
            preview_card,
            sizing_mode="stretch_both",
            min_height=600,
            margin=(10, 15, 10, 15),
        )

        self._main_objects: list[pn.viewable.Viewable] = [main_layout]

        # Send welcome message from assistant
        self.chat_interface.send(
            value=welcome_message or _DEFAULT_WELCOME,
            user="🤖 Assistant",
            respond=False,
        )

    # ── Public properties ────────────────────────────────────────────────

    @property
    def sidebar_objects(self) -> list[pn.viewable.Viewable]:
        """Sidebar cards (provider, model, tools, chat management)."""
        return list(self._sidebar_objects)

    @property
    def main_objects(self) -> list[pn.viewable.Viewable]:
        """Main area content (chat + preview two-column layout)."""
        return list(self._main_objects)

    # ── Private helpers ──────────────────────────────────────────────────

    def _update_preview_content(self, title: str, content: str) -> None:
        """Update the preview window with markdown content.

        Args:
            title: Title for the preview
            content: Markdown content to display
        """
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
        """Handle tool selection changes."""
        _ = event

        tool_count = self.backend.update_tools(self._get_selected_tools())

        self.chat_interface.send(
            f"Tools updated. {tool_count} tool(s) now available. Conversation history preserved.",
            user="⚙️ System",
            respond=False,
        )

    def _on_clear_chat(self, event: Any) -> None:
        """Handle clear chat & history button click."""
        _ = event

        self.backend.clear_history()
        self.chat_interface.clear()

        self.chat_interface.send(
            "Chat and conversation history cleared.",
            user="⚙️ System",
            respond=False,
        )

    def _on_download_chat(self, event: Any) -> None:
        """Handle download chat button click."""
        import base64
        import json
        from datetime import datetime

        _ = event

        messages = []
        for msg in self.chat_interface.objects:
            if hasattr(msg, "object") and hasattr(msg, "user"):
                messages.append({"user": msg.user, "content": str(msg.object)})

        provider_name = self.backend.get_provider_display_name(self.backend.current_provider)
        chat_data = self.backend.export_chat_data(
            provider=provider_name,
            model=self.backend.current_model.value,
            temperature=self.backend.current_temperature,
            messages=messages,
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
        """Handle chat upload from JSON file."""
        import json

        if not event.new:
            return

        try:
            filename = self.upload_chat_input.filename if hasattr(self.upload_chat_input, "filename") else "unknown"

            content = event.new.decode("utf-8")
            chat_data = json.loads(content)

            self.chat_interface.clear()

            for msg in chat_data.get("messages", []):
                self.chat_interface.send(msg["content"], user=msg["user"], respond=False)

            self.backend.restore_chat_data(chat_data)

            self.uploaded_filename_display.object = (
                f'<span style="font-size: 0.85em; color: black;">Restored: <code>{filename}</code></span>'
            )

            self.chat_interface.send(
                f"Chat restored from JSON ({len(chat_data.get('messages', []))} messages).",
                user="⚙️ System",
                respond=False,
            )

            pn.state.execute(lambda: setattr(self.upload_chat_input, "value", b""))

        except Exception as e:
            self.chat_interface.send(
                f"Error restoring chat: {e!s}",
                user="⚙️ System",
                respond=False,
            )
            pn.state.execute(lambda: setattr(self.upload_chat_input, "value", b""))

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
        _ = (user, instance)

        use_tools = len(self._get_selected_tools()) > 0

        if not use_tools and self.backend.ai_interface:
            full = ""
            async for chunk in self.backend.stream_message(contents):
                full += chunk
                yield (f"<details>\n<summary>Generating response...</summary>\n\n{full}\n\n</details>")
            yield full
        else:
            result = await self.backend.process_message(contents, use_tools=use_tools)
            for preview_update in result.get("preview_updates", []):
                self._update_preview_content(preview_update["title"], preview_update["content"])
            yield result["response"]
