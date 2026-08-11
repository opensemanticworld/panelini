# pytest test_checkbox_tree.py --headed --slowmo 1000

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.checkbox_tree import (
    _get_checked_keys,
    app,
    checked_display,
    source,
    tree,
)
from panelini.testing import wait_until, wb_checkbox, wb_wait

_PORT = 6410
_ORIGINAL_SOURCE = copy.deepcopy(source)


@pytest.fixture(scope="module")
def panel_server():
    """Serve the checkbox tree example once for the whole module."""
    server = pn.serve(app, port=_PORT, threaded=True, show=False)
    time.sleep(0.2)
    yield server
    # kill_all_servers() (not server.stop()) so panel's own server/thread
    # registry is cleared too - a bare .stop() leaves a stale entry that a
    # later, unrelated test's pn.state.reset() can trip over.
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server.

    ``tree``/``checked_display`` are module-level singletons shared by every
    test, so their state is reset here before navigating - a fresh session
    per test avoids reloading a page whose previous session might still have
    an in-flight server round-trip (observed to be flaky), while still
    avoiding the per-test ``pn.serve()`` startup cost this replaces.
    """
    tree.source = copy.deepcopy(_ORIGINAL_SOURCE)
    checked_display.object = "**Checked:** (none)"
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _click_checkbox(page: Page, title: str) -> None:
    """Click the checkbox (``<i class="wb-checkbox">``) of the row with *title*."""
    cb = wb_checkbox(page, title)
    box = cb.bounding_box()
    if box:  # glide the cursor so recorded media reads well
        page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=15)
    cb.click()


_SHADOW_FIND = """
function findInShadowRoots(selector) {
    const results = [];
    function search(root) {
        root.querySelectorAll(selector).forEach(el => results.push(el));
        root.querySelectorAll('*').forEach(el => {
            if (el.shadowRoot) search(el.shadowRoot);
        });
    }
    search(document);
    return results;
}
"""


def _get_client_node_selected(page: Page, key: str) -> bool:
    """Return whether *key* is selected in the client-side wunderbaum tree."""
    return page.evaluate(
        f"""(nodeKey) => {{
            {_SHADOW_FIND}
            const c = findInShadowRoots('.tree-container')[0];
            if (!c || !c._wunderbaum) return false;
            const n = c._wunderbaum.findFirst(n => n.key === nodeKey);
            return n ? !!n.selected : false;
        }}""",
        key,
    )


def _is_client_node_indeterminate(page: Page, key: str) -> bool:
    """Return whether *key*'s checkbox is in indeterminate/tristate in the client."""
    return page.evaluate(
        f"""(nodeKey) => {{
            {_SHADOW_FIND}
            const c = findInShadowRoots('.tree-container')[0];
            if (!c || !c._wunderbaum) return false;
            const n = c._wunderbaum.findFirst(n => n.key === nodeKey);
            if (!n) return false;
            // Wunderbaum marks indeterminate nodes with the class 'wb-tristate'
            // on the rendered row or via the node's _partsel flag.
            const span = n.span;
            if (span) {{
                const cb = span.querySelector('.wb-checkbox');
                if (cb && cb.classList.contains('wb-tristate')) return true;
            }}
            return !!n._partsel;
        }}""",
        key,
    )


def _get_client_selected_keys(page: Page) -> list[str]:
    """Return all selected keys from the client-side wunderbaum tree."""
    return page.evaluate(
        f"""() => {{
            {_SHADOW_FIND}
            const c = findInShadowRoots('.tree-container')[0];
            if (!c || !c._wunderbaum) return [];
            const keys = [];
            c._wunderbaum.visit(n => {{ if (n.selected) keys.push(n.key); }});
            return keys;
        }}"""
    )


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------


def test_tree_renders_with_checkboxes(ready_page: Page):
    """Tree renders and checkbox elements are present."""
    page = ready_page

    assert tree.source == source
    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row - tree did not render"

    checkboxes = page.locator(".wb-row .wb-checkbox")
    assert checkboxes.count() > 0, "No .wb-checkbox - checkboxes not enabled"


def test_check_leaf_node(ready_page: Page):
    """Clicking a leaf checkbox selects only that node."""
    page = ready_page

    _click_checkbox(page, "Orange")
    wait_until(lambda: "orange" in checked_display.object)

    # Backend
    checked = _get_checked_keys(tree.source)
    assert "orange" in checked
    assert "citrus" not in checked
    assert "fruits" not in checked

    # Example display updated
    assert "orange" in checked_display.object

    # UI
    assert _get_client_node_selected(page, "orange")
    assert not _get_client_node_selected(page, "lemon")


