"""Combined tree + graph editor for a class hierarchy.

A shared data model (NODES, EDGES) is displayed as both a tree (left) and
a graph (right).  Every mutation goes through the data model and uses the
incremental APIs of both widgets (add_node / remove_node / add_edge /
remove_edge) - no full re-render.

- Tree columns: Name, Description
- Tree DnD:  move a node → old SubClassOf edge removed, new one added
- Tree context menu: insert child / delete node (synced to graph)
- Graph click: highlight node in tree + show details
- Tree click: highlight node in graph + show details
"""

import panel as pn

from panelini import Panelini
from panelini.panels.visnetwork import VisNetwork
from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

# =========================================================================
# Shared data model
# =========================================================================

NODES: dict[str, dict] = {
    "Thing": {"name": "Thing", "description": "Root concept"},
    "Vehicle": {"name": "Vehicle", "description": "A means of transport"},
    "Car": {"name": "Car", "description": "A four-wheeled vehicle"},
    "Truck": {"name": "Truck", "description": "A goods vehicle"},
    "ElectricCar": {"name": "Electric Car", "description": "Battery-powered car"},
    "Animal": {"name": "Animal", "description": "A living organism"},
    "Dog": {"name": "Dog", "description": "Canis familiaris"},
    "Cat": {"name": "Cat", "description": "Felis catus"},
}

# All edges are SubClassOf: from=child, to=parent
EDGES: list[dict] = [
    {"from": "Vehicle", "to": "Thing"},
    {"from": "Animal", "to": "Thing"},
    {"from": "Car", "to": "Vehicle"},
    {"from": "Truck", "to": "Vehicle"},
    {"from": "ElectricCar", "to": "Car"},
    {"from": "Dog", "to": "Animal"},
    {"from": "Cat", "to": "Animal"},
]

_counter = {"v": 0}


# =========================================================================
# Data model helpers
# =========================================================================


def get_parent(node_id: str) -> str | None:
    for e in EDGES:
        if e["from"] == node_id:
            return e["to"]
    return None


def get_children(node_id: str) -> list[str]:
    return [e["from"] for e in EDGES if e["to"] == node_id]


def add_model_node(node_id: str, name: str, desc: str, parent_id: str | None) -> None:
    NODES[node_id] = {"name": name, "description": desc}
    if parent_id:
        EDGES.append({"from": node_id, "to": parent_id})


def remove_model_node(node_id: str) -> None:
    # Remove children recursively
    for child in get_children(node_id):
        remove_model_node(child)
    EDGES[:] = [e for e in EDGES if e["from"] != node_id and e["to"] != node_id]
    NODES.pop(node_id, None)


def move_model_node(node_id: str, new_parent_id: str) -> str | None:
    """Move node to new parent.  Returns old parent id."""
    old_parent = get_parent(node_id)
    EDGES[:] = [e for e in EDGES if e["from"] != node_id]
    EDGES.append({"from": node_id, "to": new_parent_id})
    return old_parent


# =========================================================================
# Tree source builder
# =========================================================================


def build_tree_source() -> list[dict]:
    has_parent = {e["from"] for e in EDGES}
    roots = [nid for nid in NODES if nid not in has_parent]
    children_map: dict[str, list[str]] = {}
    for e in EDGES:
        children_map.setdefault(e["to"], []).append(e["from"])

    def build(nid: str, path: str) -> dict:
        props = NODES[nid]
        key = f"{path}/{nid}" if path else nid
        node: dict = {
            "title": props["name"],
            "key": key,
            "expanded": True,
            "icon": "bi bi-folder",
            # Column values at node level (wunderbaum moves them to node.data)
            "node_id": nid,
            "description": props.get("description", ""),
        }
        kids = children_map.get(nid, [])
        if kids:
            node["children"] = [build(c, key) for c in kids]
        return node

    return [build(r, "") for r in roots]


# =========================================================================
# VisNetwork helpers
# =========================================================================

VIS_OPTIONS = {
    "physics": {
        "enabled": True,
        "solver": "forceAtlas2Based",
        "forceAtlas2Based": {
            "gravitationalConstant": -150,
            "springLength": 80,
        },
        "stabilization": {"iterations": 150},
    },
    "edges": {
        "arrows": "to",
        "font": {"size": 10, "align": "middle"},
        "smooth": {"type": "continuous"},
    },
}


def vis_node(nid: str) -> dict:
    props = NODES[nid]
    return {
        "id": nid,
        "label": props["name"],
        "shape": "box",
        "json_data": {
            "description": props.get("description", ""),
        },
    }


def vis_edge(edge: dict) -> dict:
    return {
        "from": edge["from"],
        "to": edge["to"],
        "label": "SubClassOf",
    }


