# MCP ELN Connectors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an MCP server/client layer for OSW ELN integration — a runnable `panelini-osw-mcp-server` CLI process, an `OswMcpClient` that fetches tools from it, and a `McpElnConnector` Panel widget that unifies direct and MCP modes.

**Architecture:** The MCP server wraps existing `make_osw_tools()` via a thin adapter (no logic duplication). The client uses `langchain-mcp-adapters` to convert MCP tools back to LangChain `BaseTool` instances so the existing AI panel needs no changes. The `McpElnConnector` widget delegates to either `OswConnector` (direct) or `OswMcpClient` (MCP) depending on mode.

**Tech Stack:** `mcp>=1.0` (official Anthropic MCP SDK), `starlette` + `uvicorn` (SSE HTTP server), `langchain-mcp-adapters` (MCP→LangChain bridge), `pytest-asyncio` (async tests, already in dev deps).

**Spec:** `docs/superpowers/specs/2026-04-27-mcp-eln-connectors-design.md`

---

## File Map

### New source files
| File | Responsibility |
| --- | --- |
| `src/panelini/mcp/__init__.py` | Package marker |
| `src/panelini/mcp/server/__init__.py` | Package marker |
| `src/panelini/mcp/server/osw/__init__.py` | Exports `OswMcpServer` |
| `src/panelini/mcp/server/osw/server.py` | `OswMcpServer` class + `_build_connection()` + `main()` CLI |
| `src/panelini/mcp/client/__init__.py` | Package marker |
| `src/panelini/mcp/client/osw/__init__.py` | Exports `OswMcpClient`, `McpConnectionError` |
| `src/panelini/mcp/client/osw/client.py` | `McpConnectionError`, `OswMcpClient` (async + sync wrappers) |
| `src/panelini/panels/eln_connectors/mcp_connector.py` | `McpElnConnector` Panel widget |
| `examples/panels/eln_connectors/mcp_connector_min.py` | Runnable usage example |

### New test files
| File | Tests |
| --- | --- |
| `tests/mcp/__init__.py` | Package marker |
| `tests/mcp/server/__init__.py` | Package marker |
| `tests/mcp/server/osw/__init__.py` | Package marker |
| `tests/mcp/server/osw/test_server.py` | `OswMcpServer` adapter + CLI arg parsing |
| `tests/mcp/client/__init__.py` | Package marker |
| `tests/mcp/client/osw/__init__.py` | Package marker |
| `tests/mcp/client/osw/test_client.py` | `OswMcpClient` error handling + success path |
| `tests/panels/eln_connectors/__init__.py` | Package marker |
| `tests/panels/eln_connectors/test_mcp_connector.py` | `McpElnConnector` mode switching + callbacks |

### Modified files
| File | Change |
| --- | --- |
| `pyproject.toml` | Add `mcp-server` + `mcp-client` extras, `[project.scripts]`, `anyio` dev dep |
| `src/panelini/panels/eln_connectors/__init__.py` | Export `McpElnConnector` |

---

## Task 1: Add dependencies and CLI entry point to pyproject.toml

**Files:**
- Modify: `pyproject.toml`

- [ ] **Step 1: Add `mcp-server` and `mcp-client` extras**

In `pyproject.toml`, after the `ai-osw` extra block, add:

```toml
mcp-server = [
    "mcp>=1.0",
    "starlette>=0.27",
    "uvicorn>=0.24",
    "langchain>=0.3.27",
    "langchain-community>=0.3.27",
    "osw[wikitext]>=1.0",
    "SPARQLWrapper>=2.0",
    "pandas>=2.0.0",
    "python-dotenv>=1.0.0",
]
mcp-client = [
    "mcp>=1.0",
    "langchain-mcp-adapters>=0.0.1",
    "langchain>=0.3.27",
    "python-dotenv>=1.0.0",
]
```

- [ ] **Step 2: Add CLI entry point**

After `[project.urls]`, add:

```toml
[project.scripts]
panelini-osw-mcp-server = "panelini.mcp.server.osw.server:main"
```

- [ ] **Step 3: Add `anyio` to dev dependency group**

In `[dependency-groups].dev`, add:

```toml
    "anyio>=3.0",
```

- [ ] **Step 4: Sync lockfile and verify install**

```bash
uv sync
```

Expected: no errors, lockfile updated.

- [ ] **Step 5: Commit**

```bash
git add pyproject.toml uv.lock
git commit -m "build: add mcp-server/mcp-client extras and CLI entry point"
```

---

## Task 2: Scaffold module `__init__.py` files

**Files:**
- Create: all `__init__.py` files listed in the file map above

- [ ] **Step 1: Create all empty source package markers**

```bash
mkdir -p src/panelini/mcp/server/osw src/panelini/mcp/client/osw
touch src/panelini/mcp/__init__.py
touch src/panelini/mcp/server/__init__.py
touch src/panelini/mcp/client/__init__.py
```

- [ ] **Step 2: Create all empty test package markers**

```bash
mkdir -p tests/mcp/server/osw tests/mcp/client/osw tests/panels/eln_connectors
touch tests/mcp/__init__.py
touch tests/mcp/server/__init__.py
touch tests/mcp/server/osw/__init__.py
touch tests/mcp/client/__init__.py
touch tests/mcp/client/osw/__init__.py
touch tests/panels/eln_connectors/__init__.py
```

- [ ] **Step 3: Run pytest to confirm no collection errors**

```bash
uv run pytest --collect-only 2>&1 | tail -5
```

Expected: ends with `no tests ran` or existing test count — no `ImportError` or collection errors.

- [ ] **Step 4: Commit**

```bash
git add src/panelini/mcp/ tests/mcp/ tests/panels/eln_connectors/
git commit -m "feat(mcp): scaffold package structure"
```

---

## Task 3: `OswMcpServer` — adapter + CLI

**Files:**
- Create: `src/panelini/mcp/server/osw/server.py`
- Create: `tests/mcp/server/osw/test_server.py`
- Modify: `src/panelini/mcp/server/osw/__init__.py`

- [ ] **Step 1: Write failing tests**

Create `tests/mcp/server/osw/test_server.py`:

```python
from __future__ import annotations

import argparse
import os
from typing import Any
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
    from panelini.mcp.server.osw.server import OswMcpServer

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
        password="cli_pass",
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
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
uv run pytest tests/mcp/server/osw/test_server.py -v 2>&1 | tail -20
```

Expected: `ImportError` or `ModuleNotFoundError` — `server.py` doesn't exist yet.

- [ ] **Step 3: Implement `server.py`**

Create `src/panelini/mcp/server/osw/server.py`:

