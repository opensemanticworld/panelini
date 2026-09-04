"""Verify all expected nodes and edges for the pydantic recipe example."""

import pytest

from examples.panels.oold_graph.recipy import (
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

ENTITY_NID = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"
RECIPY_NID = "https://example.com/Recipy"
INGREDIENT_NID = "https://example.com/IngredientContent"
LBM_NID = "class:LinkedBaseModel"


# =====================================================================
# 1. Entity nodes
# =====================================================================


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 1

    def test_cake_entity_present(self, tool):
        cake_iri = my_cake_doc.get_iri()
        assert cake_iri in node_ids(tool)

    def test_embedded_ingredients_not_entities(self, tool):
        ent_iris = {e.get_iri() for e in tool.entity_list}
        for ing in my_cake_doc.ingredients:
            assert ing.get_iri() not in ent_iris

    def test_cake_entity_type(self, tool):
        assert tool.entity_list[0].type_name == "CookingProcessDocumentation"


# =====================================================================
# 2. Class nodes (pydantic adds LinkedBaseModel)
# =====================================================================


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 4

    def test_class_node_ids(self, tool):
        expected = {ENTITY_NID, RECIPY_NID, INGREDIENT_NID, LBM_NID}
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual

    def test_class_labels(self, tool):
        labels = {n["label"] for n in nodes_by_kind(tool, "class")}
        assert "Entity" in labels
        assert "CookingProcessDocumentation" in labels
        assert "IngredientContent" in labels
        assert "LinkedBaseModel" in labels


# =====================================================================
# 3. IsA edges
# =====================================================================


class TestIsAEdges:
    def test_recipy_isa_entity(self, tool):
        assert (RECIPY_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_ingredient_isa_entity(self, tool):
        assert (INGREDIENT_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_entity_isa_linked_base_model(self, tool):
        assert (ENTITY_NID, LBM_NID, "ExtendsSchema") in edge_triples(tool)

    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "ExtendsSchema")) == 3


# =====================================================================
# 4. HasType edges
# =====================================================================


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasSchemaType")) == 1

    def test_cake_has_type_recipy(self, tool):
        cake_iri = my_cake_doc.get_iri()
        assert (cake_iri, RECIPY_NID, "HasSchemaType") in edge_triples(tool)


# =====================================================================
# 5. Field nodes (pydantic includes inherited fields per class)
# =====================================================================


class TestFieldNodes:
    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 18

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

    def test_recipy_fields_include_inherited(self, tool):
        recipy_fields = {n["id"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(RECIPY_NID)}
        assert f"{RECIPY_NID}#field_ingredients" in recipy_fields
        assert f"{RECIPY_NID}#field_type" in recipy_fields
        assert f"{RECIPY_NID}#field_uuid" in recipy_fields
        assert f"{RECIPY_NID}#field_name" in recipy_fields
        assert f"{RECIPY_NID}#field_id" in recipy_fields
        assert f"{RECIPY_NID}#field_initialized_from" in recipy_fields

    def test_ingredient_fields_include_inherited(self, tool):
        ing_fields = {n["id"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(INGREDIENT_NID)}
        assert f"{INGREDIENT_NID}#field_planned_mass_grams" in ing_fields
        assert f"{INGREDIENT_NID}#field_actual_mass_grams" in ing_fields
        assert f"{INGREDIENT_NID}#field_type" in ing_fields
        assert f"{INGREDIENT_NID}#field_uuid" in ing_fields

    def test_defines_property_count(self, tool):
        assert len(edges_by_label(tool, "definesProperty")) == 18


# =====================================================================
# 6. Type annotation nodes
# =====================================================================


class TestTypeNodes:
    def test_type_node_count(self, tool):
        assert len(nodes_by_kind(tool, "type")) == 18

    def test_planned_mass_type(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_planned_mass_grams#type")
        assert n is not None
        assert n["label"] == "number"

    def test_ingredients_type(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_ingredients#type")
        assert n is not None


# =====================================================================
# 7. Default nodes
# =====================================================================


class TestDefaultNodes:
    def test_default_node_count(self, tool):
        assert len(nodes_by_kind(tool, "default")) == 12

    def test_ingredients_default_empty_list(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_ingredients#default")
        assert n is not None
        assert n["label"] == "[]"

    def test_recipy_type_default(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_type#default")
        assert n is not None
        assert n["label"] == '"https://example.com/Recipy"'


# =====================================================================
# 8. Description nodes
# =====================================================================


class TestDescriptionNodes:
    def test_description_node_count(self, tool):
        assert len(nodes_by_kind(tool, "description")) == 12

    def test_ingredients_description(self, tool):
        n = node_by_id(tool, f"{RECIPY_NID}#field_ingredients#description")
        assert n is not None
        assert n["label"] == "The ingredients list"

    def test_planned_mass_description(self, tool):
        n = node_by_id(tool, f"{INGREDIENT_NID}#field_planned_mass_grams#description")
        assert n is not None
        assert "planned mass" in n["label"].lower()


# =====================================================================
# 9. Literal nodes (RDF)
# =====================================================================


class TestLiteralNodes:
    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 1

    def test_cake_name_literal(self, tool):
        cake_iri = my_cake_doc.get_iri()
        n = node_by_id(tool, f"{cake_iri}#name")
        assert n is not None
        assert n["label"] == "My cake recipe"


# =====================================================================
# 10. Embedded sub-objects
# =====================================================================


class TestEmbeddedSubObjects:
    def test_ingredients_accessible(self, tool):
        ingredients = tool.entity_list[0].get("ingredients")
        assert isinstance(ingredients, list)
        assert len(ingredients) == 3

    def test_expandable_subobject_fields_empty(self, tool):
        """Ingredients are embedded but not individually tracked as entities,
        so they do not appear as expandable subobject fields."""
        cake_iri = tool.entity_list[0].get_iri()
        fields = tool._get_expandable_subobject_fields(cake_iri)
        assert fields == []


# =====================================================================
# 11. Expansion policy
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
        cake_iri = my_cake_doc.get_iri()
        assert cake_iri in tool._visible_node_ids


# =====================================================================
# 12. Total node/edge counts
# =====================================================================


class TestTotalCounts:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 66

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 66
