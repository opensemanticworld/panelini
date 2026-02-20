# Panels

Panels are **independent, standalone components** that can be used in any Panel application -- with or without the Panelini framework. They are designed for maximum reusability.

```{mermaid}
graph LR
    subgraph panels [" Available Panels "]
        je(["JsonEditor"])
        vn(["VisNetwork"])
        gdt(["GraphDetailTool"])
    end

    panelini(["Panelini App"])
    standalone(["Standalone Panel App"])
    other(["Other Frameworks"])

    panels --> panelini
    panels --> standalone
    panels --> other

    classDef panelNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef targetNode fill:#1e293b,stroke:#334155,color:#f8fafc

    class je,vn,gdt panelNode
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
* - {doc}`GraphDetailTool <graph_detail_tool>`
  - Complete graph editing UI with node detail visualization
  - Composes VisNetwork + JsonEditor
```

## Design Principles

All panels follow these design principles:

- **No Panelini dependency**: Panels only depend on `panel` and `param`
- **AnyWidgetComponent base**: Bridge Python and JavaScript via bi-directional property sync
- **Vue.js frontend**: Each panel has a Vue.js wrapper around its JavaScript library
- **Callback-driven**: User interactions are communicated via event callbacks
- **Bundled assets**: JavaScript and CSS are pre-built and shipped with the package

```{toctree}
:maxdepth: 1
:hidden:

jsoneditor
visnetwork
```
