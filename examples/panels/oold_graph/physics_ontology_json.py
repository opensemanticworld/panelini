"""Physics / Geometry ontology example using pure OO-LD JSON schemas and JSON entities.

Mirrors physics_ontology.py but uses plain dicts instead of pydantic classes
for entity_list and entity_types.  Demonstrates class inheritance via allOf,
numeric constraints, and class-hierarchy expansion.
"""

import uuid

import panel as pn

from panelini.panels.oold_graph_tool.oold_graph_tool import (
    Entity,
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator")
pn.extension("jsoneditor")

# ── Helpers ───────────────────────────────────────────────────────────────────

ENTITY_IRI = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"


def make_entity(name: str, type_iri: str, **kwargs) -> dict:
    uid = str(uuid.uuid4())
    return {
        "uuid": uid,
        "id": f"https://example.com/{uid}",
        "name": name,
        "type": type_iri,
        **kwargs,
    }


# ── Base Entity schema ────────────────────────────────────────────────────────

ENTITY_SCHEMA = {
    "$id": ENTITY_IRI,
    "title": "Entity",
    "type": "object",
    "@context": {
        "id": "@id",
        "type": "@type",
        "schema": "https://schema.org/",
        "ex": "https://example.com/",
        "name": "schema:name",
        "initialized_from": {"@id": "ex:InitializedFrom", "@type": "@id"},
    },
    "properties": {
        "type": {"type": "string"},
        "uuid": {"type": "string", "description": "Unique identifier."},
        "id": {"type": "string", "description": "IRI of the entity, derived from uuid."},
        "name": {"type": "string"},
        "initialized_from": {"type": "string"},
    },
    "required": ["uuid", "name"],
}

# ── Geometry schema ───────────────────────────────────────────────────────────

GEOMETRY_SCHEMA = {
    "$id": "https://example.com/geometry",
    "title": "Geometry",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"dimensions": {"@id": "ex:hasDimensions"}},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/geometry"},
        "dimensions": {
            "type": "integer",
            "default": 2,
            "description": "Number of spatial dimensions",
        },
    },
    "defaultProperties": ["type", "name", "dimensions"],
}

# ── Circle schema (extends Geometry) ──────────────────────────────────────────

CIRCLE_SCHEMA = {
    "$id": "https://example.com/circle",
    "title": "Circle",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "dimensions": {"@id": "ex:hasDimensions"},
            "radius": {"@id": "ex:hasRadius"},
        },
    ],
    "allOf": [{"$ref": "https://example.com/geometry"}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/circle"},
        "radius": {
            "type": "number",
            "default": 1.0,
            "description": "Radius in metres",
            "minimum": 0,
        },
    },
    "defaultProperties": ["type", "name", "radius"],
}

# ── Rectangle schema (extends Geometry) ───────────────────────────────────────

RECTANGLE_SCHEMA = {
    "$id": "https://example.com/rectangle",
    "title": "Rectangle",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "dimensions": {"@id": "ex:hasDimensions"},
            "width": {"@id": "ex:hasWidth"},
            "height": {"@id": "ex:hasHeight"},
        },
    ],
    "allOf": [{"$ref": "https://example.com/geometry"}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/rectangle"},
        "width": {
            "type": "number",
            "default": 1.0,
            "description": "Width in metres",
            "minimum": 0,
        },
        "height": {
            "type": "number",
            "default": 1.0,
            "description": "Height in metres",
            "minimum": 0,
        },
    },
    "defaultProperties": ["type", "name", "width", "height"],
}

# ── PhysicalObject schema ────────────────────────────────────────────────────

PHYSICAL_OBJECT_SCHEMA = {
    "$id": "https://example.com/physical_object",
    "title": "PhysicalObject",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"mass": {"@id": "ex:hasMass"}},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/physical_object"},
        "mass": {
            "type": "number",
            "default": 1.0,
            "description": "Mass in kilograms",
            "minimum": 0,
        },
    },
    "defaultProperties": ["type", "name", "mass"],
}

# ── MomentOfInertia schema ───────────────────────────────────────────────────

MOMENT_OF_INERTIA_SCHEMA = {
    "$id": "https://example.com/moment_of_inertia",
    "title": "MomentOfInertia",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "formula": {"@id": "ex:hasFormula"},
            "geometry": {"@id": "ex:refersToGeometry", "@type": "@id"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/moment_of_inertia"},
        "formula": {
            "type": "string",
            "default": "",
            "description": "Mathematical formula, e.g. I = m*r^2/2",
        },
        "geometry": {
            "type": "string",
            "default": "",
            "description": "Name of the physical object",
        },
    },
    "defaultProperties": ["type", "name", "formula", "geometry"],
}

# ── ParallelAxisTheorem schema ────────────────────────────────────────────────

PARALLEL_AXIS_THEOREM_SCHEMA = {
    "$id": "https://example.com/parallel_axis_theorem",
    "title": "ParallelAxisTheorem",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "geometry": {"@id": "ex:refersToObject"},
            "distance": {"@id": "ex:hasDistance"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/parallel_axis_theorem"},
        "object_name": {
            "type": "string",
            "default": "",
            "description": "Name of the physical object",
        },
        "distance": {
            "type": "number",
            "default": 0.0,
            "description": "Distance between parallel axes in metres",
            "minimum": 0,
        },
    },
    "defaultProperties": ["type", "name", "geometry", "distance"],
}

# ── Instances ─────────────────────────────────────────────────────────────────

unit_circle = make_entity("Unit Circle", "https://example.com/circle", radius=1.0, dimensions=2)
unit_rect = make_entity("Unit Rectangle", "https://example.com/rectangle", width=1.0, height=1.0, dimensions=2)

a_circle = make_entity("Disk (r=0.3)", "https://example.com/circle", radius=0.3, dimensions=2)
block = make_entity("Block (0.4x0.2)", "https://example.com/rectangle", width=0.4, height=0.2, dimensions=2)

disk_obj = make_entity("Disk", "https://example.com/physical_object", mass=2.5)
block_obj = make_entity("Block", "https://example.com/physical_object", mass=5.0)

disk_inertia = make_entity(
    "Disk Inertia",
    "https://example.com/moment_of_inertia",
    formula="I = m*r^2 / 2",
    geometry="https://example.com/circle",
)

block_pat = make_entity(
    "Block PAT",
    "https://example.com/parallel_axis_theorem",
    object_name="Block",
    distance=0.15,
)

# ── Build and serve ───────────────────────────────────────────────────────────

entity_list = [
    unit_circle,
    unit_rect,
    a_circle,
    block,
    disk_obj,
    block_obj,
    disk_inertia,
    block_pat,
]

entity_types = [
    ENTITY_SCHEMA,
    GEOMETRY_SCHEMA,
    CIRCLE_SCHEMA,
    RECTANGLE_SCHEMA,
    PHYSICAL_OBJECT_SCHEMA,
    MOMENT_OF_INERTIA_SCHEMA,
    PARALLEL_AXIS_THEOREM_SCHEMA,
]

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Physics Ontology (JSON)",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Entity root policy",
        root_node=Entity,
        expansion_steps=[
            ExpansionStep(
                uuid=str(uuid.uuid4()),
                name="step1",
                relations=["-HasSchemaType", "-ExtendsSchema"],
                iter_limit=10,
            )
        ],
    ),
)
graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
