# TerminalMirror

```{image} /_static/media/terminalmirror/terminalmirror_panelini_min_feature.webp
:alt: terminal mirror panel inside a panelini shell
:class: docs-media
```

`TerminalMirror` mirrors `sys.stdout` into an on-screen `pn.widgets.Terminal` widget while forwarding every write to the original stream, so the real console still receives output. It is a plain Panel `Viewer`, so it works standalone or inside a Panelini shell.

## Quickstart

```python
from panelini.panels.terminalmirror import TerminalMirror

terminal = TerminalMirror()          # starts mirroring immediately
print("Hello!")                      # appears in widget and in the console
terminal.stop()
```

## Standalone panel

```{image} /_static/media/terminalmirror/terminalmirror_panel_min_feature.png
:alt: standalone terminal mirror panel with a print button
:class: docs-media
```

A self-contained `App` that hosts a `TerminalMirror` without the Panelini shell. A Panel *Print to terminal* button prints to `sys.stdout`, and the text appears both in the on-screen terminal widget and on the real console.

Redirection is lazy: the panel is built with `mirror=False`, so importing the module has no side effect on `sys.stdout`. The first button click calls `start()` (idempotent) and only then begins mirroring.

```{literalinclude} ../../examples/panels/terminalmirror/terminalmirror_panel_min.py
:language: python
:pyobject: App
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/terminalmirror/terminalmirror_panel_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/terminalmirror/examples/test_terminalmirror_panel_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/terminalmirror/terminalmirror_panel_min.html" title="Terminal mirror - minimal (standalone)" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/terminalmirror/terminalmirror_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

```{note}
The live demo runs in your browser via Pyodide, where xterm.js is unavailable, so the terminal falls back to an on-screen console mirror. The first load downloads packages, so give it a few seconds.
```

## Inside a Panelini shell

```{image} /_static/media/terminalmirror/terminalmirror_panelini_min_feature.webp
:alt: terminal mirror panel inside a panelini shell
:class: docs-media
```

The same panel, this time hosted in a Panelini shell. It drops into a collapsible `pn.Card`, and the accumulated output survives a collapse and expand because the buffer is replayed on remount. The panel class itself is unchanged from the standalone version, which is the point of the panels-are-standalone design.

```{literalinclude} ../../examples/panels/terminalmirror/terminalmirror_panelini_min.py
:language: python
:start-at: card = pn.Card(
:end-at: app.main_set(objects=[pn.Row(card)])
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/terminalmirror/terminalmirror_panelini_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/terminalmirror/examples/test_terminalmirror_panelini_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/terminalmirror/terminalmirror_panelini_min.html" title="Terminal mirror inside panelini" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/terminalmirror/terminalmirror_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Options

### Deferred mirroring

Pass `mirror=False` to defer redirection. This is useful when the component is
created at import time and you only want to start capturing on demand:

```python
terminal = TerminalMirror(mirror=False)

def on_click(event):
    terminal.start()
    print("captured from here on")
```

### Context manager

```python
with TerminalMirror() as terminal:
    print("captured")               # appears in widget and console
# sys.stdout is restored here
```

### Collapse and expand in a Card

When the terminal is placed inside a `pn.Card`, the xterm.js frontend buffer
is destroyed on collapse. `TerminalMirror` **automatically** wires the
collapse/expand replay when any `pn.Card` is constructed that contains it, so
no extra call is needed:

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
`bind_collapse` manually (it is idempotent, so it is safe to call more than once):

```python
terminal.bind_collapse(card)
```

## API reference

{py:class}`panelini.panels.terminalmirror.terminalmirror.TerminalMirror`
