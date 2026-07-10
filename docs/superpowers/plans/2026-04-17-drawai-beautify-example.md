# DrawAI Beautify Example Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a self-contained example (`examples/panels/ai/drawai_beautify.py`) that lets a user upload a `.drawio` or `.drawio.png`, chat a beautification intent, see a before/after visual comparison rendered via the drawio web viewer, and download the beautified result, with Claude Opus 4.7 called through the `anthropic` SDK (with prompt caching) from inside a LangChain tool plugged into the existing `AiChat` panel.

**Architecture:** One example file contains all helpers, the `DrawAiState` (`param.Parameterized`), the `BeautifyDrawioTool` (LangChain `BaseTool` that internally calls the `anthropic` SDK), and a `build_app()` that wires a custom main-area layout (chat left, upload + top-pane + bottom-pane + download-button right) while reusing `AiChat.chat_interface` and `AiChat.sidebar_objects` unchanged. The drawio web viewer is embedded via an iframe whose `src` carries the XML in the URL fragment (`#R<url-encoded-xml>`). Unit tests cover pure helpers + the tool (with the `anthropic` SDK mocked); Playwright UI tests cover layout + upload handling.

**Tech Stack:** Python 3.10+, `panel`, `param`, `langchain-core` (via existing `[ai]` extra), new deps `anthropic>=0.39` and `pillow>=10.0` under a new `[ai-drawio]` extra; pytest + pytest-playwright for tests.

**Spec:** [docs/superpowers/specs/2026-04-17-drawai-beautify-example-design.md](../specs/2026-04-17-drawai-beautify-example-design.md)

---

## File Structure

| File | Responsibility | Status |
|---|---|---|
| `pyproject.toml` | Add `[ai-drawio]` optional extra | modify |
| `examples/panels/ai/drawai_beautify.py` | All example code: helpers, state, tool, app | create |
| `examples/panels/ai/README.md` | Add run instructions for DrawAI example | modify (create if missing) |
| `tests/panels/ai/fixtures/drawai/_make_fixtures.py` | Deterministically regenerate binary fixtures | create |
| `tests/panels/ai/fixtures/drawai/diagram.drawio.png` | Happy-path drawio PNG fixture | generate |
| `tests/panels/ai/fixtures/drawai/diagram.drawio` | Happy-path `.drawio` XML fixture | generate |
| `tests/panels/ai/fixtures/drawai/corrupt.drawio.png` | PNG without `mxfile` chunk | generate |
| `tests/panels/ai/fixtures/drawai/malformed.drawio` | Invalid XML | generate |
| `tests/panels/ai/test_drawai_helpers.py` | Unit tests for helpers, `DrawAiState`, `BeautifyDrawioTool` | create |
| `tests/panels/ai/examples/test_drawai_ui.py` | Playwright UI tests | create |
| `tests/panels/ai/examples/conftest.py` | Add `mock_anthropic_sdk` fixture | modify |

All helper/tool code lives in the single example file so tests can `from examples.panels.ai.drawai_beautify import ...` (works because `pyproject.toml` has `pytest.pythonpath = ["."]`).

---

## Task 1: Add `[ai-drawio]` optional extra

**Files:**
- Modify: `pyproject.toml` (the `[project.optional-dependencies]` block)

- [ ] **Step 1: Add the extra**

Open `pyproject.toml` and, inside the `[project.optional-dependencies]` block (currently ends after the `ai = [...]` array around line 43), add a new extra below `ai = [...]`:

```toml
ai-drawio = [
    "anthropic>=0.39",
    "pillow>=10.0",
]
```

- [ ] **Step 2: Install the new deps into the working environment**

Run:
```bash
uv sync --extra ai --extra ai-drawio --group dev
```

Expected: both `anthropic` and `pillow` resolve and install without errors.

- [ ] **Step 3: Verify imports work**

