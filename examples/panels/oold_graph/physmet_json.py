"""PhysMet research data documentation example using SINTEF OO-LD schemas.

Schemas and entity data are fetched live from:
  https://github.com/SINTEF/physmet-data-documentation-templates

Entity data comes from the CSV templates in that repo; each row becomes a
JSON-LD entity dict.  Demonstrates a materials-science research workflow:
organisations fund projects, people operate equipment to run processes on
samples, producing datasets.
"""

from __future__ import annotations

import csv
import io
import json
import urllib.request

import panel as pn

from panelini.panels.oold_graph_tool.oold_graph_tool import (
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator")
pn.extension("jsoneditor")

# -- Fetch schemas from GitHub ------------------------------------------------

REPO_RAW = "https://raw.githubusercontent.com/SINTEF/physmet-data-documentation-templates/refs/heads/main"

SCHEMA_NAMES = [
    "Composition",
    "DatasetClasses",
    "Datasets",
    "Equipments",
    "Organisations",
    "People",
    "ProcessClasses",
    "Processes",
    "Projects",
    "Properties",
    "Samples",
    "Software",
]


def _fetch_json(url: str) -> dict:
    with urllib.request.urlopen(url, timeout=15) as resp:  # noqa: S310
        return json.loads(resp.read().decode())


def _fetch_csv_entities(url: str) -> list[dict]:
    with urllib.request.urlopen(url, timeout=15) as resp:  # noqa: S310
        text = resp.read().decode()
    reader = csv.DictReader(io.StringIO(text))
    entities: list[dict] = []
    for row in reader:
        entity = {k: v for k, v in row.items() if v}
        if "@id" in entity and "@type" in entity:
            entities.append(entity)
    return entities


print("Fetching schemas from GitHub ...")
schemas: dict[str, dict] = {}
for name in SCHEMA_NAMES:
    url = f"{REPO_RAW}/schemas/{name}.schema.json"
    schemas[name] = _fetch_json(url)
    print(f"  {name}: OK")

context_url = f"{REPO_RAW}/context/context.json"
context_doc = _fetch_json(context_url)
print("  context: OK")


def _fix_composition_schema(schema: dict) -> None:
    """Move misplaced 'required' from inside 'properties' to the correct level."""
    props = schema.get("properties", {})
    if "required" in props:
        schema.setdefault("required", []).extend(props.pop("required"))
    for _key, val in props.items():
        if isinstance(val, dict) and "properties" in val:
            inner_props = val["properties"]
            if "required" in inner_props:
                val.setdefault("required", []).extend(inner_props.pop("required"))


_fix_composition_schema(schemas["Composition"])

# -- IRI-field declarations for cross-reference edges -------------------------

EXTRA_IRI_FIELDS: dict = {
    "contactPerson": {"@id": "HasContactPerson", "@type": "@id"},
    "affiliation": {"@id": "foaf:member", "@type": "@id"},
    "hasFundingAgency": {"@id": "foaf:fundedBy", "@type": "@id"},
    "hasInput": {"@id": "emmo:hasInput", "@type": "@id"},
    "hasOutput": {"@id": "emmo:hasOutput", "@type": "@id"},
    "hasOperator": {"@id": "chameo:hasOperator", "@type": "@id"},
    "performedWith": {"@id": "chameo:performedWith", "@type": "@id"},
    "processedFrom": {"@id": "dcat:qualifiedRelation", "@type": "@id"},
    "rightsHolder": {"@id": "dcterms:rightsHolder", "@type": "@id"},
    "priorRelease": {"@id": "dcat:previousVersion", "@type": "@id"},
    "project": {"@id": "HasProject", "@type": "@id"},
}

# -- Build entity_types list --------------------------------------------------

context_inner = context_doc.get("@context", context_doc)
context_pseudo_schema: dict = {"$id": context_url, "@context": {**context_inner, **EXTRA_IRI_FIELDS}}

ENTITY_IRI = "https://w3id.org/2004/02/Entity"

ENTITY_SCHEMA: dict = {
    "$id": ENTITY_IRI,
    "title": "Entity",
    "type": "object",
    "@context": {**context_inner, **EXTRA_IRI_FIELDS},
    "properties": {},
}

for _name, schema in schemas.items():
    existing_ctx = schema.get("@context")
    if isinstance(existing_ctx, str):
        schema["@context"] = [existing_ctx, EXTRA_IRI_FIELDS]
    elif isinstance(existing_ctx, list):
        schema["@context"] = [*existing_ctx, EXTRA_IRI_FIELDS]
    elif isinstance(existing_ctx, dict):
        schema["@context"] = [{**existing_ctx, **EXTRA_IRI_FIELDS}]

    if "allOf" not in schema:
        schema["allOf"] = [{"$ref": ENTITY_IRI}]

# -- Subtype-to-parent mapping ------------------------------------------------
# Maps each @type CURIE to the parent schema that defines the entity's fields.
# Used as schema_aliases so HasSchemaType points to the parent (e.g. Datasets)
# while HasRdfType points to the ontological class (e.g. temgo:EDSMap).

SUBTYPE_TO_PARENT: dict[str, str] = {
    "foaf:Organization": "Organisations",
    "foaf:Person": "People",
    "foaf:Project": "Projects",
    "chameo:TransmissionElectronMicroscope": "Equipments",
    "chameo:ScanningElectronMicroscope": "Equipments",
    "chameo:FocusedIonBeam": "Equipments",
    "chameo:Equipment": "Equipments",
    "chameo:Sample": "Samples",
    "owl:Class": "DatasetClasses",
    "temgo:EDSMapping": "Processes",
    "temgo:SIMSProfiling": "Processes",
    "temgo:FIBLiftout": "Processes",
    "chameo:CharacterisationProcess": "Processes",
    "temgo:EDSMap": "Datasets",
    "temgo:SIMSProfile": "Datasets",
    "dcat:Dataset": "Datasets",
    "owl:datatypeProperty": "Properties",
    "schema:SoftwareApplication": "Software",
    "emmo:ChemicalComposition": "Composition",
}

# -- Download CSV templates as entities ---------------------------------------

TEMPLATE_TO_SCHEMA: dict[str, str] = {
    "compositions": "Composition",
    "datasetClasses": "DatasetClasses",
    "datasets": "Datasets",
    "equipments": "Equipments",
    "organisations": "Organisations",
    "people": "People",
    "processClasses": "ProcessClasses",
    "processes": "Processes",
    "projects": "Projects",
    "properties": "Properties",
    "samples": "Samples",
    "software": "Software",
}

print("Fetching templates from GitHub ...")
entity_list: list[dict] = []
for template_name, schema_name in TEMPLATE_TO_SCHEMA.items():
    url = f"{REPO_RAW}/templates/{template_name}.csv"
    entities = _fetch_csv_entities(url)
    for e in entities:
        etype = e.get("@type", "")
        if etype and etype not in SUBTYPE_TO_PARENT:
            SUBTYPE_TO_PARENT[etype] = schema_name
    entity_list.extend(entities)
    if entities:
        print(f"  {template_name}: {len(entities)} entities")
    else:
        print(f"  {template_name}: (empty)")

print(f"  Total entities: {len(entity_list)}")

# -- Build sub-schemas from SUBTYPE_TO_PARENT ---------------------------------

CLASS_METADATA: dict[str, dict[str, str]] = {
    "temgo:EDSMapping": {
        "title": "EDS Mapping",
        "description": "Energy Dispersive X-ray Spectroscopy mapping process.",
    },
    "temgo:SIMSProfiling": {
        "title": "SIMS Profiling",
        "description": "Secondary Ion Mass Spectrometry depth profiling.",
    },
    "temgo:FIBLiftout": {
        "title": "FIB Liftout",
        "description": "Focused Ion Beam liftout for TEM lamella preparation.",
    },
    "temgo:EDSMap": {
        "title": "EDS Map",
        "description": "Energy Dispersive X-ray Spectroscopy elemental map dataset.",
    },
    "temgo:SIMSProfile": {
        "title": "SIMS Profile",
        "description": "SIMS depth profile dataset.",
    },
}

sub_schemas: list[dict] = []
for type_iri, parent_name in SUBTYPE_TO_PARENT.items():
    parent = schemas[parent_name]
    parent_id = parent.get("$id", parent_name)
    meta = CLASS_METADATA.get(type_iri, {})
    sub_schemas.append({
        "$id": type_iri,
        "title": meta.get("title", type_iri.split(":")[-1]),
        "description": meta.get("description", ""),
        "type": "object",
        "@context": parent.get("@context", {}),
        "allOf": [{"$ref": parent_id}],
        "properties": {},
    })

entity_types: list[dict] = [ENTITY_SCHEMA, context_pseudo_schema, *schemas.values(), *sub_schemas]

# -- Config -------------------------------------------------------------------

config = OOLDGraphConfig(
    uuid="physmet-sintef-example",
    name="PhysMet Research Data",
    entity_list=entity_list,
    entity_types=entity_types,
    schema_aliases=SUBTYPE_TO_PARENT,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid="physmet-expand",
        name="Classes and properties",
        root_node=ENTITY_SCHEMA,
        expansion_steps=[
            ExpansionStep(
                uuid="physmet-step1",
                name="step1",
                relations=["-ExtendsSchema", "-SubClassOf", "-HasSchemaType", "-HasRdfType", "hasInput", "hasOutput"],
                iter_limit=10,
            ),
        ],
    ),
)

# -- Launch -------------------------------------------------------------------

if __name__ == "__main__":
    graph_detail_panel = OOLDGraphDetailTool(config=config)
    pn.serve(graph_detail_panel, show=True, title="PhysMet Research Data Graph")