# =========================================================================
# Build widgets
# =========================================================================

tree = Wunderbaum(
    source=build_tree_source(),
    columns=[
        {"id": "*", "title": "Name", "width": "200px"},
        {
            "id": "description",
            "title": "Description",
            "width": "250px",
            "html": "<input type='text' tabindex='-1'>",
        },
    ],
    context_menu_items=[
        {"id": "add_child", "label": "Add Subclass", "icon": "bi bi-plus-circle"},
        {"id": "add_sibling", "label": "Add Sibling", "icon": "bi bi-plus"},
        {"id": "delete", "label": "Delete", "icon": "bi bi-trash"},
    ],
    options={
        "dnd": True,
        "edit": {"trigger": ["clickActive", "F2"]},
    },
    tree_event_callback=lambda n, p: on_tree_event(n, p),
)

graph = VisNetwork(
    nodes=[vis_node(nid) for nid in NODES],
    edges=[vis_edge(e) for e in EDGES],
    options=VIS_OPTIONS,
    network_event_callback=lambda n, p: on_graph_event(n, p),
)

detail = pn.pane.Markdown("**Click a node** to see details.")


# =========================================================================
# Sync helpers
# =========================================================================


def sync_add_node(node_id: str, name: str, desc: str, parent_id: str) -> None:
    """Add node to model, tree, and graph."""
    add_model_node(node_id, name, desc, parent_id)
    # Use batch_update: individual _tree_action writes overwrite each other
    # inside Panel's document lock (only the last one reaches JS).
    tree.batch_update([
        {
            "action": "addNode",
            "parentKey": parent_id,
            "title": name,
            "key": node_id,
            "expanded": True,
            "icon": "bi bi-folder",
            "node_id": node_id,
            "description": desc,
        },
        {"action": "expandNode", "key": parent_id, "expanded": True},
    ])
    graph.add_node(vis_node(node_id))
    graph.add_edge(vis_edge({"from": node_id, "to": parent_id}))


def sync_remove_node(node_id: str) -> None:
    """Remove node (and children) from model, tree, and graph."""
    # Collect all descendants first
    to_remove = []

    def collect(nid: str) -> None:
        to_remove.append(nid)
        for child in get_children(nid):
            collect(child)

    collect(node_id)

    remove_model_node(node_id)
    for nid in to_remove:
        tree.remove_node(nid)
        graph.remove_node(nid)


def sync_move_node(node_id: str, new_parent_id: str) -> str | None:
    """Move node in model, update graph edges. Returns old parent.

    Tree DnD already moved the node visually - only update the
    data model and graph (no tree.set_source, which would conflict
    with the JS-side move).
    """
    old_parent = move_model_node(node_id, new_parent_id)
    if old_parent:
        graph.remove_edge(node_id, old_parent)
    graph.add_edge(vis_edge({"from": node_id, "to": new_parent_id}))
    return old_parent


# =========================================================================
# Event handlers
# =========================================================================


def on_tree_event(event_name: str, params: dict) -> None:
    if event_name == "activate":
        nid = params.get("data", {}).get("node_id", "")
        if nid:
            highlight_in_graph(nid)
            show_details(nid)

    elif event_name == "drop":
        handle_drop(params)

    elif event_name == "contextmenu":
        handle_context_menu(params)

    elif event_name == "edit.apply":
        handle_edit(params)

    elif event_name == "change":
        handle_cell_change(params)


def handle_drop(params: dict) -> None:
    if params.get("copy"):
        handle_copy_drop(params)
        return

    # Use actual parent from JS (set after moveTo in the tree)
    moved_id = params.get("movedNodeId", "")
    new_parent = params.get("newParentNodeId")

    if not moved_id or not new_parent or moved_id == new_parent:
        return

    old_parent = sync_move_node(moved_id, new_parent)
    detail.object = f"**Moved** `{moved_id}`: `{old_parent}` -> `{new_parent}`"


