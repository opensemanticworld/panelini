"""Playwright UI tests for examples/panels/ai/drawai_beautify.py."""

from __future__ import annotations

import importlib
import time
from pathlib import Path

import panel as pn
import pytest
from playwright.sync_api import Page

pytest.importorskip("anthropic")
pytest.importorskip("PIL")

_PORT = 6330
_FIXTURES = Path(__file__).parent.parent / "fixtures" / "drawai"


@pytest.fixture(scope="module")
def panel_server(mock_langchain, mock_anthropic_sdk):
    """Serve the drawai example with LangChain + Anthropic SDK + config mocked."""
    lc1, lc2 = mock_langchain
    cfg_patch, anth_patch, _canned = mock_anthropic_sdk
    # Import/reload the module BEFORE applying patches - the patches target names
    # inside the module's namespace, so the module must be importable first and
    # those names must exist before patch() can replace them. Reloading inside the
    # with-block would re-import the real ``load_config`` on top of the patch.
    importlib.import_module("examples.panels.ai.drawai_beautify")
    with lc1, lc2, cfg_patch, anth_patch:
        module = importlib.import_module("examples.panels.ai.drawai_beautify")
        app = module.build_app()  # build_app is NOT called at module level anymore
        server = pn.serve(app.servable(), port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT, module
        server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    _, port, _ = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Original").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


def test_drawai_renders_layout(ready_page: Page):
    """Chat card + Original + Beautified labels are all visible."""
    page = ready_page
    # Exact heading match: a plain text=Chat locator also matches the
    # sidebar's "Chat Management" card, which is hidden by default
    # (Panelini's sidebar_visible defaults to False).
    assert page.get_by_role("heading", name="Chat", exact=True).is_visible()
    assert page.locator("text=Original").first.is_visible()
    assert page.locator("text=Beautified").first.is_visible()
    # Download button disabled until a beautification happens
    download_btn = page.locator("button", has_text="Download beautified").first
    assert download_btn.is_disabled()


def test_drawai_upload_valid_png_renders_top_pane(ready_page: Page):
    """Uploading diagram.drawio.png shows it in the top pane as an <img>."""
    page = ready_page
    # Target the drawio-specific FileInput (AiChat also injects a .json upload
    # for memory, so ``input[type=file]`` alone is ambiguous).
    file_input = page.locator("input[type=file][accept='.drawio,.drawio.png']").first
    file_input.set_input_files(str(_FIXTURES / "diagram.drawio.png"))
    # Wait for the reactive update: top pane should contain an <img> data URL
    page.locator("img[src^='data:image/png;base64']").first.wait_for(timeout=5000)
    # And no error alert
    assert not page.locator(".alert-danger").first.is_visible()


def test_drawai_upload_corrupt_png_shows_alert(ready_page: Page):
    """Uploading corrupt.drawio.png surfaces the error alert, leaves state intact."""
    page = ready_page
    file_input = page.locator("input[type=file][accept='.drawio,.drawio.png']").first
    file_input.set_input_files(str(_FIXTURES / "corrupt.drawio.png"))
    # The Alert text lives in a wrapper that Playwright reports as "hidden"
    # even though the alert_pane.visible flag is True - wait for attachment
    # and just assert the error text is in the DOM.
    page.locator("text=Could not read file").first.wait_for(state="attached", timeout=5000)
    assert page.locator("text=mxfile").count() > 0
