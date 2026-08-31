"""Build the live Pyodide apps that the docs pages embed.

Discovers the example panels (minus ``_EXCLUDE_STEMS``) and runs ``panel convert`` on
each, producing a standalone app under ``docs/_static/portfolio/apps/<category>/``.
The panel pages iframe those apps as their "Run live" demos.

Building & testing locally:

    # Serve the docs with the live apps. The dependent ``portfolio`` target builds the
    # Pyodide apps first; conversion is incremental, so the first run is slow (~10 MB
    # per app, gitignored build artifacts) and later runs only rebuild changed examples.
    make docs                     # builds apps, then sphinx-autobuild on :8000

    # Strict build with the apps (reproduces the release/CI docs build):
    make docs-test

    # Force a full rebuild of every app (e.g. after changing non-Python assets):
    make portfolio-force          # == python docs/gen_portfolio.py --convert --force

Change detection: each built app embeds a signature over its example source, the
wrapper template, the wheel name, and panelini's Python sources; ``convert_panel``
skips an app whose signature is unchanged, so editing one example rebuilds only that
app. Non-Python assets are not tracked - use ``--force`` / ``make portfolio-force``.

Everything under ``docs/_static/portfolio/`` is a build artifact and gitignored.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import re
import subprocess
import tempfile
from pathlib import Path

_DOCS = Path(__file__).resolve().parent
_REPO = _DOCS.parent
_PANELS_DIR = _REPO / "examples" / "panels"
# Multi-component highlights. They live outside ``examples/panels`` but are converted
# too, under a ``usecases`` category that matches their docs media area.
_USECASES_DIR = _REPO / "examples" / "usecases"
# Converted Pyodide apps + the local panelini wheel live under _static so Sphinx
# copies them verbatim.
_APPS_DIR = _DOCS / "_static" / "portfolio" / "apps"
_WHEELS_DIR = _DOCS / "_static" / "portfolio" / "wheels"

# Extra packages installed in the browser (via micropip) that some examples need
# beyond panel/param (which the base environment provides). panelini itself is
# installed from the locally-built wheel inside the wrapper.
_REQUIREMENTS = ["numpy", "pydantic"]

# Extra packages a single category needs. The AI examples call ``load_dotenv()`` at
# import time; python-dotenv is pure Python, so micropip can install it (unlike
# LangChain itself, which is replaced by the stand-ins in the wrapper).
_CATEGORY_REQUIREMENTS: dict[str, list[str]] = {"ai": ["python-dotenv"]}

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

# The AI examples import LangChain and talk to a provider. LangChain cannot be
# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native
# extensions with no pure-Python wheel), and provider credentials must never ship in a
# public page. Registering the stand-ins here - before the example source is executed
# below - makes the example's own ``import langchain...`` lines resolve to them, so the
# example file itself stays untouched and still uses the real stack everywhere else.
# Replies are canned; the pages say so.
if {ai_stub}:
    from panelini.ai_testing import install as __pf_install_ai_stub

    __pf_install_ai_stub()

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
    # Collapse the left sidebar when it is empty so the embedded demo uses the full
    # iframe width (the toggle button stays, so it can still be opened). Judged on the
    # left sidebar alone: a demo can fill only the right one and still waste the left.
    if not __pf_view.sidebar:
        __pf_view.sidebar_visible = False
    __pf_orig["panelini"](__pf_view)
elif __pf_view is not None:
    # pn.panel() turns Viewables, Viewers, and ``__panel__`` objects into a servable.
    pn.panel(__pf_view).servable()
else:
    pn.pane.Markdown("# Could not render this example").servable()
"""

# Panels excluded from the Pyodide portfolio (server/sandbox-backed, can't run in WASM).
# ``drawai_beautify`` drives the Anthropic SDK directly and renders through the hosted
# drawio viewer, so the LangChain stand-ins do not cover it; it stays media-only.
# ``chat_sqlite_history`` opens a file-backed SQLite store at module level; sqlite3 is
# available in Pyodide but file writes are ephemeral in the WASM virtual FS and the
# reviewer requirement is: only localStorage and in-memory backends under Pyodide.
_EXCLUDE_STEMS = {"plot_by_code", "drawai_beautify", "chat_sqlite_history"}
_EXCLUDE_CATEGORIES: set[str] = set()


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
    for path in sorted(_USECASES_DIR.glob("*.py")):
        if path.name == "__init__.py" or path.name.startswith("_"):
            continue
        grouped.setdefault("usecases", []).append(path)
    return grouped


