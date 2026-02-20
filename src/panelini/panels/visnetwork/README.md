# VisNetwork Panel

Interactive network/graph visualization component using vis-network library.

## Components

- **VisNetwork**: Core visualization component for displaying and interacting with network graphs
- **GraphDetailTool**: UI wrapper with edit controls, node details, and data visualization

## Building the Vue Component

Before using this panel, you need to build the Vue component:

```bash
cd vue
npm install
npm run build
```

This will generate the bundled assets in `vue/dist/`:
- `visnetwork_vue.mjs` - ES module bundle
- `visnetwork_vue.css` - Compiled styles

## Usage

### Basic VisNetwork

```python
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

network = VisNetwork(nodes=nodes, edges=edges)
network.servable()
```

### With Event Callbacks

```python
def on_network_event(event_name, event_params):
    print(f"Event: {event_name}", event_params)

network = VisNetwork(
    nodes=nodes,
    edges=edges,
    network_event_callback=on_network_event,
)
```

### GraphDetailTool

```python
from panelini.panels.visnetwork import GraphDetailTool

tool = GraphDetailTool(nodes=nodes, edges=edges)
tool.build_panel().servable()
```

## Features

- Interactive node/edge manipulation (add, edit, delete)
- Drag-and-drop file support (images, CSV, PDF, text)
- Physics simulation
- Clustering support
- Event callbacks for all network interactions
- Node detail visualization with JSON editor
