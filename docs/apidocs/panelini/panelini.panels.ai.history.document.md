# {py:mod}`panelini.panels.ai.history.document`

```{py:module} panelini.panels.ai.history.document
```

```{autodoc2-docstring} panelini.panels.ai.history.document
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`DocumentHistoryStore <panelini.panels.ai.history.document.DocumentHistoryStore>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.DocumentHistoryStore
    :summary:
    ```
* - {py:obj}`InMemoryHistoryStore <panelini.panels.ai.history.document.InMemoryHistoryStore>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.InMemoryHistoryStore
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`load_schema <panelini.panels.ai.history.document.load_schema>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.load_schema
    :summary:
    ```
* - {py:obj}`document_context <panelini.panels.ai.history.document.document_context>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.document_context
    :summary:
    ```
* - {py:obj}`validate_conversation_document <panelini.panels.ai.history.document.validate_conversation_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.validate_conversation_document
    :summary:
    ```
* - {py:obj}`message_to_dict <panelini.panels.ai.history.document.message_to_dict>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.message_to_dict
    :summary:
    ```
* - {py:obj}`conversation_to_document <panelini.panels.ai.history.document.conversation_to_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.conversation_to_document
    :summary:
    ```
* - {py:obj}`conversation_from_document <panelini.panels.ai.history.document.conversation_from_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.conversation_from_document
    :summary:
    ```
* - {py:obj}`messages_from_document <panelini.panels.ai.history.document.messages_from_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.messages_from_document
    :summary:
    ```
* - {py:obj}`folder_to_document <panelini.panels.ai.history.document.folder_to_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.folder_to_document
    :summary:
    ```
* - {py:obj}`folder_from_document <panelini.panels.ai.history.document.folder_from_document>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.folder_from_document
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`SCHEMA_VERSION <panelini.panels.ai.history.document.SCHEMA_VERSION>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.SCHEMA_VERSION
    :summary:
    ```
* - {py:obj}`KIND_CONVERSATION <panelini.panels.ai.history.document.KIND_CONVERSATION>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.KIND_CONVERSATION
    :summary:
    ```
* - {py:obj}`KIND_FOLDER <panelini.panels.ai.history.document.KIND_FOLDER>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.document.KIND_FOLDER
    :summary:
    ```
````

### API

````{py:data} SCHEMA_VERSION
:canonical: panelini.panels.ai.history.document.SCHEMA_VERSION
:value: >
   2

```{autodoc2-docstring} panelini.panels.ai.history.document.SCHEMA_VERSION
```

````

````{py:data} KIND_CONVERSATION
:canonical: panelini.panels.ai.history.document.KIND_CONVERSATION
:value: >
   'conversation'

```{autodoc2-docstring} panelini.panels.ai.history.document.KIND_CONVERSATION
```

````

````{py:data} KIND_FOLDER
:canonical: panelini.panels.ai.history.document.KIND_FOLDER
:value: >
   'folder'

```{autodoc2-docstring} panelini.panels.ai.history.document.KIND_FOLDER
```

````

````{py:function} load_schema() -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.document.load_schema

```{autodoc2-docstring} panelini.panels.ai.history.document.load_schema
```
````

````{py:function} document_context() -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.document.document_context

```{autodoc2-docstring} panelini.panels.ai.history.document.document_context
```
````

````{py:function} validate_conversation_document(document: dict[str, typing.Any]) -> None
:canonical: panelini.panels.ai.history.document.validate_conversation_document

```{autodoc2-docstring} panelini.panels.ai.history.document.validate_conversation_document
```
````

````{py:function} message_to_dict(record: panelini.panels.ai.history.store.MessageRecord) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.document.message_to_dict

```{autodoc2-docstring} panelini.panels.ai.history.document.message_to_dict
```
````

````{py:function} conversation_to_document(record: panelini.panels.ai.history.store.ConversationRecord, messages: collections.abc.Sequence[panelini.panels.ai.history.store.MessageRecord] = ()) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.document.conversation_to_document

```{autodoc2-docstring} panelini.panels.ai.history.document.conversation_to_document
```
````

````{py:function} conversation_from_document(document: dict[str, typing.Any]) -> panelini.panels.ai.history.store.ConversationRecord
:canonical: panelini.panels.ai.history.document.conversation_from_document

```{autodoc2-docstring} panelini.panels.ai.history.document.conversation_from_document
```
````

````{py:function} messages_from_document(document: dict[str, typing.Any]) -> list[panelini.panels.ai.history.store.MessageRecord]
:canonical: panelini.panels.ai.history.document.messages_from_document

```{autodoc2-docstring} panelini.panels.ai.history.document.messages_from_document
```
````

````{py:function} folder_to_document(record: panelini.panels.ai.history.store.FolderRecord) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.history.document.folder_to_document

```{autodoc2-docstring} panelini.panels.ai.history.document.folder_to_document
```
````

````{py:function} folder_from_document(document: dict[str, typing.Any]) -> panelini.panels.ai.history.store.FolderRecord
:canonical: panelini.panels.ai.history.document.folder_from_document

```{autodoc2-docstring} panelini.panels.ai.history.document.folder_from_document
```
````

`````{py:class} DocumentHistoryStore
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore

