"""Entrypoint of the TanstackTable panel."""

from pathlib import Path
from typing import Any, Callable, ClassVar, Optional

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

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
        doc="Tree source data - list of node dicts with key, title, children, plus column fields.",
    )
    columns = param.List(
        default=[],
        doc="Column definitions for treegrid mode. Empty = tree-only mode.",
    )
    options = param.Dict(
        default={},
        doc="Display options: indent_px, aria_label, expand_all, select_mode, enable_dnd.",
    )

    # Bidirectional, but safe: a sorted key set, so an echo is value-equal and stops.
    expanded_keys = param.List(
        default=[],
        doc="Keys of the currently expanded nodes.",
    )

    # JavaScript to Python. Carries intent, never a mutated tree.
    _event_data = param.Dict(default={}, doc="Event data from JavaScript")

    def __init__(
        self,
        source: Optional[list[dict[str, Any]]] = None,
        columns: Optional[list[dict[str, Any]]] = None,
        options: Optional[dict[str, Any]] = None,
        expanded_keys: Optional[list[str]] = None,
        event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        **params: Any,
    ) -> None:
        """Initialize the TanstackTable component.

        Args:
            source: Tree source data - list of node dicts.
            columns: Column definitions for treegrid mode.
            options: Display options.
            expanded_keys: Keys of nodes to show expanded.
            event_callback: Callback for events emitted by the browser. Receives
                ``(event_name, event_params)``.
            **params: Additional parameters passed to AnyWidgetComponent.
        """
        super().__init__(**params)

        if source is not None:
            self.source = source
        if columns is not None:
            self.columns = columns
        if options is not None:
            self.options = options
        if expanded_keys is not None:
            self.expanded_keys = expanded_keys

        self._event_callback = event_callback

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

        Later phases intercept ``move`` here to rewrite ``source`` before the
        callback runs. In P1 every event is forwarded untouched.

        Args:
            event_name: Name of the event, for example ``activate``.
            event_params: Event payload, always containing at least ``key``.
        """
        if self._event_callback:
            self._event_callback(event_name, event_params)

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

    def collapse_all(self) -> None:
        """Collapse every node."""
        self.expanded_keys = []
