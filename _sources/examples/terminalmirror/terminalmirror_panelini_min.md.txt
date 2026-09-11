# Terminal mirror inside panelini

```{image} /_static/media/terminalmirror/terminalmirror_panelini_min_feature.webp
:alt: terminal mirror panel inside a panelini shell
:class: docs-media
```

**Source:** [`examples/panels/terminalmirror/terminalmirror_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/terminalmirror/terminalmirror_panelini_min.py)
**Test:** [`tests/panels/terminalmirror/examples/test_terminalmirror_panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/terminalmirror/examples/test_terminalmirror_panelini_min.py)

The same minimal `TerminalMirror` as {doc}`terminalmirror_panel_min`, this time hosted inside a Panelini shell. The panel drops into a collapsible `pn.Card`, and the accumulated output survives a collapse/expand because the buffer is replayed on remount.

Clicking *Print to terminal* mirrors the printed line into the on-screen terminal and the real console. The panel itself is unchanged from the standalone version - this is the whole point of the panels-are-standalone design.

## The code

```python
import panel as pn

from panelini import Panelini
from panelini.panels.terminalmirror import TerminalMirror


class TerminalMirrorDemo(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        self.terminal = TerminalMirror(mirror=False)

        self._count = 0
        self.print_btn = pn.widgets.Button(css_classes=["print_btn"], name="Print to terminal", button_type="primary")
        pn.bind(self.on_print, self.print_btn, watch=True)

        self._view = pn.Column(
            self.print_btn,
            self.terminal,
            sizing_mode="stretch_both",
        )

    def on_print(self, event):
        self.terminal.start()
        self._count += 1
        print(f"Hello from TerminalMirror! (click #{self._count})")

    def __panel__(self):
        return self._view


terminalmirror_panel = TerminalMirrorDemo()

card = pn.Card(
    title="Terminal Mirror",
    objects=[terminalmirror_panel],
    sizing_mode="stretch_both",
)

app = Panelini(title="Terminal Mirror Demo", sidebar_enabled=False)
app.main_set(objects=[pn.Row(card)])
app.servable()
```

## Run it live

This example runs entirely in your browser via Pyodide. In the browser the terminal renders an on-screen console mirror (xterm.js is not available in WASM). The first load downloads packages, so give it a few seconds.

```{raw} html
<iframe class="pf-live" src="../../_static/portfolio/apps/terminalmirror/terminalmirror_panelini_min.html" title="Terminal mirror inside panelini" loading="lazy"></iframe>
<p><a href="../../_static/portfolio/apps/terminalmirror/terminalmirror_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## See also

- {doc}`../../panels/terminalmirror`
