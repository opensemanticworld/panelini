"""Simple VisNetwork example wrapped in Panelini."""

import panel as pn

from panelini import Panelini
from panelini.panels.visnetwork import VisNetwork

nodes = [
    {"id": 1, "label": "Node 1"},
    {"id": 2, "label": "Node 2"},
    {"id": 3, "label": "Node 3"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
]

visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)

# Create an instance of Panelini
app = Panelini(
    title="Network Graph Demo",
)

# Set the main content with the VisNetwork component
app.main_set(
    objects=[
        pn.Card(
            title="VisNetwork",
            objects=[visnetwork_panel],
            max_height=800,
        )
    ]
)

# Servable for debugging using command
# panel serve visnetwork_panelini_min.py --dev
app.servable()

if __name__ == "__main__":
    # Serve app as you would in panel
    pn.io.server.serve(app, port=5010)
