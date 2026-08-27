"""Test cases for the Panelini monacoeditor panel."""

import json

from panelini.panels.monacoeditor import MonacoEditor


def test_monacoeditor_creation():
    """Test that a MonacoEditor panel can be created."""
    editor = MonacoEditor()
    assert isinstance(editor, MonacoEditor)


def test_monacoeditor_default_sizing():
    """Monaco sizes to its container, so the default must not collapse to zero width."""
    editor = MonacoEditor()
    assert editor.height == 400
    assert editor.sizing_mode == "stretch_width"


def test_monacoeditor_explicit_width_wins():
    """An explicit width must not be overridden by the stretch_width default."""
    editor = MonacoEditor(width=600)
    assert editor.width == 600
    assert editor.sizing_mode != "stretch_width"


def test_monacoeditor_json_round_trip():
    """Test that set_json and get_json round trip through the text buffer."""
    editor = MonacoEditor()
    payload = {"name": "Ada", "age": 36}
    editor.set_json(payload)
    assert json.loads(editor.value) == payload
    assert editor.get_json() == payload


def test_monacoeditor_retains_schema():
    """Test that MonacoEditor keeps a schema handed to it."""
    schema = {"type": "object", "required": ["name"], "properties": {"name": {"type": "string"}}}
    editor = MonacoEditor(json_schema=schema)
    assert editor.json_schema == schema
