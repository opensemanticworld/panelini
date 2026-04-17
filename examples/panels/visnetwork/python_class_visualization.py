"""
Interactive visualization of Python class hierarchies using VisNetwork.

Port of snippets/classes_with_relations_to_DG.py — replaces the pyvis/HTML
file output with a live Panel + VisNetwork panel.

Node colors:
  Blue   - plain Python classes
  Purple - Pydantic models
  Green  - instances
  Orange - attribute value nodes

Edge colors:
  Red     - IsA (inheritance) / HasRange (field type)
  Default - HasAttribute / HasValue
"""

import inspect
import json
import typing
import uuid
from typing import Optional

import networkx as nx
import panel as pn
from pydantic import BaseModel, Field

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# ── Color palette ──────────────────────────────────────────────────────────────
COLOR_ISA = "#e74c3c"
COLOR_HAS_RANGE = "#e74c3c"
COLOR_CLASS = "#4A90E2"
COLOR_MODEL = "#9B59B6"
COLOR_INSTANCE = "#50C878"
COLOR_ATTR_VAL = "#F39C12"
COLOR_FIELD = "#BDC3C7"

MAX_LABEL = 80

_PRIMITIVES = (str, int, float, bool, type(None), dict, list, tuple, set)


# ── Helpers ────────────────────────────────────────────────────────────────────


def _uid():
    return str(uuid.uuid4()).replace("-", "")


def _key(obj):
    """Return a stable string node ID for a Python object."""
    try:
        if isinstance(obj, typing.Hashable):
            return str(hash(obj))
    except Exception:  # noqa: S110
        pass
    return _uid()


def _trunc(s):
    s = str(s)
    return s[:MAX_LABEL] + "…" if len(s) > MAX_LABEL else s


def _ensure_node(DG, node_id, label, color, shape=None):
    """Add a node to DG only if it does not already exist."""
    if node_id not in DG.nodes:
        data = {"label": _trunc(label), "color": color}
        if shape:
            data["shape"] = shape
        DG.add_node(node_id, **data)
    return node_id


def _existing_edge_labels(DG, node):
    """Return the set of outgoing edge labels from node."""
    return {d.get("label") for _, _, d in DG.out_edges(node, data=True)}


def _type_label(t):
    """Human-readable label for a type annotation."""
    if t is None:
        return "None"
    if hasattr(t, "__name__"):
        return t.__name__
    s = str(t)
    for prefix in ("typing.", "__main__.", "builtins."):
        s = s.replace(prefix, "")
    return _trunc(s)


# ── Graph-building functions ───────────────────────────────────────────────────


def add_type_node(DG, base_node, value, recurse_typing=False):
    t = type(value)
    type_node = _ensure_node(DG, _key(t), t.__name__, COLOR_CLASS)
    DG.add_edge(base_node, type_node, label="HasRange", color=COLOR_HAS_RANGE)
    if recurse_typing and t is not type:
        add_type_node(DG, type_node, t, recurse_typing=True)
    return type_node


def add_attribute_node(DG, base_node, attr_name, attr_val, add_val_type=False, recurse_typing=False):
    if attr_name in _existing_edge_labels(DG, base_node):
        return

    if inspect.isclass(attr_val):
        # Class references share a node across the graph (intentional deduplication)
        value_node = _key(attr_val)
        value_label = attr_val.__name__
    else:
        # Each literal gets its own node
        value_node = _uid()
        try:
            value_label = json.dumps(attr_val)
        except Exception:
            value_label = str(attr_val)

    _ensure_node(DG, value_node, value_label, COLOR_ATTR_VAL)
    DG.add_edge(base_node, value_node, label=attr_name)

    if add_val_type and not isinstance(attr_val, _PRIMITIVES) and not inspect.isclass(attr_val):
        add_type_node(DG, value_node, attr_val, recurse_typing=recurse_typing)


