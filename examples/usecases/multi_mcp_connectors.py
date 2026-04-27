"""Usecase: AI chat with two MCP-connected OSW instances — llm4eln and matolab.

Start both MCP servers first (each pointing at its own OSW instance):


Then run this panel:

    uv run python examples/usecases/multi_mcp_connectors.py

Or via panel serve:

    panel serve examples/usecases/multi_mcp_connectors.py --port 5012

The server URLs are pre-filled. Click Connect in each card to load tools,
then start chatting. The AI sees tools from both instances simultaneously.

Layout::

    ┌────────────────┬──────────────────────────────────────────┐
    │  Sidebar       │  Main                                    │
    │                │                                          │
    │ [AI Setup]     │  ┌────────────────────────────────────┐  │
    │  Provider      │  │  Chat                              │  │
    │  Model         │  │                                    │  │
    │  Temperature   │  │  ···                               │  │
    │                │  │                                    │  │
    │ ▶ OSW: llm4eln │  └────────────────────────────────────┘  │
    │  Server URL    │                                          │
    │  [Connect]     │                                          │
    │  ☑ tools       │                                          │
    │                │                                          │
    │ ▶ OSW: matolab │                                          │
    │  Server URL    │                                          │
    │  [Connect]     │                                          │
    │  ☑ tools       │                                          │
    └────────────────┴──────────────────────────────────────────┘

Environment variables
---------------------
LLM (required — one of):
    ANTHROPIC_API_KEY
  OR
    AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION

OSW (optional — pre-fills both connector UIs):
    OSW_USER, OSW_PASSWORD  (credentials are handled by the MCP servers)

Install::

    uv sync --extra ai --extra mcp-client
"""

from __future__ import annotations

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat
from panelini.panels.eln_connectors import MCP_SYSTEM_MESSAGE, McpElnConnector

load_dotenv()

SYSTEM_MESSAGE = (
    MCP_SYSTEM_MESSAGE + "\nYou have tools from two instances — llm4eln and matolab. "
    "Tool names may overlap; use the tool descriptions to pick the right instance."
)


def create_app():
    """Factory called per browser session — fresh widgets avoid shared-state issues."""

    chat = AiChat(system_message=SYSTEM_MESSAGE)

    connector_llm4eln = McpElnConnector(
        initial_mode="mcp",
        server_url="http://localhost:8765",
        on_tools_changed=lambda tools: chat.register_external_tools("llm4eln", tools),
    )
    connector_matolab = McpElnConnector(
        initial_mode="mcp",
        server_url="http://localhost:8766",
        on_tools_changed=lambda tools: chat.register_external_tools("matolab", tools),
    )

    app = Panelini(title="AI Chat — llm4eln + matolab via MCP", sidebar_enabled=True)

    app.sidebar_set(
        objects=[
            *chat.sidebar_objects,
            pn.Card(
                *connector_llm4eln.sidebar_objects,
                title="OSW: llm4eln",
                collapsible=True,
                collapsed=False,
            ),
            pn.Card(
                *connector_matolab.sidebar_objects,
                title="OSW: matolab",
                collapsible=True,
                collapsed=False,
            ),
        ]
    )
    app.main_set(objects=chat.main_objects)

    return app._panel


if __name__ == "__main__":
    pn.serve(
        create_app,
        title="AI Chat — llm4eln + matolab via MCP",
        port=5012,
        session_token_expiration=3600,
    )
