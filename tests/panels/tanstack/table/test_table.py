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


# --- file type and icon ---------------------------------------------------------
#
# A file is a node carrying ``allow_children: False``, which is the same flag that
# stops anything being dropped into it. The panel still infers no icon: a node opts
# in by naming one, and what happens on a rename is that an icon the panel would
# have derived is *kept in step*, while one an application picked stays put.

FILES = [
    {"key": "md", "title": "notes.md", "icon": "markdown", "allow_children": False},
    {"key": "generic", "title": "plain", "icon": "file", "allow_children": False},
    {"key": "picked", "title": "logo.png", "icon": "hand-picked", "allow_children": False},
    {"key": "bare", "title": "unadorned.md", "allow_children": False},
    {"key": "dir", "title": "folder.md", "icon": "folder", "children": []},
]


@pytest.fixture
def files(events):
    """A table of files whose icons cover every case the rename rule has."""
    return TanstackTable(
        source=copy.deepcopy(FILES),
        event_callback=lambda name, params: events.append((name, params)),
    )


def icon_of(table, key):
    """Icon a node carries, or None when it carries none."""
    node = tree.find_node(table.source, key)
    assert node is not None
    return node.get("icon")


def test_rename_moves_a_derived_icon_to_the_new_type(files):
    files.handle_event("rename", {"key": "md", "title": "notes.py"})
    assert icon_of(files, "md") == "python"


def test_rename_gives_the_generic_icon_a_type(files):
    """What a new file starts out as, so naming it is what gives it its icon."""
    files.handle_event("rename", {"key": "generic", "title": "plain.py"})
    assert icon_of(files, "generic") == "python"


def test_rename_off_a_known_type_falls_back_to_the_generic_icon(files):
    files.handle_event("rename", {"key": "md", "title": "notes"})
    assert icon_of(files, "md") == "file"


def test_rename_leaves_a_hand_picked_icon_alone(files):
    """Naming an icon is a statement about the node, not about its extension."""
    files.handle_event("rename", {"key": "picked", "title": "logo.pdf"})

    assert title_of(files, "picked") == "logo.pdf"
    assert icon_of(files, "picked") == "hand-picked"


def test_rename_adds_no_icon_to_a_node_that_has_none(files):
    """A node that opted out of icons stays opted out."""
    files.handle_event("rename", {"key": "bare", "title": "unadorned.py"})
    assert icon_of(files, "bare") is None


def test_renaming_a_folder_never_touches_its_icon(files):
    """A folder called notes.py is still a folder."""
    files.handle_event("rename", {"key": "dir", "title": "folder.py"})
    assert icon_of(files, "dir") == "folder"


def test_file_icons_option_extends_the_mapping(events):
    table = TanstackTable(
        source=copy.deepcopy(FILES),
        options={"file_icons": {"ipynb": "python"}},
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.handle_event("rename", {"key": "generic", "title": "study.ipynb"})
    assert icon_of(table, "generic") == "python"


@pytest.mark.parametrize(
    ("key", "title", "expected"),
    [
        ("md", "notes.py", True),
        ("md", "other.md", False),
        # Case is not a type, so this one only changes what the row reads as.
        ("md", "notes.MD", False),
        ("md", "notes", True),
        ("generic", "plain.py", True),
        # A folder has no type to lose, whatever it is called.
        ("dir", "folder.py", False),
    ],
)
def test_rename_reports_whether_the_file_type_changed(files, events, key, title, expected):
    files.handle_event("rename", {"key": key, "title": title})
    assert events[0][1]["extension_changed"] is expected


def test_a_cancelled_rename_reports_no_type_change(files, events):
    """Nothing happened, so there is nothing for an application to react to."""
    files.handle_event("rename", {"key": "md", "title": "   "})
    assert events[0][1]["extension_changed"] is False


def test_action_callback_sees_the_type_change_it_is_deciding_on():
    """A veto can refuse the change of type specifically, not just the rename."""
    seen = []

    def refuse_a_type_change(action, params):
        seen.append(params)
        return not params["extension_changed"]

    table = TanstackTable(source=copy.deepcopy(FILES), action_callback=refuse_a_type_change)
    table.handle_event("rename", {"key": "md", "title": "notes.py"})

    assert seen[0]["extension_changed"] is True
    assert title_of(table, "md") == "notes.md"

    # The same veto lets a rename inside one type through.
    table.handle_event("rename", {"key": "md", "title": "minutes.md"})
    assert title_of(table, "md") == "minutes.md"


def test_add_derives_the_icon_from_a_template_title(table):
    """A template that names a type in its title gets the icon for it."""
    node = {"title": "untitled.md", "icon": "file", "allow_children": False}
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": node})

    assert table.source[1]["children"][1]["icon"] == "markdown"


def test_add_keeps_a_hand_picked_template_icon(table):
    node = {"title": "untitled.md", "icon": "hand-picked", "allow_children": False}
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": node})

    assert table.source[1]["children"][1]["icon"] == "hand-picked"


def test_add_leaves_a_folder_template_alone(table):
    """The toolbar's own new folder template, which must not become a file icon."""
    node = {"title": "New folder.md", "icon": "folder", "children": []}
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": node})

    assert table.source[1]["children"][1]["icon"] == "folder"


def test_the_default_new_file_template_takes_its_icon_from_the_rename(table):
    """The whole round trip: an untyped new file, then named, then typed."""
    node = {"title": "New file", "icon": "file", "allow_children": False}
    table.handle_event("add", {"anchorKey": "d", "position": "child", "node": node})
    assert table.source[1]["children"][1]["icon"] == "file"

    table.handle_event("rename", {"key": "node-1", "title": "report.pdf"})
    assert icon_of(table, "node-1") == "pdf"


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


# --- undo and redo ------------------------------------------------------------


def test_history_starts_empty(table):
    """The tree handed to the constructor is the starting point, not a step."""
    assert table.can_undo is False
    assert table.can_redo is False
    assert table.undo() is False


def test_undo_restores_the_tree_before_the_last_change(table):
    table.remove_node("b")
    assert shape(table.source) == "a(e),d(d1)"

    assert table.undo() is True
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert table.can_undo is False
    assert table.can_redo is True


def test_redo_puts_the_change_back(table):
    table.remove_node("b")
    table.undo()

    assert table.redo() is True
    assert shape(table.source) == "a(e),d(d1)"
    assert table.can_undo is True
    assert table.can_redo is False


def test_undo_and_redo_alternate_indefinitely(table):
    table.rename_node("e", "Renamed")
    for _ in range(3):
        table.undo()
        assert title_of(table, "e") == "E"
        table.redo()
        assert title_of(table, "e") == "Renamed"


def test_each_step_is_one_change(table):
    """A batch delete rewrites the tree once, so it is one step and not one per key."""
    table.handle_event("delete", {"keys": ["b1", "b2", "e"]})
    assert shape(table.source) == "a(b),d(d1)"

    table.undo()
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert table.can_undo is False


def test_a_new_change_drops_the_redo_states(table):
    table.remove_node("e")
    table.undo()
    assert table.can_redo is True

    table.rename_node("d", "Renamed")
    assert table.can_redo is False
    assert table.redo() is False


def test_undo_covers_browser_intents_and_public_calls_alike(table):
    table.handle_event("move", {"key": "b1", "targetKey": "d", "instruction": "make-child"})
    table.add_node({"key": "z", "title": "Z"})
    assert shape(table.source) == "a(b(b2),e),d(d1,b1),z"

    table.undo()
    assert shape(table.source) == "a(b(b2),e),d(d1,b1)"
    table.undo()
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_undo_drops_keys_the_restored_tree_no_longer_has(table):
    table.add_node({"key": "z", "title": "Z"})
    table.expand_node("z")
    table.select_node("z")
    table.select_node("d")
    table.editing_key = "z"

    table.undo()
    assert table.expanded_keys == []
    assert table.selected_keys == ["d"]
    assert table.editing_key == ""


def test_undo_intent_reports_what_is_left(source, events):
    table = TanstackTable(
        source=source,
        event_callback=lambda name, params: events.append((name, params)),
    )
    table.remove_node("e")
    table.handle_event("undo", {})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[-1] == ("undo", {"action": "undo", "applied": True, "can_undo": False, "can_redo": True})

    table.handle_event("redo", {})
    assert events[-1][1] == {"action": "redo", "applied": True, "can_undo": True, "can_redo": False}


def test_an_undo_with_nothing_recorded_is_reported_as_not_applied(table, events):
    table.handle_event("undo", {})
    assert events[-1][1]["applied"] is False
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_action_callback_is_never_asked_about_a_step(source):
    """It decides whether a change may happen, and a recorded state already passed it."""
    seen: list[str] = []
    table = TanstackTable(
        source=source,
        action_callback=lambda action, params: seen.append(action) is None,
    )
    table.handle_event("delete", {"keys": ["e"]})
    table.handle_event("undo", {})
    table.handle_event("redo", {})

    assert seen == ["delete"]
    assert shape(table.source) == "a(b(b1,b2)),d(d1)"


def test_undo_depth_bounds_the_history(source):
    table = TanstackTable(source=source, undo_depth=2)
    for title in ("One", "Two", "Three"):
        table.rename_node("e", title)

    assert table.undo() is True
    assert table.undo() is True
    assert table.undo() is False
    assert title_of(table, "e") == "One"


def test_undo_depth_zero_turns_the_history_off(source):
    table = TanstackTable(source=source, undo_depth=0)
    table.rename_node("e", "Renamed")

    assert table.can_undo is False
    assert table.undo() is False


def test_lowering_the_depth_keeps_the_most_recent_steps(table):
    for title in ("One", "Two", "Three"):
        table.rename_node("e", title)
    table.undo_depth = 1

    assert table.undo() is True
    assert title_of(table, "e") == "Two"
    assert table.can_undo is False


def test_set_source_forgets_the_history(table):
    table.remove_node("e")
    table.set_source([{"key": "z", "title": "Z"}])

    assert table.can_undo is False
    assert table.undo() is False
    assert shape(table.source) == "z"


def test_clear_stays_undoable(table):
    table.clear()
    assert table.source == []

    assert table.undo() is True
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_clear_history_forgets_both_directions(table):
    table.remove_node("e")
    table.undo()
    table.clear_history()

    assert table.can_undo is False
    assert table.can_redo is False


# --- cut, copy and paste ------------------------------------------------------


def test_cut_holds_the_keys_without_touching_the_tree(table):
    table.handle_event("cut", {"key": "e", "keys": ["e"]})

    assert table.clipboard == {"keys": ["e"], "mode": "cut"}
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_copy_holds_the_keys(table):
    table.handle_event("copy", {"key": "b", "keys": ["b"]})

    assert table.clipboard == {"keys": ["b"], "mode": "copy"}


def test_neither_is_recorded_for_undo(table):
    table.handle_event("cut", {"keys": ["e"]})

    assert table.can_undo is False


def test_a_key_inside_another_is_dropped_from_the_batch(table):
    table.handle_event("cut", {"keys": ["b", "b1"]})

    assert table.clipboard["keys"] == ["b"]


def test_a_key_naming_nothing_is_dropped(table):
    table.handle_event("cut", {"keys": ["nope"]})

    assert table.clipboard == {}


def test_pasting_a_cut_moves_the_nodes(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2)),d(d1,e)"


