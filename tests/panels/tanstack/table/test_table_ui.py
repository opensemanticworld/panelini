"""UI tests for TanstackTable - require a headless browser via Playwright.

Importing from playwright auto-marks every test in this module with the ``ui``
marker (see tests/conftest.py), so these are excluded from ``make test`` and only
run via ``make test-ui`` or ``make test-full``.

The accessibility assertions are the reason this panel exists: the wunderbaum
bundle carries no ``aria-*`` at all, so the roles, levels and expanded state
below are the contract that must not regress.
"""

import copy
import socket

import panel as pn
import pytest
from playwright.sync_api import Page, expect

from panelini.panels.tanstack.table import TanstackTable, tree
from panelini.testing import wait_until

SOURCE = [
    {
        "key": "a",
        "title": "Folder A",
        "children": [
            {"key": "a1", "title": "File A1", "size": "1 kB"},
            {"key": "a2", "title": "File A2", "size": "2 kB"},
        ],
    },
    {
        "key": "b",
        "title": "Folder B",
        "children": [{"key": "b1", "title": "File B1", "size": "3 kB"}],
    },
]

COLUMNS = [
    {"id": "title", "header": "Name"},
    {"id": "size", "header": "Size", "width": 90},
]


def accepts(port: int) -> bool:
    """True once something is listening on *port*."""
    with socket.socket() as probe:
        probe.settimeout(0.2)
        return probe.connect_ex(("localhost", port)) == 0


def start(component, page: Page, port: int):
    """Serve *component* and open it.

    ``pn.serve(threaded=True)`` returns before the tornado loop is accepting, so
    the port is polled first; navigating straight away is a connection refused
    race.
    """
    server = pn.serve(component, port=port, threaded=True, show=False)
    wait_until(lambda: accepts(port), timeout=15)
    page.goto(f"http://localhost:{port}")
    return server


def serve(table: TanstackTable, page: Page, port: int):
    """Serve *table*, open it and wait for the first rendered row."""
    server = start(table, page, port)
    page.locator(".pnl-tst-row").first.wait_for(state="visible", timeout=15000)
    return server


def rows(page: Page):
    return page.locator(".pnl-tst-row")


def row_titles(page: Page) -> list[str]:
    return page.locator(".pnl-tst-cell--tree .pnl-tst-value").all_text_contents()


def focused_title(page: Page) -> str:
    """Title of the row that currently has focus.

    Panel renders the component into a shadow root, so ``document.activeElement``
    stops at the host and has to be followed down through the shadow boundaries.
    """
    return page.evaluate(
        """() => {
            let element = document.activeElement
            while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement
            return element?.querySelector('.pnl-tst-value')?.textContent.trim() ?? null
        }"""
    )


def shape(nodes) -> str:
    """Render a tree compactly, for example ``a(a1,a2),b(b1)``."""
    return ",".join(node["key"] + (f"({shape(node['children'])})" if node.get("children") else "") for node in nodes)


def node_at(nodes, key):
    """``find_node`` plus a presence assertion, so callers can subscript freely."""
    found = tree.find_node(nodes, key)
    assert found is not None, f"{key} is not in the tree"
    return found


def drag_row(
    page: Page,
    source_index: int,
    target_index: int,
    y_frac: float = 0.5,
    expect_session: bool = True,
    expect_blocked: bool = False,
    expect_dragging: int = 1,
) -> None:
    """Drag one row onto another, releasing at *y_frac* of the target's height.

    The vertical fraction picks the hitbox instruction: the middle band of a row
    is ``make-child``, the outer bands reorder. pdnd batches its ``onDrag``
    bookkeeping into an animation frame, so the pointer has to settle on the
    target before the button comes back up or the drop reads a stale hitbox.

    ``expect_session`` asserts that a drag actually started. Without it a test
    that expects no move event passes just as happily when drag and drop is
    broken outright. ``expect_blocked`` asserts the no-drop affordance while the
    pointer is still held down, since the class only exists during the drag.
    ``expect_dragging`` is how many rows should be marked as travelling, which is
    the whole selection when the grabbed row is part of it.
    """
    src = rows(page).nth(source_index).bounding_box()
    dst = rows(page).nth(target_index).bounding_box()
    assert src and dst

    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2)
    page.mouse.down()
    # A short first move starts the drag session before the long travel.
    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2 + 6, steps=2)
    if expect_session:
        expect(page.locator(".pnl-tst-row--dragging")).to_have_count(expect_dragging, timeout=2000)
    page.mouse.move(dst["x"] + dst["width"] / 2, dst["y"] + dst["height"] * y_frac, steps=12)
    page.wait_for_timeout(120)
    if expect_blocked:
        expect(page.locator(".pnl-tst-row--blocked")).to_have_count(1, timeout=2000)
    page.mouse.up()


def test_treegrid_roles_and_levels(page: Page, port):
    """Container, rows and cells carry the full treegrid role set."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"aria_label": "Files", "expand_all": True},
    )
    server = serve(table, page, port)

    grid = page.locator("[role='treegrid']")
    assert grid.count() == 1
    assert grid.get_attribute("aria-label") == "Files"
    assert grid.get_attribute("aria-colcount") == "2"
    # Two roots, three children, plus the header row.
    assert grid.get_attribute("aria-rowcount") == "6"

    assert page.locator("[role='rowgroup']").count() == 2
    assert page.locator("[role='columnheader']").all_text_contents() == ["Name", "Size"]

    assert row_titles(page) == ["Folder A", "File A1", "File A2", "Folder B", "File B1"]
    assert rows(page).nth(0).get_attribute("aria-level") == "1"
    assert rows(page).nth(1).get_attribute("aria-level") == "2"
    assert rows(page).nth(1).get_attribute("aria-posinset") == "1"
    assert rows(page).nth(1).get_attribute("aria-setsize") == "2"
    assert rows(page).nth(1).get_attribute("aria-rowindex") == "3"

    cells = rows(page).nth(1).locator("[role='gridcell']")
    assert cells.count() == 2
    assert [cells.nth(i).get_attribute("aria-colindex") for i in range(2)] == ["1", "2"]

    server.stop()


def test_expand_and_collapse_updates_aria_expanded(page: Page, port):
    """Only expandable rows carry aria-expanded, and the twisty flips it."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"aria_label": "Files"})
    server = serve(table, page, port)

    assert row_titles(page) == ["Folder A", "Folder B"]
    assert rows(page).nth(0).get_attribute("aria-expanded") == "false"

    rows(page).nth(0).locator(".pnl-tst-twisty").click()
    page.locator(".pnl-tst-row").nth(1).wait_for(state="visible")

    assert row_titles(page) == ["Folder A", "File A1", "File A2", "Folder B"]
    assert rows(page).nth(0).get_attribute("aria-expanded") == "true"
    # Leaves must not claim an expanded state at all.
    assert rows(page).nth(1).get_attribute("aria-expanded") is None

    wait_until(lambda: table.expanded_keys == ["a"], timeout=10)

    rows(page).nth(0).locator(".pnl-tst-twisty").click()
    expect(rows(page)).to_have_count(2)
    assert rows(page).nth(0).get_attribute("aria-expanded") == "false"

    server.stop()


