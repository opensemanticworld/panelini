"""Entrypoint of the TanstackTable panel."""

from collections import deque
from collections.abc import Iterator
from contextlib import contextmanager
from copy import deepcopy
from pathlib import Path
from typing import Any, Callable, ClassVar, Optional
from uuid import uuid4
from weakref import WeakValueDictionary, ref

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent
from param.parameterized import batch_call_watchers  # type: ignore[import-untyped]

from . import tree
from .icons import DEFAULT_FILE_ICON, extension_of, icon_for

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"

#: Every live table by id, so a pane receiving a cross-pane drag can find the pane
#: the nodes came from and take them out of it in Python. The browser names the
#: source, it never carries the nodes: a browser that could hand Python a node
#: could hand it any node, and ``source`` has been Python's to write since P1.
#:
#: Weak, so a table that goes out of scope leaves nothing behind here.
_LIVE_TABLES: "WeakValueDictionary[str, TanstackTable]" = WeakValueDictionary()


class _Step:
    """One recorded tree state, and the other half of the gesture that made it.

    Most steps stand alone: a drop, a toolbar action or a call to
    :meth:`TanstackTable.add_node` changes one tree and is taken back by itself.
    A cross-pane transfer changes two, and the halves have to travel together.
    Stepping only the pane a node arrived in would take the node out of that tree
    without putting it back in the one it came from, so a single ``Ctrl+Z`` would
    destroy it.

    ``token`` is what makes the two halves recognisable to each other, and
    ``partner`` is a weak reference, so a history cannot keep a table alive.
    """

    __slots__ = ("partner", "token", "tree")

    def __init__(
        self,
        tree_state: list[dict[str, Any]],
        token: Optional[str] = None,
        partner: Optional["TanstackTable"] = None,
    ) -> None:
        self.tree = tree_state
        self.token = token
        self.partner = ref(partner) if partner is not None else None


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
            "Optional per node: icon, naming an entry of the icons param, allow_children=False "
            "to make the node a leaf nothing can be dropped into, class for a CSS class on the "
            "row, and type, naming an entry of the types param whose fields the node then takes "
            "for every one it does not set itself."
        ),
    )
    columns = param.List(
        default=[],
        doc=(
            "Column definitions for treegrid mode, as {id, header, field, width} dicts. Empty = "
            "tree-only mode. width is the column's starting width in pixels, 150 when it says "
            "nothing, and min_width and max_width bound what a resize may do to it, 20 and no limit "
            "by default. Optional per column: sortable=False to leave one column out of the sort "
            "while the rest stay in, and resizable=False to fix one column's width while the rest "
            "can still be dragged."
        ),
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
            "menu takes the same list and puts those actions in a context menu on the rows, opened "
            "by a right click or Shift+F10, never by the left button, which selects and drags, and "
            "it is absent by default so a table "
            "gets one only by asking. The two lists together are what a table may do, so an action "
            "offered in the menu alone still answers to its shortcut. toolbar_label, menu_label and "
            "search_label name the toolbar, the menu and the search box for assistive technology, "
            "and new_key_prefix names the keys minted for added nodes. file_icons is "
            "an extra {extension: icon name} mapping used when a file is added or renamed, and "
            "extension_warning=False drops the confirmation a rename that changes a file type "
            "otherwise asks for. transfer_group opts a table into cross-pane drag and drop: two "
            "tables naming the same group accept rows dragged from each other, a table naming none "
            "accepts nothing from outside itself, and holding Ctrl or Alt on the drop copies rather "
            "than moves. sortable=False takes the sort off a table that has columns, and "
            "sort_folders_first puts branches above leaves at every level whichever way a column "
            "is sorted. resizable=False takes the resize handles off the headers, leaving the "
            "columns at the widths they were given."
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
    types = param.Dict(
        default={},
        doc=(
            "Node type registry, as {type name: {field: value}}. A node carrying type='name' takes "
            "every field of that entry it does not set itself, so a tree of a thousand files "
            "declares icon and allow_children once rather than a thousand times. The node always "
            "wins, and key and children are never taken from a type. Any field may be given, not "
            "only icon, class and allow_children: a type can carry a column value just as well. "
            "Both sides resolve it as they read a node and neither writes it back, so source keeps "
            "the type name alone."
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

    # Bidirectional for the same reason filter_text is, and a view concern in the
    # same way: it reorders what is rendered and never source.
    sorting = param.List(
        default=[],
        doc=(
            "The sort, as a list of {id, desc} dicts naming a column. One entry at most: sorting on "
            "two keys inside every parent is a thing no file manager does and no screen reader can "
            "narrate, so the header cycles ascending, descending, then back to the tree's own "
            "order. Rows are sorted inside each parent and never across levels, and source keeps "
            "the order it has, so a drop made while sorted is still a move on the real tree. "
            "Reordering next to a sibling is refused while a sort is active, by drag and by the "
            "toolbar alike, because position inside a parent is computed there and the row would "
            "land back where the sort puts it."
        ),
    )

    # Bidirectional for the same reasons again. Written once as a resize drag ends,
    # never on the frames it is made of.
    column_widths = param.Dict(
        default={},
        doc=(
            "Column widths a resize has set, as {column_id: pixels}. Only the columns somebody "
            "actually sized are in here: the rest are at the width their column def asks for, so an "
            "empty map means nothing has been resized rather than that everything is at zero. "
            "Setting it from Python resizes those columns, and dropping a key puts one back to its "
            "declared width. The first column takes any space the others leave over."
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

    undo_depth = param.Integer(
        default=20,
        bounds=(0, None),
        doc=(
            "How many tree states to keep for undo. Every rewrite of source records the tree it "
            "replaced, whether it came from a drop, a toolbar action or a public method, so undo "
            "covers what an application did as well as what the user did. 0 turns the history off "
            "entirely. Lowering it keeps the most recent steps and drops the oldest."
        ),
    )

    # Python to JavaScript, like source: the browser asks for a step and does not
    # decide whether one is there to take. They drive the toolbar's disabled state.
    can_undo = param.Boolean(default=False, doc="Whether a tree state is recorded to step back to.")
    can_redo = param.Boolean(default=False, doc="Whether an undone tree state is there to step forward to.")

    # Python to JavaScript. Held here rather than in the browser for the same
    # reason source is: the keys have to mean something in the tree Python owns.
    clipboard = param.Dict(
        default={},
        doc=(
            "What cut or copy last put aside, as {keys, mode} with mode in cut | copy, and empty for "
            "nothing. Pasting a cut is a move and pasting a copy mints new keys for the whole "
            "subtree. The browser reads it to enable paste and to fade the rows waiting to be moved."
        ),
    )

    # Python to JavaScript, minted once per table and constant for its life. A
    # cross-pane drag carries it, so the pane a drop lands in can name the pane the
    # nodes came from and ask Python for them.
    _table_id = param.String(default="", doc="Identity of this table among the live ones.")

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
        types: Optional[dict[str, dict[str, Any]]] = None,
        filter_text: Optional[str] = None,
        editing_key: Optional[str] = None,
        expanded_keys: Optional[list[str]] = None,
        selected_keys: Optional[list[str]] = None,
        sorting: Optional[list[dict[str, Any]]] = None,
        column_widths: Optional[dict[str, float]] = None,
        undo_depth: Optional[int] = None,
        event_callback: Optional[Callable[[str, dict[str, Any]], None]] = None,
        move_callback: Optional[Callable[[str, str, str], bool]] = None,
        action_callback: Optional[Callable[[str, dict[str, Any]], bool]] = None,
        transfer_callback: Optional[Callable[[dict[str, Any]], bool]] = None,
        **params: Any,
    ) -> None:
        """Initialize the TanstackTable component.

        Args:
            source: Tree source data - list of node dicts.
            columns: Column definitions for treegrid mode.
            options: Display options.
            icons: Extra icons as name to inline SVG markup, merged over the
                bundled set and referenced by a node's ``icon``.
            types: Node type registry as ``{type name: {field: value}}``, giving
                every node that names a type the fields it does not set itself.
            filter_text: Search text. Hides every row that neither matches nor
                leads to a match.
            editing_key: Key of the node to open the inline title editor on.
            expanded_keys: Keys of nodes to show expanded.
            selected_keys: Keys of nodes to show selected.
            sorting: The sort to open with, as ``[{"id", "desc"}]``. One entry at
                most, and a view concern only: ``source`` keeps its own order.
            column_widths: Column widths to open with, as ``{column_id: pixels}``.
                Only the columns named are affected; the rest keep the width their
                column def asks for.
            undo_depth: How many tree states to keep for undo, 0 for none.
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
                delete | paste``, and returning False leaves ``source``
                untouched. Called once for the whole action rather than per node,
                because adding one node and deleting a batch are each a single
                decision. Moves keep going through ``move_callback``, and so does
                a paste of something cut, since that is a move. Undo and redo are
                not asked at all: they replay states this hook already allowed.
                A cross-pane ``transfer`` asks the table the nodes are leaving,
                not the one they arrive in, which decides through
                ``move_callback`` per node exactly as a drop does.
            transfer_callback: Escape hatch for a cross-pane drag whose partner is
                not another ``TanstackTable``. Receives the transfer payload on the
                receiving table, and returning True means the application handled
                it, so the panel does nothing further. Returning False, or leaving
                it unset, takes the ordinary path through the registry of live
                tables.
            **params: Additional parameters passed to AnyWidgetComponent.
        """
        super().__init__(**params)

        # Minted here rather than derived from anything a browser can see, and
        # registered so a pane receiving one of this table's rows can find it.
        self._table_id = f"tst-{uuid4().hex}"
        _LIVE_TABLES[self._table_id] = self

        # Named arguments exist so the signature documents itself, but each one is
        # a plain param underneath. Applying them in a loop rather than as a run of
        # `if` statements keeps adding the next one from growing the branch count.
        # None means "not given", which is why an explicit empty list still lands.
        for name, value in (
            ("source", source),
            ("columns", columns),
            ("options", options),
            ("icons", icons),
            ("types", types),
            ("filter_text", filter_text),
            ("editing_key", editing_key),
            ("expanded_keys", expanded_keys),
            ("selected_keys", selected_keys),
            ("sorting", sorting),
            ("column_widths", column_widths),
            ("undo_depth", undo_depth),
        ):
            if value is not None:
                setattr(self, name, value)

        # The tree handed in here is the starting point rather than a step, so both
        # stacks open empty and the first change is what becomes undoable.
        self._undo_stack: deque[_Step] = deque(maxlen=self.undo_depth)
        self._redo_stack: deque[_Step] = deque(maxlen=self.undo_depth)

        # How many :meth:`batch` blocks are open, and the tree the outermost one
        # started from. None means nothing in the batch has changed the tree yet,
        # which is what keeps an empty batch from recording a step.
        self._batch_depth = 0
        self._batch_start: Optional[list[dict[str, Any]]] = None

        self._event_callback = event_callback
        self._move_callback = move_callback
        self._action_callback = action_callback
        self._transfer_callback = transfer_callback

        self.param.watch(self._on_event_data_change, ["_event_data"])
        self.param.watch(self._on_undo_depth_change, ["undo_depth"])

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

    def _on_undo_depth_change(self, event: Any) -> None:
        """Resize both stacks, keeping the most recent steps.

        ``deque(iterable, maxlen=n)`` keeps the last ``n`` items, so shrinking the
        depth drops the oldest states rather than the ones a user is likeliest to
        want back.
        """
        self._undo_stack = deque(self._undo_stack, maxlen=event.new)
        self._redo_stack = deque(self._redo_stack, maxlen=event.new)
        self._sync_history()

    def handle_event(self, event_name: str, event_params: dict[str, Any]) -> None:
        """Handle a single event from the browser.

        ``move``, ``add``, ``rename``, ``delete``, ``cut``, ``copy``, ``paste``,
        ``transfer``, ``undo`` and ``redo`` are intercepted here: the browser only
        reports what the user asked for, and this is where that intent becomes a
        new tree. Every other event is forwarded untouched.

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
        elif event_name in ("cut", "copy"):
            event_params = self._apply_clipboard_intent(event_name, event_params)
        elif event_name == "paste":
            event_params = self._apply_paste_intent(event_params)
        elif event_name == "transfer":
            event_params = self._apply_transfer_intent(event_params)
        elif event_name in ("undo", "redo"):
            event_params = self._apply_history_intent(event_name)

        if self._event_callback:
            self._event_callback(event_name, event_params)

    def _commit_source(
        self,
        updated: list[dict[str, Any]],
        token: Optional[str] = None,
        partner: Optional["TanstackTable"] = None,
    ) -> None:
        """Replace ``source`` and record the tree it replaced as one undo step.

        Every rewrite funnels through here, so one drop, one toolbar action or one
        call to :meth:`add_node` is one step, and a batch delete that rewrites the
        tree once is one step rather than one per key.

        Redo is dropped, because a new change makes the states ahead of it a branch
        of a history nobody can reach any more. That is the rule every editor
        follows and the one users already expect.

        Inside a :meth:`batch` the step is held back rather than recorded: the tree
        the batch started from is kept once and every rewrite after it is an
        intermediate state nobody can reach, so a hundred calls are one step. The
        write itself still happens, so a method that reads ``source`` to work out
        the next tree sees the one the call before it left.

        Args:
            updated: The new tree.
            token: Names the gesture this step is half of, for a cross-pane
                transfer. Absent for every change that touches one tree only.
            partner: The other table that gesture changed.
        """
        if self._batch_depth:
            if self._batch_start is None:
                self._batch_start = self.get_source()
            self.source = updated
            return

        self._undo_stack.append(_Step(self.get_source(), token, partner))
        self._redo_stack.clear()
        self.source = updated
        self._sync_history()

    def _sync_history(self) -> None:
        """Publish whether a step is available in either direction.

        Each flag is written only when it turns over, so a run of changes with
        history already available is not also a run of param events.
        """
        can_undo = len(self._undo_stack) > 0
        if can_undo != self.can_undo:
            self.can_undo = can_undo
        can_redo = len(self._redo_stack) > 0
        if can_redo != self.can_redo:
            self.can_redo = can_redo

    def _close_batch(self) -> None:
        """Record everything a batch changed as the one step it is.

        The step carries no token, because a cross-pane transfer is refused inside
        a batch: it is one gesture over two histories, and collapsing one side of
        that pair into a single step while the other records one per transfer is
        what loses a node on undo.
        """
        if self._batch_start is None:
            return
        self._undo_stack.append(_Step(self._batch_start, None, None))
        self._redo_stack.clear()
        self._sync_history()

    def _refuse_in_batch(self, what: str) -> None:
        """Raise when ``what`` cannot be done with a batch open."""
        if self._batch_depth:
            msg = f"{what} cannot be done inside a batch"
            raise RuntimeError(msg)

    def _step_history(self, action: str, token: Optional[str] = None) -> bool:
        """Step the tree one recorded state back or forward.

        The two directions are one operation with the stacks swapped: whichever is
        stepped away from receives the tree being left, so undo and redo can be
        alternated indefinitely.

        A step recorded as half of a cross-pane transfer steps its partner with it,
        which is the whole reason a step carries a token: taking back the arrival
        alone would remove the node from the tree it landed in without putting it
        back in the one it came from, and the node would then exist nowhere. The
        partner is only stepped when the state waiting at the top of its own stack
        is the other half of this gesture. If the panes have diverged, because that
        pane was changed again afterwards, the halves part company and the node ends
        up in both trees rather than in neither, which is the failure a user can see
        and undo again.

        Args:
            action: ``undo`` or ``redo``.
            token: Set only when this call is the partner half of a step already
                under way, which both identifies the gesture and stops the pair
                from stepping each other back and forth.

        Returns:
            True when a state was there to step to.
        """
        taken, given = (
            (self._undo_stack, self._redo_stack) if action == "undo" else (self._redo_stack, self._undo_stack)
        )
        if not taken or (token is not None and taken[-1].token != token):
            return False

        step = taken.pop()
        partner = step.partner() if step.partner is not None else None
        given.append(_Step(self.get_source(), step.token, partner))
        self.source = step.tree
        # A restored tree need not contain everything the current one did: undoing an
        # add takes back a node that is very likely selected, and it may be the one
        # the editor is open on.
        present = {node.get(tree.KEY) for node in tree.iter_nodes(self.source)}
        stale = {
            key for key in (*self.expanded_keys, *self.selected_keys, self.editing_key) if key and key not in present
        }
        if stale:
            self._drop_stale_keys(stale)
        self._sync_history()
        if token is None and step.token and partner is not None:
            partner._step_history(action, step.token)
        return True

    def _apply_history_intent(self, action: str) -> dict[str, Any]:
        """Apply a browser undo or redo intent.

        ``action_callback`` is deliberately not asked. It answers whether a change
        to the tree may happen, and every recorded state is one it already allowed:
        a delete it vetoed was never applied, so there is nothing of it to take
        back. An application that wants no history at all sets ``undo_depth`` to 0
        or leaves the two actions out of ``options["toolbar"]``.

        Args:
            action: ``undo`` or ``redo``.

        Returns:
            The payload, carrying whether a step was taken and what is left in
            either direction afterwards.
        """
        applied = self._step_history(action)
        return {
            "action": action,
            "applied": applied,
            "can_undo": self.can_undo,
            "can_redo": self.can_redo,
        }

    def _resolve_placement(self, event_params: dict[str, Any]) -> tuple[Optional[str], Optional[str]]:
        """Return the ``(position, anchor_key)`` a payload asks for, against this tree.

        Two vocabularies arrive here. A drop speaks the pragmatic-drag-and-drop
        one in camelCase and its ``instruction`` is resolved against the tree; a
        toolbar action or an application call names its ``position`` and
        ``anchor_key`` outright. A blocked or unresolvable instruction resolves to
        nothing rather than falling back to whatever position happened to also be
        in the payload.

        The tree it resolves against is always this table's own, which is what
        makes it right for a cross-pane transfer too: the row a drop landed on is
        in the receiving tree even when the nodes are not.
        """
        instruction = event_params.get("instruction")
        if instruction:
            target_key = event_params.get("target_key", event_params.get("targetKey"))
            if not target_key:
                return None, None
            desired_level = event_params.get("desired_level", event_params.get("desiredLevel"))
            resolved = tree.resolve_instruction(self.source, target_key, instruction, desired_level)
            return resolved if resolved else (None, None)

        position = event_params.get("position")
        anchor_key = event_params.get("anchor_key", event_params.get("anchorKey"))
        if position not in tree.POSITIONS or not anchor_key:
            return None, None
        return position, anchor_key

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
        position, anchor_key = self._resolve_placement(event_params) if keys else (None, None)

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

        updated, moved = tree.apply_moves(self.source, allowed, anchor_key, position, self.types)
        if not moved:
            return params

        self._commit_source(updated)
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
            or (position == "child" and not tree.accepts_children(self.source, anchor_key, self.types))
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
            self._commit_source(tree.insert_child(self.source, anchor_key, node))
        else:
            self._commit_source(tree.insert_sibling(self.source, anchor_key, node))

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

        self._commit_source(updated)
        params["applied"] = True
        return params

    def _typed_icon(self, node: dict[str, Any], title: str, previous_title: str) -> Optional[str]:
        """Return the icon a file node should carry once it is called ``title``.

        Only an icon the panel itself would have derived is maintained: the
        generic one, or the one the previous name maps to. An icon an application
        picked by hand survives a rename, because naming an icon is a statement
        about the node rather than about the extension it happens to sit next to.

        A node's type counts as the node here. A type whose icon is the generic
        one is read the way a node carrying that icon is, so a typed file renamed
        to ``.py`` gains a python icon of its own, and a type naming a specific
        icon keeps it exactly as a hand-picked one does.

        Args:
            node: The node as it is now, before the rename is applied.
            title: The name the node is taking.
            previous_title: The name it is leaving, empty for a node being minted.

        Returns:
            The new icon name, or None to leave the node's icon exactly as it is.
        """
        resolved = tree.resolve_node(node, self.types)
        current = resolved.get(tree.ICON)
        if not isinstance(current, str) or resolved.get(tree.ALLOW_CHILDREN, True) is not False:
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

        self._commit_source(updated)
        self._drop_stale_keys(stale)
        params["applied"] = True
        params["applied_keys"] = removed
        return params

    def _set_clipboard(self, mode: str, keys: list[str]) -> None:
        """Hold ``keys`` for a paste, or empty the clipboard when none are left."""
        self.clipboard = {"keys": list(keys), "mode": mode} if keys else {}

    def _apply_clipboard_intent(self, action: str, event_params: dict[str, Any]) -> dict[str, Any]:
        """Put the nodes a browser cut or copy intent names aside.

        Nothing about the tree changes here, so neither veto hook is asked and
        nothing is recorded for undo. The decision belongs at the paste, which is
        where nodes actually move or come into being.

        The batch is pruned the way a delete's is: a folder taken together with one
        of its own files would otherwise arrive twice, once inside its parent and
        once beside it.

        Args:
            action: ``cut`` or ``copy``.
            event_params: Raw payload with ``keys``, or a single ``key``.

        Returns:
            The normalised payload, with ``applied_keys`` naming what is now held.
        """
        key = event_params.get("key")
        keys = event_params.get("keys") or ([key] if key else [])
        held = [
            candidate
            for candidate in tree.prune_redundant_keys(self.source, keys)
            if tree.find_node(self.source, candidate) is not None
        ]
        self._set_clipboard(action, held)
        return {
            "action": action,
            "key": key,
            "keys": keys,
            "applied": bool(held),
            "applied_keys": held,
        }

    def _apply_paste_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Place what cut or copy put aside and rewrite ``source``.

        Placement follows the rule an add follows: inside the anchor row when it
        takes children, next to it when it does not, and at root level when nothing
        is active.

        Which hook decides follows what the paste is. A cut paste is a move, so it
        answers to ``move_callback`` per node exactly as a drop does. A copy paste
        brings new nodes into being, so it answers to ``action_callback`` once,
        exactly as an add does. ``mode`` is in the payload either way, so a hook
        that wants to tell the two apart can.

        Args:
            event_params: Raw payload with ``anchor_key`` and ``position`` in
                ``after | child``.

        Returns:
            The normalised payload. ``applied_keys`` names the nodes now sitting at
            the paste site, which for a copy are the minted keys and not the ones
            that were copied.
        """
        anchor_key = event_params.get("anchor_key", event_params.get("anchorKey"))
        position = event_params.get("position")
        mode = str(self.clipboard.get("mode") or "")
        # A key that named a node when it was cut need not name one now: a delete,
        # an undo or an application call may have taken it out from under us.
        keys = [
            candidate
            for candidate in self.clipboard.get("keys") or []
            if tree.find_node(self.source, candidate) is not None
        ]

        params: dict[str, Any] = {
            "mode": mode,
            "keys": keys,
            "anchor_key": anchor_key,
            "position": position,
            "applied": False,
            "applied_keys": [],
        }

        if not keys or mode not in ("cut", "copy"):
            return params

        if anchor_key is None:
            position = "child"
        elif (
            position not in ("after", "child")
            or tree.find_node(self.source, anchor_key) is None
            or (position == "child" and not tree.accepts_children(self.source, anchor_key, self.types))
        ):
            return params
        params["position"] = position

        if mode == "cut":
            return self._paste_move(params, keys, anchor_key, position)
        return self._paste_copy(params, keys, anchor_key, position)

    def _paste_move(
        self,
        params: dict[str, Any],
        keys: list[str],
        anchor_key: Optional[str],
        position: Optional[str],
    ) -> dict[str, Any]:
        """Apply a cut paste as the move it is, then empty the clipboard.

        The clipboard is emptied only once the move lands, so a paste refused by
        ``move_callback`` leaves what was cut still cut and available to try
        somewhere else. That is what a file manager does with a refused move.
        """
        if anchor_key is None:
            anchor_key = self._root_anchor(keys)
            position = "after"
            if anchor_key is None:
                # Every root node is in the batch, which after pruning means every
                # node in the batch is already a root node. There is nowhere to go.
                return params

        allowed = [candidate for candidate in keys if self._allows_move(candidate, anchor_key, str(position))]
        if not allowed:
            return params

        updated, moved = tree.apply_moves(self.source, allowed, anchor_key, str(position), self.types)
        if not moved:
            return params

        self._commit_source(updated)
        self._set_clipboard("cut", [])
        params["applied"] = True
        params["applied_keys"] = moved
        return params

    def _paste_copy(
        self,
        params: dict[str, Any],
        keys: list[str],
        anchor_key: Optional[str],
        position: Optional[str],
    ) -> dict[str, Any]:
        """Apply a copy paste as new nodes, leaving the clipboard as it is.

        A copy survives its paste, so the same branch can be dropped into several
        places without copying it again, and the nodes it came from are untouched
        so the keys stay good.

        Each copy is re-keyed across its whole subtree against the tree as it stands
        at that point in the batch, so two copies of the same folder pasted side by
        side cannot collide.
        """
        if not self._allows_action("paste", params):
            return params

        prefix = self.options.get("new_key_prefix", "node")
        updated = self.source
        anchor, pos = anchor_key, position
        pasted: list[str] = []
        for key in keys:
            node = tree.find_node(updated, key)
            if node is None:
                continue
            fresh = tree.rekey_subtree(updated, node, prefix)
            fresh_key = str(fresh[tree.KEY])
            if anchor is None:
                updated = tree.insert_child(updated, None, fresh)
            elif pos == "child":
                updated = tree.insert_child(updated, anchor, fresh)
            else:
                updated = tree.insert_sibling(updated, anchor, fresh)
            pasted.append(fresh_key)
            # Each later copy lands after the previous one, so a batch arrives in
            # the order it was copied rather than reversed.
            anchor, pos = fresh_key, "after"

        if not pasted:
            return params

        self._commit_source(updated)
        params["applied"] = True
        params["applied_keys"] = pasted
        return params

    def _root_anchor(self, keys: list[str]) -> Optional[str]:
        """Return the last root node that is not itself in ``keys``.

        A move needs something to land next to where an insert does not, so a cut
        pasted at root level with nothing active anchors on the end of the tree. A
        node in the batch cannot be that anchor, since a move into itself is no
        move at all.
        """
        for node in reversed(self.source):
            key = node.get(tree.KEY)
            if key is not None and key not in keys:
                return str(key)
        return None

    def _transfer_group(self) -> str:
        """Return the cross-pane group this table is in, empty string for none."""
        return str(self.options.get("transfer_group") or "")

    def _transfer_source(self, source_id: Any) -> Optional["TanstackTable"]:
        """Return the live table a transfer names, when it may hand nodes to us.

        Both tables have to name the same non-empty group, so two unrelated tables
        on one page stay unrelated and a table that opted into nothing accepts
        nothing from outside itself.
        """
        group = self._transfer_group()
        if not group or not source_id:
            return None
        origin = _LIVE_TABLES.get(str(source_id))
        if origin is None or origin is self or origin._transfer_group() != group:
            return None
        return origin

    def _transfer_placement(self, event_params: dict[str, Any]) -> tuple[Optional[str], Optional[str]]:
        """Return where an arrival lands, or ``(None, None)`` when nowhere valid.

        A drop always names the row it landed on, so the anchor comes from the
        hitbox instruction. A call that names no anchor at all means root level,
        which is the only way to fill a pane that starts out empty.
        """
        if (
            not event_params.get("instruction")
            and event_params.get("anchor_key", event_params.get("anchorKey")) is None
        ):
            return "child", None

        position, anchor_key = self._resolve_placement(event_params)
        if position is None or anchor_key is None or tree.find_node(self.source, anchor_key) is None:
            return None, None
        if position == "child" and not tree.accepts_children(self.source, anchor_key, self.types):
            return None, None
        return position, anchor_key

    def _apply_transfer_intent(self, event_params: dict[str, Any]) -> dict[str, Any]:
        """Take nodes out of another table and put them in this one.

        The browser names the pane the drag came from and the keys it was
        carrying, never the nodes: a browser that could hand Python a node could
        hand it any node, and ``source`` has been Python's to write since P1. The
        nodes are read out of the other table here, in Python, which is also what
        makes the ordinary two pane case need no application code at all.

        Both vetoes are asked, each of the table it belongs to. The pane the nodes
        leave answers ``action_callback("transfer", params)`` once, because letting
        them go is one decision. The pane they arrive in answers ``move_callback``
        per node, exactly as it does for a drop that never left it, with an empty
        anchor standing for root level.

        Args:
            event_params: Raw payload with ``keys``, the ``source_id`` naming the
                pane they came from, a hitbox instruction or an explicit
                ``anchor_key`` and ``position``, and ``copy`` to duplicate rather
                than move.

        Returns:
            The normalised payload. ``applied_keys`` names the nodes now sitting
            in this tree, and ``handled`` records that ``transfer_callback`` took
            the transfer instead.

        Raises:
            RuntimeError: When either pane has a :meth:`batch` open. Both halves
                are checked before either tree is written.
        """
        self._refuse_in_batch("a transfer")
        key = event_params.get("key")
        keys = event_params.get("keys") or ([key] if key else [])
        source_id = event_params.get("source_id", event_params.get("sourceId"))
        copying = bool(event_params.get("copy"))
        position, anchor_key = self._transfer_placement(event_params)

        params: dict[str, Any] = {
            "keys": keys,
            "source_id": source_id,
            "target_id": self._table_id,
            "anchor_key": anchor_key,
            "position": position,
            "copy": copying,
            "handled": False,
            "applied": False,
            "applied_keys": [],
        }

        if not keys or position is None:
            return params

        # The escape hatch is asked first, because a partner that is not a
        # TanstackTable is not in the registry and never will be.
        if self._transfer_callback and self._transfer_callback(params):
            params["handled"] = True
            return params

        origin = self._transfer_source(source_id)
        if origin is None:
            return params
        origin._refuse_in_batch("a transfer")

        # Pruned the way a cut is: a folder taken together with one of its own
        # files would otherwise arrive twice, once inside its parent and once
        # beside it.
        held = [
            candidate
            for candidate in tree.prune_redundant_keys(origin.source, keys)
            if tree.find_node(origin.source, candidate) is not None
        ]
        if not held or not origin._allows_action("transfer", params):
            return params

        allowed = [candidate for candidate in held if self._allows_move(candidate, str(anchor_key or ""), position)]
        if not allowed:
            return params

        remaining, nodes = self._take_transfer(origin, allowed, copying)
        updated, arrived = self._receive_transfer(nodes, anchor_key, position)
        if not arrived:
            return params

        # Two trees, two histories, one gesture: each table records its own half
        # through the writer it already has, and the shared token is what makes the
        # halves recognise each other, so a step back in either pane takes the whole
        # transfer with it. Without it, undoing the arrival would take the node out
        # of this tree while the other has already let it go. The pane they leave
        # goes first, in the order the gesture happened.
        #
        # A copy pairs nothing, because it left the other tree untouched and there
        # is no half over there to take back.
        token = None if copying else uuid4().hex
        if not copying:
            stale = {sub for candidate in allowed for sub in tree.subtree_keys(origin.source, candidate)}
            origin._commit_source(remaining, token=token, partner=self)
            origin._drop_stale_keys(stale)
        self._commit_source(updated, token=token, partner=origin if token else None)
        params["applied"] = True
        params["applied_keys"] = arrived
        return params

    def _take_transfer(
        self,
        origin: "TanstackTable",
        keys: list[str],
        copying: bool,
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        """Return the origin's tree without ``keys``, and the nodes themselves.

        A copy leaves the origin exactly as it was, so nothing is removed and the
        tree that comes back is the one that went in.
        """
        remaining = origin.get_source()
        taken: list[dict[str, Any]] = []
        for key in keys:
            if copying:
                node = tree.find_node(remaining, key)
                if node is not None:
                    taken.append(deepcopy(node))
                continue
            remaining, node = tree.remove_key(remaining, key)
            if node is not None:
                taken.append(node)
        return remaining, taken

    def _receive_transfer(
        self,
        nodes: list[dict[str, Any]],
        anchor_key: Optional[str],
        position: str,
    ) -> tuple[list[dict[str, Any]], list[str]]:
        """Insert arriving nodes, re-keying only the ones this tree already holds.

        A key is kept where it can be, so the browser can follow a row it already
        knows by name, and re-keyed when this tree carries it: a node dragged out
        of a pane and dragged back later must not collide with whatever replaced
        it. That is the copy paste rule again.
        """
        prefix = self.options.get("new_key_prefix", "node")
        updated = self.get_source()
        anchor, pos = anchor_key, position
        arrived: list[str] = []
        for node in nodes:
            present = {found.get(tree.KEY) for found in tree.iter_nodes(updated)}
            incoming = {found.get(tree.KEY) for found in tree.iter_nodes([node])}
            payload = tree.rekey_subtree(updated, node, prefix) if present & incoming else node
            arrived_key = str(payload[tree.KEY])
            if anchor is None:
                updated = tree.insert_child(updated, None, payload)
            elif pos == "child":
                updated = tree.insert_child(updated, anchor, payload)
            else:
                updated = tree.insert_sibling(updated, anchor, payload, before=pos == "before")
            arrived.append(arrived_key)
            # Each later node lands after the previous one, so a batch arrives in
            # the order it was dragged rather than reversed.
            anchor, pos = arrived_key, "after"
        return updated, arrived

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
        # A cut node that has since been deleted cannot be pasted anywhere, and a
        # clipboard holding nothing else should stop offering the button.
        held = list(self.clipboard.get("keys") or [])
        remaining_held = [key for key in held if key not in stale]
        if remaining_held != held:
            self._set_clipboard(str(self.clipboard.get("mode") or ""), remaining_held)

    def get_source(self) -> list[dict[str, Any]]:
        """Return a shallow copy of the current tree source data."""
        return list(self.source)

    def set_source(self, source: list[dict[str, Any]]) -> None:
        """Replace the tree source data, forgetting the history and the clipboard.

        This is a new tree rather than a change to the current one, so the states
        recorded against the old one go with it: their keys need not mean anything
        here, and stepping back into one would restore a tree the application had
        already replaced. Anything cut or copied out of the old tree goes for the
        same reason. :meth:`clear` is the other thing, an edit of the tree in hand,
        so emptying it stays undoable.
        """
        self.source = source
        self.clear_history()
        self.clear_clipboard()

    def clear(self) -> None:
        """Remove all nodes from the tree."""
        self._commit_source([])
        self.expanded_keys = []
        self.selected_keys = []

    @contextmanager
    def batch(self) -> Iterator["TanstackTable"]:
        """Defer everything changed inside the block to one push and one step.

        Every mutation funnels through one writer, so a batch delete or a multi
        row drop is already one push and one undo step. Each *public* call is its
        own write, though, which is what makes a hundred :meth:`add_node` calls a
        hundred pushes of the whole tree. Inside this block they are one.

        The deferral sits next to the writer in Python rather than in the browser,
        which is what lets a block that raises leave the tree exactly as it was
        instead of half rewritten. A browser side deferred render cannot do that:
        by the time it is asked to redraw, the mutations have already happened.

        Nested blocks join the outer one and nothing is published until the
        outermost exits, so a helper that batches internally stays callable from
        inside a caller's batch. That is the only way batching composes across an
        application's own functions.

        A cross-pane transfer, an undo and a redo are refused with a block open.
        All three step a history rather than change a tree, and a batch is one
        step being built.

        Yields:
            The table, so ``with table.batch() as t:`` reads naturally.

        Raises:
            RuntimeError: Propagated from a refused call, or from the block
                itself. Either way the tree is put back before it leaves here.
        """
        if self._batch_depth:
            self._batch_depth += 1
            try:
                yield self
            finally:
                self._batch_depth -= 1
            return

        self._batch_depth = 1
        self._batch_start = None
        try:
            # param collapses the writes into one watcher call, so `source` and
            # every flag beside it cross to the browser once. It publishes what it
            # collected even when the block raises, which is why the rollback is
            # written back inside the block rather than after it.
            with batch_call_watchers(self):
                try:
                    yield self
                except BaseException:
                    if self._batch_start is not None:
                        self.source = self._batch_start
                    raise
                self._close_batch()
        finally:
            self._batch_depth = 0
            self._batch_start = None

    def undo(self) -> bool:
        """Step the tree back to the state before the last change.

        Returns:
            True when a state was there to step back to.

        Raises:
            RuntimeError: When a :meth:`batch` is open.
        """
        self._refuse_in_batch("an undo")
        return self._step_history("undo")

    def redo(self) -> bool:
        """Step the tree forward to the state the last undo left.

        Returns:
            True when a state was there to step forward to.

        Raises:
            RuntimeError: When a :meth:`batch` is open.
        """
        self._refuse_in_batch("a redo")
        return self._step_history("redo")

    def clear_history(self) -> None:
        """Forget every recorded tree state in both directions.

        A batch in flight is forgotten with them, so :meth:`set_source` inside one
        replaces the tree without leaving a step pointing at the tree it replaced.
        """
        self._undo_stack.clear()
        self._redo_stack.clear()
        self._batch_start = None
        self._sync_history()

    def get_clipboard(self) -> dict[str, Any]:
        """Return what cut or copy is holding, as ``{keys, mode}`` or empty."""
        return dict(self.clipboard)

    def cut_nodes(self, keys: list[str]) -> list[str]:
        """Hold nodes for a paste that moves them.

        Args:
            keys: Keys to hold. A key inside another one's subtree is dropped,
                since it would travel with its parent anyway.

        Returns:
            The keys actually held.
        """
        return self._apply_clipboard_intent("cut", {"keys": keys})["applied_keys"]

    def copy_nodes(self, keys: list[str]) -> list[str]:
        """Hold nodes for a paste that duplicates them.

        Args:
            keys: Keys to hold, pruned as :meth:`cut_nodes` prunes them.

        Returns:
            The keys actually held.
        """
        return self._apply_clipboard_intent("copy", {"keys": keys})["applied_keys"]

    def paste_nodes(self, anchor_key: Optional[str] = None, position: str = "child") -> list[str]:
        """Place what the clipboard is holding.

        Args:
            anchor_key: Key the nodes land next to or inside, or None for root
                level.
            position: ``child`` to land inside the anchor, ``after`` to land next
                to it.

        Returns:
            The keys now sitting at the paste site, which for a copy are the newly
            minted ones. Empty when nothing was pasted.
        """
        params = self._apply_paste_intent({"anchor_key": anchor_key, "position": position})
        return params["applied_keys"]

    def transfer_nodes(
        self,
        source: "TanstackTable",
        keys: list[str],
        anchor_key: Optional[str] = None,
        position: str = "child",
        copy: bool = False,
    ) -> list[str]:
        """Take nodes out of another table and put them in this one.

        Both tables have to name the same ``options["transfer_group"]``, which is
        the rule a cross-pane drag follows too: opting in is a decision an
        application makes once about a pair of tables rather than per call.

        Args:
            source: The table the nodes leave.
            keys: Keys in that table. A key inside another one's subtree is
                dropped, since it would travel with its parent anyway.
            anchor_key: Key in this table the nodes land next to or inside, or
                None for root level.
            position: ``child``, ``after`` or ``before``.
            copy: True to leave the nodes where they are and duplicate them here.

        Returns:
            The keys now sitting at the arrival site. They are the keys taken,
            unless this tree already held one, in which case that subtree arrives
            re-keyed. Empty when nothing was transferred.

        Raises:
            RuntimeError: When either table has a :meth:`batch` open.
        """
        params = self._apply_transfer_intent({
            "keys": keys,
            "source_id": source._table_id,
            "anchor_key": anchor_key,
            "position": position,
            "copy": copy,
        })
        return params["applied_keys"]

    def clear_clipboard(self) -> None:
        """Forget what cut or copy is holding."""
        if self.clipboard:
            self.clipboard = {}

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
        self._commit_source(tree.insert_child(self.source, parent_key, node, index))

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

        self._commit_source(updated)
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
        updated = tree.apply_move(self.source, key, anchor_key, position, self.types)
        if updated is None:
            return False
        self._commit_source(updated)
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
        updated, moved = tree.apply_moves(self.source, keys, anchor_key, position, self.types)
        if moved:
            self._commit_source(updated)
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
        self._commit_source(updated)
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

    def get_sort(self) -> Optional[dict[str, Any]]:
        """Return the current sort as ``{"id", "desc"}``, or None for none."""
        return dict(self.sorting[0]) if self.sorting else None

    def sort_by(self, column_id: str, desc: bool = False) -> None:
        """Sort the view by one column.

        Sorting is a view concern, exactly as the search box is: rows are
        reordered inside each parent and never across levels, and ``source``
        keeps the order it has. Nothing is recorded for undo, because nothing
        about the tree changed.

        Args:
            column_id: Id of the column to sort by. A column that named
                ``sortable=False``, or a table whose options turned sorting off,
                ignores this in the browser.
            desc: True to sort descending.
        """
        self.sorting = [{"id": column_id, "desc": bool(desc)}]

    def clear_sort(self) -> None:
        """Drop the sort and show the tree in the order ``source`` holds it."""
        self.sorting = []

    def get_column_widths(self) -> dict[str, float]:
        """Return the widths a resize has set, as ``{column_id: pixels}``.

        Only the columns somebody actually sized are in the map. A column that is
        not in it is at the width its column def asks for, which is what
        :meth:`reset_column_width` puts one back to.
        """
        return dict(self.column_widths)

    def set_column_width(self, column_id: str, width: float) -> None:
        """Set one column's width in pixels.

        Sizing is a view concern like the sort: nothing about the tree changes, so
        nothing is recorded for undo. The width is clamped in the browser to the
        column's own ``min_width`` and ``max_width``.

        Args:
            column_id: Id of the column to size.
            width: Width in pixels.
        """
        self.column_widths = {**self.column_widths, column_id: width}

    def reset_column_width(self, column_id: str) -> None:
        """Put one column back to the width its column def asks for."""
        if column_id not in self.column_widths:
            return
        self.column_widths = {key: value for key, value in self.column_widths.items() if key != column_id}

    def clear_column_widths(self) -> None:
        """Put every column back to the width its column def asks for."""
        self.column_widths = {}

    def get_types(self) -> dict[str, dict[str, Any]]:
        """Return the node type registry, as ``{type name: {field: value}}``."""
        return deepcopy(self.types)

    def set_type(self, name: str, fields: dict[str, Any]) -> None:
        """Declare one node type, replacing any entry of that name.

        Nothing in ``source`` is rewritten: a type is read wherever a field is
        read, so declaring one changes every node already carrying that name.

        Args:
            name: Type name, which nodes reference through their ``type`` field.
            fields: Fields a node of this type takes when it does not set them
                itself. ``key`` and ``children`` are ignored.
        """
        self.types = {**self.types, name: dict(fields)}

    def remove_type(self, name: str) -> None:
        """Drop one type. Nodes naming it fall back to their own fields alone."""
        if name not in self.types:
            return
        self.types = {key: value for key, value in self.types.items() if key != name}

    def resolve_node(self, key: str) -> Optional[dict[str, Any]]:
        """Return a node as the panel reads it, with its type's fields filled in.

        This is the node the drop guards and the browser both see, so it is the
        way to ask what a node actually allows rather than what it says.

        Args:
            key: Key of the node to read.

        Returns:
            A copy carrying the node's own fields over its type's, or None when
            no node has that key.
        """
        node = tree.find_node(self.source, key)
        return None if node is None else deepcopy(tree.resolve_node(node, self.types))
