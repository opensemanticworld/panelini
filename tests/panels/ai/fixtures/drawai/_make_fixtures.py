"""Deterministically regenerate drawai test fixtures.

Run from anywhere:
    python tests/panels/ai/fixtures/drawai/_make_fixtures.py

Generates five files alongside this script:
    diagram.drawio.png          - valid drawio PNG (raw XML in mxfile tEXt)
    diagram_urlencoded.drawio.png - valid drawio PNG (URL-encoded XML in mxfile tEXt)
    diagram.drawio              - plain XML matching the PNG's embedded XML
    corrupt.drawio.png          - plain PNG, no mxfile chunk (upload-error fixture)
    malformed.drawio            - invalid XML (parse-error fixture)
"""

import urllib.parse
from pathlib import Path

from PIL import Image, PngImagePlugin

HERE = Path(__file__).parent

DIAGRAM_XML = (
    '<mxfile host="app.diagrams.net" version="26.0.0">\n'
    '  <diagram id="test" name="Page-1">\n'
    '    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10" guides="1" '
    'page="1" pageWidth="850" pageHeight="1100">\n'
    "      <root>\n"
    '        <mxCell id="0"/>\n'
    '        <mxCell id="1" parent="0"/>\n'
    '        <mxCell id="2" value="Hello" '
    'style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">\n'
    '          <mxGeometry x="40" y="40" width="120" height="60" as="geometry"/>\n'
    "        </mxCell>\n"
    "      </root>\n"
    "    </mxGraphModel>\n"
    "  </diagram>\n"
    "</mxfile>\n"
)


def make_drawio_png(xml: str, out_path: Path, size: tuple[int, int] = (200, 100)) -> None:
    img = Image.new("RGB", size, color="white")
    meta = PngImagePlugin.PngInfo()
    meta.add_text("mxfile", xml)
    img.save(out_path, "PNG", pnginfo=meta)


def make_plain_png(out_path: Path, size: tuple[int, int] = (200, 100)) -> None:
    img = Image.new("RGB", size, color=(128, 128, 128))
    img.save(out_path, "PNG")


def main() -> None:
    make_drawio_png(DIAGRAM_XML, HERE / "diagram.drawio.png")
    # Covers drawio's other export mode where the mxfile chunk is percent-encoded.
    make_drawio_png(urllib.parse.quote(DIAGRAM_XML), HERE / "diagram_urlencoded.drawio.png")
    (HERE / "diagram.drawio").write_text(DIAGRAM_XML, encoding="utf-8")
    make_plain_png(HERE / "corrupt.drawio.png")
    (HERE / "malformed.drawio").write_text("<not>valid</xml>", encoding="utf-8")
    print(f"Fixtures written to {HERE}")


if __name__ == "__main__":
    main()
