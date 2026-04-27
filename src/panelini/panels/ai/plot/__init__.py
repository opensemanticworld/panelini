"""Panelini AI plot panel.

Chat-driven sandboxed plotting via ``llm_sandbox`` with optional
OpenSemanticWorld (OSW) connector tools.

Install optional dependencies::

    pip install 'panelini[ai,ai-llm-sandbox]'
    # optional OSW connector
    pip install 'panelini[ai-osw]'
"""

from .model_selector import build_plot_context_sidebar, regenerate_plot
from .panel import PlotPanel
from .tools.plot_tools import make_plot_tools

__all__ = [
    "PlotPanel",
    "build_plot_context_sidebar",
    "make_plot_tools",
    "regenerate_plot",
]
