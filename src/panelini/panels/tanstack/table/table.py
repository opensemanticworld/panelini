"""Entrypoint of the TanstackTable panel."""

from pathlib import Path
from typing import Any, Callable, ClassVar, Optional

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

from . import tree

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class TanstackTable(AnyWidgetComponent):
    """An accessible tree and treegrid component built on TanStack Table.

    Data flow is strictly unidirectional. Python owns ``source``: it is pushed to
    JavaScript and never written back from there. The browser emits intent only
    (a move request, an activation) through ``_event_data``; Python validates it,
    rewrites ``source``, and the new tree is pushed down. That removes the guard
    flag the wunderbaum panel needs to break its feedback loop, and it makes the
    tree state testable in Python without a browser.

    Two display modes:
    - Tree-only mode (default): when ``columns`` is empty.
    - Treegrid mode: when ``columns`` is provided.
    """

    _esm = (bundled_assets_dir / "tanstack_table.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        (bundled_assets_dir / "tanstack_table.css").read_text(encoding="utf-8"),
    ]

    # Python to JavaScript. Never written from the browser.
    source = param.List(
        default=[],
        doc=(
            "Tree source data - list of node dicts with key, title, children, plus column fields. "
            "Optional per node: icon, naming an entry of the icons param, and allow_children=False "
            "to make the node a leaf nothing can be dropped into."
        ),
    )
    columns = param.List(
        default=[],
        doc="Column definitions for treegrid mode. Empty = tree-only mode.",
    )
    options = param.Dict(
        default={},
        doc="Display options: indent_px, aria_label, expand_all, select_mode, enable_dnd.",
    )
    icons = param.Dict(
        default={},
        doc=(
            "Extra icons as name to inline SVG markup, merged over the bundled Material Icon Theme "
            "set (document, file, folder, folder-open, image, markdown, pdf, python). See "
            "panelini.panels.tanstack.table.load_icons. An expanded node prefers the '<name>-open' "
            "entry when it exists, which is how a folder opens."
        ),
    )

    # Bidirectional, but safe: sorted key sets, so an echo is value-equal and stops.
    expanded_keys = param.List(
        default=[],
        doc="Keys of the currently expanded nodes.",
    )
    selected_keys = param.List(
        default=[],
        doc="Keys of the currently selected nodes. In hierarchy mode this includes cascaded children.",
    )

    # JavaScript to Python. Carries intent, never a mutated tree.
    _event_data = param.Dict(default={}, doc="Event data from JavaScript")

    def __init__(
        self,
        source: Optional[list[dict[str, Any]]] = None,
        columns: Optional[list[dict[str, Any]]] = None,
        options: Optional[dict[str, Any]] = None,
        icons: Optional[dict[str, str]] = None,
        expanded_keys: Optional[list[str]] = None,
        selected_keys: Optional[list[str]] = None,
        event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        move_callback: Optional[Callable[[str, str, str], bool]] = None,
        **params: Any,
    ) -> None:
        """Initialize the TanstackTable component.

        Args:
            source: Tree source data - list of node dicts.
            columns: Column definitions for treegrid mode.
            options: Display options.
            icons: Extra icons as name to inline SVG markup, merged over the
                bundled set and referenced by a node's ``icon``.
            expanded_keys: Keys of nodes to show expanded.
            selected_keys: Keys of nodes to show selected.
            event_callback: Callback for events emitted by the browser. Receives
                ``(event_name, event_params)``.
            move_callback: Veto hook for drag and drop. Receives
                ``(key, anchor_key, position)`` with position in
                ``before | after | child``, and returning False cancels the move
                so ``source`` is left untouched. Called once per node, so a drag
                of several rows can be vetoed for some of them and allowed for
                the rest.
            **params: Additional parameters passed to AnyWidgetComponent.
        """
        super().__init__(**params)

        if source is not None:
            self.source = source
        if columns is not None:
            self.columns = columns
        if options is not None:
            self.options = options
        if icons is not None:
            self.icons = icons
        if expanded_keys is not None:
            self.expanded_keys = expanded_keys
        if selected_keys is not None:
            self.selected_keys = selected_keys

        self._event_callback = event_callback
        self._move_callback = move_callback

        self.param.watch(self._on_event_data_change, ["_event_data"])

    def _on_event_data_change(self, event: Any) -> None:
        """Dispatch event data coming from JavaScript."""
        event_data = event.new
        if not event_data:
            return

        event_name = event_data.get("event_name")
        if not event_name:
            return

        self.handle_event(event_name, event_data.get("event_params", {}))

    def handle_event(self, event_name: str, event_params: dict[str, Any]) -> None:
        """Handle a single event from the browser.

        ``move`` is intercepted here: the browser only reports where the pointer
        let go, and this is where that intent becomes a new tree. Every other
        event is forwarded untouched.

        Args:
            event_name: Name of the event, for example ``activate``.
            event_params: Event payload, always containing at least ``key``.
        """
        if event_name == "move":
            event_params = self._apply_move_intent(event_params)

        if self._event_callback:
            self._event_callback(event_name, event_params)

    def _apply_move_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Resolve a browser move intent and rewrite ``source``.

        The browser speaks the pragmatic-drag-and-drop vocabulary in camelCase.
        This normalises it to a snake_case payload with a resolved ``position``
        and ``anchor_key``, which is what the callbacks see.

        Args:
            event_params: Raw payload from the browser.

        Returns:
            The normalised payload, with ``applied`` recording whether the tree
            actually changed.
        """
        key = event_params.get("key")
        keys = event_params.get("keys") or ([key] if key else [])
        target_key = event_params.get("target_key", event_params.get("targetKey"))
        instruction = event_params.get("instruction")
        desired_level = event_params.get("desired_level", event_params.get("desiredLevel"))

        resolved = None
        if keys and target_key and instruction:
            resolved = tree.resolve_instruction(self.source, target_key, instruction, desired_level)
        position, anchor_key = resolved if resolved else (None, None)

        params: dict[str, Any] = {
            "key": key,
            "keys": keys,
            "target_key": target_key,
            "instruction": instruction,
            "desired_level": desired_level,
            "position": position,
            "anchor_key": anchor_key,
            "applied": False,
            "applied_keys": [],
        }

        if not keys or position is None or anchor_key is None:
            return params

        # The veto is per node, so a drag of several rows can be allowed in part.
        # Whether that is sensible is the callback's business, not this method's.
        allowed = [candidate for candidate in keys if self._allows_move(candidate, anchor_key, position)]
        if not allowed:
            return params

        updated, moved = tree.apply_moves(self.source, allowed, anchor_key, position)
        if not moved:
            return params

        self.source = updated
        params["applied"] = True
        params["applied_keys"] = moved
        return params

    def _allows_move(self, key: str, anchor_key: str, position: str) -> bool:
        """Return whether ``move_callback`` permits this one node to move."""
        return not self._move_callback or bool(self._move_callback(key, anchor_key, position))

    def get_source(self) -> list[dict[str, Any]]:
        """Return a shallow copy of the current tree source data."""
        return list(self.source)

    def set_source(self, source: list[dict[str, Any]]) -> None:
        """Replace the tree source data."""
        self.source = source

    def clear(self) -> None:
        """Remove all nodes from the tree."""
        self.source = []
        self.expanded_keys = []
        self.selected_keys = []

    def add_node(
        self,
        node: dict[str, Any],
        parent_key: Optional[str] = None,
        index: Optional[int] = None,
    ) -> None:
        """Add a node to the tree.

        Args:
            node: Node dict with at least ``key`` and ``title``.
            parent_key: Key of the parent, or None to add at root level.
            index: Position among the siblings. None appends.
        """
        self.source = tree.insert_child(self.source, parent_key, node, index)

    def remove_node(self, key: str) -> bool:
        """Remove a node and its subtree.

        The removed keys are also dropped from ``expanded_keys`` and
        ``selected_keys``, so a deletion cannot leave a node selected that is no
        longer in the tree.

        Args:
            key: Key of the node to remove.

        Returns:
            True when the node existed and was removed.
        """
        stale = set(tree.subtree_keys(self.source, key))
        updated, removed = tree.remove_key(self.source, key)
        if removed is None:
            return False

        self.source = updated
        remaining_expanded = [k for k in self.expanded_keys if k not in stale]
        if remaining_expanded != list(self.expanded_keys):
            self.expanded_keys = remaining_expanded
        remaining_selected = [k for k in self.selected_keys if k not in stale]
        if remaining_selected != list(self.selected_keys):
            self.selected_keys = remaining_selected
        return True

    def move_node(self, key: str, anchor_key: str, position: str = "child") -> bool:
        """Move a node next to or under another node.

        Args:
            key: Key of the node to move.
            anchor_key: Key the node lands next to or inside.
            position: One of ``before``, ``after`` or ``child``.

        Returns:
            True when the tree changed. False when the move was rejected, which
            covers an unknown key, dropping a node onto itself and dropping a
            node into its own subtree.
        """
        updated = tree.apply_move(self.source, key, anchor_key, position)
        if updated is None:
            return False
        self.source = updated
        return True

    def move_nodes(self, keys: list[str], anchor_key: str, position: str = "child") -> list[str]:
        """Move several nodes to the same place, keeping their relative order.

        Args:
            keys: Keys of the nodes to move, in the order they should land.
            anchor_key: Key the nodes land next to or inside.
            position: One of ``before``, ``after`` or ``child``.

        Returns:
            The keys that actually moved. Empty when the batch was rejected,
            which covers an anchor inside one of the moved subtrees and an anchor
            that does not accept children.
        """
        updated, moved = tree.apply_moves(self.source, keys, anchor_key, position)
        if moved:
            self.source = updated
        return moved

    def update_node(self, key: str, values: dict[str, Any]) -> bool:
        """Merge field values into a node.

        ``key`` and ``children`` entries are ignored: changing them would
        invalidate the expanded and selected key sets. Use :meth:`move_node`,
        :meth:`add_node` and :meth:`remove_node` to reshape the tree.

        Args:
            key: Key of the node to update.
            values: Fields to merge, for example ``{"title": "New", "size": 12}``.

        Returns:
            True when the node existed.
        """
        updated = tree.update_node(self.source, key, values)
        if updated is None:
            return False
        self.source = updated
        return True

    def rename_node(self, key: str, title: str) -> bool:
        """Set the title of a node.

        Args:
            key: Key of the node to rename.
            title: New title.

        Returns:
            True when the node existed.
        """
        return self.update_node(key, {"title": title})

    def get_expanded(self) -> list[str]:
        """Return the keys of the currently expanded nodes."""
        return list(self.expanded_keys)

    def expand_node(self, key: str, expanded: bool = True) -> None:
        """Expand or collapse a single node.

        Args:
            key: Key of the node.
            expanded: True to expand, False to collapse.
        """
        keys = set(self.expanded_keys)
        if expanded:
            keys.add(key)
        else:
            keys.discard(key)
        self.expanded_keys = sorted(keys)

    def expand_all(self) -> None:
        """Expand every node that has children."""
        self.expanded_keys = tree.expandable_keys(self.source)

    def collapse_all(self) -> None:
        """Collapse every node."""
        self.expanded_keys = []

    def get_selected(self) -> list[str]:
        """Return the keys of the currently selected nodes.

        In ``hierarchy`` select mode a checked parent cascades to its children,
        so the returned list contains the descendants as well.
        """
        return list(self.selected_keys)

    def select_node(self, key: str, selected: bool = True) -> None:
        """Select or deselect a single node.

        This writes the key set directly and does not cascade. Cascading is a
        browser-side behaviour of ``select_mode="hierarchy"``.

        Args:
            key: Key of the node.
            selected: True to select, False to deselect.
        """
        keys = set(self.selected_keys)
        if selected:
            keys.add(key)
        else:
            keys.discard(key)
        self.selected_keys = sorted(keys)

    def clear_selection(self) -> None:
        """Deselect every node."""
        self.selected_keys = []
