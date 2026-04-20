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


def test_extract_xml_from_urlencoded_chunk_returns_decoded_xml():
    """drawio's other export mode writes the mxfile chunk URL-encoded
    (starts with ``%3C``). The extractor must detect and decode it."""
    data = (FIXTURES / "diagram_urlencoded.drawio.png").read_bytes()
    xml = extract_xml_from_drawio_png(data)
    assert xml.lstrip().startswith("<mxfile")
    assert "%3C" not in xml
    assert "Hello" in xml


from examples.panels.ai.drawai_beautify import (  # noqa: E402
    embed_xml_into_drawio_png,
    rewrap_drawio_xml,
    unwrap_drawio_xml,
)


def _make_compressed_mxfile(model_xml: str) -> str:
    """Build a drawio `<mxfile>` whose `<diagram>` carries `model_xml`
    encoded the same way drawio itself writes (base64 + raw deflate +
    URL-encoded). Uses the example's own helpers via a round-trip."""
    # Wrap minimal XML, then rewrap to compress the inner model.
    skeleton = '<mxfile host="test"><diagram id="d" name="n"><placeholder/></diagram></mxfile>'
    return rewrap_drawio_xml(model_xml, skeleton)


def test_unwrap_passes_through_plain_mxgraphmodel():
    plain = "<mxGraphModel><root/></mxGraphModel>"
    editable, wrapper = unwrap_drawio_xml(plain)
    assert editable == plain
    assert wrapper is None


def test_unwrap_passes_through_uncompressed_mxfile():
    uncompressed = '<mxfile><diagram id="d" name="n"><mxGraphModel><root/></mxGraphModel></diagram></mxfile>'
    editable, wrapper = unwrap_drawio_xml(uncompressed)
    assert editable == uncompressed
    assert wrapper is None


def test_unwrap_and_rewrap_compressed_roundtrip():
    model_xml = "<mxGraphModel><root><mxCell id='2' value='Hello'/></root></mxGraphModel>"
    wrapped = _make_compressed_mxfile(model_xml)

    editable, wrapper = unwrap_drawio_xml(wrapped)
    assert editable == model_xml  # LLM sees the plain mxGraphModel
    assert wrapper == wrapped

    beautified = "<mxGraphModel><root><mxCell id='2' value='World'/></root></mxGraphModel>"
    rewrapped = rewrap_drawio_xml(beautified, wrapper)
    editable2, _ = unwrap_drawio_xml(rewrapped)
    assert editable2 == beautified  # beautified content survives the roundtrip


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


def test_make_viewer_html_wraps_bare_mxgraphmodel_in_mxfile():
    """Drawio viewer needs an ``<mxfile>`` root; wrap bare ``<mxGraphModel>``
    so it renders instead of showing 'error loading file'."""
    html = make_viewer_html("<mxGraphModel><root/></mxGraphModel>")
    # URL-encoded "<mxfile>" wrapping should appear in the iframe src
    assert "%3Cmxfile%3E" in html
    assert "%3Cmxfile%3E%3Cdiagram" in html


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


from unittest.mock import AsyncMock, MagicMock  # noqa: E402

from examples.panels.ai.drawai_beautify import BeautifyDrawioTool  # noqa: E402


def _make_mock_anthropic_client(text: str) -> MagicMock:
    """Build a mock ``anthropic.AsyncAnthropic`` instance whose
    ``messages.create`` returns one text block with the given content.
    """
    block = MagicMock()
    block.text = text
    response = MagicMock()
    response.content = [block]
    client = MagicMock()
    client.messages = MagicMock()
    client.messages.create = AsyncMock(return_value=response)
    return client


@pytest.mark.asyncio
async def test_beautify_drawio_tool_updates_state_on_success(monkeypatch):
    state = DrawAiState(current_xml="<mxfile><diagram/></mxfile>")
    canned = "<mxfile><diagram id='new'/></mxfile>"
    mock_client = _make_mock_anthropic_client(canned)
    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        lambda **kwargs: mock_client,
    )

    tool = BeautifyDrawioTool(state=state, api_key="test-key", base_url="https://localhost")
    result = await tool._arun(intent="tighter spacing")

    assert "Beautified" in result
    assert state.beautified_xml == canned
    mock_client.messages.create.assert_awaited_once()


@pytest.mark.asyncio
async def test_beautify_drawio_tool_no_file_loaded(monkeypatch):
    state = DrawAiState()  # current_xml is ""
    # anthropic client should never be called
    mock_client = _make_mock_anthropic_client("<mxfile/>")
    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        lambda **kwargs: mock_client,
    )

    tool = BeautifyDrawioTool(state=state, api_key="test-key")
    result = await tool._arun(intent="whatever")

    assert "No file loaded" in result
    assert state.beautified_xml == ""
    mock_client.messages.create.assert_not_awaited()


@pytest.mark.asyncio
async def test_beautify_drawio_tool_invalid_xml_response(monkeypatch):
    state = DrawAiState(current_xml="<mxfile/>")
    mock_client = _make_mock_anthropic_client("not valid xml at all")
    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        lambda **kwargs: mock_client,
    )

    tool = BeautifyDrawioTool(state=state, api_key="test-key")
    result = await tool._arun(intent="fix it")

    assert "did not parse as XML" in result
    assert state.beautified_xml == ""  # unchanged


@pytest.mark.asyncio
async def test_beautify_drawio_tool_anthropic_error(monkeypatch):
    state = DrawAiState(current_xml="<mxfile/>")

    failing_client = MagicMock()
    failing_client.messages = MagicMock()
    failing_client.messages.create = AsyncMock(side_effect=RuntimeError("rate limit exceeded"))
    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        lambda **kwargs: failing_client,
    )

    tool = BeautifyDrawioTool(state=state, api_key="test-key")
    result = await tool._arun(intent="fix it")

    assert "Anthropic API error" in result
    assert "rate limit exceeded" in result
    assert state.beautified_xml == ""


@pytest.mark.asyncio
async def test_beautify_drawio_tool_strips_code_fences(monkeypatch):
    state = DrawAiState(current_xml="<mxfile/>")
    canned = "```xml\n<mxfile><diagram id='x'/></mxfile>\n```"
    mock_client = _make_mock_anthropic_client(canned)
    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        lambda **kwargs: mock_client,
    )

    tool = BeautifyDrawioTool(state=state, api_key="test-key")
    await tool._arun(intent="whatever")

    assert state.beautified_xml == "<mxfile><diagram id='x'/></mxfile>"


@pytest.mark.asyncio
async def test_beautify_drawio_tool_passes_credentials(monkeypatch):
    """Tool forwards api_key and base_url from config into AsyncAnthropic."""
    state = DrawAiState(current_xml="<mxfile/>")
    mock_client = _make_mock_anthropic_client("<mxfile><diagram id='x'/></mxfile>")

    captured_kwargs: dict = {}

    def _capture(**kwargs):
        captured_kwargs.update(kwargs)
        return mock_client

    monkeypatch.setattr(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        _capture,
    )

    tool = BeautifyDrawioTool(
        state=state,
        api_key="my-key",
        base_url="https://proxy.example.com",
    )
    await tool._arun(intent="whatever")

    assert captured_kwargs == {"api_key": "my-key", "base_url": "https://proxy.example.com"}
