# {py:mod}`panelini.panels.ai.tools.basic_tools`

```{py:module} panelini.panels.ai.tools.basic_tools
```

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`GetCurrentTimeInput <panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput
    :summary:
    ```
* - {py:obj}`GetCurrentTimeTool <panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool
    :summary:
    ```
* - {py:obj}`UpdatePreviewInput <panelini.panels.ai.tools.basic_tools.UpdatePreviewInput>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewInput
    :summary:
    ```
* - {py:obj}`UpdatePreviewTool <panelini.panels.ai.tools.basic_tools.UpdatePreviewTool>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewTool
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`get_current_time_tool <panelini.panels.ai.tools.basic_tools.get_current_time_tool>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.get_current_time_tool
    :summary:
    ```
* - {py:obj}`update_preview_tool <panelini.panels.ai.tools.basic_tools.update_preview_tool>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.update_preview_tool
    :summary:
    ```
* - {py:obj}`AVAILABLE_TOOLS <panelini.panels.ai.tools.basic_tools.AVAILABLE_TOOLS>`
  - ```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.AVAILABLE_TOOLS
    :summary:
    ```
````

### API

`````{py:class} GetCurrentTimeInput
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput

Bases: {py:obj}`pydantic.BaseModel`

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput
```

````{py:attribute} timezone
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput.timezone
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeInput.timezone
```

````

`````

`````{py:class} GetCurrentTimeTool
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool
```

````{py:attribute} name
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.name
:type: str
:value: >
   'get_current_time'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.description
:type: str
:value: >
   'Get the current time and date. Useful for timestamping entries or checking when data was processed.'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.GetCurrentTimeTool.args_schema
```

````

`````

`````{py:class} UpdatePreviewInput
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewInput

Bases: {py:obj}`pydantic.BaseModel`

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewInput
```

````{py:attribute} content
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewInput.content
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewInput.content
```

````

````{py:attribute} title
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewInput.title
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewInput.title
```

````

`````

`````{py:class} UpdatePreviewTool
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewTool
```

````{py:attribute} name
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.name
:type: str
:value: >
   'update_preview'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.description
:type: str
:value: >
   'Display content in the preview window. Use this to show formatted reports, tables, code snippets, or...'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.UpdatePreviewTool.args_schema
```

````

`````

````{py:data} get_current_time_tool
:canonical: panelini.panels.ai.tools.basic_tools.get_current_time_tool
:value: >
   'GetCurrentTimeTool(...)'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.get_current_time_tool
```

````

````{py:data} update_preview_tool
:canonical: panelini.panels.ai.tools.basic_tools.update_preview_tool
:value: >
   'UpdatePreviewTool(...)'

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.update_preview_tool
```

````

````{py:data} AVAILABLE_TOOLS
:canonical: panelini.panels.ai.tools.basic_tools.AVAILABLE_TOOLS
:type: list[typing.Any]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.tools.basic_tools.AVAILABLE_TOOLS
```

````
