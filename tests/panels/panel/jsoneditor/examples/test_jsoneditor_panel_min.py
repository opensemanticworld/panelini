# pip install panel pytest pytest-playwright
# playwright install
# pytest panel_frontend_test.py --headed --slowmo 1000

import os
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.jsoneditor.jsoneditor_panel_min import App


# Skip in CI environments, run locally via command line
@pytest.mark.skipif(os.getenv("CI") is not None, reason="Playwright tests do not run in CI")
def test_component(page: Page, port):
    app = App()
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for page to load

    # print(json.dumps(app.jsoneditor.get_value()))
    assert app.jsoneditor.get_value() == {"testxy": ""}

    # note: css selector for id=root[testxy] needs to escaped,
    # see https://stackoverflow.com/questions/1466103/escape-square-brackets-when-assigning-a-class-name-to-an-element
    page.locator("#root\\[testxy\\]").fill("test123")
    page.locator("[for=root\\[testxy\\]]").click()
    time.sleep(0.5)  # wait for change event to propagate
    assert app.jsoneditor.get_value() == {"testxy": "test123"}

    # click the Panel save button (not the JSON editor's internal save button)
    page.locator("button.bk-btn:has-text('Save')").click()

    time.sleep(0.5)  # wait for save action to complete
    # check if the title span contains "Updated Title" (target span, not button)
    assert page.locator(".je-object__title > span").text_content() == "Updated Title"

    assert page.locator("#root\\[testxy\\]").input_value() == "test123"

    app.jsoneditor.set_value({"testxy": "new value"})
    time.sleep(0.5)
    # assert that the input field has the value "new value"
    assert page.locator("#root\\[testxy\\]").input_value() == "new value"

    server.stop()
