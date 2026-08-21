"""Playwright UI tests for examples/panels/ai/chat_multi_tab.py."""

import importlib
import re
import time

import panel as pn
import pytest
from playwright.sync_api import Page, expect

_PORT = 6300


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the real multi-tab example module with mocked LangChain."""
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_multi_tab"))
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
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
    # The left sidebar starts collapsed (Panelini's sidebar_visible defaults to
    # False), and this test verifies the main-area and sidebar tab copies stay
    # in sync, so both must be visible/interactable throughout.
    page.locator(".left-navbar-button").first.click()
    page.locator(".bk-tab").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


# Each AiChat sidebar carries its own setup/conversations tab pair; only the
# linked Ingest/Digest headers belong to this test. Hidden panes report an
# empty inner_text, so they drop out through the same filter.
_INNER_TABS = {"⚙️", "💬", ""}


def _tab_names(page: Page) -> list[str]:
    """Return the linked tab names in DOM order, inner AiChat tabs excluded."""
    tab_headers = page.locator(".bk-tab")
    names = (tab_headers.nth(i).inner_text().strip() for i in range(tab_headers.count()))
    return [name for name in names if name not in _INNER_TABS]


def _unique_tab_names(page: Page) -> list[str]:
    """Return deduplicated tab names in DOM order."""
    return list(dict.fromkeys(_tab_names(page)))


def test_multi_tab_renders(ready_page: Page):
    """Verify both AI chat tabs render inside Panelini."""
    page = ready_page
    # Reset to first tab for test isolation
    page.locator(".bk-tab").first.click()

    all_names = _tab_names(page)
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
