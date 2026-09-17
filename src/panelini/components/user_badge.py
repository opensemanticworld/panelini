"""Compact header badge showing the current user."""

from __future__ import annotations

import html

import panel

from panelini.user import display_name


def user_badge(user_id: str) -> panel.pane.HTML:
    """Return a pill-style chip: person icon + name, full id as tooltip."""
    return panel.pane.HTML(
        f'<div class="user-chip" title="{html.escape(user_id)}">👤 {html.escape(display_name(user_id))}</div>',
        css_classes=["user-chip-pane"],
        margin=(0, 10),
    )
