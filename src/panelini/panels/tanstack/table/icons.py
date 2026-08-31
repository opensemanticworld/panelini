"""Build a TanstackTable ``icons`` mapping from SVG files on disk.

The panel bundles a small Material Icon Theme subset already. This is for the case
that subset does not cover: an application with its own icon set, or a file type
the bundled names do not name. The result is merged over the bundled set by
:class:`~panelini.panels.tanstack.table.table.TanstackTable`, so it can extend it
or replace an entry of it.
"""

from __future__ import annotations

from collections.abc import Mapping
from pathlib import Path


def load_icons(directory: str | Path, names: Mapping[str, str] | None = None) -> dict[str, str]:
    """Read SVG files into an icon mapping.

    Args:
        directory: Directory holding the ``.svg`` files.
        names: Optional ``{icon_name: file_stem}`` mapping. Without it every SVG
            in the directory is loaded under its own file stem. With it only the
            listed files are read, which keeps a large icon set from being sent
            to the browser wholesale.

    Returns:
        ``{icon_name: svg_markup}``, ready to pass as ``icons``.

    Raises:
        FileNotFoundError: If ``directory`` or a file named in ``names`` is missing.
    """
    root = Path(directory)
    if not root.is_dir():
        msg = f"icon directory not found: {root}"
        raise FileNotFoundError(msg)

    if names is None:
        return {path.stem: path.read_text(encoding="utf-8").strip() for path in sorted(root.glob("*.svg"))}

    icons = {}
    for name, stem in names.items():
        path = root / f"{stem}.svg"
        if not path.is_file():
            msg = f"icon file not found: {path}"
            raise FileNotFoundError(msg)
        icons[name] = path.read_text(encoding="utf-8").strip()
    return icons
