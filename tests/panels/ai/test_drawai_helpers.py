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
