"""Example: AI chat with a custom LocalStorage tool.

Demonstrates how to create a custom ``BaseTool`` subclass and pass it
to ``AiChat`` via the ``tools`` parameter.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/chat_custom_tool.py``

The app is served through a factory so every browser session gets its own
instance (multi-user isolation). A module-level ``app`` shares one instance
across all browsers and is kept here only for Pyodide/portfolio builds.
"""

from typing import Literal

import panel as pn
from dotenv import load_dotenv
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from panelini import Panelini
from panelini.panels.ai import AiChat

load_dotenv()  # load .env if present


# -- Custom tool definition ---------------------------------------------------


class LocalStorageInput(BaseModel):
    """Input schema for the LocalStorage tool."""

    action: Literal["get", "set", "update", "delete", "list"] = Field(
        description="The operation to perform: get, set, update, delete, or list."
    )
    key: str | None = Field(
        default=None,
        description="The key to operate on (required for get/set/update/delete).",
    )
    value: str | None = Field(
        default=None,
        description="The value to store (required for set/update).",
    )


class LocalStorageTool(BaseTool):
    """In-memory key-value store exposed as a LangChain tool.

    Supports get, set, update, delete, and list operations.
    """

    name: str = "local_storage"
    description: str = (
        "A simple key-value store. Use this tool to persist and retrieve data "
        "during the conversation. Supported actions: "
        "get (retrieve a value by key), "
        "set (store a new key-value pair), "
        "update (update an existing key), "
        "delete (remove a key), "
        "list (list all stored keys)."
    )
    args_schema: type[BaseModel] = LocalStorageInput

    storage: dict[str, str] = Field(default_factory=dict)

    def _action_list(self) -> str:
        if not self.storage:
            return "Storage is empty."
        return f"Stored keys: {', '.join(self.storage.keys())}"

    def _action_get(self, key: str | None) -> str:
        if key is None:
            return "Error: 'key' is required for get."
        if key not in self.storage:
            return f"Key '{key}' not found."
        return f"{key} = {self.storage[key]}"

    def _action_set(self, key: str | None, value: str | None) -> str:
        if key is None or value is None:
            return "Error: 'key' and 'value' are required for set."
        if key in self.storage:
            return f"Key '{key}' already exists. Use 'update' to overwrite."
        self.storage[key] = value
        return f"Stored: {key} = {value}"

    def _action_update(self, key: str | None, value: str | None) -> str:
        if key is None or value is None:
            return "Error: 'key' and 'value' are required for update."
        if key not in self.storage:
            return f"Key '{key}' not found. Use 'set' to create it."
        old = self.storage[key]
        self.storage[key] = value
        return f"Updated: {key} = {value} (was: {old})"

    def _action_delete(self, key: str | None) -> str:
        if key is None:
            return "Error: 'key' is required for delete."
        if key not in self.storage:
            return f"Key '{key}' not found."
        del self.storage[key]
        return f"Deleted key '{key}'."

    def _run(
        self,
        action: str,
        key: str | None = None,
        value: str | None = None,
    ) -> str:
        actions = {
            "list": lambda: self._action_list(),
            "get": lambda: self._action_get(key),
            "set": lambda: self._action_set(key, value),
            "update": lambda: self._action_update(key, value),
            "delete": lambda: self._action_delete(key),
        }
        handler = actions.get(action)
        if handler is None:
            return f"Unknown action: {action}"
        return handler()

    async def _arun(
        self,
        action: str,
        key: str | None = None,
        value: str | None = None,
    ) -> str:
        return self._run(action=action, key=key, value=value)


# -- App setup ----------------------------------------------------------------


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    chat = AiChat(
        system_message="You are a helpful assistant with access to a local storage tool.",
        tools=[LocalStorageTool()],
    )
    app = Panelini(title="AI Chat with Custom Tool", sidebar_enabled=True)
    app.main_set(objects=[pn.Row(*chat.main_objects)])
    app.sidebar_set(objects=chat.sidebar_objects)
    return app


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    pn.serve(create_app, title="AI Chat with Custom Tool", port=5007)
