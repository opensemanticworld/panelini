"""What the big tree example promises, asserted as numbers.

Everything here is exact, because the tree is minted rather than read: the knob
asks for a size and gets exactly that many nodes, the browser is sent a fraction
of them, and the DOM holds a screenful however many there are.
"""

import importlib

import pytest
from playwright.sync_api import Page

from panelini.panels.tanstack.table import tree
from panelini.testing import wait_until
from tests.panels.tanstack.table.helpers import rows, serve

MODULE = "examples.panels.tanstack.table.tst_bigtree"


@pytest.fixture
def example():
    """A fresh import per test: the tree is module level and every test mutates it."""
    return importlib.reload(importlib.import_module(MODULE))


def node_count(nodes) -> int:
    return sum(1 for _ in tree.iter_nodes(nodes))


def counter_text(page: Page) -> str:
    return page.locator("#pnl-dom-rows").inner_text()


def test_the_tree_is_the_size_the_knob_asks_for(example):
    """The one exact count a tree can have, because this one is minted."""
    assert node_count(example.bench.source) == example.SIZES[example.INITIAL]


def test_every_size_mints_exactly_what_it_names(example):
    """Every rung of the knob, up to the ones that are slow rather than different."""
    for label in ("1", "100", "1k", "10k"):
        example.mint(example.SIZES[label])
        assert node_count(example.bench.source) == example.SIZES[label]


def test_pruning_sends_the_browser_a_fraction_of_what_python_holds(example):
    """`prune: "collapsed"` is what this example is for. Read through the example's
    own `wire_bytes`, which is where it puts the number on screen."""
    held, sent = example.wire_bytes(example.bench)

    assert 0 < sent < held
    # A thousand nodes of ten files each is the shape that prunes worst of the
    # three the plan measured, and it still saves an order of magnitude.
    assert held / sent > 10


def test_the_readout_reports_what_the_wire_carries(example):
    """The table on screen is the measurement, not a description of one."""
    held, sent = example.wire_bytes(example.bench)

    assert f"| `source` holds | {held:,} bytes |" in example.readout.object
    assert f"| the browser is sent | {sent:,} bytes |" in example.readout.object


def test_the_knob_mints_a_new_tree(page: Page, port, example):
    server = serve(example.app, page, port)

    page.get_by_role("button", name="100", exact=True).click()

    wait_until(lambda: node_count(example.bench.source) == example.SIZES["100"], timeout=15)

    server.stop()


def test_a_branch_that_opens_stops_being_pruned(page: Page, port, example):
    """The view is rebuilt when a branch opens, so what crosses grows by the branch
    that was opened rather than by the whole tree."""
    server = serve(example.app, page, port)
    _, before = example.wire_bytes(example.bench)

    rows(page).first.locator(".pnl-tst-twisty").click()

    wait_until(lambda: example.wire_bytes(example.bench)[1] > before, timeout=15)
    held, after = example.wire_bytes(example.bench)
    assert after < held

    server.stop()


def test_expanding_everything_is_pythons_to_do(page: Page, port, example):
    """`expand_all` reads the tree Python owns, so it opens branches the browser has
    never been given. The toolbar's own `expand-all` cannot: it opens the rows it
    holds, and under `prune` an unopened branch is a twisty with nothing inside."""
    server = serve(example.app, page, port)
    _, before = example.wire_bytes(example.bench)

    page.get_by_role("button", name="Expand all").click()

    wait_until(lambda: len(example.bench.expanded_keys) == len(example.bench.source), timeout=15)
    held, after = example.wire_bytes(example.bench)
    # Every branch open is the whole tree on the wire, which is what pruning buys
    # back and what this button is here to make visible.
    assert before < after == held

    server.stop()


def test_the_dom_holds_a_screenful_of_an_expanded_thousand_node_tree(page: Page, port, example):
    """The windowed rowgroup, counted by the example's own JavaScript walking the
    shadow roots, which is the number the page puts on screen."""
    server = serve(example.app, page, port)

    page.get_by_role("button", name="Expand all").click()

    # Every branch open means every node crossed, so what follows is a whole tree
    # rendered into a window rather than a tree the browser never received.
    wait_until(lambda: len(example.bench.expanded_keys) == len(example.bench.source), timeout=15)
    assert node_count(example.bench.source) == example.SIZES[example.INITIAL]

    wait_until(lambda: rows(page).count() < 100, timeout=15)

    # The counter reaches the same number the locator does, which is what proves
    # the shadow root walk in the example finds the rows at all.
    wait_until(lambda: counter_text(page).strip() == str(rows(page).count()), timeout=15)

    server.stop()
