# Pydantic-backed JSON editor

```{image} /_static/media/jsoneditor/jsoneditor_pydantic_overview.png
:alt: jsoneditor pydantic overview
:class: docs-media
```

**Source:** [`examples/panels/jsoneditor/jsoneditor_pydantic.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_pydantic.py)
**Test:** [`tests/panels/jsoneditor/examples/test_jsoneditor_pydantic.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_pydantic.py)

Demonstrates a `PydanticEditor` subclass of `JsonEditor` that derives its schema from a Pydantic model and accepts model instances as the initial value.

## The code

```python
from panelini.panels.jsoneditor import JsonEditor
from pydantic import BaseModel, Field
from pydantic._internal._model_construction import ModelMetaclass


def _apply_formats(schema, array_tabs, dict_categories):
    """Recursively inject 'tabs' / 'categories' format hints into a JSON schema."""
    ...


class PydanticEditor(JsonEditor):
    def __init__(
        self,
        pydantic_model: ModelMetaclass,
        value=None,
        format_array_tabs: bool = False,
        format_dict_categories: bool = False,
        **params,
    ):
        json_schema = pydantic_model.model_json_schema()
        if format_array_tabs or format_dict_categories:
            json_schema = _apply_formats(json_schema, format_array_tabs, format_dict_categories)
        params.setdefault("options", {})["schema"] = json_schema
        super().__init__(**params)
        if isinstance(value, BaseModel):
            value = value.model_dump()
        self.value = value
```

Key points:

- **Schema derivation** - `model_json_schema()` converts the Pydantic model (including nested models and `$defs`) into the JSON Schema consumed by `json-editor`.
- **Pydantic instance as value** - if `value` is a `BaseModel`, it is converted with `model_dump()` before being assigned to the `value` param, so callers never need to serialize manually.
- **Initial value preserved on serve** - `value` is passed as `startval` to the JavaScript editor at mount time, preventing the first `change` event from resetting the form to schema defaults.
- **`format_array_tabs`** - adds `"format": "tabs"` to every `"type": "array"` node in the schema, rendering list items as tabs.
- **`format_dict_categories`** - adds `"format": "categories"` to every `"type": "object"` node, rendering object properties as category panels.

## Data flow

```{mermaid}
graph LR
    model([Pydantic model]) -- "model_json_schema()" --> schema([JSON Schema])
    schema --> je[PydanticEditor]
    instance([Pydantic instance]) -- "model_dump()" --> val([dict value])
    val -- "startval" --> je
    je -- "value sync" --> py[Python]
    py -- "set_value" --> je
```

## How the test exercises it

The Playwright test:

1. Defines the same Pydantic models as the example (`A`, `ASub`) locally so the example file stays self-contained.
2. Creates a fresh `PydanticEditor` via a pytest fixture.
3. Serves it on a random port and navigates a headless browser to the URL.
4. Asserts that `my_editor.value` still equals `a.model_dump()` after JS initialisation (regression test for the initial-value reset bug).
5. Fills the `x` field with `42`, blurs the input, and asserts `my_editor.value["x"] == 42` (round-trip test).

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/jsoneditor/jsoneditor_pydantic.html" title="Pydantic-backed JSON editor" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/jsoneditor/jsoneditor_pydantic.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```
## See also

- {doc}`../../panels/jsoneditor` - full `JsonEditor` guide including initial value and Pydantic integration sections
- [json-editor format options](https://github.com/json-editor/json-editor#format)
