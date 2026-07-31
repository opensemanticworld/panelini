# VisNetwork Ctrl+drag duplicate

**Source:** [`examples/panels/visnetwork/ctrl_drag_duplicate.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/ctrl_drag_duplicate.py)
**Test:** [`tests/panels/visnetwork/examples/test_ctrl_drag_duplicate.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_ctrl_drag_duplicate.py)

Hold **Ctrl** and drag a node (or a multi-selection) to clone it. Each duplicate is created with an edge back to its original, and their new positions sync to Python.

## How it works

Pass a `nodes_duplicated_callback` to `VisNetwork`. After the drag ends it receives the list of duplicated node dicts, so you can post-process them, for example tag copies and recolour them:

```python
def on_nodes_duplicated(duplicated_nodes):
    nodes = list(vis.nodes)
    for dup in duplicated_nodes:
        for i, node in enumerate(nodes):
            if node["id"] == dup["id"]:
                nodes[i] = {**node, "label": f"{node['label']} (copy)", "color": "#ff9800"}
    vis.set_nodes(nodes)

vis = VisNetwork(
    nodes=nodes,
    edges=edges,
    options={"interaction": {"multiselect": True}},
    nodes_duplicated_callback=on_nodes_duplicated,
)
```

Enable `interaction.multiselect` so several nodes can be selected and duplicated at once.

## See also

- {doc}`../panels/visnetwork` - full `VisNetwork` guide
- {doc}`visnetwork_context_menu` - right-click actions on nodes and edges
