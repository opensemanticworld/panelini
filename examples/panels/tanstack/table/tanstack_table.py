"""TanstackTable: treegrid with a toolbar, columns, icons, multiselect and drag and drop.

Install and run:

    uv sync
    uv run python examples/panels/tanstack/table/tanstack_table.py
"""

from typing import Any

import panel as pn

from panelini import Panelini
from panelini.panels.tanstack.table import TanstackTable, icon_for, tree

LOCKED_KEY = "archive"

# `icon` names one of the panel's bundled Material Icon Theme icons, and the folder
# one follows the row's own open state. `allow_children: False` marks a leaf that
# can never gain children, so the panel refuses to drop anything into a file, both
# in the browser and in Python.
FOLDER = {"kind": "folder", "icon": "folder"}

# A dict entry renames an action and gives it the node template a new node is
# minted from, which is how this tree gets folders and files rather than bare
# nodes. The label is also the new node's title. Shared by the toolbar and the
# context menu, so both make the same two kinds.
NEW_FOLDER = {"id": "new-folder", "label": "New folder", "node": {**FOLDER, "children": []}}
NEW_FILE = {
    "id": "new-file",
    "label": "New file",
    "node": {"kind": "file", "icon": "file", "allow_children": False},
}

# The context menu, offered as a second route to the actions the toolbar already has.
MENU = [NEW_FOLDER, NEW_FILE, "|", "rename", "delete", "|", "cut", "copy", "paste"]


def file_node(key: str, title: str) -> dict:
    """Build a leaf whose icon follows its extension, or the generic one."""
    return {
        "key": key,
        "title": title,
        "kind": "file",
        "icon": icon_for(title),
        "allow_children": False,
    }


source = [
    {
        "key": "inbox",
        "title": "Inbox",
        **FOLDER,
        "children": [
            file_node("invoice", "invoice.pdf"),
            file_node("logo", "logo.png"),
            file_node("budget", "budget.csv"),
            file_node("minutes", "minutes.docx"),
            # Nothing is mapped for .bak, so this one shows the generic fallback.
            file_node("backup", "inbox.bak"),
        ],
    },
    {
        "key": "projects",
        "title": "Projects",
        **FOLDER,
        "children": [
            {
                "key": "panelini",
                "title": "panelini",
                **FOLDER,
                "children": [
                    file_node("notes", "notes.md"),
                    file_node("table", "table.py"),
                    file_node("component", "component.ts"),
                    file_node("styles", "styles.css"),
                    file_node("config", "pyproject.toml"),
                    file_node("release", "release.zip"),
                ],
            },
            {"key": "sketches", "title": "sketches", **FOLDER, "children": []},
        ],
    },
    {
        "key": LOCKED_KEY,
        "title": "Archive (read only)",
        **FOLDER,
        "children": [file_node("old", "old.txt")],
    },
]

columns = [
    {"id": "title", "header": "Name"},
    {"id": "kind", "header": "Kind", "width": 90},
]

log = pn.pane.Markdown("**Log:** nothing yet.", sizing_mode="stretch_width")
selected_display = pn.pane.Markdown("**Selected:** (none)", sizing_mode="stretch_width")
messages: list[str] = []


def allow_move(key: str, anchor_key: str, position: str) -> bool:
    """Veto anything that would land inside the read-only branch."""
    return not (position == "child" and anchor_key == LOCKED_KEY)


def locked(key: str | None) -> bool:
    """Return whether a key is the read-only branch or sits inside it."""
    return bool(key) and (key == LOCKED_KEY or tree.is_descendant(table.source, str(key), LOCKED_KEY))


def allow_action(action: str, params: dict[str, Any]) -> bool:
    """Veto adding to, renaming in, pasting into, or deleting from the read-only branch."""
    if action == "add":
        keys = [params["anchor_key"]]
    elif action == "rename":
        keys = [params["key"]]
    elif action == "paste":
        # Only where it lands matters. Copying something out of the branch is
        # fine, and a paste of something cut is a move, so allow_move sees it.
        keys = [params["anchor_key"]]
    else:
        keys = params["keys"]
    return not any(locked(key) for key in keys)


