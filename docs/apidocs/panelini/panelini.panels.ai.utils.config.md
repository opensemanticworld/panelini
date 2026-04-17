# {py:mod}`panelini.panels.ai.utils.config`

```{py:module} panelini.panels.ai.utils.config
```

```{autodoc2-docstring} panelini.panels.ai.utils.config
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`ModelConfig <panelini.panels.ai.utils.config.ModelConfig>`
  - ```{autodoc2-docstring} panelini.panels.ai.utils.config.ModelConfig
    :summary:
    ```
* - {py:obj}`ProviderConfig <panelini.panels.ai.utils.config.ProviderConfig>`
  - ```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig
    :summary:
    ```
* - {py:obj}`AppConfig <panelini.panels.ai.utils.config.AppConfig>`
  - ```{autodoc2-docstring} panelini.panels.ai.utils.config.AppConfig
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`parse_model_value <panelini.panels.ai.utils.config.parse_model_value>`
  - ```{autodoc2-docstring} panelini.panels.ai.utils.config.parse_model_value
    :summary:
    ```
* - {py:obj}`load_config <panelini.panels.ai.utils.config.load_config>`
  - ```{autodoc2-docstring} panelini.panels.ai.utils.config.load_config
    :summary:
    ```
````

### API

````{py:function} parse_model_value(value: str) -> tuple[str, str]
:canonical: panelini.panels.ai.utils.config.parse_model_value

```{autodoc2-docstring} panelini.panels.ai.utils.config.parse_model_value
```
````

`````{py:class} ModelConfig
:canonical: panelini.panels.ai.utils.config.ModelConfig

```{autodoc2-docstring} panelini.panels.ai.utils.config.ModelConfig
```

````{py:attribute} name
:canonical: panelini.panels.ai.utils.config.ModelConfig.name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ModelConfig.name
```

````

````{py:attribute} value
:canonical: panelini.panels.ai.utils.config.ModelConfig.value
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ModelConfig.value
```

````

`````

`````{py:class} ProviderConfig
:canonical: panelini.panels.ai.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig
```

````{py:attribute} key
:canonical: panelini.panels.ai.utils.config.ProviderConfig.key
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.key
```

````

````{py:attribute} display_name
:canonical: panelini.panels.ai.utils.config.ProviderConfig.display_name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.display_name
```

````

````{py:attribute} client_type
:canonical: panelini.panels.ai.utils.config.ProviderConfig.client_type
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.client_type
```

````

````{py:attribute} env_vars
:canonical: panelini.panels.ai.utils.config.ProviderConfig.env_vars
:type: dict[str, str]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.env_vars
```

````

````{py:attribute} models
:canonical: panelini.panels.ai.utils.config.ProviderConfig.models
:type: tuple[panelini.panels.ai.utils.config.ModelConfig, ...]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.models
```

````

````{py:property} value
:canonical: panelini.panels.ai.utils.config.ProviderConfig.value
:type: str

```{autodoc2-docstring} panelini.panels.ai.utils.config.ProviderConfig.value
```

````

`````

`````{py:class} AppConfig
:canonical: panelini.panels.ai.utils.config.AppConfig

```{autodoc2-docstring} panelini.panels.ai.utils.config.AppConfig
```

````{py:attribute} providers
:canonical: panelini.panels.ai.utils.config.AppConfig.providers
:type: dict[str, panelini.panels.ai.utils.config.ProviderConfig]
:value: >
   'field(...)'

```{autodoc2-docstring} panelini.panels.ai.utils.config.AppConfig.providers
```

````

````{py:property} default_provider
:canonical: panelini.panels.ai.utils.config.AppConfig.default_provider
:type: panelini.panels.ai.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.panels.ai.utils.config.AppConfig.default_provider
```

````

`````

````{py:function} load_config(path: pathlib.Path | None = None) -> panelini.panels.ai.utils.config.AppConfig
:canonical: panelini.panels.ai.utils.config.load_config

```{autodoc2-docstring} panelini.panels.ai.utils.config.load_config
```
````
