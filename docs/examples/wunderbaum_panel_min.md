# Wunderbaum tree: minimal (standalone)

**Source:** [`examples/panels/wunderbaum/wunderbaum_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_panel_min.py)
**Test:** [`tests/panels/wunderbaum/examples/test_wunderbaum_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_panel_min.py)

The smallest possible `Wunderbaum` usage: a nested tree served on its own, no Panelini shell.

## The code

```python
import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {
        "title": "Node 1",
        "key": "1",
        "expanded": True,
        "children": [
            {"title": "Node 1.1", "key": "1.1"},
            {
                "title": "Node 1.2",
                "key": "1.2",
                "children": [
                    {"title": "Node 1.2.1", "key": "1.2.1"},
                ],
            },
        ],
    },
    {"title": "Node 2", "key": "2"},
    {"title": "Node 3", "key": "3"},
]

tree = Wunderbaum(source=source)

if __name__ == "__main__":
    pn.serve(tree)
```

`Wunderbaum` is a standalone [`AnyWidgetComponent`](https://github.com/mar10/wunderbaum) panel. Each node is a dict with a `title`, a unique `key`, optional `children`, and an optional `expanded` flag: that's the entire contract for a read-only tree. Because it has no Panelini dependency, you can `pn.serve(tree)` directly.

## What's under the hood

```{mermaid}
graph LR
    py[Python prop<br/>source] <--> bridge[AnyWidget bridge]
    bridge <--> vue[Vue wrapper]
    vue --> wb[wunderbaum JS]
    wb --> dom[Shadow DOM rows]
```

- `source` is a `param` list: reassign it and the frontend re-renders.
- The tree renders inside a shadow DOM; tests reach it via a small `findInShadowRoots` helper.

## How the test exercises it

The Playwright test imports `source` and `tree` from the module, serves it on a random port, and asserts that `tree.source` still has three roots, the `.wunderbaum-wrapper` is visible, and at least one `.wb-row` rendered.

## See also

- {doc}`wunderbaum_panelini_min`: the same tree inside a Panelini shell
- {doc}`wunderbaum_table_min`: add columns for tree + table mode
- [Wunderbaum docs](https://mar10.github.io/wunderbaum/)
