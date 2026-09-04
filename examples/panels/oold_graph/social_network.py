"""Social-network example for OOLDGraphDetailTool.

Shows a small graph of Person, Hobby and Profession entities connected via
knows / hobbies / profession relationships.  The class hierarchy (Person IsA
Entity, etc.) and field definitions are shown alongside the instance data.

Ported verbatim from the __main__ block in oold_graph_tool.py.
"""

import uuid
from enum import Enum
from typing import Optional

import panel as pn
from oold.model import LinkedBaseModel  # noqa: F401 (re-exported for clarity)
from pydantic import ConfigDict, Field

from panelini.panels.oold_graph_tool.oold_graph_tool import (
    Entity,
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator")
pn.extension("jsoneditor")


# ── Schema definitions ─────────────────────────────────────────────────────────


class Hobby(Entity):
    """A simple Hobby schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {"name": {"@id": "ex:name"}},
            ],
            "iri": "https://example.com/hobby_id",
            "defaultProperties": ["type", "name"],
        }
    )
    type: str = "https://example.com/hobby_id"


class Profession(Entity):
    """A simple Profession schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {"name": {"@id": "ex:name"}},
            ],
            "iri": "https://example.com/profession_id",
            "defaultProperties": ["type", "name"],
        }
    )
    type: str = "https://example.com/profession_id"


# ── Hobby instances & enum ─────────────────────────────────────────────────────

sports = Hobby(uuid=str(uuid.uuid4()), name="Sports")
music = Hobby(uuid=str(uuid.uuid4()), name="Music")
art = Hobby(uuid=str(uuid.uuid4()), name="Art")


class HobbyEnum(str, Enum):
    """Hobbies as an enum of IRIs."""

    SPORTS = sports.id
    MUSIC = music.id
    ART = art.id


# ── Profession instances & enum ────────────────────────────────────────────────

engineer = Profession(uuid=str(uuid.uuid4()), name="Engineer")
teacher = Profession(uuid=str(uuid.uuid4()), name="Teacher")
doctor = Profession(uuid=str(uuid.uuid4()), name="Doctor")
artist = Profession(uuid=str(uuid.uuid4()), name="Artist")
scientist = Profession(uuid=str(uuid.uuid4()), name="Scientist")


class ProfessionEnum(str, Enum):
    """Professions as an enum of IRIs."""

    ENGINEER = engineer.id
    TEACHER = teacher.id
    DOCTOR = doctor.id
    ARTIST = artist.id
    SCIENTIST = scientist.id


class Birthday(Entity):
    """A simple Birthday schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {"date": {"@id": "ex:date"}},
            ],
            "iri": "https://example.com/birthday_id",
            "defaultProperties": ["type", "date"],
        }
    )
    type: str = "https://example.com/birthday_id"


# ── Person schema ──────────────────────────────────────────────────────────────


class Person(Entity):
    """A simple Person schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "hobbies": {"@id": "ex:hobbies", "@type": "@id"},
                    "profession": {"@id": "ex:profession", "@type": "@id"},
                    "knows": {"@id": "schema:knows", "@type": "@id", "@container": "@set"},
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
    """Interests of the person."""
    profession: Optional[ProfessionEnum] = Field(None, description="Profession of the person")
    knows: Optional[list["Person"]] = Field(None, json_schema_extra={"range": "Person.json"})
    age: Optional[int] = Field(None, description="Age of the person")
    body_weight: Optional[float] = Field(None, description="Body weight in kg")


Person.model_rebuild()

# ── Person instances ───────────────────────────────────────────────────────────

alice = Person(
    uuid=str(uuid.uuid4()),
    name="Alice",
    hobbies=[HobbyEnum.SPORTS, HobbyEnum.MUSIC],
    profession=ProfessionEnum.ENGINEER,
    age=41,
    # body_weight=68.5,
)
bob = Person(
    uuid=str(uuid.uuid4()),
    name="Bob",
    hobbies=[HobbyEnum.ART],
    profession=ProfessionEnum.ARTIST,
    knows=[alice],
    # age=35,
    body_weight=82.3,
)
charlie = Person(
    uuid=str(uuid.uuid4()),
    name="Charlie",
    hobbies=[HobbyEnum.SPORTS],
    profession=ProfessionEnum.TEACHER,
    knows=[alice, bob],
    age=28,
    #  body_weight=75.0,
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

# ── Build and serve ────────────────────────────────────────────────────────────

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
    Birthday,
]

entity_types = [Person, Hobby, Profession, Entity]


config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Social Network",
    entity_list=entity_list,
    entity_types=entity_types,
    # Uncomment to start with only Alice visible and expand manually:
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Alice policy",
        root_node=alice,
        expansion_steps=[
            ExpansionStep(uuid=str(uuid.uuid4()), name="step1", relations=["knows", "hobbies"], iter_limit=5)
        ],
    ),
)
graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
