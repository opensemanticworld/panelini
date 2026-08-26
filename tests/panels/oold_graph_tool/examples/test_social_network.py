"""Verify all expected nodes and edges for the pydantic social network example."""

import pytest

from examples.panels.oold_graph.social_network import (
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


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


# ── Derived IDs ──────────────────────────────────────────────────────────────

ENTITY_NID = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"
PERSON_NID = "Person.json"
HOBBY_NID = "https://example.com/hobby_id"
PROFESSION_NID = "https://example.com/profession_id"
BIRTHDAY_NID = "https://example.com/birthday_id"
LBM_NID = "class:LinkedBaseModel"


ALL_ENTITIES = [alice, bob, charlie, david, eve, sports, music, art, engineer, teacher, doctor, artist, scientist]


# =====================================================================
# 1. Entity nodes
# =====================================================================


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 13

    def test_all_entities_present(self, tool):
        ids = node_ids(tool)
        for entity in ALL_ENTITIES:
            assert entity.get_iri() in ids, f"Missing entity: {entity.name}"

    def test_entity_labels(self, tool):
        labels = {n["label"] for n in entity_nodes(tool)}
        expected_names = {
            "Alice",
            "Bob",
            "Charlie",
            "David",
            "Eve",
            "Sports",
            "Music",
            "Art",
            "Engineer",
            "Teacher",
            "Doctor",
            "Artist",
            "Scientist",
        }
        assert expected_names == labels


# =====================================================================
# 2. Class nodes (pydantic adds LinkedBaseModel)
# =====================================================================


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 6

    def test_class_node_ids(self, tool):
        expected = {ENTITY_NID, PERSON_NID, HOBBY_NID, PROFESSION_NID, BIRTHDAY_NID, LBM_NID}
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual

    def test_class_labels(self, tool):
        labels = {n["label"] for n in nodes_by_kind(tool, "class")}
        for name in ["Entity", "Person", "Hobby", "Profession", "Birthday", "LinkedBaseModel"]:
            assert name in labels


# =====================================================================
# 3. IsA edges
# =====================================================================


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "IsA")) == 5

    def test_person_isa_entity(self, tool):
        assert (PERSON_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_hobby_isa_entity(self, tool):
        assert (HOBBY_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_profession_isa_entity(self, tool):
        assert (PROFESSION_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_birthday_isa_entity(self, tool):
        assert (BIRTHDAY_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_entity_isa_linked_base_model(self, tool):
        assert (ENTITY_NID, LBM_NID, "IsA") in edge_triples(tool)


# =====================================================================
# 4. HasType edges
# =====================================================================


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasType")) == 13

    def test_persons_have_type_person(self, tool):
        triples = edge_triples(tool)
        for p in [alice, bob, charlie, david, eve]:
            assert (p.get_iri(), PERSON_NID, "HasType") in triples

    def test_hobbies_have_type_hobby(self, tool):
        triples = edge_triples(tool)
        for h in [sports, music, art]:
            assert (h.get_iri(), HOBBY_NID, "HasType") in triples

    def test_professions_have_type_profession(self, tool):
        triples = edge_triples(tool)
        for p in [engineer, teacher, doctor, artist, scientist]:
            assert (p.get_iri(), PROFESSION_NID, "HasType") in triples


# =====================================================================
# 5. Field nodes (pydantic exports all inherited fields per class)
# =====================================================================


class TestFieldNodes:
    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 30

    def test_person_fields(self, tool):
        person_fields = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(PERSON_NID)}
        assert {
            "knows",
            "id",
            "body_weight",
            "hobbies",
            "type",
            "profession",
            "name",
            "initialized_from",
            "age",
            "uuid",
        } == person_fields

    def test_hobby_has_inherited_fields(self, tool):
        hobby_fields = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(HOBBY_NID)}
        assert "type" in hobby_fields
        assert "name" in hobby_fields
        assert "uuid" in hobby_fields

    def test_defines_property_count(self, tool):
        assert len(edges_by_label(tool, "definesProperty")) == 30


# =====================================================================
# 6. RDF property edges: knows
# =====================================================================


class TestKnowsEdges:
    def test_knows_edge_count(self, tool):
        assert len(edges_by_label(tool, "knows")) == 10

    def test_alice_knows(self, tool):
        triples = edge_triples(tool)
        assert (alice.get_iri(), bob.get_iri(), "knows") in triples
        assert (alice.get_iri(), charlie.get_iri(), "knows") in triples
        assert (alice.get_iri(), eve.get_iri(), "knows") in triples

    def test_bob_knows_alice(self, tool):
        assert (bob.get_iri(), alice.get_iri(), "knows") in edge_triples(tool)

    def test_charlie_knows(self, tool):
        triples = edge_triples(tool)
        assert (charlie.get_iri(), alice.get_iri(), "knows") in triples
        assert (charlie.get_iri(), bob.get_iri(), "knows") in triples

    def test_david_knows_charlie(self, tool):
        assert (david.get_iri(), charlie.get_iri(), "knows") in edge_triples(tool)

    def test_eve_knows(self, tool):
        triples = edge_triples(tool)
        assert (eve.get_iri(), david.get_iri(), "knows") in triples
        assert (eve.get_iri(), alice.get_iri(), "knows") in triples
        assert (eve.get_iri(), bob.get_iri(), "knows") in triples


# =====================================================================
# 7. RDF property edges: hobbies
# =====================================================================


class TestHobbiesEdges:
    def test_hobbies_edge_count(self, tool):
        assert len(edges_by_label(tool, "hobbies")) == 7

    def test_alice_hobbies(self, tool):
        triples = edge_triples(tool)
        assert (alice.get_iri(), sports.get_iri(), "hobbies") in triples
        assert (alice.get_iri(), music.get_iri(), "hobbies") in triples

    def test_bob_hobbies(self, tool):
        assert (bob.get_iri(), art.get_iri(), "hobbies") in edge_triples(tool)

    def test_eve_hobbies(self, tool):
        triples = edge_triples(tool)
        assert (eve.get_iri(), art.get_iri(), "hobbies") in triples
        assert (eve.get_iri(), music.get_iri(), "hobbies") in triples


# =====================================================================
# 8. RDF property edges: profession
# =====================================================================


class TestProfessionEdges:
    def test_profession_edge_count(self, tool):
        assert len(edges_by_label(tool, "profession")) == 5

    def test_alice_profession(self, tool):
        assert (alice.get_iri(), engineer.get_iri(), "profession") in edge_triples(tool)

    def test_bob_profession(self, tool):
        assert (bob.get_iri(), artist.get_iri(), "profession") in edge_triples(tool)


# =====================================================================
# 9. Literal nodes
# =====================================================================


class TestLiteralNodes:
    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 20

    def test_name_literals_for_all_entities(self, tool):
        for entity in ALL_ENTITIES:
            n = node_by_id(tool, f"{entity.get_iri()}#name")
            assert n is not None, f"Missing name literal for {entity.name}"
            assert n["label"] == entity.name

    def test_age_literals(self, tool):
        n = node_by_id(tool, f"{alice.get_iri()}#age")
        assert n is not None
        assert n["label"] == "41"

    def test_body_weight_literals(self, tool):
        n = node_by_id(tool, f"{bob.get_iri()}#body_weight")
        assert n is not None
        assert n["label"] == "82.3"

    def test_has_age_edge_count(self, tool):
        assert len(edges_by_label(tool, "HasAge")) == 4

    def test_has_body_weight_edge_count(self, tool):
        assert len(edges_by_label(tool, "HasBodyWeight")) == 3

    def test_name_edge_count(self, tool):
        assert len(edges_by_label(tool, "name")) == 13


# =====================================================================
# 10. Type annotation nodes
# =====================================================================


class TestTypeNodes:
    def test_type_node_count(self, tool):
        assert len(nodes_by_kind(tool, "type")) == 30

    def test_age_type_integer(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#type")
        assert n is not None
        assert n["label"] == "integer"

    def test_body_weight_type_number(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_body_weight#type")
        assert n is not None
        assert n["label"] == "number"

    def test_knows_type(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_knows#type")
        assert n is not None


# =====================================================================
# 11. Default nodes
# =====================================================================


class TestDefaultNodes:
    def test_default_node_count(self, tool):
        assert len(nodes_by_kind(tool, "default")) == 20

    def test_person_type_default(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_type#default")
        assert n is not None
        assert n["label"] == '"ex:Person.json"'

    def test_age_default_null(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#default")
        assert n is not None
        assert n["label"] == "null"


# =====================================================================
# 12. Description nodes
# =====================================================================


class TestDescriptionNodes:
    def test_description_node_count(self, tool):
        assert len(nodes_by_kind(tool, "description")) == 18

    def test_age_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_age#description")
        assert n is not None
        assert n["label"] == "Age of the person"

    def test_body_weight_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_body_weight#description")
        assert n is not None
        assert n["label"] == "Body weight in kg"

    def test_profession_description(self, tool):
        n = node_by_id(tool, f"{PERSON_NID}#field_profession#description")
        assert n is not None
        assert n["label"] == "Profession of the person"


# =====================================================================
# 13. Expansion policy (root=alice, relations=knows,hobbies)
# =====================================================================


class TestExpansionPolicy:
    def test_expansion_policy_active(self, tool):
        assert tool._visible_node_ids is not None

    def test_visible_count(self, tool):
        assert len(tool._visible_node_ids) == 8

    def test_alice_visible(self, tool):
        assert alice.get_iri() in tool._visible_node_ids

    def test_all_persons_visible(self, tool):
        for p in [alice, bob, charlie, david, eve]:
            assert p.get_iri() in tool._visible_node_ids

    def test_hobbies_reachable(self, tool):
        assert sports.get_iri() in tool._visible_node_ids
        assert music.get_iri() in tool._visible_node_ids

    def test_full_has_more_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)


# =====================================================================
# 14. Total node/edge counts
# =====================================================================


class TestTotalCounts:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 137

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 158
