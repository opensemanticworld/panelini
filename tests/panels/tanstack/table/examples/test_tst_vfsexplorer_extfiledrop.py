"""What the VFS explorer example promises: two panes, one group, and files from
the desktop.

The transfer half and the external drop half both end in Python rewriting a tree,
so what is asserted is the tree and the example's own log rather than anything the
browser holds. The drag from the desktop is synthesised, because Playwright cannot
make one, but every event it dispatches is one a browser sends.
"""

import importlib
import re

import pytest
from playwright.sync_api import Page, expect

from panelini.panels.tanstack.table import tree
from panelini.testing import wait_until
from tests.panels.tanstack.table.helpers import a_file, drag_across, drop_files_onto, pane_rows, panes, start

MODULE = "examples.panels.tanstack.table.tst_vfsexplorer_extfiledrop"

# Documents on the left and Staging on the right, in the order the example lays
# them out. The two ask for different halves of `drop_files`.
DOCS, STAGING = 0, 1


@pytest.fixture
def example():
    """A fresh import per test: both trees are module level and every test moves one."""
    return importlib.reload(importlib.import_module(MODULE))


def serve_both(example, page: Page, port: int):
    """Serve the example and wait for both panes to render."""
    server = start(example.app, page, port)
    expect(panes(page)).to_have_count(2, timeout=15000)
    pane_rows(page, STAGING).first.wait_for(state="visible", timeout=15000)
    pane_rows(page, DOCS).first.wait_for(state="visible", timeout=15000)
    return server


def row_titled(page: Page, pane: int, title: str):
    """One row of one pane, by the whole of its title.

    Anchored, because ``Inbox`` is a substring of ``inbox.bak`` and Playwright
    matches a plain string case insensitively.
    """
    value = page.locator(".pnl-tst-cell--tree .pnl-tst-value", has_text=re.compile(rf"^{re.escape(title)}$"))
    return pane_rows(page, pane).filter(has=value).first


def titled(nodes, title: str):
    """The node with a title, or None. A minted key is Python's to choose, so a
    dropped file is found by the name it arrived under."""
    return next((node for node in tree.iter_nodes(nodes) if node.get("title") == title), None)


def logged(example, fragment: str) -> bool:
    return any(fragment in line for line in example.messages)


def test_both_panes_serve_and_ask_for_different_halves_of_one_drop(page: Page, port, example):
    """Two tables naming one group, and the two settings of `drop_files` side by side."""
    server = serve_both(example, page, port)

    assert example.table.options["transfer_group"] == example.staging.options["transfer_group"]
    assert example.table.options["drop_files"] == "content"
    assert example.staging.options["drop_files"] == "meta"
    assert pane_rows(page, DOCS).count() > 0
    assert pane_rows(page, STAGING).count() > 0

    server.stop()


def test_a_drag_across_the_panes_moves_the_node(page: Page, port, example):
    """One gesture, two trees, and the nodes never travel through the browser: the
    receiving table reads them out of the other one in Python."""
    server = serve_both(example, page, port)

    drag_across(page, row_titled(page, DOCS, "invoice.pdf"), row_titled(page, STAGING, "Scratch"))

    wait_until(lambda: tree.find_node(example.staging.source, "invoice") is not None, timeout=10)
    assert tree.find_node(example.table.source, "invoice") is None
    # Reported by the pane the node arrived in, which is the one that placed it.
    wait_until(lambda: logged(example, "took `invoice` from the other pane"), timeout=10)

    server.stop()


def test_a_file_dropped_from_the_desktop_becomes_a_node(page: Page, port, example):
    """One node per accepted file, titled with the file name and carrying the size
    and the MIME type the browser reported."""
    server = serve_both(example, page, port)

    drop_files_onto(page, row_titled(page, DOCS, "Inbox"), [a_file("plan.md", "text/markdown", body="hello")])

    wait_until(lambda: titled(example.table.source, "plan.md") is not None, timeout=10)
    node = titled(example.table.source, "plan.md")
    assert node["size"] == len("hello")
    assert node["mime"] == "text/markdown"
    # From `drop_node`, exactly as a new node takes its template from `new_node`.
    assert node["kind"] == "file"
    assert node["allow_children"] is False
    # The bytes reached the callback and stopped there. A tree that carried them
    # would put them back on the wire on every change after this one.
    assert "content" not in node
    wait_until(lambda: logged(example, "bytes read"), timeout=10)

    server.stop()


def test_a_file_over_the_limit_is_turned_away_by_size(page: Page, port, example):
    """`drop_max_bytes` is Python's decision, and the browser reads it only to skip
    loading bytes that were going to be refused anyway."""
    server = serve_both(example, page, port)
    over = example.table.options["drop_max_bytes"] + 1

    drop_files_onto(page, row_titled(page, DOCS, "Inbox"), [a_file("big.txt", body="x" * over)])

    wait_until(lambda: logged(example, "`big.txt` (size)"), timeout=15)
    assert titled(example.table.source, "big.txt") is None

    server.stop()


def test_the_two_panes_take_different_files_and_read_different_amounts(page: Page, port, example):
    """A `.zip` is refused by type on the left, where `drop_accept` names five
    things, and taken on the right, where nothing is named and nothing is read."""
    server = serve_both(example, page, port)
    archive = a_file("report.zip", "application/zip", body="zipped")

    drop_files_onto(page, row_titled(page, DOCS, "Inbox"), [archive])

    wait_until(lambda: logged(example, "`report.zip` (type)"), timeout=10)
    assert titled(example.table.source, "report.zip") is None

    drop_files_onto(page, row_titled(page, STAGING, "Scratch"), [archive])

    # `meta` sends no bytes at all, which is the whole difference between the two.
    # Waited for rather than read once the node is there: the tree is written by the
    # intent and the log by the event callback after it, which is a poll apart.
    wait_until(lambda: titled(example.staging.source, "report.zip") is not None, timeout=10)
    wait_until(lambda: logged(example, "metadata only"), timeout=10)

    server.stop()


def test_the_read_only_branch_refuses_a_file_drop(page: Page, port, example):
    """The same `action_callback` that refuses an add, a rename and a delete, and
    it reads the anchor because a dropped file's keys name nothing yet."""
    server = serve_both(example, page, port)

    drop_files_onto(page, row_titled(page, DOCS, "Archive (read only)"), [a_file("plan.md", "text/markdown")])

    wait_until(lambda: logged(example, "refused `plan.md`"), timeout=10)
    assert titled(example.table.source, "plan.md") is None

    server.stop()


def test_one_drop_of_three_files_is_one_undo_step(page: Page, port, example):
    """The batch is minted after a single `action_callback`, so it is one change
    to the tree and `Ctrl+Z` takes the whole drop back."""
    server = serve_both(example, page, port)
    names = ["one.txt", "two.txt", "three.txt"]

    drop_files_onto(page, row_titled(page, DOCS, "Inbox"), [a_file(name) for name in names])

    wait_until(lambda: all(titled(example.table.source, name) for name in names), timeout=10)

    example.table.undo()

    assert not any(titled(example.table.source, name) for name in names)
    assert example.table.can_undo is False

    server.stop()
