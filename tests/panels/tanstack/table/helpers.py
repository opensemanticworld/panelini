"""Playwright helpers shared by the TanstackTable tests.

Every selector here names a class this panel renders and nothing else does, so
these live beside the tests rather than in ``panelini.testing``. The panel's own
UI suite serves a bare table; the example tests in ``examples/`` serve whole
applications, which is why ``start`` takes any component and ``serve`` waits for
the first row rather than for a particular one.

Importing from this module does not mark a test as ``ui``. The root conftest
looks for a playwright object in the test module's own namespace, so a module
that drives a browser imports ``Page`` itself.
"""

import socket

import panel as pn
from playwright.sync_api import Page, expect

from panelini.panels.tanstack.table import tree
from panelini.testing import wait_until


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


def serve(component, page: Page, port: int):
    """Serve *component*, open it and wait for the first rendered row."""
    server = start(component, page, port)
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


def panes(page: Page):
    """The grids on the page, in layout order."""
    return page.locator(".pnl-tst-root")


def pane_rows(page: Page, index: int):
    """Rows of one pane. Each table renders into its own shadow root."""
    return panes(page).nth(index).locator(".pnl-tst-row")


def drag_across(page: Page, src_row, dst_row, modifier: str = "") -> None:
    """Drag a row of one pane onto a row of another.

    This cannot reuse ``drag_row``: its indices address one grid, and two panes
    are two pdnd hosts in two shadow roots. ``modifier`` is held down over the
    drop, which is what turns the transfer into a copy.
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


def hover_files_over(page: Page, row, files: list[dict], y_frac: float = 0.5) -> None:
    """Bring a file drag over a row locator and leave it there."""
    box = row.bounding_box()
    assert box
    page.evaluate(
        _HOVER_FILES,
        {"x": box["x"] + box["width"] / 2, "y": box["y"] + box["height"] * y_frac, "files": files},
    )


def release_files(page: Page) -> None:
    """Drop whatever ``hover_files_over`` left in flight, where it was left.

    Separate from ``drop_files_onto`` so a test can assert the hover affordance,
    which only exists while the pointer is still over the row.
    """
    page.evaluate(_RELEASE_FILES)


def drop_files_onto(page: Page, row, files: list[dict], y_frac: float = 0.5) -> None:
    """Drop files onto a row locator, releasing at *y_frac* of its height.

    The vertical fraction picks the hitbox instruction exactly as it does for a
    row drag: the middle band is ``make-child`` and the outer bands reorder.
    """
    hover_files_over(page, row, files, y_frac)
    page.evaluate(_RELEASE_FILES)


def a_file(name: str, mime: str = "text/plain", body: str = "hello") -> dict:
    return {"name": name, "type": mime, "body": body}


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
