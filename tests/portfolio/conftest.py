"""Fixtures for the Pyodide portfolio app tests.

These tests load the *built* Pyodide/WASM apps (``docs/_static/portfolio/apps/``)
in a real browser and assert each one actually renders its widget - closing the gap
left by the ``tests/panels/*/examples/`` tests, which only exercise the ``pn.serve()``
server version, never the converted WASM app.

The apps are gitignored build artifacts produced by ``make portfolio``; if they are
missing the whole module is skipped with a hint. ``file://`` does not work - the
converted worker is a Web Worker and micropip fetches the panelini wheel by relative
URL, both of which need a real HTTP origin, so we serve the static tree over a
throwaway ``http.server``.
"""

import functools
import http.server
import socket
import threading
from pathlib import Path

import pytest

_REPO = Path(__file__).resolve().parents[2]
_PORTFOLIO_ROOT = _REPO / "docs" / "_static" / "portfolio"
_APPS_DIR = _PORTFOLIO_ROOT / "apps"

if not _APPS_DIR.is_dir() or not any(_APPS_DIR.glob("*/*.html")):
    pytest.skip(
        "Pyodide portfolio apps not built, run `make portfolio` first.",
        allow_module_level=True,
    )


def _free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(("", 0))
        return s.getsockname()[1]


@pytest.fixture(scope="session")
def apps_base_url():
    """Serve ``docs/_static/portfolio/`` over HTTP for the duration of the session.

    Yields the base URL; an app lives at ``{base}/apps/<category>/<stem>.html``.
    """
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(_PORTFOLIO_ROOT))
    # Quiet the per-request logging that SimpleHTTPRequestHandler writes to stderr.
    handler.log_message = lambda *a, **k: None  # type: ignore[assignment]
    port = _free_port()
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{port}"
    finally:
        server.shutdown()
        server.server_close()
