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
    # GraphDetailTool duck-types as a Viewer (has __panel__) but does not
    # subclass panel.viewable.Viewer, so it does not satisfy serve()'s
    # TViewableFuncOrPath union. Fixing the base class lives in src/, out of
    # scope here.
    pn.serve(graph_detail_panel, threaded=True)  # ty: ignore[invalid-argument-type]
