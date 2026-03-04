# {py:mod}`panelini.components.migration.utils.config`

```{py:module} panelini.components.migration.utils.config
```

```{autodoc2-docstring} panelini.components.migration.utils.config
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`ModelConfig <panelini.components.migration.utils.config.ModelConfig>`
  - ```{autodoc2-docstring} panelini.components.migration.utils.config.ModelConfig
    :summary:
    ```
* - {py:obj}`ProviderConfig <panelini.components.migration.utils.config.ProviderConfig>`
  - ```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig
    :summary:
    ```
* - {py:obj}`AppConfig <panelini.components.migration.utils.config.AppConfig>`
  - ```{autodoc2-docstring} panelini.components.migration.utils.config.AppConfig
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`load_config <panelini.components.migration.utils.config.load_config>`
  - ```{autodoc2-docstring} panelini.components.migration.utils.config.load_config
    :summary:
    ```
````

### API

`````{py:class} ModelConfig
:canonical: panelini.components.migration.utils.config.ModelConfig

```{autodoc2-docstring} panelini.components.migration.utils.config.ModelConfig
```

````{py:attribute} name
:canonical: panelini.components.migration.utils.config.ModelConfig.name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ModelConfig.name
```

````

````{py:attribute} value
:canonical: panelini.components.migration.utils.config.ModelConfig.value
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ModelConfig.value
```

````

`````

`````{py:class} ProviderConfig
:canonical: panelini.components.migration.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig
```

````{py:attribute} key
:canonical: panelini.components.migration.utils.config.ProviderConfig.key
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.key
```

````

````{py:attribute} display_name
:canonical: panelini.components.migration.utils.config.ProviderConfig.display_name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.display_name
```

````

````{py:attribute} client_type
:canonical: panelini.components.migration.utils.config.ProviderConfig.client_type
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.client_type
```

````

````{py:attribute} env_vars
:canonical: panelini.components.migration.utils.config.ProviderConfig.env_vars
:type: dict[str, str]
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.env_vars
```

````

````{py:attribute} models
:canonical: panelini.components.migration.utils.config.ProviderConfig.models
:type: tuple[panelini.components.migration.utils.config.ModelConfig, ...]
:value: >
   None

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.models
```

````

````{py:property} value
:canonical: panelini.components.migration.utils.config.ProviderConfig.value
:type: str

```{autodoc2-docstring} panelini.components.migration.utils.config.ProviderConfig.value
```

````

`````

`````{py:class} AppConfig
:canonical: panelini.components.migration.utils.config.AppConfig

```{autodoc2-docstring} panelini.components.migration.utils.config.AppConfig
```

````{py:attribute} providers
:canonical: panelini.components.migration.utils.config.AppConfig.providers
:type: dict[str, panelini.components.migration.utils.config.ProviderConfig]
:value: >
   'field(...)'

```{autodoc2-docstring} panelini.components.migration.utils.config.AppConfig.providers
```

````

````{py:property} default_provider
:canonical: panelini.components.migration.utils.config.AppConfig.default_provider
:type: panelini.components.migration.utils.config.ProviderConfig

```{autodoc2-docstring} panelini.components.migration.utils.config.AppConfig.default_provider
```

````

`````

````{py:function} load_config(path: pathlib.Path | None = None) -> panelini.components.migration.utils.config.AppConfig
:canonical: panelini.components.migration.utils.config.load_config

```{autodoc2-docstring} panelini.components.migration.utils.config.load_config
```
````
