"""Test cases for the Panelini visnetwork panel."""

from panelini.panels.visnetwork import VisNetwork


def test_visnetwork_creation():
    """Test that a VisNetwork panel can be created."""
    network = VisNetwork()
    assert isinstance(network, VisNetwork)


def test_visnetwork_with_nodes_and_edges():
    """Test that VisNetwork can be initialized with nodes and edges."""
    nodes = [
        {"id": 1, "label": "Node 1"},
        {"id": 2, "label": "Node 2"},
    ]
    edges = [
        {"from": 1, "to": 2},
    ]
    network = VisNetwork(nodes=nodes, edges=edges)
    assert network.nodes == nodes
    assert network.edges == edges
