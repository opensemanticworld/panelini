from __future__ import annotations

import threading
from typing import Any, Callable

import panel as pn
from langchain.tools import BaseTool

from panelini.mcp.client.osw.client import McpConnectionError, OswMcpClient
from panelini.panels.eln_connectors.osw.connector import OswConnector

MCP_SYSTEM_MESSAGE = (
    "You are a helpful assistant with access to OSW (OpenSemanticWorld) ELN tools.\n\n"
    "## MANDATORY RULES — never break these:\n"
    "1. ALWAYS call the relevant tool immediately when the user asks about any entity, "
    "category, property, page, or concept — do NOT answer from your own knowledge.\n"
    "2. NEVER ask the user for an OSW ID. Use search or taxonomy tools to discover IDs.\n"
    "3. NEVER claim 'technical difficulties', 'internal errors', or that tools are "
    "unavailable — just call them.\n"
    "4. NEVER describe what a tool call would look like — execute it.\n"
    "5. If a tool returns an error, report the exact error to the user and try an "
    "alternative approach.\n"
)


class McpElnConnector:
    """Unified ELN connector widget — direct (OswConnector) or MCP (OswMcpClient) mode.

    Fires on_tools_changed(tools) whenever the active tool set changes.
    Drop-in compatible with OswConnector: exposes .tools, .sidebar_objects, .main_objects.
    Extensible for additional ELN types via the ELN type selector.
    """

    def __init__(
        self,
        on_tools_changed: Callable[[list[BaseTool]], None] | None = None,
        initial_mode: str = "direct",
        server_url: str = "",
    ) -> None:
        self._on_tools_changed = on_tools_changed
        self._tools: list[BaseTool] = []
        self._all_mcp_tools: list[BaseTool] = []
        self._connect_cancelled = False
        self._connect_thread: threading.Thread | None = None

        self._eln_type_select = pn.widgets.Select(
            name="ELN Type", options=["osw"], value="osw", sizing_mode="stretch_width"
        )
        self._mode_select = pn.widgets.RadioButtonGroup(
            name="Mode", options=["direct", "mcp"], value=initial_mode, sizing_mode="stretch_width"
        )
        self._osw_connector = OswConnector(on_tools_changed=self._on_child_tools_changed)

        self._server_url_input = pn.widgets.TextInput(
            name="Server URL",
            placeholder="http://localhost:8765",
            value=server_url,
            sizing_mode="stretch_width",
        )
        self._connect_btn = pn.widgets.Button(name="Connect", button_type="primary", sizing_mode="stretch_width")
        self._cancel_btn = pn.widgets.Button(
            name="Cancel", button_type="warning", visible=False, sizing_mode="stretch_width"
        )
        self._disconnect_btn = pn.widgets.Button(
            name="Disconnect", button_type="danger", visible=False, sizing_mode="stretch_width"
        )
        self._status_pane = pn.pane.HTML("⚫ Disconnected")
        self._tool_checkbox = pn.widgets.CheckBoxGroup(name="Tools", options=[], value=[])

        self._mode_select.param.watch(self._on_mode_change, "value")
        self._connect_btn.on_click(self._on_mcp_connect)
        self._cancel_btn.on_click(self._on_cancel_connect)
        self._disconnect_btn.on_click(self._on_mcp_disconnect)
        self._tool_checkbox.param.watch(self._on_tool_selection_changed, "value")

        self._sidebar_objects: list = []
        self._rebuild_sidebar()

    @property
    def tools(self) -> list[BaseTool]:
        return self._tools

    @property
    def sidebar_objects(self) -> list:
        return self._sidebar_objects

    @property
    def main_objects(self) -> list:
        return []

    def _on_child_tools_changed(self, tools: list[BaseTool]) -> None:
        self._tools = tools
        if self._on_tools_changed:
            self._on_tools_changed(tools)

    def _on_mode_change(self, event: Any) -> None:
        if event.old == "direct":
            # Suppress child callback so disconnect() doesn't double-fire on_tools_changed
            self._osw_connector.on_tools_changed = None
            self._osw_connector.disconnect()
            self._osw_connector.on_tools_changed = self._on_child_tools_changed
        elif event.old == "mcp":
            self._do_mcp_disconnect()
        self._tools = []
        if self._on_tools_changed:
            self._on_tools_changed([])
        self._rebuild_sidebar()

    def _rebuild_sidebar(self) -> None:
        if self._mode_select.value == "direct":
            self._sidebar_objects = [
                self._eln_type_select,
                self._mode_select,
                *self._osw_connector.sidebar_objects,
            ]
        else:
            self._sidebar_objects = [
                self._eln_type_select,
                self._mode_select,
                self._server_url_input,
                pn.Row(
                    self._connect_btn,
                    self._cancel_btn,
                    self._disconnect_btn,
                    sizing_mode="stretch_width",
                ),
                self._status_pane,
                self._tool_checkbox,
            ]

    @staticmethod
    def _normalise_server_url(url: str) -> str:
        url = url.rstrip("/")
        if not url.endswith("/sse"):
            url = f"{url}/sse"
        return url

    def _on_mcp_connect(self, event: Any) -> None:
        self._status_pane.object = "⏳ Connecting..."
        self._connect_btn.visible = False
        self._cancel_btn.visible = True
        self._connect_cancelled = False

        def _do_connect() -> None:
            try:
                client = OswMcpClient(server_url=self._normalise_server_url(self._server_url_input.value))
                tools = client.get_tools_sync()
                if self._connect_cancelled:
                    return
                self._all_mcp_tools = tools
                self._tool_checkbox.options = [t.name for t in tools]
                self._tool_checkbox.value = [t.name for t in tools]
                self._cancel_btn.visible = False
                self._disconnect_btn.visible = True
                self._status_pane.object = "🟢 Connected"
            except McpConnectionError as e:
                if not self._connect_cancelled:
                    self._cancel_btn.visible = False
                    self._connect_btn.visible = True
                    self._status_pane.object = f"🔴 {e}"

        self._connect_thread = threading.Thread(target=_do_connect, daemon=True)
        self._connect_thread.start()

    def _on_cancel_connect(self, event: Any) -> None:
        self._connect_cancelled = True
        self._cancel_btn.visible = False
        self._connect_btn.visible = True
        self._status_pane.object = "⚫ Disconnected"

    def _do_mcp_disconnect(self) -> None:
        self._all_mcp_tools = []
        self._tool_checkbox.options = []
        self._tool_checkbox.value = []
        self._connect_btn.visible = True
        self._cancel_btn.visible = False
        self._disconnect_btn.visible = False
        self._status_pane.object = "⚫ Disconnected"

    def _on_mcp_disconnect(self, event: Any) -> None:
        self._do_mcp_disconnect()
        self._tools = []
        if self._on_tools_changed:
            self._on_tools_changed([])

    def _on_tool_selection_changed(self, event: Any) -> None:
        selected = set(event.new)
        self._tools = [t for t in self._all_mcp_tools if t.name in selected]
        if self._on_tools_changed:
            self._on_tools_changed(self._tools)
