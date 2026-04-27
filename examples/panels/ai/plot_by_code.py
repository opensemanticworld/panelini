"""Example: AI chat that plots matplotlib figures in a sandboxed Docker container.

The chat agent is wired to a ``PlotPanel`` (on the right of the chat) via three
``BaseTool`` wrappers: ``plot_by_code``, ``run_code``, ``load_data_from_csv``.

An ``OswConnector`` panel in the sidebar lets the user connect to one or more
OpenSemanticWorld instances. On connect, eight OSW-connector tools and two
OSW-plot bridge tools are dynamically registered in the chat; on disconnect
they are removed.

Environment variables
---------------------
LLM — one of the following provider set-ups (see ``src/panelini/panels/ai/default_config.yml``):
    ANTHROPIC_API_KEY
  OR
    AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_VERSION

OSW (optional, pre-fills the connector UI fields):
    OSW_DOMAIN
    OSW_USER
    OSW_PASSWORD
    BLAZEGRAPH_ENDPOINT
    BLAZEGRAPH_USER
    BLAZEGRAPH_PASSWORD

Panelini (optional):
    PANELINI_AI_CONFIG_PATH  # override the default AI config file

Install hints
-------------
With uv (from a checkout of this repo):
    uv sync --extra ai --extra ai-llm-sandbox
    # or, with OSW connector:
    uv sync --extra ai --extra ai-llm-sandbox --extra ai-osw

    # Run the example:
    uv run python examples/panels/ai/plot_by_code.py

Runtime requirements
--------------------
* Docker daemon running (``plot_by_code`` / ``run_code`` spin up
  ``python:3.12-slim`` sandbox containers).
* A ``.env`` file next to this script (or exported env vars) with the LLM
  credentials; ``python-dotenv`` is loaded below.

Right sidebar — plot model override
-----------------------------------
The right sidebar exposes the last plot's Python code, a model picker
(default: *Claude Sonnet 4.6*), and a *Regenerate plot* button. Clicking
*Regenerate* asks the selected model to rewrite the current plot script
according to a free-text "what should change?" instruction and re-runs
it through the same sandbox. The main chat agent is unchanged and still
drives the primary plotting flow.
"""

from __future__ import annotations

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
    "ALWAYS call tools directly to fulfill the user's request — never describe "
    "what a tool call would look like or output JSON of a hypothetical call. "
    "If you have the information needed to call a tool, call it immediately.\n\n"
    "When the user asks to download files and run code:\n"
    "1. Download the files using the download tool (if available).\n"
    "2. Pass the returned file paths directly to plot_by_code or run_code via "
    "the file_paths parameter.\n"
    "3. Include all required pip packages in the libraries list.\n\n"
    "plot_by_code / run_code sandbox rules:\n"
    "* plot_by_code MUST save its figure to '/sandbox/output.png'.\n"
    "* Files passed via file_paths are available at '/sandbox/<BASENAME>'.\n\n"
    "MICRESS / micpy usage (pip package: micress-micpy):\n"
    "Geometry files (.geof) are automatically paired with binary files in the "
    "sandbox — do NOT set geometry manually. Correct API:\n"
    "    from micpy import bin\n"
    "    with bin.File('/sandbox/FILENAME.conc1') as f:\n"
    "        field = f.read(-1)            # NOT read_field()\n"
    "        fig, ax, cbar = field.plot()  # NOT bin.plot()\n"
    "        fig.savefig('/sandbox/output.png')\n\n"
    "If the user wants to create something in OSW, first try to find the "
    "category page for the given topic/keyword, then create the instance."
)


plot_panel = PlotPanel()
tools = make_plot_tools(plot_panel)

chat = AiChat(system_message=SYSTEM_MESSAGE, tools=tools)

osw_connector = OswConnector()


def _on_osw_tools_changed(osw_tools: list) -> None:
    """Callback: register/deregister OSW tools in the chat when connection changes."""
    bridge_tools = (
        make_osw_plot_tools(connection=osw_connector.connection, panel=plot_panel) if osw_connector.connected else []
    )
    chat.register_external_tools("osw", osw_tools + bridge_tools)


osw_connector.on_tools_changed = _on_osw_tools_changed

app = Panelini(
    title="AI + Plot by Code",
    sidebar_enabled=True,
    sidebar_right_enabled=True,
    sidebar_right_visible=True,
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


if __name__ == "__main__":
    pn.serve(app.servable(), title="AI + Plot by Code", port=5008)
