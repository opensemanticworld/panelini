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

panelini doesn't reinvent reactivity — it plugs straight into Panel's param + `pn.bind`:

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

panelini ships with reusable panels under `panelini.panels.*`. Each one is usable standalone — panelini just hosts them in a nice layout.

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

See {doc}`../examples/index` for complete runnable examples, or {doc}`../panels/index` for panel-by-panel guides.

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

- {doc}`../examples/index` — runnable walkthroughs
- {doc}`../architecture` — how panelini is structured
- {doc}`../modules` — API reference
