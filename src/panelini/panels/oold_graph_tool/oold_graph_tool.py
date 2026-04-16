## uv pip install "git+https://github.com/opensemanticworld/panelini.git@feat-visnetwork-incremental-updates"

import json
import uuid
from enum import Enum
from typing import Any, Callable, Optional, Union

import matplotlib.colors as mcolors
import matplotlib.pyplot as plt
import pandas as pd
import panel as pn
from oold.model import LinkedBaseModel
from pydantic import ConfigDict, Field, model_validator
from rdflib import Graph as RDFGraph
from rdflib.term import URIRef

from panelini.panels.visnetwork import GraphDetailTool, VisNetwork

pn.extension("tabulator")  # For tables
pn.extension("jsoneditor")  # For viewing/editing node details


def numeric_to_color(value: float, min_val: float, max_val: float, colormap_name: str = "viridis") -> str:
    """Convert a numeric value to a color using a matplotlib colormap.

    Args:
        value: The numeric value to convert
        min_val: Minimum value in the range
        max_val: Maximum value in the range
        colormap_name: Name of the matplotlib colormap to use
                      (e.g., 'viridis', 'plasma', 'coolwarm', 'RdYlGn')

    Returns:
        Hex color string (e.g., '#1f77b4')
    """
    if value is None or not isinstance(value, (int, float)):
        return "#808080"  # Gray for None/invalid values

    # Handle edge case where min == max
    if min_val == max_val:
        normalized = 0.5
    else:
        # Normalize value to [0, 1]
        normalized = (value - min_val) / (max_val - min_val)
        # Clamp to [0, 1] in case value is outside range
        normalized = max(0.0, min(1.0, normalized))

    # Get colormap and convert to hex
    cmap = plt.get_cmap(colormap_name)
    rgba = cmap(normalized)
    hex_color = mcolors.to_hex(rgba)

    return hex_color


class Entity(LinkedBaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "@context": {
                # aliases
                "id": "@id",
                "type": "@type",
                # prefixes
                "schema": "https://schema.org/",
                "ex": "https://example.com/",
                # literal property
                "name": "schema:name",
                "initialized_from": "ex:InitializedFrom",
            },
            "iri": "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",  # the IRI of the schema
        }
    )
    type: Optional[str] = Field(
        "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
        json_schema_extra={"options": {"hidden": "true"}},
    )
    uuid: str = Field(..., description="Unique identifier.")
    id: str = Field(default="", description="IRI of the entity, derived from uuid.")
    name: str
    initialized_from: Optional[str] = Field(
        None, description="From which entity this was copied and changed afterwards, if any"
    )

    def get_iri(self):
        return "https://example.com/" + self.uuid

    @model_validator(mode="after")
    def set_id_from_iri(self):
        """Automatically set id field from get_iri().

        This ensures id is always synchronized with the current IRI,
        even when uuid is updated via model_copy or other means.
        """
        # Always update id to match current IRI
        current_iri = self.get_iri()
        if self.id != current_iri:
            self.id = current_iri
        return self


class OOLDGraph(Entity):
    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",  # import the context of the parent class
                {
                    # object property definition
                    "object_list": {
                        "@id": "ex:HasPart",
                        "@type": "@id",
                    },
                },
            ],
            "iri": "OOLDGraph.json",
            "defaultProperties": ["object_list"],
        }
    )
    object_list: list[Entity]


class EdgeLabelConfig(Enum):
    """Configuration options for edge labels in the graph visualization."""

    RDF = "rdf"
    """Use RDF predicates as edge labels."""

    JSON_KEYS = "json_keys"  ## in implementation use json-ld @vobab
    """Use custom labels defined in the data model or visualization configuration."""


