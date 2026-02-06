import panel as pn

from panelini import Panelini

from .jsoneditor_panel_min import App as JsonEditorPanel

# Create an instance of the App component
jsoneditor_panel = JsonEditorPanel()

# Create an instance of Panelini
app = Panelini(
    title="📝 JSON Editor Demo",
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
