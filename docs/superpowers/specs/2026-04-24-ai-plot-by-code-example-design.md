# AI Plot-by-Code example (v1 design)

**Status:** implemented
**Date:** 2026-04-24
**Scope:** a first-class panel subpackage at `src/panelini/panels/ai/plot/` plus a runnable example at `examples/panels/ai/plot_by_code.py`. The subpackage exposes a `PlotPanel` + two tool-factory functions (`make_plot_tools`, `make_osw_tools`) that plug into the existing `AiChat` unchanged.

---

## Goals

- Migrate the legacy `migration/agent.py` + `migration/osw_tools.py` integration (built on a bespoke `HistoryToolAgent` + `AgentExecutor`) onto panelini's existing [AiChat](../../../src/panelini/panels/ai/frontend.py) backend. No new chat framework.
- Ship a self-contained example at [examples/panels/ai/plot_by_code.py](../../../examples/panels/ai/plot_by_code.py) that lets a user ask for a matplotlib plot, runs the generated code in a `python:3.12-slim` Docker sandbox via `llm_sandbox`, and renders the resulting PNG in a panel to the right of the chat.
- Register up to **5 plotting tools** (`plot_by_code`, `run_code`, `load_data_from_csv`, `attach_current_plot_to_osw_page`, `document_current_evaluation`) plus **8 OSW connector tools** (`get_page_html`, `download_osl_file`, `sparql_search`, `find_out_everything_about`, `get_topic_taxonomy`, `get_instances`, `get_file_header`, `get_website_html`). All 13 are optional depending on which extras are installed and which env vars are set.
- **Graceful degradation**: the example must run end-to-end when Docker + an LLM API key are the only prerequisites. Missing `osw` package → drop the two OSW-plot tools. Missing OSW env vars → drop the eight stateless OSW tools. No ImportError on `pip install 'panelini[ai,ai-llm-sandbox]'` alone.
- **Honest typing story**: the upstream `osw` package ships no `py.typed` marker. Solve the mypy side of this without a global `[[tool.mypy.overrides]] ignore_missing_imports = true` override - the trade-off must be visible in source.
- Reuse `AiChat` end-to-end (sidebar provider/model picker, chat history, streaming, tool bind via `model.bind_tools`). No changes to `src/panelini/panels/ai/frontend.py` or `backend.py`.

## Non-goals (v1)

- Not a replacement for `migration/osw_chatbot` coupling - `OswFrontendPanel`, `ChatFrontendWidget`, `call_client_side_tool` are dropped. Any future OSW-side widget integration comes from the OSW project, not panelini.
- No port of `HistoryToolAgent` / `AgentExecutor`. `AiBackend` already owns history + dispatch.
- No OSW file-upload UI widget in the example - plots are uploaded to OSW only when the chat model decides to call `attach_current_plot_to_osw_page` / `document_current_evaluation`.
- No `.drawio.svg` support (that is a different example, see [drawai-beautify spec](2026-04-17-drawai-beautify-example-design.md)).
- No in-browser Docker visualization - sandbox logs stay server-side; the user sees only the resulting PNG.
- No port of langchain v1 `pydantic.v1` schemas - input schemas are migrated to pydantic v2 to match [basic_tools.py](../../../src/panelini/panels/ai/tools/basic_tools.py).

## User flow

1. User runs `python examples/panels/ai/plot_by_code.py`.
2. Browser opens the Panelini page. Sidebar shows the standard `AiChat` controls (provider, model, tools, chat management). The tool list includes three or five plotting tools and zero or eight OSW tools depending on env.
3. User types *"plot y = sin(x) for x in 0..2π, save to /sandbox/output.png"*.
4. Chat model picks `plot_by_code`, passes a Python snippet. The tool delegates to `PlotPanel.plot_by_code(code, libraries=[...])`, which:
   - starts a `SandboxSession(lang="python", image="python:3.12-slim")`;
   - copies any listed files into `/sandbox/<BASENAME>`, pairing MICRESS `.geof` with `.conc1` binaries;
   - runs the code, copies `/sandbox/output.png` back to `data/outputs/output.png`;
   - validates with `PIL.Image.open` (catches non-PNG output);
   - points `pn.pane.Image` at the path.
