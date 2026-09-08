"""What the filesystem browser example promises, asserted as invariants.

The example walks this repository, so nothing here names a file, counts a
directory or assumes a depth: what is pinned down is that one node becomes a tree
one directory at a time, that a preload is a single push, and that only the
folders somebody opened cross the wire. The exact counts live in the big tree
example, which mints its tree rather than reading it.
"""

import importlib
import json

import pytest
from playwright.sync_api import Page

from panelini.testing import wait_until
from tests.panels.tanstack.table.helpers import node_at, rows, serve

MODULE = "examples.panels.tanstack.table.tst_fsbrowser"


@pytest.fixture
def example():
    """A fresh import per test: the tree is module level and every test mutates it."""
    return importlib.reload(importlib.import_module(MODULE))


def twisty(page: Page, row_index: int):
    return rows(page).nth(row_index).locator(".pnl-tst-twisty")


def children_of(example, key: str) -> list:
    return node_at(example.browser.source, key).get("children") or []


def weigh(nodes) -> int:
    """The bytes a tree takes on the wire, which is how `source` crosses."""
    return len(json.dumps(nodes, separators=(",", ":")))


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
    server = serve(example.app, page, port)

    twisty(page, 0).click()

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
    server = serve(example.app, page, port)
    twisty(page, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    first = children_of(example, example.ROOT_KEY)[0]
    assert first["type"] == "folder", "the repository root holds no directory"

    twisty(page, 1).click()

    wait_until(lambda: "children" in node_at(example.browser.source, first["key"]), timeout=15)
    # A branch that has been read is a branch, not a promise of one.
    assert not node_at(example.browser.source, first["key"]).get("lazy")
    assert len(example.messages) == 2

    server.stop()


def test_a_preload_is_one_push_however_many_folders_it_reads(page: Page, port, example):
    """Each `set_children` is its own write, so a batch is the difference between
    one push of the tree and one push per folder."""
    server = serve(example.app, page, port)
    twisty(page, 0).click()
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
    take back and the read only tree stays read only."""
    server = serve(example.app, page, port)

    twisty(page, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    assert example.browser.can_undo is False

    server.stop()


def test_only_the_folders_that_were_opened_cross_the_wire(page: Page, port, example):
    """A preload reads two levels into `source`. Only the level that is open is in
    the view, and every folder below it crosses as a twisty and nothing more."""
    server = serve(example.app, page, port)
    twisty(page, 0).click()
    wait_until(lambda: bool(children_of(example, example.ROOT_KEY)), timeout=15)

    page.get_by_role("button", name="Preload 2 levels").click()
    wait_until(lambda: any("preloaded" in line for line in example.messages), timeout=30)

    held = weigh(example.browser.source)
    sent = weigh(example.browser._view)
    assert 0 < sent < held

    # The root is open, so its entries crossed. Nothing under them did.
    view_root = node_at(example.browser._view, example.ROOT_KEY)
    for child in view_root["children"]:
        assert "children" not in child
        if child["type"] == "folder":
            # A pruned branch is a lazy one, which is why the browser can ask for
            # it and why the panel answers out of the tree it already holds.
            assert child["lazy"] is True

    server.stop()
