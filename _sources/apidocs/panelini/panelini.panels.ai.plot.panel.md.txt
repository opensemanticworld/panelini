# {py:mod}`panelini.panels.ai.plot.panel`

```{py:module} panelini.panels.ai.plot.panel
```

```{autodoc2-docstring} panelini.panels.ai.plot.panel
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`PlotPanel <panelini.panels.ai.plot.panel.PlotPanel>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`DEFAULT_LIBRARIES <panelini.panels.ai.plot.panel.DEFAULT_LIBRARIES>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.panel.DEFAULT_LIBRARIES
    :summary:
    ```
* - {py:obj}`DEFAULT_IMAGE <panelini.panels.ai.plot.panel.DEFAULT_IMAGE>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.panel.DEFAULT_IMAGE
    :summary:
    ```
````

### API

````{py:data} DEFAULT_LIBRARIES
:canonical: panelini.panels.ai.plot.panel.DEFAULT_LIBRARIES
:type: list[str]
:value: >
   ['numpy', 'pandas', 'matplotlib', 'scipy']

```{autodoc2-docstring} panelini.panels.ai.plot.panel.DEFAULT_LIBRARIES
```

````

````{py:data} DEFAULT_IMAGE
:canonical: panelini.panels.ai.plot.panel.DEFAULT_IMAGE
:type: str
:value: >
   'python:3.12-slim'

```{autodoc2-docstring} panelini.panels.ai.plot.panel.DEFAULT_IMAGE
```

````

`````{py:class} PlotPanel(data_path: pathlib.Path | str | None = None, download_dir: pathlib.Path | str | None = None, docker_image: str = DEFAULT_IMAGE)
:canonical: panelini.panels.ai.plot.panel.PlotPanel

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel.__init__
```

````{py:method} on_plot(fn: collections.abc.Callable[[], None]) -> None
:canonical: panelini.panels.ai.plot.panel.PlotPanel.on_plot

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel.on_plot
```

````

````{py:method} plot_by_code(code: str, file_paths: list[str] | None = None, libraries: list[str] | None = None) -> str
:canonical: panelini.panels.ai.plot.panel.PlotPanel.plot_by_code

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel.plot_by_code
```

````

````{py:method} run_code(code: str, lang: str = 'python', file_paths: list[str] | None = None, libraries: list[str] | None = None) -> str
:canonical: panelini.panels.ai.plot.panel.PlotPanel.run_code

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel.run_code
```

````

````{py:method} load_data_from_csv(file_path: str, delimiter: str = '\t', skip_rows: int = 0) -> list[str]
:canonical: panelini.panels.ai.plot.panel.PlotPanel.load_data_from_csv

```{autodoc2-docstring} panelini.panels.ai.plot.panel.PlotPanel.load_data_from_csv
```

````

`````
