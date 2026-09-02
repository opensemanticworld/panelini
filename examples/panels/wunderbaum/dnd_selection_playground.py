"""Drag-and-drop vs. selection playground, in tree+table mode.

Selection follows Windows Explorer: a plain click replaces the selection,
ctrl+click toggles one row, shift+click takes the range from the anchor, and
ctrl+shift+click adds that range to what is already selected. A checkbox is not
a separate state, it is another display of the selection and another way to add
to or remove from it.

Three treegrids side by side, same source, different selection setup:

- ``multi`` - checkbox on, ``selectMode: "multi"``. The recommended setup.
  Checking a folder checks its children; checking every child leaves the folder
  itself unchecked.
- ``hier`` - checkbox on, ``selectMode: "hier"``. Adds wunderbaum's upward
  propagation, so checking every child also checks the folder.
- ``plain`` - no checkbox, ``selectMode: "multi"``. Same selection, shown only
  as a row highlight.

Every tree event is appended to the log at the bottom with its full key
payload, so single vs. multi drags and same-tree vs. cross-tree drops can be
told apart. Ctrl+drag copies instead of moving (Option on macOS); the panel
reports such a drop and leaves the tree untouched, so ``_perform_copy`` below
inserts the duplicates, which is the application's job in a real app.
"""

import copy
import itertools
import json

import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

SOURCE = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "icon": "bi bi-folder",
        "kind": "folder",
        "size": "",
        "children": [
            {"title": "File 1", "key": "a/1", "icon": "bi bi-file-earmark", "kind": "file", "size": "4.2 KB"},
            {"title": "File 2", "key": "a/2", "icon": "bi bi-file-earmark", "kind": "file", "size": "1.1 KB"},
            {"title": "File 3", "key": "a/3", "icon": "bi bi-file-earmark", "kind": "file", "size": "812 B"},
        ],
    },
    {
        "title": "Folder B",
        "key": "b",
        "expanded": True,
        "icon": "bi bi-folder",
        "kind": "folder",
        "size": "",
        "children": [
            {"title": "File 4", "key": "b/4", "icon": "bi bi-file-earmark", "kind": "file", "size": "16 KB"},
        ],
    },
]

COLUMNS = [
    {"id": "*", "title": "Name", "width": "200px"},
    {"id": "kind", "title": "Kind", "width": "70px"},
    {"id": "size", "title": "Size", "width": "80px"},
]

KEY_FIELDS = (
    "key",
    "keys",
    "sourceKey",
    "sourceKeys",
    "targetKey",
    "region",
    "copy",
    "movedNodeIds",
    "copiedNodeIds",
    "source_tree_id",
    "source_keys",
    "target_key",
)

log_lines: list[str] = []
event_log = pn.pane.Markdown("*No events yet - drag something.*", sizing_mode="stretch_width")


def _log(tree_id: str, name: str, params: dict) -> None:
    shown = {k: params[k] for k in KEY_FIELDS if k in params}
    log_lines.insert(0, f"- `{tree_id}` **{name}** - {shown}")
    del log_lines[20:]
    event_log.object = "\n".join(log_lines)


_copy_counter = itertools.count(1)


def _locate(nodes: list[dict], key: str) -> tuple[list[dict], int] | None:
    """The child list holding *key* and the index of *key* within it."""
    for i, node in enumerate(nodes):
        if node["key"] == key:
            return nodes, i
        found = _locate(node.get("children", []), key)
        if found:
            return found
    return None


def _rekey(node: dict, suffix: str) -> None:
    """Give a cloned subtree fresh keys, and drop any selection it carried."""
    node["key"] = f"{node['key']}{suffix}"
    node.pop("selected", None)
    for child in node.get("children", []):
        _rekey(child, suffix)


def _perform_copy(tree: Wunderbaum, params: dict) -> None:
    """Insert the copies the panel reported but deliberately did not make.

    On a copy-drag the panel emits the event and puts the dragged node back
    where it was, leaving the actual duplication to the application - keys are
    the app's to mint. This is that half, for one plausible key scheme.
    """
    # Round-trip through JSON, not copy.deepcopy. In a live session
    # ``tree.source`` is a Bokeh property wrapper that holds back-references to
    # the document, so deepcopying it walks into the server's IOLoop and raises
    # RuntimeError. The source is JSON on the wire anyway.
    source = json.loads(json.dumps(tree.source))
    located = _locate(source, params["targetKey"])
    if located is None:
        return
    siblings, index = located
    region = params["region"]

    if region in ("over", "appendChild", "prependChild"):
        target_node = siblings[index]
        dest = target_node.setdefault("children", [])
        at = 0 if region == "prependChild" else len(dest)
        target_node["expanded"] = True
    else:
        dest = siblings
        at = index if region == "before" else index + 1

    for offset, key in enumerate(params.get("sourceKeys", [])):
        found = _locate(source, key)
        if found is None:
            continue
        original_siblings, original_index = found
        clone = copy.deepcopy(original_siblings[original_index])
        clone["title"] = f"{clone['title']} (copy)"
        _rekey(clone, f"-c{next(_copy_counter)}")
        dest.insert(at + offset, clone)

    tree.source = source


def _callback(tree_id: str):
    def handler(name: str, params: dict) -> None:
        _log(tree_id, name, params)
        if name == "drop" and params.get("copy"):
            tree = TREES.get(tree_id)
            if tree is not None:
                _perform_copy(tree, params)

    return handler


