# AI Plot-by-Code Example Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** implemented (2026-04-24). Retained as a retrospective - future audits can walk this plan against the committed code.

**Goal:** Ship a first-class `src/panelini/panels/ai/plot/` subpackage + a runnable `examples/panels/ai/plot_by_code.py` that wires the existing `AiChat` to a `PlotPanel` via 3–5 plotting tools and 0–8 OSW connector tools. Sandbox execution via `llm_sandbox` (Docker `python:3.12-slim`). OSW tools degrade gracefully when the `osw` package is missing or when the four `OSW_*`/`BLAZEGRAPH_*` env vars aren't set. No changes to `src/panelini/panels/ai/{frontend,backend}.py`.

**Architecture:** `PlotPanel` owns mutable plot state + a `pn.pane.Image`; it runs code inside `SandboxSession`, copies `/sandbox/output.png` back, validates with PIL, and updates the image. `make_plot_tools(panel)` returns 3 delegation `BaseTool`s plus (if `osw` importable) 2 more OSW-plot tools. `make_osw_tools()` returns 0 or 8 stateless `BaseTool`s gated by `osw_env_present()`. Mypy cleanliness without a global override via a local `TYPE_CHECKING: Any` boundary in every file that imports `osw.*`. Example composes everything: `tools = [*make_plot_tools(plot_panel), *make_osw_tools()]`, then `AiChat(system_message=..., tools=tools)`.

**Tech Stack:** Python 3.10+, existing `panel`, `param`, `langchain-core`, pydantic v2; new transitive deps `llm-sandbox>=0.2`, `pillow>=10.0` (via existing `[ai-llm-sandbox]` extra) and `osw>=1.0`, `SPARQLWrapper>=2.0` (via new `[ai-osw]` extra). pytest + monkeypatch + `unittest.mock.patch` for tests - no Docker or OSW endpoint required.

**Spec:** [docs/superpowers/specs/2026-04-24-ai-plot-by-code-example-design.md](../specs/2026-04-24-ai-plot-by-code-example-design.md)

---

## File Structure

| File | Responsibility | Status |
|---|---|---|
| `pyproject.toml` | Add `[ai-osw]` optional extra; add `osw>=1.0.1` to `dev` group | modify |
| `src/panelini/panels/ai/plot/__init__.py` | Re-export `PlotPanel`, `make_plot_tools`, `make_osw_tools` | create |
| `src/panelini/panels/ai/plot/panel.py` | `PlotPanel` class: sandbox + `pn.pane.Image` + state | create |
| `src/panelini/panels/ai/plot/utils/__init__.py` | Empty re-export shim | create |
| `src/panelini/panels/ai/plot/utils/sandbox.py` | `resolve_file_path`, `copy_files_to_sandbox`, MICRESS pairing | create |
| `src/panelini/panels/ai/plot/utils/osw_env.py` | `OSW_ENV_VARS`, `osw_env_present()` | create |
| `src/panelini/panels/ai/plot/tools/__init__.py` | Empty re-export shim | create |
| `src/panelini/panels/ai/plot/tools/plot_tools.py` | 3 delegation tools + `make_plot_tools()` factory | create |
| `src/panelini/panels/ai/plot/tools/osw_plot_tools.py` | 2 OSW-plot tools (lazy-imported by plot_tools) | create |
| `src/panelini/panels/ai/plot/tools/osw_tools.py` | 8 stateless OSW tools + `make_osw_tools()` factory | create |
| `examples/panels/ai/plot_by_code.py` | Wire `AiChat` + `PlotPanel`, serve on port 5008 | create |
| `examples/panels/ai/README.md` | One-line entry describing the new example | modify |
| `tests/panels/ai/plot/__init__.py` | Make test folder a package | create |
| `tests/panels/ai/plot/test_sandbox_utils.py` | Unit tests for `sandbox.py` helpers | create |
| `tests/panels/ai/plot/test_osw_env.py` | Unit tests for env-var gating | create |
| `tests/panels/ai/plot/test_plot_panel.py` | `PlotPanel` tests with mocked `SandboxSession` | create |
| `tests/panels/ai/plot/test_plot_tools.py` | Delegation + factory tests | create |
| `tests/panels/ai/plot/test_osw_plot_tools.py` | OSW-plot tool tests with patched osw modules | create |
| `tests/panels/ai/plot/test_osw_tools.py` | OSW connector tool tests with patched SPARQL/OSW | create |

---

## Task 1: Add `ai-osw` optional extra and dev dep

