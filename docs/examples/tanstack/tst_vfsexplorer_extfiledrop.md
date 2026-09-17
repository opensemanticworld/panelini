# VFS explorer - two panes and external file drop

```{image} /_static/media/tanstack/tst_vfsexplorer_extfiledrop_overview.webp
:alt: Two TanstackTable panes with cross-pane drag and a file dropped from the desktop
:class: docs-media
```

**Source:** [`examples/panels/tanstack/table/tst_vfsexplorer_extfiledrop.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/tanstack/table/tst_vfsexplorer_extfiledrop.py)
**Test:** [`tests/panels/tanstack/table/examples/test_tst_vfsexplorer_extfiledrop.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/tanstack/table/examples/test_tst_vfsexplorer_extfiledrop.py)

A virtual filesystem explorer, in two panes. `Documents` and `Staging` name the same `transfer_group`, so a row dragged out of either lands in the other, and both take files dragged in from the desktop - one reading the bytes, one reading the metadata only. This is the tree half of the panel: the shape changes constantly, and Python decides every change.

## Features on display

- **Toolbar and context menu** sharing the same relabelled `new-folder` and `new-file` entries, so both make the same two kinds of node.
- **Multiselect**: click, `Ctrl` click, `Shift` click. Only the checkbox cascades, and only under `select_mode: "hierarchy"`.
- **Drag and drop** inside a tree, and **across the two panes** via `transfer_group`. Holding `Ctrl` or `Alt` at the drop copies rather than moves, across the panes only.
- **Vetoes**: `Archive (read only)` refuses drops through `move_callback`, and new nodes, renames, deletes, pastes and file drops through `action_callback`.
- **External file drop**: `drop_files: "content"` on the left reads the bytes, `"meta"` on the right reads the name, size, MIME type and stamp only. `drop_accept` and `drop_max_bytes` decide what is taken, in Python.
- **The bytes never enter the tree.** They reach `event_callback` and stop there; the node keeps the name, the size and the MIME type.
- **Clipboard and history**: `Ctrl+X` / `C` / `V`, and `Ctrl+Z` that steps both panes back together after a transfer.
- **Icons** from `icon_for`, which maps a file extension onto a bundled glyph.
- Two live checkboxes toggle `show_checkboxes` and `menu` on both panes at runtime.

## The wiring

```python
NEW_FOLDER = {"id": "new-folder", "label": "New folder", "node": {**FOLDER, "children": []}}
NEW_FILE = {
    "id": "new-file",
    "label": "New file",
    "node": {"kind": "file", "icon": "file", "allow_children": False},
}


def allow_move(key: str, anchor_key: str, position: str) -> bool:
    """Veto anything that would land inside the read-only branch."""
    return not (position == "child" and anchor_key == LOCKED_KEY)


table = TanstackTable(
    source=source,
    columns=columns,
    options={
        "select_mode": "hierarchy",
        "enable_dnd": True,
        "expand_all": True,
        "aria_label": "Documents",
        "transfer_group": TRANSFER_GROUP,
        "toggle_on_click": True,
        "show_checkboxes": False,
        "menu": [],
        "toolbar": [
            "undo", "redo", "|",
            NEW_FOLDER, NEW_FILE, "rename", "delete", "|",
            "cut", "copy", "paste", "|",
            "move-up", "move-down", "outdent", "indent", "|",
            "expand-all", "collapse-all", "|",
            "select-all", "clear-selection", "search",
        ],
        "search_label": "Search name or kind",
        "new_key_prefix": "doc",
        "drop_files": "content",
        "drop_accept": [".pdf", ".csv", ".md", ".txt", "image/*"],
        "drop_max_bytes": 1_000_000,
        "drop_node": {"kind": "file"},
    },
    event_callback=partial(on_event, "explorer"),
    move_callback=allow_move,
    action_callback=allow_action,
    sizing_mode="stretch_both",
)
```

Key points:

- A **dict entry** in `toolbar` relabels one action and gives it a node template, so `new-folder` mints a folder here and could mint anything elsewhere. The label is also the new node's title.
- The second table (`staging`) shares the group but has **no vetoes**: it logs through `event_callback` and takes whatever the explorer will let go of, and the explorer's own hooks still decide what may leave it.
- Nodes never travel through the browser. The drag carries the group, the source pane's id and the keys; the receiving table reads the nodes out of the other one **in Python**.
- `on_event` reports `activate`, `move`, `transfer`, `drop_files`, `add`, `rename`, `delete`, `cut`, `copy` and `paste`, reading from each payload whatever that event carries: `key` for an `activate`, `applied` and `applied_keys` where the intent sets them.

## How the test exercises it

- **Both panes serve** and ask for different halves of one drop (`content` versus `meta`), sharing one `transfer_group`.
- **Cross-pane drag**: dragging `invoice.pdf` onto `Scratch` puts it in `staging.source` and takes it out of `table.source`, and the arrival is logged by the pane that placed it.
- **File drop**: a dropped `plan.md` becomes a node carrying `size`, `mime` and the `drop_node` template, with **no `content` key in the tree**.
- **Refusals**: a file over `drop_max_bytes` comes back `(size)`, a `.zip` on the left comes back `(type)` while the right pane takes it and reads nothing, and a drop onto `Archive (read only)` is refused by `action_callback`.
- **One drop, one step**: three files dropped together are a single change, so one `undo()` takes all three back and leaves `can_undo` false.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/tanstack/tst_vfsexplorer_extfiledrop.html" title="VFS explorer - two panes and external file drop" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/tanstack/tst_vfsexplorer_extfiledrop.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/tanstack_table` - the panel guide
- {doc}`tst_treegrid_columns` - columns and cell editors on a tree that never reshapes
- {doc}`tst_bigtree` - what a large tree costs, from one node to a million
- {doc}`tst_fsbrowser` - the same panel over a real directory tree
