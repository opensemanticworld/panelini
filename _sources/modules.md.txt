# API reference

A handwritten overview of the public API, organised by what you're most likely to import. For exhaustive signatures and docstrings jump straight to the [auto-generated reference](apidocs/index).

## Quick imports

```python
# Core framework
from panelini import Panelini

# Core with the AI chat enabled
app = Panelini(title="My app", use_ai=True)

# Panels - standalone, no panelini dependency
from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.visnetwork import VisNetwork, GraphDetailTool
from panelini.panels.ai import AiChat

# Utilities
from panelini.panels.visnetwork.utils import data_url_to_bytes
```

---

## Core

### `panelini.main.Panelini`

The dashboard shell. Built on `param.Parameterized`, so every constructor argument below is also a reactive attribute you can set at runtime.

#### Layout methods

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - What it does
* - `main_set(objects)`
  - Replace the main-area content.
* - `main_add(objects)`
  - Append to the main area.
* - `main_get()`
  - Return the current main-area objects.
* - `main_remove_index(index)`
  - Remove one object by index.
* - `main_clear()`
  - Remove everything from the main area.
* - `sidebar_set / sidebar_add / sidebar_get`
  - Same as above for the left sidebar.
* - `sidebar_right_set / sidebar_right_add / sidebar_right_get`
  - Same as above for the right sidebar.
* - `footer_set / footer_add / footer_get`
  - Same as above for the footer.
* - `servable(**kwargs)`
  - Make the app servable via `panel serve`.
* - `__panel__()`
  - Return the composed Panel layout.
```

#### Parameters

```{list-table}
:header-rows: 1
:widths: 30 15 55

* - Parameter
  - Type
  - Default / notes
* - `title`
  - `String`
  - Dashboard title shown in the header.
* - `logo`
  - `str | Path`
  - Header logo. Defaults to the bundled Panelini mark.
* - `logo_link_url`
  - `String`
  - URL the logo links to (default: `"/"`).
* - `header_background_image`
  - `str | Path | None`
  - Header background. `None` disables it (skips ~530 KB of base64 CSS).
* - `content_background_image`
  - `str | Path | None`
  - Content background. Same `None` trick applies.
* - `static_dir`
  - `str | Path`
  - Directory served as static assets.
* - `main`
  - `List`
  - Initial main-area objects.
* - `sidebar` / `sidebar_right` / `footer`
  - `List`
  - Initial objects for each region.
* - `sidebar_enabled`
  - `Boolean`
  - Show the left sidebar (default: `True`).
* - `sidebar_visible`
  - `Boolean`
  - Expand state of the left sidebar (default: `True`).
* - `sidebar_right_enabled`
  - `Boolean`
  - Show the right sidebar (default: `False`).
* - `sidebar_right_visible`
  - `Boolean`
  - Expand state of the right sidebar (default: `False`).
* - `footer_enabled`
  - `Boolean`
  - Show the footer (default: `False`).
* - `sidebars_max_width`
  - `Integer`
  - Max sidebar width in px (default: `300`, bounds: 100–500).
* - `use_ai`
  - `Boolean`
  - Inject the AI chat panel (default: `False`). Requires `panelini[ai]`.
* - `ai_system_message`
  - `String`
  - System prompt for the AI backend.
* - `ai_welcome_message`
  - `String`
  - Greeting shown in the chat pane.
* - `ai_config_path`
  - `str | Path`
  - Custom `config.yml`. Auto-discovered when `None`.
```

#### Helpers

```{list-table}
:header-rows: 1
:widths: 35 65

* - Symbol
  - Description
* - `panelini.main.image_to_base64(path)`
  - Read an image from disk and return a `data:image/...;base64,...` URL.
* - `panelini.main.ImageFileNotFoundError`
  - Raised when a referenced image path doesn't exist.
```

---

## Panels

### `panelini.panels.jsoneditor.JsonEditor`

JSON-Schema form editor wrapping [json-editor](https://github.com/json-editor/json-editor).

**Parameters:** `value` (dict), `options` (dict), `ready` (bool), `encoder` (JSON encoder class).

**Methods:**

```{list-table}
:header-rows: 1
:widths: 35 65

* - Method
  - Description
* - `get_value()`
  - Current form data.
