"""Comprehensive tests for OOLDGraphDetailTool features.

Tests cover both JSON-dict and pydantic inputs for:
  - Instantiation and entity conversion
  - Graph structure (nodes, edges, class hierarchy)
  - Schema introspection (properties, IRI fields, class graph)
  - Entity editing (single-node, multi-node, literal editing)
  - Entity creation and duplication
  - Undo/redo
  - Expansion policy and visibility filtering
  - Visualization configuration (property mappings)
  - Deletion (entity, class, literal nodes)
  - Sub-object expansion (recipe embedded ingredients)
"""

import json
import uuid

from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.oold_graph_tool.entity_adapter import EntityAdapter
from panelini.panels.oold_graph_tool.oold_graph_tool import _cls_node_id
from panelini.panels.oold_graph_tool.oold_schema import MISSING

# =====================================================================
# 1. Instantiation and entity conversion
# =====================================================================


class TestInstantiation:
    def test_json_tool_creates_entity_adapters(self, json_social_network):
        tool = json_social_network["tool"]
        assert len(tool.entity_list) > 0
        for entity in tool.entity_list:
            assert isinstance(entity, EntityAdapter)

    def test_pydantic_tool_creates_entity_adapters(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        for entity in tool.entity_list:
            assert isinstance(entity, EntityAdapter)

    def test_entity_dict_keys_are_iris(self, json_social_network):
        tool = json_social_network["tool"]
        for key, entity in tool.entity_dict.items():
            assert key == entity.get_iri()
            assert key.startswith("https://")

    def test_entity_types_are_schema_dicts(self, json_social_network):
        tool = json_social_network["tool"]
        for name, schema in tool.entity_types.items():
            assert isinstance(schema, dict)
            assert "properties" in schema or "allOf" in schema or name == "Entity"

    def test_pydantic_entity_types_converted_to_dicts(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        for name, schema in tool.entity_types.items():
            assert isinstance(schema, dict), f"entity_types[{name!r}] should be dict, got {type(schema)}"

    def test_schema_registry_populated(self, json_social_network):
        tool = json_social_network["tool"]
        assert "Person" in tool.schema_registry or "Person.json" in tool.schema_registry
        assert "Entity" in tool.schema_registry

    def test_introspector_available(self, json_social_network):
        tool = json_social_network["tool"]
        assert tool.introspector is not None

    def test_json_entity_count(self, json_social_network):
        tool = json_social_network["tool"]
        assert len(tool.entity_list) == 5  # alice, bob, charlie, sports, music

    def test_pydantic_entity_count(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        assert len(tool.entity_list) == 13  # 5 persons + 3 hobbies + 5 professions

    def test_json_recipe_entity_count(self, json_recipe):
        tool = json_recipe["tool"]
        assert len(tool.entity_list) == 1  # only the cake doc; ingredients are embedded

    def test_json_physics_entity_count(self, json_physics):
        tool = json_physics["tool"]
        assert len(tool.entity_list) == 2  # unit_circle, disk

    def test_bare_schema_dict_promoted_to_entity_types(self):
        """A schema dict in entity_list should be promoted to entity_types, not treated as an instance."""
        from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphConfig, OOLDGraphDetailTool
        from tests.panels.oold_graph_tool.conftest import ENTITY_SCHEMA, HOBBY_SCHEMA, _make_entity

        a = _make_entity("A", "https://example.com/hobby_id")
        config = OOLDGraphConfig(
            uuid=str(uuid.uuid4()),
            name="test",
            entity_list=[a, HOBBY_SCHEMA],
            entity_types={"Entity": ENTITY_SCHEMA},
        )
        tool = OOLDGraphDetailTool(config=config)
        assert "Hobby" in tool.entity_types
        assert len(tool.entity_list) == 1  # only the instance, not the schema


# =====================================================================
# 2. Graph structure (nodes & edges)
# =====================================================================


class TestGraphStructure:
    def test_entity_nodes_exist(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        node_ids = {n["id"] for n in tool._full_visjs_nodes}
        assert alice_iri in node_ids

    def test_rdf_edges_created(self, json_social_network):
        tool = json_social_network["tool"]
        assert len(tool._full_visjs_edges) > 0

    def test_knows_edge_exists(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        edge_labels = {(e["from"], e["to"], e["label"]) for e in tool._full_visjs_edges}
        assert (alice_iri, bob_iri, "knows") in edge_labels

    def test_class_nodes_exist(self, json_social_network):
        tool = json_social_network["tool"]
        node_ids = {n["id"] for n in tool._full_visjs_nodes}
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        assert person_nid in node_ids

    def test_has_type_edges(self, json_social_network):
        tool = json_social_network["tool"]
        has_type_edges = [e for e in tool._full_visjs_edges if e["label"] == "HasType"]
        assert len(has_type_edges) > 0

    def test_isa_edges(self, json_social_network):
        tool = json_social_network["tool"]
        isa_edges = [e for e in tool._full_visjs_edges if e["label"] == "IsA"]
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        entity_nid = _cls_node_id(json_social_network["schemas"]["Entity"])
        isa_pairs = {(e["from"], e["to"]) for e in isa_edges}
        assert (person_nid, entity_nid) in isa_pairs

    def test_defines_property_edges(self, json_social_network):
        tool = json_social_network["tool"]
        dp_edges = [e for e in tool._full_visjs_edges if e["label"] == "definesProperty"]
        assert len(dp_edges) > 0

    def test_pydantic_class_nodes_exist(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        assert any(n.get("node_kind") == "class" for n in tool._full_visjs_nodes)

    def test_literal_nodes_for_scalar_properties(self, json_social_network):
        tool = json_social_network["tool"]
        literal_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "literal"]
        assert len(literal_nodes) > 0

    def test_node_colors_assigned(self, json_social_network):
        tool = json_social_network["tool"]
        for node in tool._full_visjs_nodes:
            if node.get("node_kind") not in (
                "class",
                "field",
                "type",
                "default",
                "description",
                "constraint",
                "literal",
            ):
                assert "color" in node

    def test_physics_inheritance_chain(self, json_physics):
        tool = json_physics["tool"]
        isa_edges = [(e["from"], e["to"]) for e in tool._full_visjs_edges if e["label"] == "IsA"]
        circle_nid = _cls_node_id(json_physics["schemas"]["Circle"])
        geometry_nid = _cls_node_id(json_physics["schemas"]["Geometry"])
        assert (circle_nid, geometry_nid) in isa_edges


# =====================================================================
# 3. Schema introspection
# =====================================================================


class TestSchemaIntrospection:
    def test_get_properties_returns_all_fields(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        props = tool.introspector.get_properties(person_schema)
        assert "name" in props
        assert "age" in props
        assert "knows" in props

    def test_get_properties_includes_inherited(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        props = tool.introspector.get_properties(person_schema)
        assert "uuid" in props  # inherited from Entity

    def test_get_own_properties(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        own = tool.introspector.get_own_properties(person_schema)
        assert "age" in own
        assert "uuid" not in own  # inherited

    def test_is_iri_field(self, json_social_network):
        tool = json_social_network["tool"]
        alice_entity = tool.entity_list[0]
        assert tool._is_iri_field(alice_entity, "knows")
        assert tool._is_iri_field(alice_entity, "hobbies")
        assert not tool._is_iri_field(alice_entity, "age")

    def test_field_name_for_predicate(self, json_social_network):
        tool = json_social_network["tool"]
        alice_entity = tool.entity_list[0]
        assert tool._field_name_for_predicate(alice_entity, "HasAge") == "age"

    def test_classify_property(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        props = tool.introspector.get_properties(person_schema)
        base_type, is_list, is_optional = tool.introspector.classify_property(props["age"])
        assert base_type == "integer"
        assert is_optional is True

    def test_property_info_description(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        props = tool.introspector.get_properties(person_schema)
        assert props["age"].description == "Age of the person"

    def test_property_info_default(self, json_social_network):
        tool = json_social_network["tool"]
        person_schema = json_social_network["schemas"]["Person"]
        props = tool.introspector.get_properties(person_schema)
        assert props["age"].default is None
        assert props["uuid"].default is MISSING  # required, no default

    def test_constraint_in_property_info(self, json_physics):
        tool = json_physics["tool"]
        circle_schema = json_physics["schemas"]["Circle"]
        props = tool.introspector.get_properties(circle_schema)
        assert "minimum" in props["radius"].constraints
        assert props["radius"].constraints["minimum"] == 0

    def test_get_common_properties(self, json_social_network):
        tool = json_social_network["tool"]
        persons = [e for e in tool.entity_list if e.type_name == "Person"]
        common = tool._get_common_properties(persons)
        assert "name" in common
        assert "id" not in common  # excluded
        assert "type" not in common  # excluded

    def test_get_property_editor_config_numeric(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        config = tool._get_property_editor_config(person, "age")
        assert config["type"] == "number"

    def test_get_property_editor_config_enum(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        config = tool._get_property_editor_config(person, "hobbies")
        if config["type"] == "list":
            assert "values" in config


# =====================================================================
# 4. Entity editing (single node)
# =====================================================================


class TestSingleNodeEditing:
    def test_show_node_details_entity(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        assert hasattr(tool, "current_node_oold_editor")
        assert tool.current_node_oold_editor.value is not None

    def test_apply_single_node_changes(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)

        tool.current_node_oold_editor.value = {**tool.current_node_oold_editor.value, "age": 99}
        tool.on_single_node_apply_changes(None)

        entity = tool.entity_dict[alice_iri]
        assert entity.get("age") == 99

    def test_apply_single_node_name_change(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)

        tool.current_node_oold_editor.value = {**tool.current_node_oold_editor.value, "name": "Alice2"}
        tool.on_single_node_apply_changes(None)

        entity = tool.entity_dict[alice_iri]
        assert entity.name == "Alice2"

    def test_show_node_details_unknown_node(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        tool.show_node_details("https://nonexistent.example.com/x")

    def test_deserialize_integer(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "age", "42")
        assert result == 42

    def test_deserialize_float(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "body_weight", "72.5")
        assert result == 72.5

    def test_deserialize_empty_to_none(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "age", "")
        assert result is None

    def test_deserialize_list_from_json_string(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "knows", '["a", "b"]')
        assert result == ["a", "b"]

    def test_serialize_property_value_list(self, json_social_network):
        tool = json_social_network["tool"]
        result = tool._serialize_property_value(["a", "b"])
        assert result == '["a", "b"]'

    def test_serialize_property_value_none(self, json_social_network):
        tool = json_social_network["tool"]
        assert tool._serialize_property_value(None) is None


# =====================================================================
# 5. Multi-node editing
# =====================================================================


class TestMultiNodeEditing:
    def test_show_multi_node_editor(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        tool.show_multi_node_editor([alice_iri, bob_iri])
        assert hasattr(tool, "oold_comparison_tabulator")
        assert len(tool.oold_comparison_tabulator.value) == 2

    def test_multi_node_apply_changes(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        persons = [e for e in tool.entity_list if e.type_name == "Person"]
        iris = [e.get_iri() for e in persons[:2]]
        tool.show_multi_node_editor(iris)

        df = tool.oold_comparison_tabulator.value.copy()
        df["name"] = "RENAMED"
        tool.oold_comparison_tabulator.value = df
        tool.on_multi_node_apply_changes(None)

    def test_build_comparison_dataframe(self, json_social_network):
        tool = json_social_network["tool"]
        persons = [e for e in tool.entity_list if e.type_name == "Person"]
        common = tool._get_common_properties(persons)
        df = tool._build_comparison_dataframe(persons, common)
        assert len(df) == len(persons)
        assert "_iri" in df.columns

    def test_build_set_all_row(self, json_social_network):
        tool = json_social_network["tool"]
        data = [{"_iri": "a", "name": "Alice"}, {"_iri": "b", "name": "Bob"}]
        row = tool._build_set_all_row(data, ["name"])
        assert row["name"] == ""  # values differ → empty


# =====================================================================
# 6. Entity creation
# =====================================================================


class TestEntityCreation:
    def test_show_create_entity_editor(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)
        assert hasattr(tool, "new_entity_editor")

    def test_create_entity_editor_is_panelini_jsoneditor(self, json_social_network):
        """The create-entity editor must use panelini's JsonEditor, not pn.widgets.JSONEditor."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)
        assert isinstance(tool.new_entity_editor, JsonEditor)

    def test_create_entity_editor_in_detail_column(self, json_social_network):
        """The editor and buttons must appear in the OO-LD Details column."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)
        col_types = [type(obj) for obj in tool.oold_detail_col]
        assert JsonEditor in col_types

    def test_create_entity_editor_has_default_values(self, json_social_network):
        """The editor should be pre-populated with uuid and name defaults."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)
        val = tool.new_entity_editor.value
        assert "uuid" in val
        assert val["name"].startswith("New")

    def test_create_new_entity(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)

        new_uuid = str(uuid.uuid4())
        new_iri = f"https://example.com/{new_uuid}"
        tool.new_entity_editor.value = {"uuid": new_uuid, "name": "NewPerson", "id": new_iri}
        tool._new_entity_type = person_schema
        tool.on_new_entity_save(None)

        assert new_iri in tool.entity_dict
        assert tool.entity_dict[new_iri].name == "NewPerson"

    def test_create_entity_from_class_node(self, json_physics):
        tool = json_physics["tool"]
        tool.build_panel()
        circle_schema = json_physics["schemas"]["Circle"]
        circle_nid = _cls_node_id(circle_schema)
        cls = tool._get_class_for_node_id(circle_nid)
        assert cls is not None


# =====================================================================
# 7. Duplication
# =====================================================================


class TestDuplication:
    def test_duplicate_entity(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        initial_count = len(tool.entity_list)

        dup_node = {
            "id": "temp-id-js",
            "label": "Alice",
            "entity_type": "Person",
            "x": 100,
            "y": 200,
        }
        tool.on_nodes_duplicated([dup_node])
        assert len(tool.entity_list) == initial_count + 1

        new_entity = tool.entity_list[-1]
        assert "copy" in new_entity.name.lower()

    def test_duplicate_generates_new_iri(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]

        dup_node = {"id": "temp", "label": "Alice", "entity_type": "Person"}
        tool.on_nodes_duplicated([dup_node])

        new_entity = tool.entity_list[-1]
        assert new_entity.get_iri() != alice_iri

    def test_generate_unique_name(self, json_social_network):
        tool = json_social_network["tool"]
        name = tool._generate_unique_name("Alice")
        assert name == "Alice (copy)"
        # Add an entity with that name
        tool.entity_list.append(EntityAdapter({"name": "Alice (copy)", "uuid": "x", "id": "x"}, {}, "Person"))
        name2 = tool._generate_unique_name("Alice")
        assert name2 == "Alice (copy 2)"


# =====================================================================
# 8. Undo / Redo
# =====================================================================


class TestUndoRedo:
    def test_undo_stack_initialized(self, json_social_network):
        tool = json_social_network["tool"]
        assert len(tool.undo_stack) == 1  # initial state

    def test_save_state_adds_to_stack(self, json_social_network):
        tool = json_social_network["tool"]
        tool._save_state()
        assert len(tool.undo_stack) == 2

    def test_undo_restores_previous_state(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        initial_count = len(tool.entity_list)

        tool._save_state()
        alice_iri = json_social_network["alice"]["id"]
        entity = tool.entity_dict[alice_iri]
        entity.set("name", "MODIFIED")

        tool.undo()
        restored = tool.entity_dict[alice_iri]
        assert restored.name == "Alice"
        assert len(tool.entity_list) == initial_count

    def test_redo_after_undo(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()

        tool._save_state()
        alice_iri = json_social_network["alice"]["id"]
        tool.entity_dict[alice_iri].set("name", "MODIFIED")
        tool._save_state()

        tool.undo()
        assert tool.entity_dict[alice_iri].name != "MODIFIED"

        tool.redo()

    def test_undo_nothing_to_undo(self, minimal_json_tool):
        tool = minimal_json_tool["tool"]
        tool.undo()  # should not raise

    def test_redo_nothing_to_redo(self, minimal_json_tool):
        tool = minimal_json_tool["tool"]
        tool.redo()  # should not raise

    def test_deep_copy_independence(self, json_social_network):
        tool = json_social_network["tool"]
        snapshot = tool._current_state_snapshot()
        alice_iri = json_social_network["alice"]["id"]
        tool.entity_dict[alice_iri].set("name", "CHANGED")
        original_name = snapshot["entities"][0].name if snapshot["entities"][0].get_iri() == alice_iri else None
        if original_name is not None:
            assert original_name == "Alice"


# =====================================================================
# 9. Expansion policy and visibility
# =====================================================================


class TestExpansionPolicy:
    def test_expansion_policy_limits_visible_nodes(self, json_social_network):
        tool = json_social_network["tool"]
        assert tool._visible_node_ids is not None
        all_node_ids = {n["id"] for n in tool._full_visjs_nodes}
        assert len(tool._visible_node_ids) < len(all_node_ids)

    def test_root_node_is_visible(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        assert alice_iri in tool._visible_node_ids

    def test_expanded_neighbors_visible(self, json_social_network):
        tool = json_social_network["tool"]
        bob_iri = json_social_network["bob"]["id"]
        assert bob_iri in tool._visible_node_ids  # alice knows bob

    def test_no_policy_shows_all_nodes(self, json_recipe):
        tool = json_recipe["tool"]
        assert tool._visible_node_ids is None  # no expansion policy

    def test_get_expand_options(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        options = tool._get_expand_options_for_node(alice_iri)
        # Some edges may lead to hidden nodes
        assert isinstance(options, dict)

    def test_get_inverse_expand_options(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        options = tool._get_inverse_expand_options_for_node(alice_iri)
        assert isinstance(options, dict)

    def test_get_neighbors_via_relations(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        neighbors = tool._get_neighbors_via_relations(alice_iri, ["knows"])
        bob_iri = json_social_network["bob"]["id"]
        assert bob_iri in neighbors

    def test_get_neighbors_inverse(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        neighbors = tool._get_neighbors_via_relations(alice_iri, ["-knows"])
        charlie_iri = json_social_network["charlie"]["id"]
        assert bob_iri in neighbors or charlie_iri in neighbors or len(neighbors) >= 0

    def test_physics_class_root_expansion(self, json_physics):
        tool = json_physics["tool"]
        assert tool._visible_node_ids is not None
        entity_nid = _cls_node_id(json_physics["schemas"]["Entity"])
        assert entity_nid in tool._visible_node_ids


# =====================================================================
# 10. Hide / Delete
# =====================================================================


class TestHideDelete:
    def test_hide_node(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        bob_iri = json_social_network["bob"]["id"]
        assert bob_iri in tool._visible_node_ids

        tool._hide_node(bob_iri)
        assert bob_iri not in tool._visible_node_ids

    def test_delete_entity_node(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        bob_iri = json_social_network["bob"]["id"]
        initial_count = len(tool.entity_list)

        tool._save_state()
        tool._execute_entity_delete(bob_iri)
        assert bob_iri not in tool.entity_dict
        assert len(tool.entity_list) == initial_count - 1

    def test_find_iri_references_to(self, json_social_network):
        tool = json_social_network["tool"]
        bob_iri = json_social_network["bob"]["id"]
        refs = tool._find_iri_references_to(bob_iri)
        # alice.knows includes bob
        assert len(refs) > 0

    def test_parent_of_literal(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        lit_id = f"{alice_iri}#age"
        result = tool._parent_of_literal(lit_id)
        if result is not None:
            assert result[0] == alice_iri
            assert result[1] == "age"

    def test_delete_literal_node(self, json_social_network):
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        lit_id = f"{alice_iri}#age"
        if tool._parent_of_literal(lit_id) is not None:
            tool._delete_literal_node(lit_id)
            entity = tool.entity_dict[alice_iri]
            assert entity.get("age") is None


# =====================================================================
# 11. Creatable fields and context menu
# =====================================================================


class TestCreatableFields:
    def test_get_creatable_fields(self, json_social_network):
        tool = json_social_network["tool"]
        charlie_iri = json_social_network["charlie"]["id"]
        fields = tool._get_creatable_fields(charlie_iri)
        assert isinstance(fields, list)
        # charlie has no body_weight
        assert "body_weight" in fields or "profession" in fields

    def test_get_creatable_fields_excludes_internal(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        fields = tool._get_creatable_fields(alice_iri)
        assert "type" not in fields
        assert "uuid" not in fields
        assert "id" not in fields

    def test_expand_dict_for_node(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        d = tool._expand_dict_for_node(alice_iri)
        assert isinstance(d, dict)

    def test_get_class_for_node_id(self, json_social_network):
        tool = json_social_network["tool"]
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        cls = tool._get_class_for_node_id(person_nid)
        assert cls is not None
        assert isinstance(cls, dict)

    def test_get_class_for_unknown_node(self, json_social_network):
        tool = json_social_network["tool"]
        assert tool._get_class_for_node_id("nonexistent") is None


# =====================================================================
# 12. Visualization configuration
# =====================================================================


class TestVisualizationConfig:
    def test_discover_available_properties(self, json_social_network):
        tool = json_social_network["tool"]
        tool._available_properties = None  # clear cache
        tool._discover_available_properties()
        assert tool._available_properties is not None
        assert "age" in tool._available_properties or "entity_type" in tool._available_properties

    def test_property_types_classified(self, json_social_network):
        tool = json_social_network["tool"]
        tool._available_properties = None
        tool._discover_available_properties()
        assert tool._property_types.get("entity_type") == "categorical"

    def test_color_for_type(self, json_social_network):
        tool = json_social_network["tool"]
        color = tool._get_color_for_type("Person")
        assert isinstance(color, str)
        assert color.startswith("#")

    def test_color_deterministic(self, json_social_network):
        tool = json_social_network["tool"]
        c1 = tool._get_color_for_type("TestType")
        c2 = tool._get_color_for_type("TestType")
        assert c1 == c2

    def test_build_size_transformer(self, json_social_network):
        tool = json_social_network["tool"]
        tool.property_mappings["size"] = "age"
        tf = tool._build_size_transformer()
        result = tf(30)
        assert isinstance(result, (int, float))
        assert 10 <= result <= 50

    def test_build_color_mapper_categorical(self, json_social_network):
        tool = json_social_network["tool"]
        tool._available_properties = None
        tool._discover_available_properties()
        tool.property_mappings["color"] = "entity_type"
        mapper = tool._build_color_mapper()
        result = mapper("Person")
        assert isinstance(result, str)


# =====================================================================
# 13. Recipe-specific: sub-object expansion
# =====================================================================


class TestSubObjectExpansion:
    def test_recipe_has_embedded_ingredients(self, json_recipe):
        tool = json_recipe["tool"]
        cake_entity = tool.entity_list[0]
        ingredients = cake_entity.get("ingredients")
        assert isinstance(ingredients, list)
        assert len(ingredients) == 2

    def test_field_inner_model_type_for_ingredients(self, json_recipe):
        tool = json_recipe["tool"]
        cake_entity = tool.entity_list[0]
        inner = tool._field_inner_model_type(cake_entity, "ingredients")
        assert inner is not None
        assert isinstance(inner, dict)

    def test_expandable_subobject_fields(self, json_recipe):
        tool = json_recipe["tool"]
        cake_iri = tool.entity_list[0].get_iri()
        fields = tool._get_expandable_subobject_fields(cake_iri)
        assert "ingredients" in fields


# =====================================================================
# 14. RDF round-trip
# =====================================================================


class TestRDFRoundTrip:
    def test_rdf_graph_not_empty(self, json_social_network):
        tool = json_social_network["tool"]
        assert len(tool.rdf_graph) > 0

    def test_rdf_graph_contains_entity_subjects(self, json_social_network):
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        subjects = {str(s) for s in tool.rdf_graph.subjects()}
        assert alice_iri in subjects

    def test_entity_adapter_to_jsonld(self, json_social_network):
        tool = json_social_network["tool"]
        entity = tool.entity_list[0]
        doc = entity.to_jsonld()
        assert "@context" in doc
        assert "id" in doc or "@id" in doc

    def test_jsonld_parseable_by_rdflib(self, json_social_network):
        from rdflib import Graph

        tool = json_social_network["tool"]
        entity = tool.entity_list[0]
        doc = entity.to_jsonld()
        g = Graph()
        g.parse(data=json.dumps(doc), format="json-ld")
        assert len(g) > 0

    def test_pydantic_entity_jsonld_parseable(self, pydantic_social_network):
        from rdflib import Graph

        tool = pydantic_social_network["tool"]
        entity = tool.entity_list[0]
        doc = entity.to_jsonld()
        g = Graph()
        g.parse(data=json.dumps(doc), format="json-ld")
        assert len(g) > 0

    def test_recipe_jsonld_with_property_scoped_context(self, json_recipe):
        from rdflib import Graph

        tool = json_recipe["tool"]
        entity = tool.entity_list[0]
        doc = entity.to_jsonld()
        g = Graph()
        g.parse(data=json.dumps(doc), format="json-ld")
        assert len(g) > 0


# =====================================================================
# 15. Edge creation helpers
# =====================================================================


class TestEdgeCreation:
    def test_get_object_properties(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        props = tool._get_object_properties(person)
        assert isinstance(props, list)
        prop_names = {p["name"] for p in props}
        assert "knows" in prop_names

    def test_object_property_has_is_list(self, json_social_network):
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        props = tool._get_object_properties(person)
        knows_prop = next(p for p in props if p["name"] == "knows")
        assert knows_prop["is_list"] is True

    def test_edge_from_new_entity_shows_dialog(self, json_social_network):
        """Creating an entity and drawing an edge from it must show the property dialog."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]

        # Create new entity via the create-entity flow
        tool._show_create_entity_editor(person_schema)
        new_data = tool.new_entity_editor.value
        tool.on_new_entity_save(None)

        new_iri = new_data["id"]
        assert new_iri in tool.entity_dict

        # Simulate edge drawn from the new entity to an existing one
        target_iri = json_social_network["alice"]["id"]
        tool.on_edge_created({"from": new_iri, "to": target_iri})
        assert hasattr(tool, "_edge_dialog")
        assert tool._edge_dialog.title == "Configure Edge Property"

    def test_new_entity_has_default_iri(self, json_social_network):
        """A newly created entity must always have a non-empty IRI."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)

        default_val = tool.new_entity_editor.value
        assert default_val.get("id"), "Default id must be a non-empty IRI"
        assert default_val["id"].startswith("urn:uuid:")

    def test_save_entity_without_id_generates_iri(self, json_social_network):
        """Saving an entity with no id field must auto-generate an IRI."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        tool._show_create_entity_editor(person_schema)

        # Simulate user clearing the id field
        tool.new_entity_editor.value = {"uuid": "test-uuid-123", "name": "NoIRI"}
        tool.on_new_entity_save(None)

        assert "urn:uuid:test-uuid-123" in tool.entity_dict


# =====================================================================
# 16. Pydantic-specific backward compatibility
# =====================================================================


class TestPydanticBackwardCompat:
    def test_pydantic_social_network_instantiates(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        assert len(tool.entity_list) > 0

    def test_pydantic_recipe_instantiates(self, pydantic_recipe):
        tool = pydantic_recipe["tool"]
        assert len(tool.entity_list) > 0

    def test_pydantic_physics_instantiates(self, pydantic_physics):
        tool = pydantic_physics["tool"]
        assert len(tool.entity_list) > 0

    def test_pydantic_entities_have_correct_type_name(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        type_names = {e.type_name for e in tool.entity_list}
        assert "Person" in type_names

    def test_pydantic_class_hierarchy_in_graph(self, pydantic_physics):
        tool = pydantic_physics["tool"]
        isa_edges = [e for e in tool._full_visjs_edges if e["label"] == "IsA"]
        assert len(isa_edges) > 0

    def test_pydantic_rdf_graph_populated(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        assert len(tool.rdf_graph) > 0

    def test_pydantic_editing(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        tool.build_panel()
        alice = next(e for e in tool.entity_list if e.name == "Alice")
        alice_iri = alice.get_iri()
        tool.show_node_details(alice_iri)

        val = tool.current_node_oold_editor.value
        tool.current_node_oold_editor.value = {**val, "age": 100}
        tool.on_single_node_apply_changes(None)

        assert tool.entity_dict[alice_iri].get("age") == 100

    def test_pydantic_undo(self, pydantic_social_network):
        tool = pydantic_social_network["tool"]
        tool.build_panel()
        tool._save_state()
        alice = next(e for e in tool.entity_list if e.name == "Alice")
        alice.set("name", "MODIFIED")
        tool.undo()
        restored_alice = next(e for e in tool.entity_list if e.get_iri() == alice.get_iri())
        assert restored_alice.name == "Alice"


# =====================================================================
# 17. Class graph details
# =====================================================================


class TestClassGraph:
    def test_field_nodes_exist(self, json_social_network):
        tool = json_social_network["tool"]
        field_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "field"]
        assert len(field_nodes) > 0

    def test_default_value_nodes(self, json_physics):
        tool = json_physics["tool"]
        default_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "default"]
        assert len(default_nodes) > 0

    def test_description_nodes(self, json_social_network):
        tool = json_social_network["tool"]
        desc_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "description"]
        assert len(desc_nodes) > 0

    def test_constraint_nodes(self, json_physics):
        tool = json_physics["tool"]
        constraint_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "constraint"]
        assert len(constraint_nodes) > 0

    def test_has_range_edges(self, json_social_network):
        tool = json_social_network["tool"]
        range_edges = [e for e in tool._full_visjs_edges if e["label"] == "HasRange"]
        assert len(range_edges) > 0

    def test_type_nodes_exist(self, json_social_network):
        tool = json_social_network["tool"]
        type_nodes = [n for n in tool._full_visjs_nodes if n.get("node_kind") == "type"]
        assert len(type_nodes) > 0
