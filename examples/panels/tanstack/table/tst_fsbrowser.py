"""A real filesystem, loaded a directory at a time, beside a tree with a size knob.

Two things that are hard to show on a tree that fits in a file. The left pane walks
this repository with ``pathlib`` behind ``lazy_callback``, so nothing is read until
a folder is opened and nothing is ever written. The right pane mints 100, 1,000 or
10,000 nodes on demand and reports what that costs: the bytes ``source`` holds, the
bytes the browser is actually sent, and the number of rows in the DOM. Install and
run:

    uv sync
    uv run python examples/panels/tanstack/table/tst_fsbrowser.py
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Any

import panel as pn

from panelini import Panelini
from panelini.panels.tanstack.table import TanstackTable, icon_for, tree

# The repository this file lives in, which is the tree the left pane walks.
ROOT = Path(__file__).resolve().parents[4]

# The key of the root node. A key is what a lazy load names, and an empty one names
# nothing, so the root of a relative path is spelled the way a shell spells it.
ROOT_KEY = "."

# Directories that are large, generated or private, and interesting to nobody
# reading this. Skipped by name at every level rather than by path.
SKIP = {".git", "node_modules", "__pycache__", ".venv", ".ruff_cache", ".pytest_cache", ".ign"}

# One level of a directory is read per expand, so this is the cost of an expand and
# not the cost of the tree. A folder of ten thousand files would still be one call.
MAX_ENTRIES = 500

FOLDER_TYPE = {"icon": "folder", "kind": "folder", "allow_children": True}
FILE_TYPE = {"kind": "file", "allow_children": False}

log = pn.pane.Markdown("**Log:** nothing read yet.", sizing_mode="stretch_width")
messages: list[str] = []


def say(text: str) -> None:
    messages.append(text)
    log.object = "**Log:**\n\n" + "\n".join(f"- {line}" for line in messages[-8:])


def stamp(path: Path) -> str:
    """The modification time of a path, or empty when it cannot be read."""
    try:
        return datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d %H:%M")
    except OSError:
        return ""


def size_of(path: Path) -> str:
    """The size of a file in bytes, grouped, or empty for anything else."""
    try:
        return f"{path.stat().st_size:,}"
    except OSError:
        return ""


def node_for(path: Path) -> dict[str, Any]:
    """One node for one directory entry.

    A directory is marked `lazy` rather than filled: it renders a twisty, holds no
    rows, and asks for its children the first time somebody opens it. That is the
    whole reason a tree this size can be handed to the panel at all.

    The key is the path relative to the root, which is unique by construction and
    is also what the loader reads to know where to look. Nothing else about the
    filesystem crosses.
    """
    relative = path.relative_to(ROOT).as_posix()
    if path.is_dir():
        return {
            "key": relative,
            "title": path.name,
            "type": "folder",
            "lazy": True,
            "modified": stamp(path),
            "size": "",
        }
    return {
        "key": relative,
        "title": path.name,
        "type": "file",
        "icon": icon_for(path.name),
        "modified": stamp(path),
        "size": size_of(path),
    }


def read_dir(relative: str) -> list[dict[str, Any]]:
    """List one directory, folders first and each half sorted by name.

    A directory that cannot be read comes back empty rather than raising. The
    branch then loads to nothing, which is what an unreadable folder is, and the
    twisty goes away instead of the session doing.
    """
    path = ROOT if relative == ROOT_KEY else ROOT / relative
    try:
        entries = [entry for entry in path.iterdir() if entry.name not in SKIP]
    except OSError:
        return []
    entries.sort(key=lambda entry: (not entry.is_dir(), entry.name.lower()))
    return [node_for(entry) for entry in entries[:MAX_ENTRIES]]


def load_children(key: str, node: dict[str, Any]) -> list[dict[str, Any]]:
    """Answer the browser asking for a folder's contents.

    Returning a list answers now. An application waiting on a network call would
    return None here and call `set_children` when the call comes back, which is
    the same thing arriving later.
    """
    loaded = read_dir(key)
    say(f"read `{key}`, {len(loaded)} entries")
    return loaded


def refuse(*_args: Any) -> bool:
    """Refuse every change, which is what read only means here.

    Both hooks, because they answer for different things: `action_callback` for an
    add, a rename, a delete and an edit, `move_callback` for a drop. `enable_dnd`
    is off as well, so the browser never offers the gesture in the first place, and
    this is the half that holds if an intent is built by hand.
    """
    return False


browser = TanstackTable(
    # One root, lazy. A hundred bytes of tree for a repository of any size.
    source=[
        {
            "key": ROOT_KEY,
            "title": ROOT.name,
            "type": "folder",
            "lazy": True,
            "size": "",
            "modified": stamp(ROOT),
        }
    ],
    columns=[
        {"id": "title", "header": "Name", "width": 320, "min_width": 180},
        {"id": "size", "header": "Size", "width": 110},
        {"id": "modified", "header": "Modified", "width": 150},
    ],
    types={"folder": FOLDER_TYPE, "file": FILE_TYPE},
    options={
        "aria_label": "Repository browser",
        "enable_dnd": False,
        "select_mode": "single",
        "show_checkboxes": False,
        "sort_folders_first": True,
        # A branch that is closed again stops crossing, so a session that has been
        # opened wide costs what is on screen rather than everything ever read.
        # Re-opening it is answered out of Python's own tree without asking the
        # loader a second time.
        "prune": "collapsed",
        # No add, no delete, no rename, and because the list gates the shortcuts
        # too, no `Insert`, `Delete` or `F2` either. `expand-all` is absent for a
        # different reason: on a lazy tree it would mean "read the whole disk".
        "toolbar": ["search"],
        "search_label": "Search what is loaded",
    },
    lazy_callback=load_children,
    action_callback=refuse,
    move_callback=refuse,
    sizing_mode="stretch_both",
)


# Two levels below whatever is selected, which is a preload rather than a crawl.
PRELOAD_DEPTH = 2


def preload(_event: Any) -> None:
    """Read every folder under the selected one, in one push.

    Each `set_children` is its own write, so a hundred of them is a hundred pushes
    of the whole tree. Inside a batch they are one, which is the difference between
    a preload that flickers through every intermediate state and one that does not.
    """
    selected = browser.get_selected()
    start = selected[0] if selected else ROOT_KEY
    node = tree.find_node(browser.source, start)
    if node is None or node.get("type") != "folder":
        say("select a folder to preload")
        return

    loaded: list[str] = []

    def walk(key: str, depth: int) -> None:
        if depth >= PRELOAD_DEPTH:
            return
        children = read_dir(key)
        browser.set_children(key, children)
        loaded.append(key)
        for child in children:
            if child.get("type") == "folder":
                walk(str(child["key"]), depth + 1)

    with browser.batch():
        walk(start, 0)
    # Expanding is a key set rather than a tree, so it costs nothing to do here.
    browser.expand_node(start)
    say(f"preloaded {len(loaded)} folders under `{start}` in one push")


preload_button = pn.widgets.Button(name="Preload 2 levels", button_type="primary", width=150)
preload_button.on_click(preload)

# --- The right pane: a tree of a chosen size, and what it costs. ----------------

SIZES = {"100 nodes": 100, "1,000 nodes": 1000, "10,000 nodes": 10000}

# Ten files per folder, which is the shape that prunes worst of the three measured
# in the plan: a shallow tree of huge folders would flatter these numbers.
PER_FOLDER = 10


def synthetic(count: int) -> list[dict[str, Any]]:
    """A tree of exactly `count` nodes, folders of ten files each."""
    nodes: list[dict[str, Any]] = []
    minted = 0
    index = 0
    while minted < count:
        minted += 1
        children: list[dict[str, Any]] = []
        while len(children) < PER_FOLDER and minted < count:
            child = len(children)
            children.append({
                "key": f"f{index}-{child}",
                "title": f"item-{index}-{child}.txt",
                "type": "file",
                "size": f"{(index * 37 + child * 11) % 9000:,}",
                "modified": "2026-01-01 00:00",
            })
            minted += 1
        nodes.append({
            "key": f"f{index}",
            "title": f"folder-{index:04d}",
            "type": "folder",
            "size": "",
            "modified": "2026-01-01 00:00",
            "children": children,
        })
        index += 1
    return nodes


def wire_bytes(table: TanstackTable) -> tuple[int, int]:
    """What the tree weighs, and what the browser is actually sent.

    `_view` is private on purpose: it is derived from `source` and nothing outside
    the panel should ever write it. Reading it is how this example puts a number on
    what pruning is worth, and is not something an application needs to do.
    """
    held = len(json.dumps(table.source, separators=(",", ":")))
    sent = len(json.dumps(table._view, separators=(",", ":")))
    return held, sent


bench = TanstackTable(
    source=synthetic(SIZES["1,000 nodes"]),
    columns=[
        {"id": "title", "header": "Name", "width": 260, "min_width": 160},
        {"id": "size", "header": "Size", "width": 100},
        {"id": "modified", "header": "Modified", "width": 150},
    ],
    types={"folder": FOLDER_TYPE, "file": FILE_TYPE},
    options={
        "aria_label": "Synthetic tree",
        "enable_dnd": False,
        "select_mode": "single",
        "show_checkboxes": False,
        "prune": "collapsed",
        "toolbar": ["expand-all", "collapse-all", "|", "search"],
    },
    sizing_mode="stretch_both",
)

readout = pn.pane.Markdown("", sizing_mode="stretch_width")


def report(*_events: Any) -> None:
    """Publish what the current synthetic tree weighs on each side of the wire."""
    held, sent = wire_bytes(bench)
    ratio = f"{held / sent:.0f}x" if sent else "n/a"
    nodes = sum(1 for _ in tree.iter_nodes(bench.source))
    readout.object = (
        f"| | bytes |\n| --- | --- |\n"
        f"| nodes in `source` | {nodes:,} |\n"
        f"| `source` holds | {held:,} |\n"
        f"| the browser is sent | {sent:,} |\n"
        f"| saved by `prune` | **{ratio}** |\n"
    )


def resize(event: Any) -> None:
    """Mint a new tree of the chosen size."""
    bench.set_source(synthetic(SIZES[event.new]))
    report()


size_choice = pn.widgets.RadioButtonGroup(name="Size", options=list(SIZES), value="1,000 nodes", button_type="default")
size_choice.param.watch(resize, "value")
# The view is rebuilt whenever a branch opens or closes, which is exactly when the
# number moves, so the readout follows the same param the pruning does.
bench.param.watch(report, "expanded_keys")
report()

# The panel counts no rows for anybody, so this walks the shadow roots and counts
# them here. It is the one number that shows P15 doing its job: expand every folder
# of the 10,000 node tree and the DOM still holds a screenful.
dom_rows = pn.pane.HTML(
    """
