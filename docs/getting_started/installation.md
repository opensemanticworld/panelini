# Installation

panelini is published on [PyPI](https://pypi.org/project/panelini/). Install it like any other Python package.

## Recommended: uv

[`uv`](https://docs.astral.sh/uv/) is the fastest way to set up a Python project.

```bash
uv add panelini
```

## Alternative: pip

```bash
pip install panelini
```

## Optional extras

panelini ships with optional feature sets. Install only what you need:

```{list-table}
:header-rows: 1
:widths: 25 75

* - Extra
  - Adds
* - `panelini[ai]`
  - LangChain + Anthropic + Azure OpenAI bindings, YAML config, `python-dotenv`. Needed for the AI chat panel.
```

```bash
uv add "panelini[ai]"
# or
pip install "panelini[ai]"
```

## Verify the install

```bash
python -c "from panelini import Panelini; print(Panelini)"
```

You should see something like `<class 'panelini.main.Panelini'>`.

## Development install

To hack on panelini itself:

```bash
git clone https://github.com/opensemanticworld/panelini.git
cd panelini
uv sync
uv run pre-commit install
```

The `Makefile` exposes the common workflows:

```{list-table}
:header-rows: 1
:widths: 30 70

* - Command
  - Purpose
* - `make install`
  - Sync the uv environment and install pre-commit hooks
* - `make check`
  - Lint, type-check, and audit dependencies
* - `make test`
  - Run unit tests (skips UI tests)
* - `make test-ui`
  - Run Playwright UI tests (headless)
* - `make test-full`
  - Run every test
* - `make docs`
  - Build and serve this documentation with autoreload
```

## Next

Build your first app: {doc}`quickstart`.
