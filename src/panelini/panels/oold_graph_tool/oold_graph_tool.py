## uv pip install "git+https://github.com/opensemanticworld/panelini.git@feat-visnetwork-incremental-updates"

import json
import math
import uuid
from enum import Enum
from pathlib import Path
from typing import Any, Callable, ClassVar, Optional, Union

import matplotlib.colors as mcolors
import matplotlib.pyplot as plt
import pandas as pd
import panel as pn
from oold.model import LinkedBaseModel
from pydantic import ConfigDict, Field, model_validator
from rdflib import Graph as RDFGraph
from rdflib.namespace import RDF
from rdflib.term import Literal as RDFLiteral
from rdflib.term import URIRef

from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.monacoeditor import MonacoEditor
from panelini.panels.oold_graph_tool.entity_adapter import (
    EntityAdapter,
    adapt_entity,
    adapt_type,
    is_schema_dict,
    register_pydantic_hierarchy,
)
from panelini.panels.oold_graph_tool.oold_schema import (
    MISSING,
    OOLDSchemaIntrospector,
    build_context_from_schema,
)
from panelini.panels.visnetwork import GraphDetailTool, VisNetwork

pn.extension("tabulator")  # For tables
pn.extension("jsoneditor")  # For viewing/editing node details (parent class)

# ── OO-LD meta-schema (for Monaco validation of class/schema nodes) ───────────
_META_SCHEMA_PATH = Path(__file__).parent / "meta" / "oold-meta-schema.json"
_OOLD_META_SCHEMA: dict = (
    json.loads(_META_SCHEMA_PATH.read_text(encoding="utf-8")) if _META_SCHEMA_PATH.exists() else {}
)

# ── Class-graph colour palette (shared with _build_class_graph) ────────────────
_CLS_NODE_COLOR = "#9B59B6"  # purple  --LinkedBaseModel subclass
_FIELD_NODE_COLOR = "#BDC3C7"  # silver  --field descriptor
_ATTR_VAL_NODE_COLOR = "#F39C12"  # orange  --default / description / constraint values
_ISA_EDGE_COLOR = "#e74c3c"  # red     --IsA / HasRange
_HAS_TYPE_EDGE_COLOR = "#888888"  # gray    --HasType

_PRIMITIVES_OOLD = (str, int, float, bool, type(None), dict, list, tuple, set)
_MAX_LABEL = 80
_SKIP_FIELDS = {"type", "uuid", "id", "initialized_from"}  # fields excluded from "Create:" menu


def _truncate(s: str) -> str:
    s = str(s)
    return s[:_MAX_LABEL] + "..." if len(s) > _MAX_LABEL else s


def _ann_label(ann: Any) -> str:
    """Human-readable label for a type annotation."""
    if ann is None:
        return "None"
    if hasattr(ann, "__name__"):
        return ann.__name__
    s = str(ann)
    for prefix in ("typing.", "builtins."):
        s = s.replace(prefix, "")
    return _truncate(s)


def _cls_node_id(cls_or_schema: Any) -> str:
    """Stable visjs node ID for a class or schema dict.

    Accepts either a pydantic class or an OO-LD schema dict.
    Returns the IRI ($id/iri) if declared, else 'class:<Name>'.
    """
    if isinstance(cls_or_schema, dict):
        iri = cls_or_schema.get("$id") or cls_or_schema.get("iri")
        if iri:
            return str(iri)
        title = cls_or_schema.get("title", "Unknown")
        return f"class:{title}"
    try:
        extra = cls_or_schema.model_config.get("json_schema_extra", {})  # type: ignore[attr-defined]
        if isinstance(extra, dict):
            iri = extra.get("iri")
            if iri:
                return str(iri)
    except AttributeError:
        pass
    return f"class:{cls_or_schema.__name__}"


def _infer_je_schema(val: Any) -> dict:
    """Infer a json-editor-compatible schema for a single value.

    Used to build schemas for the field-edit form so that json-editor
    treats JSON Schema keywords in the *value* as plain data.
    """
    if val is None:
        return {"anyOf": [{"type": "string"}, {"type": "null"}]}
    if isinstance(val, bool):
        return {"type": "boolean"}
    if isinstance(val, int):
        return {"type": "integer"}
    if isinstance(val, float):
        return {"type": "number"}
    if isinstance(val, str):
        return {"type": "string"}
    if isinstance(val, list):
        if val and isinstance(val[0], dict):
            return {
                "type": "array",
                "format": "table",
                "items": {
                    "type": "object",
                    "additionalProperties": True,
                },
            }
        return {"type": "array", "items": {"type": "string"}}
    if isinstance(val, dict):
        sub: dict[str, Any] = {}
        for k, v in val.items():
            sub[k] = _infer_je_schema(v)
        return {"type": "object", "properties": sub, "additionalProperties": True}
    return {"type": "string"}


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
                "initialized_from": {"@id": "ex:InitializedFrom", "@type": "@id"},
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


class ExpansionStep(Entity):
    relations: list[str] = Field(
        description="List of relation names (e.g. field names or property names) to expand at this step"
    )

    iter_limit: Optional[int] = Field(
        None,
        description="Maximum number of iterations to apply this expansion step. If "
        "None, apply until no new nodes are found.",
    )


class SingleNodeExpansionPolicy(Entity):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    root_node: Any = Field(
        description="The root node from which expansion starts. "
        "Pass an Entity instance to start BFS from that instance, "
        "or a LinkedBaseModel subclass to start from the class node."
    )
    expansion_steps: list[ExpansionStep] = Field(
        description="List of expansion steps to apply after each other for expanding the graph from the root node"
    )


class MultiExpansionPolicy(Entity):
    expansion_policies: list[SingleNodeExpansionPolicy] = Field(
        description="""
List of policies for how to expand nodes in the graph. Union of nodes expanded by all policies will be shown when a node is expanded. If empty, no additional nodes will be shown on expansion."""
    )


class OOLDGraphConfig(Entity):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
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
        },
    )
    entity_list: list[Any]  # Entity instances, plain dicts, or bare classes/schemas
    entity_types: Optional[list[Any]] = None
    type_colors: Optional[dict[str, str]] = None
    expansion_policy: Union[SingleNodeExpansionPolicy, MultiExpansionPolicy] = Field(
        None,
        description=(
            "Policy for how to expand nodes in the graph visualization. "
            "If None, all available information from the entities will be used to build the graph, "
            "however it is recommended to use a policy to limit the amount of information shown."
        ),
    )


class EdgeLabelConfig(Enum):
    """Configuration options for edge labels in the graph visualization."""

    RDF = "rdf"
    """Use RDF predicates as edge labels."""

    JSON_KEYS = "json_keys"  ## in implementation use json-ld @vobab
    """Use custom labels defined in the data model or visualization configuration."""


