"""Docs media for the three TanstackTable examples: one clip and one still each.

The gestures are the ones the example tests already assert, paced for a reader
rather than for a runner: a clip waits between steps so a change can be seen, which
is exactly what an assertion must not do. That pacing is why these live in a module
of their own instead of as markers on the example tests.

In a normal run the ``media`` markers are inert and these are ordinary UI tests that
prove the gestures still work. ``--record-media`` turns them into the files under
``docs/_static/media/tanstack/``, named by the ``name`` and ``role`` on each marker.
"""

import importlib
import re
import time

import pytest
from playwright.sync_api import Page

from tests.panels.tanstack.table.helpers import a_file, drag_across, drop_files_onto, pane_rows, rows, start

# Two panes side by side, and the filesystem example has three, so the frame is wider
# than the 1280x720 default. Bigger costs bytes in the clip, and the budget is 150 kB.
TWO_PANE = (1400, 800)
THREE_PANE = (1600, 860)

# What the clips and the stills are written at. The frames come out of a lossy
# video, so a full width still is mostly compression noise a PNG has to store
# exactly: 733 kB for one treegrid frame, against 51 kB for the same frame written
# lossily. That is why both are lossy WebP rather than PNG.
#
# 900 is where the table text in a 1400 px frame reads as text rather than as a shape
# the right length. Bytes go with pixel area, so it costs a little under twice what
# 720 did, and `assemble_animation` pays for that by storing each frame as a
# difference from the one before it rather than whole.
CLIP_WIDTH = 900
STILL_WIDTH = 1200
CLIP_QUALITY = 40
# The treegrid is the dense one: half its frame is a wall of prose that never moves,
# and it alone came out over 150 kB at the shared setting. The width stays, because
# the width is what makes the table readable, and the flat areas take the lossy hit.
TREEGRID_QUALITY = 32
STILL_QUALITY = 80

# Each clip drops its own lead: the page load and the settle are a still frame that
# says nothing, and the budget is 4 to 6 seconds of something happening.
TREEGRID_CLIP = "gif@1.0"
VFS_CLIP = "gif@0.3"
FSBROWSER_CLIP = "gif@1.1"

EXAMPLES = "examples.panels.tanstack.table."

# Where the treegrid example's two editors render, counting the tree column.
STATUS, INSTANCES = 1, 2


def open_example(name: str, page: Page, port: int) -> None:
    """Serve one example, wait for its rows, and settle before the first gesture.

    Reloaded per test for the reason the example tests reload: the trees are module
    level and every gesture below writes one.

    The server is left for ``server_cleanup`` to take down. Stopping it here as well
    is a race: a threaded ``pn.serve`` schedules its shutdown and returns before the
    thread is gone, so the fixture's ``pn.state.reset()`` reaches a thread that is
    alive and already stopping, which Panel raises on. One owner, no race.
    """
    example = importlib.reload(importlib.import_module(EXAMPLES + name))
    start(example.app, page, port)
    rows(page).first.wait_for(state="visible", timeout=20000)
    time.sleep(1.2)  # start the clip on a painted, still frame


def row_titled(page: Page, pane: int, title: str):
    """One row of one pane, by the whole of its title.

    Anchored, because Playwright matches a plain string as a case insensitive
    substring and half these titles are prefixes of another one.
    """
    value = page.locator(".pnl-tst-cell--tree .pnl-tst-value", has_text=re.compile(rf"^{re.escape(title)}$"))
    return pane_rows(page, pane).filter(has=value).first


def header(page: Page, label: str):
    return page.locator(f".pnl-tst-hcell:has(.pnl-tst-hlabel:text-is('{label}'))")


def editor(page: Page):
    return page.locator(".pnl-tst-edit").first


def switch(page: Page, label: str):
    """One of the example's option checkboxes, by its label.

    Panel renders each widget into a shadow root of its own whose host is an empty
    div, so the label inside it is the only thing there is to tell the two apart by,
    and the click goes to the input rather than to the host.
    """
    return page.locator(".bk-Checkbox").filter(has=page.get_by_text(label, exact=True)).locator("input")