<div style="font-size:13px">rows in the DOM:
  <strong id="pnl-dom-rows" style="font-family:monospace">counting</strong>
</div>
<script>
(function () {
  if (window.__pnlRowCounter) return;
  // Panel renders each table into a nested shadow root, so a plain
  // querySelectorAll from the document sees none of the rows.
  function walk(root, found) {
    for (const el of root.querySelectorAll('*')) {
      if (el.shadowRoot) walk(el.shadowRoot, found);
    }
    for (const group of root.querySelectorAll('.pnl-tst-body')) {
      found.push(group.querySelectorAll('[role="row"]').length);
    }
    return found;
  }
  window.__pnlRowCounter = setInterval(function () {
    const out = document.getElementById('pnl-dom-rows');
    if (!out) return;
    const counts = walk(document, []);
    out.textContent = counts.length ? counts.join(' + ') + ' = ' + counts.reduce((a, b) => a + b, 0) : '0';
  }, 500);
})();
</script>
""",
    sizing_mode="stretch_width",
)

# --- Notes ----------------------------------------------------------------------

notes = pn.pane.Markdown(
    """
### Try it

- **Open a folder on the left.** Nothing under it existed a moment ago: the node
  was marked `lazy`, the twisty asked Python for its contents, and `pathlib` read
  exactly one directory. The row is `aria-busy` while it waits, which a screen
  reader announces.