def add_pydantic_field_node(DG, class_node, field_name, field_info):
    """Add a Field node plus metadata sub-nodes for a Pydantic FieldInfo.

    Pattern: class --definesProperty--> ○ [field_name]
                                        ├─ HasRange      ─> type
                                        ├─ default     ─> value
                                        ├─ description ─> "..."
                                        └─ ge/le/...   ─> constraint value
    """
    field_node = _uid()
    DG.add_node(field_node, label=field_name, color=COLOR_FIELD, shape="ellipse")
    DG.add_edge(class_node, field_node, label="definesProperty")

    # annotation
    ann = field_info.annotation
    if ann is not None:
        if inspect.isclass(ann) and ann not in _PRIMITIVES:
            # Non-primitive class → share the existing class node
            ann_node = _ensure_node(DG, _key(ann), _type_label(ann), COLOR_CLASS)
        else:
            # Primitive or complex type → fresh node each time (no clustering)
            ann_node = _uid()
            _ensure_node(DG, ann_node, _type_label(ann), COLOR_ATTR_VAL)
        DG.add_edge(field_node, ann_node, label="HasRange", color=COLOR_HAS_RANGE)

    # default (only when not required)
    if not field_info.is_required():
        try:
            default_label = json.dumps(field_info.default)
        except Exception:
            default_label = str(field_info.default)
        default_node = _uid()
        _ensure_node(DG, default_node, _trunc(default_label), COLOR_ATTR_VAL)
        DG.add_edge(field_node, default_node, label="default")

    # description
    if field_info.description:
        desc_node = _uid()
        _ensure_node(DG, desc_node, _trunc(field_info.description), COLOR_ATTR_VAL)
        DG.add_edge(field_node, desc_node, label="description")

    # constraints from annotated metadata (ge, le, gt, lt, min_length, max_length, …)
    for meta in getattr(field_info, "metadata", []):
        for attr in ("ge", "gt", "le", "lt", "multiple_of", "min_length", "max_length"):
            val = getattr(meta, attr, None)
            if val is not None:
                meta_node = _uid()
                _ensure_node(DG, meta_node, str(val), COLOR_ATTR_VAL)
                DG.add_edge(field_node, meta_node, label=attr)


def add_class_node(cls, DG, cls_node=None, add_val_type=False, recurse_typing=False):
    if cls_node is None:
        cls_node = _ensure_node(DG, _key(cls), cls.__name__, COLOR_CLASS)
    for key, val in vars(cls).items():
        if not key.startswith("_") and not callable(val):
            add_attribute_node(DG, cls_node, key, val, add_val_type=add_val_type)
    for base in getattr(cls, "__bases__", []):
        if base is object:
            continue
        color = COLOR_MODEL if (inspect.isclass(base) and issubclass(base, BaseModel)) else COLOR_CLASS
        base_node = _ensure_node(DG, _key(base), base.__name__, color)
        DG.add_edge(cls_node, base_node, label="IsA", color=COLOR_ISA)
        add_node_by_type(DG, base, add_val_type=add_val_type, recurse_typing=recurse_typing)
    return cls_node


def add_pydantic_class_node(Model, DG, cls_node=None, add_val_type=False, recurse_typing=False):
    if cls_node is None:
        cls_node = _ensure_node(DG, _key(Model), Model.__name__, COLOR_MODEL)
    own_fields = set(getattr(Model, "__annotations__", {}).keys())
    # Collect names of field nodes already hanging off this class via definesProperty edges.
    already_defined = {
        DG.nodes[v].get("label") for _, v, d in DG.out_edges(cls_node, data=True) if d.get("label") == "definesProperty"
    }
    for field_name, field_info in Model.model_fields.items():
        if field_name in own_fields and field_name not in already_defined:
            add_pydantic_field_node(DG, cls_node, field_name, field_info)
    for base in getattr(Model, "__bases__", []):
        if base is object:
            continue
        color = COLOR_MODEL if (inspect.isclass(base) and issubclass(base, BaseModel)) else COLOR_CLASS
        base_node = _ensure_node(DG, _key(base), base.__name__, color)
        DG.add_edge(cls_node, base_node, label="IsA", color=COLOR_ISA)
        if base is not BaseModel:
            add_node_by_type(DG, base, add_val_type=add_val_type, recurse_typing=recurse_typing)
    return cls_node


