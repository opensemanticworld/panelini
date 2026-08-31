"""Verify all expected nodes and edges for the PhysMet JSON example."""

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
        andreas,
        arm200f,
        config,
        ec,
        eds_class,
        eds_map_class,
        fib_class,
        helios,
        jesper,
        jm11,
        jm11_eds,
        jm11_eds_proc,
        jm11_fib_proc,
        jm11_sims,
        jm11_sims_proc,
        jm12,
        jm12_eds,
        lamella1,
        marisa,
        nfr,
        nominal_boron,
        nominal_silicon,
        ntnu,
        physmet,
        randi,
        schemas,
        sims_class,
        sims_profile_class,
        sintef,
        velox,
    )

    _IMPORT_ERROR = None
except Exception as exc:
    _IMPORT_ERROR = str(exc)

pytestmark = pytest.mark.skipif(
    _IMPORT_ERROR is not None, reason=f"physmet_json import failed (network?): {_IMPORT_ERROR}"
)

# ── Fixtures ─────────────────────────────────────────────────────────────────

REPO_RAW = "https://raw.githubusercontent.com/SINTEF/physmet-data-documentation-templates/refs/heads/main"


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


ALL_ENTITIES = (
    [
        ntnu,
        sintef,
        nfr,
        ec,
        andreas,
        marisa,
        jesper,
        randi,
        physmet,
        arm200f,
        helios,
        jm11,
        jm12,
        lamella1,
        eds_class,
        sims_class,
        fib_class,
        jm11_eds_proc,
        jm11_sims_proc,
        jm11_fib_proc,
        eds_map_class,
        sims_profile_class,
        jm11_eds,
        jm11_sims,
        jm12_eds,
        nominal_boron,
        nominal_silicon,
        velox,
    ]
    if _IMPORT_ERROR is None
    else []
)

ORGANISATIONS = [ntnu, sintef, nfr, ec] if _IMPORT_ERROR is None else []
PEOPLE = [andreas, marisa, jesper, randi] if _IMPORT_ERROR is None else []
SAMPLES = [jm11, jm12, lamella1] if _IMPORT_ERROR is None else []
PROCESSES = [jm11_eds_proc, jm11_sims_proc, jm11_fib_proc] if _IMPORT_ERROR is None else []
DATASETS = [jm11_eds, jm11_sims, jm12_eds] if _IMPORT_ERROR is None else []
PROCESS_CLASSES = [eds_class, sims_class, fib_class] if _IMPORT_ERROR is None else []
DATASET_CLASSES = [eds_map_class, sims_profile_class] if _IMPORT_ERROR is None else []

ENTITY_NID = ENTITY_IRI if _IMPORT_ERROR is None else ""


def _schema_nid(name: str) -> str:
    return f"{REPO_RAW}/schemas/{name}.schema.json"


# ── 1. Entity Nodes ──────────────────────────────────────────────────────────


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 28

    def test_all_entity_iris_present(self, tool):
        ids = node_ids(tool)
        for e in ALL_ENTITIES:
            assert e["@id"] in ids, f"Missing entity node for {e.get('name', e['@id'])}"

    def test_named_entity_node_labels(self, tool):
        for e in ALL_ENTITIES:
            name = e.get("name")
            if not name:
                continue
            n = node_by_id(tool, e["@id"])
            assert n is not None
            assert n["label"] == name, f"Label mismatch for {e['@id']}"


# ── 2. Class Nodes ───────────────────────────────────────────────────────────


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 13

    def test_entity_class_present(self, tool):
        assert node_by_id(tool, ENTITY_NID) is not None

    def test_schema_classes_present(self, tool):
        ids = node_ids(tool)
        for name in schemas:
            assert _schema_nid(name) in ids, f"Missing class node for schema {name}"

    def test_all_schemas_isa_entity(self, tool):
        triples = edge_triples(tool)
        for name in schemas:
            assert (_schema_nid(name), ENTITY_NID, "IsA") in triples, f"{name} missing IsA Entity"


# ── 3. IsA Edges ─────────────────────────────────────────────────────────────


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "IsA")) == 11

    def test_all_isa_point_to_entity(self, tool):
        for _src, dst in edges_by_label(tool, "IsA"):
            assert dst == ENTITY_NID


# ── 4. HasType Edges ─────────────────────────────────────────────────────────


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasType")) == 28

    def test_organisations_have_type(self, tool):
        triples = edge_triples(tool)
        for o in ORGANISATIONS:
            assert (o["@id"], _schema_nid("Organisations"), "HasType") in triples

    def test_people_have_type(self, tool):
        triples = edge_triples(tool)
        for p in PEOPLE:
            assert (p["@id"], _schema_nid("People"), "HasType") in triples

    def test_samples_have_type(self, tool):
        triples = edge_triples(tool)
        for s in SAMPLES:
            assert (s["@id"], _schema_nid("Samples"), "HasType") in triples

    def test_processes_have_type(self, tool):
        triples = edge_triples(tool)
        for p in PROCESSES:
            assert (p["@id"], _schema_nid("Processes"), "HasType") in triples

    def test_datasets_have_type(self, tool):
        triples = edge_triples(tool)
        for d in DATASETS:
            assert (d["@id"], _schema_nid("Datasets"), "HasType") in triples


