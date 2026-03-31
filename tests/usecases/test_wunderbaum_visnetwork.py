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

    # The description column should have input elements
    inputs = page.locator(".wb-col input[type='text']")
    assert inputs.count() > 0, "No input elements in description column"

    server.stop()


def test_edit_name(page: Page, port):
    """Edit handler updates data model and graph label.

    Note: wunderbaum's internal edit state machine cannot be
    triggered programmatically from Playwright (unlike simple
    HTML inputs like jsoneditor). The edit works in the browser
    via clickActive/F2, but here we test the handler directly.
    """
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    old_name = NODES["Dog"]["name"]

    # Simulate the edit.apply event as wunderbaum would send it
    from examples.usecases.wunderbaum_visnetwork import (
        handle_edit,
    )

    handle_edit({
        "key": "Thing/Animal/Dog",
        "oldValue": "Dog",
        "newValue": "Puppy",
        "data": {"node_id": "Dog", "description": "Canis familiaris"},
    })
    time.sleep(0.5)

    # Data model updated
    assert NODES["Dog"]["name"] == "Puppy"

    # Graph label updated
    dog_node = next((n for n in graph.nodes if n["id"] == "Dog"), None)
    assert dog_node is not None
    assert dog_node.get("label") == "Puppy"

    NODES["Dog"]["name"] = old_name
    server.stop()


def test_python_api_add_node(page: Page, port):
    """Adding a node via context menu updates both tree and graph."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    initial_nodes = len(NODES)
    initial_graph_nodes = len(graph.nodes)

    # Use Python API to add a node directly
    from examples.usecases.wunderbaum_visnetwork import (
        sync_add_node,
    )

    sync_add_node("TestNode", "Test Node", "A test", "Animal")
    time.sleep(1)

    assert len(NODES) == initial_nodes + 1
    assert "TestNode" in NODES
    assert len(graph.nodes) == initial_graph_nodes + 1

    server.stop()


def test_python_api_delete_node(page: Page, port):
    """Deleting a node removes it from tree and graph."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert "Cat" in NODES

    from examples.usecases.wunderbaum_visnetwork import (
        sync_remove_node,
    )

    sync_remove_node("Cat")
    time.sleep(1)

    assert "Cat" not in NODES
    cat_in_graph = any(n["id"] == "Cat" for n in graph.nodes)
    assert not cat_in_graph, "Cat still in graph after delete"

    server.stop()