**Files:**
- Modify: `pyproject.toml`

- [x] **Step 1: Add the extra**

In `[project.optional-dependencies]`, below `ai-llm-sandbox = [...]`:

```toml
ai-osw = [
    "osw>=1.0",
    "SPARQLWrapper>=2.0",
    "pandas>=2.0.0",
    "python-dotenv>=1.0.0",
]
```

- [x] **Step 2: Add `osw` to the dev group**

Run:
```bash
uv add --dev 'osw>=1.0.1'
```

This adds `osw` to `[dependency-groups.dev]` and lets mypy resolve `from osw.*` imports during local checks.

- [x] **Step 3: Sync**

```bash
uv sync --extra ai --extra ai-llm-sandbox --extra ai-osw --group dev
```

Expected: no resolver errors; `osw` and `SPARQLWrapper` are importable.

- [x] **Step 4: Commit**

```bash
git add pyproject.toml uv.lock
git commit -m "deps: add ai-osw optional extra and osw dev dep"
```

---

## Task 2: Port `sandbox.py` helpers (utils/)

**Files:**
- Create: `src/panelini/panels/ai/plot/utils/__init__.py`
- Create: `src/panelini/panels/ai/plot/utils/sandbox.py`
- Create: `tests/panels/ai/plot/__init__.py`
- Create: `tests/panels/ai/plot/test_sandbox_utils.py`

- [x] **Step 1: Write failing tests**

Create `tests/panels/ai/plot/test_sandbox_utils.py` covering:
- `resolve_file_path` prefers an absolute existing path, falls back to `download_dir`, then `data_dir`, then returns the original string.
- `copy_files_to_sandbox` calls `session.copy_to_runtime(src, dest)` once per file.
- MICRESS pairing: a `foo.geof` + `foo.conc1` pair both land, with the geometry file renamed to match the binary's stem (`foo.geoF`).

Use a `MagicMock()` for the session and `tmp_path` + real writes for the path-resolution tests.

- [x] **Step 2: Run - expect ImportError (module missing)**

- [x] **Step 3: Create `utils/sandbox.py`**

Port `_resolve_file_path`, `_copy_files_to_sandbox`, `_MICRESS_BIN_EXTS`, `_MICRESS_GEO_EXTS` from `migration/agent.py:48-102`. Refinement: `resolve_file_path` takes `download_dir` + `data_dir` as explicit args instead of reading `osw.express`-provided globals. Pure helpers only; no env reads at import time.

- [x] **Step 4: Run tests - expect PASS**

- [x] **Step 5: Commit**

```bash
git add src/panelini/panels/ai/plot/utils/ tests/panels/ai/plot/__init__.py tests/panels/ai/plot/test_sandbox_utils.py
git commit -m "feat(plot): sandbox helpers ported from migration/ with tests"
```

---

## Task 3: `osw_env.py` (utils/)

**Files:**
- Create: `src/panelini/panels/ai/plot/utils/osw_env.py`
- Create: `tests/panels/ai/plot/test_osw_env.py`

- [x] **Step 1: Write failing test**

Assertions:
- `OSW_ENV_VARS` tuple equals `("OSW_DOMAIN", "BLAZEGRAPH_ENDPOINT", "BLAZEGRAPH_USER", "BLAZEGRAPH_PASSWORD")`.
- `osw_env_present()` is `True` only when all four are set to non-empty strings.
- Any single variable missing or empty → `False`.

Drive via `monkeypatch.setenv` / `monkeypatch.delenv`.

- [x] **Step 2: Run - expect ImportError**

- [x] **Step 3: Implement `osw_env.py`**

Centralizes the gating decision so both `make_osw_tools()` and future OSW-dependent code share one source of truth.

- [x] **Step 4: Run - expect PASS**

- [x] **Step 5: Commit**

```bash
git add src/panelini/panels/ai/plot/utils/osw_env.py tests/panels/ai/plot/test_osw_env.py
git commit -m "feat(plot): osw_env_present() helper + tests"
```

---

## Task 4: `PlotPanel` class

**Files:**
- Create: `src/panelini/panels/ai/plot/panel.py`
- Create: `src/panelini/panels/ai/plot/__init__.py`
- Create: `tests/panels/ai/plot/test_plot_panel.py`

- [x] **Step 1: Write failing tests**

Mock `SandboxSession` so Docker is never touched. Key test shape:

