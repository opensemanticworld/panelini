"""panelini_min.py minimal Example to run Panelini"""

import panel as pn

from panelini import Panelini

# Some example Panel objects
panel_objects = [
    # Use panel components to build your layout
    pn.Card(
        title="📊 Hello Panelini Minimal 🐍",
        objects=[
            pn.pane.Markdown(
                "Panelini minimal!",
            )
        ],
    )
]


# Create an instance of Panelini
app = Panelini(
    # Title will be displayed in the browser tab and in header
    title="📊 HELLO PANELINI 🐍"
    # Objects can be initialized here or outside
    # main = main_objects
    # sidebar = sidebar_objects
)
# Or set objects outside
app.main_set(objects=panel_objects)
# Add a widget to select the index to remove
index_selector = pn.widgets.IntInput(name="Index to Remove", value=0, step=1, start=0)

app.sidebar_set(
    objects=[
        pn.Card(
            title="Sidebar Content",
            objects=[
                pn.pane.Markdown("Give me some control elements!"),
                pn.widgets.Button(
                    name="Add Card",
                    button_type="primary",
                    on_click=lambda event: [
                        print(f"Before: {app.main_get()}"),
                        app.main_add(objects=[pn.Card(title=f"New Element {len(app.main_get())}")]),
                        print(f"After: {app.main_get()}"),
                        print(f"Main objects count: {len(app.main_get())}"),
                    ],
                ),
                index_selector,
                pn.widgets.Button(
                    name="Remove Card by Index",
                    button_type="primary",
                    on_click=lambda event: [
                        print(f"Before: {app.main_get()}"),
                        app.main_remove_index(index=index_selector.value),
                        print(f"After: {app.main_get()}"),
                        print(f"Main objects count: {len(app.main_get())}"),
                    ],
                ),
            ],
        )
    ]
)

# Use servable when using CLI "panel serve" command, e.g., use:
# panel serve panelini_min.py --dev --port 5010
app.servable()


if __name__ == "__main__":
    # Serve app as you would in panel
    app.serve(port=5010)
