"""Example: Two AI chat windows in a tabbed layout inside Panelini.

Demonstrates how to create multiple independent ``AiChat`` instances and
present them in a ``pn.Tabs`` layout within the Panelini framework.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/chat_multi_tab.py``

The app is served through a factory so every browser session gets its own
instance (multi-user isolation). A module-level ``app`` shares one instance
across all browsers and is kept here only for Pyodide/portfolio builds.
"""

from pathlib import Path

import panel as pn
from dotenv import load_dotenv

from panelini import Panelini
from panelini.panels.ai import AiChat

load_dotenv()  # load .env if present

# -- Optional: point to a custom provider config ------------------------------
# Set PANELINI_AI_CONFIG_PATH or pass a path directly.
config_path = Path("config.yml") if Path("config.yml").is_file() else None

# -- Create chat instances ------------------------------------------------------


def create_app() -> Panelini:
    """Create a fresh app instance (one per browser session)."""
    ingest_ai = AiChat(
        system_message="You are an assistant specialized in data ingestion tasks.",
        welcome_message="Hi! I'm **Ingest AI**. I can help you with data ingestion tasks.",
        config_path=config_path,
    )

    digest_ai = AiChat(
        system_message="You are an assistant specialized in data analysis and summarization.",
        welcome_message="Hi! I'm **Digest AI**. I can help you analyze and summarize data.",
        config_path=config_path,
    )

    # -- Tabbed layout inside Panelini ----------------------------------------

    main_tabs = pn.Tabs(
        ("Ingest AI", pn.Row(*ingest_ai.main_objects)),
        ("Digest AI", pn.Row(*digest_ai.main_objects)),
    )

    sidebar_tabs = pn.Tabs(
        ("Ingest AI", pn.Card(*ingest_ai.sidebar_objects, title="Ingest AI Settings")),
        ("Digest AI", pn.Card(*digest_ai.sidebar_objects, title="Digest AI Settings")),
    )

    # -- Link Tabs in main and sidebar -----------------------------------------

    main_tabs.jslink(sidebar_tabs, active="active")
    sidebar_tabs.jslink(main_tabs, active="active")

    # -- Create and link Panelini instance -------------------------------------

    app = Panelini(title="AI Chat Multi Tab", sidebar_enabled=True)
    app.main_set(objects=[main_tabs])
    app.sidebar_set(objects=[sidebar_tabs])
    return app


app = create_app()  # module-level instance for Pyodide/portfolio builds


if __name__ == "__main__":
    "Run AI Chat Multi Tab"
    pn.serve(create_app, title="AI Chat Multi Tab", port=5008)
