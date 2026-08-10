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


def _await_more_rows(page: Page, before: int) -> int:
    """Poll until the tree grows past *before*, or the round-trip budget runs out.

    Polling (rather than one fixed sleep) keeps the check fast when the round trip is
    quick and still tolerant when the worker is busy, which is what made a fixed wait
    flaky under load.
    """
    deadline, step = _ROUND_TRIP_MS, 250
    waited = 0
    while waited < deadline:
        page.wait_for_timeout(step)
        waited += step
        after = _rows(page)
        if after > before:
            return after
    return _rows(page)


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


# Per-app interaction that can only succeed if a JS -> Python -> JS round trip works.
# Rendering alone is not enough: a stale pre-rendered snapshot, or a Panel version whose
# ESM property sync is broken in WASM, still renders but silently ignores every callback.
# Each entry maps to a callable returning (before, after) counts that must strictly grow.
_INTERACTIONS = {
    ("wunderbaum", "virtual_filesystem"): lambda p: _wb_add_via_context_menu(p, "user", "New Folder"),
    ("wunderbaum", "context_menu"): lambda p: _wb_add_via_context_menu(p, "src", "Add Child"),
    ("wunderbaum", "lazy_loading"): lambda p: _wb_expand_lazy(p, "Root 1"),
    ("wunderbaum", "incremental_tree_demo"): lambda p: _wb_click_button(p, "Next Step"),
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
        pytest.fail(
            f"{category}/{stem}: {reason} (selector {selector!r} not visible within "
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
            f"{category}/{stem}: rendered, but the interaction did not reach Python "
            f"(tree rows {before} -> {after}, expected growth). The app is a dead "
            f"screenshot: callbacks are silently dropped.\nLast console errors:\n  {errors}"
        )
