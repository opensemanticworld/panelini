# API Reference

This page provides an overview of all public modules, classes, and functions in the `panelini` package.

## Quick Imports

```python
# Core framework
from panelini import Panelini

# Panels (standalone, no Panelini dependency)
from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.visnetwork import VisNetwork, GraphDetailTool

# Utilities
from panelini.panels.visnetwork.utils import data_url_to_bytes
```

---

## Core

The core module provides the main application framework class for building dashboards with pre-designed responsive layouts.

```{list-table}
:header-rows: 1
:widths: 30 70

* - Class
  - Description
* - {py:class}`panelini.main.Panelini`
  - Main application class providing a responsive dashboard layout with header, sidebars, main content area, and footer. Built on `param.Parameterized` for reactive parameter-driven updates.
* - {py:class}`panelini.main.ImageFileNotFoundError`
  - Exception raised when a referenced image file cannot be found.
```

### `Panelini` -- Layout Management

The {py:class}`~panelini.main.Panelini` class provides methods for managing layout regions:

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `main_set(objects)`
  - Replace the main content area with the given list of Panel objects.
* - `main_add(objects)`
  - Append Panel objects to the existing main content.
* - `main_get()`
  - Retrieve the current list of main content objects.
* - `main_remove_index(index)`
  - Remove a main content object by index.
* - `main_clear()`
  - Remove all objects from the main content area.
* - `sidebar_set(objects)`
  - Replace the left sidebar content.
* - `sidebar_get()`
  - Retrieve the current left sidebar objects.
* - `sidebar_right_set(objects)`
  - Replace the right sidebar content.
* - `sidebar_right_get()`
  - Retrieve the current right sidebar objects.
* - `servable(**kwargs)`
  - Make the application servable for `panel serve`.
* - `__panel__()`
  - Panel integration hook returning the viewable layout.
```

### `Panelini` -- Configuration Parameters

```{list-table}
:header-rows: 1
:widths: 30 15 55

* - Parameter
  - Type
  - Description
* - `title`
  - `String`
  - Dashboard title displayed in the header.
* - `logo`
  - `str | Path`
  - Path to the logo image displayed in the header.
* - `logo_link_url`
  - `String`
  - URL the logo links to (default: `"/"`).
* - `header_background_image`
  - `str | Path`
  - Background image for the header area.
* - `content_background_image`
  - `str | Path`
  - Background image for the content area.
* - `static_dir`
  - `str | Path`
  - Directory for static assets.
* - `main`
  - `List`
  - List of Panel objects for the main content area.
* - `sidebar`
  - `List`
  - List of Panel objects for the left sidebar.
* - `sidebar_right`
  - `List`
  - List of Panel objects for the right sidebar.
* - `footer`
  - `List`
  - List of Panel objects for the footer.
* - `sidebar_enabled`
  - `Boolean`
  - Enable or disable the left sidebar (default: `True`).
* - `sidebar_visible`
  - `Boolean`
  - Show or hide the left sidebar (default: `True`).
* - `sidebar_right_enabled`
  - `Boolean`
  - Enable or disable the right sidebar (default: `False`).
* - `sidebar_right_visible`
  - `Boolean`
  - Show or hide the right sidebar (default: `False`).
* - `footer_enabled`
  - `Boolean`
  - Enable or disable the footer (default: `False`).
* - `sidebars_max_width`
  - `Integer`
  - Maximum width of sidebars in pixels (default: `300`, bounds: 100--500).
```

### Utility Functions

```{list-table}
:header-rows: 1
:widths: 35 65

* - Function
  - Description
* - `panelini.main.image_to_base64(image_path)`
  - Convert an image file to a base64-encoded data URL string.
```

---

## Panels

Independent standalone components usable in any Panel application -- with or without the Panelini framework. Each panel wraps a JavaScript library via the `AnyWidgetComponent` base class and Vue.js.

See the {doc}`Panels section <panels/index>` for usage guides and examples.

### `panelini.panels.jsoneditor` -- JSON Schema Form Editor

```{list-table}
:header-rows: 1
:widths: 30 70

* - Class
  - Description
