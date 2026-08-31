# Quickstart

Let's build a small dashboard. We'll populate the main area, drop a few cards into the sidebar, and serve it locally.

## The 10-line version

Create `app.py`:

```python
import panel as pn
from panelini import Panelini

app = Panelini(title="📊 My first panelini app")
app.main_set(objects=[
    pn.pane.Markdown("## Hello, panelini!"),
])
app.servable()
```

Run it:

```bash
panel serve app.py --dev
```

Open <http://localhost:5006/app> and you'll see a branded dashboard with your markdown inside the main content region.

## Adding a sidebar

panelini gives you a left and right sidebar, each a list of Panel objects.

```python
import panel as pn
from panelini import Panelini

app = Panelini(
    title="📊 My first panelini app",
    sidebar_enabled=True,
    sidebar_right_enabled=False,
)

app.main_set(objects=[
    pn.pane.Markdown("## Hello, panelini!"),
])

app.sidebar_set(objects=[
    pn.Card("Controls go here", title="Controls"),
    pn.Card("Or status widgets", title="Status"),
])

app.servable()
```

`sidebar_set` replaces the current content. Use `sidebar_add` to append, or `sidebar_get` to inspect.

```{tip}
The left sidebar is on by default, the right is off. Flip `sidebar_right_enabled=True` when you need both.
```

## Adding reactive content

panelini doesn't reinvent reactivity - it plugs straight into Panel's param + `pn.bind`:

```python
import panel as pn
from panelini import Panelini

slider = pn.widgets.IntSlider(name="N", start=1, end=100, value=25)

@pn.depends(slider.param.value)
def square(n):
    return pn.pane.Markdown(f"**N² = {n * n}**")

app = Panelini(title="Reactive demo")
app.main_set(objects=[slider, square])
app.servable()
```

## Using a panel

panelini ships with reusable panels under `panelini.panels.*`. Each one is usable standalone - panelini just hosts them in a nice layout.

```python
import panel as pn
from panelini import Panelini
from panelini.panels.jsoneditor import JsonEditor

editor = JsonEditor(options={
    "schema": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "age":  {"type": "integer", "minimum": 0},
        },
    },
})

app = Panelini(title="JSON form demo")
app.main_set(objects=[pn.Card(editor, title="User", max_height=500)])
app.servable()
```

Each panel has its own guide, with every feature shown next to the example that demonstrates it: see {doc}`../panels/index`.

## Runnable examples

The three shell examples in [`examples/`](https://github.com/opensemanticworld/panelini/tree/main/examples) build on what is above:

- [`panelini_min.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panelini_min.py) - the smallest complete app, with both sidebars enabled.
- [`panelini_dynamic_content.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panelini_dynamic_content.py) - sidebar buttons that add and remove main-area cards at runtime through `main_add` and `main_remove_index`, the counterparts to the `sidebar_*` methods above.
- [`editable_template.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/editable_template.py) - plain Panel `EditableTemplate` for comparison, with no panelini involved.

Everything else lives under `examples/panels/` and `examples/usecases/`, one file per feature:

```bash
git clone https://github.com/opensemanticworld/panelini.git
cd panelini && uv sync
python examples/panels/jsoneditor/jsoneditor_panelini_min.py
```

Each of those ends with `pn.serve(...)` when run directly, so open the URL printed in the terminal.

```{note}
Every example is exercised by a Playwright test that imports the real module and asserts on rendered DOM, and the screen captures in these docs are recorded from those same tests. Run `make test-ui` for the tests and `make docs-media` to re-record the captures.
```

## Disabling the background images

The bundled header and content background images look nice but add ~530 KB of base64 CSS on first paint. For lean deployments (and all the UI tests) pass `None`:

```python
app = Panelini(
    title="Lean deploy",
    header_background_image=None,
    content_background_image=None,
)
```

## Serving options

```bash
# Dev server with autoreload
panel serve app.py --dev

# Expose static assets
panel serve app.py \
    --dev \
    --static-dirs assets="src/panelini/assets" \
    --ico-path src/panelini/assets/favicon.ico
```

Or from inside Python:

```python
import panel as pn
pn.serve(app.servable(), port=5006, show=False)
```

## Next

- {doc}`../panels/index` - the reusable panels, feature by feature
- {doc}`../architecture` - how panelini is structured
- {doc}`../modules` - API reference
