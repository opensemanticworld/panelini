# Examples

Every example lives in [`examples/`](https://github.com/opensemanticworld/panelini/tree/main/examples) in the repository. This section walks through each one, explains what it demonstrates, and shows how it's covered by the test suite.

## At a glance

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} AI chat — minimal
:link: ai_chat_min
:link-type: doc
Drop an LLM chat into a Panelini dashboard with one flag.
:::

:::{grid-item-card} AI chat — custom tool
:link: ai_chat_custom_tool
:link-type: doc
Hook a LangChain `BaseTool` (a local key–value store) into the chat.
:::

:::{grid-item-card} AI chat — multi-tab
:link: ai_chat_multi_tab
:link-type: doc
Host two independent chats in synced tabs with `jslink`.
:::

:::{grid-item-card} JSON editor
:link: jsoneditor
:link-type: doc
Render a JSON-Schema driven form inside a Panelini card.
:::

:::{grid-item-card} Pydantic-backed JSON editor
:link: jsoneditor_pydantic
:link-type: doc
Drive a JSON editor from a Pydantic model — schema and initial value derived automatically.
:::

:::{grid-item-card} VisNetwork graph
:link: visnetwork
:link-type: doc
Interactive network graph with `vis-network` + Vue.
:::

:::{grid-item-card} Wunderbaum tree — minimal
:link: wunderbaum_panelini_min
:link-type: doc
The smallest nested tree, hosted in a Panelini card.
:::

:::{grid-item-card} Wunderbaum treegrid — columns
:link: wunderbaum_table_min
:link-type: doc
Switch to tree + table mode with per-node column values.
:::

:::{grid-item-card} Checkbox tree
:link: checkbox_tree
:link-type: doc
Hierarchical checkboxes with tri-state parent propagation.
:::

:::{grid-item-card} Context menu
:link: context_menu
:link-type: doc
Right-click a node to add, rename, or delete via a callback.
:::

:::{grid-item-card} Lazy loading
:link: lazy_loading
:link-type: doc
Load children on demand when a lazy node is expanded.
:::

:::{grid-item-card} Incremental tree updates
:link: incremental_tree_demo
:link-type: doc
Build a folder structure step by step with action playbooks.
:::

:::{grid-item-card} DAG projection
:link: dag_projection
:link-type: doc
Project a graph of `SubClassOf` / `HasPart` edges into a treegrid.
:::

:::{grid-item-card} Virtual filesystem
:link: virtual_filesystem
:link-type: doc
The full demo — columns, DnD, context menu, rename, file drop.
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

Each example ends with `pn.serve(...)` when run directly — just open the URL printed in the terminal.

## Tested end-to-end

Every example under `examples/panels/` is exercised by a Playwright test that imports the real module and asserts on rendered DOM. If an example breaks, the corresponding test fails — see [`tests/panels/*/examples/`](https://github.com/opensemanticworld/panelini/tree/main/tests/panels).

Run them locally:

```bash
make test-ui         # UI tests only
make test-full       # unit + UI
```

With background images disabled globally in `tests/conftest.py`, the full UI suite completes in ~43 s.
