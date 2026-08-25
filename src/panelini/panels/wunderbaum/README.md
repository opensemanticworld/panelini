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

`source_keys` is a list: with `selectMode: "multi"`, dragging a selected node
drags the whole selection. Dropping does not move anything by itself. What
happens to either tree is the callback's decision.

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
- Drag and drop within a tree (move, and ctrl+drag to copy) and between trees
- Drag and drop of external files onto the tree
- Inline title editing
- Checkboxes and multi-select
- Context menu
- Incremental updates (`add_node`, `remove_node`, `move_node`, `batch_update`)
- Filtering driven from Python

## Feature Wishlist

- Column sorting, which needs a JS callback across the JSON param boundary
- HTML in cells, currently blocked because cell rendering uses `textContent`
