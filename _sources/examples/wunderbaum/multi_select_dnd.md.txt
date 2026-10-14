# Multi-select + drag-and-drop

```{image} /_static/media/wunderbaum/multi_select_dnd_feature.webp
:alt: multi select and drag-and-drop feature
:class: docs-media
```

**Source:** [`examples/panels/wunderbaum/multi_select_dnd.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/multi_select_dnd.py)
**Test:** [`tests/panels/wunderbaum/examples/test_multi_select_dnd.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_multi_select_dnd.py)

`selectMode: "multi"` treats a checkbox as another view of the row selection rather than a state of its own: checking a folder checks everything below it, but unchecking a child never changes the folder. Combined with `dnd: True`, a drag that starts on a checked row moves the whole selection.

## The code

```python
import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Folder A",
        "key": "a",
        "expanded": True,
        "children": [
            {"title": "File 1", "key": "a/1"},
            {"title": "File 2", "key": "a/2"},
            {"title": "File 3", "key": "a/3"},
        ],
    },
    # ... Folder B with File 4 and File 5
]

tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "selectMode": "multi", "dnd": True},
    height=260,
)

selection_display = pn.pane.Markdown("**Selected:** (none)")


def selected_keys(src: list[dict]) -> list[str]:
    """Walk *src* and return the keys of every node marked ``selected``."""
    keys: list[str] = []

    def walk(nodes: list[dict]) -> None:
        for node in nodes:
            if node.get("selected"):
                keys.append(node["key"])
            walk(node.get("children", []))

    walk(src)
    return keys


def _on_source_change(*args: object) -> None:
    keys = selected_keys(tree.source)
    selection_display.object = f"**Selected:** {', '.join(keys)}" if keys else "**Selected:** (none)"


tree.param.watch(_on_source_change, ["source"])
```

Key points:

- `selectMode: "multi"` propagates in one direction only. Checking a folder checks its whole subtree; unchecking a single child leaves the folder checked, and checking every child of a folder does not check the folder. There is no tri-state parent, unlike `hier`.
- Selection lands in `tree.source` as a `selected: True` flag per node, so a single `param.watch` on `source` is enough to keep a live display in sync.
- With `dnd: True`, a drag that starts on a checked row carries every selected node. Dragging an unchecked row still moves only that row.
- Nodes that cannot move are dropped from the set before the move: the drop target itself, any node already sitting where the drop would put it, and any node whose selected ancestor is travelling with it.

## How the test exercises it

The test does five interactions and asserts after each one, both client-side (reading `node.selected` through a `findInShadowRoots` helper) and server-side (via `selected_keys(tree.source)`):

1. clicking `Folder A`'s checkbox selects `a, a/1, a/2, a/3`;
2. unchecking `File 2` leaves `a, a/1, a/3` - the folder stays checked;
3. checking `File 4` and `File 5` gives `a, a/1, a/3, b/4, b/5`, with `Folder B` itself unchecked;
4. dragging `File 4` onto the middle of `Folder A` moves only `b/4` and `b/5`, leaving `Folder A` with `a/1, a/2, a/3, b/4, b/5` and `Folder B` empty.

Step 4 is the interesting one: five nodes are selected, but `Folder A` is the drop target and `a/1`/`a/3` are already its children, so only the two files from `Folder B` actually move.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/wunderbaum/multi_select_dnd.html" title="Multi-select + drag-and-drop" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/wunderbaum/multi_select_dnd.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`checkbox_tree` - the `hier` counterpart, with tri-state parents and upward propagation
- {doc}`virtual_filesystem` - the full demo, with columns, context menu, and file drop
