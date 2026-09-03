"""A service inventory: five columns, sorting, resizing, node types and cell editors.

The other half of the panel from the VFS explorer. That one is a tree with a
toolbar that rewrites it; this one is a grid whose structure never changes and
whose cells do. Install and run:

    uv sync
    uv run python examples/panels/tanstack/table/treegrid_columns.py
"""

import copy
from typing import Any

import panel as pn

from panelini import Panelini
from panelini.panels.tanstack.table import TanstackTable, tree

# A type is a dict of node defaults, so every service declares its icon and the
# fact that it takes no children once here rather than once per row. Any field
# may come from a type, not only the three that style a row: `monitored` is a
# column value, and a service that sets it wins over the type that suggested it.
TYPES = {
    "region": {"icon": "folder", "allow_children": True},
    "site": {"icon": "database", "allow_children": True},
    "service": {"icon": "console", "allow_children": False, "monitored": True},
}

STATUSES = ["running", "degraded", "stopped"]

# Ranked worst first, which is how a region reports the state of what is under it.
SEVERITY = {"stopped": 2, "degraded": 1, "running": 0}


def service(key: str, title: str, status: str, instances: int, owner: str, **fields: Any) -> dict:
    """One leaf. Everything not named here comes from the `service` type."""
    return {
        "key": key,
        "title": title,
        "type": "service",
        "status": status,
        "instances": instances,
        "owner": owner,
        **fields,
    }


source = [
    {
        "key": "eu",
        "title": "Europe",
        "type": "region",
        "children": [
            {
                "key": "eu-fra",
                "title": "Frankfurt",
                "type": "site",
                "children": [
                    service("eu-fra-api", "api", "running", 6, "platform"),
                    service("eu-fra-web", "web", "running", 4, "frontend"),
                    service("eu-fra-jobs", "jobs", "degraded", 2, "platform"),
                    # Opting out of the type's own `monitored: True`, which is the
                    # rule that a node always wins over the type it names.
                    service("eu-fra-lab", "lab", "stopped", 0, "research", monitored=False),
                ],
            },
            {
                "key": "eu-dub",
                "title": "Dublin",
                "type": "site",
                "children": [
                    service("eu-dub-api", "api", "running", 3, "platform"),
                    service("eu-dub-cache", "cache", "running", 2, "platform"),
                ],
            },
        ],
    },
    {
        "key": "us",
        "title": "United States",
        "type": "region",
        "children": [
            {
                "key": "us-iad",
                "title": "Ashburn",
                "type": "site",
                "children": [
                    service("us-iad-api", "api", "running", 8, "platform"),
                    service("us-iad-web", "web", "degraded", 5, "frontend"),
                    service("us-iad-batch", "batch", "running", 1, "data", monitored=False),
                ],
            },
            {
                "key": "us-sfo",
                "title": "San Francisco",
                "type": "site",
                "children": [service("us-sfo-api", "api", "degraded", 2, "platform")],
            },
        ],
    },
]


def total(nodes: list[dict]) -> list[dict]:
    """Fill every group row in place from the services under it.

    A treegrid rolls nothing up by itself, and deliberately so: what a parent row
    means is the application's arithmetic and not the table's. This is that
    arithmetic, and it is the only thing writing those four cells.
    """

    def visit(node: dict) -> tuple[int, str]:
        children = node.get("children") or []
        if not children:
            return int(node.get("instances") or 0), str(node.get("status") or "running")
        totals = [visit(child) for child in children]
        node["instances"] = sum(count for count, _ in totals)
        node["status"] = max((status for _, status in totals), key=lambda name: SEVERITY[name])
        # Blank rather than inherited: an owner and a monitoring flag are facts
        # about one service, and a region has neither.
        node["owner"] = ""
        node["monitored"] = ""
        return node["instances"], node["status"]

    for node in nodes:
        visit(node)
    return nodes


total(source)

# One column per editor kind, plus the tree column, which carries the title and is
# renamed rather than edited. `min_width` and `max_width` bound a drag, `sortable`
# and `resizable` take one column out of a behaviour the rest of the table keeps,
# and `step`, `min` and `max` are the number input's own affordance as well as a
# range Python checks on the way in.
columns = [
    {"id": "title", "header": "Service", "width": 240, "min_width": 160},
    {
        "id": "status",
        "header": "Status",
        "width": 130,
        "min_width": 100,
        "editable": True,
        "editor": "select",
        "choices": STATUSES,
    },
    {
        "id": "instances",
        "header": "Instances",
        "width": 110,
        "editable": True,
        "editor": "number",
        "step": 1,
        "min": 0,
        "max": 64,
    },
    {"id": "owner", "header": "Owner", "width": 150, "editable": True, "max_width": 260},
    # A checkbox column has nothing to order by that the eye cannot see at a
    # glance, and its width is the control's, so both behaviours are declined.
    {
        "id": "monitored",
        "header": "Monitored",
        "width": 110,
        "editable": True,
        "editor": "checkbox",
        "sortable": False,
        "resizable": False,
    },
]

log = pn.pane.Markdown("**Log:** nothing yet.", sizing_mode="stretch_width")
messages: list[str] = []


def say(text: str) -> None:
    messages.append(text)
    log.object = "**Log:**\n\n" + "\n".join(f"- {line}" for line in messages[-10:])


def is_group(key: str) -> bool:
    """Whether a key names a row that summarises other rows."""
    node = tree.find_node(table.source, key)
    return bool(node and node.get("children"))


