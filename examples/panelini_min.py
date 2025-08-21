"""panelini_min.py"""

from panel import Card
from panel.pane import Markdown

from panelini import Panelini

# Minimal Example to run Panelini
main_objects = [
    # Use panel components to build your layout
    Card(
        objects=[Markdown("# 📊 Welcome to Panelini! 🖥️", disable_anchors=True)],
        title="Panel Example Card",
        width=300,
        max_height=200,
    )
]
# Create an instance of Panelini
app = Panelini(
    title="Hello Panelini",
    # main = [main_objects] # init objects here
)
# Or set objects outside
app.main_set(objects=main_objects)
# Use servable when using CLI "panel serve" command
app.servable()


if __name__ == "__main__":
    # Serve app as you would in panel
    app.serve(port=5010)