def test_python_expanded_keys_push_down(page: Page, port):
    """expanded_keys is bidirectional, so a Python write must reach the DOM."""
    table = TanstackTable(source=copy.deepcopy(SOURCE))
    server = serve(table, page, port)

    assert rows(page).count() == 2
    table.expand_all()
    expect(rows(page)).to_have_count(5)

    assert row_titles(page) == ["Folder A", "File A1", "File A2", "Folder B", "File B1"]

    server.stop()


def test_expand_all_option_reports_the_expanded_keys(page: Page, port):
    """The `expand_all` option and `expand_all()` must agree on what they report.

    TanStack stores "everything is expanded" as the sentinel `true` rather than a
    record, so this is the path where an empty key list would claim the opposite
    of what is on screen.
    """
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True})
    server = serve(table, page, port)

    expect(rows(page)).to_have_count(5)
    wait_until(lambda: table.expanded_keys == ["a", "b"], timeout=10)

    server.stop()


def test_roving_tabindex_and_keyboard_navigation(page: Page, port):
    """One tab stop for the whole grid, arrows move and open rows."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"aria_label": "Files"})
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-row[tabindex='0']").count() == 1

    rows(page).nth(0).focus()
    # ArrowRight on a closed branch opens it without moving focus.
    page.keyboard.press("ArrowRight")
    expect(rows(page)).to_have_count(4)
    assert rows(page).nth(0).get_attribute("aria-expanded") == "true"

    page.keyboard.press("ArrowDown")
    assert focused_title(page) == "File A1"

    # ArrowLeft on a leaf steps out to the parent.
    page.keyboard.press("ArrowLeft")
    assert focused_title(page) == "Folder A"

    page.keyboard.press("End")
    assert focused_title(page) == "Folder B"
    page.keyboard.press("Home")
    assert focused_title(page) == "Folder A"

    # ArrowLeft on an open branch collapses it.
    page.keyboard.press("ArrowLeft")
    expect(rows(page)).to_have_count(2)
    assert rows(page).nth(0).get_attribute("aria-expanded") == "false"

    assert page.locator(".pnl-tst-row[tabindex='0']").count() == 1

    server.stop()


def test_enter_emits_an_activate_event(page: Page, port):
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    rows(page).nth(1).focus()
    page.keyboard.press("Enter")
    wait_until(lambda: bool(events), timeout=10)

    assert events[0] == ("activate", {"key": "b"})

    server.stop()


def indeterminate(boxes, index: int) -> bool:
    """Indeterminate is a DOM property, so it cannot be read as an attribute."""
    return boxes.nth(index).evaluate("element => element.indeterminate")


def test_hierarchy_checkbox_partial_selection_is_mixed(page: Page, port):
    """Checking one child of two leaves the parent mixed, not checked."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    boxes = page.locator(".pnl-tst-check")
    assert boxes.count() == 5
    assert indeterminate(boxes, 0) is False

    boxes.nth(1).click()  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    assert boxes.nth(1).is_checked()
    assert boxes.nth(0).is_checked() is False
    assert indeterminate(boxes, 0) is True
    assert rows(page).nth(0).get_attribute("aria-selected") == "false"
    assert rows(page).nth(1).get_attribute("aria-selected") == "true"
    assert rows(page).nth(2).get_attribute("aria-selected") == "false"

    server.stop()


def test_hierarchy_checking_every_child_shows_the_parent_checked(page: Page, port):
    """The parent must not go from mixed back to empty as the last child is checked.

    TanStack cascades downward only, so the parent box has to summarise the
    subtree itself. It is a rendering rule and nothing more: the parent reads as
    checked without joining ``selected_keys``, which is what keeps the folder out
    of a drag of its own files.
    """
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    boxes = page.locator(".pnl-tst-check")

    boxes.nth(1).click()  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    assert indeterminate(boxes, 0) is True

    boxes.nth(2).click()  # File A2 completes the subtree
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    assert boxes.nth(0).is_checked() is True
    assert indeterminate(boxes, 0) is False
    # Summarised, not selected: the row is not highlighted and not reported.
    assert rows(page).nth(0).get_attribute("aria-selected") == "false"
    assert boxes.nth(3).is_checked() is False

    server.stop()


def test_hierarchy_unchecking_a_summarised_parent_clears_the_subtree(page: Page, port):
    """A box that reads checked must uncheck what made it read that way."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    boxes = page.locator(".pnl-tst-check")
    boxes.nth(1).click()
    boxes.nth(2).click()
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)
    assert boxes.nth(0).is_checked() is True

    boxes.nth(0).click()  # Folder A, checked only because its children are
    wait_until(lambda: table.selected_keys == [], timeout=10)

    assert [boxes.nth(i).is_checked() for i in range(3)] == [False, False, False]

    server.stop()


def test_hierarchy_selection_from_python_is_shown_but_not_rewritten(page: Page, port):
    """A key set that completes a subtree renders the parent checked, unchanged."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    table.selected_keys = ["a1", "a2"]

    boxes = page.locator(".pnl-tst-check")
    expect(boxes.nth(0)).to_be_checked(timeout=10000)
    assert indeterminate(boxes, 0) is False
    # The browser never writes a key Python did not ask for.
    assert table.selected_keys == ["a1", "a2"]

    server.stop()


def test_hierarchy_checkbox_cascades_and_prunes(page: Page, port):
    """Checking a parent selects its subtree; unchecking a child prunes it back."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    boxes = page.locator(".pnl-tst-check")

    boxes.nth(0).click()  # Folder A
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2"], timeout=10)

    assert [boxes.nth(i).is_checked() for i in range(3)] == [True, True, True]
    assert indeterminate(boxes, 0) is False
    # The sibling branch is untouched by the cascade.
    assert boxes.nth(3).is_checked() is False

    boxes.nth(1).click()  # uncheck File A1
    wait_until(lambda: table.selected_keys == ["a2"], timeout=10)

    assert boxes.nth(0).is_checked() is False
    assert indeterminate(boxes, 0) is True
    assert rows(page).nth(0).get_attribute("aria-selected") == "false"

    server.stop()


def test_clicking_a_folder_row_does_not_select_its_children(page: Page, port):
    """Pointer selection never cascades, not even in hierarchy mode.

    Clicking a folder means the folder. Only its checkbox means everything in it.
    """
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 0)  # Folder A
    wait_until(lambda: table.selected_keys == ["a"], timeout=10)

    boxes = page.locator(".pnl-tst-check")
    assert [boxes.nth(i).is_checked() for i in range(3)] == [True, False, False]
    assert rows(page).nth(1).get_attribute("aria-selected") == "false"

    server.stop()


def test_clicking_every_child_leaves_the_folder_out(page: Page, port):
    """The gesture that empties a folder must not end up selecting the folder."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # plus File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    assert rows(page).nth(0).get_attribute("aria-selected") == "false"

    server.stop()


def test_multi_select_mode_does_not_cascade(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "expand_all": True},
    )
    server = serve(table, page, port)

    boxes = page.locator(".pnl-tst-check")
    boxes.nth(0).click()  # Folder A
    wait_until(lambda: table.selected_keys == ["a"], timeout=10)

    assert boxes.nth(1).is_checked() is False
    assert indeterminate(boxes, 0) is False

    server.stop()