def allow_action(action: str, params: dict[str, Any]) -> bool:
    """Refuse an edit on a group row, which is computed rather than entered.

    A refusal reopens the editor holding the rejected value and marked
    `aria-invalid`, so it is corrected rather than retyped, and the same path a
    value the column cannot hold takes.
    """
    if action != "edit":
        return True
    if is_group(params["key"]):
        say(f"refused an edit of `{params['column']}` on `{params['key']}`, which is a total")
        return False
    return True


def roll_up() -> None:
    """Recompute the totals after an edit, without recording a step of its own.

    Straight onto `source` rather than through `update_node`, because a total is
    derived from the tree rather than a change to it: writing it through the
    public mutator would make `Ctrl+Z` mean "put the old totals back" and take a
    second press to reach the edit anybody actually made. The state the undo
    stack holds was recorded before the edit and already carries the totals that
    went with it, so stepping back lands on a consistent tree either way.

    The copy is what keeps that true. `get_source` is shallow, so the recorded
    state shares these node dicts, and filling them in place would rewrite the
    tree the history is holding.
    """
    table.source = total(copy.deepcopy(table.source))


def on_event(name: str, params: dict) -> None:
    """Report what landed, and recompute the totals after an edit that did."""
    if name == "edit":
        if params["applied"]:
            say(f"`{params['key']}`.{params['column']} {params['previous']!r} to {params['value']!r}")
            roll_up()
        elif params["value"] is None:
            # The only way a coerced value comes back empty: the column cannot
            # hold what was typed. The editor is already reopen on it, marked
            # invalid, so this is a note rather than the report.
            say(f"`{params['column']}` cannot hold what was typed")
    elif name == "rename" and params["applied"]:
        say(f"renamed `{params['key']}` to {params['title']}")


table = TanstackTable(
    source=source,
    columns=columns,
    types=TYPES,
    options={
        "aria_label": "Service inventory",
        "expand_all": True,
        # Nothing here changes the shape of the tree, so the gestures that would
        # are all off: no drag, no add, no delete, no context menu.
        "enable_dnd": False,
        "select_mode": "single",
        "show_checkboxes": False,
        # Branches above leaves at every level, whichever way a column is sorted,
        # so a site never sorts in among the services of another one.
        "sort_folders_first": True,
        "search_label": "Search any column",
        # `rename` is here for the tree column alone, which is what puts `F2` on
        # the title and lets `Tab` walk from it into the other four editors. The
        # actions that would reshape the tree are absent, and because the list
        # gates the shortcuts as well as the buttons, `Delete` and `Insert` do
        # nothing at all in this table.
        "toolbar": ["undo", "redo", "|", "rename", "|", "expand-all", "collapse-all", "|", "search"],
    },
    event_callback=on_event,
    action_callback=allow_action,
    sizing_mode="stretch_both",
)

notes = pn.pane.Markdown(
    """
### Try it

- **Click a header** to sort: ascending, descending, then back to the tree's own
  order. One column at a time, and `Monitored` declines to sort at all.
- Sites and regions stay above the services at every level, through
  `sort_folders_first`, so a sort never mixes the levels together.
- **Drag a header edge** to resize, or focus the header with `ArrowUp` from the
  first row and resize with the arrow keys. `Owner` will not go past 260 px and
  `Monitored` will not move at all.
- **Sorting and resizing are view state.** Neither touches `source`, so neither is
  something Python is told about or asked to allow.
- **Double click a cell**, or press `F2` or `Enter`, to edit it. `Tab` commits and
  opens the next editable cell in the row, `Shift+Tab` the previous, `Escape`
  leaves without writing. `F2` on a row starts at the title and `Tab` walks the
  whole row from there.
- One column per editor kind: `Status` is a **select**, `Instances` a **number**
  with a step and a range, `Owner` a **text** box and `Monitored` a **checkbox**.
  The select and the checkbox commit the moment you choose, because neither has a
  half-chosen state worth holding.
- Type `twelve` into `Instances`, or `99`, which is past the column's maximum.
  Either way the editor **comes back holding what you typed**, marked invalid,
  rather than closing and writing nothing.
- Editing a **region or a site** is refused for the same reason and through the
  same path: those cells are the example's own arithmetic over the services
  under them, recomputed after every edit.
- The title is a **rename**, not an edit. That is a separate intent on purpose,
  because a name carries a file type warning, an icon rule and a public
  `rename_node` that no other column has any use for.
- **Icons and the leaf rule come from `types`**, not from the rows: a service
  declares `type: "service"` and takes the icon, the console glyph and
  `allow_children: False` from there.
- A type may carry a **column value** too. `Monitored` is `True` on the service
  type, so most rows show it without saying so, and `lab` and `batch` set
  `False` on themselves, because a node always wins over its type.
- Ticking a box **writes the node, never the type**. One service changing its
  mind cannot change every service.
- **Ctrl+F** jumps to the search box, which reads every column: try `degraded`,
  or `frontend`, and the path to each match stays visible.
- **Ctrl+Z** takes back an edit in one press. The roll-up that followed it is
  written straight onto `source` rather than through a public mutator, so it
  records no step of its own: a total is derived from the tree, not a change
  anybody made to it.
- The toolbar has no `add` and no `delete`, so **`Insert` and `Delete` do
  nothing**. The list gates the shortcuts as well as the buttons.
""",
    sizing_mode="stretch_width",
)

PANE_STYLES = {
    "background": "rgba(255, 255, 255, 0.5)",
    "border-radius": "8px",
    "padding": "10px",
}

app = Panelini(title="TanstackTable treegrid columns", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            pn.Column(
                pn.pane.Markdown("#### Service inventory", margin=(0, 0, 5, 5)),
                table,
                styles=PANE_STYLES,
                sizing_mode="stretch_both",
                margin=(0, 15, 0, 0),
            ),
            pn.Column(
                log,
                notes,
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
    pn.io.server.serve(app, port=5013)
