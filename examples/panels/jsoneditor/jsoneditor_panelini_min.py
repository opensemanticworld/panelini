import panel as pn

from panelini import Panelini
from panelini.panels.jsoneditor import JsonEditor


class JsonEditorPanel(pn.viewable.Viewer):
    """JSON editor with a live JSON preview and a save button.

    Defined inline (rather than imported from ``jsoneditor_panel_min``) so this
    example is self-contained - the docs portfolio inlines a single file's source
    into a standalone Pyodide app, where sibling example modules are unavailable.
    """

    def __init__(self, **params):
        super().__init__(**params)

        self.jsoneditor = JsonEditor(max_height=500, max_width=800)

        self.save_btn = pn.widgets.Button(css_classes=["save_btn"], name="Save", button_type="primary")
        pn.bind(self.on_save, self.save_btn, watch=True)

        self._view = pn.Column(
            self.jsoneditor,
            pn.pane.JSON(self.jsoneditor.param.value, theme="light"),
            self.save_btn,
        )

    def on_save(self, event):
        # Handle the save event here
        print("Save button clicked")
        print("Current value:", self.jsoneditor.get_value())
        # Update the schema or any other logic as needed
        self.jsoneditor.set_schema({**self.jsoneditor.options["schema"], "title": "Updated Title"}, keep_value=True)

    def __panel__(self):
        return self._view


# Create an instance of the App component
jsoneditor_panel = JsonEditorPanel()

# Create an instance of Panelini (empty sidebar collapsed for full width)
app = Panelini(
    title="📝 JSON Editor Demo",
    sidebar_visible=False,
)

# Set the main content with the App component
app.main_set(
    objects=[
        pn.Card(
            title="JSON Editor",
            objects=[jsoneditor_panel],
            max_height=800,
        )
    ]
)

# Servable for debugging using command
# panel serve basic_demo.py --dev
app.servable()

if __name__ == "__main__":
    # Serve app as you would in panel
    pn.io.server.serve(app, port=5010)
