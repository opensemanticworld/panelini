# {py:mod}`panelini.panels.visnetwork.graph_detail_tool`

```{py:module} panelini.panels.visnetwork.graph_detail_tool
```

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`GraphDetailTool <panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool>`
  - ```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`pd <panelini.panels.visnetwork.graph_detail_tool.pd>`
  - ```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.pd
    :summary:
    ```
* - {py:obj}`px <panelini.panels.visnetwork.graph_detail_tool.px>`
  - ```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.px
    :summary:
    ```
````

### API

````{py:data} pd
:canonical: panelini.panels.visnetwork.graph_detail_tool.pd
:type: typing.Any
:value: >
   None

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.pd
```

````

````{py:data} px
:canonical: panelini.panels.visnetwork.graph_detail_tool.px
:type: typing.Any
:value: >
   None

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.px
```

````

`````{py:class} GraphDetailTool(nodes: typing.Optional[list[dict[str, typing.Any]]] = None, edges: typing.Optional[list[dict[str, typing.Any]]] = None)
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.__init__
```

````{py:method} build_panel() -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.build_panel

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.build_panel
```

````

````{py:method} network_event_callback(event_name: str, event_params_dict: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.network_event_callback

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.network_event_callback
```

````

````{py:method} click_callback(event: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.click_callback

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.click_callback
```

````

````{py:method} select_callback(event: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.select_callback

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.select_callback
```

````

````{py:method} drag_end_callback(event: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.drag_end_callback

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.drag_end_callback
```

````

````{py:method} update_node_callback(event: typing.Any) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.update_node_callback

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.update_node_callback
```

````

````{py:method} update_node(new_node_dict: dict[str, typing.Any]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.update_node

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.update_node
```

````

````{py:method} show_node_details(node_id: typing.Any) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.show_node_details

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.show_node_details
```

````

````{py:method} show_multi_node_editor(node_ids: list[str]) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.show_multi_node_editor

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.show_multi_node_editor
```

````

````{py:method} on_tabulator_cell_edit(event: typing.Any) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.on_tabulator_cell_edit

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.on_tabulator_cell_edit
```

````

````{py:method} on_set_all_cell_edit(event: typing.Any) -> None
:canonical: panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.on_set_all_cell_edit

```{autodoc2-docstring} panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool.on_set_all_cell_edit
```

````

`````
