"""ELN connector panels for external data sources."""

from panelini.panels.eln_connectors.mcp_connector import MCP_SYSTEM_MESSAGE, McpElnConnector
from panelini.panels.eln_connectors.osw.connector import OswConnector

__all__ = ["MCP_SYSTEM_MESSAGE", "McpElnConnector", "OswConnector"]
