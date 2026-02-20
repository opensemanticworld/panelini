# JsonEditor

The `JsonEditor` panel provides a JSON Schema-based form editor, wrapping the [json-editor](https://github.com/json-editor/json-editor) JavaScript library.

## Overview

JsonEditor renders interactive forms from JSON Schema definitions. It supports dynamic schema updates, custom themes, and bi-directional value synchronization with Python.

## Usage

```python
from panelini.panels.jsoneditor import JsonEditor

schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "title": "Name"},
        "age": {"type": "integer", "title": "Age", "minimum": 0},
        "email": {"type": "string", "format": "email", "title": "Email"},
    },
    "required": ["name", "email"],
}

editor = JsonEditor(
    options={
        "schema": schema,
        "theme": "bootstrap5",
        "iconlib": "spectre",
    }
)

# Get the current form value
data = editor.get_value()

# Set form data programmatically
editor.set_value({"name": "Alice", "age": 30, "email": "alice@example.com"})
```

## Dynamic Schema Updates

Schemas can be changed at runtime:

```python
new_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string", "format": "textarea"},
    },
}

# Replace schema, optionally keeping current values
editor.set_schema(new_schema, keep_value=False)

# Replace schema with initial values
editor.set_schema(new_schema, startval={"title": "Hello"})
```

## Configuration Options

The `options` parameter accepts any valid [json-editor configuration](https://github.com/json-editor/json-editor#options):

```python
editor = JsonEditor(
    options={
        "schema": schema,
        "theme": "bootstrap5",        # UI theme
        "iconlib": "spectre",          # Icon library
        "disable_collapse": True,      # Prevent section collapsing
        "disable_edit_json": True,     # Hide raw JSON edit button
        "disable_properties": True,    # Hide properties button
    }
)
```

## API Reference

See the full API documentation: {py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor`
