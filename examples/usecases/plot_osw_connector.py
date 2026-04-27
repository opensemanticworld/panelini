"""Usecase: AI chat + sandboxed plot + OSW connector.

Combines the ``PlotPanel`` (sandboxed matplotlib plotting) with the
``OswConnector`` (OpenSemanticWorld data source). The left sidebar holds
the AI chat settings (provider, model, basic tools) and below it the
OSW connector card. Connecting to an OSW instance dynamically adds
OSW tools as checkboxes in both the connector card and the AI chat's
tool list.

Layout::

    ┌──────────────┬─────────────────────────┬─────────────┐
    │  Sidebar     │  Main                   │ Right       │
    │              │                         │ sidebar     │
    │ [AI Setup]   │  ┌────────┐ ┌────────┐  │             │
    │  Provider    │  │ Chat   │ │ Plot   │  │ Plot code   │
    │  Model       │  │        │ │        │  │ Model       │
    │  Basic Tools │  │        │ │        │  │ override    │
    │              │  └────────┘ └────────┘  │ [Regenerate]│
    │ [OSW Conn.]  │                         │             │
    │  Domain      │                         │             │
    │  User/Pass   │                         │             │
    │  [Connect]   │                         │             │
    │  ☑ tools     │                         │             │
    └──────────────┴─────────────────────────┴─────────────┘

Environment variables
---------------------
LLM (required — one of):
    ANTHROPIC_API_KEY
  OR
    AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION

OSW (optional — pre-fills the connector UI):
    OSW_DOMAIN, OSW_USER, OSW_PASSWORD
    BLAZEGRAPH_ENDPOINT, BLAZEGRAPH_USER, BLAZEGRAPH_PASSWORD

Install::

    uv sync --extra ai --extra ai-llm-sandbox --extra ai-osw

Run::

    uv run python examples/usecases/plot_osw_connector.py
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
    "You are a helpful assistant. Always call tools directly — never output "
    "hypothetical tool-call JSON.\n\n"
    "Tool priority: to discover or inspect data, use OSW tools first "
    "(sparql_search → find_out_everything_about). Use sandbox tools "
    "(plot_by_code, run_code) only to execute code or plot.\n\n"
    "When the user asks to download files and run code:\n"
    "1. Download the files using the download tool (if available).\n"
    "2. Pass the returned file paths to plot_by_code or run_code via file_paths.\n"
    "3. Include all required pip packages in the libraries list.\n\n"
    "LLM Sandbox rules:\n"
    "* DO NOT USE SANDBOX WHEN IS NOT NEEDED, CAUSE IT IS TIME EXPENSIVE!"
    "* plot_by_code MUST save to '/sandbox/output.png'.\n"
    "* file_paths are available at '/sandbox/<BASENAME>'.\n"
    "* Before calling plot_by_code/run_code, ensure ALL required input files "
    "are downloaded and ALL non-default pip packages are listed in libraries.\n"
    "* Never fabricate data — download actual files via download_osl_file.\n"
    "* pip ≠ import: e.g. micress-micpy (NOT micpy).\n\n"
    "If a tool fails with 'osw.model.entity has no attribute <X>', call "
    "fetch_osw_schema with the Category title(s), then retry."
)


def create_app():
    """Factory called per browser session — fresh widgets avoid Bokeh's
    'Models must be owned by only a single document' error on reload."""

    # ── Panels ───────────────────────────────────────────────────────────
    plot_panel = PlotPanel(verbose=True)
    chat = AiChat(
        system_message=SYSTEM_MESSAGE,
        tools=make_plot_tools(plot_panel),
    )

    osw_connector = OswConnector()

    def _on_osw_tools_changed(osw_tools: list) -> None:
        bridge_tools = (
            make_osw_plot_tools(connection=osw_connector.connection, panel=plot_panel)
            if osw_connector.connected
            else []
        )
        chat.register_external_tools("osw", osw_tools + bridge_tools)

    osw_connector.on_tools_changed = _on_osw_tools_changed

    # ── Layout ───────────────────────────────────────────────────────────
    app = Panelini(
        title="AI + Plot + OSW",
        sidebar_enabled=True,
        sidebar_right_enabled=True,
        sidebar_right_visible=False,
    )

    app.sidebar_set(objects=[*chat.sidebar_objects, *osw_connector.sidebar_objects])
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
        title="AI + Plot + OSW",
        port=5010,
        session_token_expiration=3600,
    )
