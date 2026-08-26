"""Repository structure graph: directories, files, classes, functions.

Introspects the panelini repository using the ``ast`` module and builds
an OO-LD graph with the following entity types and relations:

Entity types:
  - Directory
  - File
  - Class
  - Function

Relations:
  - Contains      (Directory -> Directory/File)
  - Defines       (File -> Class/Function, Class -> Function)
  - Calls         (Function -> Function)
  - Imports       (File -> File)
  - Inherits      (Class -> Class)

Properties:
  - lines_of_code (File, Class, Function)
  - docstring     (Class, Function)
  - num_args      (Function)
  - is_test       (File, Function)
  - decorators    (Function)
"""

import ast
import os
import uuid
from pathlib import Path

import panel as pn

from panelini.panels.oold_graph_tool.oold_graph_tool import (
    ExpansionStep,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)

pn.extension("tabulator")
pn.extension("jsoneditor")

# ── Config ───────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).resolve().parents[3]
SCAN_DIRS = ["src", "examples", "tests"]
ENTITY_IRI = "https://panelini.dev/schema/Entity"

# ── Helpers ──────────────────────────────────────────────────────────────────


def _uid() -> str:
    return str(uuid.uuid4())


def _make(name: str, type_iri: str, **kwargs) -> dict:
    uid = _uid()
    return {
        "uuid": uid,
        "id": f"https://panelini.dev/{uid}",
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
        "name": "https://schema.org/name",
        "panelini": "https://panelini.dev/",
    },
    "properties": {
        "type": {"type": "string"},
        "uuid": {"type": "string"},
        "id": {"type": "string"},
        "name": {"type": "string"},
    },
    "required": ["uuid", "name"],
}

DIRECTORY_SCHEMA = {
    "$id": "https://panelini.dev/schema/Directory",
    "title": "Directory",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "contains": {"@id": "panelini:Contains", "@type": "@id", "@container": "@set"},
            "path": {"@id": "panelini:HasPath"},
            "num_files": {"@id": "panelini:HasNumFiles"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://panelini.dev/schema/Directory"},
        "path": {"type": "string", "description": "Relative path from repo root."},
        "num_files": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Number of Python files in this directory.",
        },
        "contains": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of child directories and files.",
        },
    },
    "defaultProperties": ["type", "name", "path"],
}

FILE_SCHEMA = {
    "$id": "https://panelini.dev/schema/File",
    "title": "File",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "defines": {"@id": "panelini:Defines", "@type": "@id", "@container": "@set"},
            "imports": {"@id": "panelini:Imports", "@type": "@id", "@container": "@set"},
            "path": {"@id": "panelini:HasPath"},
            "lines_of_code": {"@id": "panelini:HasLinesOfCode"},
            "is_test": {"@id": "panelini:IsTest"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://panelini.dev/schema/File"},
        "path": {"type": "string", "description": "Relative path from repo root."},
        "lines_of_code": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Total lines in the file.",
        },
        "is_test": {
            "anyOf": [{"type": "boolean"}, {"type": "null"}],
            "default": None,
            "description": "Whether this is a test file.",
        },
        "defines": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of classes and functions defined at module level.",
        },
        "imports": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of files imported by this file.",
        },
    },
    "defaultProperties": ["type", "name", "path", "lines_of_code"],
}

CLASS_SCHEMA = {
    "$id": "https://panelini.dev/schema/Class",
    "title": "Class",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "defines": {"@id": "panelini:Defines", "@type": "@id", "@container": "@set"},
            "inherits": {"@id": "panelini:Inherits", "@type": "@id", "@container": "@set"},
            "lines_of_code": {"@id": "panelini:HasLinesOfCode"},
            "docstring": {"@id": "panelini:HasDocstring"},
            "num_methods": {"@id": "panelini:HasNumMethods"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://panelini.dev/schema/Class"},
        "lines_of_code": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Number of lines in the class body.",
        },
        "docstring": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "First line of the class docstring.",
        },
        "num_methods": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Number of methods defined in the class.",
        },
        "defines": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of methods defined in this class.",
        },
        "inherits": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of base classes.",
        },
    },
    "defaultProperties": ["type", "name", "lines_of_code"],
}

