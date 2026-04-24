# Architecture

panelini is a **layout framework plus a panel library**. This page explains how the pieces fit together, how they talk to each other, and what design decisions shaped the codebase.

## Three layers

```{mermaid}
graph TB
    subgraph core [" Core "]
        init(["__init__.py"])
        main(["Panelini"])
        css(["main.css"])
    end

    subgraph panels [" Panels ( standalone ) "]
        je(["JsonEditor"])
        vn(["VisNetwork"])
        gdt(["GraphDetailTool"])
        ai(["AiChat"])
    end

    subgraph components [" Components ( panelini-coupled ) "]
        future(["future components"])
    end

    init --> main
    gdt --> vn
    gdt -.-> je
    ai -.-> main

    classDef coreNode fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef panelNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef componentNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class init,main,css coreNode
    class je,vn,gdt,ai panelNode
    class future componentNode
```

| Layer | What it does | Where it lives |
| --- | --- | --- |
| **Core** | Dashboard shell: header, sidebars, main area, footer. | `src/panelini/main.py` |
| **Panels** | Self-contained reusable UI: JSON editor, graph, chat. Work **with or without** Panelini. | `src/panelini/panels/` |
| **Components** | Building blocks that depend on the Panelini framework. Installed as optional extras. | `src/panelini/components/` |

The key distinction: **panels never import `Panelini`**. They're plain Panel components that plug into any dashboard. Components, by contrast, assume the panelini layout exists and wire into it directly.

## Dashboard layout

```{mermaid}
graph TB
    subgraph layout [" Panelini "]
        direction TB
        subgraph header [" Header "]
            direction LR
            logo(["Logo"]) --- title(["Title"]) --- nav(["Nav buttons"])
        end
        subgraph content [" Content "]
            direction LR
            sl(["Left sidebar"]) --- ma(["Main"]) --- sr(["Right sidebar"])
        end
        subgraph footer [" Footer "]
            foot(["Footer content"])
        end
    end

    header --> content
    content --> footer

    classDef h fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef m fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef s fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef f fill:#94a3b8,stroke:#475569,color:#ffffff

    class logo,title,nav h
    class ma m
    class sl,sr s
    class foot f
```

Every region accepts any Panel object. Each is managed by a matching trio of methods:

```{list-table}
:header-rows: 1
:widths: 25 25 25 25

* - Region
  - Set
  - Add
  - Get
* - Main
  - `main_set`
  - `main_add`
  - `main_get`
* - Left sidebar
  - `sidebar_set`
  - `sidebar_add`
  - `sidebar_get`
* - Right sidebar
  - `sidebar_right_set`
  - `sidebar_right_add`
  - `sidebar_right_get`
* - Footer
  - `footer_set`
  - `footer_add`
  - `footer_get`
```

`main_remove_index`, `main_clear`, and friends round out the API.

## Panel bridge (AnyWidget + Vue)

`JsonEditor`, `VisNetwork`, and `GraphDetailTool` all follow the same pattern: a Python-side `param.Parameterized` class speaks to a Vue.js wrapper in the browser via the AnyWidget bi-directional sync.

```{mermaid}
graph LR
    subgraph python [" Python server "]
        props(["param properties"])
        callbacks(["@param.depends callbacks"])
    end

    subgraph bridge [" AnyWidget "]
        sync(["bi-directional sync"])
    end

    subgraph browser [" Browser "]
        vue(["Vue wrapper"])
        lib(["JS library"])
        dom(["DOM"])
    end

    props <--> sync
    sync <--> vue
    vue --> lib --> dom
    dom -- events --> vue
    vue -- "_event_data" --> sync
    sync -- callback --> callbacks

    classDef py fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef br fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef js fill:#0d7377,stroke:#095c5f,color:#ffffff
    class props,callbacks py
    class sync br
    class vue,lib,dom js
```

Key points:

