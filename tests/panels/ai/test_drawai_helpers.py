"""Unit tests for DrawAI example helpers, state, and tool."""

from __future__ import annotations

from pathlib import Path

import pytest

pytest.importorskip("anthropic")
pytest.importorskip("PIL")

from examples.panels.ai.drawai_beautify import extract_xml_from_drawio_png

FIXTURES = Path(__file__).parent / "fixtures" / "drawai"


def test_extract_xml_from_valid_drawio_png_returns_mxfile_xml():
    data = (FIXTURES / "diagram.drawio.png").read_bytes()
    xml = extract_xml_from_drawio_png(data)
    assert xml.lstrip().startswith("<mxfile")
    assert "Hello" in xml


def test_extract_xml_from_plain_png_raises():
    data = (FIXTURES / "corrupt.drawio.png").read_bytes()
    with pytest.raises(ValueError, match="mxfile"):
        extract_xml_from_drawio_png(data)


from examples.panels.ai.drawai_beautify import embed_xml_into_drawio_png  # noqa: E402


def test_embed_then_extract_roundtrip():
    original = (FIXTURES / "diagram.drawio.png").read_bytes()
    new_xml = "<mxfile><diagram id='new'>modified</diagram></mxfile>"
    out_bytes = embed_xml_into_drawio_png(original, new_xml)
    assert extract_xml_from_drawio_png(out_bytes) == new_xml


def test_embed_produces_valid_png():
    original = (FIXTURES / "diagram.drawio.png").read_bytes()
    out_bytes = embed_xml_into_drawio_png(original, "<mxfile/>")
    assert out_bytes[:8] == b"\x89PNG\r\n\x1a\n"


import xml.etree.ElementTree as ET  # noqa: E402

from examples.panels.ai.drawai_beautify import validate_drawio_xml  # noqa: E402


def test_validate_drawio_xml_passes_valid():
    validate_drawio_xml("<mxfile><diagram/></mxfile>")  # no exception


def test_validate_drawio_xml_raises_on_malformed():
    malformed = (FIXTURES / "malformed.drawio").read_text()
    with pytest.raises(ET.ParseError):
        validate_drawio_xml(malformed)


from examples.panels.ai.drawai_beautify import make_viewer_html  # noqa: E402


def test_make_viewer_html_returns_iframe_with_encoded_xml():
    html = make_viewer_html("<mxfile/>")
    assert "<iframe" in html
    assert "viewer.diagrams.net" in html
    # URL-encoded "<mxfile/>"
    assert "%3Cmxfile%2F%3E" in html


def test_make_viewer_html_empty_xml_returns_empty_iframe_src():
    html = make_viewer_html("")
    assert "<iframe" in html
    assert "#R" in html  # fragment present but empty


from examples.panels.ai.drawai_beautify import DrawAiState  # noqa: E402


def test_drawai_state_defaults():
    state = DrawAiState()
    assert state.current_bytes == b""
    assert state.current_xml == ""
    assert state.current_format is None
    assert state.current_filename == ""
    assert state.beautified_xml == ""


def test_drawai_state_beautified_xml_triggers_watcher():
    state = DrawAiState()
    seen = []
    state.param.watch(lambda e: seen.append(e.new), "beautified_xml")
    state.beautified_xml = "<mxfile/>"
    assert seen == ["<mxfile/>"]


def test_drawai_state_format_selector_rejects_invalid():
    state = DrawAiState()
    with pytest.raises(ValueError):
        state.current_format = "bmp"
