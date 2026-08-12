"""DrawAI - AI-assisted drawio beautifier example.

Upload a .drawio or .drawio.png, chat a beautification intent,
see a before/after compare rendered via the drawio web viewer,
and download the beautified result. Uses Claude Opus 4.7
through the anthropic SDK with prompt caching on the XML.

Prerequisites:
    pip install panelini[ai,ai-drawio]
    export ANTHROPIC_API_KEY=...

Run:
    python examples/panels/ai/drawai_beautify.py
"""

from __future__ import annotations

import base64
import urllib.parse
import xml.etree.ElementTree as ET
import zlib
from io import BytesIO

from PIL import Image, PngImagePlugin


def extract_xml_from_drawio_png(data: bytes) -> str:
    """Return the XML stored in a drawio PNG's ``mxfile`` tEXt chunk.

    drawio writes the chunk in one of two forms depending on the export
    options used: raw XML (starts with ``<mxfile``) or URL-encoded XML
    (starts with ``%3C``). Both are returned as raw XML here.

    Raises:
        ValueError: if the PNG has no ``mxfile`` chunk.
    """
    with Image.open(BytesIO(data)) as img:
        img.load()
        text = getattr(img, "text", {}) or {}
        if "mxfile" not in text:
            msg = "No 'mxfile' tEXt chunk found - not a drawio PNG."
            raise ValueError(msg) from None
        raw = text["mxfile"]
        if not raw.lstrip().startswith("<"):
            raw = urllib.parse.unquote(raw)
        return raw


def embed_xml_into_drawio_png(original: bytes, new_xml: str) -> bytes:
    """Return a new PNG identical to ``original`` except the ``mxfile``
    tEXt chunk is replaced with ``new_xml``.
    """
    with Image.open(BytesIO(original)) as img:
        img.load()
        meta = PngImagePlugin.PngInfo()
        meta.add_text("mxfile", new_xml)
        out = BytesIO()
        img.save(out, "PNG", pnginfo=meta)
        return out.getvalue()


def validate_drawio_xml(xml: str) -> None:
    """Raise ``xml.etree.ElementTree.ParseError`` if ``xml`` is not parseable."""
    ET.fromstring(xml)  # noqa: S314


def _decompress_drawio_inner(diagram_text: str) -> str:
    """Reverse drawio's <diagram> payload encoding: base64 → raw deflate → URL-decode."""
    raw = base64.b64decode(diagram_text)
    inflated = zlib.decompress(raw, -15).decode("utf-8")
    return urllib.parse.unquote(inflated)


def _compress_drawio_inner(model_xml: str) -> str:
    """Forward drawio's <diagram> payload encoding: URL-encode → raw deflate → base64."""
    url_encoded = urllib.parse.quote(model_xml, safe="").encode("ascii")
    compressor = zlib.compressobj(level=9, wbits=-15)
    compressed = compressor.compress(url_encoded) + compressor.flush()
    return base64.b64encode(compressed).decode("ascii")


def unwrap_drawio_xml(xml: str) -> tuple[str, str | None]:
    """Return (editable_xml, wrapper_template).

    drawio exports come in three flavors:
      1. ``<mxGraphModel>…</mxGraphModel>`` - already editable, returned as-is
         with ``wrapper_template=None``.
      2. ``<mxfile>…<diagram>…<mxGraphModel>…</mxGraphModel>…</diagram></mxfile>``
         (uncompressed) - returned as-is with ``wrapper_template=None``; the
         whole outer XML is already editable by the LLM.
      3. ``<mxfile>…<diagram>BASE64_DEFLATED_URLENCODED</diagram></mxfile>``
         (compressed) - returns the decompressed ``<mxGraphModel>`` plus the
         original outer XML so ``rewrap_drawio_xml`` can re-compress and
         substitute after beautification.
    """
    if not xml.lstrip().startswith("<mxfile"):
        return xml, None
    try:
        root = ET.fromstring(xml)  # noqa: S314
    except ET.ParseError:
        return xml, None
    diagram = root.find("diagram")
    if diagram is None or not diagram.text:
        return xml, None
    inner = diagram.text.strip()
    if inner.startswith("<"):
        return xml, None
    try:
        editable = _decompress_drawio_inner(inner)
    except (ValueError, zlib.error, UnicodeDecodeError):
        return xml, None
    return editable, xml


