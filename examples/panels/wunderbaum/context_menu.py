"""Tree-only example with built-in context menu.

Right-click a node to see a context menu with actions.
Demonstrates: tree-only mode (no columns), context menu via
context_menu_items parameter, and dynamic tree manipulation.
"""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {
        "title": "Project",
        "key": "project",
        "icon": "bi bi-folder-fill",
        "expanded": True,
        "children": [
            {
                "title": "src",
                "key": "src",
                "icon": "bi bi-folder-fill",
                "expanded": True,
                "children": [
                    {"title": "main.py", "key": "main", "icon": "bi bi-file-earmark-code"},
                    {"title": "utils.py", "key": "utils", "icon": "bi bi-file-earmark-code"},
                ],
            },
            {
                "title": "tests",
                "key": "tests",
                "icon": "bi bi-folder-fill",
                "children": [
                    {"title": "test_main.py", "key": "test_main", "icon": "bi bi-file-earmark-code"},
                ],
            },
            {"title": "README.md", "key": "readme", "icon": "bi bi-file-earmark-text"},
        ],
    },
]

status = pn.pane.Markdown("**Right-click** a node to open the context menu.")
counter = {"value": 0}


def on_tree_event(event_name: str, event_params: dict) -> None:
    if event_name == "contextmenu":
        action = event_params.get("action", "")
        key = event_params.get("key", "")
        title = event_params.get("title", "")

        if action == "add_child":
            counter["value"] += 1
            tree.add_node(
                key,
                {
                    "title": f"New Node {counter['value']}",
                    "key": f"new_{counter['value']}",
                    "icon": "bi bi-file-earmark",
                },
            )
            tree.expand_node(key, True)
            status.object = f"**Added** child to `{title}`"

        elif action == "rename":
            tree.rename_node(key, f"Renamed_{key}")
            status.object = f"**Renamed** `{title}`"

        elif action == "delete":
            tree.remove_node(key)
            status.object = f"**Deleted** `{title}`"

    elif event_name == "activate":
        title = event_params.get("title", "")
        status.object = f"**Activated:** {title}"


tree = Wunderbaum(
    source=source,
    context_menu_items=[
        {"id": "add_child", "label": "Add Child", "icon": "bi bi-plus-circle"},
        {"id": "rename", "label": "Rename", "icon": "bi bi-pencil"},
        {"id": "delete", "label": "Delete", "icon": "bi bi-trash"},
    ],
    tree_event_callback=on_tree_event,
)

app = pn.Column(
    "# Tree with Context Menu",
    "Right-click a node for actions.",
    status,
    tree,
)

if __name__ == "__main__":
    pn.serve(app)
