# {py:mod}`panelini.panels.ai.plot.utils.osw_env`

```{py:module} panelini.panels.ai.plot.utils.osw_env
```

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`EnvCredentialManager <panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`osw_env_present <panelini.panels.ai.plot.utils.osw_env.osw_env_present>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.osw_env_present
    :summary:
    ```
* - {py:obj}`check_osw_auth_env <panelini.panels.ai.plot.utils.osw_env.check_osw_auth_env>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.check_osw_auth_env
    :summary:
    ```
* - {py:obj}`build_osw_express <panelini.panels.ai.plot.utils.osw_env.build_osw_express>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.build_osw_express
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`OSW_AUTH_ENV_VARS <panelini.panels.ai.plot.utils.osw_env.OSW_AUTH_ENV_VARS>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.OSW_AUTH_ENV_VARS
    :summary:
    ```
* - {py:obj}`OSW_ENV_VARS <panelini.panels.ai.plot.utils.osw_env.OSW_ENV_VARS>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.OSW_ENV_VARS
    :summary:
    ```
````

### API

````{py:data} OSW_AUTH_ENV_VARS
:canonical: panelini.panels.ai.plot.utils.osw_env.OSW_AUTH_ENV_VARS
:type: tuple[str, ...]
:value: >
   ('OSW_DOMAIN', 'OSW_USER', 'OSW_PASSWORD')

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.OSW_AUTH_ENV_VARS
```

````

````{py:data} OSW_ENV_VARS
:canonical: panelini.panels.ai.plot.utils.osw_env.OSW_ENV_VARS
:type: tuple[str, ...]
:value: >
   ()

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.OSW_ENV_VARS
```

````

````{py:function} osw_env_present() -> bool
:canonical: panelini.panels.ai.plot.utils.osw_env.osw_env_present

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.osw_env_present
```
````

````{py:function} check_osw_auth_env() -> None
:canonical: panelini.panels.ai.plot.utils.osw_env.check_osw_auth_env

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.check_osw_auth_env
```
````

`````{py:class} EnvCredentialManager(**data)
:canonical: panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager

Bases: {py:obj}`osw.auth.CredentialManager`

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager.__init__
```

````{py:method} iri_in_file(iri: str) -> bool
:canonical: panelini.panels.ai.plot.utils.osw_env.EnvCredentialManager.iri_in_file

````

`````

````{py:function} build_osw_express(domain: str | None = None) -> typing.Any
:canonical: panelini.panels.ai.plot.utils.osw_env.build_osw_express

```{autodoc2-docstring} panelini.panels.ai.plot.utils.osw_env.build_osw_express
```
````
