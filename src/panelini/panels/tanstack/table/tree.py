"""Pure tree helpers for the TanstackTable panel.

Nothing here imports Panel or param, so every rule about how a drop reshapes the
tree is unit testable without a browser or a running server. That is the whole
point of the unidirectional design: the browser reports intent, and the shape of
the resulting tree is decided by code that runs in plain Python.

Every mutating helper is pure. It deep copies its input and returns a new tree,
so the caller can assign the result to a param and get a change event.
"""

from __future__ import annotations

import copy
from collections.abc import Iterator
from typing import Any

Node = dict[str, Any]
Tree = list[Node]

KEY = "key"
CHILDREN = "children"

#: Normalised drop positions. Every hitbox instruction maps onto one of these.
POSITIONS = ("before", "after", "child")


def _walk(
    tree: Tree,
    parent: Node | None = None,
    depth: int = 0,
) -> Iterator[tuple[Node, Node | None, int]]:
    """Yield ``(node, parent, depth)`` depth first, pre-order."""
    for node in tree:
        yield node, parent, depth
        children = node.get(CHILDREN)
        if children:
            yield from _walk(children, node, depth + 1)


def _child_list(node: Node) -> list[Node]:
    """Return the node's child list, creating it when absent or malformed."""
    children = node.get(CHILDREN)
    if not isinstance(children, list):
        children = []
        node[CHILDREN] = children
    return children


def iter_nodes(tree: Tree) -> Iterator[Node]:
    """Iterate every node depth first, pre-order.

    Args:
        tree: Tree to walk.

    Yields:
        Each node, parents before their children.
    """
    for node, _parent, _depth in _walk(tree):
        yield node


def find_node(tree: Tree, key: str) -> Node | None:
    """Return the node with ``key``, or None when it is not in the tree."""
    for node, _parent, _depth in _walk(tree):
        if node.get(KEY) == key:
            return node
    return None


def find_parent(tree: Tree, key: str) -> Node | None:
    """Return the parent of ``key``.

    Returns None both when ``key`` sits at root level and when it is missing, so
    callers that need to tell those apart should check ``find_node`` first.
    """
    for node, parent, _depth in _walk(tree):
        if node.get(KEY) == key:
            return parent
    return None


def node_depth(tree: Tree, key: str) -> int | None:
    """Return the zero based depth of ``key``, or None when it is missing."""
    for node, _parent, depth in _walk(tree):
        if node.get(KEY) == key:
            return depth
    return None


def is_descendant(tree: Tree, key: str, ancestor_key: str) -> bool:
    """Return True when ``key`` sits anywhere below ``ancestor_key``.

    A node is not its own descendant.
    """
    ancestor = find_node(tree, ancestor_key)
    if ancestor is None or key == ancestor_key:
        return False
    return find_node(ancestor.get(CHILDREN) or [], key) is not None


def remove_key(tree: Tree, key: str) -> tuple[Tree, Node | None]:
    """Remove ``key`` and its subtree.

    Args:
        tree: Tree to copy from.
        key: Key of the node to remove.

    Returns:
        A ``(new_tree, removed_node)`` pair. ``removed_node`` is None when the
        key was not found, in which case the tree is an unchanged copy.
    """
    result = copy.deepcopy(tree)
    return result, _pop_in_place(result, key)


def _pop_in_place(siblings: Tree, key: str) -> Node | None:
    for index, node in enumerate(siblings):
        if node.get(KEY) == key:
            return siblings.pop(index)
        children = node.get(CHILDREN)
        if children:
            found = _pop_in_place(children, key)
            if found is not None:
                return found
    return None


def insert_child(
    tree: Tree,
    parent_key: str | None,
    node: Node,
    index: int | None = None,
) -> Tree:
    """Insert ``node`` under ``parent_key``.

    Args:
        tree: Tree to copy from.
        parent_key: Key of the parent, or None to insert at root level.
        node: Node to insert. It is deep copied, so the caller keeps ownership.
        index: Position among the siblings. None appends.

    Returns:
        A new tree. Unchanged when ``parent_key`` is not in the tree.
    """
    result = copy.deepcopy(tree)
    payload = copy.deepcopy(node)

    if parent_key is None:
        siblings = result
    else:
        parent = find_node(result, parent_key)
        if parent is None:
            return result
        siblings = _child_list(parent)

    siblings.insert(len(siblings) if index is None else index, payload)
    return result