def rewrap_drawio_xml(editable: str, wrapper: str) -> str:
    """Compress ``editable`` and substitute into ``wrapper``'s <diagram> element."""
    compressed = _compress_drawio_inner(editable)
    root = ET.fromstring(wrapper)  # noqa: S314
    diagram = root.find("diagram")
    if diagram is None:
        msg = "wrapper has no <diagram> element"
        raise ValueError(msg)
    diagram.text = compressed
    return ET.tostring(root, encoding="unicode")


def make_viewer_html(xml: str) -> str:
    """Return an iframe HTML snippet rendering ``xml`` via the drawio web viewer.

    The XML is URL-encoded into the URL fragment (``#R<encoded>``).

    The drawio viewer expects an ``<mxfile>`` root (the "drawio file" format)
    and shows "error loading file" for a bare ``<mxGraphModel>``. Wrap bare
    models in a minimal ``<mxfile>`` shell so both the editable form (what
    the LLM returns) and the saved file form render consistently.
    """
    stripped = xml.lstrip()
    if stripped.startswith("<mxGraphModel"):
        xml = f'<mxfile><diagram id="d" name="Page-1">{xml}</diagram></mxfile>'
    encoded = urllib.parse.quote(xml, safe="")
    src = f"https://viewer.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank#R{encoded}"
    return f'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>'


import param  # noqa: E402


class DrawAiState(param.Parameterized):
    """Reactive state shared by the upload handler, the beautify tool,
    and the compare-column widgets.
    """

    current_bytes = param.Bytes(default=b"")
    current_xml = param.String(default="")  # editable (decompressed if input was compressed)
    current_outer_wrapper = param.String(default="")  # original <mxfile>…</mxfile> when input was compressed
    current_format = param.Selector(objects=["png", "drawio", None], default=None)
    current_filename = param.String(default="")
    beautified_xml = param.String(default="")  # editable beautified XML (matches current_xml shape)


from typing import ClassVar  # noqa: E402

import anthropic  # noqa: E402
from langchain_core.tools import BaseTool  # noqa: E402
from pydantic import BaseModel, ConfigDict, Field  # noqa: E402


class BeautifyDrawioInput(BaseModel):
    """Input schema for ``BeautifyDrawioTool``."""

    intent: str = Field(
        description=(
            "Free-form description of how the user wants the currently loaded "
            "drawio diagram beautified (e.g. 'tighter spacing', 'align on grid', "
            "'recolor to blue theme')."
        )
    )


_BEAUTIFY_SYSTEM_PROMPT = (
    "You beautify drawio diagrams. The user will send a complete "
    "<mxGraphModel> (or <mxfile>) XML document. You MUST return the "
    "ENTIRE modified XML document, preserving every <mxCell> - both "
    "vertex cells and edge cells - with their original ids, parents, "
    "sources, targets, and values intact. "
    "Only change visual attributes: geometry (x/y/width/height), style "
    "strings, and whitespace. Do NOT add cells, do NOT remove cells, do "
    "NOT rename ids, do NOT summarize, do NOT truncate. "
    "Output raw XML only - no prose, no explanations, no markdown code fences."
)


def _strip_fences(text: str) -> str:
    """Remove ```...``` code fences if the model wrapped its output anyway."""
    stripped = text.strip()
    if stripped.startswith("```"):
        lines = stripped.splitlines()
        # drop first and last fence line
        lines = lines[1:-1] if len(lines) >= 2 else lines
        stripped = "\n".join(lines)
    return stripped.strip()