FUNCTION_SCHEMA = {
    "$id": "https://panelini.dev/schema/Function",
    "title": "Function",
    "type": "object",
    "@context": [
        ENTITY_IRI,
        {
            "calls": {"@id": "panelini:Calls", "@type": "@id", "@container": "@set"},
            "lines_of_code": {"@id": "panelini:HasLinesOfCode"},
            "docstring": {"@id": "panelini:HasDocstring"},
            "num_args": {"@id": "panelini:HasNumArgs"},
            "is_test": {"@id": "panelini:IsTest"},
            "decorators": {"@id": "panelini:HasDecorators"},
        },
    ],
    "allOf": [{"$ref": ENTITY_IRI}],
    "properties": {
        "type": {"type": "string", "default": "https://panelini.dev/schema/Function"},
        "lines_of_code": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Number of lines in the function body.",
        },
        "docstring": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "First line of the function docstring.",
        },
        "num_args": {
            "anyOf": [{"type": "integer"}, {"type": "null"}],
            "default": None,
            "description": "Number of arguments (excluding self/cls).",
        },
        "is_test": {
            "anyOf": [{"type": "boolean"}, {"type": "null"}],
            "default": None,
            "description": "Whether this is a test function.",
        },
        "decorators": {
            "anyOf": [{"type": "string"}, {"type": "null"}],
            "default": None,
            "description": "Comma-separated decorator names.",
        },
        "calls": {
            "anyOf": [{"type": "array", "items": {"type": "string"}}, {"type": "null"}],
            "default": None,
            "description": "IRIs of functions called by this function.",
        },
    },
    "defaultProperties": ["type", "name", "num_args", "lines_of_code"],
}

entity_types = {
    "Entity": ENTITY_SCHEMA,
    "Directory": DIRECTORY_SCHEMA,
    "File": FILE_SCHEMA,
    "Class": CLASS_SCHEMA,
    "Function": FUNCTION_SCHEMA,
}

# ── AST scanning ─────────────────────────────────────────────────────────────

entities: list[dict] = []
_path_to_entity: dict[str, dict] = {}
_qualname_to_entity: dict[str, dict] = {}


def _loc(node: ast.AST, source_lines: list[str]) -> int:
    """Lines of code for an AST node."""
    if hasattr(node, "end_lineno") and node.end_lineno and hasattr(node, "lineno"):
        return node.end_lineno - node.lineno + 1
    return len(source_lines)


def _first_line_docstring(node: ast.AST) -> str | None:
    doc = ast.get_docstring(node)
    if doc:
        return doc.split("\n")[0].strip()[:120]
    return None


def _decorator_names(node: ast.FunctionDef | ast.AsyncFunctionDef) -> str | None:
    names = []
    for dec in node.decorator_list:
        if isinstance(dec, ast.Name):
            names.append(dec.id)
        elif isinstance(dec, ast.Attribute):
            names.append(dec.attr)
        elif isinstance(dec, ast.Call):
            if isinstance(dec.func, ast.Name):
                names.append(dec.func.id)
            elif isinstance(dec.func, ast.Attribute):
                names.append(dec.func.attr)
    return ", ".join(names) if names else None


def _num_args(node: ast.FunctionDef | ast.AsyncFunctionDef) -> int:
    args = node.args
    total = len(args.args) + len(args.posonlyargs) + len(args.kwonlyargs)
    if args.vararg:
        total += 1
    if args.kwarg:
        total += 1
    # subtract self/cls
    if args.args and args.args[0].arg in ("self", "cls"):
        total -= 1
    return total


def _collect_calls(node: ast.AST) -> set[str]:
    """Collect unqualified function/method call names from an AST subtree."""
    calls: set[str] = set()
    for child in ast.walk(node):
        if isinstance(child, ast.Call):
            func = child.func
            if isinstance(func, ast.Name):
                calls.add(func.id)
            elif isinstance(func, ast.Attribute):
                calls.add(func.attr)
    return calls