```python
from __future__ import annotations

import argparse
import os
from typing import Any

from mcp.server import Server
from mcp.server.sse import SseServerTransport
from mcp.types import TextContent, Tool
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.routing import Route
import uvicorn

from panelini.panels.eln_connectors.osw.connection import OswConnection
from panelini.panels.eln_connectors.osw.tools.osw_tools import make_osw_tools


class OswMcpServer:
    def __init__(self, connection: OswConnection) -> None:
        self._tools = make_osw_tools(connection)
        self._tool_map = {t.name: t for t in self._tools}
        self._server = Server("osw")
        self._register_handlers()

    async def _list_tools(self) -> list[Tool]:
        return [
            Tool(
                name=t.name,
                description=t.description or "",
                inputSchema=(
                    t.args_schema.model_json_schema()
                    if t.args_schema
                    else {"type": "object", "properties": {}}
                ),
            )
            for t in self._tools
        ]

    async def _call_tool(self, name: str, arguments: dict[str, Any]) -> list[TextContent]:
        tool = self._tool_map.get(name)
        if tool is None:
            raise ValueError(f"Unknown tool: {name}")
        result = tool._run(**arguments)
        return [TextContent(type="text", text=str(result))]

    def _register_handlers(self) -> None:
        server = self._server

        @server.list_tools()
        async def list_tools() -> list[Tool]:
            return await self._list_tools()

        @server.call_tool()
        async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
            return await self._call_tool(name, arguments)

    def build_starlette_app(self) -> Starlette:
        sse = SseServerTransport("/messages/")
        mcp_server = self._server

        async def handle_sse(request: Request) -> None:
            async with sse.connect_sse(
                request.scope, request.receive, request._send
            ) as streams:
                await mcp_server.run(
                    streams[0],
                    streams[1],
                    mcp_server.create_initialization_options(),
                )

        async def handle_messages(request: Request) -> None:
            await sse.handle_post_message(request.scope, request.receive, request._send)

        return Starlette(
            routes=[
                Route("/sse", endpoint=handle_sse),
                Route("/messages/", endpoint=handle_messages),
            ]
        )

    def run(self, host: str = "0.0.0.0", port: int = 8765) -> None:
        uvicorn.run(self.build_starlette_app(), host=host, port=port)


def _build_connection(args: argparse.Namespace) -> OswConnection:
    domain = args.domain or os.environ.get("OSW_DOMAIN")
    user = args.user or os.environ.get("OSW_USER")
    password = args.password or os.environ.get("OSW_PASSWORD")
    if not all([domain, user, password]):
        raise SystemExit(
            "OSW domain, user, and password must be set via "
            "--domain/--user/--password or OSW_DOMAIN/OSW_USER/OSW_PASSWORD."
        )
    return OswConnection(
        domain=domain,
        username=user,
        password=password,
        blazegraph_endpoint=args.blazegraph_endpoint or os.environ.get("BLAZEGRAPH_ENDPOINT"),
        blazegraph_user=args.blazegraph_user or os.environ.get("BLAZEGRAPH_USER"),
        blazegraph_password=args.blazegraph_password or os.environ.get("BLAZEGRAPH_PASSWORD"),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="OSW MCP Server — expose OSW tools over SSE")
    parser.add_argument("--domain", default=None, help="OSW wiki domain (overrides OSW_DOMAIN)")
    parser.add_argument("--user", default=None, help="OSW username (overrides OSW_USER)")
    parser.add_argument("--password", default=None, help="OSW password (overrides OSW_PASSWORD)")
    parser.add_argument("--blazegraph-endpoint", default=None, dest="blazegraph_endpoint")
    parser.add_argument("--blazegraph-user", default=None, dest="blazegraph_user")
    parser.add_argument("--blazegraph-password", default=None, dest="blazegraph_password")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    OswMcpServer(_build_connection(args)).run(host=args.host, port=args.port)
```

- [ ] **Step 4: Update `src/panelini/mcp/server/osw/__init__.py`**

```python
from panelini.mcp.server.osw.server import OswMcpServer

__all__ = ["OswMcpServer"]
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
uv run pytest tests/mcp/server/osw/test_server.py -v 2>&1 | tail -20
```

Expected: all 7 tests PASSED.

- [ ] **Step 6: Commit**

```bash
git add src/panelini/mcp/server/osw/ tests/mcp/server/osw/test_server.py
git commit -m "feat(mcp): add OswMcpServer adapter and CLI entry point"
```

---

## Task 4: `OswMcpClient` + `McpConnectionError`

**Files:**
- Create: `src/panelini/mcp/client/osw/client.py`
- Create: `tests/mcp/client/osw/test_client.py`
- Modify: `src/panelini/mcp/client/osw/__init__.py`

- [ ] **Step 1: Write failing tests**

Create `tests/mcp/client/osw/test_client.py`:

```python
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
        yield  # noqa: unreachable — required for async generator typing

    client = OswMcpClient(server_url="http://unreachable:9999/sse")
    with patch("panelini.mcp.client.osw.client.sse_client", failing_sse):
        with pytest.raises(McpConnectionError):
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
        yield

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
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
uv run pytest tests/mcp/client/osw/test_client.py -v 2>&1 | tail -10
```

