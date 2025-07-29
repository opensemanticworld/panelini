"""Init file for the Panelini package."""

import importlib.metadata

from .panelini import Panelini

__version__ = importlib.metadata.version("panelini")

__all__ = ["Panelini", "__version__"]
