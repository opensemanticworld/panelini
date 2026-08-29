"""Entrypoint of jsoneditor panel."""

import json
from pathlib import Path
from typing import ClassVar, cast

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"

_COMPACT_CSS = """\
/* === Full-width layout === */
.bootstrap-wrapper {
    width: 100%;
    box-sizing: border-box;
}

/* === Compact / Dense mode === */
.bootstrap-wrapper.je-compact {
    font-size: 13px;
    line-height: 1.35;
    overflow-y: auto;
    overflow-x: hidden;
}

/* Inline label + input on one row, fixed proportions */
.bootstrap-wrapper.je-compact .form-group {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    gap: 0 3px;
    margin-bottom: 3px;
    padding-right: 0;
}
.bootstrap-wrapper.je-compact .form-label,
.bootstrap-wrapper.je-compact .form-group > label {
    flex: 0 0 28%;
    max-width: 28%;
    margin-bottom: 0;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bootstrap-wrapper.je-compact .form-control,
.bootstrap-wrapper.je-compact .form-select {
    flex: 0 0 68%;
    width: 68%;
    max-width: 68%;
    margin-left: auto;
    padding: 1px 4px;
    font-size: 13px;
    min-height: unset;
    height: 24px;
    text-align: left;
    box-sizing: border-box;
}

/* Description: hidden by default, tooltip on hover */
.bootstrap-wrapper.je-compact .form-text {
    display: none !important;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 100;
    max-width: 300px;
    padding: 4px 8px;
    font-size: 11px;
    line-height: 1.3;
    color: #333;
    background: #fefefe;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,.15);
    pointer-events: none;
    white-space: normal;
}
.bootstrap-wrapper.je-compact .form-group:hover > .form-text,
.bootstrap-wrapper.je-compact .form-group:focus-within > .form-text {
    display: block !important;
}

/* Tighter rows */
.bootstrap-wrapper.je-compact .row > div:not([style*="display: none;"]) {
    margin-bottom: 2px;
}

/* Labels outside .form-group (fallback) */
.bootstrap-wrapper.je-compact label:not(.form-label):not(.form-check-label) {
    margin-bottom: 0;
    font-size: 12px;
}

/* Cards: subtle separator, minimal padding */
.bootstrap-wrapper.je-compact .card {
    border: none;
    border-top: 1px solid #e0e0e0;
    border-radius: 0;
    margin-bottom: 0;
}
.bootstrap-wrapper.je-compact .card-body {
    padding: 1px 4px;
}
.bootstrap-wrapper.je-compact .card-header {
    padding: 1px 4px;
    background: transparent;
}
.bootstrap-wrapper.je-compact .card-title {
    margin-bottom: 1px;
    font-size: 13px;
    font-weight: 600;
}

/* Indented panels */
.bootstrap-wrapper.je-compact .je-indented-panel {
    padding: 1px 4px;
    margin: 0 4px;
}

/* Child editor holders */
.bootstrap-wrapper.je-compact .je-child-editor-holder {
    margin-bottom: 1px;
}

/* Array item rows: same spacing as form-groups */
.bootstrap-wrapper.je-compact .card.card-body {
    padding: 1px 4px;
    margin-top: 2px !important;
    margin-bottom: 2px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-top: 4px;
}

/* Root title: larger and bold */
.bootstrap-wrapper.je-compact .level-0 {
    font-size: 16px !important;
    font-weight: 700 !important;
    margin-bottom: 4px;
}

/* Nested section headers */
.bootstrap-wrapper.je-compact h2,
.bootstrap-wrapper.je-compact h3,
.bootstrap-wrapper.je-compact .h2,
.bootstrap-wrapper.je-compact .h3 {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 3px;
}
.bootstrap-wrapper.je-compact h4,
.bootstrap-wrapper.je-compact .h4 {
    font-size: 13px;
    margin-bottom: 2px;
}

/* Buttons */
.bootstrap-wrapper.je-compact .btn {
    padding: 1px 6px;
    font-size: 12px;
    line-height: 1.5;
}
.bootstrap-wrapper.je-compact .btn-group {
    margin-left: 4px !important;
    margin-bottom: 0 !important;
}

/* Array item containers with action buttons: reserve space on the right */
.bootstrap-wrapper.je-compact .card:has(> .btn-group),
.bootstrap-wrapper.je-compact .card.card-body:has(> .btn-group),
.bootstrap-wrapper.je-compact .je-indented-panel:has(> .btn-group) {
    position: relative;
    padding-right: 62px;
}
.bootstrap-wrapper.je-compact .card > .btn-group,
.bootstrap-wrapper.je-compact .card.card-body > .btn-group,
.bootstrap-wrapper.je-compact .je-indented-panel > .btn-group {
    position: absolute;
    right: 0;
    top: 2px;
    display: flex;
    gap: 0;
    margin: 0 !important;
}

/* Array item buttons: compact squares, icon only */
.bootstrap-wrapper.je-compact .json-editor-btntype-delete,
.bootstrap-wrapper.je-compact .json-editor-btntype-move,
.bootstrap-wrapper.je-compact .json-editor-btntype-copy {
    width: 20px;
    height: 20px;
    padding: 0;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    overflow: hidden;
}
.bootstrap-wrapper.je-compact .json-editor-btntype-delete > span,
.bootstrap-wrapper.je-compact .json-editor-btntype-move > span,
.bootstrap-wrapper.je-compact .json-editor-btntype-copy > span {
    display: none;
}

/* Array global controls: hide delete-last (redundant with per-item bin) */
.bootstrap-wrapper.je-compact .json-editor-btntype-deletelast {
    display: none !important;
}

/* Tables */
.bootstrap-wrapper.je-compact .je-table {
    margin-bottom: 2px;
}
.bootstrap-wrapper.je-compact table td,
.bootstrap-wrapper.je-compact table th {
    padding: 2px 6px;
}

/* Collapse toggle */
.bootstrap-wrapper.je-compact .json-editor-btn-collapse {
    margin-bottom: 0;
    padding: 0 4px;
}

/* Header button holder (select properties, etc.) */
.bootstrap-wrapper.je-compact .je-header-button-holder {
    margin-left: 4px;
    font-size: 11px;
}

/* Font sizes inside .je-ready */
.bootstrap-wrapper.je-compact .je-ready .h2,
.bootstrap-wrapper.je-compact .je-ready .h3,
.bootstrap-wrapper.je-compact .je-ready .form-label,
.bootstrap-wrapper.je-compact .je-ready thead {
    font-size: 12px;
}
"""


