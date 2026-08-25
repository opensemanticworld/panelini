"""Test cases for the Panelini wunderbaum panel."""

from panelini.panels.wunderbaum import Wunderbaum


def test_wunderbaum_creation():
    """Test that a Wunderbaum panel can be created."""
    tree = Wunderbaum()
    assert isinstance(tree, Wunderbaum)


def test_wunderbaum_with_source():
    """Test that Wunderbaum can be initialized with source data."""
    source = [
        {
            "title": "Node 1",
            "key": "1",
            "children": [
                {"title": "Node 1.1", "key": "1.1"},
            ],
        },
        {"title": "Node 2", "key": "2"},
    ]
    tree = Wunderbaum(source=source)
    assert tree.source == source
    assert len(tree.source) == 2


def test_wunderbaum_with_columns():
    """Test that Wunderbaum can be initialized with column definitions."""
    columns = [
        {"id": "*", "title": "Name", "width": "200px"},
        {"id": "size", "title": "Size", "width": "100px"},
    ]
    tree = Wunderbaum(source=[], columns=columns)
    assert tree.columns == columns
    assert len(tree.columns) == 2


def test_wunderbaum_with_options():
    """Test that Wunderbaum can be initialized with options."""
    options = {"checkbox": True}
    tree = Wunderbaum(options=options)
    assert tree.options == options


def test_wunderbaum_with_types():
    """Test that Wunderbaum can be initialized with type definitions."""
    types = {
        "folder": {"icon": "bi bi-folder"},
        "file": {"icon": "bi bi-file-earmark"},
    }
    tree = Wunderbaum(types=types)
    assert tree.types == types


def test_wunderbaum_clear():
    """Test that clear() resets the source."""
    source = [{"title": "Node", "key": "1"}]
    tree = Wunderbaum(source=source)
    assert len(tree.source) == 1
    tree.clear()
    assert tree.source == []


def test_wunderbaum_get_source():
    """Test that get_source() returns a copy of the source."""
    source = [{"title": "Node", "key": "1"}]
    tree = Wunderbaum(source=source)
    result = tree.get_source()
    assert result == source
    assert result is not tree.source


def test_wunderbaum_set_source():
    """Test that set_source() replaces the source."""
    tree = Wunderbaum(source=[{"title": "Old", "key": "old"}])
    new_source = [{"title": "New", "key": "new"}]
    tree.set_source(new_source)
    assert tree.source == new_source


def test_wunderbaum_callbacks():
    """Test that callbacks can be set."""
    events_received: list = []

    def on_event(name: str, params: dict) -> None:
        events_received.append((name, params))

    tree = Wunderbaum(tree_event_callback=on_event)
    # Simulate an event
    tree.handle_tree_event("activate", {"key": "1"})
    assert len(events_received) == 1
    assert events_received[0] == ("activate", {"key": "1"})


def test_wunderbaum_tree_only_mode():
    """Test that tree-only mode is the default (no columns)."""
    tree = Wunderbaum(source=[{"title": "Node", "key": "1"}])
    assert tree.columns == []


def test_wunderbaum_table_mode():
    """Test tree+table mode with columns."""
    tree = Wunderbaum(
        source=[{"title": "Node", "key": "1", "data": {"size": "10 KB"}}],
        columns=[
            {"id": "*", "title": "Name", "width": "200px"},
            {"id": "size", "title": "Size", "width": "100px"},
        ],
    )
    assert len(tree.columns) == 2


def test_event_batches_dispatch_in_order():
    """A {seq, events} batch delivers every event; same-gesture pairs survive."""
    events_received: list = []

    def on_event(name: str, params: dict) -> None:
        events_received.append((name, params))

    tree = Wunderbaum(tree_event_callback=on_event)
    tree._event_data = {
        "seq": 1,
        "events": [
            {"event_name": "click", "event_params": {"key": "1", "action": "delete"}},
            {"event_name": "activate", "event_params": {"key": "1"}},
        ],
    }
    assert events_received == [
        ("click", {"key": "1", "action": "delete"}),
        ("activate", {"key": "1"}),
    ]


def test_legacy_single_event_shape_still_dispatches():
    events_received: list = []
    tree = Wunderbaum(tree_event_callback=lambda name, params: events_received.append(name))
    tree._event_data = {"event_name": "click", "event_params": {"key": "1"}}
    assert events_received == ["click"]


def test_start_edit_title_sends_the_tree_action():
    tree = Wunderbaum()
    tree.start_edit_title("node-1")
    assert tree._tree_action["action"] == "startEditTitle"
    assert tree._tree_action["payload"] == {"key": "node-1"}
