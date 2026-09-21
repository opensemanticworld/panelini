# {py:mod}`panelini.panels.tanstack.table.table`

```{py:module} panelini.panels.tanstack.table.table
```

```{autodoc2-docstring} panelini.panels.tanstack.table.table
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`TanstackTable <panelini.panels.tanstack.table.table.TanstackTable>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`bundled_assets_dir <panelini.panels.tanstack.table.table.bundled_assets_dir>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.table.bundled_assets_dir
    :summary:
    ```
````

### API

````{py:data} bundled_assets_dir
:canonical: panelini.panels.tanstack.table.table.bundled_assets_dir
:value: >
   None

```{autodoc2-docstring} panelini.panels.tanstack.table.table.bundled_assets_dir
```

````

`````{py:class} TanstackTable(source: typing.Optional[list[dict[str, typing.Any]]] = None, columns: typing.Optional[list[dict[str, typing.Any]]] = None, options: typing.Optional[dict[str, typing.Any]] = None, icons: typing.Optional[dict[str, str]] = None, types: typing.Optional[dict[str, dict[str, typing.Any]]] = None, filter_text: typing.Optional[str] = None, editing_key: typing.Optional[str] = None, editing_column: typing.Optional[str] = None, expanded_keys: typing.Optional[list[str]] = None, selected_keys: typing.Optional[list[str]] = None, sorting: typing.Optional[list[dict[str, typing.Any]]] = None, column_widths: typing.Optional[dict[str, float]] = None, undo_depth: typing.Optional[int] = None, event_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], None]] = None, move_callback: typing.Optional[typing.Callable[[str, str, str], bool]] = None, action_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], bool]] = None, transfer_callback: typing.Optional[typing.Callable[[dict[str, typing.Any]], bool]] = None, lazy_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], typing.Optional[list[dict[str, typing.Any]]]]] = None, **params: typing.Any)
:canonical: panelini.panels.tanstack.table.table.TanstackTable

Bases: {py:obj}`panel.custom.AnyWidgetComponent`

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.__init__
```

````{py:attribute} source
:canonical: panelini.panels.tanstack.table.table.TanstackTable.source
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.source
```

````

````{py:attribute} columns
:canonical: panelini.panels.tanstack.table.table.TanstackTable.columns
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.columns
```

````

````{py:attribute} options
:canonical: panelini.panels.tanstack.table.table.TanstackTable.options
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.options
```

````

````{py:attribute} icons
:canonical: panelini.panels.tanstack.table.table.TanstackTable.icons
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.icons
```

````

````{py:attribute} types
:canonical: panelini.panels.tanstack.table.table.TanstackTable.types
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.types
```

````

````{py:attribute} filter_text
:canonical: panelini.panels.tanstack.table.table.TanstackTable.filter_text
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.filter_text
```

````

````{py:attribute} editing_key
:canonical: panelini.panels.tanstack.table.table.TanstackTable.editing_key
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.editing_key
```

````

````{py:attribute} editing_column
:canonical: panelini.panels.tanstack.table.table.TanstackTable.editing_column
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.editing_column
```

````

````{py:attribute} sorting
:canonical: panelini.panels.tanstack.table.table.TanstackTable.sorting
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.sorting
```

````

````{py:attribute} column_widths
:canonical: panelini.panels.tanstack.table.table.TanstackTable.column_widths
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.column_widths
```

````

````{py:attribute} expanded_keys
:canonical: panelini.panels.tanstack.table.table.TanstackTable.expanded_keys
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.expanded_keys
```

````

````{py:attribute} selected_keys
:canonical: panelini.panels.tanstack.table.table.TanstackTable.selected_keys
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.selected_keys
```

````

````{py:attribute} undo_depth
:canonical: panelini.panels.tanstack.table.table.TanstackTable.undo_depth
:value: >
   'Integer(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.undo_depth
```

````

````{py:attribute} can_undo
:canonical: panelini.panels.tanstack.table.table.TanstackTable.can_undo
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.can_undo
```

````

````{py:attribute} can_redo
:canonical: panelini.panels.tanstack.table.table.TanstackTable.can_redo
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.can_redo
```

````

````{py:attribute} clipboard
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clipboard
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clipboard
```

````

````{py:method} handle_event(event_name: str, event_params: dict[str, typing.Any]) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.handle_event

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.handle_event
```

````

````{py:method} get_source() -> list[dict[str, typing.Any]]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_source

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_source
```