```python
@patch("panelini.panels.ai.plot.panel.SandboxSession")
def test_plot_by_code_success(mock_session_cls, tmp_path):
    mock_session = MagicMock()
    mock_session.__enter__.return_value = mock_session
    mock_session.run.return_value.stdout = "ok"

    def fake_copy_from_runtime(src, dest):
        # Write a tiny valid PNG so PIL.Image.open succeeds
        Image.new("RGB", (1, 1)).save(dest, "PNG")

    mock_session.copy_from_runtime.side_effect = fake_copy_from_runtime
    mock_session_cls.return_value = mock_session

    panel = PlotPanel(data_path=tmp_path)
    result = panel.plot_by_code(code="import matplotlib ...")

    assert "Image successfully plotted" in result
    assert panel.current_python_code is not None
    assert panel.output_file_path.exists()
    assert panel.image_panel.object == str(panel.output_file_path)
```

Additional tests: error path when `copy_from_runtime` raises, `run_code` returns stdout, `load_data_from_csv` populates `self.df` and returns column names.

- [x] **Step 2: Run - expect failures**

- [x] **Step 3: Implement `panel.py`**

Port `PlotToolPanel` from `migration/agent.py:326-616`, stripping langchain-agent coupling. Keep `pn.pane.Image` + `plot_panel` Row + mutable state (`current_python_code`, `current_input_osw_id`, `output_file_path`, `df`). Public methods: `plot_by_code`, `run_code`, `load_data_from_csv`. Do NOT carry `generate_langchain_tools()` - that lives in `plot_tools.py`.

- [x] **Step 4: Create package `__init__.py`** that re-exports `PlotPanel`:

```python
from .panel import PlotPanel
__all__ = ["PlotPanel"]
```

(Remaining exports added in Task 5 and Task 7.)

- [x] **Step 5: Run tests - expect PASS**

- [x] **Step 6: Commit**

```bash
git add src/panelini/panels/ai/plot/panel.py src/panelini/panels/ai/plot/__init__.py tests/panels/ai/plot/test_plot_panel.py
git commit -m "feat(plot): PlotPanel class with sandbox plot_by_code/run_code/load_csv"
```

---

## Task 5: Three plot delegation tools + factory

**Files:**
- Create: `src/panelini/panels/ai/plot/tools/__init__.py`
- Create: `src/panelini/panels/ai/plot/tools/plot_tools.py`
- Create: `tests/panels/ai/plot/test_plot_tools.py`
- Modify: `src/panelini/panels/ai/plot/__init__.py` - add `make_plot_tools`

- [x] **Step 1: Write failing tests**

Tests:
- Each of `PlotByCodeTool`, `RunCodeTool`, `LoadCsvTool`'s `_run` calls through to the matching `PlotPanel` method with the expected kwargs (use a `MagicMock` panel).
- `make_plot_tools(panel)` returns `[PlotByCodeTool, RunCodeTool, LoadCsvTool]` when `osw_plot_tools` cannot be imported (simulate by `monkeypatch.setitem(sys.modules, "panelini.panels.ai.plot.tools.osw_plot_tools", None)` - produces ImportError on subsequent relative-import).
- `make_plot_tools(panel)` includes `AttachPlotToOswTool` + `DocumentEvaluationTool` when `osw_plot_tools` imports successfully (this path is exercised fully in Task 6).

- [x] **Step 2: Run - expect failures**

- [x] **Step 3: Implement `plot_tools.py`**

Port `PlotByCodeInput`, `RunCodeInput`, `LoadDataFromCsvInput` from `migration/agent.py:224-323`, migrating from `pydantic.v1` to pydantic v2. Each `BaseTool` subclass declares `model_config = ConfigDict(arbitrary_types_allowed=True)` so `panel: PlotPanel` type-checks. `_arun` delegates to `_run`.

`make_plot_tools` body:

```python
def make_plot_tools(panel: PlotPanel) -> list[BaseTool]:
    tools: list[BaseTool] = [
        PlotByCodeTool(panel=panel),
        RunCodeTool(panel=panel),
        LoadCsvTool(panel=panel),
    ]
    try:
        from .osw_plot_tools import AttachPlotToOswTool, DocumentEvaluationTool
    except ImportError:
        return tools
    tools.extend([AttachPlotToOswTool(panel=panel), DocumentEvaluationTool(panel=panel)])
    return tools
```

- [x] **Step 4: Update `src/panelini/panels/ai/plot/__init__.py`**:

```python
from .panel import PlotPanel
from .tools.plot_tools import make_plot_tools
__all__ = ["PlotPanel", "make_plot_tools"]
```

- [x] **Step 5: Run tests - expect PASS**