Bases: {py:obj}`panelini.panels.ai.history.store.ChatHistoryStore`

```{autodoc2-docstring} panelini.panels.ai.history.document.DocumentHistoryStore
```

````{py:method} list_conversations(user_id: str, include_archived: bool = False) -> list[panelini.panels.ai.history.store.ConversationRecord]
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.list_conversations

````

````{py:method} search_conversations(user_id: str, query: str, include_archived: bool = False) -> list[panelini.panels.ai.history.store.ConversationRecord]
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.search_conversations

````

````{py:method} get_conversation(user_id: str, conversation_id: str) -> panelini.panels.ai.history.store.ConversationRecord | None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.get_conversation

````

````{py:method} create_conversation(user_id: str, title: str = DEFAULT_TITLE, folder_id: str | None = None) -> panelini.panels.ai.history.store.ConversationRecord
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.create_conversation

````

````{py:method} rename_conversation(user_id: str, conversation_id: str, title: str) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.rename_conversation

````

````{py:method} delete_conversation(user_id: str, conversation_id: str) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.delete_conversation

````

````{py:method} move_conversation(user_id: str, conversation_id: str, folder_id: str | None) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.move_conversation

````

````{py:method} set_pinned(user_id: str, conversation_id: str, pinned: bool) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.set_pinned

````

````{py:method} set_archived(user_id: str, conversation_id: str, archived: bool) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.set_archived

````

````{py:method} append_message(user_id: str, conversation_id: str, role: str, content: str, extra: dict[str, typing.Any] | None = None, parent_message_id: str | None = None) -> panelini.panels.ai.history.store.MessageRecord
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.append_message

````

````{py:method} load_messages(user_id: str, conversation_id: str) -> list[panelini.panels.ai.history.store.MessageRecord]
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.load_messages

````

````{py:method} restore_conversation(user_id: str, document: dict[str, typing.Any]) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.restore_conversation

```{autodoc2-docstring} panelini.panels.ai.history.document.DocumentHistoryStore.restore_conversation
```

````

````{py:method} list_folders(user_id: str) -> list[panelini.panels.ai.history.store.FolderRecord]
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.list_folders

````

````{py:method} create_folder(user_id: str, name: str, parent_id: str | None = None) -> panelini.panels.ai.history.store.FolderRecord
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.create_folder

````

````{py:method} rename_folder(user_id: str, folder_id: str, name: str) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.rename_folder

````

````{py:method} move_folder(user_id: str, folder_id: str, parent_id: str | None) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.move_folder

````

````{py:method} delete_folder(user_id: str, folder_id: str) -> None
:canonical: panelini.panels.ai.history.document.DocumentHistoryStore.delete_folder

````

`````

`````{py:class} InMemoryHistoryStore()
:canonical: panelini.panels.ai.history.document.InMemoryHistoryStore

Bases: {py:obj}`panelini.panels.ai.history.document.DocumentHistoryStore`

```{autodoc2-docstring} panelini.panels.ai.history.document.InMemoryHistoryStore
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.history.document.InMemoryHistoryStore.__init__
```

````{py:method} close() -> None
:canonical: panelini.panels.ai.history.document.InMemoryHistoryStore.close

```{autodoc2-docstring} panelini.panels.ai.history.document.InMemoryHistoryStore.close
```

````

`````
