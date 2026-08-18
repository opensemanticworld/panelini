"""User identity resolution for per-user chat history.

``resolve_user()`` returns the stable string id chat history is keyed under.
Default chain: ``pn.state.user`` (Panel auth) > ``panelini_uid`` cookie >
generated anonymous id (persisted client-side via :class:`CookieSetterPane`)
> ``"local"`` without a browser session (Pyodide, scripts, tests).
Custom resolver example::

    resolve_user(lambda: pn.state.headers.get("X-Forwarded-User", "anonymous"))
"""

from __future__ import annotations

import re
import sys
import uuid
import weakref
from collections.abc import Callable
from typing import TYPE_CHECKING, ClassVar

import panel as pn
import param
from panel.reactive import ReactiveHTML

if TYPE_CHECKING:
    from bokeh.document import Document

UserResolver = Callable[[], str]
"""Callable resolving the current session's user id."""

COOKIE_NAME = "panelini_uid"
COOKIE_MAX_AGE_SECONDS = 31536000  # one year
LOCAL_USER_ID = "local"

# Cookie values are browser input; accept nothing looser than uuid-like ids.
_ID_PATTERN = re.compile(r"[A-Za-z0-9_-]{8,64}")

# Keeps repeated resolution within one session stable.
_generated_ids: weakref.WeakKeyDictionary[Document, str] = weakref.WeakKeyDictionary()


class CookieSetterPane(ReactiveHTML):
    """Invisible pane assigning ``document.cookie`` on render (Panel has no
    server-side Set-Cookie for websocket sessions)."""

    cookie = param.String(doc="Full cookie string assigned to document.cookie.")

    _template = '<div id="cookie_setter" style="display:none"></div>'

    _scripts: ClassVar[dict[str, str]] = {"render": "document.cookie = data.cookie"}


def _auth_user() -> str | None:
    """Return the authenticated Panel user, if any."""
    user = pn.state.user
    return str(user) if user else None


def _cookie_user() -> str | None:
    """Return a valid anonymous id from the request cookies, if present."""
    raw = pn.state.cookies.get(COOKIE_NAME)
    if isinstance(raw, bytes):
        raw = raw.decode(errors="ignore")
    if isinstance(raw, str) and _ID_PATTERN.fullmatch(raw):
        return raw
    return None


def _session_document() -> Document | None:
    """Return the current document when a real server session exists."""
    curdoc = pn.state.curdoc
    if curdoc is not None and curdoc.session_context is not None:
        return curdoc
    return None


def _is_pyodide() -> bool:
    """Return True when running under Pyodide (portfolio builds)."""
    return sys.platform == "emscripten"


def ensure_anonymous_cookie() -> tuple[str, CookieSetterPane | None]:
    """Resolve the default user id, generating an anonymous one if needed.

    Returns:
        ``(user_id, cookie_pane)``; the pane is only returned the first time
        an id is generated for the session and must be embedded to persist it.
    """
    user = _auth_user()
    if user:
        return user, None

    cookie_user = _cookie_user()
    if cookie_user:
        return cookie_user, None

    if _is_pyodide():
        return LOCAL_USER_ID, None

    doc = _session_document()
    if doc is None:
        return LOCAL_USER_ID, None

    cached = _generated_ids.get(doc)
    if cached is not None:
        return cached, None

    user_id = uuid.uuid4().hex
    _generated_ids[doc] = user_id
    cookie = f"{COOKIE_NAME}={user_id}; path=/; max-age={COOKIE_MAX_AGE_SECONDS}; SameSite=Lax"
    return user_id, CookieSetterPane(cookie=cookie, height=0, width=0, margin=0)


def default_user_resolver() -> str:
    """Resolve via the default chain: auth user, cookie, generated, local."""
    return ensure_anonymous_cookie()[0]


def resolve_user(resolver: UserResolver | None = None) -> str:
    """Resolve the current user id via ``resolver`` or the default chain.

    Args:
        resolver: Optional custom resolver overriding the default chain.

    Returns:
        A non-empty, stripped user id.

    Raises:
        ValueError: If the resolver returns anything but a non-empty string.
    """
    user_id = (resolver or default_user_resolver)()
    if not isinstance(user_id, str) or not user_id.strip():
        msg = "User resolver must return a non-empty string."
        raise ValueError(msg)
    return user_id.strip()
