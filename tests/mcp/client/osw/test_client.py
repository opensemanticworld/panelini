from __future__ import annotations

from contextlib import asynccontextmanager
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from langchain.tools import BaseTool

pytestmark = pytest.mark.ai


def _make_client():
    from panelini.mcp.client.osw.client import OswMcpClient

    return OswMcpClient(server_url="http://localhost:8765/sse")


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
async def test_get_tools_returns_langchain_tools_on_success():
    from panelini.mcp.client.osw.client import OswMcpClient

    mock_tool = MagicMock(spec=BaseTool)
    mock_tool.name = "fake_tool"
    mock_session = AsyncMock()
    mock_session.initialize = AsyncMock()

    @asynccontextmanager
    async def mock_sse(*args, **kwargs):
        yield (AsyncMock(), AsyncMock())

    @asynccontextmanager
    async def mock_session_ctx(*args, **kwargs):
        yield mock_session

    client = OswMcpClient(server_url="http://localhost:8765/sse")
    with (
        patch("panelini.mcp.client.osw.client.sse_client", mock_sse),
        patch("panelini.mcp.client.osw.client.ClientSession", mock_session_ctx),
        patch("panelini.mcp.client.osw.client.load_mcp_tools", return_value=[mock_tool]),
    ):
        tools = await client.get_tools()

    assert len(tools) == 1
    assert tools[0].name == "fake_tool"


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

    mock_session = AsyncMock()
    mock_session.initialize = AsyncMock()

    @asynccontextmanager
    async def mock_sse(*args, **kwargs):
        yield (AsyncMock(), AsyncMock())

    @asynccontextmanager
    async def mock_session_ctx(*args, **kwargs):
        yield mock_session

    client = OswMcpClient(server_url="http://localhost:8765/sse")
    with (
        patch("panelini.mcp.client.osw.client.sse_client", mock_sse),
        patch("panelini.mcp.client.osw.client.ClientSession", mock_session_ctx),
    ):
        assert await client.health_check() is True
