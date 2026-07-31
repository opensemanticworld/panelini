# Use case: form + graph editor

```{image} /_static/media/usecases/jsoneditor_visnetwork_overview.webp
:alt: jsoneditor visnetwork overview
:class: docs-media
```

**Source:** [`examples/usecases/jsoneditor_visnetwork.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/usecases/jsoneditor_visnetwork.py)

A [`JsonEditor`](../../panels/jsoneditor) form and a [`VisNetwork`](../../panels/visnetwork) graph
driven by one shared data model. Editing the form rebuilds the graph; clicking a node in the
graph switches the form to edit just that node. This is the core pattern behind a
schema-driven knowledge-base editor: structured input bound to a live graph of the same
entities.

## What it demonstrates

- **Form to graph** - a JSON-Schema form holds a list of nodes (`name`, `connected_to`);
  every change rebuilds the `VisNetwork` nodes and edges.
- **Graph to form** - clicking a node swaps the editor from the whole-network schema to a
  single-node schema, so you edit one entity at a time; clicking empty space returns to the
  full-network view.
- **Live round trip** - editing a node's `name` in the form immediately relabels it in the
  graph, with no manual refresh.

## The code

The bridge is one converter plus two watchers - the form and the graph never talk to each
other directly, only through the shared value:

```python
def json_to_graph(data: dict) -> tuple[list[dict], list[dict]]:
    """Turn the form's {'nodes': [...]} value into VisNetwork nodes + edges."""
    ...

# Graph -> form: a click selects a node to edit on its own
def on_network_event(event_name, event_params):
    if event_name == "click" and event_params.get("nodes"):
        switch_to_single_node_mode(event_params["nodes"][0])
    elif event_name == "deselectNode":
        switch_to_network_mode()

# Form -> graph: any edit rebuilds the graph
def on_json_change(event):
    nodes, edges = json_to_graph(event.new)
    visnetwork.nodes = nodes
    visnetwork.edges = edges

visnetwork._network_event_callback = on_network_event
jsoneditor.param.watch(on_json_change, "value")
```

## Data flow

```{mermaid}
graph LR
    form[JsonEditor form] -- "value change" --> conv[json_to_graph]
    conv -- "nodes + edges" --> graph[VisNetwork]
    graph -- "node click" --> sel[single-node schema]
    sel -- "set_schema + startval" --> form
```

## See also

- {doc}`../jsoneditor/jsoneditor_pydantic` - deriving the form schema from a Pydantic model
- {doc}`../visnetwork/visnetwork` - the standalone graph widget
- {doc}`usecase_wunderbaum_visnetwork` - the tree + graph variant