class JsonEditor(AnyWidgetComponent):
    """A JSON-SCHEMA based form editor using
    https://github.com/json-editor/json-editor"""

    _esm = (bundled_assets_dir / "jsoneditor_vue.mjs").read_text(encoding="utf-8")

    _stylesheets: ClassVar = [
        # includes bootstrap and spectre
        (bundled_assets_dir / "jsoneditor_vue.css").read_text(encoding="utf-8"),
        _COMPACT_CSS,
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
    compact = param.Boolean(default=False, doc="Use compact/dense visual style.")

    encoder = param.ClassSelector(
        class_=json.JSONEncoder,
        is_instance=False,
        doc="""
    Custom JSONEncoder class used to serialize objects to JSON string.""",
    )

    def __init__(self, **params: dict) -> None:
        super().__init__(**params)
        if self.compact:
            self._inject_compact_flag()

    def _inject_compact_flag(self) -> None:
        """Ensure the options dict carries the compact flag for the JS side."""
        if self.compact and not self.options.get("compact"):
            self.options = {**self.options, "compact": True}
        elif not self.compact and self.options.get("compact"):
            opts = {**self.options}
            opts.pop("compact", None)
            self.options = opts

    @param.depends("compact", watch=True)
    def _on_compact_changed(self) -> None:
        self._inject_compact_flag()

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
        if self.compact:
            new_options["compact"] = True
        if startval is not None:
            new_options["startval"] = startval
        elif keep_value:
            new_options["startval"] = self.get_value()
        else:
            new_options["startval"] = None
        self.options = new_options
        # Sync Python-side value so it's readable without a JS runtime
        if startval is not None:
            self.value = startval
