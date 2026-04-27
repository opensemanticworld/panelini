from __future__ import annotations

import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Optional

from langchain.tools import BaseTool
from mcp import ClientSession
from mcp.client.sse import sse_client
from pydantic import BaseModel, ConfigDict, Field, create_model


class McpConnectionError(Exception):
    pass


def _json_type_to_python(json_type: str) -> type:
    return {
        "integer": int,
        "number": float,
        "boolean": bool,
        "array": list,
        "object": dict,
    }.get(json_type, str)


def _schema_to_pydantic(schema: dict, tool_name: str) -> type[BaseModel]:
    """Convert an MCP inputSchema dict to a Pydantic BaseModel for use as args_schema."""
    properties: dict = schema.get("properties") or {}
    required: set[str] = set(schema.get("required") or [])
    fields: dict[str, Any] = {}

    for fname, fschema in properties.items():
        desc = fschema.get("description", "")
        py_type = _json_type_to_python(fschema.get("type", "string"))
        if fname in required:
            fields[fname] = (py_type, Field(description=desc))
        else:
            fields[fname] = (Optional[py_type], Field(default=None, description=desc))

    return create_model(f"_{tool_name.replace('-', '_').title()}Input", **fields)


class _McpProxyTool(BaseTool):
    """LangChain BaseTool that opens a fresh MCP connection for every call.

    Tools returned by load_mcp_tools() hold a reference to the session they
    were created with. That session closes when get_tools() returns, so every
    subsequent _arun() fails with a stream error. This proxy solves the problem
    by reconnecting on each call instead of reusing the initial session.

    Future: replace with a persistent keep-alive connection once we switch the
    client to a long-lived session model.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True)

    name: str
    description: str
    args_schema: type[BaseModel]
    server_url: str
    mcp_tool_name: str

    async def _arun(self, **kwargs: Any) -> str:
        try:
            async with (
                sse_client(url=self.server_url) as (read, write),
                ClientSession(read, write) as session,
            ):
                await session.initialize()
                result = await session.call_tool(self.mcp_tool_name, kwargs)
                texts = [c.text for c in result.content if hasattr(c, "text")]
                return "\n".join(texts) if texts else "(no output)"
        except Exception as e:
            return f"Tool call failed: {e}"

    def _run(self, **kwargs: Any) -> str:
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, self._arun(**kwargs)).result()


class OswMcpClient:
    """Connects to a running OswMcpServer over SSE and returns LangChain BaseTools.

    Discovery: one-shot SSE connection to list available tools and their schemas.
    Execution: each _McpProxyTool opens a fresh SSE connection per call, so tool
    invocations are never blocked by a stale or closed session.

    Future: switch to a persistent keep-alive connection so the server can push
    tool-description updates dynamically and avoid per-call reconnect overhead.
    """

    def __init__(self, server_url: str) -> None:
        self.server_url = server_url

    async def get_tools(self) -> list[BaseTool]:
        try:
            async with (
                sse_client(url=self.server_url) as (read, write),
                ClientSession(read, write) as session,
            ):
                await session.initialize()
                listed = await session.list_tools()
                return [
                    _McpProxyTool(
                        name=t.name,
                        description=t.description or "",
                        args_schema=_schema_to_pydantic(t.inputSchema or {}, t.name),
                        server_url=self.server_url,
                        mcp_tool_name=t.name,
                    )
                    for t in listed.tools
                ]
        except McpConnectionError:
            raise
        except Exception as e:
            raise McpConnectionError(f"Failed to connect to {self.server_url}: {e}") from e  # noqa: TRY003

    def get_tools_sync(self) -> list[BaseTool]:
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, self.get_tools()).result()

    async def health_check(self) -> bool:
        try:
            async with (
                sse_client(url=self.server_url) as (read, write),
                ClientSession(read, write) as session,
            ):
                await session.initialize()
        except Exception:
            return False
        else:
            return True

    def health_check_sync(self) -> bool:
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, self.health_check()).result()