def _app_html(path: Path, category: str) -> Path:
    """Path to the converted Pyodide app HTML for a panel (may not exist yet)."""
    return _APPS_DIR / category / f"{path.stem}.html"


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
    body = _WRAPPER_TEMPLATE.format(b64=b64, name=path.name, ai_stub=category == "ai")
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
        print(f"  - {category}/{path.stem}.html (unchanged, skipped)")
        return True

    with tempfile.TemporaryDirectory() as tmp:
        wrapper_path = Path(tmp) / f"{path.stem}.py"
        wrapper_path.write_text(wrapper, encoding="utf-8")
        cmd = [
            "panel",
            "convert",
            str(wrapper_path),
            "--to",
            "pyodide-worker",
            # Do not embed the build-time pre-rendered snapshot. It stays on the page as a
            # SECOND Bokeh document alongside the worker's live one, and clicks land on
            # models whose ids the Python side never saw, so every callback silently
            # no-ops (context menus, buttons, lazy loading, file drops). Skipping the
            # embed leaves exactly one document, so events reach Python. It also removes
            # the stale "Could not render this example" flash before hydration.
            "--skip-embed",
            "--out",
            str(out_dir),
            "--requirements",
            # The local panelini wheel is NOT passed here: panel>=1.9 verifies local wheel
            # paths and aborts on a relative one, and silently drops an absolute one. It is
            # injected into the generated install list below instead.
            *_REQUIREMENTS,
            *_CATEGORY_REQUIREMENTS.get(category, []),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  [FAIL] {category}/{path.name}\n{result.stderr.strip()[:300]}")
        return False

    worker_js = out_dir / f"{path.stem}.js"
    js = worker_js.read_text(encoding="utf-8")
    js = _pin_bokeh_from_pypi(js)
    js = _inject_local_wheel(js, wheel_name)
    worker_js.write_text(js, encoding="utf-8")

    print(f"  [ok] {category}/{path.stem}.html")
    return True


_BOKEH_CDN_WHEEL = re.compile(r"'https://cdn\.holoviz\.org/panel/wheels/bokeh-([0-9][^']*)-py3-none-any\.whl'")


def _inject_local_wheel(js: str, wheel_name: str) -> str:
    """Add the locally built panelini wheel to the worker's micropip install list.

    ``panel convert`` will not carry a local wheel through ``--requirements`` (see
    ``convert_panel``), so the entry is spliced into the generated
    ``micropip.install([...])` call. The install list lives inside a JS template literal,
    so ``${...}`` resolves the wheel relative to the worker's own URL and the app keeps
    working under any docs base path (the app is at apps/<category>/<stem>.js, the wheel
    at portfolio/wheels/).

    Raises:
        ValueError: if the generated worker has no recognisable install call, which means
            the converter's output shape changed and this rewrite needs updating.
    """
    marker = "micropip.install(["
    start = js.find(marker)
    if start == -1:
        msg = "could not find micropip.install([...]) in the generated worker"
        raise ValueError(msg)
    end = js.find("])", start)
    if end == -1:
        msg = "unterminated micropip.install([...]) in the generated worker"
        raise ValueError(msg)
    entry = ", '${new URL('../../wheels/" + wheel_name + "', self.location.href).href}'"
    return js[:end] + entry + js[end:]


def _pin_bokeh_from_pypi(js: str) -> str:
    """Point the bokeh requirement at PyPI instead of the holoviz CDN.

    ``panel convert`` writes a CDN wheel URL for bokeh, but that path is not published
    for every release (it 403s for bokeh 3.9.2), which aborts the whole micropip install
    and leaves the app with "No module named 'panel'". bokeh is a pure-Python wheel, so a
    plain pinned requirement resolves from PyPI instead.
    """
    return _BOKEH_CDN_WHEEL.sub(lambda m: f"'bokeh=={m.group(1)}'", js)


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


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build the docs Pyodide apps.")
    parser.add_argument(
        "--convert",
        action="store_true",
        help="Accepted for compatibility; conversion is all this script does.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Rebuild every app even if its source is unchanged.",
    )
    args = parser.parse_args()
    convert_all(force=args.force)
