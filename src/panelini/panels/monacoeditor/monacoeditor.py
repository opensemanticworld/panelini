"""Entrypoint of monacoeditor panel."""

import json
import os
from pathlib import Path
from typing import Any, ClassVar

import panel as pn
import param  # type: ignore[import-untyped]
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "js" / "dist"

#: The commit whose committed ``js/dist`` bundle the import map points at. Update when the
#: bundle is rebuilt (the pin must name a commit that already contains the new dist).
_BUNDLE_REF = "4ba35bbb050cae5aa7f3f0a29a17f85417a772fe"
_BUNDLE_CDN = (
    "https://cdn.jsdelivr.net/gh/opensemanticworld/panelini"
    f"@{_BUNDLE_REF}/src/panelini/panels/monacoeditor/js/dist/monacoeditor.mjs"
)
#: Override with a self-hosted URL, or "inline" to embed the module text in the document
#: (offline use). Inline costs dearly with many editors: ``_esm`` is a per-instance model
#: property, so a page with 24 editors ships the 6.6 MB bundle 24 times.
_BUNDLE_URL = os.environ.get("PANELINI_MONACO_BUNDLE", _BUNDLE_CDN)


class MonacoEditor(AnyWidgetComponent):
    """A code and JSON editor using
    https://github.com/microsoft/monaco-editor"""

    if _BUNDLE_URL == "inline":
        _esm = (bundled_assets_dir / "monacoeditor.mjs").read_text(encoding="utf-8")
    else:
        # A shim that re-exports the real module: the browser fetches and caches the bundle
        # once, and the document carries these two lines per editor instead of the bundle.
        _esm = 'export { render } from "monacoeditor-bundle";'
        _importmap: ClassVar = {"imports": {"monacoeditor-bundle": _BUNDLE_URL}}

    _stylesheets: ClassVar = [
        (bundled_assets_dir / "monacoeditor.css").read_text(encoding="utf-8"),
    ]

    value = param.String(default="", doc="Editor text, synced from the browser.")
    language = param.String(default="json", doc="Monaco language id.")
    json_schema = param.Dict(
        default=None,
        allow_None=True,
        doc=(
            "JSON schema validated against the buffer. None disables validation. Ignored by "
            "Monaco when the buffer itself declares `$schema`, which always wins; register "
            "the schema under that URI in `schema_store` for such documents."
        ),
    )
    schema_store = param.Dict(
        default=None,
        allow_None=True,
        doc=(
            "Schemas keyed by the URI a buffer's own `$schema` may name, resolved locally "
            "since Monaco never fetches. A buffer that declares `$schema` bypasses "
            "`json_schema` entirely, so without a store entry under that URI it gets no "
            "validation and no completion at all. Relative keys resolve against the "
            "in-memory folder the editor models live in, mirroring how the JSON service "
            "resolves a relative `$schema`. The store is page-wide; on a key registered by "
            "several editors the last one wins."
        ),
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
    enable_schema_request = param.Boolean(
        default=False,
        doc=(
            "Let Monaco fetch schemas over the network: a buffer's `$schema` pointer and any "
            "remote `$ref` inside a schema resolve live (CORS permitting) instead of only "
            "against `schema_store`. Page-wide, like the other jsonDefaults settings: one "
            "editor enabling it enables it for all."
        ),
    )
    theme = param.Selector(default="vs", objects=["vs", "vs-dark", "hc-black", "hc-light"])
    read_only = param.Boolean(default=False)
    ready = param.Boolean(
        default=False,
        doc=(
            "Set from the browser once the editor exists. Monaco boots noticeably later than "
            "the page (the bundle is large), so a host that wants a loading indicator needs "
            "this signal rather than the page's own load event. Same convention as "
            "JsonEditor.ready."
        ),
    )
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
