"""Verify all expected nodes and edges for the JSON social network example."""

import pytest

from examples.panels.oold_graph.social_network_json import (
    ENTITY_IRI,
    alice,
    art,
    artist,
    bob,
    charlie,
    config,
    david,
    doctor,
    engineer,
    eve,
    music,
    scientist,
    sports,
    teacher,
)
from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphDetailTool
from tests.panels.oold_graph_tool.examples.conftest import (
    edge_triples,
    edges_by_label,
    entity_nodes,
    node_by_id,
    node_ids,
    nodes_by_kind,
)

# ── Fixtures ─────────────────────────────────────────────────────────────────


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


ALL_ENTITIES = [alice, bob, charlie, david, eve, sports, music, art, engineer, teacher, doctor, artist, scientist]

PERSONS = [alice, bob, charlie, david, eve]
HOBBIES = [sports, music, art]
PROFESSIONS = [engineer, teacher, doctor, artist, scientist]

ENTITY_NID = ENTITY_IRI
PERSON_NID = "Person.json"
HOBBY_NID = "https://example.com/hobby_id"
PROFESSION_NID = "https://example.com/profession_id"
BIRTHDAY_NID = "https://example.com/birthday_id"


# ── 1. Entity Nodes ──────────────────────────────────────────────────────────


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 13

    def test_all_entity_iris_present(self, tool):
        ids = node_ids(tool)
        for e in ALL_ENTITIES:
            assert e["id"] in ids, f"Missing entity node for {e['name']}"

    def test_birthday_promoted_to_entity_types(self, tool):
        assert "Birthday" in tool.entity_types

    def test_birthday_not_in_entity_list(self, tool):
        for e in tool.entity_list:
            assert e.type_name != "Birthday"

    def test_entity_node_labels(self, tool):
        for e in ALL_ENTITIES:
            n = node_by_id(tool, e["id"])
            assert n is not None
            assert n["label"] == e["name"]

    def test_entity_node_colors(self, tool):
        for e in ALL_ENTITIES:
            n = node_by_id(tool, e["id"])
            assert "color" in n
            assert n["color"].startswith("#")


# ── 2. Class Nodes ───────────────────────────────────────────────────────────


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 5

    def test_exact_class_ids(self, tool):
        expected = {ENTITY_NID, PERSON_NID, HOBBY_NID, PROFESSION_NID, BIRTHDAY_NID}
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual

    def test_class_labels(self, tool):
        label_map = {
            ENTITY_NID: "Entity",
            PERSON_NID: "Person",
            HOBBY_NID: "Hobby",
            PROFESSION_NID: "Profession",
            BIRTHDAY_NID: "Birthday",
        }
        for nid, label in label_map.items():
            n = node_by_id(tool, nid)
            assert n is not None, f"Missing class node {nid}"
            assert n["label"] == label


