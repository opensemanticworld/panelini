"""Tests for panelini.panels.ai.plot.tools.osw_tools.

Env-gating and factory behavior are tested without network. Individual tool
runs patch ``build_osw_express``, ``SPARQLWrapper``, and ``urlopen`` so no
OSW instance or Blazegraph endpoint is required.
"""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

pytestmark = pytest.mark.ai

OSW_TOOLS_MODULE = "panelini.panels.ai.plot.tools.osw_tools"
OSW_ENV_MODULE = "panelini.panels.ai.plot.utils.osw_env"

OSW_ENV_VARS_ALL = (
    "OSW_DOMAIN",
    "OSW_USER",
    "OSW_PASSWORD",
    "BLAZEGRAPH_ENDPOINT",
    "BLAZEGRAPH_USER",
    "BLAZEGRAPH_PASSWORD",
)


@pytest.fixture
def osw_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("OSW_DOMAIN", "example.org")
    monkeypatch.setenv("OSW_USER", "alice")
    monkeypatch.setenv("OSW_PASSWORD", "hunter2")
    monkeypatch.setenv("BLAZEGRAPH_ENDPOINT", "https://example.org/sparql")
    monkeypatch.setenv("BLAZEGRAPH_USER", "user")
    monkeypatch.setenv("BLAZEGRAPH_PASSWORD", "pass")


@pytest.fixture
def no_osw_env(monkeypatch: pytest.MonkeyPatch) -> None:
    for var in OSW_ENV_VARS_ALL:
        monkeypatch.delenv(var, raising=False)


# ---------------------------------------------------------------------------
# Pure helpers
# ---------------------------------------------------------------------------


