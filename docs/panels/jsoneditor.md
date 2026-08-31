# JsonEditor

```{image} /_static/media/jsoneditor/jsoneditor_pydantic_overview.png
:alt: jsoneditor pydantic overview
:class: docs-media
```

`JsonEditor` renders an interactive form from a JSON Schema, wrapping the [json-editor](https://github.com/json-editor/json-editor) JavaScript library as a Panel component. Schemas can be swapped at runtime, and the form value stays synchronised with Python in both directions.

## Quickstart

```python
from panelini.panels.jsoneditor import JsonEditor

schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "title": "Name"},
        "age": {"type": "integer", "title": "Age", "minimum": 0},
        "email": {"type": "string", "format": "email", "title": "Email"},
    },
    "required": ["name", "email"],
}

editor = JsonEditor(
    options={
        "schema": schema,
        "theme": "bootstrap5",
        "iconlib": "spectre",
    }
)

# Get the current form value
data = editor.get_value()

# Set form data programmatically
editor.set_value({"name": "Alice", "age": 30, "email": "alice@example.com"})
```

## Standalone panel

```{image} /_static/media/jsoneditor/jsoneditor_panel_min_feature.png
:alt: standalone json editor panel with live preview and save button
:class: docs-media
```

A self-contained `App` that hosts a `JsonEditor` without the Panelini shell. The editor renders the form, a live `pn.pane.JSON` preview mirrors its current value, and a Panel *Save* button reacts to it.

On save the `App` rewrites the schema title to `Updated Title` with `set_schema(..., keep_value=True)`, so the form re-renders its heading while preserving what the user typed.

```{literalinclude} ../../examples/panels/jsoneditor/jsoneditor_panel_min.py
:language: python
:pyobject: App
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_panel_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_panel_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/jsoneditor/jsoneditor_panel_min.html" title="Standalone JSON editor panel" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/jsoneditor/jsoneditor_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Inside a Panelini shell

```{image} /_static/media/jsoneditor/jsoneditor_panelini_min_feature.png
:alt: json editor panel inside a panelini shell
:class: docs-media
```

The same panel hosted in a Panelini card. Only the shell wiring differs, which is the point of the panels-are-standalone design.

```{literalinclude} ../../examples/panels/jsoneditor/jsoneditor_panelini_min.py
:language: python
:start-at: jsoneditor_panel = JsonEditorPanel()
:end-at: app.servable()
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_panelini_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_panelini_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/jsoneditor/jsoneditor_panelini_min.html" title="JSON editor inside panelini" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/jsoneditor/jsoneditor_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Pydantic models

```{image} /_static/media/jsoneditor/jsoneditor_pydantic_overview.png
:alt: jsoneditor pydantic overview
:class: docs-media
```

`JsonEditor` can be subclassed to accept Pydantic models directly. `PydanticEditor` derives the JSON Schema from the model with `model_json_schema()` (including nested models and `$defs`) and converts a `BaseModel` instance to a dict with `model_dump()`, so callers never serialise by hand. The value is passed to the JavaScript editor as `startval` at mount time, which keeps the first `change` event from resetting the form to schema defaults.

```{literalinclude} ../../examples/panels/jsoneditor/jsoneditor_pydantic.py
:language: python
:pyobject: PydanticEditor
```

Two optional format hints are injected recursively into the derived schema by
`_apply_formats`: `format_array_tabs` adds `"format": "tabs"` to every array node,
rendering list items as tabs, and `format_dict_categories` adds
`"format": "categories"` to every object node, rendering properties as category panels.

```{literalinclude} ../../examples/panels/jsoneditor/jsoneditor_pydantic.py
:language: python
:start-at: my_editor = PydanticEditor(
:end-at: )
:dedent: 4
```

```{mermaid}
graph LR
    model([Pydantic model]) -- "model_json_schema()" --> schema([JSON Schema])
    schema --> je[PydanticEditor]
    instance([Pydantic instance]) -- "model_dump()" --> val([dict value])
    val -- "startval" --> je
    je -- "value sync" --> py[Python]
    py -- "set_value" --> je
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_pydantic.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_pydantic.py) - [json-editor format options](https://github.com/json-editor/json-editor#format)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/jsoneditor/jsoneditor_pydantic.html" title="Pydantic-backed JSON editor" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/jsoneditor/jsoneditor_pydantic.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Alongside Panel's JSONEditor

```{image} /_static/media/jsoneditor/jsoneditor_both_min_feature.png
:alt: panelini form editor and panel tree editor on one page
:class: docs-media
```

panelini's `JsonEditor` (a schema-driven form built on [json-editor/json-editor](https://github.com/json-editor/json-editor)) and Panel's own `pn.widgets.JSONEditor` (a tree editor built on [josdejong/jsoneditor](https://github.com/josdejong/jsoneditor)) both expose a global `JSONEditor` name in the browser, yet they coexist on one page without clobbering each other. Here they show the same document two ways.

```{literalinclude} ../../examples/panels/jsoneditor/jsoneditor_both_min.py
:language: python
:start-at: pn.extension("jsoneditor")
:end-before: if pn.state.served:
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_both_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_both_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/jsoneditor/jsoneditor_both_min.html" title="Two JSON editors side by side" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/jsoneditor/jsoneditor_both_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Options

### Dynamic schema updates

Schemas can be changed at runtime:

```python
new_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string", "format": "textarea"},
    },
}

# Replace schema, optionally keeping current values
editor.set_schema(new_schema, keep_value=False)

# Replace schema with initial values
editor.set_schema(new_schema, startval={"title": "Hello"})
```

### Editor configuration

The `options` parameter accepts any valid [json-editor configuration](https://github.com/json-editor/json-editor#options):

```python
editor = JsonEditor(
    options={
        "schema": schema,
        "theme": "bootstrap5",        # UI theme
        "iconlib": "spectre",          # Icon library
        "disable_collapse": True,      # Prevent section collapsing
        "disable_edit_json": True,     # Hide raw JSON edit button
        "disable_properties": True,    # Hide properties button
    }
)
```

### Initial value

Pass `value` as a keyword argument to pre-populate the form. The value survives being served: the JavaScript editor is initialised with it as `startval`, so the first `change` event reflects the supplied data instead of schema defaults.

```python
editor = JsonEditor(
    options={"schema": schema},
    value={"name": "Alice", "age": 30, "email": "alice@example.com"},
)
```

## API reference

{py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor`
