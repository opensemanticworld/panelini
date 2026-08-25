"""Entrypoint of wunderbaum panel."""

import asyncio
import inspect
import time
from collections.abc import Awaitable
from pathlib import Path
from typing import Any, Callable, ClassVar, Optional, Union

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class Wunderbaum(AnyWidgetComponent):
    """A Wunderbaum tree/treegrid visualization component.

    This component wraps the Wunderbaum JavaScript library to provide
    interactive tree and treegrid visualization within Panel applications.

    Two display modes:
    - Tree-only mode (default): When columns is empty. Compact tree display.
    - Tree+Table mode: When columns is provided. Treegrid with resizable columns.
    """

    _esm = (bundled_assets_dir / "wunderbaum_vue.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        (bundled_assets_dir / "wunderbaum_vue.css").read_text(encoding="utf-8"),
    ]

    # Data parameters
    source = param.List(
        default=[],
        doc="Tree source data - list of node dicts with title, key, children, etc.",
    )
    columns = param.List(
        default=[],
        doc="Column definitions for treegrid mode. Empty = tree-only mode.",
    )
    options = param.Dict(
        default={},
        doc="Wunderbaum configuration options.",
    )
    types = param.Dict(
        default={},
        doc="Node type definitions for shared attributes.",
    )

    # Context menu items: list of {id, label, icon?} dicts. Empty = no context menu.
    context_menu_items = param.List(
        default=[],
        doc="Context menu items shown on right-click. Each: {id, label, icon?}.",
    )

    tree_id = param.String(
        default="",
        doc="Identifier for this tree, reported as source_tree_id on cross-tree drops.",
    )

    # Internal event data (for JavaScript -> Python communication)
    _event_data = param.Dict(default={}, doc="Event data from JavaScript")

    # Internal action data (for Python -> JavaScript commands)
    _tree_action = param.Dict(default={}, doc="Tree action command for JavaScript")

    # Lazy loading protocol
    _lazy_request = param.Dict(default={}, doc="Lazy load request from JS")
    _lazy_response = param.Dict(default={}, doc="Lazy load response to JS")

    def __init__(
        self,
        source: Optional[list[dict[str, Any]]] = None,
        columns: Optional[list[dict[str, Any]]] = None,
        options: Optional[dict[str, Any]] = None,
        types: Optional[dict[str, Any]] = None,
        context_menu_items: Optional[list[dict[str, Any]]] = None,
        tree_id: Optional[str] = None,
        tree_event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        lazy_load_callback: Optional[
            Callable[[str, dict[str, Any]], Union[list[dict[str, Any]], Awaitable[list[dict[str, Any]]]]]
        ] = None,
        file_drop_callback: Optional[Callable[[dict[str, Any]], None]] = None,
        **params: Any,
    ) -> None:
        """Initialize the Wunderbaum component.

        Args:
            source: Tree source data - list of node dicts.
            columns: Column definitions for treegrid mode.
            options: Wunderbaum configuration options.
            types: Node type definitions.
            context_menu_items: Context menu items shown on right-click.
            tree_id: Identifier for this tree. A tree that receives a drag from
                another tree reports it as ``source_tree_id`` on the
                ``externalDrop`` event, so give every tree in a multi-tree
                layout a distinct id.
            tree_event_callback: Callback for tree events (activate, click, etc.).
            lazy_load_callback: Callback for lazy loading. Receives (key, request_data),
                returns list of child node dicts.
            file_drop_callback: Callback for file drop events.
            **params: Additional parameters passed to AnyWidgetComponent.
        """
        super().__init__(**params)

        if source is not None:
            self.source = source
        if columns is not None:
            self.columns = columns
        if options is not None:
            self.options = options
        if types is not None:
            self.types = types
        if context_menu_items is not None:
            self.context_menu_items = context_menu_items
        if tree_id is not None:
            self.tree_id = tree_id

        self._tree_event_callback = tree_event_callback
        self._lazy_load_callback = lazy_load_callback
        self._file_drop_callback = file_drop_callback
        self._lazy_tasks: set[asyncio.Task] = set()

        # Watch for event data changes from JavaScript
        self.param.watch(self._on_event_data_change, ["_event_data"])
        self.param.watch(self._on_lazy_request_change, ["_lazy_request"])

    def _on_event_data_change(self, event: Any) -> None:
        """Handle event data changes from JavaScript."""
        event_data = event.new
        if not event_data:
            return

        event_name = event_data.get("event_name")
        event_params = event_data.get("event_params", {})

        if event_name:
            self.handle_tree_event(event_name, event_params)

    def handle_tree_event(self, event_name: str, event_params: dict[str, Any]) -> None:
        """Handle a tree event.

        Args:
            event_name: Name of the event (activate, click, dblclick, etc.).
            event_params: Event parameters containing node key, title, data, etc.
        """
        print(f"Tree event: {event_name}")

        # Handle file drop separately
        if event_name == "fileDrop":
            if self._file_drop_callback:
                self._file_drop_callback(event_params)
            return

        # Call the general tree event callback if provided
        if self._tree_event_callback:
            self._tree_event_callback(event_name, event_params)

    def _on_lazy_request_change(self, event: Any) -> None:
        """Handle lazy load requests from JavaScript.

        The callback may be a coroutine function, in which case it is awaited on the
        running event loop and the children are sent when it resolves. That lets a
        callback await real I/O (a database, an HTTP API) without blocking: a
        synchronous wait would freeze the server thread, and in the browser
        (Pyodide, single threaded) it would freeze the whole app.
        """
        request_data = event.new
        if not request_data:
            return

        node_key = request_data.get("key")
        if not node_key or not self._lazy_load_callback:
            return

        children = self._lazy_load_callback(node_key, request_data)
        if inspect.isawaitable(children):
            # Keep a strong reference: the event loop only holds a weak one, so an
            # un-referenced task can be garbage collected before it responds.
            task = asyncio.ensure_future(self._respond_lazy_load_async(node_key, children))
            self._lazy_tasks.add(task)
            task.add_done_callback(self._lazy_tasks.discard)
        elif children is not None:
            self.respond_lazy_load(node_key, children)

    async def _respond_lazy_load_async(self, node_key: str, pending: Any) -> None:
        """Await an async lazy-load callback and send its children to JavaScript."""
        children = await pending
        if children is not None:
            self.respond_lazy_load(node_key, children)

    # =========================================================================
    # Public API - Commands sent to JavaScript
    # =========================================================================

    def _send_tree_action(self, action: str, payload: Any) -> None:
        """Send a tree action command to JavaScript."""
        self._tree_action = {
            "action": action,
            "payload": payload,
            "timestamp": time.time(),
        }

    def get_source(self) -> list[dict[str, Any]]:
        """Get the current tree source data."""
        return list(self.source)

    def set_source(self, source: list[dict[str, Any]]) -> None:
        """Set the tree source data (full replacement)."""
        self.source = source

    def add_node(self, parent_key: Optional[str], node: dict[str, Any]) -> None:
        """Add a child node to the tree.

        Args:
            parent_key: Key of the parent node. None to add to root.
            node: Node dict with at least 'title' and 'key'.
        """
        self._send_tree_action("addNode", {"parentKey": parent_key, "node": node})

    def remove_node(self, key: str) -> None:
        """Remove a node by key.

        Args:
            key: The key of the node to remove.
        """
        self._send_tree_action("removeNode", {"key": key})

    def move_node(self, key: str, target_key: str, mode: str = "child") -> None:
        """Move a node to a new position.

        Args:
            key: Key of the node to move.
            target_key: Key of the target node.
            mode: Position relative to target - 'before', 'after', or 'child'.
        """
        self._send_tree_action("moveNode", {"key": key, "targetKey": target_key, "mode": mode})

    def update_node(self, key: str, data: dict[str, Any]) -> None:
        """Update a node's properties (partial update).

        Args:
            key: Key of the node to update.
            data: Dict with properties to update. Supports: title, icon, type,
                  classes, tooltip, checkbox, data (merged into node.data).
        """
        self._send_tree_action("updateNode", {"key": key, "data": data})

    def rename_node(self, key: str, title: str) -> None:
        """Rename a node.

        Args:
            key: Key of the node to rename.
            title: New title for the node.
        """
        self._send_tree_action("renameNode", {"key": key, "title": title})

    def clear(self) -> None:
        """Clear all nodes from the tree."""
        self._send_tree_action("clear", None)
        self.source = []

    def expand_node(self, key: str, expanded: bool = True) -> None:
        """Expand or collapse a node.

        Args:
            key: Key of the node.
            expanded: True to expand, False to collapse.
        """
        self._send_tree_action("expandNode", {"key": key, "expanded": expanded})

    def select_node(self, key: str, selected: bool = True) -> None:
        """Select or deselect a node.

        Args:
            key: Key of the node.
            selected: True to select, False to deselect.
        """
        self._send_tree_action("selectNode", {"key": key, "selected": selected})

    def set_active_node(self, key: str) -> None:
        """Set the active (focused) node.

        Args:
            key: Key of the node to activate.
        """
        self._send_tree_action("setActiveNode", {"key": key})

    def respond_lazy_load(self, key: str, children: list[dict[str, Any]]) -> None:
        """Respond to a lazy load request with children data.

        Args:
            key: Key of the lazy node that requested loading.
            children: List of child node dicts to add.
        """
        self._lazy_response = {
            "key": key,
            "children": children,
            "timestamp": time.time(),
        }

    def batch_update(self, actions: list[dict[str, Any]]) -> None:
        """Execute multiple tree actions atomically.

        Args:
            actions: List of action dicts, each containing:
                - action: One of 'addNode', 'removeNode', 'moveNode',
                          'updateNode', 'renameNode', 'expandNode', 'selectNode'
                - Plus action-specific fields (key, parentKey, title, etc.)

        Example:
            tree.batch_update([
                {"action": "addNode", "parentKey": "root", "key": "n1",
                 "title": "New Node"},
                {"action": "renameNode", "key": "n2", "title": "Renamed"},
                {"action": "removeNode", "key": "n3"},
            ])
        """
        self._send_tree_action("batch", actions)

    def execute_step(self, step: dict[str, Any]) -> None:
        """Execute a step from a playbook sequence.

        Args:
            step: Step dict with 'actions' list and optional 'status'.

        Example:
            tree.execute_step({
                "actions": [
                    {"action": "addNode", "parentKey": None, "key": "f1",
                     "title": "Folder 1", "icon": "bi bi-folder"},
                    {"action": "addNode", "parentKey": "f1", "key": "f1a",
                     "title": "File A", "icon": "bi bi-file-earmark"},
                ],
                "status": "Creating files..."
            })
        """
        self._send_tree_action("executeStep", step)

    # =========================================================================
    # Convenience methods for filesystem use case
    # =========================================================================

    def add_folder(
        self,
        parent_key: Optional[str],
        name: str,
        key: Optional[str] = None,
    ) -> None:
        """Add a folder node.

        Args:
            parent_key: Key of the parent node. None for root.
            name: Folder name (title).
            key: Unique key. Defaults to name.
        """
        node: dict[str, Any] = {
            "title": name,
            "key": key or name,
            "icon": "bi bi-folder",
            "children": [],
        }
        self.add_node(parent_key, node)

    def add_file(
        self,
        parent_key: Optional[str],
        name: str,
        data: Optional[dict[str, Any]] = None,
        key: Optional[str] = None,
    ) -> None:
        """Add a file node.

        Args:
            parent_key: Key of the parent node. None for root.
            name: File name (title).
            data: Optional data dict for the file.
            key: Unique key. Defaults to name.
        """
        node: dict[str, Any] = {
            "title": name,
            "key": key or name,
            "icon": "bi bi-file-earmark",
            **(data or {}),
        }
        self.add_node(parent_key, node)
