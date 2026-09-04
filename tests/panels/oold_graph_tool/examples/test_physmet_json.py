"""Verify all expected nodes and edges for the PhysMet JSON example.

Entity data is fetched live from CSV templates on GitHub, so this test
requires network access and is skipped when the import fails.
"""

import pytest

from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphDetailTool
from tests.panels.oold_graph_tool.examples.conftest import (
    edge_triples,
    edges_by_label,
    entity_nodes,
    node_by_id,
    node_ids,
    nodes_by_kind,
)

try:
    from examples.panels.oold_graph.physmet_json import (
        ENTITY_IRI,
        SUBTYPE_TO_PARENT,
        config,
        entity_list,
        schemas,
    )

    _IMPORT_ERROR = None
except Exception as exc:
    _IMPORT_ERROR = str(exc)

pytestmark = pytest.mark.skipif(
    _IMPORT_ERROR is not None, reason=f"physmet_json import failed (network?): {_IMPORT_ERROR}"
)

# ── Fixtures ─────────────────────────────────────────────────────────────────

ENTITY_NID = ENTITY_IRI if _IMPORT_ERROR is None else ""


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


def _schema_nid(name: str) -> str:
    """Return the class node ID for a parent schema (uses its actual $id)."""
    if _IMPORT_ERROR is None:
        sid = schemas[name].get("$id")
        if sid:
            return sid
    repo = "https://raw.githubusercontent.com/SINTEF/physmet-data-documentation-templates/refs/heads/main"
    return f"{repo}/schemas/{name}.schema.json"


# ── 1. Entity Nodes ──────────────────────────────────────────────────────────


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == len(entity_list)

    def test_all_entity_iris_present(self, tool):
        ids = node_ids(tool)
        for e in entity_list:
            assert e["@id"] in ids, f"Missing entity node for {e['@id']}"


# ── 2. Class Nodes ───────────────────────────────────────────────────────────


class TestClassNodes:
    def test_entity_class_present(self, tool):
        assert node_by_id(tool, ENTITY_NID) is not None

    def test_schema_classes_present(self, tool):
        ids = node_ids(tool)
        for name in schemas:
            assert _schema_nid(name) in ids, f"Missing class node for schema {name}"

    def test_subtype_classes_present(self, tool):
        ids = node_ids(tool)
        for type_iri in SUBTYPE_TO_PARENT:
            assert type_iri in ids, f"Missing class node for subtype {type_iri}"

    def test_class_node_count(self, tool):
        expected = 1 + 1 + len(schemas) + len(SUBTYPE_TO_PARENT)
        assert len(nodes_by_kind(tool, "class")) == expected


# ── 3. Hierarchy Edges ───────────────────────────────────────────────────────


class TestHierarchyEdges:
    def test_extends_schema_count(self, tool):
        assert len(edges_by_label(tool, "ExtendsSchema")) == len(schemas)

    def test_subclass_of_count(self, tool):
        assert len(edges_by_label(tool, "SubClassOf")) == len(SUBTYPE_TO_PARENT)

    def test_parent_schemas_extends_entity(self, tool):
        triples = edge_triples(tool)
        for name in schemas:
            assert (_schema_nid(name), ENTITY_NID, "ExtendsSchema") in triples

    def test_subtypes_subclassof_parent(self, tool):
        triples = edge_triples(tool)
        for type_iri, parent_name in SUBTYPE_TO_PARENT.items():
            assert (type_iri, _schema_nid(parent_name), "SubClassOf") in triples, (
                f"{type_iri} missing SubClassOf {parent_name}"
            )


# ── 4. HasSchemaType Edges ───────────────────────────────────────────────────


class TestHasSchemaTypeEdges:
    def test_has_schema_type_count(self, tool):
        assert len(edges_by_label(tool, "HasSchemaType")) == len(entity_list)

    def test_entities_have_schema_type_to_parent(self, tool):
        triples = edge_triples(tool)
        for e in entity_list:
            parent_name = SUBTYPE_TO_PARENT.get(e.get("@type", ""))
            if parent_name:
                target = _schema_nid(parent_name)
                assert (e["@id"], target, "HasSchemaType") in triples, (
                    f"{e['@id']} missing HasSchemaType -> {parent_name}"
                )


# ── 5. HasRdfType Edges ──────────────────────────────────────────────────────


class TestHasRdfTypeEdges:
    def test_has_rdf_type_count(self, tool):
        assert len(edges_by_label(tool, "HasRdfType")) == len(entity_list)

    def test_entities_have_rdf_type_to_subtype(self, tool):
        triples = edge_triples(tool)
        for e in entity_list:
            etype = e.get("@type", "")
            assert (e["@id"], etype, "HasRdfType") in triples, f"{e['@id']} missing HasRdfType -> {etype}"


# ── 6. RDF Property Edges ───────────────────────────────────────────────────


class TestRdfEdges:
    def test_affiliation_edges(self, tool):
        expected = sum(1 for e in entity_list if "affiliation" in e)
        assert len(edges_by_label(tool, "member")) == expected

    def test_funding_agency_edges(self, tool):
        expected = sum(1 for e in entity_list if "hasFundingAgency" in e)
        assert len(edges_by_label(tool, "fundedBy")) == expected

    def test_contact_person_edges(self, tool):
        expected = sum(1 for e in entity_list if "contactPerson" in e)
        assert len(edges_by_label(tool, "HasContactPerson")) == expected

    def test_project_edges(self, tool):
        expected = sum(1 for e in entity_list if "project" in e)
        assert len(edges_by_label(tool, "HasProject")) == expected


# ── 7. Expansion Policy ─────────────────────────────────────────────────────


class TestExpansionPolicy:
    def test_visible_node_ids_not_none(self, tool):
        assert tool._visible_node_ids is not None

    def test_entity_root_visible(self, tool):
        assert ENTITY_NID in tool._visible_node_ids

    def test_all_entities_visible(self, tool):
        for e in entity_list:
            assert e["@id"] in tool._visible_node_ids, f"{e['@id']} not visible"

    def test_all_schema_classes_visible(self, tool):
        for name in schemas:
            assert _schema_nid(name) in tool._visible_node_ids, f"Schema class {name} not visible"

    def test_full_gt_visible_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)


# ── 8. Totals ────────────────────────────────────────────────────────────────


class TestTotals:
    def test_total_node_count(self, tool):
        count = len(tool._full_visjs_nodes)
        assert count > 100, f"Expected >100 nodes, got {count}"

    def test_total_edge_count(self, tool):
        count = len(tool._full_visjs_edges)
        assert count > 100, f"Expected >100 edges, got {count}"

    def test_build_panel_succeeds(self, tool):
        tool.build_panel()
        assert hasattr(tool, "detail_tabs")
