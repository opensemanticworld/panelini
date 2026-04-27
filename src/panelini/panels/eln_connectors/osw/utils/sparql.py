"""SPARQL query helpers for the OSW connector.

All functions accept an :class:`~..connection.OswConnection` so they work
with per-instance credentials instead of reading ``os.environ`` directly.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from SPARQLWrapper import JSON, SPARQLWrapper

if TYPE_CHECKING:
    from ..connection import OswConnection


def sparql_prefixes(domain: str) -> str:
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


def run_sparql(connection: OswConnection, query: str) -> Any:
    """Execute ``query`` against the connection's Blazegraph endpoint."""
    endpoint = connection.blazegraph_endpoint
    if endpoint is None:
        raise ValueError("blazegraph_endpoint is not configured on this connection")  # noqa: TRY003
    sparql = SPARQLWrapper(endpoint)
    sparql.setHTTPAuth("BASIC")
    sparql.setCredentials(connection.blazegraph_user, connection.blazegraph_password)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    return sparql.query().convert()
