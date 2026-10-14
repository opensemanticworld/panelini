# {py:mod}`panelini.panels.ai.plot.model_selector`

```{py:module} panelini.panels.ai.plot.model_selector
```

```{autodoc2-docstring} panelini.panels.ai.plot.model_selector
:allowtitles:
```

## Module Contents

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`pick_default_plot_model <panelini.panels.ai.plot.model_selector.pick_default_plot_model>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.pick_default_plot_model
    :summary:
    ```
* - {py:obj}`strip_code_fences <panelini.panels.ai.plot.model_selector.strip_code_fences>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.strip_code_fences
    :summary:
    ```
* - {py:obj}`regenerate_plot <panelini.panels.ai.plot.model_selector.regenerate_plot>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.regenerate_plot
    :summary:
    ```
* - {py:obj}`build_plot_context_sidebar <panelini.panels.ai.plot.model_selector.build_plot_context_sidebar>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.build_plot_context_sidebar
    :summary:
    ```
````

### API

````{py:function} pick_default_plot_model(provider: panelini.panels.ai.utils.config.ProviderConfig) -> panelini.panels.ai.utils.config.ModelConfig
:canonical: panelini.panels.ai.plot.model_selector.pick_default_plot_model

```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.pick_default_plot_model
```
````

````{py:function} strip_code_fences(text: str) -> str
:canonical: panelini.panels.ai.plot.model_selector.strip_code_fences

```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.strip_code_fences
```
````

````{py:function} regenerate_plot(panel: panelini.panels.ai.plot.panel.PlotPanel, user_intent: str, *, provider: panelini.panels.ai.utils.config.ProviderConfig | None = None, model: panelini.panels.ai.utils.config.ModelConfig | None = None, config_path: pathlib.Path | None = None) -> str
:canonical: panelini.panels.ai.plot.model_selector.regenerate_plot

```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.regenerate_plot
```
````

````{py:function} build_plot_context_sidebar(panel: panelini.panels.ai.plot.panel.PlotPanel, config_path: pathlib.Path | None = None) -> list[panel.viewable.Viewable]
:canonical: panelini.panels.ai.plot.model_selector.build_plot_context_sidebar

```{autodoc2-docstring} panelini.panels.ai.plot.model_selector.build_plot_context_sidebar
```
````
