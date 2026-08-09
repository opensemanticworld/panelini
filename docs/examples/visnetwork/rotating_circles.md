# Rotating circles

```{image} /_static/media/visnetwork/rotating_circles_feature.png
:alt: five fixed nodes on a ring linked to five free nodes
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/rotating_circles.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/rotating_circles.py)
**Test:** [`tests/panels/visnetwork/examples/test_rotating_circles.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_rotating_circles.py)

Five nodes are pinned at fixed coordinates equally spaced on a circle, and each is linked to one free node whose position the physics engine works out. The ring closes on itself, so the five fixed nodes form a pentagon with five satellites hanging off it.

Run the script directly (`python rotating_circles.py`) and a background loop continuously recomputes the ring angle from a velocity slider, pushing new positions to `visnetwork_panel.nodes` so the whole ring spins. That loop only runs under `__main__`, so the live view below and the still above show the static ring rather than the animation.

## The code

```python
import numpy as np

from panelini.panels.visnetwork import VisNetwork

r = 100  # radius of the ring
phi_0 = 0  # base angle

# Angular offsets for the 5 ring nodes, equally spaced
phi_1 = 2 * np.pi / 5
phi_2 = 2 * 2 * np.pi / 5
phi_3 = 3 * 2 * np.pi / 5
phi_4 = 4 * 2 * np.pi / 5

# Nodes 1-5 are fixed on the ring; nodes 6-10 are free
nodes = [
    {"id": 1, "label": "Node 1", "color": "#e04141",
     "x": r * np.cos(phi_0), "y": r * np.sin(phi_0), "fixed": True},
    # ... nodes 2-5 at phi_0 + phi_1 .. phi_4 ...
    {"id": 6, "label": "Node 6", "color": "#e04141"},
    # ... nodes 7-10 ...
]

# A ring of 5 edges, plus one spoke from each ring node to a free node
edges = [
    {"from": 1, "to": 2}, {"from": 2, "to": 3}, {"from": 3, "to": 4},
    {"from": 4, "to": 5}, {"from": 5, "to": 1},
    {"from": 1, "to": 6}, {"from": 2, "to": 7}, {"from": 3, "to": 8},
    {"from": 4, "to": 9}, {"from": 5, "to": 10},
]

visnetwork_panel = VisNetwork(nodes=nodes, edges=edges, sizing_mode="stretch_both")
```

The rotation itself lives in the `__main__` block: a loop advances `phi_0` by `velocity * dt`, rebuilds the ring node positions, and assigns them back to `visnetwork_panel.nodes`. Two sliders control the angular velocity and the ring radius.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/rotating_circles.html" title="Rotating circles" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/rotating_circles.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also
- {doc}`../../panels/visnetwork`
