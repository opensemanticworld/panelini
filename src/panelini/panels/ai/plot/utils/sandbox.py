"""Sandbox file-transfer helpers for ``llm_sandbox`` plotting.

Ported from ``migration/agent.py`` (PlotToolPanel) with one refinement:
``resolve_file_path`` takes ``download_dir`` / ``data_dir`` as explicit args
so this module does not import ``osw.express`` at load time. This keeps the
helpers usable in test environments that lack the ``osw`` package.

MICRESS / micpy convention: when a geometry file (``.geof``/``.geof1``) is
copied alongside a binary result file (``.conc1``, ``.phas``, etc.), the
geometry file is renamed to share the binary's stem with a ``.geoF``
extension so that ``micpy`` auto-pairs them in the sandbox.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

MICRESS_BIN_EXTS: frozenset[str] = frozenset({
    ".conc1",
    ".conc2",
    ".concc",
    ".phas",
    ".temp",
    ".vel",
})

MICRESS_GEO_EXTS: frozenset[str] = frozenset({".geof", ".geof1"})


def resolve_file_path(file_path: str, download_dir: Path, data_dir: Path) -> str:
    """Resolve a file path that may be just a filename.

    Order of lookup:

    1. If ``file_path`` is absolute and exists, return it as-is.
    2. Look for the basename in ``download_dir``.
    3. Look for the basename in ``data_dir``.
    4. Fall back to the original string unchanged.
    """
    p = Path(file_path)
    if p.is_absolute() and p.exists():
        return str(p)
    candidate = download_dir / p.name
    if candidate.exists():
        return str(candidate)
    candidate = data_dir / p.name
    if candidate.exists():
        return str(candidate)
    return file_path


def copy_files_to_sandbox(
    session: Any,
    file_paths: list[str],
    download_dir: Path,
    data_dir: Path,
) -> list[str]:
    """Copy files into the sandbox, pairing MICRESS geometry files with binary results.

    Returns the list of basenames that are now available at
    ``/sandbox/<filename>`` inside the sandbox.
    """
    resolved = [resolve_file_path(fp, download_dir=download_dir, data_dir=data_dir) for fp in file_paths]

    bin_stem: str | None = None
    geo_src: str | None = None
    non_geo: list[str] = []

    for rp in resolved:
        suffix = Path(rp).suffix.lower()
        if suffix in MICRESS_GEO_EXTS:
            geo_src = rp
        else:
            if suffix in MICRESS_BIN_EXTS:
                bin_stem = Path(rp).stem
            non_geo.append(rp)

    filenames: list[str] = []
    for rp in non_geo:
        name = Path(rp).name
        session.copy_to_runtime(src=rp, dest="/sandbox/" + name)
        filenames.append(name)

    if geo_src is not None:
        geo_name = bin_stem + ".geoF" if bin_stem is not None else Path(geo_src).name
        session.copy_to_runtime(src=geo_src, dest="/sandbox/" + geo_name)
        filenames.append(geo_name)

    return filenames