def test_hiding_the_checkboxes_keeps_selection_working(page: Page, port):
    """The column is an affordance for the selection, not the selection itself."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "show_checkboxes": False, "expand_all": True},
    )
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-check").count() == 0

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 2, "Shift")  # range through File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    click_row(page, 4, "Control")  # plus File B1
    wait_until(lambda: table.selected_keys == ["a1", "a2", "b1"], timeout=10)

    # The rows still report their state, so a screen reader is no worse off.
    assert rows(page).nth(4).get_attribute("aria-selected") == "true"

    server.stop()


def test_hidden_checkboxes_still_drag_the_whole_selection(page: Page, port):
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={
            "select_mode": "multi",
            "show_checkboxes": False,
            "enable_dnd": True,
            "expand_all": True,
        },
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # plus File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)
    events.clear()

    drag_row(page, 1, 3, expect_dragging=2)  # onto Folder B
    wait_until(lambda: any(name == "move" for name, _ in events), timeout=10)

    assert shape(table.source) == "a,b(b1,a1,a2)"

    server.stop()


def test_select_mode_none_renders_no_checkboxes(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True})
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-check").count() == 0
    assert rows(page).nth(0).get_attribute("aria-selected") is None

    server.stop()


def expect_titles(page: Page, titles: list[str]) -> None:
    """Wait for the tree column to show exactly these rows, in order.

    Waiting on the row count instead would pass the moment the count happens to
    match, which for a filter is often before the new one has crossed the
    websocket at all.
    """
    expect(page.locator(".pnl-tst-cell--tree .pnl-tst-value")).to_have_text(titles, timeout=10000)


def test_filter_keeps_the_matches_and_the_path_to_them(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True},
    )
    server = serve(table, page, port)

    table.filter_text = "B1"
    # Folder B does not match, but it is the path to the row that does.
    expect_titles(page, ["Folder B", "File B1"])

    table.filter_text = ""
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])

    server.stop()


def test_filter_reveals_a_match_inside_a_collapsed_branch(page: Page, port):
    """A hit hidden by a closed twisty would make the search look broken."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS)
    server = serve(table, page, port)

    assert row_titles(page) == ["Folder A", "Folder B"]

    table.filter_text = "A2"
    expect_titles(page, ["Folder A", "File A2"])
    assert rows(page).nth(0).get_attribute("aria-expanded") == "true"

    server.stop()


def test_filter_narrows_the_reported_sibling_counts(page: Page, port):
    """aria-setsize must describe the rows on screen, not the ones filtered out."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True},
    )
    server = serve(table, page, port)

    assert rows(page).nth(1).get_attribute("aria-setsize") == "2"  # File A1 of two

    table.filter_text = "A2"
    expect_titles(page, ["Folder A", "File A2"])
    assert rows(page).nth(0).get_attribute("aria-setsize") == "1"
    assert rows(page).nth(1).get_attribute("aria-setsize") == "1"
    assert rows(page).nth(1).get_attribute("aria-posinset") == "1"

    server.stop()


def test_filter_matches_any_column_not_just_the_title(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True},
    )
    server = serve(table, page, port)

    table.filter_text = "3 kB"
    expect_titles(page, ["Folder B", "File B1"])

    server.stop()


def test_filter_without_a_match_reports_it(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True},
    )
    server = serve(table, page, port)

    table.filter_text = "nothing here"
    page.locator(".pnl-tst-empty").wait_for(state="visible", timeout=10000)
    assert page.locator(".pnl-tst-empty").inner_text() == "No matches"

    server.stop()


def test_filtering_leaves_the_source_alone(page: Page, port):
    """A drop while filtering is still a move on the whole tree."""
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    table.filter_text = "A1"
    expect_titles(page, ["Folder A", "File A1"])

    assert shape(table.source) == "a(a1,a2),b(b1)"

    table.filter_text = ""
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])

    server.stop()


def click_row(page: Page, index: int, *modifiers) -> None:
    """Click a row on its title, well clear of the checkbox and the twisty."""
    page.locator(".pnl-tst-cell--tree .pnl-tst-value").nth(index).click(modifiers=list(modifiers))


def test_plain_click_selects_one_row_and_marks_it_active(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(1)

    # A second plain click replaces the selection rather than growing it.
    click_row(page, 4)  # File B1
    wait_until(lambda: table.selected_keys == ["b1"], timeout=10)

    server.stop()


def test_ctrl_click_toggles_rows_without_clearing(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 4, "Control")  # add File B1
    wait_until(lambda: table.selected_keys == ["a1", "b1"], timeout=10)

    click_row(page, 4, "Control")  # and take it away again
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    server.stop()


def test_shift_click_extends_a_range_from_the_anchor(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # anchor on File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 3, "Shift")  # through Folder B
    wait_until(lambda: table.selected_keys == ["a1", "a2", "b"], timeout=10)

    # The anchor stays put, so shrinking the range back is one more Shift click.
    click_row(page, 2, "Shift")
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    server.stop()


def test_shift_arrow_extends_the_selection(page: Page, port):
    """The keyboard reaches the same range gesture the mouse does."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    page.keyboard.press("Shift+ArrowDown")
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)
    assert focused_title(page) == "File A2"

    page.keyboard.press("Shift+ArrowUp")
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    server.stop()


def test_single_select_mode_ignores_the_modifiers(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "single", "expand_all": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 4, "Control")
    wait_until(lambda: table.selected_keys == ["b1"], timeout=10)

    server.stop()


def test_dragging_a_selected_row_moves_the_whole_selection(page: Page, port):
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # plus File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)
    events.clear()

    drag_row(page, 1, 3, expect_dragging=2)  # onto Folder B
    wait_until(lambda: any(name == "move" for name, _ in events), timeout=10)

    params = next(params for name, params in events if name == "move")
    assert params["keys"] == ["a1", "a2"]
    assert params["applied_keys"] == ["a1", "a2"]
    # Order survives the trip: the rows land the way they were shown.
    assert shape(table.source) == "a,b(b1,a1,a2)"

    server.stop()


def test_dragging_children_out_does_not_carry_the_checked_parent(page: Page, port):
    """Ticking a folder selects it too, but dragging a file out moves files.

    Without dropping ancestors from the batch the folder would win the prune on
    the Python side, so the gesture would move the folder instead of emptying it.
    """
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    page.locator(".pnl-tst-check").nth(0).click()  # Folder A cascades
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2"], timeout=10)
    events.clear()

    drag_row(page, 1, 3, expect_dragging=2)  # File A1 onto Folder B
    wait_until(lambda: any(name == "move" for name, _ in events), timeout=10)

    params = next(params for name, params in events if name == "move")
    assert params["keys"] == ["a1", "a2"]
    assert shape(table.source) == "a,b(b1,a1,a2)"

    server.stop()


