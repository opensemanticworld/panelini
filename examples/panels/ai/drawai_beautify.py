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
