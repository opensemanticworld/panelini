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

    labels = [toolbar_buttons(page).nth(i).get_attribute("aria-label") for i in range(17)]
    assert labels == [
        "Undo",
        "Redo",
        "New folder",
        "New file",
        "Rename",
        "Delete",
        "Cut",
        "Copy",
        "Paste",
        "Move up",
        "Move down",
        "Outdent",
        "Indent",
        "Expand all",
        "Collapse all",
        "Select all",
        "Clear selection",
    ]
    assert button(page, "Undo").get_attribute("aria-keyshortcuts") == "Control+Z"
    assert button(page, "Redo").get_attribute("aria-keyshortcuts") == "Control+Shift+Z"
    assert button(page, "Select all").get_attribute("aria-keyshortcuts") == "Control+A"
    assert button(page, "Clear selection").get_attribute("aria-keyshortcuts") == "Escape"
    assert button(page, "New folder").get_attribute("aria-keyshortcuts") == "Insert"
    assert button(page, "New file").get_attribute("aria-keyshortcuts") == "Shift+Insert"
    assert button(page, "Rename").get_attribute("aria-keyshortcuts") == "F2"
    assert button(page, "Delete").get_attribute("aria-keyshortcuts") == "Delete"
    assert button(page, "Cut").get_attribute("aria-keyshortcuts") == "Control+X"
    assert button(page, "Copy").get_attribute("aria-keyshortcuts") == "Control+C"
    assert button(page, "Paste").get_attribute("aria-keyshortcuts") == "Control+V"
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

    tabbable = [toolbar_buttons(page).nth(i).get_attribute("tabindex") for i in range(17)]
    assert tabbable == ["0"] + ["-1"] * 16

    toolbar_buttons(page).first.focus()
    page.keyboard.press("ArrowRight")
    assert focused_label(page) == "Redo"
    page.keyboard.press("End")
    assert focused_label(page) == "Clear selection"
    page.keyboard.press("Home")
    assert focused_label(page) == "Undo"
    # Clamped rather than wrapping, exactly as Home and End behave in the grid.
    page.keyboard.press("ArrowLeft")
    assert focused_label(page) == "Undo"

    expect(toolbar_buttons(page).first).to_have_attribute("tabindex", "0")
    assert toolbar_buttons(page).nth(1).get_attribute("tabindex") == "-1"

    server.stop()


def toolbar_lines(page: Page) -> int:
    """How many lines the toolbar buttons are laid out on."""
    tops = []
    for index in range(toolbar_buttons(page).count()):
        box = toolbar_buttons(page).nth(index).bounding_box()
        assert box
        tops.append(round(box["y"]))
    return len(set(tops))


def test_toolbar_wraps_instead_of_clipping(page: Page, port):
    """A window too narrow for every button gets a second line, not buttons off the edge."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": True},
        sizing_mode="stretch_width",
    )
    page.set_viewport_size({"width": 1100, "height": 600})
    server = serve(table, page, port)

    assert toolbar_lines(page) == 1

    page.set_viewport_size({"width": 420, "height": 600})
    page.wait_for_timeout(400)
    assert toolbar_lines(page) > 1

    # Nothing is left hanging past the edge, which is what a clipped toolbar does.
    bar = page.locator("[role='toolbar']").bounding_box()
    assert bar
    for index in range(toolbar_buttons(page).count()):
        box = toolbar_buttons(page).nth(index).bounding_box()
        assert box
        assert box["x"] + box["width"] <= bar["x"] + bar["width"] + 1

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


# File type. Renaming a file to another extension asks first, in the wording a file
# manager uses, and the icon follows the type the name now says it is.

FILE_SOURCE = [
    {
        "key": "docs",
        "title": "Docs",
        "icon": "folder",
        "children": [
            {"key": "md", "title": "notes.md", "icon": "markdown", "allow_children": False},
            {"key": "img", "title": "logo.png", "icon": "image", "allow_children": False},
        ],
    },
]

WARNING = "If you change a file name extension, the file might become unusable."


def dialog(page: Page):
    return page.locator("[role='alertdialog']")


def dialog_button(page: Page, label: str):
    return page.locator(".pnl-tst-dbtn", has_text=label)


def row_icon(page: Page, index: int) -> str:
    """The SVG a row draws, which is how a change of icon is visible from here."""
    return rows(page).nth(index).locator(".pnl-tst-icon").inner_html()


def file_table(event_callback=None, **options) -> TanstackTable:
    return TanstackTable(
        source=copy.deepcopy(FILE_SOURCE),
        options={"expand_all": True, "toolbar": True, **options},
        event_callback=event_callback,
    )


def open_editor(page: Page, index: int, title: str) -> None:
    """Select a row, open its editor and type a new name into it."""
    rows(page).nth(index).click()
    page.keyboard.press("F2")
    expect(editor(page)).to_have_count(1, timeout=10000)
    editor(page).fill(title)


def test_changing_a_file_type_asks_before_it_happens(page: Page, port):
    """An alertdialog, because the answer decides whether the rename is sent."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")

    expect(dialog(page)).to_have_count(1, timeout=10000)
    message = dialog(page).inner_text()
    assert WARNING in message
    # Both names, so the reader does not have to remember what they typed.
    assert "notes.md" in message
    assert "notes.py" in message
    assert dialog(page).get_attribute("aria-modal") == "true"
    assert dialog(page).get_attribute("aria-label") == "Rename"
    # A warning defaults to the answer that changes nothing.
    expect(dialog_button(page, "No")).to_be_focused()
    # Nothing has been sent yet, so the tree is exactly as it was.
    assert title_of(table, "md") == "notes.md"

    server.stop()


def test_yes_applies_the_rename_and_moves_the_icon_with_it(page: Page, port):
    table = file_table()
    server = serve(table, page, port)

    markdown_icon = row_icon(page, 1)
    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    dialog_button(page, "Yes").click()

    wait_until(lambda: title_of(table, "md") == "notes.py", timeout=10)
    assert node_at(table.source, "md")["icon"] == "python"
    expect(dialog(page)).to_have_count(0)
    # And the row draws the new glyph rather than keeping the old one.
    wait_until(lambda: row_icon(page, 1) != markdown_icon, timeout=10)

    server.stop()


def test_no_returns_to_the_editor_with_what_was_typed(page: Page, port):
    """A mistyped extension is corrected rather than retyped from scratch."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    dialog_button(page, "No").click()

    expect(dialog(page)).to_have_count(0, timeout=10000)
    expect(editor(page)).to_be_focused()
    assert editor(page).input_value() == "notes.py"
    page.wait_for_timeout(500)
    assert title_of(table, "md") == "notes.md"

    server.stop()


def test_escape_in_the_warning_is_a_no(page: Page, port):
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("Escape")

    expect(dialog(page)).to_have_count(0, timeout=10000)
    # Back to the editor, not out of it: a second Escape is what closes that.
    expect(editor(page)).to_have_count(1)
    assert editor(page).input_value() == "notes.py"
    page.wait_for_timeout(500)
    assert title_of(table, "md") == "notes.md"

    server.stop()


@pytest.mark.parametrize("key", ["Tab", "ArrowLeft", "ArrowRight"])
def test_the_warning_keeps_focus_between_its_two_buttons(page: Page, port, key):
    """A modal that Tab walks out of is a modal in name only, and the arrow keys
    move between two answers the way they do anywhere else."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)

    page.keyboard.press(key)
    expect(dialog_button(page, "Yes")).to_be_focused()
    page.keyboard.press(key)
    expect(dialog_button(page, "No")).to_be_focused()

    server.stop()


def test_enter_takes_the_focused_answer(page: Page, port):
    """Which is No on open, so a reflexive Enter keeps the file working."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("Enter")

    expect(dialog(page)).to_have_count(0, timeout=10000)
    expect(editor(page)).to_have_count(1)
    page.wait_for_timeout(500)
    assert title_of(table, "md") == "notes.md"

    # Arrow across to Yes and the same key answers the other way.
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("ArrowLeft")
    page.keyboard.press("Enter")
    wait_until(lambda: title_of(table, "md") == "notes.py", timeout=10)

    server.stop()


def test_y_answers_the_warning_without_reaching_for_a_button(page: Page, port):
    """The initial a file manager answers to, so neither hand has to move."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("y")

    expect(dialog(page)).to_have_count(0, timeout=10000)
    wait_until(lambda: title_of(table, "md") == "notes.py", timeout=10)

    server.stop()


def test_n_declines_the_warning_and_hands_the_editor_back(page: Page, port):
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("n")

    expect(dialog(page)).to_have_count(0, timeout=10000)
    expect(editor(page)).to_be_focused()
    assert editor(page).input_value() == "notes.py"
    page.wait_for_timeout(500)
    assert title_of(table, "md") == "notes.md"

    server.stop()


def test_the_warning_announces_and_shows_its_shortcuts(page: Page, port):
    """Announced through aria-keyshortcuts and shown as an underlined initial, so
    the shortcut is not a secret kept from either kind of user."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)

    assert dialog_button(page, "Yes").get_attribute("aria-keyshortcuts") == "Y"
    assert dialog_button(page, "No").get_attribute("aria-keyshortcuts") == "N"
    assert dialog_button(page, "Yes").locator(".pnl-tst-dkey").inner_text() == "Y"
    assert dialog_button(page, "No").locator(".pnl-tst-dkey").inner_text() == "N"

    server.stop()


def outlined(page: Page, label: str) -> bool:
    """Whether an answer is drawn as the selected one.

    Read off the computed style rather than the class list, because the point is
    that the selection is visible: a rule that stopped applying would leave the
    dialog looking like neither answer was chosen.
    """
    return dialog_button(page, label).evaluate("element => getComputedStyle(element).outlineStyle === 'solid'")


def test_the_selected_answer_is_visible_and_moves_with_the_arrows(page: Page, port):
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)

    # No on open, which is the answer that changes nothing.
    assert outlined(page, "No")
    assert not outlined(page, "Yes")

    page.keyboard.press("ArrowLeft")
    assert outlined(page, "Yes")
    assert not outlined(page, "No")

    server.stop()


def test_renaming_within_one_type_never_asks(page: Page, port):
    """The extension is what carries the risk, not the name in front of it."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 1, "minutes.MD")
    page.keyboard.press("Enter")

    wait_until(lambda: title_of(table, "md") == "minutes.MD", timeout=10)
    assert dialog(page).count() == 0
    # Case is not a type, so the icon stays where it was.
    assert node_at(table.source, "md")["icon"] == "markdown"

    server.stop()


def test_renaming_a_folder_never_asks(page: Page, port):
    """A folder called notes.py is still a folder, so it has no type to lose."""
    table = file_table()
    server = serve(table, page, port)

    open_editor(page, 0, "Docs.py")
    page.keyboard.press("Enter")

    wait_until(lambda: title_of(table, "docs") == "Docs.py", timeout=10)
    assert dialog(page).count() == 0
    assert node_at(table.source, "docs")["icon"] == "folder"

    server.stop()


