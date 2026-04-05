"""Ctrl+Drag Duplicate Demo for VisNetwork.

This example demonstrates the Ctrl+drag duplicate feature:
- Hold Ctrl and drag nodes to duplicate them
- Works with single or multiple selected nodes
- Automatically creates edges from originals to duplicates
- Optional post-processing callback for duplicated nodes
"""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()


class CtrlDragDemo:
    """Demo application for Ctrl+drag duplicate with post-processing."""

    def __init__(self):
        """Initialize the demo."""
        # Create sample graph
        self.nodes = [
            {"id": 1, "label": "Node 1", "x": -100, "y": 0, "fixed": True, "color": "#e3f2fd"},
            {"id": 2, "label": "Node 2", "x": 100, "y": 0, "fixed": True, "color": "#fff9c4"},
            {"id": 3, "label": "Node 3", "x": 0, "y": 100, "fixed": True, "color": "#c8e6c9"},
        ]

        self.edges = [
            {"from": 1, "to": 3},
            {"from": 2, "to": 3},
        ]

        # UI Controls
        self.enable_postprocess = pn.widgets.Checkbox(name="Enable Post-Processing", value=True)

        self.log_output = pn.pane.Markdown(
            "**Post-Processing Log:**\n\n_No duplications yet._",
            width=350,
        )

        # Create VisNetwork with post-processing callback
        self.vis = VisNetwork(
            nodes=self.nodes,
            edges=self.edges,
            options={
                "physics": {"enabled": False},
                "interaction": {"multiselect": True},
            },
            nodes_duplicated_callback=self.on_nodes_duplicated,
        )

        self.info = pn.pane.Markdown(
            """
# Ctrl+Drag Duplicate Demo

## How to use:

1. **Single node duplicate:**
   - Hold **Ctrl** key
   - Click and drag any node
   - A duplicate will be created with an edge to the original

2. **Multiple node duplicate:**
   - Select multiple nodes (click + Shift or drag-select)
   - Hold **Ctrl** key
   - Drag the selection
   - All selected nodes will be duplicated

3. **Post-Processing:**
   - Enable the checkbox below to apply post-processing
   - Duplicated nodes will be modified automatically
   - Changes: "(copy)" suffix added to label, color changed to orange

## Try it now!
Select nodes and Ctrl+drag them around.
""",
            width=350,
        )

    def on_nodes_duplicated(self, duplicated_nodes: list[dict]):
        """Handle nodes duplicated event.

        Args:
            duplicated_nodes: List of duplicated node dictionaries.
        """
        print(f"Nodes duplicated: {len(duplicated_nodes)} nodes")

        # Only process if checkbox is enabled
        if not self.enable_postprocess.value:
            self.log_output.object = (
                f"**Post-Processing Log:**\n\n⏭️ Skipped (disabled) - {len(duplicated_nodes)} node(s) duplicated"
            )
            return

        # Post-process the duplicated nodes
        modified_count = 0
        nodes_list = list(self.vis.nodes)

        for dup_node in duplicated_nodes:
            node_id = dup_node["id"]

            # Find the node in the current nodes list and modify it
            for i, node in enumerate(nodes_list):
                if node["id"] == node_id:
                    # Add "(copy)" suffix to label if not already present
                    if "(copy)" not in node.get("label", ""):
                        nodes_list[i] = {
                            **node,
                            "label": f"{node.get('label', 'Node')} (copy)",
                            "color": "#ff9800",  # Orange color for copies
                        }
                        modified_count += 1
                    break

        # Update the nodes if any were modified
        if modified_count > 0:
            self.vis.set_nodes(nodes_list)

        # Update log
        log_text = (
            "**Post-Processing Log:**\n\n"
            f"✅ Processed {len(duplicated_nodes)} duplicated node(s)\n"
            f"- Modified {modified_count} node(s)\n"
            f"- Added '(copy)' suffix to labels\n"
            f"- Changed color to orange (#ff9800)\n\n"
            f"Node IDs: {[n['id'] for n in duplicated_nodes]}"
        )
        self.log_output.object = log_text

    def build_panel(self):
        """Build and return the demo panel."""
        controls = pn.Column(
            self.info,
            pn.layout.Divider(),
            "### Controls",
            self.enable_postprocess,
            pn.layout.Divider(),
            self.log_output,
        )

        return pn.Row(self.vis, controls)


# Create and serve the demo
demo = CtrlDragDemo()
panel = demo.build_panel()

if __name__ == "__main__":
    pn.serve(panel, threaded=True)
