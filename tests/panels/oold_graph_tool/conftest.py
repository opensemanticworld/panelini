"""Shared fixtures for OOLDGraphDetailTool tests.

Provides six tool instances -- one per example (pydantic + JSON) x scenario.
"""

import copy
import uuid

import panel as pn
import pytest

from panelini.panels.oold_graph_tool.oold_graph_tool import (
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator", inline=True)
pn.extension("jsoneditor", inline=True)

PORT = [9000]


@pytest.fixture
def port():
    PORT[0] += 1
    return PORT[0]


@pytest.fixture(autouse=True)
def server_cleanup():
    try:
        yield
    finally:
        pn.state.reset()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

ENTITY_IRI = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"


def _make_entity(name: str, type_iri: str, **kwargs) -> dict:
    uid = str(uuid.uuid4())
    return {"uuid": uid, "id": f"https://example.com/{uid}", "name": name, "type": type_iri, **kwargs}


# ---------------------------------------------------------------------------
# JSON schemas (shared by JSON-fixture helpers)
# ---------------------------------------------------------------------------

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

HOBBY_SCHEMA = {
    "$id": "https://example.com/hobby_id",
    "title": "Hobby",
    "type": "object",
    "@context": [ENTITY_IRI, {"name": {"@id": "ex:name"}}],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {},
    "defaultProperties": ["type", "name"],
}

PERSON_SCHEMA_TEMPLATE = {
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
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "Interests of the person.",
        },
        "profession": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "Profession of the person",
        },
        "knows": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
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

