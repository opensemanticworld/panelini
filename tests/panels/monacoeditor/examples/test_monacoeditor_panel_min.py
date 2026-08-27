# pip install panel pytest pytest-playwright
# playwright install
# pytest tests/panels/monacoeditor/examples --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page, expect

from examples.panels.monacoeditor.monacoeditor_panel_min import App

# The hidden textarea Monaco listens on is overlaid by the rendered text spans, so
# Playwright refuses to click it. Click the visible lines instead.
DATA_EDITOR_LINES = ".view-lines >> nth=1"

# Monaco reports schema violations as warnings; only syntax errors are errors.
MARKER = ".squiggly-warning, .squiggly-error"


@pytest.fixture
def app(page: Page, port):
    app = App()
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    page.locator(".view-lines").first.wait_for()
    page.wait_for_timeout(3000)
    try:
        yield app
    finally:
        server.stop()


def _place_cursor_in_object(page: Page):
    """Put the caret on the last property line, inside the object braces."""
    page.locator(DATA_EDITOR_LINES).click()
    page.keyboard.press("Control+End")
    page.keyboard.press("ArrowUp")
    page.keyboard.press("End")


def test_schema_violation_is_flagged(page: Page, app):
    app.data_editor.set_json({"name": "Ada", "age": "not-an-int"})
    page.locator(MARKER).first.wait_for(timeout=15000)


def test_hover_shows_schema_message(page: Page, app):
    app.data_editor.set_json({"name": "Ada", "age": "not-an-int"})
    marker = page.locator(MARKER).first
    marker.wait_for(timeout=15000)

    box = marker.bounding_box()
    assert box is not None
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)

    # Each editor also owns a permanently hidden glyph-margin hover, so match on visible.
    hover = page.locator(".monaco-hover:visible").first
    hover.wait_for(state="visible", timeout=15000)
    expect(hover).to_contain_text("integer")
    expect(hover).to_contain_text("Age in whole years")


def test_completion_offers_schema_properties(page: Page, app):
    _place_cursor_in_object(page)
    page.keyboard.type(',"')
    page.keyboard.press("Control+Space")

    suggest = page.locator(".suggest-widget").first
    suggest.wait_for(state="visible", timeout=15000)
    expect(suggest).to_contain_text("name")

    # The popup escapes the 400px editor box, so it must stay inside the viewport.
    box = suggest.bounding_box()
    viewport = page.viewport_size
    assert box is not None
    assert viewport is not None
    assert box["height"] > 0, "suggest widget collapsed to zero height"
    assert box["y"] >= 0, f"suggest widget starts above the viewport: {box}"
    assert box["y"] + box["height"] <= viewport["height"], f"suggest widget is cut off below: {box}"
    assert box["x"] + box["width"] <= viewport["width"], f"suggest widget is cut off right: {box}"


def test_codicon_font_is_registered_on_the_document(page: Page, app):
    """Panel scopes _stylesheets to the shadow root, where @font-face is ignored."""
    families = page.evaluate("() => { const f = []; document.fonts.forEach(x => f.push(x.family)); return f; }")
    assert "codicon" in families, f"codicon font not registered on the document: {families}"


def test_schema_edit_updates_validation(page: Page, app):
    app.data_editor.set_json({"name": "Ada", "age": "not-an-int"})
    page.locator(MARKER).first.wait_for(timeout=15000)

    # Widening the schema clears the violation without touching the data editor.
    app.schema_editor.set_json({"type": "object", "properties": {"age": {"type": "string"}}})
    expect(page.locator(MARKER)).to_have_count(0, timeout=15000)
