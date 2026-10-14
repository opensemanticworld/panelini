# Image nodes

```{image} /_static/media/visnetwork/images_feature.png
:alt: graph with nodes rendered as remote photographs
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/images.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/images.py)
**Test:** [`tests/panels/visnetwork/examples/test_images.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_images.py)

Nodes are not limited to circles and boxes. Give a node `shape: "image"` and an `image` URL and vis-network draws the picture in place of a plain marker. Here a small knowledge graph about Wuerzburg links place labels to photographs hosted on Wikimedia Commons.

The label nodes use ordinary `ellipse` shapes, and the `HasImage` edges connect each building to its photo, so the graph mixes text and imagery in one layout.

## The code

```python
from panelini.panels.visnetwork import VisNetwork

nodes = [
    {"id": 1, "label": "Wuerzburg", "shape": "ellipse", "color": "green"},
    {"id": 2, "label": "Festung Marienberg", "shape": "ellipse", "color": "blue"},
    {"id": 3, "label": "Residenz", "shape": "ellipse", "color": "blue"},
    {"id": 4, "label": "Kaeppele", "shape": "ellipse", "color": "blue"},
    {"id": 5, "shape": "image", "size": 50,
     "image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Wuerzburg_Festung_Marienberg.jpg"},
    {"id": 6, "shape": "image", "size": 50,
     "image": "https://upload.wikimedia.org/.../South_facade_of_the_Wurzburg_Residence_05.jpg"},
    {"id": 7, "shape": "image", "size": 50,
     "image": "https://upload.wikimedia.org/.../Kaeppele_wuerzburg_festungsfoto.jpg"},
]

edges = [
    {"from": 1, "to": 2, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 1, "to": 3, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 1, "to": 4, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 2, "to": 5, "label": "HasImage", "arrows": "to", "color": "black"},
    {"from": 3, "to": 6, "label": "HasImage", "arrows": "to", "color": "black"},
    {"from": 4, "to": 7, "label": "HasImage", "arrows": "to", "color": "black"},
]

visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)
```

The images are fetched from the network at render time, so they pop in a moment after the graph draws. `size` controls how large each image node is drawn.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/images.html" title="Image nodes" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/images.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also
- {doc}`../../panels/visnetwork`
