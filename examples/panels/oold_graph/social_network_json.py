"""Social-network example using pure OO-LD JSON schemas and JSON entities.

Mirrors social_network.py but uses plain dicts instead of pydantic classes
for entity_list and entity_types.  Demonstrates IRI-reference fields, enum
properties, and expansion policies with the JSON-based API.
"""

import uuid

import panel as pn

from panelini.panels.oold_graph_tool.oold_graph_tool import (
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

# ── Hobby schema & instances ──────────────────────────────────────────────────

HOBBY_SCHEMA = {
    "$id": "https://example.com/hobby_id",
    "title": "Hobby",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"name": {"@id": "ex:name"}},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {},
    "defaultProperties": ["type", "name"],
}

sports = make_entity("Sports", "https://example.com/hobby_id")
music = make_entity("Music", "https://example.com/hobby_id")
art = make_entity("Art", "https://example.com/hobby_id")

# ── Profession schema & instances ─────────────────────────────────────────────

PROFESSION_SCHEMA = {
    "$id": "https://example.com/profession_id",
    "title": "Profession",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"name": {"@id": "ex:name"}},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {},
    "defaultProperties": ["type", "name"],
}

engineer = make_entity("Engineer", "https://example.com/profession_id")
teacher = make_entity("Teacher", "https://example.com/profession_id")
doctor = make_entity("Doctor", "https://example.com/profession_id")
artist = make_entity("Artist", "https://example.com/profession_id")
scientist = make_entity("Scientist", "https://example.com/profession_id")

# ── Birthday schema (bare type, no instances) ────────────────────────────────

BIRTHDAY_SCHEMA = {
    "$id": "https://example.com/birthday_id",
    "title": "Birthday",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"date": {"@id": "ex:date"}},
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "date": {"type": "string"},
    },
    "defaultProperties": ["type", "date"],
}

# ── Person schema ─────────────────────────────────────────────────────────────

PERSON_SCHEMA = {
    "$id": "Person.json",
    "title": "Person",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "hobbies": {"@id": "ex:hobbies", "@type": "@id"},
            "profession": {"@id": "ex:profession", "@type": "@id"},
            "knows": {"@id": "schema:knows", "@type": "@id", "@container": "@set"},
            "age": {"@id": "ex:HasAge"},
            "body_weight": {"@id": "ex:HasBodyWeight"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "ex:Person.json"},
        "hobbies": {
            "anyOf": [
                {"type": "array", "items": {"type": "string"}},
                {"type": "null"},
            ],
            "default": None,
            "description": "Interests of the person.",
            "enum": [sports["id"], music["id"], art["id"]],
        },
        "profession": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "Profession of the person",
            "enum": [engineer["id"], teacher["id"], doctor["id"], artist["id"], scientist["id"]],
        },
        "knows": {
            "anyOf": [
                {"type": "array", "items": {"type": "string"}},
                {"type": "null"},
            ],
            "default": None,
            "x-oold-range": "Person.json",
        },
        "age": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Age of the person",
        },
        "body_weight": {
            "anyOf": [{"type": "number"}, {"type": "null"}],
            "default": None,
            "description": "Body weight in kg",
        },
    },
    "defaultProperties": ["type", "name", "hobbies", "profession"],
}

# ── Person instances ──────────────────────────────────────────────────────────

alice = make_entity(
    "Alice",
    "Person.json",
    hobbies=[sports["id"], music["id"]],
    profession=engineer["id"],
    age=41,
)
bob = make_entity(
    "Bob",
    "Person.json",
    hobbies=[art["id"]],
    profession=artist["id"],
    knows=[alice["id"]],
    body_weight=82.3,
)
charlie = make_entity(
    "Charlie",
    "Person.json",
    hobbies=[sports["id"]],
    profession=teacher["id"],
    knows=[alice["id"], bob["id"]],
    age=28,
)
david = make_entity(
    "David",
    "Person.json",
    hobbies=[music["id"]],
    profession=scientist["id"],
    knows=[charlie["id"]],
    age=22,
    body_weight=70.2,
)
eve = make_entity(
    "Eve",
    "Person.json",
    hobbies=[art["id"], music["id"]],
    profession=doctor["id"],
    knows=[david["id"], alice["id"], bob["id"]],
    age=30,
    body_weight=63.8,
)
alice["knows"] = [bob["id"], charlie["id"], eve["id"]]

# ── Build and serve ───────────────────────────────────────────────────────────

entity_list = [
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
    BIRTHDAY_SCHEMA,  # bare schema dict - promoted to entity_types
]

entity_types = [ENTITY_SCHEMA, PERSON_SCHEMA, HOBBY_SCHEMA, PROFESSION_SCHEMA]

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Social Network (JSON)",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Alice policy",
        root_node=alice,
        expansion_steps=[
            ExpansionStep(
                uuid=str(uuid.uuid4()),
                name="step1",
                relations=["knows", "hobbies"],
                iter_limit=5,
            )
        ],
    ),
)
graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
