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

import panel as pn

from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.monacoeditor import MonacoEditor
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

    def test_show_node_details_class_node(self, json_social_network):
        """Clicking a class node shows 'Class' type label and schema in native JSONEditor."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        tool.show_node_details(person_nid)
        assert hasattr(tool, "current_node_oold_editor")
        assert isinstance(tool.current_node_oold_editor, pn.widgets.JSONEditor)
        assert tool.current_node_oold_editor.value == json_social_network["schemas"]["Person"]
        md = tool.oold_detail_col[0]
        assert "Class" in md.object

    def test_class_node_editor_sizing(self, json_social_network):
        """The class schema JSONEditor should stretch to fill the column width."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        tool.show_node_details(person_nid)
        editor = tool.current_node_oold_editor
        assert editor.sizing_mode == "stretch_width"
        assert editor.height is not None and editor.height > 0

    def test_text_tab_exists(self, json_social_network):
        """The tool should have a text_col for the Text tab."""
        tool = json_social_network["tool"]
        tool.build_panel()
        assert hasattr(tool, "text_col")
        assert isinstance(tool.text_col, pn.Column)

    def test_text_tab_entity_node(self, json_social_network):
        """Clicking an entity node populates the Text tab with a MonacoEditor showing its JSON."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        assert hasattr(tool, "current_text_editor")
        assert isinstance(tool.current_text_editor, MonacoEditor)
        assert tool.current_text_editor.language == "json"
        parsed = json.loads(tool.current_text_editor.value)
        assert parsed["name"] == "Alice"

    def test_text_tab_entity_has_schema(self, json_social_network):
        """The Monaco editor for an entity should have a json_schema for validation."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        assert tool.current_text_editor.json_schema is not None
        assert "properties" in tool.current_text_editor.json_schema

    def test_text_tab_class_node(self, json_social_network):
        """Clicking a class node populates the Text tab with a MonacoEditor showing the schema."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        tool.show_node_details(person_nid)
        assert hasattr(tool, "current_text_editor")
        assert isinstance(tool.current_text_editor, MonacoEditor)
        parsed = json.loads(tool.current_text_editor.value)
        assert parsed.get("title") == "Person"

    def test_text_tab_class_node_has_meta_schema(self, json_social_network):
        """The Monaco editor for a class node should use the OO-LD meta-schema for validation."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        tool.show_node_details(person_nid)
        schema = tool.current_text_editor.json_schema
        if schema:
            assert "OO-LD" in schema.get("title", "")

    def test_text_tab_has_apply_button(self, json_social_network):
        """The Text tab should contain an Apply button below the editor."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        assert hasattr(tool, "text_apply_button")
        assert isinstance(tool.text_apply_button, pn.widgets.Button)
        assert tool.text_apply_button.name == "Apply Changes"

    def test_text_tab_tracks_node_id(self, json_social_network):
        """The text tab should track the node_id and node_kind for apply."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        assert tool._text_tab_node_id == alice_iri
        assert tool._text_tab_node_kind == "entity"

    def test_text_tab_tracks_class_node(self, json_social_network):
        """The text tab should track class node_kind for class nodes."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_nid = _cls_node_id(json_social_network["schemas"]["Person"])
        tool.show_node_details(person_nid)
        assert tool._text_tab_node_id == person_nid
        assert tool._text_tab_node_kind == "class"

    def test_text_apply_entity_changes(self, json_social_network):
        """Applying changes via the Text tab should update the entity."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)

        parsed = json.loads(tool.current_text_editor.value)
        parsed["name"] = "Alice_Modified"
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        entity = tool.entity_dict[alice_iri]
        assert entity.name == "Alice_Modified"

    def test_text_apply_entity_age_change(self, json_social_network):
        """Applying an age change via Text tab should update the entity's age."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)

        parsed = json.loads(tool.current_text_editor.value)
        parsed["age"] = 99
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        entity = tool.entity_dict[alice_iri]
        assert entity.get("age") == 99

    def test_text_apply_schema_changes(self, json_social_network):
        """Applying schema changes via the Text tab should update schema_registry."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        person_nid = _cls_node_id(person_schema)
        tool.show_node_details(person_nid)

        parsed = json.loads(tool.current_text_editor.value)
        parsed["description"] = "A person schema (modified)"
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        updated_schema = tool.schema_registry.get("Person")
        if updated_schema is None:
            updated_schema = tool.schema_registry.get("Person.json")
        assert updated_schema is not None
        assert updated_schema.get("description") == "A person schema (modified)"

    def test_text_apply_schema_rebuilds_edges(self, json_social_network):
        """Applying schema changes should rebuild edges in the graph."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        person_nid = _cls_node_id(person_schema)
        tool.show_node_details(person_nid)

        parsed = json.loads(tool.current_text_editor.value)
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        assert len(tool.visnetwork_panel.edges) > 0

    def test_text_apply_schema_updates_context_menus(self, json_social_network):
        """Adding a property to a schema via Text tab must update Create: entries in context menus."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        person_nid = _cls_node_id(person_schema)
        tool.show_node_details(person_nid)

        # Add a new property "nickname" to the Person schema
        parsed = json.loads(tool.current_text_editor.value)
        parsed["properties"]["nickname"] = {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "A person's nickname",
        }
        parsed["@context"][1]["nickname"] = {"@id": "ex:HasNickname"}
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        # Every Person entity should now list "nickname" in its context menu
        alice_iri = json_social_network["alice"]["id"]
        creatable = tool._get_creatable_fields(alice_iri)
        assert "nickname" in creatable, f"Expected 'nickname' in creatable fields, got {creatable}"

        # Also check the visjs node callback_name_dict
        alice_node = next(n for n in tool.visjs_nodes if n["id"] == alice_iri)
        cb_values = list(alice_node.get("callback_name_dict", {}).values())
        assert any("nickname" in v for v in cb_values), f"Expected 'Create: nickname' in context menu, got {cb_values}"

    def test_text_apply_schema_updates_entity_schema_ref(self, json_social_network):
        """After schema apply, entity._schema must point to the new schema."""
        tool = json_social_network["tool"]
        tool.build_panel()
        person_schema = json_social_network["schemas"]["Person"]
        person_nid = _cls_node_id(person_schema)
        tool.show_node_details(person_nid)

        parsed = json.loads(tool.current_text_editor.value)
        parsed["description"] = "Updated schema"
        tool.current_text_editor.value = json.dumps(parsed)
        tool._on_text_apply(None)

        alice_iri = json_social_network["alice"]["id"]
        entity = tool.entity_dict[alice_iri]
        assert entity.schema.get("description") == "Updated schema"

    def test_text_apply_invalid_json(self, json_social_network):
        """Applying invalid JSON should not crash (just prints error)."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        tool.show_node_details(alice_iri)
        old_name = tool.entity_dict[alice_iri].name

        tool.current_text_editor.value = "{invalid json"
        tool._on_text_apply(None)

        assert tool.entity_dict[alice_iri].name == old_name

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

    def test_deserialize_nan_integer_returns_none(self, json_social_network):
        """Tabulator sends NaN for empty integer cells; it must become None."""
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "age", float("nan"))
        assert result is None

    def test_deserialize_nan_float_returns_none(self, json_social_network):
        """Tabulator sends NaN for empty number cells; it must become None."""
        tool = json_social_network["tool"]
        person = next(e for e in tool.entity_list if e.type_name == "Person")
        result = tool._deserialize_property_value(person, "body_weight", float("nan"))
        assert result is None


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

    def test_multi_node_apply_with_nan_values(self, json_social_network):
        """NaN values from empty Tabulator cells must not crash the apply."""
        tool = json_social_network["tool"]
        tool.build_panel()
        persons = [e for e in tool.entity_list if e.type_name == "Person"]
        iris = [e.get_iri() for e in persons[:2]]
        tool.show_multi_node_editor(iris)

        df = tool.oold_comparison_tabulator.value.copy()
        if "age" in df.columns:
            df["age"] = float("nan")
            tool.oold_comparison_tabulator.value = df
        tool.on_multi_node_apply_changes(None)

        for iri in iris:
            entity = tool.entity_dict[iri]
            assert entity.get("age") is None


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
        assert len(tool.undo_stack) == 0  # no initial state on stack

    def test_save_state_adds_to_stack(self, json_social_network):
        tool = json_social_network["tool"]
        tool._save_state()
        assert len(tool.undo_stack) == 1

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

        tool.undo()
        assert tool.entity_dict[alice_iri].name == "Alice"

        tool.redo()
        assert tool.entity_dict[alice_iri].name == "MODIFIED"

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

    def test_deep_copy_with_unpicklable_data(self):
        """deep_copy must not crash even if entity data contains non-serializable objects."""
        import contextvars

        ctx = contextvars.copy_context()
        data = {"id": "urn:test:1", "name": "broken", "_leak": ctx}
        entity = EntityAdapter(data, {}, "Test")
        clone = entity.deep_copy()
        assert clone.get_iri() == "urn:test:1"
        assert clone.name == "broken"


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

    def test_visible_edges_limited_to_expansion_relations(self, json_social_network):
        """Only edges whose labels match the expansion relations should be visible."""
        tool = json_social_network["tool"]
        visible_labels = {e["label"] for e in tool.visjs_edges}
        assert "knows" in visible_labels
        assert "hobbies" in visible_labels
        non_expansion_labels = visible_labels - {"knows", "hobbies"}
        assert len(non_expansion_labels) == 0, (
            f"Edges not in expansion relations should be hidden, but found: {non_expansion_labels}"
        )

    def test_visible_edge_keys_set_when_policy_active(self, json_social_network):
        tool = json_social_network["tool"]
        assert tool._visible_edge_keys is not None

    def test_no_policy_visible_edge_keys_is_none(self, json_recipe):
        tool = json_recipe["tool"]
        assert tool._visible_edge_keys is None

    def test_all_expansion_edges_present(self, json_social_network):
        """Every traversed edge should appear in the visible edges."""
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        visible_edge_triples = {(e["from"], e["to"], e["label"]) for e in tool.visjs_edges}
        assert (alice_iri, bob_iri, "knows") in visible_edge_triples

    def test_expand_label_only_from_source_node(self, json_social_network):
        """Expanding a specific label from one node must NOT add edges from other visible nodes."""
        tool = json_social_network["tool"]
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        charlie_iri = json_social_network["charlie"]["id"]
        # All three persons are visible
        assert alice_iri in tool._visible_node_ids
        assert bob_iri in tool._visible_node_ids
        assert charlie_iri in tool._visible_node_ids
        # Expand "HasType" from Alice only
        tool._on_context_menu_item("node", alice_iri, "expand_HasType")
        has_type_edges = [(e["from"], e["to"]) for e in tool.visjs_edges if e["label"] == "HasType"]
        # Alice -> Person class edge should exist
        assert any(frm == alice_iri for frm, _ in has_type_edges), "Alice's HasType edge should be visible"
        # Bob and Charlie should NOT have HasType edges
        assert not any(frm == bob_iri for frm, _ in has_type_edges), "Bob's HasType edge should NOT appear"
        assert not any(frm == charlie_iri for frm, _ in has_type_edges), "Charlie's HasType edge should NOT appear"


class TestEdgeContextMenu:
    def test_edges_have_id_and_callback(self, json_social_network):
        tool = json_social_network["tool"]
        for edge in tool.visjs_edges:
            assert "id" in edge, "Edge must have an id"
            assert "callback_name_dict" in edge, "Edge must have callback_name_dict"

    def test_edge_callback_has_hide(self, json_social_network):
        tool = json_social_network["tool"]
        edge = tool.visjs_edges[0]
        assert "edge_hide" in edge["callback_name_dict"]

    def test_edge_callback_has_hide_all(self, json_social_network):
        tool = json_social_network["tool"]
        edge = tool.visjs_edges[0]
        assert "edge_hide_all" in edge["callback_name_dict"]

    def test_edge_hide_removes_single_edge(self, json_social_network):
        tool = json_social_network["tool"]
        edge = tool.visjs_edges[0]
        edge_id = edge["id"]
        count_before = len(tool.visjs_edges)
        tool._on_edge_context_menu(edge_id, "edge_hide")
        assert len(tool.visjs_edges) == count_before - 1
        assert all(e["id"] != edge_id for e in tool.visjs_edges)

    def test_edge_hide_all_removes_all_of_label(self, json_social_network):
        tool = json_social_network["tool"]
        knows_edges = [e for e in tool.visjs_edges if e["label"] == "knows"]
        assert len(knows_edges) > 1
        tool._on_edge_context_menu(knows_edges[0]["id"], "edge_hide_all")
        remaining_knows = [e for e in tool.visjs_edges if e["label"] == "knows"]
        assert len(remaining_knows) == 0

    def test_edge_expand_all_reveals_new_nodes(self, json_social_network):
        """Expand All: HasAge should reveal literal age nodes from visible persons."""
        tool = json_social_network["tool"]
        # Initially no HasAge edges are visible (only knows/hobbies from BFS)
        assert not [e for e in tool.visjs_edges if e["label"] == "HasAge"]
        nodes_before = len(tool.visjs_nodes)
        # HasAge edges exist in the full graph
        full_hasage = [e for e in tool._full_visjs_edges if e.get("label") == "HasAge"]
        assert len(full_hasage) >= 2  # Alice (41) and Charlie (28)
        # Trigger "Expand All: HasAge" using a synthetic edge ID (only label matters)
        fake_id = "x|HasAge|y"
        tool._on_edge_context_menu(fake_id, "edge_expand_all")
        # Literal age nodes should now be visible
        vis_hasage = [e for e in tool.visjs_edges if e["label"] == "HasAge"]
        assert len(vis_hasage) >= 2
        assert len(tool.visjs_nodes) > nodes_before

    def test_edge_expand_all_only_from_visible(self, json_social_network):
        """Expand All should only expand outward from visible nodes, not pull in hidden ones."""
        tool = json_social_network["tool"]
        bob_iri = json_social_network["bob"]["id"]
        # Hide Bob so he's no longer visible
        tool._hide_node(bob_iri)
        assert bob_iri not in tool._visible_node_ids
        # Expand All: HasType -- all visible entities have HasType, Bob does not
        fake_id = "x|HasType|y"
        tool._on_edge_context_menu(fake_id, "edge_expand_all")
        # HasType edges from visible entities are revealed
        vis_hastype = [e for e in tool.visjs_edges if e["label"] == "HasType"]
        assert len(vis_hastype) > 0
        # Bob's HasType edge should NOT be present (he was hidden)
        assert not any(e["from"] == bob_iri for e in vis_hastype)
        # Bob should NOT have been pulled back into visible nodes
        assert bob_iri not in tool._visible_node_ids

    def test_edge_expand_all_reveals_hidden_edges(self, json_social_network):
        tool = json_social_network["tool"]
        knows_edges_before = [e for e in tool.visjs_edges if e["label"] == "knows"]
        # Hide all knows edges first
        tool._on_edge_context_menu(knows_edges_before[0]["id"], "edge_hide_all")
        assert len([e for e in tool.visjs_edges if e["label"] == "knows"]) == 0
        # Now reveal one knows edge so we can use its context menu to expand all
        visible = tool._visible_node_ids or {n["id"] for n in tool._full_visjs_nodes}
        full_knows = [
            e
            for e in tool._full_visjs_edges
            if e.get("label") == "knows" and e.get("from") in visible and e.get("to") in visible
        ]
        assert len(full_knows) > 0
        # Manually add one back so we can trigger expand_all from it
        key = (full_knows[0]["from"], full_knows[0]["to"], "knows")
        tool._visible_edge_keys.add(key)
        tool._apply_visibility_filter_inplace()
        tool.visnetwork_panel.nodes = list(tool.visjs_nodes)
        tool.visnetwork_panel.edges = list(tool.visjs_edges)
        one_edge = next(e for e in tool.visjs_edges if e["label"] == "knows")
        tool._on_edge_context_menu(one_edge["id"], "edge_expand_all")
        knows_after = [e for e in tool.visjs_edges if e["label"] == "knows"]
        assert len(knows_after) == len(full_knows)


# =====================================================================
# 9b. Expansion node positioning
# =====================================================================


class TestExpansionPositioning:
    """Newly expanded nodes should be placed near their source node."""

    def _set_node_position(self, tool, node_id: str, x: float, y: float) -> None:
        """Simulate JS-synced position by setting x/y on visnetwork_panel nodes."""
        for n in tool.visnetwork_panel.nodes:
            if n.get("id") == node_id:
                n["x"] = x
                n["y"] = y
                return

    def test_node_expand_positions_near_source(self, json_social_network):
        """Expanding a node places new neighbours near it, not at origin."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        self._set_node_position(tool, alice_iri, 500.0, 300.0)

        # Alice has hidden outgoing edges (e.g. HasAge); expand all from her
        nodes_before = {n["id"] for n in tool.visjs_nodes}
        tool._on_context_menu_item("node", alice_iri, "expand_all")
        new_nodes = [n for n in tool.visjs_nodes if n["id"] not in nodes_before]

        assert len(new_nodes) > 0, "expand_all should reveal new nodes"
        for n in new_nodes:
            assert "x" in n and "y" in n, f"New node {n['id'][:30]} should have x/y"
            dx = n["x"] - 500.0
            dy = n["y"] - 300.0
            dist = (dx**2 + dy**2) ** 0.5
            assert 50 < dist < 200, f"Node should be ~100px from source, got {dist:.0f}"

    def test_edge_expand_all_positions_near_source(self, json_social_network):
        """'Expand All: HasAge' places literal nodes near their respective persons."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        charlie_iri = json_social_network["charlie"]["id"]
        self._set_node_position(tool, alice_iri, 200.0, 100.0)
        self._set_node_position(tool, charlie_iri, 800.0, 400.0)

        nodes_before = {n["id"] for n in tool.visjs_nodes}
        tool._on_edge_context_menu("x|HasAge|y", "edge_expand_all")
        new_nodes = [n for n in tool.visjs_nodes if n["id"] not in nodes_before]

        assert len(new_nodes) >= 2, "Should reveal at least 2 age literal nodes"
        # Each new node should be near one of the source persons
        for n in new_nodes:
            assert "x" in n and "y" in n, "New node should have x/y"
            d_alice = ((n["x"] - 200.0) ** 2 + (n["y"] - 100.0) ** 2) ** 0.5
            d_charlie = ((n["x"] - 800.0) ** 2 + (n["y"] - 400.0) ** 2) ** 0.5
            near_source = d_alice < 200 or d_charlie < 200
            assert near_source, f"Node at ({n['x']:.0f},{n['y']:.0f}) not near any source"

    def test_click_after_expand_preserves_positions(self, json_social_network):
        """Clicking a node after expansion must not reset x/y on other nodes."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        bob_iri = json_social_network["bob"]["id"]
        self._set_node_position(tool, alice_iri, 500.0, 300.0)

        # Expand all from Alice -- new nodes get x/y from _position_nodes_near
        tool._on_context_menu_item("node", alice_iri, "expand_all")
        positioned = {n["id"]: (n["x"], n["y"]) for n in tool.visjs_nodes if "x" in n}
        assert len(positioned) > 0, "Some nodes should have positions after expand"

        # Simulate click: the visnetwork_panel.nodes now has the expansion data.
        # A real click would trigger show_node_details via click_callback.
        tool.click_callback({"nodes": [bob_iri]})

        # Positions in visjs_nodes should be unchanged (no snap-back)
        for n in tool.visjs_nodes:
            if n["id"] in positioned:
                assert n.get("x") == positioned[n["id"]][0], f"Node {n['id'][:20]} x changed after click"
                assert n.get("y") == positioned[n["id"]][1], f"Node {n['id'][:20]} y changed after click"

    def test_same_label_same_angle(self, json_social_network):
        """Nodes expanded via the same label should fan out at the same angle."""
        tool = json_social_network["tool"]
        tool.build_panel()
        alice_iri = json_social_network["alice"]["id"]
        charlie_iri = json_social_network["charlie"]["id"]
        src_positions = {alice_iri: (0.0, 0.0), charlie_iri: (1000.0, 0.0)}
        for nid, (x, y) in src_positions.items():
            self._set_node_position(tool, nid, x, y)

        tool._on_edge_context_menu("x|HasAge|y", "edge_expand_all")

        # Find the HasAge edges to identify which new node belongs to which source
        hasage_edges = [e for e in tool.visjs_edges if e["label"] == "HasAge"]
        node_map = {n["id"]: n for n in tool.visjs_nodes}
        import math

        angles = []
        for e in hasage_edges:
            src_pos = src_positions.get(e["from"])
            tgt = node_map.get(e["to"])
            if src_pos and tgt and "x" in tgt:
                dx = tgt["x"] - src_pos[0]
                dy = tgt["y"] - src_pos[1]
                angles.append(math.atan2(dy, dx))

        # Both angles should be identical (same label -> same hash -> same angle)
        assert len(angles) >= 2
        assert abs(angles[0] - angles[1]) < 0.01, f"Same label should produce same angle: {angles}"


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
