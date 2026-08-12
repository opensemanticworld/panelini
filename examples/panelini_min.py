"""Minimal example to run Panelini."""

import panel as pn

from panelini import Panelini

# Create an instance of Panelini
app = Panelini(
    title="📊 Welcome to Panelini! 🖥️",
    # main = main_objects # init objects here
    sidebar_right_enabled=True,
)
# Or set objects outside
app.main_set(
    # Use panel components to build your layout
    objects=[
        pn.Card(
            title="Set complete main objects",
            objects=["Some main content goes here"],
            width=300,
            max_height=200,
        )
    ]
)


# Annotated as list[Viewable] (not inferred as list[Card]) since list is
# invariant: sidebar_set/sidebar_right_set expect list[Viewable] and a
# narrower list[Card] is not assignable to it even though Card is a Viewable.
sidebar_objects: list[pn.viewable.Viewable] = [
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
    pn.Card(
        title="Set complete sidebar objects",
        objects=["Some sidebar content goes here"],
        width=300,
        max_height=200,
    ),
]

app.sidebar_set(sidebar_objects)

app.sidebar_right_set(sidebar_objects.copy())


# Servable for debugging using command
# panel serve <panelini_min.py --dev
app.servable()


if __name__ == "__main__":
    # Serve app as you would in panel
    pn.io.server.serve(app, port=5010)
