# Components

Components are **Panelini-dependent** building blocks that rely on the Panelini framework's architecture and features. Unlike [Panels](../panels/index), components cannot function independently outside of Panelini.

## Available Components

```{list-table}
:header-rows: 1
:widths: 20 50 30

* - Component
  - Description
  - Technology
* - {doc}`AI Chat <ai>`
  - LLM-powered chat interface with multi-provider support, tool execution, and live preview
  - [LangChain](https://python.langchain.com/) + Panel ChatInterface
```

## Panels vs Components

```{list-table}
:header-rows: 1
:widths: 30 35 35

* -
  - **Panels**
  - **Components**
* - Dependencies
  - Only `panel` and `param`
  - Depend on Panelini core
* - Installation
  - Included in base package
  - Optional extras (e.g., `panelini[ai]`)
* - Reusability
  - Any Panel application
  - Panelini applications only
* - Location
  - `panelini.panels.*`
  - `panelini.components.*`
* - Examples
  - JsonEditor, VisNetwork
  - AI Chat
```

## Contributing

If you'd like to contribute a component, see the [contributing guide](https://github.com/opensemanticworld/panelini/blob/main/CONTRIBUTING.md).

```{toctree}
:maxdepth: 1
:hidden:

ai
```
