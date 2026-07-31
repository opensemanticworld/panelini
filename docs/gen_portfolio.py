"""Generate the docs Pyodide portfolio: thumbnails, cards page, and Pyodide apps.

What it does:
- Discovers the example panels (excludes ``plot_by_code`` and, for now, the ``ai``
  category - see the browser-native AI panel step).
- Emits a placeholder thumbnail per panel and writes ``docs/portfolio/index.md`` as a
  ``sphinx_design`` card grid grouped by category.
- With ``--convert``, builds a standalone **Pyodide app** per panel via ``panel
  convert`` (each app inlines the example source, so it is fully self-contained), and
  links each card to its app.

Building & testing locally:

    # Serve the docs with the live apps. The dependent ``portfolio`` target builds the
    # Pyodide apps first; conversion is incremental, so the first run is slow (~10 MB
    # per app, gitignored build artifacts) and later runs only rebuild changed examples.
    make docs                     # builds apps, then sphinx-autobuild on :8000

    # Then open the "Portfolio" page and click a card - the example runs in your
    # browser via Pyodide (first load downloads packages, so give it a few seconds).

    # Strict build with the apps (reproduces the release/CI docs build):
    make docs-test

    # Force a full rebuild of every app (e.g. after changing non-Python assets):
    make portfolio-force          # == python docs/gen_portfolio.py --convert --force

Change detection: each built app embeds a signature over its example source, the
wrapper template, the wheel name, and panelini's Python sources; ``convert_panel``
skips an app whose signature is unchanged, so editing one example rebuilds only that
app. Non-Python assets are not tracked - use ``--force`` / ``make portfolio-force``.

The plain page + thumbnails are regenerated automatically on every Sphinx build (via
a ``config-inited`` hook in conf.py), so ``docs/portfolio/index.md`` and
``docs/_static/portfolio/`` are build artifacts and gitignored.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

_DOCS = Path(__file__).resolve().parent
_REPO = _DOCS.parent
_PANELS_DIR = _REPO / "examples" / "panels"
_THUMB_DIR = _DOCS / "_static" / "portfolio" / "thumbs"
# Converted Pyodide apps + the local panelini wheel live under _static so Sphinx
# copies them verbatim.
_APPS_DIR = _DOCS / "_static" / "portfolio" / "apps"
_WHEELS_DIR = _DOCS / "_static" / "portfolio" / "wheels"
_PAGE = _DOCS / "portfolio" / "index.md"

# Extra packages installed in the browser (via micropip) that some examples need
# beyond panel/param (which the base environment provides). panelini itself is
# installed from the locally-built wheel inside the wrapper.
_REQUIREMENTS = ["numpy", "pydantic"]

# Self-contained wrapper: inline the example source, run it with serve/servable
# intercepted to capture the intended renderable, then servable that. Executing into
# the module globals keeps ``__name__ == "__main__"`` and correct class ``__module__``
# so pydantic/LangChain forward references resolve.
_WRAPPER_TEMPLATE = """\
# AUTO-GENERATED for the Pyodide portfolio - do not edit.
# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose
# unused ``watchfiles`` dependency was stripped so micropip can resolve it).
import base64
import os
import types
import panel as pn
from panelini import Panelini

# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*
# render too (panel convert snapshots on the host, where xterm.js would otherwise be
# embedded and then throw in the browser before the worker hydrates).
os.environ.setdefault("PANELINI_TERMINAL_MODE", "console")
pn.extension("tabulator", "jsoneditor", "plotly")

# In WASM, panel.io exposes only ``serve`` (from panel.io.pyodide); the tornado-backed
# ``panel.io.server`` submodule is never imported. Provide a patchable stand-in so the
# interceptors below - and any inlined ``pn.io.server.serve(...)`` example calls -
# resolve instead of raising ``AttributeError``.
if not hasattr(pn.io, "server"):
    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))

__pf_orig = {{
    "pn_serve": getattr(pn, "serve", None),
    "io_serve": getattr(pn.io.server, "serve", None),
    "viewable": pn.viewable.Viewable.servable,
    "panelini": Panelini.servable,
}}
__pf_captured = []


class __PfStop(Exception):
    pass


def __pf_rec_self(self, *a, **k):
    __pf_captured.append(self)
    raise __PfStop


def __pf_rec_serve(panels, *a, **k):
    __pf_captured.append(panels)
    raise __PfStop


