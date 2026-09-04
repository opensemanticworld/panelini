"""Recipe example using pure OO-LD JSON schemas and JSON entities.

Mirrors recipy.py but uses plain dicts instead of pydantic classes for
entity_list and entity_types.  Demonstrates embedded sub-objects via
property-scoped @context and $ref in items.
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

# ── IngredientContent schema ──────────────────────────────────────────────────

INGREDIENT_CONTENT_SCHEMA = {
    "$id": "https://example.com/IngredientContent",
    "title": "IngredientContent",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"planned_mass_grams": "ex:HasPlannedMass"},
        {"actual_mass_grams": "ex:HasActualMass"},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/IngredientContent"},
        "planned_mass_grams": {
            "anyOf": [{"type": "number"}, {"type": "null"}],
            "default": None,
            "description": "The planned mass of the ingredient in grams",
        },
        "actual_mass_grams": {
            "anyOf": [{"type": "number"}, {"type": "null"}],
            "default": None,
            "description": "The actual mass of the ingredient in grams",
        },
    },
    "defaultProperties": ["planned_mass_grams", "actual_mass_grams"],
}

# ── CookingProcessDocumentation schema ────────────────────────────────────────

COOKING_PROCESS_SCHEMA = {
    "$id": "https://example.com/Recipy",
    "title": "CookingProcessDocumentation",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "ingredients": {
                "@id": "ex:HasIngredient",
                "@context": "https://example.com/IngredientContent",
            },
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/Recipy"},
        "ingredients": {
            "type": "array",
            "items": {"$ref": "https://example.com/IngredientContent"},
            "default": [],
            "description": "The ingredients list",
        },
    },
    "defaultProperties": ["type", "name"],
}

# ── Instances ─────────────────────────────────────────────────────────────────

sugar = make_entity("sugar", "https://example.com/IngredientContent", planned_mass_grams=50)
flour = make_entity("flour", "https://example.com/IngredientContent", planned_mass_grams=200)
nuts = make_entity("nuts", "https://example.com/IngredientContent", planned_mass_grams=100)

my_cake_doc = make_entity(
    "My cake recipe",
    "https://example.com/Recipy",
    ingredients=[sugar, flour, nuts],
)

# ── Build and serve ───────────────────────────────────────────────────────────

entity_list = [my_cake_doc]

entity_types = [ENTITY_SCHEMA, COOKING_PROCESS_SCHEMA, INGREDIENT_CONTENT_SCHEMA]

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Recipe (JSON)",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Recipy policy",
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
