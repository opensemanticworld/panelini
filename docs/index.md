---
hide-toc: true
---

# panelini

[![PyPI](https://img.shields.io/pypi/v/panelini)](https://pypi.org/project/panelini/)
[![Release](https://img.shields.io/github/v/release/opensemanticworld/panelini)](https://github.com/opensemanticworld/panelini/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/opensemanticworld/panelini/main.yml?branch=main)](https://github.com/opensemanticworld/panelini/actions/workflows/main.yml?query=branch%3Amain)
[![codecov](https://codecov.io/gh/opensemanticworld/panelini/branch/main/graph/badge.svg)](https://codecov.io/gh/opensemanticworld/panelini)
[![License](https://img.shields.io/github/license/opensemanticworld/panelini)](https://github.com/opensemanticworld/panelini/blob/main/LICENSE)

```{image} https://raw.githubusercontent.com/opensemanticworld/panelini/ceb5e9ca820f6706653255bdf9ab8db6ed6c5e83/img/panelinibanner.png
:alt: Panelini Banner
:align: center
:class: only-light
```

**A beautiful, batteries-included dashboard framework for [HoloViz Panel](https://panel.holoviz.org/).**

panelini gives you a responsive, production-ready layout — header, sidebars, main area, footer — plus a growing library of reusable panels for JSON editing, network graphs, and LLM chat. Drop it in, point it at your data, ship your app.

---

## Why panelini?

::::{grid} 1 1 3 3
:gutter: 3

:::{grid-item-card} Beautiful out of the box
:columns: 12 12 4 4
Responsive layout, sensible defaults, warm colour palette. No CSS wrestling before your first demo.
:::

:::{grid-item-card} Panel-native
:columns: 12 12 4 4
Every region accepts any `panel` object. Bring your own widgets, plots, and reactive state — panelini just composes the shell.
:::

:::{grid-item-card} Reusable panels
:columns: 12 12 4 4
Standalone `JsonEditor`, `VisNetwork`, `GraphDetailTool`, and `AiChat` components — usable with or without panelini.
:::

::::

---

## Install

```bash
uv add panelini            # recommended
# or
pip install panelini
```

With the AI chat extras:

```bash
uv add "panelini[ai]"
```

## Hello, panelini

```python
import panel as pn
from panelini import Panelini

app = Panelini(title="👋 Hello panelini")
app.main_set(objects=[pn.pane.Markdown("## Your first dashboard")])
app.servable()
```

Run it:

```bash
panel serve app.py --dev
```

That's it — you now have a branded, responsive dashboard at `http://localhost:5006`.

---

## Where to next?

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 🚀 Getting started
:link: getting_started/index
:link-type: doc
Install, build your first app, learn the layout regions.
:::

:::{grid-item-card} 🧪 Examples
:link: examples/index
:link-type: doc
Walkthroughs of every example in `examples/panels/` — AI chat, JSON editor, network graphs.
:::

:::{grid-item-card} 🧭 Architecture
:link: architecture
:link-type: doc
How the layout, panels, and components fit together. Data-flow diagrams.
:::

:::{grid-item-card} 📚 API reference
:link: modules
:link-type: doc
Handwritten overview plus the full auto-generated API.
:::

::::

---

## Authors

- [Andreas Räder](https://github.com/raederan)
- [Linus Schenk](https://github.com/cptnsloww)
- [Matthias A. Popp](https://github.com/MatPoppFHG)
- [Simon Stier](https://github.com/simontaurus)

The logo and banner were generated with DALL·E 3 and refined by hand.

```{toctree}
:maxdepth: 2
:caption: Getting Started
:hidden:

getting_started/index
getting_started/installation
getting_started/quickstart
```

```{toctree}
:maxdepth: 2
:caption: Examples
:hidden:

examples/index
examples/ai_chat_min
examples/ai_chat_custom_tool
examples/ai_chat_multi_tab
examples/jsoneditor
examples/visnetwork
```

```{toctree}
:maxdepth: 2
:caption: Panels
:hidden:

panels/index
```

```{toctree}
:maxdepth: 2
:caption: Design
:hidden:

architecture
components/index
```

```{toctree}
:maxdepth: 2
:caption: API Reference
:hidden:

modules
```

```{toctree}
:maxdepth: 2
:hidden:

superpowers/index
```