class OOLDGraphDetailTool(GraphDetailTool):
    def __init__(  # noqa: C901
        self,
        config: OOLDGraphConfig,
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
        # Extract fields from config
        entity_list = config.entity_list
        entity_types = config.entity_types
        type_colors = config.type_colors
        self.expansion_policy = config.expansion_policy

        # ── Build schema registry and convert entity_types ──────────────
        self.schema_registry: dict[str, dict] = {}

        # Convert explicit entity_types (pydantic classes or schema dicts)
        converted_types: dict[str, dict] = {}
        _pydantic_classes: list[type] = []
        if entity_types is not None:
            for type_input in entity_types:
                if isinstance(type_input, type) and hasattr(type_input, "export_schema"):
                    _pydantic_classes.append(type_input)
                type_name, schema = adapt_type(type_input)
                converted_types[type_name] = schema
                self.schema_registry[type_name] = schema
                iri = schema.get("$id") or schema.get("iri")
                if iri:
                    self.schema_registry[iri] = schema

            # Auto-register @context string URL aliases for schema resolution
            for schema in converted_types.values():
                ctx = schema.get("@context") if isinstance(schema, dict) else None
                if isinstance(ctx, list):
                    for entry in ctx:
                        if isinstance(entry, str) and entry not in self.schema_registry:
                            for s in converted_types.values():
                                if (s.get("$id") or s.get("iri")) == entry:
                                    self.schema_registry[entry] = s
                                    break

        # ── Split entity_list into instances and bare classes/schemas ────
        _schema_extras: dict[str, dict] = {}
        _instances: list = []
        for item in entity_list:
            if isinstance(item, type) and hasattr(item, "export_schema"):
                _pydantic_classes.append(item)
                tname, tschema = adapt_type(item)
                _schema_extras[tname] = tschema
                self.schema_registry[tname] = tschema
                iri = tschema.get("$id") or tschema.get("iri")
                if iri:
                    self.schema_registry[iri] = tschema
            elif isinstance(item, dict) and is_schema_dict(item):
                tname, tschema = adapt_type(item)
                _schema_extras[tname] = tschema
                self.schema_registry[tname] = tschema
                iri = tschema.get("$id") or tschema.get("iri")
                if iri:
                    self.schema_registry[iri] = tschema
            else:
                _instances.append(item)

        # Collect pydantic classes from instances
        for item in _instances:
            if hasattr(item, "export_schema") and isinstance(item, type) is False:
                _pydantic_classes.append(type(item))

        # Enrich all pydantic schemas with $id and allOf AFTER all schemas
        # are in the registry (so enrichments aren't overwritten by adapt_type)
        for cls in _pydantic_classes:
            register_pydantic_hierarchy(cls, self.schema_registry)

        # Convert instances to EntityAdapter
        self.entity_list: list[EntityAdapter] = [adapt_entity(item, self.schema_registry) for item in _instances]
        self.entity_dict: dict[str, EntityAdapter] = {adapter.get_iri(): adapter for adapter in self.entity_list}

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

        # Store entity_types as dict[str, dict] (schema dicts)
        self.entity_types: dict[str, dict] = dict(converted_types) if converted_types else {}
        for entity in self.entity_list:
            if entity.type_name not in self.entity_types and entity.schema:
                self.entity_types[entity.type_name] = entity.schema
        for name, schema in _schema_extras.items():
            self.entity_types.setdefault(name, schema)

        self.introspector = OOLDSchemaIntrospector(self.schema_registry)

        # Undo/Redo stacks for tracking history
        self.undo_stack = []
        self.redo_stack = []
        self.max_history = 50  # Maximum number of undo states to keep

        self.rdf_graph = RDFGraph()

        for element in self.entity_list:
            print(f"Parsing entity {element} with IRI {element.get_iri()} into RDF graph")
            jsonld_doc = element.to_jsonld()
            self.rdf_graph.parse(data=json.dumps(jsonld_doc), format="json-ld")

        self._build_iri_maps()

        ### transform python-classes/instances to visjs nodes/edges
        self.visjs_nodes = []
        self.visjs_edges = []

        show_literals = False
        show_whole_graph = False

        def add_node_by_id(id_str: str):
            id_str = str(id_str)
            oold_obj = self.entity_dict.get(id_str, id_str)

            if oold_obj is not None:
                label = oold_obj.name if isinstance(oold_obj, EntityAdapter) else id_str

                # Store entity type name as metadata for duplication
                entity_type_name = oold_obj.type_name if isinstance(oold_obj, EntityAdapter) else "Entity"

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

        for id_str in self.entity_dict:
            add_node_by_id(id_str)

        ## add all edges between the nodes based on the relations in the OO-LD objects
        available_ids = {node["id"] for node in self.visjs_nodes}
        self._build_rdf_edges(available_ids)

        # Add class hierarchy (IsA / definesProperty / HasType) on top of instance graph
        self._build_class_graph()

        # Store the complete (fully-expanded) graph for expand-menu computation
        self._full_visjs_nodes: list[dict] = [dict(n) for n in self.visjs_nodes]
        self._full_visjs_edges: list[dict] = [dict(e) for e in self.visjs_edges]

        # Compute visibility after _full_visjs_edges is built so policy BFS can
        # traverse any edge label (IsA, HasType, knows, …) generically.
        # _visible_edge_keys restricts which edges are shown --only those
        # traversed by the BFS, not all edges between visible nodes.
        vis_nodes, vis_edges = self._compute_initial_visibility()
        self._visible_node_ids: Optional[set[str]] = vis_nodes
        self._visible_edge_keys: Optional[set[tuple]] = vis_edges

        # Apply visibility filter (no-op when _visible_node_ids is None)
        self._apply_visibility_filter_inplace()

        # Create OO-LD tab columns BEFORE super().__init__ (which calls build_panel)
        self.oold_detail_col = pn.Column(sizing_mode="stretch_both")
        self.text_col = pn.Column(sizing_mode="stretch_width")
        self.viz_config_col = pn.Column(sizing_mode="stretch_width")
        self.query_col = pn.Column(sizing_mode="stretch_both")

        # Property mapping state
        self.property_mappings = {"color": None, "size": None, "x": None, "y": None, "shape": None}
        self._available_properties = None  # Cache
        self._property_types = {}  # Cache: {prop_name: "numeric"|"categorical"|"string"}
        self._mapping_dropdowns = {}  # UI widgets

        super().__init__(nodes=self.visjs_nodes, edges=self.visjs_edges)

        # Populate visualization config tab
        self._populate_viz_config_tab()

        # Populate query tab
        self._init_query_tab()

    def build_panel(self) -> None:
        """Override to add nodes_duplicated_callback to VisNetwork."""
        # Call parent to set up buttons and structure
        super().build_panel()

        # -- Persistent widgets for OO-LD Form tab (reused across node clicks) --
        self.oold_detail_col.clear()
        self.text_col.clear()

        self._oold_header = pn.pane.Markdown("")
        self.current_node_oold_editor = JsonEditor(
            value={},
            options={"schema": {"type": "object", "properties": {}}, "startval": {}},
            compact=True,
            sizing_mode="stretch_both",
            styles={"flex": "1 1 auto", "min-height": "0", "overflow-y": "auto"},
        )
        self._oold_apply_btn = pn.widgets.Button(name="Apply Changes", button_type="primary", width=150)
        self._oold_apply_btn.on_click(self._on_oold_form_apply)
        self._oold_jump_btn = pn.widgets.Button(
            name="Jump to Defining Schema", button_type="default", width=200, visible=False
        )
        self._oold_jump_btn.on_click(
            lambda _: self.show_node_details(getattr(self, "_oold_jump_target", None))
            if getattr(self, "_oold_jump_target", None)
            else None
        )
        self._oold_jump_target = None
        self._oold_btn_row = pn.Row(
            self._oold_apply_btn,
            self._oold_jump_btn,
            styles={"flex": "0 0 auto", "margin-top": "auto"},
        )
        self.oold_detail_col.extend([self._oold_header, self.current_node_oold_editor, self._oold_btn_row])

        # -- Persistent widgets for Text tab --
        self.current_text_editor = MonacoEditor(
            value="{}",
            language="json",
            height=600,
        )
        self.text_apply_button = pn.widgets.Button(name="Apply Changes", button_type="primary", width=150)
        self.text_apply_button.on_click(self._on_text_apply)
        self.text_col.extend([self.current_text_editor, self.text_apply_button])

        # Re-append OO-LD tabs (parent build_panel recreates detail_tabs)
        self.detail_tabs.append(("OO-LD Form", self.oold_detail_col))
        self.detail_tabs.append(("Text", self.text_col))
        self.detail_tabs.append(("Visualization Config", self.viz_config_col))

        # -- Query tab widgets --
        self._query_editor = JsonEditor(
            value={},
            options={"schema": {"type": "object", "properties": {}}, "startval": {}},
            compact=True,
            sizing_mode="stretch_both",
            styles={"flex": "1 1 auto", "min-height": "0", "overflow-y": "auto"},
        )
        self._query_apply_btn = pn.widgets.Button(
            name="Apply Query",
            button_type="primary",
            width=150,
        )
        self._query_apply_btn.on_click(self._on_query_apply)
        self._query_show_all_btn = pn.widgets.Button(
            name="Show All",
            button_type="warning",
            width=150,
        )
        self._query_show_all_btn.on_click(self._on_query_show_all)
        self._query_status = pn.pane.Markdown("")
        self._query_btn_row = pn.Row(
            self._query_apply_btn,
            self._query_show_all_btn,
            styles={"flex": "0 0 auto", "margin-top": "auto"},
        )
        self.query_col.extend([
            pn.pane.Markdown("### Graph Query"),
            self._query_editor,
            self._query_btn_row,
            self._query_status,
        ])
        self.detail_tabs.append(("Query", self.query_col))
        self._init_query_tab()

        # Add undo/redo buttons to edit row
        self.undo_button = pn.widgets.Button(name="↶ Undo (Ctrl+Z)", button_type="default", width=150)
        self.undo_button.on_click(lambda event: self.undo())

        self.redo_button = pn.widgets.Button(name="↷ Redo (Ctrl+Y)", button_type="default", width=150)
        self.redo_button.on_click(lambda event: self.redo())

        # Add undo/redo buttons to edit row
        self.edit_row.append(self.undo_button)
        self.edit_row.append(self.redo_button)

        # Recreate VisNetwork with duplication, edge creation, and context-menu callbacks
        self.visnetwork_panel = VisNetwork(
            nodes=self.nodes,
            edges=self.edges,
            network_event_callback=self.network_event_callback,
            nodes_duplicated_callback=self.on_nodes_duplicated,
            node_created_callback=self._on_node_created,
            edge_created_callback=self.on_edge_created,
            context_menu_callback=self._on_context_menu_item,
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

        Creates a deep copy of entity_list and a copy of _visible_node_ids.
        Clears redo stack when new state is saved.
        """
        try:
            state_snapshot = {
                "entities": [e.deep_copy() for e in self.entity_list],
                "visible_node_ids": (set(self._visible_node_ids) if self._visible_node_ids is not None else None),
                "visible_edge_keys": (set(self._visible_edge_keys) if self._visible_edge_keys is not None else None),
            }
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

    def _current_state_snapshot(self) -> dict:
        """Return a snapshot dict of the current state (for undo/redo stacks)."""
        return {
            "entities": [e.deep_copy() for e in self.entity_list],
            "visible_node_ids": (set(self._visible_node_ids) if self._visible_node_ids is not None else None),
            "visible_edge_keys": (set(self._visible_edge_keys) if self._visible_edge_keys is not None else None),
        }

    def _restore_state(self, state: dict | list) -> None:
        """Restore entity_list (and optionally _visible_node_ids) from a snapshot.

        Accepts both the new dict format and the legacy list format for robustness.
        """
        try:
            if isinstance(state, dict):
                entities = state["entities"]
                self._visible_node_ids = state.get("visible_node_ids", None)
                raw_ek = state.get("visible_edge_keys", None)
                self._visible_edge_keys = set(raw_ek) if raw_ek is not None else None
            else:
                # Legacy format: plain list
                entities = state
                # Keep _visible_node_ids as-is
                self._visible_edge_keys = None

            self.entity_list = [e.deep_copy() for e in entities]
            self.entity_dict = {e.get_iri(): e for e in self.entity_list}
            self._rebuild_visualization()

            print(f"State restored. Entity count: {len(self.entity_list)}")
        except Exception as e:
            print(f"Error restoring state: {e}")
            import traceback

            traceback.print_exc()

    def _rebuild_visualization(self) -> None:
        """Rebuild entire visualization from entity_list.

        Recreates nodes, RDF graph, and edges from scratch.
        Builds the full graph first, then applies the visibility filter.
        """
        # Build ALL entity nodes (no visibility filter yet)
        self.visjs_nodes = []
        self.visjs_edges = []

        for entity in self.entity_list:
            iri = entity.get_iri()
            label = entity.name
            entity_type_name = entity.type_name
            node = {
                "id": iri,
                "label": label,
                "shape": "ellipse",
                "entity_type": entity_type_name,
                "color": self._get_color_for_type(entity_type_name),
            }
            self.visjs_nodes.append(node)

        # Temporarily seed _full_visjs_nodes with entity nodes so that
        # _rebuild_visjs_edges() (which uses _full_visjs_nodes) can build
        # the class hierarchy correctly.
        self._full_visjs_nodes = [dict(n) for n in self.visjs_nodes]

        # Rebuild RDF graph and all edges (includes class hierarchy + full-graph storage)
        self._rebuild_rdf_graph()
        self._rebuild_visjs_edges()

        # Apply active mappings to all nodes (if mappings exist)
        if hasattr(self, "property_mappings") and any(self.property_mappings.values()):
            self._apply_all_mappings()

        # Update visnetwork
        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

    def undo(self) -> None:
        """Undo the last change."""
        if not self.undo_stack:
            print("Nothing to undo")
            return

        try:
            self.redo_stack.append(self._current_state_snapshot())
            self._restore_state(self.undo_stack.pop())
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
            self.undo_stack.append(self._current_state_snapshot())
            self._restore_state(self.redo_stack.pop())
            print(f"Redo completed. Undo stack: {len(self.undo_stack)}, Redo stack: {len(self.redo_stack)}")
        except Exception as e:
            print(f"Error during redo: {e}")
            import traceback

            traceback.print_exc()

    # ===== Schema helpers for the OO-LD editor =====

    def _build_editor_schema(self, entity_schema: dict) -> dict:
        """Build a JSON Schema suitable for panelini JsonEditor from an OO-LD schema.

        Resolves inherited properties via allOf and strips OO-LD extensions
        (@context, $ref to OO-LD IRIs, x-oold-*, defaultProperties).
        """
        props = self.introspector.get_properties(entity_schema)
        schema_props = {}
        required_names = []
        for name, info in props.items():
            schema_props[name] = self._clean_prop_for_editor(info.raw_schema)
            if info.required:
                required_names.append(name)
        result: dict[str, Any] = {"type": "object", "properties": schema_props}
        title = entity_schema.get("title")
        if title:
            result["title"] = title
        if required_names:
            result["required"] = required_names
        return result

    def _clean_prop_for_editor(self, prop: dict) -> dict:
        """Strip OO-LD extensions and unresolvable $ref from a property schema."""
        result: dict[str, Any] = {}
        for k, v in prop.items():
            if k.startswith(("x-oold-", "@")) or k == "$ref":
                continue
            if k == "items" and isinstance(v, dict):
                cleaned = {ik: iv for ik, iv in v.items() if ik != "$ref" and not ik.startswith(("x-oold-", "@"))}
                if not cleaned.get("type"):
                    cleaned["type"] = "object"
                result[k] = cleaned
            elif k == "anyOf" and isinstance(v, list):
                non_null = [b for b in v if not (isinstance(b, dict) and b.get("type") == "null")]
                if len(non_null) == 1 and isinstance(non_null[0], dict):
                    inner = self._clean_prop_for_editor(non_null[0])
                    for ik, iv in inner.items():
                        if ik not in result:
                            result[ik] = iv
                else:
                    result[k] = [self._clean_prop_for_editor(b) if isinstance(b, dict) else b for b in v]
            else:
                result[k] = v
        if "type" not in result and "anyOf" not in result:
            result["type"] = "string"
        return result

    def _restore_persistent_oold_widgets(self) -> None:
        """Ensure persistent OO-LD Form widgets are in the column (context menus may clear it)."""
        if self._oold_header not in list(self.oold_detail_col):
            self.oold_detail_col.clear()
            self.oold_detail_col.extend([self._oold_header, self.current_node_oold_editor, self._oold_btn_row])

    def show_node_details(self, node_id: Any) -> None:
        """Override the method to show node details in the side panel in a OO-LD-specific fashion"""

        prev_active = self.detail_tabs.active
        super().show_node_details(node_id)
        self.detail_tabs.active = prev_active
        self._default_detail_tab_once()
        self._restore_persistent_oold_widgets()

        # Determine node kind and gather data
        class_schema = self._get_class_for_node_id(node_id)
        if class_schema is not None:
            type_name = self.introspector.get_type_name(class_schema)
            self._class_form_node_id = node_id
            self._oold_form_kind = "class"
            self._oold_header.object = f"### {type_name} (Class)"
            self.current_node_oold_editor.set_schema(self._SUBCLASS_DEF_SCHEMA, startval=class_schema)
            self._oold_jump_btn.visible = False
            self._update_text_tab(
                class_schema, json_schema=_OOLD_META_SCHEMA or None, node_id=node_id, node_kind="class"
            )
            return

        field_parts = self._parse_field_node_id(node_id)
        if field_parts is not None:
            cls_nid, field_name = field_parts
            self._show_field_node_form(node_id, cls_nid, field_name)
            return

        parsed = self._parent_of_literal(node_id)
        if parsed is not None:
            entity_iri, field_name = parsed
            self._show_instance_property_form(node_id, entity_iri, field_name)
            return

        _node_entity = self.entity_dict.get(node_id)
        _node_type_label = _node_entity.type_name if _node_entity else "Unknown"
        current_entity = self.entity_dict.get(node_id, None)

        if current_entity is not None:
            schema = self._build_editor_schema(current_entity.schema)
            self._current_single_node_id = node_id
            self._oold_form_kind = "entity"
            self._oold_header.object = f"### Node ID: {node_id} of type {_node_type_label}"
            self.current_node_oold_editor.set_schema(schema, startval=current_entity.data)
            self._oold_jump_btn.visible = False
            self._update_text_tab(current_entity.data, json_schema=schema, node_id=node_id, node_kind="entity")
        else:
            self._new_entity_node_id = node_id
            self._oold_form_kind = "create_entity"
            self._oold_header.object = f"### Node ID: {node_id} of type {_node_type_label}"
            self.current_node_oold_editor.set_schema({"type": "object", "properties": {}}, startval={})
            self._oold_jump_btn.visible = False

    def _default_detail_tab_once(self) -> None:
        """On the very first node click, switch to OO-LD Form. After that, preserve the user's tab."""
        if not getattr(self, "_detail_tab_initialized", False):
            self._detail_tab_initialized = True
            self.detail_tabs.active = 2

    def _on_oold_form_apply(self, event: Any) -> None:
        """Unified apply handler for the persistent OO-LD Form editor."""
        kind = getattr(self, "_oold_form_kind", None)
        new_val = self.current_node_oold_editor.value
        if not isinstance(new_val, dict):
            return
        if kind == "class":
            node_id = getattr(self, "_class_form_node_id", None)
            if node_id is None:
                return
            self._save_state()
            self._apply_schema_text_changes(node_id, new_val)
        elif kind == "field":
            self._on_field_form_apply(event)
        elif kind == "instance_prop":
            self._on_instance_property_apply(event)
        elif kind == "entity":
            node_id = getattr(self, "_current_single_node_id", None)
            if node_id is None:
                return
            self._save_state()
            self._apply_entity_data_changes(node_id, new_val)

    def _apply_entity_data_changes(self, node_id: str, new_data: dict) -> None:
        """Apply edited entity data from the OO-LD Form back to the entity."""
        entity = self.entity_dict.get(node_id)
        if entity is None:
            return
        _internal = {"id", "__iris__"} | _SKIP_FIELDS
        entity_props = self.introspector.get_properties(entity.schema)
        self._set_entity_props_from_dict(entity, new_data, entity_props, _internal)
        self._clear_removed_optional_props(entity, new_data, entity_props, _internal)
        self._full_sync_after_edit(replace_nodes=True)

    def _update_text_tab(
        self, data: dict, json_schema: dict | None = None, *, node_id: str | None = None, node_kind: str | None = None
    ) -> None:
        """Update the persistent Text tab editor with new data."""
        self._text_tab_node_id = node_id
        self._text_tab_node_kind = node_kind
        self.current_text_editor.value = json.dumps(data, indent=2, default=str)
        self.current_text_editor.json_schema = json_schema

    def _on_text_apply(self, event: Any) -> None:
        """Apply changes from the Text tab Monaco editor."""
        try:
            new_data = json.loads(self.current_text_editor.value)
        except json.JSONDecodeError as e:
            print(f"Invalid JSON: {e}")
            return

        node_id = getattr(self, "_text_tab_node_id", None)
        node_kind = getattr(self, "_text_tab_node_kind", None)
        if node_id is None:
            return

        self._save_state()

        if node_kind == "class":
            self._apply_schema_text_changes(node_id, new_data)
        elif node_kind == "field":
            self._apply_field_text_changes(node_id, new_data)
        elif node_kind == "instance_prop":
            self._apply_instance_prop_text_changes(node_id, new_data)
        else:
            self._apply_entity_text_changes(node_id, new_data)

    def _update_schema_in_registries(self, node_id: str, new_schema: dict) -> None:
        """Replace all registry entries whose class node ID matches *node_id*."""
        for key, schema in list(self.entity_types.items()):
            if _cls_node_id(schema) == node_id:
                self.entity_types[key] = new_schema
        for key, schema in list(self.schema_registry.items()):
            if _cls_node_id(schema) == node_id:
                self.schema_registry[key] = new_schema
        new_id = new_schema.get("$id") or new_schema.get("iri")
        if new_id:
            self.schema_registry[new_id] = new_schema
        new_title = new_schema.get("title")
        if new_title:
            self.schema_registry[new_title] = new_schema
            self.entity_types[new_title] = new_schema

    # -- Field node editing (property sub-schema) --------------------------------

    def _parse_field_node_id(self, node_id: str) -> tuple[str, str] | None:
        """Parse a field node ID into (class_node_id, field_name), or None."""
        sep = "#field_"
        idx = node_id.find(sep)
        if idx < 0:
            return None
        for n in self._full_visjs_nodes:
            if n["id"] == node_id and n.get("node_kind") == "field":
                return node_id[:idx], node_id[idx + len(sep) :]
        return None

    def _show_field_node_form(self, node_id: str, cls_nid: str, field_name: str) -> None:
        """Update persistent widgets for editing a property's sub-schema."""
        parent_schema = self._get_class_for_node_id(cls_nid)
        if parent_schema is None:
            return

        prop_sub_schema = parent_schema.get("properties", {}).get(field_name, {})

        ctx_entry = self._extract_context_entry(parent_schema, field_name)
        edit_value: dict[str, Any] = dict(prop_sub_schema)
        if ctx_entry is not None:
            edit_value["_context_entry"] = ctx_entry

        self._field_form_node_id = node_id
        self._field_form_cls_nid = cls_nid
        self._field_form_field_name = field_name
        self._oold_form_kind = "field"

        parent_name = self.introspector.get_type_name(parent_schema)
        self._oold_header.object = f"### Property **{field_name}** on {parent_name}"
        field_schema = self._build_field_edit_schema(edit_value)
        self.current_node_oold_editor.set_schema(field_schema, startval=edit_value)
        self._oold_jump_btn.visible = False
        self._update_text_tab(edit_value, node_id=node_id, node_kind="field")

    @staticmethod
    def _extract_context_entry(schema: dict, prop_name: str) -> Any:
        """Extract the JSON-LD @context entry for a property, or None."""
        ctx = schema.get("@context")
        if isinstance(ctx, dict):
            return ctx.get(prop_name)
        if isinstance(ctx, list):
            for item in ctx:
                if isinstance(item, dict) and prop_name in item:
                    return item[prop_name]
        return None

    @staticmethod
    def _build_field_edit_schema(edit_value: dict) -> dict:
        """Build a json-editor compatible schema from a property sub-schema value."""
        props: dict[str, Any] = {}
        for key, val in edit_value.items():
            props[key] = _infer_je_schema(val)
        return {
            "type": "object",
            "title": "Property Definition",
            "properties": props,
            "additionalProperties": True,
        }

    def _on_field_form_apply(self, event: Any) -> None:
        """Apply edited property sub-schema back to the parent class schema."""
        cls_nid = getattr(self, "_field_form_cls_nid", None)
        field_name = getattr(self, "_field_form_field_name", None)
        if cls_nid is None or field_name is None:
            return
        parent_schema = self._get_class_for_node_id(cls_nid)
        if parent_schema is None:
            return
        new_val = self.current_node_oold_editor.value
        if not isinstance(new_val, dict):
            return

        self._save_state()

        ctx_entry = new_val.pop("_context_entry", None)
        parent_schema.setdefault("properties", {})[field_name] = new_val

        if ctx_entry is not None:
            self._set_context_entry(parent_schema, field_name, ctx_entry)

        self._apply_schema_text_changes(cls_nid, parent_schema)

    @staticmethod
    def _set_context_entry(schema: dict, prop_name: str, entry: Any) -> None:
        """Write a JSON-LD @context entry for a property."""
        ctx = schema.get("@context")
        if isinstance(ctx, list):
            for item in ctx:
                if isinstance(item, dict) and prop_name in item:
                    item[prop_name] = entry
                    return
            ctx_dicts = [c for c in ctx if isinstance(c, dict)]
            if ctx_dicts:
                ctx_dicts[-1][prop_name] = entry
            else:
                ctx.append({prop_name: entry})
        elif isinstance(ctx, dict):
            ctx[prop_name] = entry
        else:
            schema["@context"] = {prop_name: entry}

    # -- Instance property node editing ------------------------------------------

    def _show_instance_property_form(self, node_id: str, entity_iri: str, field_name: str) -> None:
        """Update persistent widgets for editing a single instance property value."""
        entity = self.entity_dict.get(entity_iri)
        if entity is None:
            return

        all_props = self.introspector.get_properties(entity.schema)
        prop_info = all_props.get(field_name)
        prop_schema = self._clean_prop_for_editor(prop_info.raw_schema) if prop_info else {}

        current_value = entity.get(field_name)
        wrapped_value = {field_name: current_value}
        wrapped_schema = {
            "type": "object",
            "properties": {field_name: prop_schema},
        }

        self._inst_prop_node_id = node_id
        self._inst_prop_entity_iri = entity_iri
        self._inst_prop_field_name = field_name
        self._oold_form_kind = "instance_prop"

        entity_name = entity.name or entity_iri
        self._oold_header.object = f"### Property **{field_name}** on {entity_name}"
        self.current_node_oold_editor.set_schema(wrapped_schema, startval=wrapped_value)

        cls_nid = _cls_node_id(entity.schema)
        field_nid = f"{cls_nid}#field_{field_name}"
        self._oold_jump_btn.name = "Jump to Defining Schema"
        self._oold_jump_btn.visible = True
        self._oold_jump_target = field_nid

        self._update_text_tab(wrapped_value, json_schema=wrapped_schema, node_id=node_id, node_kind="instance_prop")

    def _on_instance_property_apply(self, event: Any) -> None:
        """Apply edited instance property value back to the entity."""
        entity_iri = getattr(self, "_inst_prop_entity_iri", None)
        field_name = getattr(self, "_inst_prop_field_name", None)
        if entity_iri is None or field_name is None:
            return
        entity = self.entity_dict.get(entity_iri)
        if entity is None:
            return
        new_val = self.current_node_oold_editor.value
        if not isinstance(new_val, dict):
            return

        self._save_state()
        prop_value = new_val.get(field_name)
        deserialized = self._deserialize_property_value(entity, field_name, prop_value)
        entity.set(field_name, deserialized)
        self._full_sync_after_edit(replace_nodes=True)

    def _apply_schema_text_changes(self, node_id: str, new_schema: dict) -> None:
        """Apply edited schema from the Text tab back to the registry and rebuild the graph."""
        self._update_schema_in_registries(node_id, new_schema)
        self.introspector = OOLDSchemaIntrospector(self.schema_registry)

        for entity in self.entity_list:
            if _cls_node_id(entity.schema) == node_id:
                entity._schema = new_schema

        for n in self._full_visjs_nodes:
            if n["id"] == node_id and n.get("node_kind") == "class":
                n["label"] = self.introspector.get_type_name(new_schema)

        nodes_before = {n["id"] for n in self._full_visjs_nodes}
        self._rebuild_visjs_edges()
        self._reveal_new_schema_nodes(node_id, nodes_before)

        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)
        self.show_node_details(node_id)

    def _reveal_new_schema_nodes(self, node_id: str, nodes_before: set[str]) -> None:
        """After a schema rebuild, reveal newly created class/field nodes and their edges."""
        if self._visible_node_ids is None:
            return
        self._visible_node_ids.add(node_id)
        new_nodes = [n for n in self._full_visjs_nodes if n["id"] not in nodes_before]
        new_revealed = set()
        for n in new_nodes:
            if n.get("node_kind") in {"class", "field"}:
                self._visible_node_ids.add(n["id"])
                new_revealed.add(n["id"])
        if new_revealed and self._visible_edge_keys is not None:
            for e in self._full_visjs_edges:
                frm, to = e.get("from", ""), e.get("to", "")
                if (
                    (frm in new_revealed or to in new_revealed)
                    and frm in self._visible_node_ids
                    and to in self._visible_node_ids
                ):
                    self._visible_edge_keys.add((frm, to, e.get("label", "")))
        self._apply_visibility_filter_inplace()

    def _apply_field_text_changes(self, node_id: str, new_data: dict) -> None:
        """Apply edited field sub-schema from the Text tab back to the parent class."""
        field_parts = self._parse_field_node_id(node_id)
        if field_parts is None:
            return
        cls_nid, field_name = field_parts
        parent_schema = self._get_class_for_node_id(cls_nid)
        if parent_schema is None:
            return

        ctx_entry = new_data.pop("_context_entry", None)
        parent_schema.setdefault("properties", {})[field_name] = new_data

        if ctx_entry is not None:
            self._set_context_entry(parent_schema, field_name, ctx_entry)

        self._apply_schema_text_changes(cls_nid, parent_schema)

    def _apply_instance_prop_text_changes(self, node_id: str, new_data: dict) -> None:
        """Apply an edited instance property value from the Text tab."""
        parsed = self._parent_of_literal(node_id)
        if parsed is None:
            return
        entity_iri, field_name = parsed
        entity = self.entity_dict.get(entity_iri)
        if entity is None:
            return
        self._save_state()
        prop_value = new_data.get(field_name)
        deserialized = self._deserialize_property_value(entity, field_name, prop_value)
        entity.set(field_name, deserialized)
        self._full_sync_after_edit(replace_nodes=True)

    def _apply_entity_text_changes(self, node_id: str, new_data: dict) -> None:
        """Apply edited entity data from the Text tab back to the entity and rebuild."""
        entity = self.entity_dict.get(node_id)
        if entity is None:
            print(f"Entity {node_id} not found")
            return

        _internal = {"id", "__iris__"} | _SKIP_FIELDS
        entity_props = self.introspector.get_properties(entity.schema)
        self._set_entity_props_from_dict(entity, new_data, entity_props, _internal)
        self._clear_removed_optional_props(entity, new_data, entity_props, _internal)
        self._full_sync_after_edit(replace_nodes=True)

    def _set_entity_props_from_dict(
        self, entity: "EntityAdapter", new_data: dict, entity_props: dict, skip: set
    ) -> None:
        for prop_name, prop_value in new_data.items():
            if prop_name in skip or prop_name not in entity_props:
                continue
            try:
                deserialized = self._deserialize_property_value(entity, prop_name, prop_value)
                entity.set(prop_name, deserialized)
            except Exception as e:
                print(f"Warning: Could not update property '{prop_name}': {e}")

    def _clear_removed_optional_props(
        self, entity: "EntityAdapter", new_data: dict, entity_props: dict, skip: set
    ) -> None:
        for prop_name, prop_info in entity_props.items():
            if prop_name in skip or prop_name in new_data or prop_info.required:
                continue
            try:
                _base_type, _is_list, is_optional = self.introspector.classify_property(prop_info)
                if is_optional:
                    entity.set(prop_name, None)
            except Exception as e:
                print(f"Warning: Could not clear property '{prop_name}': {e}")

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

        # "Apply Individual Changes" button for the comparison table
        self.multi_node_individual_apply_button = pn.widgets.Button(
            name="Apply Individual Changes", button_type="primary", width=200
        )
        self.multi_node_individual_apply_button.on_click(self._on_multi_node_individual_apply)
        self.oold_detail_col.append(self.multi_node_individual_apply_button)

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

        # "Apply to All" button for the set-all table
        self.multi_node_apply_button = pn.widgets.Button(name="Apply to All", button_type="primary", width=150)
        self.multi_node_apply_button.on_click(self.on_multi_node_apply_changes)
        self.oold_detail_col.append(self.multi_node_apply_button)

        # Store selected IDs for callbacks
        self._current_selected_node_ids = node_ids

        # Always switch to OO-LD tab for multi-node selection
        self.detail_tabs.active = 2

    # ===== Property Introspection Helpers =====

    def _get_common_properties(self, entities: list) -> list[str]:
        """Find properties common to all selected entities.

        Args:
            entities: list of EntityAdapter instances

        Returns:
            Sorted list of property names that exist on all entities
        """
        if not entities:
            return []

        # Get properties from first entity as baseline
        first_model_fields = set(self.introspector.get_properties(entities[0].schema).keys())

        # Find intersection across all entities
        common_fields = first_model_fields.copy()
        for entity in entities[1:]:
            entity_fields = set(self.introspector.get_properties(entity.schema).keys())
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

    def _get_property_editor_config(self, entity: "EntityAdapter", prop_name: str) -> dict[str, Any]:
        """Get Tabulator editor configuration for a property.

        Args:
            entity: Sample entity to inspect
            prop_name: Name of the property

        Returns:
            Dict with 'type' and optionally 'values' for editor config
        """
        props = self.introspector.get_properties(entity.schema)
        prop_info = props.get(prop_name)
        if prop_info is None:
            return {"type": "input"}

        base_type, is_list, is_optional = self.introspector.classify_property(prop_info)

        if prop_info.enum_values:
            return {"type": "list", "values": prop_info.enum_values}
        if is_list:
            return {"type": "input"}
        if base_type in ("integer", "number"):
            return {"type": "number"}
        elif base_type == "boolean":
            return {"type": "tickCross"}
        else:
            return {"type": "input"}

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

    def _deserialize_property_value(self, entity: "EntityAdapter", prop_name: str, value: Any) -> Any:  # noqa: C901
        """Deserialize a tabulator value back to property type.

        Handles type conversion based on OO-LD schema property info.

        Args:
            entity: Entity to update
            prop_name: Property name
            value: Value from tabulator

        Returns:
            Deserialized value suitable for entity assignment
        """
        props = self.introspector.get_properties(entity.schema)
        prop_info = props.get(prop_name)
        if prop_info is None:
            return value

        base_type, is_list, is_optional = self.introspector.classify_property(prop_info)

        if is_list:
            if isinstance(value, str):
                try:
                    parsed = json.loads(value)
                    if isinstance(parsed, list):
                        return parsed
                except (json.JSONDecodeError, ValueError):
                    pass
            return value

        _is_nan = isinstance(value, float) and math.isnan(value)

        if base_type == "integer":
            if value == "" or value is None or _is_nan:
                return None
            return int(value)
        elif base_type == "number":
            if value == "" or value is None or _is_nan:
                return None
            return float(value)
        elif base_type == "boolean":
            if value == "" or value is None or _is_nan:
                return None
            return bool(value)
        elif base_type == "string":
            if value == "" or value is None or _is_nan:
                return None
            return str(value)

        return value

    # ===== Table Building =====

    def _build_comparison_dataframe(self, entities: list, properties: list[str]) -> pd.DataFrame:
        """Build DataFrame for comparison table.

        Args:
            entities: list of entities to compare
            properties: list of property names to include

        Returns:
            DataFrame with one row per entity
        """
        rows = []
        for entity in entities:
            row = {"_iri": entity.get_iri()}  # Hidden column for callbacks

            entity_dict = entity.data

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

    # ===== Expansion policy =====

    def _compute_initial_visibility(self) -> tuple[set[str] | None, set[tuple] | None]:
        """Return the initial visible node IDs and edge keys based on expansion_policy.

        Returns (None, None) when no policy is set (means: show everything).
        Otherwise returns (node_ids, edge_keys) where edge_keys contains only
        edges actually traversed by the BFS --other edges between visible nodes
        are hidden until the user explicitly expands them.
        """
        if self.expansion_policy is None:
            return None, None
        if isinstance(self.expansion_policy, MultiExpansionPolicy):
            ids: set[str] = set()
            edges: set[tuple] = set()
            for p in self.expansion_policy.expansion_policies:
                p_ids, p_edges = self._apply_single_policy(p)
                ids |= p_ids
                edges |= p_edges
            return ids, edges
        return self._apply_single_policy(self.expansion_policy)

    def _apply_single_policy(  # noqa: C901
        self,
        policy: "SingleNodeExpansionPolicy",
    ) -> tuple[set[str], set[tuple]]:
        """BFS expansion from a root node along the configured relation steps.

        Returns (visible_node_ids, traversed_edge_keys).
        """
        root = policy.root_node
        if isinstance(root, EntityAdapter):
            root_id = root.get_iri()
        elif isinstance(root, dict) and is_schema_dict(root):
            root_id = _cls_node_id(root)
        elif isinstance(root, dict):
            root_id = root.get("id") or root.get("@id", "")
        elif isinstance(root, LinkedBaseModel):
            root_id = str(root.get_iri())
        elif isinstance(root, type):
            root_id = _cls_node_id(root)
        elif isinstance(root, str):
            root_id = root
        else:
            return set(), set()

        full_node_ids = {n["id"] for n in self._full_visjs_nodes}
        if root_id not in full_node_ids:
            return set(), set()

        visible: set[str] = {root_id}
        traversed_edges: set[tuple] = set()

        for step in policy.expansion_steps:
            current = set(visible)
            iterations = 0
            while current:
                if step.iter_limit is not None and iterations >= step.iter_limit:
                    break
                found: set[str] = set()
                step_edges: set[tuple] = set()
                for nid in current:
                    neighbors, edges = self._get_neighbors_via_relations(
                        nid,
                        step.relations,
                        return_edges=True,
                    )
                    found |= neighbors
                    step_edges |= edges
                new_nodes = found - visible
                visible |= new_nodes
                traversed_edges |= step_edges
                current = new_nodes
                iterations += 1

        return visible, traversed_edges

    def _get_neighbors_via_relations(
        self,
        node_id: str,
        relations: list[str],
        *,
        return_edges: bool = False,
    ) -> set[str] | tuple[set[str], set[tuple]]:
        """Return IDs of nodes reachable from node_id via any of the given relations.

        Relations prefixed with '-' are traversed in reverse (incoming edges).
        Works on _full_visjs_edges so it covers instance-level AND class-hierarchy edges
        without any label-specific special-casing.

        When *return_edges* is True, returns ``(node_ids, edge_keys)`` instead
        of just ``node_ids``.
        """
        result: set[str] = set()
        edges: set[tuple] = set()
        full_node_ids = {n["id"] for n in self._full_visjs_nodes}
        for relation in relations:
            inverse = relation.startswith("-")
            label = relation[1:] if inverse else relation
            for edge in self._full_visjs_edges:
                if edge.get("label") != label:
                    continue
                frm = edge.get("from", "")
                to = edge.get("to", "")
                if not inverse and frm == node_id and str(to) in full_node_ids:
                    result.add(str(to))
                    if return_edges:
                        edges.add((frm, to, label))
                elif inverse and to == node_id and str(frm) in full_node_ids:
                    result.add(str(frm))
                    if return_edges:
                        edges.add((frm, to, label))
        if return_edges:
            return result, edges
        return result

    # ===== RDF → visjs edge building =====

    def _literal_node_id(self, entity_iri: str, pred_label: str, subject_str: str) -> str:
        """Return a stable, path-scoped ID for a literal node: <entity_iri>#<field_name>."""
        entity = self.entity_dict.get(subject_str)
        if entity is not None:
            field_name = self._field_name_for_predicate(entity, pred_label)
            if field_name:
                return f"{entity_iri}#{field_name}"
        return f"{entity_iri}#literal_{pred_label}"

    @staticmethod
    def _resolve_prefix_ns(ctx: dict | list | None, prefix: str) -> str | None:
        """Look up a namespace prefix in a resolved JSON-LD context."""
        ctx_dicts: list[dict] = []
        if isinstance(ctx, dict):
            ctx_dicts = [ctx]
        elif isinstance(ctx, list):
            ctx_dicts = [c for c in ctx if isinstance(c, dict)]
        for cd in ctx_dicts:
            val = cd.get(prefix)
            if isinstance(val, str):
                return val
            if isinstance(val, dict) and "@id" in val:
                return val["@id"]
        return None

    def _build_iri_maps(self) -> None:
        """Build bidirectional maps between compact and expanded IRIs.

        After JSON-LD parsing, compact IRIs like ``pers:Alice`` are expanded
        to full URIs like ``https://example.com/people/Alice`` in the RDF
        graph.  Entity nodes use compact IRIs as IDs, so we need these maps
        to match RDF subjects/objects back to entity node IDs.
        """
        self._iri_compact_map: dict[str, str] = {}
        self._iri_expand_map: dict[str, str] = {}
        prefix_cache: dict[str, str | None] = {}
        for entity in self.entity_list:
            compact = entity.get_iri()
            if not compact:
                continue
            if compact.startswith(("http://", "https://", "urn:")):
                self._iri_compact_map[compact] = compact
                self._iri_expand_map[compact] = compact
                continue
            if ":" not in compact:
                continue
            prefix, local = compact.split(":", 1)
            if prefix not in prefix_cache:
                ctx = build_context_from_schema(entity.schema, self.schema_registry)
                prefix_cache[prefix] = self._resolve_prefix_ns(ctx, prefix)
            ns = prefix_cache[prefix]
            if ns:
                expanded = ns + local
                self._iri_expand_map[compact] = expanded
                self._iri_compact_map[expanded] = compact

    def _build_rdf_edges(self, source_ids: set[str]) -> None:
        """Append RDF-derived edges (and literal nodes) to self.visjs_nodes / self.visjs_edges.

        For each triple (s, p, o) where s is in source_ids:
        - rdf:type triples: skip (handled by _build_class_graph as HasType edges).
        - Literal o: create an orange literal node (ID = <entity_iri>#<field_name>) + add edge.
        - URIRef o in source_ids or matching a known class node ID: add edge.
        - Other external URI: skip (would clutter the graph).
        """
        existing_node_ids = {n["id"] for n in self.visjs_nodes}
        class_node_ids: set[str] = {_cls_node_id(cls) for cls in (self.entity_types or {}).values()}
        compact_map = getattr(self, "_iri_compact_map", {})
        expand_map = getattr(self, "_iri_expand_map", {})
        expanded_source = set(source_ids)
        for sid in source_ids:
            exp = expand_map.get(sid)
            if exp:
                expanded_source.add(exp)
        lit_counter: dict[str, int] = {}
        for s, p, o in self.rdf_graph:
            s_str = str(s)
            if s_str not in expanded_source:
                continue
            s_compact = compact_map.get(s_str, s_str)
            if p == RDF.type:
                continue
            pred_label = str(p).split("/")[-1].split("#")[-1]
            if isinstance(o, RDFLiteral):
                base_lit_id = self._literal_node_id(s_compact, pred_label, s_compact)
                idx = lit_counter.get(base_lit_id, 0)
                lit_counter[base_lit_id] = idx + 1
                lit_id = base_lit_id if idx == 0 else f"{base_lit_id}_{idx}"
                if lit_id not in existing_node_ids:
                    self.visjs_nodes.append({
                        "id": lit_id,
                        "label": _truncate(str(o)),
                        "color": _ATTR_VAL_NODE_COLOR,
                        "shape": "ellipse",
                        "node_kind": "literal",
                    })
                    existing_node_ids.add(lit_id)
                self.visjs_edges.append({
                    "from": s_compact,
                    "to": lit_id,
                    "label": pred_label,
                    "arrows": "to",
                })
            else:
                o_str = str(o)
                o_compact = compact_map.get(o_str, o_str)
                if (
                    o_compact in source_ids
                    or o_str in source_ids
                    or o_compact in class_node_ids
                    or o_str in class_node_ids
                ):
                    self.visjs_edges.append({
                        "from": s_compact,
                        "to": o_compact,
                        "label": pred_label,
                        "arrows": "to",
                    })
            # else: external URI reference --skip

    # ===== Expansion context-menu helpers =====

    def _snapshot_visible_edge_keys(self) -> set[tuple]:
        """Return (from, to, label) keys for all edges currently between visible nodes."""
        ids = {n["id"] for n in self._full_visjs_nodes} if self._visible_node_ids is None else self._visible_node_ids
        return {
            (e.get("from", ""), e.get("to", ""), e.get("label", ""))
            for e in self._full_visjs_edges
            if e.get("from") in ids and e.get("to") in ids
        }

    def _get_expand_options_for_node(self, node_id: str) -> dict[str, list[str]]:
        """Return {edge_label: [target_node_id, ...]} for expandable outgoing edges.

        An edge is expandable when its target node is hidden, OR when the
        edge itself is hidden by ``_visible_edge_keys`` even though both
        endpoints are visible.
        """
        if self._visible_node_ids is None and self._visible_edge_keys is None:
            return {}
        full_node_ids = {n["id"] for n in self._full_visjs_nodes}
        result: dict[str, list[str]] = {}
        for edge in self._full_visjs_edges:
            if edge.get("from") != node_id:
                continue
            target = str(edge.get("to", ""))
            if not target or target not in full_node_ids:
                continue
            node_hidden = self._visible_node_ids is not None and target not in self._visible_node_ids
            edge_key = (edge.get("from", ""), target, edge.get("label", ""))
            edge_hidden = self._visible_edge_keys is not None and edge_key not in self._visible_edge_keys
            if node_hidden or edge_hidden:
                result.setdefault(edge.get("label", ""), []).append(target)
        return result

    def _get_inverse_expand_options_for_node(self, node_id: str) -> dict[str, list[str]]:
        """Return {edge_label: [source_node_id, ...]} for expandable incoming edges.

        An edge is expandable when its source node is hidden, OR when the
        edge itself is hidden by ``_visible_edge_keys`` even though both
        endpoints are visible.
        """
        if self._visible_node_ids is None and self._visible_edge_keys is None:
            return {}
        full_node_ids = {n["id"] for n in self._full_visjs_nodes}
        result: dict[str, list[str]] = {}
        for edge in self._full_visjs_edges:
            if edge.get("to") != node_id:
                continue
            source = str(edge.get("from", ""))
            if not source or source not in full_node_ids:
                continue
            node_hidden = self._visible_node_ids is not None and source not in self._visible_node_ids
            edge_key = (source, edge.get("to", ""), edge.get("label", ""))
            edge_hidden = self._visible_edge_keys is not None and edge_key not in self._visible_edge_keys
            if node_hidden or edge_hidden:
                result.setdefault(edge.get("label", ""), []).append(source)
        return result

    def _is_iri_field(self, entity: "EntityAdapter", field_name: str) -> bool:
        """Return True if field_name is declared as @type:@id (URI reference) in the JSON-LD context."""
        return self.introspector.is_iri_field(entity.schema, field_name)

    def _get_creatable_fields(self, entity_id: str) -> list[str]:
        """Return field names that are None/empty and not internal, for the 'Create:' menu."""
        entity = self.entity_dict.get(entity_id)
        if entity is None:
            return []
        dumped = entity.data
        result = []
        for field_name in self.introspector.get_properties(entity.schema):
            if field_name in _SKIP_FIELDS:
                continue
            val = dumped.get(field_name)
            if val is None or val == "" or isinstance(val, list):
                result.append(field_name)
        return result

    def _get_class_for_node_id(self, node_id: str) -> dict | None:
        """Return the entity type schema dict whose class node IRI matches node_id, or None."""
        for schema in (self.entity_types or {}).values():
            if _cls_node_id(schema) == node_id:
                return schema
        return None

    def _get_expandable_subobject_fields(self, entity_id: str) -> list[str]:  # noqa: C901
        """Return list-field names that have ≥1 sub-object element not yet fully visible."""
        entity = self.entity_dict.get(entity_id)
        if entity is None:
            return []
        result = []
        all_props = self.introspector.get_properties(entity.schema)
        for field_name, prop_info in all_props.items():
            if field_name in _SKIP_FIELDS:
                continue
            if not self.introspector.is_object_ref(prop_info):
                continue
            if prop_info.range:
                continue
            val = entity.get(field_name)
            if not isinstance(val, list) or not val:
                continue
            for sub_obj in val:
                if isinstance(sub_obj, dict):
                    sub_iri = sub_obj.get("id") or sub_obj.get("@id")
                elif isinstance(sub_obj, EntityAdapter):
                    sub_iri = sub_obj.get_iri()
                else:
                    continue
                if not sub_iri:
                    continue
                if sub_iri not in self.entity_dict or (
                    self._visible_node_ids is not None and sub_iri not in self._visible_node_ids
                ):
                    result.append(field_name)
                    break
        return result

    def _expand_dict_for_node(self, node_id: str) -> dict[str, str]:
        """Return callback_name_dict with Expand:/Create: options for an entity node."""
        outgoing = self._get_expand_options_for_node(node_id)
        incoming = self._get_inverse_expand_options_for_node(node_id)
        creatable = self._get_creatable_fields(node_id)
        expandable_subobjs = self._get_expandable_subobject_fields(node_id)
        is_class_node = self._get_class_for_node_id(node_id) is not None
        if not outgoing and not incoming and not creatable and not expandable_subobjs and not is_class_node:
            return {}
        d: dict[str, str] = {}
        if outgoing or incoming:
            d["expand_all"] = "Expand: All"
        for label in outgoing:
            d[f"expand_{label}"] = f"Expand: {label}"
        for label in incoming:
            d[f"expand_inv_{label}"] = f"Expand: -{label}"
        for field_name in expandable_subobjs:
            d[f"expand_subobj_{field_name}"] = f"Expand: {field_name}"
        for field_name in creatable:
            d[f"create_{field_name}"] = f"Create: {field_name}"
        if is_class_node:
            schema = self._get_class_for_node_id(node_id)
            type_name = self.introspector.get_type_name(schema) if schema else "Unknown"
            d["create_instance"] = f"Create a: {type_name}"
            d["create_property"] = "Create New Property"
            d["create_subclass"] = "Create New Subclass"
        return d

    def _apply_visibility_filter_inplace(self) -> None:
        """Filter _full_visjs_nodes/_full_visjs_edges into visjs_nodes/visjs_edges.

        When _visible_node_ids is None, all nodes are shown (no filtering).
        Populates callback_name_dict on visible nodes that have hidden outgoing edges.
        """
        if self._visible_node_ids is None:
            self.visjs_nodes = [dict(n) for n in self._full_visjs_nodes]
            candidate_edges = self._full_visjs_edges
        else:
            self.visjs_nodes = [dict(n) for n in self._full_visjs_nodes if n["id"] in self._visible_node_ids]
            visible_ids = {n["id"] for n in self.visjs_nodes}
            candidate_edges = [
                e for e in self._full_visjs_edges if e.get("from") in visible_ids and e.get("to") in visible_ids
            ]
        if self._visible_edge_keys is None:
            self.visjs_edges = [dict(e) for e in candidate_edges]
        else:
            self.visjs_edges = [
                dict(e)
                for e in candidate_edges
                if (e.get("from", ""), e.get("to", ""), e.get("label", "")) in self._visible_edge_keys
            ]

        _structural_labels = {"IsA", "definesProperty", "HasType", "HasRange"}
        for edge in self.visjs_edges:
            frm, to, lbl = edge.get("from", ""), edge.get("to", ""), edge.get("label", "")
            edge["id"] = f"{frm}|{lbl}|{to}"
            edge_cb: dict[str, str] = {}
            if self._visible_edge_keys is not None:
                edge_cb["edge_expand_all"] = f"Expand All: {lbl}"
                edge_cb["edge_hide"] = "Hide"
                edge_cb["edge_hide_all"] = f"Hide All: {lbl}"
            else:
                edge_cb["edge_hide"] = "Hide"
                edge_cb["edge_hide_all"] = f"Hide All: {lbl}"
            if lbl not in _structural_labels and frm in self.entity_dict:
                edge_cb["edge_reveal_definition"] = "Reveal Definition"
            edge["callback_name_dict"] = edge_cb

        for node in self.visjs_nodes:
            if node.get("node_kind") == "literal":
                node["callback_name_dict"] = {"edit_value": "Edit Value", "hide": "Hide", "delete": "Delete"}
            else:
                cb = self._expand_dict_for_node(node["id"])
                cb["hide"] = "Hide"
                cb["delete"] = "Delete"
                node["callback_name_dict"] = cb

        if hasattr(self, "property_mappings") and any(self.property_mappings.values()):
            self._apply_all_mappings()

    def _on_context_menu_item(self, element_type: str, element_id: Any, action_id: str) -> None:  # noqa: C901
        """Handle a right-click context-menu selection on a node or edge."""
        if element_type == "edge" and action_id.startswith("edge_"):
            self._on_edge_context_menu(str(element_id), action_id)
            return

        node_id = str(element_id)

        if action_id == "edit_value":
            self._show_literal_edit_form(node_id)
            return

        if action_id == "hide":
            self._hide_node(node_id)
            return

        if action_id == "delete":
            self._initiate_delete(node_id)
            return

        if action_id == "create_instance":
            cls = self._get_class_for_node_id(node_id)
            if cls is not None:
                self._new_entity_node_id = None
                self._show_create_entity_editor(cls)
            return

        if action_id == "create_property":
            self._show_create_property_form(node_id)
            return

        if action_id == "create_subclass":
            self._show_create_subclass_form(node_id)
            return

        if action_id.startswith("expand_subobj_"):
            field_name = action_id[len("expand_subobj_") :]
            self._expand_subobject_list(node_id, field_name)
            return

        if action_id.startswith("create_"):
            field_name = action_id[len("create_") :]
            self._show_property_create_form(node_id, field_name)
            return

        if self._visible_node_ids is None:
            return  # expand actions only apply in expansion mode

        outgoing = self._get_expand_options_for_node(node_id)
        incoming = self._get_inverse_expand_options_for_node(node_id)
        if not outgoing and not incoming:
            return

        added: set[str] = set()
        expand_label: str | None = None
        is_inverse: bool = False
        if action_id == "expand_all":
            for targets in outgoing.values():
                added.update(targets)
            for sources in incoming.values():
                added.update(sources)
        elif action_id.startswith("expand_inv_"):
            expand_label = action_id[len("expand_inv_") :]
            is_inverse = True
            added.update(incoming.get(expand_label, []))
        elif action_id.startswith("expand_"):
            expand_label = action_id[len("expand_") :]
            added.update(outgoing.get(expand_label, []))

        if not added:
            return

        # Save state for undo before mutating
        self._save_state()

        # Transition _visible_edge_keys: for specific-label expand, only show the
        # edges through which nodes were expanded (suppress all others on new nodes).
        # For expand_all, keep _visible_edge_keys as-is (None = show all; set = add all).
        if expand_label is not None:
            if self._visible_edge_keys is None:
                # First specific expand: snapshot all currently visible edges
                self._visible_edge_keys = self._snapshot_visible_edge_keys()
            # Add only the edges matching the expand_label between node_id and the new nodes
            for e in self._full_visjs_edges:
                frm, to, lbl = e.get("from", ""), e.get("to", ""), e.get("label", "")
                if lbl != expand_label:
                    continue
                if (not is_inverse and frm == node_id and to in added) or (
                    is_inverse and to == node_id and frm in added
                ):
                    self._visible_edge_keys.add((frm, to, lbl))
        else:
            # expand_all: only add edges directly connecting node_id to the new nodes
            if self._visible_edge_keys is None:
                self._visible_edge_keys = self._snapshot_visible_edge_keys()
            for e in self._full_visjs_edges:
                frm, to, lbl = e.get("from", ""), e.get("to", ""), e.get("label", "")
                if (frm == node_id and to in added) or (to == node_id and frm in added):
                    self._visible_edge_keys.add((frm, to, lbl))

        self._visible_node_ids.update(added)
        self._apply_visibility_filter_inplace()

        # Position new nodes near the source, angled by edge label
        if expand_label is not None:
            label_map: dict[str, set[str]] = {expand_label: added}
        else:
            label_map = {}
            for lbl, targets in outgoing.items():
                s = added & set(targets)
                if s:
                    label_map[lbl] = s
            for lbl, sources in incoming.items():
                s = added & set(sources)
                if s:
                    label_map.setdefault(lbl, set()).update(s)
        self._position_nodes_near(node_id, label_map)

        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

    # ===== Edge context-menu actions =====

    def _on_edge_context_menu(self, edge_id: str, action_id: str) -> None:
        """Handle a right-click context-menu action on an edge."""
        parts = edge_id.split("|", 2)
        if len(parts) != 3:
            return
        frm, lbl, to = parts

        self._save_state()

        if self._visible_edge_keys is None:
            self._visible_edge_keys = self._snapshot_visible_edge_keys()

        source_to_added: dict[str, set[str]] = {}
        if action_id == "edge_hide":
            self._visible_edge_keys.discard((frm, to, lbl))
        elif action_id == "edge_hide_all":
            self._visible_edge_keys = {k for k in self._visible_edge_keys if k[2] != lbl}
        elif action_id == "edge_expand_all":
            source_to_added = self._expand_edge_label_for_all(lbl)
        elif action_id == "edge_reveal_definition":
            self._reveal_property_definition(frm, lbl)

        self._apply_visibility_filter_inplace()

        if source_to_added:
            for src_id, added_ids in source_to_added.items():
                self._position_nodes_near(src_id, {lbl: added_ids})

        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

    def _reveal_property_definition(self, entity_iri: str, pred_label: str) -> None:
        """Reveal the field node that defines the schema property behind an edge.

        Shows the connected chain: entity --HasType--> type_class --IsA-->...
        --IsA--> defining_class --definesProperty--> field_node.
        Only classes between the entity's type and the defining class are
        revealed, not ancestors beyond the defining class.
        """
        entity = self.entity_dict.get(entity_iri)
        if entity is None:
            return

        field_name = self._field_name_for_predicate(entity, pred_label)
        if field_name is None:
            return

        defining_schema = self._find_defining_schema(entity.schema, field_name)
        if defining_schema is None:
            return

        if self._visible_node_ids is None:
            self._visible_node_ids = {n["id"] for n in self.visjs_nodes}
        if self._visible_edge_keys is None:
            self._visible_edge_keys = self._snapshot_visible_edge_keys()

        defining_nid = _cls_node_id(defining_schema)
        field_nid = f"{defining_nid}#field_{field_name}"

        self._visible_node_ids.add(field_nid)
        self._visible_node_ids.add(defining_nid)
        self._visible_edge_keys.add((defining_nid, field_nid, "definesProperty"))

        type_cls_nid = _cls_node_id(entity.schema)
        self._visible_node_ids.add(type_cls_nid)
        self._visible_edge_keys.add((entity_iri, type_cls_nid, "HasType"))

        self._reveal_isa_chain_to(entity.schema, defining_schema)

    def _reveal_isa_chain_to(self, schema: dict, target: dict) -> None:
        """Walk IsA chain from schema up to target, revealing each step."""
        target_nid = _cls_node_id(target)
        while _cls_node_id(schema) != target_nid:
            schema_nid = _cls_node_id(schema)
            parent_refs = self.introspector.get_parent_schema_refs(schema)
            if not parent_refs:
                break
            for ref in parent_refs:
                parent = self.introspector.resolve_ref(ref)
                if parent is not None and self._is_ancestor_of(parent, target):
                    parent_nid = _cls_node_id(parent)
                    self._visible_node_ids.add(parent_nid)
                    self._visible_edge_keys.add((schema_nid, parent_nid, "IsA"))
            first_parent = self.introspector.resolve_ref(parent_refs[0])
            if first_parent is None:
                break
            schema = first_parent

    def _is_ancestor_of(self, candidate: dict, target: dict) -> bool:
        """Return True if candidate is target or an ancestor of target."""
        if candidate is target:
            return True
        cand_nid = _cls_node_id(candidate)
        target_nid = _cls_node_id(target)
        if cand_nid == target_nid:
            return True
        for ref in self.introspector.get_parent_schema_refs(target):
            parent = self.introspector.resolve_ref(ref)
            if parent is not None and self._is_ancestor_of(candidate, parent):
                return True
        return False

    def _find_defining_schema(self, schema: dict, field_name: str) -> dict | None:
        """Find the schema in the inheritance chain that directly defines field_name."""
        if field_name in self.introspector.get_own_properties(schema):
            return schema
        for ref in self.introspector.get_parent_schema_refs(schema):
            parent = self.introspector.resolve_ref(ref)
            if parent is not None:
                result = self._find_defining_schema(parent, field_name)
                if result is not None:
                    return result
        return None

    def _get_node_position(self, node_id: str) -> tuple[float, float] | None:
        """Return (x, y) of *node_id* from the last JS-synced positions, or *None*."""
        for n in self.visnetwork_panel.nodes:
            if n.get("id") == node_id:
                x, y = n.get("x"), n.get("y")
                if x is not None and y is not None:
                    return (float(x), float(y))
                return None
        return None

    def _position_nodes_near(self, source_id: str, label_to_added: dict[str, set[str]]) -> None:
        """Set x/y on newly added nodes so they appear near *source_id*.

        Each node is placed at distance 100 from the source.  The angle is
        determined by hashing the edge label so that the same property always
        fans out in the same direction.  Multiple nodes sharing a label are
        spread evenly around the base angle.
        """
        pos = self._get_node_position(source_id)
        if pos is None:
            return
        src_x, src_y = pos
        distance = 100
        spread = 0.3  # radians between nodes sharing a label

        targets: dict[str, tuple[float, float]] = {}
        for lbl, node_ids in label_to_added.items():
            base_angle = (hash(lbl) % 360) * math.pi / 180
            nodes = sorted(node_ids)
            for i, nid in enumerate(nodes):
                if nid in targets:
                    continue
                angle = base_angle + (i - (len(nodes) - 1) / 2) * spread
                targets[nid] = (
                    src_x + distance * math.cos(angle),
                    src_y + distance * math.sin(angle),
                )

        for n in self.visjs_nodes:
            xy = targets.get(n.get("id"))
            if xy is not None:
                n["x"], n["y"] = xy

    def _expand_edge_label_for_all(self, lbl: str) -> dict[str, set[str]]:
        """Reveal edges with *lbl* expanding outward from currently visible nodes.

        Adds edges where the FROM endpoint is already visible, revealing the TO
        endpoint if needed.  Edges between two already-visible nodes are also
        revealed.  Does NOT pull in hidden nodes that merely point TO a visible
        node (which would flood the graph from the backend).

        Returns a mapping ``{source_id: {added_node_ids}}`` for positioning.
        """
        visible = self._visible_node_ids or {n["id"] for n in self._full_visjs_nodes}
        added_nodes: set[str] = set()
        source_to_added: dict[str, set[str]] = {}
        for e in self._full_visjs_edges:
            if e.get("label") != lbl:
                continue
            e_from, e_to = e.get("from", ""), e.get("to", "")
            if e_from in visible:
                self._visible_edge_keys.add((e_from, e_to, lbl))
                if e_to not in visible:
                    added_nodes.add(e_to)
                    source_to_added.setdefault(e_from, set()).add(e_to)
        if self._visible_node_ids is not None:
            self._visible_node_ids.update(added_nodes)
        return source_to_added

    # ===== Sub-object list expansion =====

    def _expand_subobject_list(self, entity_id: str, field_name: str) -> None:  # noqa: C901
        """Register and reveal all sub-objects in a list field that are not yet visible."""
        entity = self.entity_dict.get(entity_id)
        if entity is None:
            return
        props = self.introspector.get_properties(entity.schema)
        prop_info = props.get(field_name)
        if prop_info and prop_info.range:
            return
        val = entity.get(field_name)
        if not isinstance(val, list) or not val:
            return
        inner_type = self._field_inner_model_type(entity, field_name)
        if inner_type is None:
            return

        self._save_state()
        # Before mutating, snapshot current edges if this is the first tracked expand
        if self._visible_edge_keys is None:
            self._visible_edge_keys = self._snapshot_visible_edge_keys()

        sub_type_name = self.introspector.get_type_name(inner_type)
        changed = False
        for sub_obj in val:
            if isinstance(sub_obj, EntityAdapter):
                sub_iri = sub_obj.get_iri()
            elif isinstance(sub_obj, dict):
                sub_iri = sub_obj.get("id") or sub_obj.get("@id", "")
            else:
                continue
            if not sub_iri:
                continue
            if sub_iri not in self.entity_dict:
                # Sub-object was embedded but never registered --register it now
                if isinstance(sub_obj, dict):
                    sub_adapter = adapt_entity(sub_obj, self.schema_registry)
                    self.entity_list.append(sub_adapter)
                    self.entity_dict[sub_iri] = sub_adapter
                else:
                    self.entity_list.append(sub_obj)
                    self.entity_dict[sub_iri] = sub_obj
                sub_label = sub_obj.get("name", sub_iri) if isinstance(sub_obj, dict) else sub_obj.name
                new_node = {
                    "id": sub_iri,
                    "label": sub_label,
                    "shape": "ellipse",
                    "entity_type": sub_type_name,
                    "color": self._get_color_for_type(sub_type_name),
                }
                self._full_visjs_nodes.append(dict(new_node))
                changed = True
            if self._visible_node_ids is not None and sub_iri not in self._visible_node_ids:
                self._visible_node_ids.add(sub_iri)
                changed = True

        if changed:
            self._full_sync_after_edit(replace_nodes=True)

    # ===== Hide / Delete =====

    def _hide_node(self, node_id: str) -> None:
        """Remove a node (and its orphaned literal children) from the visible graph."""
        self._save_state()
        if self._visible_node_ids is None:
            self._visible_node_ids = {n["id"] for n in self._full_visjs_nodes}
        # Also hide literal nodes attached to this node
        literal_children = {
            e["to"]
            for e in self._full_visjs_edges
            if e.get("from") == node_id
            and any(n["id"] == e["to"] and n.get("node_kind") == "literal" for n in self._full_visjs_nodes)
        }
        self._visible_node_ids.discard(node_id)
        self._visible_node_ids -= literal_children
        self._apply_visibility_filter_inplace()
        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

    def _find_iri_references_to(self, target_iri: str) -> list[tuple[Any, str]]:
        """Return (entity, field_name) pairs whose IRI-reference field points to target_iri."""
        results = []
        for entity in self.entity_list:
            dumped = entity.data
            for field_name in self.introspector.get_properties(entity.schema):
                if field_name in _SKIP_FIELDS:
                    continue
                if not self._is_iri_field(entity, field_name):
                    continue
                val = dumped.get(field_name)
                if val == target_iri or (isinstance(val, list) and target_iri in val):
                    results.append((entity, field_name))
        return results

    def _parent_of_literal(self, node_id: str) -> tuple[str, str] | None:
        """Return (entity_iri, field_name) for a literal node ID, or None if not parseable."""
        if "#" not in node_id:
            return None
        entity_iri, rest = node_id.rsplit("#", 1)
        field_name = rest[len("literal_") :] if rest.startswith("literal_") else rest
        # Strip list-element suffix (e.g. "hobbies_1" -> "hobbies")
        if "_" in field_name and field_name.rsplit("_", 1)[-1].isdigit():
            field_name = field_name.rsplit("_", 1)[0]
        if entity_iri in self.entity_dict and field_name in self.introspector.get_properties(
            self.entity_dict[entity_iri].schema
        ):
            return entity_iri, field_name
        return None

    def _retype_to_parent_class(self, schema: dict) -> str | None:
        """Return the IRI of the nearest ancestor schema that is still in entity_types."""
        type_schema_ids = {id(s) for s in self.entity_types.values()}
        for ref in self.introspector.get_parent_schema_refs(schema):
            parent = self.introspector.resolve_ref(ref)
            if parent is not None and id(parent) in type_schema_ids and parent is not schema:
                return _cls_node_id(parent)
        return None

    def _initiate_delete(self, node_id: str) -> None:
        """Dispatch to the correct delete handler based on node kind."""
        node = next((n for n in self._full_visjs_nodes if n["id"] == node_id), None)
        if node is None:
            return
        kind = node.get("node_kind")
        if kind == "literal":
            self._delete_literal_node(node_id)
        elif node_id in self.entity_dict:
            self._delete_entity_node(node_id)
        elif self._get_class_for_node_id(node_id) is not None:
            self._delete_class_node(node_id)

    def _delete_literal_node(self, node_id: str) -> None:
        """Delete a literal node by setting its parent field to None."""
        parsed = self._parent_of_literal(node_id)
        if parsed is None:
            return
        entity_iri, field_name = parsed
        entity = self.entity_dict[entity_iri]
        self._save_state()
        entity.set(field_name, None)
        self._full_sync_after_edit()
        # Refresh the JSON editor if it is currently showing this entity
        if hasattr(self, "current_node_oold_editor") and getattr(self, "_current_single_node_id", None) == entity_iri:
            self.current_node_oold_editor.value = entity.data

    def _delete_entity_node(self, node_id: str) -> None:
        """Delete an entity, with confirmation if other entities reference it."""
        refs = self._find_iri_references_to(node_id)
        if refs:
            self._show_delete_confirmation(
                node_id=node_id,
                retype_pairs=[],
                clear_pairs=[(e, f) for e, f in refs],
                on_confirm=lambda: self._execute_entity_delete(node_id),
            )
        else:
            self._save_state()
            self._execute_entity_delete(node_id)

    def _execute_entity_delete(self, node_id: str) -> None:
        """Remove entity from all data structures and rebuild."""
        entity = self.entity_dict.pop(node_id, None)
        if entity is not None and entity in self.entity_list:
            self.entity_list.remove(entity)
        self._full_visjs_nodes = [n for n in self._full_visjs_nodes if n["id"] != node_id]
        if self._visible_node_ids is not None:
            self._visible_node_ids.discard(node_id)
        self._rebuild_visjs_edges()
        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)
        self.oold_detail_col.clear()

    def _delete_class_node(self, node_id: str) -> None:
        """Delete a class from entity_types, retying HasType instances and checking IRI refs."""
        cls = self._get_class_for_node_id(node_id)
        if cls is None:
            return
        parent_iri = self._retype_to_parent_class(cls)
        # Entities whose 'type' field == this class IRI → retype to parent
        retype_pairs: list[tuple[Any, str, str]] = []  # (entity, field_name, new_iri)
        for entity in self.entity_list:
            dumped = entity.data
            if dumped.get("type") == node_id and parent_iri is not None:
                retype_pairs.append((entity, "type", parent_iri))
        # IRI-reference fields (non-type) pointing to this class
        iri_refs = [(e, f) for e, f in self._find_iri_references_to(node_id)]
        self._show_delete_confirmation(
            node_id=node_id,
            retype_pairs=retype_pairs,
            clear_pairs=iri_refs,
            on_confirm=lambda: self._execute_class_delete(node_id, cls, retype_pairs, iri_refs),
        )

    def _execute_class_delete(
        self,
        node_id: str,
        cls: dict,
        retype_pairs: list,
        clear_pairs: list,
    ) -> None:
        """Apply retype + clear, remove class from entity_types, rebuild."""
        self._save_state()
        for entity, field_name, new_iri in retype_pairs:
            entity.set(field_name, new_iri)
        for entity, field_name in clear_pairs:
            entity.set(field_name, None)
        # Remove from entity_types
        self.entity_types = {k: v for k, v in (self.entity_types or {}).items() if id(v) != id(cls)}
        self._full_visjs_nodes = [n for n in self._full_visjs_nodes if n["id"] != node_id]
        if self._visible_node_ids is not None:
            self._visible_node_ids.discard(node_id)
        self._rebuild_visjs_edges()
        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)
        self.oold_detail_col.clear()

    def _show_delete_confirmation(
        self,
        node_id: str,
        retype_pairs: list,
        clear_pairs: list,
        on_confirm: Any,
    ) -> None:
        """Show a confirmation panel listing what will change on delete."""
        node = next((n for n in self._full_visjs_nodes if n["id"] == node_id), None)
        label = node.get("label", node_id) if node else node_id

        lines = [f"### Delete **{label}**\n"]
        if retype_pairs:
            lines.append("**The following will be retyped to the next higher class:**")
            for entity, _field, new_iri in retype_pairs:
                lines.append(f"- {entity.name} → `{new_iri}`")
            lines.append("")
        if clear_pairs:
            lines.append("**The following references will be cleared:**")
            for entity, field_name in clear_pairs:
                lines.append(f"- {entity.name}.{field_name}")
            lines.append("")

        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown("\n".join(lines)))

        confirm_btn = pn.widgets.Button(name="Confirm Delete", button_type="danger", width=150)
        cancel_btn = pn.widgets.Button(name="Cancel", button_type="default", width=100)

        def _on_confirm(_event: Any) -> None:
            on_confirm()

        confirm_btn.on_click(_on_confirm)
        cancel_btn.on_click(lambda _: self.oold_detail_col.clear())

        self.oold_detail_col.append(pn.Row(confirm_btn, cancel_btn))
        self.detail_tabs.active = 2

    # ===== Literal value editing =====

    def _field_name_for_predicate(self, entity: "EntityAdapter", pred_label: str) -> Optional[str]:
        """Map an RDF predicate label back to the schema property name on an entity.

        Checks direct name match first, then scans the JSON-LD @context chain.
        """
        return self.introspector.field_name_for_predicate(entity.schema, pred_label)

    def _show_literal_edit_form(self, lit_id: str) -> None:
        """Show an inline edit form in the OO-LD Details tab for a literal node."""
        # Collect all (entity, field_name) pairs that point to this literal
        refs: list[tuple[EntityAdapter, str]] = []
        for edge in self._full_visjs_edges:
            if edge.get("to") != lit_id:
                continue
            entity = self.entity_dict.get(edge.get("from", ""))
            if entity is None:
                continue
            field_name = self._field_name_for_predicate(entity, edge.get("label", ""))
            if field_name is not None:
                refs.append((entity, field_name))

        if not refs:
            return

        self._lit_edit_lit_id = lit_id
        self._lit_edit_refs = refs

        # Get current value from the first referenced entity field
        first_entity, first_field = refs[0]
        lit_value = str(first_entity.get(first_field, ""))

        self.oold_detail_col.clear()
        if len(refs) == 1:
            entity, field_name = refs[0]
            self.oold_detail_col.append(pn.pane.Markdown(f"### Edit **{entity.name}**.{field_name}"))
        else:
            names = ", ".join(f"{e.name}.{f}" for e, f in refs)
            self.oold_detail_col.append(pn.pane.Markdown(f"### Edit literal value\n\nAffects: {names}"))

        self._lit_edit_input = pn.widgets.TextInput(value=lit_value, name="New value", width=300)
        apply_btn = pn.widgets.Button(name="Apply", button_type="primary", width=100)
        apply_btn.on_click(self._on_literal_edit_apply)
        cancel_btn = pn.widgets.Button(name="Cancel", button_type="default", width=100)
        cancel_btn.on_click(lambda _: self.oold_detail_col.clear())

        self.oold_detail_col.append(self._lit_edit_input)
        self.oold_detail_col.append(pn.Row(apply_btn, cancel_btn))
        self.detail_tabs.active = 2  # OO-LD Details tab

    def _on_literal_edit_apply(self, event: Any) -> None:
        """Apply the edited literal value to all referenced entity fields."""
        if not hasattr(self, "_lit_edit_refs") or not hasattr(self, "_lit_edit_input"):
            return

        new_value_str = self._lit_edit_input.value

        self._save_state()

        for entity, field_name in self._lit_edit_refs:
            try:
                new_val = self._deserialize_property_value(entity, field_name, new_value_str)
                entity.set(field_name, new_val)
            except Exception as e:
                print(f"Error updating {entity.name}.{field_name}: {e}")

        # Literal node IDs are entity-scoped (<iri>#<field>), so the ID is stable across value changes.
        self._full_sync_after_edit()
        self.oold_detail_col.clear()

    def _field_inner_model_type(self, entity: "EntityAdapter", field_name: str) -> dict | None:
        """Return the target schema dict if field_name expects a sub-object, else None."""
        props = self.introspector.get_properties(entity.schema)
        prop_info = props.get(field_name)
        if prop_info is None:
            return None
        target = prop_info.ref
        if target:
            resolved = self.introspector.resolve_ref(target)
            if resolved is not None:
                return resolved
        return None

    def _build_property_create_schema(self, entity: "EntityAdapter", field_name: str) -> tuple[dict, dict]:
        """Build a JSON Schema and start value for a single-property create form."""
        prop_info = self.introspector.get_properties(entity.schema).get(field_name)
        if prop_info is None:
            return {"type": "object", "properties": {field_name: {"type": "string"}}}, {field_name: ""}

        cleaned = self._clean_prop_for_editor(prop_info.raw_schema)
        schema = {"type": "object", "properties": {field_name: cleaned}}
        current = entity.get(field_name)
        if current is not None:
            start = {field_name: current}
        else:
            default = prop_info.default if prop_info.default is not MISSING else None
            start = {field_name: default}
        return schema, start

    # -- Schema property creation ------------------------------------------------

    _PROPERTY_DEF_SCHEMA: ClassVar[dict] = {
        "type": "object",
        "title": "New Property",
        "properties": {
            "name": {"type": "string", "description": "Property name (key in the schema)."},
            "type": {
                "type": "string",
                "enum": ["string", "integer", "number", "boolean", "array", "object"],
                "default": "string",
                "description": "JSON Schema type.",
            },
            "description": {
                "type": "string",
                "default": "",
                "description": "Human-readable description.",
            },
            "default": {"description": "Default value (leave empty for none)."},
            "nullable": {
                "type": "boolean",
                "default": True,
                "description": "Wrap in anyOf with null.",
            },
            "items_type": {
                "type": "string",
                "enum": ["string", "integer", "number", "boolean", "object"],
                "default": "string",
                "description": "Element type (only for arrays).",
            },
            "context_iri": {
                "type": "string",
                "default": "",
                "description": "JSON-LD predicate IRI (e.g. ex:HasAge).",
            },
            "is_iri_reference": {
                "type": "boolean",
                "default": False,
                "description": "Mark as @type:@id in JSON-LD context.",
            },
            "x_oold_range": {
                "type": "string",
                "default": "",
                "description": "OO-LD range constraint ($id of target schema).",
            },
        },
        "required": ["name", "type"],
    }

    def _show_create_property_form(self, class_node_id: str) -> None:
        """Show a form to define a new property on a class/schema node."""
        schema = self._get_class_for_node_id(class_node_id)
        if schema is None:
            return
        self._create_prop_class_node_id = class_node_id
        type_name = self.introspector.get_type_name(schema)

        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown(f"### Create New Property on **{type_name}**"))

        start_val = {
            "name": "",
            "type": "string",
            "description": "",
            "nullable": True,
            "items_type": "string",
            "context_iri": "",
            "is_iri_reference": False,
            "x_oold_range": "",
        }
        self._create_prop_input = JsonEditor(
            value=start_val,
            options={"schema": self._PROPERTY_DEF_SCHEMA, "startval": start_val},
            compact=True,
            sizing_mode="stretch_width",
        )
        apply_btn = pn.widgets.Button(name="Apply", button_type="primary", width=100)
        apply_btn.on_click(self._on_create_property_apply)
        cancel_btn = pn.widgets.Button(name="Cancel", button_type="default", width=100)
        cancel_btn.on_click(lambda _: self.oold_detail_col.clear())

        self.oold_detail_col.append(self._create_prop_input)
        self.oold_detail_col.append(pn.Row(apply_btn, cancel_btn))
        self.detail_tabs.active = 2

    def _on_create_property_apply(self, event: Any) -> None:
        """Apply a new property definition to the class schema."""
        node_id = getattr(self, "_create_prop_class_node_id", None)
        if node_id is None:
            return
        schema = self._get_class_for_node_id(node_id)
        if schema is None:
            return

        val = self._create_prop_input.value
        prop_name = (val.get("name") or "").strip()
        if not prop_name:
            print("Property name is required")
            return

        self._save_state()

        prop_schema = self._build_prop_schema_from_form(val)
        schema.setdefault("properties", {})[prop_name] = prop_schema

        self._add_property_to_context(schema, prop_name, val)

        self._apply_schema_text_changes(node_id, schema)
        self.oold_detail_col.clear()

    @staticmethod
    def _build_prop_schema_from_form(val: dict) -> dict:
        """Convert the create-property form values into a JSON Schema property dict."""
        prop_type = val.get("type", "string")
        nullable = val.get("nullable", True)
        description = (val.get("description") or "").strip()
        x_range = (val.get("x_oold_range") or "").strip()

        inner: dict[str, Any] = {}
        if prop_type == "array":
            items_type = val.get("items_type", "string")
            inner = {"type": "array", "items": {"type": items_type}}
        else:
            inner = {"type": prop_type}

        if nullable:
            prop_schema: dict[str, Any] = {"anyOf": [inner, {"type": "null"}], "default": None}
        else:
            prop_schema = dict(inner)

        if "default" in val and val["default"] is not None and val["default"] != "":
            prop_schema["default"] = val["default"]

        if description:
            prop_schema["description"] = description
        if x_range:
            prop_schema["x-oold-range"] = x_range
        return prop_schema

    @staticmethod
    def _add_property_to_context(schema: dict, prop_name: str, val: dict) -> None:
        """Add a JSON-LD context entry for the new property if a context IRI was given."""
        context_iri = (val.get("context_iri") or "").strip()
        if not context_iri:
            return
        ctx = schema.get("@context")
        if isinstance(ctx, list):
            ctx_dicts = [c for c in ctx if isinstance(c, dict)]
            if ctx_dicts:
                target = ctx_dicts[-1]
            else:
                target: dict = {}
                ctx.append(target)
        elif isinstance(ctx, dict):
            target = ctx
        else:
            target = {}
            schema["@context"] = target

        if val.get("is_iri_reference"):
            target[prop_name] = {"@id": context_iri, "@type": "@id"}
        else:
            target[prop_name] = {"@id": context_iri}

    # -- Schema subclass creation ------------------------------------------------

    _SUBCLASS_DEF_SCHEMA: ClassVar[dict] = {
        "$schema": "https://oo-ld.org/latest/meta/oold-meta-schema.json",
        "type": "object",
        "title": "New Subclass",
        "properties": {
            "$id": {
                "type": "string",
                "description": "Unique IRI identifier for the new schema.",
            },
            "title": {
                "type": "string",
                "description": "Human-readable class name.",
            },
            "description": {
                "type": "string",
                "default": "",
                "description": "Description of the new class.",
            },
            "type": {
                "type": "string",
                "default": "object",
                "enum": ["object"],
                "description": "JSON Schema type (always 'object' for classes).",
                "x-oold-ui-form-hidden": True,
            },
            "allOf": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {"$ref": {"type": "string"}},
                },
                "description": "Parent schema references (inheritance).",
            },
            "@context": {
                "description": "JSON-LD context (inherits parent context by reference).",
                "anyOf": [
                    {"type": "object"},
                    {"type": "string"},
                    {"type": "array", "items": {"anyOf": [{"type": "object"}, {"type": "string"}, {"type": "null"}]}},
                    {"type": "null"},
                ],
            },
            "properties": {
                "type": "object",
                "default": {},
                "description": "Own properties (start empty, add later).",
            },
            "x-oold-instance-rdf-type": {
                "type": "array",
                "items": {"type": "string"},
                "default": [],
                "description": "rdf:type(s) for instances (OO-LD spec section 6.3).",
            },
            "defaultProperties": {
                "type": "array",
                "items": {"type": "string"},
                "default": [],
                "description": "Properties shown by default in forms.",
            },
        },
        "required": ["$id", "title"],
    }

    def _show_create_subclass_form(self, parent_node_id: str) -> None:
        """Show a form to create a new subclass inheriting from the given class."""
        parent_schema = self._get_class_for_node_id(parent_node_id)
        if parent_schema is None:
            return
        self._create_subclass_parent_node_id = parent_node_id
        parent_name = self.introspector.get_type_name(parent_schema)
        parent_id = parent_schema.get("$id") or parent_schema.get("iri") or parent_node_id

        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown(f"### Create New Subclass of **{parent_name}**"))

        subclass_id = f"{parent_id.rsplit('.', 1)[0]}Subclass.json" if "." in parent_id else f"{parent_id}/Subclass"
        start_val: dict[str, Any] = {
            "$id": subclass_id,
            "title": f"{parent_name}Subclass",
            "description": "",
            "type": "object",
            "allOf": [{"$ref": parent_id}],
            "@context": [parent_id, {}],
            "properties": {"type": {"type": "string", "default": subclass_id}},
            "x-oold-instance-rdf-type": [subclass_id],
            "defaultProperties": ["type", "name"],
        }

        self._create_subclass_input = JsonEditor(
            value=start_val,
            options={"schema": self._SUBCLASS_DEF_SCHEMA, "startval": start_val},
            compact=True,
            sizing_mode="stretch_width",
        )
        apply_btn = pn.widgets.Button(name="Apply", button_type="primary", width=100)
        apply_btn.on_click(self._on_create_subclass_apply)
        cancel_btn = pn.widgets.Button(name="Cancel", button_type="default", width=100)
        cancel_btn.on_click(lambda _: self.oold_detail_col.clear())

        self.oold_detail_col.append(self._create_subclass_input)
        self.oold_detail_col.append(pn.Row(apply_btn, cancel_btn))
        self.detail_tabs.active = 2

    def _on_create_subclass_apply(self, event: Any) -> None:
        """Apply the new subclass schema: register it and rebuild the graph."""
        parent_node_id = getattr(self, "_create_subclass_parent_node_id", None)
        if parent_node_id is None:
            return

        new_schema = self._create_subclass_input.value
        if not isinstance(new_schema, dict):
            return
        schema_id = (new_schema.get("$id") or "").strip()
        title = (new_schema.get("title") or "").strip()
        if not schema_id or not title:
            print("$id and title are required")
            return

        self._save_state()

        new_schema.setdefault("type", "object")
        new_schema.setdefault("properties", {})
        new_schema["properties"].setdefault("type", {"type": "string", "default": schema_id})

        self.schema_registry[schema_id] = new_schema
        self.schema_registry[title] = new_schema
        self.entity_types[title] = new_schema

        self.introspector = OOLDSchemaIntrospector(self.schema_registry)

        new_node_id = _cls_node_id(new_schema)
        nodes_before = {n["id"] for n in self._full_visjs_nodes}
        self._rebuild_visjs_edges()
        self._reveal_new_schema_nodes(parent_node_id, nodes_before)

        self.visnetwork_panel.nodes = list(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)
        self.oold_detail_col.clear()
        self.show_node_details(new_node_id)

    def _show_property_create_form(self, entity_id: str, field_name: str) -> None:
        """Show an inline create form for a single property using the panelini JsonEditor."""
        entity = self.entity_dict.get(entity_id)
        if entity is None:
            return
        self._create_entity_id = entity_id
        self._create_field_name = field_name
        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown(f"### Create **{entity.name}**.{field_name}"))

        inner_type = self._field_inner_model_type(entity, field_name)
        self._create_is_subobject = inner_type is not None

        apply_btn = pn.widgets.Button(name="Apply", button_type="primary", width=100)
        apply_btn.on_click(self._on_property_create_apply)
        cancel_btn = pn.widgets.Button(name="Cancel", button_type="default", width=100)
        cancel_btn.on_click(lambda _: self.oold_detail_col.clear())

        if self._create_is_subobject:
            self._create_inner_type = inner_type
            inner_schema = self._build_editor_schema(inner_type)
            inner_props = self.introspector.get_properties(inner_type)
            default_values: dict[str, Any] = {}
            if "uuid" in inner_props:
                default_values["uuid"] = str(uuid.uuid4())
            if "name" in inner_props:
                default_values["name"] = f"New{self.introspector.get_type_name(inner_type)}"
            self._create_input = JsonEditor(
                value=default_values,
                options={"schema": inner_schema, "startval": default_values},
                compact=True,
                sizing_mode="stretch_width",
            )
        else:
            schema, start_val = self._build_property_create_schema(entity, field_name)
            self._create_input = JsonEditor(
                value=start_val,
                options={"schema": schema, "startval": start_val},
                compact=True,
                sizing_mode="stretch_width",
            )

        self.oold_detail_col.append(self._create_input)
        self.oold_detail_col.append(pn.Row(apply_btn, cancel_btn))
        self.detail_tabs.active = 2

    def _on_property_create_apply(self, event: Any) -> None:  # noqa: C901
        """Apply a newly created field value; routes to sub-object, IRI edge, or typed literal."""
        entity = self.entity_dict.get(getattr(self, "_create_entity_id", None))
        field_name = getattr(self, "_create_field_name", None)
        if entity is None or field_name is None:
            return

        self._save_state()

        if getattr(self, "_create_is_subobject", False):
            data = self._create_input.value
            if not data:
                return
            inner_type = self._create_inner_type
            inner_type_name = self.introspector.get_type_name(inner_type)
            try:
                sub_obj = EntityAdapter(data, inner_type, inner_type_name, self.schema_registry)
            except Exception as exc:
                print(f"Error creating sub-object {inner_type_name}: {exc}")
                return
            # Append to list field or set scalar field
            prop_info = self.introspector.get_properties(entity.schema).get(field_name)
            if prop_info is not None:
                _base_type, is_list, _is_optional = self.introspector.classify_property(prop_info)
            else:
                is_list = False
            if is_list:
                current = list(entity.get(field_name) or [])
                entity.set(field_name, [*current, sub_obj.data])
            else:
                entity.set(field_name, sub_obj.data)

            # Register sub-object as a top-level entity so the graph shows it as a node
            sub_iri = sub_obj.get_iri()
            self.entity_list.append(sub_obj)
            self.entity_dict[sub_iri] = sub_obj
            sub_type_name = inner_type_name
            new_node = {
                "id": sub_iri,
                "label": data.get("name", sub_iri),
                "shape": "ellipse",
                "entity_type": sub_type_name,
                "color": self._get_color_for_type(sub_type_name),
            }
            self._full_visjs_nodes.append(dict(new_node))
            if self._visible_node_ids is not None:
                self._visible_node_ids.add(sub_iri)

            self._full_sync_after_edit(replace_nodes=True)
            self.oold_detail_col.clear()
            return

        editor_val = self._create_input.value
        raw = editor_val.get(field_name) if isinstance(editor_val, dict) else editor_val
        if raw is None or (isinstance(raw, str) and not raw.strip()):
            return
        if isinstance(raw, str):
            raw = raw.strip()

        is_iri = self._is_iri_field(entity, field_name)
        known_ids = set(self.entity_dict.keys()) | {_cls_node_id(c) for c in (self.entity_types or {}).values()}

        new_node_ids: list[str] = []

        if is_iri:
            iri_values = raw if isinstance(raw, list) else [raw]
            iri_values = [v for v in iri_values if isinstance(v, str) and v.strip()]
            if not iri_values:
                return
            prop_info = self.introspector.get_properties(entity.schema).get(field_name)
            if prop_info is not None:
                _base_type, is_list, _is_optional = self.introspector.classify_property(prop_info)
            else:
                is_list = isinstance(raw, list)
            entity.set(field_name, iri_values if is_list else iri_values[0])
            for v in iri_values:
                if v in known_ids:
                    new_node_ids.append(v)
        else:
            try:
                new_val = self._deserialize_property_value(entity, field_name, raw)
                entity.set(field_name, new_val)
            except Exception as exc:
                print(f"Error creating {entity.name}.{field_name}: {exc}")
                return
            base_lit_id = f"{entity.get_iri()}#{field_name}"
            new_node_ids.append(base_lit_id)
            if isinstance(raw, list):
                for i in range(1, len(raw)):
                    new_node_ids.append(f"{base_lit_id}_{i}")

        if self._visible_node_ids is not None:
            for nid in new_node_ids:
                self._visible_node_ids.add(nid)

        self._full_sync_after_edit(replace_nodes=True)
        self.oold_detail_col.clear()

    # ===== Synchronization =====

    def _rebuild_rdf_graph(self) -> None:
        """Rebuild RDF graph from all entities in entity_list."""
        self.rdf_graph = RDFGraph()
        for entity in self.entity_list:
            self.rdf_graph.parse(data=json.dumps(entity.to_jsonld()), format="json-ld")
        self._build_iri_maps()

    def _rebuild_visjs_edges(self) -> None:
        """Rebuild all edges (RDF + class hierarchy). Updates _full_visjs_* and applies filter.

        Uses _full_visjs_nodes as the working node set so that _build_class_graph()
        sees the complete node inventory (entity + class nodes).
        After building, stores the result in _full_visjs_edges/_full_visjs_nodes,
        then applies the visibility filter to produce visjs_nodes/visjs_edges.
        """
        # Work on the full node set so _build_class_graph() idempotency checks are correct.
        # Drop stale literal nodes --they are rebuilt fresh from the current RDF.
        self.visjs_nodes = [n for n in self._full_visjs_nodes if n.get("node_kind") != "literal"]
        self.visjs_edges = []

        all_entity_ids = set(self.entity_dict.keys())
        self._build_rdf_edges(all_entity_ids)

        # Add class hierarchy (IsA / definesProperty / HasType)
        self._build_class_graph()

        # Persist full graph (class nodes may have been added by _build_class_graph)
        self._full_visjs_nodes = [dict(n) for n in self.visjs_nodes]
        self._full_visjs_edges = [dict(e) for e in self.visjs_edges]

        # Apply visibility filter
        self._apply_visibility_filter_inplace()

    def _build_class_graph(self) -> None:  # noqa: C901
        """Add class-hierarchy nodes and edges for all types in entity_types.

        Uses OO-LD schema introspection (allOf/$ref, properties, @context)
        instead of Python class introspection.

        Always emits all nodes/edges --no visibility filtering.
        Safe to call multiple times --every node/edge is only added if absent.
        """
        if not self.entity_types:
            return

        existing_node_ids = {n["id"] for n in self.visjs_nodes}

        def _ensure_node(schema: dict, color: str = _CLS_NODE_COLOR) -> str:
            nid = _cls_node_id(schema)
            if nid not in existing_node_ids:
                self.visjs_nodes.append({
                    "id": nid,
                    "label": self.introspector.get_type_name(schema),
                    "color": color,
                    "shape": "ellipse",
                    "node_kind": "class",
                })
                existing_node_ids.add(nid)
            return nid

        existing_edges: set[tuple] = {(e.get("from"), e.get("to"), e.get("label")) for e in self.visjs_edges}

        def _add_edge(from_id: str, to_id: str, label: str, **kwargs: Any) -> None:
            key = (from_id, to_id, label)
            if key not in existing_edges:
                self.visjs_edges.append({"from": from_id, "to": to_id, "label": label, "arrows": "to", **kwargs})
                existing_edges.add(key)

        for schema in self.entity_types.values():
            cls_nid = _ensure_node(schema)

            # IsA edges via allOf $ref
            for ref in self.introspector.get_parent_schema_refs(schema):
                parent = self.introspector.resolve_ref(ref)
                if parent is not None:
                    parent_nid = _ensure_node(parent)
                    _add_edge(cls_nid, parent_nid, "IsA", color=_ISA_EDGE_COLOR)

            # definesProperty edges (own fields only)
            own_field_names = self.introspector.get_own_properties(schema)
            all_props = self.introspector.get_properties(schema)
            for field_name in own_field_names:
                prop_info = all_props.get(field_name)
                if prop_info is None:
                    continue
                field_nid = f"{cls_nid}#field_{field_name}"
                if field_nid not in existing_node_ids:
                    self.visjs_nodes.append({
                        "id": field_nid,
                        "label": field_name,
                        "color": _FIELD_NODE_COLOR,
                        "shape": "ellipse",
                        "node_kind": "field",
                    })
                    existing_node_ids.add(field_nid)
                _add_edge(cls_nid, field_nid, "definesProperty")

                # HasRange
                target_ref = prop_info.ref or prop_info.range
                target_schema = self.introspector.resolve_ref(target_ref) if target_ref else None
                if target_schema is not None:
                    ann_nid = _ensure_node(target_schema)
                else:
                    ann_nid = f"{field_nid}#type"
                    if ann_nid not in existing_node_ids:
                        base_type, is_list, _ = self.introspector.classify_property(prop_info)
                        type_label = f"list[{base_type}]" if is_list else base_type
                        self.visjs_nodes.append({
                            "id": ann_nid,
                            "label": type_label,
                            "color": _ATTR_VAL_NODE_COLOR,
                            "shape": "ellipse",
                            "node_kind": "type",
                        })
                        existing_node_ids.add(ann_nid)
                _add_edge(field_nid, ann_nid, "HasRange", color=_ISA_EDGE_COLOR)

                # default value node
                if not prop_info.required and prop_info.default is not MISSING:
                    default_nid = f"{field_nid}#default"
                    if default_nid not in existing_node_ids:
                        try:
                            default_label = json.dumps(prop_info.default)
                        except Exception:
                            default_label = str(prop_info.default)
                        self.visjs_nodes.append({
                            "id": default_nid,
                            "label": _truncate(default_label),
                            "color": _ATTR_VAL_NODE_COLOR,
                            "shape": "ellipse",
                            "node_kind": "default",
                        })
                        existing_node_ids.add(default_nid)
                    _add_edge(field_nid, default_nid, "default")

                # description node
                if prop_info.description:
                    desc_nid = f"{field_nid}#description"
                    if desc_nid not in existing_node_ids:
                        self.visjs_nodes.append({
                            "id": desc_nid,
                            "label": _truncate(prop_info.description),
                            "color": _ATTR_VAL_NODE_COLOR,
                            "shape": "ellipse",
                            "node_kind": "description",
                        })
                        existing_node_ids.add(desc_nid)
                    _add_edge(field_nid, desc_nid, "description")

                # constraint nodes
                constraint_map = {
                    "minimum": "ge",
                    "maximum": "le",
                    "exclusiveMinimum": "gt",
                    "exclusiveMaximum": "lt",
                    "minLength": "min_length",
                    "maxLength": "max_length",
                    "multipleOf": "multiple_of",
                }
                for json_key, attr_label in constraint_map.items():
                    val = prop_info.constraints.get(json_key)
                    if val is not None:
                        constraint_nid = f"{field_nid}#constraint_{attr_label}"
                        if constraint_nid not in existing_node_ids:
                            self.visjs_nodes.append({
                                "id": constraint_nid,
                                "label": str(val),
                                "color": _ATTR_VAL_NODE_COLOR,
                                "shape": "ellipse",
                                "node_kind": "constraint",
                            })
                            existing_node_ids.add(constraint_nid)
                        _add_edge(field_nid, constraint_nid, attr_label)

        # HasType edges from all instances to their class
        all_node_ids = {n["id"] for n in self.visjs_nodes}
        for entity in self.entity_list:
            type_name = entity.type_name
            if type_name not in self.entity_types:
                continue
            cls_nid = _cls_node_id(self.entity_types[type_name])
            instance_iri = entity.get_iri()
            if instance_iri not in all_node_ids or cls_nid not in all_node_ids:
                continue
            _add_edge(instance_iri, cls_nid, "HasType", color=_HAS_TYPE_EDGE_COLOR)

    def _sync_entity_to_visjs(self, entity: EntityAdapter) -> None:
        """Sync a single entity's data to its corresponding visjs node.

        Updates node label if entity.name changed.  Both the filtered
        (``visjs_nodes``) and full (``_full_visjs_nodes``) lists are
        updated so that later visibility rebuilds preserve the change.

        Args:
            entity: The updated entity
        """
        iri = entity.get_iri()
        for node_list in (self._full_visjs_nodes, self.visjs_nodes):
            for node in node_list:
                if node["id"] == iri:
                    node["label"] = entity.name
                    entity_type_name = entity.type_name
                    if "entity_type" not in node:
                        node["entity_type"] = entity_type_name
                    if "color" not in node:
                        node["color"] = self._get_color_for_type(entity_type_name)
                    break

    def _full_sync_after_edit(self, replace_nodes: bool = False) -> None:
        """Perform full sync of all data structures after entity edit.

        Ensures consistency between LinkedBaseModel instances, RDF graph,
        and visualization (nodes and edges).

        Args:
            replace_nodes: When True, replace the entire node list (removes stale nodes
                such as old literal nodes). When False, use update_nodes to preserve
                positions for entity edits where no nodes are added/removed.
        """
        # Snapshot edge keys before rebuild so we can detect genuinely new edges
        old_edge_keys: Optional[set[tuple]] = None
        if self._visible_edge_keys is not None:
            old_edge_keys = {(e.get("from", ""), e.get("to", ""), e.get("label", "")) for e in self._full_visjs_edges}

        # Rebuild RDF graph
        self._rebuild_rdf_graph()

        # Rebuild edges
        self._rebuild_visjs_edges()

        # Auto-reveal edges that are new since the snapshot and have both endpoints visible
        if old_edge_keys is not None:
            visible = self._visible_node_ids or {n["id"] for n in self._full_visjs_nodes}
            for e in self._full_visjs_edges:
                key = (e.get("from", ""), e.get("to", ""), e.get("label", ""))
                if key not in old_edge_keys and e.get("from") in visible and e.get("to") in visible:
                    self._visible_edge_keys.add(key)  # type: ignore[union-attr]
            self._apply_visibility_filter_inplace()

        # Sync node labels
        for entity in self.entity_list:
            self._sync_entity_to_visjs(entity)

        # Reapply active mappings if any are set
        if hasattr(self, "property_mappings") and any(self.property_mappings.values()):
            print("Reapplying active visualization mappings after edit...")
            self._apply_all_mappings()

        # Remove any literal nodes that no longer exist after the rebuild
        current_node_ids = {n["id"] for n in self.visjs_nodes}
        stale_literal_ids = [
            n["id"]
            for n in self.visnetwork_panel.nodes
            if n.get("node_kind") == "literal" and n["id"] not in current_node_ids
        ]
        if stale_literal_ids:
            self.visnetwork_panel.remove_nodes(stale_literal_ids)

        # Update visnetwork --replace_nodes removes stale non-literal nodes; update_nodes preserves positions
        if replace_nodes:
            self.visnetwork_panel.nodes = list(self.visjs_nodes)
        else:
            self.visnetwork_panel.update_nodes(self.visjs_nodes)
        self.visnetwork_panel.edges = list(self.visjs_edges)

        # Refresh tables if displayed
        if hasattr(self, "oold_comparison_tabulator"):
            self._refresh_oold_tabulators()

    # ===== Event Handlers =====

    def on_single_node_apply_changes(self, event: Any) -> None:
        """Callback when 'Apply Changes' button is clicked for single node editing.

        Delegates to the unified apply handler. Kept for backward compatibility.
        """
        self._on_oold_form_apply(event)

    def _apply_comparison_table(self) -> None:
        """Apply individual edits from the comparison tabulator to entity data."""
        comparison_df = self.oold_comparison_tabulator.value
        for _idx, row in comparison_df.iterrows():
            entity_iri = row["_iri"]
            if entity_iri not in self.entity_dict:
                continue
            entity = self.entity_dict[entity_iri]
            for col in comparison_df.columns:
                if col == "_iri":
                    continue
                entity_props = self.introspector.get_properties(entity.schema)
                if col in entity_props:
                    try:
                        value = row[col]
                        deserialized = self._deserialize_property_value(entity, col, value)
                        entity.set(col, deserialized)
                    except Exception as e:
                        print(f"  Warning: Could not update {entity_iri}.{col}: {e}")

    def _on_multi_node_individual_apply(self, event: Any) -> None:
        """Apply only individual edits from the comparison table to the graph."""
        try:
            if not hasattr(self, "oold_comparison_tabulator"):
                return
            self._save_state()
            self._apply_comparison_table()
            self._full_sync_after_edit()
        except Exception as e:
            print(f"Error applying individual changes: {e}")
            import traceback

            traceback.print_exc()

    def on_multi_node_apply_changes(self, event: Any) -> None:  # noqa: C901
        """Callback when 'Apply to All' button is clicked for multi-node editing.

        Applies changes from the set-all table to all selected entities.

        Args:
            event: Button click event
        """
        try:
            if not hasattr(self, "oold_set_all_tabulator"):
                return

            self._save_state()

            set_all_df = self.oold_set_all_tabulator.value

            # Apply changes from set-all table (bulk edits)
            if len(set_all_df) > 0:
                set_all_row = set_all_df.iloc[0]
                for col in set_all_df.columns:
                    if col == "_iri":
                        continue

                    value = set_all_row[col]
                    if value is not None and value != "":
                        for node_id in self._current_selected_node_ids:
                            if node_id in self.entity_dict:
                                entity = self.entity_dict[node_id]
                                entity_props = self.introspector.get_properties(entity.schema)
                                if col in entity_props:
                                    try:
                                        deserialized = self._deserialize_property_value(entity, col, value)
                                        entity.set(col, deserialized)
                                    except Exception as e:
                                        print(f"  Warning: Could not update {node_id}.{col}: {e}")

            self._full_sync_after_edit()

        except Exception as e:
            print(f"Error applying multi-node changes: {e}")
            import traceback

            traceback.print_exc()

    def _on_node_created(self, node_data: dict[str, Any]) -> None:
        """Pin a freshly placed node and store its position for later entity creation.

        Called after the user clicks in the canvas during addNodeMode.
        The node already exists in vis-network's DataSet at this point, so
        update_nodes() with fixed=True takes immediate effect.
        """
        node_id = node_data.get("id")
        x = node_data.get("x")
        y = node_data.get("y")
        if node_id is None:
            return
        # Pin the temp node so it doesn't drift while the user fills the form
        self.visnetwork_panel.update_nodes([{"id": node_id, "x": x, "y": y, "fixed": True}])
        # Store position so on_new_entity_save can place the entity node here
        if not hasattr(self, "_pending_node_positions"):
            self._pending_node_positions: dict[Any, dict] = {}
        self._pending_node_positions[node_id] = {"x": x, "y": y}

    @staticmethod
    def _derive_new_iri_from_parts(parent_iri: str, parent_uuid: str, new_uuid: str) -> str:
        """Derive a new IRI by replacing the parent UUID in the parent IRI."""
        if parent_uuid and parent_iri and parent_uuid in parent_iri:
            return parent_iri.replace(parent_uuid, new_uuid, 1)
        return f"urn:uuid:{new_uuid}"

    def _derive_new_iri(self, parent_entity: "EntityAdapter", new_uuid: str) -> str:
        """Derive a new IRI for a duplicated entity based on its parent's IRI pattern."""
        parent_iri = parent_entity.get_iri()
        parent_uuid = parent_entity.get("uuid", "")
        return self._derive_new_iri_from_parts(parent_iri, parent_uuid, new_uuid)

    def _reassign_and_register_subobjects(self, entity: "EntityAdapter") -> None:  # noqa: C901
        """Recursively give each sub-object field a new UUID and register it as a standalone entity.

        Called after deep-copying a parent entity so that embedded sub-objects don't share
        IRIs with the originals.
        """
        props = self.introspector.get_properties(entity.schema)
        for field_name, prop_info in props.items():
            if field_name in _SKIP_FIELDS:
                continue
            if prop_info.range:
                continue
            inner_type = self._field_inner_model_type(entity, field_name)
            if inner_type is None:
                continue
            val = entity.get(field_name)
            if not val:
                continue
            is_list = isinstance(val, list)
            items = val if is_list else [val]
            inner_type_name = self.introspector.get_type_name(inner_type)
            new_items = []
            for sub_obj in items:
                if not isinstance(sub_obj, (dict, EntityAdapter)):
                    new_items.append(sub_obj)
                    continue
                try:
                    if isinstance(sub_obj, EntityAdapter):
                        sub_data = json.loads(json.dumps(sub_obj.data, default=str))
                    else:
                        sub_data = json.loads(json.dumps(sub_obj, default=str))
                    old_uuid = sub_data.get("uuid", "")
                    old_iri = sub_data.get("id") or sub_data.get("@id", "")
                    sub_data.pop("id", None)
                    sub_data.pop("__iris__", None)
                    new_sub_uuid = str(uuid.uuid4())
                    sub_data["uuid"] = new_sub_uuid
                    sub_data["id"] = self._derive_new_iri_from_parts(old_iri, old_uuid, new_sub_uuid)
                    new_sub = EntityAdapter(sub_data, inner_type, inner_type_name, self.schema_registry)
                except Exception:
                    new_items.append(sub_obj)
                    continue
                # Recurse for nested sub-objects
                self._reassign_and_register_subobjects(new_sub)
                # Register as a standalone entity so the graph shows it
                sub_iri = new_sub.get_iri()
                self.entity_list.append(new_sub)
                self.entity_dict[sub_iri] = new_sub
                new_node = {
                    "id": sub_iri,
                    "label": new_sub.name,
                    "shape": "ellipse",
                    "entity_type": inner_type_name,
                    "color": self._get_color_for_type(inner_type_name),
                }
                self._full_visjs_nodes.append(dict(new_node))
                if self._visible_node_ids is not None:
                    self._visible_node_ids.add(sub_iri)
                new_items.append(new_sub.data)
            entity.set(field_name, new_items if is_list else (new_items[0] if new_items else None))

    def on_nodes_duplicated(self, duplicated_nodes: list[dict[str, Any]]) -> None:
        """Callback when nodes are duplicated via Ctrl+drag.

        Creates a deep copy of each entity with a new UUID and "<name> (copy)" label.
        The JS side passes the *duplicated* node dict (temp ID), not the original IRI,
        so we look up the source entity by label + type.
        """
        try:
            self._save_state()  # save BEFORE mutations so undo restores the pre-copy state

            for dup_node in duplicated_nodes:
                entity_type_name = dup_node.get("entity_type", "")
                if entity_type_name not in self.entity_types:
                    continue

                entity_type = self.entity_types[entity_type_name]
                base_name = dup_node.get("label", "Copy")
                unique_name = self._generate_unique_name(base_name)

                # dup_node.id is a JS-generated temp ID, not an IRI --find source by name
                parent_entity: Optional[EntityAdapter] = None
                for entity in self.entity_list:
                    if entity.type_name == entity_type_name and entity.name == base_name:
                        parent_entity = entity
                        break

                if parent_entity is not None:
                    new_uuid = str(uuid.uuid4())
                    entity_data = json.loads(json.dumps(parent_entity.data, default=str))
                    entity_data.pop("id", None)
                    entity_data.pop("__iris__", None)
                    entity_data["uuid"] = new_uuid
                    entity_data["name"] = unique_name
                    entity_data["id"] = self._derive_new_iri(parent_entity, new_uuid)
                    entity_data["initialized_from"] = parent_entity.get_iri()
                    new_entity = EntityAdapter(entity_data, entity_type, entity_type_name, self.schema_registry)
                    # Deep-copy sub-objects: give each a new UUID and register as standalone entity
                    self._reassign_and_register_subobjects(new_entity)
                else:
                    new_entity = EntityAdapter(
                        {"uuid": str(uuid.uuid4()), "name": unique_name},
                        entity_type,
                        entity_type_name,
                        self.schema_registry,
                    )

                new_iri = new_entity.get_iri()
                self.entity_list.append(new_entity)
                self.entity_dict[new_iri] = new_entity

                new_visjs_node = {
                    "id": new_iri,
                    "label": unique_name,
                    "shape": "ellipse",
                    "entity_type": entity_type_name,
                    "color": self._get_color_for_type(entity_type_name),
                    "x": dup_node.get("x"),
                    "y": dup_node.get("y"),
                    "fixed": dup_node.get("fixed", True),
                }
                # Must add to _full_visjs_nodes: _rebuild_visjs_edges starts from that list.
                self.visjs_nodes.append(new_visjs_node)
                self._full_visjs_nodes.append(dict(new_visjs_node))

                # Keep new node visible when expansion mode is active
                if self._visible_node_ids is not None:
                    self._visible_node_ids.add(new_iri)

            self._available_properties = None
            # replace_nodes=True removes the phantom temp node the JS side injected
            self._full_sync_after_edit(replace_nodes=True)

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

            if from_id is None or to_id is None:
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
                print(f"No object properties found in {source_entity.type_name}")
                return

            # Show popup dialog for property selection
            self._show_edge_property_dialog(source_entity, target_iri, object_properties)

        except Exception as e:
            print(f"Error in edge creation callback: {e}")
            import traceback

            traceback.print_exc()

    def _get_object_properties(self, entity: "EntityAdapter") -> list[dict[str, Any]]:
        """Get all properties that can hold object references (IRIs).

        Args:
            entity: The entity to inspect

        Returns:
            list of dicts with 'name', 'type', 'description' for each object property
        """
        object_props = []
        props = self.introspector.get_properties(entity.schema)

        for prop_name, prop_info in props.items():
            if prop_name in ["id", "type", "__iris__", "uuid"]:
                continue

            base_type, is_list, is_optional = self.introspector.classify_property(prop_info)
            is_object_property = False
            prop_type = "unknown"

            if prop_info.ref and self.introspector.resolve_ref(prop_info.ref):
                is_object_property = True
                target = self.introspector.resolve_ref(prop_info.ref)
                prop_type = (
                    f"list[{self.introspector.get_type_name(target)}]"
                    if is_list
                    else self.introspector.get_type_name(target)
                )

            if self.introspector.is_iri_field(entity.schema, prop_name):
                is_object_property = True
                if prop_type == "unknown":
                    prop_type = "list[IRI]" if is_list else "IRI"

            if is_object_property:
                object_props.append({
                    "name": prop_name,
                    "type": prop_type,
                    "description": prop_info.description or "",
                    "is_list": is_list,
                })

        return object_props

    def _show_edge_property_dialog(  # noqa: C901
        self, source_entity: "EntityAdapter", target_iri: str, object_properties: list[dict[str, Any]]
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
                f"**From:** {source_entity.name}\n\n"
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
                entity_data = source_entity.data
                current_val = entity_data.get(prop_name, None)
                current_value_pane.object = f"**Current value:** `{current_val}`"

        property_select.param.watch(update_current_value, "value")
        # Trigger initial update
        if property_select.value:
            entity_data = source_entity.data
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

                # Get current value
                entity_data = source_entity.data
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
                source_entity.set(prop_name, new_value)
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
                if not (e.get("from") == source_entity.get_iri() and e.get("to") == target_iri)
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
            entity_data = entity.data
            for prop_name, _prop_info in self.introspector.get_properties(entity.schema).items():
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

            # Get PropertyInfo from first entity that has this field
            prop_info = None
            for entity in self.entity_list:
                props = self.introspector.get_properties(entity.schema)
                if prop_name in props:
                    prop_info = props[prop_name]
                    break

            if prop_info is None:
                self._property_types[prop_name] = "unknown"
                continue

            base_type, is_list, is_optional = self.introspector.classify_property(prop_info)

            # Skip lists and complex types
            if is_list:
                continue

            # Classify
            if base_type in ("integer", "number"):
                self._property_types[prop_name] = "numeric"
            elif base_type == "boolean" or prop_info.enum_values:
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

            entity_data = entity.data

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
                value = entity.type_name if prop_name == "entity_type" else entity_data.get(prop_name)
                old_color = node.get("color")
                new_color = transformers["color"](value)
                node["color"] = new_color
                print(f"  Node {entity.name}: value={value}, color={old_color} -> {new_color}")

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
                value = entity.type_name if prop_name == "entity_type" else entity_data.get(prop_name)
                old_shape = node.get("shape")
                new_shape = transformers["shape"](value)
                node["shape"] = new_shape
                print(f"  Node {entity.name}: type={value}, shape={old_shape} -> {new_shape}")

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
            entity_data = entity.data
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
            entity_data = entity.data
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
                entity_data = entity.data
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
            entity_data = entity.data
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
            entity_types = {entity.type_name for entity in self.entity_list}
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
            entity_data = entity.data
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
                entity_type_name = entity.type_name
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

    # ===== Query Tab =====

    def _get_all_edge_labels(self) -> list[str]:
        """Return sorted unique edge labels from the full graph."""
        labels: set[str] = set()
        for e in self._full_visjs_edges:
            lbl = e.get("label")
            if lbl:
                labels.add(lbl)
        return sorted(labels)

    def _build_query_schema(self) -> dict:
        """Build a JSON Schema for the multi-policy query editor."""
        labels = self._get_all_edge_labels()
        relation_enum = []
        for lbl in labels:
            relation_enum.append(lbl)
            relation_enum.append(f"-{lbl}")
        step_schema = {
            "type": "object",
            "title": "Step",
            "properties": {
                "relations": {
                    "type": "array",
                    "title": "Relations",
                    "items": {
                        "type": "string",
                        "enum": relation_enum if relation_enum else ["(no relations)"],
                    },
                    "description": "Edge labels to follow (prefix - for inverse/incoming)",
                },
                "iter_limit": {
                    "type": "integer",
                    "title": "Depth Limit",
                    "default": 1,
                    "minimum": 1,
                    "description": "Max BFS depth per step",
                },
            },
            "required": ["relations"],
        }
        return {
            "type": "object",
            "title": "Query",
            "properties": {
                "policies": {
                    "type": "array",
                    "format": "tabs",
                    "title": "Policies",
                    "items": {
                        "type": "object",
                        "title": "Policy",
                        "properties": {
                            "root_node": {
                                "type": "string",
                                "title": "Root Node",
                                "description": "Name or ID of the root node",
                            },
                            "steps": {
                                "type": "array",
                                "title": "Steps",
                                "items": step_schema,
                                "default": [{"relations": [], "iter_limit": 1}],
                            },
                        },
                        "required": ["root_node", "steps"],
                    },
                },
            },
        }

    def _build_query_node_options(self) -> list[str]:
        """Return display strings for all nodes: 'label (id)'."""
        options = []
        for n in self._full_visjs_nodes:
            nid = n.get("id", "")
            label = n.get("label", nid)
            options.append(f"{label} ({nid})")
        return sorted(options)

    def _init_query_tab(self) -> None:
        """Initialize query tab schema and pre-populate from current policy."""
        if not hasattr(self, "_query_editor"):
            return

        schema = self._build_query_schema()
        empty_policy = {"root_node": "", "steps": [{"relations": [], "iter_limit": 1}]}
        startval = {"policies": [empty_policy]}

        policies = self._extract_policies_from_expansion()
        if policies:
            policy_vals = []
            for p in policies:
                root_id = self._resolve_root_id(p.root_node)
                root_label = self._node_display_name(root_id) if root_id else ""
                steps_val = []
                for step in p.expansion_steps:
                    steps_val.append({
                        "relations": list(step.relations),
                        "iter_limit": step.iter_limit if step.iter_limit is not None else 1,
                    })
                policy_vals.append({
                    "root_node": root_label,
                    "steps": steps_val if steps_val else [{"relations": [], "iter_limit": 1}],
                })
            if policy_vals:
                startval = {"policies": policy_vals}

        self._query_editor.set_schema(schema, startval=startval)
        self._update_query_status()

    def _node_display_name(self, node_id: str) -> str:
        """Return the display label for a node ID, or the ID itself."""
        for n in self._full_visjs_nodes:
            if n.get("id") == node_id:
                return n.get("label", node_id)
        return node_id

    def _resolve_query_root(self, root_str: str) -> Optional[str]:
        """Resolve a user-typed root node string to a node ID.

        Matches by exact ID, exact label (case-insensitive), or 'label (id)' format.
        """
        if not root_str:
            return None
        root_str = root_str.strip()
        for n in self._full_visjs_nodes:
            if n.get("id") == root_str:
                return root_str
        for n in self._full_visjs_nodes:
            if n.get("label", "").lower() == root_str.lower():
                return n["id"]
        idx = root_str.rfind("(")
        if idx != -1:
            candidate = root_str[idx + 1 :].rstrip(")")
            for n in self._full_visjs_nodes:
                if n.get("id") == candidate:
                    return candidate
        return None

    def _extract_policies_from_expansion(self) -> list["SingleNodeExpansionPolicy"]:
        """Extract the list of SingleNodeExpansionPolicy from the current expansion_policy."""
        if isinstance(self.expansion_policy, MultiExpansionPolicy):
            return list(self.expansion_policy.expansion_policies)
        if isinstance(self.expansion_policy, SingleNodeExpansionPolicy):
            return [self.expansion_policy]
        return []

    @staticmethod
    def _resolve_root_id(root: Any) -> Optional[str]:
        """Resolve a root_node value to a node ID string."""
        if isinstance(root, EntityAdapter):
            return root.get_iri()
        if isinstance(root, str):
            return root
        if isinstance(root, dict):
            return root.get("id") or root.get("@id", "")
        if isinstance(root, LinkedBaseModel):
            return str(root.get_iri())
        return None

    def _on_query_apply(self, event: Any) -> None:
        """Apply the query expansion policy built from the UI.

        Stateless: always resets visibility before computing so the result
        never depends on a previous apply / show-all cycle.
        """
        editor_val = self._query_editor.get_value()
        policies_data = editor_val.get("policies", [])
        if not policies_data:
            self._query_status.object = "**Error:** Add at least one policy."
            return

        # Reset visibility to a clean slate before computing
        self._visible_node_ids = None
        self._visible_edge_keys = None

        all_nodes: set[str] = set()
        all_edges: set[tuple] = set()
        errors: list[str] = []

        for i, p_data in enumerate(policies_data):
            root_str = p_data.get("root_node", "")
            root_id = self._resolve_query_root(root_str)
            if not root_id:
                errors.append(f"Policy {i + 1}: root '{root_str}' not found")
                continue

            steps_data = p_data.get("steps", [])
            expansion_steps = []
            for s in steps_data:
                rels = s.get("relations", [])
                if not rels:
                    continue
                limit = s.get("iter_limit", 1)
                expansion_steps.append(
                    ExpansionStep(
                        uuid=str(uuid.uuid4()),
                        name=f"step_{len(expansion_steps)}",
                        relations=rels,
                        iter_limit=limit,
                    )
                )
            if not expansion_steps:
                errors.append(f"Policy {i + 1}: no steps with relations")
                continue

            policy = SingleNodeExpansionPolicy(
                uuid=str(uuid.uuid4()),
                name=f"query_{root_id}",
                root_node=root_id,
                expansion_steps=expansion_steps,
            )
            vis_nodes, vis_edges = self._apply_single_policy(policy)
            all_nodes |= vis_nodes
            all_edges |= vis_edges

        if not all_nodes:
            msg = "**Error:** No matching nodes found."
            if errors:
                msg += "\n\n" + "\n".join(f"- {e}" for e in errors)
            self._query_status.object = msg
            return

        self._visible_node_ids = all_nodes
        self._visible_edge_keys = all_edges
        self._apply_visibility_filter_inplace()
        self.visnetwork_panel.nodes = self.visjs_nodes
        self.visnetwork_panel.edges = self.visjs_edges
        self._update_query_status(errors)

    def _on_query_show_all(self, event: Any) -> None:
        """Reset visibility to show all nodes and edges."""
        self._visible_node_ids = None
        self._visible_edge_keys = None
        self._apply_visibility_filter_inplace()
        self.visnetwork_panel.nodes = self.visjs_nodes
        self.visnetwork_panel.edges = self.visjs_edges
        self._update_query_status()

    def _update_query_status(self, errors: list[str] | None = None) -> None:
        """Update the query status markdown with current visibility counts."""
        if not hasattr(self, "_query_status"):
            return
        total_nodes = len(self._full_visjs_nodes)
        total_edges = len(self._full_visjs_edges)
        shown_nodes = len(self.visjs_nodes)
        shown_edges = len(self.visjs_edges)
        if self._visible_node_ids is None and self._visible_edge_keys is None:
            msg = f"Showing all **{total_nodes}** nodes and **{total_edges}** edges"
        else:
            msg = (
                f"Showing **{shown_nodes}**/{total_nodes} nodes and **{shown_edges}**/{total_edges} edges *(filtered)*"
            )
        if errors:
            msg += "\n\n" + "\n".join(f"- {e}" for e in errors)
        self._query_status.object = msg

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

        # Try "base_name (copy)", "base_name (copy 2)", etc.
        candidate = f"{base_name} (copy)"
        counter = 2
        while candidate in existing_names:
            candidate = f"{base_name} (copy {counter})"
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
            entity.set(column, deserialized)

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
                    entity.set(column, deserialized)
                    print(f"  Updated {node_id}")

            # Full sync
            self._full_sync_after_edit()

        except Exception as e:
            print(f"Error updating entities: {e}")
            import traceback

            traceback.print_exc()
            # Revert to current state
            self._refresh_oold_tabulators()

    def _show_create_entity_editor(self, entity_type: dict) -> None:
        """Show the JSON editor UI for creating a new entity of entity_type (schema dict)."""
        entity_type_name = self.introspector.get_type_name(entity_type)
        self.oold_detail_col.clear()
        self.oold_detail_col.append(pn.pane.Markdown(f"### Create New {entity_type_name}"))

        type_props = self.introspector.get_properties(entity_type)
        default_values: dict[str, Any] = {}
        new_uuid = str(uuid.uuid4())
        if "uuid" in type_props:
            default_values["uuid"] = new_uuid
        if "id" in type_props:
            default_values["id"] = f"urn:uuid:{new_uuid}"
        if "name" in type_props:
            default_values["name"] = f"New{entity_type_name}"
        if "type" in type_props:
            schema_id = entity_type.get("$id") or entity_type.get("iri")
            if schema_id:
                default_values["type"] = schema_id

        schema = self._build_editor_schema(entity_type)
        self.new_entity_editor = JsonEditor(
            value=default_values,
            options={"schema": schema, "startval": default_values},
            compact=True,
            sizing_mode="stretch_width",
        )
        self.new_entity_save_button = pn.widgets.Button(name="Save Entity", button_type="primary", width=150)
        self.new_entity_save_button.on_click(self.on_new_entity_save)
        self.new_entity_cancel_button = pn.widgets.Button(name="Cancel", button_type="default", width=150)
        self.new_entity_cancel_button.on_click(self.on_new_entity_cancel)
        self._new_entity_type = entity_type

        self.oold_detail_col.append(self.new_entity_editor)
        self.oold_detail_col.append(pn.Row(self.new_entity_save_button, self.new_entity_cancel_button))
        self.detail_tabs.active = 2

    def on_create_entity_click(self, event: Any) -> None:
        """Callback when the 'Create Entity' button is clicked."""
        try:
            if not hasattr(self, "new_entity_type_select") or not hasattr(self, "_new_entity_node_id"):
                return
            entity_type_name = self.new_entity_type_select.value
            entity_type = self.entity_types[entity_type_name]
            self._show_create_entity_editor(entity_type)
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
            entity_type_name = self.introspector.get_type_name(entity_type)

            print(f"Creating new entity of type {entity_type_name}: {entity_data}")

            # Ensure the entity has an IRI so it can be referenced by edges
            if not entity_data.get("id") and not entity_data.get("@id"):
                fallback_uuid = entity_data.get("uuid", str(uuid.uuid4()))
                entity_data["id"] = f"urn:uuid:{fallback_uuid}"

            # Create the entity instance
            new_entity = EntityAdapter(entity_data, entity_type, entity_type_name, self.schema_registry)
            entity_iri = new_entity.get_iri()

            # Add to entity_list and entity_dict
            self.entity_list.append(new_entity)
            self.entity_dict[entity_iri] = new_entity

            # Create visjs node for the new entity, preserving the cursor position if available
            node_label = entity_data.get("name", entity_iri)
            pending_pos = {}
            if hasattr(self, "_pending_node_positions") and hasattr(self, "_new_entity_node_id"):
                pending_pos = self._pending_node_positions.pop(self._new_entity_node_id, {})
            new_visjs_node = {
                "id": entity_iri,
                "label": node_label,
                "shape": "ellipse",
                "entity_type": entity_type_name,  # metadata for duplication
                "color": self._get_color_for_type(entity_type_name),
                **({k: v for k, v in pending_pos.items() if v is not None}),
                **({"fixed": True} if pending_pos else {}),
            }
            self.visjs_nodes.append(new_visjs_node)
            self._full_visjs_nodes.append(dict(new_visjs_node))

            if self._visible_node_ids is not None:
                self._visible_node_ids.add(entity_iri)

            # Save state after entity creation
            self._save_state()

            # Invalidate property cache since entities changed
            self._available_properties = None

            # Full sync to update RDF graph and edges
            self._full_sync_after_edit(replace_nodes=True)

            # Clear the creation UI and show success message
            self.oold_detail_col.clear()
            self.oold_detail_col.append(pn.pane.Markdown(f"### ✓ Entity Created Successfully\n\nIRI: `{entity_iri}`"))
            self.oold_detail_col.append(pn.pane.Markdown(f"The new {entity_type_name} has been added to the graph."))

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
    available_entity_types = [Person, Hobby, Profession, Entity]

    # Optional: Define custom colors for entity types
    # If not provided, colors will be generated automatically
    custom_type_colors = {
        "Person": "#4A90E2",  # Blue
        "Hobby": "#50C878",  # Emerald green
        "Profession": "#F39C12",  # Orange
        # Other types will get auto-generated colors
    }

    # build graph tool and show it
    config = OOLDGraphConfig(
        uuid="demo",
        name="Demo Social Network",
        entity_list=example_oold_list,
        entity_types=available_entity_types,
        # type_colors=custom_type_colors,  # Uncomment to use custom colors
    )
    graph_detail_panel = OOLDGraphDetailTool(config=config)
    pn.serve(graph_detail_panel, threaded=True)