Run:
```bash
uv run python -c "import anthropic; import PIL; print(anthropic.__version__, PIL.__version__)"
```

Expected: prints both version strings without ImportError.

- [ ] **Step 4: Commit**

```bash
git add pyproject.toml uv.lock
git commit -m "deps: add ai-drawio optional extra (anthropic, pillow)"
```

---

## Task 2: Write the fixture generator script

**Files:**
- Create: `tests/panels/ai/fixtures/drawai/_make_fixtures.py`

- [ ] **Step 1: Create fixture directory**

Run:
```bash
mkdir -p tests/panels/ai/fixtures/drawai
```

- [ ] **Step 2: Write the generator script**

Create `tests/panels/ai/fixtures/drawai/_make_fixtures.py` with this exact content:

```python
"""Deterministically regenerate drawai test fixtures.

Run from anywhere:
    python tests/panels/ai/fixtures/drawai/_make_fixtures.py

Generates four files alongside this script:
    diagram.drawio.png  - valid drawio PNG (uncompressed XML in mxfile tEXt)
    diagram.drawio      - plain XML matching the PNG's embedded XML
    corrupt.drawio.png  - plain PNG, no mxfile chunk (upload-error fixture)
    malformed.drawio    - invalid XML (parse-error fixture)
"""

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
    (HERE / "diagram.drawio").write_text(DIAGRAM_XML, encoding="utf-8")
    make_plain_png(HERE / "corrupt.drawio.png")
    (HERE / "malformed.drawio").write_text("<not>valid</xml>", encoding="utf-8")
    print(f"Fixtures written to {HERE}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Run the generator**

Run:
```bash
uv run python tests/panels/ai/fixtures/drawai/_make_fixtures.py
```

Expected: prints `Fixtures written to .../tests/panels/ai/fixtures/drawai`. Four files now exist in that directory.

- [ ] **Step 4: Verify the generated files**

Run:
```bash
ls tests/panels/ai/fixtures/drawai/
```

Expected output includes: `_make_fixtures.py`, `corrupt.drawio.png`, `diagram.drawio`, `diagram.drawio.png`, `malformed.drawio`.

- [ ] **Step 5: Commit**

```bash
git add tests/panels/ai/fixtures/drawai/
git commit -m "test: add drawai fixture generator and generated fixtures"
```

---

## Task 3: TDD `extract_xml_from_drawio_png`

**Files:**
- Create: `examples/panels/ai/drawai_beautify.py`
- Create: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Create `tests/panels/ai/test_drawai_helpers.py`:

```python
"""Unit tests for DrawAI example helpers, state, and tool."""

from __future__ import annotations

from pathlib import Path

import pytest

pytest.importorskip("anthropic")
pytest.importorskip("PIL")

