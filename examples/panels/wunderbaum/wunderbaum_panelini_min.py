"""Simple Wunderbaum tree example wrapped in Panelini."""

import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Node 1",
        "key": "1",
        "expanded": True,
        "children": [
            {"title": "Node 1.1", "key": "1.1"},
            {"title": "Node 1.2", "key": "1.2"},
        ],
    },
    {"title": "Node 2", "key": "2"},
    {"title": "Node 3", "key": "3"},
]

tree = Wunderbaum(source=source)

app = Panelini(title="Wunderbaum Tree Demo")

app.main_set(
    objects=[
        pn.Card(
            title="Wunderbaum",
            objects=[tree],
            max_height=800,
        )
    ]
)

app.servable()

if __name__ == "__main__":
    pn.io.server.serve(app, port=5010)
