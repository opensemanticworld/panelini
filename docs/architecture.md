# Architecture

This page describes the high-level architecture of panelini, how its modules relate to each other, and how data flows through the system.

## Package Structure

```{mermaid}
graph TB
    subgraph core [" Core "]
        direction TB
        init(["__init__.py"])
        main(["Panelini"])
        css(["main.css"])
    end

    subgraph panels [" Panels "]
        direction TB
        je(["JsonEditor"])
        vn(["VisNetwork"])
        gdt(["GraphDetailTool"])
        utils(["utils"])
    end

    subgraph components [" Components "]
        direction TB
        ai(["AI Chat"])
    end

    init --> main
    gdt --> vn
    gdt -.-> je
    ai -.-> main

    classDef coreNode fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef panelNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef componentNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class init,main,css coreNode
    class je,vn,gdt,utils panelNode
    class ai componentNode
```

The panelini package has three layers:

- **Core** (`main.py`): The `Panelini` class provides the application layout framework
- **Panels** (`panels/`): Independent, reusable components that work with or without Panelini
- **Components** (`components/`): Panelini-dependent building blocks (e.g., the AI chat component)

Panels are designed to be **standalone** -- they can be used directly in any Panel application without importing the Panelini framework. Components integrate into Panelini and are installed as optional extras.

## Dashboard Layout

The `Panelini` class composes a responsive dashboard layout from distinct sections:

```{mermaid}
graph TB
    subgraph layout [" Panelini Dashboard "]
        direction TB
        subgraph header [" Header / Navbar "]
            direction LR
            logo(["Logo"])
            title(["Title"])
            nav(["Nav Buttons"])
        end

        subgraph content [" Content Area "]
            direction LR
            sidebar_left(["Left Sidebar"])
            main_area(["Main Content"])
            sidebar_right(["Right Sidebar"])
        end

        subgraph footer [" Footer "]
            footer_content(["Footer Content"])
        end
    end

    header --> content
    content --> footer

    classDef headerNode fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef contentNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef sidebarNode fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef footerNode fill:#94a3b8,stroke:#475569,color:#ffffff

    class logo,title,nav headerNode
    class main_area contentNode
    class sidebar_left,sidebar_right sidebarNode
    class footer_content footerNode
```

Each section accepts any Panel component:

- **Header**: Logo image, title text, and navigation button bar
- **Left/Right Sidebars**: Toggleable sidebars with configurable max width
- **Main Content**: The primary content area managed via `main_set()`, `main_add()`, etc.
- **Footer**: Optional footer section

All sections support custom CSS classes and background images.

## Panel Component Architecture

Both `JsonEditor` and `VisNetwork` follow the same architecture pattern -- they are `AnyWidgetComponent` subclasses that bridge Python and JavaScript via Vue.js:

```{mermaid}
graph LR
    subgraph python [" Python Server "]
        props(["Param Properties"])
        callbacks(["Event Callbacks"])
    end

    subgraph bridge [" AnyWidget Bridge "]
        sync(["Bi-directional Sync"])
    end

    subgraph browser [" JavaScript Browser "]
        vue(["Vue.js Wrapper"])
        lib(["JS Library"])
        dom(["DOM"])
    end

    props <--> sync
    sync <--> vue
    vue --> lib --> dom
    dom -- "events" --> vue
    vue -- "_event_data" --> sync
    sync -- "callback" --> callbacks

    classDef pyNode fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef bridgeNode fill:#6366f1,stroke:#4f46e5,color:#ffffff
    classDef jsNode fill:#0d7377,stroke:#095c5f,color:#ffffff

    class props,callbacks pyNode
    class sync bridgeNode
    class vue,lib,dom jsNode
```

**Key points:**

- Python-side properties (nodes, edges, options) are synced to JavaScript automatically
- JavaScript events (clicks, drags, file drops) are sent back via `_event_data` param
- Python callbacks process these events and can update properties reactively
- The Vue.js wrapper handles initialization, cleanup, and library-specific API calls

## Data Flow

This diagram shows how a user interaction flows through the system:

```{mermaid}
sequenceDiagram
    participant User as User
    participant JS as Vue.js
    participant Bridge as AnyWidget
    participant Py as Component
    participant App as App Code

    User->>JS: Interact
    JS->>JS: Process event
    JS->>Bridge: _event_data
    Bridge->>Py: Sync property
    Py->>Py: @param.depends
    Py->>App: Callback
    App->>Py: Update props
    Py->>Bridge: Sync update
    Bridge->>JS: Apply changes
    JS->>User: Re-render
```

## GraphDetailTool Composition

The `GraphDetailTool` composes `VisNetwork` and `JsonEditor` into a complete graph editing UI:

```{mermaid}
graph TB
    subgraph gdt [" GraphDetailTool "]
        direction TB
        subgraph controls [" Edit Controls "]
            direction LR
            disable(["Disable Edit"])
            add_node(["Add Node"])
            add_edge(["Add Edge"])
        end

        subgraph workspace [" Workspace "]
            direction LR
            vn(["VisNetwork"])
            subgraph detail [" Detail Panel "]
                direction TB
                viz(["Visualization"])
                editor(["JsonEditor"])
            end
        end
    end

    controls --> vn
    vn -- "node click" --> detail
    editor -- "value change" --> vn

    classDef controlNode fill:#8b7355,stroke:#6b5840,color:#ffffff
    classDef graphNode fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef detailNode fill:#6366f1,stroke:#4f46e5,color:#ffffff

    class disable,add_node,add_edge controlNode
    class vn graphNode
    class viz,editor detailNode
```

Features:

- **Single node click**: Shows node details and content visualization
- **Multi-node selection**: Comparison table with bulk editing
- **CSV data**: Rendered as interactive table with optional Plotly charts
- **Drag events**: Automatically update node positions
