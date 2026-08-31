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


def drag_row(
    page: Page,
    source_index: int,
    target_index: int,
    y_frac: float = 0.5,
    expect_session: bool = True,
    expect_blocked: bool = False,
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
    """
    src = rows(page).nth(source_index).bounding_box()
    dst = rows(page).nth(target_index).bounding_box()
    assert src and dst

    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2)
    page.mouse.down()
    # A short first move starts the drag session before the long travel.
    page.mouse.move(src["x"] + src["width"] / 2, src["y"] + src["height"] / 2 + 6, steps=2)
    if expect_session:
        expect(page.locator(".pnl-tst-row--dragging")).to_have_count(1, timeout=2000)
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


def test_select_mode_none_renders_no_checkboxes(page: Page, port):
    table = TanstackTable(source=copy.deepcopy(SOURCE), options={"expand_all": True})
    server = serve(table, page, port)

    assert page.locator(".pnl-tst-check").count() == 0
    assert rows(page).nth(0).get_attribute("aria-selected") is None

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
