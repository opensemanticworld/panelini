# GraphDetailTool

```{image} /_static/media/visnetwork/graph_detail_tool_overview.webp
:alt: a graph on the left, a node detail editor on the right
:class: docs-media
```

`GraphDetailTool` composes {doc}`visnetwork` and {doc}`jsoneditor` into a ready-made graph editing workspace: a graph on the left, edit-mode controls above it, and a detail pane on the right that follows the selection.

```{mermaid}
graph LR
    subgraph gdt [" GraphDetailTool "]
        controls(["Edit Controls"])
        vis(["VisNetwork"])
        details(["Detail Panel"])
    end

    controls --> vis
    vis -- "click/select" --> details
    details -- "edit" --> vis

    classDef controlNode fill:#8b7355,stroke:#6b5840,color:#ffffff
    classDef graphNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef detailNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class controls controlNode
    class vis graphNode
    class details detailNode
```

## Quickstart

Construct it exactly like a `VisNetwork`: it takes the same `nodes` and `edges`, and builds the rest of the workspace around them.

```{literalinclude} ../../examples/panels/visnetwork/graph_detail_tool.py
:language: python
:start-at: nodes = [
:end-at: tool = GraphDetailTool(nodes=nodes, edges=edges)
```

The underlying graph stays reachable as `tool.visnetwork`, so the whole [manipulation API](visnetwork.md#manipulation-api) is available:

```python
tool.visnetwork.add_node({"id": 4, "label": "New"})
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/graph_detail_tool.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_graph_detail_tool.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/graph_detail_tool.html" title="GraphDetailTool workspace" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/graph_detail_tool.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## The detail panel

Clicking a node opens two tabs:

1. **Visualization** renders the node's content according to its data type.
2. **Details** shows every node property in a `JsonEditor` for direct editing. Edits sync straight back to the graph.

Content rendering is picked from two node keys, both holding a data URL. An `image` key renders as a picture; a `data` key is dispatched on its MIME type:

| `data` starts with | Rendered as |
| --- | --- |
| `data:text/csv`, `data:application/vnd.ms-excel` | an interactive table plus a Plotly chart with column pickers |
| `data:text/plain` | plain text |
| `data:application/pdf` | an embedded document viewer |

A node with neither key opens on the Details tab instead. That is the shape the [file drop](visnetwork.md#file-drop) handler produces, which is why dropped files render without extra wiring.

Selecting several nodes swaps the pane for a Tabulator comparison table with bulk editing, and node positions are written back as you drag.

## Growing a graph from dropped files

```{image} /_static/media/visnetwork/graph_detail_tool_2_feature.png
:alt: the workspace seeded with two file-drop prompt nodes
:class: docs-media
```

Because the workspace embeds a `VisNetwork`, it inherits [file drop](visnetwork.md#file-drop). This variant seeds two prompt nodes; dropping an image or a CSV onto the canvas spawns a node from the file, which the detail pane then renders and lets you edit.

```{literalinclude} ../../examples/panels/visnetwork/graph_detail_tool_2.py
:language: python
:start-at: nodes = [
:end-before: if __name__
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/graph_detail_tool_2.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_graph_detail_tool_2.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/graph_detail_tool_2.html" title="GraphDetailTool file-drop workspace" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/graph_detail_tool_2.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Edit modes

The control row toggles the underlying graph between view, add-node, and add-edge modes, the same three states described under [edit modes](visnetwork.md#edit-modes).

## Layout

`GraphDetailTool` implements `__panel__`, so it drops into any Panel layout directly:

```python
app.main_set(objects=[pn.Card(title="Workspace", objects=[tool])])
```

```{note}
It duck-types as a `Viewer` without subclassing `panel.viewable.Viewer`, so `pn.serve(tool)` does not satisfy the type checker. Both examples serve it with a `ty: ignore` comment.
```

## API reference

- {py:class}`panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool` - the workspace
- {py:class}`panelini.panels.visnetwork.visnetwork.VisNetwork` - the graph it wraps
- {py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor` - the detail editor
