"""What the treegrid example promises, asserted against the example itself.

Five columns, one editor kind per column, a roll-up that is the example's own
arithmetic rather than the table's, and a group row that refuses an edit because
its cells are computed. The module is reimported per test, so an edit made by one
cannot reach the next.
"""

import importlib

import pytest
from playwright.sync_api import Page, expect

from panelini.panels.tanstack.table import tree
from panelini.testing import wait_until
from tests.panels.tanstack.table.helpers import node_at, rows, serve

MODULE = "examples.panels.tanstack.table.tst_treegrid_columns"

# The order the example declares its columns in, which is also the order they
# render and the order Tab walks the editors.
TITLE, STATUS, INSTANCES, OWNER, MONITORED = range(5)


@pytest.fixture
def example():
    """A fresh import of the example, so one test's edits cannot reach the next."""
    return importlib.reload(importlib.import_module(MODULE))


def grid(page: Page):
    return page.locator("[role='treegrid']")


def editor(page: Page):
    return page.locator(".pnl-tst-edit")


def row_index(example, key: str) -> int:
    """Where a key renders.

    The example expands everything and sorts nothing to begin with, so the
    rendered order is the depth first walk of the tree.
    """
    keys = [node["key"] for node in tree.iter_nodes(example.table.source)]
    assert key in keys, f"{key} is not in the tree"
    return keys.index(key)


def cell(page: Page, index: int, column: int):
    return rows(page).nth(index).locator(".pnl-tst-cell").nth(column)


def field_of(example, key: str, field: str):
    return node_at(example.table.source, key).get(field)


def leaf_total(example, key: str) -> int:
    """Sum the services under a group row, which is what its cell should hold."""
    branch = node_at(example.table.source, key)
    return sum(int(node["instances"]) for node in tree.iter_nodes([branch]) if not node.get("children"))


def open_editor(page: Page, example, key: str, column: int):
    """Double click one cell open and hand back its editor."""
    cell(page, row_index(example, key), column).dblclick()
    expect(editor(page)).to_have_count(1, timeout=10000)
    return editor(page)


def test_the_five_columns_render_over_the_whole_tree(page: Page, port, example):
    """One column per editor kind plus the tree column, and `expand_all` means
    every node has a row whether or not the window is currently holding it."""
    server = serve(example.app, page, port)

    assert page.locator(".pnl-tst-hlabel").all_text_contents() == [
        "Service",
        "Status",
        "Instances",
        "Owner",
        "Monitored",
    ]
    nodes = sum(1 for _ in tree.iter_nodes(example.table.source))
    # The header is the grid's first row, so the count is one past the tree's.
    assert grid(page).get_attribute("aria-rowcount") == str(nodes + 1)

    server.stop()


def test_the_status_column_is_a_select(page: Page, port, example):
    """Choosing commits at once: a select has no half chosen state to hold."""
    server = serve(example.app, page, port)
    assert field_of(example, "eu-fra-web", "status") == "running"

    open_editor(page, example, "eu-fra-web", STATUS)
    page.locator(".pnl-tst-edit--select").select_option("stopped")

    wait_until(lambda: field_of(example, "eu-fra-web", "status") == "stopped", timeout=10)
    expect(editor(page)).to_have_count(0, timeout=10000)

    server.stop()


def test_the_instances_column_is_a_number_and_python_keeps_it_one(page: Page, port, example):
    """The column declares a `number` editor, so what lands in the tree is an int
    rather than the string that was typed."""
    server = serve(example.app, page, port)
    was = field_of(example, "eu-fra-api", "instances")

    open_editor(page, example, "eu-fra-api", INSTANCES).fill(str(was + 3))
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(example, "eu-fra-api", "instances") == was + 3, timeout=10)
    assert isinstance(field_of(example, "eu-fra-api", "instances"), int)

    server.stop()


def test_the_owner_column_is_a_text_box(page: Page, port, example):
    server = serve(example.app, page, port)

    open_editor(page, example, "eu-dub-cache", OWNER).fill("sre")
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(example, "eu-dub-cache", "owner") == "sre", timeout=10)

    server.stop()


def test_the_monitored_column_is_a_checkbox_that_writes_the_node(page: Page, port, example):
    """`lab` opts out of the type's own `monitored: True`, and ticking its box
    writes that one node. One service changing its mind cannot change the type
    every other service names."""
    server = serve(example.app, page, port)
    assert field_of(example, "eu-fra-lab", "monitored") is False

    open_editor(page, example, "eu-fra-lab", MONITORED)
    page.locator(".pnl-tst-edit--check").click()

    wait_until(lambda: field_of(example, "eu-fra-lab", "monitored") is True, timeout=10)
    assert example.TYPES["service"]["monitored"] is True

    server.stop()


def test_an_edit_rolls_up_into_every_group_above_it(page: Page, port, example):
    """A treegrid rolls nothing up by itself, so this is the example's arithmetic
    running after the edit landed."""
    server = serve(example.app, page, port)
    was = field_of(example, "eu-fra-api", "instances")
    site = field_of(example, "eu-fra", "instances")
    region = field_of(example, "eu", "instances")

    open_editor(page, example, "eu-fra-api", INSTANCES).fill(str(was + 3))
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(example, "eu-fra", "instances") == site + 3, timeout=10)
    assert field_of(example, "eu", "instances") == region + 3
    assert field_of(example, "eu-fra", "instances") == leaf_total(example, "eu-fra")
    # Blank rather than inherited: an owner is a fact about one service.
    assert field_of(example, "eu-fra", "owner") == ""

    server.stop()


def test_one_undo_reaches_the_edit_past_the_roll_up(page: Page, port, example):
    """The roll-up is written straight onto `source` rather than through a public
    mutator, so it records no step of its own and `Ctrl+Z` takes one press."""
    server = serve(example.app, page, port)
    was = field_of(example, "eu-fra-api", "instances")

    open_editor(page, example, "eu-fra-api", INSTANCES).fill(str(was + 3))
    page.keyboard.press("Enter")
    wait_until(lambda: field_of(example, "eu-fra-api", "instances") == was + 3, timeout=10)
    # The commit hands focus back to the row, which is what the next key acts on.
    wait_until(lambda: example.table.can_undo, timeout=10)

    page.keyboard.press("Control+z")

    wait_until(lambda: field_of(example, "eu-fra-api", "instances") == was, timeout=10)
    # And the tree it lands on is consistent, because the recorded state carried
    # the totals that went with it.
    assert field_of(example, "eu-fra", "instances") == leaf_total(example, "eu-fra")

    server.stop()


def test_a_group_row_refuses_an_edit_and_says_why(page: Page, port, example):
    """A refusal reopens the editor holding the rejected value and marked invalid,
    so it is corrected rather than retyped.

    `Instances` rather than `Owner` because a group row's owner is blank, and a
    cell with no value collapses to nothing a pointer can reach.
    """
    server = serve(example.app, page, port)
    was = field_of(example, "eu-fra", "instances")

    open_editor(page, example, "eu-fra", INSTANCES).fill(str(was + 1))
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)
    assert editor(page).input_value() == str(was + 1)
    assert field_of(example, "eu-fra", "instances") == was
    # The example reports the refusal in its own log rather than swallowing it.
    wait_until(lambda: any("refused an edit" in line for line in example.messages), timeout=10)

    server.stop()