def test_dragging_the_parent_still_moves_the_branch(page: Page, port):
    """Grabbing the folder itself moves the branch, children and all."""
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    page.locator(".pnl-tst-check").nth(0).click()  # Folder A cascades
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2"], timeout=10)
    events.clear()

    drag_row(page, 0, 3, expect_dragging=3)  # Folder A onto Folder B
    wait_until(lambda: any(name == "move" for name, _ in events), timeout=10)

    params = next(params for name, params in events if name == "move")
    assert params["keys"] == ["a", "a1", "a2"]
    # Python prunes the children that travel inside a.
    assert params["applied_keys"] == ["a"]
    assert shape(table.source) == "b(b1,a(a1,a2))"

    server.stop()


def test_dragging_an_unselected_row_leaves_the_selection_alone(page: Page, port):
    """Grabbing outside the selection moves one row, rather than discarding it."""
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "multi", "enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    events.clear()

    drag_row(page, 4, 0)  # File B1 onto Folder A
    wait_until(lambda: any(name == "move" for name, _ in events), timeout=10)

    params = next(params for name, params in events if name == "move")
    assert params["keys"] == ["b1"]
    assert shape(table.source) == "a(a1,a2,b1),b"
    assert table.selected_keys == ["a1"]

    server.stop()


def test_accessibility_tree_exposes_the_mixed_checkbox(page: Page, port):
    """The computed accessibility tree, not just the markup, must say "mixed".

    Chromium derives ``aria-checked="mixed"`` from the ``indeterminate`` DOM
    property, which is set as a property and therefore invisible to an
    attribute-only check.
    """
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"select_mode": "hierarchy", "expand_all": True},
    )
    server = serve(table, page, port)

    page.locator(".pnl-tst-check").nth(1).click()
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    cdp = page.context.new_cdp_session(page)
    cdp.send("Accessibility.enable")
    nodes = cdp.send("Accessibility.getFullAXTree")["nodes"]

    def role_of(node):
        return (node.get("role") or {}).get("value")

    assert any(role_of(node) == "treegrid" for node in nodes)

    checkboxes = [node for node in nodes if role_of(node) == "checkbox"]
    assert len(checkboxes) == 5
    checked = [
        next((prop["value"]["value"] for prop in node.get("properties", []) if prop["name"] == "checked"), None)
        for node in checkboxes
    ]
    assert checked[0] == "mixed"
    assert checked[1] == "true"
    assert checked[2] == "false"

    server.stop()


@pytest.mark.parametrize(
    ("target_index", "y_frac", "expected"),
    [
        (1, 0.5, "a(a1(b1),a2),b"),  # make-child on File A1
        (1, 0.08, "a(b1,a1,a2),b"),  # reorder-above File A1
        (2, 0.92, "a(a1,a2,b1),b"),  # reorder-below File A2
    ],
)
def test_drag_reparent_round_trip(page: Page, port, target_index, y_frac, expected):
    """A drop emits intent only; Python rewrites source and pushes it back."""
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    assert row_titles(page) == ["Folder A", "File A1", "File A2", "Folder B", "File B1"]
    drag_row(page, 4, target_index, y_frac)  # File B1 onto a row under Folder A
    wait_until(lambda: bool(events), timeout=10)

    name, params = events[0]
    assert name == "move"
    assert params["key"] == "b1"
    assert params["applied"] is True
    assert shape(table.source) == expected

    # The rewritten source is pushed back down and expansion survives it: every
    # row stays visible, and the key list follows the new shape rather than the
    # one that was expanded before the drop.
    expect(rows(page)).to_have_count(5)
    assert "File B1" in row_titles(page)
    wait_until(lambda: table.expanded_keys == tree.expandable_keys(table.source), timeout=10)

    server.stop()


def test_drop_into_own_subtree_is_blocked(page: Page, port):
    """No intent is emitted at all, so Python never sees an impossible move."""
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    drag_row(page, 0, 1, expect_blocked=True)  # Folder A onto its own child
    page.wait_for_timeout(500)

    assert events == []
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


def test_dnd_disabled_by_default(page: Page, port):
    events: list = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-row--draggable").count() == 0
    drag_row(page, 4, 1, expect_session=False)
    page.wait_for_timeout(500)

    assert [name for name, _ in events] == []
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


def test_empty_source_renders_a_placeholder(page: Page, port):
    table = TanstackTable(source=[])
    server = start(table, page, port)

    page.locator(".pnl-tst-empty").wait_for(state="visible", timeout=15000)
    assert page.locator("[role='treegrid']").count() == 0

    server.stop()


# Toolbar. It is opt in, so the first thing to pin down is that a table which says
# nothing about it gains neither a button nor a shortcut.


def toolbar_buttons(page: Page):
    return page.locator(".pnl-tst-tbtn")


def button(page: Page, label: str):
    return page.locator(f".pnl-tst-tbtn[aria-label='{label}']")


def focused_label(page: Page) -> str | None:
    """aria-label of the element that currently has focus, through the shadow root."""
    return page.evaluate(
        """() => {
            let element = document.activeElement
            while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement
            return element?.getAttribute('aria-label') ?? null
        }"""
    )


def test_no_toolbar_and_no_shortcuts_by_default(page: Page, port):
    """Absent `toolbar` means no buttons and no key bindings, not hidden buttons."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi"},
    )
    server = serve(table, page, port)

    assert page.locator("[role='toolbar']").count() == 0
    assert toolbar_buttons(page).count() == 0

    rows(page).nth(0).click()
    page.keyboard.press("Control+a")
    page.wait_for_timeout(300)
    assert table.selected_keys == ["a"]

    server.stop()


def test_toolbar_renders_the_default_actions(page: Page, port):
    """Roles, names and shortcut hints are the toolbar's whole accessible contract."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={
            "expand_all": True,
            "select_mode": "multi",
            "toolbar": True,
            "toolbar_label": "Document actions",
        },
    )
    server = serve(table, page, port)

    bar = page.locator("[role='toolbar']")
    assert bar.count() == 1
    assert bar.get_attribute("aria-label") == "Document actions"
    assert bar.get_attribute("aria-orientation") == "horizontal"

    labels = [toolbar_buttons(page).nth(i).get_attribute("aria-label") for i in range(12)]
    assert labels == [
        "New folder",
        "New file",
        "Rename",
        "Delete",
        "Move up",
        "Move down",
        "Outdent",
        "Indent",
        "Expand all",
        "Collapse all",
        "Select all",
        "Clear selection",
    ]
    assert button(page, "Select all").get_attribute("aria-keyshortcuts") == "Control+A"
    assert button(page, "Clear selection").get_attribute("aria-keyshortcuts") == "Escape"
    assert button(page, "New folder").get_attribute("aria-keyshortcuts") == "Insert"
    assert button(page, "New file").get_attribute("aria-keyshortcuts") == "Shift+Insert"
    assert button(page, "Rename").get_attribute("aria-keyshortcuts") == "F2"
    assert button(page, "Delete").get_attribute("aria-keyshortcuts") == "Delete"
    # Alt, never Tab: Tab has to stay the way out of the grid's roving tabindex.
    assert button(page, "Indent").get_attribute("aria-keyshortcuts") == "Alt+ArrowRight"
    assert button(page, "Outdent").get_attribute("aria-keyshortcuts") == "Alt+ArrowLeft"
    # The view-only actions have no binding, so they must not claim one.
    assert button(page, "Expand all").get_attribute("aria-keyshortcuts") is None

    assert page.locator(".pnl-tst-search input").count() == 1

    server.stop()


