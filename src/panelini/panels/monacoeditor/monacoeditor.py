"""Entrypoint of monacoeditor panel."""

import json
from pathlib import Path
from typing import Any, ClassVar

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "js" / "dist"


class MonacoEditor(AnyWidgetComponent):
    """A code and JSON editor using
    https://github.com/microsoft/monaco-editor"""

    _esm = (bundled_assets_dir / "monacoeditor.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        (bundled_assets_dir / "monacoeditor.css").read_text(encoding="utf-8"),
    ]

    value = param.String(default="", doc="Editor text, synced from the browser.")
    language = param.String(default="json", doc="Monaco language id.")
    json_schema = param.Dict(
        default=None,
        allow_None=True,
        doc="JSON schema validated against the buffer. None disables validation.",
    )
    theme = param.Selector(default="vs", objects=["vs", "vs-dark", "hc-black", "hc-light"])
    read_only = param.Boolean(default=False)
    options = param.Dict(default={}, doc="Extra monaco.editor.create options, merged last.")

    def __init__(self, **params: Any) -> None:
        # Monaco needs a concrete height to lay out.
        params.setdefault("height", 400)
        super().__init__(**params)

    def get_json(self) -> Any:
        """Parse the editor text as JSON.

        Raises:
            json.JSONDecodeError: If the buffer is not valid JSON.
        """
        return json.loads(self.value)

    def set_json(self, value: Any, indent: int = 2) -> None:
        """Serialize a Python object into the editor.

        Args:
            value: Any JSON-serializable object.
            indent: Indentation passed to json.dumps.
        """
        self.value = json.dumps(value, indent=indent)
