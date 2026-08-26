"""OO-LD schema introspection utilities.

Provides ``PropertyInfo``, ``OOLDSchemaIntrospector`` and
``build_context_from_schema`` — all the machinery needed to inspect
OO-LD JSON Schema dicts without touching pydantic APIs.
"""

from __future__ import annotations

import copy
from dataclasses import dataclass, field
from typing import Any


class _Missing:
    """Sentinel for 'no default value'."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __repr__(self):
        return "MISSING"

    def __bool__(self):
        return False


MISSING = _Missing()

_CONSTRAINT_KEYS = (
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "minLength",
    "maxLength",
    "multipleOf",
)


@dataclass
class PropertyInfo:
    """Schema-derived metadata for a single property.

    Mirrors the information previously obtained from pydantic ``FieldInfo``
    but sourced entirely from an OO-LD / JSON Schema property dict.
    """

    name: str
    json_type: str = "string"
    description: str | None = None
    default: Any = MISSING
    required: bool = False
    ref: str | None = None
    range: str | None = None
    items: dict | None = None
    enum_values: list | None = None
    constraints: dict = field(default_factory=dict)
    raw_schema: dict = field(default_factory=dict)


def _extract_property_info(  # noqa: C901
    name: str,
    prop_schema: dict,
    required_names: set[str],
) -> PropertyInfo:
    """Build a ``PropertyInfo`` from a single JSON Schema property dict."""
    raw = dict(prop_schema)
    json_type, is_list, is_optional = _classify_json_schema(prop_schema)

    description = prop_schema.get("description")
    default: Any = MISSING
    if "default" in prop_schema:
        default = prop_schema["default"]

    ref = prop_schema.get("$ref")
    items_schema = prop_schema.get("items")

    if items_schema and not ref:
        ref = items_schema.get("$ref")

    # anyOf branches may carry $ref or items with $ref
    for branch in prop_schema.get("anyOf", []):
        if isinstance(branch, dict):
            if not ref and "$ref" in branch:
                ref = branch["$ref"]
            branch_items = branch.get("items")
            if isinstance(branch_items, dict) and not ref:
                ref = branch_items.get("$ref")

    range_val = prop_schema.get("x-oold-range") or prop_schema.get("range")
    if not range_val and items_schema and isinstance(items_schema, dict):
        range_val = items_schema.get("x-oold-range") or items_schema.get("range")

    enum_values = prop_schema.get("enum")
    if not enum_values and items_schema and isinstance(items_schema, dict):
        enum_values = items_schema.get("enum")

    constraints: dict[str, Any] = {}
    for key in _CONSTRAINT_KEYS:
        val = prop_schema.get(key)
        if val is not None:
            constraints[key] = val

    return PropertyInfo(
        name=name,
        json_type=json_type,
        description=description,
        default=default,
        required=name in required_names,
        ref=ref,
        range=range_val,
        items=items_schema,
        enum_values=enum_values,
        constraints=constraints,
        raw_schema=raw,
    )


def _classify_json_schema(
    prop_schema: dict,
) -> tuple[str, bool, bool]:
    """Return ``(base_type, is_list, is_optional)`` for a property schema.

    Handles ``anyOf`` with null branches (Optional), ``type: "array"`` with
    ``items``, and direct ``type`` strings.
    """
    is_optional = False
    is_list = False

    # --- unwrap anyOf (Optional pattern) ---
    if "anyOf" in prop_schema:
        branches = prop_schema["anyOf"]
        non_null = [b for b in branches if not _is_null_branch(b)]
        if len(non_null) < len(branches):
            is_optional = True
        if non_null:
            inner = non_null[0]
        else:
            return ("null", False, True)
    else:
        inner = prop_schema

    # --- resolve type ---
    schema_type = inner.get("type", "string")

    if schema_type == "array":
        is_list = True
        items = inner.get("items", {})
        base = items.get("type", "string") if isinstance(items, dict) else "string"
    else:
        base = schema_type

    return (base, is_list, is_optional)


def _is_null_branch(branch: Any) -> bool:
    if isinstance(branch, dict):
        return branch.get("type") == "null"
    return False


class OOLDSchemaIntrospector:
    """Analyse OO-LD schema dicts without any pydantic dependency.

    Parameters
    ----------
    registry : dict[str, dict]
        Mapping from schema IRI / name to the full OO-LD schema dict.
        The introspector uses this to resolve ``allOf`` / ``$ref`` and
        parent ``@context`` chains.
    """

    def __init__(self, registry: dict[str, dict] | None = None):
        self.registry: dict[str, dict] = registry or {}

    # ------------------------------------------------------------------
    # Identity helpers
    # ------------------------------------------------------------------

    @staticmethod
    def get_schema_iri(schema: dict) -> str | None:
        return schema.get("$id") or schema.get("iri")

    @staticmethod
    def get_type_name(schema: dict) -> str:
        title = schema.get("title")
        if title:
            return title
        iri = schema.get("$id") or schema.get("iri") or ""
        # derive a short name from the IRI
        local = iri.rsplit("/", 1)[-1].rsplit("#", 1)[-1]
        return local.removesuffix(".json").removesuffix(".schema") or "Unknown"

    @staticmethod
    def get_context(schema: dict) -> list | dict | None:
        return schema.get("@context")

    @staticmethod
    def get_default_properties(schema: dict) -> list[str]:
        return schema.get("defaultProperties", [])

    @staticmethod
    def get_parent_schema_refs(schema: dict) -> list[str]:
        """Return ``$ref`` values from ``allOf`` entries."""
        refs: list[str] = []
        for entry in schema.get("allOf", []):
            if isinstance(entry, dict) and "$ref" in entry:
                refs.append(entry["$ref"])
        return refs

    # ------------------------------------------------------------------
    # Property introspection
    # ------------------------------------------------------------------

    def get_properties(self, schema: dict) -> dict[str, PropertyInfo]:
        """All properties including those inherited via ``allOf``."""
        merged: dict[str, PropertyInfo] = {}
        required_names = set(schema.get("required", []))

        # collect parent properties first (parents-first ordering)
        for ref in self.get_parent_schema_refs(schema):
            parent = self.resolve_ref(ref)
            if parent is not None:
                parent_props = self.get_properties(parent)
                # parent required names feed into child context
                required_names |= set(parent.get("required", []))
                merged.update(parent_props)

        # own properties override parents
        for name, prop_schema in schema.get("properties", {}).items():
            merged[name] = _extract_property_info(name, prop_schema, required_names)

        # propagate required flag from the full required set
        for name, info in merged.items():
            if name in required_names:
                info.required = True

        return merged

    def get_own_properties(self, schema: dict) -> set[str]:
        """Property names defined directly on *this* schema (not inherited)."""
        return set(schema.get("properties", {}).keys())

    def classify_property(self, prop_info: PropertyInfo) -> tuple[str, bool, bool]:
        """Return ``(base_type, is_list, is_optional)``."""
        return _classify_json_schema(prop_info.raw_schema)

    def is_object_ref(self, prop_info: PropertyInfo) -> bool:
        """True if the property points to a known schema (sub-object or IRI ref)."""
        target = prop_info.ref or prop_info.range
        if not target:
            return False
        if target == "#":
            return True
        return target in self.registry

    def resolve_ref(self, ref: str) -> dict | None:
        """Look up a ``$ref`` string in the registry."""
        if ref == "#":
            return None
        return self.registry.get(ref)

    # ------------------------------------------------------------------
    # JSON-LD context analysis
    # ------------------------------------------------------------------

    def _collect_context_dicts(self, schema: dict, _seen: set[str] | None = None) -> list[dict]:  # noqa: C901
        """Gather all ``@context`` dict entries, walking the parent chain."""
        if _seen is None:
            _seen = set()

        schema_iri = self.get_schema_iri(schema) or id(schema)
        if schema_iri in _seen:
            return []
        _seen.add(schema_iri)

        result: list[dict] = []

        # parents first
        for ref in self.get_parent_schema_refs(schema):
            parent = self.resolve_ref(ref)
            if parent is not None:
                result.extend(self._collect_context_dicts(parent, _seen))

        # own context
        ctx = schema.get("@context")
        if isinstance(ctx, dict):
            result.append(ctx)
        elif isinstance(ctx, list):
            for entry in ctx:
                if isinstance(entry, dict):
                    result.append(entry)
                elif isinstance(entry, str):
                    # string entries are parent context IRIs — resolve them
                    parent = self.resolve_ref(entry)
                    if parent is not None:
                        result.extend(self._collect_context_dicts(parent, _seen))

        return result

    def is_iri_field(self, schema: dict, field_name: str) -> bool:
        """True if *field_name* is declared ``@type: @id`` in the context chain."""
        for ctx_dict in self._collect_context_dicts(schema):
            entry = ctx_dict.get(field_name)
            if isinstance(entry, dict) and entry.get("@type") == "@id":
                return True
        return False

    def field_name_for_predicate(self, schema: dict, pred_label: str) -> str | None:
        """Map an RDF predicate local name back to a schema property name.

        Checks direct name match first, then scans the ``@context`` chain.
        """
        props = self.get_properties(schema)
        if pred_label in props:
            return pred_label

        for ctx_dict in self._collect_context_dicts(schema):
            for field_name, mapping in ctx_dict.items():
                if field_name not in props:
                    continue
                if isinstance(mapping, dict):
                    mapped_id = mapping.get("@id", "")
                elif isinstance(mapping, str):
                    mapped_id = mapping
                else:
                    continue
                local = mapped_id.rsplit("/", 1)[-1].rsplit("#", 1)[-1].rsplit(":", 1)[-1]
                if local == pred_label:
                    return field_name
        return None


def _resolve_property_scoped_contexts(
    ctx_dict: dict,
    registry: dict[str, dict],
    _seen: set[str],
) -> dict:
    """Resolve ``@context`` string values inside property-scoped mappings.

    E.g. ``{"ingredients": {"@id": "ex:X", "@context": "https://..."}}``
    → the ``@context`` string is replaced with the resolved context from the
    registry schema.
    """
    for _key, value in ctx_dict.items():
        if not isinstance(value, dict):
            continue
        inner_ctx = value.get("@context")
        if isinstance(inner_ctx, str):
            parent = registry.get(inner_ctx)
            if parent is not None:
                resolved = build_context_from_schema(parent, registry, _seen)
                if resolved:
                    value["@context"] = resolved
    return ctx_dict


def build_context_from_schema(  # noqa: C901
    schema: dict,
    registry: dict[str, dict],
    _seen: set[str] | None = None,
) -> list | dict:
    """Build a fully resolved JSON-LD ``@context`` for an entity.

    Walks the schema's ``@context`` and recursively resolves string entries
    that are parent-schema IRIs via the *registry*, merging their contexts.
    The result is suitable for injection into a plain-dict entity before
    passing it to ``rdflib`` or ``pyld`` for JSON-LD expansion.

    Parameters
    ----------
    schema : dict
        The entity's OO-LD schema.
    registry : dict[str, dict]
        Schema IRI / name → full schema dict.

    Returns
    -------
    list | dict
        A resolved ``@context`` value (list of dicts, or a single dict).
    """
    if _seen is None:
        _seen = set()

    schema_iri = OOLDSchemaIntrospector.get_schema_iri(schema)
    sentinel = schema_iri or str(id(schema))
    if sentinel in _seen:
        return {}
    _seen.add(sentinel)

    ctx = schema.get("@context")
    if ctx is None:
        return {}

    if isinstance(ctx, dict):
        return _resolve_property_scoped_contexts(copy.deepcopy(ctx), registry, _seen)

    if isinstance(ctx, list):
        resolved: list = []
        for entry in ctx:
            if isinstance(entry, dict):
                resolved.append(_resolve_property_scoped_contexts(copy.deepcopy(entry), registry, _seen))
            elif isinstance(entry, str):
                parent = registry.get(entry)
                if parent is not None:
                    parent_ctx = build_context_from_schema(parent, registry, _seen)
                    if isinstance(parent_ctx, list):
                        resolved.extend(parent_ctx)
                    elif isinstance(parent_ctx, dict) and parent_ctx:
                        resolved.append(parent_ctx)
                else:
                    resolved.append(entry)
            else:
                resolved.append(entry)
        return resolved

    if isinstance(ctx, str):
        parent = registry.get(ctx)
        if parent is not None:
            return build_context_from_schema(parent, registry, _seen)
        return ctx

    return {}
