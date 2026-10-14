# Family tree with fixed positions

```{image} /_static/media/visnetwork/hierarchy_feature.png
:alt: family tree graph
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/hierarchy.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/hierarchy.py)
**Test:** [`tests/panels/visnetwork/examples/test_hierarchy.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_hierarchy.py)

A family tree laid out by hand. Each node carries explicit `x`/`y` coordinates with `fixed: True`, so grandparents, parents, and children stay pinned to their rows instead of drifting under physics. Generations are colour-coded, and every relationship is a labelled `HasFather` or `HasMother` edge.

Fixed positions give you full control over the layout when a graph has a known structure, and the labelled edges make the parent relationships explicit.

## The code

```python
import panel as pn

from panelini.panels.visnetwork import VisNetwork

nodes = [
    # Grandparents pinned to the top row (y = -200)
    {"id": 10, "label": "Grandfather (Paternal)", "shape": "ellipse",
     "color": "#a6cee3", "x": -200, "y": -200, "fixed": True},
    # ... parents at y = 0, children and cousins at y = 200 ...
    {"id": 1, "label": "Me", "shape": "ellipse",
     "color": "#fdbf6f", "x": -150, "y": 200, "fixed": True},
]

edges = [
    {"from": 1, "to": 4, "label": "HasFather", "arrows": "to", "color": "black"},
    {"from": 1, "to": 5, "label": "HasMother", "arrows": "to", "color": "black"},
    # ... one HasFather / HasMother edge per parent link ...
]

visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)
pn.serve(visnetwork_panel, threaded=True)
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/hierarchy.html" title="Family tree with fixed positions" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/hierarchy.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/visnetwork`
