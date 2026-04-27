"""Minimal McpElnConnector example — MCP mode.

The MCP server handles OSW authentication. Start it first:

    panelini-osw-mcp-server --domain $OSW_DOMAIN --user $OSW_USER --password $OSW_PASSWORD

Then serve this panel:

    panel serve examples/panels/eln_connectors/mcp_connector_min.py --port 5010

Enter the server endpoint (default: http://localhost:8765/sse) and click Connect.
"""

import panel as pn

from panelini import Panelini
from panelini.panels.eln_connectors import McpElnConnector

pn.extension()

active_tools_pane = pn.pane.Markdown("No tools active.")


def _on_tools_changed(tools):
    if tools:
        rows = "\n".join(f"- `{t.name}`" for t in tools)
        active_tools_pane.object = f"**{len(tools)} active tool(s):**\n\n{rows}"
    else:
        active_tools_pane.object = "No tools active."


connector = McpElnConnector(on_tools_changed=_on_tools_changed, initial_mode="mcp")

app = Panelini(title="OSW MCP Connector", sidebar_enabled=True)
app.sidebar_set(objects=connector.sidebar_objects)
app.main_set(objects=[pn.Card(active_tools_pane, title="Active Tools")])
app.servable()