def test_naming_a_new_file_for_the_first_time_never_asks(page: Page, port):
    """It never had a type, so giving it one is not changing it."""
    table = file_table(
        new_key_prefix="doc",
        # The default new-file template names no icon, because the panel infers
        # none: a tree without icons must not gain one on the row it just made.
        # A template that opts in is what gets the icon kept in step with the name.
        toolbar=[{"id": "new-file", "node": {"icon": "file", "allow_children": False}}, "rename"],
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()  # notes.md, a leaf, so the new file lands beside it
    page.keyboard.press("Shift+Insert")
    expect(editor(page)).to_have_count(1, timeout=10000)
    editor(page).fill("script.py")
    page.keyboard.press("Enter")

    wait_until(lambda: title_of(table, "doc-1") == "script.py", timeout=10)
    assert dialog(page).count() == 0
    # And the new file carries the icon its name asks for.
    assert node_at(table.source, "doc-1")["icon"] == "python"

    server.stop()


def test_the_warning_can_be_switched_off(page: Page, port):
    """Some trees are not files on a disk, and some apps do their own asking."""
    table = file_table(extension_warning=False)
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")

    wait_until(lambda: title_of(table, "md") == "notes.py", timeout=10)
    assert dialog(page).count() == 0
    # The icon still follows the type: only the confirmation was switched off.
    assert node_at(table.source, "md")["icon"] == "python"

    server.stop()


def test_python_is_told_the_file_type_changed(page: Page, port):
    """So an application can react beyond the confirmation the browser asked for."""
    seen: list[dict] = []

    def record(name: str, params: dict) -> None:
        if name == "rename":
            seen.append(params)

    table = file_table(event_callback=record)
    server = serve(table, page, port)

    open_editor(page, 1, "notes.py")
    page.keyboard.press("Enter")
    expect(dialog(page)).to_have_count(1, timeout=10000)
    dialog_button(page, "Yes").click()

    wait_until(lambda: bool(seen), timeout=10)
    assert seen[0]["extension_changed"] is True
    assert seen[0]["previous_title"] == "notes.md"
    assert seen[0]["applied"] is True

    server.stop()


# --- undo and redo ------------------------------------------------------------


def test_undo_and_redo_buttons_step_the_tree(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Delete").click()
    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1"])

    button(page, "Undo").click()
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])
    assert shape(table.source) == "a(a1,a2),b(b1)"

    button(page, "Redo").click()
    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1"])
    assert shape(table.source) == "a(a2),b(b1)"

    server.stop()


def test_undo_and_redo_shortcuts_work_from_the_grid(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(2).click()  # File A2
    page.keyboard.press("Delete")
    wait_until(lambda: shape(table.source) == "a(a1),b(b1)", timeout=10)
    # Each step waits for the grid and not only for Python: focus is put back when
    # the new tree renders, and a key pressed before that lands on the wrong row.
    expect_titles(page, ["Folder A", "File A1", "Folder B", "File B1"])
    wait_until(lambda: focused_title(page) == "Folder B", timeout=10)

    page.keyboard.press("Control+z")
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])
    # Focus follows the position a step leaves behind, the way it does after a
    # delete, so the next shortcut is still the grid's to take.
    wait_until(lambda: focused_title(page) == "File A2", timeout=10)

    page.keyboard.press("Control+Shift+z")
    wait_until(lambda: shape(table.source) == "a(a1),b(b1)", timeout=10)

    server.stop()


def test_both_are_disabled_until_there_is_a_step_to_take(page: Page, port):
    """Python holds the history, so the buttons read what it reports."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    assert button(page, "Undo").get_attribute("aria-disabled") == "true"
    assert button(page, "Redo").get_attribute("aria-disabled") == "true"

    # A change made in Python counts too: the history is the tree's, not the
    # toolbar's, so an application that rewrites the tree leaves an undo behind.
    table.rename_node("a1", "Renamed")
    expect(button(page, "Undo")).to_have_attribute("aria-disabled", "false", timeout=10000)
    assert button(page, "Redo").get_attribute("aria-disabled") == "true"

    button(page, "Undo").click()
    expect(button(page, "Redo")).to_have_attribute("aria-disabled", "false", timeout=10000)
    expect(button(page, "Undo")).to_have_attribute("aria-disabled", "true", timeout=10000)

    server.stop()


def test_a_table_without_the_actions_ignores_the_shortcuts(page: Page, port):
    """The toolbar list is the whole declaration, for the keys as much as the buttons."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "toolbar": ["delete"]},
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("Delete")
    wait_until(lambda: shape(table.source) == "a(a2),b(b1)", timeout=10)

    page.keyboard.press("Control+z")
    page.wait_for_timeout(300)
    assert shape(table.source) == "a(a2),b(b1)"

    server.stop()


def test_the_open_title_editor_keeps_ctrl_z_for_itself(page: Page, port):
    """Undoing typing is what Ctrl+Z means inside a text field, so the grid never sees it."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    table.rename_node("b1", "Renamed")
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "Renamed"])

    open_editor(page, 1, "typed")
    page.keyboard.press("Control+z")
    page.wait_for_timeout(300)
    # The rename is still the last step the tree took: the editor swallowed the key
    # rather than letting it undo something the user was not looking at.
    assert title_of(table, "b1") == "Renamed"
    assert editor(page).count() == 1

    page.keyboard.press("Escape")
    server.stop()


def test_cut_and_paste_move_a_row_with_the_buttons(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    assert button(page, "Paste").get_attribute("aria-disabled") == "true"

    rows(page).nth(1).click()  # File A1
    button(page, "Cut").click()
    expect(button(page, "Paste")).to_have_attribute("aria-disabled", "false", timeout=10000)
    # Nothing has moved yet: a cut is an intent, and the tree is untouched until
    # the paste says where.
    assert shape(table.source) == "a(a1,a2),b(b1)"

    rows(page).nth(3).click()  # Folder B
    button(page, "Paste").click()
    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1", "File A1"])
    assert shape(table.source) == "a(a2),b(b1,a1)"
    # A cut is spent by its paste, where a copy would still be there.
    expect(button(page, "Paste")).to_have_attribute("aria-disabled", "true", timeout=10000)

    server.stop()


def test_copy_and_paste_duplicate_a_row(page: Page, port):
    """The copy keeps its own keys, so Python mints new ones for what arrives."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    button(page, "Copy").click()
    expect(button(page, "Paste")).to_have_attribute("aria-disabled", "false", timeout=10000)

    rows(page).nth(3).click()  # Folder B
    button(page, "Paste").click()
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1", "File A1"])
    assert shape(table.source) == "a(a1,a2),b(b1,node-1)"
    # The copy survives, so the same branch can be dropped in several places.
    assert button(page, "Paste").get_attribute("aria-disabled") == "false"

    server.stop()


def test_the_clipboard_shortcuts_work_from_the_grid(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).nth(1).click()  # File A1
    page.keyboard.press("Control+x")
    wait_until(lambda: table.clipboard == {"keys": ["a1"], "mode": "cut"}, timeout=10)

    rows(page).nth(3).click()  # Folder B
    page.keyboard.press("Control+v")
    wait_until(lambda: shape(table.source) == "a(a2),b(b1,a1)", timeout=10)
    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1", "File A1"])

    server.stop()


def test_a_whole_cut_branch_is_faded_until_it_is_pasted(page: Page, port):
    """A folder waiting to move takes its contents, so its contents fade with it."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).first.click()  # Folder A
    button(page, "Cut").click()
    expect(page.locator(".pnl-tst-row--cut")).to_have_count(3, timeout=10000)

    rows(page).nth(3).click()  # Folder B
    button(page, "Paste").click()
    expect(page.locator(".pnl-tst-row--cut")).to_have_count(0, timeout=10000)
    assert shape(table.source) == "b(b1,a(a1,a2))"

    server.stop()


def test_a_copy_fades_nothing(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).first.click()  # Folder A
    button(page, "Copy").click()
    expect(button(page, "Paste")).to_have_attribute("aria-disabled", "false", timeout=10000)
    assert page.locator(".pnl-tst-row--cut").count() == 0

    server.stop()


def test_a_paste_is_undone_in_one_step(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    rows(page).first.click()  # Folder A
    button(page, "Copy").click()
    rows(page).nth(3).click()  # Folder B
    button(page, "Paste").click()
    expect(page.locator(".pnl-tst-row")).to_have_count(8, timeout=10000)

    button(page, "Undo").click()
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])
    assert shape(table.source) == "a(a1,a2),b(b1)"

    server.stop()


# --- the context menu ---------------------------------------------------------
# Opt in, exactly as the toolbar is, and a second route to the same actions rather
# than a second set of them. What is pinned down here is which gestures open it,
# which rows it acts on, that a keyboard can reach and walk it, and that it stays
# inside the window whichever corner it was opened in.


def menu(page: Page):
    return page.locator("[role='menu']")


def menu_items(page: Page):
    return page.locator(".pnl-tst-mitem")


def menu_labels(page: Page) -> list[str]:
    return [text.strip() for text in page.locator(".pnl-tst-mitem .pnl-tst-mlabel").all_text_contents()]


def menu_item(page: Page, label: str):
    return page.locator(f".pnl-tst-mitem:has(.pnl-tst-mlabel:text-is('{label}'))")


def focused_menu_label(page: Page) -> str | None:
    """Label of the focused menu item, through the shadow root."""
    return page.evaluate(
        """() => {
            let element = document.activeElement
            while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement
            return element?.querySelector('.pnl-tst-mlabel')?.textContent.trim() ?? null
        }"""
    )


def test_no_context_menu_by_default(page: Page, port):
    """A table that says nothing about `menu` gains neither a popup nor the promise of one."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    server = serve(table, page, port)

    assert rows(page).first.get_attribute("aria-haspopup") is None

    rows(page).nth(1).click(button="right")
    page.wait_for_timeout(200)
    assert menu(page).count() == 0

    server.stop()


def test_a_right_click_opens_the_menu_with_its_roles(page: Page, port):
    """Roles, names and shortcut hints are the menu's whole accessible contract."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    assert rows(page).first.get_attribute("aria-haspopup") == "menu"

    rows(page).nth(1).click(button="right")  # File A1
    expect(menu(page)).to_have_count(1, timeout=10000)
    assert menu(page).get_attribute("aria-label") == "Row actions"
    assert menu(page).get_attribute("aria-orientation") == "vertical"
    assert menu_labels(page) == [
        "New folder",
        "New file",
        "Rename",
        "Delete",
        "Cut",
        "Copy",
        "Paste",
    ]
    assert menu_items(page).first.get_attribute("role") == "menuitem"
    assert page.locator(".pnl-tst-menu [role='separator']").count() == 2
    assert menu_item(page, "Delete").get_attribute("aria-keyshortcuts") == "Delete"
    # Disabled is announced, never the disabled attribute: the item keeps its place
    # in the roving tabindex so a reader can be told why it does nothing.
    assert menu_item(page, "Paste").get_attribute("aria-disabled") == "true"
    assert menu_item(page, "Delete").get_attribute("aria-disabled") == "false"

    server.stop()


def test_a_left_click_never_opens_the_menu(page: Page, port):
    """The left button selects and drags, so a menu appearing over either would be in the way."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()
    page.wait_for_timeout(200)
    assert menu(page).count() == 0
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    click_row(page, 2, "Control")
    page.wait_for_timeout(200)
    assert menu(page).count() == 0
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    click_row(page, 3, "Shift")
    page.wait_for_timeout(200)
    assert menu(page).count() == 0

    server.stop()