class BeautifyDrawioTool(BaseTool):
    """Beautify the currently loaded drawio diagram using Claude Opus 4.7.

    Reads XML from ``state.current_xml``, calls the ``anthropic`` SDK directly
    (with prompt caching on the system prompt and the XML block), validates
    the returned XML, and writes ``state.beautified_xml``.

    Credentials (``api_key``, ``base_url``) come from the ``anthropic`` provider
    block in ``config.yml`` - the same source the existing ``AiChat`` backend
    reads. This keeps DrawAI consistent with whatever endpoint / key the rest
    of the app is already using (official API, a proxy, an internal gateway).
    """

    name: str = "beautify_drawio"
    description: str = (
        "Beautify the currently loaded drawio diagram's XML. "
        "Call this when the user asks to clean up, realign, restyle, or otherwise "
        "improve the visual quality of the diagram they uploaded. "
        "The uploaded file's XML is already available to the tool - do not pass it."
    )
    args_schema: type[BaseModel] = BeautifyDrawioInput

    state: DrawAiState
    api_key: str = ""
    base_url: str = ""
    model_name: str = "claude-opus-4-7"

    model_config: ClassVar[ConfigDict] = ConfigDict(arbitrary_types_allowed=True)

    def _run(self, intent: str) -> str:
        raise NotImplementedError("Use the async _arun (this tool is async-only).")

    async def _arun(self, intent: str) -> str:
        if not self.state.current_xml:
            return "No file loaded. Ask the user to upload a .drawio or .drawio.png first."

        try:
            # Built explicitly (rather than via a dict[str, str] unpacked with
            # **) so each keyword lines up with its real parameter type on
            # AsyncAnthropic.__init__ (e.g. timeout, max_retries are not str).
            client = (
                anthropic.AsyncAnthropic(api_key=self.api_key, base_url=self.base_url)
                if self.base_url
                else anthropic.AsyncAnthropic(api_key=self.api_key)
            )
            resp = await client.messages.create(
                model=self.model_name,
                # 16k headroom: typical editable mxGraphModel is 5-15k chars;
                # lower caps were truncating mid-diagram and the model was
                # dropping cells from its output to stay under the budget.
                max_tokens=16384,
                system=[
                    {
                        "type": "text",
                        "text": _BEAUTIFY_SYSTEM_PROMPT,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"<drawio-xml>\n{self.state.current_xml}\n</drawio-xml>",
                                "cache_control": {"type": "ephemeral"},
                            },
                            {
                                "type": "text",
                                "text": f"Intent: {intent}",
                            },
                        ],
                    }
                ],
            )
        except Exception as e:
            return f"Anthropic API error: {e}"

        first_block = resp.content[0]
        # resp.content is a union of block types (tool-use, thinking, ...) and
        # only TextBlock has .text; getattr keeps this robust to whichever
        # block type actually comes back instead of assuming index 0 is text.
        text = getattr(first_block, "text", None)
        if not isinstance(text, str):
            return f"Unexpected response block type: {type(first_block).__name__}. Please try again."
        new_xml = _strip_fences(text)
        try:
            validate_drawio_xml(new_xml)
        except ET.ParseError as e:
            return f"Returned content did not parse as XML. Parse error: {e}. Please try again."

        self.state.beautified_xml = new_xml
        orig_len = len(self.state.current_xml)
        new_len = len(new_xml)
        return f"Beautified ({new_len} chars, was {orig_len}). See the bottom pane. Click Download to save."


import panel as pn  # noqa: E402
from dotenv import load_dotenv  # noqa: E402

from panelini import Panelini  # noqa: E402
from panelini.panels.ai import AiChat  # noqa: E402
from panelini.panels.ai.utils.config import load_config  # noqa: E402

_SYSTEM_MESSAGE = (
    "You help the user beautify drawio diagrams. "
    "When the user expresses any intent about cleaning up, realigning, "
    "restyling, or otherwise improving the currently loaded diagram, call "
    "the `beautify_drawio` tool with that intent. "
    "Do not ask the user for the XML - it is already available to the tool."
)


def _anthropic_credentials_from_config() -> tuple[str, str]:
    """Pull (api_key, base_url) from the ``anthropic`` provider in config.yml.

    Reuses the same config as the chat backend so DrawAI respects whatever
    key / endpoint the rest of the app is already configured for.

    Raises:
        RuntimeError: if config.yml has no ``anthropic`` provider block.
    """
    config = load_config()
    provider = config.providers.get("anthropic")
    if provider is None:
        msg = (
            "DrawAI requires an 'anthropic' provider in config.yml. "
            "Add one or point PANELINI_AI_CONFIG_PATH at a config that has it."
        )
        raise RuntimeError(msg)
    api_key = provider.env_vars.get("api_key", "")
    base_url = provider.env_vars.get("endpoint", "")
    return api_key, base_url


