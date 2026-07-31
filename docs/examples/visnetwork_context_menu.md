# VisNetwork context menus

**Source:** [`examples/panels/visnetwork/context_menu.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/context_menu.py)
**Test:** [`tests/panels/visnetwork/examples/test_visnetwork_context_menu.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_context_menu.py)

Right-click a node or edge to open a per-element context menu, then act on the selection from Python.

## How it works

Attach a `callback_name_dict` to any node or edge. It maps an action id to the label shown in the menu:

```python
{
    "id": 1,
    "label": "Root Folder",
    "callback_name_dict": {
        "edit": "Edit Label",
        "add_child": "Add Child",
        "delete": "Delete",
    },
}
```

Elements without a `callback_name_dict` (for example a locked "system" node) show no menu.

Pass a `context_menu_callback` to `VisNetwork`; it is called with `(element_type, element_id, action_id)` when a menu item is selected, so you can mutate the graph via `set_nodes` / `add_node` / `remove_node` (and the edge equivalents):

```python
def on_context_menu(element_type, element_id, action_id):
    if element_type == "node" and action_id == "delete":
        vis.remove_node(element_id)

vis = VisNetwork(nodes=nodes, edges=edges, context_menu_callback=on_context_menu)
```

## See also

- {doc}`../panels/visnetwork` - full `VisNetwork` guide
- {doc}`visnetwork_ctrl_drag_duplicate` - duplicate nodes with Ctrl+drag
- {doc}`context_menu` - the Wunderbaum tree context menu
