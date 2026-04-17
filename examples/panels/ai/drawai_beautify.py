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