def test_the_menu_acts_on_the_row_it_opened_on(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    rows(page).nth(1).click(button="right")  # File A1
    expect(menu(page)).to_have_count(1, timeout=10000)
    menu_item(page, "Delete").click()

    expect_titles(page, ["Folder A", "File A2", "Folder B", "File B1"])
    assert shape(table.source) == "a(a2),b(b1)"
    # Running an item closes the menu and hands focus back to the grid.
    assert menu(page).count() == 0

    server.stop()


def test_a_right_click_keeps_a_selection_the_menu_opened_inside(page: Page, port):
    """A menu opened on one of two selected rows still deletes two."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    click_row(page, 1, "Control")  # File A1
    click_row(page, 2, "Control")  # File A2
    wait_until(lambda: table.selected_keys == ["a1", "a2"], timeout=10)

    rows(page).nth(2).click(button="right")
    expect(menu(page)).to_have_count(1, timeout=10000)
    menu_item(page, "Delete").click()

    wait_until(lambda: shape(table.source) == "a,b(b1)", timeout=10)
    expect_titles(page, ["Folder A", "Folder B", "File B1"])

    server.stop()


def test_a_right_click_outside_the_selection_takes_the_row_alone(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    click_row(page, 1, "Control")  # File A1
    wait_until(lambda: table.selected_keys == ["a1"], timeout=10)

    rows(page).nth(4).click(button="right")  # File B1, which was not selected
    expect(menu(page)).to_have_count(1, timeout=10000)
    wait_until(lambda: table.selected_keys == ["b1"], timeout=10)
    menu_item(page, "Delete").click()

    wait_until(lambda: shape(table.source) == "a(a1,a2),b", timeout=10)

    server.stop()


def test_the_menu_opens_and_walks_from_the_keyboard(page: Page, port):
    """Shift+F10 and the arrow keys, so the menu is not a pointer-only affordance."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    server = serve(table, page, port)

    rows(page).first.click(button="right")  # Folder A, which opens the menu
    expect(menu(page)).to_have_count(1, timeout=10000)
    page.keyboard.press("Escape")
    expect(menu(page)).to_have_count(0, timeout=10000)
    # Escape hands focus back to the row it came from, so the grid carries on.
    assert focused_title(page) == "Folder A"

    page.keyboard.press("Shift+F10")
    expect(menu(page)).to_have_count(1, timeout=10000)
    assert focused_menu_label(page) == "New folder"

    page.keyboard.press("ArrowDown")
    page.wait_for_timeout(150)
    assert focused_menu_label(page) == "New file"
    page.keyboard.press("End")
    page.wait_for_timeout(150)
    assert focused_menu_label(page) == "Paste"
    page.keyboard.press("Home")
    page.wait_for_timeout(150)
    assert focused_menu_label(page) == "New folder"

    page.keyboard.press("Escape")
    expect(menu(page)).to_have_count(0, timeout=10000)
    assert focused_title(page) == "Folder A"

    server.stop()


def test_the_menu_stays_inside_the_window(page: Page, port):
    """Opened in the far corner it flips rather than running off the screen."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": True},
    )
    page.set_viewport_size({"width": 520, "height": 300})
    server = serve(table, page, port)

    box = rows(page).last.bounding_box()
    assert box
    page.mouse.click(box["x"] + box["width"] - 2, box["y"] + box["height"] - 2, button="right")
    expect(menu(page)).to_have_count(1, timeout=10000)
    page.wait_for_timeout(200)

    placed = menu(page).bounding_box()
    viewport = page.viewport_size
    assert placed and viewport
    assert placed["x"] >= 0
    assert placed["y"] >= 0
    assert placed["x"] + placed["width"] <= viewport["width"] + 1
    assert placed["y"] + placed["height"] <= viewport["height"] + 1

    server.stop()


def test_a_menu_only_action_still_answers_to_its_shortcut(page: Page, port):
    """The two lists together are what a table may do, so a menu alone is a declaration."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "select_mode": "multi", "menu": ["delete"]},
    )
    server = serve(table, page, port)

    assert page.locator("[role='toolbar']").count() == 0

    rows(page).nth(1).click(button="right")  # File A1, which opens the menu
    expect(menu(page)).to_have_count(1, timeout=10000)
    assert menu_labels(page) == ["Delete"]

    page.keyboard.press("Escape")
    expect(menu(page)).to_have_count(0, timeout=10000)
    page.keyboard.press("Delete")

    wait_until(lambda: shape(table.source) == "a(a2),b(b1)", timeout=10)

    server.stop()


def test_the_menu_leaves_the_search_action_out(page: Page, port):
    """A text field is not a command, so an entry naming it is dropped rather than drawn."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"expand_all": True, "menu": ["search", "delete"]},
    )
    server = serve(table, page, port)

    rows(page).nth(1).click(button="right")
    expect(menu(page)).to_have_count(1, timeout=10000)
    assert menu_labels(page) == ["Delete"]
    assert page.locator(".pnl-tst-menu input").count() == 0

    server.stop()


# --- cross-pane transfer ------------------------------------------------------


OTHER = [
    {"key": "x", "title": "Folder X", "children": [{"key": "x1", "title": "File X1"}]},
    {"key": "y", "title": "Folder Y"},
]


def panes(page: Page):
    """The grids on the page, in layout order."""
    return page.locator(".pnl-tst-root")


def pane_rows(page: Page, index: int):
    """Rows of one pane. Each table renders into its own shadow root."""
    return panes(page).nth(index).locator(".pnl-tst-row")


def serve_panes(left: TanstackTable, right: TanstackTable, page: Page, port: int):
    """Serve two tables side by side and wait for both to render."""
    server = start(pn.Row(left, right), page, port)
    expect(panes(page)).to_have_count(2, timeout=15000)
    pane_rows(page, 1).first.wait_for(state="visible", timeout=15000)
    return server


def drag_across(page: Page, src_row, dst_row, modifier: str = "") -> None:
    """Drag a row of one pane onto a row of another.

    This cannot reuse ``drag_row``: its indices address one grid, and the two
    panes here are two pdnd hosts in two shadow roots. ``modifier`` is held down
    over the drop, which is what turns the transfer into a copy.
    """
    src = src_row.bounding_box()
    dst = dst_row.bounding_box()
    assert src and dst

    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2)
    page.mouse.down()
    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2 + 6, steps=2)
    expect(page.locator(".pnl-tst-row--dragging")).to_have_count(1, timeout=2000)
    page.mouse.move(dst["x"] + dst["width"] / 2, dst["y"] + dst["height"] / 2, steps=12)
    page.wait_for_timeout(120)
    if modifier:
        page.keyboard.down(modifier)
    page.mouse.up()
    if modifier:
        page.keyboard.up(modifier)


def test_a_drag_into_the_other_pane_transfers_the_node(page: Page, port):
    """The node leaves one tree and arrives in the other, both rewritten by Python."""
    events = []
    left = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True, "transfer_group": "vfs"},
    )
    right = TanstackTable(
        source=copy.deepcopy(OTHER),
        options={"enable_dnd": True, "expand_all": True, "transfer_group": "vfs"},
        event_callback=lambda name, params: events.append((name, params)),
    )
    server = serve_panes(left, right, page, port)

    drag_across(page, pane_rows(page, 0).nth(1), pane_rows(page, 1).nth(0))  # File A1 onto Folder X

    wait_until(lambda: any(name == "transfer" for name, _ in events), timeout=10)
    assert shape(left.source) == "a(a2),b(b1)"
    assert shape(right.source) == "x(x1,a1),y"
    params = next(params for name, params in events if name == "transfer")
    assert params["applied_keys"] == ["a1"]
    assert params["source_id"] and params["source_id"] != params["target_id"]

    server.stop()


def test_a_pane_outside_the_group_refuses_the_drag(page: Page, port):
    """Opting into nothing accepts nothing, so two unrelated tables stay unrelated."""
    left = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True, "transfer_group": "vfs"},
    )
    right = TanstackTable(source=copy.deepcopy(OTHER), options={"enable_dnd": True, "expand_all": True})
    server = serve_panes(left, right, page, port)

    drag_across(page, pane_rows(page, 0).nth(1), pane_rows(page, 1).nth(0))

    page.wait_for_timeout(400)
    assert shape(left.source) == "a(a1,a2),b(b1)"
    assert shape(right.source) == "x(x1),y"

    server.stop()


def test_holding_control_copies_across_the_panes(page: Page, port):
    """The file manager gesture: the node stays where it was and arrives as well."""
    left = TanstackTable(
        source=copy.deepcopy(SOURCE),
        options={"enable_dnd": True, "expand_all": True, "transfer_group": "vfs"},
    )
    right = TanstackTable(
        source=copy.deepcopy(OTHER),
        options={"enable_dnd": True, "expand_all": True, "transfer_group": "vfs"},
    )
    server = serve_panes(left, right, page, port)

    drag_across(page, pane_rows(page, 0).nth(1), pane_rows(page, 1).nth(0), modifier="Control")

    wait_until(lambda: shape(right.source) == "x(x1,a1),y", timeout=10)
    assert shape(left.source) == "a(a1,a2),b(b1)"

    server.stop()


# --- column sorting -----------------------------------------------------------

# Roots and leaves whose names disagree with the tree order, so a sort has
# something to change and folders-first has something to hold on to.
MIXED = [
    {"key": "a", "title": "Apple", "children": [{"key": "a1", "title": "Yellow"}]},
    {"key": "z", "title": "Zebra", "children": [{"key": "z2", "title": "Beta"}, {"key": "z1", "title": "Alpha"}]},
    {"key": "m", "title": "Middle", "allow_children": False},
]

# Rendered with every branch open and no sort, which none of the three sorted
# orders below happens to match.
MIXED_TITLES = ["Apple", "Yellow", "Zebra", "Beta", "Alpha", "Middle"]


def headers(page: Page):
    return page.locator("[role='columnheader']")


def header(page: Page, label: str):
    return page.locator(f".pnl-tst-hcell:has(.pnl-tst-hlabel:text-is('{label}'))")


def focused_header(page: Page) -> str:
    """Label of the header cell that currently has focus, or None for a row."""
    return page.evaluate(
        """() => {
            let element = document.activeElement
            while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement
            if (!element?.classList.contains('pnl-tst-hcell')) return null
            return element.querySelector('.pnl-tst-hlabel')?.textContent.trim() ?? null
        }"""
    )


def test_sortable_headers_start_at_aria_sort_none(page: Page, port):
    """Sortable columns say `none`, and a treegrid without a sort says it twice."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    assert headers(page).nth(0).get_attribute("aria-sort") == "none"
    assert headers(page).nth(1).get_attribute("aria-sort") == "none"

    server.stop()


def test_clicking_a_header_cycles_the_sort(page: Page, port):
    """Ascending, descending, then back to the order source holds."""
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    assert row_titles(page) == MIXED_TITLES

    header(page, "Name").click()
    expect_titles(page, ["Apple", "Yellow", "Middle", "Zebra", "Alpha", "Beta"])
    assert header(page, "Name").get_attribute("aria-sort") == "ascending"
    # Only ever one column at a time, which is what ARIA asks of aria-sort.
    assert header(page, "Size").get_attribute("aria-sort") == "none"

    header(page, "Name").click()
    expect_titles(page, ["Zebra", "Beta", "Alpha", "Middle", "Apple", "Yellow"])
    assert header(page, "Name").get_attribute("aria-sort") == "descending"

    header(page, "Name").click()
    expect_titles(page, MIXED_TITLES)
    assert header(page, "Name").get_attribute("aria-sort") == "none"

    server.stop()


def test_sorting_reorders_inside_each_parent_only(page: Page, port):
    """A child never climbs out of its branch, however it compares."""
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    header(page, "Name").click()

    # Alpha sorts first of all, and still renders under Zebra where it lives.
    expect_titles(page, ["Apple", "Yellow", "Middle", "Zebra", "Alpha", "Beta"])

    server.stop()


def test_sorting_leaves_the_tree_alone_and_reaches_python(page: Page, port):
    """The row model reorders, source does not, and the sort lands in a param."""
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    header(page, "Name").click()

    wait_until(lambda: table.sorting == [{"id": "title", "desc": False}], timeout=10)
    assert shape(table.source) == "a(a1),z(z2,z1),m"

    server.stop()


def test_a_sort_set_from_python_reaches_the_browser(page: Page, port):
    """Bidirectional, exactly as the filter is."""
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    table.sort_by("title", desc=True)

    expect_titles(page, ["Zebra", "Beta", "Alpha", "Middle", "Apple", "Yellow"])
    assert header(page, "Name").get_attribute("aria-sort") == "descending"

    server.stop()


def test_arrow_up_off_the_first_row_reaches_the_header(page: Page, port):
    """The header is part of the grid, so it costs no extra tab stop."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    assert focused_header(page) == "Name"

    page.keyboard.press("ArrowRight")
    assert focused_header(page) == "Size"

    page.keyboard.press("ArrowLeft")
    assert focused_header(page) == "Name"

    page.keyboard.press("ArrowDown")
    assert focused_header(page) is None
    assert focused_title(page) == "Folder A"

    server.stop()


def test_the_grid_keeps_one_tab_stop_with_the_header_focused(page: Page, port):
    """Either a row is tabbable or a header cell is, never both."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-grid [tabindex='0']").count() == 1

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")

    assert page.locator(".pnl-tst-grid [tabindex='0']").count() == 1
    assert page.locator(".pnl-tst-hcell[tabindex='0']").count() == 1

    server.stop()


