# TerminalMirror

`TerminalMirror` mirrors `sys.stdout` into an on-screen `pn.widgets.Terminal` widget while forwarding every write to the original stream, so the real console still receives output.

## Usage

```python
from panelini.panels.terminalmirror import TerminalMirror

terminal = TerminalMirror()          # starts mirroring immediately
print("Hello!")                      # appears in widget and in the console
terminal.stop()
```

Pass `mirror=False` to defer redirection: useful when the component is
created at import time and you only want to start capturing on demand:

```python
terminal = TerminalMirror(mirror=False)

def on_click(event):
    terminal.start()
    print("captured from here on")
```

## Context manager

```python
with TerminalMirror() as terminal:
    print("captured")               # appears in widget and console
# sys.stdout is restored here
```

## Collapse / expand in a Card

When the terminal is placed inside a `pn.Card`, the xterm.js frontend buffer
is destroyed on collapse. `TerminalMirror` **automatically** wires the
collapse/expand replay when any `pn.Card` is constructed that contains it,
no extra call needed:

```python
import panel as pn
from panelini.panels.terminalmirror import TerminalMirror

terminal = TerminalMirror(mirror=False)

card = pn.Card(terminal, title="Output")   # collapse watcher registered automatically
```

The same applies when the terminal is nested inside a custom `pn.viewable.Viewer`:

```python
class MyApp(pn.viewable.Viewer):
    def __init__(self):
        super().__init__()
        self.terminal = TerminalMirror(mirror=False)
        self._view = pn.Column(self.terminal)

    def __panel__(self):
        return self._view

app = MyApp()
card = pn.Card(app, title="Output")   # TerminalMirror inside MyApp is found and wired
```

To wire a card that was constructed *before* the terminal existed, call
`bind_collapse` manually (it is idempotent, safe to call more than once):

```python
terminal.bind_collapse(card)
```

## API Reference

See the full API documentation: {py:class}`panelini.panels.terminalmirror.terminalmirror.TerminalMirror`
