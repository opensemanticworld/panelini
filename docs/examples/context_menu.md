# Context menu: right-click actions

**Source:** [`examples/panels/wunderbaum/context_menu.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/context_menu.py)
**Test:** [`tests/panels/wunderbaum/examples/test_context_menu.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_context_menu.py)

A tree-only Wunderbaum with a built-in context menu. Right-click a node to add a child, rename, or delete it, all handled by a single event callback that manipulates the tree via the Python API.

## The code

```python
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
            {"title": "src", "key": "src", "icon": "bi bi-folder-fill", "children": [...]},
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
            tree.add_node(key, {"title": f"New Node {counter['value']}", "key": f"new_{counter['value']}"})
            tree.expand_node(key, True)
            status.object = f"**Added** child to `{title}`"
        elif action == "rename":
            tree.rename_node(key, f"Renamed_{key}")
        elif action == "delete":
            tree.remove_node(key)
    elif event_name == "activate":
        status.object = f"**Activated:** {event_params.get('title', '')}"


tree = Wunderbaum(
    source=source,
    context_menu_items=[
        {"id": "add_child", "label": "Add Child", "icon": "bi bi-plus-circle"},
        {"id": "rename", "label": "Rename", "icon": "bi bi-pencil"},
        {"id": "delete", "label": "Delete", "icon": "bi bi-trash"},
    ],
    tree_event_callback=on_tree_event,
)
```

Key points:

- `context_menu_items` declares the menu entries. Each `id` becomes the `action` string delivered to the callback.
- `tree_event_callback` receives `(event_name, event_params)` for every tree event. Filter on `event_name == "contextmenu"` and dispatch on `event_params["action"]`.
- The callback drives the tree through the Python API: `add_node`, `rename_node`, `remove_node`, `expand_node`.

## How the test exercises it

The test serves the app and asserts the tree renders with rows. Note that the sibling {doc}`virtual_filesystem` test marks its right-click assertion `xfail`, since dispatching a real `contextmenu` event through the shadow DOM is unreliable under Playwright, so this example is verified for render and the callback logic is covered by the Python-API paths elsewhere.

## See also

- {doc}`virtual_filesystem`: context menu plus DnD, rename, and file drop
- {doc}`incremental_tree_demo`: the same manipulation API, driven by buttons
