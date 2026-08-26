"""Stateless OSW ``BaseTool`` subclasses and ``make_osw_tools()`` factory.

Each tool reads its credentials from environment variables inside ``_run``
(no module-level live connections). The factory returns ``[]`` when the
required OSW env vars are missing, so examples and tests degrade gracefully.
"""

from __future__ import annotations

import os
import re
from typing import Any
from urllib.request import urlopen
from uuid import UUID

from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field
from SPARQLWrapper import JSON, SPARQLWrapper

from ..utils.osw_env import build_osw_express, osw_env_present

# ---------------------------------------------------------------------------
# Pure helpers
# ---------------------------------------------------------------------------

_UUID_RE = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", re.IGNORECASE)


def _replace_special_characters(s: str, replacer: str = " ") -> str:
    """Replace every non-alphanumeric char with ``replacer`` and drop umlauts."""
    for char in s:
        if char.isalnum():
            continue
        s = s.replace(char, replacer)
    return s.replace("ä", "").replace("ö", "").replace("ü", "").replace("ß", "")


def _check_for_uuid(input_str: str) -> bool:
    """True iff ``input_str`` is a canonical UUID string."""
    return _UUID_RE.match(input_str) is not None


def _try_cast_str_to_uuid(input_str: str) -> str | None:
    """Return a UUID string from either a UUID or an OSW id; ``None`` otherwise."""
    if _check_for_uuid(input_str):
        return input_str
    if "osw" in input_str.lower():
        tail = input_str[-32:]
        return f"{tail[0:8]}-{tail[8:12]}-{tail[12:16]}-{tail[16:20]}-{tail[20:32]}"
    return None


def _sparql_prefixes(domain: str) -> str:
    """Return common PREFIX declarations for the Blazegraph endpoint."""
    return (
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
        "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n"
        f"PREFIX osl: <https://{domain}/id/>\n"
        f"PREFIX Property: <https://{domain}/id/Property-3A>\n"
        f"PREFIX File: <https://{domain}/id/File-3A>\n"
        f"PREFIX Category: <https://{domain}/id/Category-3A>\n"
        f"PREFIX Item: <https://{domain}/id/Item-3A>\n"
    )


def _run_sparql(query: str) -> Any:
    """Execute ``query`` against ``BLAZEGRAPH_ENDPOINT`` with basic auth."""
    sparql = SPARQLWrapper(os.environ["BLAZEGRAPH_ENDPOINT"])
    sparql.setHTTPAuth("BASIC")
    sparql.setCredentials(os.environ["BLAZEGRAPH_USER"], os.environ["BLAZEGRAPH_PASSWORD"])
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    return sparql.query().convert()


def _osw_id_to_uuid(osw_id: str) -> str:
    """Extract the UUID portion of an OSW id like 'File:OSW<hex>.csv'."""
    bare = osw_id.split(":")[-1].split(".")[0]
    return str(UUID(bare.replace("OSW", "")))


# ---------------------------------------------------------------------------
# Input schemas (pydantic v2)
# ---------------------------------------------------------------------------


class GetPageHtmlInput(BaseModel):
    fullpagetitle: str = Field(
        ...,
        description=(
            "The title of the page to get the html from including the namespace. "
            "Example: Item:OSW70b4d6464c1d44a887eb86e3b39b8751"
        ),
    )


class DownloadOslFileInput(BaseModel):
    osw_id: str = Field(
        ...,
        description=(
            "The id of the OSW element to download the file from. Can start with 'File:' "
            "or 'OSW', e.g. File:OSW29b9f7873b6f4752beafc4cc57b65db2.csv"
        ),
    )


class GetFileHeaderInput(BaseModel):
    file_path: str = Field(..., description="The path to the file to get the header from.")
    n_lines: int = Field(default=10, description="The number of lines to read from the file.")


class SparqlSearchInput(BaseModel):
    search_string: str = Field(
        ...,
        description=(
            "The search string to look for. All words inside the search string must be contained in "
            "the normalized label. Hint: if plural yields no result, try the singular."
        ),
    )


class FindOutEverythingAboutInput(BaseModel):
    osw_id: str = Field(
        ...,
        description="The id of the OSW element to find out everything about, e.g. File:OSW29b9f7873b6f4752beafc4cc57b65db2",
        pattern=r".*OSW[0-9a-f]{32}.*",
    )
    depth: int = Field(default=1, description="The depth of the search. Default is 1.")


