"""App entry point launching the MVC application."""

import os
import warnings
from pathlib import Path

# Polyfill for Python < 3.13 where warnings.deprecated does not exist in tabular
if not hasattr(warnings, "deprecated"):

    def dummy_deprecated(*args, **kwargs):
        return lambda obj: obj

    warnings.deprecated = dummy_deprecated

# Force the working directory so relative paths in default_session.yaml resolve correctly
app_dir = Path(__file__).resolve().parent
os.chdir(app_dir)

import panel as pn
from graphia import Graphia
from controller import GraphiaController
from view import GraphiaToolView

pn.extension()

if __name__ == "__main__" or str(__name__).startswith("bokeh"):
    local_data_dir = app_dir / "data"

    model = Graphia(confdir=local_data_dir)

    controller = GraphiaController(model)
    app = GraphiaToolView(controller)
    app.servable(title="Semantic Graphia Filter")
