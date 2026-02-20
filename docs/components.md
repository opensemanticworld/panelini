# Components

Components are **Panelini-dependent** building blocks that rely on the Panelini framework's architecture and features. Unlike [Panels](panels/index), components cannot function independently outside of Panelini.

## Status

The components module is currently in planning stage. No implementations exist yet.

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
* - Reusability
  - Any Panel application
  - Panelini applications only
* - Location
  - `panelini.panels.*`
  - `panelini.components.*`
* - Examples
  - JsonEditor, VisNetwork
  - *(planned)*
```

## Contributing

If you'd like to contribute a component, see the [contributing guide](https://github.com/opensemanticworld/panelini/blob/main/CONTRIBUTING.md).
