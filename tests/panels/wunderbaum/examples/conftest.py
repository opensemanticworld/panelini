"""Shared fixtures for wunderbaum examples Playwright tests."""

import pytest


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override parent fixture - don't reset Panel state mid-run.

    Several example tests in this directory share one module-scoped
    ``pn.serve()`` across all tests in a file; ``pn.state.reset()`` after
    every test would tear down that shared server's session state.
    """
    yield
