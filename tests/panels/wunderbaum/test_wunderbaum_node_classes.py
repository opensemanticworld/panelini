"""Playwright E2E tests for Wunderbaum node classes and no-events activation.

Wunderbaum stores row classes as a `Set<string>` and its renderer spreads that
set into `classList.add()`. `updateNode` used to assign a raw string, which
was added to the class list one character at a time and threw
`InvalidCharacterError` on any class list containing a space.

`setActiveNode` now forwards its options through to the node, so a
`no_events=True` activation - used to mirror the active node across trees
without retriggering the handler that caused it - actually suppresses the
`activate` event while still activating the node.

Two trees are served side by side, each mirroring the other's activation with
`no_events=True`, so the last test can check that mirroring settles instead
of looping without end.
"""

import copy
import time

import panel as pn
import pytest
from playwright.sync_api import Page

from panelini.panels.wunderbaum import Wunderbaum
from panelini.testing import free_port, wait_until, wb_row, wb_title_center, wb_wait

SOURCE = [
    {"title": "Alpha", "key": "alpha"},
    {"title": "Beta", "key": "beta"},
    {"title": "Gamma", "key": "gamma"},
]

MIRROR_SOURCE = [
    {"title": "M-Alpha", "key": "alpha"},
    {"title": "M-Beta", "key": "beta"},
    {"title": "M-Gamma", "key": "gamma"},
]

_events: list = []
_mirror_events: list = []


def _on_tree_event(name: str, params: dict) -> None:
    _events.append({"name": name, **params})
    if name == "activate":
        mirror.set_active_node(params["key"], no_events=True)


def _on_mirror_event(name: str, params: dict) -> None:
    _mirror_events.append({"name": name, **params})
    if name == "activate":
        tree.set_active_node(params["key"], no_events=True)


tree = Wunderbaum(
    source=copy.deepcopy(SOURCE),
    tree_event_callback=_on_tree_event,
)

mirror = Wunderbaum(
    source=copy.deepcopy(MIRROR_SOURCE),
    tree_event_callback=_on_mirror_event,
)


@pytest.fixture(autouse=True)
def server_cleanup():
    """Override the parent fixture - don't reset Panel state mid-run.

    Both trees share one module-scoped ``pn.serve()``; ``pn.state.reset()``
    after every test would tear down that shared server's session state.
    """
    yield


@pytest.fixture(scope="module")
def panel_server():
    """Serve both trees side by side once for the whole module."""
    port = free_port()
    pn.serve(pn.Row(tree, mirror), port=port, threaded=True, show=False)
    time.sleep(0.2)
    yield port
    pn.state.kill_all_servers()


@pytest.fixture
def ready_page(browser, panel_server):
    """Fresh browser page per test, against the module-scoped shared server."""
    tree.source = copy.deepcopy(SOURCE)
    mirror.source = copy.deepcopy(MIRROR_SOURCE)
    _events.clear()
    _mirror_events.clear()
    context = browser.new_context()
    page = context.new_page()
    page.goto(f"http://localhost:{panel_server}")
    wb_wait(page)
    yield page
    page.goto("about:blank")
    context.close()


def _row_classes(page: Page, title: str) -> set[str]:
    """Class names on a node's row, split from the ``class`` attribute."""
    class_attr = wb_row(page, title).get_attribute("class") or ""
    return set(class_attr.split())


def _activates(events: list) -> list:
    return [e for e in events if e["name"] == "activate"]


def test_update_node_applies_a_single_class(ready_page: Page):
    """A plain class name reaches the row's class attribute."""
    page = ready_page

    tree.update_node("alpha", {"classes": "highlighted"})
    wait_until(lambda: "highlighted" in _row_classes(page, "Alpha"))

    assert "highlighted" in _row_classes(page, "Alpha")


def test_update_node_applies_two_classes(ready_page: Page):
    """A multi-word class string must not throw InvalidCharacterError.

    Before the fix, ``node.classes = "highlighted urgent"`` was spread into
    ``classList.add()`` one character at a time, and the space in the string
    threw.
    """
    page = ready_page
    errors: list[str] = []
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    tree.update_node("alpha", {"classes": "highlighted urgent"})
    wait_until(lambda: {"highlighted", "urgent"} <= _row_classes(page, "Alpha"))

    classes = _row_classes(page, "Alpha")
    assert "highlighted" in classes
    assert "urgent" in classes
    assert not any("InvalidCharacterError" in e for e in errors)