class OOLDGraphDetailTool(GraphDetailTool):
    def __init__(  # noqa: C901
        self,
        entity_list: list[Entity],
        edge_label_config: EdgeLabelConfig = "rdf",
        entity_types: Optional[dict[str, type]] = None,
        type_colors: Optional[dict[str, str]] = None,
        **kwargs,
    ):
        """Initialize the OOLDGraphDetailTool.

        Args:
            entity_list: list of LinkedBaseModel entities to visualize
            edge_label_config: Configuration for edge labels (RDF predicates or JSON keys)
            entity_types: Dict mapping type names to classes for creating new entities
            type_colors: Optional dict mapping entity type names to hex color strings.
                        If not provided or incomplete, colors are auto-generated for unknown types.
            **kwargs: Additional arguments passed to GraphDetailTool
        """
        # a dictionary for fast access by iri
        self.entity_list = entity_list
        self.entity_dict = {str(element.get_iri()): element for element in self.entity_list}

        # Color scheme for different entity types (optional, generated on the fly if not provided)
        self.type_colors = type_colors if type_colors is not None else {}
        self._color_index = 0  # For generating distinct colors
        self._predefined_colors = [
            "#4A90E2",  # Blue
            "#50C878",  # Emerald green
            "#FF6B6B",  # Coral red
            "#9B59B6",  # Purple
            "#F39C12",  # Orange
            "#1ABC9C",  # Turquoise
            "#E74C3C",  # Red
            "#3498DB",  # Light blue
            "#2ECC71",  # Green
            "#E67E22",  # Dark orange
            "#95A5A6",  # Gray
            "#34495E",  # Dark blue-gray
        ]

        # Store available entity types for creating new entities
        # Default to collecting types from existing entities if not provided
        if entity_types is None:
            self.entity_types = {}
            for entity in entity_list:
                entity_type = type(entity)
                type_name = entity_type.__name__
                if type_name not in self.entity_types:
                    self.entity_types[type_name] = entity_type
        else:
            self.entity_types = entity_types

        # Undo/Redo stacks for tracking history
        self.undo_stack = []
        self.redo_stack = []
        self.max_history = 50  # Maximum number of undo states to keep

        # Save initial state
        self._save_state()

        self.rdf_graph = RDFGraph()

        for element in self.entity_list:
            print(f"Parsing entity {element} with IRI {element.get_iri()} into RDF graph")
            self.rdf_graph.parse(data=element.to_jsonld(), format="json-ld")  ## appends elements

        ### transform python-classes/instances to visjs nodes/edges
        ## iterate over all triples
        ## for each triple:
        ## * create an edge with the predicate as label and the subject and object as source and target
        ## * create nodes for the subject and object if they don't exist yet, with the label as the name of the entity (e.g. name property) or the IRI if no name is available
        ## ids shall be iris

        self.visjs_nodes = []
        self.visjs_edges = []

        show_literals = False
        show_whole_graph = False

        def add_node_by_id(id_str: str):
            id_str = str(id_str)
            oold_obj = self.entity_dict.get(id_str, id_str)

            if oold_obj is not None:
                label = oold_obj.name if hasattr(oold_obj, "name") else id_str

                # Store entity type name as metadata for duplication
                entity_type_name = type(oold_obj).__name__ if not isinstance(oold_obj, str) else "Entity"

                visjs_node = {
                    "id": id_str,
                    "label": label,
                    "shape": "ellipse",
                    "entity_type": entity_type_name,  # metadata for duplication
                    "color": self._get_color_for_type(entity_type_name),
                }
                self.visjs_nodes.append(visjs_node)
                # Apply active mappings to new node
                self._apply_mappings_to_node(visjs_node, oold_obj)
            else:
                print(f"Warning: IRI {id} not found in self.entity_dict")

        def iri_to_edge_label(iri: URIRef) -> str:
            # simple implementation: take the last part of the IRI after the last slash or hash
            return iri.split("/")[-1].split("#")[-1]

        ## build graph from all rdf triples, except for literals
        if show_whole_graph:
            for s, p, o in self.rdf_graph:
                # create edge

                if isinstance(o, URIRef) or show_literals:
                    self.visjs_edges.append({
                        "from": str(s),
                        "to": str(o),
                        "label": iri_to_edge_label(p),
                    })
                    # create nodes if they don't exist yet

                    if not any(node["id"] == str(s) for node in self.visjs_nodes):
                        add_node_by_id(str(s))

                    if not any(node["id"] == str(o) for node in self.visjs_nodes):
                        add_node_by_id(str(o))

        ## build graph from nodes and their relations:

        for id_str, _element in self.entity_dict.items():
            # create node
            add_node_by_id(id_str)

        ## add all edges between the nodes based on the relations in the OO-LD objects
        available_ids = {node["id"] for node in self.visjs_nodes}
        for s, p, o in self.rdf_graph:
            if str(s) in available_ids:
                self.visjs_edges.append({
                    "from": str(s),
                    "to": str(o),
                    "label": str(p.split("/")[-1].split("#")[-1]),
                    "arrows": "to",
                })

        super().__init__(nodes=self.visjs_nodes, edges=self.visjs_edges)
        self.oold_detail_col = pn.Column()
        self.detail_tabs.append(("OO-LD Details", self.oold_detail_col))

        # Visualization configuration tab
        self.viz_config_col = pn.Column()
        self.detail_tabs.append(("Visualization Config", self.viz_config_col))

        # Property mapping state
        self.property_mappings = {"color": None, "size": None, "x": None, "y": None, "shape": None}
        self._available_properties = None  # Cache
        self._property_types = {}  # Cache: {prop_name: "numeric"|"categorical"|"string"}
        self._mapping_dropdowns = {}  # UI widgets

        # Populate visualization config tab
        self._populate_viz_config_tab()

    def build_panel(self) -> None:
        """Override to add nodes_duplicated_callback to VisNetwork."""
        # Call parent to set up buttons and structure
        super().build_panel()

        # Add undo/redo buttons to edit row
        self.undo_button = pn.widgets.Button(name="↶ Undo (Ctrl+Z)", button_type="default", width=150)
        self.undo_button.on_click(lambda event: self.undo())

        self.redo_button = pn.widgets.Button(name="↷ Redo (Ctrl+Y)", button_type="default", width=150)
        self.redo_button.on_click(lambda event: self.redo())

        # Add undo/redo buttons to edit row
        self.edit_row.append(self.undo_button)
        self.edit_row.append(self.redo_button)

        # Recreate VisNetwork with duplication and edge creation callbacks
        self.visnetwork_panel = VisNetwork(
            nodes=self.nodes,
            edges=self.edges,
            network_event_callback=self.network_event_callback,
            nodes_duplicated_callback=self.on_nodes_duplicated,  # Add duplication support
            edge_created_callback=self.on_edge_created,  # Add edge creation support
        )

        # Update the graph column to use the new visnetwork_panel
        self.graph_col.clear()
        self.graph_col.extend([self.edit_row, self.visnetwork_panel])

        # Add keyboard event handling for undo/redo
        self._setup_keyboard_handlers()

    def click_callback(self, event: dict[str, Any]) -> None:
        """Override to detect background clicks for visualization config.

        Args:
            event: Event data containing clicked node IDs
        """
        node_ids = event.get("nodes", [])

        if not node_ids:
            # Background click - show visualization config
            self.show_visualization_config()
        else:
            # Node click(s) - call parent behavior
            super().click_callback(event)

    def _get_color_for_type(self, entity_type_name: str) -> str:
        """Get the color for a given entity type.

        If the type doesn't have a color yet, generates one from a predefined palette.

        Args:
            entity_type_name: Name of the entity type

        Returns:
            Hex color string
        """
        if entity_type_name not in self.type_colors:
            # Generate a new color for this type
            color = self._predefined_colors[self._color_index % len(self._predefined_colors)]
            self.type_colors[entity_type_name] = color
            self._color_index += 1
            print(f"Assigned color {color} to type '{entity_type_name}'")

        return self.type_colors[entity_type_name]

    def _setup_keyboard_handlers(self) -> None:
        """Setup keyboard event handlers for undo/redo."""
        # Use Panel's jslink or JavaScript callbacks for keyboard events
        # We'll add this via the panel's _panel property
        # Note: This will be handled via the HTML pane in the panel
        # For now, we'll add buttons in the UI as the primary interface

    # ===== Undo/Redo Functionality =====

    def _save_state(self) -> None:
        """Save current state to undo stack.

        Creates a deep copy of entity_list for state preservation.
        Clears redo stack when new state is saved.
        """
        try:
            # Create deep copies of all entities
            state_snapshot = []
            for entity in self.entity_list:
                # Use model_copy with deep=True to ensure complete independence
                entity_copy = entity.model_copy(deep=True)
                state_snapshot.append(entity_copy)

            self.undo_stack.append(state_snapshot)

            # Limit history size
            if len(self.undo_stack) > self.max_history:
                self.undo_stack.pop(0)

            # Clear redo stack when new state is saved
            self.redo_stack.clear()

            print(f"State saved. Undo stack size: {len(self.undo_stack)}")
        except Exception as e:
            print(f"Error saving state: {e}")
            import traceback

            traceback.print_exc()

    def _restore_state(self, state_snapshot: list[LinkedBaseModel]) -> None:
        """Restore entity_list from a state snapshot.

        Args:
            state_snapshot: list of entity copies to restore
        """
        try:
            # Deep copy the snapshot to avoid reference issues
            restored_entities = []
            for entity in state_snapshot:
                entity_copy = entity.model_copy(deep=True)
                restored_entities.append(entity_copy)

            # Replace entity_list
            self.entity_list = restored_entities

            # Rebuild entity_dict
            self.entity_dict = {str(entity.get_iri()): entity for entity in self.entity_list}

            # Rebuild visualization
            self._rebuild_visualization()

            print(f"State restored. Entity count: {len(self.entity_list)}")
        except Exception as e:
            print(f"Error restoring state: {e}")
            import traceback

            traceback.print_exc()

    def _rebuild_visualization(self) -> None:
        """Rebuild entire visualization from entity_list.

        Recreates nodes, RDF graph, and edges from scratch.
        """
        # Clear existing visualization
        self.visjs_nodes = []
        self.visjs_edges = []

        # Rebuild nodes
        for entity in self.entity_list:
            iri = str(entity.get_iri())
            label = entity.name if hasattr(entity, "name") else iri
            entity_type_name = type(entity).__name__

            self.visjs_nodes.append({
                "id": iri,
                "label": label,
                "shape": "ellipse",
                "entity_type": entity_type_name,
                "color": self._get_color_for_type(entity_type_name),
            })

        # Rebuild RDF graph and edges
        self._rebuild_rdf_graph()
        self._rebuild_visjs_edges()

        # Apply active mappings to all nodes (if mappings exist)
        if hasattr(self, "property_mappings") and any(self.property_mappings.values()):
            self._apply_all_mappings()

        # Update visnetwork - create new list references to trigger Panel update
        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

    def undo(self) -> None:
        """Undo the last change."""
        if len(self.undo_stack) <= 1:  # Keep at least initial state
            print("Nothing to undo")
            return

        try:
            # Save current state to redo stack before undoing
            current_state = []
            for entity in self.entity_list:
                current_state.append(entity.model_copy(deep=True))
            self.redo_stack.append(current_state)

            # Remove current state from undo stack
            self.undo_stack.pop()

            # Restore previous state
            previous_state = self.undo_stack[-1]
            self._restore_state(previous_state)

            print(f"Undo completed. Undo stack: {len(self.undo_stack)}, Redo stack: {len(self.redo_stack)}")
        except Exception as e:
            print(f"Error during undo: {e}")
            import traceback

            traceback.print_exc()

    def redo(self) -> None:
        """Redo the last undone change."""
        if not self.redo_stack:
            print("Nothing to redo")
            return

        try:
            # Get state from redo stack
            next_state = self.redo_stack.pop()

            # Save current state to undo stack
            current_state = []
            for entity in self.entity_list:
                current_state.append(entity.model_copy(deep=True))
            self.undo_stack.append(current_state)

            # Restore next state
            self._restore_state(next_state)

            print(f"Redo completed. Undo stack: {len(self.undo_stack)}, Redo stack: {len(self.redo_stack)}")
        except Exception as e:
            print(f"Error during redo: {e}")
            import traceback

            traceback.print_exc()

    def show_node_details(self, node_id: Any) -> None:
        """Override the method to show node details in the side panel in a OO-LD-specific fashion"""

        super().show_node_details(node_id)

        self.oold_detail_col.clear()
        self.oold_detail_col.append(
            pn.pane.Markdown(f"### Node ID: {node_id} of type {type(self.entity_dict.get(node_id)).__name__}")
        )

        current_entity = self.entity_dict.get(node_id, None)
        if current_entity is not None:
            # Display the current entity's properties in a JSON editor for easy editing
            self.current_node_oold_editor = pn.widgets.JSONEditor(
                schema=type(current_entity).export_schema(), value=current_entity.model_dump(), mode="tree"
            )

            # Store current node ID for the callback
            self._current_single_node_id = node_id

            # Add "Apply Changes" button
            self.single_node_apply_button = pn.widgets.Button(name="Apply Changes", button_type="primary", width=150)
            self.single_node_apply_button.on_click(self.on_single_node_apply_changes)

            self.oold_detail_col.append(self.current_node_oold_editor)
            self.oold_detail_col.append(self.single_node_apply_button)

        else:
            # Show UI for creating a new entity
            self.oold_detail_col.append(pn.pane.Markdown("### Create New Entity"))

            if not self.entity_types:
                self.oold_detail_col.append(pn.pane.Markdown("*No entity types available*"))
            else:
                # Dropdown to select entity type
                self.new_entity_type_select = pn.widgets.Select(
                    name="Entity Type",
                    options=list(self.entity_types.keys()),
                    value=next(iter(self.entity_types.keys())),
                    width=200,
                )

                # Confirm button
                self.new_entity_confirm_button = pn.widgets.Button(
                    name="Create Entity", button_type="success", width=150
                )
                self.new_entity_confirm_button.on_click(self.on_create_entity_click)

                # Store the node_id for later use
                self._new_entity_node_id = node_id

                # Add UI elements
                self.oold_detail_col.append(pn.Row(self.new_entity_type_select, self.new_entity_confirm_button))

        self.detail_tabs.active = 2  # switch to the OO-LD details tab

    # ===== Multi-Node Comparison Functionality =====

    def show_multi_node_editor(self, node_ids: list[Any]) -> None:
        """Override to show OO-LD-aware multi-node comparison tables.

        Displays two comparison tables in the OO-LD Details tab:
        1. Comparison table for editing individual entity properties
        2. Set-all table for bulk editing all selected entities

        Args:
            node_ids: list of node IDs (IRIs) to compare
        """
        # Let parent handle visual properties in Details tab
        super().show_multi_node_editor(node_ids)

        # Now populate OO-LD Details tab with semantic properties
        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown(f"### OO-LD Multi-Node Editor ({len(node_ids)} nodes)"))

        # Get entities
        selected_entities = [self.entity_dict[nid] for nid in node_ids if nid in self.entity_dict]

        if not selected_entities:
            self.oold_detail_col.append(pn.pane.Markdown("*No entities found for selected nodes*"))
            return

        # Find common properties
        common_props = self._get_common_properties(selected_entities)

        if not common_props:
            self.oold_detail_col.append(pn.pane.Markdown("*No common properties found*"))
            return

        # Build comparison DataFrame
        comp_df = self._build_comparison_dataframe(selected_entities, common_props)

        # Build editor configs
        editors = {"_iri": None}  # IRI column not editable
        for prop in common_props:
            editors[prop] = self._get_property_editor_config(selected_entities[0], prop)

        # Create comparison tabulator
        self.oold_detail_col.append(pn.pane.Markdown("#### Property Comparison Table"))
        self.oold_detail_col.append(pn.pane.Markdown("*Edit cells to update individual entities*"))

        self.oold_comparison_tabulator = pn.widgets.Tabulator(
            comp_df,
            editors=editors,
            hidden_columns=["_iri"],  # Hide IRI column
            width=700,
            height=min(400, 50 + len(node_ids) * 30),
        )
        # Don't auto-apply edits - wait for button click
        self.oold_detail_col.append(self.oold_comparison_tabulator)

        # Build set-all table
        self.oold_detail_col.append(pn.pane.Markdown("#### Set Value for All Selected Entities"))
        self.oold_detail_col.append(pn.pane.Markdown("*Edit cells to apply value to ALL selected entities*"))

        table_data = comp_df.to_dict("records")
        set_all_row = self._build_set_all_row(table_data, common_props)
        set_all_df = pd.DataFrame([set_all_row])

        self.oold_set_all_tabulator = pn.widgets.Tabulator(
            set_all_df,
            editors=editors,
            width=700,
            height=100,
        )
        # Don't auto-apply edits - wait for button click
        self.oold_detail_col.append(self.oold_set_all_tabulator)

        # Add "Apply Changes" button for multi-node editing
        self.multi_node_apply_button = pn.widgets.Button(name="Apply Changes", button_type="primary", width=150)
        self.multi_node_apply_button.on_click(self.on_multi_node_apply_changes)
        self.oold_detail_col.append(self.multi_node_apply_button)

        # Store selected IDs for callbacks
        self._current_selected_node_ids = node_ids

        # Switch to OO-LD Details tab
        self.detail_tabs.active = 2

    # ===== Property Introspection Helpers =====

    def _get_common_properties(self, entities: list[LinkedBaseModel]) -> list[str]:
        """Find properties common to all selected entities.

        Args:
            entities: list of LinkedBaseModel instances

        Returns:
            Sorted list of property names that exist on all entities
        """
        if not entities:
            return []

        # Get model fields from first entity as baseline
        first_model_fields = set(entities[0].model_fields.keys())

        # Find intersection across all entities
        common_fields = first_model_fields.copy()
        for entity in entities[1:]:
            entity_fields = set(entity.model_fields.keys())
            common_fields &= entity_fields

        # Filter out internal/system fields
        exclude_fields = {"id", "type", "__iris__"}
        common_fields -= exclude_fields

        # Prioritize 'name' and 'label' to appear first
        priority_fields = ["name", "label"]
        result = []

        # Add priority fields first (if they exist)
        for field in priority_fields:
            if field in common_fields:
                result.append(field)
                common_fields.remove(field)

        # Add remaining fields in sorted order
        result.extend(sorted(common_fields))

        return result

    def _get_property_editor_config(self, entity: LinkedBaseModel, prop_name: str) -> dict[str, Any]:
        """Get Tabulator editor configuration for a property.

        Args:
            entity: Sample entity to inspect
            prop_name: Name of the property

        Returns:
            Dict with 'type' and optionally 'values' for editor config
        """
        field = entity.model_fields[prop_name]
        annotation = field.annotation

        # Handle Optional/Union types
        origin = getattr(annotation, "__origin__", None)
        if origin is Union:
            non_none = [t for t in annotation.__args__ if t is not type(None)]
            if non_none:
                annotation = non_none[0]
                origin = getattr(annotation, "__origin__", None)

        # Check for Enum
        try:
            if isinstance(annotation, type) and issubclass(annotation, Enum):
                return {"type": "list", "values": [e.value for e in annotation]}
        except TypeError:
            pass

        # Check for list
        if origin is list:
            return {"type": "input"}  # JSON string input for lists

        # Primitive types
        if annotation in (int, float):
            return {"type": "number"}
        elif annotation is bool:
            return {"type": "tickCross"}
        else:
            return {"type": "input"}  # Default to text input

    def _serialize_property_value(self, value: Any) -> Any:
        """Serialize a property value for display in tabulator.

        Handles enums, lists, and other complex types.

        Args:
            value: Property value from entity

        Returns:
            Serialized value suitable for tabulator display
        """
        if value is None:
            return None
        elif isinstance(value, Enum):
            return value.value
        elif isinstance(value, list):
            if all(isinstance(v, str) for v in value):
                return json.dumps(value)  # list of strings/IRIs
            elif all(isinstance(v, Enum) for v in value):
                return json.dumps([v.value for v in value])
            else:
                return json.dumps([str(v) for v in value])
        elif isinstance(value, (str, int, float, bool)):
            return value
        else:
            return str(value)

    def _deserialize_property_value(self, entity: LinkedBaseModel, prop_name: str, value: Any) -> Any:  # noqa: C901
        """Deserialize a tabulator value back to property type.

        Handles type conversion, enums, and lists.

        Args:
            entity: Entity to update
            prop_name: Property name
            value: Value from tabulator

        Returns:
            Deserialized value suitable for entity assignment
        """
        field = entity.model_fields[prop_name]
        annotation = field.annotation

        # Handle Optional types
        origin = getattr(annotation, "__origin__", None)
        args = getattr(annotation, "__args__", ())

        if origin is Union:
            # Filter out NoneType
            non_none_types = [t for t in args if t is not type(None)]
            if non_none_types:
                annotation = non_none_types[0]
                origin = getattr(annotation, "__origin__", None)
                args = getattr(annotation, "__args__", ())

        # Handle list types
        if origin is list:
            if isinstance(value, str):
                try:
                    parsed = json.loads(value)
                    if isinstance(parsed, list):
                        # Check if list of enums
                        if args:
                            try:
                                if issubclass(args[0], Enum):
                                    return [args[0](v) for v in parsed]
                            except TypeError:
                                pass
                        return parsed
                except (json.JSONDecodeError, ValueError):
                    pass
            return value

        # Handle Enum types
        try:
            if isinstance(annotation, type) and issubclass(annotation, Enum):
                return annotation(value)
        except TypeError:
            pass

        # Handle primitives
        if annotation in (int, float, bool, str):
            if value == "" or value is None:
                return None
            return annotation(value)

        return value

    # ===== Table Building =====

    def _build_comparison_dataframe(self, entities: list[LinkedBaseModel], properties: list[str]) -> pd.DataFrame:
        """Build DataFrame for comparison table.

        Args:
            entities: list of entities to compare
            properties: list of property names to include

        Returns:
            DataFrame with one row per entity
        """
        rows = []
        for entity in entities:
            row = {"_iri": str(entity.get_iri())}  # Hidden column for callbacks

            # Use model_dump to get serialized values (avoids lazy resolution)
            entity_dict = entity.model_dump()

            for prop in properties:
                # Get value from the dumped dict to avoid triggering __getattribute__ resolution
                value = entity_dict.get(prop, None)
                row[prop] = self._serialize_property_value(value)
            rows.append(row)

        return pd.DataFrame(rows)

    def _build_set_all_row(self, table_data: list[dict[str, Any]], properties: list[str]) -> dict[str, Any]:
        """Build single row for set-all table showing common values.

        Args:
            table_data: list of row dicts from comparison table
            properties: list of property names

        Returns:
            Dict with common values or empty/None for differing values
        """
        set_all_row = {}

        # Always include _iri as None (not editable)
        set_all_row["_iri"] = None

        for prop in properties:
            values = [row[prop] for row in table_data]
            first_val = values[0]

            # Check if all values are the same
            if all(v == first_val for v in values):
                set_all_row[prop] = first_val
            else:
                # Values differ - show empty for better UX
                set_all_row[prop] = "" if isinstance(first_val, str) else None

        return set_all_row

    def _refresh_oold_tabulators(self) -> None:
        """Refresh OO-LD comparison and set-all tables with current entity data."""
        if not hasattr(self, "oold_comparison_tabulator") or not hasattr(self, "oold_set_all_tabulator"):
            return

        # Get current selected entities
        selected_entities = [
            self.entity_dict[nid] for nid in self._current_selected_node_ids if nid in self.entity_dict
        ]

        if not selected_entities:
            return

        # Get common properties
        common_props = self._get_common_properties(selected_entities)

        if not common_props:
            return

        # Rebuild comparison DataFrame
        comp_df = self._build_comparison_dataframe(selected_entities, common_props)
        self.oold_comparison_tabulator.value = comp_df

        # Rebuild set-all row
        table_data = comp_df.to_dict("records")
        set_all_row = self._build_set_all_row(table_data, common_props)
        set_all_df = pd.DataFrame([set_all_row])
        self.oold_set_all_tabulator.value = set_all_df

    # ===== Synchronization =====

    def _rebuild_rdf_graph(self) -> None:
        """Rebuild RDF graph from all entities in entity_list."""
        self.rdf_graph = RDFGraph()
        for entity in self.entity_list:
            self.rdf_graph.parse(data=entity.to_jsonld(), format="json-ld")

    def _rebuild_visjs_edges(self) -> None:
        """Rebuild visjs edges from RDF graph.

        Preserves nodes, rebuilds edges based on current entity relationships.
        """
        self.visjs_edges = []
        available_ids = {node["id"] for node in self.visjs_nodes}

        for s, p, o in self.rdf_graph:
            if str(s) in available_ids:
                self.visjs_edges.append({
                    "from": str(s),
                    "to": str(o),
                    "label": str(p.split("/")[-1].split("#")[-1]),
                    "arrows": "to",
                })

    def _sync_entity_to_visjs(self, entity: LinkedBaseModel) -> None:
        """Sync a single entity's data to its corresponding visjs node.

        Updates node label if entity.name changed.

        Args:
            entity: The updated entity
        """
        iri = str(entity.get_iri())
        for node in self.visjs_nodes:
            if node["id"] == iri:
                if hasattr(entity, "name"):
                    node["label"] = entity.name
                # Ensure entity_type metadata is preserved
                entity_type_name = type(entity).__name__
                if "entity_type" not in node:
                    node["entity_type"] = entity_type_name
                # Ensure color is set based on type
                if "color" not in node:
                    node["color"] = self._get_color_for_type(entity_type_name)
                break

    def _full_sync_after_edit(self) -> None:
        """Perform full sync of all data structures after entity edit.

        Ensures consistency between LinkedBaseModel instances, RDF graph,
        and visualization (nodes and edges).
        """
        # Rebuild RDF graph
        self._rebuild_rdf_graph()

        # Rebuild edges
        self._rebuild_visjs_edges()

        # Sync node labels
        for entity in self.entity_list:
            self._sync_entity_to_visjs(entity)

        # Reapply active mappings if any are set
        if hasattr(self, "property_mappings") and any(self.property_mappings.values()):
            print("Reapplying active visualization mappings after edit...")
            self._apply_all_mappings()

        # Update visnetwork - use update_nodes for proper reactivity
        self.visnetwork_panel.update_nodes(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

        # Refresh tables if displayed
        if hasattr(self, "oold_comparison_tabulator"):
            self._refresh_oold_tabulators()

    # ===== Event Handlers =====

    def on_single_node_apply_changes(self, event: Any) -> None:
        """Callback when 'Apply Changes' button is clicked for single node editing.

        Reads the current value from the JSON editor and applies changes.

        Args:
            event: Button click event
        """
        try:
            if not hasattr(self, "_current_single_node_id"):
                return

            node_id = self._current_single_node_id
            new_value_dict = self.current_node_oold_editor.value

            if node_id not in self.entity_dict:
                print(f"Warning: Entity {node_id} not found in entity_dict")
                return

            entity = self.entity_dict[node_id]

            print(f"Applying changes to entity {node_id} from JSON editor")

            # Save state before making changes
            self._save_state()

            # Update each property from the edited JSON
            for prop_name, prop_value in new_value_dict.items():
                # Skip internal fields
                if prop_name in ["id", "__iris__"]:
                    continue

                # Check if property exists in model
                if prop_name in entity.model_fields:
                    try:
                        # Deserialize the value to the correct type
                        deserialized = self._deserialize_property_value(entity, prop_name, prop_value)
                        setattr(entity, prop_name, deserialized)
                        print(f"  Updated property '{prop_name}' to: {deserialized}")
                    except Exception as e:
                        print(f"  Warning: Could not update property '{prop_name}': {e}")

            # Full sync to update all data structures
            self._full_sync_after_edit()
            print("Changes applied successfully")

        except Exception as e:
            print(f"Error applying single node changes: {e}")
            import traceback

            traceback.print_exc()

    def on_multi_node_apply_changes(self, event: Any) -> None:  # noqa: C901
        """Callback when 'Apply Changes' button is clicked for multi-node editing.

        Applies changes from both comparison and set-all tables.

        Args:
            event: Button click event
        """
        try:
            if not hasattr(self, "oold_comparison_tabulator") or not hasattr(self, "oold_set_all_tabulator"):
                return

            print("Applying multi-node changes...")

            # Save state before making changes
            self._save_state()

            # Get current table data
            comparison_df = self.oold_comparison_tabulator.value
            set_all_df = self.oold_set_all_tabulator.value

            # Apply changes from comparison table (individual node edits)
            for _idx, row in comparison_df.iterrows():
                entity_iri = row["_iri"]
                if entity_iri not in self.entity_dict:
                    continue

                entity = self.entity_dict[entity_iri]

                # Update each property
                for col in comparison_df.columns:
                    if col == "_iri":
                        continue

                    if col in entity.model_fields:
                        try:
                            value = row[col]
                            deserialized = self._deserialize_property_value(entity, col, value)
                            setattr(entity, col, deserialized)
                        except Exception as e:
                            print(f"  Warning: Could not update {entity_iri}.{col}: {e}")

            # Apply changes from set-all table (bulk edits)
            # Only apply non-empty/non-None values from set-all row
            if len(set_all_df) > 0:
                set_all_row = set_all_df.iloc[0]
                for col in set_all_df.columns:
                    if col == "_iri":
                        continue

                    value = set_all_row[col]
                    # Only apply if value is not empty/None
                    if value is not None and value != "":
                        for node_id in self._current_selected_node_ids:
                            if node_id in self.entity_dict:
                                entity = self.entity_dict[node_id]
                                if col in entity.model_fields:
                                    try:
                                        deserialized = self._deserialize_property_value(entity, col, value)
                                        setattr(entity, col, deserialized)
                                    except Exception as e:
                                        print(f"  Warning: Could not update {node_id}.{col}: {e}")

            # Full sync to update all data structures
            self._full_sync_after_edit()
            print("Multi-node changes applied successfully")

        except Exception as e:
            print(f"Error applying multi-node changes: {e}")
            import traceback

            traceback.print_exc()

    def on_nodes_duplicated(self, duplicated_nodes: list[dict[str, Any]]) -> None:
        """Callback when nodes are duplicated via Ctrl+drag.

        Creates new OO-LD entities for each duplicated node.

        Args:
            duplicated_nodes: list of duplicated node dicts from JavaScript
        """
        try:
            print(f"Nodes duplicated: {len(duplicated_nodes)} nodes")

            for dup_node in duplicated_nodes:
                print(f"  Duplicated node: id={dup_node.get('id')}, label={dup_node.get('label')}")

                # Get entity type from node metadata
                entity_type_name = dup_node.get("entity_type", "Entity")

                if entity_type_name not in self.entity_types:
                    print(f"Warning: Unknown entity type '{entity_type_name}', skipping")
                    continue

                entity_type = self.entity_types[entity_type_name]

                # Generate unique name for the new entity
                base_name = dup_node.get("label", "Copy")
                unique_name = self._generate_unique_name(base_name)

                # Find the direct parent entity to copy properties from
                # This should be the entity represented by the node being duplicated
                parent_entity = None
                dup_node_id = dup_node.get("id")

                # First try to find by ID (this is the IRI of the node being duplicated)
                if dup_node_id and dup_node_id in self.entity_dict:
                    parent_entity = self.entity_dict[dup_node_id]
                    print(f"  Found parent entity by ID: {parent_entity.name}")
                else:
                    # Fall back to finding by exact name match
                    for entity in self.entity_list:
                        if (
                            type(entity).__name__ == entity_type_name
                            and hasattr(entity, "name")
                            and entity.name == base_name
                        ):
                            parent_entity = entity
                            print(f"  Found parent entity by name: {parent_entity.name}")
                            break

                # Create new entity
                if parent_entity is not None:
                    # Get parent IRI for initialized_from tracking (tracks direct parent, not ancestor)
                    parent_iri = str(parent_entity.get_iri())

                    # Generate new UUID for the duplicated entity
                    new_uuid = str(uuid.uuid4())

                    # Use JSON roundtrip for reliable deep copying
                    # This ensures the parent entity is never modified
                    entity_json = parent_entity.model_dump_json(exclude={"id", "__iris__"})
                    entity_data = json.loads(entity_json)

                    # Update with new values for the copy
                    entity_data["uuid"] = new_uuid
                    entity_data["name"] = unique_name
                    entity_data["initialized_from"] = parent_iri  # Points to direct parent
                    # Clear id so it gets regenerated from the new uuid
                    entity_data["id"] = ""

                    # Create new entity
                    new_entity = entity_type(**entity_data)
                    print(f"  ✓ Copied entity from {parent_entity.name} to {unique_name}")
                    print(f"    uuid: {new_uuid}")
                    print(f"    initialized_from: {parent_iri}")

                    # Verify parent wasn't modified
                    if hasattr(parent_entity, "initialized_from") and parent_entity.initialized_from == parent_iri:
                        print("  ⚠ WARNING: Parent entity may have been modified!")
                else:
                    # Create minimal entity with just the name and uuid
                    new_uuid = str(uuid.uuid4())
                    new_entity = entity_type(uuid=new_uuid, name=unique_name)
                    print("  Created minimal entity (no original found)")
                    print(f"    uuid: {new_uuid}")

                # Get the new entity's IRI
                new_iri = str(new_entity.get_iri())

                # Add to entity structures
                self.entity_list.append(new_entity)
                self.entity_dict[new_iri] = new_entity

                # Create and add new visjs node
                new_visjs_node = {
                    "id": new_iri,
                    "label": unique_name,
                    "shape": "ellipse",
                    "entity_type": entity_type_name,
                    "color": self._get_color_for_type(entity_type_name),
                    # Preserve position from duplicated node
                    "x": dup_node.get("x"),
                    "y": dup_node.get("y"),
                    "fixed": dup_node.get("fixed", True),
                }
                self.visjs_nodes.append(new_visjs_node)

                print(f"  Created new {entity_type_name}: {unique_name} -> {new_iri}")

            # Save state after duplication
            self._save_state()

            # Invalidate property cache since entities changed
            self._available_properties = None

            # Full sync to update RDF graph, edges, and visualization
            self._full_sync_after_edit()
            print(f"Duplication complete. Total nodes: {len(self.visjs_nodes)}")

        except Exception as e:
            print(f"Error duplicating nodes: {e}")
            import traceback

            traceback.print_exc()

    def on_edge_created(self, edge_data: dict[str, Any]) -> None:
        """Callback when an edge is created via manipulation controls.

        Shows a popup dialog to help set the correct property in the origin node.

        Args:
            edge_data: The newly created edge dict with 'from' and 'to' keys
        """
        try:
            from_id = edge_data.get("from")
            to_id = edge_data.get("to")

            print(f"Edge created: {from_id} -> {to_id}")

            if not from_id or not to_id:
                print("Warning: Edge missing from or to ID")
                return

            # Get the source entity
            source_entity = self.entity_dict.get(str(from_id))
            if not source_entity:
                print(f"Warning: Source entity {from_id} not found")
                return

            # Get the target IRI
            target_iri = str(to_id)

            # Find all object properties (properties that can hold IRIs/references)
            object_properties = self._get_object_properties(source_entity)

            if not object_properties:
                print(f"No object properties found in {type(source_entity).__name__}")
                return

            # Show popup dialog for property selection
            self._show_edge_property_dialog(source_entity, target_iri, object_properties)

        except Exception as e:
            print(f"Error in edge creation callback: {e}")
            import traceback

            traceback.print_exc()

    def _get_object_properties(self, entity: LinkedBaseModel) -> list[dict[str, Any]]:  # noqa: C901
        """Get all properties that can hold object references (IRIs).

        Args:
            entity: The entity to inspect

        Returns:
            list of dicts with 'name', 'type', 'description' for each object property
        """
        object_props = []

        for prop_name, field_info in entity.model_fields.items():
            # Skip internal fields
            if prop_name in ["id", "type", "__iris__", "uuid"]:
                continue

            annotation = field_info.annotation

            # Handle Optional types
            origin = getattr(annotation, "__origin__", None)
            args = getattr(annotation, "__args__", ())

            if origin is Union:
                non_none_types = [t for t in args if t is not type(None)]
                if non_none_types:
                    annotation = non_none_types[0]
                    origin = getattr(annotation, "__origin__", None)
                    args = getattr(annotation, "__args__", ())

            # Check for list types or direct LinkedBaseModel references
            is_object_property = False
            prop_type = "unknown"

            if origin is list and args:
                # Check if it's a list of LinkedBaseModel or strings (IRIs)
                inner_type = args[0]
                if inner_type is str or (
                    isinstance(inner_type, type) and issubclass(inner_type, (LinkedBaseModel, str))
                ):
                    is_object_property = True
                    prop_type = f"list[{getattr(inner_type, '__name__', str(inner_type))}]"
            elif isinstance(annotation, type) and issubclass(annotation, LinkedBaseModel):
                is_object_property = True
                prop_type = annotation.__name__

            # Also check the JSON-LD context for @type: @id
            try:
                context_entry = entity.model_config.get("json_schema_extra", {}).get("@context", {})
                if isinstance(context_entry, list):
                    for ctx in context_entry:
                        if isinstance(ctx, dict) and prop_name in ctx:
                            prop_def = ctx[prop_name]
                            if isinstance(prop_def, dict) and prop_def.get("@type") == "@id":
                                is_object_property = True
                                break
                elif isinstance(context_entry, dict) and prop_name in context_entry:
                    prop_def = context_entry[prop_name]
                    if isinstance(prop_def, dict) and prop_def.get("@type") == "@id":
                        is_object_property = True
            except Exception:  # noqa: S110
                pass

            if is_object_property:
                object_props.append({
                    "name": prop_name,
                    "type": prop_type,
                    "description": field_info.description or "",
                    "is_list": origin is list,
                })

        return object_props

    def _show_edge_property_dialog(  # noqa: C901
        self, source_entity: LinkedBaseModel, target_iri: str, object_properties: list[dict[str, Any]]
    ) -> None:
        """Show a dialog to select which property should be set for the new edge.

        Args:
            source_entity: The source entity to update
            target_iri: The IRI of the target node
            object_properties: list of available object properties
        """
        # Create a modal dialog
        dialog_content = pn.Column()

        dialog_content.append(pn.pane.Markdown("### Set Property for New Edge"))
        dialog_content.append(
            pn.pane.Markdown(
                f"**From:** {source_entity.name if hasattr(source_entity, 'name') else source_entity.get_iri()}\n\n"
                f"**To:** {target_iri}\n\n"
                f"Select which property in the source entity should reference the target:"
            )
        )

        # Create options for the select widget
        property_options = {}
        for prop_info in object_properties:
            label = f"{prop_info['name']} ({prop_info['type']})"
            if prop_info["description"]:
                label += f" - {prop_info['description']}"
            property_options[label] = prop_info["name"]

        property_select = pn.widgets.Select(name="Property", options=property_options, width=500)

        # Show current value of selected property
        current_value_pane = pn.pane.Markdown("")

        def update_current_value(event):
            """Update the display of current property value."""
            prop_name = event.new
            if prop_name:
                # Use model_dump to get raw value without triggering IRI resolution
                entity_data = source_entity.model_dump()
                current_val = entity_data.get(prop_name, None)
                current_value_pane.object = f"**Current value:** `{current_val}`"

        property_select.param.watch(update_current_value, "value")
        # Trigger initial update
        if property_select.value:
            # Use model_dump to get raw value without triggering IRI resolution
            entity_data = source_entity.model_dump()
            current_val = entity_data.get(property_select.value, None)
            current_value_pane.object = f"**Current value:** `{current_val}`"

        dialog_content.append(property_select)
        dialog_content.append(current_value_pane)

        # Action selection: add to list or replace
        action_select = pn.widgets.RadioButtonGroup(
            name="Action", options=["Append to list", "Replace value"], value="Append to list", width=300
        )
        dialog_content.append(action_select)

        # Buttons
        button_row = pn.Row()

        apply_button = pn.widgets.Button(name="Apply", button_type="primary", width=100)

        cancel_button = pn.widgets.Button(name="Cancel", button_type="default", width=100)

        button_row.append(apply_button)
        button_row.append(cancel_button)
        dialog_content.append(button_row)

        # Store dialog reference
        self._edge_dialog = pn.Card(
            dialog_content, title="Configure Edge Property", width=600, collapsed=False, header_background="#4CAF50"
        )

        # Add dialog to the detail column
        self.oold_detail_col.clear()
        self.oold_detail_col.append(self._edge_dialog)

        # Switch to OO-LD Details tab
        self.detail_tabs.active = 2

        # Define button callbacks
        def on_apply(event):
            """Apply the property change."""
            try:
                prop_name = property_select.value
                action = action_select.value

                # Save state before making changes
                self._save_state()

                # Get current value (use model_dump to avoid IRI resolution)
                entity_data = source_entity.model_dump()
                current_value = entity_data.get(prop_name, None)

                # Find property info to check if it's a list
                prop_info = next((p for p in object_properties if p["name"] == prop_name), None)
                is_list = prop_info["is_list"] if prop_info else False

                if action == "Append to list":
                    if is_list:
                        if current_value is None:
                            new_value = [target_iri]
                        elif isinstance(current_value, list):
                            new_value = [*current_value, target_iri]
                        else:
                            new_value = [current_value, target_iri]
                    else:
                        # Property is not a list, but user wants to append
                        # Convert to list if needed
                        print(f"Warning: Property {prop_name} is not a list type, setting single value")
                        new_value = target_iri
                else:  # Replace value
                    new_value = [target_iri] if is_list else target_iri

                # Set the property
                setattr(source_entity, prop_name, new_value)
                print(f"Set {prop_name} = {new_value}")

                # Full sync to update all data structures
                self._full_sync_after_edit()

                # Close dialog
                self.oold_detail_col.clear()
                self.oold_detail_col.append(pn.pane.Markdown(f"✓ Property **{prop_name}** updated successfully"))

            except Exception as e:
                print(f"Error applying edge property: {e}")
                import traceback

                traceback.print_exc()
                self.oold_detail_col.append(pn.pane.Markdown(f"❌ Error: {e!s}"))

        def on_cancel(event):
            """Cancel and close dialog."""
            # Remove the edge since user cancelled
            self.visjs_edges = [
                e
                for e in self.visjs_edges
                if not (e.get("from") == str(source_entity.get_iri()) and e.get("to") == target_iri)
            ]
            self.visnetwork_panel.edges = self.visjs_edges

            self.oold_detail_col.clear()
            self.oold_detail_col.append(pn.pane.Markdown("Edge creation cancelled"))

        apply_button.on_click(on_apply)
        cancel_button.on_click(on_cancel)

    # ===== Visualization Configuration =====

    def _populate_viz_config_tab(self) -> None:
        """Populate the visualization configuration tab with UI controls."""
        # Discover properties if not cached
        self._discover_available_properties()

        # Clear and rebuild UI
        self.viz_config_col.clear()

        self.viz_config_col.append(pn.pane.Markdown("### Visualization Configuration"))
        self.viz_config_col.append(
            pn.pane.Markdown(
                "Map entity properties to visual properties, then click 'Apply Mappings' to update the visualization."
            )
        )

        # Create mapping controls
        mapping_controls = self._create_mapping_controls()
        self.viz_config_col.append(mapping_controls)

        # Button row with Apply and Reset
        button_row = pn.Row()

        apply_button = pn.widgets.Button(name="Apply Mappings", button_type="primary", width=200)
        apply_button.on_click(self._on_apply_mappings)

        reset_button = pn.widgets.Button(name="Reset All Mappings", button_type="warning", width=200)
        reset_button.on_click(self._on_reset_mappings)

        button_row.append(apply_button)
        button_row.append(reset_button)
        self.viz_config_col.append(button_row)

        # Info section showing current mappings
        self.viz_config_col.append(self._add_mapping_info_section())

    def show_visualization_config(self) -> None:
        """Show visualization configuration UI in the viz config tab."""
        # Populate the tab (will refresh if already populated)
        self._populate_viz_config_tab()

        # Switch to viz config tab (index 3)
        self.detail_tabs.active = 3

    def _discover_available_properties(self) -> None:  # noqa: C901
        """Discover all properties from entity_list and classify their types."""
        if self._available_properties is not None:
            return  # Already cached

        all_properties = set()
        type_samples = {}  # {prop_name: [sample_values]}

        for entity in self.entity_list:
            entity_data = entity.model_dump()
            for prop_name, _field_info in entity.model_fields.items():
                # Skip internal fields
                if prop_name in ["id", "type", "__iris__", "uuid"]:
                    continue

                all_properties.add(prop_name)

                # Collect sample for type classification
                if prop_name not in type_samples:
                    type_samples[prop_name] = []
                value = entity_data.get(prop_name)
                if value is not None:
                    type_samples[prop_name].append(value)

        # Classify types
        for prop_name in all_properties:
            samples = type_samples.get(prop_name, [])
            if not samples:
                self._property_types[prop_name] = "unknown"
                continue

            # Get annotation from first entity that has this field
            annotation = None
            for entity in self.entity_list:
                if prop_name in entity.model_fields:
                    annotation = entity.model_fields[prop_name].annotation
                    break

            # Classify by annotation
            origin = getattr(annotation, "__origin__", None)
            args = getattr(annotation, "__args__", ())

            # Handle Optional[T]
            if origin is Union:
                non_none = [t for t in args if t is not type(None)]
                if non_none:
                    annotation = non_none[0]
                    origin = getattr(annotation, "__origin__", None)

            # Skip lists and complex types
            if origin is list:
                continue

            # Classify
            if annotation in (int, float):
                self._property_types[prop_name] = "numeric"
            elif annotation is bool or (isinstance(annotation, type) and issubclass(annotation, Enum)):
                self._property_types[prop_name] = "categorical"
            else:
                self._property_types[prop_name] = "string"

        # Add special pseudo-property for entity type
        all_properties.add("entity_type")
        self._property_types["entity_type"] = "categorical"

        self._available_properties = {
            prop
            for prop in all_properties
            if prop in self._property_types  # Only include classified properties
        }

    def _create_mapping_controls(self) -> pn.Column:
        """Create dropdown controls for each visual property mapping."""
        controls = pn.Column()

        # Build property options with type labels
        prop_options = {"(None)": None}  # Default option to clear mapping
        for prop_name in sorted(self._available_properties):
            prop_type = self._property_types.get(prop_name, "unknown")
            label = f"{prop_name} ({prop_type})"
            prop_options[label] = prop_name

        # Define visual properties with recommended types
        visual_props = {
            "color": ["categorical", "string", "numeric"],  # numeric for gradient coloring
            "size": ["numeric"],
            "x": ["numeric"],
            "y": ["numeric"],
            "shape": ["categorical", "string"],
        }

        for visual_prop, recommended_types in visual_props.items():
            # Filter to recommended types (but show all if none match)
            recommended_options = {
                label: prop
                for label, prop in prop_options.items()
                if prop is None or self._property_types.get(prop) in recommended_types
            }

            if len(recommended_options) == 1:  # Only "(None)"
                recommended_options = prop_options  # Show all

            # Current mapping
            current_mapping = self.property_mappings.get(visual_prop)
            current_value = "(None)"
            if current_mapping:
                # Find the label for this property
                for label, prop in recommended_options.items():
                    if prop == current_mapping:
                        current_value = label
                        break

            # Create dropdown
            dropdown = pn.widgets.Select(
                name=f"{visual_prop.title()} Property",
                options=list(recommended_options.keys()),
                value=current_value,
                width=400,
            )

            # Store dropdown reference
            self._mapping_dropdowns[visual_prop] = dropdown

            # Don't auto-apply on change - wait for button click
            # Store the options mapping for later use
            if not hasattr(self, "_mapping_options"):
                self._mapping_options = {}
            self._mapping_options[visual_prop] = recommended_options

            controls.append(dropdown)

        return controls

    def _on_apply_mappings(self, event: Any) -> None:
        """Apply the current mapping selections from dropdowns.

        Args:
            event: Button click event
        """
        print("Applying visualization mappings...")

        # Save state for undo
        self._save_state()

        # Read current dropdown values and update mappings
        for visual_prop, dropdown in self._mapping_dropdowns.items():
            label = dropdown.value
            # Get the actual property name from the label
            options = self._mapping_options.get(visual_prop, {})
            source_prop = options.get(label)

            print(f"  {visual_prop} <- {source_prop} (label: '{label}')")
            if source_prop is None and label != "(None)":
                print(f"    WARNING: Could not find property for label '{label}' in options: {list(options.keys())}")
            self.property_mappings[visual_prop] = source_prop

        print(f"Property mappings: {self.property_mappings}")

        # Apply mappings to all nodes
        self._apply_all_mappings()

        # Update visualization using update_nodes for proper reactivity
        self.visnetwork_panel.update_nodes(self.visjs_nodes)

        # Refresh info section
        if len(self.viz_config_col) > 0:
            self.viz_config_col[-1] = self._add_mapping_info_section()

        print("Mappings applied successfully")

    def _apply_all_mappings(self) -> None:  # noqa: C901
        """Apply all active property mappings to all nodes."""
        print("_apply_all_mappings called")
        # Build transformers for each active mapping
        transformers = {}

        if self.property_mappings["size"]:
            transformers["size"] = self._build_size_transformer()
        if self.property_mappings["color"]:
            transformers["color"] = self._build_color_mapper()
        if self.property_mappings["x"]:
            transformers["x"] = self._build_position_transformer("x")
        if self.property_mappings["y"]:
            transformers["y"] = self._build_position_transformer("y")
        if self.property_mappings["shape"]:
            transformers["shape"] = self._build_shape_mapper()

        print(f"Built transformers: {list(transformers.keys())}")

        # Apply to all nodes
        for node in self.visjs_nodes:
            node_iri = node.get("id")
            entity = self.entity_dict.get(node_iri)

            if not entity:
                continue

            entity_data = entity.model_dump()

            # Apply each transformer
            if "size" in transformers:
                prop_name = self.property_mappings["size"]
                value = entity_data.get(prop_name)
                # Only apply size and change shape if value is available
                if value is not None and isinstance(value, (int, float)):
                    node["size"] = transformers["size"](value)
                    # Change shape to "dot" so size is visible (ellipse ignores size)
                    # But don't override if shape mapping is also active
                    if "shape" not in transformers:
                        node["shape"] = "dot"

            if "color" in transformers:
                prop_name = self.property_mappings["color"]
                # Handle special entity_type property
                value = type(entity).__name__ if prop_name == "entity_type" else entity_data.get(prop_name)
                old_color = node.get("color")
                new_color = transformers["color"](value)
                node["color"] = new_color
                print(
                    f"  Node {entity.name if hasattr(entity, 'name') else node_iri}: value={value}, color={old_color} -> {new_color}"
                )

            # Handle position (x, y) together to properly manage 'fixed' flag
            has_x = False
            has_y = False

            if "x" in transformers:
                prop_name = self.property_mappings["x"]
                value = entity_data.get(prop_name)
                if value is not None and isinstance(value, (int, float)):
                    node["x"] = transformers["x"](value)
                    has_x = True
                else:
                    node.pop("x", None)

            if "y" in transformers:
                prop_name = self.property_mappings["y"]
                value = entity_data.get(prop_name)
                if value is not None and isinstance(value, (int, float)):
                    node["y"] = transformers["y"](value)
                    has_y = True
                else:
                    node.pop("y", None)

            # Set fixed flag based on which positions are available
            if "x" in transformers or "y" in transformers:
                if has_x or has_y:
                    # At least one position is set - fix the node
                    node["fixed"] = True
                else:
                    # No positions available - allow free movement
                    node["fixed"] = False

            if "shape" in transformers:
                prop_name = self.property_mappings["shape"]
                # Handle special entity_type property
                value = type(entity).__name__ if prop_name == "entity_type" else entity_data.get(prop_name)
                old_shape = node.get("shape")
                new_shape = transformers["shape"](value)
                node["shape"] = new_shape
                print(
                    f"  Node {entity.name if hasattr(entity, 'name') else node_iri}: type={value}, shape={old_shape} -> {new_shape}"
                )

    def _apply_mappings_to_node(self, node: dict, entity: Any) -> None:
        """Apply current property mappings to a single node.

        Args:
            node: Vis.js node dict to update
            entity: Entity instance to read properties from
        """
        if isinstance(entity, str):
            return  # Skip non-entity nodes

        # Check if property_mappings exists (may not during initial construction)
        if not hasattr(self, "property_mappings"):
            return

        # Only apply if mappings exist
        if not any(self.property_mappings.values()):
            return

        # Reuse apply_all_mappings for consistency
        # (Less efficient but ensures same behavior)
        self._apply_all_mappings()

    def _build_size_transformer(self) -> Callable:
        """Build transformer for property -> size mapping."""
        prop_name = self.property_mappings["size"]

        # Collect all values
        values = []
        for entity in self.entity_list:
            entity_data = entity.model_dump()
            val = entity_data.get(prop_name)
            if val is not None and isinstance(val, (int, float)):
                values.append(val)

        if not values:
            return lambda x: 25  # Default size

        min_val = min(values)
        max_val = max(values)

        if min_val == max_val:
            return lambda x: 25

        # Linear scaling: [min_val, max_val] -> [10, 50]
        def transform(value):
            if value is None or not isinstance(value, (int, float)):
                return 25
            normalized = (value - min_val) / (max_val - min_val)
            return 10 + normalized * 40  # Range: 10-50 pixels

        return transform

    def _build_position_transformer(self, axis: str) -> Callable:
        """Build transformer for property -> x/y position mapping.

        Args:
            axis: "x" or "y"

        Returns:
            Transformation function
        """
        prop_name = self.property_mappings[axis]

        # Collect all values
        values = []
        for entity in self.entity_list:
            entity_data = entity.model_dump()
            val = entity_data.get(prop_name)
            if val is not None and isinstance(val, (int, float)):
                values.append(val)

        if not values:
            return lambda x: 0

        min_val = min(values)
        max_val = max(values)

        if min_val == max_val:
            return lambda x: 0

        # Linear scaling: [min_val, max_val] -> [-200, 200]
        def transform(value):
            if value is None or not isinstance(value, (int, float)):
                return 0
            normalized = (value - min_val) / (max_val - min_val)
            return -200 + normalized * 400  # Range: -200 to 200

        return transform

    def _build_color_mapper(self) -> Callable:  # noqa: C901
        """Build mapper for property -> color mapping."""
        prop_name = self.property_mappings["color"]

        print(f"Building color mapper for property: {prop_name}")

        # Special handling for entity_type property
        if prop_name == "entity_type":
            # Use existing type color mapping
            def map_color(value):
                if value is None:
                    return self._get_color_for_type("Entity")  # Default
                # value is already the entity type name
                return self._get_color_for_type(str(value))

            return map_color

        # Check if property is numeric
        prop_type = self._property_types.get(prop_name, "string")
        print(f"  Property type: {prop_type}")

        if prop_type == "numeric":
            # Collect numeric values to determine range
            numeric_values = []
            for entity in self.entity_list:
                entity_data = entity.model_dump()
                val = entity_data.get(prop_name)
                if val is not None and isinstance(val, (int, float)):
                    numeric_values.append(val)

            print(f"  Found {len(numeric_values)} numeric values: {numeric_values}")

            if not numeric_values:
                # No valid numeric values, return default
                print(f"  WARNING: No numeric values found for property {prop_name}")
                return lambda x: self._get_color_for_type("Entity")

            min_val = min(numeric_values)
            max_val = max(numeric_values)
            print(f"  Range: {min_val} to {max_val}")

            # Use colormap for numeric values
            def map_color(value):
                color = numeric_to_color(value, min_val, max_val, colormap_name="viridis")
                return color

            return map_color

        # Categorical/string properties - use discrete colors
        # Collect unique values
        unique_values = set()
        for entity in self.entity_list:
            entity_data = entity.model_dump()
            val = entity_data.get(prop_name)
            if val is not None:
                # Handle Enum
                if isinstance(val, Enum):
                    val = val.value
                # Handle lists (use first value)
                if isinstance(val, list) and val:
                    val = val[0]
                unique_values.add(str(val))

        # Assign colors
        value_to_color = {}
        for i, value in enumerate(sorted(unique_values)):
            color = self._predefined_colors[i % len(self._predefined_colors)]
            value_to_color[value] = color

        def map_color(value):
            if value is None:
                return self._get_color_for_type("Entity")  # Default

            # Handle Enum
            if isinstance(value, Enum):
                value = value.value
            # Handle lists
            if isinstance(value, list) and value:
                value = value[0]

            return value_to_color.get(str(value), self._predefined_colors[0])

        return map_color

    def _build_shape_mapper(self) -> Callable:  # noqa: C901
        """Build mapper for property -> shape mapping."""
        prop_name = self.property_mappings["shape"]

        print(f"Building shape mapper for property: {prop_name}")

        # Available shapes in vis.js - ordered for visual distinction
        available_shapes = ["ellipse", "box", "diamond", "star", "triangle", "triangleDown", "square", "hexagon"]

        # Special handling for entity_type property
        if prop_name == "entity_type":
            # Build type-to-shape mapping
            entity_types = {type(entity).__name__ for entity in self.entity_list}
            type_to_shape = {}
            for i, entity_type in enumerate(sorted(entity_types)):
                shape = available_shapes[i % len(available_shapes)]
                type_to_shape[entity_type] = shape

            print(f"  Entity type to shape mapping: {type_to_shape}")

            def map_shape(value):
                if value is None:
                    return "ellipse"  # Default
                # value is already the entity type name
                result = type_to_shape.get(str(value), "ellipse")
                return result

            return map_shape

        # Collect unique values
        unique_values = set()
        for entity in self.entity_list:
            entity_data = entity.model_dump()
            val = entity_data.get(prop_name)
            if val is not None:
                if isinstance(val, Enum):
                    val = val.value
                if isinstance(val, list) and val:
                    val = val[0]
                unique_values.add(str(val))

        # Assign shapes
        value_to_shape = {}
        for i, value in enumerate(sorted(unique_values)):
            shape = available_shapes[i % len(available_shapes)]
            value_to_shape[value] = shape

        def map_shape(value):
            if value is None:
                return "ellipse"  # Default

            if isinstance(value, Enum):
                value = value.value
            if isinstance(value, list) and value:
                value = value[0]

            return value_to_shape.get(str(value), "ellipse")

        return map_shape

    def _on_reset_mappings(self, event: Any) -> None:
        """Reset all mappings to defaults.

        Args:
            event: Button click event
        """
        # Save state for undo
        self._save_state()

        # Clear all mappings
        for visual_prop in self.property_mappings:
            self.property_mappings[visual_prop] = None

        # Reset dropdowns
        for dropdown in self._mapping_dropdowns.values():
            dropdown.value = "(None)"

        # Revert to default visual properties
        for node in self.visjs_nodes:
            node_iri = node.get("id")
            entity = self.entity_dict.get(node_iri)

            if entity:
                entity_type_name = type(entity).__name__
                # Restore defaults
                node["color"] = self._get_color_for_type(entity_type_name)
                node["shape"] = "ellipse"
                node.pop("size", None)
                node.pop("x", None)
                node.pop("y", None)
                node["fixed"] = False

        # Update visualization using update_nodes for proper reactivity
        self.visnetwork_panel.update_nodes(self.visjs_nodes)

        # Refresh info section (if viz config tab is populated)
        if len(self.viz_config_col) > 0:
            self.viz_config_col[-1] = self._add_mapping_info_section()

        print("All mappings reset to defaults")

    def _add_mapping_info_section(self) -> pn.Column:
        """Create info section showing active mappings."""
        info = pn.Column()

        info.append(pn.pane.Markdown("### Active Mappings"))

        active_mappings = [
            f"- **{visual_prop.title()}**: {source_prop or '(None)'}"
            for visual_prop, source_prop in self.property_mappings.items()
        ]

        if any(self.property_mappings.values()):
            info.append(pn.pane.Markdown("\n".join(active_mappings)))
        else:
            info.append(pn.pane.Markdown("*No active mappings - using default visualization*"))

        return info

    def _generate_unique_name(self, base_name: str) -> str:
        """Generate a unique name by appending _copy, _copy_2, etc.

        Args:
            base_name: The base name to make unique

        Returns:
            A unique name not used by any existing entity
        """
        # Get all existing names
        existing_names = set()
        for entity in self.entity_list:
            if hasattr(entity, "name"):
                existing_names.add(entity.name)

        # Try base_name_copy, base_name_copy_2, etc.
        candidate = f"{base_name}_copy"
        counter = 2
        while candidate in existing_names:
            candidate = f"{base_name}_copy_{counter}"
            counter += 1

        return candidate

    def on_oold_tabulator_cell_edit(self, event: Any) -> None:
        """Callback when a cell is edited in the OO-LD comparison table.

        Updates the specific entity and syncs all data structures.

        Args:
            event: Panel event with row, column, value
        """
        try:
            row_index = event.row
            column = event.column
            value = event.value

            # Get entity IRI from hidden column
            row_data = self.oold_comparison_tabulator.value.iloc[row_index]
            entity_iri = row_data["_iri"]

            # Get entity
            entity = self.entity_dict[entity_iri]

            # Deserialize and set property
            deserialized = self._deserialize_property_value(entity, column, value)
            setattr(entity, column, deserialized)

            print(f"Updated {entity_iri} property '{column}' to: {deserialized}")

            # Full sync
            self._full_sync_after_edit()

        except Exception as e:
            print(f"Error updating entity: {e}")
            import traceback

            traceback.print_exc()
            # Revert to current state
            self._refresh_oold_tabulators()

    def on_oold_set_all_cell_edit(self, event: Any) -> None:
        """Callback when a cell is edited in the OO-LD set-all table.

        Updates ALL selected entities and syncs all data structures.

        Args:
            event: Panel event with column, value
        """
        try:
            column = event.column
            value = event.value

            print(f"Setting property '{column}' to '{value}' for all selected entities")

            # Update all selected entities
            for node_id in self._current_selected_node_ids:
                if node_id in self.entity_dict:
                    entity = self.entity_dict[node_id]
                    deserialized = self._deserialize_property_value(entity, column, value)
                    setattr(entity, column, deserialized)
                    print(f"  Updated {node_id}")

            # Full sync
            self._full_sync_after_edit()

        except Exception as e:
            print(f"Error updating entities: {e}")
            import traceback

            traceback.print_exc()
            # Revert to current state
            self._refresh_oold_tabulators()

    def on_create_entity_click(self, event: Any) -> None:
        """Callback when the 'Create Entity' button is clicked.

        Shows a JSON editor for creating a new entity of the selected type.

        Args:
            event: Button click event
        """
        try:
            if not hasattr(self, "new_entity_type_select") or not hasattr(self, "_new_entity_node_id"):
                return

            # Get selected entity type
            entity_type_name = self.new_entity_type_select.value
            entity_type = self.entity_types[entity_type_name]

            # Clear the column and show editor
            self.oold_detail_col.clear()
            self.oold_detail_col.append(pn.pane.Markdown(f"### Create New {entity_type_name}"))

            # Create a default instance with minimal required fields
            default_values = {}

            # Add uuid field (required for Entity)
            if "uuid" in entity_type.model_fields:
                default_values["uuid"] = str(uuid.uuid4())

            # Check if 'name' field exists and add a default
            if "name" in entity_type.model_fields:
                default_values["name"] = f"New{entity_type_name}"

            # Create JSON editor with schema
            self.new_entity_editor = pn.widgets.JSONEditor(
                value=default_values,
                schema=entity_type.export_schema(),
                width=700,
                height=500,
                mode="code",  # Use code mode for better typing experience
            )

            # Save button
            self.new_entity_save_button = pn.widgets.Button(name="Save Entity", button_type="primary", width=150)
            self.new_entity_save_button.on_click(self.on_new_entity_save)

            # Cancel button
            self.new_entity_cancel_button = pn.widgets.Button(name="Cancel", button_type="default", width=150)
            self.new_entity_cancel_button.on_click(self.on_new_entity_cancel)

            # Store entity type for save handler
            self._new_entity_type = entity_type

            # Add UI elements
            self.oold_detail_col.append(self.new_entity_editor)
            self.oold_detail_col.append(pn.Row(self.new_entity_save_button, self.new_entity_cancel_button))

        except Exception as e:
            print(f"Error creating entity editor: {e}")
            import traceback

            traceback.print_exc()
            self.oold_detail_col.append(pn.pane.Markdown(f"*Error: {e}*"))

    def on_new_entity_save(self, event: Any) -> None:
        """Callback when the 'Save Entity' button is clicked.

        Creates the new entity, adds it to all data structures, and updates the visualization.

        Args:
            event: Button click event
        """
        try:
            if not hasattr(self, "new_entity_editor") or not hasattr(self, "_new_entity_type"):
                return

            # Get the entity data from editor
            entity_data = self.new_entity_editor.value
            entity_type = self._new_entity_type

            print(f"Creating new entity of type {entity_type.__name__}: {entity_data}")

            # Create the entity instance
            new_entity = entity_type(**entity_data)
            entity_iri = str(new_entity.get_iri())

            # Add to entity_list and entity_dict
            self.entity_list.append(new_entity)
            self.entity_dict[entity_iri] = new_entity

            # Create visjs node for the new entity
            node_label = entity_data.get("name", entity_iri)
            entity_type_name = entity_type.__name__
            new_visjs_node = {
                "id": entity_iri,
                "label": node_label,
                "shape": "ellipse",
                "entity_type": entity_type_name,  # metadata for duplication
                "color": self._get_color_for_type(entity_type_name),
            }
            self.visjs_nodes.append(new_visjs_node)

            print(f"Created new entity with IRI: {entity_iri}")

            # Save state after entity creation
            self._save_state()

            # Invalidate property cache since entities changed
            self._available_properties = None

            # Full sync to update RDF graph and edges
            self._full_sync_after_edit()

            # Clear the creation UI and show success message
            self.oold_detail_col.clear()
            self.oold_detail_col.append(pn.pane.Markdown(f"### ✓ Entity Created Successfully\n\nIRI: `{entity_iri}`"))
            self.oold_detail_col.append(
                pn.pane.Markdown(f"The new {entity_type.__name__} has been added to the graph.")
            )

        except Exception as e:
            print(f"Error saving new entity: {e}")
            import traceback

            traceback.print_exc()
            self.oold_detail_col.clear()
            self.oold_detail_col.append(pn.pane.Markdown(f"### Error Creating Entity\n\n```\n{e!s}\n```"))

    def on_new_entity_cancel(self, event: Any) -> None:
        """Callback when the 'Cancel' button is clicked during entity creation.

        Clears the creation UI.

        Args:
            event: Button click event
        """
        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown("### Entity creation cancelled"))


