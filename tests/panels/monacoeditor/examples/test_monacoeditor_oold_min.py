# pip install panel pytest pytest-playwright
# playwright install
# pytest tests/panels/monacoeditor/examples --headed --slowmo 1000
#
# The example fetches its schema from the OO-LD registry at import time, so these tests
# need network access to oo-ld.org. Nothing is fetched from the browser once the app is
# running.

import time

import panel as pn
import pytest
from playwright.sync_api import Page, expect

from examples.panels.monacoeditor.monacoeditor_oold_min import DATA, SCHEMA, App

# Both editors render into the same page, so every locator has to be scoped to one of
# them. `.overflow-guard` is the per-editor root; `.monaco-editor` also matches the
# hover and suggest widgets, so it does not work here.
SCHEMA_EDITOR = ".overflow-guard >> nth=0"
DATA_EDITOR = ".overflow-guard >> nth=1"

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


def test_registry_schema_is_an_oold_quantityvalue():
    """The fetched document must be the OO-LD QuantityValue schema, not a redirect page."""
    assert SCHEMA["title"] == "QuantityValue"
    assert SCHEMA["required"] == ["value"]
    assert set(SCHEMA["properties"]) >= {"value", "unit", "standard_uncertainty"}
    # OO-LD adds a JSON-LD context on top of plain JSON Schema.
    assert "@context" in SCHEMA
    assert SCHEMA["@context"]["value"] == "qudt:value"


def test_example_instance_comes_from_the_schema():
    """The starting document is the schema's own example, so it must validate."""
    assert DATA["value"] == 12.7
    assert DATA["unit"] == "http://qudt.org/vocab/unit/SEC"


def test_schema_is_displayed_as_authored():
    """The `$schema` line is what marks the document as OO-LD, so it must stay visible."""
    editor = App().schema_editor
    assert editor.get_json() == SCHEMA
    assert editor.get_json()["$schema"] == "https://oo-ld.org/latest/meta/oold-meta-schema.json"
    # Which is only tolerable because the resulting complaint is silenced.
    assert editor.schema_request == "ignore"


def test_schema_editor_shows_no_markers(page: Page, app):
    """`schema_request="ignore"` must silence the unresolvable `$schema` complaint.

    Monaco reports an unresolvable `$schema` within ~50 ms of first render and the
    fixture waits three seconds, so the marker would long since be here. Do not rewrite
    this as break-then-restore: `to_have_count(0)` passes on its first poll, which beats
    the re-resolution and makes the assertion vacuous. The test below is the control.
    """
    expect(page.locator(SCHEMA_EDITOR).locator(MARKER)).to_have_count(0, timeout=5000)


def test_schema_request_warning_reports_the_unresolvable_pointer(page: Page, app):
    """Control for the test above: at the default severity the pointer *is* flagged.

    Both editors then sit at "warning", so the page-wide merge settles there too.
    """
    app.schema_editor.schema_request = "warning"
    page.locator(SCHEMA_EDITOR).locator(MARKER).first.wait_for(timeout=15000)


def test_editors_fill_the_viewport_height(page: Page, app):
    """Both editors stretch to the window instead of sitting at the 400px default."""
    viewport = page.viewport_size["height"]
    for index in (0, 1):
        box = page.locator(".overflow-guard").nth(index).bounding_box()
        assert box is not None
        assert box["height"] > viewport * 0.7, f"editor {index} is only {box['height']}px of {viewport}px"


def test_unknown_oold_keywords_do_not_break_validation(page: Page, app):
    """`@context` and `x-oold-*` are not JSON Schema; the valid instance must stay clean."""
    app.data_editor.set_json(DATA)
    expect(page.locator(DATA_EDITOR).locator(MARKER)).to_have_count(0, timeout=15000)


def test_wrong_type_is_flagged(page: Page, app):
    """`value` is declared as a number, so a string must raise a marker."""
    app.data_editor.set_json({**DATA, "value": "twelve point seven"})
    page.locator(DATA_EDITOR).locator(MARKER).first.wait_for(timeout=15000)


def test_missing_required_value_is_flagged(page: Page, app):
    app.data_editor.set_json({"unit": "http://qudt.org/vocab/unit/SEC"})
    page.locator(DATA_EDITOR).locator(MARKER).first.wait_for(timeout=15000)


def test_hover_shows_oold_property_description(page: Page, app):
    """Descriptions authored in the OO-LD schema must reach the editor hover."""
    app.data_editor.set_json({**DATA, "standard_uncertainty": "not-a-number"})
    marker = page.locator(DATA_EDITOR).locator(MARKER).first
    marker.wait_for(timeout=15000)

    box = marker.bounding_box()
    assert box is not None
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)

    # Each editor also owns a permanently hidden glyph-margin hover, so match on visible.
    hover = page.locator(".monaco-hover:visible").first
    hover.wait_for(state="visible", timeout=15000)
    expect(hover).to_contain_text("number")
    expect(hover).to_contain_text("GUM convention")


def test_completion_offers_oold_properties(page: Page, app):
    """Put the caret on the last property line, inside the object braces."""
    page.locator(DATA_EDITOR_LINES).click()
    page.keyboard.press("Control+End")
    page.keyboard.press("ArrowUp")
    page.keyboard.press("End")
    page.keyboard.type(',"')
    page.keyboard.press("Control+Space")

    suggest = page.locator(".suggest-widget").first
    suggest.wait_for(state="visible", timeout=15000)
    expect(suggest).to_contain_text("relative_standard_uncertainty")
