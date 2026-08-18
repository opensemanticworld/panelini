"""Per-user chat history for the Panelini AI chat panel.

User identity resolution and conversation persistence. No LangChain
dependency: works without the ``[ai]`` extras and under the
:mod:`panelini.ai_testing` stubs.
"""

__all__ = [
    "COOKIE_NAME",
    "DEFAULT_TITLE",
    "LOCAL_USER_ID",
    "ChatHistoryStore",
    "ConversationRecord",
    "CookieSetterPane",
    "FolderRecord",
    "InMemoryHistoryStore",
    "MessageRecord",
    "SqliteHistoryStore",
    "UserResolver",
    "default_user_resolver",
    "ensure_anonymous_cookie",
    "resolve_user",
]

from .sqlite_store import SqliteHistoryStore
from .store import (
    DEFAULT_TITLE,
    ChatHistoryStore,
    ConversationRecord,
    FolderRecord,
    InMemoryHistoryStore,
    MessageRecord,
)
from .user import (
    COOKIE_NAME,
    LOCAL_USER_ID,
    CookieSetterPane,
    UserResolver,
    default_user_resolver,
    ensure_anonymous_cookie,
    resolve_user,
)
