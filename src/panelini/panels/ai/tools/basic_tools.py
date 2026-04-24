"""Basic tools for the AI chat component."""

from datetime import datetime
from typing import Any

from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field


class GetCurrentTimeInput(BaseModel):
    """Input for getting current time."""

    timezone: str = Field(default="UTC", description="Timezone for the current time (e.g., 'UTC', 'US/Eastern')")


class GetCurrentTimeTool(BaseTool):
    """Tool for getting the current time and date."""

    name: str = "get_current_time"
    description: str = (
        "Get the current time and date. Useful for timestamping entries or checking when data was processed."
    )
    args_schema: type[BaseModel] = GetCurrentTimeInput

    def _run(self, timezone: str = "UTC") -> str:
        """Get the current time.

        Args:
            timezone: Timezone for the current time

        Returns:
            Current time as a formatted string
        """
        now = datetime.now()
        return f"Current time ({timezone}): {now.strftime('%Y-%m-%d %H:%M:%S')}"

    async def _arun(self, timezone: str = "UTC") -> str:
        """Async version of _run."""
        return self._run(timezone=timezone)


class UpdatePreviewInput(BaseModel):
    """Input for updating the preview window."""

    content: str = Field(description="Markdown content to display in the preview window")
    title: str = Field(default="Preview", description="Optional title for the preview content")


class UpdatePreviewTool(BaseTool):
    """Tool for updating the preview window with content."""

    name: str = "update_preview"
    description: str = (
        "Display content in the preview window. Use this to show formatted reports, tables, "
        "code snippets, or any markdown-formatted content that would benefit from visual presentation. "
        "The preview window supports full markdown including headers, lists, tables, and code blocks."
    )
    args_schema: type[BaseModel] = UpdatePreviewInput

    def _run(self, content: str, title: str = "Preview") -> str:
        """Update preview window content.

        Args:
            content: Markdown content to display
            title: Title for the preview

        Returns:
            Confirmation message with special marker for frontend to detect
        """
        # Return with special marker that frontend will detect
        return f"PREVIEW_UPDATE::{title}::{content}"

    async def _arun(self, content: str, title: str = "Preview") -> str:
        """Async version of _run."""
        return self._run(content=content, title=title)


# Create tool instances for easy import
get_current_time_tool = GetCurrentTimeTool()
update_preview_tool = UpdatePreviewTool()

# List of all available tools
AVAILABLE_TOOLS: list[Any] = [get_current_time_tool, update_preview_tool]
