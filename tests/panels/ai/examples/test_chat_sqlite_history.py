"""Playwright UI tests for examples/panels/ai/chat_sqlite_history.py."""

import importlib
import os
import sqlite3
import time
import warnings
from unittest.mock import patch

import panel as pn
import pytest
from bokeh.util.warnings import BokehUserWarning
from playwright.sync_api import Page

from panelini.ai_testing import StubChatModel

_PORTS = (6360, 6361)  # one per server generation, avoids rebind races
_MODULE = "examples.panels.ai.chat_sqlite_history"


@pytest.fixture()
def history_db(tmp_path):
    """Point the example at a temp database via its env override."""
    db_path = tmp_path / "history.sqlite3"
    previous = os.environ.get("PANELINI_HISTORY_DB")
    os.environ["PANELINI_HISTORY_DB"] = str(db_path)
    yield db_path
    if previous is None:
        os.environ.pop("PANELINI_HISTORY_DB", None)
    else:
        os.environ["PANELINI_HISTORY_DB"] = previous


def _serve(port: int):
    """(Re)import the example (fresh store on the same file) and serve it."""
    module = importlib.reload(importlib.import_module(_MODULE))
    server = pn.serve(module.create_app, port=port, threaded=True, show=False)
    time.sleep(0.5)
    return module, server


def _open_sidebar(page: Page, port: int) -> None:
    page.goto(f"http://localhost:{port}")
    page.locator(".chat-interface textarea").first.wait_for()
    page.locator(".left-navbar-button").first.click()
    page.locator("text=Conversations").first.wait_for()


def _send_message(page: Page, text: str) -> None:
    box = page.locator("textarea:visible").first
    box.click()
    box.fill(text)
    box.press("Enter")
    page.locator("text=simulated reply >> visible=true").first.wait_for(timeout=20000)


def test_history_survives_a_server_restart(browser, mock_langchain, history_db):
    """A chat lands in the SQLite file and replays after a full restart.

    The same browser context is used for both visits: the anonymous user id
    lives in its cookie jar, and history is owned by that user.
    """
    config_patch, _ = mock_langchain
    model_patch = patch(
        "panelini.panels.ai.utils.ai_interface.AiInterface._initialize_model",
        return_value=StubChatModel(),
    )
    with warnings.catch_warnings(), config_patch, model_patch:
        # tripwire: any double-attached component fails the test
        warnings.simplefilter("error", BokehUserWarning)
        context = browser.new_context()
        try:
            page = context.new_page()

            # first server: create a conversation
            module, server = _serve(_PORTS[0])
            assert history_db == module.DB_PATH  # the env override is honored
            try:
                _open_sidebar(page, _PORTS[0])
                _send_message(page, "Persist me across restarts")
                page.locator(".wb-row", has_text="Persist me").first.wait_for()
            finally:
                server.stop()

            # the conversation is a document row in the SQLite file
            with sqlite3.connect(history_db) as conn:
                count = conn.execute("SELECT COUNT(*) FROM documents WHERE kind = 'conversation'").fetchone()[0]
            assert count == 1

            # second server: a fresh store instance reads the same file
            _, server = _serve(_PORTS[1])
            try:
                _open_sidebar(page, _PORTS[1])
                row = page.locator(".wb-row", has_text="Persist me").first
                row.wait_for()
                row.click()
                replayed = page.locator(".chat-interface").locator("text=Persist me across restarts").first
                replayed.wait_for()
                assert replayed.is_visible()
            finally:
                server.stop()
        finally:
            context.close()
