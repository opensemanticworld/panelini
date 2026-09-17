"""Per-user chat history for the Panelini AI chat panel.

Conversation persistence plus re-exports of :mod:`panelini.user`. No
LangChain dependency: works without the ``[ai]`` extras and under the
:mod:`panelini.ai_testing` stubs.
"""

__all__ = [
    "COOKIE_NAME",
    "DEFAULT_TITLE",
    "LOCAL_USER_ID",
    "ChatHistoryStore",
    "ConversationRecord",
    "CookieSetterPane",
    "DocumentHistoryStore",
    "FolderRecord",
    "HistoryPanel",
    "HistoryTree",
    "InMemoryHistoryStore",
    "LocalStorageHistoryStore",
    "MessageRecord",
    "SqliteHistoryStore",
    "UserResolver",
    "default_history_store",
    "default_user_resolver",
    "derive_title",
    "ensure_anonymous_cookie",
    "resolve_user",
]

from typing import TYPE_CHECKING

from panelini.user import (
    COOKIE_NAME,
    LOCAL_USER_ID,
    CookieSetterPane,
    UserResolver,
    default_user_resolver,
    ensure_anonymous_cookie,
    resolve_user,
)

from .default import default_history_store
from .document import DocumentHistoryStore, InMemoryHistoryStore
from .local_storage_store import LocalStorageHistoryStore
from .panel import HistoryPanel
from .store import (
    DEFAULT_TITLE,
    ChatHistoryStore,
    ConversationRecord,
    FolderRecord,
    MessageRecord,
    derive_title,
)
from .tree import HistoryTree

if TYPE_CHECKING:
    from .sqlite_store import SqliteHistoryStore


def __getattr__(name: str) -> object:
    """Resolve ``SqliteHistoryStore`` on demand: sqlite3 is missing under Pyodide."""
    if name == "SqliteHistoryStore":
        from .sqlite_store import SqliteHistoryStore

        return SqliteHistoryStore
    msg = f"module {__name__!r} has no attribute {name!r}"
    raise AttributeError(msg)
