# Form + graph editor

```{image} /_static/media/usecases/jsoneditor_visnetwork_overview.webp
:alt: a schema-driven form on the left, the same data as a graph on the right
:class: docs-media
```

A [`JsonEditor`](../panels/jsoneditor.md) form and a [`VisNetwork`](../panels/visnetwork.md) graph driven by one shared data model. Editing the form rebuilds the graph; clicking a node in the graph switches the form to edit just that node. This is the core pattern behind a schema-driven knowledge-base editor: structured input bound to a live graph of the same entities.

## What it demonstrates

- **Form to graph** - a JSON-Schema form holds a list of nodes (`name`, `connected_to`); every change rebuilds the `VisNetwork` nodes and edges.
- **Graph to form** - clicking a node swaps the editor from the whole-network schema to a single-node schema, so you edit one entity at a time; clicking empty space returns to the full-network view.
- **Live round trip** - editing a node's `name` in the form immediately relabels it in the graph, with no manual refresh.

## The shared model

Five people, each with a list of names they connect to. This one dict is the single source of truth: the form edits it, and the graph is derived from it.

```{literalinclude} ../../examples/usecases/jsoneditor_visnetwork.py
:language: python
:start-at: initial_data = {
:end-before: State tracking
```

One converter turns that shape into what `VisNetwork` wants. Names become node ids by position, and `connected_to` becomes deduplicated edges.

````{dropdown} The converter
```{literalinclude} ../../examples/usecases/jsoneditor_visnetwork.py
:language: python
:pyobject: json_to_graph
```
````

## The bridge

The form and the graph never talk to each other directly, only through the shared value. Two handlers carry the traffic in each direction.

```{literalinclude} ../../examples/usecases/jsoneditor_visnetwork.py
:language: python
:pyobject: on_network_event
```

```{literalinclude} ../../examples/usecases/jsoneditor_visnetwork.py
:language: python
:pyobject: on_json_change
```

Wiring them up is two lines. `VisNetwork` takes a plain attribute, `JsonEditor` is a `param` object and takes a watcher.

```{literalinclude} ../../examples/usecases/jsoneditor_visnetwork.py
:language: python
:start-at: visnetwork._network_event_callback = on_network_event
:end-at: jsoneditor.param.watch(on_json_change, "value")
```

## Data flow

```{mermaid}
graph LR
    form[JsonEditor form] -- "value change" --> conv[json_to_graph]
    conv -- "nodes + edges" --> vis[VisNetwork]
    vis -- "node click" --> sel[single-node schema]
    sel -- "set_schema + startval" --> form
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/usecases/jsoneditor_visnetwork.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/usecases/test_jsoneditor_visnetwork.py)

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/usecases/jsoneditor_visnetwork.html" title="Form and graph editor" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/usecases/jsoneditor_visnetwork.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- [Pydantic models](../panels/jsoneditor.md#pydantic-models) - deriving the form schema from a Pydantic model instead of hand-writing it
- {doc}`wunderbaum_visnetwork` - the tree + graph variant
- {doc}`../panels/graph_detail_tool` - the same idea packaged as one ready-made component
