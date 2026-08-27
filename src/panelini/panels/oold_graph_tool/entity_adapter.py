"""Uniform entity wrapper for OOLDGraphDetailTool.

All inputs (pydantic LinkedBaseModel instances or plain JSON dicts) are
converted to EntityAdapter instances at the boundary.  Internal code then
works exclusively through EntityAdapter + OOLDSchemaIntrospector.
"""

from __future__ import annotations

import json
from typing import Any

from panelini.panels.oold_graph_tool.oold_schema import build_context_from_schema

# ---------------------------------------------------------------------------
# Lazy pydantic / oold detection helpers
# ---------------------------------------------------------------------------


def _has_export_schema(obj: Any) -> bool:
    return hasattr(obj, "export_schema") and callable(obj.export_schema)


def _has_model_dump(obj: Any) -> bool:
    return hasattr(obj, "model_dump") and callable(obj.model_dump)


def _is_pydantic_class(obj: Any) -> bool:
    return isinstance(obj, type) and _has_export_schema(obj)


# ---------------------------------------------------------------------------
# EntityAdapter
# ---------------------------------------------------------------------------


class EntityAdapter:
    """Uniform wrapper around an entity's data dict and its OO-LD schema.

    After construction every entity --whether it originated as a pydantic
    ``LinkedBaseModel`` instance or as a plain JSON dict --is accessed
    through the same interface.
    """

    __slots__ = ("_data", "_schema", "_schema_registry", "_type_name")

    def __init__(
        self,
        data: dict,
        schema: dict,
        type_name: str,
        schema_registry: dict[str, dict] | None = None,
    ) -> None:
        self._data = data
        self._schema = schema
        self._type_name = type_name
        self._schema_registry = schema_registry or {}

    # -- identity -----------------------------------------------------------

    def get_iri(self) -> str:
        return self._data.get("id") or self._data.get("@id", "")

    # -- data access --------------------------------------------------------

    @property
    def data(self) -> dict:
        return self._data

    def get(self, key: str, default: Any = None) -> Any:
        return self._data.get(key, default)

    def set(self, key: str, value: Any) -> None:
        self._data[key] = value

    # -- serialisation ------------------------------------------------------

    def to_jsonld(self) -> dict:
        """Build a JSON-LD document from the entity data and its schema context.

        Merges the resolved ``@context`` from the schema (walking the
        ``allOf`` parent chain via the registry) into the data dict.  The
        result is a valid JSON-LD document suitable for
        ``rdflib.Graph.parse(data=json.dumps(result), format='json-ld')``.
        """
        ctx = build_context_from_schema(self._schema, self._schema_registry)
        doc: dict[str, Any] = {}
        if ctx:
            doc["@context"] = ctx
        doc.update(self._data)
        return doc

    def deep_copy(self) -> EntityAdapter:
        data_copy = json.loads(json.dumps(self._data, default=str))
        return EntityAdapter(
            data=data_copy,
            schema=self._schema,
            type_name=self._type_name,
            schema_registry=self._schema_registry,
        )

    def to_json_str(self, **kwargs: Any) -> str:
        return json.dumps(self._data, **kwargs)

    # -- convenience properties ---------------------------------------------

    @property
    def name(self) -> str:
        return self._data.get("name") or self._data.get("title") or self._data.get("prefLabel") or ""

    @property
    def type_name(self) -> str:
        return self._type_name

    @property
    def schema(self) -> dict:
        return self._schema

    # -- dunder -------------------------------------------------------------

    def __repr__(self) -> str:
        iri = self.get_iri()
        return f"EntityAdapter({self._type_name!r}, iri={iri!r}, name={self.name!r})"


# ---------------------------------------------------------------------------
# Schema-dict detection
# ---------------------------------------------------------------------------


def is_schema_dict(d: dict) -> bool:
    """Return *True* if *d* looks like an OO-LD schema rather than an entity.

    Heuristic: a schema has ``"type": "object"`` **and** ``"properties"``.
    An entity dict may have a ``type`` field too, but its value is an IRI
    string (not ``"object"``), and it will not have ``"properties"``.
    """
    return isinstance(d, dict) and d.get("type") == "object" and "properties" in d


# ---------------------------------------------------------------------------
# Schema IRI helpers
# ---------------------------------------------------------------------------


def _schema_iri(schema: dict) -> str | None:
    """Return the canonical IRI of a schema (``$id`` or ``iri``), or *None*."""
    return schema.get("$id") or schema.get("iri")


def _schema_type_name(schema: dict, fallback: str = "Unknown") -> str:
    """Derive a human-readable type name from a schema dict."""
    title = schema.get("title")
    if title:
        return title
    sid = _schema_iri(schema)
    if sid:
        return sid.rsplit("/", 1)[-1].rsplit("#", 1)[-1].replace(".schema.json", "")
    return fallback


# ---------------------------------------------------------------------------
# Factory: adapt_type
# ---------------------------------------------------------------------------


