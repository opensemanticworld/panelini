"""
Main entry point for the Panelini application containing
header and content area, where the content area includes
a left as well as right sidebar and also the main area.
%%%%%%%%%%%%%%%%%%%%%%%% HEADER %%%%%%%%%%%%%%%%%%%%%%%%
##################### CONTENT AREA #####################
## L ## ----------------- MAIN ----------------- ## R ##
## E ## ----------------- MAIN ----------------- ## I ##
## F ## ----------------- MAIN ----------------- ## G ##
## T ## ----------------- MAIN ----------------- ## H ##
## - ## ----------------- MAIN ----------------- ## T ##
## - ## ----------------- MAIN ----------------- ## - ##
## S ## ----------------- MAIN ----------------- ## S ##
## I ## ----------------- MAIN ----------------- ## I ##
## D ## ----------------- MAIN ----------------- ## D ##
## E ## ----------------- MAIN ----------------- ## E ##
## B ## ----------------- MAIN ----------------- ## B ##
## A ## ----------------- MAIN ----------------- ## A ##
## R ## ----------------- MAIN ----------------- ## R ##
##################### CONTENT AREA #####################
"""

from pathlib import Path

import panel
import param

_ROOT = Path(__file__).parent
_ASSETS = _ROOT / "assets"
_PANELINI_CSS = _ROOT / "panelini.css"
_FAVICON_URL = _ASSETS / "favicon.ico"

panel.extension("gridstack")


class Panelini(param.Parameterized):
    """Main class for the Panelini application."""

    def __init__(self, **params):
        super().__init__(**params)
        self._load_css()

    def _load_css(self):
        """Load custom CSS for the application."""
        panel.config.raw_css.append(_PANELINI_CSS.read_text())

    def view(self):
        """Return the main view of the application."""
        return panel.Column(panel.Markdown("# Welcome to Panelini!"), sizing_mode="stretch_width")


if __name__ == "__main__":
    """Run the Panelini application."""
    app = Panelini()
    app.view().servable(title="Panelini", favicon=_FAVICON_URL).servable()
    # panel.serve(app.view(), show=False, port=5006, title="Panelini")
