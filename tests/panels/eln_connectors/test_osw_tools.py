"""Tests for panelini.panels.eln_connectors.osw.tools.osw_tools (upload tool)."""

from __future__ import annotations

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