class TestReplaceSpecialCharacters:
    def test_removes_special_chars_default_replacer(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _replace_special_characters

        assert _replace_special_characters("foo-bar_baz!") == "foo bar baz "

    def test_custom_replacer(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _replace_special_characters

        assert _replace_special_characters("a.b,c", replacer="_") == "a_b_c"

    def test_strips_umlauts(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _replace_special_characters

        assert _replace_special_characters("küßchen") == "kchen"


class TestCheckForUuid:
    def test_valid_uuid(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _check_for_uuid

        assert _check_for_uuid("a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6") is True

    def test_uppercase_valid(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _check_for_uuid

        assert _check_for_uuid("A5FD64A4-E26E-4B7D-ABDB-B8C0DB83DDD6") is True

    def test_osw_id_not_uuid(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _check_for_uuid

        assert _check_for_uuid("OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6") is False


class TestTryCastStrToUuid:
    def test_already_uuid_returns_as_is(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _try_cast_str_to_uuid

        assert _try_cast_str_to_uuid("a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6") == "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6"

    def test_osw_id_converts(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _try_cast_str_to_uuid

        assert _try_cast_str_to_uuid("OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6") == "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6"

    def test_plain_string_returns_none(self) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import _try_cast_str_to_uuid

        assert _try_cast_str_to_uuid("hello world") is None

    def test_file_prefixed_osw_id_converts(self) -> None:
        """'File:OSW...csv' and similar should still extract the uuid."""
        from panelini.panels.ai.plot.tools.osw_tools import _try_cast_str_to_uuid

        # Legacy behavior: function scans the last 32 chars when 'osw' is in the string.
        assert (
            _try_cast_str_to_uuid("File:OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6") == "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6"
        )


# ---------------------------------------------------------------------------
# Factory (env gating)
# ---------------------------------------------------------------------------


class TestMakeOswTools:
    def test_returns_empty_when_env_missing(self, no_osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import make_osw_tools

        assert make_osw_tools() == []

    def test_returns_eight_tools_when_env_present(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import make_osw_tools

        tools = make_osw_tools()
        assert len(tools) == 8

    def test_contains_all_expected_names(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import make_osw_tools

        names = {t.name for t in make_osw_tools()}
        assert names == {
            "get_page_html",
            "download_osl_file",
            "get_file_header",
            "sparql_search",
            "find_out_everything_about",
            "get_topic_taxonomy",
            "get_instances",
            "get_website_html",
        }


# ---------------------------------------------------------------------------
# Tool _run behavior
# ---------------------------------------------------------------------------


class TestGetPageHtmlTool:
    def test_returns_parse_result(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetPageHtmlTool

        fake_osw = MagicMock()
        fake_osw.site._site.raw_api.return_value = {"parse": {"text": "<p>hi</p>"}}
        with patch(f"{OSW_TOOLS_MODULE}.build_osw_express", return_value=fake_osw):
            result = GetPageHtmlTool()._run(fullpagetitle="Item:OSW123")
        assert result == {"parse": {"text": "<p>hi</p>"}}
        fake_osw.site._site.raw_api.assert_called_once_with(action="parse", page="Item:OSW123", format="json")

    def test_exception_returned_as_string(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetPageHtmlTool

        with patch(f"{OSW_TOOLS_MODULE}.build_osw_express", side_effect=RuntimeError("boom")):
            result = GetPageHtmlTool()._run(fullpagetitle="Item:OSW123")
        assert isinstance(result, str)
        assert "boom" in result


class TestDownloadOslFileTool:
    @staticmethod
    def _fake_osw_with_download(fake_file: MagicMock) -> MagicMock:
        fake_osw = MagicMock()
        fake_osw.domain = "example.org"
        fake_osw.download_file.return_value = fake_file
        return fake_osw

    def test_prepends_file_prefix_to_osw_id(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import DownloadOslFileTool

        fake_file = MagicMock()
        fake_file.path = "fake-path/downloaded.csv"
        fake_osw = self._fake_osw_with_download(fake_file)
        with patch(f"{OSW_TOOLS_MODULE}.build_osw_express", return_value=fake_osw):
            result = DownloadOslFileTool()._run(osw_id="OSW29b9f7873b6f4752beafc4cc57b65db2.csv")
        assert result == "fake-path/downloaded.csv"
        called_url = fake_osw.download_file.call_args.args[0]
        assert "File:OSW29b9f7873b6f4752beafc4cc57b65db2.csv" in called_url

    def test_passes_through_file_prefixed_id(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import DownloadOslFileTool

        fake_file = MagicMock()
        fake_file.path = "fake-path/x.csv"
        fake_osw = self._fake_osw_with_download(fake_file)
        with patch(f"{OSW_TOOLS_MODULE}.build_osw_express", return_value=fake_osw):
            DownloadOslFileTool()._run(osw_id="File:OSWabc.csv")
        assert "File:OSWabc.csv" in fake_osw.download_file.call_args.args[0]

    def test_invalid_prefix_returns_error_string(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import DownloadOslFileTool

        result = DownloadOslFileTool()._run(osw_id="garbage")
        assert isinstance(result, str)
        assert "could not download file" in result

    def test_download_exception_returned_as_string(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import DownloadOslFileTool

        with patch(
            f"{OSW_TOOLS_MODULE}.build_osw_express",
            side_effect=RuntimeError("net down"),
        ):
            result = DownloadOslFileTool()._run(osw_id="File:OSWabc.csv")
        assert "could not download file" in result
        assert "net down" in result


class TestGetFileHeaderTool:
    def test_returns_first_n_lines(self, tmp_path, osw_env: None) -> None:  # type: ignore[no-untyped-def]
        from panelini.panels.ai.plot.tools.osw_tools import GetFileHeaderTool

        f = tmp_path / "data.txt"
        f.write_text("one\ntwo\nthree\nfour\n")
        result = GetFileHeaderTool()._run(file_path=str(f), n_lines=2)
        assert result == "one\ntwo\n"

    def test_missing_file_returns_error_string(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetFileHeaderTool

        result = GetFileHeaderTool()._run(file_path="/nonexistent/file.txt")
        assert isinstance(result, str)
        assert result != ""


class TestSparqlTools:
    """SparqlSearchTool, FindOutEverythingAboutTool, GetTopicTaxonomyTool, GetInstancesTool
    all dispatch through SPARQLWrapper. Patch it once; assert the query is formed and
    credentials are set."""

    def _fake_sparql(self) -> MagicMock:
        fake = MagicMock()
        fake.query.return_value.convert.return_value = {"results": {"bindings": []}}
        return fake

    def test_sparql_search_uuid_path(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import SparqlSearchTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            SparqlSearchTool()._run(search_string="OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6")
        query = fake.setQuery.call_args.args[0]
        assert "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6" in query
        assert "HasUuid" in query

    def test_sparql_search_label_path(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import SparqlSearchTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            SparqlSearchTool()._run(search_string="hello world")
        query = fake.setQuery.call_args.args[0]
        assert 'CONTAINS(LCASE(STR(?labeltext)), LCASE("hello"))' in query
        assert 'CONTAINS(LCASE(STR(?labeltext)), LCASE("world"))' in query

    def test_sparql_search_sets_credentials(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import SparqlSearchTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            SparqlSearchTool()._run(search_string="x")
        fake.setCredentials.assert_called_once_with("user", "pass")

    def test_find_out_everything_about(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import FindOutEverythingAboutTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            FindOutEverythingAboutTool()._run(osw_id="File:OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6.csv")
        query = fake.setQuery.call_args.args[0]
        assert "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6" in query

    def test_get_topic_taxonomy(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetTopicTaxonomyTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            GetTopicTaxonomyTool()._run(osw_id="Category:OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6")
        query = fake.setQuery.call_args.args[0]
        assert "SubClassOf" in query
        assert "a5fd64a4-e26e-4b7d-abdb-b8c0db83ddd6" in query

    def test_get_instances(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetInstancesTool

        fake = self._fake_sparql()
        with patch(f"{OSW_TOOLS_MODULE}.SPARQLWrapper", return_value=fake):
            GetInstancesTool()._run(osw_id="Category:OSWa5fd64a4e26e4b7dabdbb8c0db83ddd6")
        query = fake.setQuery.call_args.args[0]
        assert "HasType" in query

    def test_get_instances_handles_bad_id(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetInstancesTool

        # Invalid osw_id (no UUID) - tool should return a string, not raise.
        result = GetInstancesTool()._run(osw_id="not-an-osw-id")
        assert isinstance(result, str)


class TestGetWebsiteHtmlTool:
    def test_returns_decoded_html(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetWebsiteHtmlTool

        fake_page = MagicMock()
        fake_page.read.return_value = b"<html>hi</html>"
        with patch(f"{OSW_TOOLS_MODULE}.urlopen", return_value=fake_page):
            result = GetWebsiteHtmlTool()._run(url="https://example.com")
        assert result == "<html>hi</html>"

    def test_exception_returned_as_string(self, osw_env: None) -> None:
        from panelini.panels.ai.plot.tools.osw_tools import GetWebsiteHtmlTool

        with patch(f"{OSW_TOOLS_MODULE}.urlopen", side_effect=RuntimeError("dns fail")):
            result = GetWebsiteHtmlTool()._run(url="https://example.com")
        assert isinstance(result, str)
        assert "dns fail" in result
