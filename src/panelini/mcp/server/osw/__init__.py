from __future__ import annotations


def __getattr__(name: str):
    if name == "OswMcpServer":
        from panelini.mcp.server.osw.server import OswMcpServer

        return OswMcpServer
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")  # noqa: TRY003


__all__ = ["OswMcpServer"]