if __name__ == "__main__":
    ## a list of OO-LD objects
    from enum import Enum
    from typing import Any, Optional

    from oold.model import LinkedBaseModel
    from pydantic import ConfigDict, Field

    class Hobby(Entity):
        """A simple Hobby schema"""

        model_config = ConfigDict(
            json_schema_extra={
                "@context": [
                    "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",  # import the context of the parent class
                    {
                        # object property definition
                        "name": {"@id": "ex:name"}
                    },
                ],
                "iri": "https://example.com/hobby_id",
                "defaultProperties": ["type", "name"],
            }
        )
        type: str = "https://example.com/hobby_id"

    sports = Hobby(uuid=str(uuid.uuid4()), name="Sports")
    music = Hobby(uuid=str(uuid.uuid4()), name="Music")
    art = Hobby(uuid=str(uuid.uuid4()), name="Art")

    class HobbyEnum(str, Enum):
        """Various hobbies as an enum."""

        SPORTS = sports.id
        """Sports hobby, e.g. football, basketball, etc."""
        MUSIC = music.id
        """Music hobby, e.g. playing instruments, singing, etc."""
        ART = art.id
        """Art hobby, e.g. painting, drawing, etc."""

    class Profession(Entity):
        """A simple Profession schema"""

        model_config = ConfigDict(
            json_schema_extra={
                "@context": [
                    "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",  # import the context of the parent class
                    {
                        # object property definition
                        "name": {"@id": "ex:name"}
                    },
                ],
                "iri": "https://example.com/profession_id",
                "defaultProperties": ["type", "name"],
            }
        )
        type: str = "https://example.com/profession_id"

    engineer = Profession(uuid=str(uuid.uuid4()), name="Engineer")
    teacher = Profession(uuid=str(uuid.uuid4()), name="Teacher")
    doctor = Profession(uuid=str(uuid.uuid4()), name="Doctor")
    artist = Profession(uuid=str(uuid.uuid4()), name="Artist")
    scientist = Profession(uuid=str(uuid.uuid4()), name="Scientist")

    class ProfessionEnum(str, Enum):
        """Various professions as an enum."""

        ENGINEER = engineer.id
        """Engineering profession"""
        TEACHER = teacher.id
        """Teaching profession"""
        DOCTOR = doctor.id
        """Medical profession"""
        ARTIST = artist.id
        """Artistic profession"""
        SCIENTIST = scientist.id
        """Scientific profession"""

    class Person(Entity):
        """A simple Person schema"""

        model_config = ConfigDict(
            json_schema_extra={
                "@context": [
                    "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",  # import the context of the parent class
                    {
                        # object property definition
                        "hobbies": {
                            "@id": "ex:hobbies",
                            "@type": "@id",
                        },
                        "profession": {
                            "@id": "ex:profession",
                            "@type": "@id",
                        },
                        "knows": {
                            "@id": "schema:knows",
                            "@type": "@id",
                            "@container": "@set",
                        },
                        "age": {"@id": "ex:HasAge"},
                        "body_weight": {"@id": "ex:HasBodyWeight"},
                    },
                ],
                "iri": "Person.json",
                "defaultProperties": ["type", "name", "hobbies", "profession"],
            }
        )
        type: Optional[str] = "ex:Person.json"
        hobbies: Optional[list[HobbyEnum]] = None
        """interests of the person, e.g. sports, music, art"""
        profession: Optional[ProfessionEnum] = Field(
            None,
            description="Profession of the person",
        )
        knows: Optional[list["Person"]] = Field(
            None,
            # object property pointing to another Person
            json_schema_extra={"range": "Person.json"},
        )
        age: Optional[int] = Field(
            None,
            description="Age of the person",
        )
        body_weight: Optional[float] = Field(
            None,
            description="Body weight of the person in kg",
        )

    alice = Person(
        uuid=str(uuid.uuid4()),
        name="Alice",
        hobbies=[HobbyEnum.SPORTS, HobbyEnum.MUSIC],
        profession=ProfessionEnum.ENGINEER,
        age=41,
        body_weight=68.5,
    )
    bob = Person(
        uuid=str(uuid.uuid4()),
        name="Bob",
        hobbies=[HobbyEnum.ART],
        profession=ProfessionEnum.ARTIST,
        knows=[alice],
        age=35,
        body_weight=82.3,
    )
    charlie = Person(
        uuid=str(uuid.uuid4()),
        name="Charlie",
        hobbies=[HobbyEnum.SPORTS],
        profession=ProfessionEnum.TEACHER,
        knows=[alice, bob],
        age=28,
        body_weight=75.0,
    )
    david = Person(
        uuid=str(uuid.uuid4()),
        name="David",
        hobbies=[HobbyEnum.MUSIC],
        profession=ProfessionEnum.SCIENTIST,
        knows=[charlie],
        age=22,
        body_weight=70.2,
    )
    eve = Person(
        uuid=str(uuid.uuid4()),
        name="Eve",
        hobbies=[HobbyEnum.ART, HobbyEnum.MUSIC],
        profession=ProfessionEnum.DOCTOR,
        knows=[david, alice, bob],
        age=30,
        body_weight=63.8,
    )
    alice.knows = [bob.get_iri(), charlie.get_iri(), eve.get_iri()]

    example_oold_list = [
        alice,
        bob,
        charlie,
        david,
        eve,
        sports,
        music,
        art,
        engineer,
        teacher,
        doctor,
        artist,
        scientist,
        # Person, ## TODO: Classes currently cannot be referenced -> therefore not includable in graph
    ]

    # Define available entity types for creation
    available_entity_types = {
        "Person": Person,
        "Hobby": Hobby,
        "Profession": Profession,
        "Entity": Entity,
    }

    # Optional: Define custom colors for entity types
    # If not provided, colors will be generated automatically
    custom_type_colors = {
        "Person": "#4A90E2",  # Blue
        "Hobby": "#50C878",  # Emerald green
        "Profession": "#F39C12",  # Orange
        # Other types will get auto-generated colors
    }

    # build graph tool and show it
    graph_detail_panel = OOLDGraphDetailTool(
        entity_list=example_oold_list,
        entity_types=available_entity_types,
        # type_colors=custom_type_colors  # Uncomment to use custom colors
    )
    pn.serve(graph_detail_panel, threaded=True)
