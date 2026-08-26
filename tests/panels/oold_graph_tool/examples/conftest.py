"""Shared helpers and fixtures for oold_graph_tool example tests."""

import panel as pn
import pytest

from panelini.panels.oold_graph_tool.oold_graph_tool import _cls_node_id


@pytest.fixture(scope="session", autouse=True)
def pn_extensions():
    pn.extension("tabulator", inline=True)
    pn.extension("jsoneditor", inline=True)


def cls_nid(schema):
    return _cls_node_id(schema)


def nodes_by_kind(tool, kind):
    return [n for n in tool._full_visjs_nodes if n.get("node_kind") == kind]


def entity_nodes(tool):
    return [n for n in tool._full_visjs_nodes if n.get("node_kind") is None]


def node_ids(tool, full=True):
    src = tool._full_visjs_nodes if full else tool.visjs_nodes
    return {n["id"] for n in src}


def edge_triples(tool, full=True):
    src = tool._full_visjs_edges if full else tool.visjs_edges
    return {(e["from"], e["to"], e["label"]) for e in src}


def edges_by_label(tool, label, full=True):
    src = tool._full_visjs_edges if full else tool.visjs_edges
    return [(e["from"], e["to"]) for e in src if e["label"] == label]


def node_by_id(tool, nid):
    for n in tool._full_visjs_nodes:
        if n["id"] == nid:
            return n
    return None