Panelini.servable = __pf_rec_self
pn.viewable.Viewable.servable = __pf_rec_self
pn.serve = __pf_rec_serve
pn.io.server.serve = __pf_rec_serve

__pf_src = base64.b64decode("{b64}").decode("utf-8")
try:
    exec(compile(__pf_src, "{name}", "exec"), globals())
except __PfStop:
    pass
except Exception:
    import traceback
    traceback.print_exc()

Panelini.servable = __pf_orig["panelini"]
pn.viewable.Viewable.servable = __pf_orig["viewable"]
if __pf_orig["pn_serve"] is not None:
    pn.serve = __pf_orig["pn_serve"]
if __pf_orig["io_serve"] is not None:
    pn.io.server.serve = __pf_orig["io_serve"]


def __pf_flat(items):
    out = []
    for it in items:
        if isinstance(it, dict):
            out.extend(it.values())
        elif isinstance(it, (list, tuple)):
            out.extend(it)
        else:
            out.append(it)
    return out


def __pf_is_view(o):
    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing
    # ``__panel__`` (e.g. a plain class like GraphDetailTool that defines __panel__).
    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")


__pf_view = None
for __pf_it in __pf_flat(__pf_captured):
    if isinstance(__pf_it, Panelini):
        __pf_view = __pf_it
        break
if __pf_view is None:
    for __pf_it in __pf_flat(__pf_captured):
        if __pf_is_view(__pf_it):
            __pf_view = __pf_it
            break
if __pf_view is None and __pf_is_view(globals().get("app")):
    __pf_view = globals().get("app")

if isinstance(__pf_view, Panelini):
    __pf_orig["panelini"](__pf_view)
elif __pf_view is not None:
    # pn.panel() turns Viewables, Viewers, and ``__panel__`` objects into a servable.
    pn.panel(__pf_view).servable()
else:
    pn.pane.Markdown("# Could not render this example").servable()
