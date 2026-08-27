"""Simple TerminalMirror example wrapped in Panelini."""

import panel as pn

from panelini import Panelini
from panelini.panels.terminalmirror import TerminalMirror


class TerminalMirrorDemo(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        # mirror=False keeps module import side-effect free; mirroring is started
        # lazily on the first button click (start() is idempotent).
        # The terminal stretches to fill the content area by default.
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


# Module-level instances so tests can import and serve the app.
terminalmirror_panel = TerminalMirrorDemo()


card = pn.Card(
    title="Terminal Mirror",
    objects=[terminalmirror_panel],
    sizing_mode="stretch_both",
)

# Create an instance of Panelini
app = Panelini(
    title="🖥️ Terminal Mirror Demo",
    sidebar_enabled=False,
)

# Set the main content with the demo component
# Row wrapping is for collapse bahaviour of card content
app.main_set(objects=[pn.Row(card)])

# Servable for debugging using command
# panel serve terminalmirror_panelini_min.py --dev
app.servable()

if __name__ == "__main__":
    # Serve app as you would in panel
    pn.io.server.serve(app, port=5010)
