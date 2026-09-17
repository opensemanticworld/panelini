# MonacoEditor

```{image} /_static/media/monacoeditor/monacoeditor_panel_min_feature.png
:alt: monaco editor validating a data document against a json schema
:class: docs-media
```

The `MonacoEditor` panel provides a code and JSON editor, wrapping the [monaco-editor](https://github.com/microsoft/monaco-editor) library that powers VS Code.

## Overview

MonacoEditor edits text in the browser and syncs it back to Python through the `value` parameter. For JSON documents it adds live schema validation, hover descriptions, and completion, all resolved locally: Monaco never fetches a schema over the network unless you opt in.

## Usage

Construct an editor with `value` (the initial text) and, for JSON documents, `json_schema` to validate against; `language` defaults to `json`. Read and write the buffer as text through the `value` parameter, or as a Python object with `get_json()` and `set_json()`. The {doc}`side-by-side example <../examples/monacoeditor/monacoeditor_panel_min>` is a runnable app built from these parameters.

## Schema validation

Pass `json_schema` to validate the buffer live. Violations surface as Monaco markers (warnings for schema breaches, errors for invalid JSON) with the schema's own `description` text in the hover. Assigning a new dict to `json_schema` re-validates immediately, so a schema editor can drive what a data editor flags.

## Buffer-declared `$schema`

A document that declares its own `$schema` bypasses `json_schema` entirely. Because Monaco resolves nothing over the network, that pointer is normally reported as unresolvable. Three parameters control what happens:

- `schema_store` - schemas keyed by the URI a buffer's `$schema` may name, resolved locally. Register a schema here to validate a document that points at it.
- `schema_request` - severity for the unresolvable-pointer complaint: `"warning"` (default), `"error"`, or `"ignore"`. Use `"ignore"` to show a document exactly as authored.
- `enable_schema_request` - let Monaco fetch schemas over the network instead (CORS permitting).

These settings are page-wide. For `schema_request` and `enable_schema_request` Monaco keeps a single value per page, so the most permissive setting among the editors wins; `schema_store` is shared per page too, but keyed, so the last editor to register a given URI wins.

## Bundle delivery

Monaco is a large bundle. By default each editor ships a tiny shim and the browser fetches the shared bundle once from a CDN. Set the `PANELINI_MONACO_BUNDLE` environment variable to override this:

- a self-hosted URL to the `monacoeditor.mjs` module, or
- `"inline"` to embed the module text in the document for fully offline use.

Inlining costs one full copy of the bundle per editor instance, so it suits offline or single-editor pages rather than a page carrying many editors.

## See also

- {doc}`../examples/monacoeditor/monacoeditor_panel_min` - a schema and its data side by side, with live validation
- {doc}`../examples/monacoeditor/monacoeditor_oold_min` - validate a document against an OO-LD schema pulled from a registry

## API Reference

See the full API documentation: {py:class}`panelini.panels.monacoeditor.monacoeditor.MonacoEditor`
