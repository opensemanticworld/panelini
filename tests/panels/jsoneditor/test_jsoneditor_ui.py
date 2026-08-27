"""UI tests for JsonEditor - require a headless browser via Playwright.

Importing from playwright auto-marks every test in this module with the
``ui`` marker (see tests/conftest.py), so these tests are excluded from
``make test`` and only run via ``make test-ui`` or ``make test-full``.
"""

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.jsoneditor import JsonEditor
from panelini.testing import wait_until


@pytest.mark.ui
def test_initial_value_not_reset_on_serve(page: Page, port):
    """The Python-side value must survive the JS initialisation change event.

    Without the startval fix the JSONEditor boots with schema defaults, fires a
    'change' event, and save_changes() overwrites the Python value with those
    defaults. This test connects a real browser so the JS actually executes.
    """
    initial_value = {"testxy": "hello"}
    editor = JsonEditor(value=initial_value)

    server = pn.serve(editor, port=port, threaded=True, show=False)
    page.goto(f"http://localhost:{port}")

    # 'ready' fires after the initial 'change' event, so once editor.ready
    # is True the value has already been set (or incorrectly reset).
    wait_until(lambda: editor.ready, timeout=10)

    assert editor.ready, "JSONEditor did not become ready within 10 s"
    assert editor.value == initial_value, f"Value was reset on serve: expected {initial_value!r}, got {editor.value!r}"

    server.stop()
