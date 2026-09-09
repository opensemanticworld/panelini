# {py:mod}`panelini.panels.ai.history.tree`

```{py:module} panelini.panels.ai.history.tree
```

```{autodoc2-docstring} panelini.panels.ai.history.tree
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`HistoryTree <panelini.panels.ai.history.tree.HistoryTree>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.tree.HistoryTree
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`conv_key <panelini.panels.ai.history.tree.conv_key>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.tree.conv_key
    :summary:
    ```
* - {py:obj}`placement <panelini.panels.ai.history.tree.placement>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.tree.placement
    :summary:
    ```
````

### API

````{py:function} conv_key(conversation_id: str, folder_id: str | None = None) -> str
:canonical: panelini.panels.ai.history.tree.conv_key

```{autodoc2-docstring} panelini.panels.ai.history.tree.conv_key
```
````

````{py:function} placement(key: str) -> tuple[str, str | None]
:canonical: panelini.panels.ai.history.tree.placement

```{autodoc2-docstring} panelini.panels.ai.history.tree.placement
```
````

`````{py:class} HistoryTree(store: panelini.panels.ai.history.store.ChatHistoryStore, user_id: str, on_open: collections.abc.Callable[[str], None], on_new_chat: collections.abc.Callable[[], None], get_active_id: collections.abc.Callable[[], str | None], get_busy_ids: collections.abc.Callable[[], set[str]] | None = None, get_ready_ids: collections.abc.Callable[[], set[str]] | None = None, actions: collections.abc.Sequence[panel.viewable.Viewable] = (), on_reset: collections.abc.Callable[[], None] | None = None, trailing: collections.abc.Sequence[panel.viewable.Viewable] = (), on_delete: collections.abc.Callable[[str], None] | None = None, on_fork: collections.abc.Callable[[str], None] | None = None)
:canonical: panelini.panels.ai.history.tree.HistoryTree

```{autodoc2-docstring} panelini.panels.ai.history.tree.HistoryTree
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.history.tree.HistoryTree.__init__
```

````{py:method} refresh() -> None
:canonical: panelini.panels.ai.history.tree.HistoryTree.refresh

```{autodoc2-docstring} panelini.panels.ai.history.tree.HistoryTree.refresh
```

````

`````
