"""Minimal example: standalone OSW connector panel.

Demonstrates the ``OswConnector`` sidebar card without any AI chat.
Fill in domain/credentials and click "Connect" to verify the connection.
Tool checkboxes appear in the connector card — toggling them fires the
``on_tools_changed`` callback with only the checked tools.

Install::

    pip install 'panelini[ai-osw]'

Run::

    python examples/panels/eln_connectors/osw_connector_min.py
"""

from __future__ import annotations

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.eln_connectors.osw import OswConnector

load_dotenv()

status_pane = pn.pane.Markdown("No tools (disconnected).", sizing_mode="stretch_width")


def _on_tools_changed(tools: list) -> None:
    if tools:
        names = ", ".join(f"`{t.name}`" for t in tools)
        status_pane.object = f"**{len(tools)} active tool(s):** {names}"
    else:
        status_pane.object = "No tools (disconnected or all unchecked)."


osw_connector = OswConnector(on_tools_changed=_on_tools_changed)

app = Panelini(title="OSW Connector", sidebar_enabled=True)
app.sidebar_set(objects=osw_connector.sidebar_objects)
app.main_set(objects=[pn.Card(status_pane, title="Active Tools")])

if __name__ == "__main__":
    pn.serve(app.servable(), title="OSW Connector", port=5009)
