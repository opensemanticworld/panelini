from __future__ import annotations

import argparse
import os
from typing import Any

import uvicorn
from mcp.server import Server
from mcp.server.sse import SseServerTransport
from mcp.types import TextContent, Tool
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.routing import Route

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
                    t.args_schema.model_json_schema() if t.args_schema else {"type": "object", "properties": {}}
                ),
            )
            for t in self._tools
        ]

    async def _call_tool(self, name: str, arguments: dict[str, Any]) -> list[TextContent]:
        tool = self._tool_map.get(name)
        if tool is None:
            raise ValueError(f"Unknown tool: {name}")  # noqa: TRY003
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
            async with sse.connect_sse(request.scope, request.receive, request._send) as streams:
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

    def run(self, host: str = "0.0.0.0", port: int = 8765) -> None:  # noqa: S104
        uvicorn.run(self.build_starlette_app(), host=host, port=port)


def _build_connection(args: argparse.Namespace) -> OswConnection:
    domain = args.domain or os.environ.get("OSW_DOMAIN")
    user = args.user or os.environ.get("OSW_USER")
    password = args.password or os.environ.get("OSW_PASSWORD")
    if not all([domain, user, password]):
        raise SystemExit(  # noqa: TRY003
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
    parser.add_argument("--host", default="0.0.0.0")  # noqa: S104
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    OswMcpServer(_build_connection(args)).run(host=args.host, port=args.port)


if __name__ == "__main__":
    main()
