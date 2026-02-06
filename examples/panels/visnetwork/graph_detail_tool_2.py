"""GraphDetailTool example with file drop support."""

import panel as pn

from panelini.panels.visnetwork import GraphDetailTool

pn.extension()

nodes = [
    {
        "id": 1,
        "label": "Drop an Image File into the graph-widget",
        "shape": "ellipse",
        "color": "green",
    },
    {
        "id": 2,
        "label": "Drop a csv File into the graph-widget",
        "shape": "ellipse",
        "color": "green",
    },
]

edges = []


if __name__ == "__main__":
    graph_detail_panel = GraphDetailTool(nodes=nodes, edges=edges)
    pn.serve(graph_detail_panel, threaded=True)
