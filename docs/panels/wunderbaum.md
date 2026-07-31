# Wunderbaum

The `Wunderbaum` panel provides an interactive tree and tree-grid (table) widget, wrapping the [wunderbaum](https://mar10.github.io/wunderbaum/) JavaScript library.

```{image} /_static/media/wunderbaum/virtual_filesystem_overview.webp
:alt: Wunderbaum treegrid with drag-and-drop, context menu, and inline edit
:class: docs-media
```

## Overview

Wunderbaum renders large, nested data as a fast virtualised tree or a tree + table. It supports columns, checkboxes with tri-state parent propagation, drag-and-drop, right-click context menus, inline editing, and lazy (on-demand) loading of children.

## Basic Usage

Nodes are plain dicts. `title` and `key` are reserved; any other key becomes column data (`node.data`).

```python
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Documents",
        "key": "docs",
        "expanded": True,
        "children": [
            {"title": "report.pdf", "key": "docs/report"},
            {"title": "notes.txt", "key": "docs/notes"},
        ],
    },
    {"title": "config.yaml", "key": "config"},
]

tree = Wunderbaum(source=source)
```

## Treegrid (columns)

Add `columns` to switch to tree + table mode. Column values live at the node level (not inside a nested `data` dict); `type` is reserved by wunderbaum, so use another key for a "type" column.

```python
source = [
    {"title": "report.pdf", "key": "r", "size": "2.4 MB", "modified": "2024-01-10"},
]
columns = [
    {"id": "*", "title": "Name", "width": "250px"},
    {"id": "size", "title": "Size", "width": "100px"},
    {"id": "modified", "title": "Modified", "width": "120px"},
]

tree = Wunderbaum(source=source, columns=columns)
```

## Manipulation

```python
tree.add_node(parent_key="docs", node={"title": "new.txt", "key": "docs/new"})
tree.update_node("docs/new", {"title": "renamed.txt"})
tree.remove_node("docs/new")
tree.expand_node("docs", expanded=True)
tree.set_active_node("config")
tree.clear()

# Convenience helpers for file-tree style data
tree.add_folder(parent_key=None, key="src", title="src")
tree.add_file(parent_key="src", key="src/main.py", title="main.py")
```

## Context menu

Provide `context_menu_items` to show a right-click menu; the selected action arrives through the event callback so Python can add, rename, or delete nodes.

```python
tree = Wunderbaum(
    source=source,
    context_menu_items=[
        {"id": "add_child", "label": "Add Child"},
        {"id": "rename", "label": "Rename"},
        {"id": "delete", "label": "Delete"},
    ],
)
```

## Drag-and-drop

Dropping a node onto another reparents it; the Vue bridge reports the moved node id and its new parent so Python can update `source` to match. See {doc}`../examples/virtual_filesystem` for the full demo and {doc}`../examples/usecase_wunderbaum_visnetwork` for a tree kept in sync with a graph.

## Checkboxes and lazy loading

- **Checkboxes** with tri-state parent propagation: enable per node (`"checkbox": True`); checking a parent toggles its whole subtree (see {doc}`../examples/checkbox_tree`).
- **Lazy loading**: mark a node `"lazy": True` and load its children on demand when it is expanded (see {doc}`../examples/lazy_loading`).

## Options

Customise appearance and behaviour via `options` (passed to wunderbaum) and node `types`:

```python
tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "minExpandLevel": 1},
    types={"folder": {"icon": "bi bi-folder"}},
)
```

## API Reference

See the full API documentation: {py:class}`panelini.panels.wunderbaum.wunderbaum.Wunderbaum`