5. PNG appears in the right pane. Chat answers with the sandbox stdout.
6. User iterates ("make it dashed red"). Each successful call overwrites `output.png`.
7. Optional: if OSW env vars + `osw` are available, chat can upload the current plot and attach it to an OSW page via `attach_current_plot_to_osw_page`.

## Architecture

### Layout

```text
┌─ Panelini header ─────────────────────────────────────────────────┐
├─ Sidebar ──────┬─ Main ────────────────────────────────────────── ┤
│ (from AiChat:  │ ┌─ Chat (left) ──┐ ┌─ Plot (right) ───────────┐ │
│  provider,     │ │                │ │                          │ │
│  model,        │ │  ChatInterface │ │  pn.pane.Image           │ │
│  tools,        │ │  (streaming,   │ │  (rendered from          │ │
│  chat mgmt)    │ │   history)     │ │   data/outputs/          │ │
│                │ │                │ │   output.png)            │ │
│                │ │                │ │                          │ │
│                │ └────────────────┘ └──────────────────────────┘ │
└────────────────┴──────────────────────────────────────────────────┘
```

- Outer: `Panelini(title="AI + Plot by Code", sidebar_enabled=True)`.
- Sidebar: `AiChat.sidebar_objects` passed through unchanged.
- Main: `pn.Row(chat.main_objects[0], plot_panel.plot_panel)` - no custom widgets, no extra cards. The `PlotPanel` IS the right column.

### Package layout

```
src/panelini/panels/ai/plot/
├── __init__.py                         # re-exports PlotPanel, make_plot_tools, make_osw_tools
├── panel.py                            # PlotPanel class (sandbox + pn.pane.Image)
├── utils/
│   ├── __init__.py
│   ├── sandbox.py                      # resolve_file_path, copy_files_to_sandbox, MICRESS pairing
│   └── osw_env.py                      # OSW_ENV_VARS, osw_env_present()
└── tools/
    ├── __init__.py
    ├── plot_tools.py                   # 3 delegation tools + make_plot_tools() factory
    ├── osw_plot_tools.py               # 2 plot-bound OSW tools (lazy-imported by plot_tools)
    └── osw_tools.py                    # 8 stateless OSW tools + make_osw_tools() factory
```

### Component boundaries

Each unit has a single purpose, a narrow interface, and deliberate dependencies on upstream packages:

