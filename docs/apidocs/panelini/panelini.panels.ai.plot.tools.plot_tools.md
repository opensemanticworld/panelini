# {py:mod}`panelini.panels.ai.plot.tools.plot_tools`

```{py:module} panelini.panels.ai.plot.tools.plot_tools
```

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`PlotByCodeInput <panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput>`
  -
* - {py:obj}`RunCodeInput <panelini.panels.ai.plot.tools.plot_tools.RunCodeInput>`
  -
* - {py:obj}`LoadCsvInput <panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput>`
  -
* - {py:obj}`PlotByCodeTool <panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool>`
  -
* - {py:obj}`RunCodeTool <panelini.panels.ai.plot.tools.plot_tools.RunCodeTool>`
  -
* - {py:obj}`LoadCsvTool <panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool>`
  -
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`make_plot_tools <panelini.panels.ai.plot.tools.plot_tools.make_plot_tools>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.make_plot_tools
    :summary:
    ```
````

### API

`````{py:class} PlotByCodeInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} code
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.code
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.code
```

````

````{py:attribute} file_paths
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.file_paths
:type: list[str] | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.file_paths
```

````

````{py:attribute} libraries
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.libraries
:type: list[str] | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeInput.libraries
```

````

`````

`````{py:class} RunCodeInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} code
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.code
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.code
```

````

````{py:attribute} lang
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.lang
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.lang
```

````

````{py:attribute} file_paths
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.file_paths
:type: list[str] | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.file_paths
```

````

````{py:attribute} libraries
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.libraries
:type: list[str] | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeInput.libraries
```

````

`````

`````{py:class} LoadCsvInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} file_path
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.file_path
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.file_path
```

````

````{py:attribute} delimiter
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.delimiter
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.delimiter
```

````

````{py:attribute} skip_rows
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.skip_rows
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvInput.skip_rows
```

````

`````

`````{py:class} PlotByCodeTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} model_config
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.model_config
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.model_config
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.name
:type: str
:value: >
   'plot_by_code'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.description
:type: str
:value: >
   'Run python code in a sandboxed Docker container to produce a matplotlib plot. The code MUST save the...'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.args_schema
```

````

````{py:attribute} panel
:canonical: panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.panel
:type: panelini.panels.ai.plot.panel.PlotPanel
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.PlotByCodeTool.panel
```

````

`````

`````{py:class} RunCodeTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} model_config
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.model_config
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.model_config
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.name
:type: str
:value: >
   'run_code'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.description
:type: str
:value: >
   'Run code in a sandboxed Docker container and return whatever it prints to stdout. Typically used to ...'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.args_schema
```

````

````{py:attribute} panel
:canonical: panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.panel
:type: panelini.panels.ai.plot.panel.PlotPanel
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.RunCodeTool.panel
```

````

`````

`````{py:class} LoadCsvTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} model_config
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.model_config
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.model_config
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.name
:type: str
:value: >
   'load_data_from_csv'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.description
:type: str
:value: >
   'Load a CSV into a pandas dataframe and return the column names.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.args_schema
```

````

````{py:attribute} panel
:canonical: panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.panel
:type: panelini.panels.ai.plot.panel.PlotPanel
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.LoadCsvTool.panel
```

````

`````

````{py:function} make_plot_tools(panel: panelini.panels.ai.plot.panel.PlotPanel) -> list[langchain_core.tools.BaseTool]
:canonical: panelini.panels.ai.plot.tools.plot_tools.make_plot_tools

```{autodoc2-docstring} panelini.panels.ai.plot.tools.plot_tools.make_plot_tools
```
````
