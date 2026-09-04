"""Physics / Geometry ontology example for OOLDGraphDetailTool.

Ports the Geometry + Physics class hierarchy from
examples/panels/visnetwork/python_class_visualization.py, but uses
LinkedBaseModel (Entity) as the base so that OOLDGraphDetailTool can
render both the *instance* graph (via JSON-LD → RDF) and the new
*class-hierarchy* overlay (IsA / definesProperty / HasType).

Classes
-------
Geometry
  ├── Circle
  └── Rectangle
PhysicalObject     (has a shape: Geometry)
MomentOfInertia
ParallelAxisTheorem

Instances
---------
unit_circle    - Circle with r=0.3
unit_rect      - Rectangle 1x1
a_circle           - PhysicalObject wrapping a Circle shape
block          - PhysicalObject wrapping a Rectangle shape
disk_inertia   - MomentOfInertia for the a_circle
block_pat      - ParallelAxisTheorem for the block
"""

import uuid

import panel as pn
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


class Geometry(Entity):
    """Base class for geometric shapes."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "dimensions": {"@id": "ex:hasDimensions"},
                },
            ],
            "iri": "https://example.com/geometry",
            "defaultProperties": ["type", "name", "dimensions"],
        }
    )
    type: str = "https://example.com/geometry"
    dimensions: int = Field(default=2, description="Number of spatial dimensions")


class Circle(Geometry):
    """A circle defined by its radius."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "dimensions": {"@id": "ex:hasDimensions"},
                    "radius": {"@id": "ex:hasRadius"},
                },
            ],
            "iri": "https://example.com/circle",
            "defaultProperties": ["type", "name", "radius"],
        }
    )
    type: str = "https://example.com/circle"
    radius: float = Field(default=1.0, description="Radius in metres", ge=0)


class Rectangle(Geometry):
    """A rectangle defined by width and height."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "dimensions": {"@id": "ex:hasDimensions"},
                    "width": {"@id": "ex:hasWidth"},
                    "height": {"@id": "ex:hasHeight"},
                },
            ],
            "iri": "https://example.com/rectangle",
            "defaultProperties": ["type", "name", "width", "height"],
        }
    )
    type: str = "https://example.com/rectangle"
    width: float = Field(default=1.0, description="Width in metres", ge=0)
    height: float = Field(default=1.0, description="Height in metres", ge=0)


class PhysicalObject(Entity):
    """A physical object with mass."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "mass": {"@id": "ex:hasMass"},
                },
            ],
            "iri": "https://example.com/physical_object",
            "defaultProperties": ["type", "name", "mass"],
        }
    )
    type: str = "https://example.com/physical_object"
    mass: float = Field(default=1.0, description="Mass in kilograms", ge=0)


class MomentOfInertia(Entity):
    """Rotational inertia of a rigid body about a given axis."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "formula": {"@id": "ex:hasFormula"},
                    "geometry": {"@id": "ex:refersToGeometry", "@type": "@id"},
                },
            ],
            "iri": "https://example.com/moment_of_inertia",
            "defaultProperties": ["type", "name", "formula", "geometry"],
        }
    )
    type: str = "https://example.com/moment_of_inertia"
    formula: str = Field(default="", description="Mathematical formula, e.g. I = m*r^2/2")
    geometry: str = Field(default="", description="Name of the physical object")


class ParallelAxisTheorem(Entity):
    """Steiner's theorem: I = I_cm + m*d^2."""

    model_config = ConfigDict(
        json_schema_extra={
            "@context": [
                "https://example.com/1976950e-68bd-43a0-af80-c0f9a2293045",
                {
                    "geometry": {"@id": "ex:refersToObject"},
                    "distance": {"@id": "ex:hasDistance"},
                },
            ],
            "iri": "https://example.com/parallel_axis_theorem",
            "defaultProperties": ["type", "name", "geometry", "distance"],
        }
    )
    type: str = "https://example.com/parallel_axis_theorem"
    object_name: str = Field(default="", description="Name of the physical object")
    distance: float = Field(default=0.0, description="Distance between parallel axes in metres", ge=0)


# ── Instances ──────────────────────────────────────────────────────────────────

unit_circle = Circle(uuid=str(uuid.uuid4()), name="Unit Circle", radius=1.0)
unit_rect = Rectangle(uuid=str(uuid.uuid4()), name="Unit Rectangle", width=1.0, height=1.0)

a_circle = Circle(uuid=str(uuid.uuid4()), name="Disk (r=0.3)", radius=0.3)
block = Rectangle(uuid=str(uuid.uuid4()), name="Block (0.4x0.2)", width=0.4, height=0.2)

disk_obj = PhysicalObject(uuid=str(uuid.uuid4()), name="Disk", mass=2.5)
block_obj = PhysicalObject(uuid=str(uuid.uuid4()), name="Block", mass=5.0)

disk_inertia = MomentOfInertia(
    uuid=str(uuid.uuid4()),
    name="Disk Inertia",
    formula="I = m*r^2 / 2",
    geometry=Circle.model_config["json_schema_extra"]["iri"],
)

block_pat = ParallelAxisTheorem(
    uuid=str(uuid.uuid4()),
    name="Block PAT",
    object_name="Block",
    distance=0.15,
)

# ── Build and serve ────────────────────────────────────────────────────────────

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

entity_types = [Geometry, Circle, Rectangle, PhysicalObject, MomentOfInertia, ParallelAxisTheorem, Entity]

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="Physics Ontology",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Alice policy",
        root_node=Entity,
        expansion_steps=[
            ExpansionStep(uuid=str(uuid.uuid4()), name="step1", relations=["-HasType", "-IsA"], iter_limit=10)
        ],
    ),
)
graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