class GetTopicTaxonomyInput(BaseModel):
    osw_id: str = Field(..., description="The id of the central OSW element to find out all parent and sub-classes.")
    parent_depth: int = Field(default=10, description="The depth of searching for the parent classes.")
    child_depth: int = Field(default=1, description="The depth of searching for child classes.")


class GetInstancesInput(BaseModel):
    osw_id: str = Field(..., description="The id of the category to find instances i.e. examples.")
    max_number: int = Field(default=10, description="The maximum number of instances to be fetched.")


class GetWebsiteHtmlInput(BaseModel):
    url: str = Field(..., description="The url of the website to get the html from.")


# ---------------------------------------------------------------------------
# Tools (stubs — _run bodies implemented in step 9 via TDD)
# ---------------------------------------------------------------------------


class GetPageHtmlTool(BaseTool):
    name: str = "get_page_html"
    description: str = "Get the HTML content of a wiki page (main slot) from an OSW instance."
    args_schema: type[BaseModel] = GetPageHtmlInput

    def _run(self, fullpagetitle: str) -> Any:
        try:
            osw_obj = build_osw_express()
            return osw_obj.site._site.raw_api(action="parse", page=fullpagetitle, format="json")
        except Exception as e:
            return f"error fetching page html: {e}"


class DownloadOslFileTool(BaseTool):
    name: str = "download_osl_file"
    description: str = "Download a file from an OSW instance to a local path and return that path."
    args_schema: type[BaseModel] = DownloadOslFileInput

    def _run(self, osw_id: str) -> str:
        try:
            if not osw_id.startswith("File:"):
                if osw_id.startswith("OSW"):
                    osw_id = "File:" + osw_id
                else:
                    raise ValueError("OSW id must start with 'File:' or 'OSW'")  # noqa: TRY003, TRY301
            osw_obj = build_osw_express()
            local_file = osw_obj.download_file(f"https://{osw_obj.domain}/wiki/{osw_id}", overwrite=True)
            return str(local_file.path)
        except Exception as e:
            return f"could not download file, exception {e}"


class GetFileHeaderTool(BaseTool):
    name: str = "get_file_header"
    description: str = "Read the first N lines of a local text file and return them as one string."
    args_schema: type[BaseModel] = GetFileHeaderInput

    def _run(self, file_path: str, n_lines: int = 10) -> str:
        try:
            with open(file_path, encoding="utf-8") as file:
                lines = [next(file) for _ in range(n_lines)]
            return "".join(lines)
        except Exception as e:
            return f"error reading file header: {e}"


class SparqlSearchTool(BaseTool):
    name: str = "sparql_search"
    description: str = "Search for a string in the OSW via SPARQL (label match on normalized labels)."
    args_schema: type[BaseModel] = SparqlSearchInput

    def _run(self, search_string: str) -> Any:
        try:
            domain = os.environ["OSW_DOMAIN"]
            prefixes = _sparql_prefixes(domain)
            uuid_hit = _try_cast_str_to_uuid(search_string)
            if uuid_hit is not None:
                query = (
                    prefixes
                    + "SELECT DISTINCT ?node ?label ?labeltext ?osw_id ?uuid\n"
                    + "WHERE {\n"
                    + "  ?node Property:HasUuid ?uuid .\n"
                    + "  ?node Property:HasNormalizedLabel ?label .\n"
                    + f"  ?label <https://{domain}/id/Property-3AText> ?labeltext.\n"
                    + "  ?node Property:HasOswId ?osw_id.\n"
                    + f'  FILTER(?uuid = "{uuid_hit}")\n'
                    + "}"
                )
            else:
                filters = "".join(
                    f'  FILTER(CONTAINS(LCASE(STR(?labeltext)), LCASE("{word}")))\n'
                    for word in _replace_special_characters(search_string).split(" ")
                    if word
                )
                query = (
                    prefixes
                    + "SELECT DISTINCT ?node ?label ?labeltext ?osw_id\n"
                    + "WHERE {\n"
                    + "  ?node Property:HasNormalizedLabel ?label .\n"
                    + f"  ?label <https://{domain}/id/Property-3AText> ?labeltext\n"
                    + filters
                    + "  ?node Property:HasOswId ?osw_id\n"
                    + "}"
                )
            return _run_sparql(query)
        except Exception as e:
            return f"error running sparql search: {e}"


