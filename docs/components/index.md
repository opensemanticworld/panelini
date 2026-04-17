# Components

Components are **Panelini-coupled** building blocks that depend on the framework's layout and reactive wiring. Unlike {doc}`panels <../panels/index>`, a component typically can't be used outside a `Panelini` app.

At the moment there are no active components — the AI chat moved from this layer to {doc}`../panels/ai` so it could be reused standalone.

## When to write a component (vs a panel)

Choose **component** when:

- The code assumes specific regions exist (e.g. writes into the sidebar + main at once).
- It manipulates `Panelini`'s `param` surface directly.
- It only ever runs inside a Panelini shell.

Choose **panel** when:

- The code is a self-contained Panel viewable.
- It could be embedded in any Panel app.
- It bridges JavaScript via `AnyWidget` + Vue.

Panels are the default. Components are an escape hatch.

## Contributing

Interested in adding one? The repository's contributing guide has the details: [CONTRIBUTING.md](https://github.com/opensemanticworld/panelini/blob/main/CONTRIBUTING.md).
