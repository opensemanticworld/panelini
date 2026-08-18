"""Per-user chat history for the Panelini AI chat panel.

This package provides user identity resolution and (in later phases)
conversation persistence and history UI components. It intentionally has no
LangChain dependency so it works without the ``[ai]`` extras and under the
:mod:`panelini.ai_testing` stubs.
"""

__all__ = [
    "COOKIE_NAME",
    "LOCAL_USER_ID",
    "CookieSetterPane",
    "UserResolver",
    "default_user_resolver",
    "ensure_anonymous_cookie",
    "resolve_user",
]

from .user import (
    COOKIE_NAME,
    LOCAL_USER_ID,
    CookieSetterPane,
    UserResolver,
    default_user_resolver,
    ensure_anonymous_cookie,
    resolve_user,
)
