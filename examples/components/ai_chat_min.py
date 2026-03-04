"""Minimal example: launch the Panelini AI chat component.

Prerequisites
-------------
1. ``pip install panelini[ai]``
2. Set the required environment variables for your chosen provider
   (see ``src/panelini/components/ai/default_config.yml``).
3. Run this script: ``python examples/components/ai_chat_min.py``
"""

from dotenv import load_dotenv
from panel import serve

from panelini import Panelini

load_dotenv()  # load .env if present

app = Panelini(title="Panelini AI Chat", use_ai=True)

serve(app.servable(), title="Panelini AI Chat", port=5006)
