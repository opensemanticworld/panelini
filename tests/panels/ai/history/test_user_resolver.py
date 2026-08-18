"""Tests for panelini.panels.ai.history.user."""

from __future__ import annotations

import re
import sys
from collections.abc import Mapping
from types import SimpleNamespace
from typing import cast

import panel as pn
import pytest

from panelini.panels.ai.history import user as user_mod
from panelini.panels.ai.history.user import (
    COOKIE_NAME,
    LOCAL_USER_ID,
    CookieSetterPane,
    default_user_resolver,
    ensure_anonymous_cookie,
    resolve_user,
)

pytestmark = pytest.mark.ai

VALID_COOKIE_ID = "abcdef1234567890"


class _FakeDoc:
    """Weakref-able stand-in for a Bokeh document with a live session."""

    def __init__(self) -> None:
        request = SimpleNamespace(arguments={}, cookies={})
        self.session_context: SimpleNamespace | None = SimpleNamespace(request=request)


def _patch_state(
    monkeypatch: pytest.MonkeyPatch,
    *,
    user: str | None = None,
    cookies: Mapping[str, str | bytes] | None = None,
    curdoc: object | None = None,
) -> None:
    state_cls = type(pn.state)
    monkeypatch.setattr(state_cls, "user", property(lambda self: user))
    monkeypatch.setattr(state_cls, "cookies", property(lambda self: cookies or {}))
    monkeypatch.setattr(state_cls, "curdoc", property(lambda self: curdoc))


@pytest.fixture(autouse=True)
def _clear_generated_ids() -> None:
    user_mod._generated_ids.clear()


# ── ensure_anonymous_cookie ───────────────────────────────────────────────


class TestEnsureAnonymousCookie:
    def test_auth_user_wins_over_cookie(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, user="alice", cookies={COOKIE_NAME: VALID_COOKIE_ID}, curdoc=_FakeDoc())
        assert ensure_anonymous_cookie() == ("alice", None)

    def test_cookie_used_when_no_auth(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, cookies={COOKIE_NAME: VALID_COOKIE_ID}, curdoc=_FakeDoc())
        assert ensure_anonymous_cookie() == (VALID_COOKIE_ID, None)

    def test_bytes_cookie_value_is_decoded(self, monkeypatch: pytest.MonkeyPatch) -> None:
        cookies: Mapping[str, str | bytes] = {COOKIE_NAME: VALID_COOKIE_ID.encode()}
        _patch_state(monkeypatch, cookies=cookies, curdoc=_FakeDoc())
        assert ensure_anonymous_cookie() == (VALID_COOKIE_ID, None)

    def test_invalid_cookie_ignored_and_id_generated(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, cookies={COOKIE_NAME: "bad value!"}, curdoc=_FakeDoc())
        user_id, pane = ensure_anonymous_cookie()
        assert re.fullmatch(r"[0-9a-f]{32}", user_id)
        assert isinstance(pane, CookieSetterPane)

    def test_generated_cookie_pane_contents(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, curdoc=_FakeDoc())
        user_id, pane = ensure_anonymous_cookie()
        assert pane is not None
        assert pane.cookie.startswith(f"{COOKIE_NAME}={user_id};")
        assert "path=/" in pane.cookie
        assert "SameSite=Lax" in pane.cookie

    def test_generated_id_stable_within_session(self, monkeypatch: pytest.MonkeyPatch) -> None:
        doc = _FakeDoc()
        _patch_state(monkeypatch, curdoc=doc)
        first_id, first_pane = ensure_anonymous_cookie()
        second_id, second_pane = ensure_anonymous_cookie()
        assert first_id == second_id
        assert first_pane is not None
        assert second_pane is None  # cookie pane is only handed out once

    def test_different_sessions_get_different_ids(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, curdoc=_FakeDoc())
        first_id, _ = ensure_anonymous_cookie()
        _patch_state(monkeypatch, curdoc=_FakeDoc())
        second_id, _ = ensure_anonymous_cookie()
        assert first_id != second_id

    def test_no_curdoc_falls_back_to_local(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, curdoc=None)
        assert ensure_anonymous_cookie() == (LOCAL_USER_ID, None)

    def test_no_session_context_falls_back_to_local(self, monkeypatch: pytest.MonkeyPatch) -> None:
        doc = _FakeDoc()
        doc.session_context = None
        _patch_state(monkeypatch, curdoc=doc)
        assert ensure_anonymous_cookie() == (LOCAL_USER_ID, None)

    def test_pyodide_falls_back_to_local(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, curdoc=_FakeDoc())
        monkeypatch.setattr(sys, "platform", "emscripten")
        assert ensure_anonymous_cookie() == (LOCAL_USER_ID, None)


# ── default_user_resolver / resolve_user ──────────────────────────────────


class TestResolveUser:
    def test_default_resolver_returns_id_only(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, user="alice")
        assert default_user_resolver() == "alice"

    def test_resolve_user_uses_default_chain(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, cookies={COOKIE_NAME: VALID_COOKIE_ID}, curdoc=_FakeDoc())
        assert resolve_user() == VALID_COOKIE_ID

    def test_custom_resolver_overrides_default(self, monkeypatch: pytest.MonkeyPatch) -> None:
        _patch_state(monkeypatch, user="alice")
        assert resolve_user(lambda: "proxy-user") == "proxy-user"

    def test_result_is_stripped(self) -> None:
        assert resolve_user(lambda: "  bob  ") == "bob"

    @pytest.mark.parametrize("bad", ["", "   ", None, 42])
    def test_invalid_resolver_result_raises(self, bad: object) -> None:
        bad_resolver = cast("user_mod.UserResolver", lambda: bad)
        with pytest.raises(ValueError, match="non-empty string"):
            resolve_user(bad_resolver)
