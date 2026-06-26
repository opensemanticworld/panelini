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
