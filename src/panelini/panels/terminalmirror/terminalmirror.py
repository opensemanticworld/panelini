"""Entrypoint of terminalmirror panel."""

import contextlib
import sys
from types import TracebackType
from typing import Any, Optional, TextIO

import panel as pn
import param  # type: ignore[import-untyped]

pn.extension()


class TerminalMirror(pn.viewable.Viewer):
    """Mirror ``sys.stdout`` into an on-screen ``pn.widgets.Terminal``.

    While active, everything written to ``sys.stdout`` is shown in the embedded
    terminal widget *and* forwarded to the original stream, so the real console
    still receives the output (inspired by the classic "tee stdout to a log"
    recipe, https://stackoverflow.com/questions/616645).

    Redirection is opt-in: it starts automatically on construction unless
    ``mirror=False`` is passed, and can be controlled explicitly via
    :meth:`start`/:meth:`stop` or by using the instance as a context manager::

        with TerminalMirror() as term:
            print("captured")  # appears in the widget and on the console

    ``stop`` only restores ``sys.stdout`` when this instance is still the active
    stream, so it never clobbers an unrelated redirect installed afterwards.
    """

    sizing_mode = param.String(default="stretch_both", doc="Panel sizing mode of the terminal widget.")
    options = param.Dict(
        default={"cursorBlink": True},
        doc="Options forwarded to the underlying xterm.js terminal.",
    )

    def __init__(self, mirror: bool = True, **params: Any) -> None:
        """Initialize the TerminalMirror.

        When this instance is placed inside a ``pn.Card`` (directly or via a
        nested ``pn.viewable.Viewer``), collapse/expand buffer-replay is wired
        automatically — no explicit :meth:`bind_collapse` call required.

        Args:
            mirror: If True (default), immediately redirect ``sys.stdout`` into
                the terminal widget. If False, the widget is created but
                redirection must be started explicitly via :meth:`start`.
            **params: Additional parameters passed to ``pn.viewable.Viewer``.
        """
        super().__init__(**params)

        self._terminal = pn.widgets.Terminal(
            options=self.options,
            sizing_mode=self.sizing_mode,
        )
        self._original_stdout: Optional[TextIO] = None
        self._bound_cards: set[int] = set()

        if mirror:
            self.start()

    def start(self) -> None:
        """Redirect ``sys.stdout`` into the terminal widget.

        Idempotent: calling it again while already active is a no-op.
        """
        if self._original_stdout is not None:
            return
        self._original_stdout = sys.stdout
        sys.stdout = self

    def stop(self) -> None:
        """Restore the original ``sys.stdout``.

        Idempotent and safe: only restores when this instance is still the
        active stream, so a redirect installed after :meth:`start` is left
        untouched.
        """
        if self._original_stdout is None:
            return
        if sys.stdout is self:
            sys.stdout = self._original_stdout
        self._original_stdout = None

    def write(self, data: str) -> int:
        """Write ``data`` to the terminal widget and the original stream.

        Args:
            data: The text to write.

        Returns:
            The number of characters written (file-like contract).
        """
        self._terminal.write(data)
        if self._original_stdout is not None:
            self._original_stdout.write(data)
        return len(data)

    def flush(self) -> None:
        """Flush the terminal widget and the original stream."""
        self._terminal.flush()
        if self._original_stdout is not None:
            self._original_stdout.flush()

    def redraw(self) -> None:
        """Re-render the full buffer into the terminal widget.

        Panel's ``Terminal`` only streams the latest chunk to the browser; the
        full scrollback lives in the frontend xterm.js buffer, which is
        destroyed whenever the widget is unmounted (e.g. when a containing
        ``Card`` is collapsed). Calling this on remount clears the widget and
        replays the accumulated output so nothing is lost.
        """
        output = self._terminal.output
        self._terminal.clear()
        if output:
            self._terminal.write(output)

    def _bind_to_card(self, card: pn.Card) -> None:
        """Bind to *card* (delegates to :meth:`bind_collapse`, which deduplicates)."""
        self.bind_collapse(card)

    def bind_collapse(self, card: pn.Card) -> None:
        """Wire a collapsible ``Card`` so the buffer survives collapse/expand.

        Collapsing a ``Card`` unmounts the terminal and destroys its frontend
        scrollback, and Panel provides no Python-side remount hook (the model is
        reused, so ``_get_model`` is not called again). This watches the card's
        ``collapsed`` state and :meth:`redraw`\\ s the accumulated output each
        time it is expanded.

        Idempotent: calling it again with the same card is a no-op.

        This is called automatically when a ``pn.Card`` is created that contains
        this ``TerminalMirror`` (directly or nested inside a
        ``pn.viewable.Viewer``). Call manually only when the terminal is added
        to a card *after* the card is constructed.

        Args:
            card: The ``pn.Card`` (or any object with a ``collapsed`` param)
                that contains this terminal.
        """
        if id(card) in self._bound_cards:
            return
        self._bound_cards.add(id(card))

        def _redraw_on_expand(event: Any) -> None:
            if event.new is False:  # collapsed -> expanded
                self.redraw()

        card.param.watch(_redraw_on_expand, "collapsed")

    def __enter__(self) -> "TerminalMirror":
        """Start redirection on entering the context."""
        self.start()
        return self

    def __exit__(
        self,
        exc_type: Optional[type[BaseException]],
        exc_value: Optional[BaseException],
        traceback: Optional[TracebackType],
    ) -> None:
        """Stop redirection on leaving the context."""
        self.stop()

    def __del__(self) -> None:
        """Best-effort restore of ``sys.stdout`` on garbage collection."""
        with contextlib.suppress(Exception):
            self.stop()

    def __panel__(self) -> pn.widgets.Terminal:
        """Return the underlying terminal widget for rendering."""
        return self._terminal


