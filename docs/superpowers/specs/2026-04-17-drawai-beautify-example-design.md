# DrawAI — drawio beautifier example (v1 design)

**Status:** design approved, not yet implemented
**Date:** 2026-04-17
**Scope:** a single example file that demonstrates an AI-assisted drawio-XML beautifier layered on top of the existing `AiChat` panel, with no core changes to `src/panelini/panels/ai/`.

---

## Goals

- Ship a **self-contained example** at [examples/panels/ai/drawai_beautify.py](../../../examples/panels/ai/drawai_beautify.py) that a user can run and drive end-to-end.
- Reuse `AiChat` (sidebar, provider config, chat loop, history, streaming) unchanged; extend via a custom tool and a custom main-area layout only.
- Let a user **upload** a drawio file (`.drawio` or `.drawio.png`), chat an "intent" for beautification, and get a **visual before/after comparison** in the browser.
- **Non-destructive**: the original file is never modified. Output is a **download** (browser Downloads folder), never a server-side write.
- Use **Claude Opus 4.7** (`claude-opus-4-7`) for the beautification itself, called directly through the official `anthropic` SDK with **prompt caching** on the system prompt and the XML input.
- The layout is reusable — the ASCII diagram in this doc should lift cleanly into [docs/panels/](../../panels/) when the example graduates to a panel module.

## Non-goals (v1)

- Not a new panel module. That is a natural follow-up once the example's UX is validated.
- No `.drawio.svg` support. Next iteration.
- No re-rasterization of beautified diagrams. The bottom pane renders XML via the drawio web viewer; the downloaded `.drawio.png` reuses the **original pixels** with the **new XML** embedded in the `tEXt` chunk (so drawio opens it correctly; file-manager thumbnails still show the old pixels — documented trade-off).
- No server-side filesystem I/O (no reading from `local/`, no writing to `data/beautified/`).
- No preset prompt templates (`polish`, `realign`, etc.). Free-form intent only. Presets can come later as canned system prompts or sidebar buttons.
- No multi-file batch beautification. One file at a time.
- No drawio-side validation beyond XML parseability (`xml.etree.ElementTree.fromstring`).

## User flow

1. User runs `python examples/panels/ai/drawai_beautify.py`.
2. Browser opens the Panelini page. Sidebar shows the standard `AiChat` controls (provider, model, tools, chat management).
3. User clicks the **Upload** widget above the compare column, picks a `.drawio` or `.drawio.png` file.
4. Top pane renders the original:
   - `.drawio.png` → `pn.pane.Image` showing the uploaded PNG.
   - `.drawio` → embedded drawio viewer iframe rendering the uploaded XML.
5. User types in the chat: e.g. *"make spacing tighter and align nodes on a grid"*.
6. Chat model (whatever the sidebar selects — Sonnet, Haiku, …) receives the message, decides to call the `beautify_drawio` tool with `intent="make spacing tighter and align nodes on a grid"`.
7. The tool calls Opus 4.7 directly, receives new XML, validates it parses, writes it to `state.beautified_xml`.
8. Bottom pane's iframe rebuilds with the new XML — visual compare complete.
9. User iterates in chat ("now recolor to match a blue theme") — each successful iteration overwrites `state.beautified_xml`, bottom pane updates.
10. User clicks **Download beautified** — browser downloads `<stem>_beautified.drawio.png` (or `.drawio`).

## Architecture

### Layout

```text
┌─ Panelini header ─────────────────────────────────────────────────┐
├─ Sidebar ──────┬─ Main ────────────────────────────────────────── ┤
│ (from AiChat:  │ ┌─ Chat (left) ──┐ ┌─ Compare (right) ─────────┐ │
│  provider,     │ │                │ │ ┌ FileInput ────────────┐ │ │
│  model,        │ │  ChatInterface │ │ │ Original (top)        │ │ │
│  tools,        │ │  (streaming,   │ │ │  pn.pane.Image or     │ │ │
│  chat mgmt)    │ │   history,     │ │ │  viewer iframe        │ │ │
│                │ │   upload chat) │ │ └───────────────────────┘ │ │
│                │ │                │ │ ┌ Beautified (bottom) ──┐ │ │
│                │ │                │ │ │ viewer iframe         │ │ │
│                │ │                │ │ └───────────────────────┘ │ │
│                │ │                │ │ [ Download beautified ]   │ │
│                │ └────────────────┘ └───────────────────────────┘ │
└────────────────┴──────────────────────────────────────────────────┘
```

