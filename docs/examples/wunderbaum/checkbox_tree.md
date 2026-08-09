# Checkbox tree - hierarchical selection

```{image} /_static/media/wunderbaum/checkbox_tree_feature.webp
:alt: checkbox tree feature
:class: docs-media
```

**Source:** [`examples/panels/wunderbaum/checkbox_tree.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/checkbox_tree.py)
**Test:** [`tests/panels/wunderbaum/examples/test_checkbox_tree.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_checkbox_tree.py)

Checkboxes with tri-state propagation via `selectMode: "hier"`: checking a parent checks every descendant, and a partial child selection shows the parent as indeterminate.

## The code

```python
import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Fruits",
        "key": "fruits",
        "expanded": True,
        "children": [
            {
                "title": "Citrus",
                "key": "citrus",
                "expanded": True,
                "children": [
                    {"title": "Orange", "key": "orange"},
                    {"title": "Lemon", "key": "lemon"},
                    {"title": "Lime", "key": "lime"},
                ],
            },
            # ...
        ],
    },
    # ...
]

tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "selectMode": "hier"},
)

checked_display = pn.pane.Markdown("**Checked:** (none)")


def _get_checked_keys(src: list[dict]) -> list[str]:
    """Walk *src* and return keys of nodes with ``selected: True``."""
    keys: list[str] = []

    def walk(nodes: list[dict]) -> None:
        for n in nodes:
            if n.get("selected"):
                keys.append(n["key"])
            walk(n.get("children", []))

    walk(src)
    return keys


def _on_source_change(*args: object) -> None:
    keys = _get_checked_keys(tree.source)
    checked_display.object = f"**Checked:** {', '.join(keys)}" if keys else "**Checked:** (none)"


tree.param.watch(_on_source_change, ["source"])
```

Key points:

- Two options drive the behaviour: `checkbox: True` renders the boxes, `selectMode: "hier"` enables parent/child propagation and the indeterminate (tri-state) parent.
- Selection state syncs back into `tree.source` as a `selected: True` flag on each node - no separate event wiring needed.
- `tree.param.watch(..., ["source"])` fires whenever the client toggles a box, so `_get_checked_keys` can walk the tree and update the live display.

## How the test exercises it

The test file is the most thorough in the suite (8 tests). It clicks the `.wb-checkbox` of specific rows and verifies both the backend (`_get_checked_keys(tree.source)`) and the client-side wunderbaum state (via a `findInShadowRoots` helper reading `node.selected` / `node._partsel`):

- checking a leaf selects only that node;
- checking a parent selects all descendants, unchecking deselects them;
- a single checked child leaves the parent **indeterminate**, not fully selected;
- unchecking a grandchild propagates indeterminate state up to grandparent;
- sibling subtrees stay independent.

An `autouse` fixture resets `tree.source` before each test to prevent state leakage between cases.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/wunderbaum/checkbox_tree.html" title="Checkbox tree - hierarchical selection" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/wunderbaum/checkbox_tree.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```
## See also

- {doc}`virtual_filesystem` - checkboxes combined with a "Delete Checked" batch action
- {doc}`wunderbaum_panelini_min` - the minimal tree this builds on