* - `set_value(value)`
  - Set form data.
* - `set_schema(schema, startval=None, keep_value=False)`
  - Swap schemas, optionally preserving or seeding values.
```

See {doc}`panels/jsoneditor` for usage, or the full API: {py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor`.

### `panelini.panels.visnetwork.VisNetwork`

Interactive network graph wrapping [vis-network](https://visjs.github.io/vis-network/docs/network/). Full node/edge manipulation, edit modes, file-drop handling, and event callbacks.

#### Node operations

| Method | Description |
| --- | --- |
| `add_node(node)` | Add a single node. |
| `remove_node(node_id)` | Remove a node by ID. |
| `get_node(node_id)` | Retrieve a node dict. |
| `set_nodes(nodes)` | Replace all nodes. |
| `get_nodes()` | All current nodes. |
| `update_node(node)` | Partial update of one node. |
| `update_nodes(nodes)` | Partial update of many nodes. |
| `update_node_state(ids, state)` | Update visual state (e.g. highlighting). |

#### Edge operations

| Method | Description |
| --- | --- |
| `add_edge(edge)` | Add a single edge. |
| `remove_edge(from_id, to_id)` | Remove an edge between two nodes. |
| `get_edge(edge_id=None, from_id=None, to_id=None)` | Retrieve an edge. |
| `set_edges(edges)` | Replace all edges. |
| `get_edges()` | All current edges. |
| `update_edge(edge)` | Partial update. |

#### Modes & actions

| Method | Description |
| --- | --- |
| `disable_edit_mode()` | Exit edit mode. |
| `add_node_mode()` | Click to place new nodes. |
| `add_edge_mode()` | Drag to connect nodes. |
| `clear()` | Remove all nodes and edges. |
| `merge_nodes(source_id, target_id, merge_properties=True)` | Merge two nodes. |
| `batch_update(actions)` | Execute a list of actions atomically. |
| `execute_step(step)` | Run a single playbook step. |
| `request_position_update()` | Ask the frontend for current positions. |

### `panelini.panels.visnetwork.GraphDetailTool`

High-level graph workspace composing `VisNetwork` and `JsonEditor`. See {doc}`panels/graph_detail_tool`.

### `panelini.panels.visnetwork.utils.data_url_to_bytes`

Convert a `data:` URL to raw bytes. Useful when unpacking dropped files from the graph.

### `panelini.panels.ai.AiChat`

LangChain-backed chat panel with a markdown preview pane, tool toggles, and export/import. See {doc}`panels/ai`.

**Required extra:** `panelini[ai]`.

**Key attributes:**

| Attribute / method | Description |
| --- | --- |
| `AiChat(system_message=..., welcome_message=..., config_path=..., tools=...)` | Constructor. All args optional. |
| `main_objects` | Panel objects for the main area. |
| `sidebar_objects` | Panel objects for the sidebar. |

Underlying machinery:

| Class / function | Role |
| --- | --- |
| `panelini.panels.ai.backend.AiBackend` | Provider/model/tool management, tool-call loop, export/restore. |
| `panelini.panels.ai.utils.ai_interface.AiInterface` | Provider-agnostic LangChain wrapper with streaming + tool binding. |
| `panelini.panels.ai.utils.ai_interface.create_interface(...)` | Factory that builds an `AiInterface` for any configured provider. |
| `panelini.panels.ai.utils.config.load_config(path=None)` | Load and validate a YAML config. Auto-discovery rules live here. |
| `panelini.panels.ai.utils.config.AppConfig` / `ProviderConfig` / `ModelConfig` | Frozen dataclasses describing the loaded config. |
| `panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool` | Returns the current time, tz-aware. |
| `panelini.panels.ai.tools.basic_tools.UpdatePreviewTool` | Renders markdown in the preview pane. |

---

## Full auto-generated reference

Every public module, class, and function - generated from source docstrings - lives in the auto-generated reference:

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 📚 Browse the full API
:link: apidocs/index
:link-type: doc
All modules, every signature, every docstring.
:::

:::{grid-item-card} 🧭 Back to architecture
:link: architecture
:link-type: doc
High-level picture of how the pieces fit together.
:::

::::

```{toctree}
:hidden:

apidocs/index
```
