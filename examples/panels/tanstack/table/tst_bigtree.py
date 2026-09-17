"""A tree with a size knob, from one node to a million, and what each size costs.

Six orders of magnitude on one button group. Picking a size mints that many nodes,
pushes them, and reports what happened: how long the mint and the push took, the
bytes ``source`` holds, the bytes the browser is actually sent once collapsed
branches are pruned out, and the number of rows that reached the DOM. Install and
run:

    uv sync
    uv run python examples/panels/tanstack/table/tst_bigtree.py
"""

import json
import time
from typing import Any

import panel as pn

from panelini import Panelini
from panelini.panels.tanstack.table import TanstackTable, tree

FOLDER_TYPE = {"icon": "folder", "kind": "folder", "allow_children": True}
FILE_TYPE = {"kind": "file", "allow_children": False}

# Six orders of magnitude, from a tree of one to a tree of a million. The labels
# are short because six of them share the width of one pane, and because a reader
# comparing them is comparing the exponent rather than reading a number.
SIZES = {"1": 1, "100": 100, "1k": 1_000, "10k": 10_000, "100k": 100_000, "1M": 1_000_000}

# What the tree the readout describes starts at: large enough to be a tree, small
# enough that opening the page costs nothing.
INITIAL = "1k"

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
    source=[],
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
        # Only the branches that have been opened cross the wire, so a tree of a
        # million nodes costs what has been looked at rather than what exists.
        "prune": "collapsed",
        # No `expand-all` here, and the two buttons beside the knob are why: the
        # browser can only expand branches it holds, and under `prune` it holds
        # the unopened ones as twisties with nothing inside. Expanding everything
        # is asking Python for the whole tree, so Python is what asks.
        "toolbar": ["search"],
    },
    sizing_mode="stretch_both",
)

readout = pn.pane.Markdown("", sizing_mode="stretch_width")

# What the last mint and the last push cost, in seconds. Python's half of the
# answer: building the dicts, then rewriting the pruned view the browser is sent.
# The browser's half, receiving that view and building a row model from it, is on
# top of this and is not something Python can time.
timing = {"mint": 0.0, "push": 0.0}


def clock(seconds: float) -> str:
    """A duration a reader can compare at a glance."""
    return f"{seconds * 1000:.0f} ms" if seconds < 1 else f"{seconds:.2f} s"


def mint(count: int) -> None:
    """Build a tree of exactly *count* nodes, push it, and time both halves."""
    started = time.perf_counter()
    nodes = synthetic(count)
    built = time.perf_counter()
    bench.set_source(nodes)
    timing["mint"] = built - started
    timing["push"] = time.perf_counter() - built


def report(*_events: Any) -> None:
    """Publish what the current tree weighs on each side of the wire."""
    held, sent = wire_bytes(bench)
    ratio = f"{held / sent:.0f}x" if sent else "n/a"
    nodes = sum(1 for _ in tree.iter_nodes(bench.source))
    readout.object = (
        f"| measure | value |\n| --- | --- |\n"
        f"| nodes in `source` | {nodes:,} |\n"
        f"| `source` holds | {held:,} bytes |\n"
        f"| the browser is sent | {sent:,} bytes |\n"
        f"| saved by `prune` | **{ratio}** |\n"
        f"| minted in Python | {clock(timing['mint'])} |\n"
        f"| pruned and pushed | **{clock(timing['push'])}** |\n"
    )


def resize(event: Any) -> None:
    """Mint a new tree of the chosen size."""
    mint(SIZES[event.new])
    report()


def expand_everything(_event: Any) -> None:
    """Open every branch, which under `prune` is Python sending the whole tree.

    `expand_all` reads `source`, so it names branches the browser has never been
    given, and the view is rebuilt to carry them. The toolbar's own `expand-all`
    cannot do this: it opens the rows it holds, and a pruned branch is a twisty
    with nothing inside it.
    """
    bench.expand_all()
    report()


def collapse_everything(_event: Any) -> None:
    """Close every branch. What has already crossed stays with the browser."""
    bench.collapse_all()
    report()


size_choice = pn.widgets.RadioButtonGroup(name="Size", options=list(SIZES), value=INITIAL, button_type="default")
size_choice.param.watch(resize, "value")

expand_button = pn.widgets.Button(name="Expand all", button_type="primary", width=110)
expand_button.on_click(expand_everything)
collapse_button = pn.widgets.Button(name="Collapse all", width=110)
collapse_button.on_click(collapse_everything)
mint(SIZES[INITIAL])
# The view is rebuilt whenever a branch opens or closes, which is exactly when the
# number moves, so the readout follows the same param the pruning does.
bench.param.watch(report, "expanded_keys")
report()

# The panel counts no rows for anybody, so this walks the shadow roots and counts
# them here. It is the one number that shows the windowed rowgroup doing its job:
# expand every folder of the 10,000 node tree and the DOM still holds a screenful.
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
  // This pane is in a shadow root of its own, so the element the count is written
  // into is no more reachable from the document than the rows are.
  function find(root, selector) {
    const here = root.querySelector(selector);
    if (here) return here;
    for (const el of root.querySelectorAll('*')) {
      if (el.shadowRoot) {
        const found = find(el.shadowRoot, selector);
        if (found) return found;
      }
    }
    return null;
  }
  window.__pnlRowCounter = setInterval(function () {
    const out = find(document, '#pnl-dom-rows');
    if (!out) return;
    const counts = walk(document, []);
    out.textContent = counts.length ? String(counts.reduce((a, b) => a + b, 0)) : '0';
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

- **Pick 10k** and press **Expand all**. The row count stays near a screenful
  however far you scroll: the rows below the fold are not in the DOM at all.
- **Expanding everything is Python's to do here.** `expand_all` reads the tree
  Python owns, so it names branches the browser has never been given and the whole
  of `source` crosses, which the byte count then says out loud. The toolbar's own
  `expand-all` opens the rows the browser holds, and under `prune` an unopened
  branch is a twisty with nothing inside it.
- **What `prune` saves is what nobody opens.** A fresh tree crosses as its top
  level alone, one row per folder, and a branch arrives the first time it is
  opened. Watch the byte count climb as you open them, and stay where it lands
  when you close them again: a branch the browser has been sent is not taken back
  off it, which is what makes re-opening it instant. Picking a size starts the
  accounting over.
- **Walk the sizes from 1 to 1M** and watch the two times. Minting is Python
  building dicts and pruning is Python rewriting the view, and both stay linear:
  ten times the tree is about ten times the work, all the way up.
- **1M is the honest ceiling.** `source` holds about a hundred megabytes and half a
  gigabyte of Python objects, the pruned view is still ten megabytes, and the
  browser needs a few seconds to receive it and build a row model of the ninety
  thousand folders that survive the prune. The two times below are Python's half
  only; the wall clock is longer, and that gap is the browser's.
- **Search reads the whole tree**, loaded or not, because this one holds all of it.
  A tree loaded a directory at a time cannot do that, which is what the filesystem
  browser example is about.
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


app = Panelini(title="TanstackTable big tree", sidebar_visible=False)
app.main_set(
    objects=[
        pn.Row(
            framed(
                pn.Row(
                    pn.pane.Markdown("#### Nodes", margin=(0, 8, 0, 5)),
                    size_choice,
                    sizing_mode="stretch_width",
                ),
                pn.Row(expand_button, collapse_button, sizing_mode="stretch_width"),
                bench,
            ),
            pn.Column(
                readout,
                dom_rows,
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
    pn.io.server.serve(app, port=5015)
