"""Example: panelini JsonEditor (form) and pn.widgets.JSONEditor (tree) side by side."""

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

if pn.state.served:
    app.servable()

if __name__ == "__main__":
    pn.serve(app)
