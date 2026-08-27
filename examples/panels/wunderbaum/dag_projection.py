"""DAG-to-tree projection example with Wunderbaum (tree+table mode).

Demonstrates hierarchical projection of a directed acyclic graph with
HasPart and SubClassOf relationships into a tree view.

Shared nodes (nodes with multiple parents) appear under each parent.

For a combined tree + graph visualization, see:
    examples/usecases/wunderbaum_visnetwork.py
"""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

# Example ontology graph
GRAPH_NODES = {
    "Vehicle": {
        "label": "Vehicle",
        "description": "A means of transport",
        "type": "class",
    },
    "Car": {
        "label": "Car",
        "description": "A four-wheeled motor vehicle",
        "type": "class",
    },
    "Truck": {
        "label": "Truck",
        "description": "A large motor vehicle for transporting goods",
        "type": "class",
    },
    "Engine": {
        "label": "Engine",
        "description": "A machine that converts energy into motion",
        "type": "part",
    },
    "Wheel": {
        "label": "Wheel",
        "description": "A circular component for movement",
        "type": "part",
    },
    "Chassis": {
        "label": "Chassis",
        "description": "The base frame of a vehicle",
        "type": "part",
    },
    "ElectricMotor": {
        "label": "Electric Motor",
        "description": "An electric-powered engine",
        "type": "part",
    },
    "ElectricCar": {
        "label": "Electric Car",
        "description": "A car powered by electricity",
        "type": "class",
    },
}

GRAPH_EDGES = [
    {"from": "Car", "to": "Vehicle", "relation": "SubClassOf"},
    {"from": "Truck", "to": "Vehicle", "relation": "SubClassOf"},
    {"from": "ElectricCar", "to": "Car", "relation": "SubClassOf"},
    {"from": "Car", "to": "Engine", "relation": "HasPart"},
    {"from": "Car", "to": "Wheel", "relation": "HasPart"},
    {"from": "Car", "to": "Chassis", "relation": "HasPart"},
    {"from": "Truck", "to": "Engine", "relation": "HasPart"},
    {"from": "Truck", "to": "Wheel", "relation": "HasPart"},
    {"from": "Truck", "to": "Chassis", "relation": "HasPart"},
    {"from": "ElectricCar", "to": "ElectricMotor", "relation": "HasPart"},
]


def dag_to_tree_source(
    nodes: dict[str, dict],
    edges: list[dict],
    root_keys: list[str] | None = None,
    edge_types: list[str] | None = None,
    parent_to_child_edges: list[str] | None = None,
) -> list[dict]:
    """Convert a DAG graph to a Wunderbaum tree source.

    Nodes with multiple parents are duplicated in the tree.

    Edge direction depends on the relation type:
    - SubClassOf: from=child, to=parent (Car SubClassOf Vehicle -> Vehicle is parent)
    - HasPart: from=parent, to=child (Car HasPart Engine -> Car is parent)

    Args:
        parent_to_child_edges: Edge types where from=parent, to=child (e.g. HasPart).
            All other edge types are treated as from=child, to=parent (e.g. SubClassOf).
    """
    if edge_types is None:
        edge_types = ["SubClassOf", "HasPart"]
    if parent_to_child_edges is None:
        parent_to_child_edges = ["HasPart"]

    # Build parent->children mapping
    children_map: dict[str, list[tuple[str, str]]] = {}
    has_parent: set[str] = set()
    for edge in edges:
        rel = edge["relation"]
        if rel not in edge_types:
            continue
        if rel in parent_to_child_edges:
            # from=parent, to=child (e.g. Car HasPart Engine)
            parent_id = edge["from"]
            child_id = edge["to"]
        else:
            # from=child, to=parent (e.g. Car SubClassOf Vehicle)
            parent_id = edge["to"]
            child_id = edge["from"]
        if parent_id not in children_map:
            children_map[parent_id] = []
        children_map[parent_id].append((child_id, rel))
        has_parent.add(child_id)

    if root_keys is None:
        root_keys = [nid for nid in nodes if nid not in has_parent]

    def build_node(node_id: str, path: str, relation: str = "") -> dict:
        props = nodes.get(node_id, {})
        node_key = f"{path}/{node_id}" if path else node_id
        icon_map = {"class": "bi bi-diagram-3", "part": "bi bi-puzzle"}

        # Column values live at the node level; wunderbaum auto-moves non-reserved
        # keys into node.data for the grid. "type" is a reserved wunderbaum key
        # (node typing), so the Type column reads from "node_type" instead.
        tree_node: dict = {
            "title": props.get("label", node_id),
            "key": node_key,
            "icon": icon_map.get(props.get("type", ""), "bi bi-circle"),
            "expanded": True,
            "node_id": node_id,
            "node_type": props.get("type", ""),
            "relation": relation,
            "description": props.get("description", ""),
        }

        child_edges = children_map.get(node_id, [])
        if child_edges:
            tree_node["children"] = [build_node(child_id, node_key, rel) for child_id, rel in child_edges]

        return tree_node

    return [build_node(root_id, "", "") for root_id in root_keys]


# Build tree source from graph
source = dag_to_tree_source(GRAPH_NODES, GRAPH_EDGES)

columns = [
    {"id": "*", "title": "Name", "width": "250px"},
    {"id": "node_type", "title": "Type", "width": "80px"},
    {"id": "relation", "title": "Relation", "width": "100px"},
    {"id": "description", "title": "Description", "width": "300px"},
]

tree = Wunderbaum(source=source, columns=columns)

app = pn.Column(
    "# DAG Projection Demo",
    "Hierarchical projection of a directed acyclic graph.",
    "Edges: `SubClassOf` and `HasPart`. Shared nodes appear under each parent.",
    tree,
)

if __name__ == "__main__":
    pn.serve(app)
