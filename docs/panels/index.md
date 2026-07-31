# Overview

Panels are **independent, standalone components** that can be used in any Panel application - with or without the Panelini framework. They're designed for maximum reusability.

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} JsonEditor
:link: jsoneditor
:link-type: doc
JSON-Schema driven form editor. Dynamic schemas, theming, bi-directional value sync.
:::

:::{grid-item-card} VisNetwork
:link: visnetwork
:link-type: doc
Interactive physics-simulated graph with edit modes, drag-drop files, and event callbacks.
:::

:::{grid-item-card} Wunderbaum
:link: wunderbaum
:link-type: doc
Fast tree and tree-grid with columns, checkboxes, drag-and-drop, context menus, and lazy loading.
:::

:::{grid-item-card} GraphDetailTool
:link: graph_detail_tool
:link-type: doc
High-level workspace that composes VisNetwork + JsonEditor with a detail pane.
:::

:::{grid-item-card} AiChat
:link: ai
:link-type: doc
LangChain-powered chat panel with multi-provider support, tools, and live preview.
:::

:::{grid-item-card} TerminalMirror
:link: terminalmirror
:link-type: doc
Mirror sys.stdout into an on-screen terminal widget with automatic collapse/expand buffer replay.
:::

::::

```{mermaid}
graph LR
    subgraph panels [" Available Panels "]
        je(["JsonEditor"])
        vn(["VisNetwork"])
        wb(["Wunderbaum"])
        gdt(["GraphDetailTool"])
        ai(["AiChat"])
        tm(["TerminalMirror"])
    end

    panelini(["Panelini App"])
    standalone(["Standalone Panel App"])
    other(["Other Frameworks"])

    panels --> panelini
    panels --> standalone
    panels --> other

    classDef panelNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef targetNode fill:#1e293b,stroke:#334155,color:#f8fafc

    class je,vn,wb,gdt,ai,tm panelNode
    class panelini,standalone,other targetNode
```

## Available Panels

```{list-table}
:header-rows: 1
:widths: 20 50 30

* - Panel
  - Description
  - Technology
* - {doc}`JsonEditor <jsoneditor>`
  - JSON Schema-based form editor with dynamic schema support
  - [json-editor](https://github.com/json-editor/json-editor) + Vue.js
* - {doc}`VisNetwork <visnetwork>`
  - Interactive network/graph visualization with manipulation
  - [vis-network](https://visjs.github.io/vis-network/docs/network/) + Vue.js
* - {doc}`Wunderbaum <wunderbaum>`
  - Tree / tree-grid with columns, checkboxes, drag-and-drop, and lazy loading
  - [wunderbaum](https://mar10.github.io/wunderbaum/) + Vue.js
* - {doc}`GraphDetailTool <graph_detail_tool>`
  - Complete graph editing UI with node detail visualization
  - Composes VisNetwork + JsonEditor
* - {doc}`AiChat <ai>`
  - LLM-powered chat interface with multi-provider support, tool execution, and live preview
  - [LangChain](https://python.langchain.com/) + Panel ChatInterface
* - {doc}`TerminalMirror <terminalmirror>`
  - Mirror sys.stdout into an on-screen terminal widget; auto-wires collapse/expand buffer replay
  - Panel Terminal (xterm.js)
```

## Design Principles

All panels follow these design principles:

- **No Panelini dependency**: Panels only depend on `panel` and `param` (plus optional extras)
- **AnyWidgetComponent base**: Bridge Python and JavaScript via bi-directional property sync (for JS-based panels)
- **Vue.js frontend**: JS-based panels have a Vue.js wrapper around their JavaScript library
- **Callback-driven**: User interactions are communicated via event callbacks
- **Bundled assets**: JavaScript and CSS are pre-built and shipped with the package
