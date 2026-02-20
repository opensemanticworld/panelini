"""Minimal example: VisNetwork node with json_data tooltip."""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

nodes = [
    {
        "id": "n1",
        "label": "Test Node",
        "x": 0,
        "y": 0,
        "fixed": True,
        "json_data": {"temperature": 25.0, "unit": "celsius", "active": True},
    },
]

vis = VisNetwork(
    nodes=nodes,
    edges=[],
    options={"physics": {"enabled": False}},
)

if __name__ == "__main__":
    pn.serve(vis)
