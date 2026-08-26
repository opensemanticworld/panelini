"""Verify all expected nodes and edges for the JSON recipe example."""

import pytest

from examples.panels.oold_graph.recipy_json import (
    ENTITY_IRI,
    config,
    my_cake_doc,
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

ENTITY_NID = ENTITY_IRI
RECIPY_NID = "https://example.com/Recipy"
INGREDIENT_NID = "https://example.com/IngredientContent"


# =====================================================================
# 1. Entity nodes
# =====================================================================


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 1

    def test_cake_entity_present(self, tool):
        assert my_cake_doc["id"] in node_ids(tool)

    def test_embedded_ingredients_not_entities(self, tool):
        ent_iris = {e.get_iri() for e in tool.entity_list}
        for ing in my_cake_doc["ingredients"]:
            assert ing["id"] not in ent_iris

    def test_cake_entity_type(self, tool):
        assert tool.entity_list[0].type_name == "CookingProcessDocumentation"


# =====================================================================
# 2. Class nodes
# =====================================================================


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 3

    def test_class_node_ids(self, tool):
        expected = {ENTITY_NID, RECIPY_NID, INGREDIENT_NID}
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual

    def test_class_labels(self, tool):
        labels = {n["label"] for n in nodes_by_kind(tool, "class")}
        assert labels == {"Entity", "CookingProcessDocumentation", "IngredientContent"}


# =====================================================================
# 3. IsA edges
# =====================================================================


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "IsA")) == 2

    def test_recipy_isa_entity(self, tool):
        assert (RECIPY_NID, ENTITY_NID, "IsA") in edge_triples(tool)

    def test_ingredient_isa_entity(self, tool):
        assert (INGREDIENT_NID, ENTITY_NID, "IsA") in edge_triples(tool)


# =====================================================================
# 4. HasType edges
# =====================================================================


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasType")) == 1

    def test_cake_has_type_recipy(self, tool):
        assert (my_cake_doc["id"], RECIPY_NID, "HasType") in edge_triples(tool)


# =====================================================================
# 5. Field nodes
# =====================================================================


class TestFieldNodes:
    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 10

    def test_entity_own_fields(self, tool):
        expected = {
            f"{ENTITY_NID}#field_type",
            f"{ENTITY_NID}#field_uuid",
            f"{ENTITY_NID}#field_id",
            f"{ENTITY_NID}#field_name",
            f"{ENTITY_NID}#field_initialized_from",
        }
        actual = {n["id"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(ENTITY_NID)}
        assert expected == actual

    def test_recipy_own_fields(self, tool):
        expected = {
            f"{RECIPY_NID}#field_type",
            f"{RECIPY_NID}#field_ingredients",
        }
        actual = {n["id"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(RECIPY_NID)}
        assert expected == actual

    def test_ingredient_own_fields(self, tool):
        expected = {
            f"{INGREDIENT_NID}#field_type",
            f"{INGREDIENT_NID}#field_planned_mass_grams",
            f"{INGREDIENT_NID}#field_actual_mass_grams",
        }
        actual = {n["id"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(INGREDIENT_NID)}
        assert expected == actual

    def test_defines_property_count(self, tool):
        assert len(edges_by_label(tool, "definesProperty")) == 10


# =====================================================================
# 6. Ingredients HasRange
# =====================================================================


class TestIngredientHasRange:
    def test_ingredients_has_range_to_ingredient_class(self, tool):
        assert (f"{RECIPY_NID}#field_ingredients", INGREDIENT_NID, "HasRange") in edge_triples(tool)

    def test_has_range_count(self, tool):
        assert len(edges_by_label(tool, "HasRange")) == 10


# =====================================================================
# 7. Type annotation nodes
# =====================================================================


class TestTypeNodes:
    def test_type_node_count(self, tool):
        assert len(nodes_by_kind(tool, "type")) == 9

    def test_planned_mass_type(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_planned_mass_grams#type")
        assert n is not None
        assert n["label"] == "number"

    def test_actual_mass_type(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_actual_mass_grams#type")
        assert n is not None
        assert n["label"] == "number"

    def test_recipy_type_field_type(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_type#type")
        assert n is not None
        assert n["label"] == "string"


# =====================================================================
# 8. Default nodes
# =====================================================================


class TestDefaultNodes:
    def test_default_node_count(self, tool):
        assert len(nodes_by_kind(tool, "default")) == 5

    def test_ingredients_default_empty_list(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_ingredients#default")
        assert n is not None
        assert n["label"] == "[]"

    def test_recipy_type_default(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_type#default")
        assert n is not None
        assert n["label"] == '"https://example.com/Recipy"'

    def test_ingredient_type_default(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_type#default")
        assert n is not None
        assert n["label"] == '"https://example.com/IngredientContent"'

    def test_planned_mass_default_null(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_planned_mass_grams#default")
        assert n is not None
        assert n["label"] == "null"

    def test_actual_mass_default_null(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_actual_mass_grams#default")
        assert n is not None
        assert n["label"] == "null"


# =====================================================================
# 9. Description nodes
# =====================================================================


class TestDescriptionNodes:
    def test_description_node_count(self, tool):
        assert len(nodes_by_kind(tool, "description")) == 5

    def test_ingredients_description(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_ingredients#description")
        assert n is not None
        assert n["label"] == "The ingredients list"

    def test_planned_mass_description(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_planned_mass_grams#description")
        assert n is not None
        assert "planned mass" in n["label"].lower()

    def test_actual_mass_description(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_actual_mass_grams#description")
        assert n is not None
        assert "actual mass" in n["label"].lower()

    def test_uuid_description(self, tool):
        n = node_by_id(tool, f"{ENTITY_NID}#field_uuid#description")
        assert n is not None
        assert n["label"] == "Unique identifier."


# =====================================================================
# 10. Literal nodes (RDF)
# =====================================================================


class TestLiteralNodes:
    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 1

    def test_cake_name_literal(self, tool):
        n = node_by_id(tool, f"{my_cake_doc['id']}#name")
        assert n is not None
        assert n["label"] == "My cake recipe"
        assert n["node_kind"] == "literal"


# =====================================================================
# 11. Embedded sub-objects
# =====================================================================


class TestEmbeddedSubObjects:
    def test_ingredients_accessible(self, tool):
        ingredients = tool.entity_list[0].get("ingredients")
        assert isinstance(ingredients, list)
        assert len(ingredients) == 3

    def test_ingredient_names(self, tool):
        names = {i["name"] for i in tool.entity_list[0].get("ingredients")}
        assert names == {"sugar", "flour", "nuts"}

    def test_expandable_subobject_fields(self, tool):
        cake_iri = tool.entity_list[0].get_iri()
        fields = tool._get_expandable_subobject_fields(cake_iri)
        assert "ingredients" in fields


# =====================================================================
# 12. Expansion policy
# =====================================================================


class TestExpansionPolicy:
    def test_expansion_policy_active(self, tool):
        assert tool._visible_node_ids is not None

    def test_visible_count(self, tool):
        assert len(tool._visible_node_ids) == 4

    def test_entity_class_visible(self, tool):
        assert ENTITY_NID in tool._visible_node_ids

    def test_recipy_class_visible(self, tool):
        assert RECIPY_NID in tool._visible_node_ids

    def test_ingredient_class_visible(self, tool):
        assert INGREDIENT_NID in tool._visible_node_ids

    def test_cake_instance_visible(self, tool):
        assert my_cake_doc["id"] in tool._visible_node_ids

    def test_full_has_more_nodes(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)


# =====================================================================
# 13. Total node/edge counts
# =====================================================================


class TestTotalCounts:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 34

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 34
