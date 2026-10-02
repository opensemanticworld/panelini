"""Minimal example: embed JupyterLite in a Panel app."""

import panel as pn

from panelini.panels.jupyterlite import JupyterLite

pn.extension()

lite = JupyterLite()

if __name__ == "__main__":
    row = pn.Row(
        pn.widgets.Button(name="Button 1"), pn.widgets.Button(name="Button 1"), pn.widgets.Button(name="Button 3"), lite
    )
    pn.serve(row)
