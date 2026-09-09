"""Verify every built Pyodide portfolio app actually renders its widget in a browser.

Each app is loaded over HTTP and we wait generously, because the first load downloads
Pyodide plus the example's packages on demand for the category's signature widget to
appear. A visible widget means the WASM runtime booted, the example executed without a
fatal traceback, and the real DOM rendered ("functional", not merely "served").

Run via ``make test-portfolio-all`` (every app) or ``make test-portfolio`` (the
``*_panel_min`` representative per category). Needs the apps built (``make portfolio``).
"""

import sys
from pathlib import Path

import pytest
from playwright.sync_api import Page
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError

from panelini.testing import wb_row, wb_title_center

_REPO = Path(__file__).resolve().parents[2]
_APPS_DIR = _REPO / "docs" / "_static" / "portfolio" / "apps"
sys.path.insert(0, str(_REPO / "docs"))
import gen_portfolio  # noqa: E402

# ``ui`` is auto-applied by tests/conftest.py (this module imports playwright); add
# ``portfolio`` so these slow WASM tests can be deselected from test-ui / test-full.
pytestmark = pytest.mark.portfolio

# Per-category widget that proves the example rendered. Lifted from the existing
# server-based example tests so the two stay in sync (e.g. tests/panels/visnetwork/
# examples/test_visnetwork_panel_min.py uses ``.vis-network canvas``).
_CATEGORY_SELECTOR = {
    "visnetwork": ".vis-network canvas",
    "wunderbaum": ".wunderbaum-wrapper",
    "jsoneditor": ".je-object__title, .jsoneditor",
    # In Pyodide TerminalMirror renders its console-mirror HTML pane (.tm-console)
    # instead of the xterm widget (.xterm), which cannot load in WASM.
    "terminalmirror": ".tm-console, .xterm",
    "usecases": ".vis-network canvas",
    # A rendered row, which is what the panel's own example tests wait for. The
    # treegrid element exists before any data reaches it, so a row is the one thing
    # that says the tree arrived rather than that the component mounted.
    "tanstack": ".pnl-tst-row",
    # The chat runs against the LangChain stand-ins (see panelini.ai_testing); its
    # prompt box is the signature widget.
    "ai": "textarea",
}

# First load fetches Pyodide + wheels over the network; keep this well above a normal
# render so a slow package install is not mistaken for a broken app.
_RENDER_TIMEOUT_MS = 120_000


def _discover_apps():
    """(category, stem) for every built app, mirroring the portfolio's own discovery."""
    apps = []
    for category, paths in sorted(gen_portfolio.discover().items()):
        for path in paths:
            if (_APPS_DIR / category / f"{path.stem}.html").exists():
                apps.append((category, path.stem))
    return apps


_APPS = _discover_apps()

# Settle time after the widget appears, before interacting: the worker may still be
# installing packages, so a click sent too early lands before Python is listening.
_SETTLE_MS = 8_000
# Interaction budget once Python is up (a round trip is fast; this is generous).
_ROUND_TRIP_MS = 10_000


def _rows(page: Page) -> int:
    return page.locator(".wb-row").count()


def _await_more_rows(page: Page, before: int, count=_rows) -> int:
    """Poll until the tree grows past *before*, or the round-trip budget runs out.

    Polling (rather than one fixed sleep) keeps the check fast when the round trip is
    quick and still tolerant when the worker is busy, which is what made a fixed wait
    flaky under load. *count* is how a panel counts its own rows.
    """
    deadline, step = _ROUND_TRIP_MS, 250
    waited = 0
    while waited < deadline:
        page.wait_for_timeout(step)
        waited += step
        after = count(page)
        if after > before:
            return after
    return count(page)


def _wb_add_via_context_menu(page: Page, node: str, item: str) -> tuple[int, int]:
    """Right-click the node titled *node* and run *item*; return rows before/after.

    Targets the node by title through ``panelini.testing`` rather than by position:
    Wunderbaum virtualises rows and its column header is a ``.wb-row`` too, so
    positional selectors pick the wrong element.
    """
    before = _rows(page)
    tx, ty = wb_title_center(page, node)
    page.mouse.click(tx, ty, button="right")
    page.locator(".wb-context-menu").wait_for(state="visible", timeout=10_000)
    page.locator(".wb-context-menu-item", has_text=item).first.click()
    return before, _await_more_rows(page, before)


def _wb_click_button(page: Page, label: str) -> tuple[int, int]:
    """Click a Panel button that mutates the tree from Python."""
    before = _rows(page)
    page.locator(f"button:has-text('{label}')").first.click()
    return before, _await_more_rows(page, before)


def _wb_expand_lazy(page: Page, node: str) -> tuple[int, int]:
    """Expand the lazy node titled *node*; children arrive only if Python answers."""
    before = _rows(page)
    wb_row(page, node).locator(".wb-expander").click()
    return before, _await_more_rows(page, before)


def _tst_rows(page: Page) -> int:
    """Rows in the tree, summed over the panes on the page.

    Read from `aria-rowcount` and never from the DOM: the rowgroup is windowed, so
    counting row elements measures the viewport height rather than the tree. The
    explorer has two panes, and a node moving between them changes neither total.
    """
    counts = page.locator("[role='treegrid']").evaluate_all(
        "grids => grids.map(grid => Number(grid.getAttribute('aria-rowcount') || 0))"
    )
    return sum(counts)