# ---------------------------------------------------------------------------
# Auto-wire collapse behaviour when a pn.Card containing a TerminalMirror is
# created.  The patch fires once per Card construction, walks the object tree,
# and calls _bind_to_card on every TerminalMirror it finds.
# ---------------------------------------------------------------------------


def _find_and_bind_terminal_mirrors(obj: Any, card: pn.Card, visited: set) -> None:
    """Find ``TerminalMirror`` instances in *obj* and bind them to *card*.

    Panel unwraps ``Viewer`` subclasses when storing them in layout ``objects``,
    so walking ``card.objects`` never surfaces a ``TerminalMirror``.  Instead
    this function receives the *original* arguments passed to the Card (before
    Panel processes them) and searches ``Viewer`` instance attributes directly.
    """
    if id(obj) in visited:
        return
    visited.add(id(obj))

    if isinstance(obj, TerminalMirror):
        obj._bind_to_card(card)
        return

    if isinstance(obj, pn.viewable.Viewer):
        with contextlib.suppress(Exception):
            for attr_val in vars(obj).values():
                if isinstance(attr_val, (TerminalMirror, pn.viewable.Viewer)):
                    _find_and_bind_terminal_mirrors(attr_val, card, visited)


def _patch_pn_card_for_terminal_mirror() -> None:
    if getattr(pn.Card, "_terminalmirror_collapse_patched", False):
        return
    _orig_init = pn.Card.__init__

    def _patched_init(self: pn.Card, *args: Any, **kwargs: Any) -> None:
        _orig_init(self, *args, **kwargs)
        # Use the original args — card.objects already has Viewers unwrapped
        original_objects = list(args) + list(kwargs.get("objects", []))
        visited: set[int] = set()
        for obj in original_objects:
            _find_and_bind_terminal_mirrors(obj, self, visited)

    pn.Card.__init__ = _patched_init  # type: ignore[method-assign]
    pn.Card._terminalmirror_collapse_patched = True


_patch_pn_card_for_terminal_mirror()
