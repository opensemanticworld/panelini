"""Playwright test: panelini JsonEditor and pn.widgets.JSONEditor coexist."""

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.jsoneditor.jsoneditor_both_min import app, form_editor, tree_editor
from panelini.testing import wait_until


def test_both_editors(page: Page, port):
    url = f"http://localhost:{port}"

    # Capture JS console errors
    js_errors = []
    page.on("pageerror", lambda err: js_errors.append(str(err)))

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    # Panelini form editor rendered (json-editor/json-editor uses .je-object__title)
    page.locator(".je-object__title").first.wait_for()
    # Panel JSONEditor rendered (josdejong/jsoneditor uses .jsoneditor class)
    page.locator(".jsoneditor").first.wait_for()

    # No JS errors from global name conflicts
    conflict_errors = [e for e in js_errors if "JSONEditor" in e]
    assert conflict_errors == [], f"JS errors related to JSONEditor: {conflict_errors}"

    # Interact with form editor: fill the "name" field
    page.locator("#root\\[name\\]").fill("test123")
    page.locator("[for=root\\[name\\]]").click()
    wait_until(lambda: form_editor.get_value().get("name") == "test123")
    assert form_editor.get_value()["name"] == "test123"

    # Interact with tree editor: verify Python-side value unchanged
    assert tree_editor.value["string"] == "A string"

    server.stop()
