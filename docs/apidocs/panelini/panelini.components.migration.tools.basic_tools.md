# {py:mod}`panelini.components.migration.tools.basic_tools`

```{py:module} panelini.components.migration.tools.basic_tools
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`GetCurrentTimeInput <panelini.components.migration.tools.basic_tools.GetCurrentTimeInput>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeInput
    :summary:
    ```
* - {py:obj}`GetCurrentTimeTool <panelini.components.migration.tools.basic_tools.GetCurrentTimeTool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool
    :summary:
    ```
* - {py:obj}`CalculateMetadataStatsInput <panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput
    :summary:
    ```
* - {py:obj}`CalculateMetadataStatsTool <panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool
    :summary:
    ```
* - {py:obj}`UpdatePreviewInput <panelini.components.migration.tools.basic_tools.UpdatePreviewInput>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewInput
    :summary:
    ```
* - {py:obj}`UpdatePreviewTool <panelini.components.migration.tools.basic_tools.UpdatePreviewTool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`get_current_time_tool <panelini.components.migration.tools.basic_tools.get_current_time_tool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.get_current_time_tool
    :summary:
    ```
* - {py:obj}`calculate_metadata_stats_tool <panelini.components.migration.tools.basic_tools.calculate_metadata_stats_tool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.calculate_metadata_stats_tool
    :summary:
    ```
* - {py:obj}`update_preview_tool <panelini.components.migration.tools.basic_tools.update_preview_tool>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.update_preview_tool
    :summary:
    ```
* - {py:obj}`AVAILABLE_TOOLS <panelini.components.migration.tools.basic_tools.AVAILABLE_TOOLS>`
  - ```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.AVAILABLE_TOOLS
    :summary:
    ```
````

### API

`````{py:class} GetCurrentTimeInput(/, **data: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeInput

Bases: {py:obj}`pydantic.BaseModel`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeInput
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeInput.__init__
```

````{py:attribute} timezone
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeInput.timezone
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeInput.timezone
```

````

`````

`````{py:class} GetCurrentTimeTool(**kwargs: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.__init__
```

````{py:attribute} name
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.name
:type: str
:value: >
   'get_current_time'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.name
```

````

````{py:attribute} description
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.description
:type: str
:value: >
   'Get the current time and date. Useful for timestamping ELN entries or checking when data was process...'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.GetCurrentTimeTool.args_schema
```

````

`````

`````{py:class} CalculateMetadataStatsInput(/, **data: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput

Bases: {py:obj}`pydantic.BaseModel`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput.__init__
```

````{py:attribute} entry_count
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput.entry_count
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput.entry_count
```

````

````{py:attribute} has_metadata
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput.has_metadata
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsInput.has_metadata
```

````

`````

`````{py:class} CalculateMetadataStatsTool(**kwargs: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.__init__
```

````{py:attribute} name
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.name
:type: str
:value: >
   'calculate_metadata_stats'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.name
```

````

````{py:attribute} description
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.description
:type: str
:value: >
   'Calculate statistics about ELN metadata coverage. Useful for analyzing how well ELN entries are docu...'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.CalculateMetadataStatsTool.args_schema
```

````

`````

`````{py:class} UpdatePreviewInput(/, **data: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewInput

Bases: {py:obj}`pydantic.BaseModel`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewInput
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewInput.__init__
```

````{py:attribute} content
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewInput.content
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewInput.content
```

````

````{py:attribute} title
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewInput.title
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewInput.title
```

````

`````

`````{py:class} UpdatePreviewTool(**kwargs: typing.Any)
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool.__init__
```

````{py:attribute} name
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewTool.name
:type: str
:value: >
   'update_preview'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool.name
```

````

````{py:attribute} description
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewTool.description
:type: str
:value: >
   'Display content in the preview window. Use this to show formatted reports, tables, code snippets, or...'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.components.migration.tools.basic_tools.UpdatePreviewTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.UpdatePreviewTool.args_schema
```

````

`````

````{py:data} get_current_time_tool
:canonical: panelini.components.migration.tools.basic_tools.get_current_time_tool
:value: >
   'GetCurrentTimeTool(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.get_current_time_tool
```

````

````{py:data} calculate_metadata_stats_tool
:canonical: panelini.components.migration.tools.basic_tools.calculate_metadata_stats_tool
:value: >
   'CalculateMetadataStatsTool(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.calculate_metadata_stats_tool
```

````

````{py:data} update_preview_tool
:canonical: panelini.components.migration.tools.basic_tools.update_preview_tool
:value: >
   'UpdatePreviewTool(...)'

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.update_preview_tool
```

````

````{py:data} AVAILABLE_TOOLS
:canonical: panelini.components.migration.tools.basic_tools.AVAILABLE_TOOLS
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.tools.basic_tools.AVAILABLE_TOOLS
```

````
