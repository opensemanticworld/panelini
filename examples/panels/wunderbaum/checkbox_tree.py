"""Hierarchical checkbox tree with tri-state selection.

Demonstrates ``selectMode: "hier"`` which propagates checkbox state:
- Checking a parent checks all children.
- Partial child selection shows an indeterminate checkbox on the parent.

The "Checked" display updates live as checkboxes are toggled.
"""

import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Fruits",
        "key": "fruits",
        "expanded": True,
        "children": [
            {
                "title": "Citrus",
                "key": "citrus",
                "expanded": True,
                "children": [
                    {"title": "Orange", "key": "orange"},
                    {"title": "Lemon", "key": "lemon"},
                    {"title": "Lime", "key": "lime"},
                ],
            },
            {
                "title": "Berries",
                "key": "berries",
                "children": [
                    {"title": "Strawberry", "key": "strawberry"},
                    {"title": "Blueberry", "key": "blueberry"},
                ],
            },
        ],
    },
    {
        "title": "Vegetables",
        "key": "vegetables",
        "expanded": True,
        "children": [
            {
                "title": "Root",
                "key": "root",
                "children": [
                    {"title": "Carrot", "key": "carrot"},
                    {"title": "Potato", "key": "potato"},
                ],
            },
            {
                "title": "Leafy",
                "key": "leafy",
                "children": [
                    {"title": "Spinach", "key": "spinach"},
                    {"title": "Lettuce", "key": "lettuce"},
                ],
            },
        ],
    },
]


def _get_checked_keys(src: list[dict]) -> list[str]:
    """Walk *src* and return keys of nodes with ``selected: True``."""
    keys: list[str] = []

    def walk(nodes: list[dict]) -> None:
        for n in nodes:
            if n.get("selected"):
                keys.append(n["key"])
            walk(n.get("children", []))

    walk(src)
    return keys


tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "selectMode": "hier"},
)

checked_display = pn.pane.Markdown("**Checked:** (none)")


def _on_source_change(*args: object) -> None:
    keys = _get_checked_keys(tree.source)
    if keys:
        checked_display.object = f"**Checked:** {', '.join(keys)}"
    else:
        checked_display.object = "**Checked:** (none)"


tree.param.watch(_on_source_change, ["source"])

app = Panelini(title="Checkbox Tree Demo")
app.main_set(
    objects=[
        pn.Card(
            title="Checkbox Tree",
            objects=[tree],
            max_height=800,
            sizing_mode="stretch_width",
        ),
        checked_display,
    ]
)
app.servable()

if __name__ == "__main__":
    pn.io.server.serve(app, port=5011)
