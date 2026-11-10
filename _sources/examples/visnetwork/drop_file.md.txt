# Drop files onto the graph

```{image} /_static/media/visnetwork/drop_file_feature.png
:alt: file drop prompt node
:class: docs-media
```

**Source:** [`examples/panels/visnetwork/drop_file.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/drop_file.py)
**Test:** [`tests/panels/visnetwork/examples/test_drop_file.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_drop_file.py)

The graph starts with a single prompt node inviting you to drop a file onto the canvas. Dragging an image or CSV file onto the widget spawns a new node from the dropped content, so the canvas doubles as a drop target.

The drop interaction is exercised by dragging a file onto the graph; the widget reads the file and adds a corresponding node without any extra wiring.

## The code

```python
import panel as pn

from panelini.panels.visnetwork import VisNetwork

nodes = [
    {
        "id": 1,
        "label": "Drop an Image File into the graph-widget",
        "shape": "ellipse",
        "color": "green",
    },
]

edges = []

visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)
pn.serve(visnetwork_panel, threaded=True)
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/visnetwork/drop_file.html" title="Drop files onto the graph" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/visnetwork/drop_file.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/visnetwork`
