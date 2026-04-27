"""Usecase: AI chat + sandboxed plot + two independent OSW connectors.

Demonstrates connecting to multiple OSW instances simultaneously. Each
``OswConnector`` has its own sidebar card with credentials and tool
checkboxes. Both are pre-filled with the same env-var defaults, but the
UI fields are editable so you can point one connector at a different
instance.

Layout::

    ┌──────────────┬────────────────────────────────┐
    │  Sidebar     │  Main                          │
    │              │                                │
    │ [AI Setup]   │  ┌──────────┐  ┌────────────┐  │
    │  Provider    │  │  Chat    │  │  Plot      │  │
    │  Model       │  │          │  │            │  │
    │              │  │          │  │            │  │
    │ [OSW #1]     │  └──────────┘  └────────────┘  │
    │  Domain      ├────────────────────────────────┤
    │  [Connect]   │  Right sidebar                 │
    │  ☑ tools     │  Plot code + model override    │
    │              │                                │
    │ [OSW #2]     │                                │
    │  Domain      │                                │
    │  [Connect]   │                                │
    │  ☑ tools     │                                │
    └──────────────┴────────────────────────────────┘

Environment variables
---------------------
LLM (required — one of):
    ANTHROPIC_API_KEY
  OR
    AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION

OSW (optional — pre-fills both connector UIs):
    OSW_DOMAIN, OSW_USER, OSW_PASSWORD
    BLAZEGRAPH_ENDPOINT, BLAZEGRAPH_USER, BLAZEGRAPH_PASSWORD

Install::

    uv sync --extra ai --extra ai-llm-sandbox --extra ai-osw

Run::

    uv run python examples/usecases/multi_osw_connectors.py
"""

from __future__ import annotations

import asyncio

asyncio.set_event_loop(asyncio.new_event_loop())

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat
from panelini.panels.ai.plot import (
    PlotPanel,
    build_plot_context_sidebar,
    make_plot_tools,
)
from panelini.panels.eln_connectors.osw import OswConnector
from panelini.panels.eln_connectors.osw.tools.osw_plot_tools import make_osw_plot_tools

load_dotenv()


SYSTEM_MESSAGE = (
    "You are a helpful assistant with access to tools. "
    "ALWAYS call tools directly — never describe what a tool call would look "
    "like or output JSON of a hypothetical call.\n\n"
    "When the user asks to download files and run code:\n"
    "1. Download the files using the download tool (if available).\n"
    "2. Pass the returned file paths to plot_by_code or run_code via file_paths.\n"
    "3. Include all required pip packages in the libraries list.\n\n"
    "plot_by_code / run_code sandbox rules:\n"
    "* plot_by_code MUST save its figure to '/sandbox/output.png'.\n"
    "* Files passed via file_paths are available at '/sandbox/<BASENAME>'.\n\n"
    "You have access to tools from two OSW instances. Tool names may overlap — "
    "use the tool descriptions to distinguish which instance they belong to."
)


def create_app():
    """Factory called per browser session — fresh widgets avoid Bokeh's
    'Models must be owned by only a single document' error on reload."""

    # ── Panels ───────────────────────────────────────────────────────────
    plot_panel = PlotPanel()
    chat = AiChat(
        system_message=SYSTEM_MESSAGE,
        tools=make_plot_tools(plot_panel),
    )

    osw_1 = OswConnector(title="OSW Connector 1")
    osw_2 = OswConnector(title="OSW Connector 2")

    def _make_osw_callback(connector: OswConnector, group: str):
        def _on_tools_changed(osw_tools: list) -> None:
            bridge_tools = (
                make_osw_plot_tools(connection=connector.connection, panel=plot_panel) if connector.connected else []
            )
            chat.register_external_tools(group, osw_tools + bridge_tools)

        return _on_tools_changed

    osw_1.on_tools_changed = _make_osw_callback(osw_1, "osw_1")
    osw_2.on_tools_changed = _make_osw_callback(osw_2, "osw_2")

    # ── Layout ───────────────────────────────────────────────────────────
    app = Panelini(
        title="AI + Plot + Multi-OSW",
        sidebar_enabled=True,
        sidebar_right_enabled=True,
        sidebar_right_visible=True,
    )

    app.sidebar_set(
        objects=[
            *chat.sidebar_objects,
            *osw_1.sidebar_objects,
            *osw_2.sidebar_objects,
        ]
    )
    app.sidebar_right_set(objects=build_plot_context_sidebar(plot_panel))

    chat_card = pn.Card(
        chat.chat_interface,
        title="Chat",
        collapsible=False,
        sizing_mode="stretch_both",
        min_height=600,
        styles={"padding": "15px", "margin-right": "10px"},
    )
    plot_card = pn.Card(
        plot_panel.plot_panel,
        title="Plot",
        collapsible=False,
        sizing_mode="stretch_both",
        min_height=600,
        styles={"padding": "15px", "margin-left": "10px"},
    )
    app.main_set(objects=[pn.Row(chat_card, plot_card, sizing_mode="stretch_both")])

    return app._panel


if __name__ == "__main__":
    pn.serve(
        create_app,
        title="AI + Plot + Multi-OSW",
        port=5011,
        session_token_expiration=3600,
    )