def test_toolbar_list_picks_and_orders_the_actions(page: Page, port):
    """A list is the whole declaration: what it leaves out has no key binding either."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": ["collapse-all"]},
    )
    server = serve(table, page, port)

    assert toolbar_buttons(page).count() == 1
    assert toolbar_buttons(page).first.get_attribute("aria-label") == "Collapse all"
    assert page.locator(".pnl-tst-search").count() == 0

    rows(page).nth(0).click()
    page.keyboard.press("Control+a")
    page.wait_for_timeout(300)
    assert table.selected_keys == ["a"]

    server.stop()


def test_toolbar_expands_and_collapses_every_branch(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"toolbar": True})
    server = serve(table, page, port)

    assert row_titles(page) == ["Folder A", "Folder B"]

    button(page, "Expand all").click()
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])
    wait_until(lambda: table.expanded_keys == ["a", "b"], timeout=10)

    button(page, "Collapse all").click()
    expect_titles(page, ["Folder A", "Folder B"])
    wait_until(lambda: table.expanded_keys == [], timeout=10)

    server.stop()


def test_toolbar_selects_all_and_clears(page: Page, port):
    """Select all takes the rendered rows, which under a filter is what is on screen."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    button(page, "Select all").click()
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2", "b", "b1"], timeout=10)

    button(page, "Clear selection").click()
    wait_until(lambda: table.selected_keys == [], timeout=10)

    server.stop()


def test_toolbar_marks_unavailable_actions_aria_disabled(page: Page, port):
    """aria-disabled, never the disabled attribute, so the button keeps its tab stop."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    # Nothing is selected yet, so clearing would do nothing.
    assert button(page, "Clear selection").get_attribute("aria-disabled") == "true"
    assert button(page, "Clear selection").get_attribute("disabled") is None
    assert button(page, "Select all").get_attribute("aria-disabled") == "false"

    button(page, "Select all").click()
    expect(button(page, "Clear selection")).to_have_attribute("aria-disabled", "false", timeout=10000)

    # A filtered view is always shown open, so both branch actions go quiet.
    table.filter_text = "A1"
    expect(button(page, "Expand all")).to_have_attribute("aria-disabled", "true", timeout=10000)
    assert button(page, "Collapse all").get_attribute("aria-disabled") == "true"

    server.stop()


def test_toolbar_disabled_button_does_nothing_when_clicked(page: Page, port):
    """The handler no-ops on its own, rather than leaning on the browser to stop it.

    ``dispatch_event`` is used instead of ``click`` on purpose: Playwright reads
    ``aria-disabled`` as unclickable and would refuse, which would leave the guard
    in ``runAction`` untested. Assistive technology drives buttons this way too.
    """
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    wait_until(lambda: table.expanded_keys == ["a", "b"], timeout=10)

    table.filter_text = "A1"
    expect(button(page, "Collapse all")).to_have_attribute("aria-disabled", "true", timeout=10000)
    button(page, "Collapse all").dispatch_event("click")
    page.wait_for_timeout(500)

    # Had the handler run, every branch would now be closed underneath the filter.
    assert table.expanded_keys == ["a", "b"]

    server.stop()


def test_toolbar_has_one_tab_stop_with_arrow_navigation(page: Page, port):
    """The ARIA toolbar pattern: one tab stop, arrows between the buttons."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    tabbable = [toolbar_buttons(page).nth(i).get_attribute("tabindex") for i in range(12)]
    assert tabbable == ["0"] + ["-1"] * 11

    toolbar_buttons(page).first.focus()
    page.keyboard.press("ArrowRight")
    assert focused_label(page) == "New file"
    page.keyboard.press("End")
    assert focused_label(page) == "Clear selection"
    page.keyboard.press("Home")
    assert focused_label(page) == "New folder"
    # Clamped rather than wrapping, exactly as Home and End behave in the grid.
    page.keyboard.press("ArrowLeft")
    assert focused_label(page) == "New folder"

    expect(toolbar_buttons(page).first).to_have_attribute("tabindex", "0")
    assert toolbar_buttons(page).nth(1).get_attribute("tabindex") == "-1"

    server.stop()


def test_toolbar_search_box_drives_filter_text(page: Page, port):
    """The box writes the param, so Python sees the search without owning the input."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True, "toolbar": True, "search_label": "Find"},
    )
    server = serve(table, page, port)

    box = page.locator(".pnl-tst-search input")
    assert box.get_attribute("aria-label") == "Find"

    box.fill("A1")
    expect_titles(page, ["Folder A", "File A1"])
    wait_until(lambda: table.filter_text == "A1", timeout=10)
    # A view concern only: the tree Python owns is untouched.
    assert shape(table.source) == "a(a1,a2),b(b1)"

    # And the param still pushes the other way.
    table.filter_text = "B1"
    expect_titles(page, ["Folder B", "File B1"])
    expect(box).to_have_value("B1")

    server.stop()


def test_toolbar_shortcuts_work_from_the_grid(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    rows(page).nth(0).click()
    page.keyboard.press("Control+a")
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2", "b", "b1"], timeout=10)

    page.keyboard.press("Escape")
    wait_until(lambda: table.selected_keys == [], timeout=10)

    page.keyboard.press("Control+f")
    assert focused_label(page) == "Search"

    server.stop()


def test_toolbar_survives_an_empty_tree(page: Page, port):
    """The empty state replaces the grid, not the toolbar, or a search could not be undone."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"toolbar": True})
    server = serve(table, page, port)

    page.locator(".pnl-tst-search input").fill("nothing here")
    page.locator(".pnl-tst-empty").wait_for(state="visible", timeout=10000)

    assert page.locator("[role='toolbar']").count() == 1
    assert page.locator("[role='treegrid']").count() == 0

    page.locator(".pnl-tst-search input").fill("")
    expect_titles(page, ["Folder A", "Folder B"])

    server.stop()


# Reorder, indent and outdent. These are ordinary `move` intents with an explicit
# position, so what is tested here is the anchor the browser picks and the edges
# where the button has to go quiet, not the tree rewrite itself.


def test_toolbar_moves_a_row_down_and_back_up(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Move down").click()
    wait_until(lambda: shape(table.source) == "a(a2,a1),b(b1)", timeout=10)
    expect_titles(page, ["Folder A", "File A2", "File A1", "Folder B", "File B1"])

    # The row that was acted on keeps focus, so a run of presses stays on it. The
    # refocus waits a tick for the rebuilt rows, so this is polled rather than read.
    wait_until(lambda: focused_title(page) == "File A1", timeout=10)

    button(page, "Move up").click()
    wait_until(lambda: shape(table.source) == "a(a1,a2),b(b1)", timeout=10)

    server.stop()


def test_toolbar_indents_under_the_previous_sibling(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(2).click()  # File A2, under File A1
    button(page, "Indent").click()
    wait_until(lambda: shape(table.source) == "a(a1(a2)),b(b1)", timeout=10)

    # An indent leaves the rendered order alone, so the depth is the only thing
    # that says it arrived, and it has to be waited on rather than read.
    expect(rows(page).nth(2)).to_have_attribute("aria-level", "3", timeout=10000)
    # The new parent is opened by the browser, so the moved row stays on screen.
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])

    server.stop()


