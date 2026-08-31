"""Shared configuration and fixtures for testing the TanstackTable panel."""

import panel as pn
import pytest

from panelini.testing import free_port


@pytest.fixture
def port():
    return free_port()


@pytest.fixture(autouse=True)
def server_cleanup():
    """
    Clean up server state after each test.
    """
    try:
        yield
    finally:
        pn.state.reset()
