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


def test_jsoneditor_compact_default_false():
    """Compact mode should be off by default."""
    editor = JsonEditor()
    assert editor.compact is False
    assert "compact" not in editor.options


def test_jsoneditor_compact_flag_in_options():
    """When compact=True, the options dict should carry compact=True for JS."""
    editor = JsonEditor(compact=True)
    assert editor.compact is True
    assert editor.options.get("compact") is True


def test_jsoneditor_compact_toggle():
    """Toggling compact should update the options dict."""
    editor = JsonEditor()
    assert "compact" not in editor.options
    editor.compact = True
    assert editor.options.get("compact") is True
    editor.compact = False
    assert "compact" not in editor.options


def test_jsoneditor_compact_preserved_on_set_schema():
    """set_schema should preserve the compact flag in options."""
    editor = JsonEditor(compact=True)
    new_schema = {"properties": {"x": {"type": "string"}}}
    editor.set_schema(new_schema)
    assert editor.options.get("compact") is True
    assert editor.options["schema"] == new_schema
