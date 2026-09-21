# {py:mod}`panelini.panels.ai.plot.tools.osw_plot_tools`

```{py:module} panelini.panels.ai.plot.tools.osw_plot_tools
```

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`AttachPlotInput <panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput>`
  -
* - {py:obj}`DocumentEvaluationInput <panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput>`
  -
* - {py:obj}`AttachPlotToOswTool <panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool>`
  -
* - {py:obj}`DocumentEvaluationTool <panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool>`
  -
````

### API

`````{py:class} AttachPlotInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} osw_id
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput.osw_id
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput.osw_id
```

````

````{py:attribute} format
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput.format
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotInput.format
```

````

`````

`````{py:class} DocumentEvaluationInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} uuid
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput.uuid
:type: str | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput.uuid
```

````

````{py:attribute} output_osw_id
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput.output_osw_id
:type: str | None
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationInput.output_osw_id
```

````

`````

`````{py:class} AttachPlotToOswTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} model_config
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.model_config
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.model_config
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.name
:type: str
:value: >
   'attach_current_plot_to_osw_page'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.description
:type: str
:value: >
   'Upload the currently displayed plot to an OSW instance as a WikiFile and attach it to the given OSW ...'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.args_schema
```

````

````{py:attribute} panel
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.panel
:type: panelini.panels.ai.plot.panel.PlotPanel
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.AttachPlotToOswTool.panel
```

````

`````

`````{py:class} DocumentEvaluationTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} model_config
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.model_config
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.model_config
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.name
:type: str
:value: >
   'document_current_evaluation'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.description
:type: str
:value: >
   'Document the current python-code evaluation as an OSW PythonEvaluationProcess object, uploading the ...'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.args_schema
```

````

````{py:attribute} panel
:canonical: panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.panel
:type: panelini.panels.ai.plot.panel.PlotPanel
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_plot_tools.DocumentEvaluationTool.panel
```

````

`````
