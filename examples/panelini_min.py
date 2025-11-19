"""Minimal example to run Panelini."""

from panel import Card

from panelini import Panelini

# Create an instance of Panelini
app = Panelini(
    title="📊 Welcome to Panelini! 🖥️",
    # main = main_objects # init objects here
)
# Or set objects outside
app.main_set(
    # Use panel components to build your layout
    objects=[
        Card(
            title="Set complete main objects",
            objects=["Some main content goes here"],
            width=300,
            max_height=200,
        )
    ]
)

app.sidebar_set(
    objects=[
        Card(
            title="Set complete sidebar objects",
            objects=["Some sidebar content goes here"],
            width=300,
            max_height=200,
        )
    ]
)

# Servable for debugging using command
# panel serve <panelini_min.py --dev
app.servable()


if __name__ == "__main__":
    # Serve app as you would in panel
    app.serve(port=5010)
