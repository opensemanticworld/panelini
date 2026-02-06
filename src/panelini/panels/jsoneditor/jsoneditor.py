"""Entrypoint of jsoneditor panel."""

import json
from pathlib import Path
from typing import ClassVar, cast

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class JsonEditor(AnyWidgetComponent):
    """A JSON-SCHEMA based form editor using
    https://github.com/json-editor/json-editor"""

    _esm = (bundled_assets_dir / "jsoneditor_vue.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        # includes bootstrap and spectre
        (bundled_assets_dir / "jsoneditor_vue.css").read_text(encoding="utf-8"),
    ]

    value = param.Dict()
    options = param.Dict(
        default={
            # "theme": "bootstrap4",
            # "iconlib": 'fontawesome5',
            # "iconlib": "spectre",
            "schema": {
                "required": ["testxy"],
                "properties": {"testxy": {"type": "string"}},
            },
        }
    )
    ready = param.Boolean(default=False, doc="Indicates if the JSONEditor is ready.")

    encoder = param.ClassSelector(
        class_=json.JSONEncoder,
        is_instance=False,
        doc="""
    Custom JSONEncoder class used to serialize objects to JSON string.""",
    )

    def get_value(self) -> dict:
        json_str = json.dumps(self.value, cls=self.encoder)
        return cast(dict, json.loads(json_str))

    def set_value(self, value: dict) -> None:
        """Set the value of the JSON editor."""
        self.value = value

    def set_schema(self, schema: dict, startval: dict | None = None, keep_value: bool = False) -> None:
        """Set the schema of the JSON editor.

        Args:
            schema: The new JSON schema.
            startval: Initial value to set with the new schema. If provided, this
                      takes precedence over keep_value.
            keep_value: If True and startval is None, keep the current value.
                        Defaults to False.
        """
        # override options param to trigger change event
        new_options = {**self.options, "schema": schema}
        if startval is not None:
            new_options["startval"] = startval
        elif keep_value:
            new_options["startval"] = self.get_value()
        else:
            new_options["startval"] = None
        self.options = new_options
