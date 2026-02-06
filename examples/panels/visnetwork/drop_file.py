"""File drop example - drag and drop files onto the network."""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

nodes = [
    {
        "id": 1,
        "label": "Drop an Image File into the graph-widget",
        "shape": "ellipse",
        "color": "green",
    },
]

edges = []


if __name__ == "__main__":
    visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)
    pn.serve(visnetwork_panel, threaded=True)
