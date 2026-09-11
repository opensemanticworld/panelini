"""Icon helpers for TanstackTable.

:func:`icon_for` names one of the bundled Material Icon Theme icons for a file
name. :func:`load_icons` is for what the bundled subset does not cover: an
application with its own icon set, or a file type the bundled names do not name.
Its result is merged over the bundled set by
:class:`~panelini.panels.tanstack.table.table.TanstackTable`, so it can extend it
or replace an entry of it.

Neither is applied by the panel. A node opts into an icon by naming one, and
nothing is inferred from its shape, so a tree of things that are not files renders
exactly as it did before. What the panel does do is *keep* an icon it recognises in
step with the name: renaming ``notes.md`` to ``notes.py`` moves the icon with it,
while an icon an application picked by hand is left where it was put.
"""

from __future__ import annotations

from collections.abc import Mapping
from pathlib import Path

# Extension to bundled icon name. Icons are named for what they show rather than
# for one extension, so a single glyph serves a family: every spreadsheet is
# ``table``, every archive is ``zip``. Extend it by passing your own mapping to
# :func:`icon_for`, or replace a glyph outright through ``load_icons``.
FILE_ICONS: dict[str, str] = {
    "bash": "console",
    "c": "console",
    "cfg": "document",
    "css": "css",
    "csv": "table",
    "db": "database",
    "doc": "word",
    "docx": "word",
    "flac": "audio",
    "gif": "image",
    "gz": "zip",
    "htm": "html",
    "html": "html",
    "ini": "document",
    "jpeg": "image",
    "jpg": "image",
    "js": "javascript",
    "json": "json",
    "log": "document",
    "md": "markdown",
    "mjs": "javascript",
    "mov": "video",
    "mp3": "audio",
    "mp4": "video",
    "ods": "table",
    "odt": "word",
    "ogg": "audio",
    "pdf": "pdf",
    "png": "image",
    "ppt": "powerpoint",
    "pptx": "powerpoint",
    "py": "python",
    "rst": "document",
    "sh": "console",
    "sql": "database",
    "sqlite": "database",
    "svg": "image",
    "tar": "zip",
    "toml": "document",
    "ts": "typescript",
    "tsv": "table",
    "tsx": "typescript",
    "txt": "document",
    "wav": "audio",
    "webm": "video",
    "webp": "image",
    "xls": "table",
    "xlsx": "table",
    "xml": "xml",
    "yaml": "yaml",
    "yml": "yaml",
    "zip": "zip",
}

# What an unrecognised extension gets. A generic sheet of paper rather than no
# icon at all, so a column of file names stays aligned.
DEFAULT_FILE_ICON = "file"


def extension_of(name: str) -> str:
    """Return the lowercased extension of a file name, empty when it has none.

    Only the part after the last dot is read, and case is dropped, so ``notes.MD``
    and ``notes.md`` are one type. A name with no dot has no extension at all,
    which is itself a difference from one that has: renaming ``notes.md`` to
    ``notes`` takes its type away.
    """
    _, dot, suffix = name.rpartition(".")
    return suffix.lower() if dot else ""


def icon_for(name: str, extra: Mapping[str, str] | None = None, default: str = DEFAULT_FILE_ICON) -> str:
    """Return the bundled icon name for a file name.

    Args:
        name: File name or path. Only the part after the last dot is read, so
            ``notes.md`` and ``/tmp/notes.MD`` both give ``markdown``.
        extra: Optional ``{extension: icon_name}`` merged over :data:`FILE_ICONS`,
            for extensions an application knows about and the panel does not.
        default: Icon name for an unrecognised or absent extension.

    Returns:
        An icon name to put on a node, not the SVG markup itself.
    """
    suffix = extension_of(name)
    if not suffix:
        return default
    return {**FILE_ICONS, **(extra or {})}.get(suffix, default)


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