* - {py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor`
  - JSON Schema-based form editor component. Wraps the [json-editor](https://github.com/json-editor/json-editor) JavaScript library, providing dynamic form generation from JSON Schema definitions with bi-directional Python/JS synchronization.
```

**Parameters:**

```{list-table}
:header-rows: 1
:widths: 25 15 60

* - Parameter
  - Type
  - Description
* - `value`
  - `Dict`
  - Current form data as a dictionary.
* - `options`
  - `Dict`
  - JSON Editor configuration (schema, theme, iconlib, etc.).
* - `ready`
  - `Boolean`
  - Whether the editor is initialized and ready.
* - `encoder`
  - `ClassSelector`
  - Custom JSON encoder class for serialization.
```

**Methods:**

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `get_value()`
  - Return the current form data.
* - `set_value(value)`
  - Set the form data.
* - `set_schema(schema, startval=None, keep_value=False)`
  - Load a new JSON Schema, optionally preserving or replacing the current value.
```

### `panelini.panels.visnetwork` -- Interactive Network Visualization

```{list-table}
:header-rows: 1
:widths: 30 70

* - Class
  - Description
* - {py:class}`panelini.panels.visnetwork.visnetwork.VisNetwork`
  - Interactive network/graph visualization component. Wraps [vis-network](https://visjs.github.io/vis-network/docs/network/) with full support for node/edge manipulation, edit modes, event handling, and batch operations.
* - {py:class}`panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool`
  - High-level graph editing UI that composes VisNetwork with JsonEditor for node detail editing, visualization of node data (images, CSV, PDF), and tabular editing.
```

#### `VisNetwork` -- Node Operations

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `add_node(node)`
  - Add a single node to the graph.
* - `remove_node(node_id)`
  - Remove a node by its ID.
* - `get_node(node_id)`
  - Retrieve a node dictionary by ID.
* - `set_nodes(nodes)`
  - Replace all nodes with the given list.
* - `get_nodes()`
  - Return all current nodes.
* - `update_node(node)`
  - Partially update a single node's properties.
* - `update_nodes(nodes)`
  - Batch partial update of multiple nodes.
* - `update_node_state(node_ids, state)`
  - Update the visual state of nodes (e.g., highlighting).
```

#### `VisNetwork` -- Edge Operations

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `add_edge(edge)`
  - Add a single edge to the graph.
* - `remove_edge(from_id, to_id)`
  - Remove an edge between two nodes.
* - `get_edge(edge_id=None, from_id=None, to_id=None)`
  - Retrieve an edge by ID or endpoint node IDs.
* - `set_edges(edges)`
  - Replace all edges with the given list.
* - `get_edges()`
  - Return all current edges.
* - `update_edge(edge)`
  - Partially update a single edge's properties.
```

#### `VisNetwork` -- Edit Modes & Actions

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `disable_edit_mode()`
  - Exit edit mode (selection only).
* - `add_node_mode()`
  - Enter add-node mode (click to place).
* - `add_edge_mode()`
  - Enter add-edge mode (drag to connect).
* - `clear()`
  - Remove all nodes and edges.
* - `merge_nodes(source_id, target_id, merge_properties=True)`
  - Merge two nodes, optionally combining their properties.
* - `batch_update(actions)`
  - Execute a list of graph actions atomically.
* - `execute_step(step)`
  - Execute a single playbook step.
* - `request_position_update()`
  - Request current node positions from the frontend.
```

#### `GraphDetailTool`

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `build_panel()`
  - Build the complete UI layout with graph, detail pane, and controls.
* - `show_node_details(node_id)`
  - Display the detail view for a specific node.
* - `show_multi_node_editor(node_ids)`
  - Display the multi-node batch editor.
* - `network_event_callback(event_name, event_params_dict)`
  - Handle network events (click, select, drag, etc.).
* - `update_node(new_node_dict)`
  - Update a node in the graph and refresh the detail view.
* - `__panel__()`
  - Return the Panel layout for embedding.
```

### `panelini.panels.visnetwork.utils` -- Utilities

```{list-table}
:header-rows: 1
:widths: 35 65

* - Function
  - Description
* - `data_url_to_bytes(data_url)`
  - Convert a `data:` URL to raw bytes (useful for decoding embedded images, files).
```

---

## Components

Panelini-dependent building blocks that require the Panelini framework. See {doc}`Components <components>` for details.

```{admonition} Status
:class: note

The components module is currently in planning stage. No implementations exist yet. Contributions welcome.
```

---

## Full Auto-Generated Reference

For complete class signatures, method arguments, and docstrings, see the [auto-generated API documentation](apidocs/index).