def handle_copy_drop(params: dict) -> None:
    """Ctrl+drop: copy node (and descendants), positioned like a move."""
    src_id = params.get("copiedNodeId", "")
    new_parent = params.get("newParentNodeId")
    target_key = params.get("targetKey")
    region = params.get("region", "over")
    if not src_id or not new_parent or src_id not in NODES:
        return

    tree_actions: list[dict] = []
    graph_nodes: list[dict] = []
    graph_edges: list[dict] = []
    root_new_id: str | None = None

    def collect_subtree(nid: str, parent_id: str) -> None:
        nonlocal root_new_id
        _counter["v"] += 1
        new_id = f"{nid}_copy{_counter['v']}"
        if root_new_id is None:
            root_new_id = new_id
        children = get_children(nid)
        props = NODES[nid]
        desc = props.get("description", "")
        # Data model
        add_model_node(new_id, props["name"], desc, parent_id)
        # Collect tree action
        tree_actions.append({
            "action": "addNode",
            "parentKey": parent_id,
            "title": props["name"],
            "key": new_id,
            "expanded": True,
            "icon": "bi bi-folder",
            "node_id": new_id,
            "description": desc,
        })
        # Collect graph updates
        graph_nodes.append(vis_node(new_id))
        graph_edges.append(vis_edge({"from": new_id, "to": parent_id}))
        for child_id in children:
            collect_subtree(child_id, new_id)

    collect_subtree(src_id, new_parent)

    # For before/after, reposition to match exact move behavior
    if region in ("before", "after") and root_new_id and target_key:
        tree_actions.append({
            "action": "moveNode",
            "key": root_new_id,
            "targetKey": target_key,
            "mode": region,
        })

    # Single batch write to tree (avoids _tree_action overwrite)
    tree.batch_update(tree_actions)
    # Single write to graph params
    graph.nodes = [*graph.nodes, *graph_nodes]
    graph.edges = [*graph.edges, *graph_edges]

    detail.object = f"**Copied** `{src_id}` under `{new_parent}`"


def handle_context_menu(params: dict) -> None:
    action = params.get("action", "")
    nid = params.get("data", {}).get("node_id", "")
    if not nid or nid not in NODES:
        return

    if action == "add_child":
        _counter["v"] += 1
        new_id = f"NewClass_{_counter['v']}"
        sync_add_node(new_id, f"New Class {_counter['v']}", "", nid)
        detail.object = f"**Added** `{new_id}` under `{nid}`"

    elif action == "add_sibling":
        parent = get_parent(nid)
        if parent:
            _counter["v"] += 1
            new_id = f"NewClass_{_counter['v']}"
            sync_add_node(new_id, f"New Class {_counter['v']}", "", parent)
            detail.object = f"**Added** `{new_id}` as sibling of `{nid}`"

    elif action == "delete":
        sync_remove_node(nid)
        detail.object = f"**Deleted** `{nid}`"


def handle_edit(params: dict) -> None:
    """Title (Name column) was edited inline via F2 / click."""
    nid = params.get("data", {}).get("node_id", "")
    new_name = params.get("newValue", "")
    if nid and nid in NODES and new_name:
        NODES[nid]["name"] = new_name
        graph.update_node({"id": nid, "label": new_name})
        detail.object = f"**Renamed** `{nid}` to `{new_name}`"


def handle_cell_change(params: dict) -> None:
    """A grid cell (e.g. description) was edited."""
    nid = params.get("data", {}).get("node_id", "")
    col_id = params.get("colId", "")
    value = params.get("value", "")
    if nid and nid in NODES and col_id:
        NODES[nid][col_id] = value
        # Sync to graph tooltip (json_data)
        graph.update_node({
            "id": nid,
            "json_data": {"description": NODES[nid].get("description", "")},
        })
        detail.object = f"**Updated** `{nid}`.{col_id} = `{value}`"


def on_graph_event(event_name: str, params: dict) -> None:
    if event_name != "click":
        return
    selected = params.get("nodes", [])
    if selected and selected[0] in NODES:
        nid = selected[0]
        tree.set_active_node(nid)
        show_details(nid)


def highlight_in_graph(nid: str) -> None:
    for n in graph.nodes:
        bw = 4 if n["id"] == nid else 1
        graph.update_node({"id": n["id"], "borderWidth": bw})


def show_details(nid: str) -> None:
    props = NODES.get(nid, {})
    parent = get_parent(nid)
    children = get_children(nid)
    lines = [
        f"### {props.get('name', nid)}",
        f"**ID:** `{nid}`",
        f"**Description:** {props.get('description', '')}",
        f"**Parent:** `{parent or '(root)'}`",
        f"**Children:** {', '.join(f'`{c}`' for c in children) or '(none)'}",
    ]
    detail.object = "\n\n".join(lines)


# =========================================================================
# Layout
# =========================================================================

app = Panelini(
    title="Class Hierarchy Editor",
    sidebar_right_enabled=True,
)
app.main_set(
    objects=[
        pn.Row(
            pn.Card(
                title="Hierarchy - drag to move, right-click for menu",
                objects=[tree],
                sizing_mode="stretch_both",
            ),
            pn.Card(
                title="Graph",
                objects=[graph],
                sizing_mode="stretch_both",
            ),
            sizing_mode="stretch_both",
        ),
    ]
)
app.sidebar_right_set(objects=[detail])
app.servable()

if __name__ == "__main__":
    pn.serve(app, port=5010)
