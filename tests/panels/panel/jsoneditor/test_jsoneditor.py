"""Test cases for the Panelini jsoneditor panel."""

from panelini.panels.jsoneditor import JsonEditor


def test_jsoneditor_creation():
    """Test that a JsonEditor panel can be created."""
    editor = JsonEditor()
    assert isinstance(editor, JsonEditor)


def test_jsoneditor_with_schema():
    """Test that JsonEditor can be initialized with a custom schema."""
    schema = {"required": ["name"], "properties": {"name": {"type": "string"}, "age": {"type": "integer"}}}
    editor = JsonEditor(options={"schema": schema})
    assert editor.options["schema"] == schema