def test_enter_and_space_sort_from_the_header(page: Page, port):
    """A sort a pointer alone could reach is the gap this panel exists to close."""
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("Enter")

    expect(header(page, "Name")).to_have_attribute("aria-sort", "ascending", timeout=10000)

    page.keyboard.press(" ")
    expect(header(page, "Name")).to_have_attribute("aria-sort", "descending", timeout=10000)

    server.stop()


def test_a_column_can_opt_out_of_sorting(page: Page, port):
    """No aria-sort at all, because there is no sort control to describe."""
    columns = [{"id": "title", "header": "Name"}, {"id": "size", "header": "Size", "sortable": False}]
    table = TanstackTable(source=copy.deepcopy(MIXED), columns=columns, options={"expand_all": True})
    server = serve(table, page, port)

    assert headers(page).nth(0).get_attribute("aria-sort") == "none"
    assert headers(page).nth(1).get_attribute("aria-sort") is None

    header(page, "Size").click()
    page.wait_for_timeout(200)
    assert table.sorting == []

    server.stop()


def test_sorting_can_be_turned_off_for_the_whole_table(page: Page, port):
    """A view only treegrid keeps its header inert."""
    table = TanstackTable(
        source=copy.deepcopy(MIXED),
        columns=COLUMNS,
        options={"expand_all": True, "sortable": False},
    )
    server = serve(table, page, port)

    assert headers(page).nth(0).get_attribute("aria-sort") is None

    header(page, "Name").click()
    page.wait_for_timeout(200)
    assert table.sorting == []
    assert row_titles(page) == MIXED_TITLES

    server.stop()


def test_folders_first_holds_through_a_descending_sort(page: Page, port):
    """Branches above leaves whichever way the column itself is sorted."""
    table = TanstackTable(
        source=copy.deepcopy(MIXED),
        columns=COLUMNS,
        options={"expand_all": True, "sort_folders_first": True},
    )
    server = serve(table, page, port)

    # Middle is the one node that refuses children, so it is the one leaf.
    header(page, "Name").click()
    expect_titles(page, ["Apple", "Yellow", "Zebra", "Alpha", "Beta", "Middle"])

    header(page, "Name").click()
    expect_titles(page, ["Zebra", "Beta", "Alpha", "Apple", "Yellow", "Middle"])

    server.stop()


def test_searching_a_sorted_table_stays_sorted(page: Page, port):
    """The filter reads the sorted model, not the one upstream of the sort."""
    table = TanstackTable(
        source=copy.deepcopy(MIXED),
        columns=COLUMNS,
        options={"expand_all": True, "toolbar": ["search"]},
    )
    server = serve(table, page, port)

    header(page, "Name").click()
    expect_titles(page, ["Apple", "Yellow", "Middle", "Zebra", "Alpha", "Beta"])

    # Apple, Yellow, Middle and Alpha match, and Zebra is kept as Alpha's path.
    # Unsorted the same four would read Apple, Yellow, Zebra, Alpha, Middle.
    page.locator(".pnl-tst-search input").fill("l")
    expect_titles(page, ["Apple", "Yellow", "Middle", "Zebra", "Alpha"])

    server.stop()


def test_move_up_and_down_are_disabled_while_sorted(page: Page, port):
    """Swapping two siblings changes nothing anyone can see under a sort."""
    table = TanstackTable(
        source=copy.deepcopy(MIXED),
        columns=COLUMNS,
        options={"expand_all": True, "toolbar": ["move-up", "move-down", "indent", "outdent"]},
    )
    server = serve(table, page, port)

    # Beta, which has a sibling after it and a parent to step out of.
    click_row(page, 3)
    expect(button(page, "Move down")).to_have_attribute("aria-disabled", "false", timeout=10000)

    header(page, "Name").click()

    expect(button(page, "Move up")).to_have_attribute("aria-disabled", "true", timeout=10000)
    assert button(page, "Move down").get_attribute("aria-disabled") == "true"
    # Reparenting still means what it says, so these two stay available.
    assert button(page, "Outdent").get_attribute("aria-disabled") == "false"

    server.stop()


def test_a_reorder_drop_is_blocked_while_sorted(page: Page, port):
    """The row would land back where the sort puts it, so the drop says no."""
    table = TanstackTable(
        source=copy.deepcopy(MIXED),
        columns=COLUMNS,
        options={"expand_all": True, "enable_dnd": True},
    )
    server = serve(table, page, port)

    header(page, "Name").click()
    expect_titles(page, ["Apple", "Yellow", "Middle", "Zebra", "Alpha", "Beta"])

    # Apple onto the top band of Zebra, which unsorted would be a reorder.
    drag_row(page, 0, 3, y_frac=0.1, expect_blocked=True)

    page.wait_for_timeout(400)
    assert shape(table.source) == "a(a1),z(z2,z1),m"

    server.stop()


# --- column sizing ------------------------------------------------------------

# The keyboard step in TanstackTable.vue, so a nudge can be asserted in pixels
# rather than as "wider than before".
RESIZE_STEP = 16


def header_width(page: Page, label: str) -> float:
    """Rendered width of a header cell, padding included.

    Every element in the panel inherits ``box-sizing: border-box``, so this is the
    same number ``column.getSize()`` holds rather than that number minus padding.
    """
    box = header(page, label).bounding_box()
    assert box
    return box["width"]


def expect_width(page: Page, label: str, px: float, tol: float = 2) -> None:
    """Wait for a column to render *px* wide, within a pixel or two of rounding."""
    wait_until(lambda: abs(header_width(page, label) - px) <= tol, timeout=10)


def handle(page: Page, label: str):
    return header(page, label).locator(".pnl-tst-resize")


def drag_handle(page: Page, label: str, dx: float) -> None:
    """Drag a column's resize handle *dx* pixels sideways and release.

    The resize is committed on every frame, and TanStack throttles those into an
    animation frame, so the pointer settles on the far end before the button comes
    back up or the released width is one frame stale.
    """
    box = handle(page, label).bounding_box()
    assert box

    x = box["x"] + box["width"] / 2
    y = box["y"] + box["height"] / 2
    page.mouse.move(x, y)
    page.mouse.down()
    page.mouse.move(x + dx, y, steps=8)
    page.wait_for_timeout(120)
    page.mouse.up()


def test_declared_widths_render_and_the_tree_column_takes_the_slack(page: Page, port):
    """A sized column gets what it asked for and the first one gets the rest.

    The table is given a width, because a panel left to size itself is exactly as
    wide as its columns and then there is no slack for anything to take.
    """
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True}, width=520)
    server = serve(table, page, port)

    expect_width(page, "Size", 90)
    # 150 is what the tree column asked for by saying nothing, and the other 280
    # pixels are the slack: flex-grow on that column and a fixed basis on the rest.
    expect_width(page, "Name", 520 - 90)

    row = page.locator(".pnl-tst-hrow").bounding_box()
    assert row
    assert abs(header_width(page, "Name") + header_width(page, "Size") - row["width"]) <= 2

    # Body cells read the same custom properties, so a column is one column wide
    # from the header down.
    cell = rows(page).nth(0).locator(".pnl-tst-cell").nth(1).bounding_box()
    assert cell
    assert abs(cell["width"] - 90) <= 2

    server.stop()


def test_dragging_the_handle_resizes_and_reaches_python(page: Page, port):
    """The drag is the gesture, and the settled width is what Python is told."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    drag_handle(page, "Size", 60)

    expect_width(page, "Size", 150)
    wait_until(lambda: table.column_widths.get("size") == 150, timeout=10)
    # A width is not a sort: the handle stops the click that carries it.
    assert table.sorting == []

    server.stop()


def test_dragging_the_tree_column_moves_the_divider_it_grabbed(page: Page, port):
    """The column that takes the slack has to resize from the width it shows.

    It renders at 430 while storing the 150 its def asks for, so a drag that read
    the stored width would snap the divider 280 pixels away from the pointer that
    grabbed it. This is the handle a user of the example actually reaches for: it
    sits between the two headers, not out at the right edge.
    """
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True}, width=520)
    server = serve(table, page, port)

    expect_width(page, "Name", 430)

    drag_handle(page, "Name", -120)

    expect_width(page, "Name", 310)
    # The neighbour keeps what it declared: a drag moves one divider, and the
    # space the tree column gave up is left over rather than handed on.
    expect_width(page, "Size", 90)
    wait_until(lambda: table.column_widths.get("title") == 310, timeout=10)

    server.stop()


def test_the_keyboard_resizes_the_tree_column_from_what_it_shows(page: Page, port):
    """Same width, same arithmetic, whichever way the column is sized."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True}, width=520)
    server = serve(table, page, port)

    expect_width(page, "Name", 430)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    assert focused_header(page) == "Name"

    page.keyboard.press("Alt+ArrowLeft")
    expect_width(page, "Name", 430 - RESIZE_STEP)
    wait_until(lambda: table.column_widths.get("title") == 430 - RESIZE_STEP, timeout=10)

    server.stop()


def test_resetting_the_tree_column_gives_the_slack_back(page: Page, port):
    """Growing again is what dropping out of the sizing map means."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True}, width=520)
    server = serve(table, page, port)

    expect_width(page, "Name", 430)
    drag_handle(page, "Name", -120)
    expect_width(page, "Name", 310)

    handle(page, "Name").dblclick()

    expect_width(page, "Name", 430)
    wait_until(lambda: table.column_widths == {}, timeout=10)

    server.stop()


def test_alt_arrows_resize_the_focused_header(page: Page, port):
    """The resize a pointer alone could reach is the gap this panel exists to close."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("ArrowRight")
    assert focused_header(page) == "Size"

    page.keyboard.press("Alt+ArrowRight")
    expect_width(page, "Size", 90 + RESIZE_STEP)
    wait_until(lambda: table.column_widths.get("size") == 90 + RESIZE_STEP, timeout=10)

    page.keyboard.press("Alt+ArrowLeft")
    expect_width(page, "Size", 90)

    # The header keeps the focus it started with, so the next press lands here too.
    assert focused_header(page) == "Size"
    assert headers(page).nth(1).get_attribute("aria-keyshortcuts") == "Alt+ArrowLeft Alt+ArrowRight Alt+Home"

    server.stop()


def test_min_and_max_width_clamp_a_resize(page: Page, port):
    """The bounds are the column's own, and a nudge stops at them rather than past."""
    columns = [
        {"id": "title", "header": "Name"},
        {"id": "size", "header": "Size", "width": 90, "min_width": 80, "max_width": 100},
    ]
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=columns, options={"expand_all": True})
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("ArrowRight")

    # 90 + 16 is 106, which the column refuses.
    page.keyboard.press("Alt+ArrowRight")
    expect_width(page, "Size", 100)
    page.keyboard.press("Alt+ArrowRight")
    expect_width(page, "Size", 100)

    page.keyboard.press("Alt+ArrowLeft")
    expect_width(page, "Size", 84)
    page.keyboard.press("Alt+ArrowLeft")
    expect_width(page, "Size", 80)

    wait_until(lambda: table.column_widths.get("size") == 80, timeout=10)

    server.stop()


def test_alt_home_and_a_double_click_both_reset_a_width(page: Page, port):
    """Two ways back to the declared width, and both empty the map in Python."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("ArrowRight")
    page.keyboard.press("Alt+ArrowRight")
    expect_width(page, "Size", 90 + RESIZE_STEP)

    page.keyboard.press("Alt+Home")
    expect_width(page, "Size", 90)
    # Reset drops the key rather than writing the declared width back into it.
    wait_until(lambda: table.column_widths == {}, timeout=10)

    drag_handle(page, "Size", 60)
    expect_width(page, "Size", 150)

    handle(page, "Size").dblclick()
    expect_width(page, "Size", 90)
    wait_until(lambda: table.column_widths == {}, timeout=10)

    server.stop()


def test_a_width_set_from_python_reaches_the_browser(page: Page, port):
    """Bidirectional, exactly as the sort is."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    table.set_column_width("size", 200)
    expect_width(page, "Size", 200)

    table.reset_column_width("size")
    expect_width(page, "Size", 90)

    server.stop()


