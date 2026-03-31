"""Lazy loading example for Wunderbaum.

Demonstrates how lazy nodes are loaded on demand when expanded.
The lazy_load_callback is called when a lazy node is expanded for the first time.
"""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {"title": "Root 1", "key": "r1", "lazy": True, "icon": "bi bi-folder"},
    {"title": "Root 2", "key": "r2", "lazy": True, "icon": "bi bi-folder"},
    {
        "title": "Root 3 (pre-loaded)",
        "key": "r3",
        "icon": "bi bi-folder",
        "expanded": True,
        "children": [
            {"title": "Pre-loaded Child 1", "key": "r3_1", "icon": "bi bi-file-earmark"},
            {"title": "Pre-loaded Child 2", "key": "r3_2", "icon": "bi bi-file-earmark"},
        ],
    },
]

# Track load count per node for demo purposes
load_counts: dict[str, int] = {}


def on_lazy_load(key: str, request_data: dict) -> list[dict]:
    """Return children for a lazy node.

    In a real application, this would query a database, API, or filesystem.
    """
    load_counts[key] = load_counts.get(key, 0) + 1
    count = load_counts[key]
    print(f"Lazy loading children for node '{key}' (load #{count})")

    depth = key.count("_")
    children = []
    for i in range(1, 4):
        child_key = f"{key}_{i}"
        child = {
            "title": f"Child {i} of {request_data.get('title', key)}",
            "key": child_key,
        }
        # Make deeper nodes lazy too, up to 3 levels
        if depth < 2:
            child["lazy"] = True
            child["icon"] = "bi bi-folder"
        else:
            child["icon"] = "bi bi-file-earmark"
        children.append(child)

    return children


status = pn.pane.Markdown("**Status:** Expand a lazy node to load its children.")


def on_tree_event(event_name: str, event_params: dict) -> None:
    if event_name == "expand":
        key = event_params.get("key", "")
        flag = event_params.get("flag", True)
        action = "Expanded" if flag else "Collapsed"
        status.object = f"**Status:** {action} node '{key}'"
    elif event_name == "activate":
        title = event_params.get("title", "")
        status.object = f"**Status:** Activated '{title}'"


tree = Wunderbaum(
    source=source,
    lazy_load_callback=on_lazy_load,
    tree_event_callback=on_tree_event,
)

app = pn.Column(
    "# Lazy Loading Demo",
    "Expand nodes to load children on demand. Lazy nodes load up to 3 levels deep.",
    status,
    tree,
)

if __name__ == "__main__":
    pn.serve(app)