def test_toolbar_outdents_to_after_the_parent(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Outdent").click()
    wait_until(lambda: shape(table.source) == "a(a2),a1,b(b1)", timeout=10)

    # `to_have_attribute` rather than `get_attribute`: Python owns the tree, so it
    # has the new shape a websocket round trip before the DOM does, and a plain
    # read here would see the row that used to sit at this index.
    expect(rows(page).nth(2)).to_have_attribute("aria-level", "1", timeout=10000)

    server.stop()


def test_toolbar_move_shortcuts_work_from_the_grid(page: Page, port):
    """Alt plus arrow, so Tab stays the way out of the grid."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("Alt+ArrowDown")
    wait_until(lambda: shape(table.source) == "a(a2,a1),b(b1)", timeout=10)

    page.keyboard.press("Alt+ArrowLeft")
    wait_until(lambda: shape(table.source) == "a(a2),a1,b(b1)", timeout=10)

    page.keyboard.press("Alt+ArrowRight")
    wait_until(lambda: shape(table.source) == "a(a2,a1),b(b1)", timeout=10)

    page.keyboard.press("Alt+ArrowUp")
    wait_until(lambda: shape(table.source) == "a(a1,a2),b(b1)", timeout=10)

    server.stop()


def test_toolbar_move_actions_are_disabled_at_the_edges(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    # First root: nothing above it and no parent to leave.
    rows(page).nth(0).click()
    expect(button(page, "Move up")).to_have_attribute("aria-disabled", "true", timeout=10000)
    assert button(page, "Indent").get_attribute("aria-disabled") == "true"
    assert button(page, "Outdent").get_attribute("aria-disabled") == "true"
    assert button(page, "Move down").get_attribute("aria-disabled") == "false"

    # First child: a parent to leave, but no sibling above to move under.
    rows(page).nth(1).click()
    expect(button(page, "Outdent")).to_have_attribute("aria-disabled", "false", timeout=10000)
    assert button(page, "Move up").get_attribute("aria-disabled") == "true"
    assert button(page, "Indent").get_attribute("aria-disabled") == "true"

    # Last child: nothing below it, and the row above takes children.
    rows(page).nth(2).click()
    expect(button(page, "Move down")).to_have_attribute("aria-disabled", "true", timeout=10000)
    assert button(page, "Indent").get_attribute("aria-disabled") == "false"

    server.stop()


def test_toolbar_indent_is_blocked_by_a_leaf_above(page: Page, port):
    """A node that refuses children refuses this the same way it refuses a drop."""
    source = [
        {
            "key": "a",
            "title": "Folder A",
            "children": [
                {"key": "a1", "title": "File A1", "allow_children": False},
                {"key": "a2", "title": "File A2"},
            ],
        },
        {"key": "b", "title": "Folder B", "children": [{"key": "b1", "title": "File B1"}]},
    ]
    table = TanstackTable(source=source, options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(2).click()  # File A2, under a File A1 that takes no children
    expect(button(page, "Indent")).to_have_attribute("aria-disabled", "true", timeout=10000)

    page.keyboard.press("Alt+ArrowRight")
    page.wait_for_timeout(500)
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


def test_toolbar_moves_a_sibling_selection_as_one_batch(page: Page, port):
    """Selected siblings step over the row outside the batch, not over each other."""
    source = [
        {
            "key": "a",
            "title": "Folder A",
            "children": [
                {"key": "a1", "title": "File A1"},
                {"key": "a2", "title": "File A2"},
                {"key": "a3", "title": "File A3"},
            ],
        }
    ]
    table = TanstackTable(source=source, options={"expand_all": True, "select_mode": "multi", "toolbar": True})
    server = serve(table, page, port)

    click_row(page, 2)  # File A2
    click_row(page, 3, "Control")  # and File A3
    wait_until(lambda: table.selected_keys == ["a2", "a3"], timeout=10)

    button(page, "Move up").click()
    wait_until(lambda: shape(table.source) == "a(a2,a3,a1)", timeout=10)

    server.stop()


def test_toolbar_move_falls_back_to_one_row_across_parents(page: Page, port):
    """A selection spanning two folders has no shared row to reorder within."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 2)  # File A2
    click_row(page, 4, "Control")  # and File B1, in the other folder
    wait_until(lambda: table.selected_keys == ["a2", "b1"], timeout=10)

    # File B1 is the active row, and it is alone in Folder B, so the only move
    # left to it is out of that folder.
    button(page, "Outdent").click()
    wait_until(lambda: shape(table.source) == "a(a1,a2),b,b1", timeout=10)

    server.stop()


def test_toolbar_move_goes_through_the_move_callback(page: Page, port):
    """The veto a drop answers to is the veto the toolbar answers to."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": True},
        move_callback=lambda key, anchor_key, position: position != "child",
    )
    server = serve(table, page, port)

    rows(page).nth(2).click()  # File A2
    button(page, "Indent").click()
    page.wait_for_timeout(700)
    assert shape(table.source) == "a(a1,a2),b(b1)"

    # Reordering is not a `child` move, so it still lands.
    button(page, "Move up").click()
    wait_until(lambda: shape(table.source) == "a(a2,a1),b(b1)", timeout=10)

    server.stop()


# New folder, new file and delete. Python mints every key and rewrites the tree, so
# what is pinned down here is where the browser asks a node to land, which rows a
# delete takes with it, and where focus goes once the new source arrives.


def commit_name(page: Page) -> None:
    """Close the editor an add opened, keeping the name the button gave the node.

    A default toolbar carries `rename`, so creating a node opens the editor on it
    the way an explorer does. Committing is what puts the title back in the cell.

    Waiting for the editor first, because Python having the new source says nothing
    about the browser having rendered it: an Enter sent early would land on the
    button that was clicked and add a second node.
    """
    expect(page.locator(".pnl-tst-edit")).to_have_count(1, timeout=10000)
    page.keyboard.press("Enter")
    expect(page.locator(".pnl-tst-edit")).to_have_count(0, timeout=10000)


def test_toolbar_new_folder_lands_inside_the_active_row(page: Page, port):
    """Explorer placement: a row that takes children takes the new node too."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(0).click()  # Folder A
    button(page, "New folder").click()
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1),b(b1)", timeout=10)
    commit_name(page)
    # The button's label is also the new node's title, so a renamed action names
    # what it creates.
    expect_titles(page, ["Folder A", "File A1", "File A2", "New folder", "Folder B", "File B1"])

    server.stop()


def test_toolbar_new_file_lands_next_to_a_leaf(page: Page, port):
    """A node that refuses children gets a sibling instead, never a child."""
    source = [
        {
            "key": "a",
            "title": "Folder A",
            "children": [{"key": "a1", "title": "File A1", "allow_children": False}],
        }
    ]
    table = TanstackTable(source=source, options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "New file").click()
    wait_until(lambda: shape(table.source) == "a(a1,node-1)", timeout=10)
    commit_name(page)
    expect_titles(page, ["Folder A", "File A1", "New file"])

    # The default template for this action refuses children in turn, so the rule
    # holds for what the toolbar itself creates.
    assert node_at(table.source, "node-1")["allow_children"] is False

    server.stop()