def test_a_resized_column_keeps_its_width_through_a_source_rewrite(page: Page, port):
    """Python replacing the tree is not the user asking for a different width."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True})
    server = serve(table, page, port)

    drag_handle(page, "Size", 60)
    expect_width(page, "Size", 150)
    # The width is on screen the moment the drag moves and reaches Python a round
    # trip later, so the rewrite has to come after the round trip to be testing
    # anything: rewriting first would race the push rather than the reset.
    wait_until(lambda: table.column_widths.get("size") == 150, timeout=10)

    table.rename_node("a", "Renamed")
    expect_titles(page, ["Renamed", "File A1", "File A2", "Folder B", "File B1"])

    expect_width(page, "Size", 150)
    assert table.column_widths == {"size": 150}

    server.stop()


def test_a_column_can_opt_out_of_resizing(page: Page, port):
    """No handle and no shortcut on that column, and its neighbour keeps both."""
    columns = [
        {"id": "title", "header": "Name"},
        {"id": "size", "header": "Size", "width": 90, "resizable": False},
    ]
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=columns, options={"expand_all": True})
    server = serve(table, page, port)

    assert handle(page, "Name").count() == 1
    assert handle(page, "Size").count() == 0
    assert headers(page).nth(1).get_attribute("aria-keyshortcuts") is None

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("ArrowRight")
    page.keyboard.press("Alt+ArrowRight")

    page.wait_for_timeout(200)
    assert table.column_widths == {}
    assert abs(header_width(page, "Size") - 90) <= 2

    server.stop()


def test_resizing_can_be_turned_off_for_the_whole_table(page: Page, port):
    """A table whose layout is the application's business keeps its headers inert."""
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=COLUMNS,
        options={"expand_all": True, "resizable": False},
    )
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-resize").count() == 0
    assert headers(page).nth(0).get_attribute("aria-keyshortcuts") is None

    rows(page).nth(0).focus()
    page.keyboard.press("ArrowUp")
    page.keyboard.press("Alt+ArrowRight")

    page.wait_for_timeout(200)
    assert table.column_widths == {}
    # Sorting is a separate opt-out, so the header still does its other job.
    header(page, "Name").click()
    wait_until(lambda: table.sorting == [{"id": "title", "desc": False}], timeout=10)

    server.stop()


