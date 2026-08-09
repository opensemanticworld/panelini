# Standalone VisNetwork

```{image} /_static/media/visnetwork/visnetwork_panel_min_feature.png
:alt: standalone visnetwork panel
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/visnetwork_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/visnetwork_panel_min.py)
**Test:** [`tests/panels/visnetwork/examples/test_visnetwork_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_panel_min.py)

The smallest possible graph: a standalone `VisNetwork` with no panelini shell, three nodes and two edges. It renders immediately, runs physics-driven layout, and accepts drag interactions out of the box.

Serve `vis` on its own, or drop it into any Panel layout.

## The code

```python
import panel as pn

from panelini.panels.visnetwork import VisNetwork

nodes = [
    {"id": 1, "label": "Node 1"},
    {"id": 2, "label": "Node 2"},
    {"id": 3, "label": "Node 3"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
]

vis = VisNetwork(nodes=nodes, edges=edges)
pn.serve(vis)
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/visnetwork_panel_min.html" title="Standalone VisNetwork" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/visnetwork_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/visnetwork`
