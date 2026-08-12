# Incremental knowledge graph

```{image} /_static/media/visnetwork/incremental_graph_demo_feature.webp
:alt: incremental knowledge graph build
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/incremental_graph_demo.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/incremental_graph_demo.py)
**Test:** [`tests/panels/visnetwork/examples/test_incremental_graph_demo.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_incremental_graph_demo.py)

This demo builds a knowledge graph one step at a time. Each click of **Next Step** applies the next entry of a `SEQUENCE` playbook by calling `vis.execute_step(...)`, which forwards flat actions straight to the vis-network frontend.

The playbook covers the full incremental update API: `addNode` and `addEdge` grow the graph, `updateNode` refines labels, `updateNodeState` recolours stored nodes, and `mergeNodes` collapses duplicate entities while rewiring their edges. Nodes carrying `json_data` gain a YAML tooltip on hover.

## The code

```python
import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# Each step is a playbook entry: a list of flat actions plus a status line.
SEQUENCE = [
    {
        "actions": [
            {"action": "addNode", "id": "input1", "label": "raw input", "type": "input"},
        ],
        "status": "User input for Experiment #1...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "e",
                "label": "A tensile test experiment #1",
                "type": "instance",
                "json_data": {"experiment_type": "tensile test", "experiment_id": 1},
            },
            {"action": "addEdge", "from": "input1", "to": "e", "dashed": True},
        ],
        "status": "Extracting experiment entity...",
    },
    # ... further steps: addEdge, updateNode, updateNodeState, mergeNodes, complete
]

vis = VisNetwork(nodes=[], edges=[], options={"physics": {"enabled": True}})
step_index = {"value": 0}


def execute_step():
    if step_index["value"] >= len(SEQUENCE):
        return
    step = SEQUENCE[step_index["value"]]
    vis.execute_step(step)  # sent straight to the JS incremental API
    step_index["value"] += 1


step_btn = pn.widgets.Button(name="Next Step", button_type="primary")
step_btn.on_click(lambda e: execute_step())

app = pn.Column(step_btn, vis)
app.servable()
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/incremental_graph_demo.html" title="Incremental knowledge graph" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/incremental_graph_demo.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/visnetwork`