Expected: `ImportError` — `client.py` doesn't exist yet.

- [ ] **Step 3: Implement `client.py`**

Create `src/panelini/mcp/client/osw/client.py`:

```python
from __future__ import annotations

import asyncio
from concurrent.futures import ThreadPoolExecutor

from langchain.tools import BaseTool
from langchain_mcp_adapters.tools import load_mcp_tools
from mcp import ClientSession
from mcp.client.sse import sse_client


class McpConnectionError(Exception):
    pass


class OswMcpClient:
    """Connects to a running OswMcpServer over SSE and returns LangChain BaseTools.

    Connection lifecycle (current): connect → fetch → close per call.
    Future: switch to persistent keep-alive connection so the server can push
    tool updates when tool descriptions change dynamically.
    """

    def __init__(self, server_url: str) -> None:
        self.server_url = server_url

    async def get_tools(self) -> list[BaseTool]:
        try:
            async with sse_client(url=self.server_url) as (read, write):
                async with ClientSession(read, write) as session:
                    await session.initialize()
                    return await load_mcp_tools(session)
        except McpConnectionError:
            raise
        except Exception as e:
            raise McpConnectionError(
                f"Failed to connect to {self.server_url}: {e}"
            ) from e

    def get_tools_sync(self) -> list[BaseTool]:
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, self.get_tools()).result()

    async def health_check(self) -> bool:
        try:
            async with sse_client(url=self.server_url) as (read, write):
                async with ClientSession(read, write) as session:
                    await session.initialize()
            return True
        except Exception:
            return False

    def health_check_sync(self) -> bool:
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, self.health_check()).result()
```

- [ ] **Step 4: Update `src/panelini/mcp/client/osw/__init__.py`**

```python
from panelini.mcp.client.osw.client import McpConnectionError, OswMcpClient

__all__ = ["McpConnectionError", "OswMcpClient"]
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
uv run pytest tests/mcp/client/osw/test_client.py -v 2>&1 | tail -15
```

Expected: all 6 tests PASSED.

- [ ] **Step 6: Commit**

```bash
git add src/panelini/mcp/client/osw/ tests/mcp/client/osw/test_client.py
git commit -m "feat(mcp): add OswMcpClient with LangChain bridge"
```

---

## Task 5: `McpElnConnector` Panel widget

**Files:**
- Create: `src/panelini/panels/eln_connectors/mcp_connector.py`
- Create: `tests/panels/eln_connectors/test_mcp_connector.py`

- [ ] **Step 1: Write failing tests**

Create `tests/panels/eln_connectors/test_mcp_connector.py`:

```python
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

    with patch(
        "panelini.panels.eln_connectors.mcp_connector.OswMcpClient"
    ) as MockClient:
        MockClient.return_value.get_tools_sync.return_value = [mock_tool]
        connector._on_mcp_connect(None)

    assert mock_tool in connector.tools
    assert any(mock_tool in tools_list for tools_list in received)


def test_mcp_connect_sets_error_status_on_failure():
    from panelini.mcp.client.osw.client import McpConnectionError

    connector = _make_connector()
    connector._mode_select.value = "mcp"
    connector._server_url_input.value = "http://localhost:9999/sse"

    with patch(
        "panelini.panels.eln_connectors.mcp_connector.OswMcpClient"
    ) as MockClient:
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
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
uv run pytest tests/panels/eln_connectors/test_mcp_connector.py -v 2>&1 | tail -10
```

Expected: `ImportError` — `mcp_connector.py` doesn't exist yet.

- [ ] **Step 3: Implement `mcp_connector.py`**

Create `src/panelini/panels/eln_connectors/mcp_connector.py`:

```python
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

        self._eln_type_select = pn.widgets.Select(
            name="ELN Type", options=["osw"], value="osw", width=200
        )
        self._mode_select = pn.widgets.RadioButtonGroup(
            name="Mode", options=["direct", "mcp"], value="direct"
        )
        self._osw_connector = OswConnector(on_tools_changed=self._on_child_tools_changed)

        self._server_url_input = pn.widgets.TextInput(
            name="Server URL", placeholder="http://localhost:8765/sse", width=300
        )
        self._connect_btn = pn.widgets.Button(name="Connect", button_type="primary")
        self._disconnect_btn = pn.widgets.Button(
            name="Disconnect", button_type="danger", visible=False
        )
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
            self._osw_connector.disconnect()
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
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
uv run pytest tests/panels/eln_connectors/test_mcp_connector.py -v 2>&1 | tail -20
```

Expected: all 11 tests PASSED.

- [ ] **Step 5: Commit**

```bash
git add src/panelini/panels/eln_connectors/mcp_connector.py tests/panels/eln_connectors/test_mcp_connector.py
git commit -m "feat(mcp): add McpElnConnector Panel widget"
```

---

## Task 6: Update `eln_connectors` exports

**Files:**
- Modify: `src/panelini/panels/eln_connectors/__init__.py`

- [ ] **Step 1: Update exports**

Replace the contents of `src/panelini/panels/eln_connectors/__init__.py` with:

```python
from panelini.panels.eln_connectors.mcp_connector import McpElnConnector
from panelini.panels.eln_connectors.osw.connector import OswConnector

__all__ = ["McpElnConnector", "OswConnector"]
```

- [ ] **Step 2: Verify import works**

```bash
uv run python -c "from panelini.panels.eln_connectors import McpElnConnector, OswConnector; print('OK')"
```

Expected: `OK`

- [ ] **Step 3: Verify CLI entry point is importable**

```bash
uv run python -c "from panelini.mcp.server.osw.server import main; print('CLI OK')"
```

Expected: `CLI OK`

- [ ] **Step 4: Run the full test suite**

```bash
uv run pytest tests/mcp/ tests/panels/eln_connectors/ -v 2>&1 | tail -25
```

Expected: all tests PASSED, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/panelini/panels/eln_connectors/__init__.py
git commit -m "feat(mcp): export McpElnConnector from eln_connectors package"
```

---

## Task 7: Example and final checks

**Files:**
- Create: `examples/panels/eln_connectors/mcp_connector_min.py`

- [ ] **Step 1: Write the example**

Create `examples/panels/eln_connectors/mcp_connector_min.py`:

```python
"""Minimal McpElnConnector example.

Start an OSW MCP server first:
    panelini-osw-mcp-server --domain wiki.example.com --user bot --password secret

Then run this example:
    panel serve examples/panels/eln_connectors/mcp_connector_min.py --port 5010
"""

import panel as pn

from panelini.panels.eln_connectors import McpElnConnector
from panelini import Panelini

pn.extension()

status_pane = pn.pane.Markdown("No tools active.")


def _on_tools_changed(tools):
    if tools:
        names = ", ".join(t.name for t in tools)
        status_pane.object = f"**Active tools ({len(tools)}):** {names}"
    else:
        status_pane.object = "No tools active."


connector = McpElnConnector(on_tools_changed=_on_tools_changed)

app = Panelini(title="MCP ELN Connector", sidebar_enabled=True)
app.sidebar_set(objects=connector.sidebar_objects)
app.main_set(objects=[pn.Card(status_pane, title="Active Tools")])
app.servable()
```

- [ ] **Step 2: Run the full test suite one final time**

```bash
uv run pytest tests/ -v --ignore=tests/panels/ai/examples 2>&1 | tail -30
```

Expected: all existing tests still pass, all new tests pass.

- [ ] **Step 3: Commit**

```bash
git add examples/panels/eln_connectors/mcp_connector_min.py
git commit -m "feat(mcp): add McpElnConnector example"
```
