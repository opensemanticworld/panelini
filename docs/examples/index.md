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
