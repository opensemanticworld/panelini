"""JupyterLite with Jupyternaut AI and automatic file transfer.

Prerequisites -- run once (not part of the panelini environment)::

    uv pip install jupyterlite-core jupyterlite-pyodide-kernel jupyterlite-ai jupyter-iframe-commands

Build the JupyterLite site (includes AI + iframe-commands extensions)::

    python -c "
from panelini.panels.jupyterlite.build import build_jupyterlite
build_jupyterlite(output_dir='./jupyterlite_build', base_url='/jupyterlite/')
"

Then run::

    python examples/panels/jupyterlite/jupyterlite_ai.py

Configure your AI provider inside JupyterLite:
  Left sidebar > Jupyternaut chat icon > Settings gear > pick a provider

Files are written to JupyterLite's IndexedDB and the file browser is
refreshed via ``jupyter-iframe-commands`` -- no manual transfer needed.
"""

from pathlib import Path

import panel as pn

from panelini.panels.jupyterlite import JupyterLite

REPO_ROOT = Path(__file__).resolve().parents[3]
JUPYTERLITE_BUILD = REPO_ROOT / "jupyterlite_build"

pn.extension()

CSV_DATA = "name,value,category\nAlice,42,A\nBob,37,B\nCharlie,55,A\nDiana,28,C\n"

lite = JupyterLite(
    base_url="/jupyterlite",
    page="lab",
    height=700,
    files={"data.csv": CSV_DATA},
)

lite.upload_notebook(
    "analysis.ipynb",
    cells=[
        {
            "cell_type": "markdown",
            "source": (
                "# Data Analysis\n\n"
                "`data.csv` was transferred automatically from the Panel app.\n\n"
                "Open the **Jupyternaut** chat in the left sidebar to ask the AI\n"
                "assistant to help you explore and visualize the data."
            ),
        },
        {
            "cell_type": "code",
            "source": "import pandas as pd\ndf = pd.read_csv('data.csv')\ndf",
        },
        {
            "cell_type": "code",
            "source": "df.describe()",
        },
    ],
)

if __name__ == "__main__":
    if not JUPYTERLITE_BUILD.exists():
        msg = (
            f"JupyterLite build not found at {JUPYTERLITE_BUILD}\n"
            "Build it first:\n"
            "  uv pip install jupyterlite-core jupyterlite-pyodide-kernel jupyterlite-ai jupyter-iframe-commands\n"
            '  python -c "from panelini.panels.jupyterlite.build import build_jupyterlite; build_jupyterlite()"'
        )
        raise SystemExit(msg)
    pn.serve(
        lite,
        static_dirs={"jupyterlite": str(JUPYTERLITE_BUILD)},
    )