INGREDIENT_CONTENT_SCHEMA = {
    "$id": "https://example.com/IngredientContent",
    "title": "IngredientContent",
    "type": "object",
    "@context": [ENTITY_IRI, {"planned_mass_grams": "ex:HasPlannedMass"}, {"actual_mass_grams": "ex:HasActualMass"}],
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

COOKING_PROCESS_SCHEMA = {
    "$id": "https://example.com/Recipy",
    "title": "CookingProcessDocumentation",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {"ingredients": {"@id": "ex:HasIngredient", "@context": "https://example.com/IngredientContent"}},
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

GEOMETRY_SCHEMA = {
    "$id": "https://example.com/geometry",
    "title": "Geometry",
    "type": "object",
    "@context": [ENTITY_IRI, {"dimensions": {"@id": "ex:hasDimensions"}}],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/geometry"},
        "dimensions": {"type": "integer", "default": 2, "description": "Number of spatial dimensions"},
    },
}

CIRCLE_SCHEMA = {
    "$id": "https://example.com/circle",
    "title": "Circle",
    "type": "object",
    "@context": [ENTITY_IRI, {"dimensions": {"@id": "ex:hasDimensions"}, "radius": {"@id": "ex:hasRadius"}}],
    "allOf": [{"$ref": "https://example.com/geometry"}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/circle"},
        "radius": {"type": "number", "default": 1.0, "description": "Radius in metres", "minimum": 0},
    },
}


# ---------------------------------------------------------------------------
# JSON social-network fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def json_social_network():
    """Build OOLDGraphDetailTool from pure JSON dicts (social network)."""
    sports = _make_entity("Sports", "https://example.com/hobby_id")
    music = _make_entity("Music", "https://example.com/hobby_id")

    PERSON_SCHEMA = copy.deepcopy(PERSON_SCHEMA_TEMPLATE)
    PERSON_SCHEMA["properties"]["hobbies"]["enum"] = [sports["id"], music["id"]]

    alice = _make_entity("Alice", "Person.json", hobbies=[sports["id"]], age=41)
    bob = _make_entity("Bob", "Person.json", hobbies=[music["id"]], knows=[alice["id"]], body_weight=82.3)
    charlie = _make_entity("Charlie", "Person.json", knows=[alice["id"], bob["id"]], age=28)
    alice["knows"] = [bob["id"], charlie["id"]]

    entity_types = [ENTITY_SCHEMA, PERSON_SCHEMA, HOBBY_SCHEMA]
    entity_list = [alice, bob, charlie, sports, music]

    config = OOLDGraphConfig(
        uuid=str(uuid.uuid4()),
        name="JSON Social Network",
        entity_list=entity_list,
        entity_types=entity_types,
        expansion_policy=SingleNodeExpansionPolicy(
            uuid=str(uuid.uuid4()),
            name="Alice policy",
            root_node=alice,
            expansion_steps=[
                ExpansionStep(uuid=str(uuid.uuid4()), name="step1", relations=["knows", "hobbies"], iter_limit=5)
            ],
        ),
    )
    tool = OOLDGraphDetailTool(config=config)
    return {
        "tool": tool,
        "alice": alice,
        "bob": bob,
        "charlie": charlie,
        "sports": sports,
        "music": music,
        "schemas": {"Entity": ENTITY_SCHEMA, "Person": PERSON_SCHEMA, "Hobby": HOBBY_SCHEMA},
    }


# ---------------------------------------------------------------------------
# JSON recipe fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def json_recipe():
    """Build OOLDGraphDetailTool from pure JSON dicts (recipe with embedded sub-objects)."""
    sugar = _make_entity("sugar", "https://example.com/IngredientContent", planned_mass_grams=50)
    flour = _make_entity("flour", "https://example.com/IngredientContent", planned_mass_grams=200)

    cake = _make_entity(
        "My cake recipe",
        "https://example.com/Recipy",
        ingredients=[sugar, flour],
    )

    entity_types = [ENTITY_SCHEMA, COOKING_PROCESS_SCHEMA, INGREDIENT_CONTENT_SCHEMA]
    config = OOLDGraphConfig(
        uuid=str(uuid.uuid4()),
        name="JSON Recipe",
        entity_list=[cake],
        entity_types=entity_types,
    )
    tool = OOLDGraphDetailTool(config=config)
    return {
        "tool": tool,
        "cake": cake,
        "sugar": sugar,
        "flour": flour,
        "schemas": {
            "Entity": ENTITY_SCHEMA,
            "CookingProcessDocumentation": COOKING_PROCESS_SCHEMA,
            "IngredientContent": INGREDIENT_CONTENT_SCHEMA,
        },
    }


# ---------------------------------------------------------------------------
# JSON physics ontology fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def json_physics():
    """Build OOLDGraphDetailTool from pure JSON dicts (physics ontology)."""
    unit_circle = _make_entity("Unit Circle", "https://example.com/circle", radius=1.0)
    disk = _make_entity("Disk (r=0.3)", "https://example.com/circle", radius=0.3)

    entity_types = [ENTITY_SCHEMA, GEOMETRY_SCHEMA, CIRCLE_SCHEMA]
    config = OOLDGraphConfig(
        uuid=str(uuid.uuid4()),
        name="JSON Physics",
        entity_list=[unit_circle, disk],
        entity_types=entity_types,
        expansion_policy=SingleNodeExpansionPolicy(
            uuid=str(uuid.uuid4()),
            name="expand all",
            root_node=ENTITY_SCHEMA,
            expansion_steps=[
                ExpansionStep(uuid=str(uuid.uuid4()), name="step1", relations=["-HasType", "-IsA"], iter_limit=10)
            ],
        ),
    )
    tool = OOLDGraphDetailTool(config=config)
    return {
        "tool": tool,
        "unit_circle": unit_circle,
        "disk": disk,
        "schemas": {"Entity": ENTITY_SCHEMA, "Geometry": GEOMETRY_SCHEMA, "Circle": CIRCLE_SCHEMA},
    }


# ---------------------------------------------------------------------------
# Pydantic social-network fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def pydantic_social_network():
    """Build OOLDGraphDetailTool from pydantic Entity subclasses (social network)."""
    from examples.panels.oold_graph.social_network import (
        alice,
        bob,
        charlie,
        config,
    )

    tool = OOLDGraphDetailTool(config=config)
    return {"tool": tool, "alice": alice, "bob": bob, "charlie": charlie}


# ---------------------------------------------------------------------------
# Pydantic recipe fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def pydantic_recipe():
    """Build OOLDGraphDetailTool from pydantic Entity subclasses (recipe)."""
    from examples.panels.oold_graph.recipy import config, my_cake_doc

    tool = OOLDGraphDetailTool(config=config)
    return {"tool": tool, "cake": my_cake_doc}


# ---------------------------------------------------------------------------
# Pydantic physics fixture
# ---------------------------------------------------------------------------


@pytest.fixture
def pydantic_physics():
    """Build OOLDGraphDetailTool from pydantic Entity subclasses (physics ontology)."""
    from examples.panels.oold_graph.physics_ontology import a_circle, config, unit_circle

    tool = OOLDGraphDetailTool(config=config)
    return {"tool": tool, "unit_circle": unit_circle, "a_circle": a_circle}


# ---------------------------------------------------------------------------
# Minimal fixture for isolated method tests
# ---------------------------------------------------------------------------


@pytest.fixture
def minimal_json_tool():
    """A minimal JSON-based tool with 2 entities for quick tests."""
    a = _make_entity("A", "https://example.com/hobby_id")
    b = _make_entity("B", "https://example.com/hobby_id")
    entity_types = [ENTITY_SCHEMA, HOBBY_SCHEMA]
    config = OOLDGraphConfig(
        uuid=str(uuid.uuid4()),
        name="Minimal",
        entity_list=[a, b],
        entity_types=entity_types,
    )
    tool = OOLDGraphDetailTool(config=config)
    return {"tool": tool, "a": a, "b": b}
