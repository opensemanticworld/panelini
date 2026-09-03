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
from collections.abc import Container, Iterable, Iterator, Mapping, Sequence
from typing import Any

Node = dict[str, Any]
Tree = list[Node]
#: Node type registry: a type name mapped onto the fields its nodes take by default.
Types = Mapping[str, Any]

KEY = "key"
CHILDREN = "children"
#: Node field naming an entry of the ``icons`` param.
ICON = "icon"
#: Node flag. Set it to False to make a node a leaf that can never gain children,
#: which is how a file is told apart from an empty folder.
ALLOW_CHILDREN = "allow_children"
#: Node field naming an entry of the ``types`` param, whose fields the node then
#: takes for every one it does not set itself.
TYPE = "type"
#: Node flag. Set it to True for a branch whose children are not loaded: it shows a
#: twisty although it holds no children, and expanding it asks for them.
LAZY = "lazy"
#: Fields a type entry never supplies. A type that could name keys would be naming
#: nodes it cannot see, and one that could bring children would put the same
#: subtree in the tree once per node of that type.
UNTYPED = (KEY, CHILDREN)

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


def set_children(tree: Tree, key: str, children: Tree) -> Tree | None:
    """Fill a lazy branch and stop it being lazy.

    The children replace whatever the node held rather than joining it, because a
    load answers for the whole branch. ``lazy`` is dropped whether the answer
    brought anything or not: a branch that loaded and turned out to be empty is
    loaded, and asking again would only find it empty a second time.

    Returns:
        A new tree, or None when the key is not in the tree.
    """
    result = copy.deepcopy(tree)
    node = find_node(result, key)
    if node is None:
        return None
    node[CHILDREN] = copy.deepcopy(list(children))
    node.pop(LAZY, None)
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


def resolve_node(node: Node, types: Types | None = None) -> Node:
    """Return ``node`` with the fields of its type filled in underneath it.

    A node names a type and takes every field of that entry it does not set
    itself, so a tree of a thousand files declares ``allow_children`` and an icon
    once rather than a thousand times. The node always wins, which is what makes
    the registry a set of defaults rather than a second owner of the data.

    Nothing is written back. The type is resolved wherever a field is read, here
    and again in the browser, so ``source`` keeps the type name alone and the wire
    saving is real.

    Args:
        node: Node to read.
        types: Registry as ``{type name: {field: value}}``, or None for no types.

    Returns:
        A merged dict, or ``node`` itself when nothing applies, which is what
        keeps this cheap on a tree that names no types. Read it rather than
        mutate it: the cheap case hands back the node in the tree.
    """
    if not types or not isinstance(node, dict):
        return node
    entry = types.get(node.get(TYPE))
    if not isinstance(entry, dict):
        return node
    defaults = {name: value for name, value in entry.items() if name not in UNTYPED}
    return {**defaults, **node} if defaults else node


def accepts_children(tree: Tree, key: str, types: Types | None = None) -> bool:
    """Return whether ``key`` may hold children.

    Any node may, unless it carries ``allow_children: False`` itself or takes it
    from its type. Absence of a ``children`` list is deliberately not enough: an
    empty folder is still a folder, so the distinction has to be declared rather
    than inferred.
    """
    node = find_node(tree, key)
    return node is not None and resolve_node(node, types).get(ALLOW_CHILDREN, True) is not False


def apply_move(tree: Tree, key: str, anchor_key: str, position: str, types: Types | None = None) -> Tree | None:
    """Move ``key`` next to or under ``anchor_key``.

    Args:
        tree: Tree to copy from.
        key: Key of the node being moved.
        anchor_key: Key the node lands next to or inside.
        position: One of :data:`POSITIONS`.
        types: Optional node type registry, so an anchor that refuses children
            through its type refuses this drop as one refusing them itself does.

    Returns:
        A new tree, or None when the move is rejected or would change nothing.
        Rejected covers an unknown position, an unknown key, dropping a node onto
        itself, dropping a node into its own subtree, and dropping a node into an
        anchor that does not accept children.
    """
    if position not in POSITIONS or key == anchor_key:
        return None
    if find_node(tree, key) is None or find_node(tree, anchor_key) is None:
        return None
    if is_descendant(tree, anchor_key, key):
        return None
    if position == "child" and not accepts_children(tree, anchor_key, types):
        return None

    pruned, node = remove_key(tree, key)
    if node is None:
        return None

    if position == "child":
        result = insert_child(pruned, anchor_key, node)
    else:
        result = insert_sibling(pruned, anchor_key, node, before=position == "before")

    return None if result == tree else result


