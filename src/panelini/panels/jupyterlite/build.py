"""Helper to build a local JupyterLite deployment.

Requires the optional ``jupyterlite`` dependency group::

    uv pip install jupyterlite-core jupyterlite-pyodide-kernel jupyter-iframe-commands

For AI support, also install::

    uv pip install jupyterlite-ai

``jupyter-iframe-commands`` enables the Panel host page to detect when
JupyterLite is ready and refresh the file browser after automatic file
transfer.  Without it, files are still written to IndexedDB but the
file browser may need a manual refresh.

Usage::

    from panelini.panels.jupyterlite.build import build_jupyterlite

    output = build_jupyterlite(
        output_dir="./jupyterlite_build",
        base_url="/jupyterlite/",
    )
"""

import shutil
import subprocess
import sys
from pathlib import Path


def build_jupyterlite(
    output_dir: str = "./jupyterlite_build",
    base_url: str = "/jupyterlite/",
    contents_dir: str | None = None,
) -> Path:
    """Build a JupyterLite static site for local serving.

    The built site can be served from a Panel app via ``static_dirs``::

        pn.serve(app, static_dirs={"jupyterlite": "./jupyterlite_build"})

    Then set ``base_url="/jupyterlite"`` on the ``JupyterLite`` panel.

    Args:
        output_dir: Where to write the built site.
        base_url: URL prefix where the site will be served.  Must match
            the key used in ``static_dirs``.
        contents_dir: Optional directory whose files are copied into the
            JupyterLite filesystem (appear in the file browser on load).

    Returns:
        Resolved path of the output directory.

    Raises:
        ImportError: If ``jupyterlite-core`` is not installed.
        subprocess.CalledProcessError: If the build command fails.
    """
    if shutil.which("jupyter") is None:
        msg = (
            "jupyterlite-core is not installed. Install it with:\n"
            "  uv pip install jupyterlite-core jupyterlite-pyodide-kernel"
        )
        raise ImportError(msg)

    out = Path(output_dir).resolve()

    cmd = [
        sys.executable,
        "-m",
        "jupyter",
        "lite",
        "build",
        "--output-dir",
        str(out),
    ]

    if base_url:
        cmd.extend(["--base-url", base_url])

    if contents_dir:
        cmd.extend(["--contents", str(Path(contents_dir).resolve())])

    subprocess.run(cmd, check=True)  # noqa: S603
    return out


if __name__ == "__main__":
    build_jupyterlite()
