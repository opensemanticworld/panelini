"""Tests for panelini.panels.eln_connectors.osw.tools.osw_tools (upload tool)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from pydantic import ValidationError

pytestmark = pytest.mark.ai

OSW_TOOLS_MODULE = "panelini.panels.eln_connectors.osw.tools.osw_tools"


class TestUploadOslFileInput:
    def test_requires_file_path(self) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileInput

        with pytest.raises(ValidationError):
            UploadOslFileInput()  # no file_path

    def test_optional_osw_id_and_label(self) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileInput

        inp = UploadOslFileInput(file_path="./data.csv")
        assert inp.osw_id is None
        assert inp.label is None

    def test_accepts_all_fields(self) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileInput

        inp = UploadOslFileInput(
            file_path="./data.csv",
            osw_id="File:OSW29b9f7873b6f4752beafc4cc57b65db2.csv",
            label="My data file",
        )
        assert inp.file_path == "./data.csv"


class TestUploadOslFileTool:
    def test_name_and_schema(self) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileTool

        tool = UploadOslFileTool()
        assert tool.name == "upload_osl_file"
        assert tool.args_schema is not None

    def test_upload_generates_new_uuid(self, tmp_path: Path) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileTool

        csv = tmp_path / "data.csv"
        csv.write_text("a,b\n1,2\n")

        fake_osw = MagicMock()
        fake_wf = MagicMock()
        fake_wf_cls = MagicMock(return_value=fake_wf)
        fake_model = MagicMock()

        with (
            patch(f"{OSW_TOOLS_MODULE}._get_osw", return_value=fake_osw),
            patch("osw.controller.file.wiki.WikiFileController", fake_wf_cls),
            patch("osw.core.model", fake_model),
        ):
            result = UploadOslFileTool()._run(file_path=str(csv))

        assert result.startswith("File:OSW")
        assert result.endswith(".csv")
        fake_wf.put.assert_called_once()

    def test_upload_uses_explicit_osw_id(self, tmp_path: Path) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileTool

        csv = tmp_path / "data.csv"
        csv.write_text("a,b\n1,2\n")
        explicit_id = "File:OSW29b9f7873b6f4752beafc4cc57b65db2.csv"

        fake_osw = MagicMock()
        fake_wf = MagicMock()
        fake_wf_cls = MagicMock(return_value=fake_wf)
        fake_model = MagicMock()

        with (
            patch(f"{OSW_TOOLS_MODULE}._get_osw", return_value=fake_osw),
            patch("osw.controller.file.wiki.WikiFileController", fake_wf_cls),
            patch("osw.core.model", fake_model),
        ):
            result = UploadOslFileTool()._run(file_path=str(csv), osw_id=explicit_id)

        assert "29b9f7873b6f4752beafc4cc57b65db2" in result.replace("-", "")
        fake_wf.put.assert_called_once()

    def test_file_not_found_returns_error(self) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileTool

        fake_osw = MagicMock()
        with patch(f"{OSW_TOOLS_MODULE}._get_osw", return_value=fake_osw):
            result = UploadOslFileTool()._run(file_path="/nonexistent/path.csv")

        assert "error" in result.lower()
        assert "/nonexistent/path.csv" in result

    def test_exception_caught_as_string(self, tmp_path: Path) -> None:
        from panelini.panels.eln_connectors.osw.tools.osw_tools import UploadOslFileTool

        csv = tmp_path / "boom.csv"
        csv.write_text("x\n")

        fake_osw = MagicMock()
        fake_wf = MagicMock()
        fake_wf.put.side_effect = RuntimeError("wiki connection lost")
        fake_wf_cls = MagicMock(return_value=fake_wf)
        fake_model = MagicMock()

        with (
            patch(f"{OSW_TOOLS_MODULE}._get_osw", return_value=fake_osw),
            patch("osw.controller.file.wiki.WikiFileController", fake_wf_cls),
            patch("osw.core.model", fake_model),
        ):
            result = UploadOslFileTool()._run(file_path=str(csv))

        assert "could not upload file" in result
        assert "wiki connection lost" in result


class TestMakeOswToolsIncludesUpload:
    def test_upload_tool_in_factory(self) -> None:
        from panelini.panels.eln_connectors.osw.connection import OswConnection
        from panelini.panels.eln_connectors.osw.tools.osw_tools import (
            UploadOslFileTool,
            make_osw_tools,
        )

        conn = OswConnection(domain="example.org", username="u", password="p")  # noqa: S106
        tools = make_osw_tools(connection=conn)
        names = [t.name for t in tools]
        assert "upload_osl_file" in names
        upload_tool = next(t for t in tools if t.name == "upload_osl_file")
        assert isinstance(upload_tool, UploadOslFileTool)
        assert upload_tool.connection is conn
