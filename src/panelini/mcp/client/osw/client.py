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
    Future: switch to a persistent keep-alive connection so the server can push
    tool updates when tool descriptions change dynamically.
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
                return await load_mcp_tools(session)
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