def _scan_file(filepath: Path, rel_path: str) -> dict:
    """Parse a Python file and create entities for it, its classes, and functions."""
    source = filepath.read_text(encoding="utf-8", errors="replace")
    source_lines = source.splitlines()
    loc = len(source_lines)

    file_entity = _make(
        rel_path.replace("\\", "/"),
        "https://panelini.dev/schema/File",
        path=rel_path.replace("\\", "/"),
        lines_of_code=loc,
        is_test=os.path.basename(rel_path).startswith("test_") or "/tests/" in rel_path.replace("\\", "/"),
    )
    entities.append(file_entity)
    _path_to_entity[rel_path.replace("\\", "/")] = file_entity

    try:
        tree = ast.parse(source, filename=str(filepath))
    except SyntaxError:
        return file_entity

    file_defines: list[str] = []
    file_call_names: set[str] = set()

    # Top-level classes
    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.ClassDef):
            cls_entity = _process_class(node, rel_path, source_lines)
            file_defines.append(cls_entity["id"])

        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            func_entity = _process_function(node, rel_path, None, source_lines)
            file_defines.append(func_entity["id"])
            file_call_names.update(_collect_calls(node))

    if file_defines:
        file_entity["defines"] = file_defines

    # Imports -> resolve to file entities later
    file_entity["_raw_imports"] = _collect_imports(tree)

    return file_entity


def _process_class(node: ast.ClassDef, rel_path: str, source_lines: list[str]) -> dict:
    qualname = f"{rel_path}::{node.name}".replace("\\", "/")
    methods: list[dict] = []
    method_ids: list[str] = []

    for child in ast.iter_child_nodes(node):
        if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef)):
            m = _process_function(child, rel_path, node.name, source_lines)
            methods.append(m)
            method_ids.append(m["id"])

    cls_entity = _make(
        node.name,
        "https://panelini.dev/schema/Class",
        lines_of_code=_loc(node, source_lines),
        docstring=_first_line_docstring(node),
        num_methods=len(methods),
        defines=method_ids if method_ids else None,
    )

    # Base classes -> resolve later
    bases: list[str] = []
    for base in node.bases:
        if isinstance(base, ast.Name):
            bases.append(base.id)
        elif isinstance(base, ast.Attribute):
            bases.append(base.attr)
    cls_entity["_raw_bases"] = bases

    entities.append(cls_entity)
    _qualname_to_entity[qualname] = cls_entity
    _qualname_to_entity[node.name] = cls_entity
    return cls_entity


def _process_function(
    node: ast.FunctionDef | ast.AsyncFunctionDef,
    rel_path: str,
    class_name: str | None,
    source_lines: list[str],
) -> dict:
    if class_name:
        display_name = f"{class_name}.{node.name}"
        qualname = f"{rel_path}::{class_name}.{node.name}".replace("\\", "/")
    else:
        display_name = node.name
        qualname = f"{rel_path}::{node.name}".replace("\\", "/")

    call_names = _collect_calls(node)

    func_entity = _make(
        display_name,
        "https://panelini.dev/schema/Function",
        lines_of_code=_loc(node, source_lines),
        docstring=_first_line_docstring(node),
        num_args=_num_args(node),
        is_test=node.name.startswith("test_"),
        decorators=_decorator_names(node),
    )
    func_entity["_raw_calls"] = call_names

    entities.append(func_entity)
    _qualname_to_entity[qualname] = func_entity
    _qualname_to_entity[display_name] = func_entity
    _qualname_to_entity[node.name] = func_entity
    return func_entity


def _collect_imports(tree: ast.Module) -> list[str]:
    """Collect imported module paths (dotted names)."""
    modules: list[str] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                modules.append(alias.name)
        elif isinstance(node, ast.ImportFrom) and node.module:
            modules.append(node.module)
    return modules


