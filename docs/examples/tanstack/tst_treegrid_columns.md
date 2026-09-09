# Treegrid - columns and cell editors

```{image} /_static/media/tanstack/tst_treegrid_columns_overview.webp
:alt: TanstackTable treegrid with five columns, sorting, and inline cell editors
:class: docs-media
```

**Source:** [`examples/panels/tanstack/table/tst_treegrid_columns.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/tanstack/table/tst_treegrid_columns.py)
**Test:** [`tests/panels/tanstack/table/examples/test_tst_treegrid_columns.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/tanstack/table/examples/test_tst_treegrid_columns.py)

A service inventory: regions, sites and the services under them. The tree's shape never changes here - no drag, no add, no delete. What changes is the cells, so this is the grid half of the panel on its own: one column per editor kind, node types supplying defaults, and a veto that keeps computed rows read only.

## Features on display

- **Five columns**, one per editor kind: `Status` a **select**, `Instances` a **number** with `step`, `min` and `max`, `Owner` a **text** box, `Monitored` a **checkbox**, plus the tree column.
- **Sorting** cycles ascending, descending, then the tree's own order. `Monitored` declines with `sortable: False`.
- **`sort_folders_first`** keeps sites and regions above services at every level.
- **Resizing** bounded by `min_width` / `max_width`; `Monitored` declines with `resizable: False`.
- **Node types**: `region`, `site` and `service` supply `icon`, `allow_children` and even a column value (`monitored`), and a node always wins over its type.
- **A refused edit** on a group row reopens the editor holding what was typed, marked `aria-invalid`.
- **Roll-up arithmetic** written straight onto `source`, so one `Ctrl+Z` reaches the edit rather than the totals.

## The wiring

```python
columns = [
    {"id": "title", "header": "Service", "width": 240, "min_width": 160},
    {
        "id": "status",
        "header": "Status",
        "width": 130,
        "min_width": 100,
        "editable": True,
        "editor": "select",
        "choices": STATUSES,
    },
    {
        "id": "instances",
        "header": "Instances",
        "width": 110,
        "editable": True,
        "editor": "number",
        "step": 1,
        "min": 0,
        "max": 64,
    },
    {"id": "owner", "header": "Owner", "width": 150, "editable": True, "max_width": 260},
    {
        "id": "monitored",
        "header": "Monitored",
        "width": 110,
        "editable": True,
        "editor": "checkbox",
        "sortable": False,
        "resizable": False,
    },
]

table = TanstackTable(
    source=source,
    columns=columns,
    types=TYPES,
    options={
        "aria_label": "Service inventory",
        "expand_all": True,
        "enable_dnd": False,
        "select_mode": "single",
        "show_checkboxes": False,
        "sort_folders_first": True,
        "search_label": "Search any column",
        "toolbar": ["undo", "redo", "|", "rename", "|", "expand-all", "collapse-all", "|", "search"],
    },
    event_callback=on_event,
    action_callback=allow_action,
    sizing_mode="stretch_both",
)
```

Key points:

- `TYPES` declares `icon`, `allow_children` and `monitored` once per kind instead of once per row.
- `allow_action` returns `False` for an `edit` on a row that has children, because those cells are the example's own arithmetic.
- `on_event` recomputes the totals after an edit that landed, writing `table.source` directly so the roll-up records no undo step of its own.
- The `toolbar` list carries no `new-folder`, `new-file` or `delete`, and because the list gates the shortcuts too, `Insert` and `Delete` do nothing at all here.

## How the test exercises it

- **Render**: the five headers appear in order, and `aria-rowcount` equals the node count plus the header row.
- **One test per editor kind**: the select and the checkbox commit the moment you choose; the number column lands in `source` as an `int`, not the string that was typed; the text box writes on `Enter`.
- **Types**: ticking `lab`'s checkbox writes that node and leaves `TYPES["service"]["monitored"]` untouched.
- **Roll-up**: an edit propagates into the site and the region above it, and the group's `owner` stays blank.
- **Undo**: one `Ctrl+Z` reaches the edit past the roll-up, and the tree it lands on is consistent.
- **Veto**: an edit on a group row leaves `source` alone, reopens the editor with `aria-invalid="true"` holding the rejected value, and shows up in the example's log.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/tanstack/tst_treegrid_columns.html" title="Treegrid - columns and cell editors" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/tanstack/tst_treegrid_columns.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/tanstack_table` - the panel guide
- {doc}`tst_vfsexplorer_extfiledrop` - the other half of the panel: a tree whose shape does change
- {doc}`tst_bigtree` - what a large tree costs, from one node to a million
- {doc}`tst_fsbrowser` - lazy loading from a real directory tree
