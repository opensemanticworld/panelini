"""Simple network example demonstrating basic VisNetwork usage."""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

nodes = [
    {"id": 1, "label": "Node 1"},
    {"id": 2, "label": "Node 2"},
    {"id": 3, "label": "Node 3"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
]

vis = VisNetwork(nodes=nodes, edges=edges)

if __name__ == "__main__":
    pn.serve(vis)
