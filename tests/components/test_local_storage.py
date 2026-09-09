"""Tests for the LocalStoragePane component (server-side behavior).

The JS side (hydration, write-through) is exercised by the Playwright test
in ``tests/panels/ai/examples/test_chat_local_storage.py``.
"""

from panelini.components.local_storage import LocalStoragePane


def test_defaults() -> None:
    pane = LocalStoragePane()
    assert pane.namespace == "panelini"
    assert pane.entries == {}
    assert not pane.loaded


def test_namespace_and_data_assignment() -> None:
    pane = LocalStoragePane(namespace="my-app")
    pane.entries = {"settings": {"theme": "dark"}, "draft": "hello"}
    assert pane.namespace == "my-app"
    assert pane.entries["settings"] == {"theme": "dark"}


def test_loaded_watcher_fires() -> None:
    pane = LocalStoragePane()
    seen: list[bool] = []
    pane.param.watch(lambda event: seen.append(event.new), "loaded")
    pane.loaded = True
    assert seen == [True]
