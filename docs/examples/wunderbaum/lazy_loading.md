# Lazy loading - children on demand

```{image} /_static/media/wunderbaum/lazy_loading_feature.webp
:alt: lazy loading feature
:class: docs-media
```

**Source:** [`examples/panels/wunderbaum/lazy_loading.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/lazy_loading.py)
**Test:** [`tests/panels/wunderbaum/examples/test_lazy_loading.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_lazy_loading.py)

Nodes marked `lazy: True` fetch their children only when first expanded. The `lazy_load_callback` runs on the Python side - in a real app it would hit a database, API, or filesystem.

## The code

```python
import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {"title": "Root 1", "key": "r1", "lazy": True, "icon": "bi bi-folder"},
    {"title": "Root 2", "key": "r2", "lazy": True, "icon": "bi bi-folder"},
    {
        "title": "Root 3 (pre-loaded)",
        "key": "r3",
        "icon": "bi bi-folder",
        "expanded": True,
        "children": [
            {"title": "Pre-loaded Child 1", "key": "r3_1"},
            {"title": "Pre-loaded Child 2", "key": "r3_2"},
        ],
    },
]


def on_lazy_load(key: str, request_data: dict) -> list[dict]:
    """Return children for a lazy node."""
    depth = key.count("_")
    children = []
    for i in range(1, 4):
        child = {"title": f"Child {i} of {request_data.get('title', key)}", "key": f"{key}_{i}"}
        if depth < 2:  # nest lazily up to 3 levels
            child["lazy"] = True
            child["icon"] = "bi bi-folder"
        else:
            child["icon"] = "bi bi-file-earmark"
        children.append(child)
    return children


tree = Wunderbaum(
    source=source,
    lazy_load_callback=on_lazy_load,
    tree_event_callback=on_tree_event,
)
```

Key points:

- `lazy: True` on a node tells Wunderbaum to render an expander but defer loading. Mixing lazy and pre-loaded roots (like `Root 3`) is fine.
- `lazy_load_callback(key, request_data)` returns the child list for that node. Returned children can themselves be `lazy: True`, enabling arbitrarily deep on-demand trees - here capped at three levels via the `depth` check.
- The callback runs server-side on expand, so it can perform real I/O.

## How the test exercises it

The test serves the app and asserts the three roots render (`.wb-row` count `>= 3`) and the `.wunderbaum-wrapper` is visible - confirming the lazy roots render their expanders before any children are loaded.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/wunderbaum/lazy_loading.html" title="Lazy loading - children on demand" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/wunderbaum/lazy_loading.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```
## See also

- {doc}`incremental_tree_demo` - push nodes in from Python rather than pulling on expand
- {doc}`virtual_filesystem` - a fully-loaded tree backed by an in-memory dict
