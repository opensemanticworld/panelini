"""DrawAI — AI-assisted drawio beautifier example.

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

from io import BytesIO

from PIL import Image, PngImagePlugin


def extract_xml_from_drawio_png(data: bytes) -> str:
    """Return the XML stored in a drawio PNG's ``mxfile`` tEXt chunk.

    Raises:
        ValueError: if the PNG has no ``mxfile`` chunk.
    """
    with Image.open(BytesIO(data)) as img:
        img.load()
        text = getattr(img, "text", {}) or {}
        if "mxfile" not in text:
            msg = "No 'mxfile' tEXt chunk found — not a drawio PNG."
            raise ValueError(msg) from None
        return text["mxfile"]


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


import xml.etree.ElementTree as ET  # noqa: E402


def validate_drawio_xml(xml: str) -> None:
    """Raise ``xml.etree.ElementTree.ParseError`` if ``xml`` is not parseable."""
    ET.fromstring(xml)  # noqa: S314


import urllib.parse  # noqa: E402


def make_viewer_html(xml: str) -> str:
    """Return an iframe HTML snippet rendering ``xml`` via the drawio web viewer.

    The XML is URL-encoded into the URL fragment (``#R<encoded>``).
    """
    encoded = urllib.parse.quote(xml, safe="")
    src = f"https://viewer.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank#R{encoded}"
    return f'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>'


import param  # noqa: E402


class DrawAiState(param.Parameterized):
    """Reactive state shared by the upload handler, the beautify tool,
    and the compare-column widgets.
    """

    current_bytes = param.Bytes(default=b"")
    current_xml = param.String(default="")
    current_format = param.Selector(objects=["png", "drawio", None], default=None)
    current_filename = param.String(default="")
    beautified_xml = param.String(default="")


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
    "You beautify drawio XML. Output valid drawio XML only, no prose, "
    "no code fences. Preserve node IDs where possible so diffs stay meaningful."
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
    block in ``config.yml`` — the same source the existing ``AiChat`` backend
    reads. This keeps DrawAI consistent with whatever endpoint / key the rest
    of the app is already using (official API, a proxy, an internal gateway).
    """

    name: str = "beautify_drawio"
    description: str = (
        "Beautify the currently loaded drawio diagram's XML. "
        "Call this when the user asks to clean up, realign, restyle, or otherwise "
        "improve the visual quality of the diagram they uploaded. "
        "The uploaded file's XML is already available to the tool — do not pass it."
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
            client_kwargs: dict[str, str] = {"api_key": self.api_key}
            if self.base_url:
                client_kwargs["base_url"] = self.base_url
            client = anthropic.AsyncAnthropic(**client_kwargs)
            resp = await client.messages.create(
                model=self.model_name,
                max_tokens=8192,
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

        new_xml = _strip_fences(resp.content[0].text)
        try:
            validate_drawio_xml(new_xml)
        except ET.ParseError as e:
            return f"Returned content did not parse as XML. Parse error: {e}. Please try again."

        self.state.beautified_xml = new_xml
        return "Beautified — see the bottom pane. Click Download to save."


import base64  # noqa: E402

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
    "Do not ask the user for the XML — it is already available to the tool."
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

    # ── Reactivity ────────────────────────────────────────────────────

    def _refresh_top_pane(*_: object) -> None:
        if state.current_format == "png" and state.current_bytes:
            b64 = base64.b64encode(state.current_bytes).decode()
            top_pane.object = (
                f'<img src="data:image/png;base64,{b64}" style="max-width:100%;max-height:100%;object-fit:contain;" />'
            )
        elif state.current_format == "drawio" and state.current_xml:
            top_pane.object = make_viewer_html(state.current_xml)
        else:
            top_pane.object = "<em style='color:#999'>No file loaded.</em>"

    def _refresh_bottom_pane(*_: object) -> None:
        if state.beautified_xml:
            bottom_pane.object = make_viewer_html(state.beautified_xml)
            download_button.disabled = False
        else:
            bottom_pane.object = "<em style='color:#999'>No beautified result yet.</em>"
            download_button.disabled = True
            download_link.object = ""

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
                xml = extract_xml_from_drawio_png(data)
                fmt = "png"
            elif filename.endswith(".drawio"):
                xml = data.decode("utf-8")
                fmt = "drawio"
            else:
                alert_pane.object = "Unsupported extension. Use .drawio or .drawio.png."
                alert_pane.visible = True
                return
            validate_drawio_xml(xml)
        except Exception as e:
            alert_pane.object = f"Could not read file: {e}"
            alert_pane.visible = True
            return

        alert_pane.visible = False
        state.param.update(
            current_bytes=data,
            current_xml=xml,
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

        if state.current_format == "png":
            out_bytes = embed_xml_into_drawio_png(state.current_bytes, state.beautified_xml)
            out_name = f"{stem}_beautified.drawio.png"
            mime = "image/png"
        else:
            out_bytes = state.beautified_xml.encode("utf-8")
            out_name = f"{stem}_beautified.drawio"
            mime = "application/xml"

        b64 = base64.b64encode(out_bytes).decode()
        download_link.object = (
            f'<a href="data:{mime};base64,{b64}" download="{out_name}">Click to download {out_name}</a>'
        )

    download_button.on_click(_on_download)

    compare_column = pn.Column(
        file_input,
        alert_pane,
        pn.pane.Markdown("**Original**", margin=(5, 5, 0, 5)),
        top_pane,
        pn.pane.Markdown("**Beautified**", margin=(5, 5, 0, 5)),
        bottom_pane,
        download_button,
        download_link,
        sizing_mode="stretch_both",
        min_height=600,
    )

    chat_card = pn.Card(
        title="Chat",
        collapsible=False,
        objects=[chat.chat_interface],
        sizing_mode="stretch_both",
        min_height=600,
        styles={"padding": "15px", "margin-right": "10px"},
    )

    main_layout = pn.Row(chat_card, compare_column, sizing_mode="stretch_both", min_height=600)

    app = Panelini(title="Panelini DrawAI", sidebar_enabled=True)
    app.main_set(objects=[main_layout])
    app.sidebar_set(objects=chat.sidebar_objects)
    return app


if __name__ == "__main__":
    load_dotenv()
    app = build_app()
    pn.serve(app.servable(), title="Panelini DrawAI", port=5008)
