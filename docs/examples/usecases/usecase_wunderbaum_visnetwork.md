# Use case: tree + graph editor

```{image} /_static/media/usecases/wunderbaum_visnetwork_overview.webp
:alt: wunderbaum visnetwork overview
:class: docs-media
```

**Source:** [`examples/usecases/wunderbaum_visnetwork.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/usecases/wunderbaum_visnetwork.py)
**Test:** [`tests/usecases/test_wunderbaum_visnetwork.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/usecases/test_wunderbaum_visnetwork.py)

A class hierarchy shown as both a [`Wunderbaum`](../../panels/index) treegrid (left) and a
[`VisNetwork`](../../panels/visnetwork) graph (right), with a detail sidebar. One shared data
model (`NODES`, `EDGES`) feeds both widgets, and every mutation flows through the model and
the incremental APIs of each widget (`add_node` / `remove_node` / `add_edge` /
`remove_edge`) so neither side does a full re-render.

## What it demonstrates

- **Drag to reparent** - drag a class onto a new superclass in the tree; the model moves the
  node and the graph re-wires the `SubClassOf` edge (old edge removed, new one added).
- **Context menu edits** - right-click a node to insert a subclass/sibling or delete it;
  the change appears in both the tree and the graph.
- **Linked selection** - activating a tree row highlights the node in the graph and fills
  the detail pane, and clicking a graph node activates the matching tree row.
- **Inline editing** - rename via `F2` or edit the description cell; the graph label and
  tooltip update.

## The code

Both widgets are bound to the same model through event callbacks; the sync helpers apply
each change to the model and then to both widgets:

```python
def sync_move_node(node_id: str, new_parent_id: str) -> str | None:
    """Tree DnD already moved the node visually; update the model + graph edges."""
    old_parent = move_model_node(node_id, new_parent_id)
    if old_parent:
        graph.remove_edge(node_id, old_parent)
    graph.add_edge(vis_edge({"from": node_id, "to": new_parent_id}))
    return old_parent

def on_tree_event(event_name, params):
    if event_name == "drop":
        handle_drop(params)            # reparent -> re-wire graph edge
    elif event_name == "contextmenu":
        handle_context_menu(params)    # add / delete -> sync both widgets
    elif event_name == "activate":
        highlight_in_graph(params["data"]["node_id"]); show_details(...)

def on_graph_event(event_name, params):
    if event_name == "click" and params.get("nodes"):
        tree.set_active_node(params["nodes"][0]); show_details(...)
```

## Data flow

```{mermaid}
graph LR
    tree[Wunderbaum tree] -- "drop / contextmenu / activate" --> model[(NODES / EDGES)]
    graph[VisNetwork] -- "node click" --> model
    model -- "add/remove node + edge" --> tree
    model -- "add/remove node + edge" --> graph
    model -- "show_details" --> detail[Detail sidebar]
```

## See also

- {doc}`usecase_jsoneditor_visnetwork` - the form + graph variant
- {doc}`../wunderbaum/virtual_filesystem` - the full Wunderbaum feature demo (DnD, context menu, rename)
- {doc}`../../panels/visnetwork` - the standalone graph widget
