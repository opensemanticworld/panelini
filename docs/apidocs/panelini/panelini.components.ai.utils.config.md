# {py:mod}`panelini.components.ai.utils.config`

```{py:module} panelini.components.ai.utils.config
```

```{autodoc2-docstring} panelini.components.ai.utils.config
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`ModelConfig <panelini.components.ai.utils.config.ModelConfig>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.config.ModelConfig
    :summary:
    ```
* - {py:obj}`ProviderConfig <panelini.components.ai.utils.config.ProviderConfig>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig
    :summary:
    ```
* - {py:obj}`AppConfig <panelini.components.ai.utils.config.AppConfig>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.config.AppConfig
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`load_config <panelini.components.ai.utils.config.load_config>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.config.load_config
    :summary:
    ```
````

### API

`````{py:class} ModelConfig
:canonical: panelini.components.ai.utils.config.ModelConfig

```{autodoc2-docstring} panelini.components.ai.utils.config.ModelConfig
```

````{py:attribute} name
:canonical: panelini.components.ai.utils.config.ModelConfig.name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ModelConfig.name
```

````

````{py:attribute} value
:canonical: panelini.components.ai.utils.config.ModelConfig.value
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ModelConfig.value
```

````

`````

`````{py:class} ProviderConfig
:canonical: panelini.components.ai.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig
```

````{py:attribute} key
:canonical: panelini.components.ai.utils.config.ProviderConfig.key
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.key
```

````

````{py:attribute} display_name
:canonical: panelini.components.ai.utils.config.ProviderConfig.display_name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.display_name
```

````

````{py:attribute} client_type
:canonical: panelini.components.ai.utils.config.ProviderConfig.client_type
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.client_type
```

````

````{py:attribute} env_vars
:canonical: panelini.components.ai.utils.config.ProviderConfig.env_vars
:type: dict[str, str]
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.env_vars
```

````

````{py:attribute} models
:canonical: panelini.components.ai.utils.config.ProviderConfig.models
:type: tuple[panelini.components.ai.utils.config.ModelConfig, ...]
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.models
```

````

````{py:property} value
:canonical: panelini.components.ai.utils.config.ProviderConfig.value
:type: str

```{autodoc2-docstring} panelini.components.ai.utils.config.ProviderConfig.value
```

````

`````

`````{py:class} AppConfig
:canonical: panelini.components.ai.utils.config.AppConfig

```{autodoc2-docstring} panelini.components.ai.utils.config.AppConfig
```

````{py:attribute} providers
:canonical: panelini.components.ai.utils.config.AppConfig.providers
:type: dict[str, panelini.components.ai.utils.config.ProviderConfig]
:value: >
   'field(...)'

```{autodoc2-docstring} panelini.components.ai.utils.config.AppConfig.providers
```

````

````{py:property} default_provider
:canonical: panelini.components.ai.utils.config.AppConfig.default_provider
:type: panelini.components.ai.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.components.ai.utils.config.AppConfig.default_provider
```

````

`````

````{py:function} load_config(path: pathlib.Path | None = None) -> panelini.components.ai.utils.config.AppConfig
:canonical: panelini.components.ai.utils.config.load_config

```{autodoc2-docstring} panelini.components.ai.utils.config.load_config
```
````