def on_event(name: str, params: dict) -> None:
    """Report row activation, and what Python made of a drop or a toolbar action."""
    if name == "activate":
        messages.append(f"activated `{params['key']}`")
    elif name == "move" and params["position"] is not None:
        # A drop carries the whole selection, so the log names every key it asked
        # for and every key that actually landed.
        verb = "moved" if params["applied"] else "rejected"
        moved = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        messages.append(f"{verb} {moved} {params['position']} `{params['anchor_key']}`")
    elif name == "add":
        where = f"{params['position']} `{params['anchor_key']}`" if params["anchor_key"] else "at root"
        verb = f"added `{params['key']}`" if params["applied"] else "refused to add"
        messages.append(f"{verb} {where}")
    elif name == "rename":
        verb = "renamed" if params["applied"] else "refused to rename"
        # The panel reports a file that changed type, so an app can react to it
        # beyond the confirmation the browser already asked for.
        note = ", file type changed" if params["extension_changed"] else ""
        messages.append(f"{verb} `{params['key']}` from {params['previous_title']} to {params['title']}{note}")
    elif name == "delete":
        verb = "deleted" if params["applied"] else "refused to delete"
        gone = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        messages.append(f"{verb} {gone}")
    elif name in ("cut", "copy"):
        held = ", ".join(f"`{key}`" for key in params["applied_keys"])
        messages.append(f"{name} {held}" if held else f"{name} nothing")
    elif name == "paste":
        verb = f"pasted a {params['mode']}" if params["applied"] else "refused to paste"
        landed = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        where = f"{params['position']} `{params['anchor_key']}`" if params["anchor_key"] else "at root"
        messages.append(f"{verb}, {landed} {where}")
    else:
        return
    log.object = "**Log:**\n\n" + "\n".join(f"- {line}" for line in messages[-12:])


table = TanstackTable(
    source=source,
    columns=columns,
    options={
        "select_mode": "hierarchy",
        "enable_dnd": True,
        "expand_all": True,
        "aria_label": "Documents",
        # Clicking the only selected row again clears the selection.
        "toggle_on_click": True,
        # Both start off, and the checkboxes on the right turn them on.
        "show_checkboxes": False,
        "menu": [],
        # True would give the default action order. A list picks and orders them
        # instead, and it gates the keyboard shortcuts too, so an action left out
        # of both the toolbar and the menu cannot be reached by pressing a key
        # either.
        "toolbar": [
            "undo",
            "redo",
            "|",
            NEW_FOLDER,
            NEW_FILE,
            "rename",
            "delete",
            "|",
            "cut",
            "copy",
            "paste",
            "|",
            "move-up",
            "move-down",
            "outdent",
            "indent",
            "|",
            "expand-all",
            "collapse-all",
            "|",
            "select-all",
            "clear-selection",
            "search",
        ],
        "search_label": "Search name or kind",
        "new_key_prefix": "doc",
    },
    event_callback=on_event,
    move_callback=allow_move,
    action_callback=allow_action,
    sizing_mode="stretch_both",
)


def on_selection_change(*events: object) -> None:
    """Mirror ``selected_keys`` into the readout on the right."""
    keys = table.get_selected()
    selected_display.object = f"**Selected:** {', '.join(keys)}" if keys else "**Selected:** (none)"


table.param.watch(on_selection_change, ["selected_keys"])

checkboxes = pn.widgets.Checkbox(name="Checkboxes", value=False)
context_menu = pn.widgets.Checkbox(name="Context menu", value=False)


def on_checkboxes(event: object) -> None:
    """Show or hide the checkbox column.

    Selection is untouched: with the column gone, rows are still picked by click,
    Ctrl click, Shift click and the space key, and a selection still drags.
    """
    table.options = {**table.options, "show_checkboxes": checkboxes.value}


def on_context_menu(event: object) -> None:
    """Offer the context menu, or take it away again.

    An empty list is the same as leaving the option out: no menu, and a click on a
    row goes back to selecting it and nothing else.
    """
    table.options = {**table.options, "menu": MENU if context_menu.value else []}


checkboxes.param.watch(on_checkboxes, "value")
context_menu.param.watch(on_context_menu, "value")

