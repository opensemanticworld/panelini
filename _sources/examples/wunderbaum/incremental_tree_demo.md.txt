# Incremental updates - build a tree step by step

```{image} /_static/media/wunderbaum/incremental_tree_demo_feature.webp
:alt: incremental tree demo feature
:class: docs-media
```

**Source:** [`examples/panels/wunderbaum/incremental_tree_demo.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/incremental_tree_demo.py)
**Test:** [`tests/panels/wunderbaum/examples/test_incremental_tree_demo.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_incremental_tree_demo.py)

Build a project folder structure one step at a time using the incremental update API. Each step is a list of action objects (`addNode`, `renameNode`, `moveNode`, …) sent straight to the JavaScript side - the same playbook notation as the VisNetwork incremental graph demo.

## The code

```python
import time

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

SEQUENCE = [
    {
        "actions": [
            {"action": "addNode", "parentKey": None, "key": "project",
             "title": "my-project", "icon": "bi bi-folder-fill", "expanded": True},
        ],
        "status": "Creating project root...",
    },
    {
        "actions": [
            {"action": "addNode", "parentKey": "project", "key": "src", "title": "src", "expanded": True},
            {"action": "addNode", "parentKey": "project", "key": "tests", "title": "tests"},
        ],
        "status": "Adding src/ and tests/ directories...",
    },
    # ... more steps: add files, rename main.py -> app.py, move utils.py into models/
    {"actions": [{"action": "complete"}], "status": "Project structure complete!"},
]


def create_demo():
    tree = Wunderbaum(source=[], options={})
    status = pn.pane.Markdown("**Status:** Ready to start")
    step_index = {"value": 0}

    def execute_step():
        if step_index["value"] >= len(SEQUENCE):
            status.object = "**Status:** Demo complete!"
            return
        step = SEQUENCE[step_index["value"]]
        status.object = f"**Status:** {step.get('status', 'Processing...')}"
        tree.execute_step(step)
        step_index["value"] += 1

    def reset_tree():
        tree.clear()
        step_index["value"] = 0

    step_btn = pn.widgets.Button(name="Next Step", button_type="primary")
    step_btn.on_click(lambda e: execute_step())
    # ... Reset and Run All buttons
    return pn.Column("# Incremental Tree Update Demo", controls, status, tree)
```

Key points:

- The tree starts empty (`source=[]`) and grows via `tree.execute_step(step)`, where each step bundles an `actions` list plus a status message.
- Supported actions include `addNode` (with `parentKey`, `None` for a root), `renameNode`, `moveNode` (with `targetKey` and `mode`), and the terminal `complete`.
- `tree.clear()` resets the tree for the "Run All" and "Reset" buttons.

## How the test exercises it

The test asserts the "Next Step" and "Reset" buttons render, clicks **Next Step** once, and confirms a `.wb-row` appears - proving a single incremental `addNode` reaches the client and renders.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/wunderbaum/incremental_tree_demo.html" title="Incremental updates - build a tree step by step" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/wunderbaum/incremental_tree_demo.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`context_menu` - the imperative `add_node` / `rename_node` / `remove_node` API
- {doc}`lazy_loading` - pull children on expand instead of pushing them from Python