| Unit | Purpose | Interface | Depends on |
|---|---|---|---|
| `PlotPanel` (`panel.py`) | Holds mutable plot state; runs code inside `SandboxSession`; updates `pn.pane.Image`. | `plot_by_code(code, file_paths, libraries)`, `run_code(code, lang, file_paths, libraries)`, `load_data_from_csv(file_path, delimiter, skip_rows)`; attributes `current_python_code`, `current_input_osw_id`, `output_file_path`, `image_panel`, `plot_panel`. | `llm_sandbox`, `pillow`, `pandas`, `panel`, `.utils.sandbox` |
| `copy_files_to_sandbox` (`utils/sandbox.py`) | Copy host files into `/sandbox/`, pair MICRESS geometry with binary results. Pure helper - no env reads at import. | `copy_files_to_sandbox(session, file_paths, download_dir, data_dir) -> list[str]` | stdlib only |
| `resolve_file_path` (`utils/sandbox.py`) | Resolve a bare filename against `download_dir` / `data_dir`. | `resolve_file_path(file_path, download_dir, data_dir) -> str` | stdlib only |
| `osw_env_present` (`utils/osw_env.py`) | Gate the 8 stateless OSW tools behind `OSW_DOMAIN`, `BLAZEGRAPH_ENDPOINT`, `BLAZEGRAPH_USER`, `BLAZEGRAPH_PASSWORD`. | `osw_env_present() -> bool` | stdlib `os` |
| `PlotByCodeTool`, `RunCodeTool`, `LoadCsvTool` (`tools/plot_tools.py`) | `BaseTool` subclasses that delegate to the matching `PlotPanel` method. | langchain `BaseTool` interface; bound to a `PlotPanel` instance in `__init__`. | `langchain_core.tools`, `pydantic`, `.panel` |
| `make_plot_tools(panel)` (`tools/plot_tools.py`) | Factory returning `[PlotByCodeTool, RunCodeTool, LoadCsvTool]` plus the two OSW-plot tools if `osw` is importable. | `make_plot_tools(panel: PlotPanel) -> list[BaseTool]` | `.osw_plot_tools` (try/except ImportError) |
| `AttachPlotToOswTool`, `DocumentEvaluationTool` (`tools/osw_plot_tools.py`) | Read `panel.image_panel.object` / `panel.current_python_code`, upload to OSW, attach to a target page. | `BaseTool` subclasses, panel-bound. | `osw.*`, `.panel` |
| 8 stateless OSW tools (`tools/osw_tools.py`) | `GetPageHtmlTool`, `DownloadOslFileTool`, `GetFileHeaderTool`, `SparqlSearchTool`, `FindOutEverythingAboutTool`, `GetTopicTaxonomyTool`, `GetInstancesTool`, `GetWebsiteHtmlTool` | `BaseTool` subclasses; each reads env vars inside `_run`. | `osw.*`, `SPARQLWrapper`, stdlib `urllib` |
| `make_osw_tools()` (`tools/osw_tools.py`) | Factory - returns `[]` when `osw_env_present()` is false, otherwise the 8-tool list. | `make_osw_tools() -> list[BaseTool]` | `.utils.osw_env` |

### PlotPanel state

```python
class PlotPanel:
    data_path: Path          # base data dir (default: cwd / "data")
    download_dir: Path       # downloaded OSW files land here
    docker_image: str        # "python:3.12-slim"
    df: pandas.DataFrame | None          # last CSV loaded via load_data_from_csv
    current_python_code: str | None      # last successful plot_by_code snippet
    current_input_osw_id: str | None     # "File:<basename>" from the last plot's inputs
    output_file_path: Path | None        # data/outputs/output.png
    image_panel: pn.pane.Image
    plot_panel: pn.Row                   # the servable widget
```

State mutates through `plot_by_code` / `run_code` / `load_data_from_csv`. The two OSW-plot tools (`attach_current_plot_to_osw_page`, `document_current_evaluation`) read - but never mutate - `current_python_code` and `current_input_osw_id`.

### The mypy story

`osw` upstream ships no `py.typed` marker, so mypy emits "missing library stubs" for every `from osw.* import ...`. The knee-jerk fix is a global `[[tool.mypy.overrides]] module = ["osw.*"] ignore_missing_imports = true`. That hides the cost of the dependency and is easy to forget when the package eventually ships types.

Instead, every module that imports from `osw` uses the `TYPE_CHECKING: Any` boundary pattern locally:

```python
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    OswExpress: Any = Any
    model: Any = Any
    # ... etc
else:
    from osw.express import OswExpress
    from osw.core import model
```

The trade-off (mypy sees `Any`, runtime sees the real types) is visible at the boundary where the `osw` import happens. When `osw` ships `py.typed`, the `TYPE_CHECKING` branch becomes a real import and the `Any` aliases are deleted.

Combined with splitting the tools into `plot_tools.py` (no `osw` imports - importable in any environment) + `osw_plot_tools.py` / `osw_tools.py` (both import `osw` at module top), this keeps mypy happy without a global override.

### The graceful-degradation story

Two independent axes:

| Axis | Gated by | Tools affected | Mechanism |
|---|---|---|---|
| `osw` package installed? | `import osw` succeeds | `AttachPlotToOswTool`, `DocumentEvaluationTool`, all 8 stateless OSW tools | `make_plot_tools` wraps the `osw_plot_tools` import in `try/except ImportError`. `osw_tools.py` imports `osw` at top, so `from .osw_tools import make_osw_tools` raises `ImportError` - the example does `from panelini.panels.ai.plot import make_osw_tools` which goes through `__init__.py`, but `osw_tools.py` is only imported inside `make_osw_tools()`'s body. *(Current implementation: `osw_tools.py` imports `osw` at top; when osw is absent the example's `from panelini.panels.ai.plot import make_osw_tools` line will raise ImportError. Install `panelini[ai-osw]` to avoid this. See follow-ups.)* |
| OSW env vars set? | `osw_env_present()` | All 8 stateless OSW tools | `make_osw_tools()` returns `[]` when any of the four vars is missing. |

### The tools - input schemas (pydantic v2)

All three input models live in `plot_tools.py`:

```python
class PlotByCodeInput(BaseModel):
    code: str = Field(..., description="Python that saves a PNG to /sandbox/output.png.")
    file_paths: list[str] | None = None
    libraries: list[str] | None = None  # defaults to numpy, pandas, matplotlib, scipy

class RunCodeInput(BaseModel):
    code: str
    lang: str = "python"
    file_paths: list[str] | None = None
    libraries: list[str] | None = None

class LoadCsvInput(BaseModel):
    file_path: str
    delimiter: str = "\t"
    skip_rows: int = 0
```

`osw_plot_tools.py` and `osw_tools.py` define their own input schemas (`AttachPlotInput`, `DocumentEvaluationInput`, `GetPageHtmlInput`, `DownloadOslFileInput`, `SparqlSearchInput`, `FindOutEverythingAboutInput`, `GetTopicTaxonomyInput`, `GetInstancesInput`, `GetFileHeaderInput`, `GetWebsiteHtmlInput`). All use pydantic v2; `BaseTool` subclasses pass `arbitrary_types_allowed=True` via `ConfigDict` so the `panel: PlotPanel` field type-checks.

### The `plot_by_code` sandbox contract

Documented in the example's system message and enforced by convention:

```text
plot_by_code MUST save its figure to '/sandbox/output.png'.
Files passed via file_paths are available at '/sandbox/<BASENAME>'.
```

If the snippet saves elsewhere, `session.copy_from_runtime("/sandbox/output.png", ...)` fails, the panel returns `"Exception during plotting: ..."`, and the model retries.

MICRESS/micpy guidance is also included in the system message - it is the one piece of prompt from `migration/agent.py:636-656` worth preserving.

## Dependencies

Three optional extras, two existing and one new:

```toml
[project.optional-dependencies]
ai = [ "langchain>=0.3.27", "langchain-anthropic>=0.3.0",
       "langchain-community>=0.3.27", "langchain-openai>=0.3.32",
       "python-dotenv>=1.0.0", "pyyaml>=6.0" ]                    # unchanged

ai-llm-sandbox = [ "llm-sandbox>=0.2", "pillow>=10.0" ]           # unchanged

ai-osw = [                                                        # NEW
    "osw>=1.0",
    "SPARQLWrapper>=2.0",
    "pandas>=2.0.0",
    "python-dotenv>=1.0.0",
]
```

`osw` is also added to the `[dependency-groups.dev]` list so mypy and the test suite can resolve OSW symbols even when a contributor hasn't installed the `[ai-osw]` extra.

README entry: `pip install panelini[ai,ai-llm-sandbox]` for the basic case; add `ai-osw` for the OSW tools.

## Error handling

All user-facing errors are surfaced as chat tool-result strings, never raised. The AI model decides whether to retry or inform the user.