def _make_tree(tree_id: str, options: dict) -> Wunderbaum:
    return Wunderbaum(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options=options,
        tree_id=tree_id,
        tree_event_callback=_callback(tree_id),
        height=280,
    )


tree_multi = _make_tree("multi", {"dnd": True, "checkbox": True, "selectMode": "multi"})
tree_hier = _make_tree("hier", {"dnd": True, "checkbox": True, "selectMode": "hier"})
tree_plain = _make_tree("plain", {"dnd": True, "selectMode": "multi"})

# Looked up by id inside the event handler, which is built before the trees are.
TREES: dict[str, Wunderbaum] = {"multi": tree_multi, "hier": tree_hier, "plain": tree_plain}


def _panel(title: str, subtitle: str, tree: Wunderbaum) -> pn.Column:
    return pn.Column(
        pn.pane.Markdown(f"### {title}\n{subtitle}"),
        tree,
        sizing_mode="stretch_width",
    )


reset_btn = pn.widgets.Button(label="Reset all three trees", button_type="primary", width=200)


def _reset(*_: object) -> None:
    for tree in (tree_multi, tree_hier, tree_plain):
        tree.source = copy.deepcopy(SOURCE)
    log_lines.clear()
    event_log.object = "*Reset.*"


reset_btn.on_click(_reset)

INSTRUCTIONS = """
### Selection

In any of the three trees:

1. Click `File 1`, then click `File 3`. Only File 3 stays selected.
2. Click `File 1`, then ctrl+click `File 3`. Both. Ctrl+click again to drop one.
3. Click `File 1`, then shift+click `File 3`. All three files.
4. Click `File 1`, shift+click `File 2`, then ctrl+shift+click `File 4`.
   The second range is added instead of replacing the first.
5. In `multi` and `hier`, tick a checkbox instead of ctrl+clicking. Same result,
   same row highlight - the checkbox is a display of the selection.

### Propagation

6. Check `Folder A`. All three files are checked too, in both `multi` and
   `hier`.
7. Uncheck everything, then check `File 1`, `File 2` and `File 3` one by one.
   In `multi`, `Folder A` stays unchecked. In `hier` it checks itself, which is
   what that mode is for.

### Drag

Watch the log for the `sourceKeys` each drag reports.

8. Check `File 1` and `File 2`, drag `File 1` to `Folder B`. Both move.
9. Check `Folder A`, drag any of its rows to `Folder B`. The folder moves as
   one node, children along with it.
10. With case 7's state in `multi`, drag `File 1` to `Folder B`. All three files
    move and `Folder A` stays. In `hier` the folder moves instead.
11. Drag an unselected row. It selects itself first and travels alone.

### Drop position

A row is split into three bands: top quarter inserts before, bottom quarter
inserts after, the middle half drops into the row.

12. Drag `File 4` onto the **bottom edge** of the expanded `Folder A`. It
    becomes the folder's first child. The arrow is drawn in the gap above
    `File 1`, so that is where the node now lands - it used to become a
    root-level sibling of `Folder A` instead.
13. Collapse `Folder A` and repeat, without lingering. Now the bottom edge does
    mean "sibling of `Folder A`", because there is no first child below it to
    confuse it with. Dropping on the row itself still puts the node inside.
    Hover for more than `autoExpandMS` (1.5 s) and wunderbaum expands the
    folder under the cursor, after which case 12 applies again - the children
    are on screen by then, so the bottom edge points at the first-child slot.
14. Drag `File 1` onto the **top edge** of its own parent `Folder A`. It leaves
    the folder and lands above it at root level. This used to be refused.
15. Drag `File 1` onto the middle of `Folder A`. Nothing happens - it is already
    in that folder, so there is no move to make.

### Copy

Ctrl+drag copies instead of moving, Option+drag on macOS. Hold the key before
you start dragging and the cursor badge turns from move to copy.

16. Ctrl+drag `File 3` onto `Folder B`. `File 3 (copy)` appears there and the
    original stays put.
17. Check `File 1` and `File 2`, then ctrl+drag `File 1` onto the top edge of
    `File 4`. Both copies land above it, in order.
18. Ctrl+drag `Folder A` onto `Folder B`. The children come along, each with a
    fresh key.

The panel itself never inserts these copies. It reports the drop with
`copy: true`, `sourceKeys`, `region` and `newParentNodeId`, then puts the
dragged node back - minting keys is the application's job. `_perform_copy` in
this file is one way to do that half.

**Across trees**, drag from any tree into another. The receiver emits
`externalDrop` with `source_keys` and moves nothing on its own.
"""

app = Panelini(title="Wunderbaum DnD / Selection Playground", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            _panel("multi", "`checkbox` + `selectMode: multi`", tree_multi),
            _panel("hier", "`checkbox` + `selectMode: hier`", tree_hier),
            _panel("plain", "no checkbox, `selectMode: multi`", tree_plain),
            sizing_mode="stretch_width",
        ),
        reset_btn,
        pn.Row(
            pn.Card(
                title="Event log (newest first)",
                objects=[event_log],
                sizing_mode="stretch_width",
            ),
            pn.Card(
                title="Instructions",
                objects=[pn.pane.Markdown(INSTRUCTIONS)],
                sizing_mode="stretch_width",
            ),
            sizing_mode="stretch_width",
        ),
    ]
)
app.servable()

if __name__ == "__main__":
    pn.io.server.serve(app, port=5012)
