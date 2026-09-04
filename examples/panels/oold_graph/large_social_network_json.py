"""Large social-network example: 1000 persons across 5+ generations.

Demonstrates that entity_list can be far larger than what the graph
initially shows.  The expansion policy starts from a single person and
only reveals their direct friends; the user can then interactively
expand further.

Relations:
  - IsFriendsWith (symmetric, among peers in the same generation)
  - HasFather     (child -> father)
  - HasMother     (child -> mother)
"""

import random
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

# ── Deterministic randomness ─────────────────────────────────────────────────

RNG = random.Random(42)  # noqa: S311

# ── Helpers ──────────────────────────────────────────────────────────────────

ENTITY_IRI = "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045"

MALE_NAMES = [
    "Bob",
    "Charlie",
    "Frank",
    "Hank",
    "Jack",
    "Leo",
    "Nate",
    "Paul",
    "Sam",
    "Victor",
    "Xander",
    "Zane",
    "Boris",
    "Dante",
    "Felix",
    "Hugo",
    "Jasper",
    "Liam",
    "Noah",
    "Ravi",
    "Theo",
    "Wyatt",
    "Yusuf",
    "Adam",
    "Erik",
]
FEMALE_NAMES = [
    "Alice",
    "Diana",
    "Eve",
    "Grace",
    "Iris",
    "Karen",
    "Mona",
    "Olivia",
    "Quinn",
    "Rosa",
    "Tina",
    "Ursula",
    "Wendy",
    "Yara",
    "Amara",
    "Cleo",
    "Elena",
    "Greta",
    "Ivy",
    "Kira",
    "Maya",
    "Opal",
    "Priya",
    "Suki",
    "Uma",
    "Vera",
    "Ximena",
]


def _uid() -> str:
    return str(uuid.UUID(int=RNG.getrandbits(128), version=4))


def make_entity(name: str, type_iri: str, **kwargs) -> dict:
    uid = _uid()
    return {
        "uuid": uid,
        "id": f"https://example.com/{uid}",
        "name": name,
        "type": type_iri,
        **kwargs,
    }


# ── Schemas ──────────────────────────────────────────────────────────────────

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
        "id": {"type": "string", "description": "IRI of the entity."},
        "name": {"type": "string"},
        "initialized_from": {"type": "string"},
    },
    "required": ["uuid", "name"],
}

PERSON_SCHEMA = {
    "$id": "https://example.com/Person",
    "title": "Person",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "is_friends_with": {
                "@id": "ex:IsFriendsWith",
                "@type": "@id",
                "@container": "@set",
            },
            "has_father": {"@id": "ex:HasFather", "@type": "@id"},
            "has_mother": {"@id": "ex:HasMother", "@type": "@id"},
            "generation": {"@id": "ex:HasGeneration"},
            "gender": {"@id": "ex:HasGender"},
            "age": {"@id": "ex:HasAge"},
            "hobbies": {"@id": "ex:HasHobbies"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://example.com/Person"},
        "generation": {
            "type": "integer",
            "description": "Generation number (0 = founders).",
        },
        "gender": {
            "type": "string",
            "enum": ["male", "female"],
            "description": "Gender of the person.",
        },
        "age": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Age of the person.",
        },
        "has_father": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "IRI of the person's father.",
        },
        "has_mother": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "IRI of the person's mother.",
        },
        "is_friends_with": {
            "anyOf": [
                {"type": "array", "items": {"type": "string"}},
                {"type": "null"},
            ],
            "default": None,
            "description": "IRIs of friends.",
            "x-oold-range": "https://example.com/Person",
        },
        "hobbies": {
            "anyOf": [
                {"type": "array", "items": {"type": "string"}},
                {"type": "null"},
            ],
            "default": None,
            "description": "Hobby tags of the person.",
        },
    },
    "defaultProperties": ["type", "name", "generation"],
}

entity_types = [ENTITY_SCHEMA, PERSON_SCHEMA]

# ── Generate 1000 persons across 6 generations ──────────────────────────────

NUM_PERSONS = 1000
NUM_GENERATIONS = 6
GENERATION_SIZES = [20, 50, 120, 250, 300, 260]
if sum(GENERATION_SIZES) != NUM_PERSONS:
    msg = "GENERATION_SIZES must sum to NUM_PERSONS"
    raise ValueError(msg)

persons: list[dict] = []
generations: list[list[dict]] = [[] for _ in range(NUM_GENERATIONS)]
_name_counter: dict[str, int] = {}


def _unique_name(gender: str) -> str:
    pool = MALE_NAMES if gender == "male" else FEMALE_NAMES
    first = RNG.choice(pool)
    _name_counter[first] = _name_counter.get(first, 0) + 1
    count = _name_counter[first]
    return first if count == 1 else f"{first} {count}"


# Generation 0: founders (no parents), roughly 50/50 gender split
for i in range(GENERATION_SIZES[0]):
    gender = "male" if i < GENERATION_SIZES[0] // 2 else "female"
    p = make_entity(
        _unique_name(gender),
        "https://example.com/Person",
        generation=0,
        gender=gender,
        age=RNG.randint(60, 85),
    )
    persons.append(p)
    generations[0].append(p)

# Generations 1..5: each person picks a father (male) and mother (female)
# from the previous generation
for gen in range(1, NUM_GENERATIONS):
    prev = generations[gen - 1]
    prev_males = [p for p in prev if p["gender"] == "male"]
    prev_females = [p for p in prev if p["gender"] == "female"]
    base_age = max(10, 60 - gen * 10)
    for _ in range(GENERATION_SIZES[gen]):
        gender = RNG.choice(["male", "female"])
        father = RNG.choice(prev_males)
        mother = RNG.choice(prev_females)
        p = make_entity(
            _unique_name(gender),
            "https://example.com/Person",
            generation=gen,
            gender=gender,
            age=RNG.randint(base_age, base_age + 15),
            has_father=father["id"],
            has_mother=mother["id"],
        )
        persons.append(p)
        generations[gen].append(p)

# Friendships: within each generation, give each person 2-6 friends
for gen_group in generations:
    for p in gen_group:
        if len(gen_group) < 2:
            continue
        others = [o for o in gen_group if o is not p]
        n_friends = min(len(others), RNG.randint(2, 6))
        friends = RNG.sample(others, n_friends)
        p["is_friends_with"] = [f["id"] for f in friends]

# ── Pick a root person from generation 2 (has parents and children) ─────────

root_person = generations[2][0]

# ── Config ───────────────────────────────────────────────────────────────────

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Large Social Network (1000 persons)",
    entity_list=persons,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Single person + friends",
        root_node=root_person,
        expansion_steps=[
            ExpansionStep(
                uuid=str(uuid.uuid4()),
                name="friends",
                relations=["IsFriendsWith"],
                iter_limit=1,
            ),
        ],
    ),
)

graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