# ── 3. IsA Edges ─────────────────────────────────────────────────────────────


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "IsA")) == 4

    def test_person_isa_entity(self, tool):
        assert (PERSON_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_hobby_isa_entity(self, tool):
        assert (HOBBY_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_profession_isa_entity(self, tool):
        assert (PROFESSION_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_birthday_isa_entity(self, tool):
        assert (BIRTHDAY_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_exact_isa_set(self, tool):
        expected = {
            (PERSON_NID, ENTITY_NID),
            (HOBBY_NID, ENTITY_NID),
            (PROFESSION_NID, ENTITY_NID),
            (BIRTHDAY_NID, ENTITY_NID),
        }
        actual = set(edges_by_label(tool, "IsA"))
        assert expected == actual


# ── 4. HasType Edges ─────────────────────────────────────────────────────────


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasType")) == 13

    def test_persons_have_type_person(self, tool):
        triples = edge_triples(tool)
        for p in PERSONS:
            assert (p["id"], PERSON_NID, "HasType") in triples, f"{p['name']} missing HasType"

    def test_hobbies_have_type_hobby(self, tool):
        triples = edge_triples(tool)
        for h in HOBBIES:
            assert (h["id"], HOBBY_NID, "HasType") in triples, f"{h['name']} missing HasType"

    def test_professions_have_type_profession(self, tool):
        triples = edge_triples(tool)
        for p in PROFESSIONS:
            assert (p["id"], PROFESSION_NID, "HasType") in triples, f"{p['name']} missing HasType"


# ── 5. Field Nodes ───────────────────────────────────────────────────────────


class TestFieldNodes:
    def test_total_field_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 12

    def test_person_own_fields(self, tool):
        expected = {"type", "hobbies", "profession", "knows", "age", "body_weight"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(f"{PERSON_NID}#field_")}
        assert expected == actual

    def test_entity_own_fields(self, tool):
        expected = {"type", "uuid", "id", "name", "initialized_from"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(f"{ENTITY_NID}#field_")}
        assert expected == actual

    def test_birthday_own_fields(self, tool):
        expected = {"date"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(f"{BIRTHDAY_NID}#field_")}
        assert expected == actual

    def test_hobby_no_own_fields(self, tool):
        hobby_fields = [n for n in nodes_by_kind(tool, "field") if n["id"].startswith(f"{HOBBY_NID}#field_")]
        assert len(hobby_fields) == 0

    def test_profession_no_own_fields(self, tool):
        prof_fields = [n for n in nodes_by_kind(tool, "field") if n["id"].startswith(f"{PROFESSION_NID}#field_")]
        assert len(prof_fields) == 0

    def test_defines_property_edges(self, tool):
        dp_edges = edges_by_label(tool, "definesProperty")
        assert len(dp_edges) == 12
        person_dp = [(f, t) for f, t in dp_edges if f == PERSON_NID]
        assert len(person_dp) == 6
        entity_dp = [(f, t) for f, t in dp_edges if f == ENTITY_NID]
        assert len(entity_dp) == 5


# ── 6. Literal Nodes ────────────────────────────────────────────────────────


class TestLiteralNodes:
    def test_literal_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 20

    def test_alice_age_literal(self, tool):
        lit_id = f"{alice['id']}#age"
        n = node_by_id(tool, lit_id)
        assert n is not None, "Missing literal node for Alice's age"
        assert n["label"] == "41"

    def test_bob_body_weight_literal(self, tool):
        lit_id = f"{bob['id']}#body_weight"
        n = node_by_id(tool, lit_id)
        assert n is not None, "Missing literal node for Bob's body_weight"
        assert n["label"] == "82.3"

    def test_charlie_age_literal(self, tool):
        lit_id = f"{charlie['id']}#age"
        n = node_by_id(tool, lit_id)
        assert n is not None
        assert n["label"] == "28"

    def test_name_literals_for_all_entities(self, tool):
        ids = node_ids(tool)
        for e in ALL_ENTITIES:
            name_lit_id = f"{e['id']}#name"
            assert name_lit_id in ids, f"Missing name literal for {e['name']}"

    def test_name_literal_labels(self, tool):
        for e in ALL_ENTITIES:
            n = node_by_id(tool, f"{e['id']}#name")
            assert n["label"] == e["name"]

    def test_age_literals_exist_for_persons_with_age(self, tool):
        persons_with_age = [alice, charlie, david, eve]
        ids = node_ids(tool)
        for p in persons_with_age:
            assert f"{p['id']}#age" in ids, f"Missing age literal for {p['name']}"

    def test_body_weight_literals_exist(self, tool):
        persons_with_bw = [bob, david, eve]
        ids = node_ids(tool)
        for p in persons_with_bw:
            assert f"{p['id']}#body_weight" in ids, f"Missing body_weight literal for {p['name']}"


# ── 7. RDF Property Edges ───────────────────────────────────────────────────


class TestRdfEdges:
    def test_alice_knows_edges(self, tool):
        triples = edge_triples(tool)
        assert (alice["id"], bob["id"], "knows") in triples
        assert (alice["id"], charlie["id"], "knows") in triples
        assert (alice["id"], eve["id"], "knows") in triples

    def test_bob_knows_edges(self, tool):
        assert (bob["id"], alice["id"], "knows") in edge_triples(tool)

    def test_charlie_knows_edges(self, tool):
        triples = edge_triples(tool)
        assert (charlie["id"], alice["id"], "knows") in triples
        assert (charlie["id"], bob["id"], "knows") in triples

    def test_david_knows_edges(self, tool):
        assert (david["id"], charlie["id"], "knows") in edge_triples(tool)

    def test_eve_knows_edges(self, tool):
        triples = edge_triples(tool)
        assert (eve["id"], david["id"], "knows") in triples
        assert (eve["id"], alice["id"], "knows") in triples
        assert (eve["id"], bob["id"], "knows") in triples

    def test_alice_hobbies_edges(self, tool):
        triples = edge_triples(tool)
        assert (alice["id"], sports["id"], "hobbies") in triples
        assert (alice["id"], music["id"], "hobbies") in triples

    def test_bob_hobbies_edges(self, tool):
        assert (bob["id"], art["id"], "hobbies") in edge_triples(tool)

    def test_alice_profession_edge(self, tool):
        assert (alice["id"], engineer["id"], "profession") in edge_triples(tool)

    def test_bob_profession_edge(self, tool):
        assert (bob["id"], artist["id"], "profession") in edge_triples(tool)

    def test_charlie_profession_edge(self, tool):
        assert (charlie["id"], teacher["id"], "profession") in edge_triples(tool)

    def test_name_edges_for_all_entities(self, tool):
        triples = edge_triples(tool)
        for e in ALL_ENTITIES:
            assert (e["id"], f"{e['id']}#name", "name") in triples, f"Missing name edge for {e['name']}"

    def test_has_age_edges(self, tool):
        triples = edge_triples(tool)
        for p in [alice, charlie, david, eve]:
            assert (p["id"], f"{p['id']}#age", "HasAge") in triples, f"Missing HasAge edge for {p['name']}"

    def test_has_body_weight_edges(self, tool):
        triples = edge_triples(tool)
        for p in [bob, david, eve]:
            assert (p["id"], f"{p['id']}#body_weight", "HasBodyWeight") in triples, (
                f"Missing HasBodyWeight edge for {p['name']}"
            )

    def test_total_rdf_edge_count(self, tool):
        class_labels = {
            "IsA",
            "HasType",
            "definesProperty",
            "HasRange",
            "default",
            "description",
            "ge",
            "le",
            "gt",
            "lt",
            "min_length",
            "max_length",
            "multiple_of",
        }
        rdf_edges = [e for e in tool._full_visjs_edges if e["label"] not in class_labels]
        assert len(rdf_edges) == 42


# ── 8. Description Nodes ────────────────────────────────────────────────────


class TestDescriptionNodes:
    def test_age_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#description")
        assert n is not None
        assert n["label"] == "Age of the person"

    def test_hobbies_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_hobbies#description")
        assert n is not None
        assert n["label"] == "Interests of the person."

    def test_body_weight_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_body_weight#description")
        assert n is not None
        assert n["label"] == "Body weight in kg"

    def test_profession_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_profession#description")
        assert n is not None
        assert n["label"] == "Profession of the person"

    def test_uuid_description(self, tool):
        n = node_by_id(tool, f"{ENTITY_NID}#field_uuid#description")
        assert n is not None
        assert n["label"] == "Unique identifier."

    def test_id_description(self, tool):
        n = node_by_id(tool, f"{ENTITY_NID}#field_id#description")
        assert n is not None
        assert "IRI" in n["label"]


# ── 9. Default Nodes ────────────────────────────────────────────────────────


class TestDefaultNodes:
    def test_person_type_default(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_type#default")
        assert n is not None
        assert n["label"] == '"ex:Person.json"'

    def test_age_default_null(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#default")
        assert n is not None
        assert n["label"] == "null"

    def test_hobbies_default_null(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_hobbies#default")
        assert n is not None
        assert n["label"] == "null"

    def test_knows_default_null(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_knows#default")
        assert n is not None
        assert n["label"] == "null"


# ── 10. Type Annotation Nodes ───────────────────────────────────────────────


class TestTypeAnnotationNodes:
    def test_age_type_integer(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#type")
        assert n is not None
        assert n["label"] == "integer"

    def test_body_weight_type_number(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_body_weight#type")
        assert n is not None
        assert n["label"] == "number"

    def test_hobbies_type_list_string(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_hobbies#type")
        assert n is not None
        assert n["label"] == "list[string]"

    def test_knows_has_range_to_person_class(self, tool):
        triples = edge_triples(tool)
        assert (f"{PERSON_NID}#field_knows", PERSON_NID, "HasRange") in triples

    def test_knows_no_type_node(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_knows#type")
        assert n is None, "knows should HasRange to Person class, not have a type node"

    def test_profession_type_string(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_profession#type")
        assert n is not None
        assert n["label"] == "string"


# ── 11. Expansion Policy ────────────────────────────────────────────────────


class TestExpansionPolicy:
    def test_visible_node_ids_not_none(self, tool):
        assert tool._visible_node_ids is not None

    def test_alice_visible(self, tool):
        assert alice["id"] in tool._visible_node_ids

    def test_alice_knows_targets_visible(self, tool):
        assert bob["id"] in tool._visible_node_ids
        assert charlie["id"] in tool._visible_node_ids
        assert eve["id"] in tool._visible_node_ids

    def test_alice_hobbies_visible(self, tool):
        assert sports["id"] in tool._visible_node_ids
        assert music["id"] in tool._visible_node_ids

    def test_full_gt_visible_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)

    def test_full_gte_visible_edges(self, tool):
        assert len(tool._full_visjs_edges) >= len(tool.visjs_edges)
