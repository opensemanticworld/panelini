"""Minimal example validating data against an OO-LD schema in the MonacoEditor panel.

Fetches the QuantityValue schema from the OO-LD registry
(https://schemas.oo-ld.org/dev/modules/quantities/quantityvalue/) and validates a
measurement document against it. The left editor holds the schema, the right one the
data; editing the schema updates what the data editor flags, live.

Cross-origin: the fetch happens here, in Python, at import time. The browser issues no
request at all, so once the app is running nothing depends on oo-ld.org being reachable
or CORS-open. The flip side is that the schema's own `$schema` pointer cannot be
followed either, so the left editor is displayed with `schema_request="ignore"`.

OO-LD schemas are JSON Schema plus a JSON-LD `@context` and `x-oold-*` annotations.
Monaco ignores those extra keywords when validating data, so `value`, `unit` and
`standard_uncertainty` behave as ordinary JSON Schema properties.
"""

import json
from urllib.request import urlopen

import panel as pn

from panelini.panels.monacoeditor import MonacoEditor

# Resolves via w3id.org to schemas.oo-ld.org.
SCHEMA_URL = "https://w3id.org/oo-ld/schemas/quantities/dev/QuantityValue.schema.json"

with urlopen(SCHEMA_URL) as response:  # noqa: S310
    SCHEMA = json.load(response)

# The schema ships its own example instance; use it as the starting document.
DATA = SCHEMA["examples"][0]


class App(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        # The schema is shown exactly as the registry serves it, `$schema` included: that
        # line is what marks it as OO-LD. Monaco resolves nothing over the network, so it
        # would otherwise flag that pointer as unresolvable. The left editor is a viewer,
        # not a validated document, so silence the complaint rather than edit the schema.
        self.schema_editor = MonacoEditor(
            value=json.dumps(SCHEMA, indent=2), schema_request="ignore", sizing_mode="stretch_both"
        )
        self.data_editor = MonacoEditor(
            value=json.dumps(DATA, indent=2), json_schema=SCHEMA, sizing_mode="stretch_both"
        )

        self.schema_editor.param.watch(self.on_schema_change, "value")

        self.status = pn.pane.Markdown(f"Schema fetched from `{SCHEMA_URL}`")

        # stretch_both only reaches the editors if every container above them stretches
        # too, so the whole chain says so. The status line keeps its natural height and
        # the row takes the rest.
        self._view = pn.Column(
            pn.Row(
                pn.Column(f"### OO-LD Schema: {SCHEMA['title']}", self.schema_editor, sizing_mode="stretch_both"),
                pn.Column("### QuantityValue instance", self.data_editor, sizing_mode="stretch_both"),
                sizing_mode="stretch_both",
            ),
            self.status,
            sizing_mode="stretch_both",
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
    pn.extension(sizing_mode="stretch_both")

    app.servable()

if __name__ == "__main__":
    pn.serve(app)