def add_pydantic_instance_node(instance, DG, label=None, instance_node=None, add_val_type=False, recurse_typing=False):
    if instance_node is None:
        instance_node = _ensure_node(DG, _key(instance), label or type(instance).__name__, COLOR_INSTANCE)
    existing = _existing_edge_labels(DG, instance_node)
    for key in instance.model_fields:
        if key in existing:
            continue
        val = getattr(instance, key)
        if isinstance(val, BaseModel):
            # Nested Pydantic instance: recurse so subclass fields (e.g. radius) are preserved.
            # model_dump() would lose them because the declared field type is the base class.
            nested_id = _key(val)
            _ensure_node(DG, nested_id, type(val).__name__, COLOR_INSTANCE)
            DG.add_edge(instance_node, nested_id, label=key)
            add_pydantic_instance_node(val, DG, instance_node=nested_id, add_val_type=add_val_type)
        else:
            add_attribute_node(DG, instance_node, key, val, add_val_type=add_val_type)
    add_type_node(DG, instance_node, instance, recurse_typing=False)
    return instance_node


def add_instance_node(value, DG, label=None, value_node=None, add_val_type=False, recurse_typing=False):
    if value_node is None:
        value_node = _ensure_node(DG, _key(value), label or type(value).__name__, COLOR_INSTANCE)
    for key, val in vars(value).items():
        if not key.startswith("_"):
            add_attribute_node(DG, value_node, key, val, add_val_type=add_val_type)
    add_type_node(DG, value_node, value, recurse_typing=False)
    return value_node


def add_node_by_type(DG, value, label=None, add_val_type=False, recurse_typing=False):
    """Dispatch to the appropriate node-builder based on the runtime type of value."""
    if inspect.isclass(value):
        if issubclass(value, BaseModel):
            return add_pydantic_class_node(value, DG, add_val_type=add_val_type, recurse_typing=recurse_typing)
        return add_class_node(value, DG, add_val_type=add_val_type, recurse_typing=recurse_typing)
    if isinstance(value, BaseModel):
        return add_pydantic_instance_node(
            value, DG, label=label, add_val_type=add_val_type, recurse_typing=recurse_typing
        )
    if hasattr(value, "__dict__"):
        return add_instance_node(value, DG, label=label, add_val_type=add_val_type, recurse_typing=recurse_typing)
    return _ensure_node(DG, _key(value), str(value), COLOR_ATTR_VAL)


def nx_to_visnetwork(DG):
    """Convert a networkx DiGraph to VisNetwork nodes/edges lists.

    Fixed anchors establish a left-to-right hierarchy:
      BaseModel (x=-600)  →  classes (physics)  →  instances (x=+600)
    `type` is pinned above the instances as top-of-universe anchor.

    All fixed nodes get explicit x AND y so vis-network places them
    correctly from the start (partial x-only fixing is unreliable).
    """
    type_node_id = _key(type)
    base_model_node_id = _key(BaseModel)

    # Collect instance node ids in stable order to assign evenly-spaced y values.
    instance_ids = [nid for nid, d in DG.nodes(data=True) if d.get("color") == COLOR_INSTANCE]
    y_step = 250
    y_offset = -(len(instance_ids) - 1) * y_step / 2
    instance_y = {nid: y_offset + i * y_step for i, nid in enumerate(instance_ids)}

    nodes = []
    for node_id, data in DG.nodes(data=True):
        node = {"id": node_id, "label": data.get("label", str(node_id))}
        if "color" in data:
            node["color"] = data["color"]
        if "shape" in data:
            node["shape"] = data["shape"]
        if node_id == type_node_id:
            node["x"] = 600
            node["y"] = -500
            node["fixed"] = True  # top-right anchor (connected to instances)
        elif node_id == base_model_node_id:
            node["x"] = -600
            node["y"] = 0
            node["fixed"] = True  # left anchor
        elif data.get("color") == COLOR_INSTANCE:
            node["x"] = 600
            node["y"] = instance_y[node_id]
            node["fixed"] = True  # right anchor, fully pinned
        nodes.append(node)

    edges = []
    for i, (u, v, data) in enumerate(DG.edges(data=True)):
        edge = {"id": i, "from": u, "to": v, "label": data.get("label", ""), "arrows": "to"}
        if "color" in data:
            edge["color"] = data["color"]
        edges.append(edge)

    return nodes, edges


