"""panelini_min.py"""

from panel import Card
from panel.pane import Markdown

from panelini import Panelini

# Minimal Example to run Panelini
panel_card_obj = Card(
    objects=[Markdown("# 📊 Welcome to Panelini! 🖥️")],
    title="Panel Example Card",
    width=300,
    height=200,
)

app = Panelini(main_objects=[panel_card_obj])
app.serve(port=5010, title="Panelini")
