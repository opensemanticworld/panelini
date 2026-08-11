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
    # GraphDetailTool duck-types as a Viewer (has __panel__) but does not
    # subclass panel.viewable.Viewer, so it does not satisfy serve()'s
    # TViewableFuncOrPath union. Fixing the base class lives in src/, out of
    # scope here.
    pn.serve(tool)  # ty: ignore[invalid-argument-type]
