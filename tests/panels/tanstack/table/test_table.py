"""Tests for the TanstackTable bridge and its public Python API.

The browser never mutates the tree: it emits a move intent and Python decides
the resulting shape. That makes the whole drag and drop contract testable here,
without a browser, by feeding ``handle_event`` the payload the JS layer sends.
"""

import copy

import pytest

from panelini.panels.tanstack.table import TanstackTable, tree


def shape(nodes):
    """Render a tree compactly, for example ``a(b(b1,b2),e),d(d1)``."""
    return ",".join(node["key"] + (f"({shape(node['children'])})" if node.get("children") else "") for node in nodes)


def title_of(table, key):
    """Title of a node, asserting it is still there so the type stays narrow."""
    node = tree.find_node(table.source, key)
    assert node is not None
    return node["title"]


SOURCE = [
    {
        "key": "a",
        "title": "A",
        "children": [
            {
                "key": "b",
                "title": "B",
                "children": [
                    {"key": "b1", "title": "B1"},
                    {"key": "b2", "title": "B2"},
                ],
            },
            {"key": "e", "title": "E"},
        ],
    },
    {"key": "d", "title": "D", "children": [{"key": "d1", "title": "D1"}]},
]


@pytest.fixture
def source():
    """A fresh copy of the sample tree per test."""
    return copy.deepcopy(SOURCE)


@pytest.fixture
def events():
    """Recorder wired into ``event_callback``."""
    return []


@pytest.fixture
def table(source, events):
    return TanstackTable(
        source=source,
        event_callback=lambda name, params: events.append((name, params)),
    )


# --- construction and parameters ---------------------------------------------


def test_creation():
    assert isinstance(TanstackTable(), TanstackTable)


def test_defaults_are_empty():
    table = TanstackTable()
    assert table.source == []
    assert table.columns == []
    assert table.options == {}
    assert table.filter_text == ""
    assert table.editing_key == ""
    assert table.expanded_keys == []
    assert table.selected_keys == []


def test_init_arguments_land_on_the_params(source):
    columns = [{"id": "title", "header": "Name"}, {"id": "size", "header": "Size", "width": 80}]
    options = {"select_mode": "hierarchy", "indent_px": 20}
    table = TanstackTable(
        source=source,
        columns=columns,
        options=options,
        filter_text="note",
        editing_key="b",
        expanded_keys=["a"],
        selected_keys=["b1"],
    )

    assert table.source == source
    assert table.columns == columns
    assert table.options == options
    assert table.filter_text == "note"
    assert table.editing_key == "b"
    assert table.expanded_keys == ["a"]
    assert table.selected_keys == ["b1"]


def test_bundled_assets_are_loaded():
    """The panel ships its own ESM and CSS, so neither may be empty."""
    assert "aria-level" in TanstackTable._esm
    assert TanstackTable._stylesheets[0].strip()


# --- event dispatch -----------------------------------------------------------


def test_event_callback_receives_forwarded_events(table, events):
    table.handle_event("activate", {"key": "b1"})
    assert events == [("activate", {"key": "b1"})]


def test_event_data_param_dispatches_to_the_callback(table, events):
    """The path Panel actually uses: JS writes ``_event_data``, param watches."""
    table._event_data = {"event_name": "activate", "event_params": {"key": "e"}}
    assert events == [("activate", {"key": "e"})]


def test_event_data_dispatches_a_batch_in_order(table, events):
    """One gesture can carry two intents, so the payload is a list, not an event."""
    table._event_data = {
        "events": [
            {"seq": 1, "event_name": "rename", "event_params": {"key": "e", "title": "Renamed"}},
            {"seq": 2, "event_name": "activate", "event_params": {"key": "b1"}},
        ]
    }

    assert [name for name, _ in events] == ["rename", "activate"]
    assert title_of(table, "e") == "Renamed"


