"""Example: panelini JsonEditor (form) and pn.widgets.JSONEditor (tree) side by side."""

import panel as pn

from panelini.panels.jsoneditor import JsonEditor

pn.extension("jsoneditor")

# Both editors are driven by the same schema and the same instance, so the two views
# can be compared directly: a schema-driven form on the left, the raw JSON tree of the
# very same document on the right.
SCHEMA = {
    "title": "Measurement",
    "required": ["name"],
    "properties": {
        "name": {"type": "string"},
        "value": {"type": "number"},
        "unit": {"type": "string"},
    },
}

INSTANCE = {"name": "Sample A", "value": 3.14, "unit": "mm"}

form_editor = JsonEditor(
    options={"schema": SCHEMA},
    value=dict(INSTANCE),
    max_height=500,
)

tree_editor = pn.widgets.JSONEditor(
    value=dict(INSTANCE),
    width=400,
)

app = pn.Row(
    pn.Card(form_editor, title="Panelini JsonEditor (Form)"),
    pn.Card(tree_editor, title="Panel JSONEditor (Tree)"),
)

if pn.state.served:
    app.servable()

if __name__ == "__main__":
    pn.serve(app)