"""

# Panels excluded from the Pyodide portfolio (server/sandbox-backed, can't run in WASM).
_EXCLUDE_STEMS = {"plot_by_code"}
# Categories handled in a later step (the browser-native AI panel replaces this stack).
_EXCLUDE_CATEGORIES = {"ai"}

# Per-category accent colour (background gradient base) + short human label.
_CATEGORY_META: dict[str, tuple[tuple[int, int, int], str]] = {
    "ai": ((124, 58, 237), "AI"),
    "jsoneditor": ((13, 148, 136), "JSON Editor"),
    "visnetwork": ((37, 99, 235), "VisNetwork"),
    "wunderbaum": ((217, 119, 6), "Wunderbaum"),
}

_THUMB_SIZE = (480, 270)  # 16:9 preview


def discover() -> dict[str, list[Path]]:
    """Discover example panels grouped by category, applying exclusions."""
    grouped: dict[str, list[Path]] = {}
    for path in sorted(_PANELS_DIR.glob("**/*.py")):
        if path.name == "__init__.py" or path.name.startswith("_"):
            continue
        if path.stem in _EXCLUDE_STEMS:
            continue
        category = path.relative_to(_PANELS_DIR).parts[0]
        if category in _EXCLUDE_CATEGORIES:
            continue
        grouped.setdefault(category, []).append(path)
    return grouped


def _title(stem: str) -> str:
    """Human-friendly title from a file stem (``visnetwork_panel_min`` -> ...)."""
    return stem.replace("_", " ").strip().title()


def _font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.load_default(size=size)


def _make_thumbnail(path: Path, category: str) -> Path:
    """Render a meaningful placeholder thumbnail PNG for one panel."""
    color, label = _CATEGORY_META.get(category, ((71, 85, 105), category.title()))
    w, h = _THUMB_SIZE
    img = Image.new("RGB", (w, h), color)
    draw = ImageDraw.Draw(img)

    # Subtle darker band at the bottom + lighter top via a simple vertical gradient.
    top = tuple(min(255, c + 38) for c in color)
    for y in range(h):
        t = y / h
        row = tuple(int(top[i] * (1 - t) + color[i] * t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=row)

    # Category chip (top-left).
    chip_font = _font(22)
    draw.text((24, 22), label.upper(), font=chip_font, fill=(255, 255, 255))

    # Panel title (wrapped, centred-ish, lower area).
    title = _title(path.stem)
    title_font = _font(34)
    words, lines, line = title.split(), [], ""
    for wd in words:
        trial = f"{line} {wd}".strip()
        if draw.textlength(trial, font=title_font) <= w - 48:
            line = trial
        else:
            lines.append(line)
            line = wd
    if line:
        lines.append(line)
    y = h - 28 - len(lines) * 40
    for ln in lines:
        draw.text((24, y), ln, font=title_font, fill=(255, 255, 255))
        y += 40

    _THUMB_DIR.mkdir(parents=True, exist_ok=True)
    out = _THUMB_DIR / f"{category}__{path.stem}.png"
    img.save(out)
    return out


def _app_html(path: Path, category: str) -> Path:
    """Path to the converted Pyodide app HTML for a panel (may not exist yet)."""
    return _APPS_DIR / category / f"{path.stem}.html"


def _app_url_from_index(path: Path, category: str) -> str:
    """URL to the standalone app HTML, relative to ``docs/portfolio/index.md``.

    Used in a raw ``<a>`` (so the link opens in a new tab instead of being treated as a
    downloadable file). Raw-HTML hrefs are not rewritten by Sphinx, so this must be a
    path relative to the rendered page, not root-relative.
    """
    return f"../_static/portfolio/apps/{category}/{path.stem}.html"


def _wheel_signature() -> str:
    """Signature of the inputs that change the built wheel: panelini's Python sources
    and ``pyproject.toml`` (version, dependencies, build config). Non-Python package
    assets are not tracked - use a force rebuild after changing those.
    """
    h = hashlib.sha256()
    h.update(_panelini_signature().encode("utf-8"))
    h.update((_REPO / "pyproject.toml").read_bytes())
    return h.hexdigest()[:16]


def build_wheel(force: bool = False) -> str:
    """Build the local panelini wheel into the docs static tree; return its filename.

    Uses ``uv build --wheel`` so only the dev panelini code is packaged (its deps are
    resolved separately in the browser). The build is skipped when an existing wheel
    already matches the current source signature (see ``_wheel_signature``); ``force``
    rebuilds regardless.
    """
    _WHEELS_DIR.mkdir(parents=True, exist_ok=True)
    sig = _wheel_signature()
    sig_file = _WHEELS_DIR / ".wheel-sig"
    existing = sorted(_WHEELS_DIR.glob("panelini-*.whl"))
    # The sig file is written only after a successful build + metadata strip, so its
    # presence guarantees the single existing wheel is current and already stripped.
    if not force and len(existing) == 1 and sig_file.exists() and sig_file.read_text().strip() == sig:
        print(f"Local panelini wheel unchanged ({existing[0].name}); skipping build.")
        return existing[0].name
    for old in existing:
        old.unlink()
    print("Building local panelini wheel...")
    # uv-managed env (no pip); ``uv build`` produces a wheel from the project.
    subprocess.run(
        ["uv", "build", "--wheel", "--out-dir", str(_WHEELS_DIR)],
        cwd=str(_REPO),
        check=True,
        capture_output=True,
        text=True,
    )
    wheel = next(_WHEELS_DIR.glob("panelini-*.whl"))
    _strip_metadata_dep(wheel, "watchfiles")
    sig_file.write_text(sig, encoding="utf-8")
    return wheel.name


def _strip_metadata_dep(wheel: Path, dist: str) -> None:
    """Remove ``Requires-Dist: <dist>`` lines from a wheel's METADATA.

    ``watchfiles`` has no Pyodide wheel and is unused at runtime, so dropping it lets
    micropip resolve panelini's remaining (compatible) dependencies in the browser.
    """
    import zipfile

    tmp = wheel.with_suffix(".whl.tmp")
    with zipfile.ZipFile(wheel) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename.endswith(".dist-info/METADATA"):
                lines = data.decode("utf-8").splitlines(keepends=True)
                data = "".join(ln for ln in lines if not ln.lower().startswith(f"requires-dist: {dist}")).encode(
                    "utf-8"
                )
            zout.writestr(item, data)
    tmp.replace(wheel)


def _panelini_signature() -> str:
    """Short hash of panelini's own Python sources.

    Folded into each app's build signature so editing the library (not just an example)
    invalidates the cached apps. Deterministic - hashes sorted relative paths + bytes,
    not mtimes. Non-Python assets (vue/js) are not covered; use a force rebuild for those.
    """
    src = _REPO / "src" / "panelini"
    h = hashlib.sha256()
    for py in sorted(src.glob("**/*.py")):
        h.update(py.relative_to(src).as_posix().encode("utf-8"))
        h.update(py.read_bytes())
    return h.hexdigest()[:16]


def convert_panel(path: Path, category: str, wheel_name: str, panelini_sig: str = "", force: bool = False) -> bool:
    """Generate a wrapper for one panel and ``panel convert`` it to a Pyodide app.

    Returns True on success. The wrapper inlines the example source so the converted
    HTML is fully self-contained (Pyodide has no access to the repo files).

    A build signature (over the example source, wrapper template, wheel name, and
    panelini sources) is embedded as a comment in the wrapper - and so ends up in the
    generated worker ``.js``. When an app already carries the current signature it is
    skipped, so an unchanged example is not re-converted; editing the example (or the
    library) changes the signature and that one app rebuilds. ``force`` rebuilds anyway.
    """
    out_dir = _APPS_DIR / category
    out_dir.mkdir(parents=True, exist_ok=True)
    b64 = base64.b64encode(path.read_text(encoding="utf-8").encode("utf-8")).decode("ascii")
    body = _WRAPPER_TEMPLATE.format(b64=b64, name=path.name)
    sig = hashlib.sha256(f"{body}{wheel_name}{panelini_sig}".encode()).hexdigest()[:16]
    sig_marker = f"portfolio-sig: {sig}"
    wrapper = f"# {sig_marker}\n{body}"

    worker_js = out_dir / f"{path.stem}.js"
    if (
        not force
        and _app_html(path, category).exists()
        and worker_js.exists()
        and sig_marker in worker_js.read_text(encoding="utf-8")
    ):
        print(f"  • {category}/{path.stem}.html (unchanged, skipped)")
        return True

    # The app worker lives at apps/<category>/<stem>.js; the wheel at portfolio/wheels/,
    # so a relative URL gets micropip to fetch it regardless of the docs base path.
    wheel_url = f"../../wheels/{wheel_name}"
    with tempfile.TemporaryDirectory() as tmp:
        wrapper_path = Path(tmp) / f"{path.stem}.py"
        wrapper_path.write_text(wrapper, encoding="utf-8")
        cmd = [
            "panel",
            "convert",
            str(wrapper_path),
            "--to",
            "pyodide-worker",
            "--out",
            str(out_dir),
            "--requirements",
            wheel_url,
            *_REQUIREMENTS,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ✗ {category}/{path.name}\n{result.stderr.strip()[:300]}")
        return False

    # The worker installs each env_spec entry with ``micropip.install('${pkg}')``.
    # micropip can't resolve a relative wheel URL, so rewrite the call to resolve
    # relative entries (the local wheel) to an absolute URL against the worker location.
    worker_js = out_dir / f"{path.stem}.js"
    js = worker_js.read_text(encoding="utf-8")
    js = js.replace(
        "micropip.install('${pkg}')",
        "micropip.install('${pkg.startsWith('.') ? new URL(pkg, self.location.href).href : pkg}')",
    )
    worker_js.write_text(js, encoding="utf-8")

    print(f"  ✓ {category}/{path.stem}.html")
    return True


def convert_all(force: bool = False) -> None:
    """Build the wheel and convert every included panel to a standalone Pyodide app.

    Unchanged apps are skipped (see ``convert_panel``); ``force`` rebuilds all of them.
    """
    wheel_name = build_wheel(force=force)
    panelini_sig = _panelini_signature()
    print("Converting panels to Pyodide apps (panel convert)...")
    for category, paths in sorted(discover().items()):
        for path in paths:
            convert_panel(path, category, wheel_name, panelini_sig=panelini_sig, force=force)


def _embed_page(path: Path, category: str) -> Path:
    """Path to the per-example docs page that embeds the app (may not exist yet)."""
    return _PAGE.parent / category / f"{path.stem}.md"


def _write_embed_page(path: Path, category: str) -> None:
    """Write a docs page that embeds the converted app in an iframe (stays in-docs)."""
    title = _title(path.stem)
    # From docs/portfolio/<category>/<stem>.html to docs/_static/portfolio/apps/...
    app_rel = f"../../_static/portfolio/apps/{category}/{path.stem}.html"
    # In the browser the terminal panel cannot use xterm.js, so it renders an on-screen
    # console mirror and also tees output to the browser developer console - call that out
    # so developers know where to look.
    note = ""
    if category == "terminalmirror":
        note = (
            "```{note}\n"
            "In the browser this example mirrors its output to the **developer console** "
            "(open your browser's DevTools → Console) as well as the on-screen panel, so "
            "developers can see what's happening.\n"
            "```\n\n"
        )
    page = (
        f"# {title}\n\n"
        f"`{category}/{path.name}` - runs entirely in your browser via Pyodide. "
        "The first load downloads packages, so give it a few seconds.\n\n"
        f"{note}"
        "```{raw} html\n"
        f'<p><a class="pf-fullscreen" href="{app_rel}" target="_blank" '
        'rel="noopener">Open fullscreen ↗</a></p>\n'
        f'<iframe src="{app_rel}" title="{title}" loading="lazy" '
        'style="width:100%;height:80vh;border:1px solid var(--color-background-border);'
        'border-radius:8px;"></iframe>\n'
        "```\n\n"
        "{doc}`Back to the portfolio </portfolio/index>`\n"
    )
    target = _embed_page(path, category)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page, encoding="utf-8")


def _card(path: Path, category: str) -> str:
    """Emit one sphinx_design grid-item-card for a panel.

    Links to the in-docs embed page when the app exists; otherwise renders without a
    link (so the page is valid before/without conversion).
    """
    thumb = f"/_static/portfolio/thumbs/{category}__{path.stem}.png"
    link = ""
    footer = ""
    if _app_html(path, category).exists():
        # Doc reference relative to docs/portfolio/index.md.
        link = f":link: {category}/{path.stem}\n:link-type: doc\n"
        # Footer action that opens the standalone app in a new tab (sits above the
        # stretched card link via z-index - see custom.css). A raw <a> avoids MyST
        # turning a local .html link into a download reference.
        app_url = _app_url_from_index(path, category)
        footer = (
            f'+++\n<a class="pf-fullscreen" href="{app_url}" target="_blank" rel="noopener">Open fullscreen ↗</a>\n'
        )
    return (
        f":::{{grid-item-card}} {_title(path.stem)}\n:img-top: {thumb}\n{link}\n`{category}/{path.name}`\n{footer}:::\n"
    )


def generate() -> None:
    """Generate thumbnails for every included panel and write the portfolio page."""
    grouped = discover()
    total = 0
    sections: list[str] = []
    toctree_entries: list[str] = []
    for category in sorted(grouped):
        paths = grouped[category]
        _, label = _CATEGORY_META.get(category, ((0, 0, 0), category.title()))
        cards = []
        for path in paths:
            _make_thumbnail(path, category)
            cards.append(_card(path, category))
            total += 1
            # Embed page (+ toctree entry) only when the converted app exists.
            if _app_html(path, category).exists():
                _write_embed_page(path, category)
                toctree_entries.append(f"{category}/{path.stem}")
        sections.append(f"## {label}\n\n::::{{grid}} 1 2 2 3\n:gutter: 3\n\n" + "\n".join(cards) + "\n::::\n")

    # Hidden toctree so the embed pages are not orphaned (would fail under -W).
    toctree = ""
    if toctree_entries:
        toctree = "\n```{toctree}\n:hidden:\n\n" + "\n".join(sorted(toctree_entries)) + "\n```\n"

    page = (
        "# Portfolio\n\n"
        "Interactive examples that run entirely in your browser via Pyodide - no server "
        "required. Click a card to open the live example, embedded right here in the docs.\n\n"
        "```{note}\n"
        "Thumbnails are placeholders for now and will be replaced with real screenshots.\n"
        "```\n\n" + "\n".join(sections) + toctree
    )
    _PAGE.parent.mkdir(parents=True, exist_ok=True)
    _PAGE.write_text(page, encoding="utf-8")
    print(f"Generated {total} thumbnails and {_PAGE.relative_to(_REPO)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate the docs Pyodide portfolio.")
    parser.add_argument(
        "--convert",
        action="store_true",
        help="Also run `panel convert` to build the Pyodide apps (slower). Unchanged apps are skipped.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="With --convert, rebuild every app even if its source is unchanged.",
    )
    args = parser.parse_args()
    if args.convert:
        convert_all(force=args.force)
    generate()
