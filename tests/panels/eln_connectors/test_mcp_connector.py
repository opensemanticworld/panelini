from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest
from langchain.tools import BaseTool

pytestmark = pytest.mark.ai


def _make_connector(**kwargs):
    from panelini.panels.eln_connectors.mcp_connector import McpElnConnector

    return McpElnConnector(**kwargs)


def test_default_mode_is_direct():
    connector = _make_connector()
    assert connector._mode_select.value == "direct"


def test_default_eln_type_is_osw():
    connector = _make_connector()
    assert connector._eln_type_select.value == "osw"


def test_sidebar_objects_non_empty_on_init():
    connector = _make_connector()
    assert len(connector.sidebar_objects) > 0


def test_main_objects_is_empty():
    connector = _make_connector()
    assert connector.main_objects == []


def test_tools_empty_on_init():
    connector = _make_connector()
    assert connector.tools == []


def test_mode_switch_direct_to_mcp_fires_empty_tools():
    received: list = []
    connector = _make_connector(on_tools_changed=received.append)
    connector._mode_select.value = "mcp"
    assert received == [[]]


def test_mode_switch_mcp_to_direct_fires_empty_tools():
    received: list = []
    connector = _make_connector(on_tools_changed=received.append)
    connector._mode_select.value = "mcp"
    received.clear()
    connector._mode_select.value = "direct"
    assert received == [[]]


def test_mcp_connect_populates_tools_and_fires_callback():
    mock_tool = MagicMock(spec=BaseTool)
    mock_tool.name = "fake_tool"
    received: list = []
    connector = _make_connector(on_tools_changed=received.append)
    connector._mode_select.value = "mcp"
    connector._server_url_input.value = "http://localhost:8765/sse"
    received.clear()

    with patch("panelini.panels.eln_connectors.mcp_connector.OswMcpClient") as MockClient:
        MockClient.return_value.get_tools_sync.return_value = [mock_tool]
        connector._on_mcp_connect(None)

    assert mock_tool in connector.tools
    assert any(mock_tool in tools_list for tools_list in received)


def test_mcp_connect_sets_error_status_on_failure():
    from panelini.mcp.client.osw.client import McpConnectionError

    connector = _make_connector()
    connector._mode_select.value = "mcp"
    connector._server_url_input.value = "http://localhost:9999/sse"

    with patch("panelini.panels.eln_connectors.mcp_connector.OswMcpClient") as MockClient:
        MockClient.return_value.get_tools_sync.side_effect = McpConnectionError("refused")
        connector._on_mcp_connect(None)

    assert "🔴" in connector._status_pane.object


def test_mcp_disconnect_fires_empty_tools():
    mock_tool = MagicMock(spec=BaseTool)
    mock_tool.name = "fake_tool"
    received: list = []
    connector = _make_connector(on_tools_changed=received.append)
    connector._mode_select.value = "mcp"
    connector._all_mcp_tools = [mock_tool]
    connector._tools = [mock_tool]
    received.clear()

    connector._on_mcp_disconnect(None)
    assert received == [[]]
    assert connector.tools == []


def test_tool_selection_filters_active_tools():
    mock_tool_a = MagicMock(spec=BaseTool)
    mock_tool_a.name = "tool_a"
    mock_tool_b = MagicMock(spec=BaseTool)
    mock_tool_b.name = "tool_b"

    connector = _make_connector()
    connector._mode_select.value = "mcp"
    connector._all_mcp_tools = [mock_tool_a, mock_tool_b]
    connector._tool_checkbox.options = ["tool_a", "tool_b"]
    connector._tool_checkbox.value = ["tool_a", "tool_b"]
    connector._tools = [mock_tool_a, mock_tool_b]

    connector._tool_checkbox.value = ["tool_a"]
    assert connector.tools == [mock_tool_a]
