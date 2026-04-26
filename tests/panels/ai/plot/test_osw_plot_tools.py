"""Tests for panelini.panels.ai.plot.tools.osw_plot_tools.

``build_osw_express`` and ``WikiFileController`` are patched so no network
or OSW instance is needed. The tests check: (1) successful paths call OSW
correctly and return a success string, (2) exceptions are caught and returned
as strings rather than propagated, (3) tool metadata is correct.
"""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from panelini.panels.ai.plot.panel import PlotPanel
from panelini.panels.ai.plot.tools.osw_plot_tools import (
    AttachPlotToOswTool,
    DocumentEvaluationTool,
    _load_plot_bytes,
)

pytestmark = pytest.mark.ai

OSW_MODULE = "panelini.panels.ai.plot.tools.osw_plot_tools"


@pytest.fixture
def panel_with_png(tmp_path: Path) -> PlotPanel:
    """A PlotPanel whose ``output_file_path`` points to a real PNG on disk."""
    png_path = tmp_path / "output.png"
    png_path.write_bytes(b"\x89PNG\r\n\x1a\n-stub-")
    panel = PlotPanel(data_path=tmp_path)
    panel.output_file_path = png_path
    panel.current_python_code = "print('hi')"
    panel.current_input_osw_id = "File:foo.csv"
    return panel


class TestLoadPlotBytes:
    def test_reads_from_output_file_path(self, panel_with_png: PlotPanel) -> None:
        buf = _load_plot_bytes(panel_with_png)
        assert buf.read().startswith(b"\x89PNG")

    def test_raises_when_no_image(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        with pytest.raises(ValueError, match="No image available"):
            _load_plot_bytes(panel)


class TestAttachPlotToOswTool:
    def test_name_and_schema(self, panel_with_png: PlotPanel) -> None:
        tool = AttachPlotToOswTool(panel=panel_with_png)
        assert tool.name == "attach_current_plot_to_osw_page"
        assert tool.args_schema is not None

    def test_success_path(self, panel_with_png: PlotPanel) -> None:
        fake_entity = MagicMock()
        fake_entity.attachments = None
        fake_osw = MagicMock()
        fake_osw.load_entity.return_value = fake_entity
        fake_wf = MagicMock()
        fake_wf.title = "OSWabc.png"

        with (
            patch(f"{OSW_MODULE}.build_osw_express", return_value=fake_osw),
            patch(f"{OSW_MODULE}.OSW"),
            patch(f"{OSW_MODULE}._build_wiki_file", return_value=fake_wf),
            patch(f"{OSW_MODULE}.get_full_title", return_value="File:OSWabc.png"),
        ):
            tool = AttachPlotToOswTool(panel=panel_with_png)
            result = tool._run(osw_id="Item:OSW123")

        assert "plot uploaded to OSW" in result
        assert "Item:OSW123" in result
        fake_osw.load_entity.assert_called_once_with("Item:OSW123")
        fake_wf.put.assert_called_once()
        fake_osw.store_entity.assert_called_once()
        assert fake_entity.attachments == ["File:OSWabc.png"]

    def test_entity_not_found_returns_error_string(self, panel_with_png: PlotPanel) -> None:
        fake_osw = MagicMock()
        fake_osw.load_entity.return_value = None

        with patch(f"{OSW_MODULE}.build_osw_express", return_value=fake_osw):
            tool = AttachPlotToOswTool(panel=panel_with_png)
            result = tool._run(osw_id="Item:OSWbad")

        assert "error loading entity" in result
        assert "Item:OSWbad" in result

    def test_exception_returned_as_string(self, panel_with_png: PlotPanel) -> None:
        with patch(f"{OSW_MODULE}.build_osw_express", side_effect=RuntimeError("network boom")):
            tool = AttachPlotToOswTool(panel=panel_with_png)
            result = tool._run(osw_id="Item:OSW123")
        assert "error attaching plot to OSW" in result
        assert "network boom" in result

    def test_missing_image_returned_as_string(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)  # no image set
        fake_osw = MagicMock()
        fake_osw.load_entity.return_value = MagicMock(attachments=None)
        with patch(f"{OSW_MODULE}.build_osw_express", return_value=fake_osw):
            tool = AttachPlotToOswTool(panel=panel)
            result = tool._run(osw_id="Item:OSW123")
        assert "error attaching plot to OSW" in result
        assert "No image available" in result


class TestDocumentEvaluationTool:
    def test_name_and_schema(self, panel_with_png: PlotPanel) -> None:
        tool = DocumentEvaluationTool(panel=panel_with_png)
        assert tool.name == "document_current_evaluation"
        assert tool.args_schema is not None

    def test_success_path(self, panel_with_png: PlotPanel) -> None:
        fake_osw = MagicMock()
        fake_wf = MagicMock()
        fake_wf.title = "OSWabc.png"

        with (
            patch(f"{OSW_MODULE}.build_osw_express", return_value=fake_osw),
            patch(f"{OSW_MODULE}.OSW"),
            patch(f"{OSW_MODULE}._build_wiki_file", return_value=fake_wf),
            patch(f"{OSW_MODULE}.get_full_title", return_value="File:OSWabc.png"),
            patch(f"{OSW_MODULE}.model") as fake_model,
        ):
            fake_model.PythonEvaluationProcess.return_value = MagicMock()
            tool = DocumentEvaluationTool(panel=panel_with_png)
            result = tool._run()

        assert "documentation object stored" in result
        fake_wf.put.assert_called_once()
        fake_osw.store_entity.assert_called_once()
        kwargs = fake_model.PythonEvaluationProcess.call_args.kwargs
        assert kwargs["python_evaluation_code"] == "print('hi')"
        assert kwargs["input"] == ["File:foo.csv"]

    def test_input_is_none_when_panel_has_no_input(self, tmp_path: Path) -> None:
        png_path = tmp_path / "output.png"
        png_path.write_bytes(b"\x89PNG-stub")
        panel = PlotPanel(data_path=tmp_path)
        panel.output_file_path = png_path
        panel.current_input_osw_id = None

        fake_osw = MagicMock()
        fake_wf = MagicMock()
        fake_wf.title = "OSWabc.png"
        with (
            patch(f"{OSW_MODULE}.build_osw_express", return_value=fake_osw),
            patch(f"{OSW_MODULE}.OSW"),
            patch(f"{OSW_MODULE}._build_wiki_file", return_value=fake_wf),
            patch(f"{OSW_MODULE}.get_full_title", return_value="File:OSWabc.png"),
            patch(f"{OSW_MODULE}.model") as fake_model,
        ):
            tool = DocumentEvaluationTool(panel=panel)
            tool._run()
        kwargs = fake_model.PythonEvaluationProcess.call_args.kwargs
        assert kwargs["input"] is None

    def test_exception_returned_as_string(self, panel_with_png: PlotPanel) -> None:
        with patch(f"{OSW_MODULE}.build_osw_express", side_effect=RuntimeError("boom")):
            tool = DocumentEvaluationTool(panel=panel_with_png)
            result = tool._run()
        assert "error documenting evaluation" in result
        assert "boom" in result