def test_pasting_a_cut_empties_the_clipboard(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert table.clipboard == {}


def test_pasting_a_copy_mints_new_keys_and_keeps_the_original(table):
    table.handle_event("copy", {"keys": ["b"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1,node-1(node-2,node-3))"
    assert title_of(table, "node-1") == "B"


def test_a_copy_survives_its_paste(table):
    table.handle_event("copy", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})
    table.handle_event("paste", {"anchor_key": "b", "position": "child"})

    assert table.clipboard == {"keys": ["e"], "mode": "copy"}
    assert shape(table.source) == "a(b(b1,b2,node-2),e),d(d1,node-1)"


def test_a_batch_paste_keeps_its_order(table):
    table.handle_event("copy", {"keys": ["b1", "b2"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1,node-1,node-2)"
    assert [title_of(table, key) for key in ("node-1", "node-2")] == ["B1", "B2"]


def test_a_paste_next_to_a_node_lands_beside_it(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d1", "position": "after"})

    assert shape(table.source) == "a(b(b1,b2)),d(d1,e)"


def test_a_cut_pasted_with_no_anchor_lands_at_root_level(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": None, "position": "child"})

    assert shape(table.source) == "a(b(b1,b2)),d(d1),e"


def test_a_copy_pasted_with_no_anchor_lands_at_root_level(table):
    table.handle_event("copy", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": None, "position": "child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1),node-1"


def test_pasting_into_a_node_that_takes_no_children_is_refused(table, events):
    table.update_node("d1", {"allow_children": False})
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d1", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[-1][1]["applied"] is False
    assert table.clipboard["keys"] == ["e"]


def test_pasting_an_empty_clipboard_does_nothing(table, events):
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert events[-1][1] == {
        "mode": "",
        "keys": [],
        "anchor_key": "d",
        "position": "child",
        "applied": False,
        "applied_keys": [],
    }


def test_pasting_a_copy_answers_to_the_action_veto(source, events):
    seen = []

    def refuse(action, params):
        seen.append(action)
        return False

    table = TanstackTable(source=source, action_callback=refuse, event_callback=lambda n, p: events.append((n, p)))
    table.handle_event("copy", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert seen == ["paste"]
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_pasting_a_cut_answers_to_the_move_veto_instead(source):
    moves = []
    actions = []

    def refuse_move(key, anchor_key, position):
        moves.append((key, anchor_key, position))
        return False

    table = TanstackTable(
        source=source,
        move_callback=refuse_move,
        action_callback=lambda name, params: actions.append(name) is None,
    )
    table.handle_event("cut", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert moves == [("e", "d", "child")]
    # A cut paste is a move, so the structural hook is not the one asked.
    assert actions == []
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    # A refused move leaves what was cut still cut, so it can be tried elsewhere.
    assert table.clipboard == {"keys": ["e"], "mode": "cut"}


def test_the_paste_payload_names_what_landed(table, events):
    table.handle_event("copy", {"keys": ["e"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert events[-1] == (
        "paste",
        {
            "mode": "copy",
            "keys": ["e"],
            "anchor_key": "d",
            "position": "child",
            "applied": True,
            "applied_keys": ["node-1"],
        },
    )


def test_a_paste_is_one_undo_step(table):
    table.handle_event("copy", {"keys": ["b"]})
    table.handle_event("paste", {"anchor_key": "d", "position": "child"})

    assert table.undo() is True
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"


def test_deleting_a_cut_node_drops_it_from_the_clipboard(table):
    table.handle_event("cut", {"keys": ["e", "d1"]})
    table.remove_node("e")

    assert table.clipboard == {"keys": ["d1"], "mode": "cut"}


def test_a_clipboard_emptied_by_a_delete_is_cleared(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.remove_node("e")

    assert table.clipboard == {}


def test_a_key_deleted_behind_the_clipboard_is_skipped_at_paste(table):
    table.handle_event("cut", {"keys": ["e", "d1"]})
    # Written straight, so nothing prunes the clipboard on the way past.
    table.source = tree.remove_key(table.source, "d1")[0]
    table.handle_event("paste", {"anchor_key": "b", "position": "child"})

    assert shape(table.source) == "a(b(b1,b2,e)),d"


def test_set_source_forgets_the_clipboard(table):
    table.handle_event("cut", {"keys": ["e"]})
    table.set_source([{"key": "z", "title": "Z"}])

    assert table.clipboard == {}


def test_the_public_api_cuts_and_pastes(table):
    assert table.cut_nodes(["e"]) == ["e"]
    assert table.get_clipboard() == {"keys": ["e"], "mode": "cut"}
    assert table.paste_nodes("d", "child") == ["e"]
    assert shape(table.source) == "a(b(b1,b2)),d(d1,e)"


def test_the_public_api_copies_and_pastes(table):
    assert table.copy_nodes(["b"]) == ["b"]
    assert table.paste_nodes("d") == ["node-1"]
    assert shape(table.source) == "a(b(b1,b2),e),d(d1,node-1(node-2,node-3))"


def test_clear_clipboard_forgets_what_was_held(table):
    table.copy_nodes(["e"])
    table.clear_clipboard()

    assert table.get_clipboard() == {}
    assert table.paste_nodes("d") == []


# --- cross-pane transfer ------------------------------------------------------


OTHER = [
    {"key": "x", "title": "X", "children": [{"key": "x1", "title": "X1"}]},
    {"key": "y", "title": "Y"},
]


def make_pane(source, group="vfs", **kwargs):
    """A table in a transfer group, holding its own copy of a tree."""
    return TanstackTable(source=copy.deepcopy(source), options={"transfer_group": group}, **kwargs)


@pytest.fixture
def left():
    """The pane nodes are dragged out of, holding the sample tree."""
    return make_pane(SOURCE)


@pytest.fixture
def right(events):
    """The pane nodes are dragged into, holding a tree of its own."""
    return make_pane(OTHER, event_callback=lambda name, params: events.append((name, params)))


def transfer(target, origin, keys, **params):
    """Feed ``target`` the payload a drop from ``origin`` sends."""
    target.handle_event("transfer", {"keys": keys, "sourceId": origin._table_id, **params})


def test_a_transfer_moves_the_nodes_between_the_panes(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child")

    assert shape(left.source) == "a(b(b1,b2)),d(d1)"
    assert shape(right.source) == "x(x1,e),y"


def test_a_transfer_resolves_a_hitbox_instruction(left, right):
    transfer(right, left, ["e"], targetKey="y", instruction="reorder-above")

    assert shape(right.source) == "x(x1),e,y"


def test_a_transfer_without_an_anchor_lands_at_root_level(left, right):
    transfer(right, left, ["b"])

    assert shape(right.source) == "x(x1),y,b(b1,b2)"


def test_a_batch_arrives_in_the_order_it_was_dragged(left, right):
    transfer(right, left, ["e", "d"], anchor_key="x", position="child")

    assert shape(right.source) == "x(x1,e,d(d1)),y"


def test_a_key_inside_another_travels_with_its_parent_only(left, right):
    transfer(right, left, ["b", "b1"], anchor_key="y", position="after")

    assert shape(right.source) == "x(x1),y,b(b1,b2)"


def test_a_copy_leaves_the_nodes_where_they_were(left, right):
    transfer(right, left, ["b"], anchor_key="y", position="after", copy=True)

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y,b(b1,b2)"


def test_a_key_the_target_already_holds_is_re_keyed(left, right):
    right.set_source([{"key": "e", "title": "Other E"}])

    transfer(right, left, ["e"], anchor_key="e", position="after")

    assert shape(right.source) == "e,node-1"
    assert title_of(right, "e") == "Other E"
    assert title_of(right, "node-1") == "E"


def test_an_arrival_reports_the_keys_it_landed_under(right, left, events):
    transfer(right, left, ["e"], anchor_key="x", position="child")

    name, params = events[-1]
    assert name == "transfer"
    assert params["applied"] is True
    assert params["applied_keys"] == ["e"]
    assert params["source_id"] == left._table_id
    assert params["target_id"] == right._table_id


def test_a_transfer_drops_the_stale_keys_from_the_pane_it_left(left, right):
    left.expanded_keys = ["a", "b"]
    left.selected_keys = ["b1"]

    transfer(right, left, ["b"], anchor_key="x", position="child")

    assert left.expanded_keys == ["a"]
    assert left.selected_keys == []


# --- cross-pane transfer, what is refused -------------------------------------


def test_a_pane_outside_the_group_is_refused(left):
    stranger = make_pane(OTHER, group="other")

    transfer(stranger, left, ["e"], anchor_key="x", position="child")

    assert shape(stranger.source) == "x(x1),y"
    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"


def test_a_pane_that_opted_into_nothing_is_refused(left):
    stranger = TanstackTable(source=copy.deepcopy(OTHER))

    transfer(stranger, left, ["e"], anchor_key="x", position="child")

    assert shape(stranger.source) == "x(x1),y"


def test_a_source_id_naming_no_live_table_is_refused(right):
    right.handle_event("transfer", {"keys": ["e"], "sourceId": "tst-gone", "anchor_key": "x", "position": "child"})

    assert shape(right.source) == "x(x1),y"


def test_a_pane_cannot_transfer_to_itself(right):
    transfer(right, right, ["y"], anchor_key="x", position="child")

    assert shape(right.source) == "x(x1),y"


def test_an_anchor_that_refuses_children_is_refused(left, right):
    right.update_node("y", {"allow_children": False})

    transfer(right, left, ["e"], anchor_key="y", position="child")

    assert shape(right.source) == "x(x1),y"
    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"


def test_an_anchor_this_tree_does_not_hold_is_refused(left, right):
    transfer(right, left, ["e"], anchor_key="b", position="child")

    assert shape(right.source) == "x(x1),y"


def test_the_pane_the_nodes_leave_may_veto_the_whole_transfer(right):
    seen = []
    origin = make_pane(SOURCE, action_callback=lambda action, params: seen.append((action, params)) or False)

    transfer(right, origin, ["e"], anchor_key="x", position="child")

    assert seen[0][0] == "transfer"
    assert seen[0][1]["keys"] == ["e"]
    assert shape(origin.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y"


def test_the_pane_the_nodes_arrive_in_may_veto_per_node(left, events):
    target = make_pane(OTHER, move_callback=lambda key, anchor_key, position: key != "d")

    transfer(target, left, ["e", "d"], anchor_key="x", position="child")

    assert shape(target.source) == "x(x1,e),y"
    assert shape(left.source) == "a(b(b1,b2)),d(d1)"


def test_a_veto_leaves_both_trees_alone_rather_than_putting_nodes_back(left):
    target = make_pane(OTHER, move_callback=lambda key, anchor_key, position: False)

    transfer(target, left, ["e"], anchor_key="x", position="child")

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert target.can_undo is False
    assert left.can_undo is False


def test_the_escape_hatch_takes_the_transfer_instead(left, right, events):
    handled = []
    right._transfer_callback = lambda params: handled.append(params) or True

    transfer(right, left, ["e"], anchor_key="x", position="child")

    assert handled[0]["keys"] == ["e"]
    assert events[-1][1]["handled"] is True
    assert shape(right.source) == "x(x1),y"
    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"


def test_the_escape_hatch_declining_lets_the_registry_run(left, right):
    right._transfer_callback = lambda params: False

    transfer(right, left, ["e"], anchor_key="x", position="child")

    assert shape(right.source) == "x(x1,e),y"


# --- cross-pane transfer, paired history --------------------------------------


def test_undo_in_the_pane_the_nodes_arrived_in_steps_both(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child")

    assert right.undo() is True

    assert shape(right.source) == "x(x1),y"
    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"


def test_undo_in_the_pane_the_nodes_left_steps_both(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child")

    assert left.undo() is True

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y"


def test_redo_replays_both_halves(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child")
    right.undo()

    assert right.redo() is True

    assert shape(right.source) == "x(x1,e),y"
    assert shape(left.source) == "a(b(b1,b2)),d(d1)"
    assert left.can_undo is True


def test_a_copy_pairs_nothing(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child", copy=True)

    assert left.can_undo is False
    assert right.undo() is True
    assert shape(right.source) == "x(x1),y"
    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"


def test_a_pane_changed_since_the_transfer_keeps_its_own_history(left, right):
    """Diverged halves duplicate the node rather than losing it.

    Stepping past the change made afterwards would silently discard it, so the
    two halves part company instead. The node is then in both trees, which is a
    thing a user can see and undo again.
    """
    transfer(right, left, ["e"], anchor_key="x", position="child")
    right.rename_node("y", "Y renamed")

    assert left.undo() is True

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1,e),y"
    assert title_of(right, "y") == "Y renamed"


def test_an_ordinary_change_still_undoes_alone(left, right):
    transfer(right, left, ["e"], anchor_key="x", position="child")
    right.rename_node("y", "Y renamed")

    assert right.undo() is True

    assert title_of(right, "y") == "Y"
    assert shape(left.source) == "a(b(b1,b2)),d(d1)"


# --- cross-pane transfer, public API ------------------------------------------


def test_the_public_api_transfers_nodes(left, right):
    assert right.transfer_nodes(left, ["e"], "x", "child") == ["e"]

    assert shape(right.source) == "x(x1,e),y"
    assert shape(left.source) == "a(b(b1,b2)),d(d1)"


def test_the_public_api_copies_nodes(left, right):
    assert right.transfer_nodes(left, ["b"], "y", "after", copy=True) == ["b"]

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y,b(b1,b2)"


def test_the_public_api_reports_nothing_when_the_panes_are_unrelated(left):
    stranger = make_pane(OTHER, group="other")

    assert stranger.transfer_nodes(left, ["e"], "x", "child") == []


# --- batch mutations ----------------------------------------------------------


@pytest.fixture
def pushes(table):
    """Every tree that crossed to the browser, in order."""
    seen = []
    table.param.watch(lambda event: seen.append(shape(event.new)), ["source"])
    return seen


def test_a_batch_pushes_the_tree_once(table, pushes):
    with table.batch():
        for index in range(5):
            table.add_node({"key": f"n{index}", "title": str(index)})

    assert pushes == ["a(b(b1,b2),e),d(d1),n0,n1,n2,n3,n4"]


def test_the_same_calls_without_a_batch_push_once_each(table, pushes):
    for index in range(5):
        table.add_node({"key": f"n{index}", "title": str(index)})

    assert len(pushes) == 5


def test_a_batch_is_one_undo_step(table):
    with table.batch():
        table.add_node({"key": "n0", "title": "0"})
        table.rename_node("b1", "renamed")
        table.remove_node("e")

    assert table.undo() is True
    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert title_of(table, "b1") == "B1"
    assert table.can_undo is False


def test_a_batch_reads_what_the_call_before_it_left(table):
    with table.batch():
        table.add_node({"key": "n0", "title": "0"}, parent_key="a")
        # Reading `source` mid batch has to see `n0`, or a method that works out
        # the next tree from the current one would drop the change before it.
        table.add_node({"key": "n1", "title": "1"}, parent_key="n0")

    assert shape(table.source) == "a(b(b1,b2),e,n0(n1)),d(d1)"


def test_an_empty_batch_records_nothing(table, pushes):
    with table.batch():
        pass

    assert pushes == []
    assert table.can_undo is False


def test_a_batch_yields_the_table(table):
    with table.batch() as batched:
        assert batched is table


def test_a_batch_that_raises_leaves_the_tree_as_it_was(table, pushes):
    with pytest.raises(ValueError, match="halfway"), table.batch():
        table.add_node({"key": "n0", "title": "0"})
        table.remove_node("e")
        raise ValueError("halfway")

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert table.can_undo is False
    # The browser is told the tree it already had, rather than being left holding
    # the half rewritten one param published on the way out.
    assert pushes == ["a(b(b1,b2),e),d(d1)"]


def test_a_batch_that_raises_before_changing_anything_pushes_nothing(table, pushes):
    with pytest.raises(ValueError), table.batch():
        raise ValueError("early")

    assert pushes == []
    assert table.can_undo is False


def test_a_nested_batch_joins_the_outer_one(table, pushes):
    with table.batch():
        with table.batch():
            table.add_node({"key": "n0", "title": "0"})
        table.add_node({"key": "n1", "title": "1"})

    assert pushes == ["a(b(b1,b2),e),d(d1),n0,n1"]
    assert len(table._undo_stack) == 1


def test_a_nested_batch_that_raises_rolls_the_whole_thing_back(table):
    with pytest.raises(ValueError), table.batch():
        table.add_node({"key": "n0", "title": "0"})
        with table.batch():
            table.add_node({"key": "n1", "title": "1"})
            raise ValueError("inside")

    assert shape(table.source) == "a(b(b1,b2),e),d(d1)"
    assert table.can_undo is False


def test_a_batch_closes_even_when_it_raises(table):
    with pytest.raises(ValueError), table.batch():
        raise ValueError("halfway")

    # A batch left open would swallow every later change, so this is the test that
    # the guard is a `finally` rather than a hopeful line at the end.
    table.add_node({"key": "n0", "title": "0"})
    assert table.can_undo is True


def test_a_batch_around_intents_is_still_one_step(table):
    with table.batch():
        table.handle_event("move", {"key": "b1", "targetKey": "d", "instruction": "make-child"})
        table.handle_event("delete", {"keys": ["e"]})

    assert shape(table.source) == "a(b(b2)),d(d1,b1)"
    assert len(table._undo_stack) == 1


def test_setting_the_source_inside_a_batch_forgets_the_step(table):
    table.add_node({"key": "n0", "title": "0"})
    with table.batch():
        table.remove_node("e")
        table.set_source([{"key": "fresh", "title": "Fresh"}])

    assert shape(table.source) == "fresh"
    assert table.can_undo is False


def test_an_undo_is_refused_inside_a_batch(table):
    table.add_node({"key": "n0", "title": "0"})

    with pytest.raises(RuntimeError, match="undo cannot be done inside a batch"), table.batch():
        table.undo()

    assert shape(table.source) == "a(b(b1,b2),e),d(d1),n0"


def test_a_redo_is_refused_inside_a_batch(table):
    table.add_node({"key": "n0", "title": "0"})
    table.undo()

    with pytest.raises(RuntimeError, match="redo cannot be done inside a batch"), table.batch():
        table.redo()


def test_a_transfer_into_a_batching_pane_is_refused(left, right):
    with pytest.raises(RuntimeError, match="transfer cannot be done inside a batch"), right.batch():
        right.transfer_nodes(left, ["e"], "x", "child")

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y"


def test_a_transfer_out_of_a_batching_pane_is_refused(left, right):
    # The pane the nodes leave is checked too, and before either tree is written:
    # its half of the step would be the deferred one, and a pair whose halves are
    # recorded differently is what loses a node on undo.
    with pytest.raises(RuntimeError, match="transfer cannot be done inside a batch"), left.batch():
        right.transfer_nodes(left, ["e"], "x", "child")

    assert shape(left.source) == "a(b(b1,b2),e),d(d1)"
    assert shape(right.source) == "x(x1),y"
    assert right.can_undo is False


def test_a_batch_still_reports_history_once(table):
    flags = []
    table.param.watch(lambda event: flags.append(event.new), ["can_undo"])

    with table.batch():
        for index in range(5):
            table.add_node({"key": f"n{index}", "title": str(index)})

    assert flags == [True]


# --- sorting ------------------------------------------------------------------


def test_sorting_starts_empty(table):
    assert table.sorting == []
    assert table.get_sort() is None


def test_sort_by_writes_one_entry(table):
    table.sort_by("size")

    assert table.sorting == [{"id": "size", "desc": False}]
    assert table.get_sort() == {"id": "size", "desc": False}


def test_sort_by_descending(table):
    table.sort_by("size", desc=True)

    assert table.sorting == [{"id": "size", "desc": True}]
    assert table.get_sort() == {"id": "size", "desc": True}


def test_sort_by_replaces_rather_than_appends(table):
    # One column at a time, so the second call is not a second sort key.
    table.sort_by("size")
    table.sort_by("title")

    assert table.sorting == [{"id": "title", "desc": False}]


def test_clear_sort(table):
    table.sort_by("size")
    table.clear_sort()

    assert table.sorting == []
    assert table.get_sort() is None


def test_get_sort_returns_a_copy(table):
    table.sort_by("size")
    got = table.get_sort()
    assert got is not None
    got["id"] = "other"

    assert table.sorting == [{"id": "size", "desc": False}]


def test_sorting_can_be_set_at_construction(source):
    table = TanstackTable(source=source, sorting=[{"id": "size", "desc": True}])

    assert table.sorting == [{"id": "size", "desc": True}]


def test_sorting_leaves_the_tree_alone(table):
    before = shape(table.source)
    table.sort_by("title", desc=True)

    assert shape(table.source) == before


def test_sorting_records_no_history_step(table):
    # A view concern, exactly like the filter: nothing about the tree changed, so
    # there is nothing to take back.
    table.sort_by("title")

    assert table.can_undo is False


def test_sorting_survives_a_new_tree(table):
    # set_source forgets the history and the clipboard because their keys stop
    # meaning anything. A sort names a column, which a new tree still has.
    table.sort_by("title")
    table.set_source([{"key": "z", "title": "Z"}])

    assert table.sorting == [{"id": "title", "desc": False}]


def test_a_sort_arriving_from_the_browser_is_kept(table):
    # The browser is the usual writer, since the header is where the sort is
    # asked for. Python reads it back off the param like any other view state.
    table.sorting = [{"id": "title", "desc": True}]

    assert table.get_sort() == {"id": "title", "desc": True}


# --- column widths ------------------------------------------------------------


def test_column_widths_start_empty(table):
    # Empty means nothing has been resized, not that everything is at zero: a
    # column missing from the map is at the width its column def asks for.
    assert table.column_widths == {}
    assert table.get_column_widths() == {}


def test_set_column_width(table):
    table.set_column_width("size", 220)

    assert table.column_widths == {"size": 220}
    assert table.get_column_widths() == {"size": 220}


def test_set_column_width_keeps_the_other_columns(table):
    table.set_column_width("size", 220)
    table.set_column_width("title", 300)

    assert table.column_widths == {"size": 220, "title": 300}


def test_reset_column_width_drops_one_key(table):
    table.set_column_width("size", 220)
    table.set_column_width("title", 300)
    table.reset_column_width("size")

    assert table.column_widths == {"title": 300}


def test_reset_column_width_ignores_a_column_that_was_never_sized(table):
    table.set_column_width("title", 300)
    table.reset_column_width("size")

    assert table.column_widths == {"title": 300}


def test_clear_column_widths(table):
    table.set_column_width("size", 220)
    table.clear_column_widths()

    assert table.column_widths == {}


def test_get_column_widths_returns_a_copy(table):
    table.set_column_width("size", 220)
    got = table.get_column_widths()
    got["size"] = 999

    assert table.column_widths == {"size": 220}


def test_column_widths_can_be_set_at_construction(source):
    table = TanstackTable(source=source, column_widths={"size": 120})

    assert table.column_widths == {"size": 120}


def test_column_widths_leave_the_tree_alone(table):
    before = shape(table.source)
    table.set_column_width("title", 400)

    assert shape(table.source) == before


def test_column_widths_record_no_history_step(table):
    # A view concern like the sort: the tree did not change, so there is nothing
    # to take back.
    table.set_column_width("title", 400)

    assert table.can_undo is False


def test_column_widths_survive_a_new_tree(table):
    # Widths name columns, and a new tree is shown through the same ones.
    table.set_column_width("title", 400)
    table.set_source([{"key": "z", "title": "Z"}])

    assert table.column_widths == {"title": 400}


def test_a_width_arriving_from_the_browser_is_kept(table):
    table.column_widths = {"title": 260}

    assert table.get_column_widths() == {"title": 260}


# --- node types ---------------------------------------------------------------
#
# A type names the fields its nodes take by default. Both sides resolve it as they
# read a node and neither writes it back, so ``source`` keeps the type name alone
# and a tree of a thousand files stops carrying the same two fields a thousand
# times over the socket.

TYPES = {
    "file": {"icon": "file", "allow_children": False},
    "python": {"icon": "python", "allow_children": False},
    "dataset": {"icon": "database", "allow_children": False},
    "folder": {"icon": "folder", "class": "row-folder"},
}

TYPED = [
    {"key": "dir", "title": "src", "type": "folder", "children": [{"key": "f", "title": "app.py", "type": "python"}]},
    {"key": "plain", "title": "notes.md", "type": "file"},
    {"key": "data", "title": "cities.json", "type": "dataset"},
    {"key": "loud", "title": "override.md", "type": "file", "allow_children": True},
]


@pytest.fixture
def typed(events):
    """A table whose nodes name types rather than repeating their fields."""
    return TanstackTable(
        source=copy.deepcopy(TYPED),
        types=copy.deepcopy(TYPES),
        event_callback=lambda name, params: events.append((name, params)),
    )


def test_types_default_to_empty():
    assert TanstackTable().types == {}


def test_types_can_be_set_at_construction(source):
    table = TanstackTable(source=source, types={"file": {"icon": "file"}})

    assert table.types == {"file": {"icon": "file"}}


def test_a_typed_leaf_refuses_a_child_drop(typed):
    typed.handle_event("move", {"key": "dir", "anchorKey": "plain", "position": "child"})

    assert shape(typed.source) == "dir(f),plain,data,loud"


def test_a_typed_folder_takes_a_child_drop(typed):
    typed.handle_event("move", {"key": "plain", "anchorKey": "dir", "position": "child"})

    assert shape(typed.source) == "dir(f,plain),data,loud"


def test_a_node_overrules_the_type_that_refuses_children(typed):
    typed.handle_event("move", {"key": "plain", "anchorKey": "loud", "position": "child"})

    assert shape(typed.source) == "dir(f),data,loud(plain)"


def test_a_typed_leaf_refuses_an_add_child_intent(typed, events):
    typed.handle_event("add", {"anchorKey": "plain", "position": "child", "node": {"title": "New"}})

    assert events[0][1]["applied"] is False
    assert shape(typed.source) == "dir(f),plain,data,loud"


def test_a_typed_leaf_refuses_a_pasted_child(typed):
    typed.copy_nodes(["loud"])
    typed.paste_nodes("plain", "child")

    assert shape(typed.source) == "dir(f),plain,data,loud"


def test_move_node_reads_the_registry(typed):
    typed.move_node("dir", "plain", "child")

    assert shape(typed.source) == "dir(f),plain,data,loud"


def test_move_nodes_reads_the_registry(typed):
    typed.move_nodes(["dir", "loud"], "plain", "child")

    assert shape(typed.source) == "dir(f),plain,data,loud"


def test_a_rename_derives_an_icon_through_a_generic_type(typed):
    """The type's icon is the generic one, so the panel derives as it would."""
    typed.handle_event("rename", {"key": "plain", "title": "notes.py"})

    assert icon_of(typed, "plain") == "python"


def test_a_rename_leaves_a_specific_type_icon_alone(typed):
    """A type naming an icon is a statement about the kind, not the extension."""
    typed.handle_event("rename", {"key": "data", "title": "cities.csv"})

    assert icon_of(typed, "data") is None


def test_a_rename_derives_when_the_type_icon_is_the_one_the_old_name_maps_to(typed):
    """Indistinguishable from an icon the panel derived, so it is kept in step."""
    typed.handle_event("rename", {"key": "f", "title": "app.md"})

    assert icon_of(typed, "f") == "markdown"


def test_a_rename_never_writes_a_type_onto_the_node(typed):
    """The wire saving would be undone by an expansion in Python."""
    typed.handle_event("rename", {"key": "plain", "title": "notes.py"})
    node = tree.find_node(typed.source, "plain")

    assert node is not None
    assert node["type"] == "file"
    assert "allow_children" not in node


def test_get_types_returns_a_deep_copy(typed):
    got = typed.get_types()
    got["file"]["icon"] = "changed"

    assert typed.types["file"]["icon"] == "file"


def test_set_type_adds_an_entry(typed):
    typed.set_type("image", {"icon": "image", "allow_children": False})

    assert typed.types["image"] == {"icon": "image", "allow_children": False}
    assert typed.types["file"] == {"icon": "file", "allow_children": False}


def test_set_type_replaces_an_entry(typed):
    typed.set_type("file", {"icon": "document"})

    assert typed.types["file"] == {"icon": "document"}


def test_set_type_takes_effect_on_the_guards(typed):
    typed.set_type("file", {"icon": "file"})
    typed.handle_event("move", {"key": "dir", "anchorKey": "plain", "position": "child"})

    assert shape(typed.source) == "plain(dir(f)),data,loud"


def test_remove_type_drops_an_entry(typed):
    typed.remove_type("file")

    assert "file" not in typed.types
    assert "folder" in typed.types


def test_remove_type_ignores_a_name_it_does_not_hold(typed):
    before = typed.get_types()
    typed.remove_type("nope")

    assert typed.types == before


def test_resolve_node_merges_the_type_underneath_the_node(typed):
    resolved = typed.resolve_node("loud")

    assert resolved == {"key": "loud", "title": "override.md", "type": "file", "allow_children": True, "icon": "file"}


def test_resolve_node_returns_none_for_a_key_that_is_not_there(typed):
    assert typed.resolve_node("nope") is None


def test_resolve_node_returns_a_copy_the_caller_may_keep(typed):
    resolved = typed.resolve_node("plain")
    resolved["title"] = "changed"

    assert title_of(typed, "plain") == "notes.md"


def test_types_leave_the_tree_alone(typed):
    before = copy.deepcopy(typed.source)
    typed.set_type("file", {"icon": "document"})

    assert typed.source == before


# --- lazy children ---


LAZY_SOURCE = [
    {"key": "root", "title": "root", "children": [{"key": "docs", "title": "docs", "lazy": True}]},
]


def test_lazy_load_asks_the_callback_and_writes_the_children():
    asked = []

    def load(key, node):
        asked.append((key, node["title"]))
        return [{"key": "docs/a", "title": "a.md"}]

    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=load)
    table.handle_event("lazy_load", {"key": "docs"})

    assert asked == [("docs", "docs")]
    docs = tree.find_node(table.source, "docs")
    assert docs is not None
    assert [child["key"] for child in docs["children"]] == ["docs/a"]
    assert "lazy" not in docs


def test_lazy_load_reports_applied_to_the_event_callback():
    seen = []
    table = TanstackTable(
        source=LAZY_SOURCE,
        lazy_callback=lambda key, node: [],
        event_callback=lambda name, params: seen.append((name, params)),
    )

    table.handle_event("lazy_load", {"key": "docs"})

    assert seen == [("lazy_load", {"key": "docs", "applied": True})]


def test_a_callback_answering_none_leaves_the_branch_waiting():
    """The application means to answer later, so nothing changes yet."""
    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=lambda key, node: None)

    table.handle_event("lazy_load", {"key": "docs"})

    docs = tree.find_node(table.source, "docs")
    assert docs is not None
    assert docs["lazy"] is True
    assert "children" not in docs


def test_lazy_load_without_a_callback_reaches_the_event_callback_alone():
    seen = []
    table = TanstackTable(source=LAZY_SOURCE, event_callback=lambda name, params: seen.append(params))

    table.handle_event("lazy_load", {"key": "docs"})

    assert seen == [{"key": "docs", "applied": False}]


def test_lazy_load_for_a_key_that_is_gone_applies_nothing():
    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=lambda key, node: [{"key": "x", "title": "x"}])

    table.handle_event("lazy_load", {"key": "vanished"})

    assert table.get_source() == LAZY_SOURCE


def test_a_load_records_no_undo_step():
    """Ctrl+Z must not mean "hide that folder again"."""
    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=lambda key, node: [{"key": "d1", "title": "a.md"}])

    table.handle_event("lazy_load", {"key": "docs"})

    assert table.can_undo is False


def test_an_undo_past_a_load_leaves_the_branch_lazy_again():
    """The tree that comes back has not been loaded, so expanding asks again."""
    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=lambda key, node: [{"key": "d1", "title": "a.md"}])

    table.rename_node("root", "renamed")
    table.handle_event("lazy_load", {"key": "docs"})
    table.undo()

    docs = tree.find_node(table.source, "docs")
    assert docs is not None
    assert docs["lazy"] is True


def test_set_children_is_the_public_way_to_answer_later():
    table = TanstackTable(source=LAZY_SOURCE)

    assert table.set_children("docs", [{"key": "d1", "title": "a.md"}]) is True
    assert table.set_children("nope", []) is False

    docs = tree.find_node(table.source, "docs")
    assert docs is not None
    assert "lazy" not in docs
    assert table.can_undo is False


# --- pruning the wire ---

PRUNE_SOURCE = [
    {
        "key": "src",
        "title": "src",
        "children": [
            {"key": "app", "title": "app", "children": [{"key": "main", "title": "main.py"}]},
            {"key": "readme", "title": "README.md"},
        ],
    },
    {"key": "docs", "title": "docs", "children": [{"key": "guide", "title": "guide.md"}]},
]


def pruned_table(**kwargs):
    """A table that sends the opened branches rather than the whole tree."""
    options = {"prune": "collapsed", **kwargs.pop("options", {})}
    return TanstackTable(source=PRUNE_SOURCE, options=options, **kwargs)


def test_an_ordinary_table_sends_the_tree_itself():
    """No pruning is no copy, so the split costs an unpruned table nothing."""
    table = TanstackTable(source=PRUNE_SOURCE)

    assert table._view is table.source


def test_the_tree_is_never_on_the_wire():
    """It is Python's to read; only the view crosses."""
    assert TanstackTable._property_mapping["source"] is None


def test_pruning_sends_the_roots_and_leaves_the_tree_alone():
    table = pruned_table()

    assert shape(table._view) == "src,docs"
    assert all(node["lazy"] is True for node in table._view)
    assert shape(table.source) == "src(app(main),readme),docs(guide)"


def test_expanding_a_branch_widens_the_view():
    table = pruned_table()

    table.expanded_keys = ["src"]

    assert shape(table._view) == "src(app,readme),docs"


def test_expanding_a_nested_branch_carries_the_path_to_it():
    table = pruned_table()

    table.expanded_keys = ["app"]

    assert shape(table._view) == "src(app(main),readme),docs"


def test_a_load_intent_on_a_pruned_branch_is_answered_without_a_callback():
    """The children were never missing, only left behind."""
    seen = []
    table = pruned_table(event_callback=lambda name, params: seen.append((name, params)))

    table.handle_event("lazy_load", {"key": "src"})

    assert shape(table._view) == "src(app,readme),docs"
    assert seen == [("lazy_load", {"key": "src", "applied": True})]


def test_a_load_intent_on_a_pruned_branch_never_reaches_the_lazy_callback():
    asked = []
    table = pruned_table(lazy_callback=lambda key, node: asked.append(key) or [])

    table.handle_event("lazy_load", {"key": "src"})

    assert asked == []


def test_a_genuinely_lazy_branch_still_reaches_the_callback_under_pruning():
    table = TanstackTable(
        source=[{"key": "root", "title": "root", "children": [{"key": "docs", "title": "docs", "lazy": True}]}],
        options={"prune": "collapsed"},
        lazy_callback=lambda key, node: [{"key": "d1", "title": "a.md"}],
    )
    table.expanded_keys = ["root"]

    table.handle_event("lazy_load", {"key": "docs"})

    assert shape(table.source) == "root(docs(d1))"


def test_a_collapsed_branch_stays_loaded():
    """The wire is paid once per branch, so a second expand is instant."""
    table = pruned_table()
    table.expanded_keys = ["src"]

    table.expanded_keys = []

    assert shape(table._view) == "src(app,readme),docs"


def test_a_search_carries_the_path_to_what_it_matched():
    table = pruned_table()

    table.filter_text = "main"

    assert shape(table._view) == "src(app(main),readme),docs"


def test_a_search_sends_a_matching_branch_without_its_subtree():
    """A folder whose name matches arrives as a folder, not as its contents."""
    table = pruned_table()

    table.filter_text = "app"

    assert shape(table._view) == "src(app,readme),docs"


def test_clearing_a_search_takes_back_what_it_widened():
    table = pruned_table()
    table.filter_text = "main"

    table.filter_text = ""

    assert shape(table._view) == "src,docs"


def test_a_search_reads_the_columns_the_browser_renders():
    table = TanstackTable(
        source=[{"key": "a", "title": "A", "children": [{"key": "b", "title": "B", "owner": "ada"}]}],
        columns=[{"id": "title", "field": "title"}, {"id": "owner", "field": "owner"}],
        options={"prune": "collapsed"},
    )

    table.filter_text = "ada"

    assert shape(table._view) == "a(b)"


def test_a_search_reads_a_column_value_a_type_supplies():
    table = TanstackTable(
        source=[{"key": "a", "title": "A", "children": [{"key": "b", "title": "B", "type": "db"}]}],
        columns=[{"id": "title", "field": "title"}, {"id": "kind", "field": "kind"}],
        types={"db": {"kind": "database"}},
        options={"prune": "collapsed"},
    )

    table.filter_text = "database"

    assert shape(table._view) == "a(b)"


def test_a_mutation_leaves_the_view_pruned():
    table = pruned_table()

    table.rename_node("docs", "documents")

    assert shape(table._view) == "src,docs"
    assert title_of(table, "docs") == "documents"


def test_turning_pruning_on_later_narrows_the_view():
    table = TanstackTable(source=PRUNE_SOURCE)

    table.options = {"prune": "collapsed"}

    assert shape(table._view) == "src,docs"


def test_a_new_tree_forgets_which_branches_were_sent():
    table = pruned_table()
    table.expanded_keys = ["src"]
    table.expanded_keys = []

    table.set_source(copy.deepcopy(PRUNE_SOURCE))

    assert shape(table._view) == "src,docs"


def test_a_new_tree_still_carries_the_branches_that_are_open():
    """A key still in expanded_keys is a branch the browser is showing."""
    table = pruned_table()
    table.expanded_keys = ["src"]

    table.set_source(copy.deepcopy(PRUNE_SOURCE))

    assert shape(table._view) == "src(app,readme),docs"


def test_pruning_takes_a_large_tree_off_the_wire():
    """The number P16 measured, asserted rather than described."""
    import json

    def leaf(folder, index):
        return {
            "key": f"f{folder}n{index}",
            "title": f"file {index}.py",
            "size": index * 1024,
            "kind": "python",
            "modified": "2026-01-01",
        }

    source = [
        {
            "key": f"f{folder}",
            "title": f"folder {folder}",
            "children": [leaf(folder, index) for index in range(100)],
        }
        for folder in range(100)
    ]
    table = TanstackTable(source=source, options={"prune": "collapsed"})

    whole = len(json.dumps(table.source))
    view = len(json.dumps(table._view))

    assert whole > 900_000
    assert view < 10_000


# --- editable columns ---

EDIT_SOURCE = [
    {
        "key": "a",
        "title": "A",
        "size": 12,
        "kind": "python",
        "done": False,
        "children": [{"key": "b", "title": "B", "size": 3, "kind": "text", "done": True}],
    },
]

EDIT_COLUMNS = [
    {"id": "title", "header": "Name", "field": "title"},
    {"id": "size", "header": "Size", "field": "size", "editable": True, "editor": "number"},
    {"id": "note", "header": "Note", "editable": True},
    {"id": "kind", "header": "Kind", "editable": True, "editor": "select", "choices": ["python", "text"]},
    {"id": "done", "header": "Done", "editable": True, "editor": "checkbox"},
    {"id": "score", "header": "Score", "editable": True, "editor": "number", "min": 0, "max": 10},
    {"id": "locked", "header": "Locked", "field": "kind"},
]


def edit_table(**kwargs):
    """A table whose columns declare what may be edited and how."""
    return TanstackTable(source=EDIT_SOURCE, columns=EDIT_COLUMNS, **kwargs)


def field_of(table, key, field):
    """The value a node holds for one field, asserting the node is still there."""
    node = tree.find_node(table.source, key)
    assert node is not None
    return node.get(field)


def test_an_edit_writes_the_column_field_onto_the_node():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert field_of(table, "b", "size") == 42


def test_an_edit_writes_the_column_id_when_the_column_names_no_field():
    """`field` is optional, exactly as it is for rendering: the id is the fallback."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "note", "value": "hello"})

    assert field_of(table, "b", "note") == "hello"


def test_an_edit_reports_what_it_did():
    events = []
    table = edit_table(event_callback=lambda name, params: events.append((name, params)))

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert events == [
        (
            "edit",
            {
                "key": "b",
                "column": "size",
                "field": "size",
                "value": 42,
                "previous": 3,
                "applied": True,
            },
        )
    ]


def test_a_number_column_keeps_numbers():
    """Everything crosses as JSON and a text editor sends text, so this is where it
    stops being text."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "7"})

    assert field_of(table, "b", "size") == 7
    assert not isinstance(field_of(table, "b", "size"), str)


def test_a_number_column_keeps_a_fraction_a_fraction():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "7.5"})

    assert field_of(table, "b", "size") == 7.5


def test_a_number_column_refuses_what_is_not_a_number():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "twelve"})

    assert field_of(table, "b", "size") == 3


def test_a_select_column_refuses_a_choice_it_does_not_offer():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "kind", "value": "binary"})

    assert field_of(table, "b", "kind") == "text"


def test_a_select_column_takes_one_it_does():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "kind", "value": "python"})

    assert field_of(table, "b", "kind") == "python"


def test_a_checkbox_column_keeps_a_bool():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "done", "value": False})

    assert field_of(table, "b", "done") is False


def test_a_column_that_is_not_editable_is_left_alone():
    events = []
    table = edit_table(event_callback=lambda name, params: events.append((name, params)))

    table.handle_event("edit", {"key": "b", "column": "locked", "value": "python"})

    assert field_of(table, "b", "kind") == "text"
    assert events[0][1]["applied"] is False


def test_a_column_nothing_declares_is_left_alone():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "nothing", "value": "x"})

    assert field_of(table, "b", "note") is None


