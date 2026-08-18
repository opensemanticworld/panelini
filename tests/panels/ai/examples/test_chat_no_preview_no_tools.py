"""Playwright UI tests for examples/panels/ai/chat_no_preview_no_tools.py."""

import importlib
import time

import panel as pn
import pytest
from playwright.sync_api import Page

_PORT = 6340


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the no-preview/no-tools example with mocked LangChain."""
    p1, p2 = mock_langchain
    with p1, p2:
        module = importlib.reload(importlib.import_module("examples.panels.ai.chat_no_preview_no_tools"))
        server = pn.serve(module.create_app, port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT
        server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    """Browser page navigated and ready."""
    _, port = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Hello! 👋").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_chat_renders_without_preview(ready_page: Page):
    """Chat card is visible; Preview card is absent."""
    page = ready_page

    assert page.locator("text=Chat").first.is_visible()
    assert page.locator("text=Hello! 👋").first.is_visible()
    # exact=True avoids matching "previews" in the welcome message body
    assert page.get_by_text("Preview", exact=True).count() == 0


def test_tools_card_absent(ready_page: Page):
    """Basic Tools sidebar card is not rendered."""
    page = ready_page

    assert page.locator("text=Basic Tools").count() == 0


def test_provider_and_model_settings_present(ready_page: Page):
    """Provider and Model Settings cards are still visible in the sidebar."""
    page = ready_page

    # The left sidebar starts collapsed (Panelini's sidebar_visible defaults to
    # False), so it must be opened before its contents are interactable. Wait
    # for the sidebar's open transition to finish before asserting visibility;
    # is_visible() checks instantaneously and does not auto-wait like click().
    page.locator(".left-navbar-button").first.click()
    page.locator("text=Provider Settings").first.wait_for()

    assert page.locator("text=Provider Settings").first.is_visible()
    assert page.locator("text=Model Settings").first.is_visible()
