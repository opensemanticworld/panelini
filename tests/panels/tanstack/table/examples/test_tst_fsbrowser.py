"""What the filesystem browser example promises, asserted as invariants.

The left pane walks this repository, so nothing here names a file, counts a
directory or assumes a depth: what is pinned down is that one node becomes a tree
one directory at a time, that a preload is a single push, and that a collapsed
branch stops crossing the wire. Only the right pane's synthetic tree is exact,
because the example mints it.
"""

import importlib

import pytest
from playwright.sync_api import Page, expect

from panelini.panels.tanstack.table import tree
from panelini.testing import wait_until
from tests.panels.tanstack.table.helpers import node_at, pane_rows, panes, start

MODULE = "examples.panels.tanstack.table.tst_fsbrowser"

# The left pane is the repository, the right one the synthetic tree, in the order
# the example lays them out.
BROWSER, BENCH = 0, 1


@pytest.fixture
def example():
    """A fresh import per test: both trees are module level and both are mutated."""
    return importlib.reload(importlib.import_module(MODULE))


def serve_both(example, page: Page, port: int):
    """Serve the example and wait for both panes to render."""
    server = start(example.app, page, port)
    expect(panes(page)).to_have_count(2, timeout=15000)
    pane_rows(page, BENCH).first.wait_for(state="visible", timeout=15000)
    pane_rows(page, BROWSER).first.wait_for(state="visible", timeout=15000)
    return server


def twisty(page: Page, pane: int, row_index: int):
    return pane_rows(page, pane).nth(row_index).locator(".pnl-tst-twisty")


def children_of(example, key: str) -> list:
    return node_at(example.browser.source, key).get("children") or []


def node_count(nodes) -> int:
    return sum(1 for _ in tree.iter_nodes(nodes))


def test_the_whole_repository_starts_as_one_lazy_node(example):
    """A tree that had to arrive complete could not be handed over at all, which is
    the reason the example exists. No browser needed to see it."""
    assert len(example.browser.source) == 1
    root = example.browser.source[0]
    assert root["key"] == example.ROOT_KEY
    assert root["lazy"] is True
    assert "children" not in root


def test_expanding_the_root_reads_exactly_one_directory(page: Page, port, example):
    """The twisty asks Python for the contents, `pathlib` reads one level, and the
    branches below it are still unread."""
    server = serve_both(example, page, port)

    twisty(page, BROWSER, 0).click()

    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)
    loaded = children_of(example, example.ROOT_KEY)
    # Nothing under the root was read: every folder in it is still a twisty.
    assert all(child.get("lazy") for child in loaded if child["type"] == "folder")
    assert all("children" not in child for child in loaded)
    # The example says what it read, and it read one directory.
    assert example.messages == [f"read `{example.ROOT_KEY}`, {len(loaded)} entries"]

    server.stop()


def test_a_folder_below_the_root_expands_on_its_own(page: Page, port, example):
    """Row 1 is the first entry of the root, and `read_dir` puts the folders first,
    so this is a folder for as long as the repository has one."""
    server = serve_both(example, page, port)
    twisty(page, BROWSER, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    first = children_of(example, example.ROOT_KEY)[0]
    assert first["type"] == "folder", "the repository root holds no directory"

    twisty(page, BROWSER, 1).click()

    wait_until(lambda: "children" in node_at(example.browser.source, first["key"]), timeout=15)
    # A branch that has been read is a branch, not a promise of one.
    assert not node_at(example.browser.source, first["key"]).get("lazy")
    assert len(example.messages) == 2

    server.stop()


def test_a_preload_is_one_push_however_many_folders_it_reads(page: Page, port, example):
    """Each `set_children` is its own write, so a batch is the difference between
    one push of the tree and one push per folder."""
    server = serve_both(example, page, port)
    twisty(page, BROWSER, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    pushes = []
    example.browser.param.watch(lambda *events: pushes.append(1), "source")

    # Nothing is selected, so the preload starts from the root.
    page.get_by_role("button", name="Preload 2 levels").click()

    wait_until(lambda: any("preloaded" in line for line in example.messages), timeout=30)
    assert pushes == [1]
    read = int(example.messages[-1].split()[1])
    assert read > 1, "the preload read only the folder it started from"

    server.stop()


def test_a_load_records_no_undo_step(page: Page, port, example):
    """Revealing part of the tree is not a change to it, so `Ctrl+Z` has nothing to
    take back and the read only pane stays read only."""
    server = serve_both(example, page, port)

    twisty(page, BROWSER, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    assert example.browser.can_undo is False

    server.stop()


def test_the_synthetic_tree_is_the_size_the_knob_asks_for(page: Page, port, example):
    """The one exact count in the file, because this tree is minted rather than read."""
    server = serve_both(example, page, port)
    assert node_count(example.bench.source) == example.SIZES["1,000 nodes"]

    page.get_by_role("button", name="100 nodes").click()

    wait_until(lambda: node_count(example.bench.source) == example.SIZES["100 nodes"], timeout=15)

    server.stop()


def test_pruning_sends_the_browser_a_fraction_of_what_python_holds(example):
    """`prune: "collapsed"` is what the right pane is for. Read through the
    example's own `wire_bytes`, which is where it puts the number on screen."""
    held, sent = example.wire_bytes(example.bench)

    assert 0 < sent < held
    # A thousand nodes of ten files each is the shape that prunes worst of the
    # three the plan measured, and it still saves an order of magnitude.
    assert held / sent > 10


def test_a_branch_that_opens_stops_being_pruned(page: Page, port, example):
    """The view is rebuilt when a branch opens, so what crosses grows only by what
    was opened rather than by the whole tree."""
    server = serve_both(example, page, port)
    _, before = example.wire_bytes(example.bench)

    twisty(page, BENCH, 0).click()

    wait_until(lambda: example.wire_bytes(example.bench)[1] > before, timeout=15)
    held, after = example.wire_bytes(example.bench)
    assert after < held

    server.stop()
