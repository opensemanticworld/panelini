"""Verify all expected nodes and edges for the pydantic physics ontology example."""

import pytest

from examples.panels.oold_graph.physics_ontology import (
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


@pytest.fixture(scope="module")
def tool():
    return OOLDGraphDetailTool(config=config)


# ── Derived IDs ──────────────────────────────────────────────────────────────

ENTITY_NID = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"
GEOMETRY_NID = "https://example.com/geometry"
CIRCLE_NID = "https://example.com/circle"
RECTANGLE_NID = "https://example.com/rectangle"
PHYS_OBJ_NID = "https://example.com/physical_object"
MOI_NID = "https://example.com/moment_of_inertia"
PAT_NID = "https://example.com/parallel_axis_theorem"
LBM_NID = "class:LinkedBaseModel"

ALL_ENTITIES = [unit_circle, unit_rect, a_circle, block, disk_obj, block_obj, disk_inertia, block_pat]


# =====================================================================
# 1. Entity nodes
# =====================================================================


class TestEntityNodes:
    def test_entity_count(self, tool):
        assert len(entity_nodes(tool)) == 8

    def test_all_entities_present(self, tool):
        ids = node_ids(tool)
        for entity in ALL_ENTITIES:
            assert entity.get_iri() in ids, f"Missing entity: {entity.name}"

    def test_entity_labels(self, tool):
        labels = {n["label"] for n in entity_nodes(tool)}
        expected = {
            "Unit Circle",
            "Unit Rectangle",
            "Disk (r=0.3)",
            "Block (0.4x0.2)",
            "Disk",
            "Block",
            "Disk Inertia",
            "Block PAT",
        }
        assert expected == labels


# =====================================================================
# 2. Class nodes (pydantic adds LinkedBaseModel)
# =====================================================================


class TestClassNodes:
    def test_class_node_count(self, tool):
        assert len(nodes_by_kind(tool, "class")) == 8

    def test_class_node_ids(self, tool):
        expected = {ENTITY_NID, GEOMETRY_NID, CIRCLE_NID, RECTANGLE_NID, PHYS_OBJ_NID, MOI_NID, PAT_NID, LBM_NID}
        actual = {n["id"] for n in nodes_by_kind(tool, "class")}
        assert expected == actual


# =====================================================================
# 3. IsA edges
# =====================================================================


class TestIsAEdges:
    def test_isa_edge_count(self, tool):
        assert len(edges_by_label(tool, "ExtendsSchema")) == 7

    def test_circle_isa_geometry(self, tool):
        assert (CIRCLE_NID, GEOMETRY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_rectangle_isa_geometry(self, tool):
        assert (RECTANGLE_NID, GEOMETRY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_geometry_isa_entity(self, tool):
        assert (GEOMETRY_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_physical_object_isa_entity(self, tool):
        assert (PHYS_OBJ_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_moment_of_inertia_isa_entity(self, tool):
        assert (MOI_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_parallel_axis_theorem_isa_entity(self, tool):
        assert (PAT_NID, ENTITY_NID, "ExtendsSchema") in edge_triples(tool)

    def test_entity_isa_linked_base_model(self, tool):
        assert (ENTITY_NID, LBM_NID, "ExtendsSchema") in edge_triples(tool)


# =====================================================================
# 4. HasType edges
# =====================================================================


class TestHasTypeEdges:
    def test_has_type_count(self, tool):
        assert len(edges_by_label(tool, "HasSchemaType")) == 8

    def test_circles_typed(self, tool):
        triples = edge_triples(tool)
        assert (unit_circle.get_iri(), CIRCLE_NID, "HasSchemaType") in triples
        assert (a_circle.get_iri(), CIRCLE_NID, "HasSchemaType") in triples

    def test_rectangles_typed(self, tool):
        triples = edge_triples(tool)
        assert (unit_rect.get_iri(), RECTANGLE_NID, "HasSchemaType") in triples
        assert (block.get_iri(), RECTANGLE_NID, "HasSchemaType") in triples

    def test_physical_objects_typed(self, tool):
        triples = edge_triples(tool)
        assert (disk_obj.get_iri(), PHYS_OBJ_NID, "HasSchemaType") in triples
        assert (block_obj.get_iri(), PHYS_OBJ_NID, "HasSchemaType") in triples

    def test_disk_inertia_typed(self, tool):
        assert (disk_inertia.get_iri(), MOI_NID, "HasSchemaType") in edge_triples(tool)

    def test_block_pat_typed(self, tool):
        assert (block_pat.get_iri(), PAT_NID, "HasSchemaType") in edge_triples(tool)


# =====================================================================
# 5. Field nodes (pydantic includes all inherited fields)
# =====================================================================


class TestFieldNodes:
    def test_field_node_count(self, tool):
        assert len(nodes_by_kind(tool, "field")) == 46

    def test_circle_fields_include_inherited(self, tool):
        circle_fields = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(CIRCLE_NID)}
        assert "radius" in circle_fields
        assert "dimensions" in circle_fields
        assert "type" in circle_fields
        assert "uuid" in circle_fields

    def test_rectangle_own_fields(self, tool):
        rect_fields = {n["label"] for n in nodes_by_kind(tool, "field") if n["id"].startswith(RECTANGLE_NID)}
        assert "width" in rect_fields
        assert "height" in rect_fields
        assert "dimensions" in rect_fields

    def test_physical_object_mass(self, tool):
        n = node_by_id(tool, f"{PHYS_OBJ_NID}#field_mass")
        assert n is not None
        assert n["label"] == "mass"

    def test_defines_property_count(self, tool):
        assert len(edges_by_label(tool, "definesProperty")) == 46


# =====================================================================
# 6. Constraint nodes
# =====================================================================


class TestConstraintNodes:
    def test_constraint_node_count(self, tool):
        assert len(nodes_by_kind(tool, "constraint")) == 5

    def test_radius_ge_0(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#constraint_ge")
        assert n is not None
        assert n["label"] == "0"

    def test_width_ge_0(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#constraint_ge")
        assert n is not None

    def test_height_ge_0(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_height#constraint_ge")
        assert n is not None

    def test_mass_ge_0(self, tool):
        n = node_by_id(tool, f"{PHYS_OBJ_NID}#field_mass#constraint_ge")
        assert n is not None

    def test_distance_ge_0(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#constraint_ge")
        assert n is not None

    def test_constraint_edges(self, tool):
        assert len(edges_by_label(tool, "ge")) == 5


# =====================================================================
# 7. Type annotation nodes
# =====================================================================


class TestTypeNodes:
    def test_type_node_count(self, tool):
        assert len(nodes_by_kind(tool, "type")) == 46

    def test_radius_type_number(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#type")
        assert n is not None
        assert n["label"] == "number"

    def test_dimensions_type_integer(self, tool):
        n = node_by_id(tool, f"{GEOMETRY_NID}#field_dimensions#type")
        assert n is not None
        assert n["label"] == "integer"

    def test_mass_type_number(self, tool):
        n = node_by_id(tool, f"{PHYS_OBJ_NID}#field_mass#type")
        assert n is not None
        assert n["label"] == "number"


# =====================================================================
# 8. Default nodes
# =====================================================================


class TestDefaultNodes:
    def test_default_node_count(self, tool):
        assert len(nodes_by_kind(tool, "default")) == 32

    def test_radius_default(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_width_default(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#default")
        assert n is not None
        assert n["label"] == "1.0"

    def test_mass_default(self, tool):
        n = node_by_id(tool, f"{PHYS_OBJ_NID}#field_mass#default")
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


# =====================================================================
# 9. Description nodes
# =====================================================================


class TestDescriptionNodes:
    def test_description_node_count(self, tool):
        assert len(nodes_by_kind(tool, "description")) == 32

    def test_radius_description(self, tool):
        n = node_by_id(tool, f"{CIRCLE_NID}#field_radius#description")
        assert n is not None
        assert n["label"] == "Radius in metres"

    def test_width_description(self, tool):
        n = node_by_id(tool, f"{RECTANGLE_NID}#field_width#description")
        assert n is not None
        assert n["label"] == "Width in metres"

    def test_mass_description(self, tool):
        n = node_by_id(tool, f"{PHYS_OBJ_NID}#field_mass#description")
        assert n is not None
        assert n["label"] == "Mass in kilograms"

    def test_formula_description(self, tool):
        n = node_by_id(tool, f"{MOI_NID}#field_formula#description")
        assert n is not None
        assert "formula" in n["label"].lower()

    def test_distance_description(self, tool):
        n = node_by_id(tool, f"{PAT_NID}#field_distance#description")
        assert n is not None
        assert "distance" in n["label"].lower()


# =====================================================================
# 10. Literal nodes (RDF)
# =====================================================================


class TestLiteralNodes:
    def test_literal_node_count(self, tool):
        assert len(nodes_by_kind(tool, "literal")) == 22

    def test_name_literals(self, tool):
        for entity in ALL_ENTITIES:
            n = node_by_id(tool, f"{entity.get_iri()}#name")
            assert n is not None, f"Missing name literal for {entity.name}"
            assert n["label"] == entity.name

    def test_radius_literals(self, tool):
        n = node_by_id(tool, f"{unit_circle.get_iri()}#radius")
        assert n is not None
        assert n["label"] == "1.0"

        n = node_by_id(tool, f"{a_circle.get_iri()}#radius")
        assert n is not None
        assert n["label"] == "0.3"

    def test_dimension_literals(self, tool):
        for entity in [unit_circle, unit_rect, a_circle, block]:
            n = node_by_id(tool, f"{entity.get_iri()}#dimensions")
            assert n is not None, f"Missing dimensions literal for {entity.name}"
            assert n["label"] == "2"

    def test_mass_literals(self, tool):
        n = node_by_id(tool, f"{disk_obj.get_iri()}#mass")
        assert n is not None
        assert n["label"] == "2.5"

    def test_formula_literal(self, tool):
        n = node_by_id(tool, f"{disk_inertia.get_iri()}#formula")
        assert n is not None
        assert n["label"] == "I = m*r^2 / 2"

    def test_distance_literal(self, tool):
        n = node_by_id(tool, f"{block_pat.get_iri()}#distance")
        assert n is not None
        assert n["label"] == "0.15"


# =====================================================================
# 11. RDF property edges
# =====================================================================


class TestRdfEdges:
    def test_has_dimensions_count(self, tool):
        assert len(edges_by_label(tool, "hasDimensions")) == 4

    def test_has_radius_count(self, tool):
        assert len(edges_by_label(tool, "hasRadius")) == 2

    def test_has_width_count(self, tool):
        assert len(edges_by_label(tool, "hasWidth")) == 2

    def test_has_height_count(self, tool):
        assert len(edges_by_label(tool, "hasHeight")) == 2

    def test_has_mass_count(self, tool):
        assert len(edges_by_label(tool, "hasMass")) == 2

    def test_has_formula_count(self, tool):
        assert len(edges_by_label(tool, "hasFormula")) == 1

    def test_has_distance_count(self, tool):
        assert len(edges_by_label(tool, "hasDistance")) == 1

    def test_geometry_ref_edge(self, tool):
        assert (disk_inertia.get_iri(), CIRCLE_NID, "refersToGeometry") in edge_triples(tool)

    def test_name_edge_count(self, tool):
        assert len(edges_by_label(tool, "name")) == 8


# =====================================================================
# 12. Expansion policy (root=Entity, relations=-HasType, -IsA)
# =====================================================================


class TestExpansionPolicy:
    def test_expansion_policy_active(self, tool):
        assert tool._visible_node_ids is not None

    def test_visible_count(self, tool):
        assert len(tool._visible_node_ids) == 15

    def test_entity_class_visible(self, tool):
        assert ENTITY_NID in tool._visible_node_ids

    def test_all_child_classes_visible(self, tool):
        for nid in [GEOMETRY_NID, CIRCLE_NID, RECTANGLE_NID, PHYS_OBJ_NID, MOI_NID, PAT_NID]:
            assert nid in tool._visible_node_ids

    def test_all_instances_visible(self, tool):
        for entity in ALL_ENTITIES:
            assert entity.get_iri() in tool._visible_node_ids


# =====================================================================
# 13. Total node/edge counts
# =====================================================================


class TestTotalCounts:
    def test_total_node_count(self, tool):
        assert len(tool._full_visjs_nodes) == 199

    def test_total_edge_count(self, tool):
        assert len(tool._full_visjs_edges) == 207
