# {py:mod}`panelini.panels.tanstack.table.icons`

```{py:module} panelini.panels.tanstack.table.icons
```

```{autodoc2-docstring} panelini.panels.tanstack.table.icons
:allowtitles:
```

## Module Contents

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`extension_of <panelini.panels.tanstack.table.icons.extension_of>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.icons.extension_of
    :summary:
    ```
* - {py:obj}`icon_for <panelini.panels.tanstack.table.icons.icon_for>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.icons.icon_for
    :summary:
    ```
* - {py:obj}`load_icons <panelini.panels.tanstack.table.icons.load_icons>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.icons.load_icons
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`FILE_ICONS <panelini.panels.tanstack.table.icons.FILE_ICONS>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.icons.FILE_ICONS
    :summary:
    ```
* - {py:obj}`DEFAULT_FILE_ICON <panelini.panels.tanstack.table.icons.DEFAULT_FILE_ICON>`
  - ```{autodoc2-docstring} panelini.panels.tanstack.table.icons.DEFAULT_FILE_ICON
    :summary:
    ```
````

### API

````{py:data} FILE_ICONS
:canonical: panelini.panels.tanstack.table.icons.FILE_ICONS
:type: dict[str, str]
:value: >
   None

```{autodoc2-docstring} panelini.panels.tanstack.table.icons.FILE_ICONS
```

````

````{py:data} DEFAULT_FILE_ICON
:canonical: panelini.panels.tanstack.table.icons.DEFAULT_FILE_ICON
:value: >
   'file'

```{autodoc2-docstring} panelini.panels.tanstack.table.icons.DEFAULT_FILE_ICON
```

````

````{py:function} extension_of(name: str) -> str
:canonical: panelini.panels.tanstack.table.icons.extension_of

```{autodoc2-docstring} panelini.panels.tanstack.table.icons.extension_of
```
````

````{py:function} icon_for(name: str, extra: collections.abc.Mapping[str, str] | None = None, default: str = DEFAULT_FILE_ICON) -> str
:canonical: panelini.panels.tanstack.table.icons.icon_for

```{autodoc2-docstring} panelini.panels.tanstack.table.icons.icon_for
```
````

````{py:function} load_icons(directory: str | pathlib.Path, names: collections.abc.Mapping[str, str] | None = None) -> dict[str, str]
:canonical: panelini.panels.tanstack.table.icons.load_icons

```{autodoc2-docstring} panelini.panels.tanstack.table.icons.load_icons
```
````
