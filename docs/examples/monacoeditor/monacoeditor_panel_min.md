# Schema and data side by side

```{image} /_static/media/monacoeditor/monacoeditor_panel_min_feature.png
:alt: two monaco editors, a json schema on the left and a data document flagged against it on the right
:class: docs-media
```

**Source:** [`examples/panels/monacoeditor/monacoeditor_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/monacoeditor/monacoeditor_panel_min.py)
**Test:** [`tests/panels/monacoeditor/examples/test_monacoeditor_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/monacoeditor/examples/test_monacoeditor_panel_min.py)

Two `MonacoEditor` panels used directly in a Panel layout. The left one holds a JSON Schema and is free to edit; the right one holds a data document validated against that schema, live.

## The code

`SCHEMA` is a tiny JSON Schema and `DATA` a matching document, both defined at module level. The app is one `Viewer`: two editors, plus a `param.watch` that re-applies the edited schema to the data editor on every change, so the markers under the data update as you type.

```{literalinclude} ../../../examples/panels/monacoeditor/monacoeditor_panel_min.py
:pyobject: App
```

Validation is entirely local: Monaco resolves `json_schema` in the browser and never fetches anything over the network.

## What you'll see

```{mermaid}
graph LR
    schema(["JSON Schema<br/>left, editable"])
    data(["Data document<br/>right, validated"])
    schema -- "json_schema, live" --> data

    classDef ed fill:#0d7377,stroke:#095c5f,color:#ffffff
    class schema,data ed
```

Two editors side by side. In the capture the data sets `age` to an invalid value, so the right editor draws a warning squiggle under it with the schema's own `description` in the hover.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/monacoeditor/monacoeditor_panel_min.html" title="Schema and data side by side" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/monacoeditor/monacoeditor_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/monacoeditor`
