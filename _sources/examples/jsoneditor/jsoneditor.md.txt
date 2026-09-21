# JSON editor inside panelini

```{image} /_static/media/jsoneditor/jsoneditor_panelini_min_feature.png
:alt: jsoneditor panelini min feature
:class: docs-media
```

**Source:** [`examples/panels/jsoneditor/jsoneditor_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_panelini_min.py)
**Test:** [`tests/panels/jsoneditor/examples/test_jsoneditor_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_panelini_min.py)

A JSON-Schema-driven form hosted inside a Panelini card.

## The code

```python
import panel as pn

from panelini import Panelini

from .jsoneditor_panel_min import App as JsonEditorPanel

jsoneditor_panel = JsonEditorPanel()

app = Panelini(title="📝 JSON Editor Demo", sidebar_visible=False)
app.main_set(objects=[
    pn.Card(
        title="JSON Editor",
        objects=[jsoneditor_panel],
        max_height=800,
    ),
])
app.servable()
```

`JsonEditorPanel` is a thin `AnyWidgetComponent` wrapper around the [json-editor](https://github.com/json-editor/json-editor) JS library. The form is rendered client-side from a JSON Schema and keeps its value in sync with the Python side through param bindings.

## What gets rendered

The `App` class in [`jsoneditor_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_panel_min.py) owns a `JsonEditor` instance plus a Panel *Save* button. The schema declares a single `testxy` string field with a custom title-update side-effect on save.

```{mermaid}
graph LR
    schema([JSON Schema]) --> je[JsonEditor]
    je -- "value sync" --> py[Python]
    py -- "set_value / set_schema" --> je
    save([Save button]) --> py
```

## How the test exercises it

The Playwright test:

1. Imports `app` and `jsoneditor_panel` from the example module (collection-time import - panelini's background images are disabled in `tests/conftest.py` so this is fast).
2. Serves the app on a random port.
3. Types into the `#root\[testxy\]` input, clicks *Save*, and asserts both the Python-side value and the rendered title updated.

If the example breaks, the test fails - so the example is guaranteed to keep working.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/jsoneditor/jsoneditor_panelini_min.html" title="JSON editor inside panelini" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/jsoneditor/jsoneditor_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/jsoneditor` - full `JsonEditor` guide with dynamic schemas
- [json-editor docs](https://github.com/json-editor/json-editor#options)
