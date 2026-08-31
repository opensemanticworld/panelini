# Overview

Walkthroughs of every example in [`examples/`](https://github.com/opensemanticworld/panelini/tree/main/examples), grouped by component. Each page explains the code, shows a short screen capture recorded from that example's Playwright test, and - where available - lets you run it live in your browser.

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} Chat
:link: ../panels/ai
:link-type: doc
:img-top: /_static/media/ai/chat_min_overview.webp
LLM chat panels - drop-in, tool-augmented, and multi-tab.
:::

:::{grid-item-card} JSON Editor
:link: ../panels/jsoneditor
:link-type: doc
:img-top: /_static/media/jsoneditor/jsoneditor_pydantic_overview.png
Schema-driven forms, including a Pydantic-backed variant.
:::

:::{grid-item-card} VisNetwork
:link: ../panels/visnetwork
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_context_menu_feature.webp
Interactive network graphs with context menus and drag interactions.
:::

:::{grid-item-card} Wunderbaum
:link: ../panels/wunderbaum
:link-type: doc
:img-top: /_static/media/wunderbaum/virtual_filesystem_overview.webp
Trees and tree-grids - columns, checkboxes, lazy loading, drag-and-drop, and more.
:::

:::{grid-item-card} Terminal Mirror
:link: ../panels/terminalmirror
:link-type: doc
:img-top: /_static/media/terminalmirror/terminalmirror_panelini_min_feature.webp
Stream Python stdout and stderr into a live on-screen terminal.
:::

:::{grid-item-card} Use cases
:link: usecases/index
:link-type: doc
:img-top: /_static/media/usecases/wunderbaum_visnetwork_overview.webp
Multi-component highlights - two panels wired together through one shared data model.
:::

::::

## Running the examples

```bash
git clone https://github.com/opensemanticworld/panelini.git
cd panelini && uv sync
python examples/panels/jsoneditor/jsoneditor_panelini_min.py
```

Each example ends with `pn.serve(...)` when run directly - just open the URL printed in the terminal.

## Tested end-to-end

Every example under `examples/panels/` is exercised by a Playwright test that imports the real module and asserts on rendered DOM. The screen captures are recorded from those same tests, so the docs never drift from the code - see [`tests/panels/*/examples/`](https://github.com/opensemanticworld/panelini/tree/main/tests/panels).

```bash
make test-ui         # UI tests only
make docs-media      # re-record the screen captures
```
