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
    """Veto adding to or deleting from the read-only branch."""
    keys = [params["anchor_key"]] if action == "add" else params["keys"]
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
    elif name == "delete":
        verb = "deleted" if params["applied"] else "refused to delete"
        gone = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        messages.append(f"{verb} {gone}")
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
        # True would give the default action order. A list picks and orders them
        # instead, and it gates the keyboard shortcuts too, so an action left out
        # here cannot be reached by pressing a key either. A dict entry renames an
        # action and gives it the node template a new node is minted from, which
        # is how this tree gets folders and files rather than bare nodes. The
        # label is also the new node's title.
        "toolbar": [
            {"id": "new-folder", "label": "New folder", "node": {**FOLDER, "children": []}},
            {
                "id": "new-file",
                "label": "New file",
                "node": {"kind": "file", "icon": "file", "allow_children": False},
            },
            "delete",
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

checkboxes = pn.widgets.Checkbox(name="Checkboxes", value=True)


def on_checkboxes(event: object) -> None:
    """Show or hide the checkbox column.

    Selection is untouched: with the column gone, rows are still picked by click,
    Ctrl click, Shift click and the space key, and a selection still drags.
    """
    table.options = {**table.options, "show_checkboxes": checkboxes.value}


checkboxes.param.watch(on_checkboxes, "value")

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
- **Checkboxes** off hides the column only. Click, Shift click and drag keep working.
- **Tab** reaches the toolbar, then the grid. In the toolbar the arrow keys move
  between buttons; in the grid `Ctrl+A` selects all, `Escape` clears and `Ctrl+F`
  jumps to the search box.
- **Alt+Arrow** reorders without the mouse: up and down among siblings, right to
  indent under the row above, left to outdent after the parent. Greyed out buttons
  say why a move is unavailable, and `Archive (read only)` refuses these too.
- **Insert** makes a folder and **Shift+Insert** a file: inside the row you are on
  when it takes children, next to it when it does not, and at root level when the
  tree is empty. **Delete** removes the whole selection.
- `Archive (read only)` refuses new nodes and deletions too, through a Python
  `action_callback`.
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
                checkboxes,
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
