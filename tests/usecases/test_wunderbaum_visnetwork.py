# pytest test_wunderbaum_visnetwork.py --headed --slowmo 1000

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.usecases.wunderbaum_visnetwork import (
    EDGES,
    NODES,
    _counter,
    app,
    build_tree_source,
    get_parent,
    graph,
    handle_copy_drop,
    handle_edit,
    sync_add_node,
    sync_remove_node,
    tree,
    vis_edge,
    vis_node,
)
from panelini.testing import drag, wait_until, wb_title_center, wb_wait

_PORT = 6610
_ORIGINAL_NODES = copy.deepcopy(NODES)
_ORIGINAL_EDGES = copy.deepcopy(EDGES)
_ORIGINAL_COUNTER = _counter["v"]


@pytest.fixture(scope="module")
def panel_server():
    """Serve the combined tree+graph demo once for the whole module."""
    server = pn.serve(app, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server.

    ``NODES``/``EDGES``/``tree``/``graph`` are module-level singletons
    mutated by most tests here (add/delete/move/copy/rename), so the whole
    model is reset to its original state before navigating.
    """
    NODES.clear()
    NODES.update(copy.deepcopy(_ORIGINAL_NODES))
    EDGES[:] = copy.deepcopy(_ORIGINAL_EDGES)
    _counter["v"] = _ORIGINAL_COUNTER
    tree.source = build_tree_source()
    graph.nodes = [vis_node(nid) for nid in NODES]
    graph.edges = [vis_edge(e) for e in EDGES]

    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    page.locator(".vis-network canvas").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_renders(ready_page: Page):
    """Tree and graph render with correct data."""
    page = ready_page

    assert len(tree.source) > 0
    assert len(graph.nodes) == len(NODES)
    assert len(graph.edges) == len(EDGES)

    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row - tree did not render"
    assert page.locator(".vis-network canvas").first.is_visible()


def test_description_column(ready_page: Page):
    """Description column shows data from the model."""
    page = ready_page

    inputs = page.locator(".wb-col input[type='text']")
    assert inputs.count() > 0, "No input elements in description column"


def test_card_collapse_expand(ready_page: Page):
    """Tree rows survive Card collapse and re-expand."""
    page = ready_page

    rows_before = page.locator(".wb-row").count()
    assert rows_before > 1, f"Only {rows_before} rows before collapse"

    # Collapse then re-expand
    page.locator("text=Hierarchy").first.click()
    page.locator("text=Hierarchy").first.click()

    wait_until(lambda: page.locator(".wb-row").count() == rows_before)


def test_edit_name(ready_page: Page):
    """Edit handler updates data model and graph label."""
    old_name = NODES["Dog"]["name"]

    handle_edit({
        "key": "Thing/Animal/Dog",
        "oldValue": "Dog",
        "newValue": "Puppy",
        "data": {"node_id": "Dog", "description": "Canis familiaris"},
    })

    assert NODES["Dog"]["name"] == "Puppy"

    dog_node = next((n for n in graph.nodes if n["id"] == "Dog"), None)
    assert dog_node is not None
    assert dog_node.get("label") == "Puppy"

    NODES["Dog"]["name"] = old_name


def test_python_api_add_node(ready_page: Page):
    """Adding a node updates both tree and graph."""
    initial_nodes = len(NODES)
    initial_graph_nodes = len(graph.nodes)

    sync_add_node("TestNode", "Test Node", "A test", "Animal")

    assert len(NODES) == initial_nodes + 1
    assert "TestNode" in NODES
    assert len(graph.nodes) == initial_graph_nodes + 1


def test_copy_node(ready_page: Page):
    """Ctrl+DnD copy adds node to data model, tree, and graph."""
    page = ready_page

    initial_nodes = len(NODES)
    initial_graph_nodes = len(graph.nodes)
    initial_edges = len(EDGES)
    rows_before = page.locator(".wb-row").count()

    # Verify batch_update is used (single _tree_action write)
    actions_sent = []
    orig = tree._send_tree_action

    def spy(action, payload):
        actions_sent.append(action)
        orig(action, payload)

    tree._send_tree_action = spy  # ty: ignore[invalid-assignment] (deliberate monkeypatch-and-restore for test spying)

    handle_copy_drop({
        "copy": True,
        "copiedNodeId": "Dog",
        "newParentNodeId": "Vehicle",
        "targetKey": "Thing/Vehicle",
        "region": "over",
    })
    tree._send_tree_action = orig  # ty: ignore[invalid-assignment] (restoring the original bound method after the spy)
    wait_until(lambda: page.locator(".wb-row").count() == rows_before + 1)

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


def test_python_api_delete_node(ready_page: Page):
    """Deleting a node removes it from tree and graph."""
    assert "Cat" in NODES

    sync_remove_node("Cat")

    assert "Cat" not in NODES
    cat_in_graph = any(n["id"] == "Cat" for n in graph.nodes)
    assert not cat_in_graph, "Cat still in graph after delete"


# =========================================================================
# DnD helpers
# =========================================================================


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


def test_dnd_move_node(ready_page: Page):
    """DnD move: Truck from Vehicle to Animal updates tree, graph, model."""
    page = ready_page

    src = page.locator(".wb-row .wb-title", has_text="Truck").first
    tgt = page.locator(".wb-row .wb-title", has_text="Animal").first
    src.drag_to(tgt)
    wait_until(lambda: get_parent("Truck") == "Animal")

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

    # Graph: edge from Truck to Animal exists
    truck_edges = [e for e in graph.edges if e["from"] == "Truck"]
    assert any(e["to"] == "Animal" for e in truck_edges), f"No Truck->Animal edge: {truck_edges}"


def test_dnd_copy_node(ready_page: Page):
    """Copy drop: Dog copied under Vehicle, original stays.

    Uses handle_copy_drop directly (DnD copy mechanics are tested
    in test_wunderbaum_dnd.py); this validates the full example
    integration: data model, tree, and graph.
    """
    page = ready_page

    nodes_before = set(NODES.keys())
    graph_nodes_before = len(graph.nodes)
    rows_before = page.locator(".wb-row").count()

    handle_copy_drop({
        "copy": True,
        "copiedNodeId": "Dog",
        "newParentNodeId": "Vehicle",
        "targetKey": "Thing/Vehicle",
        "region": "over",
    })
    wait_until(lambda: page.locator(".wb-row").count() > rows_before)

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


@pytest.mark.media(role="overview", capture="gif", viewport=(1280, 720))
def test_dnd_reparents(ready_page: Page):
    page = ready_page
    drag(page, wb_title_center(page, "Truck"), wb_title_center(page, "Animal"), steps=12)
    wait_until(lambda: get_parent("Truck") == "Animal")