````

````{py:method} set_source(source: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.set_source

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.set_source
```

````

````{py:method} clear() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear
```

````

````{py:method} batch() -> collections.abc.Iterator[panelini.panels.tanstack.table.table.TanstackTable]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.batch

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.batch
```

````

````{py:method} undo() -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.undo

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.undo
```

````

````{py:method} redo() -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.redo

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.redo
```

````

````{py:method} clear_history() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear_history

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear_history
```

````

````{py:method} get_clipboard() -> dict[str, typing.Any]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_clipboard

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_clipboard
```

````

````{py:method} cut_nodes(keys: list[str]) -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.cut_nodes

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.cut_nodes
```

````

````{py:method} copy_nodes(keys: list[str]) -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.copy_nodes

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.copy_nodes
```

````

````{py:method} paste_nodes(anchor_key: typing.Optional[str] = None, position: str = 'child') -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.paste_nodes

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.paste_nodes
```

````

````{py:method} transfer_nodes(source: panelini.panels.tanstack.table.table.TanstackTable, keys: list[str], anchor_key: typing.Optional[str] = None, position: str = 'child', copy: bool = False) -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.transfer_nodes

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.transfer_nodes
```

````

````{py:method} clear_clipboard() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear_clipboard

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear_clipboard
```

````

````{py:method} add_node(node: dict[str, typing.Any], parent_key: typing.Optional[str] = None, index: typing.Optional[int] = None) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.add_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.add_node
```

````

````{py:method} remove_node(key: str) -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.remove_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.remove_node
```

````

````{py:method} move_node(key: str, anchor_key: str, position: str = 'child') -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.move_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.move_node
```

````

````{py:method} move_nodes(keys: list[str], anchor_key: str, position: str = 'child') -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.move_nodes

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.move_nodes
```

````

````{py:method} update_node(key: str, values: dict[str, typing.Any]) -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.update_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.update_node
```

````

````{py:method} rename_node(key: str, title: str) -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.rename_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.rename_node
```

````

````{py:method} set_field(key: str, column_id: str, value: typing.Any) -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.set_field

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.set_field
```

````

````{py:method} set_children(key: str, children: list[dict[str, typing.Any]]) -> bool
:canonical: panelini.panels.tanstack.table.table.TanstackTable.set_children

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.set_children
```

````

````{py:method} get_expanded() -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_expanded

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_expanded
```

````

````{py:method} expand_node(key: str, expanded: bool = True) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.expand_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.expand_node
```

````

````{py:method} expand_all() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.expand_all

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.expand_all
```

````

````{py:method} collapse_all() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.collapse_all

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.collapse_all
```

````

````{py:method} get_selected() -> list[str]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_selected

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_selected
```

````

````{py:method} select_node(key: str, selected: bool = True) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.select_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.select_node
```

````

````{py:method} clear_selection() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear_selection

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear_selection
```

````

````{py:method} get_sort() -> typing.Optional[dict[str, typing.Any]]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_sort

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_sort
```

````

````{py:method} sort_by(column_id: str, desc: bool = False) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.sort_by

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.sort_by
```

````

````{py:method} clear_sort() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear_sort

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear_sort
```

````

````{py:method} get_column_widths() -> dict[str, float]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_column_widths

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_column_widths
```

````

````{py:method} set_column_width(column_id: str, width: float) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.set_column_width

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.set_column_width
```

````

````{py:method} reset_column_width(column_id: str) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.reset_column_width

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.reset_column_width
```

````

````{py:method} clear_column_widths() -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.clear_column_widths

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.clear_column_widths
```

````

````{py:method} get_types() -> dict[str, dict[str, typing.Any]]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.get_types

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.get_types
```

````

````{py:method} set_type(name: str, fields: dict[str, typing.Any]) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.set_type

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.set_type
```

````

````{py:method} remove_type(name: str) -> None
:canonical: panelini.panels.tanstack.table.table.TanstackTable.remove_type

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.remove_type
```

````

````{py:method} resolve_node(key: str) -> typing.Optional[dict[str, typing.Any]]
:canonical: panelini.panels.tanstack.table.table.TanstackTable.resolve_node

```{autodoc2-docstring} panelini.panels.tanstack.table.table.TanstackTable.resolve_node
```

````

`````
