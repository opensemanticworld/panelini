"""Example combining JsonEditor form with VisNetwork graph visualization.

The JsonEditor uses a schema to define a list of nodes with 'name' and 'connected_to' properties.
Changes in the form automatically update the VisNetwork graph.

Click on a node to edit it individually, click away to deselect and edit the full network.
"""

import panel as pn

from panelini import Panelini
from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.visnetwork import VisNetwork

pn.extension()

# JSON Schema for the full network (list of nodes)
network_schema = {
    "type": "object",
    "title": "Network",
    "properties": {
        "nodes": {
            "type": "array",
            "format": "tabs",
            "title": "Network Nodes",
            "items": {
                "type": "object",
                "title": "Node",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Node Name",
                        "minLength": 1,
                    },
                    "connected_to": {
                        "type": "array",
                        "format": "table",
                        "title": "Connected To",
                        "items": {
                            "title": "Node",
                            "type": "string",
                            "options": {
                                "compact": True,
                            },
                        },
                        "uniqueItems": True,
                    },
                },
                "required": ["name"],
                "defaultProperties": ["name", "connected_to"],
            },
        },
    },
    "required": ["nodes"],
}

# JSON Schema for a single node
single_node_schema = {
    "type": "object",
    "title": "Edit Node",
    "properties": {
        "name": {
            "type": "string",
            "title": "Node Name",
            "minLength": 1,
        },
        "connected_to": {
            "type": "array",
            "format": "table",
            "title": "Connected To",
            "items": {
                "title": "Node",
                "type": "string",
                "options": {
                    "compact": True,
                },
            },
            "uniqueItems": True,
        },
    },
    "required": ["name"],
    "defaultProperties": ["name", "connected_to"],
}

# Initial data (wrapped in object)
initial_data = {
    "nodes": [
        {"name": "Alice", "connected_to": ["Bob", "Charlie"]},
        {"name": "Bob", "connected_to": ["Alice", "Diana"]},
        {"name": "Charlie", "connected_to": ["Alice"]},
        {"name": "Diana", "connected_to": ["Bob", "Eve"]},
        {"name": "Eve", "connected_to": ["Diana"]},
    ]
}

# State tracking
current_mode = "network"  # "network" or "single"
selected_node_index = None
network_data = initial_data.copy()


def json_to_graph(data: dict) -> tuple[list[dict], list[dict]]:
    """Convert JSON node data to VisNetwork nodes and edges.

    Args:
        data: Dict with 'nodes' key containing list of node objects
              with 'name' and 'connected_to' properties.

    Returns:
        Tuple of (nodes, edges) for VisNetwork.
    """
    if not data or "nodes" not in data:
        return [], []

    node_list = data["nodes"]
    if not node_list:
        return [], []

    # Create nodes
    nodes = []
    name_to_id = {}
    for i, node_data in enumerate(node_list):
        name = node_data.get("name", f"Node {i}")
        name_to_id[name] = i
        nodes.append({
            "id": i,
            "label": name,
        })

    # Create edges
    edges = []
    seen_edges = set()
    for node_data in node_list:
        from_name = node_data.get("name")
        if from_name not in name_to_id:
            continue
        from_id = name_to_id[from_name]

        for to_name in node_data.get("connected_to", []):
            if to_name not in name_to_id:
                continue
            to_id = name_to_id[to_name]

            # Create undirected edge (avoid duplicates)
            edge_key = tuple(sorted([from_id, to_id]))
            if edge_key not in seen_edges:
                seen_edges.add(edge_key)
                edges.append({
                    "from": from_id,
                    "to": to_id,
                })

    return nodes, edges


# Create the JsonEditor with the network schema
jsoneditor = JsonEditor(
    value=initial_data,
    options={
        "schema": network_schema,
        "disable_collapse": True,
        "disable_edit_json": True,
        "disable_properties": True,
        "startval": initial_data,
    },
    max_height=600,
)

# Status indicator
status_text = pn.pane.Markdown("**Mode:** Editing full network")

# Create the VisNetwork panel
initial_nodes, initial_edges = json_to_graph(initial_data)
visnetwork = VisNetwork(
    nodes=initial_nodes,
    edges=initial_edges,
    options={
        "physics": {
            "enabled": True,
            "stabilization": {"iterations": 100},
        },
        "interaction": {"hover": True},
    },
)


def switch_to_network_mode():
    """Switch to editing the full network."""
    global current_mode, selected_node_index

    # Sync current single node edits back to network_data before switching
    if current_mode == "single" and selected_node_index is not None:
        current_value = jsoneditor.get_value()
        if current_value:
            network_data["nodes"][selected_node_index] = current_value
            # Update the graph with synced data
            nodes, edges = json_to_graph(network_data)
            visnetwork.nodes = nodes
            visnetwork.edges = edges

    current_mode = "network"
    selected_node_index = None

    # Set schema with startval to avoid intermediate state
    jsoneditor.set_schema(network_schema, startval=network_data)
    status_text.object = "**Mode:** Editing full network"


def switch_to_single_node_mode(node_index: int):
    """Switch to editing a single node."""
    global current_mode, selected_node_index
    current_mode = "single"
    selected_node_index = node_index

    node_data = network_data["nodes"][node_index].copy()

    # Set schema with startval to avoid intermediate state
    jsoneditor.set_schema(single_node_schema, startval=node_data)
    status_text.object = (
        f"**Mode:** Editing node '{node_data.get('name', 'Unknown')}' (click away to edit full network)"
    )


def on_network_event(event_name: str, event_params: dict):
    """Handle network events from VisNetwork."""
    global network_data

    if event_name == "click":
        # Node was selected - switch to single node mode
        selected_nodes = event_params.get("nodes", [])
        if selected_nodes:
            node_id = selected_nodes[0]
            if 0 <= node_id < len(network_data["nodes"]):
                switch_to_single_node_mode(node_id)

    elif event_name == "deselectNode":
        # Node was deselected (clicking away) - switch to network mode
        if current_mode == "single":
            switch_to_network_mode()


def on_json_change(event):
    """Update the graph when JSON data changes."""
    global network_data

    data = event.new
    if data is None:
        return

    if current_mode == "network":
        # Full network was edited
        network_data = data
        nodes, edges = json_to_graph(data)
        visnetwork.nodes = nodes
        visnetwork.edges = edges
    elif current_mode == "single" and selected_node_index is not None:
        # Single node was edited - update it in the network data
        network_data["nodes"][selected_node_index] = data
        nodes, edges = json_to_graph(network_data)
        visnetwork.nodes = nodes
        visnetwork.edges = edges


# Set up the network event callback
visnetwork._network_event_callback = on_network_event

# Watch for changes in the JsonEditor
jsoneditor.param.watch(on_json_change, "value")

# Create Panelini app
app = Panelini(
    title="Network Editor",
)

# Set the main content
app.main_set(
    objects=[
        pn.Row(
            pn.Card(
                title="Node Editor",
                objects=[status_text, jsoneditor],
                sizing_mode="stretch_both",
            ),
            pn.Card(
                title="Network Graph",
                objects=[visnetwork],
                sizing_mode="stretch_both",
            ),
            sizing_mode="stretch_both",
        )
    ]
)

app.servable()

if __name__ == "__main__":
    pn.serve(app, port=5010)
