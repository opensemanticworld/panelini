"""Unit tests for the TanstackTable icon helpers.

The contract worth guarding here is the one that crosses the language boundary:
``icon_for`` returns a name, and that name only draws anything if the Vue side
bundles it. Nothing else ties the two lists together, so the last test reads the
component's imports and compares.
"""

import re
from pathlib import Path

import pytest

from panelini.panels.tanstack.table import extension_of, icon_for, icons, load_icons

COMPONENT = Path(icons.__file__).parent / "vue" / "src" / "TanstackTable.vue"
DEFAULT_FILE_ICON = icons.DEFAULT_FILE_ICON


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("notes.md", "markdown"),
        ("budget.csv", "table"),
        ("budget.xlsx", "table"),
        ("minutes.docx", "word"),
        ("deck.pptx", "powerpoint"),
        ("release.zip", "zip"),
        ("theme.css", "css"),
        ("main.ts", "typescript"),
        ("dump.sql", "database"),
        ("build.sh", "console"),
    ],
)
def test_icon_for_names_a_glyph_per_family(name, expected):
    """One glyph serves many extensions, so the map is many to one by design."""
    assert icon_for(name) == expected


def test_icon_for_ignores_case_and_directories():
    assert icon_for("Reports/2026/Q1.CSV") == "table"


@pytest.mark.parametrize("name", ["inbox.bak", "README", "archive.tar.unknown", ".", ""])
def test_icon_for_falls_back_rather_than_returning_nothing(name):
    """A generic sheet of paper keeps a column of file names aligned."""
    assert icon_for(name) == DEFAULT_FILE_ICON


def test_icon_for_takes_a_custom_default():
    assert icon_for("inbox.bak", default="document") == "document"


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("notes.md", "md"),
        ("notes.MD", "md"),
        ("archive.tar.gz", "gz"),
        ("Reports/2026/Q1.csv", "csv"),
        ("README", ""),
        ("", ""),
        (".hidden", "hidden"),
    ],
)
def test_extension_of_reads_the_last_dot(name, expected):
    """Lowercased, so a rename that only changes case is not a change of type."""
    assert extension_of(name) == expected


def test_extra_extends_and_overrides_the_map():
    extra = {"bak": "document", "csv": "document"}
    assert icon_for("inbox.bak", extra) == "document"
    assert icon_for("budget.csv", extra) == "document"
    # Merged rather than mutated, so the next call is unaffected.
    assert icon_for("budget.csv") == "table"


@pytest.fixture
def icon_dir(tmp_path):
    """A directory of SVGs, one of them padded with the whitespace a file ends on."""
    (tmp_path / "gauge.svg").write_text("<svg>gauge</svg>\n", encoding="utf-8")
    (tmp_path / "valve.svg").write_text("  <svg>valve</svg>  \n", encoding="utf-8")
    (tmp_path / "notes.txt").write_text("not an icon", encoding="utf-8")
    return tmp_path


def test_load_icons_reads_the_whole_directory_under_the_file_stems(icon_dir):
    """Without ``names`` the stems are the icon names, and only SVGs are read."""
    assert load_icons(icon_dir) == {"gauge": "<svg>gauge</svg>", "valve": "<svg>valve</svg>"}


def test_load_icons_takes_only_what_is_named_and_renames_it(icon_dir):
    """``names`` is what keeps a large icon set from crossing the wire wholesale."""
    assert load_icons(icon_dir, {"sensor": "gauge"}) == {"sensor": "<svg>gauge</svg>"}


def test_load_icons_accepts_a_string_path(icon_dir):
    assert load_icons(str(icon_dir), {"sensor": "gauge"}) == {"sensor": "<svg>gauge</svg>"}


def test_load_icons_says_which_directory_is_missing(tmp_path):
    with pytest.raises(FileNotFoundError, match="icon directory not found"):
        load_icons(tmp_path / "nowhere")


def test_load_icons_says_which_named_file_is_missing(icon_dir):
    """A named file that is not there is an error, not a silently absent icon."""
    with pytest.raises(FileNotFoundError, match="pump.svg"):
        load_icons(icon_dir, {"gauge": "gauge", "pump": "pump"})


def test_every_mapped_name_is_bundled_by_the_component():
    """A name the browser does not bundle renders as no icon at all."""
    source = COMPONENT.read_text(encoding="utf-8")
    bundled = set(re.findall(r"material-icon-theme/icons/([\w-]+)\.svg", source))
    assert bundled, "no icon imports found; has the import style changed?"
    assert set(icons.FILE_ICONS.values()) | {DEFAULT_FILE_ICON} <= bundled