- [x] **Step 6: Commit**

```bash
git add src/panelini/panels/ai/plot/tools/ src/panelini/panels/ai/plot/__init__.py tests/panels/ai/plot/test_plot_tools.py
git commit -m "feat(plot): 3 delegation tools + make_plot_tools factory"
```

---

## Task 6: OSW-plot tools (`osw_plot_tools.py`)

**Files:**
- Create: `src/panelini/panels/ai/plot/tools/osw_plot_tools.py`
- Create: `tests/panels/ai/plot/test_osw_plot_tools.py`

- [x] **Step 1: Write failing tests**

A `panel_with_png` fixture writes real PNG bytes to a `tmp_path` and points `panel.image_panel.object` at it. Success tests patch:
- `panelini.panels.ai.plot.tools.osw_plot_tools.OswExpress`
- `panelini.panels.ai.plot.tools.osw_plot_tools.OSW` (so `OSW.StoreEntityParam(...)` does not try to validate a real mock entity)
- `_build_wiki_file`, `get_full_title`, `model`

Cover: happy path for both tools; `osw_obj.load_entity` returns `None` (entity-not-found); `panel.image_panel.object is None` (missing-image path); arbitrary exception inside `_run` returns the error string.

- [x] **Step 2: Run - expect failures**

- [x] **Step 3: Implement `osw_plot_tools.py`**

Use the `TYPE_CHECKING: Any` boundary at the top:

```python
if TYPE_CHECKING:
    WikiFileController: Any = Any
    OSW: Any = Any
    model: Any = Any
    OswExpress: Any = Any
    get_full_title: Any = Any
else:
    from osw.controller.file.wiki import WikiFileController
    from osw.core import OSW, model
    from osw.express import OswExpress
    from osw.utils.wiki import get_full_title
```

Add an explanatory comment: *`osw` ships no `py.typed` marker upstream; trade-off visible in-source rather than hidden in a global mypy override.*

Port `AttachCurrentPlotToOswPageTool._run` and `DocumentCurrentEvaluationTool._run` from `migration/agent.py`. Use helpers `_load_plot_bytes(panel)` (reads `panel.image_panel.object`) and `_build_wiki_file(osw_obj, plot_uuid)`.

- [x] **Step 4: Run tests - expect PASS**

