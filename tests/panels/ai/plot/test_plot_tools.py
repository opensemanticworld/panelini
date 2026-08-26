"""Tests for panelini.panels.ai.plot.tools.plot_tools.

The three delegation tools use a mocked PlotPanel. The factory test checks
that ``make_plot_tools`` returns the three delegation tools (always) plus the
two OSW-bound tools when the ``osw`` package is importable (it is in the dev
env, so that's what we assert here).
"""

from __future__ import annotations

import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Any
from unittest.mock import MagicMock

import pytest

from panelini.panels.ai.plot.panel import PlotPanel
from panelini.panels.ai.plot.tools.plot_tools import (
    LoadCsvTool,
    PlotByCodeTool,
    RunCodeTool,
    make_plot_tools,
)

pytestmark = pytest.mark.ai


def _run_async(coro_func: Any, *args: Any, **kwargs: Any) -> Any:
    with ThreadPoolExecutor(1) as pool:
        return pool.submit(lambda: asyncio.run(coro_func(*args, **kwargs))).result()


@pytest.fixture
def mock_panel() -> MagicMock:
    panel = MagicMock(spec=PlotPanel)
    panel.plot_by_code.return_value = "plot-ok"
    panel.run_code.return_value = "run-ok"
    panel.load_data_from_csv.return_value = ["x", "y"]
    panel.current_python_code = "print('x')"
    panel.current_input_osw_id = None
    panel.output_file_path = None
    return panel


class TestPlotByCodeTool:
    def test_delegates_code(self, mock_panel: MagicMock) -> None:
        tool = PlotByCodeTool(panel=mock_panel)
        assert tool._run(code="print('x')") == "plot-ok"
        mock_panel.plot_by_code.assert_called_once_with(code="print('x')", file_paths=None, libraries=None)

    def test_delegates_file_paths_and_libraries(self, mock_panel: MagicMock) -> None:
        tool = PlotByCodeTool(panel=mock_panel)
        tool._run(code="c", file_paths=["a.csv"], libraries=["numpy"])
        mock_panel.plot_by_code.assert_called_once_with(code="c", file_paths=["a.csv"], libraries=["numpy"])

    def test_async_delegates(self, mock_panel: MagicMock) -> None:
        tool = PlotByCodeTool(panel=mock_panel)
        assert _run_async(tool._arun, code="x") == "plot-ok"

    def test_name_and_schema(self, mock_panel: MagicMock) -> None:
        tool = PlotByCodeTool(panel=mock_panel)
        assert tool.name == "plot_by_code"
        assert tool.args_schema is not None


class TestRunCodeTool:
    def test_delegates_code(self, mock_panel: MagicMock) -> None:
        tool = RunCodeTool(panel=mock_panel)
        assert tool._run(code="print(1)") == "run-ok"
        mock_panel.run_code.assert_called_once_with(code="print(1)", lang="python", file_paths=None, libraries=None)

    def test_delegates_custom_lang(self, mock_panel: MagicMock) -> None:
        tool = RunCodeTool(panel=mock_panel)
        tool._run(code="c", lang="python", file_paths=["a"], libraries=["x"])
        mock_panel.run_code.assert_called_once_with(code="c", lang="python", file_paths=["a"], libraries=["x"])

    def test_async_delegates(self, mock_panel: MagicMock) -> None:
        tool = RunCodeTool(panel=mock_panel)
        assert _run_async(tool._arun, code="x") == "run-ok"

    def test_name(self, mock_panel: MagicMock) -> None:
        assert RunCodeTool(panel=mock_panel).name == "run_code"


class TestLoadCsvTool:
    def test_delegates(self, mock_panel: MagicMock) -> None:
        tool = LoadCsvTool(panel=mock_panel)
        assert tool._run(file_path="d.csv") == ["x", "y"]
        mock_panel.load_data_from_csv.assert_called_once_with(file_path="d.csv", delimiter="\t", skip_rows=0)

    def test_delegates_custom_args(self, mock_panel: MagicMock) -> None:
        tool = LoadCsvTool(panel=mock_panel)
        tool._run(file_path="d.csv", delimiter=",", skip_rows=2)
        mock_panel.load_data_from_csv.assert_called_once_with(file_path="d.csv", delimiter=",", skip_rows=2)

    def test_async_delegates(self, mock_panel: MagicMock) -> None:
        tool = LoadCsvTool(panel=mock_panel)
        assert _run_async(tool._arun, file_path="d.csv") == ["x", "y"]

    def test_name(self, mock_panel: MagicMock) -> None:
        assert LoadCsvTool(panel=mock_panel).name == "load_data_from_csv"


class TestMakePlotTools:
    """With ``osw`` installed in the dev env, the factory returns all five tools."""

    def test_returns_five_tools_when_osw_available(self, mock_panel: MagicMock) -> None:
        tools = make_plot_tools(mock_panel)
        assert len(tools) == 5

    def test_contains_all_expected_names(self, mock_panel: MagicMock) -> None:
        names = {t.name for t in make_plot_tools(mock_panel)}
        assert names == {
            "plot_by_code",
            "run_code",
            "load_data_from_csv",
            "attach_current_plot_to_osw_page",
            "document_current_evaluation",
        }

    def test_all_tools_bound_to_same_panel(self, mock_panel: MagicMock) -> None:
        tools = make_plot_tools(mock_panel)
        for t in tools:
            assert t.panel is mock_panel

    def test_returns_three_tools_when_osw_missing(self, mock_panel: MagicMock, monkeypatch: pytest.MonkeyPatch) -> None:
        """Simulate missing osw package by making the submodule import raise ImportError."""
        import builtins

        real_import = builtins.__import__

        def fake_import(name: str, *args: Any, **kwargs: Any) -> Any:
            if name.endswith("osw_plot_tools") or name == "osw_plot_tools":
                raise ImportError
            return real_import(name, *args, **kwargs)

        monkeypatch.setattr(builtins, "__import__", fake_import)
        tools = make_plot_tools(mock_panel)
        assert len(tools) == 3
        assert {t.name for t in tools} == {"plot_by_code", "run_code", "load_data_from_csv"}