| Failure | Where caught | Handling |
|---|---|---|
| Docker daemon unreachable | `SandboxSession.__enter__` (via the `with` in `plot_by_code`) | Propagates - the caller (chat backend) catches and reports. Example's system message instructs the user to start Docker. |
| Snippet produces no `/sandbox/output.png` | `session.copy_from_runtime` raises | Returned as `"Exception during plotting: {e}\nReturned from sandbox: {stdout}"` so the model sees both the error and the snippet's stdout. |
| Snippet saves corrupt PNG | `Image.open(self.output_file_path)` raises | Same wrapper as above - caller sees the PIL error. |
| `panel.image_panel.object is None` at attach-time | `_load_plot_bytes` raises `ValueError` | Returned as `"error attaching plot to OSW: ..."` - model is told to call `plot_by_code` first. |
| OSW entity not found for `attach_current_plot_to_osw_page` | `osw_obj.load_entity(...) is None` | Returns `"error loading entity with title: {osw_id} - was it formatted correctly?"`. State untouched. |
| OSW / SPARQL network failure | Per-tool `try/except Exception` in `_run` | Returns `"error <action>: {e}"`. No retries. |
| OSW env vars missing at factory time | `make_osw_tools` | Returns `[]` - the 8 tools never appear in the sidebar. |
| `osw` package missing at factory time | `make_plot_tools` | The two OSW-plot tools are silently omitted; the three core tools stay. |

Nothing silently swallows an error; every caught exception is surfaced to the chat model as a string containing `e`.

## Testing

Tests live at `tests/panels/ai/plot/` and are fully self-contained - no Docker, no OSW endpoint, no network.

| File | Scope | Key mocks |
|---|---|---|
| `test_sandbox_utils.py` | `resolve_file_path`, `copy_files_to_sandbox`, MICRESS pairing. | `MagicMock()` session capturing `copy_to_runtime` calls. |
| `test_osw_env.py` | `OSW_ENV_VARS` completeness, `osw_env_present()` truth table. | `monkeypatch.setenv` / `delenv`. |
| `test_plot_panel.py` | `PlotPanel.plot_by_code` end-to-end without Docker: session context manager stub whose `copy_from_runtime` writes a real 1x1 PNG. Asserts `current_python_code`, `output_file_path`, `image_panel.object`. | `patch("panelini.panels.ai.plot.panel.SandboxSession")` returning a `MagicMock()` with a tiny valid PNG written in `copy_from_runtime`. |
| `test_plot_tools.py` | The three delegation tools call through to panel methods with the expected kwargs. `make_plot_tools` returns 3 tools when `osw_plot_tools` is unimportable, 5 when present. | `MagicMock()` panel; `monkeypatch.setitem(sys.modules, "panelini.panels.ai.plot.tools.osw_plot_tools", None)` to simulate missing osw. |
| `test_osw_plot_tools.py` | `AttachPlotToOswTool._run` success + entity-not-found + missing-image paths; `DocumentEvaluationTool._run` success + missing-image. | `patch` on `OswExpress`, `OSW`, `_build_wiki_file`, `get_full_title`, `model`. `panel_with_png` fixture writes a real PNG byte string. |
| `test_osw_tools.py` | Pure helpers (`_replace_special_characters`, `_check_for_uuid`, `_try_cast_str_to_uuid`); `make_osw_tools` gating; each of the 8 tools' `_run` success + error paths. | `osw_env` / `no_osw_env` fixtures; `patch("SPARQLWrapper.SPARQLWrapper")` returning a fake with `.query().convert()` canned; `patch` on `OswExpress`, `osw_download_file`. |

Total: 6 test files, ~900 LOC, 80+ tests - all pass in <2 s without Docker. Coverage goal: every public function on `PlotPanel`, every `_run` method on every tool, every happy path + at least one error path.

`pytest-asyncio` is already a dev dep. `_arun` tests reuse the `ThreadPoolExecutor` escape from [test_tools.py](../../../tests/panels/ai/test_tools.py) only if needed - most `_arun` methods here simply delegate to `_run` and test the sync path instead.

## File layout summary

New files in `src/`:

- `src/panelini/panels/ai/plot/__init__.py`
- `src/panelini/panels/ai/plot/panel.py`
- `src/panelini/panels/ai/plot/utils/__init__.py`
- `src/panelini/panels/ai/plot/utils/sandbox.py`
- `src/panelini/panels/ai/plot/utils/osw_env.py`
- `src/panelini/panels/ai/plot/tools/__init__.py`
- `src/panelini/panels/ai/plot/tools/plot_tools.py`
- `src/panelini/panels/ai/plot/tools/osw_plot_tools.py`
- `src/panelini/panels/ai/plot/tools/osw_tools.py`

New files in `tests/`:

- `tests/panels/ai/plot/__init__.py`
- `tests/panels/ai/plot/test_plot_panel.py`
- `tests/panels/ai/plot/test_plot_tools.py`
- `tests/panels/ai/plot/test_osw_plot_tools.py`
- `tests/panels/ai/plot/test_osw_tools.py`
- `tests/panels/ai/plot/test_sandbox_utils.py`
- `tests/panels/ai/plot/test_osw_env.py`

New example:

- `examples/panels/ai/plot_by_code.py`

Modified:

- `pyproject.toml` - add `[ai-osw]` optional extra; add `osw>=1.0.1` to `[dependency-groups.dev]`.
- `examples/panels/ai/README.md` - one-line entry pointing at the new example.
- `uv.lock` - regenerated.

No changes to `src/panelini/panels/ai/{frontend,backend,config,utils}.py`.

## v1.1 addendum - Right-sidebar plot-model override

**Status:** implemented, 2026-04-24
**Scope:** add a *one-shot* model-override UI to the right sidebar without touching the main chat loop or the plot tool signatures.

### Motivation

The main chat is driven by the provider/model selected in the left sidebar. That model does both reasoning and code generation. If the user wants to try a different model *only* for rewriting the current plot script (e.g. "the chat is on Opus 4.7 for planning, let me swap to Sonnet 4.6 and ask it to tighten the code"), the current flow requires changing the global model, losing conversational context.

### Design

Two-surface split:

1. **Main chat** - unchanged. `AiChat` + `plot_by_code` tool loop. No new LLM call introduced into the tool body.
2. **Right sidebar (`build_plot_context_sidebar`)** - a plot-context card with:
   - the last successful `plot_by_code` script (markdown, re-read via `PlotPanel.on_plot`);
   - a model picker (`panel.widgets.Select`) populated from the default provider, default = Sonnet 4.6 (falling back to the first model if missing);
   - a free-text "what should change?" input;
   - a *Regenerate plot* button that runs `regenerate_plot()` - a one-shot LLM call using the selected model, no history - and re-runs the returned code through `PlotPanel.plot_by_code`.

### Why this design, not a two-LLM-call tool

Earlier we considered embedding a second LLM inside the `plot_by_code` tool - it would receive a free-text request and rewrite code. That was rejected:

- **Doubled latency** for every plot turn.
- **Lost context** - the inner call would not see chat history.
- **Duplicate capability** - the main chat model can already write plotting code.

Keeping the chat as a single-LLM loop preserves the fast path. The regenerate button is an explicit opt-in, triggered by the user not by the agent.

### Contract additions

| Surface | Signature | Purpose |
|---|---|---|
| `PlotPanel.on_plot(fn)` | `(Callable[[], None]) -> None` | Register a zero-arg callback fired after every `plot_by_code` (success OR error). Callback exceptions are suppressed (plotting must not break because a UI subscriber fails). |
| `pick_default_plot_model(provider)` | `ProviderConfig -> ModelConfig` | Return *Claude Sonnet 4.6* if present, else `provider.models[0]`. |
| `strip_code_fences(text)` | `str -> str` | Remove a surrounding ```python … ``` block; used to clean the LLM's rewrite. |
| `regenerate_plot(panel, user_intent, *, provider=None, model=None, config_path=None)` | see signature | Load config, pick provider/model, build an `AiInterface` with a dedicated `_REGEN_SYSTEM_MESSAGE`, call `model.ainvoke`, strip fences, hand to `panel.plot_by_code`. Returns whatever the panel method returns. |
| `build_plot_context_sidebar(panel, config_path=None)` | `-> list[pn.viewable.Viewable]` | Build the Card. Registers `_refresh_code` via `panel.on_plot` so the code display stays in sync when the chat's `plot_by_code` runs. |