def test_an_edit_of_a_node_that_is_gone_changes_nothing():
    table = edit_table()

    table.handle_event("edit", {"key": "nope", "column": "size", "value": "1"})

    assert shape(table.source) == "a(b)"


def test_an_unchanged_value_is_not_worth_a_round_trip():
    """The same rule the rename intent follows, and for the same reason."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "3"})

    assert table.can_undo is False


def test_an_edit_records_one_undo_step():
    table = edit_table(undo_depth=10)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})
    table.undo()

    assert field_of(table, "b", "size") == 3


def test_the_veto_leaves_the_tree_untouched():
    table = edit_table(action_callback=lambda action, params: action != "edit")

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert field_of(table, "b", "size") == 3


def test_the_veto_is_asked_with_the_coerced_value_before_anything_is_written():
    """Snapshotted rather than held, because the applier fills `applied` into the
    same dict once it knows: what the hook is asked is a moment, not an object."""
    seen = []
    table = edit_table(action_callback=lambda action, params: seen.append((action, dict(params))) is None)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert seen == [
        ("edit", {"key": "b", "column": "size", "field": "size", "value": 42, "previous": 3, "applied": False})
    ]


def test_a_refused_edit_is_reported_so_the_editor_can_reopen():
    """A refusal changes no tree, so nothing else would ever reach the browser to
    say the value did not land."""
    table = edit_table(action_callback=lambda action, params: False)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert table._edit_error["key"] == "b"
    assert table._edit_error["column"] == "size"
    assert table._edit_error["value"] == "42"


def test_two_identical_refusals_are_two_events():
    """A dict equal to the one already there fires no watcher, so typing the same
    rejected value twice would otherwise leave the editor closed."""
    table = edit_table(action_callback=lambda action, params: False)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})
    first = table._edit_error["seq"]
    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert table._edit_error["seq"] == first + 1


def test_an_accepted_edit_clears_the_refusal():
    table = edit_table(action_callback=lambda action, params: params["value"] != 42)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})
    table.handle_event("edit", {"key": "b", "column": "size", "value": "7"})

    assert table._edit_error == {}


def test_an_edit_writes_the_node_and_never_the_type():
    """A type is defaults for every node of a kind, so writing there would turn one
    cell edit into a change to all of them."""
    source = [{"key": "a", "title": "A", "type": "file"}, {"key": "b", "title": "B", "type": "file"}]
    table = TanstackTable(source=source, columns=EDIT_COLUMNS, types={"file": {"size": 1}})

    table.handle_event("edit", {"key": "a", "column": "size", "value": "9"})

    assert field_of(table, "a", "size") == 9
    assert field_of(table, "b", "size") is None
    assert table.types == {"file": {"size": 1}}


def test_a_value_a_type_supplied_is_what_an_edit_is_measured_against():
    """Setting a cell back to the value it already shows is nothing at all, whether
    the node holds it or inherits it."""
    source = [{"key": "a", "title": "A", "type": "file"}]
    table = TanstackTable(source=source, columns=EDIT_COLUMNS, types={"file": {"size": 1}}, undo_depth=5)

    table.handle_event("edit", {"key": "a", "column": "size", "value": "1"})

    assert table.can_undo is False
    assert field_of(table, "a", "size") is None


def test_set_field_writes_a_value_the_way_an_editor_would():
    table = edit_table()

    assert table.set_field("b", "size", "42") is True
    assert field_of(table, "b", "size") == 42


def test_set_field_refuses_a_column_that_is_not_editable():
    table = edit_table()

    assert table.set_field("b", "locked", "python") is False


def test_set_field_refuses_a_value_the_column_cannot_hold():
    table = edit_table()

    assert table.set_field("b", "size", "twelve") is False
    assert field_of(table, "b", "size") == 3


def test_set_field_is_not_asked_of_the_veto():
    """An application writing a value is the decision that hook exists to take."""
    table = edit_table(action_callback=lambda action, params: False)

    assert table.set_field("b", "size", 42) is True
    assert field_of(table, "b", "size") == 42


def test_the_editing_column_opens_beside_the_key():
    table = edit_table(editing_key="b", editing_column="size")

    assert table.editing_key == "b"
    assert table.editing_column == "size"


def test_deleting_the_edited_row_closes_the_editor_on_both_coordinates():
    table = edit_table(editing_key="b", editing_column="size")

    table.remove_node("b")

    assert table.editing_key == ""
    assert table.editing_column == ""


def test_the_rename_intent_is_untouched_by_any_of_this():
    """The title carries a file type, an icon and a public rename_node behind it, so
    it keeps the intent all three already answer to."""
    table = edit_table()

    table.handle_event("rename", {"key": "b", "title": "B2"})

    assert title_of(table, "b") == "B2"


# --- typed editors ---
#
# The coercion is P17a's and is covered above. What is new is that a value the column
# cannot hold now comes back the way a refused one does, and that a number column's
# own bounds are checked here rather than trusted from the input that carries them.


def test_a_value_the_column_cannot_hold_comes_back_like_a_refused_one():
    """From the editor's side these are the same fact: the value did not land, and
    an editor that closed on `twelve` would have said nothing about where it went."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "twelve"})

    assert table._edit_error["key"] == "b"
    assert table._edit_error["column"] == "size"
    assert table._edit_error["value"] == "twelve"


