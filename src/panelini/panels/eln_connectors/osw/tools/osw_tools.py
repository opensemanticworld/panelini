"""OSW ``BaseTool`` subclasses and ``make_osw_tools()`` factory.

Each tool accepts an optional :class:`~..connection.OswConnection`. When
provided, the tool uses that connection's credentials; when ``None``, it
falls back to env-var-based ``build_osw_express()`` for backward compat.
"""

from __future__ import annotations

import re
from typing import Any
from urllib.request import urlopen
from uuid import UUID

from langchain_core.tools import BaseTool
from pydantic import BaseModel, ConfigDict, Field

from ..connection import OswConnection
from ..utils.osw_env import build_osw_express
from ..utils.sparql import run_sparql, sparql_prefixes

_CONN_MODEL_CONFIG = ConfigDict(arbitrary_types_allowed=True)

# ---------------------------------------------------------------------------
# Pure helpers
# ---------------------------------------------------------------------------

_UUID_RE = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", re.IGNORECASE)


def _replace_special_characters(s: str, replacer: str = " ") -> str:
    for char in s:
        if char.isalnum():
            continue
        s = s.replace(char, replacer)
    return s.replace("ä", "").replace("ö", "").replace("ü", "").replace("ß", "")


def _check_for_uuid(input_str: str) -> bool:
    return _UUID_RE.match(input_str) is not None


def _try_cast_str_to_uuid(input_str: str) -> str | None:
    if _check_for_uuid(input_str):
        return input_str
    if "osw" in input_str.lower():
        tail = input_str[-32:]
        return f"{tail[0:8]}-{tail[8:12]}-{tail[12:16]}-{tail[16:20]}-{tail[20:32]}"
    return None


def _osw_id_to_uuid(osw_id: str) -> str:
    bare = osw_id.split(":")[-1].split(".")[0]
    return str(UUID(bare.replace("OSW", "")))


def _get_osw(connection: OswConnection | None) -> Any:
    """Resolve an OswExpress client from a connection or env vars."""
    if connection is not None:
        return connection.build_osw_express()
    return build_osw_express()


def _get_domain(connection: OswConnection | None) -> str:
    """Resolve domain from a connection or env var."""
    if connection is not None:
        return connection.domain
    import os

    return os.environ["OSW_DOMAIN"]


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


