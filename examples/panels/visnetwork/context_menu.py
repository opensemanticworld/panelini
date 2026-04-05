"""Context menu example for VisNetwork.

This example demonstrates:
- Nodes with different context menus based on type
- Edges with context menus
- Nodes without context menus (locked/system nodes)
- Dynamic graph manipulation via context menu actions
"""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()


class ContextMenuDemo:
    """Demo application for context menu functionality."""

    def __init__(self):
        """Initialize the demo with sample graph data."""
        self.next_id = 4

        # Initial nodes with different context menu configurations
        self.nodes = [
            {
                "id": 1,
                "label": "Root Folder",
                "shape": "box",
                "color": {"background": "#e3f2fd"},
                "x": 0,
                "y": 0,
                "fixed": True,
                "callback_name_dict": {
                    "edit": "Edit Label",
                    "add_child": "Add Child",
                    "change_color": "Change Color",
                    "delete": "Delete",
                },
            },
            {
                "id": 2,
                "label": "File 1",
                "shape": "ellipse",
                "color": {"background": "#fff9c4"},
                "x": -150,
                "y": 100,
                "fixed": True,
                "callback_name_dict": {
                    "edit": "Edit Label",
                    "duplicate": "Duplicate",
                    "delete": "Delete",
                },
            },
            {
                "id": 3,
                "label": "System (Locked)",
                "shape": "diamond",
                "color": {"background": "#ffccbc"},
                "x": 150,
                "y": 100,
                "fixed": True,
                # No callback_name_dict - this node has no context menu
            },
        ]

        # Initial edges
        self.edges = [
            {
                "id": "e1",
                "from": 1,
                "to": 2,
                "label": "contains",
                "callback_name_dict": {
                    "edit_label": "Edit Label",
                    "reverse": "Reverse Direction",
                    "delete": "Delete Edge",
                },
            },
            {
                "id": "e2",
                "from": 1,
                "to": 3,
                "label": "manages",
                # No callback_name_dict on this edge
            },
        ]

        # Create VisNetwork with context menu callback
        self.vis = VisNetwork(
            nodes=self.nodes,
            edges=self.edges,
            options={
                "physics": {"enabled": False},
                "layout": {"hierarchical": False},
            },
            context_menu_callback=self.on_context_menu,
        )

        # Info panel
        self.info = pn.pane.Markdown(
            """
## Context Menu Demo

**Try this:**
- Right-click on "Root Folder" or "File 1" to see their context menus
- Right-click on "System (Locked)" - no menu appears (no callback_name_dict)
- Right-click on edges to see edge-specific menus
- Select menu items to perform actions

**Ctrl+Drag Duplicate:**
- Hold **Ctrl** and drag any node to duplicate it
- Works with multiple selected nodes
- Automatically creates edges from originals to duplicates

**Available Actions:**
- Edit Label: Change node/edge label
- Add Child: Create a new child node
- Duplicate: Clone a node
- Change Color: Randomly change node color
- Delete: Remove node or edge
- Reverse Direction: Flip edge direction
""",
            width=300,
        )

    def on_context_menu(self, element_type: str, element_id: str, action_id: str):
        """Handle context menu item selection.

        Args:
            element_type: 'node' or 'edge'
            element_id: The ID of the element
            action_id: The selected action ID from callback_name_dict
        """
        print(f"Context menu: {action_id} on {element_type} '{element_id}'")

        if element_type == "node":
            self.handle_node_action(element_id, action_id)
        elif element_type == "edge":
            self.handle_edge_action(element_id, action_id)

    def handle_node_action(self, node_id: str, action_id: str):  # noqa: C901
        """Handle node context menu actions.

        Args:
            node_id: The node ID
            action_id: The action to perform
        """
        nodes_list = list(self.vis.nodes)

        if action_id == "delete":
            # Remove the node
            self.vis.remove_node(node_id)
            print(f"Deleted node {node_id}")

        elif action_id == "edit":
            # Edit node label
            for i, node in enumerate(nodes_list):
                if node["id"] == node_id:
                    nodes_list[i] = {**node, "label": f"{node['label']} (edited)"}
                    break
            self.vis.set_nodes(nodes_list)
            print(f"Edited node {node_id}")

        elif action_id == "add_child":
            # Add a new child node
            new_node = {
                "id": self.next_id,
                "label": f"Child {self.next_id}",
                "shape": "ellipse",
                "color": {"background": "#c8e6c9"},
                "callback_name_dict": {
                    "edit": "Edit Label",
                    "delete": "Delete",
                },
            }
            new_edge = {
                "id": f"e{self.next_id}",
                "from": node_id,
                "to": self.next_id,
                "label": "parent-child",
            }
            self.vis.add_node(new_node)
            self.vis.add_edge(new_edge)
            self.next_id += 1
            print(f"Added child to node {node_id}")

        elif action_id == "duplicate":
            # Duplicate the node
            for node in nodes_list:
                if node["id"] == node_id:
                    new_node = {
                        **node,
                        "id": self.next_id,
                        "label": f"{node['label']} (copy)",
                        "x": node.get("x", 0) + 50 if "x" in node else None,
                        "y": node.get("y", 0) + 50 if "y" in node else None,
                    }
                    self.vis.add_node(new_node)
                    self.next_id += 1
                    print(f"Duplicated node {node_id}")
                    break

        elif action_id == "change_color":
            # Change node color randomly
            import random

            colors = ["#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2dfdb", "#dcedc8", "#fff9c4"]
            for i, node in enumerate(nodes_list):
                if node["id"] == node_id:
                    nodes_list[i] = {
                        **node,
                        "color": {"background": random.choice(colors)},  # noqa: S311
                    }
                    break
            self.vis.set_nodes(nodes_list)
            print(f"Changed color of node {node_id}")

    def handle_edge_action(self, edge_id: str, action_id: str):
        """Handle edge context menu actions.

        Args:
            edge_id: The edge ID
            action_id: The action to perform
        """
        edges_list = list(self.vis.edges)

        if action_id == "delete":
            # Remove the edge
            for edge in edges_list:
                if edge.get("id") == edge_id:
                    self.vis.remove_edge(edge["from"], edge["to"])
                    print(f"Deleted edge {edge_id}")
                    break

        elif action_id == "edit_label":
            # Edit edge label
            for i, edge in enumerate(edges_list):
                if edge.get("id") == edge_id:
                    edges_list[i] = {**edge, "label": f"{edge.get('label', '')} (edited)"}
                    break
            self.vis.set_edges(edges_list)
            print(f"Edited edge {edge_id}")

        elif action_id == "reverse":
            # Reverse edge direction
            for i, edge in enumerate(edges_list):
                if edge.get("id") == edge_id:
                    edges_list[i] = {
                        **edge,
                        "from": edge["to"],
                        "to": edge["from"],
                    }
                    break
            self.vis.set_edges(edges_list)
            print(f"Reversed edge {edge_id}")

    def build_panel(self):
        """Build and return the demo panel."""
        return pn.Row(self.vis, self.info)


# Create and serve the demo
demo = ContextMenuDemo()
panel = demo.build_panel()

if __name__ == "__main__":
    pn.serve(panel, threaded=True)