### Wiring in the example

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

### Files touched in v1.1

- New: `src/panelini/panels/ai/plot/model_selector.py`
- New: `tests/panels/ai/plot/test_model_selector.py` (10 tests)
- Edited: `src/panelini/panels/ai/plot/panel.py` (add `on_plot` hook + callback fire point)
- Edited: `src/panelini/panels/ai/plot/__init__.py` (re-export `build_plot_context_sidebar`, `regenerate_plot`)
- Edited: `tests/panels/ai/plot/test_plot_panel.py` (4 `TestOnPlotCallback` tests)
- Edited: `examples/panels/ai/plot_by_code.py` (enable right sidebar, wire the card)

### Explicit trade-offs

- **No chat history in regenerate prompt.** The dedicated system message tells the model to return only Python. Including history would couple the override to chat state the way we tried to avoid. If the user wants conversational context, they ask the main chat agent.
- **Fixed default model (Sonnet 4.6) is the config.yml "Claude Sonnet 4.6" entry** - which in the user's current `config.yml` points to `anthropic/claude-sonnet-4-5` (same underlying model value; the display name is decoupled from the LiteLLM identifier in Anthropic Foundry's naming).
- **Callback exceptions are suppressed, not logged.** The plot panel is a leaf component - logging would tie it to a logger configuration we don't own. If this becomes a debugging problem we'll introduce a logger; for now silence is the right default.

## v1.2 - OSW credential handling via environment variables

### Motivation

The upstream `osw.express.OswExpress.__init__` calls `input()` / `getpass.getpass()` on a fresh machine (no `osw_files/accounts.pwd.yaml` yet), and writes the entered credentials to that yaml on first use. Both behaviours are hostile to a Panel server: the example would block on stdin instead of serving, and the resulting yaml would ship credentials to disk outside the `.env` file the user explicitly chose as their credential store.

### Design

A new helper module `src/panelini/panels/ai/plot/utils/osw_env.py` centralises credential wiring:

- `OSW_AUTH_ENV_VARS = ("OSW_DOMAIN", "OSW_USER", "OSW_PASSWORD")` - three vars required together.
- `OSW_ENV_VARS` now includes those three **plus** the three `BLAZEGRAPH_*` vars (was three before).
- `check_osw_auth_env()` raises `RuntimeError` listing every missing auth var - crafted to be actionable inside a `.env` file.
- `class EnvCredentialManager(CredentialManager)` overrides only `iri_in_file(iri)` to `return self.iri_in_credentials(iri) or super().iri_in_file(iri)`. This tells `OswExpress.__init__` "you already have creds on disk for this domain" even though they live only in memory - bypassing both the prompt and the yaml write in one change.
- `build_osw_express(domain=None)` validates auth, reads env, constructs an `EnvCredentialManager` pre-loaded with a `CredentialManager.UserPwdCredential`, and passes it to `OswExpress(domain=..., cred_mngr=...)`.

All five `OswExpress(domain=os.environ.get("OSW_DOMAIN"))` callsites (2 in `osw_plot_tools.py`, 1 in `osw_tools.py`, plus 1 module-level factory path in `osw_tools.DownloadOslFileTool` which used the standalone `osw_download_file` function) route through `build_osw_express()`. `DownloadOslFileTool` now uses `osw_obj.download_file(...)` rather than the module-level helper to avoid the "no cred_mngr parameter" escape hatch.

### Contract additions

