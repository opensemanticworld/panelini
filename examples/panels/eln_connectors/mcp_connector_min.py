"""Minimal McpElnConnector example.

Start an OSW MCP server first:
    panelini-osw-mcp-server --domain wiki.example.com --user bot --password secret

Then run this example:
    panel serve examples/panels/eln_connectors/mcp_connector_min.py --port 5010
"""

import panel as pn

from panelini import Panelini
from panelini.panels.eln_connectors import McpElnConnector

pn.extension()

status_pane = pn.pane.Markdown("No tools active.")


def _on_tools_changed(tools):
    if tools:
        names = ", ".join(t.name for t in tools)
        status_pane.object = f"**Active tools ({len(tools)}):** {names}"
    else:
        status_pane.object = "No tools active."


connector = McpElnConnector(on_tools_changed=_on_tools_changed)

app = Panelini(title="MCP ELN Connector", sidebar_enabled=True)
app.sidebar_set(objects=connector.sidebar_objects)
app.main_set(objects=[pn.Card(status_pane, title="Active Tools")])
app.servable()