def test_a_wide_column_scrolls_the_header_with_the_rows(page: Page, port):
    """The scroller is the grid, so a sticky header cannot drift off its columns."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), columns=COLUMNS, options={"expand_all": True}, width=520)
    server = serve(table, page, port)

    grid = page.locator(".pnl-tst-grid")

    # 800 plus the tree column's own 150 against a 520 pixel panel.
    table.set_column_width("size", 800)
    expect_width(page, "Size", 800)

    # Wider than the panel, so the grid scrolls sideways rather than squeezing a
    # column somebody sized down to fit.
    assert grid.evaluate("element => element.scrollWidth > element.clientWidth")

    grid.evaluate("element => { element.scrollLeft = 120 }")
    page.wait_for_timeout(100)
    assert grid.evaluate("element => element.scrollLeft") == 120

    head = page.locator(".pnl-tst-hcell").first.bounding_box()
    cell = rows(page).nth(0).locator(".pnl-tst-cell").first.bounding_box()
    assert head and cell
    assert abs(head["x"] - cell["x"]) <= 2

    server.stop()


# --- node types ----------------------------------------------------------------
#
# A node names a type and the browser resolves it as it renders, so fields a tree
# of a thousand files would otherwise repeat cross the socket once. Nothing is
# written back into `source`, which is what makes the saving real.

TYPES = {
    "file": {"icon": "markdown", "allow_children": False, "class": "row-file"},
    "folder": {"icon": "folder", "class": "row-folder"},
}

TYPED_SOURCE = [
    {
        "key": "docs",
        "title": "Docs",
        "type": "folder",
        "children": [
            {"key": "md", "title": "notes.md", "type": "file"},
            {"key": "own", "title": "logo.png", "type": "file", "icon": "image", "class": "row-picked"},
            {"key": "loud", "title": "Inbox", "type": "file", "allow_children": True},
        ],
    },
    # Untyped, and carrying by hand exactly what the folder type carries, which is
    # what lets the two rows be compared glyph for glyph.
    {"key": "plain", "title": "Plain", "icon": "folder", "children": []},
]


def typed_table(columns=None, **options) -> TanstackTable:
    return TanstackTable(
        source=copy.deepcopy(TYPED_SOURCE),
        columns=columns or [],
        types=copy.deepcopy(TYPES),
        options={"expand_all": True, "enable_dnd": True, **options},
    )


def test_a_row_draws_the_icon_its_type_names(page: Page, port):
    table = typed_table()
    server = serve(table, page, port)

    # Row 0 takes the folder glyph from its type, row 4 carries it by hand.
    assert row_icon(page, 0) == row_icon(page, 4)
    # And the node's own icon still wins over the one its type names.
    assert row_icon(page, 2) != row_icon(page, 1)

    server.stop()


def row_classes(page: Page, index: int) -> list[str]:
    return str(rows(page).nth(index).get_attribute("class") or "").split()


def test_a_row_carries_the_class_its_type_names(page: Page, port):
    """Which is how a kind of row is made visible without an icon."""
    table = typed_table()
    server = serve(table, page, port)

    assert "row-folder" in row_classes(page, 0)
    assert "row-file" in row_classes(page, 1)
    # The node's own class wins, exactly as its own icon does.
    assert "row-picked" in row_classes(page, 2)
    assert "row-file" not in row_classes(page, 2)
    # And an untyped row is left with the panel's own classes alone.
    assert all(name.startswith("pnl-tst-") for name in row_classes(page, 4))

    server.stop()


def test_a_typed_leaf_refuses_a_drop_into_it(page: Page, port):
    """`allow_children` read through the type refuses the drop the flag refuses."""
    table = typed_table()
    server = serve(table, page, port)

    drag_row(page, 4, 1, y_frac=0.5, expect_blocked=True)

    page.wait_for_timeout(400)
    assert shape(table.source) == "docs(md,own,loud),plain"

    server.stop()


def test_a_node_may_take_children_its_type_refuses(page: Page, port):
    table = typed_table()
    server = serve(table, page, port)

    drag_row(page, 4, 3, y_frac=0.5)

    wait_until(lambda: shape(table.source) == "docs(md,own,loud(plain))", timeout=10)

    server.stop()


def test_folders_first_reads_the_type(page: Page, port):
    """A typed leaf sorts below a branch, the way a node carrying the flag does."""
    table = typed_table(columns=COLUMNS, sort_folders_first=True)
    server = serve(table, page, port)

    header(page, "Name").click()
    # Inbox takes children despite its type, so it sorts with the folders.
    expect_titles(page, ["Docs", "Inbox", "logo.png", "notes.md", "Plain"])

    server.stop()


def test_a_type_written_from_python_reaches_the_browser(page: Page, port):
    table = typed_table()
    server = serve(table, page, port)

    folder_icon = row_icon(page, 0)
    assert row_icon(page, 1) != folder_icon

    table.set_type("file", {"icon": "folder", "allow_children": False, "class": "row-file"})

    wait_until(lambda: row_icon(page, 1) == folder_icon, timeout=10)

    server.stop()


def test_a_type_never_reaches_the_tree_it_describes(page: Page, port):
    """Both sides resolve as they read, so `source` keeps the type name alone."""
    table = typed_table()
    server = serve(table, page, port)

    drag_row(page, 1, 4, y_frac=0.5)
    wait_until(lambda: shape(table.source) == "docs(own,loud),plain(md)", timeout=10)

    assert node_at(table.source, "md") == {"key": "md", "title": "notes.md", "type": "file"}

    server.stop()


# --- row virtualisation -------------------------------------------------------

# The CSS token in tanstack_table.css, which the row window is arithmetic over.
ROW_PX = 28


def flat_source(count: int) -> list[dict]:
    """A tree of *count* rows at one level, which is the shape a window is over."""
    return [{"key": f"n{index}", "title": f"node {index:04d}"} for index in range(count)]


def grid(page: Page):
    return page.locator(".pnl-tst-grid")


def rendered_indices(page: Page) -> list[int]:
    """``aria-rowindex`` of every row in the DOM, which is its place in the tree."""
    return [
        int(value) for value in rows(page).evaluate_all("list => list.map((el) => el.getAttribute('aria-rowindex'))")
    ]


def scroll_to(page: Page, top: float) -> None:
    grid(page).evaluate("(element, top) => { element.scrollTop = top }", top)


def test_only_a_screenful_of_rows_is_in_the_dom(page: Page, port):
    """Five hundred rows, a three hundred pixel viewport, and a handful rendered.

    The grid is given a height because that is what makes a viewport: a table left
    to size itself measures one as tall as its content, which is the case the next
    test covers.
    """
    table = TanstackTable(source=flat_source(500), height=300)
    server = serve(table, page, port)

    # Eleven rows fit, and the overscan renders six more at each end.
    wait_until(lambda: rows(page).count() < 40, timeout=10)
    assert rows(page).count() > 10

    # The grid still reports the whole tree, which is what a screen reader reads
    # and the one thing virtualisation must not take away.
    assert grid(page).get_attribute("aria-rowcount") == "500"
    assert rendered_indices(page)[0] == 1

    # The scrollbar is the length of every row there is, not of the rendered few.
    assert grid(page).evaluate("element => element.scrollHeight") == 500 * ROW_PX

    server.stop()


def test_a_table_that_sizes_itself_renders_every_row(page: Page, port):
    """No height, no viewport, no window: the same formula names every row."""
    table = TanstackTable(source=flat_source(60))
    server = serve(table, page, port)

    wait_until(lambda: rows(page).count() == 60, timeout=10)
    assert rendered_indices(page) == list(range(1, 61))

    server.stop()


def test_scrolling_moves_the_window(page: Page, port):
    """What leaves the viewport leaves the DOM, and its index goes with it."""
    table = TanstackTable(source=flat_source(500), height=300)
    server = serve(table, page, port)

    wait_until(lambda: rows(page).count() < 40, timeout=10)
    assert row_titles(page)[0] == "node 0000"

    scroll_to(page, 200 * ROW_PX)

    wait_until(lambda: rendered_indices(page)[-1] > 200, timeout=10)
    # Nothing has been focused, so the tab stop is still the first row and it is
    # rendered wherever the window has gone. The window itself is what follows it.
    indices = rendered_indices(page)
    assert indices[0] == 1
    window = indices[1:]
    # The index is the row's place in the tree rather than its place in the DOM,
    # so a reader landing here is told which of the five hundred this is.
    assert window[0] > 180
    assert window == list(range(window[0], window[0] + len(window)))
    assert "node 0001" not in row_titles(page)
    assert "node 0200" in row_titles(page)

    server.stop()


def test_the_keyboard_reaches_a_row_outside_the_window(page: Page, port):
    """`End` on five hundred rows lands on the last one, which was never rendered.

    Focus is the whole of the problem virtualisation creates: the row a key press
    names has no element until the window is moved onto it first.
    """
    table = TanstackTable(source=flat_source(500), height=300)
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    page.keyboard.press("End")

    wait_until(lambda: focused_title(page) == "node 0499", timeout=10)
    assert rendered_indices(page)[-1] == 500
    # Still a window, so getting there did not render the four hundred it passed.
    assert rows(page).count() < 40

    page.keyboard.press("Home")

    wait_until(lambda: focused_title(page) == "node 0000", timeout=10)
    assert rendered_indices(page)[0] == 1

    server.stop()


def test_a_range_selection_spans_rows_that_were_never_rendered(page: Page, port):
    """Shift click across a window, and the rows in between come with it.

    The range is taken over the row model rather than over the DOM, so the four
    hundred and ninety eight rows the scroll went past are selected without ever
    having been rendered.
    """
    table = TanstackTable(source=flat_source(500), height=300, options={"select_mode": "multi"})
    server = serve(table, page, port)

    rows(page).nth(0).click()
    wait_until(lambda: table.selected_keys == ["n0"], timeout=10)

    scroll_to(page, 500 * ROW_PX)
    wait_until(lambda: "node 0499" in row_titles(page), timeout=10)

    rows(page).last.click(modifiers=["Shift"])

    wait_until(lambda: len(table.selected_keys) == 500, timeout=10)
    assert rows(page).count() < 40

    server.stop()


def test_the_grid_keeps_its_tab_stop_when_the_window_moves_away(page: Page, port):
    """A roving tabindex on a row that is not in the DOM is no tab stop at all."""
    table = TanstackTable(source=flat_source(500), height=300)
    server = serve(table, page, port)

    rows(page).nth(0).click()
    wait_until(lambda: focused_title(page) == "node 0000", timeout=10)

    scroll_to(page, 300 * ROW_PX)
    wait_until(lambda: rendered_indices(page)[-1] > 300, timeout=10)

    # Exactly one, and it is the row the keyboard would carry on from.
    tab_stop = page.locator(".pnl-tst-row[tabindex='0']")
    assert tab_stop.count() == 1
    assert tab_stop.get_attribute("aria-rowindex") == "1"
    # Still a window, not the whole tree dragged along behind the tab stop.
    assert rows(page).count() < 40

    # Every rendered row sits where its index says, the held one included, so it is
    # scrolled out of sight rather than laid over the rows that are on screen.
    offsets = rows(page).evaluate_all(
        "list => list.map((el) => [Number(el.getAttribute('aria-rowindex')), el.offsetTop])"
    )
    assert offsets == [[index, (index - 1) * ROW_PX] for index, _ in offsets]

    server.stop()


def test_the_keyboard_survives_a_scroll_away_from_the_focused_row(page: Page, port):
    """Scrolling must not take the keyboard with it.

    A focused element that leaves the DOM hands focus back to the document, and
    every key press after that lands nowhere: the grid is left inert until a
    pointer rescues it.
    """
    table = TanstackTable(source=flat_source(500), height=300)
    server = serve(table, page, port)

    rows(page).nth(0).focus()
    wait_until(lambda: focused_title(page) == "node 0000", timeout=10)

    scroll_to(page, 300 * ROW_PX)
    wait_until(lambda: rendered_indices(page)[-1] > 300, timeout=10)

    page.keyboard.press("ArrowDown")

    wait_until(lambda: focused_title(page) == "node 0001", timeout=10)

    server.stop()


# --- lazy children ---


LAZY_SOURCE = [
    {"key": "docs", "title": "docs", "lazy": True},
    {"key": "readme", "title": "readme.md", "allow_children": False},
]


def twisty(page: Page, title: str):
    return rows(page).filter(has_text=title).first.locator(".pnl-tst-twisty").first


def test_a_lazy_branch_shows_a_twisty_although_it_holds_nothing(page: Page, port):
    table = TanstackTable(source=LAZY_SOURCE)
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    # Expandable although the row model can see no children, and a real leaf is not.
    expect(rows(page).nth(0)).to_have_attribute("aria-expanded", "false")
    assert rows(page).nth(1).get_attribute("aria-expanded") is None

    server.stop()


def test_expanding_a_lazy_branch_asks_python_and_shows_what_comes_back(page: Page, port):
    table = TanstackTable(
        source=LAZY_SOURCE,
        lazy_callback=lambda key, node: [{"key": "a", "title": "a.md", "allow_children": False}],
    )
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    twisty(page, "docs").click()

    # The branch is expanded as it asks, so the children appear without a second
    # click, and the flag is gone so it never asks again.
    wait_until(lambda: row_titles(page) == ["docs", "a.md", "readme.md"], timeout=10)
    expect(rows(page).nth(0)).to_have_attribute("aria-expanded", "true")
    assert rows(page).nth(0).get_attribute("aria-busy") is None

    server.stop()


def test_a_branch_waiting_on_its_children_reads_as_busy(page: Page, port):
    """The callback answers None, so the load is still on its way."""
    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=lambda key, node: None)
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    twisty(page, "docs").click()

    wait_until(lambda: rows(page).nth(0).get_attribute("aria-busy") == "true", timeout=10)

    # Answering later clears it, which is the path a network call takes.
    table.set_children("docs", [{"key": "a", "title": "a.md"}])
    wait_until(lambda: row_titles(page) == ["docs", "a.md", "readme.md"], timeout=10)
    assert rows(page).nth(0).get_attribute("aria-busy") is None

    server.stop()


def test_the_keyboard_loads_a_lazy_branch_too(page: Page, port):
    asked = []

    def load(key, node):
        asked.append(key)
        return [{"key": "a", "title": "a.md"}]

    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=load)
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    rows(page).nth(0).focus()
    page.keyboard.press("ArrowRight")

    wait_until(lambda: row_titles(page) == ["docs", "a.md", "readme.md"], timeout=10)
    assert asked == ["docs"]

    # ArrowLeft closes it again rather than stepping out, which needs the branch to
    # count as expandable through the loaded children.
    page.keyboard.press("ArrowLeft")
    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)

    server.stop()


def test_a_branch_is_asked_for_its_children_once(page: Page, port):
    asked = []

    def load(key, node):
        asked.append(key)
        return [{"key": "a", "title": "a.md"}]

    table = TanstackTable(source=LAZY_SOURCE, lazy_callback=load)
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    twisty(page, "docs").click()
    wait_until(lambda: row_titles(page) == ["docs", "a.md", "readme.md"], timeout=10)
    twisty(page, "docs").click()
    wait_until(lambda: row_titles(page) == ["docs", "readme.md"], timeout=10)
    twisty(page, "docs").click()
    wait_until(lambda: row_titles(page) == ["docs", "a.md", "readme.md"], timeout=10)

    assert asked == ["docs"]

    server.stop()


def test_a_table_with_no_lazy_node_is_untouched(page: Page, port):
    """The flag is opt in, so an ordinary tree never emits the intent."""
    seen = []
    table = TanstackTable(source=SOURCE, event_callback=lambda name, params: seen.append(name))
    server = serve(table, page, port)

    wait_until(lambda: len(row_titles(page)) > 0, timeout=10)
    rows(page).nth(0).focus()
    page.keyboard.press("ArrowRight")

    wait_until(lambda: len(row_titles(page)) > 1, timeout=10)
    assert "lazy_load" not in seen

    server.stop()


# --- pruning the wire ---


PRUNE_SOURCE = [
    {
        "key": "src",
        "title": "src",
        "children": [
            {"key": "app", "title": "app.py", "allow_children": False},
            {"key": "util", "title": "util.py", "allow_children": False},
        ],
    },
    {"key": "docs", "title": "docs", "children": [{"key": "guide", "title": "guide.md", "allow_children": False}]},
]


def pruned_table(**options):
    return TanstackTable(
        source=copy.deepcopy(PRUNE_SOURCE),
        options={"prune": "collapsed", **options},
    )


def test_a_pruned_table_opens_with_the_roots_alone(page: Page, port):
    table = pruned_table()
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)
    # Twisties all the same, because a pruned branch is a lazy one to this side.
    expect(rows(page).nth(0)).to_have_attribute("aria-expanded", "false")
    expect(rows(page).nth(1)).to_have_attribute("aria-expanded", "false")
    # And the tree Python owns never lost anything.
    assert shape(table.source) == "src(app,util),docs(guide)"

    server.stop()


def test_expanding_a_pruned_branch_fills_it_without_any_callback(page: Page, port):
    """The children were in `source` all along, only left off the wire."""
    table = pruned_table()
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)
    twisty(page, "src").click()

    wait_until(lambda: row_titles(page) == ["src", "app.py", "util.py", "docs"], timeout=10)
    expect(rows(page).nth(0)).to_have_attribute("aria-expanded", "true")

    server.stop()


def test_collapsing_a_loaded_branch_does_not_send_it_again(page: Page, port):
    """The wire is paid once per branch, so the second expand is a plain toggle."""
    table = pruned_table()
    seen = []
    table._event_callback = lambda name, params: seen.append(name)
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)
    twisty(page, "src").click()
    wait_until(lambda: row_titles(page) == ["src", "app.py", "util.py", "docs"], timeout=10)
    twisty(page, "src").click()
    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)
    twisty(page, "src").click()
    wait_until(lambda: row_titles(page) == ["src", "app.py", "util.py", "docs"], timeout=10)

    assert seen.count("lazy_load") == 1

    server.stop()


def test_a_search_reaches_a_branch_the_browser_never_held(page: Page, port):
    table = TanstackTable(
        source=copy.deepcopy(PRUNE_SOURCE),
        options={"prune": "collapsed", "toolbar": True},
    )
    server = serve(table, page, port)

    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)
    page.locator(".pnl-tst-search input").fill("guide")

    # Python widens the view to the path of the match, and the browser's own
    # filter then does what it has always done with what it holds.
    wait_until(lambda: row_titles(page) == ["docs", "guide.md"], timeout=10)

    page.locator(".pnl-tst-search input").fill("")
    wait_until(lambda: row_titles(page) == ["src", "docs"], timeout=10)

    server.stop()


def test_the_search_box_tells_python_once_the_typing_settles(page: Page, port):
    """Each value that crosses is a tree rebuilt and pushed, so a term typed a
    letter at a time must not ask for the search five times over."""
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True, "toolbar": True})
    seen = []
    table.param.watch(lambda event: seen.append(event.new), ["filter_text"])
    server = serve(table, page, port)

    wait_until(lambda: len(row_titles(page)) == 5, timeout=10)
    page.locator(".pnl-tst-search input").press_sequentially("File", delay=20)

    # The rows narrow on the keystroke, without waiting for the round trip.
    expect_titles(page, ["Folder A", "File A1", "File A2", "Folder B", "File B1"])
    wait_until(lambda: table.filter_text == "File", timeout=10)
    assert len(seen) == 1

    server.stop()


# Editable columns. The title has had an editor since P9d; what is pinned down here
# is that any column can have one, that Tab walks between them, and that a value
# Python refused comes back rather than being lost.

EDIT_SOURCE = [
    {
        "key": "a",
        "title": "Folder A",
        "children": [
            {"key": "a1", "title": "File A1", "size": "1 kB", "owner": "ada"},
            {"key": "a2", "title": "File A2", "size": "2 kB", "owner": "linus"},
        ],
    },
]

EDIT_COLUMNS = [
    {"id": "title", "header": "Name"},
    {"id": "size", "header": "Size", "width": 90, "editable": True},
    {"id": "owner", "header": "Owner", "width": 90, "editable": True},
    {"id": "locked", "header": "Locked", "field": "size", "width": 90},
]


def editable_table(action_callback=None, **options) -> TanstackTable:
    return TanstackTable(
        source=copy.deepcopy(EDIT_SOURCE),
        columns=copy.deepcopy(EDIT_COLUMNS),
        options={"expand_all": True, **options},
        action_callback=action_callback,
    )


def cell(page: Page, row_index: int, cell_index: int):
    return rows(page).nth(row_index).locator(".pnl-tst-cell").nth(cell_index)


def field_of(table: TanstackTable, key: str, field: str):
    return node_at(table.source, key).get(field)


def test_double_click_opens_an_editor_on_an_editable_cell(page: Page, port):
    """A single click selects and starts a drag, so opening on one would be in the
    way of both."""
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()  # the Size of File A1

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).input_value() == "1 kB"
    # Named for the column and the row, so a reader hears which value is open.
    assert editor(page).get_attribute("aria-label") == "Size of File A1"
    # The treegrid is unchanged while the editor is in it.
    assert rows(page).nth(1).locator("[role='gridcell']").count() == 4
    wait_until(lambda: (table.editing_key, table.editing_column) == ("a1", "size"), timeout=10)

    server.stop()


def test_double_click_on_a_column_that_is_not_editable_opens_nothing(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 3).dblclick()  # Locked, which declares no editor

    page.wait_for_timeout(300)
    expect(editor(page)).to_have_count(0)

    server.stop()


def test_an_edit_commits_on_enter_and_python_writes_it(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("9 kB")
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(table, "a1", "size") == "9 kB", timeout=10)
    expect(editor(page)).to_have_count(0)
    wait_until(lambda: (table.editing_key, table.editing_column) == ("", ""), timeout=10)
    # Focus comes back to the row, so the next key press acts on it.
    wait_until(lambda: focused_title(page) == "File A1", timeout=10)

    server.stop()


def test_an_edit_commits_on_blur(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("9 kB")
    rows(page).nth(2).click()

    wait_until(lambda: field_of(table, "a1", "size") == "9 kB", timeout=10)
    expect(editor(page)).to_have_count(0)

    server.stop()


def test_escape_leaves_a_cell_without_writing_it(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("9 kB")
    page.keyboard.press("Escape")

    expect(editor(page)).to_have_count(0, timeout=10000)
    assert field_of(table, "a1", "size") == "1 kB"
    wait_until(lambda: focused_title(page) == "File A1", timeout=10)

    server.stop()


def test_f2_opens_the_first_editable_cell(page: Page, port):
    """F2 has meant `open the editor` since P9d. On a table with editable columns
    and no rename it is the cell editor it opens."""
    table = editable_table()
    server = serve(table, page, port)

    rows(page).nth(1).click()
    page.keyboard.press("F2")

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).get_attribute("aria-label") == "Size of File A1"

    server.stop()


def test_enter_opens_the_first_editable_cell(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    rows(page).nth(1).click()
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).get_attribute("aria-label") == "Size of File A1"

    server.stop()


def test_enter_still_activates_a_table_with_nothing_editable(page: Page, port):
    """The P9 behaviour, unchanged for every table that declares no editable
    column, which is every table that exists today."""
    seen = []
    table = TanstackTable(
        source=copy.deepcopy(SOURCE),
        columns=copy.deepcopy(COLUMNS),
        options={"expand_all": True},
        event_callback=lambda name, params: seen.append((name, params)),
    )
    server = serve(table, page, port)

    rows(page).nth(1).click()
    page.keyboard.press("Enter")

    wait_until(lambda: ("activate", {"key": "a1"}) in seen, timeout=10)
    expect(editor(page)).to_have_count(0)

    server.stop()


def test_tab_commits_and_walks_to_the_next_editor(page: Page, port):
    """The roving tabindex is on rows, so there is no cell focus to walk. Tab in an
    open editor is what moves along the row instead."""
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("9 kB")
    page.keyboard.press("Tab")

    wait_until(lambda: field_of(table, "a1", "size") == "9 kB", timeout=10)
    # Still one editor, now on the next editable column rather than closed.
    expect(editor(page)).to_have_count(1, timeout=10000)
    wait_until(lambda: editor(page).get_attribute("aria-label") == "Owner of File A1", timeout=10)
    assert editor(page).input_value() == "ada"

    server.stop()


def test_shift_tab_walks_back(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 2).dblclick()  # Owner
    page.keyboard.press("Shift+Tab")

    wait_until(lambda: editor(page).get_attribute("aria-label") == "Size of File A1", timeout=10)

    server.stop()


def test_tab_off_the_last_editor_leaves_the_grid(page: Page, port):
    """Tab has to stay the way out of a roving tabindex, so the walk does not wrap."""
    table = editable_table()
    server = serve(table, page, port)

    cell(page, 1, 2).dblclick()  # Owner, the last editable column
    page.keyboard.press("Tab")

    expect(editor(page)).to_have_count(0, timeout=10000)

    server.stop()


def test_the_walk_starts_at_the_title_when_rename_is_offered(page: Page, port):
    """A table with a toolbar that can rename has one more stop, and it is first."""
    table = editable_table(toolbar=["rename"])
    server = serve(table, page, port)

    rows(page).nth(1).click()
    button(page, "Rename").click()

    wait_until(lambda: editor(page).get_attribute("aria-label") == "Rename File A1", timeout=10)
    page.keyboard.press("Tab")
    wait_until(lambda: editor(page).get_attribute("aria-label") == "Size of File A1", timeout=10)

    server.stop()


def test_a_refused_value_comes_back_marked_invalid(page: Page, port):
    """A refusal changes no tree and so pushes nothing, which is why Python says so
    on a channel of its own. What was typed is corrected rather than retyped."""
    table = editable_table(action_callback=lambda action, params: action != "edit")
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("nope")
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_count(1, timeout=10000)
    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)
    assert editor(page).input_value() == "nope"
    assert field_of(table, "a1", "size") == "1 kB"

    server.stop()


def test_the_same_value_refused_twice_still_comes_back(page: Page, port):
    """Two identical refusals have to be two events, or the second one would be a
    param write equal to the one already there and fire nothing."""
    table = editable_table(action_callback=lambda action, params: action != "edit")
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("nope")
    page.keyboard.press("Enter")
    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)

    page.keyboard.press("Escape")
    expect(editor(page)).to_have_count(0, timeout=10000)

    cell(page, 1, 1).dblclick()
    editor(page).fill("nope")
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)

    server.stop()


def test_typing_clears_the_invalid_mark(page: Page, port):
    table = editable_table(action_callback=lambda action, params: action != "edit")
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("nope")
    page.keyboard.press("Enter")
    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)

    editor(page).press_sequentially("r", delay=20)

    expect(editor(page)).not_to_have_attribute("aria-invalid", "true", timeout=10000)

    server.stop()


def test_python_can_open_a_cell_editor_by_writing_the_pair(page: Page, port):
    table = editable_table()
    server = serve(table, page, port)

    table.editing_key = "a2"
    table.editing_column = "owner"

    wait_until(lambda: editor(page).get_attribute("aria-label") == "Owner of File A2", timeout=10)
    assert editor(page).input_value() == "linus"

    server.stop()


def test_an_edit_is_one_undo_step(page: Page, port):
    table = editable_table(toolbar=["undo", "redo"])
    table.undo_depth = 10
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    editor(page).fill("9 kB")
    page.keyboard.press("Enter")
    wait_until(lambda: field_of(table, "a1", "size") == "9 kB", timeout=10)

    button(page, "Undo").click()

    wait_until(lambda: field_of(table, "a1", "size") == "1 kB", timeout=10)

    server.stop()


def test_an_editable_cell_says_so_on_hover(page: Page, port):
    """The only affordance a cell editor has is the pointer, since nothing about a
    span says it can be opened."""
    table = editable_table()
    server = serve(table, page, port)

    assert "pnl-tst-cell--editable" in (cell(page, 1, 1).get_attribute("class") or "")
    assert "pnl-tst-cell--editable" not in (cell(page, 1, 3).get_attribute("class") or "")
    # The tree column keeps its rename and is never marked as an editable cell.
    assert "pnl-tst-cell--editable" not in (cell(page, 1, 0).get_attribute("class") or "")

    server.stop()


def test_editing_a_value_a_type_supplied_writes_the_node_alone(page: Page, port):
    """A type is defaults for every node of a kind, so writing there would turn one
    cell edit into a change to all of them."""
    table = TanstackTable(
        source=[
            {"key": "a", "title": "File A", "type": "doc"},
            {"key": "b", "title": "File B", "type": "doc"},
        ],
        columns=copy.deepcopy(EDIT_COLUMNS),
        types={"doc": {"size": "0 kB"}},
    )
    server = serve(table, page, port)

    cell(page, 0, 1).dblclick()
    assert editor(page).input_value() == "0 kB"
    editor(page).fill("9 kB")
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(table, "a", "size") == "9 kB", timeout=10)
    assert field_of(table, "b", "size") is None
    assert table.types == {"doc": {"size": "0 kB"}}
    # The second row still shows what its type says, unchanged.
    expect(cell(page, 1, 1)).to_have_text("0 kB")

    server.stop()


def test_an_open_cell_editor_does_not_start_a_drag(page: Page, port):
    """`.pnl-tst-edit` is a row control, so selecting text inside it is selecting
    text and nothing else."""
    table = editable_table(enable_dnd=True)
    server = serve(table, page, port)

    cell(page, 1, 1).dblclick()
    expect(editor(page)).to_have_count(1, timeout=10000)

    box = editor(page).bounding_box()
    page.mouse.move(box["x"] + 4, box["y"] + box["height"] / 2)
    page.mouse.down()
    page.mouse.move(box["x"] + box["width"] - 4, box["y"] + box["height"] / 2, steps=6)
    page.mouse.up()

    assert shape(table.source) == "a(a1,a2)"
    expect(editor(page)).to_have_count(1)

    server.stop()


# Typed editors. The coercion is Python's and is covered in test_table.py; what is
# pinned down here is that a column's declared kind is the control a user gets, and
# that the two without a typing phase commit on the choice itself.

KINDS_SOURCE = [
    {"key": "a", "title": "File A", "size": 1, "kind": "python", "done": False},
    {"key": "b", "title": "File B", "size": 2, "kind": "text", "done": True},
]

KINDS_COLUMNS = [
    {"id": "title", "header": "Name"},
    {"id": "size", "header": "Size", "width": 90, "editable": True, "editor": "number", "min": 0, "max": 10, "step": 1},
    {"id": "kind", "header": "Kind", "width": 90, "editable": True, "editor": "select", "choices": ["python", "text"]},
    {"id": "done", "header": "Done", "width": 70, "editable": True, "editor": "checkbox"},
]


def kinds_table(**kwargs) -> TanstackTable:
    return TanstackTable(source=copy.deepcopy(KINDS_SOURCE), columns=copy.deepcopy(KINDS_COLUMNS), **kwargs)


def test_a_number_column_opens_a_number_input_carrying_its_bounds(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 1).dblclick()

    expect(editor(page)).to_have_count(1, timeout=10000)
    assert editor(page).get_attribute("type") == "number"
    assert editor(page).get_attribute("min") == "0"
    assert editor(page).get_attribute("max") == "10"
    assert editor(page).get_attribute("step") == "1"
    assert editor(page).input_value() == "1"

    server.stop()


def test_a_number_column_writes_a_number_and_not_a_string(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 1).dblclick()
    editor(page).fill("7")
    page.keyboard.press("Enter")

    wait_until(lambda: field_of(table, "a", "size") == 7, timeout=10)
    assert not isinstance(field_of(table, "a", "size"), str)

    server.stop()


def test_a_number_outside_the_bounds_comes_back_marked_invalid(page: Page, port):
    """The input hints the range and Python decides it, so the answer arrives the
    same way a refusal does rather than being swallowed."""
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 1).dblclick()
    editor(page).fill("99")
    page.keyboard.press("Enter")

    expect(editor(page)).to_have_attribute("aria-invalid", "true", timeout=10000)
    assert editor(page).input_value() == "99"
    assert field_of(table, "a", "size") == 1

    server.stop()


def test_a_select_column_opens_a_select_over_its_choices(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 2).dblclick()

    chooser = page.locator(".pnl-tst-edit--select")
    expect(chooser).to_have_count(1, timeout=10000)
    assert chooser.locator("option").all_text_contents() == ["python", "text"]
    assert chooser.input_value() == "python"
    assert chooser.get_attribute("aria-label") == "Kind of File A"

    server.stop()


def test_choosing_an_option_is_the_whole_interaction(page: Page, port):
    """A select has no half-chosen state to hold, so the choice commits and the
    editor closes rather than asking for an Enter that confirms nothing."""
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 2).dblclick()
    page.locator(".pnl-tst-edit--select").select_option("text")

    wait_until(lambda: field_of(table, "a", "kind") == "text", timeout=10)
    expect(editor(page)).to_have_count(0, timeout=10000)
    wait_until(lambda: focused_title(page) == "File A", timeout=10)

    server.stop()


def test_escape_before_choosing_leaves_the_select_alone(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 2).dblclick()
    expect(page.locator(".pnl-tst-edit--select")).to_have_count(1, timeout=10000)
    page.keyboard.press("Escape")

    expect(editor(page)).to_have_count(0, timeout=10000)
    assert field_of(table, "a", "kind") == "python"

    server.stop()


def test_a_checkbox_column_opens_a_checkbox_holding_the_current_value(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 1, 3).dblclick()  # File B, which is done

    box = page.locator(".pnl-tst-edit--check")
    expect(box).to_have_count(1, timeout=10000)
    assert box.is_checked() is True
    assert box.get_attribute("aria-label") == "Done of File B"

    server.stop()


def test_toggling_the_box_is_the_whole_interaction(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 3).dblclick()  # File A, which is not done
    # `click`, not `check`: the box commits on the toggle and so unmounts itself,
    # and `check` verifies a post-state on an element that is correctly gone.
    page.locator(".pnl-tst-edit--check").click()

    wait_until(lambda: field_of(table, "a", "done") is True, timeout=10)
    expect(editor(page)).to_have_count(0, timeout=10000)

    server.stop()


def test_a_checkbox_writes_a_bool_and_not_the_word(page: Page, port):
    """`bool("false")` is True, so a checkbox that sent its state as text would
    turn every untick into a tick."""
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 1, 3).dblclick()  # File B, which is done
    page.locator(".pnl-tst-edit--check").click()

    wait_until(lambda: field_of(table, "b", "done") is False, timeout=10)

    server.stop()


def test_a_checkbox_cell_is_a_span_until_its_editor_opens(page: Page, port):
    """One interaction model: every editable column is a cell with an editor behind
    it, and a single click is already select plus drag."""
    table = kinds_table()
    server = serve(table, page, port)

    expect(page.locator(".pnl-tst-edit--check")).to_have_count(0)
    cell(page, 0, 3).click()
    page.wait_for_timeout(300)

    expect(page.locator(".pnl-tst-edit--check")).to_have_count(0)
    assert field_of(table, "a", "done") is False

    server.stop()


def test_tab_walks_across_all_three_kinds(page: Page, port):
    table = kinds_table()
    server = serve(table, page, port)

    cell(page, 0, 1).dblclick()
    wait_until(lambda: editor(page).get_attribute("aria-label") == "Size of File A", timeout=10)

    page.keyboard.press("Tab")
    wait_until(lambda: editor(page).get_attribute("aria-label") == "Kind of File A", timeout=10)
    assert page.locator(".pnl-tst-edit--select").count() == 1

    page.keyboard.press("Tab")
    wait_until(lambda: editor(page).get_attribute("aria-label") == "Done of File A", timeout=10)
    assert page.locator(".pnl-tst-edit--check").count() == 1

    page.keyboard.press("Tab")
    expect(editor(page)).to_have_count(0, timeout=10000)
    # Nothing was chosen in either control, so nothing was written on the way past.
    assert field_of(table, "a", "kind") == "python"
    assert field_of(table, "a", "done") is False

    server.stop()


def test_a_typed_editor_keeps_the_row_at_its_own_height(page: Page, port):
    """The windowed rowgroup measures every offset from one fixed row height, so a
    control taller than a text input would put the rows out of step with it."""
    table = kinds_table()
    server = serve(table, page, port)

    plain = rows(page).nth(1).bounding_box()["height"]
    cell(page, 0, 2).dblclick()
    expect(page.locator(".pnl-tst-edit--select")).to_have_count(1, timeout=10000)

    assert rows(page).nth(0).bounding_box()["height"] == plain

    server.stop()


# --- external file drop ---

DROPPED_SOURCE = [
    {
        "key": "docs",
        "title": "Docs",
        "children": [{"key": "readme", "title": "readme.md", "allow_children": False}],
    },
    {"key": "notes", "title": "notes.txt", "allow_children": False},
]


def dropping_table(events=None, action_callback=None, **options):
    """A table that takes files dragged in from the desktop."""
    return TanstackTable(
        source=copy.deepcopy(DROPPED_SOURCE),
        options={"drop_files": "meta", "expand_all": True, **options},
        event_callback=(lambda name, params: events.append((name, params))) if events is not None else None,
        action_callback=action_callback,
    )


# Playwright cannot drag from the desktop, so the drag is synthesised: a real
# `DataTransfer` carrying real `File`s, dispatched as the `dragenter`, `dragover`
# and `drop` a browser would send. pdnd binds those on `window` and reads
# `clientX` and `clientY` off them, which is exactly what the panel resolves the
# row from, so nothing about the path under test is stubbed.
#
# The transfer is stashed on `window` between the two halves because a drop has
# to carry the same one the drag did, and because a test wanting to assert the
# hover affordance has to look while the drag is still in flight.
_HOVER_FILES = """
async ({ x, y, files }) => {
  const transfer = new DataTransfer()
  for (const file of files) {
    transfer.items.add(new File([file.body ?? ''], file.name, { type: file.type }))
  }
  window.__pnlTransfer = { transfer, x, y }
  const target = document.elementFromPoint(x, y)
  const fire = (type) => target.dispatchEvent(new DragEvent(type, {
    bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, dataTransfer: transfer,
  }))
  // pdnd batches its bookkeeping into an animation frame, so each event needs a
  // painted frame before the next one is worth sending.
  const frame = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
  fire('dragenter')
  await frame()
  fire('dragover')
  await frame()
  fire('dragover')
  await frame()
}
"""

_RELEASE_FILES = """
async () => {
  const held = window.__pnlTransfer
  const target = document.elementFromPoint(held.x, held.y)
  target.dispatchEvent(new DragEvent('drop', {
    bubbles: true, cancelable: true, composed: true,
    clientX: held.x, clientY: held.y, dataTransfer: held.transfer,
  }))
}
"""


def hover_files(page: Page, row_index: int, files: list[dict], y_frac: float = 0.5) -> None:
    """Bring a file drag over a row and leave it there."""
    box = rows(page).nth(row_index).bounding_box()
    assert box
    page.evaluate(
        _HOVER_FILES,
        {"x": box["x"] + box["width"] / 2, "y": box["y"] + box["height"] * y_frac, "files": files},
    )


def drop_files(page: Page, row_index: int, files: list[dict], y_frac: float = 0.5) -> None:
    """Drop files onto a row, releasing at *y_frac* of its height.

    The vertical fraction picks the hitbox instruction exactly as it does for a
    row drag: the middle band is ``make-child`` and the outer bands reorder.
    """
    hover_files(page, row_index, files, y_frac)
    page.evaluate(_RELEASE_FILES)


def a_file(name: str, mime: str = "text/plain", body: str = "hello") -> dict:
    return {"name": name, "type": mime, "body": body}


def test_a_dropped_file_becomes_a_node(page: Page, port):
    table = dropping_table()
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md", "text/markdown")])

    wait_until(lambda: shape(table.source) == "docs(readme,node-1),notes")
    assert node_at(table.source, "node-1")["title"] == "plan.md"

    server.stop()


def test_a_file_dropped_above_a_row_lands_beside_it(page: Page, port):
    table = dropping_table()
    server = serve(table, page, port)

    # The top band of `readme.md`, which is `reorder-above` for a file exactly as
    # it is for a row.
    drop_files(page, 1, [a_file("plan.md")], y_frac=0.1)

    wait_until(lambda: shape(table.source) == "docs(node-1,readme),notes")

    server.stop()


def test_several_files_arrive_in_one_step(page: Page, port):
    events: list = []
    table = dropping_table(events=events)
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("one.txt"), a_file("two.txt"), a_file("three.txt")])

    # The callback runs last, after the tree and after the history, so it is the
    # one signal that means the whole intent has been applied.
    wait_until(lambda: bool(events))
    assert shape(table.source) == "docs(readme,node-1,node-2,node-3),notes"
    assert [node_at(table.source, f"node-{n}")["title"] for n in (1, 2, 3)] == [
        "one.txt",
        "two.txt",
        "three.txt",
    ]
    # One undo step for the batch, so taking it back takes all three.
    assert table.can_undo
    table.undo()
    assert shape(table.source) == "docs(readme),notes"

    server.stop()


def test_a_file_held_over_a_folder_shows_the_drop_indicator(page: Page, port):
    table = dropping_table()
    server = serve(table, page, port)

    hover_files(page, 0, [a_file("plan.md")])

    assert "pnl-tst-row--child-target" in row_classes(page, 0)

    page.evaluate(_RELEASE_FILES)
    # The indicator is not left behind once the drop has been handled.
    wait_until(lambda: "pnl-tst-row--child-target" not in row_classes(page, 0))

    server.stop()


def test_a_file_held_between_rows_shows_the_drop_line(page: Page, port):
    table = dropping_table()
    server = serve(table, page, port)

    hover_files(page, 1, [a_file("plan.md")], y_frac=0.1)

    expect(rows(page).nth(1).locator(".pnl-tst-dropline--above")).to_be_visible()

    server.stop()


def test_a_leaf_refuses_a_file_dropped_into_it(page: Page, port):
    """The rule a row drag already follows, applied to a file."""
    events: list = []
    table = dropping_table(events=events)
    server = serve(table, page, port)

    # The middle band of `notes.txt`, which takes no children. The hitbox blocks
    # `make-child` there, so the release lands nowhere rather than beside it.
    hover_files(page, 2, [a_file("plan.md")])
    assert "pnl-tst-row--blocked" in row_classes(page, 2)

    page.evaluate(_RELEASE_FILES)
    page.wait_for_timeout(300)
    assert shape(table.source) == "docs(readme),notes"
    assert events == []

    server.stop()


def test_a_file_dropped_below_a_leaf_lands_beside_it(page: Page, port):
    table = dropping_table()
    server = serve(table, page, port)

    drop_files(page, 2, [a_file("plan.md")], y_frac=0.9)

    wait_until(lambda: shape(table.source) == "docs(readme),notes,node-1")

    server.stop()


def test_a_table_that_takes_no_files_ignores_a_file_drop(page: Page, port):
    events: list = []
    table = dropping_table(events=events, drop_files=False)
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md")])
    page.wait_for_timeout(300)

    assert shape(table.source) == "docs(readme),notes"
    assert events == []

    server.stop()


def test_a_file_the_table_does_not_accept_is_reported_rather_than_taken(page: Page, port):
    events: list = []
    table = dropping_table(events=events, drop_accept=[".md"])
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md"), a_file("notes.txt")])

    # Waiting on the callback rather than on the tree: `source` is rewritten
    # before the callback runs, so watching it would race the report.
    wait_until(lambda: bool(events))
    assert shape(table.source) == "docs(readme,node-1),notes"
    assert node_at(table.source, "node-1")["title"] == "plan.md"
    name, params = events[-1]
    assert name == "drop_files"
    assert [item["name"] for item in params["rejected"]] == ["notes.txt"]
    assert params["rejected"][0]["reason"] == "type"

    server.stop()


def test_a_vetoed_file_drop_leaves_the_tree_alone(page: Page, port):
    events: list = []
    table = dropping_table(events=events, action_callback=lambda action, params: action != "drop_files")
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md")])

    wait_until(lambda: bool(events))
    assert shape(table.source) == "docs(readme),notes"
    assert events[-1][1]["applied"] is False

    server.stop()


def test_the_bytes_arrive_when_the_table_asked_for_them(page: Page, port):
    events: list = []
    table = dropping_table(events=events, drop_files="content")
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md", body="dropped text")])

    wait_until(lambda: bool(events))
    assert events[-1][1]["files"][0]["content"] == b"dropped text"
    # And never into the tree, so a dropped file is not re-sent on every change.
    assert "content" not in node_at(table.source, "node-1")

    server.stop()


def test_metadata_alone_carries_no_bytes(page: Page, port):
    events: list = []
    table = dropping_table(events=events)
    server = serve(table, page, port)

    drop_files(page, 0, [a_file("plan.md", body="dropped text")])

    wait_until(lambda: bool(events))
    dropped = events[-1][1]["files"][0]
    assert dropped["content"] is None
    assert dropped["size"] == len("dropped text")
    assert dropped["mime"] == "text/plain"

    server.stop()
