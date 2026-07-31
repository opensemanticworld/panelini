"""Sphinx configuration for panelini documentation."""

import importlib.metadata

# -- Project information -----------------------------------------------------
project = "panelini"
author = "Andreas Räder, Linus Schenk, Matthias A. Popp, Simon Stier"
copyright = "2024, panelini contributors"  # noqa: A001
release = importlib.metadata.version("panelini")
version = ".".join(release.split(".")[:2])

# -- General configuration ---------------------------------------------------
extensions = [
    "myst_parser",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
    "sphinx.ext.intersphinx",
    "sphinx_design",
    "autodoc2",
    "sphinxcontrib.mermaid",
]

# MyST configuration
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "fieldlist",
    "tasklist",
    "attrs_inline",
    "attrs_block",
    "linkify",
    "smartquotes",
    "substitution",
]
myst_heading_anchors = 3
myst_linkify_fuzzy_links = False

# Napoleon configuration (Google-style docstrings)
napoleon_google_docstring = True
napoleon_numpy_docstring = False
napoleon_include_init_with_doc = True
napoleon_include_private_with_doc = False
napoleon_include_special_with_doc = True
napoleon_use_admonition_for_notes = True
napoleon_use_admonition_for_examples = True

# autodoc2 configuration
autodoc2_packages = [
    {
        "path": "../src/panelini",
        "module": "panelini",
        "exclude_dirs": ["__pycache__", "vue", "dist", "assets"],
    },
]
autodoc2_render_plugin = "myst"
autodoc2_hidden_objects = ["private", "dunder", "inherited"]

# Intersphinx mapping
intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
    "panel": ("https://panel.holoviz.org/", None),
    "param": ("https://param.holoviz.org/", None),
}

# -- Options for HTML output -------------------------------------------------
html_theme = "furo"
html_title = "panelini"
html_logo = "../img/panelini-logo.svg"
html_static_path = ["_static"]
html_css_files = ["custom.css"]
html_js_files = ["mermaid-theme.js"]

# Furo theme options
html_theme_options = {
    "source_repository": "https://github.com/opensemanticworld/panelini",
    "source_branch": "main",
    "source_directory": "docs/",
    "light_css_variables": {
        "color-brand-primary": "#0d7377",
        "color-brand-content": "#0d7377",
        # Warm off-white surfaces. Set here (not via a raw body selector) so Furo
        # applies them only for the resolved light theme, incl. auto -> light. A
        # raw ``body:not([data-theme="dark"])`` also matched auto -> dark, which
        # left dark-OS visitors with a light background under dark-mode text.
        "color-background-primary": "#faf7f2",
        "color-background-secondary": "#f3ede4",
        "color-background-border": "#e5dfd6",
    },
    "dark_css_variables": {
        "color-brand-primary": "#2fb4b0",
        "color-brand-content": "#2fb4b0",
    },
}

# -- Source suffix -----------------------------------------------------------
source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

# Mermaid: detect Furo dark/light mode at page load
mermaid_init_js = (
    "const isDark = document.body.dataset.theme === 'dark'"
    " || (document.body.dataset.theme === 'auto'"
    " && window.matchMedia('(prefers-color-scheme: dark)').matches);\n"
    "mermaid.initialize({startOnLoad: true,"
    " theme: isDark ? 'dark' : 'default'});"
)

root_doc = "index"
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store", "portfolio"]
