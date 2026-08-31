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
    schema_request = param.Selector(
        default="warning",
        objects=["error", "warning", "ignore"],
        doc=(
            "Severity for complaints about resolving a buffer's own `$schema` pointer. "
            "Monaco never fetches it, so a document that declares `$schema` is reported "
            "as unresolvable; use 'ignore' to show such a document as authored. Does not "
            "affect validation against `json_schema`. Monaco exposes this page-wide only, "
            "so the most permissive setting among the editors on the page wins."
        ),
    )
    theme = param.Selector(default="vs", objects=["vs", "vs-dark", "hc-black", "hc-light"])
    read_only = param.Boolean(default=False)
    options = param.Dict(default={}, doc="Extra monaco.editor.create options, merged last.")

    # Sizing modes that already hand Monaco a height to fill. Pinning a height on top of
    # these makes Panel warn and demote it to min_height, leaving an arbitrary 400px floor
    # under an editor that was asked to be fully responsive.
    _STRETCHES_HEIGHT: ClassVar = frozenset({"stretch_height", "stretch_both", "scale_height", "scale_both"})

    def __init__(self, **params: Any) -> None:
        # Monaco sizes itself to its container. Without a concrete height and a
        # width the host collapses to a few pixels and no editor is usable.
        if params.get("sizing_mode") not in self._STRETCHES_HEIGHT:
            params.setdefault("height", 400)
        if "width" not in params and "sizing_mode" not in params:
            params["sizing_mode"] = "stretch_width"
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
