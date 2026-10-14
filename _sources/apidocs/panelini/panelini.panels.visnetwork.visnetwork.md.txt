# {py:mod}`panelini.panels.visnetwork.visnetwork`

```{py:module} panelini.panels.visnetwork.visnetwork
```

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`VisNetwork <panelini.panels.visnetwork.visnetwork.VisNetwork>`
  - ```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`bundled_assets_dir <panelini.panels.visnetwork.visnetwork.bundled_assets_dir>`
  - ```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.bundled_assets_dir
    :summary:
    ```
````

### API

````{py:data} bundled_assets_dir
:canonical: panelini.panels.visnetwork.visnetwork.bundled_assets_dir
:value: >
   None

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.bundled_assets_dir
```

````

`````{py:class} VisNetwork(nodes: typing.Optional[list[dict[str, typing.Any]]] = None, edges: typing.Optional[list[dict[str, typing.Any]]] = None, options: typing.Optional[dict[str, typing.Any]] = None, network_event_callback: typing.Optional[typing.Callable[[str, dict[str, typing.Any]], None]] = None, file_drop_callback: typing.Optional[typing.Callable[[dict[str, typing.Any]], None]] = None, context_menu_callback: typing.Optional[typing.Callable[[str, str, str], None]] = None, nodes_duplicated_callback: typing.Optional[typing.Callable[[list[dict[str, typing.Any]]], None]] = None, node_created_callback: typing.Optional[typing.Callable[[dict[str, typing.Any]], None]] = None, edge_created_callback: typing.Optional[typing.Callable[[dict[str, typing.Any]], None]] = None, **params: typing.Any)
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork

Bases: {py:obj}`panel.custom.AnyWidgetComponent`

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.__init__
```

````{py:attribute} nodes
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.nodes
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.nodes
```

````

````{py:attribute} edges
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.edges
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.edges
```

````

````{py:attribute} options
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.options
:value: >
   'Dict(...)'

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.options
```

````

````{py:attribute} manipulation_state
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.manipulation_state
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.manipulation_state
```

````

````{py:method} handle_network_event(event_name: str, event_params: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.handle_network_event

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.handle_network_event
```

````

````{py:method} default_file_drop_callback(event_params: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.default_file_drop_callback

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.default_file_drop_callback
```

````

````{py:method} disable_edit_mode() -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.disable_edit_mode

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.disable_edit_mode
```

````

````{py:method} add_node_mode() -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.add_node_mode

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.add_node_mode
```

````

````{py:method} add_edge_mode() -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.add_edge_mode

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.add_edge_mode
```

````

````{py:method} request_position_update() -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.request_position_update

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.request_position_update
```

````

````{py:method} get_nodes() -> list[dict[str, typing.Any]]
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.get_nodes

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.get_nodes
```

````

````{py:method} get_edges() -> list[dict[str, typing.Any]]
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.get_edges

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.get_edges
```

````

````{py:method} set_nodes(nodes: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.set_nodes

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.set_nodes
```

````

````{py:method} set_edges(edges: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.set_edges

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.set_edges
```

````

````{py:method} add_node(node: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.add_node

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.add_node
```

````

````{py:method} add_edge(edge: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.add_edge

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.add_edge
```

````

````{py:method} remove_node(node_id: typing.Any) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.remove_node

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.remove_node
```

````

````{py:method} remove_edge(from_id: typing.Any, to_id: typing.Any) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.remove_edge

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.remove_edge
```

````

````{py:method} update_node(node: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.update_node

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.update_node
```

````

````{py:method} update_nodes(nodes: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.update_nodes

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.update_nodes
```

````

````{py:method} update_node_state(node_ids: list[typing.Any], state: str) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.update_node_state

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.update_node_state
```

````

````{py:method} update_edge(edge: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.update_edge

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.update_edge
```

````

````{py:method} get_node(node_id: typing.Any) -> typing.Optional[dict[str, typing.Any]]
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.get_node

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.get_node
```

````

````{py:method} get_edge(edge_id: typing.Any = None, from_id: typing.Any = None, to_id: typing.Any = None) -> typing.Optional[dict[str, typing.Any]]
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.get_edge

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.get_edge
```

````

````{py:method} clear() -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.clear

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.clear
```

````

````{py:method} execute_step(step: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.execute_step

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.execute_step
```

````

````{py:method} batch_update(actions: list[dict[str, typing.Any]]) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.batch_update

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.batch_update
```

````

````{py:method} merge_nodes(source_id: typing.Any, target_id: typing.Any, merge_properties: bool = True) -> None
:canonical: panelini.panels.visnetwork.visnetwork.VisNetwork.merge_nodes

```{autodoc2-docstring} panelini.panels.visnetwork.visnetwork.VisNetwork.merge_nodes
```

````

`````