@pytest.mark.media(
    role="overview",
    capture=TREEGRID_CLIP,
    name="tst_treegrid_columns",
    viewport=TWO_PANE,
    width=CLIP_WIDTH,
    quality=TREEGRID_QUALITY,
)
@pytest.mark.media(
    role="feature",
    capture="screenshot@3.0",
    name="tst_treegrid_columns",
    viewport=TWO_PANE,
    width=STILL_WIDTH,
    quality=STILL_QUALITY,
)
def test_treegrid_columns_media(page: Page, port):
    """Sort a column, pick a value from a dropdown, then edit two cells with Tab.

    The dropdown is on `Status`, which is the column the table was just sorted by,
    so the row visibly moves to where its new value belongs. That is watchable for a
    select and not for a text editor: a select commits on the choice and closes, while
    a text editor is still focused when the row moves under it, and moving a focused
    input blurs it, which commits and closes exactly as clicking away does. Which is
    why the typed edit below is on `Instances`, a column nothing is ordered by.
    """
    open_example("tst_treegrid_columns", page, port)

    header(page, "Status").click()
    time.sleep(0.6)

    # `jobs` is the one row of that name, so it is found however the sort left it.
    row_titled(page, 0, "jobs").locator(".pnl-tst-cell").nth(STATUS).dblclick()
    time.sleep(0.4)
    # The open list is drawn by the browser rather than by the page, so a screencast
    # catches the control and the value it lands on, never the popup itself.
    page.locator(".pnl-tst-edit--select").select_option("stopped")
    time.sleep(0.8)

    row_titled(page, 0, "jobs").locator(".pnl-tst-cell").nth(INSTANCES).dblclick()
    time.sleep(0.3)
    editor(page).fill("")
    editor(page).type("12", delay=130)
    editor(page).press("Tab")  # commits, and opens the next editable cell in the row
    time.sleep(0.3)
    editor(page).fill("")
    editor(page).type("sre", delay=130)
    editor(page).press("Enter")
    time.sleep(0.3)  # short, because the emitter synthesizes a 1.5 s hold of its own


@pytest.mark.media(
    role="overview",
    capture=VFS_CLIP,
    name="tst_vfsexplorer_extfiledrop",
    viewport=TWO_PANE,
    width=CLIP_WIDTH,
    quality=CLIP_QUALITY,
)
@pytest.mark.media(
    role="feature",
    # The closing state: the menu is open and has not started to close again.
    capture="screenshot@7.6",
    name="tst_vfsexplorer_extfiledrop",
    viewport=TWO_PANE,
    width=STILL_WIDTH,
    quality=STILL_QUALITY,
)
def test_vfsexplorer_media(page: Page, port):
    """Move a file between panes, take one in from the desktop, then the two options.

    Six gestures in one clip, which is what makes this the long one: each hold is as
    short as it can be and still be seen, and the pointer travel between them is not
    something a clip can skip.
    """
    open_example("tst_vfsexplorer_extfiledrop", page, port)
    pane_rows(page, 1).first.wait_for(state="visible", timeout=20000)

    drag_across(page, row_titled(page, 0, "invoice.pdf"), row_titled(page, 1, "Scratch"))
    time.sleep(0.6)

    drop_files_onto(page, row_titled(page, 0, "Inbox"), [a_file("plan.md", "text/markdown", body="hello there")])
    time.sleep(0.8)

    # An option, not a mode: the rows are selectable by click and by key either way.
    switch(page, "Checkboxes").click()
    time.sleep(0.5)
    switch(page, "Checkboxes").click()
    time.sleep(0.4)

    switch(page, "Context menu").click()
    time.sleep(0.4)
    # Right click, the gesture a file manager uses. `Shift+F10` and the menu key open
    # the same menu, which is the half a clip cannot show.
    row_titled(page, 0, "Inbox").click(button="right")
    time.sleep(0.3)  # short, because the emitter synthesizes a 1.5 s hold of its own


@pytest.mark.media(
    role="overview",
    capture=FSBROWSER_CLIP,
    name="tst_fsbrowser",
    viewport=THREE_PANE,
    width=CLIP_WIDTH,
    quality=CLIP_QUALITY,
)
@pytest.mark.media(
    role="feature",
    # Late enough that the example has finished counting rows in the DOM, which is
    # the number the whole pane exists to show.
    capture="screenshot@5.6",
    name="tst_fsbrowser",
    viewport=THREE_PANE,
    width=STILL_WIDTH,
    quality=STILL_QUALITY,
)
def test_fsbrowser_media(page: Page, port):
    """Read a directory on demand, then put a number on what pruning saves.

    One expansion rather than two: the pointer crosses three panes here, and every
    glide across them is about nine frames of pure travel. Two directories read
    instead of one says nothing the first one did not.
    """
    open_example("tst_fsbrowser", page, port)

    rows(page).nth(0).locator(".pnl-tst-twisty").click()  # the repository root
    time.sleep(1.4)

    # 100k rather than the 1M the knob also offers: a million costs the browser about
    # five seconds to receive and lay out, which is the whole clip spent on one wait.
    page.get_by_role("button", name="100k", exact=True).click()
    time.sleep(1.8)
