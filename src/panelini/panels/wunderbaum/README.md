# Wunderbaum Panel

Interactive tree and treegrid component using the
[wunderbaum](https://github.com/mar10/wunderbaum) library.

## Components

- **Wunderbaum**: tree/treegrid component with lazy loading, drag-and-drop,
  inline editing, checkboxes and a context menu

Two display modes:

- Tree-only (default): when `columns` is empty
- Tree+table: when `columns` is provided, giving a treegrid with resizable columns

## Building the Vue Component

The bundled assets in `vue/dist/` are committed, and no CI job rebuilds them, so
rebuild and commit them whenever you change anything under `vue/src/`:

```bash
cd vue
npm install
npm run build
```

This regenerates:

- `vue/dist/wunderbaum_vue.mjs` - ES module bundle
- `vue/dist/wunderbaum_vue.css` - compiled styles

Vite 5 needs Node 18, 20 or 22 (24 also works). The bundle is minified, so even a
small source edit shifts identifier names throughout and produces a large diff.
That is expected.

## Usage

### Basic tree

```python
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "children": [
            {"title": "File 1", "key": "a/1"},
        ],
    },
]

tree = Wunderbaum(source=source)
tree.servable()
```

### With event callbacks

```python
def on_tree_event(event_name, event_params):
    print(f"Event: {event_name}", event_params)

tree = Wunderbaum(source=source, tree_event_callback=on_tree_event)
```

### Drag and drop between two trees

Give each tree a `tree_id`. A tree that receives a drag started in another tree
emits an `externalDrop` event carrying the originating tree's id:

```python
features = Wunderbaum(source=feature_nodes, options={"dnd": True}, tree_id="features")
compounds = Wunderbaum(source=compound_nodes, options={"dnd": True}, tree_id="compounds",
                       tree_event_callback=on_tree_event)

# on_tree_event receives:
# ("externalDrop", {"external": True, "source_tree_id": "features",
#                   "source_keys": ["fg/1"], "target_key": "c/7", "region": "over"})
```

`source_keys` is a list: dragging a selected node drags the whole selection, and
dragging an unselected one selects it first and drags it alone. Dropping does
not move anything by itself. What happens to either tree is the callback's
decision.

A drag that stays inside one tree emits `drop` instead, and moves the nodes
itself. It carries the same selection under `sourceKeys`, next to the scalar
`sourceKey` of the node actually grabbed:

```python
# ("drop", {"sourceKey": "a/1", "sourceKeys": ["a/1", "a/2"], "targetKey": "b",
#           "region": "appendChild", "movedNodeId": "a/1",
#           "movedNodeIds": ["a/1", "a/2"], "newParentNodeId": "b"})
```

Ctrl+drag sends `copy: True` with `copiedNodeId`/`copiedNodeIds` instead, and
moves nothing - the copy is the callback's job. macOS uses Option instead of
Ctrl, following Finder, where Command means a forced move. Nodes that cannot
be moved are dropped from the set: a node whose ancestor is dragged with it,
any drop onto the selection itself, and any move that would change nothing
(into the folder a node already sits in, or before its own next sibling). If
that leaves nothing, no `drop` is emitted.

### Drop position

A row is split into three bands. The top quarter inserts before it, the bottom
quarter after it, and the middle half drops into it. The reported `region` is
`"before"`, `"after"`, `"appendChild"` or `"prependChild"`.

On an **expanded** parent the bottom band is drawn in the gap above the first
child, so that is where the node lands: the region becomes `prependChild`
rather than a sibling of the parent two indent levels away. On a **collapsed**
parent there is nothing below it to be confused with, so the bottom band keeps
its plain meaning and inserts a sibling. Cross-tree `externalDrop` reports the
same remapped region, so a callback that performs the move itself lands in the
slot the user saw the arrow point at.

One consequence worth knowing: hovering a collapsed folder for longer than
`autoExpandMS` (1.5 s by default) expands it mid-drag, and from that moment its
bottom band follows the expanded rule. Dwell time changes the result.

A node may be dropped before or after its own parent's row - that is a reparent
to the level above, and the panel switches wunderbaum's `preventVoidMoves` off
to allow it, checking for genuine no-ops itself instead.

### Selection

Selection follows Windows Explorer:

| Gesture | Effect |
| --- | --- |
| click | replaces the selection with that row |
| ctrl+click | adds or removes that row |
| shift+click | replaces the selection with the range from the anchor |
| ctrl+shift+click | adds that range to the selection |

The anchor is the last row selected without shift, so a shift range can be
resized without re-anchoring. Ranges follow what is on screen: children of a
collapsed node are not part of a range that spans it.

A checkbox is not a second state. It is another display of the same selection
and another way to add to or remove from it, so `checkbox: True` changes what
the tree looks like, not how it behaves.

Selecting a row selects its whole subtree, so checking a folder checks its
children. Selecting every child does *not* select the parent. That is why the
default `selectMode: "multi"` is the mode to use; `"hier"` adds wunderbaum's own
upward propagation on top, which checks the parent as soon as all of its
children are checked.

Selection is reported per node through the `select` event, and mirrors into
`tree.source` as a `selected` key on each selected node. Drive it from Python
with `tree.select_node(key, True)`.

Dragging reads the selection, and a selected folder stands in for its selected
children: grabbing any row of a selected folder drags that folder as one node.

### Filtering

```python
tree.filter_nodes("report", {"mode": "hide", "autoExpand": True})
tree.clear_filter()
```

Tree actions are one-way, so the match count arrives as a `filter` event with
`{"filter": "report", "matches": 2}`.

## Features

- Tree and treegrid modes
- Lazy loading, with sync or async Python callbacks
- Drag and drop within a tree (move, and ctrl+drag to copy, option+drag on
  macOS) and between trees
- Drag and drop of external files onto the tree
- Inline title editing
- Windows Explorer selection (click, ctrl+click, shift+click, ctrl+shift+click),
  optionally displayed as checkboxes
- Context menu
- Incremental updates (`add_node`, `remove_node`, `move_node`, `batch_update`)
- Filtering driven from Python

## Feature Wishlist

- Column sorting, which needs a JS callback across the JSON param boundary
- HTML in cells, currently blocked because cell rendering uses `textContent`
