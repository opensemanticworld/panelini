# Wunderbaum treegrid - columns

**Source:** [`examples/panels/wunderbaum/wunderbaum_table_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_table_min.py)
**Test:** [`tests/panels/wunderbaum/examples/test_wunderbaum_table_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_table_min.py)

Switch Wunderbaum from tree-only into **tree + table** mode by supplying `columns`. Each node carries extra meta-properties that render as aligned table cells.

## The code

```python
import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {
        "title": "Documents",
        "key": "docs",
        "icon": "bi bi-folder-fill",
        "expanded": True,
        "size": "",
        "modified": "2024-01-15",
        "permissions": "rwxr-xr-x",
        "children": [
            {
                "title": "report.pdf",
                "key": "docs/report",
                "icon": "bi bi-file-earmark-pdf",
                "size": "2.4 MB",
                "modified": "2024-01-10",
                "permissions": "rw-r--r--",
            },
            # ...
        ],
    },
    # ...
]

columns = [
    {"id": "*", "title": "Name", "width": "250px"},
    {"id": "size", "title": "Size", "width": "100px"},
    {"id": "modified", "title": "Modified", "width": "120px"},
    {"id": "permissions", "title": "Permissions", "width": "120px"},
]

tree = Wunderbaum(source=source, columns=columns)

if __name__ == "__main__":
    pn.serve(tree)
```

Key points:

- The `columns` list turns on table mode. The first column uses the reserved id `"*"` for the tree/title column; the rest map to node properties by `id`.
- Column values (`size`, `modified`, `permissions`) sit **at the node level**, not inside a nested `data` dict - Wunderbaum auto-moves any non-reserved keys into `node.data` for you.
- `icon` uses [Bootstrap Icons](https://icons.getbootstrap.com/) class names (`bi bi-...`).

## How the test exercises it

The test serves the tree and asserts `len(tree.columns) == 4`, that the `.wb-header` column header row rendered (proving table mode is active), and that `.wb-row` data rows are visible.

## See also

- {doc}`wunderbaum_panel_min` - tree-only mode without columns
- {doc}`dag_projection` - build a treegrid source from a graph
- {doc}`virtual_filesystem` - a full editable filesystem in table mode
