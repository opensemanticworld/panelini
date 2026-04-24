"""Panelini AI chat panel.

Install the optional AI dependencies with::

    pip install panelini[ai]
"""

__all__ = ["AiBackend", "AiChat"]

from .backend import AiBackend
from .frontend import AiChat
