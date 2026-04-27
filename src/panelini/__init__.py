"""Init file for the Panelini package."""

import importlib.metadata
import warnings

from .main import Panelini

warnings.filterwarnings("ignore", category=UserWarning, module=r"pydantic\.json_schema")

__version__ = importlib.metadata.version("panelini")

__all__ = ["Panelini", "__version__"]
