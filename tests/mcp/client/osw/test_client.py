from __future__ import annotations

from contextlib import asynccontextmanager
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

pytestmark = pytest.mark.ai


def _make_client():
    from panelini.mcp.client.osw.client import OswMcpClient

    return OswMcpClient(server_url="http://localhost:8765/sse")


def _mock_listed_tool(name: str = "fake_tool", description: str = "A fake tool"):
    t = MagicMock()
    t.name = name
    t.description = description
    t.inputSchema = {
        "type": "object",
        "properties": {"query": {"type": "string", "description": "The query"}},
        "required": ["query"],
    }
    return t


def _mock_sse_and_session(listed_tools=None, call_result_text="ok"):
    """Return context-manager patches for sse_client and ClientSession."""
    mock_session = AsyncMock()
    mock_session.initialize = AsyncMock()
    listed = MagicMock()
    listed.tools = listed_tools or []
    mock_session.list_tools = AsyncMock(return_value=listed)
    call_result = MagicMock()
    call_result.content = [MagicMock(text=call_result_text)]
    mock_session.call_tool = AsyncMock(return_value=call_result)

    @asynccontextmanager
    async def mock_sse(*args, **kwargs):
        yield (AsyncMock(), AsyncMock())

    @asynccontextmanager
    async def mock_session_ctx(*args, **kwargs):
        yield mock_session

    return mock_sse, mock_session_ctx, mock_session


def test_client_stores_server_url():
    client = _make_client()
    assert client.server_url == "http://localhost:8765/sse"


@pytest.mark.asyncio
async def test_get_tools_raises_mcp_connection_error_on_failure():
    from panelini.mcp.client.osw.client import McpConnectionError, OswMcpClient

    @asynccontextmanager
    async def failing_sse(*args, **kwargs):
        raise ConnectionError("refused")
        yield  # type: ignore[misc]

    client = OswMcpClient(server_url="http://unreachable:9999/sse")
    with patch("panelini.mcp.client.osw.client.sse_client", failing_sse), pytest.raises(McpConnectionError):
        await client.get_tools()


@pytest.mark.asyncio
async def test_get_tools_returns_proxy_tools_on_success():
    from panelini.mcp.client.osw.client import OswMcpClient, _McpProxyTool

    mock_sse, mock_session_ctx, _ = _mock_sse_and_session(
        listed_tools=[_mock_listed_tool("search_tool", "Search the wiki")]
    )

    client = OswMcpClient(server_url="http://localhost:8765/sse")
    with (
        patch("panelini.mcp.client.osw.client.sse_client", mock_sse),
        patch("panelini.mcp.client.osw.client.ClientSession", mock_session_ctx),
    ):
        tools = await client.get_tools()

    assert len(tools) == 1
    assert isinstance(tools[0], _McpProxyTool)
    assert tools[0].name == "search_tool"
    assert tools[0].description == "Search the wiki"
    assert tools[0].server_url == "http://localhost:8765/sse"
    assert tools[0].mcp_tool_name == "search_tool"


@pytest.mark.asyncio
async def test_proxy_tool_arun_calls_mcp_server():
    from panelini.mcp.client.osw.client import OswMcpClient

    mock_sse, mock_session_ctx, mock_session = _mock_sse_and_session(
        listed_tools=[_mock_listed_tool()], call_result_text="tool result"
    )

    client = OswMcpClient(server_url="http://localhost:8765/sse")
    with (
        patch("panelini.mcp.client.osw.client.sse_client", mock_sse),
        patch("panelini.mcp.client.osw.client.ClientSession", mock_session_ctx),
    ):
        tools = await client.get_tools()
        tool = tools[0]
        # Proxy tool also reconnects on _arun — patch again for the call
        result = await tool._arun(query="python")

    assert result == "tool result"


@pytest.mark.asyncio
async def test_health_check_returns_false_on_failure():
    from panelini.mcp.client.osw.client import OswMcpClient

    @asynccontextmanager
    async def failing_sse(*args, **kwargs):
        raise ConnectionError("refused")
        yield  # type: ignore[misc]

    client = OswMcpClient(server_url="http://unreachable:9999/sse")
    with patch("panelini.mcp.client.osw.client.sse_client", failing_sse):
        assert await client.health_check() is False


@pytest.mark.asyncio
async def test_health_check_returns_true_on_success():
    from panelini.mcp.client.osw.client import OswMcpClient

    mock_sse, mock_session_ctx, _ = _mock_sse_and_session()

    client = OswMcpClient(server_url="http://localhost:8765/sse")
    with (
        patch("panelini.mcp.client.osw.client.sse_client", mock_sse),
        patch("panelini.mcp.client.osw.client.ClientSession", mock_session_ctx),
    ):
        assert await client.health_check() is True
