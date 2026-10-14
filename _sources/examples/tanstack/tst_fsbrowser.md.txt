# Filesystem browser - lazy loading from a real backend

```{image} /_static/media/tanstack/tst_fsbrowser_feature.webp
:alt: This repository browsed one directory at a time, with a log of what was read
:class: docs-media
```

```{note}
Shown as a screenshot rather than a live in-browser demo. This example walks the real repository directory tree with `pathlib`, and there is no repository in the Pyodide WASM filesystem, so it is excluded from the browser portfolio. Run it locally to try it. For a tree large enough to need the same machinery, without a disk behind it, see {doc}`tst_bigtree`.
```

**Source:** [`examples/panels/tanstack/table/tst_fsbrowser.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/tanstack/table/tst_fsbrowser.py)
**Test:** [`tests/panels/tanstack/table/examples/test_tst_fsbrowser.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/tanstack/table/examples/test_tst_fsbrowser.py)

A tree that does not exist until you look at it. The whole repository is handed over as a single node, `lazy_callback` reads one directory per twisty, and nothing is ever written back. This is the panel against a backend it does not own, which is what a database, an object store or a network share also looks like from here.

## Features on display

- **Lazy loading**: the whole repository starts as **one node** marked `lazy: True`. Opening a twisty calls `lazy_callback`, `pathlib` reads exactly one directory, and the row is `aria-busy` while it waits.
- **`batch()`**: "Preload 2 levels" fills every folder under the selected one. Each `set_children` is its own write; a batch makes them one push.
- **A load records no undo step** - it reveals part of the tree rather than changing it.
- **Read only, twice over**: `enable_dnd` is off so the browser never offers the gesture, and both Python hooks refuse anyway, so an intent built by hand is refused too.
- **`prune: "collapsed"`**: a folder nobody has opened crosses as a twisty and nothing more, so the wire carries the path you walked rather than the repository.
- **A log** naming every directory that was read, which is the whole conversation between the panel and the disk.

## The wiring

```python
def load_children(key: str, node: dict[str, Any]) -> list[dict[str, Any]]:
    """Answer the browser asking for a folder's contents."""
    loaded = read_dir(key)
    say(f"read `{key}`, {len(loaded)} entries")
    return loaded


def refuse(*_args: Any) -> bool:
    """Refuse every change, which is what read only means here."""
    return False


browser = TanstackTable(
    # One root, lazy. A hundred bytes of tree for a repository of any size.
    source=[
        {
            "key": ROOT_KEY,
            "title": ROOT.name,
            "type": "folder",
            "lazy": True,
            "size": "",
            "modified": stamp(ROOT),
        }
    ],
    columns=[
        {"id": "title", "header": "Name", "width": 320, "min_width": 180},
        {"id": "size", "header": "Size", "width": 110},
        {"id": "modified", "header": "Modified", "width": 150},
    ],
    types={"folder": FOLDER_TYPE, "file": FILE_TYPE},
    options={
        "aria_label": "Repository browser",
        "enable_dnd": False,
        "select_mode": "single",
        "show_checkboxes": False,
        "sort_folders_first": True,
        "prune": "collapsed",
        "toolbar": ["search"],
        "search_label": "Search what is loaded",
    },
    lazy_callback=load_children,
    action_callback=refuse,
    move_callback=refuse,
    sizing_mode="stretch_both",
)
```

Key points:

- The **key is the path relative to the root**, which is unique by construction and is also what the loader reads to know where to look. Nothing else about the filesystem crosses.
- `load_children` returns a list, which answers now. An application waiting on a network call would return `None` and call `set_children` when the call comes back.
- The preload wraps its walk in `with browser.batch():`, so a hundred `set_children` calls are one push of the tree.
- `expand-all` is deliberately absent from the toolbar: on a lazy tree it would mean "read the whole disk".
- Search reads only what is loaded. That is the honest cost of a lazy tree - Python cannot search a directory it has not read.

## How the test exercises it

Nothing here names a file, counts a directory or assumes a depth, because the example walks whatever repository it is run in. What is pinned down is the behaviour:

- **One lazy node**: the root carries `lazy: True` and no `children` at all, asserted without a browser.
- **One expand, one directory**: after clicking the root twisty, every folder underneath is still a twisty and the log names exactly one read.
- **One push per preload**: a `param.watch` on `source` counts a single event however many folders the preload reads.
- **No undo step**: `can_undo` is still false after a load.
- **Pruning**: a preload puts two levels into `source` and only the level that is open is in what crosses; every folder below it goes over as a twisty.

## See also

- {doc}`../../panels/tanstack_table` - the panel guide, including the large-tree notes
- {doc}`tst_bigtree` - the same machinery on a tree of up to a million nodes
- {doc}`tst_vfsexplorer_extfiledrop` - the same panel with every gesture turned on
- {doc}`tst_treegrid_columns` - columns and cell editors
