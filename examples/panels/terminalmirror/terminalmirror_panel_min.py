"""Minimal example demonstrating the TerminalMirror panel.

Click the button to print to ``stdout``: the text appears both in the on-screen
terminal widget and on the real console.
"""

import panel as pn

from panelini.panels.terminalmirror import TerminalMirror


class App(pn.viewable.Viewer):
    def __init__(self, **params):
        super().__init__(**params)

        # mirror=False keeps module import side-effect free; mirroring is started
        # lazily on the first button click (start() is idempotent).
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
app = App()
terminal = app.terminal

if pn.state.served:
    pn.extension(sizing_mode="stretch_width")

    app.servable()

if __name__ == "__main__":
    pn.serve(app)
