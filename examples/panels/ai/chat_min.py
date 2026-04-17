"""Minimal example: launch the AI chat panel inside Panelini.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/panels/ai/default_config.yml``).
3. Run this script: ``python examples/panels/ai/ai_chat_panelini_min.py``
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present

app = Panelini(title="Panelini AI Chat", use_ai=True)

if __name__ == "__main__":
    serve(app.servable(), title="Panelini AI Chat", port=5006)
