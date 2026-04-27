"""Minimal McpElnConnector example — MCP mode.

The MCP server handles OSW authentication. Start it first:

    panelini-osw-mcp-server --domain $OSW_DOMAIN --user $OSW_USER --password $OSW_PASSWORD

Then run this panel directly:

    python examples/panels/eln_connectors/mcp_connector_min.py

Or via panel serve:

    panel serve examples/panels/eln_connectors/mcp_connector_min.py --port 5009

Enter the server base URL (e.g. http://localhost:8765) and click Connect.
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

if __name__ == "__main__":
    pn.serve(app.servable(), title="MCP OSW Connector", port=5009)
