"""Multi-select with checkboxes, plus drag-and-drop of the whole selection.

``selectMode: "multi"`` treats a checkbox as another view of the row selection
rather than a state of its own, and propagates in one direction only:

- Checking a folder checks every node below it.
- Unchecking one child leaves the folder itself checked. There is no tri-state
  parent and no upward propagation, which is what separates ``multi`` from
  ``hier``.
- Checking every child of a folder therefore does *not* check the folder.

With ``dnd: True`` a drag that starts on a checked row carries the entire
selection, not just the row under the cursor. Nodes that would not move are
dropped from the set, so dragging onto a folder that already holds some of the
selection moves only the rest.
"""

import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "icon": "bi bi-folder",
        "children": [
            {"title": "File 1", "key": "a/1", "icon": "bi bi-file-earmark"},
            {"title": "File 2", "key": "a/2", "icon": "bi bi-file-earmark"},
            {"title": "File 3", "key": "a/3", "icon": "bi bi-file-earmark"},
        ],
    },
    {
        "title": "Folder B",
        "key": "b",
        "expanded": True,
        "icon": "bi bi-folder",
        "children": [
            {"title": "File 4", "key": "b/4", "icon": "bi bi-file-earmark"},
            {"title": "File 5", "key": "b/5", "icon": "bi bi-file-earmark"},
        ],
    },
]


def selected_keys(src: list[dict]) -> list[str]:
    """Walk *src* and return the keys of every node marked ``selected``."""
    keys: list[str] = []

    def walk(nodes: list[dict]) -> None:
        for node in nodes:
            if node.get("selected"):
                keys.append(node["key"])
            walk(node.get("children", []))

    walk(src)
    return keys


tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "selectMode": "multi", "dnd": True},
    height=260,
)

selection_display = pn.pane.Markdown("**Selected:** (none)")


def _on_source_change(*args: object) -> None:
    keys = selected_keys(tree.source)
    selection_display.object = f"**Selected:** {', '.join(keys)}" if keys else "**Selected:** (none)"


tree.param.watch(_on_source_change, ["source"])

app = Panelini(title="Multi-select + drag-and-drop", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Card(
            title="Multi-select tree",
            objects=[tree],
            sizing_mode="stretch_width",
        ),
        selection_display,
    ]
)
app.servable()

if __name__ == "__main__":
    pn.io.server.serve(app, port=5013)
