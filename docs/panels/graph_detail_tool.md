:orphan:

# GraphDetailTool

The `GraphDetailTool` is a complete UI wrapper around `VisNetwork` that adds node detail visualization, JSON editing, and multi-node selection capabilities.

## Overview

GraphDetailTool composes `VisNetwork` and `JsonEditor` into a full graph editing workspace:

```{mermaid}
graph LR
    subgraph gdt [" GraphDetailTool "]
        controls(["Edit Controls"])
        graph(["VisNetwork"])
        details(["Detail Panel"])
    end

    controls --> graph
    graph -- "click/select" --> details
    details -- "edit" --> graph

    classDef controlNode fill:#8b7355,stroke:#6b5840,color:#ffffff
    classDef graphNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef detailNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class controls controlNode
    class graph graphNode
    class details detailNode
```

## Features

- **Edit mode controls**: Toggle between view, add node, and add edge modes
- **Node detail panel**: Click a node to see its properties in a JSON editor
- **Content visualization**: Automatic rendering based on node data type:
  - Images (PNG, JPG, SVG)
  - CSV data (interactive table + Plotly charts)
  - PDF documents
  - Plain text
- **Multi-node selection**: Select multiple nodes to see a comparison table with bulk editing
- **Drag position tracking**: Node positions are automatically updated on drag

## Usage

```python
from panelini.panels.visnetwork import GraphDetailTool

nodes = [
    {"id": 1, "label": "Image Node", "shape": "image", "image": "data:image/png;base64,..."},
    {"id": 2, "label": "Data Node", "csv_data": "col1,col2\n1,2\n3,4"},
    {"id": 3, "label": "Text Node", "text_content": "Hello World"},
]

edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
]

tool = GraphDetailTool(nodes=nodes, edges=edges)

# Access the underlying VisNetwork
tool.visnetwork.add_node({"id": 4, "label": "New"})

# The tool provides a complete Panel layout
tool.layout  # Use this in your Panel app
```

## Detail Panel Tabs

When a node is clicked, the detail panel shows two tabs:

1. **Visualization**: Renders the node's content based on its data type
2. **Details**: Shows all node properties in a JsonEditor for direct editing

Changes made in the JSON editor are automatically synced back to the graph.

## API Reference

See the full API documentation: {py:class}`panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool`