def _module_to_relpath(module: str) -> str | None:
    """Try to map a dotted module to a relative file path in the repo."""
    parts = module.replace(".", "/")
    for suffix in [".py", "/__init__.py"]:
        candidate = parts + suffix
        if (REPO_ROOT / candidate).is_file():
            return candidate
    return None


# ── Scan the repo ────────────────────────────────────────────────────────────

dir_entities: dict[str, dict] = {}

for scan_dir in SCAN_DIRS:
    root_dir = REPO_ROOT / scan_dir
    if not root_dir.is_dir():
        continue

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Skip __pycache__ and hidden dirs
        dirnames[:] = [d for d in dirnames if d != "__pycache__" and not d.startswith(".")]
        rel_dir = os.path.relpath(dirpath, REPO_ROOT).replace("\\", "/")

        py_files = [f for f in filenames if f.endswith(".py")]

        dir_entity = _make(
            rel_dir,
            "https://panelini.dev/schema/Directory",
            path=rel_dir,
            num_files=len(py_files),
        )
        entities.append(dir_entity)
        dir_entities[rel_dir] = dir_entity

        for fname in py_files:
            fpath = Path(dirpath) / fname
            rel_file = os.path.relpath(fpath, REPO_ROOT).replace("\\", "/")
            _scan_file(fpath, rel_file)

# Wire up Directory.contains -> child dirs and files
for rel_dir, dir_ent in dir_entities.items():
    children: list[str] = []
    # Child directories
    for other_dir, other_ent in dir_entities.items():
        parent = os.path.dirname(other_dir)
        if parent == rel_dir:
            children.append(other_ent["id"])
    # Child files
    for file_path, file_ent in _path_to_entity.items():
        if os.path.dirname(file_path) == rel_dir:
            children.append(file_ent["id"])
    if children:
        dir_ent["contains"] = children

# ── Resolve cross-references ─────────────────────────────────────────────────

# Resolve File.imports -> File IRIs
for ent in entities:
    raw_imports = ent.pop("_raw_imports", None)
    if raw_imports:
        import_iris: list[str] = []
        for mod in raw_imports:
            rel = _module_to_relpath(mod)
            if rel and rel in _path_to_entity:
                import_iris.append(_path_to_entity[rel]["id"])
        if import_iris:
            ent["imports"] = import_iris

# Resolve Class.inherits -> Class IRIs
for ent in entities:
    raw_bases = ent.pop("_raw_bases", None)
    if raw_bases:
        base_iris: list[str] = []
        for base_name in raw_bases:
            if base_name in _qualname_to_entity:
                base_iris.append(_qualname_to_entity[base_name]["id"])
        if base_iris:
            ent["inherits"] = base_iris

# Resolve Function.calls -> Function IRIs
for ent in entities:
    raw_calls = ent.pop("_raw_calls", None)
    if raw_calls:
        call_iris: list[str] = []
        seen: set[str] = set()
        for call_name in raw_calls:
            if call_name in _qualname_to_entity:
                target_id = _qualname_to_entity[call_name]["id"]
                if target_id != ent["id"] and target_id not in seen:
                    call_iris.append(target_id)
                    seen.add(target_id)
        if call_iris:
            ent["calls"] = call_iris

# ── Pick a root: the src/panelini directory ──────────────────────────────────

root_entity = dir_entities.get("src/panelini", dir_entities.get("src", entities[0]))

# ── Build config and tool ────────────────────────────────────────────────────

config = OOLDGraphConfig(
    uuid=str(uuid.uuid4()),
    name="panelini Repository Graph",
    entity_list=entities,
    entity_types=entity_types,
    expansion_policy=SingleNodeExpansionPolicy(
        uuid=str(uuid.uuid4()),
        name="Expand from src/panelini",
        root_node=root_entity,
        expansion_steps=[
            ExpansionStep(
                uuid=str(uuid.uuid4()),
                name="contents",
                relations=["Contains"],
                iter_limit=1,
            ),
        ],
    ),
)

graph_detail_panel = OOLDGraphDetailTool(config=config)

if __name__ == "__main__":
    pn.serve(graph_detail_panel, threaded=True)
