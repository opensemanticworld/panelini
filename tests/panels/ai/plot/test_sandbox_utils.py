"""Tests for panelini.panels.ai.plot.utils.sandbox."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest

from panelini.panels.ai.plot.utils.sandbox import (
    MICRESS_BIN_EXTS,
    MICRESS_GEO_EXTS,
    copy_files_to_sandbox,
    resolve_file_path,
)

pytestmark = pytest.mark.ai


class TestResolveFilePath:
    def test_absolute_existing_path_returned_as_is(self, tmp_path: Path) -> None:
        f = tmp_path / "a.txt"
        f.write_text("x")
        assert resolve_file_path(str(f), download_dir=tmp_path, data_dir=tmp_path) == str(f)

    def test_filename_resolved_from_download_dir(self, tmp_path: Path) -> None:
        download_dir = tmp_path / "downloads"
        download_dir.mkdir()
        (download_dir / "a.txt").write_text("x")
        result = resolve_file_path("a.txt", download_dir=download_dir, data_dir=tmp_path / "data")
        assert result == str(download_dir / "a.txt")

    def test_filename_resolved_from_data_dir_when_not_in_download(self, tmp_path: Path) -> None:
        data_dir = tmp_path / "data"
        data_dir.mkdir()
        (data_dir / "a.txt").write_text("x")
        result = resolve_file_path("a.txt", download_dir=tmp_path / "nope", data_dir=data_dir)
        assert result == str(data_dir / "a.txt")

    def test_unresolvable_path_returned_unchanged(self, tmp_path: Path) -> None:
        assert resolve_file_path("missing.txt", download_dir=tmp_path, data_dir=tmp_path) == "missing.txt"


class TestCopyFilesToSandbox:
    def test_single_non_micress_file(self, tmp_path: Path) -> None:
        f = tmp_path / "a.csv"
        f.write_text("x")
        session = MagicMock()
        filenames = copy_files_to_sandbox(session, [str(f)], download_dir=tmp_path, data_dir=tmp_path)
        assert filenames == ["a.csv"]
        session.copy_to_runtime.assert_called_once_with(src=str(f), dest="/sandbox/a.csv")

    def test_micress_geof_is_renamed_to_match_bin_stem(self, tmp_path: Path) -> None:
        bin_f = tmp_path / "sim.conc1"
        bin_f.write_text("x")
        geo_f = tmp_path / "mesh.geof"
        geo_f.write_text("y")
        session = MagicMock()

        filenames = copy_files_to_sandbox(session, [str(bin_f), str(geo_f)], download_dir=tmp_path, data_dir=tmp_path)

        assert "sim.conc1" in filenames
        assert "sim.geoF" in filenames
        dests = {call.kwargs["dest"] for call in session.copy_to_runtime.call_args_list}
        assert "/sandbox/sim.conc1" in dests
        assert "/sandbox/sim.geoF" in dests

    def test_geof_alone_keeps_original_name(self, tmp_path: Path) -> None:
        geo_f = tmp_path / "mesh.geof"
        geo_f.write_text("y")
        session = MagicMock()
        filenames = copy_files_to_sandbox(session, [str(geo_f)], download_dir=tmp_path, data_dir=tmp_path)
        assert filenames == ["mesh.geof"]
        session.copy_to_runtime.assert_called_once_with(src=str(geo_f), dest="/sandbox/mesh.geof")

    def test_empty_file_list(self, tmp_path: Path) -> None:
        session = MagicMock()
        filenames = copy_files_to_sandbox(session, [], download_dir=tmp_path, data_dir=tmp_path)
        assert filenames == []
        session.copy_to_runtime.assert_not_called()


class TestMicressExtensionConstants:
    def test_bin_exts_lowercase(self) -> None:
        for ext in MICRESS_BIN_EXTS:
            assert ext == ext.lower()
            assert ext.startswith(".")

    def test_geo_exts_lowercase(self) -> None:
        for ext in MICRESS_GEO_EXTS:
            assert ext == ext.lower()
            assert ext.startswith(".")

    def test_known_micress_extensions_present(self) -> None:
        assert ".conc1" in MICRESS_BIN_EXTS
        assert ".phas" in MICRESS_BIN_EXTS
        assert ".geof" in MICRESS_GEO_EXTS
