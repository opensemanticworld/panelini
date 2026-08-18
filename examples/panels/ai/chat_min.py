"""Minimal example: launch the AI chat panel inside Panelini.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/ai_chat_panelini_min.py``

The app is served through a factory so every browser session gets its own
instance (multi-user isolation). A module-level ``app`` shares one instance
across all browsers and is kept here only for Pyodide/portfolio builds.
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    return Panelini(title="Panelini AI Chat", use_ai=True)


app = create_app()  # module-level instance for Pyodide/portfolio builds

if __name__ == "__main__":
    serve(create_app, title="Panelini AI Chat", port=5006)
