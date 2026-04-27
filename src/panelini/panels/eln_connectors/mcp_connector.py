from __future__ import annotations

from typing import Callable

import panel as pn
from langchain.tools import BaseTool

from panelini.mcp.client.osw.client import McpConnectionError, OswMcpClient
from panelini.panels.eln_connectors.osw.connector import OswConnector


class McpElnConnector:
    """Unified ELN connector widget — direct (OswConnector) or MCP (OswMcpClient) mode.

    Fires on_tools_changed(tools) whenever the active tool set changes.
    Drop-in compatible with OswConnector: exposes .tools, .sidebar_objects, .main_objects.
    Extensible for additional ELN types via the ELN type selector.
    """

    def __init__(
        self,
        on_tools_changed: Callable[[list[BaseTool]], None] | None = None,
    ) -> None:
        self._on_tools_changed = on_tools_changed
        self._tools: list[BaseTool] = []
        self._all_mcp_tools: list[BaseTool] = []

        self._eln_type_select = pn.widgets.Select(name="ELN Type", options=["osw"], value="osw", width=200)
        self._mode_select = pn.widgets.RadioButtonGroup(name="Mode", options=["direct", "mcp"], value="direct")
        self._osw_connector = OswConnector(on_tools_changed=self._on_child_tools_changed)

        self._server_url_input = pn.widgets.TextInput(
            name="Server URL", placeholder="http://localhost:8765/sse", width=300
        )
        self._connect_btn = pn.widgets.Button(name="Connect", button_type="primary")
        self._disconnect_btn = pn.widgets.Button(name="Disconnect", button_type="danger", visible=False)
        self._status_pane = pn.pane.HTML("⚫ Disconnected")
        self._tool_checkbox = pn.widgets.CheckBoxGroup(name="Tools", options=[], value=[])

        self._mode_select.param.watch(self._on_mode_change, "value")
        self._connect_btn.on_click(self._on_mcp_connect)
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

    def _on_mode_change(self, event) -> None:
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
                pn.Row(self._connect_btn, self._disconnect_btn),
                self._status_pane,
                self._tool_checkbox,
            ]

    def _on_mcp_connect(self, event) -> None:
        self._status_pane.object = "⏳ Connecting..."
        try:
            client = OswMcpClient(server_url=self._server_url_input.value)
            tools = client.get_tools_sync()
            self._all_mcp_tools = tools
            self._tool_checkbox.options = [t.name for t in tools]
            self._tool_checkbox.value = [t.name for t in tools]
            self._connect_btn.visible = False
            self._disconnect_btn.visible = True
            self._status_pane.object = "🟢 Connected"
        except McpConnectionError as e:
            self._status_pane.object = f"🔴 {e}"

    def _do_mcp_disconnect(self) -> None:
        self._all_mcp_tools = []
        self._tool_checkbox.options = []
        self._tool_checkbox.value = []
        self._connect_btn.visible = True
        self._disconnect_btn.visible = False
        self._status_pane.object = "⚫ Disconnected"

    def _on_mcp_disconnect(self, event) -> None:
        self._do_mcp_disconnect()
        self._tools = []
        if self._on_tools_changed:
            self._on_tools_changed([])

    def _on_tool_selection_changed(self, event) -> None:
        selected = set(event.new)
        self._tools = [t for t in self._all_mcp_tools if t.name in selected]
        if self._on_tools_changed:
            self._on_tools_changed(self._tools)
