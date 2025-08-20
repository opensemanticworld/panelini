"""Init file for the Panelini package."""

import importlib.metadata

from .main import Panelini

__version__ = importlib.metadata.version("panelini")

__all__ = ["Panelini", "__version__"]