- The whole repository starts as **one node**. A tree that had to arrive complete
  could not be handed over at all.
- **Preload 2 levels** fills every folder under the selected one at once. Each fill
  is its own write, so a batch is what makes them one push of the tree instead of
  one push each.
- A load records **no undo step**. It reveals part of the tree rather than changing
  it, and `Ctrl+Z` meaning "close that folder again" is not an edit anybody made.
- **Nothing here can be changed.** No drag, no add, no rename, no delete, and both
  Python hooks refuse anyway, so an intent built by hand is refused too. The
  browser is trusted for the affordance and never for the decision.
- **Search reads what is loaded.** That is the honest cost of a lazy tree: Python
  cannot search a directory it has not read. Preload a branch and its contents join
  the search.
- **Close a folder** on either pane and watch the byte count on the right. With
  `prune: "collapsed"` a closed branch stops crossing the wire, and re-opening it
  is answered out of Python's own tree rather than by reading the disk again.
- **Pick 10,000 nodes** and expand everything. `source` holds about a megabyte, the
  browser is sent a fraction of it, and the row count stays near a screenful
  however far you scroll: the rows below the fold are not in the DOM at all.
- The row count is the example's own JavaScript walking the shadow roots. The panel
  exposes no such number, and this is the one place it is worth having.
""",
    sizing_mode="stretch_width",
)

PANE_STYLES = {
    "background": "rgba(255, 255, 255, 0.5)",
    "border-radius": "8px",
    "padding": "10px",
}


def framed(*objects: object) -> pn.Column:
    """Put one pane on its own floating panel, with room beside it for the next."""
    return pn.Column(*objects, styles=PANE_STYLES, sizing_mode="stretch_both", margin=(0, 15, 0, 0))


app = Panelini(title="TanstackTable filesystem browser", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            framed(
                pn.pane.Markdown(f"#### {ROOT.name}, read only", margin=(0, 0, 5, 5)),
                preload_button,
                browser,
            ),
            framed(
                pn.pane.Markdown("#### Synthetic tree", margin=(0, 0, 5, 5)),
                size_choice,
                bench,
            ),
            pn.Column(
                readout,
                dom_rows,
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
    pn.io.server.serve(app, port=5014)
