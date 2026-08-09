"""Docs-media still for the DrawAI drawio beautifier example.

The panel needs an LLM backend, so we reuse ``mock_langchain`` plus the
``mock_anthropic_sdk`` fixture to serve the example with fake provider,
model, and Anthropic SDK. That is enough to render the compare layout
(chat card + Original / Beautified panes) at its welcome state, which is
what the docs page illustrates.
"""

import importlib
import time

import panel as pn
import pytest
from playwright.sync_api import Page

_VIEWPORT = (1500, 900)


@pytest.mark.media(role="feature", capture="screenshot", name="drawai_beautify", viewport=_VIEWPORT)
def test_drawai_media(page: Page, port, mock_langchain, mock_anthropic_sdk):
    p1, p2 = mock_langchain
    cfg_patch, anthropic_patch, _ = mock_anthropic_sdk
    # Import the module BEFORE applying the patches - cfg_patch/anthropic_patch
    # target names inside the module namespace, so it must be importable first.
    # Reloading inside the with-block would re-import the real load_config on
    # top of the patch (see test_drawai_ui.py), so use import_module here.
    importlib.import_module("examples.panels.ai.drawai_beautify")
    with p1, p2, cfg_patch, anthropic_patch:
        m = importlib.import_module("examples.panels.ai.drawai_beautify")
        app = m.build_app()
        server = pn.serve(app.servable(), port=port, threaded=True, show=False)
        time.sleep(0.5)
        page.goto(f"http://localhost:{port}")
        page.locator("text=Original").first.wait_for(timeout=20000)
        time.sleep(1.5)
        assert page.locator("text=Original").first.is_visible()
        server.stop()
