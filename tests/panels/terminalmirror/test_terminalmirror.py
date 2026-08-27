"""Test cases for the Panelini terminalmirror panel."""

import sys

import panel as pn

from panelini.panels.terminalmirror import TerminalMirror


def test_creation():
    """Test that a TerminalMirror panel can be created without redirecting."""
    term = TerminalMirror(mirror=False)
    assert isinstance(term, TerminalMirror)
    assert isinstance(term.__panel__(), pn.widgets.Terminal)


def test_write_returns_length():
    """Test that write() returns the number of characters written."""
    term = TerminalMirror(mirror=False)
    assert term.write("hi") == 2


def test_start_stop_restores_stdout():
    """Test that start() redirects and stop() restores sys.stdout."""
    original = sys.stdout
    term = TerminalMirror(mirror=False)
    try:
        term.start()
        assert sys.stdout is term
    finally:
        term.stop()
    assert sys.stdout is original


def test_context_manager_restores_stdout():
    """Test that the context manager redirects inside and restores after."""
    original = sys.stdout
    with TerminalMirror(mirror=False) as term:
        assert sys.stdout is term
    assert sys.stdout is original


def test_stop_is_idempotent_and_safe_when_not_active():
    """Test that stop() is a no-op when redirection was never started."""
    original = sys.stdout
    term = TerminalMirror(mirror=False)
    term.stop()
    assert sys.stdout is original


def test_start_is_idempotent():
    """Test that calling start() twice does not lose the original stream."""
    original = sys.stdout
    term = TerminalMirror(mirror=False)
    try:
        term.start()
        term.start()
        assert sys.stdout is term
        assert term._original_stdout is original
    finally:
        term.stop()
    assert sys.stdout is original


def test_nested_redirect_not_clobbered():
    """Test that stop() leaves a redirect installed after start() untouched."""
    original = sys.stdout
    term = TerminalMirror(mirror=False)
    term.start()
    foreign = object()
    sys.stdout = foreign  # type: ignore[assignment]
    try:
        term.stop()
        assert sys.stdout is foreign
    finally:
        sys.stdout = original


def test_print_is_mirrored():
    """Test that print() reaches both the widget and the original stream."""
    term = TerminalMirror(mirror=False)
    try:
        term.start()
        print("mirrored line")
    finally:
        term.stop()
    # After stop, the widget has buffered the written text.
    assert "mirrored line" in term._terminal.output


def test_redraw_preserves_output_and_signals_clear():
    """redraw() replays the full buffer (clear + rewrite) without losing it."""
    term = TerminalMirror(mirror=False)
    term.write("alpha\n")
    term.write("bravo\n")
    output_before = term._terminal.output
    clears_before = term._terminal._clears

    term.redraw()

    assert term._terminal.output == output_before
    assert term._terminal._clears == clears_before + 1


def test_redraw_empty_buffer_is_safe():
    """redraw() on an empty terminal clears without writing anything."""
    term = TerminalMirror(mirror=False)
    term.redraw()
    assert term._terminal.output == ""


def test_bind_collapse_redraws_on_expand():
    """bind_collapse() replays the buffer when the bound card is expanded."""
    term = TerminalMirror(mirror=False)
    card = pn.Card(term, collapsed=False)
    term.bind_collapse(card)

    term.write("kept line\n")
    clears_before = term._terminal._clears

    card.collapsed = True
    card.collapsed = False

    assert term._terminal._clears == clears_before + 1
    assert "kept line" in term._terminal.output


def test_bind_collapse_ignores_collapse():
    """bind_collapse() does not redraw when the card is merely collapsed."""
    term = TerminalMirror(mirror=False)
    card = pn.Card(term, collapsed=False)
    term.bind_collapse(card)

    term.write("kept line\n")
    clears_before = term._terminal._clears

    card.collapsed = True

    assert term._terminal._clears == clears_before


def test_example_redraws_on_card_expand():
    """The panelini example's auto-bind-on-Card-construction wiring works.

    Builds a fresh ``TerminalMirrorDemo`` + ``Card`` (same construction shape
    as the real example), rather than importing its module-level singleton -
    that singleton is also served by the UI test in
    tests/panels/terminalmirror/examples/test_terminalmirror_panelini_min.py,
    and sharing it here caused rare cross-test interference under a loaded
    CI runner (the UI test's own redraw-on-expand check would occasionally
    never observe its own click's effect within a generous timeout).
    """
    from examples.panels.terminalmirror.terminalmirror_panelini_min import TerminalMirrorDemo

    demo = TerminalMirrorDemo()
    card = pn.Card(demo, collapsed=False)

    term = demo.terminal
    term.write("persisted line\n")
    clears_before = term._terminal._clears

    card.collapsed = True
    card.collapsed = False

    assert term._terminal._clears == clears_before + 1
    assert "persisted line" in term._terminal.output