class FindOutEverythingAboutTool(BaseTool):
    name: str = "find_out_everything_about"
    description: str = "Get all SPARQL triples (star shape) for an OSW element — all its properties and relations."
    args_schema: type[BaseModel] = FindOutEverythingAboutInput

    def _run(self, osw_id: str, depth: int = 1) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            prefixes = _sparql_prefixes(os.environ["OSW_DOMAIN"])
            query = (
                prefixes
                + "SELECT DISTINCT ?s ?p ?o ?s_label ?p_label ?o_label\n"
                + "WHERE {\n"
                + '  { ?s ?p ?o . ?s Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label .\n"
                + "    ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . }\n"
                + "  UNION\n"
                + '  { ?s ?p ?o . ?o Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label .\n"
                + "    ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . }\n"
                + "  UNION\n"
                + '  { ?s ?p ?o . ?s Property:HasUuid "'
                + my_uuid
                + '" . }\n'
                + "}"
            )
            return _run_sparql(query)
        except Exception as e:
            return f"error finding out about {osw_id}: {e}"


class GetTopicTaxonomyTool(BaseTool):
    name: str = "get_topic_taxonomy"
    description: str = "Get parent and child classes of a given OSW class via SubClassOf traversal."
    args_schema: type[BaseModel] = GetTopicTaxonomyInput

    def _run(self, osw_id: str, parent_depth: int = 10, child_depth: int = 1) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            prefixes = _sparql_prefixes(os.environ["OSW_DOMAIN"])
            query = (
                prefixes
                + "SELECT DISTINCT ?s_label ?p ?p_label ?o ?o_label ?s_id ?o_id\n"
                + "WHERE {\n"
                + '  { ?s ?p ?o . ?s (^Property:SubClassOf)*/Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label . ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . ?o Property:HasOswId ?o_id . }\n"
                + "  UNION\n"
                + '  { ?s ?p ?o . ?s (Property:SubClassOf)*/Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label . ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . ?o Property:HasOswId ?o_id . }\n"
                + "}"
            )
            return _run_sparql(query)
        except Exception as e:
            return f"error getting taxonomy for {osw_id}: {e}"


class GetInstancesTool(BaseTool):
    name: str = "get_instances"
    description: str = "Get all instances (examples) of a given OSW class."
    args_schema: type[BaseModel] = GetInstancesInput

    def _run(self, osw_id: str, max_number: int = 10) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            prefixes = _sparql_prefixes(os.environ["OSW_DOMAIN"])
            query = (
                prefixes
                + "SELECT DISTINCT ?s_label ?p ?p_label ?o ?o_label ?s_id ?o_id\n"
                + "WHERE {\n"
                + '  { ?s ?p ?o . ?s Property:HasType/(^Property:SubClassOf)*/Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label . ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . ?o Property:HasOswId ?o_id . }\n"
                + "  UNION\n"
                + '  { ?s ?p ?o . ?s Property:HasType/(Property:SubClassOf)*/Property:HasUuid "'
                + my_uuid
                + '" .\n'
                + "    ?s Property:HasName ?s_label . ?p Property:HasName ?p_label .\n"
                + "    ?o Property:HasName ?o_label . ?o Property:HasOswId ?o_id . }\n"
                + "}"
            )
            return _run_sparql(query)
        except Exception:
            return "no instances found. The name of the class might not be available — try sparql_search first."


class GetWebsiteHtmlTool(BaseTool):
    name: str = "get_website_html"
    description: str = "Fetch the HTML content of an arbitrary URL."
    args_schema: type[BaseModel] = GetWebsiteHtmlInput

    def _run(self, url: str) -> str:
        try:
            page = urlopen(url)  # noqa: S310
            html_bytes: bytes = page.read()
            return html_bytes.decode("utf-8")
        except Exception as e:
            return f"error fetching website: {e}"


# ---------------------------------------------------------------------------
# Factory
# ---------------------------------------------------------------------------


def make_osw_tools() -> list[BaseTool]:
    """Return all OSW tools when the required env vars are set, ``[]`` otherwise.

    Required env: ``OSW_DOMAIN``, ``BLAZEGRAPH_ENDPOINT``, ``BLAZEGRAPH_USER``,
    ``BLAZEGRAPH_PASSWORD``.
    """
    if not osw_env_present():
        return []
    return [
        GetPageHtmlTool(),
        DownloadOslFileTool(),
        GetFileHeaderTool(),
        SparqlSearchTool(),
        FindOutEverythingAboutTool(),
        GetTopicTaxonomyTool(),
        GetInstancesTool(),
        GetWebsiteHtmlTool(),
    ]
