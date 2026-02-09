"""Entrypoint of visnetwork panel."""

from pathlib import Path
from typing import Any, Callable, ClassVar, Optional

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class VisNetwork(AnyWidgetComponent):
    """A vis-network graph visualization component.

    This component wraps the vis-network JavaScript library to provide
    interactive network/graph visualization within Panel applications.
    """

    _esm = (bundled_assets_dir / "visnetwork_vue.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        (bundled_assets_dir / "visnetwork_vue.css").read_text(encoding="utf-8"),
    ]

    # Data parameters
    nodes = param.List(default=[], doc="List of node objects with id, label, etc.")
    edges = param.List(default=[], doc="List of edge objects with from, to, etc.")
    options = param.Dict(default={}, doc="vis-network configuration options")

    # State parameters
    manipulation_state = param.String(
        default="disableEditMode",
        doc="Edit mode state: 'disableEditMode', 'addNodeMode', 'addEdgeMode'",
    )

    # Internal event data (for JavaScript -> Python communication)
    _event_data = param.Dict(default={}, doc="Event data from JavaScript")
    _request_positions = param.Integer(default=0, doc="Increment to request position update from JS")

    def __init__(
        self,
        nodes: Optional[list[dict[str, Any]]] = None,
        edges: Optional[list[dict[str, Any]]] = None,
        options: Optional[dict[str, Any]] = None,
        network_event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        file_drop_callback: Optional[Callable[[dict[str, Any]], None]] = None,
        **params: Any,
    ) -> None:
        """Initialize the VisNetwork component.

        Args:
            nodes: List of node objects with at least 'id' and optionally 'label', 'shape', etc.
            edges: List of edge objects with 'from' and 'to' node IDs.
            options: vis-network options for customizing appearance and behavior.
            network_event_callback: Callback function for network events (click, drag, etc.).
            file_drop_callback: Callback function for file drop events.
            **params: Additional parameters passed to AnyWidgetComponent.
        """
        super().__init__(**params)

        # Set initial values
        if nodes is not None:
            self.nodes = nodes
        if edges is not None:
            self.edges = edges
        if options is not None:
            self.options = options

        # Store callbacks
        self._network_event_callback = network_event_callback
        self._file_drop_callback = file_drop_callback

        # Watch for event data changes from JavaScript
        self.param.watch(self._on_event_data_change, ["_event_data"])

    def _on_event_data_change(self, event: Any) -> None:
        """Handle event data changes from JavaScript."""
        event_data = event.new
        if not event_data:
            return

        event_name = event_data.get("event_name")
        event_params = event_data.get("event_params", {})

        if event_name:
            self.handle_network_event(event_name, event_params)

    def handle_network_event(self, event_name: str, event_params: dict[str, Any]) -> None:
        """Handle a network event.

        Args:
            event_name: Name of the event (click, doubleClick, dragEnd, etc.).
            event_params: Event parameters containing nodes, edges, positions, etc.
        """
        print(f"Network event: {event_name}")

        # Handle file drop separately
        if event_name == "fileDrop":
            if self._file_drop_callback:
                self._file_drop_callback(event_params)
            else:
                self.default_file_drop_callback(event_params)
            return

        # Call the general network event callback if provided
        if self._network_event_callback:
            self._network_event_callback(event_name, event_params)

    def default_file_drop_callback(self, event_params: dict[str, Any]) -> None:
        """Default handler for file drop events.

        Creates nodes for dropped files at the drop position.

        Args:
            event_params: Contains x, y coordinates and files list with name and content.
        """
        x = event_params.get("x", 0)
        y = event_params.get("y", 0)
        files = event_params.get("files", [])

        new_nodes = list(self.nodes)  # Create a copy

        for i, file_info in enumerate(files):
            file_name = file_info.get("name", f"file_{i}")
            file_content = file_info.get("content", "")

            # Generate a unique ID
            max_id = max((n.get("id", 0) for n in new_nodes), default=0)
            new_id = max_id + 1

            # Determine node shape based on file type
            if file_content.startswith("data:image/"):
                new_node = {
                    "id": new_id,
                    "label": file_name,
                    "shape": "image",
                    "image": file_content,
                    "size": 30,
                    "x": x + i * 50,
                    "y": y,
                }
            else:
                new_node = {
                    "id": new_id,
                    "label": file_name,
                    "shape": "ellipse",
                    "data": file_content,
                    "size": 30,
                    "x": x + i * 50,
                    "y": y,
                }

            new_nodes.append(new_node)

        self.nodes = new_nodes

    def disable_edit_mode(self) -> None:
        """Disable manipulation/edit mode."""
        # Use empty string toggle to ensure change is detected
        self.manipulation_state = ""
        self.manipulation_state = "disableEditMode"

    def add_node_mode(self) -> None:
        """Enable add node mode."""
        self.manipulation_state = ""
        self.manipulation_state = "addNodeMode"

    def add_edge_mode(self) -> None:
        """Enable add edge mode."""
        self.manipulation_state = ""
        self.manipulation_state = "addEdgeMode"

    def request_position_update(self):
        """Request JavaScript to update all node positions from the network."""
        self._request_positions += 1

    def get_nodes(self) -> list[dict[str, Any]]:
        """Get the current list of nodes."""
        return list(self.nodes)

    def get_edges(self) -> list[dict[str, Any]]:
        """Get the current list of edges."""
        return list(self.edges)

    def set_nodes(self, nodes: list[dict[str, Any]]) -> None:
        """Set the nodes."""
        self.nodes = nodes

    def set_edges(self, edges: list[dict[str, Any]]) -> None:
        """Set the edges."""
        self.edges = edges

    def add_node(self, node: dict[str, Any]) -> None:
        """Add a single node to the network.

        Args:
            node: Node object with at least 'id' key.
        """
        self.nodes = [*self.nodes, node]

    def add_edge(self, edge: dict[str, Any]) -> None:
        """Add a single edge to the network.

        Args:
            edge: Edge object with 'from' and 'to' keys.
        """
        self.edges = [*self.edges, edge]

    def remove_node(self, node_id: Any) -> None:
        """Remove a node by ID.

        Args:
            node_id: The ID of the node to remove.
        """
        self.nodes = [n for n in self.nodes if n.get("id") != node_id]

    def remove_edge(self, from_id: Any, to_id: Any) -> None:
        """Remove an edge by from/to IDs.

        Args:
            from_id: The source node ID.
            to_id: The target node ID.
        """
        self.edges = [e for e in self.edges if not (e.get("from") == from_id and e.get("to") == to_id)]