if __name__ == "__main__":
    # ── Pydantic models ────────────────────────────────────────────────────────
    class Geometry(BaseModel):
        """Base class for geometric shapes."""

        dimensions: int = Field(default=2, description="Number of spatial dimensions")

    class Circle(Geometry):
        """A circle defined by its radius."""

        radius: float = Field(default=1.0, description="Radius in meters", ge=0)

    class Rectangle(Geometry):
        """A rectangle defined by width and height."""

        width: float = Field(default=1.0, description="Width in meters", ge=0)
        height: float = Field(default=1.0, description="Height in meters", ge=0)

    class PhysicalObject(BaseModel):
        """A physical object with mass and an optional geometric shape."""

        name: str = Field(default="", description="Name of the physical object")
        mass: float = Field(default=1.0, description="Mass in kilograms", ge=0)
        shape: Optional[Geometry] = Field(default=None, description="Geometric shape of the object")

    PhysicalObject.model_rebuild()

    class Formula(BaseModel):
        """A mathematical formula with a description."""

        formula: str = Field(default="", description="Mathematical formula, e.g. F = m·a")
        description: str = Field(default="", description="Description of the formula")

    class MomentOfInertia(BaseModel):
        """Rotational inertia of a rigid body about a given axis."""

        formula: Optional[Formula] = Field(default=None, description="Mathematical formula, e.g. I = m·r²/2")
        object_name: str = Field(default="", description="Name of the physical object")

    class ParallelAxisTheorem(BaseModel):
        """Steiner's theorem: I = I_cm + m·d².
        Relates the moment of inertia about the center-of-mass axis to any parallel axis."""

        object_name: str = Field(default="", description="Name of the physical object")
        distance: float = Field(default=0.0, description="Distance between parallel axes in meters", ge=0)

    # ── Instances ─────────────────────────────────────────────────────────────
    disk = PhysicalObject(name="Disk", mass=2.5, shape=Circle(radius=0.3))
    block = PhysicalObject(name="Block", mass=5.0, shape=Rectangle(width=0.4, height=0.2))

    # ── Objects to visualize — use (label, obj) tuples to name instances ─────
    vis_list = [
        Geometry,
        Circle,
        Rectangle,
        PhysicalObject,
        MomentOfInertia,
        ParallelAxisTheorem,
        ("circle", Circle()),
        ("rectangle", Rectangle()),
        ("a_circle", disk),
        ("block", block),
    ]

    DG = nx.DiGraph()
    for item in vis_list:
        if isinstance(item, tuple):
            lbl, value = item
            add_node_by_type(DG, value, label=lbl, add_val_type=True, recurse_typing=True)
        else:
            add_node_by_type(DG, item, add_val_type=True, recurse_typing=True)

    nodes, edges = nx_to_visnetwork(DG)
    vis = VisNetwork(
        nodes=nodes,
        edges=edges,
        options={
            "physics": {
                "solver": "forceAtlas2Based",
                "forceAtlas2Based": {
                    "gravitationalConstant": -50,
                    "centralGravity": 0,
                    "springLength": 150,
                    "springConstant": 2,
                    "damping": 0.4,
                    "avoidOverlap": 0.5,
                },
                "wind": {"x": 0, "y": -30},
                "stabilization": {"iterations": 300},
            }
        },
    )

    pn.serve(vis, threaded=True)
