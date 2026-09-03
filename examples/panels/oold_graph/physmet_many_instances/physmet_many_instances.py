"""PhysMet many-instances example: load tabular CSV data into the OO-LD graph tool.

Demonstrates a practical workflow where entity data lives in CSV files (as if
exported from Excel sheets or a database) and is converted to JSON-LD dicts
for graph visualization.

On first run, mock CSV files are generated in ``mock_up_data/``.  On subsequent
runs the existing CSVs are loaded -- so you can edit them by hand and see the
changes reflected in the graph.

All entity data is **fictional** and obviously made up.

Scale is controlled by ``NUM_SAMPLES`` below.  Change it, delete the CSVs,
and re-run to regenerate at a different size.
"""

from __future__ import annotations

import random
import uuid
from pathlib import Path

import pandas as pd
import panel as pn

from examples.panels.oold_graph.physmet_json import (
    ENTITY_IRI as ENTITY_IRI,
)
from examples.panels.oold_graph.physmet_json import (
    ENTITY_SCHEMA as ENTITY_SCHEMA,
)
from examples.panels.oold_graph.physmet_json import (
    entity_types,
)
from panelini.panels.oold_graph_tool.oold_graph_tool import (
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator")
pn.extension("jsoneditor")

# ── Configuration ───────────────────────────────────────────────────────────

NUM_SAMPLES = 100
DATA_DIR = Path(__file__).parent / "mock_up_data"

# ── CSV I/O ─────────────────────────────────────────────────────────────────

TABLE_NAMES = [
    "organisations",
    "people",
    "projects",
    "equipments",
    "samples",
    "processes",
    "datasets",
]


def _load_csvs(data_dir: Path) -> dict[str, pd.DataFrame]:
    """Load all CSVs from *data_dir*.  Returns empty dict if none exist."""
    tables: dict[str, pd.DataFrame] = {}
    for name in TABLE_NAMES:
        path = data_dir / f"{name}.csv"
        if path.exists():
            tables[name] = pd.read_csv(path, keep_default_na=False)
    return tables if len(tables) == len(TABLE_NAMES) else {}


def _write_csvs(tables: dict[str, pd.DataFrame], data_dir: Path) -> None:
    """Write each DataFrame as a CSV into *data_dir*."""
    data_dir.mkdir(parents=True, exist_ok=True)
    for name, df in tables.items():
        df.to_csv(data_dir / f"{name}.csv", index=False)


# ── DataFrame -> entity dict conversion ─────────────────────────────────────


def _df_to_entities(df: pd.DataFrame) -> list[dict]:
    """Convert each DataFrame row to a JSON-LD-style entity dict.

    Drops empty / NaN values so the dict stays clean.
    """
    entities: list[dict] = []
    for _, row in df.iterrows():
        entity = {}
        for col, val in row.items():
            if pd.isna(val) or val == "":
                continue
            entity[str(col)] = val
        if "@id" in entity and "@type" in entity:
            entities.append(entity)
    return entities


# ── Mock data generation ────────────────────────────────────────────────────

ALLOY_SERIES = ["AA", "BB", "CC", "DD", "EE"]
PROCESS_TYPES = [
    ("EDS", "temgo:EDSMapping", "Energy Dispersive X-ray Spectroscopy mapping"),
    ("SIMS", "temgo:SIMSProfiling", "Secondary Ion Mass Spectrometry depth profiling"),
    ("FIB", "temgo:FIBLiftout", "Focused Ion Beam liftout for TEM lamella preparation"),
]
DATASET_TYPE_MAP = {
    "temgo:EDSMapping": "temgo:EDSMap",
    "temgo:SIMSProfiling": "temgo:SIMSProfile",
    "temgo:FIBLiftout": "dcat:Dataset",
}


def _generate_default_data() -> dict[str, pd.DataFrame]:
    """Generate fictional mock data.  Seeded for reproducibility."""
    rng = random.Random(42)  # noqa: S311

    # ── Organisations ───────────────────────────────────────────────────
    orgs = pd.DataFrame([
        {"@id": "org:AcmeLabs", "@type": "foaf:Organization", "name": "Acme Labs", "prefix": "acme"},
        {"@id": "org:FictionCorp", "@type": "foaf:Organization", "name": "FictionCorp Research", "prefix": "fc"},
        {"@id": "org:MockFoundation", "@type": "foaf:Organization", "name": "Mock Science Foundation", "prefix": "msf"},
        {"@id": "org:InventedMetals", "@type": "foaf:Organization", "name": "Invented Metals Inc.", "prefix": "im"},
        {"@id": "org:SampleUniv", "@type": "foaf:Organization", "name": "Sample University", "prefix": "su"},
    ])
    org_ids = orgs["@id"].tolist()

    # ── People ──────────────────────────────────────────────────────────
    people_rows = []
    for i in range(1, 21):
        people_rows.append({
            "@id": f"pers:Researcher_{i:02d}",
            "@type": "foaf:Person",
            "name": f"Researcher_{i:02d}",
            "affiliation": rng.choice(org_ids),
        })
    people = pd.DataFrame(people_rows)
    person_ids = people["@id"].tolist()

    # ── Projects ────────────────────────────────────────────────────────
    projects = pd.DataFrame([
        {
            "@id": "proj:ProjectAlpha",
            "@type": "foaf:Project",
            "name": "Project Alpha",
            "prefix": "pa",
            "hasFundingAgency": "org:MockFoundation",
        },
        {
            "@id": "proj:ProjectBeta",
            "@type": "foaf:Project",
            "name": "Project Beta",
            "prefix": "pb",
            "hasFundingAgency": "org:MockFoundation",
        },
        {
            "@id": "proj:ProjectGamma",
            "@type": "foaf:Project",
            "name": "Project Gamma",
            "prefix": "pg",
            "hasFundingAgency": "org:FictionCorp",
        },
        {
            "@id": "proj:ProjectDelta",
            "@type": "foaf:Project",
            "name": "Project Delta",
            "prefix": "pd",
            "hasFundingAgency": "org:AcmeLabs",
        },
        {
            "@id": "proj:ProjectEpsilon",
            "@type": "foaf:Project",
            "name": "Project Epsilon",
            "prefix": "pe",
            "hasFundingAgency": "org:InventedMetals",
        },
        {
            "@id": "proj:ProjectZeta",
            "@type": "foaf:Project",
            "name": "Project Zeta",
            "prefix": "pz",
            "hasFundingAgency": "org:SampleUniv",
        },
        {
            "@id": "proj:ProjectEta",
            "@type": "foaf:Project",
            "name": "Project Eta",
            "prefix": "ph",
            "hasFundingAgency": "org:MockFoundation",
        },
        {
            "@id": "proj:ProjectTheta",
            "@type": "foaf:Project",
            "name": "Project Theta",
            "prefix": "pt",
            "hasFundingAgency": "org:FictionCorp",
        },
    ])
    project_ids = projects["@id"].tolist()

    # ── Equipment ───────────────────────────────────────────────────────
    equip_rows = [
        {
            "@id": "equip:MockTEM_01",
            "@type": "chameo:TransmissionElectronMicroscope",
            "name": "MockTEM-01",
            "identifier": "MockTEM_01",
            "location": "Acme Labs Building 7",
        },
        {
            "@id": "equip:MockTEM_02",
            "@type": "chameo:TransmissionElectronMicroscope",
            "name": "MockTEM-02",
            "identifier": "MockTEM_02",
            "location": "Sample University NanoLab",
        },
        {
            "@id": "equip:MockSEM_01",
            "@type": "chameo:ScanningElectronMicroscope",
            "name": "MockSEM-01",
            "identifier": "MockSEM_01",
            "location": "FictionCorp Imaging Suite",
        },
        {
            "@id": "equip:MockSEM_02",
            "@type": "chameo:ScanningElectronMicroscope",
            "name": "MockSEM-02",
            "identifier": "MockSEM_02",
            "location": "Acme Labs Building 3",
        },
        {
            "@id": "equip:MockFIB_01",
            "@type": "chameo:FocusedIonBeam",
            "name": "MockFIB-01",
            "identifier": "MockFIB_01",
            "location": "Sample University NanoLab",
        },
        {
            "@id": "equip:MockFIB_02",
            "@type": "chameo:FocusedIonBeam",
            "name": "MockFIB-02",
            "identifier": "MockFIB_02",
            "location": "Acme Labs Building 7",
        },
        {
            "@id": "equip:MockFurnace_01",
            "@type": "chameo:Equipment",
            "name": "MockFurnace-01",
            "identifier": "MockFurnace_01",
            "location": "Invented Metals Foundry",
        },
        {
            "@id": "equip:MockFurnace_02",
            "@type": "chameo:Equipment",
            "name": "MockFurnace-02",
            "identifier": "MockFurnace_02",
            "location": "Acme Labs Building 5",
        },
        {
            "@id": "equip:MockEPMA_01",
            "@type": "chameo:Equipment",
            "name": "MockEPMA-01",
            "identifier": "MockEPMA_01",
            "location": "FictionCorp Analytical Lab",
        },
        {
            "@id": "equip:MockXRD_01",
            "@type": "chameo:Equipment",
            "name": "MockXRD-01",
            "identifier": "MockXRD_01",
            "location": "Sample University Materials Lab",
        },
    ]
    equipments = pd.DataFrame(equip_rows)
    for row in equip_rows:
        row["contactPerson"] = rng.choice(person_ids)
    equipments = pd.DataFrame(equip_rows)
    equip_ids = equipments["@id"].tolist()

    # ── Samples ─────────────────────────────────────────────────────────
    samples_per_series = NUM_SAMPLES // len(ALLOY_SERIES)
    sample_rows: list[dict] = []
    sample_ids: list[str] = []

    for series in ALLOY_SERIES:
        for j in range(1, samples_per_series + 1):
            sid = f"mock:{series}_{j:03d}"
            creator = rng.choice(person_ids)
            sample_rows.append({
                "@id": sid,
                "@type": "chameo:Sample",
                "title": f"{series}_{j:03d}",
                "description": f"Fictional {series}-series sample #{j}.",
                "creator": creator,
                "contactPerson": rng.choice(person_ids),
            })
            sample_ids.append(sid)

    # ~30% of samples get a sub-sample (lamella)
    lamella_ids: list[str] = []
    for sid in list(sample_ids):
        if rng.random() < 0.3:
            lam_id = f"{sid}_lamella"
            sample_rows.append({
                "@id": lam_id,
                "@type": "chameo:Sample",
                "title": f"{sid.split(':')[1]}_lamella",
                "description": f"TEM lamella extracted from {sid.split(':')[1]}.",
                "creator": rng.choice(person_ids),
                "processedFrom": sid,
            })
            lamella_ids.append(lam_id)
            sample_ids.append(lam_id)

    samples = pd.DataFrame(sample_rows)

    # ── Processes & Datasets ────────────────────────────────────────────
    process_rows: list[dict] = []
    dataset_rows: list[dict] = []

    for sid in sample_ids:
        if sid.endswith("_lamella"):
            continue
        n_procs = rng.randint(1, 3)
        chosen_procs = rng.sample(PROCESS_TYPES, k=min(n_procs, len(PROCESS_TYPES)))
        for short, ptype, desc_template in chosen_procs:
            sample_label = sid.split(":")[1]
            proc_id = f"mock:{sample_label}_{short}_proc"
            ds_id = f"mock:{sample_label}_{short}"
            ds_type = DATASET_TYPE_MAP.get(ptype, "dcat:Dataset")
            operator = rng.choice(person_ids)

            # "project" added to visualize organizational metadata in the graph
            process_rows.append({
                "@id": proc_id,
                "@type": ptype,
                "name": f"{sample_label}_{short}_proc",
                "description": f"{desc_template} of {sample_label}.",
                "hasInput": sid,
                "hasOutput": ds_id,
                "hasOperator": operator,
                "performedWith": rng.choice(equip_ids),
                "project": rng.choice(project_ids),
            })
            dataset_rows.append({
                "@id": ds_id,
                "@type": ds_type,
                "title": f"{sample_label}_{short}",
                "description": f"{short} dataset for {sample_label}.",
                "keyword": short,
                "creator": operator,
                "rightsHolder": rng.choice(org_ids),
                "processedFrom": sid,
            })

    processes = pd.DataFrame(process_rows)
    datasets = pd.DataFrame(dataset_rows)

    return {
        "organisations": orgs,
        "people": people,
        "projects": projects,
        "equipments": equipments,
        "samples": samples,
        "processes": processes,
        "datasets": datasets,
    }


# ── Load or generate ────────────────────────────────────────────────────────

tables = _load_csvs(DATA_DIR)
if not tables:
    print("Generating mock CSV data ...")
    tables = _generate_default_data()
    _write_csvs(tables, DATA_DIR)
    print(f"  Written {len(TABLE_NAMES)} CSVs to {DATA_DIR}")
else:
    print(f"Loaded existing CSVs from {DATA_DIR}")

entity_list: list[dict] = []
for name in TABLE_NAMES:
    entity_list.extend(_df_to_entities(tables[name]))

print(f"  Total entities: {len(entity_list)}")

# ── Config ──────────────────────────────────────────────────────────────────

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="PhysMet Many Instances (Mock Data)",
    entity_list=entity_list,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid="physmet-many-expand",
        name="Expand processes of single researcher",
        root_node="pers:Researcher_08",
        expansion_steps=[
            ExpansionStep(
                uuid=str(uuid.uuid4()),
                name="step1",
                relations=["-hasOperator", "hasInput", "hasOutput", "-hasInput", "-hasOutput"],
                iter_limit=10,
            ),
        ],
    ),
)

# ── Launch ──────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    graph_detail_panel = OOLDGraphDetailTool(config=config)
    pn.serve(graph_detail_panel, show=True, title="PhysMet Many Instances (Mock)")