from examples.panels.ai.drawai_beautify import extract_xml_from_drawio_png  # noqa: E402

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
```

- [ ] **Step 2: Run test to verify it fails with ImportError**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: collection error or fail: `examples/panels/ai/drawai_beautify.py` doesn't exist yet.

- [ ] **Step 3: Create the example file with just this helper**

Create `examples/panels/ai/drawai_beautify.py`:

```python
"""DrawAI: AI-assisted drawio beautifier example.

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

from PIL import Image


def extract_xml_from_drawio_png(data: bytes) -> str:
    """Return the XML stored in a drawio PNG's ``mxfile`` tEXt chunk.

    Raises:
        ValueError: if the PNG has no ``mxfile`` chunk.
    """
    with Image.open(BytesIO(data)) as img:
        img.load()
        text = getattr(img, "text", {}) or {}
        if "mxfile" not in text:
            raise ValueError("No 'mxfile' tEXt chunk found: not a drawio PNG.")
        return text["mxfile"]
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: both tests PASS.

- [ ] **Step 5: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py
git commit -m "feat(drawai): extract_xml_from_drawio_png helper + tests"
```

---

## Task 4: TDD `embed_xml_into_drawio_png`

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`
- Modify: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
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
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: `test_embed_then_extract_roundtrip` and `test_embed_produces_valid_png` FAIL with ImportError.

- [ ] **Step 3: Add the helper**

Append to `examples/panels/ai/drawai_beautify.py` (after `extract_xml_from_drawio_png` and before any other code):

```python
from PIL import PngImagePlugin  # noqa: E402


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
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all four tests PASS.

- [ ] **Step 5: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py
git commit -m "feat(drawai): embed_xml_into_drawio_png helper + tests"
```

---

## Task 5: TDD `validate_drawio_xml`

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`
- Modify: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
import xml.etree.ElementTree as ET  # noqa: E402

from examples.panels.ai.drawai_beautify import validate_drawio_xml  # noqa: E402


def test_validate_drawio_xml_passes_valid():
    validate_drawio_xml("<mxfile><diagram/></mxfile>")  # no exception


def test_validate_drawio_xml_raises_on_malformed():
    malformed = (FIXTURES / "malformed.drawio").read_text()
    with pytest.raises(ET.ParseError):
        validate_drawio_xml(malformed)
```

- [ ] **Step 2: Run tests to verify new ones fail**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: `test_validate_drawio_xml_*` FAIL with ImportError.

- [ ] **Step 3: Add the helper**

Append to `examples/panels/ai/drawai_beautify.py`:

```python
import xml.etree.ElementTree as ET  # noqa: E402


def validate_drawio_xml(xml: str) -> None:
    """Raise ``xml.etree.ElementTree.ParseError`` if ``xml`` is not parseable."""
    ET.fromstring(xml)
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all six tests PASS.

- [ ] **Step 5: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py
git commit -m "feat(drawai): validate_drawio_xml helper + tests"
```

---

## Task 6: TDD `make_viewer_html`

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`
- Modify: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
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
```

- [ ] **Step 2: Run tests to verify new ones fail**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: new tests FAIL with ImportError.

- [ ] **Step 3: Add the helper**

Append to `examples/panels/ai/drawai_beautify.py`:

```python
import urllib.parse  # noqa: E402


def make_viewer_html(xml: str) -> str:
    """Return an iframe HTML snippet rendering ``xml`` via the drawio web viewer.

    The XML is URL-encoded into the URL fragment (``#R<encoded>``).
    """
    encoded = urllib.parse.quote(xml)
    src = f"https://viewer.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank#R{encoded}"
    return f'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>'
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all eight tests PASS.

- [ ] **Step 5: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py
git commit -m "feat(drawai): make_viewer_html helper + tests"
```

---

## Task 7: TDD `DrawAiState` param model

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`
- Modify: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
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
```

- [ ] **Step 2: Run tests to verify new ones fail**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: new tests FAIL with ImportError.

- [ ] **Step 3: Add the state class**

Append to `examples/panels/ai/drawai_beautify.py`:

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all eleven tests PASS.

- [ ] **Step 5: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py
git commit -m "feat(drawai): DrawAiState param model + tests"
```

---

## Task 8: TDD `BeautifyDrawioTool`: happy path

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`
- Modify: `tests/panels/ai/test_drawai_helpers.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
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
```

- [ ] **Step 2: Ensure `pytest-asyncio` is available**

The project uses `pytest` and langchain async tests already exist (`test_backend.py`; check it uses `@pytest.mark.asyncio`). Run:

```bash
uv run python -c "import pytest_asyncio; print(pytest_asyncio.__version__)"
```

If this fails with ImportError, add `pytest-asyncio` to the dev group: open `pyproject.toml`, find the `dev = [ ... ]` list under `[dependency-groups]`, and append `"pytest-asyncio>=0.23"`. Then run `uv sync --group dev`.

If it succeeds, no action needed.

- [ ] **Step 3: Run test to verify it fails**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: `test_beautify_drawio_tool_updates_state_on_success` FAILS with ImportError (`BeautifyDrawioTool` not defined).

- [ ] **Step 4: Add the tool**

Append to `examples/panels/ai/drawai_beautify.py`:

```python
import anthropic  # noqa: E402
from langchain_core.tools import BaseTool  # noqa: E402
from pydantic import BaseModel, Field  # noqa: E402


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
    block in ``config.yml``, the same source the existing ``AiChat`` backend
    reads. This keeps DrawAI consistent with whatever endpoint / key the rest
    of the app is already using (official API, a proxy, an internal gateway).
    """

    name: str = "beautify_drawio"
    description: str = (
        "Beautify the currently loaded drawio diagram's XML. "
        "Call this when the user asks to clean up, realign, restyle, or otherwise "
        "improve the visual quality of the diagram they uploaded. "
        "The uploaded file's XML is already available to the tool; do not pass it."
    )
    args_schema: type[BaseModel] = BeautifyDrawioInput

    state: DrawAiState
    api_key: str = ""
    base_url: str = ""
    model_name: str = "claude-opus-4-7"

    model_config = {"arbitrary_types_allowed": True}

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
        except Exception as e:  # noqa: BLE001 - surface all SDK errors (auth, rate limit, network) to the chat model
            return f"Anthropic API error: {e}"

        new_xml = _strip_fences(resp.content[0].text)
        try:
            validate_drawio_xml(new_xml)
        except ET.ParseError as e:
            return f"Returned content did not parse as XML. Parse error: {e}. Please try again."

        self.state.beautified_xml = new_xml
        return "Beautified: see the bottom pane. Click Download to save."
```

- [ ] **Step 5: Run test to verify it passes**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all twelve tests PASS.

- [ ] **Step 6: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py tests/panels/ai/test_drawai_helpers.py pyproject.toml uv.lock
git commit -m "feat(drawai): BeautifyDrawioTool happy path + test"
```

---

## Task 9: TDD `BeautifyDrawioTool`: error paths

**Files:**
- Modify: `tests/panels/ai/test_drawai_helpers.py`

No production changes: the error paths are already implemented in Task 8. This task adds regression tests for them.

- [ ] **Step 1: Write the failing tests**

Append to `tests/panels/ai/test_drawai_helpers.py`:

```python
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
```

- [ ] **Step 2: Run tests**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all seventeen tests PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/panels/ai/test_drawai_helpers.py
git commit -m "test(drawai): regression tests for BeautifyDrawioTool error paths"
```

---

## Task 10: Build the app: upload handler, layout, download button

**Files:**
- Modify: `examples/panels/ai/drawai_beautify.py`

This task adds `build_app()` and the `if __name__ == "__main__"` block. No new tests at this step: UI behavior is tested by Playwright in Task 12.

- [ ] **Step 1: Add `build_app` and module entry point**

Append to `examples/panels/ai/drawai_beautify.py`:

```python
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
    "Do not ask the user for the XML; it is already available to the tool."
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
        raise RuntimeError(
            "DrawAI requires an 'anthropic' provider in config.yml. "
            "Add one or point PANELINI_AI_CONFIG_PATH at a config that has it."
        )
    api_key = provider.env_vars.get("api_key", "")
    base_url = provider.env_vars.get("endpoint", "")
    return api_key, base_url


def build_app() -> Panelini:
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
                f'<img src="data:image/png;base64,{b64}" '
                f'style="max-width:100%;max-height:100%;object-fit:contain;" />'
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
        except Exception as e:  # noqa: BLE001 - surface any read/parse error to the user
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
            f'<a href="data:{mime};base64,{b64}" '
            f'download="{out_name}">Click to download {out_name}</a>'
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
```

Keeping `build_app()` out of the module body means unit tests can `from examples.panels.ai.drawai_beautify import ...` without triggering `load_config()` or `AiChat()` construction. The UI test calls `build_app()` explicitly inside its fixture (see Task 12).

- [ ] **Step 2: Smoke-test the file imports without error**

Plain import first (should be cheap now: no `load_config()` triggered):

```bash
uv run python -c "from examples.panels.ai.drawai_beautify import build_app, DrawAiState, BeautifyDrawioTool; print('import OK')"
```

Expected: prints `import OK` with no exceptions.

Then smoke-test `build_app()` itself. The repo's `config.yml` references `${ANTHROPIC_FOUNDRY_API_KEY}` and `${ENDPOINT}` under the `anthropic` provider, and `load_config()` raises if either is unset, so export dummies for the smoke test:

```bash
ANTHROPIC_FOUNDRY_API_KEY=dummy ENDPOINT=https://localhost \
  AZURE_OPENAI_API_KEY=dummy AZURE_OPENAI_ENDPOINT=https://localhost AZURE_OPENAI_API_VERSION=2024-01-01 \
  uv run python -c "from examples.panels.ai.drawai_beautify import build_app; app = build_app(); print(type(app).__name__)"
```

Expected: prints `Panelini` (and no exceptions). The Anthropic SDK is only exercised when the beautify tool fires, so dummy credentials are fine here.

- [ ] **Step 3: Run existing helper tests to ensure nothing regressed**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: all seventeen tests still PASS.

- [ ] **Step 4: Commit**

```bash
git add examples/panels/ai/drawai_beautify.py
git commit -m "feat(drawai): wire app layout, upload, and download handlers"
```

---

## Task 11: Add `mock_anthropic_sdk` fixture for UI tests

**Files:**
- Modify: `tests/panels/ai/examples/conftest.py`

- [ ] **Step 1: Add the fixture**

Open `tests/panels/ai/examples/conftest.py` and append:

```python
@pytest.fixture(scope="module")
def mock_anthropic_sdk():
    """Patch the Anthropic SDK + the config lookup used by drawai_beautify.

    Returns a tuple of (config_patch, anthropic_patch, canned_xml). The UI test
    applies both patches under ``with`` before reloading the example module.

    The config patch supplies an ``anthropic`` provider (the drawai example
    looks it up by key in its ``_anthropic_credentials_from_config`` helper).
    This is separate from ``mock_langchain``'s patch, which targets the
    backend's ``load_config`` reference with a generic "test" provider.
    """
    from unittest.mock import AsyncMock, MagicMock, patch

    from panelini.panels.ai.utils.config import AppConfig, ModelConfig, ProviderConfig

    canned_xml = "<mxfile><diagram id='beautified'/></mxfile>"

    block = MagicMock()
    block.text = canned_xml
    response = MagicMock()
    response.content = [block]

    anthropic_client = MagicMock()
    anthropic_client.messages = MagicMock()
    anthropic_client.messages.create = AsyncMock(return_value=response)

    fake_provider = ProviderConfig(
        key="anthropic",
        display_name="Anthropic",
        client_type="anthropic",
        env_vars={"api_key": "fake-key", "endpoint": "https://localhost"},
        models=(ModelConfig(name="Claude Opus 4.7", value="anthropic/claude-opus-4-7"),),
    )
    fake_config = AppConfig(providers={"anthropic": fake_provider})

    config_patch = patch(
        "examples.panels.ai.drawai_beautify.load_config",
        return_value=fake_config,
    )
    anthropic_patch = patch(
        "examples.panels.ai.drawai_beautify.anthropic.AsyncAnthropic",
        return_value=anthropic_client,
    )
    return config_patch, anthropic_patch, canned_xml
```

At the top of the same file, ensure the imports include `pytest` (already present); no new imports needed.

- [ ] **Step 2: Verify existing UI example tests still pass (no change expected)**

Run:
```bash
uv run pytest tests/panels/ai/examples/ -v -m ui
```

Expected: existing UI tests pass (or skip cleanly if playwright is missing, in which case you can skip this step).

- [ ] **Step 3: Commit**

```bash
git add tests/panels/ai/examples/conftest.py
git commit -m "test(drawai): add mock_anthropic_sdk fixture"
```

---

## Task 12: Playwright UI tests

**Files:**
- Create: `tests/panels/ai/examples/test_drawai_ui.py`

- [ ] **Step 1: Write the UI tests**

Create `tests/panels/ai/examples/test_drawai_ui.py`:

```python
"""Playwright UI tests for examples/panels/ai/drawai_beautify.py."""

from __future__ import annotations

import importlib
import time
from pathlib import Path

import panel as pn
import pytest
from playwright.sync_api import Page

pytest.importorskip("anthropic")
pytest.importorskip("PIL")

_PORT = 6330
_FIXTURES = Path(__file__).parent.parent / "fixtures" / "drawai"


@pytest.fixture(scope="module")
def panel_server(mock_langchain, mock_anthropic_sdk):
    """Serve the drawai example with LangChain + Anthropic SDK + config mocked."""
    lc1, lc2 = mock_langchain
    cfg_patch, anth_patch, _canned = mock_anthropic_sdk
    with lc1, lc2, cfg_patch, anth_patch:
        module = importlib.reload(importlib.import_module("examples.panels.ai.drawai_beautify"))
        app = module.build_app()  # build_app is NOT called at module level anymore
        server = pn.serve(app.servable(), port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT, module
        server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    _, port, _ = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Original").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_drawai_renders_layout(ready_page: Page):
    """Chat card + Original + Beautified labels are all visible."""
    page = ready_page
    assert page.locator("text=Chat").first.is_visible()
    assert page.locator("text=Original").first.is_visible()
    assert page.locator("text=Beautified").first.is_visible()
    # Download button disabled until a beautification happens
    download_btn = page.locator("button", has_text="Download beautified").first
    assert download_btn.is_disabled()


def test_drawai_upload_valid_png_renders_top_pane(ready_page: Page):
    """Uploading diagram.drawio.png shows it in the top pane as an <img>."""
    page = ready_page
    file_input = page.locator("input[type=file]").first
    file_input.set_input_files(str(_FIXTURES / "diagram.drawio.png"))
    # Wait for the reactive update: top pane should contain an <img> data URL
    page.locator("img[src^='data:image/png;base64']").first.wait_for(timeout=5000)
    # And no error alert
    assert not page.locator(".alert-danger").first.is_visible()


def test_drawai_upload_corrupt_png_shows_alert(ready_page: Page):
    """Uploading corrupt.drawio.png surfaces the error alert, leaves state intact."""
    page = ready_page
    file_input = page.locator("input[type=file]").first
    file_input.set_input_files(str(_FIXTURES / "corrupt.drawio.png"))
    page.locator("text=Could not read file").first.wait_for(timeout=5000)
    assert page.locator("text=mxfile").first.is_visible()
```

- [ ] **Step 2: Run UI tests**

Run:
```bash
uv run pytest tests/panels/ai/examples/test_drawai_ui.py -v -m ui
```

Expected: three tests PASS. Combined runtime should be well under 10 seconds.

If Playwright complains about a missing browser, install it:
```bash
uv run playwright install chromium
```

and re-run.

- [ ] **Step 3: Run the full test suite to check for regressions**

Run:
```bash
uv run pytest tests/ -v
```

Expected: all tests PASS (or skip cleanly when their markers are filtered out).

- [ ] **Step 4: Commit**

```bash
git add tests/panels/ai/examples/test_drawai_ui.py
git commit -m "test(drawai): Playwright UI tests for layout + upload paths"
```

---

## Task 13: README entry

**Files:**
- Modify or create: `examples/panels/ai/README.md` (if missing, check `examples/README.md` for the canonical location)

- [ ] **Step 1: Find or create the examples README**

Run:
```bash
ls examples/panels/ai/README.md examples/README.md 2>/dev/null || true
```

If neither exists, create `examples/panels/ai/README.md` with a minimal frame:

```markdown
# AI panel examples

- `chat_min.py`: minimal AI chat inside Panelini.
- `chat_custom_tool.py`: AI chat wired with a custom in-memory storage tool.
- `chat_multi_tab.py`: multiple AI chats in separate tabs, with config switching.
```

- [ ] **Step 2: Add the DrawAI section**

Append to the chosen README file:

```markdown
## DrawAI: AI-assisted drawio beautifier

`drawai_beautify.py` is a self-contained example that:

1. Accepts a `.drawio` or `.drawio.png` upload.
2. Lets the user describe the desired beautification in chat.
3. Calls Claude Opus 4.7 (via the `anthropic` SDK, with prompt caching) inside
   a LangChain tool to return new drawio XML.
4. Renders a before/after visual comparison using the drawio web viewer
   (`viewer.diagrams.net`) embedded in an iframe.
5. Lets the user download the beautified file, with original pixels reused and new
   XML embedded in the PNG `tEXt` chunk (for `.drawio.png` inputs) or raw
   XML bytes (for `.drawio` inputs).

### Install

```bash
pip install "panelini[ai,ai-drawio]"
export ANTHROPIC_API_KEY=sk-...
```

### Run

```bash
python examples/panels/ai/drawai_beautify.py
```

Open the URL it prints, upload a drawio file, type a beautification intent
(e.g. *"make spacing tighter and align nodes on a grid"*), and watch the
bottom pane update. Click **Download beautified** to save.

### Test fixtures

The repo includes test fixtures at
`tests/panels/ai/fixtures/drawai/` (a minimal 1-node diagram) generated by
`_make_fixtures.py`. For visual demos, the `local/fig*.drawio.png` files
work well too.

### Known trade-offs

- The downloaded `.drawio.png` reuses the **original pixels** with the new
  XML embedded, so drawio opens it correctly, but file-manager thumbnails
  will still show the old pixels. Re-rasterization would require a drawio
  CLI dependency, deliberately out of scope for v1.
- `.drawio.svg` input/output is not supported in v1.
```

- [ ] **Step 3: Commit**

```bash
git add examples/panels/ai/README.md examples/README.md 2>/dev/null
git commit -m "docs(drawai): add README section for drawai_beautify example"
```

---

## Task 14: Final verification

**Files:** (none modified)

- [ ] **Step 1: Run the full unit test file**

Run:
```bash
uv run pytest tests/panels/ai/test_drawai_helpers.py -v
```

Expected: 17 PASSED.

- [ ] **Step 2: Run the UI tests**

Run:
```bash
uv run pytest tests/panels/ai/examples/test_drawai_ui.py -v -m ui
```

Expected: 3 PASSED.

- [ ] **Step 3: Confirm no core `src/panelini/panels/ai/` changes**

Run:
```bash
git diff --stat main -- src/panelini/panels/ai/
```

Expected: no output (no files listed); core panel code is untouched.

- [ ] **Step 4: Confirm the commit graph looks clean**

Run:
```bash
git log --oneline main..HEAD
```

Expected: commits from tasks 1–13, in order. No fixup commits, no reverts.

- [ ] **Step 5: Done: ready for review.**

---

## Open follow-ups (explicitly out of scope for this plan)

- Promote to a real panel module at `src/panelini/panels/drawai/`.
- `.drawio.svg` support.
- Drag-and-drop upload.
- Preset intent buttons (`polish`, `realign`, `recolor`, …).
- Optional third "XML diff" pane.
- Drawio CLI re-rasterization so downloaded PNG pixels match the new XML.
- `postMessage`-based viewer integration (removes URL-length cap on huge diagrams).
- Sphinx docs page in `docs/panels/` reusing the layout diagram from the spec.