def test_a_choice_the_select_does_not_offer_comes_back_too():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "kind", "value": "binary"})

    assert table._edit_error["value"] == "binary"


def test_a_value_that_did_not_change_comes_back_as_nothing():
    """Unchanged is not the same as rejected: nothing landed because there was
    nothing to land, so there is nothing to reopen an editor over."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "3"})

    assert table._edit_error == {}


def test_a_number_below_the_column_minimum_is_refused():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "score", "value": "-1"})

    assert field_of(table, "b", "score") is None
    assert table._edit_error["value"] == "-1"


def test_a_number_above_the_column_maximum_is_refused():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "score", "value": "11"})

    assert field_of(table, "b", "score") is None


def test_a_number_on_the_boundary_is_inside_it():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "score", "value": "10"})

    assert field_of(table, "b", "score") == 10


def test_a_column_declaring_no_bounds_takes_any_number():
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "size", "value": "-4000"})

    assert field_of(table, "b", "size") == -4000


def test_only_the_bound_a_column_declares_is_applied():
    columns = [
        {"id": "title", "header": "Name"},
        {"id": "size", "header": "Size", "editable": True, "editor": "number", "min": 0},
    ]
    table = TanstackTable(source=EDIT_SOURCE, columns=columns)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "9999"})

    assert field_of(table, "b", "size") == 9999


def test_a_bound_that_cannot_be_read_bounds_nothing():
    """Refusing every value in a column because its own def is malformed would be
    the panel making an application's typo into a table nobody can edit."""
    columns = [
        {"id": "title", "header": "Name"},
        {"id": "size", "header": "Size", "editable": True, "editor": "number", "max": "ten"},
    ]
    table = TanstackTable(source=EDIT_SOURCE, columns=columns)

    table.handle_event("edit", {"key": "b", "column": "size", "value": "42"})

    assert field_of(table, "b", "size") == 42


def test_set_field_refuses_a_number_outside_the_column_bounds():
    table = edit_table()

    assert table.set_field("b", "score", 11) is False
    assert field_of(table, "b", "score") is None


def test_the_range_is_checked_here_and_not_only_hinted_at_the_input():
    """The browser is trusted for the affordance and never for the decision: an
    event built by hand carries no input and so carries no bounds either."""
    table = edit_table()

    table.handle_event("edit", {"key": "b", "column": "score", "value": 99})

    assert field_of(table, "b", "score") is None