class UploadOslFileInput(BaseModel):
    file_path: str = Field(..., description="Local path to the file to upload to OSW.")
    osw_id: str | None = Field(
        default=None,
        description=(
            "Optional target OSW File ID to overwrite. Can start with 'File:' or 'OSW', "
            "e.g. 'File:OSW29b9f7873b6f4752beafc4cc57b65db2.csv'. "
            "If omitted, a new UUID is generated."
        ),
    )
    label: str | None = Field(
        default=None,
        description="Human-readable label for the uploaded file. Defaults to the filename.",
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


class FetchSchemaInput(BaseModel):
    schema_titles: list[str] = Field(
        ...,
        description=(
            "List of category page titles whose schemas should be fetched and registered locally. "
            "Example: ['Category:OSW136953ec4cbf49ef80e2343c0e1981c0']"
        ),
    )


class GetWebsiteHtmlInput(BaseModel):
    url: str = Field(..., description="The url of the website to get the html from.")


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------


class GetPageHtmlTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "get_page_html"
    description: str = "Get the HTML content of a wiki page (main slot) from an OSW instance."
    args_schema: type[BaseModel] = GetPageHtmlInput
    connection: OswConnection | None = None

    def _run(self, fullpagetitle: str) -> Any:
        try:
            osw_obj = _get_osw(self.connection)
            return osw_obj.site._site.raw_api(action="parse", page=fullpagetitle, format="json")
        except Exception as e:
            return f"error fetching page html: {e}"


class DownloadOslFileTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "download_osl_file"
    description: str = "Download a file from an OSW instance to a local path and return that path."
    args_schema: type[BaseModel] = DownloadOslFileInput
    connection: OswConnection | None = None

    def _run(self, osw_id: str) -> str:
        try:
            if not osw_id.startswith("File:"):
                if osw_id.startswith("OSW"):
                    osw_id = "File:" + osw_id
                else:
                    raise ValueError("OSW id must start with 'File:' or 'OSW'")  # noqa: TRY003, TRY301
            osw_obj = _get_osw(self.connection)
            local_file = osw_obj.download_file(f"https://{osw_obj.domain}/wiki/{osw_id}", overwrite=True)
            return str(local_file.path)
        except Exception as e:
            return f"could not download file, exception {e}"


class UploadOslFileTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "upload_osl_file"
    description: str = (
        "Upload a local file to an OSW instance as a WikiFile and return its OSW File ID. "
        "Use this after download_osl_file to copy a file from one OSW instance to another."
    )
    args_schema: type[BaseModel] = UploadOslFileInput
    connection: OswConnection | None = None

    def _run(
        self,
        file_path: str,
        osw_id: str | None = None,
        label: str | None = None,
    ) -> str:
        try:
            import io
            import uuid as uuid_mod
            from pathlib import Path

            from osw.controller.file.wiki import WikiFileController  # type: ignore[import-untyped]
            from osw.core import model  # type: ignore[import-untyped]

            path = Path(file_path)
            if not path.exists():
                return f"error: file not found at {file_path}"

            if osw_id is not None:
                bare = osw_id.split(":")[-1].split(".")[0]
                new_uuid = uuid_mod.UUID(bare.replace("OSW", ""))
            else:
                new_uuid = uuid_mod.uuid4()

            suffix = path.suffix
            title = "OSW" + str(new_uuid).replace("-", "") + suffix
            file_label = label or path.name

            osw_obj = _get_osw(self.connection)
            wf = WikiFileController(
                uuid=str(new_uuid),
                osw=osw_obj,
                title=title,
                label=[model.Label(text=file_label)],
            )
            bytesio = io.BytesIO(path.read_bytes())
            bytesio.name = title
            wf.put(bytesio, overwrite=True)
            return f"File:OSW{str(new_uuid).replace('-', '')}{suffix}"
        except Exception as e:
            return f"could not upload file, exception {e}"


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
    model_config = _CONN_MODEL_CONFIG
    name: str = "sparql_search"
    description: str = (
        "Search the OSW knowledge base by keyword. Returns matching OSW elements with their "
        "IDs and labels. Use this FIRST when the user asks about a topic, entity, or concept — "
        "then pass the returned OSW ID to find_out_everything_about for full details."
    )
    args_schema: type[BaseModel] = SparqlSearchInput
    connection: OswConnection | None = None

    def _run(self, search_string: str) -> Any:
        try:
            domain = _get_domain(self.connection)
            prefixes = sparql_prefixes(domain)
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
            if self.connection is not None:
                return run_sparql(self.connection, query)

            return _run_sparql_from_env(query)
        except Exception as e:
            return f"error running sparql search: {e}"


class FindOutEverythingAboutTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "find_out_everything_about"
    description: str = (
        "Query the OSW knowledge base for all properties and relations of an OSW element "
        "(SPARQL star shape). Requires an OSW ID — use sparql_search first if you only "
        "have a keyword. This is a DATABASE LOOKUP, not code execution."
    )
    args_schema: type[BaseModel] = FindOutEverythingAboutInput
    connection: OswConnection | None = None

    def _run(self, osw_id: str, depth: int = 1) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            domain = _get_domain(self.connection)
            prefixes = sparql_prefixes(domain)
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
            if self.connection is not None:
                return run_sparql(self.connection, query)
            return _run_sparql_from_env(query)
        except Exception as e:
            return f"error finding out about {osw_id}: {e}"


class GetTopicTaxonomyTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "get_topic_taxonomy"
    description: str = "Get parent and child classes of a given OSW class via SubClassOf traversal."
    args_schema: type[BaseModel] = GetTopicTaxonomyInput
    connection: OswConnection | None = None

    def _run(self, osw_id: str, parent_depth: int = 10, child_depth: int = 1) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            domain = _get_domain(self.connection)
            prefixes = sparql_prefixes(domain)
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
            if self.connection is not None:
                return run_sparql(self.connection, query)
            return _run_sparql_from_env(query)
        except Exception as e:
            return f"error getting taxonomy for {osw_id}: {e}"


class GetInstancesTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "get_instances"
    description: str = "Get all instances (examples) of a given OSW class."
    args_schema: type[BaseModel] = GetInstancesInput
    connection: OswConnection | None = None

    def _run(self, osw_id: str, max_number: int = 10) -> Any:
        try:
            my_uuid = _osw_id_to_uuid(osw_id)
            domain = _get_domain(self.connection)
            prefixes = sparql_prefixes(domain)
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
            if self.connection is not None:
                return run_sparql(self.connection, query)
            return _run_sparql_from_env(query)
        except Exception:
            return "no instances found. The name of the class might not be available — try sparql_search first."


class FetchSchemaTool(BaseTool):
    model_config = _CONN_MODEL_CONFIG
    name: str = "fetch_osw_schema"
    description: str = (
        "Fetch and register OSW category schemas locally so that the corresponding "
        "Python model classes become available in osw.model.entity. Call this when a "
        "tool fails with 'module osw.model.entity has no attribute <ClassName>' — pass "
        "the Category page title(s) to load the missing schema."
    )
    args_schema: type[BaseModel] = FetchSchemaInput
    connection: OswConnection | None = None

    def _run(self, schema_titles: list[str]) -> str:
        try:
            from osw.core import OSW

            osw_obj = _get_osw(self.connection)
            osw_obj.fetch_schema(
                OSW.FetchSchemaParam(
                    schema_title=schema_titles,
                    mode="replace",
                )
            )
            return f"Successfully fetched and registered schemas: {', '.join(schema_titles)}"
        except Exception as e:
            return f"error fetching schemas: {e}"


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
# Legacy env-var SPARQL fallback
# ---------------------------------------------------------------------------


def _run_sparql_from_env(query: str) -> Any:
    """Execute a SPARQL query using env-var credentials (legacy path)."""
    import os

    from SPARQLWrapper import JSON, SPARQLWrapper

    sparql = SPARQLWrapper(os.environ["BLAZEGRAPH_ENDPOINT"])
    sparql.setHTTPAuth("BASIC")
    sparql.setCredentials(os.environ["BLAZEGRAPH_USER"], os.environ["BLAZEGRAPH_PASSWORD"])
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    return sparql.query().convert()


# ---------------------------------------------------------------------------
# Factory
# ---------------------------------------------------------------------------


def make_osw_tools(connection: OswConnection | None = None) -> list[BaseTool]:
    """Return all OSW tools bound to *connection*.

    When *connection* is ``None`` and env vars are present, tools fall back
    to env-var-based credential resolution. Returns ``[]`` when neither a
    connection nor the required env vars are available.
    """
    if connection is None and not OswConnection.all_env_present():
        return []
    return [
        GetPageHtmlTool(connection=connection),
        DownloadOslFileTool(connection=connection),
        UploadOslFileTool(connection=connection),
        GetFileHeaderTool(),
        SparqlSearchTool(connection=connection),
        FindOutEverythingAboutTool(connection=connection),
        GetTopicTaxonomyTool(connection=connection),
        GetInstancesTool(connection=connection),
        FetchSchemaTool(connection=connection),
        GetWebsiteHtmlTool(),
    ]