- Outer: `Panelini(title="Panelini DrawAI", sidebar_enabled=True)`.
- Sidebar: `AiChat.sidebar_objects` passed through as-is.
- Main: `pn.Row(chat_card, compare_column, sizing_mode="stretch_both")`.
- `chat_card` — reuses `AiChat.chat_interface` inside the same `pn.Card` pattern as [frontend.py:288-295](../../../src/panelini/panels/ai/frontend.py#L288-L295).
- `compare_column` — `pn.Column(file_input, alert_pane, top_pane, bottom_pane, download_button)`.
- `alert_pane` is a hidden-by-default `pn.pane.Alert` above the top pane, surfaced only on upload errors.

### Component boundaries

Every unit has a single purpose, a clear interface, and lives in the example file (v1 keeps the module count low — promotion to a package can split it later).

| Unit | Purpose | Interface | Depends on |
|---|---|---|---|
| `DrawAiState` (`param.Parameterized`) | Holds the uploaded file + beautification result. Reactive; UI binds via `param.watch`. | `current_bytes`, `current_xml`, `current_format` (`"png"`/`"drawio"`/`None`), `current_filename`, `beautified_xml` | `param` |
| `extract_xml_from_drawio_png(bytes) -> str` | Read the `mxfile` `tEXt` chunk from a drawio PNG, base64-decode, deflate, return XML string. | pure function | `pillow` |
| `embed_xml_into_drawio_png(bytes, xml) -> bytes` | Take an original drawio PNG and new XML; write a new PNG with updated `mxfile` chunk, original pixels untouched. | pure function | `pillow` |
| `validate_drawio_xml(xml) -> None` | Raise on unparseable XML; noop otherwise. | pure function | stdlib `xml.etree.ElementTree` |
| `BeautifyDrawioTool(BaseTool)` | LangChain tool the chat model calls with an `intent: str`. Internally runs the Opus-4.7 beautification against `state.current_xml`, validates, writes `state.beautified_xml`. | `__init__(state, model="claude-opus-4-7")`, `_arun(intent)` | `anthropic`, `DrawAiState`, `validate_drawio_xml` |
| `make_viewer_html(xml) -> str` | Build the HTML for a drawio web-viewer iframe that renders a given XML string (URL-encoded into `viewer.diagrams.net` lightbox URL). | pure function | stdlib `urllib.parse`, `base64` |
| `on_upload(event)` | File-input callback: detect format, run extractor if PNG, update `state`, surface errors via `alert_pane`. | closure | `DrawAiState`, Pillow helpers |
| `on_download()` | Button callback: produce a data-URL download link for `<stem>_beautified.drawio[.png]`. | closure | `DrawAiState`, Pillow helpers |
| `build_app() -> Panelini` | Wires everything and returns the servable app. | pure function | all of the above |

### Shared state

```python
import param

class DrawAiState(param.Parameterized):
    current_bytes    = param.Bytes(default=b"")
    current_xml      = param.String(default="")
    current_format   = param.Selector(objects=["png", "drawio", None], default=None)
    current_filename = param.String(default="")
    beautified_xml   = param.String(default="")
```

Reactivity:
- `param.watch(..., "current_xml")` → top pane rebuilds (image or viewer), bottom pane clears, beautified state resets.
- `param.watch(..., "beautified_xml")` → bottom pane iframe rebuilds its `src`, download button enables.

### The tool

```python
class BeautifyDrawioInput(BaseModel):
    intent: str = Field(description="Free-form description of how the user wants the diagram beautified.")

class BeautifyDrawioTool(BaseTool):
    name = "beautify_drawio"
    description = (
        "Beautify the currently loaded drawio diagram's XML. "
        "Call this when the user asks to clean up, realign, restyle, or otherwise "
        "improve the visual quality of the diagram they uploaded. "
        "The uploaded file's XML is already available to the tool — do not pass it."
    )
    args_schema = BeautifyDrawioInput

    state: DrawAiState
    model_name: str = "claude-opus-4-7"

    async def _arun(self, intent: str) -> str:
        if not self.state.current_xml:
            return "No file loaded. Ask the user to upload a .drawio or .drawio.png first."

        client = anthropic.AsyncAnthropic()  # reads ANTHROPIC_API_KEY
        try:
            resp = await client.messages.create(
                model=self.model_name,
                max_tokens=8192,
                system=[{
                    "type": "text",
                    "text": "You beautify drawio XML. Output valid drawio XML only, "
                            "no prose, no code fences. Preserve node IDs where possible "
                            "so diffs stay meaningful.",
                    "cache_control": {"type": "ephemeral"},
                }],
                messages=[{
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
                }],
            )
        except anthropic.APIError as e:
            return f"Anthropic API error: {e}"

        new_xml = _strip_fences(resp.content[0].text)
        try:
            validate_drawio_xml(new_xml)
        except ET.ParseError as e:
            return f"Returned content did not parse as XML. Parse error: {e}. Please try again."

        self.state.beautified_xml = new_xml
        return "Beautified — see the bottom pane. Click Download to save."
```

Prompt caching: both the system prompt and the `<drawio-xml>…</drawio-xml>` user-content block carry `cache_control: ephemeral`. The intent block is fresh per call, so iterations on the same file reuse the cached XML — matching the "XML is large and often reused across iterations" constraint.

### Upload handler

```python
def on_upload(event):
    filename = file_input.filename or ""
    data = event.new
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
        beautified_xml="",  # reset previous beautification
    )
```

### Download handler

```python
def on_download(event):
    stem = state.current_filename.removesuffix(".drawio.png").removesuffix(".drawio")
    if state.current_format == "png":
        out_bytes = embed_xml_into_drawio_png(state.current_bytes, state.beautified_xml)
        out_name = f"{stem}_beautified.drawio.png"
        mime = "image/png"
    else:
        out_bytes = state.beautified_xml.encode("utf-8")
        out_name = f"{stem}_beautified.drawio"
        mime = "application/xml"

    b64 = base64.b64encode(out_bytes).decode()
    download_html.object = (
        f'<a href="data:{mime};base64,{b64}" '
        f'download="{out_name}">Click to download {out_name}</a>'
    )
```

(Same base64-data-URL pattern the existing chat export already uses — see [frontend.py:428-460](../../../src/panelini/panels/ai/frontend.py#L428-L460).)

### Viewer iframe

```python
def make_viewer_html(xml: str) -> str:
    # viewer.diagrams.net reads the XML from the URL fragment
    encoded = urllib.parse.quote(xml)
    src = f"https://viewer.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank#R{encoded}"
    return f'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>'
```

If the URL fragment approach proves unreliable for large XML (browser URL length limits), fall back to `postMessage` integration with `viewer.diagrams.net` — documented but not implemented in v1.

## Dependencies

Two new packages, added under an optional extra so the core `ai` extra stays lean:

```toml
[project.optional-dependencies]
ai-drawio = [
    "anthropic>=0.39",   # SDK with prompt caching support
    "pillow>=10.0",      # PNG tEXt chunk I/O
]
```

Document in `examples/panels/ai/README.md`: *"DrawAI example requires `pip install panelini[ai,ai-drawio]`."*

If sentiment during implementation favors folding into `[ai]`, that's a trivial change — the extra split is a YAGNI hedge, not a load-bearing decision.

## Error handling

All user-facing; either surfaced in the chat log (model-driven) or inline in `alert_pane` (handler-driven). No silent retries, no partial state mutations.

| Failure | Where caught | Handling |
|---|---|---|
| PNG without `mxfile` `tEXt` chunk | `on_upload` | `alert_pane` → *"Not a drawio PNG — try a file exported from drawio."*. State untouched. |
| `.drawio` bytes fail XML parse | `on_upload` | `alert_pane` → *"File is not valid XML: {error}."*. State untouched. |
| Unknown extension | `on_upload` | `alert_pane` → *"Unsupported extension. Use .drawio or .drawio.png."*. |
| `ANTHROPIC_API_KEY` missing | `BeautifyDrawioTool._arun` (Anthropic SDK raises on first call) | Return *"Anthropic API error: missing ANTHROPIC_API_KEY."* to the chat model. |
| Anthropic API error (network, rate limit, auth, timeout) | `BeautifyDrawioTool._arun` | Return the error string verbatim to the chat model; it can retry or surface it to the user. |
| Model output is non-XML | `BeautifyDrawioTool._arun` | Return *"Returned content did not parse as XML. Parse error: {e}. Please try again."* — chat model naturally retries. |
| Beautify called with no file loaded | `BeautifyDrawioTool._arun` | Return *"No file loaded. Ask the user to upload a .drawio or .drawio.png first."*. |
| Download clicked with no beautification | Disabled via `param.watch` on `beautified_xml`; handler never fires. | N/A |

A failed beautify leaves `state.beautified_xml` untouched — the bottom pane continues showing the last successful result (or stays empty if none).

## Testing

**Fixtures** live at `tests/panels/ai/fixtures/drawai/` and describe the *scenario*, not the source project's demo files:

- `diagram.drawio.png` — a minimal valid drawio PNG (a single `<mxCell>` with a rectangle). Used by happy-path extract/embed/UI tests.
- `diagram.drawio` — raw XML matching the PNG's embedded XML. Used for the `.drawio` input path test.
- `corrupt.drawio.png` — a plain PNG with no `mxfile` chunk. Used for the upload-error test.
- `malformed.drawio` — invalid XML. Used for the parse-failure test.

Fixtures are generated deterministically by a committed script at `tests/panels/ai/fixtures/drawai/_make_fixtures.py`. The script is runnable (`python _make_fixtures.py`) to regenerate the binary assets; CI does not re-run it — the generated files are committed directly.

The `local/fig*.drawio.png` files remain dev-only demo material; the test suite never reads them.

**Unit tests** — [tests/panels/ai/test_drawai_helpers.py](../../../tests/panels/ai/test_drawai_helpers.py):

- `extract_xml_from_drawio_png(diagram.drawio.png)` → XML whose root tag is `mxfile` or `mxGraphModel`.
- Round-trip: `extract(embed(orig, extract(orig))) == extract(orig)`. Byte-equality of the PNG is not asserted (chunk ordering may differ across Pillow versions).
- `validate_drawio_xml` — one pass, one fail.
- `extract_xml_from_drawio_png(corrupt.drawio.png)` → raises; assert error type.

**UI tests** — [tests/panels/ai/test_drawai_ui.py](../../../tests/panels/ai/test_drawai_ui.py), marked `ui` + `ai`, following the Playwright pattern from commit `a391172`:

- Add a `_mock_anthropic_sdk` fixture that stubs `anthropic.AsyncAnthropic.messages.create` to return a canned "beautified" XML. Reuse the existing `_mock_langchain` fixture for the chat model. Both live in [tests/conftest.py](../../../tests/conftest.py).
- Upload `diagram.drawio.png` via the `FileInput` → assert top pane renders (image or iframe, by locator).
- Send chat message *"make it cleaner"* → assert bottom pane iframe `src` contains the base64-/url-encoded canned XML.
- Assert download button transitions `disabled` → `enabled` after the beautification step.
- Upload `corrupt.drawio.png` → assert `alert_pane` is visible with the expected message.

Run target: keep the new UI tests under ~5 s combined (current AI UI tests run in ~6 s total).

## File layout summary

New files:

- `examples/panels/ai/drawai_beautify.py` — the example (~250-350 LOC expected).
- `tests/panels/ai/test_drawai_helpers.py`
- `tests/panels/ai/test_drawai_ui.py`
- `tests/panels/ai/fixtures/drawai/diagram.drawio.png`
- `tests/panels/ai/fixtures/drawai/diagram.drawio`
- `tests/panels/ai/fixtures/drawai/corrupt.drawio.png`
- `tests/panels/ai/fixtures/drawai/malformed.drawio`

Modified files:

- `pyproject.toml` — add `[ai-drawio]` optional extra (`anthropic>=0.39`, `pillow>=10.0`).
- `tests/conftest.py` — add `_mock_anthropic_sdk` fixture.
- `examples/panels/ai/README.md` (or `examples/README.md`, whichever is canonical) — add a "DrawAI example" section with install + run instructions.

No changes to `src/panelini/panels/ai/`.

## Follow-ups (explicitly out of scope for v1)

- Promote to a panel module at `src/panelini/panels/drawai/` with its own frontend/backend split.
- `.drawio.svg` input/output.
- Drag-and-drop upload (Panel's `FileInput` supports it natively; v1 uses the default click-to-upload to keep the example short).
- Preset intent buttons (`polish`, `realign`, `recolor`, `restructure`).
- Side-by-side XML diff view as an optional third pane.
- Re-rasterization via a drawio CLI so downloaded PNGs have matching pixels.
- `postMessage`-based viewer integration to remove the URL-length limit on very large diagrams.
- Sphinx docs page reusing the layout diagram above, under [docs/panels/](../../panels/).
