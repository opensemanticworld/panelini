"""Tabler glyphs shared by the history views' action rows.

The masks paint on ``currentColor``, so icons follow the surrounding text
colour. :func:`icon_button_css` renders a bare Button as a frameless
28x24 icon, matching the import/export icons of the chat frontend.
"""

from __future__ import annotations


def _tabler_svg(paths: str, stroke: str) -> str:
    return (
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'"
        f" stroke='{stroke}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>{paths}</svg>"
    )


def tabler_mask(paths: str) -> str:
    """Data URI of an inline tabler glyph for use as a CSS mask."""
    return "data:image/svg+xml;utf8," + _tabler_svg(paths, "%23000")


def tabler_icon(paths: str) -> str:
    """Inline tabler glyph markup, for one entry of a TanstackTable icon set.

    Drawn in ``currentColor``, so a row class colours it the way the mask
    variant follows the surrounding text.
    """
    return _tabler_svg(paths, "currentColor")


_MESSAGE_PATHS = "<path d='M8 9h8'/><path d='M8 13h6'/>"

#: Conversation rows: the message glyph without the New Chat plus.
CHAT_PATHS = (
    _MESSAGE_PATHS
    + "<path d='M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z'/>"
)
#: Folder rows, closed and open.
FOLDER_PATHS = "<path d='M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2'/>"
FOLDER_OPEN_PATHS = (
    "<path d='M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211"
    "a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2'/>"
)
#: A chat that is generating, and one that just finished.
REFRESH_PATHS = "<path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4'/><path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4'/>"
CHECK_PATHS = "<path d='M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18'/><path d='M9 12l2 2l4 -4'/>"

# New Chat carries the message-plus glyph.
NEW_CHAT_MASK = tabler_mask(
    _MESSAGE_PATHS
    + "<path d='M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5'/>"
    "<path d='M16 19h6'/><path d='M19 16v6'/>"
)
FOLDER_PLUS_MASK = tabler_mask(
    "<path d='M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5'/>"
    "<path d='M16 19h6'/><path d='M19 16v6'/>"
)
UNDO_MASK = tabler_mask("<path d='M9 14l-4 -4l4 -4'/><path d='M5 10h11a4 4 0 1 1 0 8h-1'/>")


def icon_button_css(mask: str) -> str:
    """Stylesheet turning a bare Button into a 28x24 flat icon of ``mask``."""
    return f"""
:host {{ margin: 0; }}
.bk-btn, .bk-btn:focus {{
    width: 28px; height: 24px; min-height: 0; padding: 0; margin: 0;
    border: none; border-radius: 6px;
    background: currentColor !important; box-shadow: none;
    color: inherit; cursor: pointer; opacity: 0.55; transition: opacity 0.15s ease;
    -webkit-mask: url("{mask}") center / 18px no-repeat;
    mask: url("{mask}") center / 18px no-repeat;
}}
.bk-btn:hover {{ opacity: 1; }}
.bk-btn:disabled, .bk-btn:disabled:hover {{ opacity: 0.2; cursor: default; }}
"""


REDO_MASK = tabler_mask("<path d='M15 14l4 -4l-4 -4'/><path d='M19 10h-11a4 4 0 1 0 0 8h1'/>")


def _eye_with(subpaths: str) -> str:
    """Eye glyph with a mini sub-glyph bottom-right (view toggle states).

    The sub-glyph names the view the toggle switches TO, matching the
    tooltip; the stroke width compensates for the down-scaling.
    """
    return tabler_mask(
        "<g transform='scale(0.78)'>"
        "<path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0'/>"
        "<path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6'/>"
        "</g>"
        f"<g transform='translate(13.5 13.5) scale(0.44)' stroke-width='4.5'>{subpaths}</g>"
    )


EYE_LIST_MASK = _eye_with("<path d='M4 6h16'/><path d='M4 12h16'/><path d='M4 18h16'/>")
EYE_TREE_MASK = _eye_with(
    "<path d='M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2'/>"
)