| Aspect | Before | After |
| --- | --- | --- |
| OSW auth env vars | Undocumented; tools ran with `OSW_DOMAIN` only and hoped for the best | `OSW_DOMAIN` + `OSW_USER` + `OSW_PASSWORD` all required together; missing any raises `RuntimeError` with actionable message |
| OSW env gate (`make_osw_tools`) | 4 vars (`OSW_DOMAIN` + 3 Blazegraph) | 6 vars (3 auth + 3 Blazegraph) |
| Credential file on disk | Written on first use to `osw_files/accounts.pwd.yaml` | Never written - `EnvCredentialManager.iri_in_file` short-circuits the `save_credentials_to_file` branch |
| CLI prompt on fresh machine | `input()` + `getpass()` blocked the Panel server | Never prompted - same short-circuit blocks `get_credential` |

### Test contract

A direct integration test (`TestNoCredentialsFileWritten`) exercises the real `OswExpress.__init__` with only `requests.get` and `WtSite` patched. It asserts that neither `EnvCredentialManager.save_credentials_to_file` nor `EnvCredentialManager.get_credential` is invoked, and that no `osw_files/accounts.pwd.yaml` appears in a `tmp_path` cwd after `build_osw_express()` returns. This catches any future regression that removes the `iri_in_file` override.

### Files touched in v1.2

- New: `src/panelini/panels/ai/plot/utils/osw_env.py`
- New: `tests/panels/ai/plot/test_osw_env.py` (18 tests)
- Edited: `src/panelini/panels/ai/plot/tools/osw_plot_tools.py` (route through `build_osw_express`, drop `os`, drop `OswExpress` import)
- Edited: `src/panelini/panels/ai/plot/tools/osw_tools.py` (same rewire; `DownloadOslFileTool` now calls `osw_obj.download_file`)
- Edited: `tests/panels/ai/plot/test_osw_tools.py` + `test_osw_plot_tools.py` (patch `build_osw_express` instead of `OswExpress`/`osw_download_file`)
- Edited: `examples/panels/ai/plot_by_code.py` (env-var docstring updated with auth vars + credential-handling note)
- Edited: `examples/panels/ai/README.md` (one-liner updated for six-var requirement and in-memory credentials)

### Explicit trade-offs

- **Subclass `iri_in_file`, don't monkey-patch.** The override is a two-line method on a dedicated subclass. A module-level monkey-patch would affect any third-party code sharing the process; the subclass only lies about *its own* state.
- **`OSW_USER` / `OSW_PASSWORD` are required hard, not optional.** If the user has an `accounts.pwd.yaml` already, we still require env vars - the prior unified path avoids divergent behaviour between dev machines and CI. A graceful "fall back to yaml if present" would re-open the prompt path.
- **No yaml writes is a first-class contract, not an implementation detail.** Hence the dedicated `TestNoCredentialsFileWritten` test - if a contributor ever "helpfully" removes the `iri_in_file` override thinking it's dead code, the test fails immediately.

## Follow-ups (explicitly out of scope for v1)

- `osw_tools.py` top-level `from osw.express import ...` means `from panelini.panels.ai.plot import make_osw_tools` raises ImportError when the `osw` package is absent. The cleaner alternative is to lazy-import inside `make_osw_tools()` (mirroring `make_plot_tools`'s try/except for `osw_plot_tools`). Deferred to a follow-up - the `[ai-osw]` extra covers the runnable path and contributors install it via the dev dep.
- Promote MICRESS/micpy guidance out of the example system message into a reusable `PLOT_SYSTEM_MESSAGE` constant once a second consumer appears.
- Render a live "sandbox log" tab next to the plot for debugging long-running snippets.
- Port the OSW `call_client_side_tool` hook from `migration/` if panelini ever needs to drive a page-side widget from the chat.
- Sphinx docs page at `docs/panels/ai.md` covering this panel + layout diagram.
- Drop the `TYPE_CHECKING: Any` boundary when upstream `osw` ships `py.typed`.
