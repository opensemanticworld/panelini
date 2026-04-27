# MCP ELN Connectors Design

**Date:** 2026-04-27
**Branch:** eln-connectors
**Status:** Approved

---

## Overview

Introduce a dedicated MCP (Model Context Protocol) server/client layer for ELN (Electronic Lab Notebook) integrations, starting with OSW (OpenSemanticWorld). Each OSW instance gets its own long-running MCP server process; the Panelini panel connects via an MCP client. Tools are delivered to the AI panel as LangChain `BaseTool` instances — the existing AI panel sees no change.

---

## Decisions

| Question | Decision |
| --- | --- |
| Transport | SSE / HTTP Streamable (persistent process, known port) |
| Panel widget | `McpElnConnector` unified widget (direct + MCP modes); `OswConnector` unchanged |
| Tool delivery to AI panel | LangChain bridge via `langchain-mcp-adapters` |
| Server configuration | CLI args override env vars (reuses `OSW_DOMAIN`, `OSW_USER`, `OSW_PASSWORD` convention) |
| Plot tools | Deferred — core 9 OSW tools only in this iteration |
| MCP SDK | Official `mcp` Python SDK (Anthropic) |

---

## Directory Structure

```text
src/panelini/mcp/
├── __init__.py
├── server/
│   ├── __init__.py
│   └── osw/
│       ├── __init__.py
│       └── server.py          # OswMcpServer class + CLI entry point
└── client/
    ├── __init__.py
    └── osw/
        ├── __init__.py
        └── client.py          # OswMcpClient (async, returns LangChain BaseTools)

src/panelini/panels/eln_connectors/
├── __init__.py                # updated exports
├── osw/                       # unchanged
└── mcp_connector.py           # McpElnConnector Panel widget

examples/panels/eln_connectors/
└── mcp_connector_min.py       # usage example
```

---

## Component Designs

### 1. MCP Server — `OswMcpServer`

**File:** `src/panelini/mcp/server/osw/server.py`

Wraps the existing `make_osw_tools(connection)` factory via a thin adapter loop. No tool logic is duplicated — the existing `BaseTool` classes remain the single source of truth.

**Adapter mapping per tool:**

```text
BaseTool.name          → MCP tool name
BaseTool.description   → MCP tool description
BaseTool.args_schema   → MCP input schema (Pydantic → JSON Schema)
BaseTool._run()        → MCP tool handler
```

**SSE endpoint:** `http://{host}:{port}/sse`

**Connection lifecycle:** `OswConnection` is built once at startup (validates credentials, fails fast). Shared across all tool calls for the lifetime of the process.

**CLI entry point** (`panelini-osw-mcp-server`):

```text
--domain             OSW wiki domain (fallback: OSW_DOMAIN)
--user               OSW username   (fallback: OSW_USER)
--password           OSW password   (fallback: OSW_PASSWORD)
--blazegraph-endpoint  optional     (fallback: BLAZEGRAPH_ENDPOINT)
--blazegraph-user      optional     (fallback: BLAZEGRAPH_USER)
--blazegraph-password  optional     (fallback: BLAZEGRAPH_PASSWORD)
--host               bind host      (default: 0.0.0.0)
--port               bind port      (default: 8765)
```

CLI args take precedence over env vars.

---

### 2. MCP Client — `OswMcpClient`

**File:** `src/panelini/mcp/client/osw/client.py`

Async wrapper around `langchain-mcp-adapters` that connects to a running `OswMcpServer` and returns `BaseTool` instances.

```python
class OswMcpClient:
    server_url: str             # e.g. "http://localhost:8765/sse"

    async def get_tools() -> list[BaseTool]
    async def health_check() -> bool
```

**Connection lifecycle (current):** connect → fetch tool list → close. Stateless per call; tools are fetched once on connect and cached by the Panel widget.

> **Future note:** Switch to a persistent keep-alive connection. MCP tool descriptions can be dynamic/self-describing; a persistent connection would allow the server to push tool updates without a reconnect cycle.

**Error contract:** `get_tools()` raises `McpConnectionError` (typed, defined in `src/panelini/mcp/client/osw/client.py`) on unreachable server or unexpected response, so `McpElnConnector` can display a clear status. `health_check()` returns `True`/`False` without raising.

---

### 3. Panel Widget — `McpElnConnector`

**File:** `src/panelini/panels/eln_connectors/mcp_connector.py`

Unified top-level Panel widget. `OswConnector` is unchanged and still works standalone.

**UI layout:**

```text
McpElnConnector
├── ELN type selector         # "osw" (dropdown, extensible)
├── Mode selector             # "direct" | "mcp" (radio/toggle)
│
├── [direct mode] → OswConnector sub-widget (existing behavior)
│
└── [mcp mode]    → OswMcpClient sub-widget:
        ├── Server URL input   # e.g. http://localhost:8765/sse
        ├── Connect / Disconnect buttons
        ├── Status indicator   # green/gray dot (mirrors OswConnector style)
        └── Tool checkbox group (same UX as OswConnector)
```

**Interface contract** (identical to `OswConnector` for drop-in compatibility):

```python
McpElnConnector(on_tools_changed: Callable[[list[BaseTool]], None] | None = None)
    .sidebar_objects  → list[Viewable]
    .main_objects     → list[Viewable]
    .tools            → list[BaseTool]
```

Switching ELN type or mode disconnects the active sub-connector and fires `on_tools_changed([])`.

---

## Dependencies

**New `pyproject.toml` extras:**

- `mcp-server`: `mcp[cli]` + existing `ai-osw` deps (langchain, osw, sparqlwrapper, pandas, python-dotenv)
- `mcp-client`: `mcp`, `langchain-mcp-adapters`, `langchain`, `python-dotenv`

---

## Out of Scope (this iteration)

- Plot tools (`AttachPlotToOswTool`, `DocumentEvaluationTool`) — deferred; require separate design for UI-state-to-server data passing
- Persistent MCP connection (keep-alive) — noted as future improvement
- Non-OSW ELN types — architecture accommodates them; implementation deferred
- Auth token on client→server connection — deferred; server assumed reachable on trusted network for now
