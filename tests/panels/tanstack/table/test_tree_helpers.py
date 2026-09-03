"""Unit tests for the pure tree helpers behind the TanstackTable panel.

None of these need a browser or a Panel server. That is the payoff of the
unidirectional design: the browser only reports where the pointer let go, and
every rule about the resulting tree shape lives in plain Python.
"""

import copy

import pytest

from panelini.panels.tanstack.table import tree


def shape(nodes):
    """Render a tree compactly, for example ``a(b(b1,b2),e),d(d1)``."""
    return ",".join(node["key"] + (f"({shape(node['children'])})" if node.get("children") else "") for node in nodes)


def node_at(nodes, key):
    """``find_node`` plus a presence assertion, so callers can subscript freely."""
    found = tree.find_node(nodes, key)
    assert found is not None, f"{key} is not in the tree"
    return found


@pytest.fixture
def sample():
    """Three levels: ``a(b(b1,b2),e),d(d1)``."""
    return [
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


def test_shape_helper(sample):
    """The local rendering helper the other tests assert against."""
    assert shape(sample) == "a(b(b1,b2),e),d(d1)"


# --- traversal ---------------------------------------------------------------


def test_iter_nodes_is_depth_first_pre_order(sample):
    assert [node["key"] for node in tree.iter_nodes(sample)] == ["a", "b", "b1", "b2", "e", "d", "d1"]


def test_iter_nodes_on_empty_tree():
    assert list(tree.iter_nodes([])) == []


def test_find_node(sample):
    assert node_at(sample, "b2")["title"] == "B2"


def test_find_node_missing(sample):
    assert tree.find_node(sample, "nope") is None


def test_find_parent_of_nested_node(sample):
    parent = tree.find_parent(sample, "b1")
    assert parent is not None
    assert parent["key"] == "b"


def test_find_parent_of_root_node_is_none(sample):
    assert tree.find_parent(sample, "a") is None


def test_node_depth(sample):
    assert tree.node_depth(sample, "a") == 0
    assert tree.node_depth(sample, "b") == 1
    assert tree.node_depth(sample, "b1") == 2


def test_node_depth_missing(sample):
    assert tree.node_depth(sample, "nope") is None


@pytest.mark.parametrize(
    ("key", "ancestor", "expected"),
    [
        ("b", "a", True),
        ("b1", "a", True),
        ("a", "b", False),
        ("a", "a", False),
        ("b1", "d", False),
        ("b1", "nope", False),
    ],
)
def test_is_descendant(sample, key, ancestor, expected):
    assert tree.is_descendant(sample, key, ancestor) is expected


# --- mutation helpers are pure ------------------------------------------------


def test_remove_key_returns_new_tree_and_node(sample):
    before = copy.deepcopy(sample)
    result, removed = tree.remove_key(sample, "b")

    assert removed is not None
    assert removed["key"] == "b"
    assert shape(result) == "a(e),d(d1)"
    assert sample == before, "remove_key must not mutate its input"


def test_remove_key_missing_returns_unchanged_copy(sample):
    result, removed = tree.remove_key(sample, "nope")

    assert removed is None
    assert result == sample
    assert result is not sample


def test_insert_child_at_root(sample):
    result = tree.insert_child(sample, None, {"key": "z", "title": "Z"})
    assert shape(result) == "a(b(b1,b2),e),d(d1),z"


def test_insert_child_under_parent(sample):
    result = tree.insert_child(sample, "b", {"key": "z", "title": "Z"})
    assert shape(result) == "a(b(b1,b2,z),e),d(d1)"


def test_insert_child_at_index(sample):
    result = tree.insert_child(sample, "b", {"key": "z", "title": "Z"}, index=0)
    assert shape(result) == "a(b(z,b1,b2),e),d(d1)"


def test_insert_child_creates_missing_child_list(sample):
    result = tree.insert_child(sample, "e", {"key": "z", "title": "Z"})
    assert shape(result) == "a(b(b1,b2),e(z)),d(d1)"


def test_insert_child_unknown_parent_is_a_no_op(sample):
    result = tree.insert_child(sample, "nope", {"key": "z", "title": "Z"})
    assert result == sample


def test_insert_child_deep_copies_the_payload(sample):
    node = {"key": "z", "title": "Z"}
    result = tree.insert_child(sample, "b", node)

    node["title"] = "mutated"
    assert node_at(result, "z")["title"] == "Z"


def test_insert_sibling_before(sample):
    result = tree.insert_sibling(sample, "b1", {"key": "z", "title": "Z"}, before=True)
    assert shape(result) == "a(b(z,b1,b2),e),d(d1)"


def test_insert_sibling_after(sample):
    result = tree.insert_sibling(sample, "b1", {"key": "z", "title": "Z"})
    assert shape(result) == "a(b(b1,z,b2),e),d(d1)"


def test_insert_sibling_at_root_level(sample):
    result = tree.insert_sibling(sample, "a", {"key": "z", "title": "Z"}, before=True)
    assert shape(result) == "z,a(b(b1,b2),e),d(d1)"


def test_insert_sibling_unknown_reference_is_a_no_op(sample):
    result = tree.insert_sibling(sample, "nope", {"key": "z", "title": "Z"})
    assert result == sample


def test_update_node_merges_values(sample):
    result = tree.update_node(sample, "b1", {"title": "renamed", "size": 12})
    assert result is not None

    node = node_at(result, "b1")
    assert node["title"] == "renamed"
    assert node["size"] == 12
    assert node_at(sample, "b1")["title"] == "B1", "update_node must not mutate its input"


def test_update_node_ignores_key_and_children(sample):
    """Rewriting key or children behind the caller's back would invalidate the
    expanded and selected key sets, so those two fields are dropped."""
    result = tree.update_node(sample, "b", {"key": "hijack", "children": [], "title": "B kept"})
    assert result is not None

    node = node_at(result, "b")
    assert node["title"] == "B kept"
    assert [child["key"] for child in node["children"]] == ["b1", "b2"]
    assert tree.find_node(result, "hijack") is None


def test_update_node_missing_returns_none(sample):
    assert tree.update_node(sample, "nope", {"title": "x"}) is None


# --- instruction resolution ---------------------------------------------------


@pytest.mark.parametrize(
    ("instruction", "expected"),
    [
        ("reorder-above", ("before", "b1")),
        ("reorder-below", ("after", "b1")),
        ("make-child", ("child", "b1")),
    ],
)
def test_resolve_instruction_direct_mappings(sample, instruction, expected):
    assert tree.resolve_instruction(sample, "b1", instruction) == expected


def test_resolve_reparent_walks_up_to_the_desired_level(sample):
    """b1 sits at depth 2, so landing at level 1 means "after b"."""
    assert tree.resolve_instruction(sample, "b1", "reparent", desired_level=1) == ("after", "b")


def test_resolve_reparent_to_root_level(sample):
    assert tree.resolve_instruction(sample, "b1", "reparent", desired_level=0) == ("after", "a")


def test_resolve_reparent_at_the_current_level_keeps_the_target(sample):
    assert tree.resolve_instruction(sample, "b1", "reparent", desired_level=2) == ("after", "b1")


def test_resolve_reparent_clamps_at_the_root(sample):
    """A level below the root cannot walk further up than the outermost node."""
    assert tree.resolve_instruction(sample, "b1", "reparent", desired_level=-5) == ("after", "a")


def test_resolve_reparent_without_a_level_is_unresolvable(sample):
    assert tree.resolve_instruction(sample, "b1", "reparent") is None


def test_resolve_reparent_with_unknown_target_is_unresolvable(sample):
    assert tree.resolve_instruction(sample, "nope", "reparent", desired_level=0) is None


@pytest.mark.parametrize("instruction", ["instruction-blocked", "", "nonsense"])
def test_resolve_rejects_blocked_and_unknown_instructions(sample, instruction):
    assert tree.resolve_instruction(sample, "b1", instruction) is None


# --- moves --------------------------------------------------------------------


def test_apply_move_child(sample):
    assert shape(tree.apply_move(sample, "d", "b1", "child")) == "a(b(b1(d(d1)),b2),e)"


def test_apply_move_before(sample):
    assert shape(tree.apply_move(sample, "d", "b", "before")) == "a(d(d1),b(b1,b2),e)"


def test_apply_move_after(sample):
    assert shape(tree.apply_move(sample, "d", "b", "after")) == "a(b(b1,b2),d(d1),e)"


def test_apply_move_to_root_level(sample):
    assert shape(tree.apply_move(sample, "b1", "d", "after")) == "a(b(b2),e),d(d1),b1"


def test_apply_move_does_not_mutate_its_input(sample):
    before = copy.deepcopy(sample)
    tree.apply_move(sample, "d", "b1", "child")
    assert sample == before


@pytest.mark.parametrize("position", ["", "into", "sibling", None])
def test_apply_move_rejects_unknown_positions(sample, position):
    assert tree.apply_move(sample, "d", "b", position) is None


def test_apply_move_rejects_dropping_a_node_onto_itself(sample):
    assert tree.apply_move(sample, "b", "b", "child") is None


def test_apply_move_rejects_unknown_keys(sample):
    assert tree.apply_move(sample, "nope", "b", "child") is None
    assert tree.apply_move(sample, "b", "nope", "child") is None


def test_apply_move_rejects_dropping_a_node_into_its_own_subtree(sample):
    """The move that would detach a whole branch from the tree."""
    assert tree.apply_move(sample, "a", "b1", "child") is None
    assert tree.apply_move(sample, "b", "b2", "after") is None


def test_apply_move_rejects_a_no_op(sample):
    """e already sits after b, so this drop changes nothing and is rejected."""
    assert tree.apply_move(sample, "e", "b", "after") is None


# --- multi-row moves ----------------------------------------------------------


def test_prune_redundant_keys_drops_what_a_parent_already_carries(sample):
    """b1 travels inside b, so moving it again would be a second move."""
    assert tree.prune_redundant_keys(sample, ["b", "b1", "e"]) == ["b", "e"]


def test_prune_redundant_keys_keeps_order_and_deduplicates(sample):
    assert tree.prune_redundant_keys(sample, ["e", "b", "e"]) == ["e", "b"]


def test_apply_moves_keeps_the_relative_order(sample):
    """b1 and b2 land under d in the order they were given, not reversed."""
    result, moved = tree.apply_moves(sample, ["b1", "b2"], "d", "child")
    assert moved == ["b1", "b2"]
    assert shape(result) == "a(b,e),d(d1,b1,b2)"


def test_apply_moves_before_an_anchor_keeps_the_order(sample):
    result, moved = tree.apply_moves(sample, ["b1", "b2"], "d1", "before")
    assert moved == ["b1", "b2"]
    assert shape(result) == "a(b,e),d(b1,b2,d1)"


def test_apply_moves_rejects_the_batch_when_the_anchor_is_inside_it(sample):
    """A partial move here would strand the rest of the branch."""
    result, moved = tree.apply_moves(sample, ["b", "e"], "b1", "child")
    assert moved == []
    assert result is sample


def test_apply_moves_rejects_an_anchor_that_takes_no_children():
    nodes = [{"key": "a", "title": "A"}, {"key": "f", "title": "F", "allow_children": False}]
    result, moved = tree.apply_moves(nodes, ["a"], "f", "child")
    assert moved == []
    assert result is nodes


def test_apply_moves_skips_a_node_that_is_already_in_place(sample):
    """e already sits after b, so only b1 counts as moved, and order still holds."""
    result, moved = tree.apply_moves(sample, ["e", "b1"], "b", "after")
    assert moved == ["b1"]
    assert shape(result) == "a(b(b2),e,b1),d(d1)"


def test_apply_moves_ignores_unknown_keys(sample):
    result, moved = tree.apply_moves(sample, ["nope", "e"], "d", "child")
    assert moved == ["e"]
    assert shape(result) == "a(b(b1,b2)),d(d1,e)"


def test_apply_moves_does_not_mutate_its_input(sample):
    before = copy.deepcopy(sample)
    tree.apply_moves(sample, ["b1", "b2"], "d", "child")
    assert sample == before


# --- key sets -----------------------------------------------------------------


def test_subtree_keys(sample):
    assert tree.subtree_keys(sample, "b") == ["b", "b1", "b2"]
    assert tree.subtree_keys(sample, "b1") == ["b1"]


def test_subtree_keys_missing(sample):
    assert tree.subtree_keys(sample, "nope") == []


def test_expandable_keys(sample):
    assert tree.expandable_keys(sample) == ["a", "b", "d"]


def test_expandable_keys_ignores_empty_child_lists():
    assert tree.expandable_keys([{"key": "a", "children": []}]) == []


# --- minted keys --------------------------------------------------------------


def test_new_key_starts_at_one():
    assert tree.new_key([]) == "node-1"


def test_new_key_skips_what_is_taken():
    taken = [{"key": "node-1"}, {"key": "node-2", "children": [{"key": "node-4"}]}]
    assert tree.new_key(taken) == "node-3"


def test_new_key_fills_the_gap_a_deletion_left():
    """Reusing a number is safe: the key sets are pruned along with the node."""
    assert tree.new_key([{"key": "node-1"}, {"key": "node-3"}]) == "node-2"


def test_new_key_honours_the_prefix(sample):
    assert tree.new_key(sample, "doc") == "doc-1"


def test_new_key_is_deterministic(sample):
    assert tree.new_key(sample) == tree.new_key(sample)


# --- re-keyed copies ----------------------------------------------------------


def test_rekey_subtree_renames_every_node_in_it(sample):
    copied = tree.rekey_subtree(sample, node_at(sample, "b"))

    assert shape([copied]) == "node-1(node-2,node-3)"
    assert copied["title"] == "B"


def test_rekey_subtree_avoids_keys_the_tree_already_has(sample):
    sample.append({"key": "node-1", "title": "Taken"})
    copied = tree.rekey_subtree(sample, node_at(sample, "e"))

    assert copied["key"] == "node-2"


def test_rekey_subtree_honours_the_prefix(sample):
    assert tree.rekey_subtree(sample, node_at(sample, "e"), "doc")["key"] == "doc-1"


def test_rekey_subtree_leaves_the_original_alone(sample):
    before = shape(sample)
    tree.rekey_subtree(sample, node_at(sample, "b"))

    assert shape(sample) == before


def test_rekey_subtree_copies_deeply(sample):
    copied = tree.rekey_subtree(sample, node_at(sample, "b"))
    copied["children"][0]["title"] = "Changed"

    assert node_at(sample, "b1")["title"] == "B1"


# --- node types ---------------------------------------------------------------

TYPES = {"file": {"icon": "file", "allow_children": False, "kind": "leaf"}}


def test_resolve_node_fills_in_the_fields_of_its_type():
    resolved = tree.resolve_node({"key": "f", "title": "F", "type": "file"}, TYPES)

    assert resolved["icon"] == "file"
    assert resolved["allow_children"] is False
    assert resolved["kind"] == "leaf"


def test_resolve_node_lets_the_node_win():
    """A type is a set of defaults, not a second owner of the data."""
    resolved = tree.resolve_node({"key": "f", "type": "file", "icon": "python"}, TYPES)

    assert resolved["icon"] == "python"


def test_resolve_node_lets_the_node_win_even_with_a_falsy_value():
    resolved = tree.resolve_node({"key": "f", "type": "file", "icon": ""}, TYPES)

    assert resolved["icon"] == ""


def test_resolve_node_never_takes_a_key_or_children_from_a_type():
    """A type naming keys would be naming nodes it cannot see."""
    types = {"folder": {"key": "stolen", "children": [{"key": "ghost"}], "icon": "folder"}}
    resolved = tree.resolve_node({"key": "a", "type": "folder"}, types)

    assert resolved["key"] == "a"
    assert "children" not in resolved
    assert resolved["icon"] == "folder"


def test_resolve_node_leaves_a_node_alone_without_a_registry():
    node = {"key": "f", "type": "file"}

    assert tree.resolve_node(node) is node
    assert tree.resolve_node(node, {}) is node


def test_resolve_node_leaves_a_node_alone_without_a_type():
    node = {"key": "f", "title": "F"}

    assert tree.resolve_node(node, TYPES) is node


def test_resolve_node_ignores_a_type_the_registry_does_not_hold():
    node = {"key": "f", "type": "nope"}

    assert tree.resolve_node(node, TYPES) is node


def test_resolve_node_ignores_an_entry_that_is_not_a_mapping():
    node = {"key": "f", "type": "file"}

    assert tree.resolve_node(node, {"file": "not a dict"}) is node


def test_resolve_node_does_not_mutate_the_node_it_reads():
    node = {"key": "f", "type": "file"}
    tree.resolve_node(node, TYPES)

    assert node == {"key": "f", "type": "file"}


def test_accepts_children_reads_through_the_type():
    nodes = [{"key": "f", "title": "F", "type": "file"}]

    assert tree.accepts_children(nodes, "f") is True
    assert tree.accepts_children(nodes, "f", TYPES) is False


def test_accepts_children_lets_the_node_overrule_its_type():
    nodes = [{"key": "f", "title": "F", "type": "file", "allow_children": True}]

    assert tree.accepts_children(nodes, "f", TYPES) is True


def test_apply_move_rejects_a_child_drop_onto_a_typed_leaf():
    nodes = [{"key": "a", "title": "A"}, {"key": "f", "title": "F", "type": "file"}]

    assert tree.apply_move(nodes, "a", "f", "child", TYPES) is None
    assert shape(tree.apply_move(nodes, "a", "f", "child")) == "f(a)"


def test_apply_move_still_allows_a_sibling_drop_next_to_a_typed_leaf():
    nodes = [{"key": "a", "title": "A"}, {"key": "f", "title": "F", "type": "file"}]

    assert shape(tree.apply_move(nodes, "a", "f", "after", TYPES)) == "f,a"


def test_apply_moves_rejects_the_batch_when_the_typed_anchor_takes_no_children():
    nodes = [{"key": "a", "title": "A"}, {"key": "b", "title": "B"}, {"key": "f", "type": "file"}]
    result, moved = tree.apply_moves(nodes, ["a", "b"], "f", "child", TYPES)

    assert moved == []
    assert result is nodes


# --- set_children ---


def test_set_children_fills_a_lazy_branch():
    source = [{"key": "a", "title": "A", "lazy": True}]

    result = tree.set_children(source, "a", [{"key": "a1", "title": "A1"}])

    assert result is not None
    assert result[0]["children"] == [{"key": "a1", "title": "A1"}]
    assert "lazy" not in result[0]
    # The tree handed in is untouched, as every helper here leaves it.
    assert source[0] == {"key": "a", "title": "A", "lazy": True}


def test_set_children_clears_lazy_on_an_empty_answer():
    """A branch that loaded and turned out empty is loaded, not still waiting."""
    result = tree.set_children([{"key": "a", "title": "A", "lazy": True}], "a", [])

    assert result is not None
    assert result[0]["children"] == []
    assert "lazy" not in result[0]


def test_set_children_replaces_rather_than_appends():
    source = [{"key": "a", "title": "A", "children": [{"key": "old", "title": "Old"}]}]

    result = tree.set_children(source, "a", [{"key": "new", "title": "New"}])

    assert result is not None
    assert [child["key"] for child in result[0]["children"]] == ["new"]


def test_set_children_on_a_missing_key_returns_none():
    assert tree.set_children([{"key": "a", "title": "A"}], "nope", []) is None


def test_set_children_reaches_a_nested_branch():
    source = [{"key": "a", "title": "A", "children": [{"key": "b", "title": "B", "lazy": True}]}]

    result = tree.set_children(source, "b", [{"key": "c", "title": "C"}])

    assert result is not None
    assert result[0]["children"][0]["children"] == [{"key": "c", "title": "C"}]