def test_toolbar_fills_a_tree_that_starts_out_empty(page: Page, port):
    """With no row to anchor to the node lands at root, which is the only way in."""
    table = TanstackTable(source=[], options={"toolbar": True})
    server = start(table, page, port)
    page.locator("[role='toolbar']").wait_for(state="visible", timeout=15000)

    assert page.locator("[role='treegrid']").count() == 0
    # Nothing is active, so there is nothing to remove, but adding is still open.
    expect(button(page, "Delete")).to_have_attribute("aria-disabled", "true", timeout=10000)
    assert button(page, "New folder").get_attribute("aria-disabled") == "false"

    button(page, "New folder").click()
    wait_until(lambda: shape(table.source) == "node-1", timeout=10)
    commit_name(page)
    expect_titles(page, ["New folder"])

    server.stop()


def test_toolbar_entry_renames_an_action_and_names_the_node(page: Page, port):
    """A dict entry gives the button its label and the minted node its fields."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={
            "expand_all": True,
            "new_key_prefix": "doc",
            "toolbar": [{"id": "new-folder", "label": "New section", "node": {"kind": "section"}}],
        },
    )
    server = serve(table, page, port)

    assert toolbar_buttons(page).count() == 1
    assert button(page, "New section").get_attribute("title") == "New section (Insert)"

    rows(page).nth(0).click()  # Folder A
    button(page, "New section").click()
    wait_until(lambda: shape(table.source) == "a(a1,a2,doc-1),b(b1)", timeout=10)

    node = node_at(table.source, "doc-1")
    assert node["title"] == "New section"
    assert node["kind"] == "section"

    server.stop()


def test_toolbar_add_focuses_and_selects_the_new_row(page: Page, port):
    """The browser cannot know a key Python has yet to mint, so it diffs for it."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    button(page, "New folder").click()
    wait_until(lambda: shape(table.source) == "a(a1(node-1),a2),b(b1)", timeout=10)
    commit_name(page)
    wait_until(lambda: focused_title(page) == "New folder", timeout=10)
    # The new node replaces the selection rather than joining it, so the next
    # action applies to it alone.
    wait_until(lambda: table.selected_keys == ["node-1"], timeout=10)

    server.stop()


def test_toolbar_add_shortcuts_work_from_the_grid(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(0).click()  # Folder A
    page.keyboard.press("Insert")
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1),b(b1)", timeout=10)
    commit_name(page)

    # Focus followed the new folder, and a folder takes children, so the file that
    # Shift+Insert makes lands inside it rather than beside it.
    wait_until(lambda: focused_title(page) == "New folder", timeout=10)
    page.keyboard.press("Shift+Insert")
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1(node-2)),b(b1)", timeout=10)

    server.stop()


def test_toolbar_deletes_the_active_row(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Delete").click()
    wait_until(lambda: shape(table.source) == "a(a2),b(b1)", timeout=10)
    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1"])

    # A folder goes with everything under it, and the key press is the same action.
    rows(page).nth(2).click()  # Folder B
    page.keyboard.press("Delete")
    wait_until(lambda: shape(table.source) == "a(a2)", timeout=10)

    server.stop()


def test_toolbar_delete_takes_the_whole_selection(page: Page, port):
    """Unlike a move, a delete needs no shared parent, so it takes every row."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 4, "Control")  # and File B1, in the other folder
    wait_until(lambda: table.selected_keys == ["a1", "b1"], timeout=10)

    button(page, "Delete").click()
    wait_until(lambda: shape(table.source) == "a(a2),b", timeout=10)
    # Keys that no longer name a node are dropped rather than left dangling. Polled
    # rather than read: the prune is the statement after the source rewrite, so a
    # bare read can land between the two.
    wait_until(lambda: table.selected_keys == [], timeout=10)

    server.stop()


def test_toolbar_delete_focuses_what_moves_up_into_the_gap(page: Page, port):
    """Focus follows the position, not the key, so a run of deletes stays put."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Delete").click()
    wait_until(lambda: focused_title(page) == "File A2", timeout=10)

    button(page, "Delete").click()
    wait_until(lambda: shape(table.source) == "a,b(b1)", timeout=10)

    server.stop()


