"""PhysMet research data documentation example using SINTEF OO-LD schemas.

Schemas are fetched live from:
  https://github.com/SINTEF/physmet-data-documentation-templates/tree/main/schemas

Demonstrates a materials-science research workflow: organisations fund projects,
people operate equipment to run processes on samples, producing datasets.
"""

from __future__ import annotations

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

# ── Fetch schemas from GitHub ────────────────────────────────────────────────

REPO_RAW = "https://raw.githubusercontent.com/SINTEF/physmet-data-documentation-templates/refs/heads/main"

SCHEMA_NAMES = [
    # "Composition" skipped: malformed (required inside properties) and no @id/@type
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


print("Fetching schemas from GitHub ...")
schemas: dict[str, dict] = {}
for name in SCHEMA_NAMES:
    url = f"{REPO_RAW}/schemas/{name}.schema.json"
    schemas[name] = _fetch_json(url)
    print(f"  {name}: OK")

context_url = f"{REPO_RAW}/context/context.json"
context_doc = _fetch_json(context_url)
print("  context: OK")

# ── IRI-field declarations for cross-reference edges ─────────────────────────
# The shared context already declares many fields as @type: @id (creator,
# seeAlso, subClassOf, ...).  Domain-specific fields used in the schemas but
# missing from the context are added here so the graph tool can detect them.

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

# ── Build entity_types registry ──────────────────────────────────────────────
# Each schema is registered under its title.  The shared context URL is
# registered as a pseudo-schema so the introspector can resolve @context
# string references.  Extra IRI fields are appended to each schema's @context.

# Wrap the fetched context as a pseudo-schema so registry resolution works
context_inner = context_doc.get("@context", context_doc)
context_pseudo_schema: dict = {"@context": {**context_inner, **EXTRA_IRI_FIELDS}}

# Map from @type values used by entities → schema title
TYPE_TO_SCHEMA = {
    "foaf:Organization": "Organisations",
    "foaf:Person": "People",
    "foaf:Project": "Projects",
    "chameo:TransmissionElectronMicroscope": "Equipments",
    "chameo:FocusedIonBeam": "Equipments",
    "chameo:Equipment": "Equipments",
    "chameo:Sample": "Samples",
    "owl:Class": "ProcessClasses",
    "temgo:EDSMapping": "Processes",
    "temgo:SIMSProfiling": "Processes",
    "temgo:FIBLiftout": "Processes",
    "chameo:CharacterisationProcess": "Processes",
    "temgo:EDSMap": "Datasets",
    "temgo:SIMSProfile": "Datasets",
    "dcat:Dataset": "Datasets",
    "owl:datatypeProperty": "Properties",
    "schema:SoftwareApplication": "Software",
}

ENTITY_IRI = "https://w3id.org/2004/02/Entity"

ENTITY_SCHEMA: dict = {
    "$id": ENTITY_IRI,
    "title": "Entity",
    "type": "object",
    "@context": {**context_inner, **EXTRA_IRI_FIELDS},
    "properties": {},
}

entity_types: dict[str, dict] = {"Entity": ENTITY_SCHEMA}

for name, schema in schemas.items():
    # Append extra IRI fields to each schema's @context
    existing_ctx = schema.get("@context")
    if isinstance(existing_ctx, str):
        schema["@context"] = [existing_ctx, EXTRA_IRI_FIELDS]
    elif isinstance(existing_ctx, list):
        schema["@context"] = [*existing_ctx, EXTRA_IRI_FIELDS]
    elif isinstance(existing_ctx, dict):
        schema["@context"] = [{**existing_ctx, **EXTRA_IRI_FIELDS}]

    if "allOf" not in schema:
        schema["allOf"] = [{"$ref": ENTITY_IRI}]

    entity_types[schema.get("title", name)] = schema
    sid = schema.get("$id")
    if sid:
        entity_types[sid] = schema

for type_iri, schema_name in TYPE_TO_SCHEMA.items():
    if schema_name in schemas:
        entity_types[type_iri] = schemas[schema_name]

# Register context URL so introspector can resolve @context string refs
entity_types[context_url] = context_pseudo_schema
# Also register under the URL form used inside the schemas (may differ)
for s in schemas.values():
    ctx = s.get("@context")
    if isinstance(ctx, list):
        for entry in ctx:
            if isinstance(entry, str) and entry not in entity_types:
                entity_types[entry] = context_pseudo_schema

# ── Sample entities ──────────────────────────────────────────────────────────
# A realistic materials-science scenario at NTNU / SINTEF.

# Organisations
ntnu = {
    "@id": "org:NTNU",
    "@type": "foaf:Organization",
    "name": "NTNU",
    "prefix": "ntnu",
    "namespace": "https://www.ntnu.edu/",
}
sintef = {
    "@id": "org:SINTEF",
    "@type": "foaf:Organization",
    "name": "SINTEF",
    "prefix": "sintef",
    "namespace": "https://www.sintef.no/",
}
nfr = {"@id": "org:NFR", "@type": "foaf:Organization", "name": "Research Council of Norway", "prefix": "nfr"}
ec = {
    "@id": "org:EC",
    "@type": "foaf:Organization",
    "name": "European Commission",
    "prefix": "ec",
    "sameAs": "ror:00k4n6c32",
}

# People
andreas = {
    "@id": "pers:AndreasVollBugten",
    "@type": "foaf:Person",
    "name": "Andreas Voll Bugten",
    "prefix": "avb",
    "affiliation": "org:NTNU",
}
marisa = {
    "@id": "pers:MarisaDiSabatino",
    "@type": "foaf:Person",
    "name": "Marisa Di Sabatino",
    "affiliation": "org:NTNU",
}
jesper = {"@id": "pers:JesperFriis", "@type": "foaf:Person", "name": "Jesper Friis", "affiliation": "org:SINTEF"}
randi = {"@id": "pers:RandiHolmestad", "@type": "foaf:Person", "name": "Randi Holmestad", "affiliation": "org:NTNU"}

# Project
physmet = {
    "@id": "proj:physmet",
    "@type": "foaf:Project",
    "name": "SFI PhysMet",
    "prefix": "pm",
    "hasFundingAgency": "org:NFR",
    "hasGrantNumber": 309584,
}

# Equipment
arm200f = {
    "@id": "tem-equip:ARM200F",
    "@type": "chameo:TransmissionElectronMicroscope",
    "name": "ARM200F",
    "identifier": "ARM200F",
    "description": "Jeol JEM ARM200F - Double corrected ColdFEG microscope",
    "location": "NTNU NanoLab",
    "contactPerson": "pers:RandiHolmestad",
}
helios = {
    "@id": "tem-equip:HeliosG4",
    "@type": "chameo:FocusedIonBeam",
    "name": "Helios G4 FIB",
    "identifier": "HeliosG4",
    "description": "Thermo Fisher Helios G4 UX DualBeam FIB-SEM",
    "location": "NTNU NanoLab",
}

# Samples
jm11 = {
    "@id": "avb:JM11",
    "@type": "chameo:Sample",
    "title": "JM11",
    "description": "Spheroidal graphite cast iron sample with nominal boron content.",
    "creator": "pers:AndreasVollBugten",
    "contactPerson": "pers:MarisaDiSabatino",
}
jm12 = {
    "@id": "avb:JM12",
    "@type": "chameo:Sample",
    "title": "JM12",
    "description": "Spheroidal graphite cast iron (reference, no boron).",
    "creator": "pers:AndreasVollBugten",
}
lamella1 = {
    "@id": "avb:JM11_lamella1",
    "@type": "chameo:Sample",
    "title": "JM11 Lamella 1",
    "description": "TEM lamella extracted from JM11 via FIB.",
    "creator": "pers:AndreasVollBugten",
    "processedFrom": "avb:JM11",
}

# Process classes
eds_class = {
    "@id": "temgo:EDSMapping",
    "@type": "owl:Class",
    "subClassOf": "chameo:CharacterisationProcess",
    "prefLabel": "EDS Mapping",
    "elucidation": "Energy Dispersive X-ray Spectroscopy mapping process.",
    "hasInput": "chameo:Sample",
    "hasOutput": "temgo:EDSMap",
}
sims_class = {
    "@id": "temgo:SIMSProfiling",
    "@type": "owl:Class",
    "subClassOf": "chameo:CharacterisationProcess",
    "prefLabel": "SIMS Profiling",
    "elucidation": "Secondary Ion Mass Spectrometry depth profiling.",
}
fib_class = {
    "@id": "temgo:FIBLiftout",
    "@type": "owl:Class",
    "subClassOf": "chameo:CharacterisationProcess",
    "prefLabel": "FIB Liftout",
    "elucidation": "Focused Ion Beam liftout for TEM lamella preparation.",
}

# Processes
jm11_eds_proc = {
    "@id": "avb:JM11_EDS_process",
    "@type": "temgo:EDSMapping",
    "description": "EDS elemental mapping of JM11 lamella.",
    "hasInput": "avb:JM11_lamella1",
    "hasOutput": "avb:JM11_EDS",
    "hasOperator": "pers:AndreasVollBugten",
    "performedWith": "tem-equip:ARM200F",
}
jm11_sims_proc = {
    "@id": "avb:JM11_SIMS_process",
    "@type": "temgo:SIMSProfiling",
    "description": "SIMS depth profile of JM11 for boron concentration.",
    "hasInput": "avb:JM11",
    "hasOutput": "avb:JM11_SIMS",
    "hasOperator": "pers:AndreasVollBugten",
}
jm11_fib_proc = {
    "@id": "avb:JM11_FIB_process",
    "@type": "temgo:FIBLiftout",
    "description": "FIB liftout to extract TEM lamella from JM11.",
    "hasInput": "avb:JM11",
    "hasOutput": "avb:JM11_lamella1",
    "hasOperator": "pers:AndreasVollBugten",
    "performedWith": "tem-equip:HeliosG4",
}

# Dataset classes
eds_map_class = {
    "@id": "temgo:EDSMap",
    "@type": "owl:Class",
    "subClassOf": "dcat:Dataset",
    "prefLabel": "EDS Map",
    "elucidation": "Energy Dispersive X-ray Spectroscopy elemental map dataset.",
}
sims_profile_class = {
    "@id": "temgo:SIMSProfile",
    "@type": "owl:Class",
    "subClassOf": "dcat:Dataset",
    "prefLabel": "SIMS Profile",
    "elucidation": "SIMS depth profile dataset.",
}

# Datasets
jm11_eds = {
    "@id": "avb:JM11_EDS",
    "@type": "temgo:EDSMap",
    "title": "JM11_EDS",
    "description": "EDS elemental map for JM11 lamella.",
    "keyword": "EDS",
    "rightsHolder": "org:NTNU",
    "creator": "pers:AndreasVollBugten",
    "contactPerson": "pers:MarisaDiSabatino",
    "processedFrom": "avb:JM11_lamella1",
}
jm11_sims = {
    "@id": "avb:JM11_SIMS",
    "@type": "temgo:SIMSProfile",
    "title": "JM11_SIMS",
    "description": "SIMS depth profile for JM11 boron concentration.",
    "keyword": "SIMS",
    "rightsHolder": "org:NTNU",
    "creator": "pers:AndreasVollBugten",
    "processedFrom": "avb:JM11",
}
jm12_eds = {
    "@id": "avb:JM12_EDS",
    "@type": "temgo:EDSMap",
    "title": "JM12_EDS",
    "description": "EDS elemental map for JM12 (reference).",
    "keyword": "EDS",
    "rightsHolder": "org:NTNU",
    "creator": "pers:AndreasVollBugten",
    "processedFrom": "avb:JM12",
}

# Properties
nominal_boron = {
    "@id": "avb:nominalBoron",
    "@type": "owl:datatypeProperty",
    "subPropertyOf": "emmo:hasNumberValue",
    "prefLabel": "nominalBoron",
    "elucidation": "Nominal boron content in ppm.",
    "hasUnit": "ppm",
}
nominal_silicon = {
    "@id": "avb:nominalSilicon",
    "@type": "owl:datatypeProperty",
    "subPropertyOf": "emmo:hasNumberValue",
    "prefLabel": "nominalSilicon",
    "elucidation": "Nominal silicon content in weight percent.",
    "hasUnit": "wt%",
}

# Software
velox = {
    "@id": "avb:Velox",
    "@type": "schema:SoftwareApplication",
    "title": "Velox",
    "description": "Thermo Fisher Velox for TEM image and spectroscopy analysis.",
    "keyword": "TEM",
    "version": "3.0",
}

# ── Entity list ──────────────────────────────────────────────────────────────

entity_list: list[dict] = [
    ntnu,
    sintef,
    nfr,
    ec,
    andreas,
    marisa,
    jesper,
    randi,
    physmet,
    arm200f,
    helios,
    jm11,
    jm12,
    lamella1,
    eds_class,
    sims_class,
    fib_class,
    jm11_eds_proc,
    jm11_sims_proc,
    jm11_fib_proc,
    eds_map_class,
    sims_profile_class,
    jm11_eds,
    jm11_sims,
    jm12_eds,
    nominal_boron,
    nominal_silicon,
    velox,
]

# ── Config ───────────────────────────────────────────────────────────────────

config = OOLDGraphConfig(
    uuid="physmet-sintef-example",
    name="PhysMet Research Data",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid="physmet-expand",
        name="Classes and properties",
        root_node=ENTITY_SCHEMA,
        expansion_steps=[
            ExpansionStep(
                uuid="physmet-step1",
                name="step1",
                relations=["-IsA", "-HasType", "hasInput", "hasOutput"],
                iter_limit=10,
            ),
        ],
    ),
)

# ── Launch ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    graph_detail_panel = OOLDGraphDetailTool(config=config)
    pn.serve(graph_detail_panel, show=True, title="PhysMet Research Data Graph")
