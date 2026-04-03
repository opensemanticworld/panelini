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
    assert rows.count() > 0, "No .wb-row — tree did not render"
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