def test_update_node_replaces_rather_than_merges(ready_page: Page):
    """A second ``updateNode`` call replaces the classes, it does not merge them."""
    page = ready_page

    tree.update_node("alpha", {"classes": "one"})
    wait_until(lambda: "one" in _row_classes(page, "Alpha"))

    tree.update_node("alpha", {"classes": "two"})
    wait_until(lambda: "two" in _row_classes(page, "Alpha"))

    classes = _row_classes(page, "Alpha")
    assert "two" in classes
    assert "one" not in classes


def test_empty_string_clears_the_classes(ready_page: Page):
    """An empty classes string clears them, leaving the row's own classes."""
    page = ready_page

    tree.update_node("alpha", {"classes": "highlighted"})
    wait_until(lambda: "highlighted" in _row_classes(page, "Alpha"))

    tree.update_node("alpha", {"classes": ""})
    wait_until(lambda: "highlighted" not in _row_classes(page, "Alpha"))

    classes = _row_classes(page, "Alpha")
    assert "highlighted" not in classes
    assert "wb-row" in classes


def test_set_active_node_emits_one_activate_by_default(ready_page: Page):
    """The default call is unchanged: exactly one activate event, for the right key."""
    page = ready_page
    _events.clear()

    tree.set_active_node("beta")
    wait_until(lambda: bool(_activates(_events)))
    page.wait_for_timeout(300)  # a broken no_events would keep the mirror echoing

    activates = _activates(_events)
    assert len(activates) == 1
    assert activates[0]["key"] == "beta"


def test_set_active_node_with_no_events_emits_nothing(ready_page: Page):
    """``no_events=True`` still activates the node, but suppresses the event."""
    page = ready_page
    _events.clear()

    tree.set_active_node("beta", no_events=True)
    wait_until(lambda: "wb-active" in _row_classes(page, "Beta"))
    page.wait_for_timeout(300)  # give a stray event time to arrive, if there were one

    assert not _activates(_events)
    assert "wb-active" in _row_classes(page, "Beta")


def test_source_carries_classes_as_a_string(ready_page: Page):
    """Classes round-trip to Python as a space-joined string, not a dict.

    Before the fix, ``getSerializableSource`` put the raw ``Set`` into the
    payload, which JSON-encodes to ``{}`` and silently drops the classes.
    """
    page = ready_page  # noqa: F841 - the page must be open for the source to sync

    tree.update_node("alpha", {"classes": "highlighted urgent"})

    def _synced() -> bool:
        node = next((n for n in tree.source if n["key"] == "alpha"), None)
        return bool(node and "classes" in node)

    wait_until(_synced, timeout=5.0)

    node = next(n for n in tree.source if n["key"] == "alpha")
    assert isinstance(node["classes"], str)
    assert set(node["classes"].split()) == {"highlighted", "urgent"}


def test_loaded_classes_survive_the_round_trip(ready_page: Page):
    """Classes that arrive in the source come back as a string, not as ``{}``.

    This is the second path into ``node.classes``. Wunderbaum's loader runs
    a ``classes`` string through ``toSet()``, so a node loaded from the
    source holds a ``Set`` even when ``updateNode`` was never called. Test
    7 covers the ``updateNode`` path; this one covers the loader path.
    """
    page = ready_page

    with_classes = copy.deepcopy(SOURCE)
    with_classes[0]["classes"] = "highlighted urgent"
    tree.source = with_classes
    wait_until(lambda: {"highlighted", "urgent"} <= _row_classes(page, "Alpha"), timeout=5.0)

    # Any update re-serializes the whole tree and syncs it back. Renaming a
    # different node gives a signal that the sync has actually happened.
    tree.update_node("beta", {"title": "Beta-renamed"})

    def _synced() -> bool:
        node = next((n for n in tree.source if n["key"] == "beta"), None)
        return bool(node and node.get("title") == "Beta-renamed")

    wait_until(_synced, timeout=5.0)

    alpha = next(n for n in tree.source if n["key"] == "alpha")
    assert isinstance(alpha["classes"], str)
    assert set(alpha["classes"].split()) == {"highlighted", "urgent"}


def test_mirrored_activation_does_not_loop(ready_page: Page):
    """Clicking a node in one tree activates its mirror without looping.

    Each tree's activate handler sets the other tree's active node with
    ``no_events=True``. Without that suppression the two calls would
    retrigger each other without end; the event count bound is what proves
    they settle instead.
    """
    page = ready_page
    _events.clear()
    _mirror_events.clear()

    x, y = wb_title_center(page, "Alpha")
    page.mouse.click(x, y)
    wait_until(lambda: "wb-active" in _row_classes(page, "M-Alpha"), timeout=5.0)
    page.wait_for_timeout(300)  # let a runaway retrigger show up before counting

    assert "wb-active" in _row_classes(page, "M-Alpha")
    assert len(_events) + len(_mirror_events) < 10
