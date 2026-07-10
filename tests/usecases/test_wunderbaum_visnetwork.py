# pytest test_wunderbaum_visnetwork.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.usecases.wunderbaum_visnetwork import (
    EDGES,
    NODES,
    app,
    graph,
    tree,
)


def test_renders(page: Page, port):
    """Tree and graph render with correct data."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert len(tree.source) > 0
    assert len(graph.nodes) == len(NODES)
    assert len(graph.edges) == len(EDGES)

    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row: tree did not render"
    assert page.locator(".vis-network canvas").first.is_visible()

    server.stop()


def test_description_column(page: Page, port):
    """Description column shows data from the model."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    inputs = page.locator(".wb-col input[type='text']")
    assert inputs.count() > 0, "No input elements in description column"

    server.stop()


def test_card_collapse_expand(page: Page, port):
    """Tree rows survive Card collapse and re-expand."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    rows_before = page.locator(".wb-row").count()
    assert rows_before > 1, f"Only {rows_before} rows before collapse"

    # Collapse
    page.locator("text=Hierarchy").first.click()
    time.sleep(1)

    # Re-expand
    page.locator("text=Hierarchy").first.click()
    time.sleep(2)

    rows_after = page.locator(".wb-row").count()
    assert rows_after == rows_before, f"Rows after expand: {rows_after}, expected {rows_before}"

    server.stop()


def test_edit_name(page: Page, port):
    """Edit handler updates data model and graph label."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    old_name = NODES["Dog"]["name"]

    from examples.usecases.wunderbaum_visnetwork import handle_edit

    handle_edit({
        "key": "Thing/Animal/Dog",
        "oldValue": "Dog",
        "newValue": "Puppy",
        "data": {"node_id": "Dog", "description": "Canis familiaris"},
    })
    time.sleep(0.5)

    assert NODES["Dog"]["name"] == "Puppy"

    dog_node = next((n for n in graph.nodes if n["id"] == "Dog"), None)
    assert dog_node is not None
    assert dog_node.get("label") == "Puppy"

    NODES["Dog"]["name"] = old_name
    server.stop()


def test_python_api_add_node(page: Page, port):
    """Adding a node updates both tree and graph."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    initial_nodes = len(NODES)
    initial_graph_nodes = len(graph.nodes)

    from examples.usecases.wunderbaum_visnetwork import sync_add_node

    sync_add_node("TestNode", "Test Node", "A test", "Animal")
    time.sleep(1)

    assert len(NODES) == initial_nodes + 1
    assert "TestNode" in NODES
    assert len(graph.nodes) == initial_graph_nodes + 1

    server.stop()


def test_copy_node(page: Page, port):
    """Ctrl+DnD copy adds node to data model, tree, and graph."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    initial_nodes = len(NODES)
    initial_graph_nodes = len(graph.nodes)
    initial_edges = len(EDGES)
    rows_before = page.locator(".wb-row").count()

    from examples.usecases.wunderbaum_visnetwork import handle_copy_drop

    # Verify batch_update is used (single _tree_action write)
    actions_sent = []
    orig = tree._send_tree_action

    def spy(action, payload):
        actions_sent.append(action)
        orig(action, payload)

    tree._send_tree_action = spy

    handle_copy_drop({
        "copy": True,
        "copiedNodeId": "Dog",
        "newParentNodeId": "Vehicle",
        "targetKey": "Thing/Vehicle",
        "region": "over",
    })
    tree._send_tree_action = orig
    time.sleep(2)

    # Must use single batch (not separate addNode + expandNode)
    assert actions_sent == ["batch"], f"Expected single 'batch' action, got {actions_sent}"

    # Data model updated
    assert len(NODES) == initial_nodes + 1
    copy_id = next((k for k in NODES if k.startswith("Dog_copy")), None)
    assert copy_id is not None, "No Dog_copy* in NODES"
    assert len(EDGES) == initial_edges + 1

    # Graph updated
    assert len(graph.nodes) == initial_graph_nodes + 1
    assert any(n["id"] == copy_id for n in graph.nodes)

    # Tree updated (new row visible)
    rows_after = page.locator(".wb-row").count()
    assert rows_after == rows_before + 1, f"Tree rows: {rows_after}, expected {rows_before + 1}"

    server.stop()


