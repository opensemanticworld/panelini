"""Playwright test: PydanticEditor renders with the correct initial value."""

import time
from typing import Optional

import panel as pn
import pytest
from playwright.sync_api import Page
from pydantic import BaseModel, Field

from examples.panels.jsoneditor.jsoneditor_pydantic import PydanticEditor
from panelini.testing import stop_server, wait_until


class ASub(BaseModel):
    a: int = Field(..., description="prop a of sub property ASub")
    b: int = Field(..., description="prop b of sub property ASub")


class A(BaseModel):
    x: int = Field(..., description="x function_config")
    y: int = Field(..., description="y function_config")
    z: Optional[int] = Field(None, description="z function_config")
    sub: list[ASub] = Field([], description="sub property of A, which is of type ASub")


@pytest.fixture
def editor():
    a = A(x=1, y=2, z=3, sub=[ASub(a=1, b=2), ASub(a=4, b=3)])
    prev_sizing = pn.config.sizing_mode
    pn.config.sizing_mode = "stretch_width"  # fill the width so the form is not squeezed
    try:
        ed = PydanticEditor(A, value=a, format_array_tabs=True, format_dict_categories=False)
    finally:
        pn.config.sizing_mode = prev_sizing
    return ed, a


@pytest.mark.media(role="overview", capture="screenshot", viewport=(1200, 760))
def test_initial_value_displayed(page: Page, port, editor):
    """Editor renders with the Pydantic instance value, not schema defaults."""
    my_editor, a = editor
    server = pn.serve(my_editor, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    page.locator("#root\\[x\\]").wait_for()

    # Python-side value must still match the Pydantic instance after JS init
    assert my_editor.value == a.model_dump(), (
        f"Value was reset on serve: expected {a.model_dump()!r}, got {my_editor.value!r}"
    )

    # Fields rendered with the correct initial values
    assert page.locator("#root\\[x\\]").input_value() == str(a.x)
    assert page.locator("#root\\[y\\]").input_value() == str(a.y)

    stop_server(server)


def test_value_change_propagates_to_python(page: Page, port, editor):
    """Editing a field in the browser updates the Python-side value."""
    my_editor, _ = editor
    server = pn.serve(my_editor, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(f"http://localhost:{port}")
    page.locator("#root\\[x\\]").wait_for()

    page.locator("#root\\[x\\]").fill("42")
    page.locator("[for=root\\[x\\]]").click()  # blur to trigger change event
    wait_until(lambda: my_editor.value["x"] == 42)

    assert my_editor.value["x"] == 42

    stop_server(server)
