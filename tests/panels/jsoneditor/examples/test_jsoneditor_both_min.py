"""Playwright test: panelini JsonEditor and pn.widgets.JSONEditor coexist."""

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.jsoneditor.jsoneditor_both_min import app, form_editor, tree_editor


@pytest.mark.media(role="feature", capture="screenshot")
def test_both_editors(page: Page, port):
    url = f"http://localhost:{port}"

    # Capture JS console errors
    js_errors = []
    page.on("pageerror", lambda err: js_errors.append(str(err)))

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(3)  # wait for both editors to load

    # Panelini form editor rendered (json-editor/json-editor uses .je-object__title)
    assert page.locator(".je-object__title").count() > 0, "Form editor did not render"

    # Panel JSONEditor rendered (josdejong/jsoneditor uses .jsoneditor class)
    assert page.locator(".jsoneditor").count() > 0, "Tree editor did not render"

    # No JS errors from global name conflicts
    conflict_errors = [e for e in js_errors if "JSONEditor" in e]
    assert conflict_errors == [], f"JS errors related to JSONEditor: {conflict_errors}"

    # Interact with form editor: fill the "name" field
    page.locator("#root\\[name\\]").fill("test123")
    page.locator("[for=root\\[name\\]]").click()
    time.sleep(0.5)
    assert form_editor.get_value()["name"] == "test123"

    # Interact with tree editor: verify Python-side value unchanged
    assert tree_editor.value["string"] == "A string"

    server.stop()