def prune_redundant_keys(tree: Tree, keys: Sequence[str]) -> list[str]:
    """Drop keys that another key in the list already carries.

    Selecting a folder and something inside it and then dragging both means the
    child travels with its parent, so moving it a second time would be wrong.
    Order and the first occurrence of each key are preserved.
    """
    unique = list(dict.fromkeys(keys))
    return [key for key in unique if not any(other != key and is_descendant(tree, key, other) for other in unique)]


def apply_moves(
    tree: Tree,
    keys: Sequence[str],
    anchor_key: str,
    position: str,
    types: Types | None = None,
) -> tuple[Tree, list[str]]:
    """Move several nodes to the same place, keeping their relative order.

    The first node lands where the drop asked for, and each later one lands after
    the previous, which is what keeps a multi-row drag from arriving reversed or
    scattered.

    The batch is validated as a whole first: if the anchor sits inside any of the
    dragged subtrees, or does not accept children, nothing moves. A partial result
    there would leave the tree in a shape nobody asked for.

    Args:
        tree: Tree to copy from.
        keys: Keys of the nodes being moved, in display order.
        anchor_key: Key the nodes land next to or inside.
        position: One of :data:`POSITIONS`.
        types: Optional node type registry, passed on to every move in the batch.

    Returns:
        ``(tree, moved_keys)``. On rejection this is the original tree and an
        empty list, so the caller can tell "nothing happened" from "some moved".
    """
    ordered = [key for key in prune_redundant_keys(tree, keys) if find_node(tree, key) is not None]
    if not ordered or position not in POSITIONS or find_node(tree, anchor_key) is None:
        return tree, []
    if any(anchor_key == key or is_descendant(tree, anchor_key, key) for key in ordered):
        return tree, []
    if position == "child" and not accepts_children(tree, anchor_key, types):
        return tree, []

    current = tree
    anchor, pos = anchor_key, position
    moved: list[str] = []
    for key in ordered:
        result = apply_move(current, key, anchor, pos, types)
        if result is not None:
            current = result
            moved.append(key)
        # Advance even when the node was already in place, so the rest of the
        # batch still lands after it rather than jumping back to the anchor.
        anchor, pos = key, "after"
    return current, moved


def new_key(tree: Tree, prefix: str = "node") -> str:
    """Mint a key that no node in the tree carries yet.

    Deterministic and gap filling: the lowest free ``<prefix>-<n>`` wins, so the
    key a given tree produces is the same on every run and tests do not have to
    match a uuid. Reusing the number of a deleted node is safe because the key
    sets are pruned with it.

    Args:
        tree: Tree the key has to be unique within.
        prefix: Leading part of the key.

    Returns:
        A key of the form ``<prefix>-<n>`` with ``n`` starting at 1.
    """
    taken = {node.get(KEY) for node in iter_nodes(tree)}
    index = 1
    while f"{prefix}-{index}" in taken:
        index += 1
    return f"{prefix}-{index}"


def rekey_subtree(tree: Tree, node: Node, prefix: str = "node") -> Node:
    """Deep copy ``node`` and give every node in it a key the tree does not carry.

    A pasted copy is a new node rather than a second reference to an old one, so
    the whole subtree is re-keyed. Keys are minted against the tree plus the ones
    already handed out in this call, which is what lets a folder and its files be
    copied in one go without two of them colliding.

    Args:
        tree: Tree the new keys have to be unique within.
        node: Node to copy, along with everything below it.
        prefix: Leading part of every minted key.

    Returns:
        A deep copy carrying fresh keys. Nothing else about the nodes changes, so
        titles, icons and the ``allow_children`` flag travel with the copy.
    """
    taken = {key for key in (found.get(KEY) for found in iter_nodes(tree)) if key is not None}
    index = 1

    def mint() -> str:
        nonlocal index
        while f"{prefix}-{index}" in taken:
            index += 1
        key = f"{prefix}-{index}"
        taken.add(key)
        return key

    result = copy.deepcopy(node)
    for found in iter_nodes([result]):
        found[KEY] = mint()
    return result