def test_python_api_delete_node(page: Page, port):
    """Deleting a node removes it from tree and graph."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert "Cat" in NODES

    from examples.usecases.wunderbaum_visnetwork import sync_remove_node

    sync_remove_node("Cat")
    time.sleep(1)

    assert "Cat" not in NODES
    cat_in_graph = any(n["id"] == "Cat" for n in graph.nodes)
    assert not cat_in_graph, "Cat still in graph after delete"

    server.stop()


# =========================================================================
# DnD helpers
# =========================================================================


def _center(box):
    return box["x"] + box["width"] / 2, box["y"] + box["height"] / 2


def _drag(page, sx, sy, tx, ty, steps=5):
    page.mouse.move(sx, sy)
    page.mouse.down()
    for i in range(steps):
        frac = (i + 1) / steps
        page.mouse.move(sx + (tx - sx) * frac, sy + (ty - sy) * frac)
        time.sleep(0.05)
    page.mouse.up()


def _find_in_source(source, key):
    """Find node and its parent key in the source tree."""

    def search(nodes, parent_key=None):
        for node in nodes:
            if node["key"] == key:
                return node, parent_key
            if "children" in node:
                result = search(node["children"], node["key"])
                if result:
                    return result
        return None

    return search(source)


def _get_client_children(page, parent_key):
    """Get child keys of a node in the client-side wunderbaum tree."""
    return page.evaluate(
        """(parentKey) => {
        function findInShadowRoots(selector) {
            const results = [];
            function search(root) {
                root.querySelectorAll(selector).forEach(el => results.push(el));
                root.querySelectorAll('*').forEach(el => {
                    if (el.shadowRoot) search(el.shadowRoot);
                });
            }
            search(document);
            return results;
        }
        const container = findInShadowRoots('.tree-container')[0];
        if (!container || !container._wunderbaum) return [];
        const wb = container._wunderbaum;
        const node = wb.findFirst(n => n.key === parentKey);
        if (!node || !node.children) return [];
        return node.children.map(c => c.key);
    }""",
        parent_key,
    )


# =========================================================================
# DnD tests
# =========================================================================


def test_dnd_move_node(page: Page, port):
    """DnD move: Truck from Vehicle to Animal updates tree, graph, model."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    src = page.locator(".wb-row .wb-title", has_text="Truck").first
    tgt = page.locator(".wb-row .wb-title", has_text="Animal").first
    src.drag_to(tgt)
    time.sleep(2)

    # Server-side tree: Truck moved under Animal
    result = _find_in_source(
        tree.source,
        "Thing/Vehicle/Truck",
    )
    assert result is not None, "Truck not in server source"
    _, parent_key = result
    assert parent_key == "Thing/Animal", f"Server: parent={parent_key}, expected 'Thing/Animal'"

    # Client-side tree
    animal_kids = _get_client_children(page, "Thing/Animal")
    vehicle_kids = _get_client_children(page, "Thing/Vehicle")
    assert "Thing/Vehicle/Truck" in animal_kids
    assert "Thing/Vehicle/Truck" not in vehicle_kids

    # Data model: edge updated
    from examples.usecases.wunderbaum_visnetwork import get_parent

    assert get_parent("Truck") == "Animal"

    # Graph: edge from Truck to Animal exists
    truck_edges = [e for e in graph.edges if e["from"] == "Truck"]
    assert any(e["to"] == "Animal" for e in truck_edges), f"No Truck->Animal edge: {truck_edges}"

    server.stop()


def test_dnd_copy_node(page: Page, port):
    """Copy drop: Dog copied under Vehicle, original stays.

    Uses handle_copy_drop directly (DnD copy mechanics are tested
    in test_wunderbaum_dnd.py); this validates the full example
    integration: data model, tree, and graph.
    """
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    nodes_before = set(NODES.keys())
    graph_nodes_before = len(graph.nodes)

    from examples.usecases.wunderbaum_visnetwork import (
        handle_copy_drop,
    )

    handle_copy_drop({
        "copy": True,
        "copiedNodeId": "Dog",
        "newParentNodeId": "Vehicle",
        "targetKey": "Thing/Vehicle",
        "region": "over",
    })
    time.sleep(2)

    # Source node preserved in data model
    assert "Dog" in NODES

    # Server-side tree: Dog still under Animal
    result = _find_in_source(
        tree.source,
        "Thing/Animal/Dog",
    )
    assert result is not None, "Original Dog not in source"
    _, parent_key = result
    assert parent_key == "Thing/Animal", f"Original Dog moved: parent={parent_key}"

    # New copy node created in data model
    new_nodes = set(NODES.keys()) - nodes_before
    assert len(new_nodes) == 1, f"Expected 1 new node, got {new_nodes}"
    copy_id = new_nodes.pop()
    assert copy_id.startswith("Dog_copy")

    # Graph: copy node added with edge to Vehicle
    assert len(graph.nodes) == graph_nodes_before + 1
    assert any(n["id"] == copy_id for n in graph.nodes)
    copy_edges = [e for e in graph.edges if e["from"] == copy_id]
    assert any(e["to"] == "Vehicle" for e in copy_edges)

    # Tree: copy node visible
    rows_after = page.locator(".wb-row").count()
    assert rows_after > 0

    server.stop()