gestures = pn.pane.Markdown(
    """
### Try it

- **Click** a row to select it, **Ctrl click** to add one, **Shift click** for a range.
- Clicking a folder selects that folder only, and clicking all of its files leaves it out.
- **Checkbox** on a folder is the one control that cascades: it ticks the whole subtree,
  and a folder shows ticked once all of its files are.
- **Drag** any selected row to move the whole selection at once.
- Drop **into** a folder, or between rows to reorder. Files never take children.
- `Archive (read only)` refuses drops, through a Python `move_callback`.
- **Search** narrows to matches and the folders that lead to them.
- **Checkboxes** adds the column. It is off to begin with, and selection works
  without it: click, Shift click, Ctrl click and drag are unchanged either way.
- **Context menu** puts the same actions on the rows. A plain click opens it, so does a
  right click, `Shift+F10` and the menu key. It is placed against the window rather
  than the panel, so a row at the bottom edge still opens a menu you can read, and
  the arrow keys, `Home`, `End`, `Enter` and `Escape` walk it.
- **Tab** reaches the toolbar, then the grid. In the toolbar the arrow keys move
  between buttons; in the grid `Ctrl+A` selects all, `Escape` clears and `Ctrl+F`
  jumps to the search box.
- **Alt+Arrow** reorders without the mouse: up and down among siblings, right to
  indent under the row above, left to outdent after the parent. Greyed out buttons
  say why a move is unavailable, and `Archive (read only)` refuses these too.
- **Insert** makes a folder and **Shift+Insert** a file: inside the row you are on
  when it takes children, next to it when it does not, and at root level when the
  tree is empty. **Delete** removes the whole selection.
- A new node opens its name editor straight away. **Enter** or clicking away keeps
  the name, **Escape** removes the node again, so a folder made by accident leaves
  nothing behind.
- **F2** renames an existing row. There **Escape** only closes the editor, and an
  emptied box is a cancel rather than a blank name.
- Renaming a file to another **extension** asks first, naming both the old and the
  new name. Answer with `y`, `n`, the arrow keys or `Enter`, which takes the safe
  default. Naming a brand new file never asks: it had no type to lose.
- The **icon follows the type**: call `notes.md` `notes.py` and it turns into a
  Python file. An icon you picked by hand is left where you put it.
- **Ctrl+X** cuts the selection and **Ctrl+C** copies it, both faded until pasted.
  **Ctrl+V** places it where a new node would go: inside the row you are on, next
  to it when it takes no children, at root level when nothing is active. A cut is
  a move, so `move_callback` sees it; a copy makes new nodes with new keys, so
  `action_callback` does.
- **Ctrl+Z** takes back the last change to the tree and **Ctrl+Shift+Z** puts it
  back, whether it was a drop, a toolbar action or a rename. The history is
  Python's, so it covers what the app did as well, and a fresh change drops
  whatever was ahead of it.
- `Archive (read only)` refuses new nodes, renames and deletions too, through a
  Python `action_callback`.
- Clicking the only selected row **again** clears the selection, and so does
  `Escape` or the clear button: an emptied selection leaves no colour behind.
- **Icons** come from `icon_for`, which maps a file extension onto one of the
  bundled glyphs. `inbox.bak` is not mapped, so it shows the generic one.
""",
    sizing_mode="stretch_width",
)

# Both halves float on the app background rather than sitting on a card frame.
PANE_STYLES = {
    "background": "rgba(255, 255, 255, 0.5)",
    "border-radius": "8px",
    "padding": "10px",
}

app = Panelini(title="TanstackTable", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            pn.Column(
                table,
                styles=PANE_STYLES,
                sizing_mode="stretch_both",
                margin=(0, 15, 0, 0),
            ),
            pn.Column(
                pn.Row(checkboxes, context_menu),
                selected_display,
                gestures,
                log,
                styles=PANE_STYLES,
                scroll=True,
                sizing_mode="stretch_both",
            ),
            sizing_mode="stretch_both",
        )
    ]
)
app.servable()

if __name__ == "__main__":
    pn.io.server.serve(app, port=5012)
