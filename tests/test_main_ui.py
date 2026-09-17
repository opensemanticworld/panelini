"""The application shell, in a browser.

``main.css`` is appended to ``panel.config.raw_css`` by every ``Panelini(...)``, and
Panel injects that stylesheet into the shadow root of every component an application
holds. A rule in it therefore reaches inside every panel this repository ships, which
is what the test below pins down: whatever the shell styles, a keyboard user still
has to be able to see where the keyboard is.

Importing from playwright auto-marks this module ``ui`` (see tests/conftest.py), so
it runs with ``make test-ui`` rather than with ``make test``.
"""

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.main import Panelini
from panelini.panels.tanstack.table import TanstackTable
from panelini.testing import free_port
from tests.panels.tanstack.table.helpers import start

SOURCE = [
    {
        "key": "a",
        "title": "Folder A",
        "children": [{"key": "a1", "title": "File A1"}],
    },
]


@pytest.fixture
def port():
    return free_port()


@pytest.fixture(autouse=True)
def server_cleanup():
    """Undo what building an application leaves behind in the Panel process.

    ``pn.config.raw_css`` is process global and is appended to rather than replaced,
    so without this every later test in the run would be served the shell's CSS too.
    """
    raw_css = list(pn.config.raw_css)
    try:
        yield
    finally:
        pn.config.raw_css = raw_css
        pn.state.reset()


def tab_to_a_toolbar_button(page: Page, limit: int = 30):
    """Walk the tab order until a panel toolbar button has focus.

    Reached by pressing Tab rather than by calling ``focus()``, because
    ``:focus-visible`` is a statement about how the element was reached: a browser
    matches it for a keyboard focus and not for a programmatic one, so a focus set
    from script would prove nothing about what a keyboard user sees.
    """
    focused = page.locator(".pnl-tst-tbtn:focus")
    for _ in range(limit):
        page.keyboard.press("Tab")
        if focused.count() == 1:
            break
    assert focused.count() == 1, "no toolbar button was reached in the tab order"
    return focused.first


def test_a_button_inside_an_application_keeps_its_focus_ring(page: Page, port):
    """The shell's stylesheet may not take a component's focus ring away.

    ``main.css`` used to carry ``button:focus { outline: none !important }``, which
    left no button of any panel showing where the keyboard was, this panel's toolbar
    and its dialog included. Measured as a computed style rather than as a rule,
    because what matters is what the button ends up drawing.
    """
    table = TanstackTable(source=SOURCE, options={"toolbar": ["add", "rename", "delete"], "expand_all": True})
    app = Panelini(title="focus ring", sidebar_visible=False)
    app.main_set(objects=[table])
    server = start(app, page, port)
    page.locator(".pnl-tst-tbtn").first.wait_for(state="visible", timeout=15000)

    button = tab_to_a_toolbar_button(page)

    style = button.evaluate("element => getComputedStyle(element).outlineStyle")
    width = button.evaluate("element => getComputedStyle(element).outlineWidth")
    assert style == "solid"
    assert width != "0px"

    server.stop()