def test_event_data_skips_what_it_has_already_handled(table, events):
    """The tail is re-sent until it is known to have arrived, so it repeats."""
    table._event_data = {"events": [{"seq": 1, "event_name": "activate", "event_params": {"key": "e"}}]}
    table._event_data = {
        "events": [
            {"seq": 1, "event_name": "activate", "event_params": {"key": "e"}},
            {"seq": 2, "event_name": "activate", "event_params": {"key": "d"}},
        ]
    }

    assert events == [("activate", {"key": "e"}), ("activate", {"key": "d"})]


def test_empty_event_data_is_ignored(table, events):
    table._event_data = {}
    table._event_data = {"event_params": {"key": "e"}}
    table._event_data = {"events": []}
    table._event_data = {"events": [{"seq": 9, "event_params": {"key": "e"}}]}
    assert events == []


def test_no_callback_is_not_an_error(source):
    TanstackTable(source=source).handle_event("activate", {"key": "b1"})


# --- move intent --------------------------------------------------------------


def test_move_intent_rewrites_the_source(table):
    table.handle_event("move", {"key": "d", "targetKey": "b1", "instruction": "make-child"})
    assert shape(table.source) == "a(b(b1(d(d1)),b2),e)"


def test_move_intent_reports_the_normalised_payload(table, events):
    table.handle_event("move", {"key": "d", "targetKey": "b", "instruction": "reorder-above"})

    name, params = events[0]
    assert name == "move"
    assert params["key"] == "d"
    assert params["target_key"] == "b"
    assert params["instruction"] == "reorder-above"
    assert params["position"] == "before"
    assert params["anchor_key"] == "b"
    assert params["applied"] is True


def test_move_intent_accepts_snake_case(table):
    """Python callers can drive the same entrypoint without camelCase."""
    table.handle_event("move", {"key": "d", "target_key": "b1", "instruction": "make-child"})
    assert shape(table.source) == "a(b(b1(d(d1)),b2),e)"


def test_reparent_intent_resolves_the_desired_level(table):
    table.handle_event(
        "move",
        {"key": "d", "targetKey": "b2", "instruction": "reparent", "desiredLevel": 1},
    )
    assert shape(table.source) == "a(b(b1,b2),d(d1),e)"


@pytest.mark.parametrize(
    "params",
    [
        {"key": "d", "targetKey": "b1", "instruction": "instruction-blocked"},
        {"key": "d", "targetKey": "b1"},
        {"targetKey": "b1", "instruction": "make-child"},
        {"key": "d", "instruction": "make-child"},
        {},
    ],
)
def test_incomplete_or_blocked_intents_leave_the_source_alone(table, events, params):
    table.handle_event("move", params)

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


