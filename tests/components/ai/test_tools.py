"""Tests for panelini.components.ai.tools.basic_tools."""

from __future__ import annotations

import asyncio

import pytest

from panelini.components.ai.tools.basic_tools import (
    AVAILABLE_TOOLS,
    get_current_time_tool,
    update_preview_tool,
)

pytestmark = pytest.mark.ai


class TestGetCurrentTimeTool:
    def test_returns_formatted_time(self) -> None:
        result = get_current_time_tool._run()
        assert "Current time (UTC):" in result

    def test_custom_timezone(self) -> None:
        result = get_current_time_tool._run(timezone="US/Eastern")
        assert "Current time (US/Eastern):" in result

    def test_async_run(self) -> None:
        result = asyncio.get_event_loop().run_until_complete(get_current_time_tool._arun())
        assert "Current time" in result


class TestUpdatePreviewTool:
    def test_returns_preview_marker(self) -> None:
        result = update_preview_tool._run(content="# Hello", title="Test")
        assert result == "PREVIEW_UPDATE::Test::# Hello"

    def test_default_title(self) -> None:
        result = update_preview_tool._run(content="text")
        assert result.startswith("PREVIEW_UPDATE::Preview::")

    def test_async_run(self) -> None:
        result = asyncio.get_event_loop().run_until_complete(update_preview_tool._arun(content="md", title="T"))
        assert result == "PREVIEW_UPDATE::T::md"


class TestAvailableTools:
    def test_contains_expected_tools(self) -> None:
        names = [t.name for t in AVAILABLE_TOOLS]
        assert "get_current_time" in names
        assert "update_preview" in names

    def test_no_domain_specific_tools(self) -> None:
        names = [t.name for t in AVAILABLE_TOOLS]
        assert "calculate_metadata_stats" not in names

    def test_tool_count(self) -> None:
        assert len(AVAILABLE_TOOLS) == 2
