# pytest test_virtual_filesystem.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.virtual_filesystem import app, fs_to_tree_source, tree
from panelini.testing import drag, wb_title_center, wb_wait


def _expand_controls(page: Page) -> None:
    """Ensure the Python API Controls card is expanded."""
    card = page.locator("text=Python API Controls")
    card.click()
    time.sleep(0.3)
    btn = page.locator("button:has-text('Add Folder')").first
    if not btn.is_visible():
        card.click()
        time.sleep(0.3)


def test_tree_renders(page: Page, port):
    """Tree renders with rows and column headers."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert len(tree.source) >= 2

    # Column headers visible
    header = page.locator(".wb-header")
    assert header.count() > 0, "No .wb-header - tree did not render"

    # Tree rows visible
    rows = page.locator(".wb-row")
    assert rows.count() > 0, "No .wb-row - tree did not render"

    server.stop()


def test_python_api_add_folder(page: Page, port):
    """Add Folder button creates a new folder."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    _expand_controls(page)
    page.locator("button:has-text('Add Folder')").first.click()
    time.sleep(1)

    assert page.locator(".wb-row:has-text('new_folder')").first.is_visible()

    server.stop()


def test_python_api_add_file(page: Page, port):
    """Add File button creates a new file."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    _expand_controls(page)
    page.locator("button:has-text('Add File')").first.click()
    time.sleep(1)

    assert page.locator(".wb-row:has-text('new_file')").first.is_visible()

    server.stop()


def test_python_api_delete(page: Page, port):
    """Delete removes a node from the tree."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    assert page.locator(".wb-row:has-text('cache.dat')").first.is_visible()

    tree.remove_node("/tmp/cache.dat")  # noqa: S108
    time.sleep(1)

    assert page.locator(".wb-row:has-text('cache.dat')").count() == 0

    server.stop()


# =========================================================================
# DnD helpers (same as test_wunderbaum_dnd.py)
# =========================================================================


def _center(box: dict) -> tuple[float, float]:
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


def test_dnd_move_file(page: Page, port):
    """Drag document.txt from /home/user to /tmp."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    src = page.locator(".wb-row .wb-title", has_text="document.txt").first
    tgt = page.locator(".wb-row .wb-title", has_text="tmp").first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    _drag(page, *_center(s), *_center(t))
    time.sleep(2)

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

    server.stop()


def test_dnd_move_no_duplicate(page: Page, port):
    """After move, document.txt appears only once."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    src = page.locator(".wb-row .wb-title", has_text="document.txt").first
    tgt = page.locator(".wb-row .wb-title", has_text="tmp").first
    s = src.bounding_box()
    t = tgt.bounding_box()
    assert s and t

    _drag(page, *_center(s), *_center(t))
    time.sleep(2)

    titles = page.locator(".wb-row .wb-title")
    count = sum(1 for i in range(titles.count()) if "document.txt" in titles.nth(i).text_content())
    assert count == 1, f"document.txt appears {count} times"

    server.stop()


@pytest.mark.media(role="overview", capture="gif")
def test_dnd_move_cache_into_user(page: Page, port):
    """Drag cache.dat from /tmp onto the /home/user folder (cross-folder move)."""
    # `tree` is a module-level singleton shared across tests; reset it to the
    # original filesystem so this test is independent of prior mutations.
    tree.source = fs_to_tree_source()
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    wb_wait(page)
    time.sleep(1)

    # Sanity: cache.dat starts under /tmp, not /home/user.
    before = _find_in_source(tree.source, "/tmp/cache.dat")  # noqa: S108
    assert before is not None, "cache.dat missing from server source before move"
    assert before[1] == "/tmp", f"cache.dat parent before move={before[1]}"  # noqa: S108

    # Drag the TITLE cell of cache.dat onto the "user" folder title cell.
    src = wb_title_center(page, "cache.dat")
    tgt = wb_title_center(page, "user")
    drag(page, src, tgt, steps=12)
    time.sleep(1.3)

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

    server.stop()


@pytest.mark.xfail(reason="contextmenu event unreliable in shadow DOM via Playwright")
def test_context_menu_visible(page: Page, port):
    """Right-clicking shows context menu."""
    url = f"http://localhost:{port}"
    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(url)
    time.sleep(5)

    row = page.locator(".wb-row").first
    row.click(button="right")
    time.sleep(1)

    menu = page.locator(".wb-context-menu")
    assert menu.is_visible()

    server.stop()
