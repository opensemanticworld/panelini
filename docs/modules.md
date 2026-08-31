# API reference

Where to import things from, and where to read about them. Every signature and docstring is generated from source in the [auto-generated reference](apidocs/index).

## Quick imports

```python
# The dashboard shell
from panelini import Panelini

app = Panelini(title="My app", use_ai=True)

# Panels - standalone, no panelini dependency
from panelini.panels.jsoneditor import JsonEditor
from panelini.panels.visnetwork import VisNetwork, GraphDetailTool
from panelini.panels.wunderbaum import Wunderbaum
from panelini.panels.terminalmirror import TerminalMirror
from panelini.panels.ai import AiChat, AiBackend

# Helpers
from panelini.main import image_to_base64
from panelini.panels.visnetwork.utils import data_url_to_bytes
```

`AiChat` needs the `panelini[ai]` extra. Everything else is in the base install.

## Where to read about what

```{list-table}
:header-rows: 1
:widths: 35 65

* - Symbol
  - Guide
* - {py:class}`panelini.main.Panelini`
  - {doc}`getting_started/quickstart` for the layout regions, {doc}`architecture` for how it composes
* - {py:class}`panelini.panels.jsoneditor.jsoneditor.JsonEditor`
  - {doc}`panels/jsoneditor`
* - {py:class}`panelini.panels.visnetwork.visnetwork.VisNetwork`
  - {doc}`panels/visnetwork`
* - {py:class}`panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool`
  - {doc}`panels/graph_detail_tool`
* - {py:class}`panelini.panels.wunderbaum.wunderbaum.Wunderbaum`
  - {doc}`panels/wunderbaum`
* - {py:class}`panelini.panels.terminalmirror.terminalmirror.TerminalMirror`
  - {doc}`panels/terminalmirror`
* - {py:class}`panelini.panels.ai.frontend.AiChat`
  - {doc}`panels/ai`
```

Panels are `param.Parameterized`, so every constructor argument is also a reactive attribute you can set at runtime, and the panel re-renders.

## Full auto-generated reference

Every public module, class, and function - generated from source docstrings - lives in the auto-generated reference:

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 📚 Browse the full API
:link: apidocs/index
:link-type: doc
All modules, every signature, every docstring.
:::

:::{grid-item-card} 🧭 Back to architecture
:link: architecture
:link-type: doc
High-level picture of how the pieces fit together.
:::

::::

```{toctree}
:hidden:

apidocs/index
```