Verify that `make_plot_tools(panel)` now returns 5 tools (Task 5's "present" branch).

- [x] **Step 5: Commit**

```bash
git add src/panelini/panels/ai/plot/tools/osw_plot_tools.py tests/panels/ai/plot/test_osw_plot_tools.py
git commit -m "feat(plot): AttachPlotToOsw + DocumentEvaluation tools (lazy)"
```

---

## Task 7: Eight stateless OSW connector tools (`osw_tools.py`)

**Files:**
- Create: `src/panelini/panels/ai/plot/tools/osw_tools.py`
- Create: `tests/panels/ai/plot/test_osw_tools.py`
- Modify: `src/panelini/panels/ai/plot/__init__.py` - add `make_osw_tools`

- [x] **Step 1: Write failing tests**

Fixtures:
```python
@pytest.fixture
def osw_env(monkeypatch):
    monkeypatch.setenv("OSW_DOMAIN", "example.org")
    monkeypatch.setenv("BLAZEGRAPH_ENDPOINT", "https://bg.example/sparql")
    monkeypatch.setenv("BLAZEGRAPH_USER", "u")
    monkeypatch.setenv("BLAZEGRAPH_PASSWORD", "p")

@pytest.fixture
def no_osw_env(monkeypatch):
    for var in ("OSW_DOMAIN", "BLAZEGRAPH_ENDPOINT", "BLAZEGRAPH_USER", "BLAZEGRAPH_PASSWORD"):
        monkeypatch.delenv(var, raising=False)
```

Tests:
- Pure helpers: `_replace_special_characters`, `_check_for_uuid`, `_try_cast_str_to_uuid` - happy + edge cases.
- `make_osw_tools()` returns `[]` under `no_osw_env`; returns 8 tools under `osw_env`.
- Each tool's `_run`: one success + one exception path. For SPARQL tools, patch `SPARQLWrapper.SPARQLWrapper` so `fake.query.return_value.convert.return_value = {"results": {"bindings": []}}`. Assert the executed query contains expected SPARQL fragments (e.g. `rdfs:subClassOf+`).
- `DownloadOslFileTool` patches `osw_download_file` to write a fake file to `"fake-path/downloaded.csv"`.

- [x] **Step 2: Run - expect failures**

- [x] **Step 3: Implement `osw_tools.py`**

Same `TYPE_CHECKING: Any` boundary as `osw_plot_tools.py`. Port the 8 tools from `migration/osw_tools.py`, preserving SPARQL query strings verbatim.

Pure helpers:
- `_UUID_RE` regex
- `_replace_special_characters(s, replacer=" ")`
- `_check_for_uuid(s)`
- `_try_cast_str_to_uuid(s)` - accepts either a canonical UUID or an OSW-id tail
- `_sparql_prefixes(domain)` - returns PREFIX declarations
- `_run_sparql(query)` - reads `BLAZEGRAPH_*` env vars, returns JSON
- `_osw_id_to_uuid(osw_id)` - extract UUID from `File:OSW<hex>.csv`

`make_osw_tools()`:

```python
def make_osw_tools() -> list[BaseTool]:
    if not osw_env_present():
        return []
    return [
        GetPageHtmlTool(), DownloadOslFileTool(), GetFileHeaderTool(),
        SparqlSearchTool(), FindOutEverythingAboutTool(),
        GetTopicTaxonomyTool(), GetInstancesTool(), GetWebsiteHtmlTool(),
    ]
```

Notes:
- Do NOT create a module-level `OswExpress(os.environ["OSW_DOMAIN"])`. Each tool constructs its own inside `_run` so env-var changes mid-session take effect.
- For `GetWebsiteHtmlTool`, annotate `html_bytes: bytes = page.read()` then `return html_bytes.decode("utf-8")` so mypy doesn't see `Any`.

- [x] **Step 4: Update `src/panelini/panels/ai/plot/__init__.py`**:

```python
from .panel import PlotPanel
from .tools.osw_tools import make_osw_tools
from .tools.plot_tools import make_plot_tools
__all__ = ["PlotPanel", "make_osw_tools", "make_plot_tools"]
```

- [x] **Step 5: Run tests - expect PASS**

- [x] **Step 6: Run mypy + ruff on the new subpackage**

```bash
uv run ruff check src/panelini/panels/ai/plot tests/panels/ai/plot
uv run mypy src/panelini/panels/ai/plot
```

Expected: both clean. No global `[[tool.mypy.overrides]]` needed - the `TYPE_CHECKING: Any` boundary handles the untyped `osw` import locally.

- [x] **Step 7: Commit**

```bash
git add src/panelini/panels/ai/plot/tools/osw_tools.py src/panelini/panels/ai/plot/__init__.py tests/panels/ai/plot/test_osw_tools.py
git commit -m "feat(plot): 8 stateless OSW connector tools + make_osw_tools factory"
```

---

## Task 8: The example file

**Files:**
- Create: `examples/panels/ai/plot_by_code.py`

- [x] **Step 1: Write the example**

Top-of-file docstring contains, in this order:

1. **Env vars** - LLM: `ANTHROPIC_API_KEY` OR (`AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_VERSION`). OSW (optional): `OSW_DOMAIN`, `BLAZEGRAPH_ENDPOINT`, `BLAZEGRAPH_USER`, `BLAZEGRAPH_PASSWORD`. Panelini: `PANELINI_AI_CONFIG_PATH`.
2. **Install hints** - `pip install panelini[ai,ai-llm-sandbox]` (core) / `pip install panelini[ai,ai-llm-sandbox,ai-osw]` (with OSW).
3. **Runtime requirements** - Docker daemon running; `.env` loaded via `python-dotenv`.
4. **OSW connector behaviour** - registered only when all four OSW env vars are set; otherwise silently omitted.

Body:

```python
from __future__ import annotations

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat
from panelini.panels.ai.plot import PlotPanel, make_osw_tools, make_plot_tools

load_dotenv()

SYSTEM_MESSAGE = (
    "You are a helpful assistant with access to tools. "
    "ALWAYS call tools directly to fulfill the user's request - never describe "
    "what a tool call would look like or output JSON of a hypothetical call. "
    ...  # MICRESS/micpy guidance ported from migration/agent.py:636-656
)

plot_panel = PlotPanel()
tools = [*make_plot_tools(plot_panel), *make_osw_tools()]

chat = AiChat(system_message=SYSTEM_MESSAGE, tools=tools)

app = Panelini(title="AI + Plot by Code", sidebar_enabled=True)
app.sidebar_set(objects=chat.sidebar_objects)
app.main_set(objects=[pn.Row(chat.main_objects[0], plot_panel.plot_panel)])


if __name__ == "__main__":
    pn.serve(app.servable(), title="AI + Plot by Code", port=5008)
```

Port the MICRESS/micpy block from `migration/agent.py:636-656` verbatim into `SYSTEM_MESSAGE`. That is the one piece of agent prompt from the legacy code worth preserving.

- [x] **Step 2: Smoke-test the import**

```bash
uv run python -c "from examples.panels.ai import plot_by_code as m; print(type(m.app).__name__)"
```

Expected: `Panelini`.

- [x] **Step 3: Runtime smoke (manual)**

- `docker ps` confirms Docker daemon is up.
- `export ANTHROPIC_API_KEY=...` (or the Azure trio).
- `python examples/panels/ai/plot_by_code.py` → sidebar shows plot tool checkboxes.
- Prompt *"plot y = sin(x) for x in 0..2π, save to /sandbox/output.png"* → image renders.

If OSW env vars are set, sidebar additionally shows the 8 OSW tools.

- [x] **Step 4: Commit**

```bash
git add examples/panels/ai/plot_by_code.py
git commit -m "feat(example): plot_by_code example wires AiChat + PlotPanel"
```

---

## Task 9: README entry

**Files:**
- Modify: `examples/panels/ai/README.md`

- [x] **Step 1: Add bullet**

Append to the top-of-file bullet list:

```markdown
- `plot_by_code.py` - AI chat that renders matplotlib figures via `llm-sandbox` (Docker) in a `PlotPanel` next to the chat; optional OSW connector tools when `OSW_DOMAIN` + Blazegraph env vars are set.
```

- [x] **Step 2: Commit**

```bash
git add examples/panels/ai/README.md
git commit -m "docs(plot): README entry for plot_by_code example"
```

---

## Task 10: Final verification

**Files:** (none modified)

- [x] **Step 1: Full test suite**

```bash
uv run pytest tests/ -v
```

Expected: all tests PASS. The plot subpackage adds ~80 tests, all <2 s total.

- [x] **Step 2: Lint + typecheck across the configured scope**

```bash
uv run ruff check .
uv run mypy src
```

Expected: both clean.

- [x] **Step 3: Confirm no `src/panelini/panels/ai/{frontend,backend}.py` changes**

```bash
git diff --stat main -- src/panelini/panels/ai/frontend.py src/panelini/panels/ai/backend.py
```

Expected: no output. Core chat panel is untouched.

- [x] **Step 4: Confirm `[[tool.mypy.overrides]]` was NOT added**

```bash
grep -n "tool.mypy.overrides" pyproject.toml || echo "no override - good"
```

Expected: `no override - good`. The `TYPE_CHECKING: Any` boundary handles the untyped `osw` import locally.

- [x] **Step 5: Done - ready for review.**

---

## Task 11: v1.1 - Right-sidebar plot-model override (implemented 2026-04-24)

**Goal:** Let the user pick a model (default Sonnet 4.6) just for rewriting the current plot script, without disturbing the main chat loop or the `plot_by_code` tool signature. See the v1.1 addendum in the {ref}`spec <v1-1-addendum-right-sidebar-plot-model-override>` for rationale.

**Files:**
- Create: `src/panelini/panels/ai/plot/model_selector.py`
- Create: `tests/panels/ai/plot/test_model_selector.py`
- Modify: `src/panelini/panels/ai/plot/panel.py` - `on_plot(fn)` hook + `_fire_plot_callbacks()`
- Modify: `src/panelini/panels/ai/plot/__init__.py` - re-export `build_plot_context_sidebar`, `regenerate_plot`
- Modify: `tests/panels/ai/plot/test_plot_panel.py` - 4 new `TestOnPlotCallback` tests
- Modify: `examples/panels/ai/plot_by_code.py` - enable right sidebar + wire the card

- [x] **Step 1: TDD the `on_plot` hook**

Add four failing tests to `test_plot_panel.py`: callback fires on success, on error, multiple callbacks all fire, callback-raises does not break `plot_by_code`. Implement by adding `_on_plot_callbacks: list[Callable[[], None]] = []`, `on_plot(fn)`, `_fire_plot_callbacks()` (wraps each call in `contextlib.suppress(Exception)`), and calling `_fire_plot_callbacks()` after the try/except/else in `plot_by_code` regardless of outcome.

- [x] **Step 2: TDD `pick_default_plot_model` + `strip_code_fences`**

Write tests asserting: (a) Sonnet 4.6 returned when present; (b) first model returned when not. For fence stripping: plain code passes through; ```python fences stripped; bare ``` fences stripped; leading/trailing whitespace tolerated.

- [x] **Step 3: TDD `regenerate_plot` + `build_plot_context_sidebar`**

Tests:
- `build_plot_context_sidebar` returns non-empty list.
- `build_plot_context_sidebar` registers a callback via `panel.on_plot`.
- `regenerate_plot` with `panel.current_python_code` set: patches `create_interface` so `interface.model.ainvoke` returns ``"```python\nprint('regen')\n```"``; asserts the code is fence-stripped, handed to `panel.plot_by_code`, and the result string comes back.
- `regenerate_plot` with no current code: returns a "no plot" / "no code" message without calling the LLM.

Use `monkeypatch` to set `ANTHROPIC_API_KEY` / `ANTHROPIC_ENDPOINT` etc. in an autouse fixture so `load_config` does not fail loading the default config at test time.

- [x] **Step 4: Implement `model_selector.py`**

Surface:

```python
_DEFAULT_PLOT_MODEL_NAME = "Claude Sonnet 4.6"
_REGEN_SYSTEM_MESSAGE = "You rewrite matplotlib plotting scripts … return ONLY Python …"

def pick_default_plot_model(provider: ProviderConfig) -> ModelConfig: ...
def strip_code_fences(text: str) -> str: ...
def regenerate_plot(panel, user_intent, *, provider=None, model=None, config_path=None) -> str: ...
def build_plot_context_sidebar(panel, config_path=None) -> list[pn.viewable.Viewable]: ...
```

`regenerate_plot` uses `asyncio.run` when no loop is live, otherwise submits `asyncio.run(_call())` to a worker thread - matching the pattern used elsewhere for Panel callbacks.

`build_plot_context_sidebar` returns a `[pn.Card(...)]` holding: Markdown code display (refreshed via `panel.on_plot`), `pn.widgets.Select` populated from the default provider, free-text intent input, "Regenerate plot" button, status Markdown.

- [x] **Step 5: Export from `plot/__init__.py`**

```python
from .model_selector import build_plot_context_sidebar, regenerate_plot
# keep existing PlotPanel / make_plot_tools / make_osw_tools exports
```

- [x] **Step 6: Wire the example**

```python
app = Panelini(
    title="AI + Plot by Code",
    sidebar_enabled=True,
    sidebar_right_enabled=True,
    sidebar_right_visible=True,
)
app.sidebar_set(objects=chat.sidebar_objects)
app.sidebar_right_set(objects=build_plot_context_sidebar(plot_panel))
app.main_set(objects=[pn.Row(chat.main_objects[0], plot_panel.plot_panel)])
```

Docstring gets a new "Right sidebar - plot model override" section explaining that the chat still drives primary plotting and the sidebar is a user-triggered one-shot override.

- [x] **Step 7: Verify - full plot test suite + lint**

```bash
uv run pytest tests/panels/ai/plot/ -v
uv run ruff check src/panelini/panels/ai/plot tests/panels/ai/plot examples/panels/ai/plot_by_code.py
```

Expected: 107 passing (was 93: +4 on_plot + 10 model_selector − 0 broken); ruff clean.

- [ ] **Step 8: Commit**

```bash
git add src/panelini/panels/ai/plot/model_selector.py src/panelini/panels/ai/plot/__init__.py \
        src/panelini/panels/ai/plot/panel.py \
        tests/panels/ai/plot/test_model_selector.py tests/panels/ai/plot/test_plot_panel.py \
        examples/panels/ai/plot_by_code.py \
        docs/superpowers/specs/2026-04-24-ai-plot-by-code-example-design.md \
        docs/superpowers/plans/2026-04-24-ai-plot-by-code-example.md
git commit -m "feat(plot): right-sidebar plot-model override with Regenerate button"
```

---

## Task 12 - OSW credentials from env vars (no prompt, no yaml)

Goal: make the OSW tools runnable in a Panel server context without ever triggering `osw.express.OswExpress`'s interactive credential prompt or writing `osw_files/accounts.pwd.yaml`. Reference design: spec v1.2 section.

- [x] **Step 1: Read the `osw.express.OswExpress.__init__` gate**

Confirm the prompt-and-save branch is gated behind `if not cred_mngr.iri_in_file(domain)`. The override target is therefore `iri_in_file`, not `get_credential` - overriding only the probe is enough to disable both the prompt and the disk write in one change.

- [x] **Step 2: Add `utils/osw_env.py`**

Ship `OSW_AUTH_ENV_VARS`, extended `OSW_ENV_VARS`, `check_osw_auth_env()` (raises `RuntimeError` listing missing vars), `EnvCredentialManager` (subclass with `iri_in_file` override), and `build_osw_express(domain=None)` that pre-loads the manager with a `UserPwdCredential` before handing it to `OswExpress`.

- [x] **Step 3: TDD tests for `osw_env`**

`tests/panels/ai/plot/test_osw_env.py`:

- `TestOswEnvPresent` (4 tests)
- `TestOswEnvVarsConstant` (2 tests)
- `TestCheckOswAuthEnv` (5 tests - raises with actionable message)
- `TestEnvCredentialManager` (3 tests - override returns True after `add_credential`)
- `TestBuildOswExpress` (3 tests - patched `OswExpress`, assert kwargs)
- `TestNoCredentialsFileWritten::test_save_credentials_to_file_is_not_invoked` - the contract test. Patches `osw.express.requests.get` and `osw.express.WtSite`, runs the real `OswExpress.__init__`, asserts `save_credentials_to_file` + `get_credential` were not called and `accounts.pwd.yaml` does not exist in `tmp_path`.

- [x] **Step 4: Rewire all `OswExpress(...)` callsites**

Replace the 5 callsites across `osw_plot_tools.py` (2) and `osw_tools.py` (1) with `build_osw_express()`. `DownloadOslFileTool` swaps `osw_download_file(...)` for `osw_obj.download_file(...)` so the `cred_mngr` actually flows through. Drop `os`, `OswExpress`, and `osw_download_file` imports from the tool modules.

- [x] **Step 5: Update tool tests to patch `build_osw_express`**

Replace `patch(f"{module}.OswExpress", ...)` with `patch(f"{module}.build_osw_express", ...)` in `test_osw_tools.py` + `test_osw_plot_tools.py`. For `DownloadOslFileTool`, the patched helper returns a MagicMock whose `.download_file(...)` returns the fake file. Add `OSW_USER` + `OSW_PASSWORD` to the shared `osw_env` fixture so `check_osw_auth_env()` doesn't raise inside the tool runs.

- [x] **Step 6: Docs**

- `examples/panels/ai/plot_by_code.py` - add the three auth env vars to the OSW block, plus a paragraph on the "stays in memory, no yaml, no prompt" contract.
- `examples/panels/ai/README.md` - update the one-liner to say "six env vars" and call out in-memory credentials.
- Spec file - v1.2 addendum (motivation, design, contract table, files touched, trade-offs).

- [ ] **Step 7: Verify**

```bash
uv run pytest tests/panels/ai/plot/ -v
uv run ruff check src/panelini/panels/ai/plot tests/panels/ai/plot
```

Expected: all plot tests pass including the 18 `test_osw_env` tests; ruff clean.

- [ ] **Step 8: Commit**

```bash
git add src/panelini/panels/ai/plot/utils/osw_env.py \
        src/panelini/panels/ai/plot/tools/osw_plot_tools.py \
        src/panelini/panels/ai/plot/tools/osw_tools.py \
        tests/panels/ai/plot/test_osw_env.py \
        tests/panels/ai/plot/test_osw_tools.py \
        tests/panels/ai/plot/test_osw_plot_tools.py \
        examples/panels/ai/plot_by_code.py \
        examples/panels/ai/README.md \
        docs/superpowers/specs/2026-04-24-ai-plot-by-code-example-design.md \
        docs/superpowers/plans/2026-04-24-ai-plot-by-code-example.md
git commit -m "feat(plot): env-var OSW credentials - no prompt, no yaml on disk"
```

---

## Open follow-ups (explicitly out of scope for this plan)

- Lazy-import the eight `osw_tools.py` tools inside `make_osw_tools()` so `from panelini.panels.ai.plot import make_osw_tools` does not raise when the `osw` package is absent. Matches the pattern used for `osw_plot_tools`.
- Reusable `PLOT_SYSTEM_MESSAGE` constant when a second consumer appears.
- Sphinx docs page at `docs/panels/ai.md` covering the panel + the layout diagram from the spec.
- Sandbox-log tab next to the plot for debugging long-running snippets.
- Drop the `TYPE_CHECKING: Any` boundary when upstream `osw` ships `py.typed`.
- Let the regenerate sidebar pick the provider too (currently pinned to the default provider). Useful once `config.yml` commonly has more than one provider configured.
- Preserve the previous *N* plot scripts in the right sidebar so the user can diff regeneration attempts.
