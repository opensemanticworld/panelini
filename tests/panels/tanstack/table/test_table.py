"""Tests for the TanstackTable bridge and its public Python API.

The browser never mutates the tree: it emits a move intent and Python decides
the resulting shape. That makes the whole drag and drop contract testable here,
without a browser, by feeding ``handle_event`` the payload the JS layer sends.
"""

import copy

import pytest

from panelini.panels.tanstack.table import TanstackTable


def shape(nodes):
    """Render a tree compactly, for example ``a(b(b1,b2),e),d(d1)``."""
    return ",".join(node["key"] + (f"({shape(node['children'])})" if node.get("children") else "") for node in nodes)


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
        expanded_keys=["a"],
        selected_keys=["b1"],
    )

    assert table.source == source
    assert table.columns == columns
    assert table.options == options
    assert table.filter_text == "note"
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


def test_empty_event_data_is_ignored(table, events):
    table._event_data = {}
    table._event_data = {"event_params": {"key": "e"}}
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
