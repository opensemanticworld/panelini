"""Tabler glyphs shared by the history views' action rows.

The masks paint on ``currentColor``, so icons follow the surrounding text
colour. :func:`icon_button_css` renders a bare Button as a frameless
28x24 icon, matching the import/export icons of the chat frontend.
"""

from __future__ import annotations


def tabler_mask(paths: str) -> str:
    """Data URI of an inline tabler glyph for use as a CSS mask."""
    return (
        "data:image/svg+xml;utf8,"
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000'"
        " stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>" + paths + "</svg>"
    )


_MESSAGE_PATHS = "<path d='M8 9h8'/><path d='M8 13h6'/>"

# New Chat carries the message-plus glyph; conversation rows the same
# message glyph without the plus.
NEW_CHAT_MASK = tabler_mask(
    _MESSAGE_PATHS
    + "<path d='M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5'/>"
    "<path d='M16 19h6'/><path d='M19 16v6'/>"
)
CHAT_MASK = tabler_mask(
    _MESSAGE_PATHS
    + "<path d='M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z'/>"
)
FOLDER_PLUS_MASK = tabler_mask(
    "<path d='M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5'/>"
    "<path d='M16 19h6'/><path d='M19 16v6'/>"
)
PENCIL_MASK = tabler_mask(
    "<path d='M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4'/><path d='M13.5 6.5l4 4'/>"
)
TRASH_MASK = tabler_mask(
    "<path d='M4 7l16 0'/><path d='M10 11l0 6'/><path d='M14 11l0 6'/>"
    "<path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12'/>"
    "<path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3'/>"
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
