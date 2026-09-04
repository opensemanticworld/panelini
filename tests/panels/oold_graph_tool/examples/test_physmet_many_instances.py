"""Verify the PhysMet many-instances example loads and produces expected graph structure."""

import pytest

from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphDetailTool
from tests.panels.oold_graph_tool.examples.conftest import (
    edge_triples,
    edges_by_label,
    entity_nodes,
    node_ids,
    nodes_by_kind,
)

try:
    from examples.panels.oold_graph.physmet_many_instances.physmet_many_instances import (
        DATA_DIR,
        ENTITY_IRI,
        TABLE_NAMES,
        _load_csvs,
        config,
        entity_list,
        tables,
    )

    _IMPORT_ERROR = None
except Exception as exc:
    _IMPORT_ERROR = str(exc)

pytestmark = pytest.mark.skipif(
    _IMPORT_ERROR is not None,
    reason=f"physmet_many_instances import failed (network?): {_IMPORT_ERROR}",
)

ENTITY_NID = ENTITY_IRI if _IMPORT_ERROR is None else ""


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


# ── 1. CSV Data ─────────────────────────────────────────────────────────────


class TestCsvData:
    def test_all_tables_loaded(self):
        for name in TABLE_NAMES:
            assert name in tables, f"Missing table: {name}"

    def test_csvs_written_to_disk(self):
        for name in TABLE_NAMES:
            assert (DATA_DIR / f"{name}.csv").exists(), f"Missing CSV: {name}.csv"

    def test_csv_round_trip_preserves_count(self):
        reloaded = _load_csvs(DATA_DIR)
        assert len(reloaded) == len(TABLE_NAMES)
        for name in TABLE_NAMES:
            assert len(reloaded[name]) == len(tables[name]), f"Row count mismatch for {name}"

    def test_entity_count(self):
        assert len(entity_list) == 580

    def test_table_row_counts(self):
        assert len(tables["organisations"]) == 5
        assert len(tables["people"]) == 20
        assert len(tables["projects"]) == 8
        assert len(tables["equipments"]) == 10
        assert len(tables["samples"]) == 139
        assert len(tables["processes"]) == 199
        assert len(tables["datasets"]) == 199


# ── 2. Entity Nodes ─────────────────────────────────────────────────────────


class TestEntityNodes:
    def test_entity_node_count(self, tool):
        assert len(entity_nodes(tool)) == 580

    def test_all_entity_ids_present(self, tool):
        ids = node_ids(tool)
        for e in entity_list:
            assert e["@id"] in ids, f"Missing node for {e['@id']}"


# ── 3. Class Nodes ──────────────────────────────────────────────────────────


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 31

    def test_entity_class_present(self, tool):
        ids = node_ids(tool)
        assert ENTITY_NID in ids


# ── 4. HasType and IsA Edges ───────────────────────────────────────────────


class TestStructuralEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasType")) == 580

    def test_isa_count(self, tool):
        assert len(edges_by_label(tool, "IsA")) == 29


# ── 5. RDF Edges ───────────────────────────────────────────────────────────


class TestRdfEdges:
    def test_member_edges(self, tool):
        assert len(edges_by_label(tool, "member")) == 20

    def test_funded_by_edges(self, tool):
        assert len(edges_by_label(tool, "fundedBy")) == 8

    def test_has_input_edges(self, tool):
        assert len(edges_by_label(tool, "hasInput")) == 199

    def test_has_output_edges(self, tool):
        assert len(edges_by_label(tool, "hasOutput")) == 199

    def test_has_operator_edges(self, tool):
        assert len(edges_by_label(tool, "hasOperator")) == 199

    def test_performed_with_edges(self, tool):
        assert len(edges_by_label(tool, "performedWith")) == 199

    def test_creator_edges(self, tool):
        assert len(edges_by_label(tool, "creator")) == 338

    def test_processed_from_edges(self, tool):
        assert len(edges_by_label(tool, "qualifiedRelation")) == 238

    def test_rights_holder_edges(self, tool):
        assert len(edges_by_label(tool, "rightsHolder")) == 199

    def test_contact_person_edges(self, tool):
        assert len(edges_by_label(tool, "HasContactPerson")) == 110

    def test_project_edges(self, tool):
        assert len(edges_by_label(tool, "HasProject")) == 199

    def test_process_edges_link_to_entities(self, tool):
        triples = edge_triples(tool)
        ids = node_ids(tool)
        for src, dst, label in triples:
            if label in ("hasInput", "hasOutput", "hasOperator", "performedWith"):
                assert src in ids, f"Source {src} not a known node"
                assert dst in ids, f"Target {dst} not a known node"


# ── 6. Expansion Policy ────────────────────────────────────────────────────


class TestExpansionPolicy:
    def test_visible_node_ids_not_none(self, tool):
        assert tool._visible_node_ids is not None

    def test_root_visible(self, tool):
        assert "pers:Researcher_08" in tool._visible_node_ids

    def test_visible_count(self, tool):
        assert len(tool._visible_node_ids) == 54

    def test_visible_includes_processes_and_datasets(self, tool):
        vis_entities = [e for e in entity_list if e["@id"] in tool._visible_node_ids]
        vis_types = {e["@type"] for e in vis_entities}
        assert "temgo:EDSMapping" in vis_types
        assert "temgo:SIMSProfiling" in vis_types
        assert "chameo:Sample" in vis_types

    def test_full_gt_visible_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)


# ── 7. Totals ──────────────────────────────────────────────────────────────


class TestTotals:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 2213

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 4119

    def test_build_panel_succeeds(self, tool):
        tool.build_panel()
        assert hasattr(tool, "detail_tabs")
