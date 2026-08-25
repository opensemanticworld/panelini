"""Playwright E2E tests for driving the Wunderbaum filter from Python.

``filter_nodes()`` and ``clear_filter()`` are one-way actions, so the match
count comes back as a ``filter`` tree event rather than a return value. Both
sides are checked here: the rendered rows and the event.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import wait_until, wb_wait

_PORT = 6422

FILTER_SOURCE = [
    {
        "title": "Reports",
        "key": "reports",
        "expanded": True,
        "children": [
            {"title": "Annual Report", "key": "reports/annual"},
            {"title": "Monthly Summary", "key": "reports/monthly"},
        ],
    },
    {
        "title": "Invoices",
        "key": "invoices",
        "expanded": True,
        "children": [
            {"title": "Invoice 2024", "key": "invoices/2024"},
        ],
    },
]

_events: list = []


def _on_event(name: str, params: dict) -> None:
    _events.append({"name": name, **params})


tree = Wunderbaum(
    source=copy.deepcopy(FILTER_SOURCE),
    tree_event_callback=_on_event,
)


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override the parent fixture - don't reset Panel state mid-run."""
    yield


@pytest.fixture(scope="module")
def panel_server():
    """Serve the filter tree once for the whole module."""
    server = pn.serve(tree, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    # kill_all_servers() (not server.stop()) so panel's own server/thread
    # registry is cleared too - see test_wunderbaum_dnd for the full reason.
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server."""
    tree.source = copy.deepcopy(FILTER_SOURCE)
    _events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _visible_titles(page: Page) -> list[str]:
    """Titles of rows the filter has not hidden."""
    rows = page.locator(".wb-row:not(.wb-hide) .wb-title")
    return [(rows.nth(i).text_content() or "").strip() for i in range(rows.count())]


def _filter_events() -> list:
    return [e for e in _events if e["name"] == "filter"]


def test_filter_nodes_hides_non_matching_rows(ready_page: Page):
    """filter_nodes with mode 'hide' leaves only the matching branch."""
    page = ready_page

    tree.filter_nodes("Invoice", {"mode": "hide", "autoExpand": True})
    wait_until(lambda: _filter_events())

    titles = _visible_titles(page)
    assert "Invoice 2024" in titles
    assert "Annual Report" not in titles
    assert "Monthly Summary" not in titles


def test_filter_nodes_reports_match_count(ready_page: Page):
    """The match count comes back on the filter event."""
    page = ready_page  # noqa: F841 - the page must be open for the event to fire

    tree.filter_nodes("Report")
    wait_until(lambda: _filter_events())

    ev = _filter_events()[-1]
    assert ev["filter"] == "Report"
    # 'Reports' and 'Annual Report' both match on title substring.
    assert ev["matches"] == 2


def test_clear_filter_restores_all_rows(ready_page: Page):
    """clear_filter brings the hidden rows back."""
    page = ready_page

    tree.filter_nodes("Invoice", {"mode": "hide"})
    wait_until(lambda: _filter_events())
    assert "Annual Report" not in _visible_titles(page)

    tree.clear_filter()
    wait_until(lambda: _filter_events()[-1]["matches"] is None)

    titles = _visible_titles(page)
    assert "Annual Report" in titles
    assert "Invoice 2024" in titles