# ── 5. RDF Property Edges ───────────────────────────────────────────────────


class TestRdfEdges:
    def test_affiliation_edges(self, tool):
        triples = edge_triples(tool)
        assert (andreas["@id"], ntnu["@id"], "member") in triples
        assert (marisa["@id"], ntnu["@id"], "member") in triples
        assert (jesper["@id"], sintef["@id"], "member") in triples
        assert (randi["@id"], ntnu["@id"], "member") in triples

    def test_funding_agency(self, tool):
        assert (physmet["@id"], nfr["@id"], "fundedBy") in edge_triples(tool)

    def test_contact_person_edges(self, tool):
        triples = edge_triples(tool)
        assert (arm200f["@id"], randi["@id"], "HasContactPerson") in triples
        assert (jm11["@id"], marisa["@id"], "HasContactPerson") in triples
        assert (jm11_eds["@id"], marisa["@id"], "HasContactPerson") in triples

    def test_has_input_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11_eds_proc["@id"], lamella1["@id"], "hasInput") in triples
        assert (jm11_sims_proc["@id"], jm11["@id"], "hasInput") in triples
        assert (jm11_fib_proc["@id"], jm11["@id"], "hasInput") in triples

    def test_has_output_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11_eds_proc["@id"], jm11_eds["@id"], "hasOutput") in triples
        assert (jm11_sims_proc["@id"], jm11_sims["@id"], "hasOutput") in triples
        assert (jm11_fib_proc["@id"], lamella1["@id"], "hasOutput") in triples

    def test_has_operator_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11_eds_proc["@id"], andreas["@id"], "hasOperator") in triples
        assert (jm11_sims_proc["@id"], andreas["@id"], "hasOperator") in triples
        assert (jm11_fib_proc["@id"], andreas["@id"], "hasOperator") in triples

    def test_performed_with_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11_eds_proc["@id"], arm200f["@id"], "performedWith") in triples
        assert (jm11_fib_proc["@id"], helios["@id"], "performedWith") in triples

    def test_processed_from_edges(self, tool):
        triples = edge_triples(tool)
        assert (lamella1["@id"], jm11["@id"], "qualifiedRelation") in triples
        assert (jm11_eds["@id"], lamella1["@id"], "qualifiedRelation") in triples
        assert (jm11_sims["@id"], jm11["@id"], "qualifiedRelation") in triples
        assert (jm12_eds["@id"], jm12["@id"], "qualifiedRelation") in triples

    def test_rights_holder_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11_eds["@id"], ntnu["@id"], "rightsHolder") in triples
        assert (jm11_sims["@id"], ntnu["@id"], "rightsHolder") in triples
        assert (jm12_eds["@id"], ntnu["@id"], "rightsHolder") in triples

    def test_creator_edges(self, tool):
        triples = edge_triples(tool)
        assert (jm11["@id"], andreas["@id"], "creator") in triples
        assert (jm12["@id"], andreas["@id"], "creator") in triples
        assert (jm11_eds["@id"], andreas["@id"], "creator") in triples
        assert (jm11_sims["@id"], andreas["@id"], "creator") in triples
        assert (jm12_eds["@id"], andreas["@id"], "creator") in triples
        assert (lamella1["@id"], andreas["@id"], "creator") in triples

    def test_has_output_class_level_edges(self, tool):
        triples = edge_triples(tool)
        assert (eds_class["@id"], jm11_eds["@type"], "hasOutput") in triples


# ── 6. Expansion Policy ─────────────────────────────────────────────────────


class TestExpansionPolicy:
    def test_visible_node_ids_not_none(self, tool):
        assert tool._visible_node_ids is not None

    def test_entity_root_visible(self, tool):
        assert ENTITY_NID in tool._visible_node_ids

    def test_all_entities_visible(self, tool):
        for e in ALL_ENTITIES:
            assert e["@id"] in tool._visible_node_ids, f"{e.get('name', e['@id'])} not visible"

    def test_all_schema_classes_visible(self, tool):
        for name in schemas:
            assert _schema_nid(name) in tool._visible_node_ids, f"Schema class {name} not visible"

    def test_visible_count(self, tool):
        assert len(tool._visible_node_ids) == 40

    def test_full_gt_visible_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)


# ── 7. Node / Edge Totals ───────────────────────────────────────────────────


class TestTotals:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 368

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 399

    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 104

    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 51

    def test_build_panel_succeeds(self, tool):
        tool.build_panel()
        assert hasattr(tool, "detail_tabs")
