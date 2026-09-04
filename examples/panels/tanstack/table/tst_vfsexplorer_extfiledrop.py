"""A virtual filesystem explorer: toolbar, context menu, icons, multiselect, drag and drop.

Two panes side by side share one ``transfer_group``, so a row dragged out of either
one lands in the other. Install and run:

    uv sync
    uv run python examples/panels/tanstack/table/tst_vfsexplorer_extfiledrop.py
"""

from functools import partial
from typing import Any

import panel as pn

from panelini import Panelini
from panelini.panels.tanstack.table import TanstackTable, icon_for, tree

LOCKED_KEY = "archive"

# Two tables naming one group accept rows dragged from each other. A table naming
# none accepts nothing from outside itself, which is what keeps two unrelated
# tables on one page unrelated.
TRANSFER_GROUP = "vfs"

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

# The second pane's tree. Deliberately shallow and half empty, so there is
# somewhere obvious to drop a row and somewhere obvious to drag one back from.
staging_source = [
    {
        "key": "outbox",
        "title": "Outbox",
        **FOLDER,
        "children": [
            file_node("draft", "draft.md"),
            file_node("cover", "cover.jpg"),
        ],
    },
    {"key": "scratch", "title": "Scratch", **FOLDER, "children": []},
    file_node("readme", "README.md"),
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
    if action in ("add", "drop_files"):
        # A dropped file's `keys` are the ones about to be minted, so they name
        # nothing yet and nothing about them can be locked. Where the batch lands
        # is the only thing to have an opinion about, exactly as for an add.
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


def describe_transfer(params: dict) -> str:
    """Phrase one cross-pane arrival for the log.

    ``keys`` are the other pane's and ``applied_keys`` are this one's, which differ
    whenever a copy, or a key this tree already held, made new ones.
    """
    asked = ", ".join(f"`{key}`" for key in params["keys"])
    if not params["applied"]:
        return f"refused {asked} from the other pane"
    verb = "copied" if params["copy"] else "took"
    landed = ", ".join(f"`{key}`" for key in params["applied_keys"])
    renamed = "" if params["applied_keys"] == params["keys"] else f" as {landed}"
    where = f"{params['position']} `{params['anchor_key']}`" if params["anchor_key"] else "at root"
    return f"{verb} {asked} from the other pane{renamed}, {where}"


def describe_drop_files(params: dict) -> str:
    """Phrase one drop from the desktop for the log.

    ``files`` are the ones this table took and ``rejected`` the ones it turned
    away, each with a ``reason`` naming which of ``drop_accept`` and
    ``drop_max_bytes`` it fell foul of. A file's bytes are in ``content`` and go no
    further: they reach the callbacks and never the tree.
    """
    taken = ", ".join(f"`{item['name']}`" for item in params["files"])
    refused = ", ".join(f"`{item['name']}` ({item['reason']})" for item in params["rejected"])
    where = f"{params['position']} `{params['anchor_key']}`" if params["position"] else "nowhere"

    if params["applied"]:
        # `content` is present under `drop_files='content'` and None under
        # `'meta'`, which is the whole difference between the two panes.
        read = sum(len(item["content"]) for item in params["files"] if item["content"] is not None)
        line = f"took {taken} {where}" + (f", {read:,} bytes read" if read else ", metadata only")
    elif taken:
        # The files were acceptable and the drop still did not land, which is
        # `action_callback` refusing the batch or a hitbox that resolved nowhere.
        line = f"refused {taken} {where}"
    else:
        line = "took no files"
    return f"{line}, turned away {refused}" if refused else line


def say(pane: str, text: str) -> None:
    """Add one line to the shared log, named for the pane it came from."""
    messages.append(f"**{pane}** {text}")
    log.object = "**Log:**\n\n" + "\n".join(f"- {line}" for line in messages[-12:])


def on_event(pane: str, name: str, params: dict) -> None:
    """Report row activation, and what Python made of a drop or a toolbar action.

    Both panes report into one log, so every line names where it happened. A
    transfer is reported by the pane the nodes arrive in, because that is the pane
    that decided the placement, and its line names the other one.
    """
    if name == "activate":
        say(pane, f"activated `{params['key']}`")
    elif name == "move" and params["position"] is not None:
        # A drop carries the whole selection, so the log names every key it asked
        # for and every key that actually landed.
        verb = "moved" if params["applied"] else "rejected"
        moved = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        say(pane, f"{verb} {moved} {params['position']} `{params['anchor_key']}`")
    elif name == "transfer":
        say(pane, describe_transfer(params))
    elif name == "drop_files":
        say(pane, describe_drop_files(params))
    elif name == "add":
        where = f"{params['position']} `{params['anchor_key']}`" if params["anchor_key"] else "at root"
        verb = f"added `{params['key']}`" if params["applied"] else "refused to add"
        say(pane, f"{verb} {where}")
    elif name == "rename":
        verb = "renamed" if params["applied"] else "refused to rename"
        # The panel reports a file that changed type, so an app can react to it
        # beyond the confirmation the browser already asked for.
        note = ", file type changed" if params["extension_changed"] else ""
        say(pane, f"{verb} `{params['key']}` from {params['previous_title']} to {params['title']}{note}")
    elif name == "delete":
        verb = "deleted" if params["applied"] else "refused to delete"
        gone = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        say(pane, f"{verb} {gone}")
    elif name in ("cut", "copy"):
        held = ", ".join(f"`{key}`" for key in params["applied_keys"])
        say(pane, f"{name} {held}" if held else f"{name} nothing")
    elif name == "paste":
        verb = f"pasted a {params['mode']}" if params["applied"] else "refused to paste"
        landed = ", ".join(f"`{key}`" for key in params["applied_keys"] or params["keys"])
        where = f"{params['position']} `{params['anchor_key']}`" if params["anchor_key"] else "at root"
        say(pane, f"{verb}, {landed} {where}")


table = TanstackTable(
    source=source,
    columns=columns,
    options={
        "select_mode": "hierarchy",
        "enable_dnd": True,
        "expand_all": True,
        "aria_label": "Documents",
        "transfer_group": TRANSFER_GROUP,
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
        # Files dragged in from the desktop land through the same hitbox a row
        # does. `content` reads the bytes as well as the name and hands them to
        # the callbacks; the other pane asks for `meta` alone, so the two show
        # both halves of the option side by side.
        "drop_files": "content",
        # Extensions and MIME patterns both work. Python decides; the browser
        # reads this only to skip loading the bytes of a file that would be
        # turned away, so nothing is fetched in order to be refused.
        "drop_accept": [".pdf", ".csv", ".md", ".txt", "image/*"],
        "drop_max_bytes": 1_000_000,
        # The template a dropped file's node is minted from, exactly as
        # `new_node` is for an added one. `size` and `mime` are written beside it.
        "drop_node": {"kind": "file"},
    },
    event_callback=partial(on_event, "explorer"),
    move_callback=allow_move,
    action_callback=allow_action,
    sizing_mode="stretch_both",
)

# The second pane. Same group, so rows drag between the two, and a lighter toolbar
# because everything a transfer needs is already in the gesture. It has no
# `move_callback` and no `action_callback`, which is what makes it the plain side
# of the pair: it takes whatever the explorer will let go of, and the explorer's
# own vetoes still decide what may leave it and where a row coming back may land.
staging = TanstackTable(
    source=staging_source,
    columns=columns,
    options={
        "select_mode": "hierarchy",
        "enable_dnd": True,
        "expand_all": True,
        "aria_label": "Staging",
        "transfer_group": TRANSFER_GROUP,
        "toggle_on_click": True,
        "show_checkboxes": False,
        "menu": [],
        "toolbar": [
            "undo",
            "redo",
            "|",
            NEW_FOLDER,
            NEW_FILE,
            "rename",
            "delete",
            "|",
            "expand-all",
            "collapse-all",
            "|",
            "clear-selection",
            "search",
        ],
        "search_label": "Search staging",
        "new_key_prefix": "stg",
        # The same gesture, half the payload: a name, a size, a MIME type and a
        # stamp, and no bytes at all. A staging tray that only has to know what
        # arrived has no reason to move a megabyte across the socket to find out.
        "drop_files": "meta",
        "drop_node": {"kind": "file"},
    },
    event_callback=partial(on_event, "staging"),
    sizing_mode="stretch_both",
)


def on_selection_change(*events: object) -> None:
    """Mirror the explorer's ``selected_keys`` into the readout on the right."""
    keys = table.get_selected()
    selected_display.object = f"**Selected:** {', '.join(keys)}" if keys else "**Selected:** (none)"


table.param.watch(on_selection_change, ["selected_keys"])

checkboxes = pn.widgets.Checkbox(name="Checkboxes", value=False)
context_menu = pn.widgets.Checkbox(name="Context menu", value=False)


def on_checkboxes(event: object) -> None:
    """Show or hide the checkbox column in both panes.

    Selection is untouched: with the column gone, rows are still picked by click,
    Ctrl click, Shift click and the space key, and a selection still drags.
    """
    for pane in (table, staging):
        pane.options = {**pane.options, "show_checkboxes": checkboxes.value}


def on_context_menu(event: object) -> None:
    """Offer the context menu in both panes, or take it away again.

    An empty list is the same as leaving the option out: no menu, and a click on a
    row goes back to selecting it and nothing else.
    """
    for pane in (table, staging):
        pane.options = {**pane.options, "menu": MENU if context_menu.value else []}


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
- **Context menu** puts the same actions on the rows. A **right click** opens it, and so
  do `Shift+F10` and the menu key. The left button keeps selecting and dragging. It is
  placed against the window rather than the panel, so a row at the bottom edge still
  opens a menu you can read, and the arrow keys, `Home`, `End`, `Enter` and `Escape`
  walk it.
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
- **Drag across the panes** to move a row from one tree into the other. Both name the
  same `transfer_group`, so each accepts the other's rows and neither accepts anything
  from a table outside it. Drop into a folder or between rows, exactly as within one
  tree, and a whole selection travels in one gesture.
- **Ctrl** or **Alt** held at the drop **copies** across instead of moving, and the
  copy arrives with new keys, so the log shows one set of keys asked for and another
  set landed.
- Nodes never travel through the browser. The drag carries the group, the pane it
  came from and the keys, and the receiving table reads the nodes out of the other
  one in Python.
- `Archive (read only)` refuses to let its rows leave, through the same
  `action_callback`, and refuses to take rows from staging, through `move_callback`.
- **Ctrl+Z** takes back the last change to the tree and **Ctrl+Shift+Z** puts it
  back, whether it was a drop, a toolbar action or a rename. The history is
  Python's, so it covers what the app did as well, and a fresh change drops
  whatever was ahead of it.
- A transfer is **one gesture over two histories**, so `Ctrl+Z` in either pane takes
  the whole thing back: the row leaves the tree it landed in and returns to the one
  it came from. Change one pane on its own afterwards and the halves part company,
  which the panel resolves by keeping the node rather than losing it.
- `Archive (read only)` refuses new nodes, renames and deletions too, through a
  Python `action_callback`.
- Clicking the only selected row **again** clears the selection, and so does
  `Escape` or the clear button: an emptied selection leaves no colour behind.
- **Drag a file in from your desktop** and drop it into a folder or between two
  rows. It lands through the same hitbox a row does, with the same drop line and
  the same no-drop affordance, and Python mints one node per file.
- While the file is in flight the indicator says **that a file is arriving and
  never which one**. Browsers withhold the name, the size and the type until the
  drop, so `drop_accept` is read at the drop, where those three are real.
- The two panes ask for different things. `Documents` takes `.pdf`, `.csv`,
  `.md`, `.txt` and any image up to 1 MB and reads the **bytes**; `Staging` takes
  anything and reads the **metadata only**. Drop a `.zip` on each and watch the
  log: one turns it away by type, the other takes it and reads nothing.
- Drop something over 1 MB into `Documents` and it comes back refused by size.
  The bytes are never loaded to be refused: the browser reads the two options at
  the drop only to skip a file Python is going to turn away anyway.
- **The bytes never enter the tree.** They reach `event_callback` and stop there,
  so a dropped file does not put a megabyte of base64 into `source` and back onto
  the wire on every change after it. The node keeps the name, the size and the
  MIME type.
- `Archive (read only)` refuses a file drop too, through the same
  `action_callback`, and one drop of five files is **one undo step**.
- **Icons** come from `icon_for`, which maps a file extension onto one of the
  bundled glyphs. `inbox.bak` is not mapped, so it shows the generic one, and a
  dropped `report.pdf` gets the pdf glyph by the same rule.
""",
    sizing_mode="stretch_width",
)

# Every part floats on the app background rather than sitting on a card frame.
PANE_STYLES = {
    "background": "rgba(255, 255, 255, 0.5)",
    "border-radius": "8px",
    "padding": "10px",
}


def framed(*objects: object) -> pn.Column:
    """Put one pane on its own floating panel, with room beside it for the next."""
    return pn.Column(*objects, styles=PANE_STYLES, sizing_mode="stretch_both", margin=(0, 15, 0, 0))


app = Panelini(title="TanstackTable VFS Explorer", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            # Two panes, one group. Each is a table in its own right, and dragging a
            # row out of either drops it into the other.
            framed(pn.pane.Markdown("#### Documents", margin=(0, 0, 5, 5)), table),
            framed(pn.pane.Markdown("#### Staging", margin=(0, 0, 5, 5)), staging),
            # The log sits above the notes rather than below them, so what a
            # gesture did is on screen without scrolling past the whole list.
            pn.Column(
                pn.Row(checkboxes, context_menu),
                selected_display,
                log,
                gestures,
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
