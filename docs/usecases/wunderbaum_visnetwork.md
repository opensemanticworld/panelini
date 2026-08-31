# Tree + graph editor

```{image} /_static/media/usecases/wunderbaum_visnetwork_overview.webp
:alt: a class hierarchy as a treegrid on the left and a graph on the right
:class: docs-media
```

A class hierarchy shown as both a [`Wunderbaum`](../panels/wunderbaum.md) treegrid (left) and a [`VisNetwork`](../panels/visnetwork.md) graph (right), with a detail sidebar. One shared data model feeds both widgets, and every mutation flows through the model and then through the incremental APIs of each widget, so neither side does a full re-render.

## What it demonstrates

- **Drag to reparent** - drag a class onto a new superclass in the tree; the model moves the node and the graph re-wires the `SubClassOf` edge (old edge removed, new one added).
- **Context menu edits** - right-click a node to insert a subclass or a sibling, or to delete it; the change appears in both the tree and the graph.
- **Linked selection** - activating a tree row highlights the node in the graph and fills the detail pane, and clicking a graph node activates the matching tree row.
- **Inline editing** - rename with `F2` or edit the description cell; the graph label and tooltip follow.

## The shared model

Nodes are a dict keyed by id, edges are a flat list. Every edge means `SubClassOf`, pointing from child to parent, which is what lets the same structure read as a tree on one side and a graph on the other.

```{literalinclude} ../../examples/usecases/wunderbaum_visnetwork.py
:language: python
:start-at: NODES: dict[str, dict] = {
:end-before: _counter
```

Neither widget owns that model. The tree gets a `source` built from it, the graph gets `nodes` and `edges` mapped out of it, and both report back through an event callback.

```{literalinclude} ../../examples/usecases/wunderbaum_visnetwork.py
:language: python
:start-at: tree = Wunderbaum(
:end-before: ====
```

## Keeping both sides in sync

Each mutation is one helper that updates the model first, then patches both widgets incrementally. A reparent is the interesting case: the tree has already moved the row itself by the time the event arrives, so the helper only fixes the model and the graph edge. Calling `tree.set_source` here would fight the move that just happened on the JavaScript side.

```{literalinclude} ../../examples/usecases/wunderbaum_visnetwork.py
:language: python
:pyobject: sync_move_node
```

The two event callbacks are pure dispatch, which keeps the interesting logic in the named handlers.

```{literalinclude} ../../examples/usecases/wunderbaum_visnetwork.py
:language: python
:pyobject: on_tree_event
```

```{literalinclude} ../../examples/usecases/wunderbaum_visnetwork.py
:language: python
:pyobject: on_graph_event
```

## Data flow

```{mermaid}
graph LR
    tree[Wunderbaum tree] -- "drop / contextmenu / activate" --> model[(NODES / EDGES)]
    vis[VisNetwork] -- "node click" --> model
    model -- "add/remove node + edge" --> tree
    model -- "add/remove node + edge" --> vis
    model -- "show_details" --> detail[Detail sidebar]
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/usecases/wunderbaum_visnetwork.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/usecases/test_wunderbaum_visnetwork.py)

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/usecases/wunderbaum_visnetwork.html" title="Tree and graph editor" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/usecases/wunderbaum_visnetwork.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`jsoneditor_visnetwork` - the form + graph variant
- [Virtual filesystem](../panels/wunderbaum.md#virtual-filesystem) - the same tree interactions (drag-and-drop, context menu, rename) on their own
- [DAG projection](../panels/wunderbaum.md#dag-projection) - the other way to show a graph in a tree, by repeating shared children