def insert_sibling(tree: Tree, ref_key: str, node: Node, before: bool = False) -> Tree:
    """Insert ``node`` next to ``ref_key``.

    Args:
        tree: Tree to copy from.
        ref_key: Key of the node to sit next to.
        node: Node to insert. It is deep copied.
        before: True to insert above ``ref_key``, False to insert below it.

    Returns:
        A new tree. Unchanged when ``ref_key`` is not in the tree.
    """
    result = copy.deepcopy(tree)
    payload = copy.deepcopy(node)

    if find_node(result, ref_key) is None:
        return result

    parent = find_parent(result, ref_key)
    siblings = result if parent is None else _child_list(parent)
    for index, sibling in enumerate(siblings):
        if sibling.get(KEY) == ref_key:
            siblings.insert(index if before else index + 1, payload)
            break
    return result


def update_node(tree: Tree, key: str, values: dict[str, Any]) -> Tree | None:
    """Merge ``values`` into the node with ``key``.

    ``key`` and ``children`` are ignored, because changing them would silently
    invalidate the expanded and selected key sets, and reshaping the tree is what
    the move helpers are for.

    Returns:
        A new tree, or None when the key is not in the tree.
    """
    result = copy.deepcopy(tree)
    node = find_node(result, key)
    if node is None:
        return None
    node.update({name: copy.deepcopy(value) for name, value in values.items() if name not in (KEY, CHILDREN)})
    return result


def resolve_instruction(
    tree: Tree,
    target_key: str,
    instruction: str,
    desired_level: int | None = None,
) -> tuple[str, str] | None:
    """Normalise a hitbox instruction into a drop position and an anchor.

    ``reparent`` is the only instruction whose anchor is not the hovered row: it
    means "leave this branch and land next to an ancestor", so the anchor is
    found by walking up from the target until ``desired_level`` is reached.

    Args:
        tree: Tree the drop happened on.
        target_key: Key of the hovered row.
        instruction: One of the pragmatic-drag-and-drop tree-item instructions.
        desired_level: Target depth, only meaningful for ``reparent``.

    Returns:
        A ``(position, anchor_key)`` pair with position in :data:`POSITIONS`, or
        None when the instruction is blocked, unknown or unresolvable.
    """
    if instruction == "reorder-above":
        return "before", target_key
    if instruction == "reorder-below":
        return "after", target_key
    if instruction == "make-child":
        return "child", target_key
    if instruction != "reparent":
        return None

    depth = node_depth(tree, target_key)
    if depth is None or desired_level is None:
        return None

    anchor = target_key
    for _ in range(max(0, depth - int(desired_level))):
        parent = find_parent(tree, anchor)
        if parent is None:
            break
        anchor = parent[KEY]
    return "after", anchor


def apply_move(tree: Tree, key: str, anchor_key: str, position: str) -> Tree | None:
    """Move ``key`` next to or under ``anchor_key``.

    Args:
        tree: Tree to copy from.
        key: Key of the node being moved.
        anchor_key: Key the node lands next to or inside.
        position: One of :data:`POSITIONS`.

    Returns:
        A new tree, or None when the move is rejected or would change nothing.
        Rejected covers an unknown position, an unknown key, dropping a node onto
        itself, and dropping a node into its own subtree.
    """
    if position not in POSITIONS or key == anchor_key:
        return None
    if find_node(tree, key) is None or find_node(tree, anchor_key) is None:
        return None
    if is_descendant(tree, anchor_key, key):
        return None

    pruned, node = remove_key(tree, key)
    if node is None:
        return None

    if position == "child":
        result = insert_child(pruned, anchor_key, node)
    else:
        result = insert_sibling(pruned, anchor_key, node, before=position == "before")

    return None if result == tree else result


def subtree_keys(tree: Tree, key: str) -> list[str]:
    """Return ``key`` plus the keys of everything below it, or an empty list."""
    node = find_node(tree, key)
    if node is None:
        return []
    return [key, *(child[KEY] for child in iter_nodes(node.get(CHILDREN) or []) if KEY in child)]


def expandable_keys(tree: Tree) -> list[str]:
    """Return the sorted keys of every node that has children."""
    return sorted(node[KEY] for node in iter_nodes(tree) if node.get(CHILDREN) and KEY in node)
