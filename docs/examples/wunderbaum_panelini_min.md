# Wunderbaum tree inside panelini

**Source:** [`examples/panels/wunderbaum/wunderbaum_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_panelini_min.py)
**Test:** [`tests/panels/wunderbaum/examples/test_wunderbaum_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_panelini_min.py)

The same minimal tree as {doc}`wunderbaum_panel_min`, this time hosted inside a responsive Panelini card.

## The code

```python
import panel as pn

from panelini import Panelini
from panelini.panels.wunderbaum import Wunderbaum

source = [
    {
        "title": "Node 1",
        "key": "1",
        "expanded": True,
        "children": [
            {"title": "Node 1.1", "key": "1.1"},
            {"title": "Node 1.2", "key": "1.2"},
        ],
    },
    {"title": "Node 2", "key": "2"},
    {"title": "Node 3", "key": "3"},
]

tree = Wunderbaum(source=source)

app = Panelini(title="Wunderbaum Tree Demo")
app.main_set(objects=[
    pn.Card(
        title="Wunderbaum",
        objects=[tree],
        max_height=800,
    ),
])
app.servable()
```

The only difference from the standalone version is the wrapper: the tree drops into a `pn.Card`, which drops into `Panelini.main_set(...)`. The panel itself is unchanged - this is the whole point of the panels-are-standalone design.

## How the test exercises it

The test imports `app` and `tree`, serves the app, and asserts the tree has three roots, the `.wunderbaum-wrapper` is visible, and `.wb-row` rows rendered inside the Panelini layout.

## See also

- {doc}`wunderbaum_panel_min` - the same tree served on its own
- {doc}`checkbox_tree` - add selection checkboxes with tri-state propagation
