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
            self.click_callback(event_params_dict)

    def click_callback(self, event: dict[str, Any]) -> None:
        """Callback for click events on the network.

        Args:
            event: Event data containing clicked node IDs.
        """
        print("Node clicked:", event)
        node_ids = event.get("nodes", [])
        for node_id in node_ids:
            self.show_node_details(node_id)

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

        # Images
        if "image" in current_node_dict:
            try:
                image_bytes = data_url_to_bytes(current_node_dict["image"])
                self.visualizations_col.append(pn.pane.Image(image_bytes))
            except Exception as e:
                self.visualizations_col.append(pn.pane.Markdown(f"*Error loading image: {e}*"))

        # Data content (CSV, text, PDF)
        if "data" in current_node_dict:
            data = current_node_dict["data"]

            # CSV files
            if data.startswith("data:text/csv") or data.startswith("data:application/vnd.ms-excel"):
                self._show_csv_visualization(data)

            # Text files
            elif data.startswith("data:text/plain"):
                self._show_text_visualization(data)

            # PDF files
            elif data.startswith("data:application/pdf"):
                self._show_pdf_visualization(data)

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
