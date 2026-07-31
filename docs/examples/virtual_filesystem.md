# Virtual filesystem - the full demo

**Source:** [`examples/panels/wunderbaum/virtual_filesystem.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/virtual_filesystem.py)
**Test:** [`tests/panels/wunderbaum/examples/test_virtual_filesystem.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_virtual_filesystem.py)

The kitchen-sink example: a multi-root filesystem browser combining nearly every Wunderbaum feature - columns, checkboxes, context menu, drag-and-drop, inline rename, external file drop, and programmatic manipulation from Python buttons. An in-memory dict is the backend.

## Features on display

- **Multiple root mounts** (`/home`, `/tmp`) with folder/file icons.
- **Columns**: name, size, modified date (tree + table mode).
- **Context menu** (right-click): New Folder, New File, Delete, Delete Checked.
- **Checkboxes** + a "Delete Checked" batch action.
- **Drag-and-drop** to move nodes, **F2 / click** to rename inline.
- **External file drop** onto the tree via `file_drop_callback`.
- **Python API buttons** for add-folder / add-file / delete by key.

## The wiring

```python
tree = Wunderbaum(
    source=fs_to_tree_source(),
    columns=columns,
    context_menu_items=[
        {"id": "new_folder", "label": "New Folder", "icon": "bi bi-folder-plus"},
        {"id": "new_file", "label": "New File", "icon": "bi bi-file-earmark-plus"},
        {"id": "delete", "label": "Delete", "icon": "bi bi-trash"},
        {"id": "delete_checked", "label": "Delete Checked", "icon": "bi bi-trash-fill"},
    ],
    options={
        "checkbox": True,
        "dnd": True,
        "edit": {"trigger": ["clickActive", "F2"]},
    },
    tree_event_callback=on_tree_event,
    file_drop_callback=on_file_drop,
)
```

Key points:

- `fs_to_tree_source()` converts a flat `{path: info}` dict into a nested tree - the canonical "adapt your data model to a `source`" pattern.
- `options` enables the interactive features: `checkbox`, `dnd`, and `edit` (with rename triggers).
- `on_tree_event` dispatches on `event_name` - `contextmenu`, `activate`, `drop`, `edit.apply` - and mutates the tree with `add_folder`, `add_file`, `remove_node`, or a `batch_update` for "Delete Checked".
- `file_drop_callback` receives dropped files and adds them under the target node.
- A `tree.param.watch(..., ["source"])` keeps a live "Checked" display in sync.

## How the test exercises it

The test file is the broadest in the suite:

- **Render**: rows and column headers appear.
- **Python API**: clicking "Add Folder" / "Add File" creates the node; `tree.remove_node(...)` removes it.
- **Drag-and-drop**: dragging `document.txt` onto `/tmp` moves it (asserted on both server `tree.source` and client children) and leaves no duplicate.
- **Context menu**: `test_context_menu_visible` is marked `xfail` - dispatching a `contextmenu` event through the shadow DOM is unreliable under Playwright, so it is expected to fail rather than flake.

## See also

- {doc}`wunderbaum_table_min` - the columns foundation
- {doc}`checkbox_tree` - the checkbox / selection mechanics on their own
- {doc}`context_menu` - the context-menu callback in isolation
