import uuid
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


class IngredientContent(Entity):
    """A simple Ingredient schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {"planned_mass_grams": "ex:HasPlannedMass"},
                {"actual_mass_grams": "ex:HasActualMass"},
            ],
            "iri": "https://example.com/IngredientContent",
            "defaultProperties": ["planned_mass_grams", "actual_mass_grams"],
        }
    )
    planned_mass_grams: Optional[float] = Field(default=None, description="The planned mass of the ingredient in grams")
    actual_mass_grams: Optional[float] = Field(default=None, description="The actual mass of the ingredient in grams")
    type: Optional[str] = "https://example.com/IngredientContent"


class CookingProcessDocumentation(Entity):
    """A simple Hobby schema."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {"ingredients": {"@id": "ex:HasIngredient"}},
            ],
            "iri": "https://example.com/Recipy",
            "defaultProperties": ["type", "name"],
        }
    )
    ingredients: list[IngredientContent] = Field(default=[], description="The ingredients list")
    type: Optional[str] = "https://example.com/Recipy"


my_cake_doc = CookingProcessDocumentation(
    uuid=str(uuid.uuid4()),
    name="My cake recipe",
    ingredients=[
        IngredientContent(name="sugar", planned_mass_grams=50, uuid=str(uuid.uuid4())),
        IngredientContent(name="flour", planned_mass_grams=200, uuid=str(uuid.uuid4())),
        IngredientContent(name="nuts", planned_mass_grams=100, uuid=str(uuid.uuid4())),
    ],
)

entity_list = [my_cake_doc]
entity_types = [Entity, CookingProcessDocumentation, IngredientContent]

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Physics Ontology",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Recipy policy",
        root_node=Entity,
        expansion_steps=[
            ExpansionStep(uuid=str(uuid.uuid4()), name="step1", relations=["-HasType", "-IsA"], iter_limit=10)
        ],
    ),
)
graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
