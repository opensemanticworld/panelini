"""Entrypoint of the TanstackTable panel."""

from pathlib import Path
from typing import Any, Callable, ClassVar, Optional

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

from . import tree
from .icons import DEFAULT_FILE_ICON, extension_of, icon_for

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
        doc=(
            "Display options: indent_px, aria_label, expand_all, enable_dnd, select_mode in "
            "none | single | multi | hierarchy, and show_checkboxes to hide the checkbox column "
            "without giving up selection, which stays reachable by click, Ctrl click, Shift click "
            "and the space key. Clicking never cascades: selecting a folder selects the folder "
            "alone, and selecting every file in one leaves the folder out. Only the checkbox "
            "cascades, and only under hierarchy, where ticking a folder ticks its whole subtree "
            "and a folder reads as ticked once all of its children are. toggle_on_click lets a "
            "plain click on the only selected row clear the selection. toolbar is an ordered list "
            "of action ids, True for the default set and absent for no toolbar at all, and it "
            "governs the keyboard shortcuts as well as the buttons. An entry may also be a dict "
            "{id, label, icon, node} that renames one action, gives it another bundled icon and "
            "sets the template a new node is minted from, so one table can offer several kinds. "
            "toolbar_label and search_label name the toolbar and its search box for assistive "
            "technology, and new_key_prefix names the keys minted for added nodes. file_icons is "
            "an extra {extension: icon name} mapping used when a file is added or renamed, and "
            "extension_warning=False drops the confirmation a rename that changes a file type "
            "otherwise asks for."
        ),
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

    # Bidirectional, and safe for the same reason the key sets below are: the
    # toolbar's search box is the only writer and a scalar echo is value-equal.
    filter_text = param.String(
        default="",
        doc=(
            "Search text. Rows whose cell values all miss it are hidden, and the ancestors of a "
            "match are kept so the path to it stays visible. Filtering is a view concern: source "
            "is untouched, so a move made while a filter is active is still a move on the whole "
            "tree. Written from the browser when the toolbar carries the search action."
        ),
    )

    # Bidirectional for the same reason filter_text is. Python may open the editor
    # by writing a key, and the browser writes back "" when it closes.
    editing_key = param.String(
        default="",
        doc=(
            "Key of the node whose title is in the inline editor, empty for none. Setting it opens "
            "the editor on that row, which is how an application can start a rename of its own. The "
            "browser clears it when the editor commits or is cancelled."
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

    # Highest sequence number already dispatched. The browser sends a bounded tail of
    # recent events rather than one, because two writes to this one param inside a
    # single animation frame arrive as the second one only, and one gesture can
    # produce two intents. Everything at or below this has been handled.
    _last_sequence = 0

    def __init__(
        self,
        source: Optional[list[dict[str, Any]]] = None,
        columns: Optional[list[dict[str, Any]]] = None,
        options: Optional[dict[str, Any]] = None,
        icons: Optional[dict[str, str]] = None,
        filter_text: Optional[str] = None,
        editing_key: Optional[str] = None,
        expanded_keys: Optional[list[str]] = None,
        selected_keys: Optional[list[str]] = None,
        event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        move_callback: Optional[Callable[[str, str, str], bool]] = None,
        action_callback: Optional[Callable[[str, dict[str, Any]], bool]] = None,
        **params: Any,
    ) -> None:
        """Initialize the TanstackTable component.

        Args:
            source: Tree source data - list of node dicts.
            columns: Column definitions for treegrid mode.
            options: Display options.
            icons: Extra icons as name to inline SVG markup, merged over the
                bundled set and referenced by a node's ``icon``.
            filter_text: Search text. Hides every row that neither matches nor
                leads to a match.
            editing_key: Key of the node to open the inline title editor on.
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
            action_callback: Veto hook for the toolbar's structural actions.
                Receives ``(action, params)`` with action in ``add | rename |
                delete``,
                and returning False leaves ``source`` untouched. Called once for
                the whole action rather than per node, because adding one node
                and deleting a batch are each a single decision. Moves keep
                going through ``move_callback``.
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
        if filter_text is not None:
            self.filter_text = filter_text
        if editing_key is not None:
            self.editing_key = editing_key
        if expanded_keys is not None:
            self.expanded_keys = expanded_keys
        if selected_keys is not None:
            self.selected_keys = selected_keys

        self._event_callback = event_callback
        self._move_callback = move_callback
        self._action_callback = action_callback

        self.param.watch(self._on_event_data_change, ["_event_data"])

    def _on_event_data_change(self, event: Any) -> None:
        """Dispatch event data coming from JavaScript.

        The payload is a list of recent events with sequence numbers, re-sent until
        they are known to have arrived, so anything already dispatched is skipped
        here. A payload naming a single event is accepted too, which is the shape a
        test or another front end is likeliest to write by hand.
        """
        event_data = event.new
        if not event_data:
            return

        events = event_data.get("events")
        if events is None:
            event_name = event_data.get("event_name")
            if event_name:
                self.handle_event(event_name, event_data.get("event_params", {}))
            return

        for item in events:
            sequence = item.get("seq", 0)
            if sequence <= self._last_sequence:
                continue
            self._last_sequence = sequence
            event_name = item.get("event_name")
            if event_name:
                self.handle_event(event_name, item.get("event_params", {}))

    def handle_event(self, event_name: str, event_params: dict[str, Any]) -> None:
        """Handle a single event from the browser.

        ``move``, ``add``, ``rename`` and ``delete`` are intercepted here: the
        browser only reports what the user asked for, and this is where that intent
        becomes a new tree. Every other event is forwarded untouched.

        Args:
            event_name: Name of the event, for example ``activate``.
            event_params: Event payload, always containing at least ``key``.
        """
        if event_name == "move":
            event_params = self._apply_move_intent(event_params)
        elif event_name == "add":
            event_params = self._apply_add_intent(event_params)
        elif event_name == "rename":
            event_params = self._apply_rename_intent(event_params)
        elif event_name == "delete":
            event_params = self._apply_delete_intent(event_params)

        if self._event_callback:
            self._event_callback(event_name, event_params)

    def _apply_move_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Resolve a browser move intent and rewrite ``source``.

        Two paths arrive here and both end as one move. A drop speaks the
        pragmatic-drag-and-drop vocabulary in camelCase, and its ``instruction``
        is resolved against the tree. A toolbar action names its ``position`` and
        ``anchor_key`` outright, because reorder, indent and outdent already know
        where the node is going. Either way the callbacks see the same normalised
        snake_case payload, and the same ``move_callback`` gets its veto.

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
        position = event_params.get("position")
        anchor_key = event_params.get("anchor_key", event_params.get("anchorKey"))

        if instruction:
            # A blocked or unresolvable instruction must not fall back to whatever
            # position happened to be in the payload.
            resolved = None
            if keys and target_key:
                resolved = tree.resolve_instruction(self.source, target_key, instruction, desired_level)
            position, anchor_key = resolved if resolved else (None, None)
        elif position not in tree.POSITIONS or not anchor_key:
            position, anchor_key = None, None

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

    def _apply_add_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Mint a node from a browser add intent and rewrite ``source``.

        The browser decides *where*, following the rule an explorer does: inside
        the active row when it accepts children, next to it when it does not, and
        at root level when nothing is active. It never decides *what the node is
        called*, because a key has to be unique across a tree only Python holds.

        Args:
            event_params: Raw payload with ``anchor_key``, ``position`` in
                ``after | child``, and a ``node`` template to merge.

        Returns:
            The normalised payload. ``key`` carries the minted key and ``node``
            the inserted node, both None when nothing was added.
        """
        anchor_key = event_params.get("anchor_key", event_params.get("anchorKey"))
        position = event_params.get("position")
        template = {name: value for name, value in (event_params.get("node") or {}).items() if name != tree.KEY}

        params: dict[str, Any] = {
            "anchor_key": anchor_key,
            "position": position,
            "key": None,
            "node": None,
            "applied": False,
        }

        if anchor_key is None:
            position = None
        elif (
            position not in ("after", "child")
            or tree.find_node(self.source, anchor_key) is None
            or (position == "child" and not tree.accepts_children(self.source, anchor_key))
        ):
            return params

        key = tree.new_key(self.source, self.options.get("new_key_prefix", "node"))
        # The template wins over the default title but never over the key: a
        # browser that could name keys could collide with the tree it cannot see.
        node = {"title": "New node", **template, tree.KEY: key}
        # A template that names a file type in its title gets the icon for it
        # rather than the generic sheet of paper. There is no previous name to
        # compare against, so only the generic icon is treated as the panel's to
        # maintain and anything else the template picked is kept.
        icon = self._typed_icon(node, str(node.get("title") or ""), "")
        if icon is not None:
            node[tree.ICON] = icon

        params["position"] = position
        params["key"] = key
        params["node"] = node
        if not self._allows_action("add", params):
            params["key"] = None
            params["node"] = None
            return params

        if anchor_key is None or position == "child":
            self.source = tree.insert_child(self.source, anchor_key, node)
        else:
            self.source = tree.insert_sibling(self.source, anchor_key, node)

        params["applied"] = True
        return params

    def _apply_rename_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Retitle the node a browser rename intent names and rewrite ``source``.

        A blank title is a cancel rather than a blank rename: an editor emptied and
        committed by accident would otherwise leave a row with nothing to click on
        and no way to name it again. Surrounding whitespace goes the same way it
        does in a file manager, silently.

        A file that gains, loses or swaps its extension takes the matching icon
        with it, so what the row shows is what the name now says it is.

        Args:
            event_params: Raw payload with ``key`` and the new ``title``.

        Returns:
            The normalised payload, with ``title`` stripped, ``previous_title``
            naming what the node was called, and ``extension_changed`` telling an
            application that a file just changed type.
        """
        key = event_params.get("key")
        title = str(event_params.get("title") or "").strip()
        node = tree.find_node(self.source, key) if key else None
        previous = str(node.get("title") or "") if node else None

        params: dict[str, Any] = {
            "key": key,
            "title": title,
            "previous_title": previous,
            "extension_changed": False,
            "applied": False,
        }

        if node is None or not title or title == previous:
            return params

        # Only a file has a type to lose. A folder called `notes.md` is still a
        # folder, so renaming it is never a change of type.
        if node.get(tree.ALLOW_CHILDREN, True) is False:
            params["extension_changed"] = extension_of(title) != extension_of(str(previous))
        if not self._allows_action("rename", params):
            return params

        changes: dict[str, Any] = {"title": title}
        icon = self._typed_icon(node, title, str(previous))
        if icon is not None:
            changes[tree.ICON] = icon

        updated = tree.update_node(self.source, str(key), changes)
        if updated is None:
            return params

        self.source = updated
        params["applied"] = True
        return params

    def _typed_icon(self, node: dict[str, Any], title: str, previous_title: str) -> Optional[str]:
        """Return the icon a file node should carry once it is called ``title``.

        Only an icon the panel itself would have derived is maintained: the
        generic one, or the one the previous name maps to. An icon an application
        picked by hand survives a rename, because naming an icon is a statement
        about the node rather than about the extension it happens to sit next to.

        Args:
            node: The node as it is now, before the rename is applied.
            title: The name the node is taking.
            previous_title: The name it is leaving, empty for a node being minted.

        Returns:
            The new icon name, or None to leave the node's icon exactly as it is.
        """
        current = node.get(tree.ICON)
        if not isinstance(current, str) or node.get(tree.ALLOW_CHILDREN, True) is not False:
            return None
        extra = self.options.get("file_icons")
        if current not in (DEFAULT_FILE_ICON, icon_for(previous_title, extra)):
            return None
        derived = icon_for(title, extra)
        return derived if derived != current else None

    def _apply_delete_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Remove the nodes a browser delete intent names and rewrite ``source``.

        The batch is pruned first, so selecting a folder and something inside it
        removes the folder once rather than trying to remove a node that has
        already travelled with its parent. The whole batch is one decision for
        ``action_callback``: a half applied delete is not a state anyone asked for.

        Args:
            event_params: Raw payload with ``keys``, or a single ``key``.

        Returns:
            The normalised payload, with ``applied_keys`` naming the roots that
            were actually removed.
        """
        key = event_params.get("key")
        keys = event_params.get("keys") or ([key] if key else [])

        params: dict[str, Any] = {
            "key": key,
            "keys": keys,
            "applied": False,
            "applied_keys": [],
        }

        ordered = [
            candidate
            for candidate in tree.prune_redundant_keys(self.source, keys)
            if tree.find_node(self.source, candidate) is not None
        ]
        if not ordered or not self._allows_action("delete", params):
            return params

        # One rewrite for the batch rather than one per key, so a multi row delete
        # is a single push to the browser instead of a visible cascade.
        updated = self.source
        stale: set[str] = set()
        removed: list[str] = []
        for candidate in ordered:
            stale.update(tree.subtree_keys(updated, candidate))
            updated, node = tree.remove_key(updated, candidate)
            if node is not None:
                removed.append(candidate)

        if not removed:
            return params

        self.source = updated
        self._drop_stale_keys(stale)
        params["applied"] = True
        params["applied_keys"] = removed
        return params

    def _allows_move(self, key: str, anchor_key: str, position: str) -> bool:
        """Return whether ``move_callback`` permits this one node to move."""
        return not self._move_callback or bool(self._move_callback(key, anchor_key, position))

    def _allows_action(self, action: str, params: dict[str, Any]) -> bool:
        """Return whether ``action_callback`` permits this whole action."""
        return not self._action_callback or bool(self._action_callback(action, params))

    def _drop_stale_keys(self, stale: set[str]) -> None:
        """Drop removed keys from the expanded, selected and editing state.

        Each is rewritten only when it actually changes, so removing a node nobody
        had expanded or selected stays a single param event.
        """
        remaining_expanded = [key for key in self.expanded_keys if key not in stale]
        if remaining_expanded != list(self.expanded_keys):
            self.expanded_keys = remaining_expanded
        remaining_selected = [key for key in self.selected_keys if key not in stale]
        if remaining_selected != list(self.selected_keys):
            self.selected_keys = remaining_selected
        # An editor left open on a node that no longer exists would commit a
        # rename against nothing when it closed.
        if self.editing_key in stale:
            self.editing_key = ""

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
        self._drop_stale_keys(stale)
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

        The list is exactly what was picked, with no branch folded in or out:
        ticking a folder's checkbox in ``hierarchy`` mode adds the folder and its
        descendants, while clicking rows adds only the rows clicked, even when
        that happens to be every child of one folder.
        """
        return list(self.selected_keys)

    def select_node(self, key: str, selected: bool = True) -> None:
        """Select or deselect a single node.

        This writes the key set directly and does not cascade. Cascading belongs
        to the checkbox in ``select_mode="hierarchy"`` and stays in the browser.

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
