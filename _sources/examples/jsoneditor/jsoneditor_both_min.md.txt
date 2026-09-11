# Two JSON editors side by side

```{image} /_static/media/jsoneditor/jsoneditor_both_min_feature.png
:alt: panelini form editor and panel tree editor on one page
:class: docs-media
```

**Source:** [`examples/panels/jsoneditor/jsoneditor_both_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_both_min.py)
**Test:** [`tests/panels/jsoneditor/examples/test_jsoneditor_both_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_both_min.py)

Panelini's `JsonEditor` (a schema-driven form built on [json-editor/json-editor](https://github.com/json-editor/json-editor)) and Panel's own `pn.widgets.JSONEditor` (a tree editor built on [josdejong/jsoneditor](https://github.com/josdejong/jsoneditor)) live on the same page.

Both libraries expose a global `JSONEditor` name, yet they coexist here without clobbering each other. The form editor renders from a JSON Schema, while the tree editor renders from a plain value dict.

## The code

```python
import panel as pn

from panelini.panels.jsoneditor import JsonEditor

pn.extension("jsoneditor")

form_editor = JsonEditor(
    options={
        "schema": {
            "title": "Form Editor",
            "required": ["name"],
            "properties": {
                "name": {"type": "string"},
                "value": {"type": "number"},
            },
        },
    },
    max_height=500,
)

tree_editor = pn.widgets.JSONEditor(
    value={
        "dict": {"key": "value"},
        "float": 3.14,
        "int": 1,
        "list": [1, 2, 3],
        "string": "A string",
    },
    width=400,
)

app = pn.Row(
    pn.Card(form_editor, title="Panelini JsonEditor (Form)"),
    pn.Card(tree_editor, title="Panel JSONEditor (Tree)"),
)
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/jsoneditor/jsoneditor_both_min.html" title="Two JSON editors side by side" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/jsoneditor/jsoneditor_both_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/jsoneditor`
