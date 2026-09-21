# Standalone JSON editor panel

```{image} /_static/media/jsoneditor/jsoneditor_panel_min_feature.png
:alt: standalone json editor panel with live preview and save button
:class: docs-media
```

**Source:** [`examples/panels/jsoneditor/jsoneditor_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/jsoneditor/jsoneditor_panel_min.py)
**Test:** [`tests/panels/jsoneditor/examples/test_jsoneditor_panel_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/jsoneditor/examples/test_jsoneditor_panel_min.py)

A self-contained `App` that hosts a `JsonEditor` without the Panelini shell. The editor renders a JSON-Schema driven form, a live `pn.pane.JSON` preview mirrors its current value, and a Panel *Save* button reacts to the value.

On save the `App` rewrites the schema title to `Updated Title` with `set_schema(..., keep_value=True)`, so the form re-renders its heading while preserving what the user typed.

## The code

```python
import panel as pn

from panelini.panels.jsoneditor import JsonEditor


class App(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        self.jsoneditor = JsonEditor(max_height=500, max_width=800)

        self.save_btn = pn.widgets.Button(css_classes=["save_btn"], name="Save", button_type="primary")
        pn.bind(self.on_save, self.save_btn, watch=True)

        self._view = pn.Column(
            self.jsoneditor,
            pn.pane.JSON(self.jsoneditor.param.value, theme="light"),
            self.save_btn,
        )

    def on_save(self, event):
        self.jsoneditor.set_schema({**self.jsoneditor.options["schema"], "title": "Updated Title"}, keep_value=True)

    def __panel__(self):
        return self._view
```

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/jsoneditor/jsoneditor_panel_min.html" title="Standalone JSON editor panel" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/jsoneditor/jsoneditor_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/jsoneditor`
