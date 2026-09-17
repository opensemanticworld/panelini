"""Minimal example demonstrating the MonacoEditor panel.

Two editors side by side. The left one holds a JSON Schema and is unvalidated,
the right one holds a data document validated against that schema. Editing the
schema updates what the data editor flags, live.
"""

import json

import panel as pn

from panelini.panels.monacoeditor import MonacoEditor

SCHEMA = {
    "type": "object",
    "required": ["name"],
    "properties": {
        "name": {"type": "string", "description": "Full name of the person."},
        "age": {"type": "integer", "minimum": 0, "description": "Age in whole years."},
    },
}

DATA = {"name": "Ada", "age": 36}


class App(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        self.schema_editor = MonacoEditor(value=json.dumps(SCHEMA, indent=2))
        self.data_editor = MonacoEditor(value=json.dumps(DATA, indent=2), json_schema=SCHEMA)

        self.schema_editor.param.watch(self.on_schema_change, "value")

        self.status = pn.pane.Markdown("")

        self._view = pn.Column(
            pn.Row(
                pn.Column("### JSON Schema", self.schema_editor),
                pn.Column("### Data", self.data_editor),
                sizing_mode="stretch_width",
            ),
            self.status,
        )

    def on_schema_change(self, event):
        try:
            self.data_editor.json_schema = json.loads(event.new)
        except json.JSONDecodeError as exc:
            self.status.object = f"Schema is not valid JSON: {exc}"
        else:
            self.status.object = "Schema applied."

    def __panel__(self):
        return self._view


# Module-level instances so tests can import and serve the app.
app = App()

if pn.state.served:
    pn.extension(sizing_mode="stretch_width")

    app.servable()

if __name__ == "__main__":
    pn.serve(app)