def subtree_keys(tree: Tree, key: str) -> list[str]:
    """Return ``key`` plus the keys of everything below it, or an empty list."""
    node = find_node(tree, key)
    if node is None:
        return []
    return [key, *(child[KEY] for child in iter_nodes(node.get(CHILDREN) or []) if KEY in child)]


def expandable_keys(tree: Tree) -> list[str]:
    """Return the sorted keys of every node that has children."""
    return sorted(node[KEY] for node in iter_nodes(tree) if node.get(CHILDREN) and KEY in node)


def ancestor_keys(tree: Tree, keys: Iterable[str]) -> set[str]:
    """Return the keys of every node above any of ``keys``.

    The keys themselves are not included, so a caller can ask for the path to a
    node without also asking for the node's own subtree.

    Args:
        tree: Tree to walk.
        keys: Keys to find the paths to. Keys not in the tree contribute nothing.

    Returns:
        The set of ancestor keys, empty when nothing was found.
    """
    wanted = set(keys)
    if not wanted:
        return set()

    found: set[str] = set()

    def visit(nodes: Tree, path: list[str]) -> None:
        for node in nodes:
            key = node.get(KEY)
            named = key if isinstance(key, str) else None
            if named is not None and named in wanted:
                found.update(path)
            children = node.get(CHILDREN)
            if children:
                visit(children, [*path, named] if named is not None else path)

    visit(tree, [])
    return found


def matching_keys(tree: Tree, text: str, fields: Sequence[str], types: Types | None = None) -> set[str]:
    """Return the keys of every node one of whose ``fields`` contains ``text``.

    This is the browser's own search written in Python: it reads the same fields
    the rendered columns read, resolved through the same type registry, and
    compares them the same case insensitive way. It exists so that a tree the
    panel pruned can still be searched, which means the two have to agree. A
    field the browser would render as empty matches nothing here either.

    Args:
        tree: Tree to search.
        text: Search text. Empty or blank matches nothing rather than everything,
            because an empty search is not a search.
        fields: Node fields to read, which are the columns' ``field`` names, or
            ``title`` alone in tree-only mode.
        types: Registry the fields are resolved through.

    Returns:
        The set of matching keys.
    """
    needle = text.strip().lower()
    if not needle or not fields:
        return set()

    found: set[str] = set()
    for node in iter_nodes(tree):
        key = node.get(KEY)
        if key is None:
            continue
        resolved = resolve_node(node, types)
        if any(needle in str(resolved.get(field) or "").lower() for field in fields):
            found.add(key)
    return found


def prune(tree: Tree, keep: Container[str]) -> Tree:
    """Return the tree with the children of every branch outside ``keep`` dropped.

    A branch that loses its children is marked ``lazy``, which is the flag a
    branch whose children were never loaded already carries: it keeps its twisty,
    and expanding it asks for what is missing. There is deliberately no second
    concept for a branch that was pruned rather than never loaded, because from
    the browser's side the two are the same thing.

    A branch is only pruned when it is outside ``keep`` **and** its parent chain
    is inside it, since a node whose parent was pruned is not in the result at all
    and cannot be asked about. Callers should therefore pass a ``keep`` that is
    closed under ancestry; :func:`ancestor_keys` is how that closure is built.

    Nodes that are neither pruned nor on the path to one are shared with the input
    rather than copied. Everything in this module treats a tree as immutable and
    copies before it writes, so the sharing is safe, and it is what keeps deriving
    this from a large tree cheap enough to do on every push.

    Args:
        tree: Tree to derive from.
        keep: Keys whose children are sent whole.

    Returns:
        A new tree, no deeper than ``keep`` reaches.
    """
    result: Tree = []
    for node in tree:
        children = node.get(CHILDREN)
        key = node.get(KEY)
        if not children:
            result.append(node)
        elif isinstance(key, str) and key in keep:
            result.append({**node, CHILDREN: prune(children, keep)})
        else:
            pruned = {**node, LAZY: True}
            del pruned[CHILDREN]
            result.append(pruned)
    return result
