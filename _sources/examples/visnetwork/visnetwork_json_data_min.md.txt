# Node tooltips from JSON data

```{image} /_static/media/visnetwork/visnetwork_json_data_feature.webp
:alt: node json data yaml tooltip
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/visnetwork_json_data_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/visnetwork_json_data_min.py)
**Test:** [`tests/panels/visnetwork/examples/test_visnetwork_json_data.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_json_data.py)

Attach a `json_data` dict to any node and hover it to see the data rendered as a formatted YAML tooltip. Values are colour-coded by type, so numbers, strings, and booleans stay easy to scan.

The node here is pinned with `x`, `y`, and `fixed`, and physics is disabled, so it stays put while you hover.

## The code

```python
import panel as pn

from panelini.panels.visnetwork import VisNetwork

nodes = [
    {
        "id": "n1",
        "label": "Test Node",
        "x": 0,
        "y": 0,
        "fixed": True,
        "json_data": {"temperature": 25.0, "unit": "celsius", "active": True},
    },
]

vis = VisNetwork(
    nodes=nodes,
    edges=[],
    options={"physics": {"enabled": False}},
)
pn.serve(vis)
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/visnetwork_json_data_min.html" title="Node tooltips from JSON data" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/visnetwork_json_data_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/visnetwork`