@pytest.mark.media(role="feature", capture="gif")
def test_check_parent_selects_all_children(ready_page: Page):
    """Clicking a parent checkbox selects it and all its children."""
    page = ready_page

    _click_checkbox(page, "Citrus")
    wait_until(lambda: "citrus" in checked_display.object)

    # Backend
    checked = _get_checked_keys(tree.source)
    for key in ("citrus", "orange", "lemon", "lime"):
        assert key in checked, f"{key} should be selected"

    # UI
    for key in ("citrus", "orange", "lemon", "lime"):
        assert _get_client_node_selected(page, key), f"{key} not selected in UI"


def test_uncheck_parent_deselects_all_children(ready_page: Page):
    """Unchecking a parent deselects it and all its children."""
    page = ready_page

    # Check then uncheck
    _click_checkbox(page, "Citrus")
    wait_until(lambda: "citrus" in checked_display.object)
    _click_checkbox(page, "Citrus")
    wait_until(lambda: "(none)" in checked_display.object)

    # Backend
    checked = _get_checked_keys(tree.source)
    for key in ("citrus", "orange", "lemon", "lime"):
        assert key not in checked, f"{key} should not be selected"

    # Example display reset
    assert "(none)" in checked_display.object

    # UI
    for key in ("citrus", "orange", "lemon", "lime"):
        assert not _get_client_node_selected(page, key), f"{key} still selected in UI"


def test_partial_child_shows_indeterminate(ready_page: Page):
    """Checking one child makes the parent indeterminate, not fully selected."""
    page = ready_page

    _click_checkbox(page, "Orange")
    wait_until(lambda: "orange" in checked_display.object)

    # Backend: Orange selected, Citrus NOT fully selected
    checked = _get_checked_keys(tree.source)
    assert "orange" in checked
    assert "citrus" not in checked

    # UI: Citrus should be indeterminate
    assert not _get_client_node_selected(page, "citrus")
    assert _is_client_node_indeterminate(page, "citrus")


def test_check_root_selects_entire_subtree(ready_page: Page):
    """Clicking the top-level parent selects the entire subtree."""
    page = ready_page

    _click_checkbox(page, "Fruits")
    wait_until(lambda: "fruits" in checked_display.object)

    # Backend: all Fruits descendants selected
    checked = _get_checked_keys(tree.source)
    expected = {"fruits", "citrus", "orange", "lemon", "lime", "berries", "strawberry", "blueberry"}
    for key in expected:
        assert key in checked, f"{key} should be selected"

    # Example display lists all keys
    for key in expected:
        assert key in checked_display.object, f"{key} missing from display"

    # UI
    for key in expected:
        assert _get_client_node_selected(page, key), f"{key} not selected in UI"

    # Vegetables should NOT be affected
    assert "vegetables" not in checked


def test_uncheck_grandchild_propagates_up(ready_page: Page):
    """Unchecking a grandchild makes parent and grandparent indeterminate."""
    page = ready_page

    # Select all Fruits
    _click_checkbox(page, "Fruits")
    wait_until(lambda: "fruits" in checked_display.object)
    # Uncheck Orange
    _click_checkbox(page, "Orange")
    wait_until(lambda: "orange" not in checked_display.object)

    # Backend
    checked = _get_checked_keys(tree.source)
    assert "orange" not in checked
    assert "lemon" in checked
    assert "lime" in checked
    # Citrus and Fruits should not be fully selected
    assert "citrus" not in checked
    assert "fruits" not in checked

    # UI: Citrus and Fruits indeterminate
    assert _is_client_node_indeterminate(page, "citrus")
    assert _is_client_node_indeterminate(page, "fruits")


def test_independent_subtrees(ready_page: Page):
    """Checking one subtree does not affect a sibling subtree."""
    page = ready_page

    _click_checkbox(page, "Citrus")
    wait_until(lambda: "citrus" in checked_display.object)

    # Backend: Vegetables subtree untouched
    checked = _get_checked_keys(tree.source)
    veg_keys = {"vegetables", "root", "carrot", "potato", "leafy", "spinach", "lettuce"}
    for key in veg_keys:
        assert key not in checked, f"{key} should not be selected"

    # UI
    client_selected = _get_client_selected_keys(page)
    for key in veg_keys:
        assert key not in client_selected, f"{key} unexpectedly selected in UI"
