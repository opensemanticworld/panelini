# {py:mod}`panelini.testing`

```{py:module} panelini.testing
```

```{autodoc2-docstring} panelini.testing
:allowtitles:
```

## Module Contents

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`free_port <panelini.testing.free_port>`
  - ```{autodoc2-docstring} panelini.testing.free_port
    :summary:
    ```
* - {py:obj}`disable_panelini_backgrounds <panelini.testing.disable_panelini_backgrounds>`
  - ```{autodoc2-docstring} panelini.testing.disable_panelini_backgrounds
    :summary:
    ```
* - {py:obj}`center <panelini.testing.center>`
  - ```{autodoc2-docstring} panelini.testing.center
    :summary:
    ```
* - {py:obj}`node_dom_pos <panelini.testing.node_dom_pos>`
  - ```{autodoc2-docstring} panelini.testing.node_dom_pos
    :summary:
    ```
* - {py:obj}`wait_until <panelini.testing.wait_until>`
  - ```{autodoc2-docstring} panelini.testing.wait_until
    :summary:
    ```
* - {py:obj}`xterm_wait_for_text <panelini.testing.xterm_wait_for_text>`
  - ```{autodoc2-docstring} panelini.testing.xterm_wait_for_text
    :summary:
    ```
* - {py:obj}`vn_wait <panelini.testing.vn_wait>`
  - ```{autodoc2-docstring} panelini.testing.vn_wait
    :summary:
    ```
* - {py:obj}`wb_wait <panelini.testing.wb_wait>`
  - ```{autodoc2-docstring} panelini.testing.wb_wait
    :summary:
    ```
* - {py:obj}`wb_row <panelini.testing.wb_row>`
  - ```{autodoc2-docstring} panelini.testing.wb_row
    :summary:
    ```
* - {py:obj}`wb_row_center <panelini.testing.wb_row_center>`
  - ```{autodoc2-docstring} panelini.testing.wb_row_center
    :summary:
    ```
* - {py:obj}`wb_title_center <panelini.testing.wb_title_center>`
  - ```{autodoc2-docstring} panelini.testing.wb_title_center
    :summary:
    ```
* - {py:obj}`wb_checkbox <panelini.testing.wb_checkbox>`
  - ```{autodoc2-docstring} panelini.testing.wb_checkbox
    :summary:
    ```
* - {py:obj}`drag <panelini.testing.drag>`
  - ```{autodoc2-docstring} panelini.testing.drag
    :summary:
    ```
* - {py:obj}`assemble_animation <panelini.testing.assemble_animation>`
  - ```{autodoc2-docstring} panelini.testing.assemble_animation
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`Point <panelini.testing.Point>`
  - ```{autodoc2-docstring} panelini.testing.Point
    :summary:
    ```
* - {py:obj}`CURSOR_INIT_JS <panelini.testing.CURSOR_INIT_JS>`
  - ```{autodoc2-docstring} panelini.testing.CURSOR_INIT_JS
    :summary:
    ```
````

### API

````{py:data} Point
:canonical: panelini.testing.Point
:value: >
   None

```{autodoc2-docstring} panelini.testing.Point
```

````

````{py:function} free_port() -> int
:canonical: panelini.testing.free_port

```{autodoc2-docstring} panelini.testing.free_port
```
````

````{py:function} disable_panelini_backgrounds() -> None
:canonical: panelini.testing.disable_panelini_backgrounds

```{autodoc2-docstring} panelini.testing.disable_panelini_backgrounds
```
````

````{py:function} center(box: playwright.sync_api.FloatRect) -> panelini.testing.Point
:canonical: panelini.testing.center

```{autodoc2-docstring} panelini.testing.center
```
````

````{py:function} node_dom_pos(page: typing.Any, node_id: typing.Any) -> panelini.testing.Point
:canonical: panelini.testing.node_dom_pos

```{autodoc2-docstring} panelini.testing.node_dom_pos
```
````

````{py:function} wait_until(predicate: typing.Callable[[], bool], timeout: float = 2.0, interval: float = 0.05) -> None
:canonical: panelini.testing.wait_until

```{autodoc2-docstring} panelini.testing.wait_until
```
````

````{py:function} xterm_wait_for_text(page: typing.Any, text: str, timeout: float = 30000) -> None
:canonical: panelini.testing.xterm_wait_for_text

```{autodoc2-docstring} panelini.testing.xterm_wait_for_text
```
````

````{py:function} vn_wait(page: typing.Any, timeout: int = 10000) -> None
:canonical: panelini.testing.vn_wait

```{autodoc2-docstring} panelini.testing.vn_wait
```
````

````{py:function} wb_wait(page: typing.Any, timeout: int = 10000) -> None
:canonical: panelini.testing.wb_wait

```{autodoc2-docstring} panelini.testing.wb_wait
```
````

````{py:function} wb_row(page: typing.Any, title: str) -> typing.Any
:canonical: panelini.testing.wb_row

```{autodoc2-docstring} panelini.testing.wb_row
```
````

````{py:function} wb_row_center(page: typing.Any, title: str) -> panelini.testing.Point
:canonical: panelini.testing.wb_row_center

```{autodoc2-docstring} panelini.testing.wb_row_center
```
````

````{py:function} wb_title_center(page: typing.Any, title: str) -> panelini.testing.Point
:canonical: panelini.testing.wb_title_center

```{autodoc2-docstring} panelini.testing.wb_title_center
```
````

````{py:function} wb_checkbox(page: typing.Any, title: str) -> typing.Any
:canonical: panelini.testing.wb_checkbox

```{autodoc2-docstring} panelini.testing.wb_checkbox
```
````

````{py:function} drag(page: typing.Any, start: panelini.testing.Point, end: panelini.testing.Point, steps: int = 10, dwell: float = 0.06, shot: typing.Callable[[int], None] | None = None) -> None
:canonical: panelini.testing.drag

```{autodoc2-docstring} panelini.testing.drag
```
````

````{py:data} CURSOR_INIT_JS
:canonical: panelini.testing.CURSOR_INIT_JS
:value: <Multiline-String>

```{autodoc2-docstring} panelini.testing.CURSOR_INIT_JS
```

````

````{py:function} assemble_animation(frames: list, out_path: typing.Any, *, duration_ms: int = 100, width: int = 1200, fmt: str = 'webp', quality: int = 80, colors: int = 128, max_frame_ms: int = 1500, diff_threshold: int = 24, min_change_frac: float = 5e-05) -> int
:canonical: panelini.testing.assemble_animation

```{autodoc2-docstring} panelini.testing.assemble_animation
```
````
