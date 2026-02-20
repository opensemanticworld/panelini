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

    # Internal action data (for Python -> JavaScript commands)
    _graph_action = param.Dict(default={}, doc="Graph action command for JavaScript")

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

    def request_position_update(self) -> None:
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

    # =========================================================================
    # Incremental Graph Update API
    # =========================================================================

    def _send_graph_action(self, action: str, payload: Any) -> None:
        """Send a graph action command to JavaScript."""
        import time

        self._graph_action = {
            "action": action,
            "payload": payload,
            "timestamp": time.time(),
        }

    def update_node(self, node: dict[str, Any]) -> None:
        """Update an existing node's properties (partial update).

        Args:
            node: Node dict with 'id' and properties to update.
                  Only provided properties will be updated.
        """
        self._send_graph_action("updateNode", node)
        # Update local state
        node_id = node.get("id")
        self.nodes = [{**n, **node} if n.get("id") == node_id else n for n in self.nodes]

    def update_nodes(self, nodes: list[dict[str, Any]]) -> None:
        """Update multiple nodes' properties at once (partial updates).

        Args:
            nodes: List of node dicts, each with 'id' and properties to update.
        """
        self._send_graph_action("updateNodes", nodes)
        # Update local state
        node_ids = {n.get("id"): n for n in nodes}
        self.nodes = [{**n, **node_ids[n.get("id")]} if n.get("id") in node_ids else n for n in self.nodes]

    def update_node_state(self, node_ids: list[Any], state: str) -> None:
        """Update the state of multiple nodes (changes border color).

        Args:
            node_ids: List of node IDs to update.
            state: New state - 'new' (red), 'modified' (yellow), or 'stored' (black).
        """
        self._send_graph_action(
            "updateNodeState",
            {
                "nodeIds": node_ids,
                "state": state,
            },
        )
        # Update local state
        border_colors = {"new": "#ff0000", "modified": "#ffcc00", "stored": "#333333"}
        border_color = border_colors.get(state, "#333333")
        border_width = 3 if state in ("new", "modified") else 2

        def update_node(n: dict) -> dict:
            if n.get("id") not in node_ids:
                return n
            updated = dict(n)
            updated["nodeState"] = state
            updated["borderWidth"] = border_width
            if "color" in updated and isinstance(updated["color"], dict):
                updated["color"] = {**updated["color"], "border": border_color}
            else:
                updated["color"] = {"border": border_color}
            return updated

        self.nodes = [update_node(n) for n in self.nodes]

    def update_edge(self, edge: dict[str, Any]) -> None:
        """Update an existing edge's properties (partial update).

        Args:
            edge: Edge dict with 'id' or 'from'/'to' keys and properties
                  to update.
        """
        self._send_graph_action("updateEdge", edge)
        # Update local state
        edge_id = edge.get("id")
        from_id = edge.get("from")
        to_id = edge.get("to")
        self.edges = [{**e, **edge} if self._edge_matches(e, edge_id, from_id, to_id) else e for e in self.edges]

    def get_node(self, node_id: Any) -> Optional[dict[str, Any]]:
        """Get a single node by ID.

        Args:
            node_id: The ID of the node to retrieve.

        Returns:
            The node dict if found, None otherwise.
        """
        for node in self.nodes:
            if node.get("id") == node_id:
                return dict(node)
        return None

    def get_edge(
        self,
        edge_id: Any = None,
        from_id: Any = None,
        to_id: Any = None,
    ) -> Optional[dict[str, Any]]:
        """Get a single edge by ID or by from/to combination.

        Args:
            edge_id: The ID of the edge (if edges have IDs).
            from_id: The source node ID (used with to_id).
            to_id: The target node ID (used with from_id).

        Returns:
            The edge dict if found, None otherwise.
        """
        for edge in self.edges:
            if self._edge_matches(edge, edge_id, from_id, to_id):
                return dict(edge)
        return None

    def clear(self) -> None:
        """Clear all nodes and edges from the network."""
        self._send_graph_action("clear", None)
        self.nodes = []
        self.edges = []

    def execute_step(self, step: dict[str, Any]) -> None:
        """Execute a step from a playbook sequence (flat JSON format).

        Changes are synced back from JS via emitNodesAndEdges().

        Args:
            step: Step dict with 'actions' list and optional 'status'.
                  Actions use flat format matching the JS playbook notation.

        Example:
            graph.execute_step({
                "actions": [
                    {"action": "addNode", "id": "n1", "label": "Node 1", "type": "instance"},
                    {"action": "addEdge", "from": "n1", "to": "n2", "label": "connects"},
                    {"action": "updateNodeState", "nodeIds": ["n1"], "state": "stored"},
                ],
                "status": "Adding nodes..."
            })
        """
        self._send_graph_action("executeStep", step)

    def batch_update(self, actions: list[dict[str, Any]]) -> None:
        """Execute multiple graph actions atomically.

        Args:
            actions: List of action dicts, each containing:
                - action: One of 'addNode', 'addEdge', 'updateNode',
                          'updateEdge', 'removeNode', 'removeEdge'
                - payload: The node/edge data or ID to operate on

        Example:
            graph.batch_update([
                {"action": "addNode", "payload": {"id": 1, "label": "A"}},
                {"action": "addEdge", "payload": {"from": 1, "to": 2}},
                {"action": "updateNode", "payload": {"id": 2, "color": "red"}},
                {"action": "removeNode", "payload": {"id": 3}},
            ])
        """
        self._send_graph_action("batch", actions)
        self._apply_batch_to_local_state(actions)

    def merge_nodes(
        self,
        source_id: Any,
        target_id: Any,
        merge_properties: bool = True,
    ) -> None:
        """Merge source node into target node, redirecting all edges.

        Args:
            source_id: ID of the node to be merged and removed.
            target_id: ID of the node to receive the merged edges.
            merge_properties: If True, merge source properties into target.
        """
        self._send_graph_action(
            "mergeNodes",
            {
                "sourceId": source_id,
                "targetId": target_id,
                "mergeProperties": merge_properties,
            },
        )
        self._apply_merge_to_local_state(source_id, target_id, merge_properties)

    # =========================================================================
    # Internal helpers for local state management
    # =========================================================================

    def _edge_matches(
        self,
        edge: dict[str, Any],
        edge_id: Any,
        from_id: Any,
        to_id: Any,
    ) -> bool:
        """Check if edge matches the given criteria."""
        if edge_id is not None and edge.get("id") == edge_id:
            return True
        if from_id is not None and to_id is not None:
            return bool(edge.get("from") == from_id and edge.get("to") == to_id)
        return False

    def _apply_batch_to_local_state(self, actions: list[dict[str, Any]]) -> None:
        """Apply batch actions to local Python state."""
        nodes = list(self.nodes)
        edges = list(self.edges)

        for item in actions:
            action = item.get("action")
            payload = item.get("payload", {})

            if action == "addNode":
                nodes.append(payload)
            elif action == "addEdge":
                edges.append(payload)
            elif action == "updateNode":
                node_id = payload.get("id")
                nodes = [{**n, **payload} if n.get("id") == node_id else n for n in nodes]
            elif action == "updateEdge":
                edge_id = payload.get("id")
                from_id = payload.get("from")
                to_id = payload.get("to")
                edges = [{**e, **payload} if self._edge_matches(e, edge_id, from_id, to_id) else e for e in edges]
            elif action == "removeNode":
                node_id = payload.get("id") if isinstance(payload, dict) else payload
                nodes = [n for n in nodes if n.get("id") != node_id]
            elif action == "removeEdge":
                if isinstance(payload, dict):
                    edge_id = payload.get("id")
                    from_id = payload.get("from")
                    to_id = payload.get("to")
                else:
                    edge_id = payload
                    from_id = to_id = None
                edges = [e for e in edges if not self._edge_matches(e, edge_id, from_id, to_id)]

        self.nodes = nodes
        self.edges = edges

    def _apply_merge_to_local_state(
        self,
        source_id: Any,
        target_id: Any,
        merge_properties: bool,
    ) -> None:
        """Apply node merge to local state."""
        source_node = self.get_node(source_id)

        if merge_properties and source_node:
            # Update target with source properties (excluding id)
            source_props = {k: v for k, v in source_node.items() if k != "id"}
            self.nodes = [{**n, **source_props} if n.get("id") == target_id else n for n in self.nodes]

        # Redirect edges from source to target, skip self-loops
        new_edges = []
        for edge in self.edges:
            new_edge = dict(edge)
            if edge.get("from") == source_id:
                new_edge["from"] = target_id
            if edge.get("to") == source_id:
                new_edge["to"] = target_id
            # Skip self-loops created by merge
            if new_edge.get("from") != new_edge.get("to"):
                new_edges.append(new_edge)
        self.edges = new_edges

        # Remove source node
        self.nodes = [n for n in self.nodes if n.get("id") != source_id]