def test_descendant_move_intent_is_rejected(table, events):
    """Dropping a branch into itself would detach it from the tree."""
    table.handle_event("move", {"key": "a", "targetKey": "b1", "instruction": "make-child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["position"] == "child"
    assert events[0][1]["applied"] is False


def test_no_op_move_intent_is_reported_as_not_applied(table, events):
    """e already sits after b, so the drop resolves but changes nothing."""
    table.handle_event("move", {"key": "e", "targetKey": "b", "instruction": "reorder-below"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


# --- toolbar move intent ------------------------------------------------------
#
# Reorder, indent and outdent already know where the node is going, so they name a
# position and an anchor outright instead of a hitbox instruction. It is the same
# event and the same veto, only the resolution step is skipped.


def test_explicit_position_move_intent_rewrites_the_source(table):
    table.handle_event("move", {"key": "e", "keys": ["e"], "position": "before", "anchorKey": "b"})
    assert shape(table.source) == "a(e,b(b1,b2)),d(d1)"


def test_explicit_position_move_intent_accepts_snake_case(table):
    table.handle_event("move", {"key": "b1", "keys": ["b1"], "position": "after", "anchor_key": "a"})
    assert shape(table.source) == "a(b(b2),e),b1,d(d1)"


def test_explicit_position_move_intent_reports_the_normalised_payload(table, events):
    table.handle_event("move", {"key": "b", "keys": ["b"], "position": "after", "anchorKey": "a"})

    name, params = events[0]
    assert name == "move"
    assert params["position"] == "after"
    assert params["anchor_key"] == "a"
    assert params["applied"] is True
    assert params["applied_keys"] == ["b"]
    # Nothing was dragged, so the hitbox half of the payload stays empty.
    assert params["instruction"] is None
    assert params["target_key"] is None


def test_explicit_position_move_intent_keeps_the_batch_order(table):
    """A multi-row reorder lands as one run, in the order the rows were listed."""
    table.handle_event(
        "move",
        {"key": "b1", "keys": ["b1", "b2"], "position": "after", "anchorKey": "d"},
    )
    assert shape(table.source) == "a(b,e),d(d1),b1,b2"


def test_explicit_position_move_intent_is_vetoed_by_move_callback(source, events):
    """The toolbar goes through the same hook a drop does, not around it."""
    table = TanstackTable(
        source=source,
        move_callback=lambda key, anchor_key, position: False,
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("move", {"key": "e", "keys": ["e"], "position": "before", "anchorKey": "b"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


def test_a_blocked_instruction_never_falls_back_to_an_explicit_position(table, events):
    """An instruction that resolves to nothing means no move, whatever else is sent."""
    table.handle_event(
        "move",
        {
            "key": "d",
            "targetKey": "b1",
            "instruction": "instruction-blocked",
            "position": "child",
            "anchorKey": "b1",
        },
    )

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["position"] is None
    assert events[0][1]["applied"] is False


@pytest.mark.parametrize(
    "params",
    [
        {"key": "e", "keys": ["e"], "position": "sideways", "anchorKey": "b"},
        {"key": "e", "keys": ["e"], "position": "before"},
        {"key": "e", "keys": ["e"], "anchorKey": "b"},
        {"key": "e", "keys": ["e"], "position": "child", "anchorKey": "nope"},
    ],
)
def test_unusable_explicit_positions_leave_the_source_alone(table, events, params):
    table.handle_event("move", params)

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


# --- add intent ---------------------------------------------------------------
#
# The browser decides where a node goes, following the rule an explorer does, and
# never what it is called: keys have to be unique across a tree only Python holds.


def test_add_intent_inserts_a_child(table):
    table.handle_event("add", {"anchorKey": "b", "position": "child", "node": {"title": "New"}})
    assert shape(table.source) == "a(b(b1,b2,node-1),e),d(d1)"


def test_add_intent_inserts_a_sibling(table):
    table.handle_event("add", {"anchorKey": "b1", "position": "after", "node": {}})
    assert shape(table.source) == "a(b(b1,node-1,b2),e),d(d1)"


def test_add_intent_without_an_anchor_lands_at_root(table):
    """Nothing active means an empty tree or a click into thin air, so root it is."""
    table.handle_event("add", {"anchorKey": None, "position": None, "node": {}})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1),node-1"


def test_add_intent_fills_an_empty_tree():
    table = TanstackTable()
    table.handle_event("add", {"anchorKey": None, "position": None, "node": {}})
    assert shape(table.source) == "node-1"


def test_add_intent_merges_the_node_template(table):
    table.handle_event(
        "add",
        {"anchorKey": "d", "position": "child", "node": {"title": "New file", "allow_children": False}},
    )

    node = table.source[1]["children"][1]
    assert node["title"] == "New file"
    assert node["allow_children"] is False


def test_add_intent_defaults_the_title_when_the_template_has_none(table):
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": {}})
    assert table.source[1]["children"][1]["title"] == "New node"


def test_add_intent_never_lets_the_template_choose_the_key(table):
    """A browser that could name keys could collide with a tree it cannot see."""
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": {"key": "b1"}})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1,node-1)"


def test_add_intent_uses_the_configured_key_prefix(source):
    table = TanstackTable(source=source, options={"new_key_prefix": "doc"})
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": {}})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1,doc-1)"


def test_minted_keys_do_not_collide(table):
    for _ in range(3):
        table.handle_event("add", {"anchorKey": None, "position": None, "node": {}})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1),node-1,node-2,node-3"


def test_add_intent_accepts_snake_case(table):
    table.handle_event("add", {"anchor_key": "e", "position": "after", "node": {}})
    assert shape(table.source) == "a(b(b1,b2),e,node-1),d(d1)"


def test_add_intent_reports_the_normalised_payload(table, events):
    table.handle_event("add", {"anchorKey": "b", "position": "child", "node": {"title": "New"}})

    name, params = events[0]
    assert name == "add"
    assert params["anchor_key"] == "b"
    assert params["position"] == "child"
    assert params["key"] == "node-1"
    assert params["node"]["title"] == "New"
    assert params["applied"] is True


@pytest.mark.parametrize(
    "params",
    [
        {"anchorKey": "b", "position": "sideways", "node": {}},
        {"anchorKey": "b", "position": None, "node": {}},
        {"anchorKey": "nope", "position": "child", "node": {}},
    ],
)
def test_unusable_add_intents_leave_the_source_alone(table, events, params):
    table.handle_event("add", params)

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False
    assert events[0][1]["key"] is None


def test_add_intent_into_a_leaf_is_rejected(events):
    """The same flag that refuses a drop into a file refuses a new child in it."""
    table = TanstackTable(
        source=[{"key": "a", "title": "A", "allow_children": False}],
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("add", {"anchorKey": "a", "position": "child", "node": {}})

    assert shape(table.source) == "a"
    assert events[0][1]["applied"] is False


def test_add_intent_is_vetoed_by_action_callback(source, events):
    table = TanstackTable(
        source=source,
        action_callback=lambda action, params: False,
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("add", {"anchorKey": "b", "position": "child", "node": {}})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False
    # A vetoed add never happened, so it must not claim a key it did not take.
    assert events[0][1]["key"] is None


def test_action_callback_sees_the_add_it_is_deciding_on(source):
    seen = []

    def record(action, params):
        seen.append((action, params))
        return True

    table = TanstackTable(source=source, action_callback=record)
    table.handle_event("add", {"anchorKey": "b", "position": "child", "node": {"title": "New"}})

    action, params = seen[0]
    assert action == "add"
    assert params["anchor_key"] == "b"
    assert params["position"] == "child"
    assert params["node"]["title"] == "New"


# --- rename intent --------------------------------------------------------------


def test_rename_intent_retitles_the_node(table):
    table.handle_event("rename", {"key": "b", "title": "Renamed"})
    assert title_of(table, "b") == "Renamed"


def test_rename_intent_leaves_the_tree_shape_alone(table):
    """A rename touches one field, so nothing moves and nothing is reparented."""
    table.handle_event("rename", {"key": "b", "title": "Renamed"})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_rename_intent_strips_surrounding_whitespace(table):
    table.handle_event("rename", {"key": "b", "title": "  Renamed  "})
    assert title_of(table, "b") == "Renamed"


def test_rename_intent_reports_the_previous_title(table, events):
    table.handle_event("rename", {"key": "b", "title": "Renamed"})

    name, params = events[0]
    assert name == "rename"
    assert params["key"] == "b"
    assert params["title"] == "Renamed"
    assert params["previous_title"] == "B"
    assert params["applied"] is True


@pytest.mark.parametrize("title", ["", "   ", None])
def test_rename_intent_with_a_blank_title_is_a_cancel(table, events, title):
    """An editor emptied by accident must not leave a row with nothing to click."""
    table.handle_event("rename", {"key": "b", "title": title})

    assert title_of(table, "b") == "B"
    assert events[0][1]["applied"] is False


def test_rename_intent_to_the_same_title_pushes_nothing(table, events):
    """No round trip is worth a rewrite that would render identically."""
    pushes = []
    table.param.watch(lambda event: pushes.append(event.new), ["source"])
    table.handle_event("rename", {"key": "b", "title": "B"})

    assert pushes == []
    assert events[0][1]["applied"] is False


@pytest.mark.parametrize("params", [{"title": "Renamed"}, {"key": "nope", "title": "Renamed"}, {}])
def test_unusable_rename_intents_leave_the_source_alone(table, events, params):
    table.handle_event("rename", params)

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False
    assert events[0][1]["previous_title"] is None


def test_rename_intent_is_vetoed_by_action_callback(source, events):
    table = TanstackTable(
        source=source,
        action_callback=lambda action, params: action != "rename",
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("rename", {"key": "b", "title": "Renamed"})

    assert title_of(table, "b") == "B"
    assert events[0][1]["applied"] is False


def test_action_callback_sees_the_rename_it_is_deciding_on(source):
    """The old and the new title together, so a veto can compare them."""
    seen = []

    def record(action, params):
        seen.append((action, params))
        return True

    table = TanstackTable(source=source, action_callback=record)
    table.handle_event("rename", {"key": "b", "title": "Renamed"})

    action, params = seen[0]
    assert action == "rename"
    assert params["key"] == "b"
    assert params["title"] == "Renamed"
    assert params["previous_title"] == "B"


def test_deleting_the_edited_node_closes_the_editor(source):
    """An editor left open on a node that is gone would commit against nothing."""
    table = TanstackTable(source=source, editing_key="b")
    table.handle_event("delete", {"keys": ["b"]})

    assert table.editing_key == ""


def test_deleting_another_node_leaves_the_editor_open(source):
    table = TanstackTable(source=source, editing_key="b")
    table.handle_event("delete", {"keys": ["d"]})

    assert table.editing_key == "b"


# --- delete intent ------------------------------------------------------------


def test_delete_intent_removes_the_node(table):
    table.handle_event("delete", {"keys": ["b"]})
    assert shape(table.source) == "a(e),d(d1)"


def test_delete_intent_accepts_a_single_key(table):
    table.handle_event("delete", {"key": "e"})
    assert shape(table.source) == "a(b(b1,b2)),d(d1)"


def test_delete_intent_rewrites_the_source_once(table):
    """A multi row delete is one push to the browser, not one per key."""
    pushes = []
    table.param.watch(lambda event: pushes.append(event.new), ["source"])
    table.handle_event("delete", {"keys": ["b1", "e"]})

    assert shape(table.source) == "a(b(b2)),d(d1)"
    assert len(pushes) == 1


def test_delete_intent_prunes_a_parent_and_its_own_child(table):
    """Ticking a folder and a file in it deletes the folder once, not twice."""
    table.handle_event("delete", {"keys": ["b", "b1"]})
    assert shape(table.source) == "a(e),d(d1)"


def test_delete_intent_reports_what_went(table, events):
    table.handle_event("delete", {"keys": ["b", "b1", "e"]})

    name, params = events[0]
    assert name == "delete"
    assert params["keys"] == ["b", "b1", "e"]
    assert params["applied"] is True
    # b1 travelled with b, so it is not reported as removed in its own right.
    assert params["applied_keys"] == ["b", "e"]


def test_delete_intent_drops_stale_expanded_and_selected_keys(source, events):
    table = TanstackTable(
        source=source,
        expanded_keys=["a", "b"],
        selected_keys=["b", "b1", "d"],
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("delete", {"keys": ["b"]})

    assert table.expanded_keys == ["a"]
    assert table.selected_keys == ["d"]


@pytest.mark.parametrize("params", [{"keys": []}, {"keys": ["nope"]}, {}])
def test_unusable_delete_intents_leave_the_source_alone(table, events, params):
    table.handle_event("delete", params)

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False
    assert events[0][1]["applied_keys"] == []


def test_delete_intent_is_vetoed_by_action_callback(source, events):
    """One decision for the batch: a half applied delete is nobody's intent."""
    table = TanstackTable(
        source=source,
        action_callback=lambda action, params: action != "delete",
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("delete", {"keys": ["b", "e"]})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


def test_action_callback_is_not_called_for_moves(source):
    """Moves keep answering to move_callback, which vetoes one node at a time."""
    seen = []

    def record(action, params):
        seen.append(action)
        return True

    table = TanstackTable(source=source, action_callback=record)
    table.handle_event("move", {"key": "e", "keys": ["e"], "position": "before", "anchorKey": "b"})

    assert seen == []
    assert shape(table.source) == "a(e,b(b1,b2)),d(d1)"


# --- move veto ----------------------------------------------------------------


def test_move_callback_can_veto(source, events):
    table = TanstackTable(
        source=source,
        event_callback=lambda name, params: events.append((name, params)),
        move_callback=lambda key, anchor_key, position: False,
    )
    table.handle_event("move", {"key": "d", "targetKey": "b1", "instruction": "make-child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False


def test_move_callback_sees_the_resolved_position(source):
    seen = []
    table = TanstackTable(
        source=source,
        move_callback=lambda key, anchor_key, position: seen.append((key, anchor_key, position)) is None,
    )
    table.handle_event(
        "move",
        {"key": "d", "targetKey": "b2", "instruction": "reparent", "desiredLevel": 1},
    )

    assert seen == [("d", "b", "after")]
    assert shape(table.source) == "a(b(b1,b2),d(d1),e)"


def test_move_callback_is_not_called_for_unresolvable_intents(source):
    seen = []
    table = TanstackTable(
        source=source,
        move_callback=lambda *args: seen.append(args) is None,
    )
    table.handle_event("move", {"key": "d", "targetKey": "b1", "instruction": "instruction-blocked"})

    assert seen == []


# --- multi row move intent ----------------------------------------------------


def test_multi_move_intent_keeps_the_dragged_order(table):
    """Dragging a selection lands it in display order, not reversed."""
    table.handle_event(
        "move",
        {"key": "b1", "keys": ["b1", "b2"], "targetKey": "d", "instruction": "make-child"},
    )
    assert shape(table.source) == "a(b,e),d(d1,b1,b2)"


def test_multi_move_intent_reports_what_moved(table, events):
    """e is already below b, so only b1 counts, and the payload says so."""
    table.handle_event(
        "move",
        {"key": "e", "keys": ["e", "b1"], "targetKey": "b", "instruction": "reorder-below"},
    )

    params = events[0][1]
    assert params["keys"] == ["e", "b1"]
    assert params["applied"] is True
    assert params["applied_keys"] == ["b1"]


def test_multi_move_intent_falls_back_to_the_single_key(table, events):
    """An older payload without ``keys`` still moves the grabbed row."""
    table.handle_event("move", {"key": "d", "targetKey": "b1", "instruction": "make-child"})

    assert shape(table.source) == "a(b(b1(d(d1)),b2),e)"
    assert events[0][1]["keys"] == ["d"]
    assert events[0][1]["applied_keys"] == ["d"]


def test_multi_move_intent_into_its_own_selection_is_rejected(table, events):
    """b1 travels inside b, so there is no coherent place for the batch to land."""
    table.handle_event(
        "move",
        {"key": "b", "keys": ["b", "d"], "targetKey": "b1", "instruction": "make-child"},
    )

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[0][1]["applied"] is False
    assert events[0][1]["applied_keys"] == []


def test_multi_move_veto_applies_per_node(source, events):
    """Vetoing one row of a selection lets the rest of it through."""
    table = TanstackTable(
        source=source,
        event_callback=lambda name, params: events.append((name, params)),
        move_callback=lambda key, anchor_key, position: key != "b2",
    )
    table.handle_event(
        "move",
        {"key": "b1", "keys": ["b1", "b2"], "targetKey": "d", "instruction": "make-child"},
    )

    assert shape(table.source) == "a(b(b2),e),d(d1,b1)"
    assert events[0][1]["applied_keys"] == ["b1"]


# --- source API ---------------------------------------------------------------


def test_get_source_returns_a_copy(table):
    assert table.get_source() == table.source
    assert table.get_source() is not table.source


def test_set_source(table):
    table.set_source([{"key": "z", "title": "Z"}])
    assert shape(table.source) == "z"


def test_clear_resets_source_and_key_sets(source):
    table = TanstackTable(source=source, expanded_keys=["a"], selected_keys=["b1"])
    table.clear()

    assert table.source == []
    assert table.expanded_keys == []
    assert table.selected_keys == []


def test_add_node_at_root(table):
    table.add_node({"key": "z", "title": "Z"})
    assert shape(table.source) == "a(b(b1,b2),e),d(d1),z"


def test_add_node_under_a_parent_at_an_index(table):
    table.add_node({"key": "z", "title": "Z"}, parent_key="b", index=1)
    assert shape(table.source) == "a(b(b1,z,b2),e),d(d1)"


def test_remove_node(table):
    assert table.remove_node("b") is True
    assert shape(table.source) == "a(e),d(d1)"


def test_remove_node_missing(table):
    assert table.remove_node("nope") is False
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_remove_node_prunes_stale_keys(source):
    """A deleted node must not stay selected or expanded."""
    table = TanstackTable(source=source, expanded_keys=["a", "b"], selected_keys=["b1", "e"])
    table.remove_node("b")

    assert table.expanded_keys == ["a"]
    assert table.selected_keys == ["e"]


def test_move_node(table):
    assert table.move_node("d", "b1", "child") is True
    assert shape(table.source) == "a(b(b1(d(d1)),b2),e)"


def test_move_node_defaults_to_child(table):
    table.move_node("d", "e")
    assert shape(table.source) == "a(b(b1,b2),e(d(d1)))"


@pytest.mark.parametrize(
    ("key", "anchor_key", "position"),
    [
        ("a", "b1", "child"),
        ("b", "b", "child"),
        ("nope", "b", "child"),
        ("d", "b", "nowhere"),
    ],
)
def test_move_node_rejections(table, key, anchor_key, position):
    assert table.move_node(key, anchor_key, position) is False
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_move_nodes(table):
    assert table.move_nodes(["b1", "b2"], "d", "child") == ["b1", "b2"]
    assert shape(table.source) == "a(b,e),d(d1,b1,b2)"


def test_move_nodes_rejected_leaves_the_source_alone(table):
    assert table.move_nodes(["b", "d"], "b1", "child") == []
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_update_node(table):
    assert table.update_node("b1", {"size": 42}) is True
    assert table.source[0]["children"][0]["children"][0]["size"] == 42


def test_update_node_missing(table):
    assert table.update_node("nope", {"size": 42}) is False


def test_rename_node(table):
    assert table.rename_node("b1", "renamed") is True
    assert table.source[0]["children"][0]["children"][0]["title"] == "renamed"


def test_rename_node_missing(table):
    assert table.rename_node("nope", "renamed") is False


# --- expansion and selection API ----------------------------------------------


def test_expand_node(table):
    table.expand_node("b")
    table.expand_node("a")
    assert table.get_expanded() == ["a", "b"]


def test_expand_node_collapse(table):
    table.expand_node("a")
    table.expand_node("a", expanded=False)
    assert table.get_expanded() == []


def test_expand_all_covers_every_branch(table):
    table.expand_all()
    assert table.expanded_keys == ["a", "b", "d"]


def test_collapse_all(table):
    table.expand_all()
    table.collapse_all()
    assert table.expanded_keys == []


def test_select_node(table):
    table.select_node("b1")
    table.select_node("a")
    assert table.get_selected() == ["a", "b1"]


def test_select_node_deselect(table):
    table.select_node("b1")
    table.select_node("b1", selected=False)
    assert table.get_selected() == []


def test_clear_selection(table):
    table.select_node("b1")
    table.clear_selection()
    assert table.selected_keys == []
