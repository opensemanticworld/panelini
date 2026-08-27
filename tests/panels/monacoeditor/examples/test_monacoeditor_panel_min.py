# pip install panel pytest pytest-playwright
# playwright install
# pytest tests/panels/monacoeditor/examples --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page, expect

from examples.panels.monacoeditor.monacoeditor_panel_min import App

# The hidden textarea Monaco listens on is overlaid by the rendered text spans, so
# Playwright refuses to click it. Click the visible lines instead.
DATA_EDITOR_LINES = ".view-lines >> nth=1"


def _serve(page: Page, port: int) -> App:
    app = App()
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    page.locator(".view-lines").first.wait_for()
    return app, server


def test_validation_hover_and_completion(page: Page, port):
    app, server = _serve(page, port)
    try:
        page.locator(DATA_EDITOR_LINES).click()
        page.keyboard.press("Control+A")
        page.keyboard.type('{"name": "Ada", "age": "not-an-int"')

        # Validation: the JSON worker flags the type violation.
        squiggle = page.locator(".squiggly-error").first
        squiggle.wait_for(timeout=15000)

        # Hover: the schema message shows up in a hover widget.
        squiggle.hover()
        hover = page.locator(".monaco-hover").first
        hover.wait_for(timeout=15000)
        expect(hover).to_contain_text("integer")

        # Completion: Ctrl+Space inside the object offers the schema's properties.
        page.locator(DATA_EDITOR_LINES).click()
        page.keyboard.press("Control+A")
        page.keyboard.type('{"')
        page.keyboard.press("Control+Space")
        suggest = page.locator(".suggest-widget").first
        suggest.wait_for(state="visible", timeout=15000)
        expect(suggest).to_contain_text("name")
        expect(suggest).to_contain_text("age")

        # The popup must not be clipped by the editor box or pushed off screen.
        box = suggest.bounding_box()
        viewport = page.viewport_size
        assert box is not None
        assert box["height"] > 0, "suggest widget collapsed to zero height"
        assert box["y"] >= 0, f"suggest widget starts above the viewport: {box}"
        assert box["y"] + box["height"] <= viewport["height"], f"suggest widget is cut off below: {box}"
        assert box["x"] + box["width"] <= viewport["width"], f"suggest widget is cut off to the right: {box}"
    finally:
        server.stop()


def test_schema_edit_updates_validation(page: Page, port):
    app, server = _serve(page, port)
    try:
        # Widen the schema so the previously invalid value becomes acceptable.
        app.schema_editor.set_json({"type": "object", "properties": {"age": {"type": "string"}}})
        page.locator(DATA_EDITOR_LINES).click()
        page.keyboard.press("Control+A")
        page.keyboard.type('{"age": "not-an-int"')
        page.wait_for_timeout(3000)
        assert page.locator(".squiggly-error").count() == 0
    finally:
        server.stop()
