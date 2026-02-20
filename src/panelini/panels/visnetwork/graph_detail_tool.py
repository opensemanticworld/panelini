"""GraphDetailTool - A UI wrapper for VisNetwork with node detail visualization."""

from io import StringIO
from typing import Any, Optional

import panel as pn

from .utils import data_url_to_bytes
from .visnetwork import VisNetwork

pn.extension("tabulator")  # For tables
pn.extension("jsoneditor")  # For viewing/editing node details

# Optional dependencies for CSV visualization
_HAS_PANDAS = False
_HAS_PLOTLY = False
pd: Any = None
px: Any = None

try:
    import pandas as pd  # type: ignore[import-untyped,no-redef]

    _HAS_PANDAS = True
except ImportError:
    pass

try:
    import plotly.express as px  # type: ignore[import-not-found,import-untyped,no-redef,unused-ignore]

    _HAS_PLOTLY = True
    pn.extension("plotly")
except ImportError:
    pass


class GraphDetailTool:
    """A tool for visualizing and editing network graphs with node details.

    This class provides a complete UI for working with network graphs, including:
    - Edit mode controls (disable edit, add node, add edge)
    - Interactive network visualization via VisNetwork
    - Node detail panel with JSON editor
    - Data visualization for different node content types (images, CSV, PDF, text)
    """

    def __init__(
        self,
        nodes: Optional[list[dict[str, Any]]] = None,
        edges: Optional[list[dict[str, Any]]] = None,
    ) -> None:
        """Initialize the GraphDetailTool.

        Args:
            nodes: List of node objects with id, label, and optional data.
            edges: List of edge objects with from and to node IDs.
        """
        self.nodes = nodes if nodes is not None else []
        self.edges = edges if edges is not None else []
        self.current_node_jsoneditor: Optional[pn.widgets.JSONEditor] = None
        self._panel: Optional[pn.Row] = None
        self.visnetwork_panel: VisNetwork
        self.disable_edit_button: pn.widgets.Button
        self.add_node_button: pn.widgets.Button
        self.add_edge_button: pn.widgets.Button
        self.edit_row: pn.Row
        self.graph_col: pn.Column
        self.visualizations_col: pn.Column
        self.detail_col: pn.Column
        self.detail_tabs: pn.Tabs
        self.build_panel()

    def build_panel(self) -> None:
        """Build the complete panel UI."""
        # Edit mode buttons
        self.disable_edit_button = pn.widgets.Button(name="Disable Edit", button_type="primary")
        self.disable_edit_button.on_click(lambda event: self.visnetwork_panel.disable_edit_mode())

        self.add_node_button = pn.widgets.Button(name="Add Node", button_type="success")
        self.add_node_button.on_click(lambda event: self.visnetwork_panel.add_node_mode())

        self.add_edge_button = pn.widgets.Button(name="Add Edge", button_type="success")
        self.add_edge_button.on_click(lambda event: self.visnetwork_panel.add_edge_mode())

        self.edit_row = pn.Row(
            self.disable_edit_button,
            self.add_node_button,
            self.add_edge_button,
        )

        # VisNetwork panel
        self.visnetwork_panel = VisNetwork(
            nodes=self.nodes,
            edges=self.edges,
            network_event_callback=self.network_event_callback,
        )

        self.graph_col = pn.Column(self.edit_row, self.visnetwork_panel)

        # Detail panels
        self.visualizations_col = pn.Column(
            pn.pane.Markdown("## Click on node for Visualizations"),
            name="Visualization",
        )
        self.detail_col = pn.Column(
            pn.pane.Markdown("## Click on a node to see details"),
            name="Details",
        )

        self.detail_tabs = pn.Tabs(self.visualizations_col, self.detail_col)

        self._panel = pn.Row(self.graph_col, self.detail_tabs)

    def network_event_callback(self, event_name: str, event_params_dict: dict[str, Any]) -> None:
        """Callback for network events from the VisNetwork component.

        Args:
            event_name: Name of the event (click, doubleClick, etc.).
            event_params_dict: Event parameters.
        """
        print(f"Network event callback: {event_name}", event_params_dict)
        if event_name == "click":
            # For click events, check if multiple nodes are selected
            node_ids = event_params_dict.get("nodes", [])
            if len(node_ids) > 1:
                self.select_callback(event_params_dict)
            else:
                self.click_callback(event_params_dict)
        elif event_name in ["selectNode", "selectEdge"]:
            self.select_callback(event_params_dict)
        elif event_name == "dragEnd":
            self.drag_end_callback(event_params_dict)

    def click_callback(self, event: dict[str, Any]) -> None:
        """Callback for click events on the network.

        Args:
            event: Event data containing clicked node IDs.
        """
        print("Node clicked:", event)
        node_ids = event.get("nodes", [])
        for node_id in node_ids:
            self.show_node_details(node_id)

    def select_callback(self, event: dict[str, Any]) -> None:
        """
        Callback for selectNode events on the visjs-network.
        Shows multi-node editor when multiple nodes are selected.
        """
        print("Nodes selected:", event)
        node_ids = event.get("nodes")
        if node_ids:
            if len(node_ids) > 1:
                self.show_multi_node_editor(node_ids)
            elif len(node_ids) == 1:
                self.show_node_details(node_ids[0])

    def drag_end_callback(self, event: dict[str, Any]) -> None:
        """
        Callback for dragEnd events on the visjs-network.
        Refreshes tabulators if they are currently displayed.
        """
        print("Drag ended:", event)
        # Only refresh if tabulators are currently active
        if hasattr(self, "comparison_tabulator") and hasattr(self, "set_all_tabulator"):
            print("Refreshing tabulators after drag")
            self._refresh_tabulators()

    def update_node_callback(self, event: Any) -> None:
        """Callback for node updates from the JSON editor.

        Args:
            event: Parameter event with new node value.
        """
        print("Node updated:", event)
        new_node_dict = event.new
        self.update_node(new_node_dict)

    def update_node(self, new_node_dict: dict[str, Any]) -> None:
        """Update a node in the network.

        Args:
            new_node_dict: Updated node object.
        """
        print("Updating node:", new_node_dict)
        nodes_list = list(self.visnetwork_panel.nodes)
        for i, node in enumerate(nodes_list):
            if node["id"] == new_node_dict["id"]:
                nodes_list[i] = new_node_dict
                break
        self.visnetwork_panel.nodes = nodes_list

    def show_node_details(self, node_id: Any) -> None:
        """Show details for a clicked node.

        Args:
            node_id: ID of the node to display.
        """
        print("Showing details for node:", node_id)
        self.detail_col.clear()

        # Find the node
        nodes_list = self.visnetwork_panel.nodes
        matching_nodes = [node for node in nodes_list if node["id"] == node_id]
        if not matching_nodes:
            self.detail_col.append(pn.pane.Markdown(f"### Node not found: {node_id}"))
            return

        current_node_dict = matching_nodes[0]
        self.detail_col.append(pn.pane.Markdown(f"### Node ID: {current_node_dict['id']}"))

        # JSON Editor for node properties
        self.current_node_jsoneditor = pn.widgets.JSONEditor(
            value=current_node_dict,
        )
        self.current_node_jsoneditor.param.watch(self.update_node_callback, "value")
        self.detail_col.append(self.current_node_jsoneditor)

        print("Current node dict:", current_node_dict)

        # Rebuild visualizations column
        self.visualizations_col.clear()
        has_visualizations = False

        # Images
        if "image" in current_node_dict:
            try:
                image_bytes = data_url_to_bytes(current_node_dict["image"])
                self.visualizations_col.append(pn.pane.Image(image_bytes))
                has_visualizations = True
            except Exception as e:
                self.visualizations_col.append(pn.pane.Markdown(f"*Error loading image: {e}*"))

        # Data content (CSV, text, PDF)
        if "data" in current_node_dict:
            data = current_node_dict["data"]

            # CSV files
            if data.startswith("data:text/csv") or data.startswith("data:application/vnd.ms-excel"):
                self._show_csv_visualization(data)
                has_visualizations = True

            # Text files
            elif data.startswith("data:text/plain"):
                self._show_text_visualization(data)
                has_visualizations = True

            # PDF files
            elif data.startswith("data:application/pdf"):
                self._show_pdf_visualization(data)
                has_visualizations = True

        # If no visualizations available, show the Details tab instead
        if not has_visualizations:
            self.visualizations_col.append(pn.pane.Markdown("## No Visualizations Available"))
            # Switch to Details tab (index 1)
            self.detail_tabs.active = 1
        else:
            # Switch to Visualization tab (index 0) if visualizations are available
            self.detail_tabs.active = 0

    def show_multi_node_editor(self, node_ids: list[str]) -> None:
        """
        Show tabulator editor for multiple selected nodes.
        """
        print("Showing multi-node editor for:", node_ids)

        # Request position update from JavaScript to ensure x,y coordinates are current
        self.visnetwork_panel.request_position_update()

        self.detail_col.clear()
        self.visualizations_col.clear()
        self.detail_col.append(pn.pane.Markdown(f"### Multiple Nodes Selected ({len(node_ids)} nodes)"))

        # Switch to Details tab (index 1) to show the multi-node editor
        self.detail_tabs.active = 1

        selected_nodes = [node for node in self.visnetwork_panel.nodes if node["id"] in node_ids]

        # Build DataFrame with common properties
        table_data = []
        for node in selected_nodes:
            row = {
                "id": node.get("id"),
                "label": node.get("label", ""),
                "x": node.get("x"),  # None if not set
                "y": node.get("y"),  # None if not set
                "fixed": node.get("fixed", False),
                "shape": node.get("shape", ""),
                "color": str(node.get("color", "")),
            }
            table_data.append(row)

        df = pd.DataFrame(table_data)

        # Create comparison tabulator (editable per row)
        self.detail_col.append(pn.pane.Markdown("#### Node Comparison Table"))
        self.detail_col.append(pn.pane.Markdown("*Edit cells to update individual nodes*"))

        comparison_tabulator = pn.widgets.Tabulator(
            df,
            editors={
                "id": None,  # Not editable
                "label": {"type": "input"},
                "x": {"type": "number"},
                "y": {"type": "number"},
                "fixed": {"type": "tickCross"},
                "shape": {"type": "input"},
                "color": {"type": "input"},
            },
            width=700,
            height=min(400, 50 + len(node_ids) * 30),
        )

        # Store reference to tabulator for callbacks
        self.comparison_tabulator = comparison_tabulator

        # Watch for edits on individual cells
        comparison_tabulator.on_edit(self.on_tabulator_cell_edit)
        self.detail_col.append(comparison_tabulator)

        # Create "set for all" tabulator (single row, applies to all)
        self.detail_col.append(pn.pane.Markdown("#### Set Value for All Selected Nodes"))
        self.detail_col.append(pn.pane.Markdown("*Edit cells here to apply value to ALL selected nodes*"))

        # Build set-all row: show common values or empty string when values differ
        set_all_row = {}
        properties = ["id", "label", "x", "y", "fixed", "shape", "color"]
        for prop in properties:
            values = [row[prop] for row in table_data]
            first_val = values[0]
            if all(v == first_val for v in values):
                set_all_row[prop] = first_val
            else:
                # Values differ - show empty string for text fields, None for others
                if prop in ["label", "shape", "color"]:
                    set_all_row[prop] = ""
                else:
                    set_all_row[prop] = None

        set_all_df = pd.DataFrame([set_all_row])
        set_all_tabulator = pn.widgets.Tabulator(
            set_all_df,
            editors={
                "id": None,  # Not editable
                "label": {"type": "input"},
                "x": {"type": "number"},
                "y": {"type": "number"},
                "fixed": {"type": "tickCross"},
                "shape": {"type": "input"},
                "color": {"type": "input"},
            },
            width=700,
            height=100,
        )

        # Store references for callbacks
        self._current_selected_node_ids = node_ids
        self.set_all_tabulator = set_all_tabulator

        set_all_tabulator.on_edit(self.on_set_all_cell_edit)
        self.detail_col.append(set_all_tabulator)

    def on_tabulator_cell_edit(self, event: Any) -> None:
        """
        Callback when a cell is edited in the comparison tabulator.
        Updates the specific node.
        """
        print("Tabulator cell edited:", event)
        row_index = event.row  # This is the row index (integer)
        column = event.column
        value = event.value

        # Get the actual row data from the tabulator
        row_data = self.comparison_tabulator.value.iloc[row_index]
        node_id = row_data["id"]

        # Convert numpy/pandas types to native Python types for JSON serialization
        value = self._convert_to_python_type(value)

        print(f"Editing row {row_index}, node {node_id}, column {column} = {value}")

        # Update the node - create NEW list AND NEW dict objects to trigger change detection
        nodes = list(self.visnetwork_panel.nodes)
        for i, node in enumerate(nodes):
            if node["id"] == node_id:
                # Create a new dict with the updated property
                updated_node = dict(node)  # to not only mutate original dict
                updated_node[column] = value
                # Set fixed=True when updating x/y positions
                if column in ["x", "y"]:
                    updated_node["fixed"] = True
                nodes[i] = updated_node
                print(f"Updated node {node_id}: {column} = {value}")
                break
        self.visnetwork_panel.nodes = nodes

        # Refresh both tabulators to show updated values
        self._refresh_tabulators()

    def on_set_all_cell_edit(self, event: Any) -> None:
        """
        Callback when a cell is edited in the set-all tabulator.
        Updates ALL selected nodes with the new value.
        """
        print("Set-all cell edited:", event)
        print(f"  Column: {event.column}, Value: {event.value}, Type: {type(event.value)}")

        column = event.column
        value = event.value

        # Convert numpy/pandas types to native Python types for JSON serialization
        value = self._convert_to_python_type(value)

        print(f"Setting {column} = {value} (type: {type(value)}) for all selected nodes")

        # Update all selected nodes - create NEW list AND NEW dict objects
        nodes = list(self.visnetwork_panel.nodes)
        for i, node in enumerate(nodes):
            if node["id"] in self._current_selected_node_ids:
                # Create a new dict with the updated property
                updated_node = dict(node)
                updated_node[column] = value
                # Set fixed=True when updating x/y positions
                if column in ["x", "y"]:
                    updated_node["fixed"] = True
                nodes[i] = updated_node
                print(f"Updated node {node['id']}: {column} = {value}")
        self.visnetwork_panel.nodes = nodes

        # Refresh both tabulators to show updated values
        self._refresh_tabulators()

    def _refresh_tabulators(self) -> None:
        """
        Refresh both tabulators with current node data from visnetwork.
        """
        if not hasattr(self, "comparison_tabulator") or not hasattr(self, "set_all_tabulator"):
            return

        # Get current selected nodes
        selected_nodes = [node for node in self.visnetwork_panel.nodes if node["id"] in self._current_selected_node_ids]

        # Rebuild table data
        table_data = []
        for node in selected_nodes:
            row = {
                "id": node.get("id"),
                "label": node.get("label", ""),
                "x": node.get("x"),  # None if not set
                "y": node.get("y"),  # None if not set
                "fixed": node.get("fixed", False),
                "shape": node.get("shape", ""),
                "color": str(node.get("color", "")),
            }
            table_data.append(row)

        # Update comparison tabulator
        df = pd.DataFrame(table_data)
        self.comparison_tabulator.value = df

        # Update set-all tabulator
        # Show NaN when values differ across nodes, otherwise show the common value
        if table_data:
            set_all_row = {}
            properties = ["id", "label", "x", "y", "fixed", "shape", "color"]

            for prop in properties:
                values = [row[prop] for row in table_data]
                # Check if all values are the same
                first_val = values[0]
                if all(v == first_val for v in values):
                    set_all_row[prop] = first_val
                else:
                    # Values differ - show empty string for text fields, None for others
                    if prop in ["label", "shape", "color"]:
                        set_all_row[prop] = ""
                    else:
                        set_all_row[prop] = None

            set_all_df = pd.DataFrame([set_all_row])
            self.set_all_tabulator.value = set_all_df

    def _convert_to_python_type(self, value: Any) -> Any:
        """
        Convert numpy/pandas types to native Python types for JSON serialization.
        """
        import numpy as np

        if isinstance(value, (np.integer, np.int64, np.int32)):
            return int(value)
        elif isinstance(value, (np.floating, np.float64, np.float32)):
            return float(value)
        elif isinstance(value, (np.bool_, bool)):
            return bool(value)
        elif isinstance(value, (np.str_, str)):
            return str(value)
        elif pd.isna(value):
            return None
        else:
            return value

    def _show_csv_visualization(self, data_url: str) -> None:
        """Show CSV data visualization with table and plot.

        Args:
            data_url: Data URL containing CSV content.
        """
        if not _HAS_PANDAS:
            self.visualizations_col.append(
                pn.pane.Markdown(
                    "### CSV Preview\n\n"
                    "*pandas is required for CSV visualization. "
                    "Install with: `pip install panelini[plotting]`*"
                )
            )
            return

        try:
            csv_bytes = data_url_to_bytes(data_url)
            csv_str = csv_bytes.decode("utf-8")

            # Auto-detect delimiter
            df = pd.read_csv(StringIO(csv_str), sep=None, engine="python")

            self.visualizations_col.append(pn.pane.Markdown("### CSV Data Preview"))
            self.visualizations_col.append(pn.widgets.DataFrame(df, width=600, height=300))

            # Column lists
            all_cols = list(df.columns)
            numeric_cols = list(df.select_dtypes(include="number").columns)

            if len(numeric_cols) == 0:
                self.visualizations_col.append(pn.pane.Markdown("*(No numeric columns found for plotting.)*"))
                return

            if not _HAS_PLOTLY:
                self.visualizations_col.append(
                    pn.pane.Markdown(
                        "*(plotly is required for CSV plotting. Install with: `pip install panelini[plotting]`)*"
                    )
                )
                return

            # Default selections
            default_x = all_cols[0]
            default_y = numeric_cols[0]

            x_select = pn.widgets.Select(
                name="X-Axis",
                options=all_cols,
                value=default_x,
            )
            y_select = pn.widgets.Select(
                name="Y-Axis",
                options=numeric_cols,
                value=default_y,
            )

            def make_figure(x_col: str, y_col: str) -> pn.pane.Pane:
                if y_col not in df.select_dtypes(include="number").columns:
                    return pn.pane.Markdown("*(Selected Y column is not numeric.)*")
                fig = px.line(
                    df,
                    x=x_col,
                    y=y_col,
                    title=f"Plot of '{y_col}' vs '{x_col}'",
                )
                return pn.pane.Plotly(fig, config={"responsive": True})

            plot_pane = pn.bind(make_figure, x_col=x_select, y_col=y_select)

            self.visualizations_col.append(pn.pane.Markdown("### CSV Plot"))
            self.visualizations_col.append(
                pn.Column(
                    pn.Row(x_select, y_select, width=250),
                    plot_pane,
                )
            )
        except Exception as e:
            self.visualizations_col.append(pn.pane.Markdown(f"*Error loading CSV: {e}*"))

    def _show_text_visualization(self, data_url: str) -> None:
        """Show text file content.

        Args:
            data_url: Data URL containing text content.
        """
        try:
            text_bytes = data_url_to_bytes(data_url)
            text_str = text_bytes.decode("utf-8")
            self.visualizations_col.append(pn.pane.Markdown("### Text Preview"))
            self.visualizations_col.append(pn.pane.Markdown(f"```\n{text_str}\n```"))
        except Exception as e:
            self.visualizations_col.append(pn.pane.Markdown(f"*Error loading text: {e}*"))

    def _show_pdf_visualization(self, data_url: str) -> None:
        """Show PDF file content.

        Args:
            data_url: Data URL containing PDF content.
        """
        try:
            pdf_bytes = data_url_to_bytes(data_url)
            self.visualizations_col.append(pn.pane.Markdown("### PDF Preview"))
            self.visualizations_col.append(pn.pane.PDF(pdf_bytes, width=600, height=800))
        except Exception as e:
            self.visualizations_col.append(pn.pane.Markdown(f"*Error loading PDF: {e}*"))

    def __panel__(self) -> Optional[pn.Row]:
        """Return the Panel object for display."""
        return self._panel
