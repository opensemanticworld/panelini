"""Shared configuration and fixtures for testing the TanstackTable panel."""

import contextlib

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
        _join_servers()
        pn.state.reset()


def _join_servers() -> None:
    """Stop every served app and wait for its thread, before `pn.state.reset()` does.

    `pn.serve(threaded=True)` returns a `StoppableThread` whose `stop` only schedules
    the shutdown coroutine and returns, so a thread a test stopped is still alive for
    a moment afterwards. `pn.state.reset()` below stops every registered thread again,
    and that second `stop` raises whichever way it lands in the window: while the
    shutdown is pending it is `RuntimeError: Thread already stopping`, and after the
    coroutine has cleared its own handle but before the thread has finished closing
    its loop it is `RuntimeError: Event loop is closed`. Locally the page teardown
    running ahead of this fixture is a wide enough gap; on a loaded runner it is not.

    So ask once here, tolerating both, and then wait. A thread that has exited is one
    `kill_all_servers` returns from at its first line, which leaves no window at all.
    Stopping rather than only joining is what covers a test that failed before its own
    `server.stop()`, whose thread would otherwise never be asked to finish.
    """
    for thread in list(pn.state._threads.values()):
        with contextlib.suppress(RuntimeError):
            thread.stop()
        thread.join(timeout=10)
