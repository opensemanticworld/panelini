# pytest test_virtual_filesystem.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import FloatRect, Page

from examples.panels.wunderbaum.virtual_filesystem import app, fs_to_tree_source, tree
from panelini.testing import drag, wait_until, wb_title_center, wb_wait

_PORT = 6430


@pytest.fixture(scope="module")
def panel_server():
    """Serve the virtual filesystem example once for the whole module."""
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

    ``tree`` is a module-level singleton shared by every test, and several
    tests mutate it (add/delete/move) - reset from the fixed ``filesystem``
    dict before navigating. A fresh session per test avoids reloading a page
    whose previous session might still have an in-flight server round-trip
    (observed to be flaky), while still avoiding the per-test ``pn.serve()``
    startup cost this replaces.
    """
    tree.source = fs_to_tree_source()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{_PORT}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _expand_controls(page: Page) -> None:
    """Ensure the Python API Controls card is expanded."""
    btn = page.locator("button:has-text('Add Folder')").first
    if btn.is_visible():
        return
    card = page.locator("text=Python API Controls")
    card.click()
    btn.wait_for()


def test_tree_renders(ready_page: Page):
    """Tree renders with rows and column headers."""
    page = ready_page

    assert len(tree.source) >= 2

    # Column headers visible
    header = page.locator(".wb-header")
    assert header.count() > 0, "No .wb-header - tree did not render"

    # Tree rows visible
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row - tree did not render"


def test_python_api_add_folder(ready_page: Page):
    """Add Folder button creates a new folder."""
    page = ready_page

    _expand_controls(page)
    page.locator("button:has-text('Add Folder')").first.click()

    page.locator(".wb-row:has-text('new_folder')").first.wait_for()


def test_python_api_add_file(ready_page: Page):
    """Add File button creates a new file."""
    page = ready_page

    _expand_controls(page)
    page.locator("button:has-text('Add File')").first.click()

    page.locator(".wb-row:has-text('new_file')").first.wait_for()


def test_python_api_delete(ready_page: Page):
    """Delete removes a node from the tree."""
    page = ready_page

    assert page.locator(".wb-row:has-text('cache.dat')").first.is_visible()

    tree.remove_node("/tmp/cache.dat")  # noqa: S108

    wait_until(lambda: page.locator(".wb-row:has-text('cache.dat')").count() == 0)


# =========================================================================
# DnD helpers (same as test_wunderbaum_dnd.py)
# =========================================================================


def _center(box: FloatRect) -> tuple[float, float]:
    return box["x"] + box["width"] / 2, box["y"] + box["height"] / 2


def _drag(page: Page, sx, sy, tx, ty, steps=5):
    page.mouse.move(sx, sy)
    page.mouse.down()
    for i in range(steps):
        frac = (i + 1) / steps
        page.mouse.move(sx + (tx - sx) * frac, sy + (ty - sy) * frac)
        time.sleep(0.05)
    page.mouse.up()


def _find_in_source(source, key):
    """Find node and its parent key in the source tree."""

    def search(nodes, parent_key=None):
        for node in nodes:
            if node["key"] == key:
                return node, parent_key
            if "children" in node:
                result = search(node["children"], node["key"])
                if result:
                    return result
        return None

    return search(source)


def _get_client_children(page: Page, parent_key: str) -> list[str]:
    """Get child keys of a node in the client-side wunderbaum tree."""
    return page.evaluate(
        """(parentKey) => {
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
        const container = findInShadowRoots('.tree-container')[0];
        if (!container || !container._wunderbaum) return [];
        const wb = container._wunderbaum;
        const node = wb.findFirst(n => n.key === parentKey);
        if (!node || !node.children) return [];
        return node.children.map(c => c.key);
    }""",
        parent_key,
    )


# =========================================================================
# DnD tests
# =========================================================================


def test_dnd_move_file(ready_page: Page):
    """Drag document.txt from /home/user to /tmp."""
    page = ready_page

    src = page.locator(".wb-row .wb-title", has_text="document.txt").first
    tgt = page.locator(".wb-row .wb-title", has_text="tmp").first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    _drag(page, *_center(s), *_center(t))
    wait_until(lambda: (_find_in_source(tree.source, "/home/user/document.txt") or (None, None))[1] == "/tmp")  # noqa: S108

    # Server-side: document.txt moved under /tmp
    result = _find_in_source(tree.source, "/home/user/document.txt")
    assert result is not None, "document.txt not in server source"
    _, parent_key = result
    assert parent_key == "/tmp", f"Server: parent={parent_key}, expected '/tmp'"  # noqa: S108

    # Client-side: /tmp has document.txt, /home/user does not
    tmp_children = _get_client_children(page, "/tmp")  # noqa: S108
    user_children = _get_client_children(page, "/home/user")
    assert "/home/user/document.txt" in tmp_children, f"Client: document.txt not in /tmp: {tmp_children}"
    assert "/home/user/document.txt" not in user_children


def test_dnd_move_no_duplicate(ready_page: Page):
    """After move, document.txt appears only once."""
    page = ready_page

    src = page.locator(".wb-row .wb-title", has_text="document.txt").first
    tgt = page.locator(".wb-row .wb-title", has_text="tmp").first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    _drag(page, *_center(s), *_center(t))
    wait_until(lambda: (_find_in_source(tree.source, "/home/user/document.txt") or (None, None))[1] == "/tmp")  # noqa: S108

    titles = page.locator(".wb-row .wb-title")
    count = sum(1 for i in range(titles.count()) if "document.txt" in (titles.nth(i).text_content() or ""))
    assert count == 1, f"document.txt appears {count} times"


@pytest.mark.media(role="overview", capture="gif")
def test_dnd_move_cache_into_user(ready_page: Page):
    """Drag cache.dat from /tmp onto the /home/user folder (cross-folder move)."""
    page = ready_page

    # Sanity: cache.dat starts under /tmp, not /home/user.
    before = _find_in_source(tree.source, "/tmp/cache.dat")  # noqa: S108
    assert before is not None, "cache.dat missing from server source before move"
    assert before[1] == "/tmp", f"cache.dat parent before move={before[1]}"  # noqa: S108

    # Drag the TITLE cell of cache.dat onto the "user" folder title cell.
    src = wb_title_center(page, "cache.dat")
    tgt = wb_title_center(page, "user")
    drag(page, src, tgt, steps=12)
    wait_until(lambda: (_find_in_source(tree.source, "/tmp/cache.dat") or (None, None))[1] == "/home/user")  # noqa: S108

    # Backend assertion: the panel's JS-synced source shows cache.dat now under
    # /home/user and no longer under /tmp. (The example's `filesystem` dict is
    # only read at init and never mutated on drop, so source is the truth here.)
    after = _find_in_source(tree.source, "/tmp/cache.dat")  # noqa: S108
    assert after is not None, "cache.dat vanished from server source after move"
    _, parent_key = after
    assert parent_key == "/home/user", f"Server: parent={parent_key}, expected '/home/user'"

    # Client-side confirmation: /home/user gained cache.dat, /tmp lost it.
    user_children = _get_client_children(page, "/home/user")
    tmp_children = _get_client_children(page, "/tmp")  # noqa: S108
    assert "/tmp/cache.dat" in user_children, f"Client: cache.dat not under /home/user: {user_children}"  # noqa: S108
    assert "/tmp/cache.dat" not in tmp_children, f"Client: cache.dat still under /tmp: {tmp_children}"  # noqa: S108


@pytest.mark.xfail(reason="contextmenu event unreliable in shadow DOM via Playwright")
def test_context_menu_visible(ready_page: Page):
    """Right-clicking shows context menu."""
    page = ready_page

    row = page.locator(".wb-row").first
    row.click(button="right")

    menu = page.locator(".wb-context-menu")
    assert menu.is_visible()
