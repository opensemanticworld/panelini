# Big tree - one node to a million, and what each size costs

```{image} /_static/media/tanstack/tst_bigtree_overview.webp
:alt: A synthetic tree resized from a thousand to a hundred thousand nodes, with a live cost readout
:class: docs-media
```

**Source:** [`examples/panels/tanstack/table/tst_bigtree.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/tanstack/table/tst_bigtree.py)
**Test:** [`tests/panels/tanstack/table/examples/test_tst_bigtree.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/tanstack/table/examples/test_tst_bigtree.py)

Six orders of magnitude on one button group. Picking a size mints that many nodes, pushes them, and reports what happened. The tree is folders of ten files each, which is the shape that prunes worst of the three the design measured, so every number here is a floor rather than a flattering case.

## Features on display

- **A windowed rowgroup**: expand a ten thousand node tree and the DOM still holds about a screenful of rows, however far you scroll.
- **`prune: "collapsed"`**: a branch nobody has opened crosses as a twisty and nothing more. At a hundred thousand nodes that is about **10.3 MB held against 963 kB sent**.
- **A live readout** of nodes held, bytes in `source`, bytes sent, the ratio between them, and the time to mint and to push.
- **Expanding everything is Python's**: `expand_all` reads the tree Python owns, so it opens branches the browser has never been given. The toolbar's own `expand-all` opens the rows the browser holds, and under `prune` an unopened branch is a twisty with nothing inside it.
- **The row count** is the example's own JavaScript walking Panel's shadow roots, because the panel exposes no such number.

## The wiring

```python
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
        "prune": "collapsed",
        "toolbar": ["search"],
    },
    sizing_mode="stretch_both",
)


def wire_bytes(table: TanstackTable) -> tuple[int, int]:
    """What the tree weighs, and what the browser is actually sent."""
    held = len(json.dumps(table.source, separators=(",", ":")))
    sent = len(json.dumps(table._view, separators=(",", ":")))
    return held, sent
```

Key points:

- `set_source` is one write and one push. The example times both halves separately, because minting dicts in Python and rewriting the pruned view are different costs and they scale the same way.
- The bytes sent are read off the private `_view`, which the example does to put a number on the saving. An application has no reason to do it.
- The readout follows `expanded_keys`, because that is exactly the param that decides what crosses.
- **1M is the honest ceiling.** `source` holds about a hundred megabytes, the pruned view is still about ten, and the browser needs a few seconds to receive it. The two times on screen are Python's half only.

## How the test exercises it

- **Exact sizes**: every rung of the knob mints exactly the node count it names.
- **Pruning**: `source` weighs more than ten times what the browser is sent, read through the example's own `wire_bytes`.
- **The readout is the measurement**, not a description of one: the bytes it prints are the bytes `wire_bytes` returns.
- **Opening a branch** grows what crosses by that branch and no more.
- **`expand_all`** takes what crosses all the way up to the whole tree, which is what the button is there to show.
- **The window**: with every branch open on a thousand node tree, fewer than a hundred rows are in the DOM, and the example's own counter agrees with what Playwright counts.

## Run it live

This example runs entirely in your browser via Pyodide. The first load downloads packages, so give it a few seconds. Sizes above ten thousand are noticeably slower in WASM than on a server.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/tanstack/tst_bigtree.html" title="Big tree - one node to a million" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/tanstack/tst_bigtree.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/tanstack_table` - the panel guide, including the large-tree notes
- {doc}`tst_fsbrowser` - the same machinery over a real directory tree
- {doc}`tst_vfsexplorer_extfiledrop` - the same panel with every gesture turned on
