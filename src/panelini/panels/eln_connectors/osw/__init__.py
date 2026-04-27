"""OpenSemanticWorld (OSW) connector panel.

Provides :class:`OswConnector` (a Panel-based UI for managing OSW connections)
and :class:`OswConnection` (a credential/config data model). Tools for LLM
integration are available via :func:`make_osw_tools`.

Install optional dependencies::

    pip install 'panelini[ai-osw]'
"""

from .connection import OswConnection
from .connector import OswConnector
from .tools.osw_tools import make_osw_tools

__all__ = [
    "OswConnection",
    "OswConnector",
    "make_osw_tools",
]
