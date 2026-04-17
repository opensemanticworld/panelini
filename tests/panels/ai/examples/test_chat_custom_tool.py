"""Playwright UI tests for examples/panels/ai/chat_custom_tool.py."""

import time
from typing import Literal

import panel as pn
import pytest
from langchain_core.tools import BaseTool
from playwright.sync_api import Page
from pydantic import BaseModel, Field

from panelini import Panelini
from panelini.panels.ai import AiChat

_PORT = 6320


# ── Reproduce the custom tool from the example ──────────────────


class LocalStorageInput(BaseModel):
    """Input schema for the LocalStorage tool."""

    action: Literal["get", "set", "update", "delete", "list"] = Field(
        description="The operation to perform: get, set, update, delete, or list."
    )
    key: str | None = Field(default=None, description="The key to operate on.")
    value: str | None = Field(default=None, description="The value to store.")


class LocalStorageTool(BaseTool):
    """In-memory key-value store exposed as a LangChain tool."""

    name: str = "local_storage"
    description: str = "A simple key-value store."
    args_schema: type[BaseModel] = LocalStorageInput
    storage: dict[str, str] = Field(default_factory=dict)

    def _run(self, action: str, key: str | None = None, value: str | None = None) -> str:
        return f"{action}: {key}={value}"

    async def _arun(self, action: str, key: str | None = None, value: str | None = None) -> str:
        return self._run(action=action, key=key, value=value)


# ── Fixtures ─────────────────────────────────────────────────────


@pytest.fixture(scope="module")
def panel_server(mock_langchain):
    """Serve the real custom-tool AiChat app with mocked LangChain."""
    p1, p2 = mock_langchain
    with p1, p2:
        chat = AiChat(
            system_message="You are a helpful assistant with access to a local storage tool.",
            tools=[LocalStorageTool()],
        )
        app = Panelini(
            title="AI Chat with Custom Tool",
            sidebar_enabled=True,
            header_background_image=None,
            content_background_image=None,
        )
        app.main_set(objects=[pn.Row(*chat.main_objects)])
        app.sidebar_set(objects=chat.sidebar_objects)

        server = pn.serve(app.servable(), port=_PORT, threaded=True, show=False)
        time.sleep(0.5)
        yield server, _PORT
        server.stop()


@pytest.fixture(scope="module")
def ready_page(browser, panel_server):
    """Browser page navigated and ready."""
    _, port = panel_server
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{port}")
    page.locator("text=Hello! 👋").first.wait_for()
    yield page
    page.goto("about:blank")
    context.close()


# ── Tests ────────────────────────────────────────────────────────


def test_custom_tool_renders(ready_page: Page):
    """Verify the custom-tool chat example renders its main UI elements."""
    page = ready_page

    # Chat and Preview cards are visible
    assert page.locator("text=Chat").first.is_visible()
    assert page.locator("text=Preview").first.is_visible()

    # Welcome message is shown
    assert page.locator("text=Hello! 👋").first.is_visible()


def test_local_storage_tool_toggle(ready_page: Page):
    """Clicking the Local Storage checkbox in the sidebar sends a system message."""
    page = ready_page

    # Click the actual <input> inside the Bokeh Checkbox shadow DOM.
    # get_by_text("Local Storage") finds the .bk-label sibling, not the input.
    page.locator(".bk-Checkbox", has_text="Local Storage").locator("input[type=checkbox]").click()

    # System message confirming the tool update should appear in the chat
    page.locator("text=Tools updated").first.wait_for(timeout=5000)
    assert page.locator("text=Tools updated").first.is_visible()
    assert page.locator("text=2 tool(s) now available").first.is_visible()