def test_toolbar_actions_go_through_the_action_callback(page: Page, port):
    """One veto for the whole action, where `move_callback` is asked per node."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": True},
        action_callback=lambda action, params: action != "delete",
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Delete").click()
    page.wait_for_timeout(700)
    assert shape(table.source) == "a(a1,a2),b(b1)"

    # Adding is a different action, so the same callback lets it through.
    button(page, "New folder").click()
    wait_until(lambda: shape(table.source) == "a(a1(node-1),a2),b(b1)", timeout=10)

    server.stop()


# Emptying the selection. However it is done, it has to leave the grid looking
# untouched, or a clear would swap one background for another rather than clear.


def test_clear_selection_leaves_no_mark_on_the_row(page: Page, port):
    """The button and Escape both mute the active row, focus ring included."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(1)

    button(page, "Clear selection").click()
    wait_until(lambda: table.selected_keys == [], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(0)
    # Still the row the keyboard is on, so Tab comes back to it and the toolbar
    # keeps acting on it.
    assert rows(page).nth(1).get_attribute("tabindex") == "0"

    rows(page).nth(1).click()
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    page.keyboard.press("Escape")
    wait_until(lambda: table.selected_keys == [], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(0)
    # Escape is a key press, so the row would otherwise be left ringed.
    assert page.locator(".pnl-tst-row--quiet").count() == 1

    server.stop()


def test_ctrl_click_that_empties_the_selection_leaves_no_mark(page: Page, port):
    """Taking the last row out is a clear, whichever gesture got there."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi"},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # and File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    click_row(page, 2, "Control")  # back out, one row left
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(1)

    click_row(page, 1, "Control")  # and now none
    wait_until(lambda: table.selected_keys == [], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(0)

    server.stop()


def test_select_all_paints_the_active_row_again(page: Page, port):
    """The mute lasts until the next gesture, and is not a state to get stuck in."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    button(page, "Clear selection").click()
    expect(page.locator(".pnl-tst-row--active")).to_have_count(0)

    button(page, "Select all").click()
    wait_until(lambda: table.selected_keys == ["a", "a1", "a2", "b", "b1"], timeout=10)
    expect(page.locator(".pnl-tst-row--active")).to_have_count(1)

    server.stop()


def test_toggle_on_click_clears_the_only_selected_row(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toggle_on_click": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 1)
    wait_until(lambda: table.selected_keys == [], timeout=10)
    # Nothing is painted, or clicking a selection away would swap one tint for
    # another rather than clear it.
    expect(page.locator(".pnl-tst-row--active")).to_have_count(0)
    # The row stays the active one underneath, so Tab still comes back to it.
    assert rows(page).nth(1).get_attribute("tabindex") == "0"

    # Anything that touches the row again paints it.
    page.keyboard.press("ArrowDown")
    expect(page.locator(".pnl-tst-row--active")).to_have_count(1)

    server.stop()


def test_toggle_on_click_narrows_a_multi_row_selection_first(page: Page, port):
    """A plain click on one of several selected rows still means `only this one`."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toggle_on_click": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # and File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    click_row(page, 1)
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)
    click_row(page, 1)
    wait_until(lambda: table.selected_keys == [], timeout=10)

    server.stop()


def test_a_second_click_keeps_the_row_selected_by_default(page: Page, port):
    """Without the option a click only ever selects, which is the old behaviour."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi"},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 1)
    page.wait_for_timeout(500)
    assert table.selected_keys == ["a1"]

    server.stop()


# Inline rename. Typing stays in the browser until it commits, so what is pinned
# down here is when the editor opens, what closes it, and that Python is the one
# that retitles the node.


def editor(page: Page):
    return page.locator(".pnl-tst-edit")


def title_of(table: TanstackTable, key: str) -> str:
    return node_at(table.source, key)["title"]


def test_rename_button_opens_the_editor_on_the_active_row(page: Page, port):
    """The editor sits inside the tree gridcell, so the treegrid is unchanged."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Rename").click()

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).input_value() == "File A1"
    # Named for the node, so the editor announces what is being renamed.
    assert editor(page).get_attribute("aria-label") == "Rename File A1"
    # The row is still a row at the level it was, with its cells still gridcells.
    assert rows(page).nth(1).get_attribute("aria-level") == "2"
    assert rows(page).nth(1).locator("[role='gridcell']").count() == 1
    # Python is told which row is open, so an application can follow along.
    wait_until(lambda: table.editing_key == "a1", timeout=10)

    server.stop()


def test_rename_commits_on_enter(page: Page, port):
    """Python retitles the node: the browser only ever asks."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    editor(page).fill("Renamed")
    page.keyboard.press("Enter")

    wait_until(lambda: title_of(table, "a1") == "Renamed", timeout=10)
    expect(editor(page)).to_have_count(0)
    wait_until(lambda: table.editing_key == "", timeout=10)
    # Focus comes back to the row, so the next key press acts on it rather than
    # landing nowhere.
    wait_until(lambda: focused_title(page) == "Renamed", timeout=10)

    server.stop()


def test_rename_commits_on_blur(page: Page, port):
    """Clicking away is the same answer as Enter, which is what an explorer does."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    editor(page).fill("Renamed")
    # The row element rather than its title, which the open editor has replaced.
    rows(page).nth(2).click()  # File A2

    wait_until(lambda: title_of(table, "a1") == "Renamed", timeout=10)
    expect(editor(page)).to_have_count(0)

    server.stop()


def test_escape_cancels_a_rename_on_an_existing_row(page: Page, port):
    """Escape closes the editor and leaves the node exactly as it was."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    editor(page).fill("Renamed")
    page.keyboard.press("Escape")

    expect(editor(page)).to_have_count(0, timeout=10000)
    page.wait_for_timeout(500)
    assert title_of(table, "a1") == "File A1"
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


def test_an_emptied_editor_is_a_cancel_rather_than_a_blank_title(page: Page, port):
    """A row with nothing to click on has no way back to being named."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    editor(page).fill("   ")
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_count(0, timeout=10000)
    page.wait_for_timeout(500)
    assert title_of(table, "a1") == "File A1"

    server.stop()


def test_adding_a_node_opens_the_editor_on_it(page: Page, port):
    """Naming a new node straight away, with the label as the text to replace."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(0).click()  # Folder A
    page.keyboard.press("Insert")
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1),b(b1)", timeout=10)

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).input_value() == "New folder"

    editor(page).fill("Reports")
    page.keyboard.press("Enter")
    wait_until(lambda: title_of(table, "node-1") == "Reports", timeout=10)

    server.stop()


def test_escape_on_a_freshly_added_node_removes_it(page: Page, port):
    """One key press undoes the whole of what opening the editor was part of."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(0).click()  # Folder A
    page.keyboard.press("Insert")
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1),b(b1)", timeout=10)

    # The editor first: an early Escape would reach the grid and clear the selection.
    expect(editor(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("Escape")
    wait_until(lambda: shape(table.source) == "a(a1,a2),b(b1)", timeout=10)
    expect(editor(page)).to_have_count(0)

    # A second edit of an existing row is an ordinary one: Escape closes it and
    # keeps the row, so the removal never becomes a property of the editor itself.
    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    page.keyboard.press("Escape")
    page.wait_for_timeout(500)
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


def test_a_table_without_rename_never_opens_an_editor(page: Page, port):
    """The toolbar list gates the editor as it gates every other action."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": ["new-folder"]},
    )
    server = serve(table, page, port)

    rows(page).nth(0).click()  # Folder A
    page.keyboard.press("F2")
    page.wait_for_timeout(300)
    assert editor(page).count() == 0

    # And an add leaves the node with the label the button gave it.
    page.keyboard.press("Insert")
    wait_until(lambda: shape(table.source) == "a(a1,a2,node-1),b(b1)", timeout=10)
    page.wait_for_timeout(300)
    assert editor(page).count() == 0
    expect_titles(page, ["Folder A", "File A1", "File A2", "New folder", "Folder B", "File B1"])

    server.stop()


def test_python_can_open_the_editor_by_writing_editing_key(page: Page, port):
    """An application starting a rename of its own, with no toolbar in sight."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True})
    server = serve(table, page, port)

    table.editing_key = "a1"
    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).input_value() == "File A1"

    editor(page).fill("Renamed")
    page.keyboard.press("Enter")
    wait_until(lambda: title_of(table, "a1") == "Renamed", timeout=10)
    # The browser clears the param when the editor closes, so the next write of the
    # same key opens it again.
    wait_until(lambda: table.editing_key == "", timeout=10)

    server.stop()


def test_rename_goes_through_the_action_callback(page: Page, port):
    """The veto add and delete answer to is the veto a rename answers to."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": True},
        action_callback=lambda action, params: action != "rename",
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("F2")
    editor(page).fill("Renamed")
    page.keyboard.press("Enter")

    page.wait_for_timeout(700)
    assert title_of(table, "a1") == "File A1"

    server.stop()


def test_rename_is_disabled_with_nothing_to_rename(page: Page, port):
    table = TanstackTable(source=[], options={"toolbar": True})
    server = start(table, page, port)
    page.locator("[role='toolbar']").wait_for(state="visible", timeout=15000)

    expect(button(page, "Rename")).to_have_attribute("aria-disabled", "true", timeout=10000)
    page.keyboard.press("F2")
    page.wait_for_timeout(300)
    assert editor(page).count() == 0

    server.stop()


def test_clicking_inside_the_editor_leaves_the_selection_alone(page: Page, port):
    """The editor is a row control, so placing the caret is not a row gesture."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "toolbar": True},
    )
    server = serve(table, page, port)

    click_row(page, 1)  # File A1
    click_row(page, 2, "Control")  # and File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    button(page, "Rename").click()
    expect(editor(page)).to_have_count(1, timeout=10000)
    editor(page).click()
    page.wait_for_timeout(500)
    # A plain click on a row would have narrowed this to one.
    assert table.selected_keys == ["a1", "a2"]

    server.stop()
