"""Playwright UI tests for examples/panels/ai/chat_multi_tab.py."""

import re
import time

import panel as pn
import pytest
from playwright.sync_api import Page, expect

from panelini import Panelini
from panelini.panels.ai import AiChat

_PORT = 6300


# ── Fixtures ─────────────────────────────────────────────────────


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve a real two-tab AiChat layout (mirrors chat_multi_tab.py)."""
    p1, p2 = mock_langchain
    with p1, p2:
        ingest_ai = AiChat(
            system_message="You are an assistant specialized in data ingestion tasks.",
            welcome_message="Hi! I'm **Ingest AI**. I can help you with data ingestion tasks.",
        )
        digest_ai = AiChat(
            system_message="You are an assistant specialized in data analysis and summarization.",
            welcome_message="Hi! I'm **Digest AI**. I can help you analyze and summarize data.",
        )

    main_tabs = pn.Tabs(
        ("Ingest AI", pn.Row(*ingest_ai.main_objects)),
        ("Digest AI", pn.Row(*digest_ai.main_objects)),
    )
    sidebar_tabs = pn.Tabs(
        ("Ingest AI", pn.Card(*ingest_ai.sidebar_objects, title="Ingest AI Settings")),
        ("Digest AI", pn.Card(*digest_ai.sidebar_objects, title="Digest AI Settings")),
    )
    main_tabs.jslink(sidebar_tabs, active="active")
    sidebar_tabs.jslink(main_tabs, active="active")

    app = Panelini(
        title="AI Chat Multi Tab",
        sidebar_enabled=True,
        header_background_image=None,
        content_background_image=None,
    )
    app.main_set(objects=[main_tabs])
    app.sidebar_set(objects=[sidebar_tabs])

    server = pn.serve(app.servable(), port=_PORT, threaded=True, show=False)
    time.sleep(0.5)
    yield server, _PORT
    server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    """Browser page navigated and ready (tabs present)."""
    _, port = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator(".bk-tab").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


# ── Helpers ──────────────────────────────────────────────────────


def _unique_tab_names(page: Page) -> list[str]:
    """Return deduplicated tab names in DOM order."""
    tab_headers = page.locator(".bk-tab")
    all_names = [tab_headers.nth(i).inner_text() for i in range(tab_headers.count())]
    return list(dict.fromkeys(all_names))


# ── Tests ────────────────────────────────────────────────────────


def test_multi_tab_renders(ready_page: Page):
    """Verify both AI chat tabs render inside Panelini."""
    page = ready_page
    # Reset to first tab for test isolation
    page.locator(".bk-tab").first.click()

    tab_headers = page.locator(".bk-tab")
    all_names = [tab_headers.nth(i).inner_text() for i in range(tab_headers.count())]
    unique_names = list(dict.fromkeys(all_names))

    # Get names of all tab headers (main + sidebar each have the same set)
    assert len(unique_names) >= 2, f"Expected at least 2 distinct tab names, got: {unique_names}"
    # Each name appears twice: once in main area, once in sidebar
    for name in unique_names:
        assert all_names.count(name) == 2, f"Tab '{name}' should appear in both main and sidebar"

    # Click every header and check if tabs in Sidebar and Main area are in sync
    for name in unique_names:
        page.locator(".bk-tab", has_text=name).first.click()
        # After clicking, all tab headers with this name should be active (jslink sync)
        tabs_with_name = page.locator(".bk-tab", has_text=name)
        for i in range(tabs_with_name.count()):
            expect(tabs_with_name.nth(i)).to_have_class(re.compile(r"active"))


def test_multi_tab_switching(ready_page: Page):
    """Verify clicking each tab shows the correct AI content."""
    page = ready_page
    # Reset to first tab for test isolation
    page.locator(".bk-tab").first.click()

    unique_names = _unique_tab_names(page)

    # Click each tab and verify the active class propagates to both areas (jslink sync)
    for name in unique_names:
        page.locator(".bk-tab", has_text=name).first.click()
        tabs_with_name = page.locator(".bk-tab", has_text=name)
        for i in range(tabs_with_name.count()):
            expect(tabs_with_name.nth(i)).to_have_class(re.compile(r"active"))