def _tst_expand_pruned(page: Page) -> tuple[int, int]:
    """Open the first branch of a pruned tree.

    Under ``prune: "collapsed"`` an unopened branch crosses as a twisty holding
    nothing, so its children can only appear if the browser's intent reached Python
    and Python rebuilt the view. Nothing about this is a local expand.
    """
    before = _tst_rows(page)
    page.locator(".pnl-tst-twisty").first.click()
    return before, _await_more_rows(page, before, _tst_rows)


def _tst_toolbar_add(page: Page, label: str) -> tuple[int, int]:
    """Mint a node from the toolbar. Python owns the key, the insert and the push."""
    before = _tst_rows(page)
    page.get_by_role("button", name=label).first.click()
    return before, _await_more_rows(page, before, _tst_rows)


def _tst_rename(page: Page, name: str) -> tuple[int, int]:
    """Rename the first row through the toolbar and wait for the title to come back.

    This tree's shape cannot change, so there is no row count to grow. What grows is
    the number of rows carrying the new name, from none to one, and the name is only
    there because Python wrote it and pushed the tree back.
    """
    page.locator(".pnl-tst-row").first.click()
    page.get_by_role("button", name="Rename").first.click()
    editor = page.locator(".pnl-tst-edit").first
    editor.wait_for(state="visible", timeout=_ROUND_TRIP_MS)
    editor.fill(name)
    editor.press("Enter")
    renamed = page.locator(".pnl-tst-cell--tree .pnl-tst-value", has_text=name).first
    try:
        renamed.wait_for(timeout=_ROUND_TRIP_MS)
    except PlaywrightTimeoutError:
        return 0, 0
    return 0, 1


def _chat_exchange(page: Page) -> tuple[int, int]:
    """Send a prompt and wait for the stubbed reply to stream back.

    Exercises the whole chain in WASM: the prompt reaches Python, the LangChain
    stand-ins answer, and the streamed chunks render.
    """
    box = page.locator("textarea").first
    box.fill("Does this demo answer?")
    box.press("Enter")
    reply = page.get_by_text("simulated reply", exact=False).first
    reply.wait_for(timeout=_ROUND_TRIP_MS * 3)
    return 0, 1 if reply.is_visible() else 0


# Per-app interaction that can only succeed if a JS -> Python -> JS round trip works.
# Rendering alone is not enough: a stale pre-rendered snapshot, or a Panel version whose
# ESM property sync is broken in WASM, still renders but silently ignores every callback.
# Each entry maps to a callable returning (before, after) counts that must strictly grow.
_INTERACTIONS = {
    ("wunderbaum", "virtual_filesystem"): lambda p: _wb_add_via_context_menu(p, "user", "New Folder"),
    ("wunderbaum", "context_menu"): lambda p: _wb_add_via_context_menu(p, "src", "Add Child"),
    ("wunderbaum", "lazy_loading"): lambda p: _wb_expand_lazy(p, "Root 1"),
    ("wunderbaum", "incremental_tree_demo"): lambda p: _wb_click_button(p, "Next Step"),
    ("tanstack", "tst_bigtree"): _tst_expand_pruned,
    ("tanstack", "tst_vfsexplorer_extfiledrop"): lambda p: _tst_toolbar_add(p, "New folder"),
    ("tanstack", "tst_treegrid_columns"): lambda p: _tst_rename(p, "Renamed in the browser"),
    ("ai", "chat_min"): _chat_exchange,
    ("ai", "chat_custom_tool"): _chat_exchange,
    ("ai", "chat_no_preview_no_tools"): _chat_exchange,
    ("ai", "chat_local_storage"): _chat_exchange,
}


@pytest.mark.parametrize(
    ("category", "stem"),
    _APPS,
    ids=[f"{c}/{s}" for c, s in _APPS],
)
def test_app_renders(page: Page, apps_base_url: str, category: str, stem: str):
    selector = _CATEGORY_SELECTOR.get(category)
    assert selector, f"No render selector configured for category {category!r}"

    console_errors: list[str] = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: console_errors.append(str(exc)))

    page.goto(f"{apps_base_url}/apps/{category}/{stem}.html")

    try:
        page.wait_for_selector(selector, state="visible", timeout=_RENDER_TIMEOUT_MS)
    except PlaywrightTimeoutError:
        fallback = page.get_by_text("Could not render this example").count() > 0
        reason = "wrapper fell back to 'Could not render'" if fallback else "widget never appeared"
        errors = "\n  ".join(console_errors[-5:]) or "(none)"
        # pytest.fail is `reason: str = "", pytrace: bool = True`, but ty
        # misresolves the wrapping _WithException[...] protocol used by
        # _pytest.outcomes and matches the positional arg against `pytrace`.
        pytest.fail(
            f"{category}/{stem}: {reason} (selector {selector!r} not visible within "  # ty: ignore[invalid-argument-type]
            f"{_RENDER_TIMEOUT_MS // 1000}s).\nLast console errors:\n  {errors}"
        )

    interaction = _INTERACTIONS.get((category, stem))
    if interaction is None:
        return

    page.wait_for_timeout(_SETTLE_MS)
    before, after = interaction(page)
    if after <= before:
        errors = "\n  ".join(console_errors[-5:]) or "(none)"
        pytest.fail(
            f"{category}/{stem}: rendered, but the interaction did not reach Python "  # ty: ignore[invalid-argument-type]
            f"(observed {before} -> {after}, expected growth). The app is a dead "
            f"screenshot: callbacks are silently dropped.\nLast console errors:\n  {errors}"
        )