def adapt_type(type_input: Any, name: str | None = None) -> tuple[str, dict]:
    """Convert a pydantic class **or** an OO-LD schema dict into
    ``(type_name, schema_dict)``.

    For pydantic classes ``export_schema()`` is called once; subsequent
    lookups use the cached schema dict.
    """
    if isinstance(type_input, dict):
        type_name = name or _schema_type_name(type_input)
        return type_name, type_input

    if _is_pydantic_class(type_input):
        schema = type_input.export_schema()
        type_name = name or type_input.__name__
        return type_name, schema

    msg = f"Unsupported type input: {type(type_input)}"
    raise TypeError(msg)


# ---------------------------------------------------------------------------
# Factory: adapt_entity
# ---------------------------------------------------------------------------


def adapt_entity(item: Any, schema_registry: dict[str, dict]) -> EntityAdapter:
    """Convert a pydantic instance **or** a plain JSON dict into an
    `EntityAdapter`.

    * **pydantic instance** --``model_dump()`` extracts the data; the IRI
      is ensured via ``get_iri()``; the schema is looked up in the registry
      by class name or IRI.
    * **plain dict** --the ``type`` (or ``@type``) value is used to find the
      matching schema in the registry.
    """
    if isinstance(item, dict):
        return _adapt_dict(item, schema_registry)

    if _has_model_dump(item):
        return _adapt_pydantic(item, schema_registry)

    msg = f"Unsupported entity type: {type(item)}"
    raise TypeError(msg)


def _adapt_pydantic(item: Any, registry: dict[str, dict]) -> EntityAdapter:
    data = item.model_dump()

    if hasattr(item, "get_iri"):
        iri = str(item.get_iri())
        if iri:
            data["id"] = iri

    cls = type(item)
    type_name = cls.__name__

    schema = _lookup_schema(registry, type_name=type_name, cls=cls)
    return EntityAdapter(data, schema, type_name, registry)


def _adapt_dict(item: dict, registry: dict[str, dict]) -> EntityAdapter:
    type_val = item.get("type") or item.get("@type", "")
    schema = registry.get(type_val, {})

    if not schema:
        for _key, s in registry.items():
            s_iri = _schema_iri(s)
            if s_iri and s_iri == type_val:
                schema = s
                break

    type_name = _schema_type_name(schema, fallback=str(type_val))
    return EntityAdapter(dict(item), schema, type_name, registry)


def _lookup_schema(
    registry: dict[str, dict],
    type_name: str,
    cls: type | None = None,
) -> dict:
    """Find the schema in the registry by class name or schema IRI."""
    if type_name in registry:
        return registry[type_name]

    if cls is not None:
        iri = _cls_iri(cls)
        if iri:
            iris = iri if isinstance(iri, list) else [iri]
            for i in iris:
                if i in registry:
                    return registry[i]

    return {}


def _cls_iri(cls: type) -> str | list[str] | None:
    """Extract the class IRI from a pydantic class without importing oold."""
    if hasattr(cls, "get_cls_iri"):
        return cls.get_cls_iri()
    mc = getattr(cls, "model_config", None)
    if mc and isinstance(mc, dict):
        extra = mc.get("json_schema_extra", {})
        if isinstance(extra, dict):
            return extra.get("$id") or extra.get("iri")
    return None


# ---------------------------------------------------------------------------
# MRO auto-registration
# ---------------------------------------------------------------------------


def register_pydantic_hierarchy(cls: type, registry: dict[str, dict]) -> None:  # noqa: C901
    """Walk *cls.__mro__* and ``export_schema()`` every LinkedBaseModel
    ancestor, adding each to *registry* under both its class name and its
    schema IRI.  Enriches the flat schemas with ``$id`` and ``allOf``
    references so that OO-LD schema introspection (IsA edges, inherited
    properties) works identically to hand-written OO-LD schemas.
    """
    pydantic_ancestors = []
    for ancestor in cls.__mro__:
        if ancestor is object:
            continue
        if not _is_pydantic_class(ancestor):
            continue
        pydantic_ancestors.append(ancestor)

    # Register bottom-up (parents first) so $ref targets exist
    for ancestor in reversed(pydantic_ancestors):
        aname = ancestor.__name__
        if aname not in registry:
            try:
                schema = ancestor.export_schema()
            except Exception:  # noqa: S112
                continue
            registry[aname] = schema
            iri = schema.get("$id") or schema.get("iri")
            if iri and iri not in registry:
                registry[iri] = schema

        # Enrich existing schema with $id (even if already registered)
        schema = registry.get(aname)
        if schema:
            iri = schema.get("$id") or schema.get("iri")
            if iri and "$id" not in schema:
                schema["$id"] = iri

    # Second pass: add allOf references from child → parent
    for ancestor in pydantic_ancestors:
        aname = ancestor.__name__
        schema = registry.get(aname)
        if not schema:
            continue
        bases = [b for b in ancestor.__bases__ if b is not object and _is_pydantic_class(b)]
        if not bases:
            continue
        all_of = []
        for base in bases:
            base_schema = registry.get(base.__name__)
            if base_schema:
                ref = base_schema.get("$id") or base_schema.get("iri") or base.__name__
                all_of.append({"$ref": ref})
        if all_of and "allOf" not in schema:
            schema["allOf"] = all_of
