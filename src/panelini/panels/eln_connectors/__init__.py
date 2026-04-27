"""ELN connector panels for external data sources."""

from panelini.panels.eln_connectors.mcp_connector import McpElnConnector
from panelini.panels.eln_connectors.osw.connector import OswConnector

__all__ = ["McpElnConnector", "OswConnector"]
