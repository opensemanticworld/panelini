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
        _await_stopping_servers()
        pn.state.reset()


def _await_stopping_servers() -> None:
    """Wait for the threads a test has already asked to stop.

    `pn.serve(threaded=True)` returns a `StoppableThread` whose `stop` only schedules
    the shutdown coroutine and returns, so the thread is still alive for a moment
    after a test stops the server it served. `pn.state.reset()` below stops every
    registered thread a second time, and `StoppableThread.stop` raises
    `RuntimeError: Thread already stopping` when it finds a shutdown it has not
    finished yet. Locally the page teardown that runs before this fixture is enough
    of a gap; on a loaded runner it is not.

    Joining first closes the window, because a thread that has exited is one `stop`
    returns from at its first line. Only threads that are already stopping are waited
    on: a test that failed before its own `server.stop()` still has `pn.state.reset()`
    to stop it, and must not pay the timeout here.
    """
    for thread in list(pn.state._threads.values()):
        if thread._shutdown_task is not None:
            thread.join(timeout=10)
