# {py:mod}`panelini.main`

```{py:module} panelini.main
```

```{autodoc2-docstring} panelini.main
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`Panelini <panelini.main.Panelini>`
  - ```{autodoc2-docstring} panelini.main.Panelini
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`image_to_base64 <panelini.main.image_to_base64>`
  - ```{autodoc2-docstring} panelini.main.image_to_base64
    :summary:
    ```
````

### API

````{py:exception} ImageFileNotFoundError(image_path: str)
:canonical: panelini.main.ImageFileNotFoundError

Bases: {py:obj}`FileNotFoundError`

```{autodoc2-docstring} panelini.main.ImageFileNotFoundError
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.main.ImageFileNotFoundError.__init__
```

````

````{py:function} image_to_base64(image_path: str) -> str
:canonical: panelini.main.image_to_base64

```{autodoc2-docstring} panelini.main.image_to_base64
```
````

`````{py:class} Panelini(**params: typing.Any)
:canonical: panelini.main.Panelini

Bases: {py:obj}`param.Parameterized`

```{autodoc2-docstring} panelini.main.Panelini
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.main.Panelini.__init__
```

````{py:attribute} logo
:canonical: panelini.main.Panelini.logo
:value: >
   'ClassSelector(...)'

```{autodoc2-docstring} panelini.main.Panelini.logo
```

````

````{py:attribute} logo_link_url
:canonical: panelini.main.Panelini.logo_link_url
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.main.Panelini.logo_link_url
```

````

````{py:attribute} title
:canonical: panelini.main.Panelini.title
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.main.Panelini.title
```

````

````{py:attribute} header_background_image
:canonical: panelini.main.Panelini.header_background_image
:value: >
   'ClassSelector(...)'

```{autodoc2-docstring} panelini.main.Panelini.header_background_image
```

````

````{py:attribute} content_background_image
:canonical: panelini.main.Panelini.content_background_image
:value: >
   'ClassSelector(...)'

```{autodoc2-docstring} panelini.main.Panelini.content_background_image
```

````

````{py:attribute} static_dir
:canonical: panelini.main.Panelini.static_dir
:value: >
   'ClassSelector(...)'

```{autodoc2-docstring} panelini.main.Panelini.static_dir
```

````

````{py:attribute} main
:canonical: panelini.main.Panelini.main
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.main.Panelini.main
```

````

````{py:attribute} sidebar
:canonical: panelini.main.Panelini.sidebar
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar
```

````

````{py:attribute} sidebar_right
:canonical: panelini.main.Panelini.sidebar_right
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar_right
```

````

````{py:attribute} sidebar_enabled
:canonical: panelini.main.Panelini.sidebar_enabled
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar_enabled
```

````

````{py:attribute} sidebar_right_enabled
:canonical: panelini.main.Panelini.sidebar_right_enabled
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar_right_enabled
```

````

````{py:attribute} sidebar_visible
:canonical: panelini.main.Panelini.sidebar_visible
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar_visible
```

````

````{py:attribute} sidebar_right_visible
:canonical: panelini.main.Panelini.sidebar_right_visible
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebar_right_visible
```

````

````{py:attribute} sidebars_max_width
:canonical: panelini.main.Panelini.sidebars_max_width
:value: >
   'Integer(...)'

```{autodoc2-docstring} panelini.main.Panelini.sidebars_max_width
```

````

````{py:attribute} footer
:canonical: panelini.main.Panelini.footer
:value: >
   'List(...)'

```{autodoc2-docstring} panelini.main.Panelini.footer
```

````

````{py:attribute} footer_enabled
:canonical: panelini.main.Panelini.footer_enabled
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.footer_enabled
```

````

````{py:attribute} use_ai
:canonical: panelini.main.Panelini.use_ai
:value: >
   'Boolean(...)'

```{autodoc2-docstring} panelini.main.Panelini.use_ai
```

````

````{py:attribute} ai_system_message
:canonical: panelini.main.Panelini.ai_system_message
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.main.Panelini.ai_system_message
```

````

````{py:attribute} ai_welcome_message
:canonical: panelini.main.Panelini.ai_welcome_message
:value: >
   'String(...)'

```{autodoc2-docstring} panelini.main.Panelini.ai_welcome_message
```

````

````{py:attribute} ai_config_path
:canonical: panelini.main.Panelini.ai_config_path
:value: >
   'ClassSelector(...)'

```{autodoc2-docstring} panelini.main.Panelini.ai_config_path
```

````

````{py:method} sidebar_right_set(objects: list[panel.viewable.Viewable]) -> None
:canonical: panelini.main.Panelini.sidebar_right_set

```{autodoc2-docstring} panelini.main.Panelini.sidebar_right_set
```

````

````{py:method} sidebar_right_get() -> list[panel.viewable.Viewable]
:canonical: panelini.main.Panelini.sidebar_right_get

```{autodoc2-docstring} panelini.main.Panelini.sidebar_right_get
```

````

````{py:method} sidebar_set(objects: list[panel.viewable.Viewable]) -> None
:canonical: panelini.main.Panelini.sidebar_set

```{autodoc2-docstring} panelini.main.Panelini.sidebar_set
```

````

````{py:method} sidebar_get() -> list[panel.viewable.Viewable]
:canonical: panelini.main.Panelini.sidebar_get

```{autodoc2-docstring} panelini.main.Panelini.sidebar_get
```

````

````{py:method} main_remove_index(index: int) -> None
:canonical: panelini.main.Panelini.main_remove_index

```{autodoc2-docstring} panelini.main.Panelini.main_remove_index
```

````

````{py:method} main_add(objects: list[panel.viewable.Viewable]) -> None
:canonical: panelini.main.Panelini.main_add

```{autodoc2-docstring} panelini.main.Panelini.main_add
```

````

````{py:method} main_set(objects: list[panel.viewable.Viewable]) -> None
:canonical: panelini.main.Panelini.main_set

```{autodoc2-docstring} panelini.main.Panelini.main_set
```

````

````{py:method} main_clear() -> None
:canonical: panelini.main.Panelini.main_clear

```{autodoc2-docstring} panelini.main.Panelini.main_clear
```

````

````{py:method} main_get() -> list[panel.viewable.Viewable]
:canonical: panelini.main.Panelini.main_get

```{autodoc2-docstring} panelini.main.Panelini.main_get
```

````

````{py:method} servable(**kwargs: typing.Any) -> panel.viewable.Viewable
:canonical: panelini.main.Panelini.servable

```{autodoc2-docstring} panelini.main.Panelini.servable
```

````

`````
