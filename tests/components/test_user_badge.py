"""Tests for panelini.components.user_badge."""

from __future__ import annotations

import panel as pn

from panelini.components.user_badge import user_badge
from panelini.user import GUEST_LABEL


class TestUserBadge:
    def test_named_user(self) -> None:
        badge = user_badge("alice")
        assert isinstance(badge, pn.pane.HTML)
        assert "alice" in badge.object
        assert 'title="alice"' in badge.object
        assert "user-chip-pane" in badge.css_classes

    def test_anonymous_user_shows_guest_with_id_tooltip(self) -> None:
        user_id = "a" * 32  # generated cookie id
        badge = user_badge(user_id)
        assert GUEST_LABEL in badge.object
        assert f'title="{user_id}"' in badge.object

    def test_user_id_is_html_escaped(self) -> None:
        badge = user_badge('<script>alert("x")</script>')
        assert "<script>" not in badge.object
        assert "&lt;script&gt;" in badge.object
