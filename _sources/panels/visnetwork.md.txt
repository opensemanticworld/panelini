# VisNetwork

```{image} /_static/media/visnetwork/visnetwork_context_menu_feature.webp
:alt: visnetwork context menu feature
:class: docs-media
```

The `VisNetwork` panel provides interactive network/graph visualization, wrapping the [vis-network](https://visjs.github.io/vis-network/docs/network/) JavaScript library.

## Overview

VisNetwork renders interactive, physics-simulated network graphs with support for node/edge manipulation, drag-and-drop file handling, edit modes, and event callbacks.

## Basic Usage

```python
from panelini.panels.visnetwork import VisNetwork

nodes = [
    {"id": 1, "label": "Node 1", "color": "#FF5722"},
    {"id": 2, "label": "Node 2", "color": "#2196F3"},
    {"id": 3, "label": "Node 3", "color": "#4CAF50"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
    {"from": 3, "to": 1},
]

graph = VisNetwork(nodes=nodes, edges=edges)
```

## Event Callbacks

React to user interactions on the graph:

```python
def on_event(event_type: str, event_data: dict):
    if event_type == "click":
        clicked_nodes = event_data.get("nodes", [])
        print(f"Clicked nodes: {clicked_nodes}")
    elif event_type == "dragEnd":
        print(f"Node dragged to new position")

graph = VisNetwork(
    nodes=nodes,
    edges=edges,
    network_event_callback=on_event,
)
```

## Edit Modes

VisNetwork supports interactive editing:

```python
# Switch between modes
graph.disable_edit_mode()    # View only
graph.add_node_mode()        # Click to add nodes
graph.add_edge_mode()        # Click nodes to create edges
```

## Graph Manipulation

### Node Operations

```python
# Add and remove nodes
graph.add_node({"id": 4, "label": "New Node"})
graph.remove_node(4)

# Update node properties (partial update)
graph.update_node({"id": 1, "color": "#9C27B0", "label": "Updated"})

# Batch update multiple nodes
graph.update_nodes([
    {"id": 1, "color": "#FF0000"},
    {"id": 2, "color": "#00FF00"},
])

# Update node state (visual styling)
graph.update_node_state([1, 2], "modified")
```

### Edge Operations

```python
graph.add_edge({"from": 1, "to": 3, "label": "connects"})
graph.remove_edge(1, 3)
graph.update_edge({"from": 1, "to": 2, "color": {"color": "#FF0000"}})
```

### Advanced Operations

```python
# Merge two nodes (redirects all edges)
graph.merge_nodes(source_id=2, target_id=1, merge_properties={"label": "Merged"})

# Batch multiple actions atomically
graph.batch_update([
    {"action": "addNode", "data": {"id": 5, "label": "Five"}},
    {"action": "addEdge", "data": {"from": 5, "to": 1}},
])

# Replace all nodes/edges
graph.set_nodes(new_nodes_list)
graph.set_edges(new_edges_list)

# Clear the entire graph
graph.clear()
```

## File Drop Support

VisNetwork handles file drops on the graph canvas:

```python
def on_file_drop(file_data: dict):
    print(f"File dropped: {file_data.get('fileName')}")

graph = VisNetwork(
    nodes=nodes,
    edges=edges,
    file_drop_callback=on_file_drop,
)
```

The default handler creates nodes from dropped files, detecting file types (images, CSV, PDF, text) and rendering them appropriately.

## vis-network Options

Customize appearance and behavior via the `options` parameter:

```python
graph = VisNetwork(
    nodes=nodes,
    edges=edges,
    options={
        "physics": {"enabled": True, "solver": "forceAtlas2Based"},
        "interaction": {"hover": True, "multiselect": True},
        "edges": {"smooth": {"type": "cubicBezier"}},
    },
)
```

See the [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) for all available options.

## API Reference

See the full API documentation: {py:class}`panelini.panels.visnetwork.visnetwork.VisNetwork`