def build_app() -> Panelini:  # noqa: C901 - wiring function, flat by design
    """Wire the DrawAI example and return the servable Panelini app."""
    api_key, base_url = _anthropic_credentials_from_config()

    state = DrawAiState()
    tool = BeautifyDrawioTool(state=state, api_key=api_key, base_url=base_url)

    chat = AiChat(system_message=_SYSTEM_MESSAGE, tools=[tool])
    # Pre-enable the beautify tool (AiChat defaults only enable get_current_time)
    chat.tool_checkboxes[tool.name]["checkbox"].value = True
    # Drop the 330px floor so the chat can shrink to share the row with the
    # compare column on narrower viewports (otherwise the compare column
    # overflows to the right and needs horizontal scroll to reach).
    chat.chat_interface.min_width = 0

    # ── Compare column ────────────────────────────────────────────────
    file_input = pn.widgets.FileInput(
        accept=".drawio,.drawio.png",
        sizing_mode="stretch_width",
        margin=(5, 5, 5, 5),
    )
    alert_pane = pn.pane.Alert(
        "",
        alert_type="danger",
        visible=False,
        sizing_mode="stretch_width",
    )

    top_pane = pn.pane.HTML(
        "",
        sizing_mode="stretch_both",
        min_height=240,
        styles={"border": "1px solid #ccc"},
    )
    bottom_pane = pn.pane.HTML(
        "",
        sizing_mode="stretch_both",
        min_height=240,
        styles={"border": "1px solid #ccc"},
    )

    download_button = pn.widgets.Button(
        name="Download beautified",
        button_type="primary",
        disabled=True,
        sizing_mode="stretch_width",
    )
    download_link = pn.pane.HTML("", sizing_mode="stretch_width")
    use_as_input_button = pn.widgets.Button(
        name="Use as new input",
        button_type="success",
        disabled=True,
        sizing_mode="stretch_width",
    )
    clear_input_button = pn.widgets.Button(
        name="Clear input",
        button_type="warning",
        disabled=True,
        sizing_mode="stretch_width",
    )
    clear_beautified_button = pn.widgets.Button(
        name="Clear beautified",
        button_type="warning",
        disabled=True,
        sizing_mode="stretch_width",
    )
    clear_both_button = pn.widgets.Button(
        name="Clear both",
        button_type="danger",
        disabled=True,
        sizing_mode="stretch_width",
    )

    # ── Reactivity ────────────────────────────────────────────────────

    def _refresh_top_pane(*_: object) -> None:
        has_input = bool(
            (state.current_format == "png" and state.current_bytes)
            or (state.current_format == "drawio" and state.current_xml)
        )
        if state.current_format == "png" and state.current_bytes:
            b64 = base64.b64encode(state.current_bytes).decode()
            top_pane.object = (
                f'<img src="data:image/png;base64,{b64}" style="max-width:100%;max-height:100%;object-fit:contain;" />'
            )
        elif state.current_format == "drawio" and state.current_xml:
            top_pane.object = make_viewer_html(state.current_xml)
        else:
            top_pane.object = "<em style='color:#999'>No file loaded.</em>"
        clear_input_button.disabled = not has_input
        clear_both_button.disabled = not (has_input or state.beautified_xml)

    def _refresh_bottom_pane(*_: object) -> None:
        has_beautified = bool(state.beautified_xml)
        has_input = bool(state.current_xml)
        if has_beautified:
            bottom_pane.object = make_viewer_html(state.beautified_xml)
            download_button.disabled = False
            use_as_input_button.disabled = False
        else:
            bottom_pane.object = "<em style='color:#999'>No beautified result yet.</em>"
            download_button.disabled = True
            use_as_input_button.disabled = True
            download_link.object = ""
        clear_beautified_button.disabled = not has_beautified
        clear_both_button.disabled = not (has_input or has_beautified)

    state.param.watch(_refresh_top_pane, ["current_bytes", "current_xml", "current_format"])
    state.param.watch(_refresh_bottom_pane, "beautified_xml")
    _refresh_top_pane()
    _refresh_bottom_pane()

    # ── Upload handler ────────────────────────────────────────────────

    def _on_upload(event: object) -> None:
        _ = event
        filename = file_input.filename or ""
        data = file_input.value
        if not data:
            return
        try:
            if filename.endswith(".drawio.png"):
                raw_xml = extract_xml_from_drawio_png(data)
                fmt = "png"
            elif filename.endswith(".drawio"):
                raw_xml = data.decode("utf-8")
                fmt = "drawio"
            else:
                alert_pane.object = "Unsupported extension. Use .drawio or .drawio.png."
                alert_pane.visible = True
                return
            validate_drawio_xml(raw_xml)
            # If the <diagram> payload is compressed base64, unwrap so the LLM
            # sees the actual <mxGraphModel> instead of opaque gibberish.
            editable_xml, wrapper = unwrap_drawio_xml(raw_xml)
        except Exception as e:
            alert_pane.object = f"Could not read file: {e}"
            alert_pane.visible = True
            return

        alert_pane.visible = False
        state.param.update(
            current_bytes=data,
            current_xml=editable_xml,
            current_outer_wrapper=wrapper or "",
            current_format=fmt,
            current_filename=filename,
            beautified_xml="",
        )

    file_input.param.watch(_on_upload, "value")

    # ── Download handler ──────────────────────────────────────────────

    def _on_download(event: object) -> None:
        _ = event
        if not state.beautified_xml:
            return
        stem = state.current_filename
        for suffix in (".drawio.png", ".drawio"):
            if stem.endswith(suffix):
                stem = stem[: -len(suffix)]
                break

        if state.current_outer_wrapper:
            xml_out = rewrap_drawio_xml(state.beautified_xml, state.current_outer_wrapper)
        else:
            xml_out = state.beautified_xml

        out_bytes = xml_out.encode("utf-8")
        out_name = f"{stem}_beautified.drawio"
        b64 = base64.b64encode(out_bytes).decode()
        download_link.object = (
            f'<a href="data:application/xml;base64,{b64}" download="{out_name}">Click to download {out_name}</a>'
        )

    download_button.on_click(_on_download)

    # ── Use-as-input handler ──────────────────────────────────────────

    def _on_use_as_input(event: object) -> None:
        _ = event
        if not state.beautified_xml:
            return
        new_wrapper = ""
        if state.current_outer_wrapper:
            new_wrapper = rewrap_drawio_xml(state.beautified_xml, state.current_outer_wrapper)
        state.param.update(
            current_bytes=b"",
            current_xml=state.beautified_xml,
            current_outer_wrapper=new_wrapper,
            current_format="drawio",
            beautified_xml="",
        )

    use_as_input_button.on_click(_on_use_as_input)

    # ── Clear handlers ────────────────────────────────────────────────

    _EMPTY_STATE = {
        "current_bytes": b"",
        "current_xml": "",
        "current_outer_wrapper": "",
        "current_format": None,
        "current_filename": "",
    }

    def _on_clear_input(event: object) -> None:
        _ = event
        state.param.update(**_EMPTY_STATE, beautified_xml=state.beautified_xml)

    def _on_clear_beautified(event: object) -> None:
        _ = event
        state.beautified_xml = ""

    def _on_clear_both(event: object) -> None:
        _ = event
        state.param.update(**_EMPTY_STATE, beautified_xml="")

    clear_input_button.on_click(_on_clear_input)
    clear_beautified_button.on_click(_on_clear_beautified)
    clear_both_button.on_click(_on_clear_both)

    # `flex: 1 1 0` + `min-width: 0` is the standard flexbox trick that lets
    # each column share the row 50/50 and collapse below its content's natural
    # width, so the two halves always fit inside the viewport (no horizontal
    # scroll). `overflow: hidden` on the cards catches anything inside that
    # would otherwise punch through.
    _HALF_COLUMN_STYLES = {
        "flex": "1 1 0",
        "min-width": "0",
        "overflow": "hidden",
    }

    compare_column = pn.Column(
        file_input,
        alert_pane,
        pn.pane.Markdown("**Original**", margin=(5, 5, 0, 5)),
        top_pane,
        pn.pane.Markdown("**Beautified**", margin=(5, 5, 0, 5)),
        bottom_pane,
        pn.Row(download_button, use_as_input_button, sizing_mode="stretch_width"),
        download_link,
        pn.Row(clear_input_button, clear_beautified_button, clear_both_button, sizing_mode="stretch_width"),
        sizing_mode="stretch_both",
        min_height=600,
        styles=_HALF_COLUMN_STYLES,
    )

    chat_card = pn.Card(
        title="Chat",
        collapsible=False,
        objects=[chat.chat_interface],
        sizing_mode="stretch_both",
        min_height=600,
        styles={**_HALF_COLUMN_STYLES, "padding": "15px", "margin-right": "10px"},
    )

    main_layout = pn.Row(
        chat_card,
        compare_column,
        sizing_mode="stretch_both",
        min_height=600,
        styles={"display": "flex", "width": "100%", "max-width": "100%", "flex-wrap": "nowrap"},
    )

    app = Panelini(title="Panelini DrawAI", sidebar_enabled=True, sidebar_visible=True)
    app.main_set(objects=[main_layout])
    app.sidebar_set(objects=chat.sidebar_objects)
    return app


if __name__ == "__main__":
    load_dotenv()
    app = build_app()
    pn.serve(app.servable(), title="Panelini DrawAI", port=5008)
