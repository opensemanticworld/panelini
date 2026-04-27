"""OSW connector panel with connection management UI.

:class:`OswConnector` is a standalone panel that exposes
:attr:`sidebar_objects` and :attr:`main_objects` for integration into
Panelini or any Panel app. It manages OSW credentials, connection
lifecycle, and tool creation/teardown.

Architecture note: the connector uses a **callback pattern** for tool
registration (``on_tools_changed``). When connected, it fires the
callback with its tool list; when disconnected, with ``[]``. This keeps
the connector and AI chat panel fully decoupled.
"""

from __future__ import annotations

import os
from collections.abc import Callable
from typing import Any

import panel as pn
from langchain_core.tools import BaseTool

from .connection import OswConnection
from .tools.osw_tools import make_osw_tools


class OswConnector:
    """OSW connector panel with connection UI and tool registry.

    Can be used independently in any Panel app or integrated into Panelini.
    Exposes :attr:`sidebar_objects` and :attr:`main_objects` widget lists.
    """

    def __init__(
        self,
        on_tools_changed: Callable[[list[BaseTool]], None] | None = None,
        title: str = "OSW Connector",
    ) -> None:
        self._on_tools_changed = on_tools_changed
        self._title = title
        self._connection: OswConnection | None = None
        self._tools: list[BaseTool] = []
        self._tool_checkboxes: dict[str, dict[str, Any]] = {}

        self._domain_input = pn.widgets.TextInput(
            name="Domain",
            value=os.environ.get("OSW_DOMAIN", ""),
            placeholder="e.g. wiki.2.2.2.2.sslip.io",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self._username_input = pn.widgets.TextInput(
            name="Username",
            value=os.environ.get("OSW_USER", ""),
            placeholder="Bot or user name",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self._password_input = pn.widgets.PasswordInput(
            name="Password",
            value=os.environ.get("OSW_PASSWORD", ""),
            placeholder="Password",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )

        self._blazegraph_endpoint_input = pn.widgets.TextInput(
            name="Blazegraph Endpoint",
            value=os.environ.get("BLAZEGRAPH_ENDPOINT", ""),
            placeholder="https://example.org/blazegraph/sparql",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self._blazegraph_user_input = pn.widgets.TextInput(
            name="Blazegraph User",
            value=os.environ.get("BLAZEGRAPH_USER", ""),
            placeholder="SPARQL auth user",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )
        self._blazegraph_password_input = pn.widgets.PasswordInput(
            name="Blazegraph Password",
            value=os.environ.get("BLAZEGRAPH_PASSWORD", ""),
            placeholder="SPARQL auth password",
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )

        self._connect_button = pn.widgets.Button(
            name="Connect",
            button_type="success",
            sizing_mode="stretch_width",
            margin=(10, 5, 5, 5),
        )
        self._connect_button.on_click(self._on_connect_click)

        self._status_indicator = pn.pane.HTML(
            self._status_html(connected=False),
            sizing_mode="stretch_width",
            margin=(5, 5, 5, 5),
        )

        self._tool_checkbox_group = pn.Column(sizing_mode="stretch_width", margin=(5, 5, 5, 5))

        self._blazegraph_card = pn.Card(
            title="SPARQL / Blazegraph",
            collapsible=True,
            collapsed=True,
            objects=[
                pn.Column(
                    self._blazegraph_endpoint_input,
                    self._blazegraph_user_input,
                    self._blazegraph_password_input,
                )
            ],
            styles={"margin-bottom": "8px", "padding": "8px"},
        )

        self._sidebar_objects = [
            pn.Card(
                title=self._title,
                collapsible=True,
                collapsed=False,
                objects=[
                    pn.Column(
                        self._domain_input,
                        self._username_input,
                        self._password_input,
                        self._blazegraph_card,
                        self._connect_button,
                        self._status_indicator,
                        self._tool_checkbox_group,
                    ),
                ],
                styles={"padding": "8px"},
            ),
        ]

    # ── Public properties ────────────────────────────────────────────────

    @property
    def on_tools_changed(self) -> Callable[[list[BaseTool]], None] | None:
        return self._on_tools_changed

    @on_tools_changed.setter
    def on_tools_changed(self, callback: Callable[[list[BaseTool]], None] | None) -> None:
        self._on_tools_changed = callback

    @property
    def sidebar_objects(self) -> list[pn.viewable.Viewable]:
        return list(self._sidebar_objects)

    @property
    def main_objects(self) -> list[pn.viewable.Viewable]:
        return []

    @property
    def tools(self) -> list[BaseTool]:
        """Currently active (checked) tools. Empty when disconnected."""
        if not self._tool_checkboxes:
            return []
        return self._get_checked_tools()

    @property
    def connection(self) -> OswConnection | None:
        return self._connection

    @property
    def connected(self) -> bool:
        return self._connection is not None

    # ── Connection lifecycle ─────────────────────────────────────────────

    def connect(self) -> None:
        """Build an OswConnection from current widget values and create tools."""
        domain = self._domain_input.value.strip()
        username = self._username_input.value.strip()
        password = self._password_input.value

        if not all([domain, username, password]):
            self._status_indicator.object = self._status_html(
                connected=False, message="Domain, username, and password are required."
            )
            return

        bg_endpoint = self._blazegraph_endpoint_input.value.strip() or None
        bg_user = self._blazegraph_user_input.value.strip() or None
        bg_password = self._blazegraph_password_input.value or None

        self._connection = OswConnection(
            domain=domain,
            username=username,
            password=password,
            blazegraph_endpoint=bg_endpoint,
            blazegraph_user=bg_user,
            blazegraph_password=bg_password,
        )

        self._tools = make_osw_tools(self._connection)
        self._update_ui_connected()
        self._fire_tools_changed()

    def disconnect(self) -> None:
        """Tear down the connection and clear tools."""
        self._connection = None
        self._tools = []
        self._update_ui_disconnected()
        self._fire_tools_changed()

    # ── Private helpers ──────────────────────────────────────────────────

    def _on_connect_click(self, event: Any) -> None:
        _ = event
        if self.connected:
            self.disconnect()
        else:
            self.connect()

    def _get_checked_tools(self) -> list[BaseTool]:
        """Return only the tools whose checkboxes are currently checked."""
        return [info["tool"] for info in self._tool_checkboxes.values() if info["checkbox"].value]

    def _fire_tools_changed(self) -> None:
        if self._on_tools_changed is not None:
            self._on_tools_changed(self._get_checked_tools())

    def _on_tool_checkbox_change(self, event: Any) -> None:
        _ = event
        self._fire_tools_changed()

    def _build_tool_checkboxes(self) -> None:
        """Create a checkbox for each tool and add it to the checkbox group."""
        self._tool_checkboxes.clear()
        self._tool_checkbox_group.clear()
        for tool in self._tools:
            checkbox = pn.widgets.Checkbox(
                name=tool.name.replace("_", " ").title(),
                value=True,
                sizing_mode="stretch_width",
                margin=(0, 0, 5, 0),
            )
            checkbox.param.watch(self._on_tool_checkbox_change, "value")
            self._tool_checkboxes[tool.name] = {"checkbox": checkbox, "tool": tool}
            self._tool_checkbox_group.append(checkbox)

    def _clear_tool_checkboxes(self) -> None:
        self._tool_checkboxes.clear()
        self._tool_checkbox_group.clear()

    def _update_ui_connected(self) -> None:
        self._connect_button.name = "Disconnect"
        self._connect_button.button_type = "danger"
        self._status_indicator.object = self._status_html(
            connected=True,
            message=f"Connected to {self._connection.domain}" if self._connection else "",
        )
        self._build_tool_checkboxes()

        self._domain_input.disabled = True
        self._username_input.disabled = True
        self._password_input.disabled = True
        self._blazegraph_endpoint_input.disabled = True
        self._blazegraph_user_input.disabled = True
        self._blazegraph_password_input.disabled = True

    def _update_ui_disconnected(self) -> None:
        self._connect_button.name = "Connect"
        self._connect_button.button_type = "success"
        self._status_indicator.object = self._status_html(connected=False)
        self._clear_tool_checkboxes()

        self._domain_input.disabled = False
        self._username_input.disabled = False
        self._password_input.disabled = False
        self._blazegraph_endpoint_input.disabled = False
        self._blazegraph_user_input.disabled = False
        self._blazegraph_password_input.disabled = False

    @staticmethod
    def _status_html(connected: bool, message: str = "") -> str:
        if connected:
            dot = '<span style="color: green; font-size: 1.2em;">&#9679;</span>'
            text = message or "Connected"
        else:
            dot = '<span style="color: gray; font-size: 1.2em;">&#9679;</span>'
            text = message or "Not connected"
        return f'<div style="display: flex; align-items: center; gap: 6px;">{dot} <span style="font-size: 0.9em;">{text}</span></div>'
