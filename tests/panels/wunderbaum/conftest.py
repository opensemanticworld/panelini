"""Shared configuration and fixtures for testing Wunderbaum panel."""

import panel as pn
import pytest

PORT = [7000]


@pytest.fixture
def port():
    PORT[0] += 1
    return PORT[0]


@pytest.fixture(autouse=True)
def server_cleanup():
    """
    Clean up server state after each test.
    """
    try:
        yield
    finally:
        pn.state.reset()
