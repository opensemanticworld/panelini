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


def test_monacoeditor_height_stretching_mode_is_not_pinned():
    """The 400px default must step aside, or Panel demotes it to an arbitrary floor.

    Panel converts a fixed height under a height-responsive sizing_mode into min_height
    and warns while doing so, so leaving the default in place would stretch the editor
    but never let it shrink below 400px.
    """
    editor = MonacoEditor(sizing_mode="stretch_both")
    assert editor.height is None
    assert editor.min_height is None
    assert editor.sizing_mode == "stretch_both"
    # An explicit height is still honoured, in the min_height form Panel converts it to.
    assert MonacoEditor(sizing_mode="stretch_both", height=300).min_height == 300
    # A width-only stretch has no height to inherit, so it keeps the default.
    assert MonacoEditor(sizing_mode="stretch_width").height == 400


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


def test_monacoeditor_reports_unresolvable_schema_pointers_by_default():
    """A buffer declaring `$schema` is flagged unless the app opts out of the complaint."""
    assert MonacoEditor().schema_request == "warning"
    assert MonacoEditor(schema_request="ignore").schema_request == "ignore"


def test_monacoeditor_retains_schema():
    """Test that MonacoEditor keeps a schema handed to it."""
    schema = {"type": "object", "required": ["name"], "properties": {"name": {"type": "string"}}}
    editor = MonacoEditor(json_schema=schema)
    assert editor.json_schema == schema
