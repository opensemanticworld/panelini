"""Verify all expected nodes/edges for the physics ontology JSON example."""

import pytest

from examples.panels.oold_graph.physics_ontology_json import (
    ENTITY_IRI,
    a_circle,
    block,
    block_obj,
    block_pat,
    config,
    disk_inertia,
    disk_obj,
    unit_circle,
    unit_rect,
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

# Schema $id shortcuts
ENTITY_NID = ENTITY_IRI
GEOMETRY_NID = "https://example.com/geometry"
CIRCLE_NID = "https://example.com/circle"
RECTANGLE_NID = "https://example.com/rectangle"
PHYSICAL_OBJECT_NID = "https://example.com/physical_object"
MOMENT_OF_INERTIA_NID = "https://example.com/moment_of_inertia"
PAT_NID = "https://example.com/parallel_axis_theorem"

ALL_ENTITIES = [unit_circle, unit_rect, a_circle, block, disk_obj, block_obj, disk_inertia, block_pat]


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


# =====================================================================
# 1. Entity nodes
# =====================================================================


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 8

    def test_all_entity_iris_present(self, tool):
        ids = node_ids(tool)
        for entity in ALL_ENTITIES:
            assert entity["id"] in ids, f"Missing entity node: {entity['name']}"

    def test_entity_labels(self, tool):
        for entity in ALL_ENTITIES:
            n = node_by_id(tool, entity["id"])
            assert n is not None
            assert n["label"] == entity["name"]


# =====================================================================
# 2. Class nodes
# =====================================================================


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 7

    def test_exact_class_node_ids(self, tool):
        expected = {
            ENTITY_NID,
            GEOMETRY_NID,
            CIRCLE_NID,
            RECTANGLE_NID,
            PHYSICAL_OBJECT_NID,
            MOMENT_OF_INERTIA_NID,
            PAT_NID,
        }
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual

    def test_class_node_labels(self, tool):
        expected_labels = {
            ENTITY_NID: "Entity",
            GEOMETRY_NID: "Geometry",
            CIRCLE_NID: "Circle",
            RECTANGLE_NID: "Rectangle",
            PHYSICAL_OBJECT_NID: "PhysicalObject",
            MOMENT_OF_INERTIA_NID: "MomentOfInertia",
            PAT_NID: "ParallelAxisTheorem",
        }
        for nid, label in expected_labels.items():
            n = node_by_id(tool, nid)
            assert n is not None, f"Missing class node: {nid}"
            assert n["label"] == label


# =====================================================================
# 3. IsA edges
# =====================================================================


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "ExtendsSchema")) == 6

    def test_circle_isa_geometry(self, tool):
        assert (CIRCLE_NID, GEOMETRY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_rectangle_isa_geometry(self, tool):
        assert (RECTANGLE_NID, GEOMETRY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_geometry_isa_entity(self, tool):
        assert (GEOMETRY_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_physical_object_isa_entity(self, tool):
        assert (PHYSICAL_OBJECT_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_moment_of_inertia_isa_entity(self, tool):
        assert (MOMENT_OF_INERTIA_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_parallel_axis_theorem_isa_entity(self, tool):
        assert (PAT_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)


# =====================================================================
# 4. HasType edges
# =====================================================================


class TestHasTypeEdges:
    def test_has_type_edge_count(self, tool):
        assert len(edges_by_label(tool, "HasSchemaType")) == 8

    def test_unit_circle_has_type_circle(self, tool):
        assert (unit_circle["id"], CIRCLE_NID, "HasSchemaType") in edge_triples(tool)

    def test_unit_rect_has_type_rectangle(self, tool):
        assert (unit_rect["id"], RECTANGLE_NID, "HasSchemaType") in edge_triples(tool)

    def test_a_circle_has_type_circle(self, tool):
        assert (a_circle["id"], CIRCLE_NID, "HasSchemaType") in edge_triples(tool)

    def test_block_has_type_rectangle(self, tool):
        assert (block["id"], RECTANGLE_NID, "HasSchemaType") in edge_triples(tool)

    def test_disk_obj_has_type_physical_object(self, tool):
        assert (disk_obj["id"], PHYSICAL_OBJECT_NID, "HasSchemaType") in edge_triples(tool)

    def test_block_obj_has_type_physical_object(self, tool):
        assert (block_obj["id"], PHYSICAL_OBJECT_NID, "HasSchemaType") in edge_triples(tool)

    def test_disk_inertia_has_type_moi(self, tool):
        assert (disk_inertia["id"], MOMENT_OF_INERTIA_NID, "HasSchemaType") in edge_triples(tool)

    def test_block_pat_has_type_pat(self, tool):
        assert (block_pat["id"], PAT_NID, "HasSchemaType") in edge_triples(tool)


# =====================================================================
# 5. Field nodes
# =====================================================================


class TestFieldNodes:
    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 20

    def test_entity_own_fields(self, tool):
        expected = {"type", "uuid", "id", "name", "initialized_from"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(ENTITY_NID + "#field_")}
        assert expected == actual

    def test_geometry_own_fields(self, tool):
        expected = {"type", "dimensions"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(GEOMETRY_NID + "#field_")}
        assert expected == actual

    def test_circle_own_fields(self, tool):
        expected = {"type", "radius"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(CIRCLE_NID + "#field_")}
        assert expected == actual

    def test_circle_does_not_have_dimensions_field(self, tool):
        assert node_by_id(tool, f"{CIRCLE_NID}#field_dimensions") is None

    def test_rectangle_own_fields(self, tool):
        expected = {"type", "width", "height"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(RECTANGLE_NID + "#field_")}
        assert expected == actual

    def test_physical_object_own_fields(self, tool):
        expected = {"type", "mass"}
        actual = {
            n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(PHYSICAL_OBJECT_NID + "#field_")
        }
        assert expected == actual

    def test_moment_of_inertia_own_fields(self, tool):
        expected = {"type", "formula", "geometry"}
        actual = {
            n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(MOMENT_OF_INERTIA_NID + "#field_")
        }
        assert expected == actual

    def test_parallel_axis_theorem_own_fields(self, tool):
        expected = {"type", "object_name", "distance"}
        actual = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(PAT_NID + "#field_")}
        assert expected == actual

    def test_defines_property_edge_count(self, tool):
        assert len(edges_by_label(tool, "definesProperty")) == 20

    def test_has_range_edge_count(self, tool):
        assert len(edges_by_label(tool, "HasRange")) == 20


# =====================================================================
# 6. Constraint nodes
# =====================================================================


class TestConstraintNodes:
    def test_constraint_node_count(self, tool):
        assert len(nodes_by_kind(tool, "constraint")) == 5

    def test_radius_minimum(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#constraint_ge")
        assert n is not None
        assert n["label"] == "0"

    def test_width_minimum(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#constraint_ge")
        assert n is not None
        assert n["label"] == "0"

    def test_height_minimum(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_height#constraint_ge")
        assert n is not None
        assert n["label"] == "0"

    def test_mass_minimum(self, tool):
        n = node_by_id(tool, f"{PHYSICAL_OBJECT_NID}#field_mass#constraint_ge")
        assert n is not None
        assert n["label"] == "0"

    def test_distance_minimum(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#constraint_ge")
        assert n is not None
        assert n["label"] == "0"


# =====================================================================
# 7. Default nodes
# =====================================================================


class TestDefaultNodes:
    def test_default_node_count(self, tool):
        assert len(nodes_by_kind(tool, "default")) == 15

    def test_radius_default(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_width_default(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_height_default(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_height#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_mass_default(self, tool):
        n = node_by_id(tool, f"{PHYSICAL_OBJECT_NID}#field_mass#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_dimensions_default(self, tool):
        n = node_by_id(tool, f"{GEOMETRY_NID}#field_dimensions#default")
        assert n is not None
        assert n["label"] == "2"

    def test_distance_default(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#default")
        assert n is not None
        assert n["label"] == "0.0"

    def test_formula_default(self, tool):
        n = node_by_id(tool, f"{MOMENT_OF_INERTIA_NID}#field_formula#default")
        assert n is not None
        assert n["label"] == '""'


# =====================================================================
# 8. Description nodes
# =====================================================================


class TestDescriptionNodes:
    def test_description_node_count(self, tool):
        assert len(nodes_by_kind(tool, "description")) == 11

    def test_radius_description(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#description")
        assert n is not None
        assert n["label"] == "Radius in metres"

    def test_width_description(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#description")
        assert n is not None
        assert n["label"] == "Width in metres"

    def test_height_description(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_height#description")
        assert n is not None
        assert n["label"] == "Height in metres"

    def test_mass_description(self, tool):
        n = node_by_id(tool, f"{PHYSICAL_OBJECT_NID}#field_mass#description")
        assert n is not None
        assert n["label"] == "Mass in kilograms"

    def test_dimensions_description(self, tool):
        n = node_by_id(tool, f"{GEOMETRY_NID}#field_dimensions#description")
        assert n is not None
        assert n["label"] == "Number of spatial dimensions"

    def test_formula_description(self, tool):
        n = node_by_id(tool, f"{MOMENT_OF_INERTIA_NID}#field_formula#description")
        assert n is not None
        assert n["label"] == "Mathematical formula, e.g. I = m*r^2/2"

    def test_distance_description(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#description")
        assert n is not None
        assert n["label"] == "Distance between parallel axes in metres"

    def test_uuid_description(self, tool):
        n = node_by_id(tool, f"{ENTITY_NID}#field_uuid#description")
        assert n is not None
        assert n["label"] == "Unique identifier."

    def test_id_description(self, tool):
        n = node_by_id(tool, f"{ENTITY_NID}#field_id#description")
        assert n is not None
        assert n["label"] == "IRI of the entity, derived from uuid."


# =====================================================================
# 9. Type annotation nodes
# =====================================================================


class TestTypeNodes:
    def test_type_node_count(self, tool):
        assert len(nodes_by_kind(tool, "type")) == 20

    def test_radius_type(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#type")
        assert n is not None
        assert n["label"] == "number"

    def test_dimensions_type(self, tool):
        n = node_by_id(tool, f"{GEOMETRY_NID}#field_dimensions#type")
        assert n is not None
        assert n["label"] == "integer"

    def test_mass_type(self, tool):
        n = node_by_id(tool, f"{PHYSICAL_OBJECT_NID}#field_mass#type")
        assert n is not None
        assert n["label"] == "number"

    def test_distance_type(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#type")
        assert n is not None
        assert n["label"] == "number"

    def test_formula_type(self, tool):
        n = node_by_id(tool, f"{MOMENT_OF_INERTIA_NID}#field_formula#type")
        assert n is not None
        assert n["label"] == "string"


# =====================================================================
# 10. Literal nodes
# =====================================================================


class TestLiteralNodes:
    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 22

    def test_unit_circle_name_literal(self, tool):
        n = node_by_id(tool, f"{unit_circle['id']}#name")
        assert n is not None
        assert n["label"] == "Unit Circle"

    def test_unit_circle_radius_literal(self, tool):
        nid = f"{unit_circle['id']}#literal_hasRadius"
        n = node_by_id(tool, nid)
        if n is None:
            nid = f"{unit_circle['id']}#radius"
            n = node_by_id(tool, nid)
        assert n is not None
        assert n["label"] in ("1.0", "1")

    def test_disk_mass_literal(self, tool):
        nid = f"{disk_obj['id']}#literal_hasMass"
        n = node_by_id(tool, nid)
        if n is None:
            nid = f"{disk_obj['id']}#mass"
            n = node_by_id(tool, nid)
        assert n is not None
        assert n["label"] == "2.5"


# =====================================================================
# 11. Expansion policy
# =====================================================================


class TestExpansionPolicy:
    def test_visible_node_ids_set(self, tool):
        assert tool._visible_node_ids is not None

    def test_entity_class_root_visible(self, tool):
        assert ENTITY_NID in tool._visible_node_ids

    def test_full_vs_visible_count(self, tool):
        assert len(tool._full_visjs_nodes) > len(tool.visjs_nodes)

    def test_all_class_nodes_visible(self, tool):
        for nid in [
            ENTITY_NID,
            GEOMETRY_NID,
            CIRCLE_NID,
            RECTANGLE_NID,
            PHYSICAL_OBJECT_NID,
            MOMENT_OF_INERTIA_NID,
            PAT_NID,
        ]:
            assert nid in tool._visible_node_ids, f"Class {nid} not visible"

    def test_all_entity_instances_visible(self, tool):
        for entity in ALL_ENTITIES:
            assert entity["id"] in tool._visible_node_ids, f"Entity {entity['name']} not visible"
