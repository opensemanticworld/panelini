# Validate against an OO-LD schema

```{image} /_static/media/monacoeditor/monacoeditor_oold_min_feature.png
:alt: an oo-ld quantityvalue schema on the left and a valid measurement instance on the right
:class: docs-media
```

**Source:** [`examples/panels/monacoeditor/monacoeditor_oold_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/monacoeditor/monacoeditor_oold_min.py)
**Test:** [`tests/panels/monacoeditor/examples/test_monacoeditor_oold_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/monacoeditor/examples/test_monacoeditor_oold_min.py)

The same side-by-side layout as the [minimal example](monacoeditor_panel_min), but the schema is a real [OO-LD](https://github.com/OO-LD/oold-schema) document pulled from a public registry: the `QuantityValue` schema for physical measurements.

## The code

The `QuantityValue` schema is fetched once with `urllib.request.urlopen` at module import, and the example instance it ships becomes the starting data document:

```{literalinclude} ../../../examples/panels/monacoeditor/monacoeditor_oold_min.py
:start-at: from urllib.request import urlopen
:end-at: DATA = SCHEMA["examples"][0]
```

The app itself is one `Viewer` that wires that schema and data into two editors:

```{literalinclude} ../../../examples/panels/monacoeditor/monacoeditor_oold_min.py
:pyobject: App
```

The fetch runs in Python at import time, so the browser makes no cross-origin request and nothing depends on oo-ld.org being reachable once the app is up. The trade-off: Monaco cannot follow the schema's own `$schema` pointer either, so the left editor uses `schema_request="ignore"` to show the document exactly as authored instead of flagging that pointer as unresolvable.

OO-LD schemas are ordinary JSON Schema plus a JSON-LD `@context` and `x-oold-*` annotations. Monaco ignores those extra keywords when validating, so `value`, `unit` and `standard_uncertainty` behave as plain JSON Schema properties.

## What you'll see

```{mermaid}
graph LR
    registry(["OO-LD registry<br/>schemas.oo-ld.org"])
    schema(["Schema editor<br/>left"])
    data(["QuantityValue instance<br/>right, validated"])
    registry -- "urlopen at import" --> schema
    schema -- "json_schema" --> data

    classDef ed fill:#0d7377,stroke:#095c5f,color:#ffffff
    classDef ext fill:#6366f1,stroke:#4f46e5,color:#ffffff
    class schema,data ed
    class registry ext
```

The left editor shows the fetched schema and the right validates the bundled measurement instance against it; a "Schema fetched from ..." status line runs along the bottom, under both editors.

## See also

- {doc}`../../panels/monacoeditor`
