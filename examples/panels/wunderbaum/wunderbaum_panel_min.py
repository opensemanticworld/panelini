"""Simple tree example demonstrating basic Wunderbaum usage (tree-only mode)."""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {
        "title": "Node 1",
        "key": "1",
        "expanded": True,
        "children": [
            {"title": "Node 1.1", "key": "1.1"},
            {
                "title": "Node 1.2",
                "key": "1.2",
                "children": [
                    {"title": "Node 1.2.1", "key": "1.2.1"},
                ],
            },
        ],
    },
    {"title": "Node 2", "key": "2"},
    {"title": "Node 3", "key": "3"},
]

tree = Wunderbaum(source=source)

if __name__ == "__main__":
    pn.serve(tree)
