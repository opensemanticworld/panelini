# {py:mod}`panelini.panels.ai.history.panel`

```{py:module} panelini.panels.ai.history.panel
```

```{autodoc2-docstring} panelini.panels.ai.history.panel
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`HistoryPanel <panelini.panels.ai.history.panel.HistoryPanel>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.panel.HistoryPanel
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`bucket_label <panelini.panels.ai.history.panel.bucket_label>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.panel.bucket_label
    :summary:
    ```
````

### API

````{py:function} bucket_label(updated_at: datetime.datetime, now: datetime.datetime | None = None) -> str
:canonical: panelini.panels.ai.history.panel.bucket_label

```{autodoc2-docstring} panelini.panels.ai.history.panel.bucket_label
```
````

`````{py:class} HistoryPanel(store: panelini.panels.ai.history.store.ChatHistoryStore, user_id: str, on_open: collections.abc.Callable[[str], None], on_new_chat: collections.abc.Callable[[], None], get_active_id: collections.abc.Callable[[], str | None], get_busy_ids: collections.abc.Callable[[], set[str]] | None = None, get_ready_ids: collections.abc.Callable[[], set[str]] | None = None, actions: collections.abc.Sequence[panel.viewable.Viewable] = (), on_reset: collections.abc.Callable[[], None] | None = None, trailing: collections.abc.Sequence[panel.viewable.Viewable] = (), on_delete: collections.abc.Callable[[str], None] | None = None)
:canonical: panelini.panels.ai.history.panel.HistoryPanel

```{autodoc2-docstring} panelini.panels.ai.history.panel.HistoryPanel
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.history.panel.HistoryPanel.__init__
```

````{py:method} refresh() -> None
:canonical: panelini.panels.ai.history.panel.HistoryPanel.refresh

```{autodoc2-docstring} panelini.panels.ai.history.panel.HistoryPanel.refresh
```

````

`````
