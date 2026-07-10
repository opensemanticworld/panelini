"""Tests for panelini.panels.ai.plot.panel.PlotPanel.

SandboxSession is patched so no Docker daemon is required. The mock writes a
valid 1x1 PNG on ``copy_from_runtime`` so that ``PIL.Image.open`` validation
inside ``plot_by_code`` succeeds.
"""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from PIL import Image

from panelini.panels.ai.plot.panel import PlotPanel

pytestmark = pytest.mark.ai


@pytest.fixture
def mocked_sandbox(tmp_path: Path):
    """Patch ``SandboxSession`` so ``.run`` returns stdout and ``.copy_from_runtime`` writes a tiny PNG."""

    def _write_png(*, src: str, dest: str) -> None:
        Image.new("RGB", (1, 1)).save(dest)

    with patch("panelini.panels.ai.plot.panel.SandboxSession") as mock_cls:
        session = mock_cls.return_value.__enter__.return_value
        session.run.return_value = MagicMock(stdout="stdout-stub")
        session.copy_from_runtime.side_effect = _write_png
        yield session


class TestPlotPanelInit:
    def test_default_data_path_is_cwd_data(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.chdir(tmp_path)
        panel = PlotPanel()
        assert panel.data_path == tmp_path / "data"
        assert panel.download_dir == tmp_path / "data" / "downloads"

    def test_explicit_paths(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path / "d", download_dir=tmp_path / "dl")
        assert panel.data_path == tmp_path / "d"
        assert panel.download_dir == tmp_path / "dl"

    def test_initial_state(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        assert panel.df is None
        assert panel.current_python_code is None
        assert panel.current_input_osw_id is None
        assert panel.output_file_path is None

    def test_image_and_plot_panel_created(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        assert panel.image_panel is not None
        assert panel.plot_panel is not None


class TestPlotByCode:
    def test_success_writes_png_and_updates_image(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        import panel as pn

        panel = PlotPanel(data_path=tmp_path)
        result = panel.plot_by_code(code="print('hi')")
        assert "Image successfully plotted" in result
        assert "stdout-stub" in result
        assert panel.current_python_code == "print('hi')"
        assert panel.output_file_path is not None
        assert panel.output_file_path.exists()
        # The image pane is HTML rendering an <img> with a base64 data URI
        assert isinstance(panel.image_panel, pn.pane.HTML)
        assert "data:image/png;base64," in panel.image_panel.object
        assert "<img" in panel.image_panel.object

    def test_default_libraries_include_matplotlib(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        panel.plot_by_code(code="x")
        libraries = mocked_sandbox.run.call_args.args[1]
        assert "numpy" in libraries
        assert "pandas" in libraries
        assert "matplotlib" in libraries
        assert "scipy" in libraries

    def test_custom_libraries_override_default(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        panel.plot_by_code(code="x", libraries=["micress-micpy"])
        libraries = mocked_sandbox.run.call_args.args[1]
        assert libraries == ["micress-micpy"]

    def test_code_persisted_to_disk(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        panel.plot_by_code(code="print('hi')")
        code_path = tmp_path / "plot_codes" / "code.py"
        assert code_path.exists()
        assert code_path.read_text() == "print('hi')"

    def test_exception_in_sandbox_returns_error_message(self, tmp_path: Path) -> None:
        with patch("panelini.panels.ai.plot.panel.SandboxSession") as mock_cls:
            session = mock_cls.return_value.__enter__.return_value
            session.run.side_effect = RuntimeError("boom")
            panel = PlotPanel(data_path=tmp_path)
            result = panel.plot_by_code(code="x")
        assert "Exception during plotting" in result
        assert "boom" in result

    def test_file_paths_tracked_as_osw_input(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        data_file = tmp_path / "data.csv"
        data_file.write_text("a,b\n1,2\n")
        panel = PlotPanel(data_path=tmp_path)
        panel.plot_by_code(code="x", file_paths=[str(data_file)])
        assert panel.current_input_osw_id == "File:data.csv"

    def test_no_file_paths_sets_current_input_none(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        panel.plot_by_code(code="x")
        assert panel.current_input_osw_id is None


class TestRunCode:
    def test_returns_stdout(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        result = panel.run_code(code="print('hi')")
        assert result == "stdout-stub"

    def test_code_persisted_to_disk(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        panel.run_code(code="print('hi')")
        code_path = tmp_path / "run_codes" / "code.py"
        assert code_path.exists()

    def test_exception_returned_as_string(self, tmp_path: Path) -> None:
        with patch("panelini.panels.ai.plot.panel.SandboxSession") as mock_cls:
            session = mock_cls.return_value.__enter__.return_value
            session.run.side_effect = RuntimeError("boom")
            panel = PlotPanel(data_path=tmp_path)
            result = panel.run_code(code="x")
        assert "boom" in result


class TestLoadDataFromCsv:
    def test_loads_df_and_returns_columns(self, tmp_path: Path) -> None:
        csv = tmp_path / "d.csv"
        csv.write_text("x\ty\n1\t2\n")
        panel = PlotPanel(data_path=tmp_path)
        cols = panel.load_data_from_csv(file_path=str(csv))
        assert cols == ["x", "y"]
        assert panel.df is not None
        assert list(panel.df.columns) == ["x", "y"]

    def test_custom_delimiter(self, tmp_path: Path) -> None:
        csv = tmp_path / "d.csv"
        csv.write_text("a,b\n1,2\n")
        panel = PlotPanel(data_path=tmp_path)
        cols = panel.load_data_from_csv(file_path=str(csv), delimiter=",")
        assert cols == ["a", "b"]

    def test_skip_rows(self, tmp_path: Path) -> None:
        csv = tmp_path / "d.csv"
        csv.write_text("# comment\nx\ty\n1\t2\n")
        panel = PlotPanel(data_path=tmp_path)
        cols = panel.load_data_from_csv(file_path=str(csv), skip_rows=1)
        assert cols == ["x", "y"]


class TestPanelProtocol:
    def test_panel_dunder_returns_plot_row(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        assert panel.__panel__() is panel.plot_panel


class TestOnPlotCallback:
    def test_callback_fires_on_plot_by_code_success(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        seen: list[int] = []
        panel.on_plot(lambda: seen.append(1))
        panel.plot_by_code(code="print('hi')")
        assert seen == [1]

    def test_callback_fires_on_plot_by_code_error(self, tmp_path: Path) -> None:
        with patch("panelini.panels.ai.plot.panel.SandboxSession") as mock_cls:
            session = mock_cls.return_value.__enter__.return_value
            session.run.side_effect = RuntimeError("boom")
            panel = PlotPanel(data_path=tmp_path)
            seen: list[int] = []
            panel.on_plot(lambda: seen.append(1))
            panel.plot_by_code(code="x")
        assert seen == [1]

    def test_multiple_callbacks_all_fire(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)
        tag: list[str] = []
        panel.on_plot(lambda: tag.append("a"))
        panel.on_plot(lambda: tag.append("b"))
        panel.plot_by_code(code="x")
        assert tag == ["a", "b"]

    def test_callback_exception_does_not_break_plot(self, tmp_path: Path, mocked_sandbox: MagicMock) -> None:
        panel = PlotPanel(data_path=tmp_path)

        def boom() -> None:
            raise RuntimeError

        panel.on_plot(boom)
        # Should not raise: plotting must not be coupled to callback reliability
        result = panel.plot_by_code(code="x")
        assert "Image successfully plotted" in result
