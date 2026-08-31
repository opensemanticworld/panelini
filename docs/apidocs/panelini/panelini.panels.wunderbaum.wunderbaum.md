# {py:mod}`panelini.panels.wunderbaum.wunderbaum`

```{py:module} panelini.panels.wunderbaum.wunderbaum
```

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`Wunderbaum <panelini.panels.wunderbaum.wunderbaum.Wunderbaum>`
  - ```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`logger <panelini.panels.wunderbaum.wunderbaum.logger>`
  - ```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.logger
    :summary:
    ```
* - {py:obj}`bundled_assets_dir <panelini.panels.wunderbaum.wunderbaum.bundled_assets_dir>`
  - ```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.bundled_assets_dir
    :summary:
    ```
````

### API

````{py:data} logger
:canonical: panelini.panels.wunderbaum.wunderbaum.logger
:value: >
   'getLogger(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.logger
```

````

````{py:data} bundled_assets_dir
:canonical: panelini.panels.wunderbaum.wunderbaum.bundled_assets_dir
:value: >
   None

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.bundled_assets_dir
```

````

`````{py:class} Wunderbaum(source: typing.Optional[list[dict[str, typing.Any]]] = None, columns: typing.Optional[list[dict[str, typing.Any]]] = None, options: typing.Optional[dict[str, typing.Any]] = None, types: typing.Optional[dict[str, typing.Any]] = None, context_menu_items: typing.Optional[list[dict[str, typing.Any]]] = None, tree_event_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], None]] = None, lazy_load_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], typing.Union[list[dict[str, typing.Any]], collections.abc.Awaitable[list[dict[str, typing.Any]]]]]] = None, file_drop_callback: typing.Optional[typing.Callable[[dict[str, typing.Any]], None]] = None, **params: typing.Any)
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum

Bases: {py:obj}`panel.custom.AnyWidgetComponent`

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.__init__
```

````{py:attribute} source
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.source
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.source
```

````

````{py:attribute} columns
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.columns
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.columns
```

````

````{py:attribute} options
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.options
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.options
```

````

````{py:attribute} types
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.types
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.types
```

````

````{py:attribute} context_menu_items
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.context_menu_items
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.context_menu_items
```

````

````{py:method} handle_tree_event(event_name: str, event_params: dict[str, typing.Any]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.handle_tree_event

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.handle_tree_event
```

````

````{py:method} get_source() -> list[dict[str, typing.Any]]
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.get_source

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.get_source
```

````

````{py:method} set_source(source: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.set_source

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.set_source
```

````

````{py:method} add_node(parent_key: typing.Optional[str], node: dict[str, typing.Any]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_node
```

````

````{py:method} remove_node(key: str) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.remove_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.remove_node
```

````

````{py:method} move_node(key: str, target_key: str, mode: str = 'child') -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.move_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.move_node
```

````

````{py:method} update_node(key: str, data: dict[str, typing.Any]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.update_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.update_node
```

````

````{py:method} rename_node(key: str, title: str) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.rename_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.rename_node
```

````

````{py:method} clear() -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.clear

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.clear
```

````

````{py:method} expand_node(key: str, expanded: bool = True) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.expand_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.expand_node
```

````

````{py:method} select_node(key: str, selected: bool = True) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.select_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.select_node
```

````

````{py:method} set_active_node(key: str) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.set_active_node

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.set_active_node
```

````

````{py:method} start_edit_title(key: str) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.start_edit_title

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.start_edit_title
```

````

````{py:method} respond_lazy_load(key: str, children: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.respond_lazy_load

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.respond_lazy_load
```

````

````{py:method} batch_update(actions: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.batch_update

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.batch_update
```

````

````{py:method} execute_step(step: dict[str, typing.Any]) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.execute_step

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.execute_step
```

````

````{py:method} add_folder(parent_key: typing.Optional[str], name: str, key: typing.Optional[str] = None) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_folder

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_folder
```

````

````{py:method} add_file(parent_key: typing.Optional[str], name: str, data: typing.Optional[dict[str, typing.Any]] = None, key: typing.Optional[str] = None) -> None
:canonical: panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_file

```{autodoc2-docstring} panelini.panels.wunderbaum.wunderbaum.Wunderbaum.add_file
```

````

`````
