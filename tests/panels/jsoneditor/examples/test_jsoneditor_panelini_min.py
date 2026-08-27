# pip install panel pytest pytest-playwright
# playwright install
# pytest panel_frontend_test.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

# Build the editor stretched so the form fills the card (matches how the
# example is served standalone); restore the global afterwards.
_prev_sizing = pn.config.sizing_mode
pn.config.sizing_mode = "stretch_width"
from examples.panels.jsoneditor.jsoneditor_panelini_min import app, jsoneditor_panel  # noqa: E402

pn.config.sizing_mode = _prev_sizing

from panelini.testing import wait_until  # noqa: E402


@pytest.mark.media(role="feature", capture="screenshot", viewport=(1100, 760))
def test_component(page: Page, port):
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    # note: css selector for id=root[testxy] needs to escaped,
    # see https://stackoverflow.com/questions/1466103/escape-square-brackets-when-assigning-a-class-name-to-an-element
    page.locator("#root\\[testxy\\]").wait_for()
    # The input field attaches before the JSONEditor JS widget finishes its own
    # async init (get_value() returns None until then).
    wait_until(lambda: jsoneditor_panel.jsoneditor.get_value() is not None)

    # print(json.dumps(jsoneditor_panel.jsoneditor.get_value()))
    assert jsoneditor_panel.jsoneditor.get_value() == {"testxy": ""}

    page.locator("#root\\[testxy\\]").fill("test123")
    page.locator("[for=root\\[testxy\\]]").click()
    wait_until(lambda: jsoneditor_panel.jsoneditor.get_value() == {"testxy": "test123"})

    # click the Panel save button (not the JSON editor's internal save button)
    page.locator("button.bk-btn:has-text('Save')").click()

    # check if the title span contains "Updated Title" (target span, not button)
    page.locator(".je-object__title > span", has_text="Updated Title").wait_for()

    assert page.locator("#root\\[testxy\\]").input_value() == "test123"

    jsoneditor_panel.jsoneditor.set_value({"testxy": "new value"})
    # assert that the input field has the value "new value"
    wait_until(lambda: page.locator("#root\\[testxy\\]").input_value() == "new value")

    server.stop()
