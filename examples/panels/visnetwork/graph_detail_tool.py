"""GraphDetailTool example with edit controls and node details."""

import panel as pn

from panelini.panels.visnetwork import GraphDetailTool

pn.extension()

nodes = [
    {"id": 1, "label": "Alpha"},
    {"id": 2, "label": "Beta"},
    {"id": 3, "label": "Gamma"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
    {"from": 3, "to": 1},
]

tool = GraphDetailTool(nodes=nodes, edges=edges)

if __name__ == "__main__":
    pn.serve(tool)
