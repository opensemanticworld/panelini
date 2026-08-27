"""Shared configuration and fixtures for testing usecases."""

import pytest

from panelini.testing import free_port


@pytest.fixture
def port():
    return free_port()


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override - don't reset Panel state mid-run.

    These usecase tests share one module-scoped ``pn.serve()`` across all
    tests in a file; ``pn.state.reset()`` after every test would tear down
    that shared server's session state. Teardown instead calls
    ``pn.state.kill_all_servers()`` explicitly once, at module end.
    """
    yield
