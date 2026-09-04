"""Shared configuration and fixtures for testing the TanstackTable panel."""

import panel as pn
import pytest

from panelini.testing import free_port


@pytest.fixture
def port():
    return free_port()


@pytest.fixture(autouse=True)
def server_cleanup():
    """Clean up server state after each test.

    `panel.config.raw_css` is process global and every `Panelini(...)` appends the
    application stylesheet to it, so an example test would otherwise style the
    components the next test serves. Panel puts that CSS inside each component's
    shadow root, and `main.css` turns the focus outline off there with an
    `!important` rule, which the panel's own tests measure.
    """
    raw_css = list(pn.config.raw_css)
    try:
        yield
    finally:
        pn.config.raw_css = raw_css
        pn.state.reset()
