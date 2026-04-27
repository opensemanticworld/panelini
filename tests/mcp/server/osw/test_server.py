from __future__ import annotations

import argparse
from unittest.mock import MagicMock, patch

import pytest
from langchain.tools import BaseTool
from pydantic import BaseModel

pytestmark = pytest.mark.ai


class _FakeInput(BaseModel):
    text: str


class _FakeTool(BaseTool):
    name: str = "fake_tool"
    description: str = "A fake tool for testing"
    args_schema: type[BaseModel] = _FakeInput

    def _run(self, text: str) -> str:
        return f"result: {text}"


def _make_server():
    from panelini.mcp.server.osw.server import OswMcpServer
    from panelini.panels.eln_connectors.osw.connection import OswConnection

    with patch("panelini.mcp.server.osw.server.make_osw_tools", return_value=[_FakeTool()]):
        return OswMcpServer(MagicMock(spec=OswConnection))


def test_tool_map_built_from_make_osw_tools():
    server = _make_server()
    assert "fake_tool" in server._tool_map
    assert isinstance(server._tool_map["fake_tool"], _FakeTool)


@pytest.mark.asyncio
async def test_list_tools_returns_mcp_tool():
    server = _make_server()
    result = await server._list_tools()
    assert len(result) == 1
    assert result[0].name == "fake_tool"
    assert result[0].description == "A fake tool for testing"
    assert "text" in result[0].inputSchema.get("properties", {})


@pytest.mark.asyncio
async def test_call_tool_invokes_run():
    server = _make_server()
    result = await server._call_tool("fake_tool", {"text": "hello"})
    assert len(result) == 1
    assert result[0].text == "result: hello"


@pytest.mark.asyncio
async def test_call_tool_raises_on_unknown_name():
    server = _make_server()
    with pytest.raises(ValueError, match="Unknown tool"):
        await server._call_tool("nonexistent", {})


def test_build_connection_cli_args_override_env(monkeypatch):
    from panelini.mcp.server.osw.server import _build_connection

    monkeypatch.setenv("OSW_DOMAIN", "env.example.com")
    monkeypatch.setenv("OSW_USER", "env_user")
    monkeypatch.setenv("OSW_PASSWORD", "env_pass")
    args = argparse.Namespace(
        domain="cli.example.com",
        user="cli_user",
        password="cli_pass",  # noqa: S106
        blazegraph_endpoint=None,
        blazegraph_user=None,
        blazegraph_password=None,
    )
    conn = _build_connection(args)
    assert conn.domain == "cli.example.com"
    assert conn.username == "cli_user"


def test_build_connection_falls_back_to_env(monkeypatch):
    from panelini.mcp.server.osw.server import _build_connection

    monkeypatch.setenv("OSW_DOMAIN", "env.example.com")
    monkeypatch.setenv("OSW_USER", "env_user")
    monkeypatch.setenv("OSW_PASSWORD", "env_pass")
    args = argparse.Namespace(
        domain=None,
        user=None,
        password=None,
        blazegraph_endpoint=None,
        blazegraph_user=None,
        blazegraph_password=None,
    )
    conn = _build_connection(args)
    assert conn.domain == "env.example.com"


def test_build_connection_raises_without_required_args(monkeypatch):
    from panelini.mcp.server.osw.server import _build_connection

    monkeypatch.delenv("OSW_DOMAIN", raising=False)
    monkeypatch.delenv("OSW_USER", raising=False)
    monkeypatch.delenv("OSW_PASSWORD", raising=False)
    args = argparse.Namespace(
        domain=None,
        user=None,
        password=None,
        blazegraph_endpoint=None,
        blazegraph_user=None,
        blazegraph_password=None,
    )
    with pytest.raises(SystemExit):
        _build_connection(args)
