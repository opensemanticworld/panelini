# pytest test_multi_select_dnd.py --headed --slowmo 1000

"""Playwright test for the multi-select + drag-and-drop example.

The recorded media shows what ``selectMode: "multi"`` does that ``hier`` does
not: checking a folder checks its whole subtree, unchecking one child leaves
the folder checked, and checking every child of another folder does not check
that folder. It then drags the resulting selection onto Folder A to show that
a drag started on a checked row carries the entire selection.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.multi_select_dnd import (
    app,
    selected_keys,
    selection_display,
    source,
    tree,
)
from panelini.testing import drag, wait_until, wb_checkbox, wb_title_center, wb_wait

_PORT = 6440
_ORIGINAL_SOURCE = copy.deepcopy(source)


@pytest.fixture(scope="module")
def panel_server():
    """Serve the multi-select example once for the whole module."""
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

    ``tree``/``selection_display`` are module-level singletons shared by every
    test, so their state is reset here before navigating - a fresh session
    per test avoids reloading a page whose previous session might still have
    an in-flight server round-trip (observed to be flaky), while still
    avoiding the per-test ``pn.serve()`` startup cost this replaces.
    """
    tree.source = copy.deepcopy(_ORIGINAL_SOURCE)
    selection_display.object = "**Selected:** (none)"
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
    """Click the checkbox (``<i class="wb-checkbox">``) of the row with *title*.

    Moves and presses by hand rather than calling ``Locator.click``. While
    recording, conftest's ``_install_glide`` interpolates every ``mouse.move``
    into a timed glide and makes ``Locator.click`` glide once more before it
    fires, which costs a second full glide travelling zero distance. Passing an
    explicit step count keeps the travel short, and ``down``/``up`` are not
    patched, so the press adds no further delay.
    """
    cb = wb_checkbox(page, title)
    box = cb.bounding_box()
    if box is None:
        cb.click()
        return
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=10)
    page.mouse.down()
    page.mouse.up()


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


def _get_client_children(page: Page, parent_key: str) -> list[str]:
    """Return the child keys of *parent_key* in the client-side tree."""
    return page.evaluate(
        f"""(parentKey) => {{
            {_SHADOW_FIND}
            const c = findInShadowRoots('.tree-container')[0];
            if (!c || !c._wunderbaum) return [];
            const n = c._wunderbaum.findFirst(n => n.key === parentKey);
            return n && n.children ? n.children.map(child => child.key) : [];
        }}""",
        parent_key,
    )


def _source_children(src: list[dict], key: str) -> list[str]:
    """Return the child keys of *key* in the server-side source tree."""
    for node in src:
        if node["key"] == key:
            return [c["key"] for c in node.get("children", [])]
        found = _source_children(node.get("children", []), key)
        if found:
            return found
    return []


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------


# A single tree needs nowhere near the default 1280x720. The recorded frame is
# the docs image as-is (assemble_animation only ever downscales), so a smaller
# viewport is the cheapest way to keep the animation under the size budget.
@pytest.mark.media(role="feature", capture="gif", viewport=(1000, 560))
def test_multi_select_then_drag_the_selection(ready_page: Page):
    """Check a folder, prune one child, add two more, then drag the selection."""
    page = ready_page

    # 1. Checking a folder propagates down over its whole subtree.
    _click_checkbox(page, "Folder A")
    wait_until(lambda: "a/3" in selection_display.object)
    assert selected_keys(tree.source) == ["a", "a/1", "a/2", "a/3"]
    assert _get_client_selected_keys(page) == ["a", "a/1", "a/2", "a/3"]

    # 2. Unchecking a child does not propagate up: Folder A stays checked and
    #    never goes tri-state, which is the `multi` vs `hier` difference.
    _click_checkbox(page, "File 2")
    wait_until(lambda: "a/2" not in selection_display.object)
    assert selected_keys(tree.source) == ["a", "a/1", "a/3"]
    assert _get_client_selected_keys(page) == ["a", "a/1", "a/3"]
    assert _get_client_node_selected(page, "a")

    # 3. Checking every child of Folder B leaves Folder B itself unchecked.
    _click_checkbox(page, "File 4")
    _click_checkbox(page, "File 5")
    wait_until(lambda: "b/5" in selection_display.object)
    assert selected_keys(tree.source) == ["a", "a/1", "a/3", "b/4", "b/5"]
    assert _get_client_selected_keys(page) == ["a", "a/1", "a/3", "b/4", "b/5"]
    assert not _get_client_node_selected(page, "b")

    # 4. The drag starts on a checked row, so it carries the selection rather
    #    than just File 4. `getDragKeys` in wunderbaum.vue asks for the
    #    top-most selected nodes only, so a/1 and a/3 travel inside Folder A
    #    instead of separately, and `getDragNodes` then discards the drop
    #    target itself. That leaves b/4 and b/5 as the only nodes that move.
    #    One step, not several: while recording, every mouse.move is already
    #    interpolated into a timed glide, so each extra step becomes its own
    #    start-stop sweep and the cursor visibly parks on every row it crosses.
    drag(page, wb_title_center(page, "File 4"), wb_title_center(page, "Folder A"), steps=1, dwell=0.15)
    wait_until(lambda: _source_children(tree.source, "b") == [])

    assert _source_children(tree.source, "a") == ["a/1", "a/2", "a/3", "b/4", "b/5"]
    assert _source_children(tree.source, "b") == []
    assert _get_client_children(page, "a") == ["a/1", "a/2", "a/3", "b/4", "b/5"]
    assert _get_client_children(page, "b") == []
