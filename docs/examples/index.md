# Examples

Every example lives in [`examples/`](https://github.com/opensemanticworld/panelini/tree/main/examples) in the repository. This section walks through each one, explains what it demonstrates, and shows how it's covered by the test suite. Each card carries a short screen capture recorded straight from that example's Playwright test.

## Chat

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} AI chat - minimal
:link: ai_chat_min
:link-type: doc
:img-top: /_static/media/ai/chat_min_feature.png
Drop an LLM chat into a Panelini dashboard with one flag.
:::

:::{grid-item-card} AI chat - custom tool
:link: ai_chat_custom_tool
:link-type: doc
:img-top: /_static/media/ai/chat_custom_tool_feature.png
Hook a LangChain `BaseTool` (a local key-value store) into the chat.
:::

:::{grid-item-card} AI chat - multi-tab
:link: ai_chat_multi_tab
:link-type: doc
:img-top: /_static/media/ai/chat_multi_tab_feature.png
Host two independent chats in synced tabs with `jslink`.
:::

::::

## JSON Editor

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} JSON editor
:link: jsoneditor
:link-type: doc
:img-top: /_static/media/jsoneditor/jsoneditor_panelini_min_feature.png
Render a JSON-Schema driven form inside a Panelini card.
:::

:::{grid-item-card} Pydantic-backed JSON editor
:link: jsoneditor_pydantic
:link-type: doc
:img-top: /_static/media/jsoneditor/jsoneditor_pydantic_overview.png
Drive a JSON editor from a Pydantic model - schema and initial value derived automatically.
:::

::::

## VisNetwork

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} VisNetwork graph
:link: visnetwork
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_panelini_min_feature.png
Interactive network graph with `vis-network` + Vue.
:::

:::{grid-item-card} Context menus
:link: visnetwork_context_menu
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_context_menu_feature.webp
Right-click nodes and edges to run per-element actions from Python.
:::

:::{grid-item-card} Ctrl+drag duplicate
:link: visnetwork_ctrl_drag_duplicate
:link-type: doc
:img-top: /_static/media/visnetwork/ctrl_drag_duplicate_feature.webp
Hold Ctrl and drag to clone nodes, with a post-processing callback.
:::

::::

## Wunderbaum

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} Tree - minimal (panelini)
:link: wunderbaum_panelini_min
:link-type: doc
:img-top: /_static/media/wunderbaum/wunderbaum_panelini_min_feature.png
The smallest nested tree, hosted in a Panelini card.
:::

:::{grid-item-card} Tree - minimal (standalone)
:link: wunderbaum_panel_min
:link-type: doc
:img-top: /_static/media/wunderbaum/wunderbaum_panel_min_feature.png
The same tree as a plain Panel app, without the Panelini shell.
:::

:::{grid-item-card} Treegrid - columns
:link: wunderbaum_table_min
:link-type: doc
:img-top: /_static/media/wunderbaum/wunderbaum_table_min_overview.png
Switch to tree + table mode with per-node column values.
:::

:::{grid-item-card} Checkbox tree
:link: checkbox_tree
:link-type: doc
:img-top: /_static/media/wunderbaum/checkbox_tree_feature.webp
Hierarchical checkboxes with tri-state parent propagation.
:::

:::{grid-item-card} Context menu
:link: context_menu
:link-type: doc
:img-top: /_static/media/wunderbaum/context_menu_feature.webp
Right-click a node to add, rename, or delete via a callback.
:::

:::{grid-item-card} Lazy loading
:link: lazy_loading
:link-type: doc
:img-top: /_static/media/wunderbaum/lazy_loading_feature.webp
Load children on demand when a lazy node is expanded.
:::

:::{grid-item-card} Incremental tree updates
:link: incremental_tree_demo
:link-type: doc
:img-top: /_static/media/wunderbaum/incremental_tree_demo_feature.webp
Build a folder structure step by step with action playbooks.
:::

:::{grid-item-card} DAG projection
:link: dag_projection
:link-type: doc
:img-top: /_static/media/wunderbaum/dag_projection_feature.png
Project a graph of `SubClassOf` / `HasPart` edges into a treegrid.
:::

:::{grid-item-card} Virtual filesystem
:link: virtual_filesystem
:link-type: doc
:img-top: /_static/media/wunderbaum/virtual_filesystem_overview.webp
The full demo - columns, DnD, context menu, rename, file drop.
:::

::::

## Use cases

Multi-component highlights - two panels wired together through one shared data model.

::::{grid} 1 2 2 2
:gutter: 3

:::{grid-item-card} Form + graph editor
:link: usecase_jsoneditor_visnetwork
:link-type: doc
:img-top: /_static/media/usecases/jsoneditor_visnetwork_overview.webp
A JsonEditor form and a VisNetwork graph over one data model - edit the form to rebuild the graph, click a node to edit it.
:::

:::{grid-item-card} Tree + graph editor
:link: usecase_wunderbaum_visnetwork
:link-type: doc
:img-top: /_static/media/usecases/wunderbaum_visnetwork_overview.webp
A Wunderbaum class hierarchy and a VisNetwork graph kept in sync - drag to reparent, right-click for actions.
:::

::::

## Running the examples

```bash
# Clone the repo
git clone https://github.com/opensemanticworld/panelini.git
cd panelini
uv sync

# Run any example
python examples/panels/ai/chat_min.py
python examples/panels/jsoneditor/jsoneditor_panelini_min.py
python examples/panels/visnetwork/visnetwork_panelini_min.py
```

Each example ends with `pn.serve(...)` when run directly - just open the URL printed in the terminal. Or open the {doc}`../portfolio/index`, where most examples run live in your browser via Pyodide.

## Tested end-to-end

Every example under `examples/panels/` is exercised by a Playwright test that imports the real module and asserts on rendered DOM. The screen captures above are recorded from those same tests, so the docs never drift from what the code actually does - see [`tests/panels/*/examples/`](https://github.com/opensemanticworld/panelini/tree/main/tests/panels).

```bash
make test-ui         # UI tests only
make test-full       # unit + UI
make docs-media      # re-record the screen captures
```

```{toctree}
:caption: Chat
:hidden:

ai_chat_min
ai_chat_custom_tool
ai_chat_multi_tab
```

```{toctree}
:caption: JSON Editor
:hidden:

jsoneditor
jsoneditor_pydantic
```

```{toctree}
:caption: VisNetwork
:hidden:

visnetwork
visnetwork_context_menu
visnetwork_ctrl_drag_duplicate
```

```{toctree}
:caption: Wunderbaum
:hidden:

wunderbaum_panelini_min
wunderbaum_panel_min
wunderbaum_table_min
checkbox_tree
context_menu
lazy_loading
incremental_tree_demo
dag_projection
virtual_filesystem
```

```{toctree}
:caption: Use cases
:hidden:

usecase_jsoneditor_visnetwork
usecase_wunderbaum_visnetwork
```
