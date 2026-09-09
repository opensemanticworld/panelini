# {py:mod}`panelini.panels.ai.history.local_storage_store`

```{py:module} panelini.panels.ai.history.local_storage_store
```

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`LocalStorageHistoryStore <panelini.panels.ai.history.local_storage_store.LocalStorageHistoryStore>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.LocalStorageHistoryStore
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`strip_oversized_attachments <panelini.panels.ai.history.local_storage_store.strip_oversized_attachments>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.strip_oversized_attachments
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`DEFAULT_NAMESPACE <panelini.panels.ai.history.local_storage_store.DEFAULT_NAMESPACE>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.DEFAULT_NAMESPACE
    :summary:
    ```
* - {py:obj}`ATTACHMENT_PAYLOAD_LIMIT <panelini.panels.ai.history.local_storage_store.ATTACHMENT_PAYLOAD_LIMIT>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.ATTACHMENT_PAYLOAD_LIMIT
    :summary:
    ```
````

### API

````{py:data} DEFAULT_NAMESPACE
:canonical: panelini.panels.ai.history.local_storage_store.DEFAULT_NAMESPACE
:value: >
   'panelini-ai-history'

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.DEFAULT_NAMESPACE
```

````

````{py:data} ATTACHMENT_PAYLOAD_LIMIT
:canonical: panelini.panels.ai.history.local_storage_store.ATTACHMENT_PAYLOAD_LIMIT
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.ATTACHMENT_PAYLOAD_LIMIT
```

````

````{py:function} strip_oversized_attachments(document: dict[str, typing.Any], limit: int = ATTACHMENT_PAYLOAD_LIMIT) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.local_storage_store.strip_oversized_attachments

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.strip_oversized_attachments
```
````

````{py:class} LocalStorageHistoryStore(namespace: str = DEFAULT_NAMESPACE)
:canonical: panelini.panels.ai.history.local_storage_store.LocalStorageHistoryStore

Bases: {py:obj}`panelini.panels.ai.history.document.InMemoryHistoryStore`

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.LocalStorageHistoryStore
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.history.local_storage_store.LocalStorageHistoryStore.__init__
```

````