- **Param → JS** — props (nodes, edges, options, value) sync automatically on change.
- **JS → Param** — user events write to a single `_event_data` param, which Python callbacks unpack.
- **One-shot actions** — methods like `add_node` or `set_schema` set a param that the frontend observes for a single tick.
- **Bundled assets** — JS + CSS are pre-built and shipped with the package. No `npm install` at deploy time.

## Data flow for a user interaction

```{mermaid}
sequenceDiagram
    participant User
    participant Vue as Vue wrapper
    participant Bridge as AnyWidget
    participant Py as Panel component
    participant App as Your callback

    User->>Vue: click / drag / type
    Vue->>Bridge: _event_data = {...}
    Bridge->>Py: sync param
    Py->>Py: @param.depends fires
    Py->>App: on_event(kind, data)
    App->>Py: update_node(...)
    Py->>Bridge: sync param
    Bridge->>Vue: apply change
    Vue->>User: re-render
```

## The AI chat panel

```{mermaid}
graph TB
    subgraph ai [" panelini.panels.ai "]
        direction TB
        fe(["AiChat<br/>frontend.py"])
        be(["AiBackend<br/>backend.py"])
        ifc(["AiInterface<br/>utils/ai_interface.py"])
        cfg(["load_config<br/>utils/config.py"])
        tools(["basic_tools.py<br/>+ user tools"])
    end

    subgraph providers [" Providers "]
        anth(["Anthropic"])
        azure(["Azure OpenAI"])
    end

    fe --> be
    be --> ifc
    be --> cfg
    be --> tools
    ifc --> anth
    ifc --> azure

    classDef ai fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef prov fill:#6366f1,stroke:#4f46e5,color:#ffffff
    class fe,be,ifc,cfg,tools ai
    class anth,azure prov
```

- **`AiChat`** — UI: chat widget, sidebar controls, markdown preview pane. Exposes `main_objects` and `sidebar_objects` for embedding.
- **`AiBackend`** — business logic: provider/model switching, tool-call loop, history management, export/import.
- **`AiInterface`** — thin LangChain wrapper that's provider-agnostic. Streaming + tool binding in one place.
- **Config** — YAML file with env-var interpolation. Auto-discovered from `PANELINI_AI_CONFIG_PATH`, then `config.yml` walking upward, then the bundled default.

## GraphDetailTool composition

```{mermaid}
graph TB
    subgraph gdt [" GraphDetailTool "]
        direction TB
        subgraph controls [" Edit controls "]
            direction LR
            dis(["Disable edit"])
            an(["Add node"])
            ae(["Add edge"])
        end
        subgraph workspace [" Workspace "]
            direction LR
            vn(["VisNetwork"])
            subgraph detail [" Detail pane "]
                direction TB
                viz(["Visualization"])
                ed(["JsonEditor"])
            end
        end
    end

    controls --> vn
    vn -- "node click" --> detail
    ed -- "value change" --> vn

    classDef c fill:#8b7355,stroke:#6b5840,color:#ffffff
    classDef g fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef d fill:#6366f1,stroke:#4f46e5,color:#ffffff
    class dis,an,ae c
    class vn g
    class viz,ed d
```

`GraphDetailTool` is a reference implementation of the **compose-panels** pattern: take `VisNetwork` and `JsonEditor`, wire their events together, and expose one layout.

Features:

- Single-node click → visualisation + editor
- Multi-select → comparison table with bulk editing
- Content-type detection → image / CSV / PDF / text rendering
- Drag events → node positions sync back to the graph

## Design decisions

- **No re-invention of reactivity.** panelini rides entirely on `param` — the same foundation Panel is built on.
- **Bundle the frontend.** Users don't need a JS toolchain to deploy a panelini app.
- **Opt-in heaviness.** LangChain is an optional extra; background images can be switched off.
- **Stable panels, evolving core.** Panels are versioned with their JS bundles; the Panelini class is where most churn lives.

## See also

- {doc}`modules` — API reference overview
- {doc}`panels/index` — guide to each reusable panel
- {doc}`examples/index` — runnable walkthroughs
