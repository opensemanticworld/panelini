# {py:mod}`panelini.panels.ai.history.store`

```{py:module} panelini.panels.ai.history.store
```

```{autodoc2-docstring} panelini.panels.ai.history.store
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`Attachment <panelini.panels.ai.history.store.Attachment>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment
    :summary:
    ```
* - {py:obj}`ConversationRecord <panelini.panels.ai.history.store.ConversationRecord>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord
    :summary:
    ```
* - {py:obj}`MessageRecord <panelini.panels.ai.history.store.MessageRecord>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord
    :summary:
    ```
* - {py:obj}`FolderRecord <panelini.panels.ai.history.store.FolderRecord>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord
    :summary:
    ```
* - {py:obj}`ChatHistoryStore <panelini.panels.ai.history.store.ChatHistoryStore>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`derive_title <panelini.panels.ai.history.store.derive_title>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.derive_title
    :summary:
    ```
* - {py:obj}`utcnow <panelini.panels.ai.history.store.utcnow>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.utcnow
    :summary:
    ```
* - {py:obj}`new_id <panelini.panels.ai.history.store.new_id>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.new_id
    :summary:
    ```
* - {py:obj}`attachment_from_bytes <panelini.panels.ai.history.store.attachment_from_bytes>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.attachment_from_bytes
    :summary:
    ```
* - {py:obj}`validate_role <panelini.panels.ai.history.store.validate_role>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.validate_role
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`VALID_ROLES <panelini.panels.ai.history.store.VALID_ROLES>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.VALID_ROLES
    :summary:
    ```
* - {py:obj}`DEFAULT_TITLE <panelini.panels.ai.history.store.DEFAULT_TITLE>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.DEFAULT_TITLE
    :summary:
    ```
* - {py:obj}`TITLE_MAX_LENGTH <panelini.panels.ai.history.store.TITLE_MAX_LENGTH>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.TITLE_MAX_LENGTH
    :summary:
    ```
* - {py:obj}`TEXT_MEDIA_TYPES <panelini.panels.ai.history.store.TEXT_MEDIA_TYPES>`
  - ```{autodoc2-docstring} panelini.panels.ai.history.store.TEXT_MEDIA_TYPES
    :summary:
    ```
````

### API

````{py:data} VALID_ROLES
:canonical: panelini.panels.ai.history.store.VALID_ROLES
:value: >
   'frozenset(...)'

```{autodoc2-docstring} panelini.panels.ai.history.store.VALID_ROLES
```

````

````{py:data} DEFAULT_TITLE
:canonical: panelini.panels.ai.history.store.DEFAULT_TITLE
:value: >
   'New Chat'

```{autodoc2-docstring} panelini.panels.ai.history.store.DEFAULT_TITLE
```

````

````{py:data} TITLE_MAX_LENGTH
:canonical: panelini.panels.ai.history.store.TITLE_MAX_LENGTH
:value: >
   48

```{autodoc2-docstring} panelini.panels.ai.history.store.TITLE_MAX_LENGTH
```

````

````{py:function} derive_title(text: str, max_length: int = TITLE_MAX_LENGTH) -> str
:canonical: panelini.panels.ai.history.store.derive_title

```{autodoc2-docstring} panelini.panels.ai.history.store.derive_title
```
````

````{py:function} utcnow() -> datetime.datetime
:canonical: panelini.panels.ai.history.store.utcnow

```{autodoc2-docstring} panelini.panels.ai.history.store.utcnow
```
````

````{py:function} new_id() -> str
:canonical: panelini.panels.ai.history.store.new_id

```{autodoc2-docstring} panelini.panels.ai.history.store.new_id
```
````

`````{py:class} Attachment
:canonical: panelini.panels.ai.history.store.Attachment

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment
```

````{py:attribute} id
:canonical: panelini.panels.ai.history.store.Attachment.id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.id
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.history.store.Attachment.name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.name
```

````

````{py:attribute} media_type
:canonical: panelini.panels.ai.history.store.Attachment.media_type
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.media_type
```

````

````{py:attribute} size
:canonical: panelini.panels.ai.history.store.Attachment.size
:type: int | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.size
```

````

````{py:attribute} url
:canonical: panelini.panels.ai.history.store.Attachment.url
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.url
```

````

````{py:attribute} text
:canonical: panelini.panels.ai.history.store.Attachment.text
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.text
```

````

````{py:attribute} width
:canonical: panelini.panels.ai.history.store.Attachment.width
:type: int | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.width
```

````

````{py:attribute} height
:canonical: panelini.panels.ai.history.store.Attachment.height
:type: int | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.height
```

````

````{py:attribute} omitted
:canonical: panelini.panels.ai.history.store.Attachment.omitted
:type: bool
:value: >
   False

```{autodoc2-docstring} panelini.panels.ai.history.store.Attachment.omitted
```

````

`````

````{py:data} TEXT_MEDIA_TYPES
:canonical: panelini.panels.ai.history.store.TEXT_MEDIA_TYPES
:value: >
   'frozenset(...)'

```{autodoc2-docstring} panelini.panels.ai.history.store.TEXT_MEDIA_TYPES
```

````

````{py:function} attachment_from_bytes(name: str, data: bytes, media_type: str | None = None) -> panelini.panels.ai.history.store.Attachment
:canonical: panelini.panels.ai.history.store.attachment_from_bytes

```{autodoc2-docstring} panelini.panels.ai.history.store.attachment_from_bytes
```
````

`````{py:class} ConversationRecord
:canonical: panelini.panels.ai.history.store.ConversationRecord

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord
```

````{py:attribute} id
:canonical: panelini.panels.ai.history.store.ConversationRecord.id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.id
```

````

````{py:attribute} user_id
:canonical: panelini.panels.ai.history.store.ConversationRecord.user_id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.user_id
```

````

````{py:attribute} title
:canonical: panelini.panels.ai.history.store.ConversationRecord.title
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.title
```

````

````{py:attribute} pinned
:canonical: panelini.panels.ai.history.store.ConversationRecord.pinned
:type: bool
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.pinned
```

````

````{py:attribute} archived
:canonical: panelini.panels.ai.history.store.ConversationRecord.archived
:type: bool
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.archived
```

````

````{py:attribute} folder_ids
:canonical: panelini.panels.ai.history.store.ConversationRecord.folder_ids
:type: tuple[str, ...]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.folder_ids
```

````

````{py:attribute} current_message_id
:canonical: panelini.panels.ai.history.store.ConversationRecord.current_message_id
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.current_message_id
```

````

````{py:attribute} created_at
:canonical: panelini.panels.ai.history.store.ConversationRecord.created_at
:type: datetime.datetime
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.created_at
```

````

````{py:attribute} updated_at
:canonical: panelini.panels.ai.history.store.ConversationRecord.updated_at
:type: datetime.datetime
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.updated_at
```

````

````{py:attribute} parent_id
:canonical: panelini.panels.ai.history.store.ConversationRecord.parent_id
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.parent_id
```

````

````{py:attribute} forked_from_message_id
:canonical: panelini.panels.ai.history.store.ConversationRecord.forked_from_message_id
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.ConversationRecord.forked_from_message_id
```

````

`````

`````{py:class} MessageRecord
:canonical: panelini.panels.ai.history.store.MessageRecord

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord
```

````{py:attribute} id
:canonical: panelini.panels.ai.history.store.MessageRecord.id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.id
```

````

````{py:attribute} conversation_id
:canonical: panelini.panels.ai.history.store.MessageRecord.conversation_id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.conversation_id
```

````

````{py:attribute} user_id
:canonical: panelini.panels.ai.history.store.MessageRecord.user_id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.user_id
```

````

````{py:attribute} role
:canonical: panelini.panels.ai.history.store.MessageRecord.role
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.role
```

````

````{py:attribute} content
:canonical: panelini.panels.ai.history.store.MessageRecord.content
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.content
```

````

````{py:attribute} extra
:canonical: panelini.panels.ai.history.store.MessageRecord.extra
:type: dict[str, typing.Any] | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.extra
```

````

````{py:attribute} parent_message_id
:canonical: panelini.panels.ai.history.store.MessageRecord.parent_message_id
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.parent_message_id
```

````

````{py:attribute} created_at
:canonical: panelini.panels.ai.history.store.MessageRecord.created_at
:type: datetime.datetime
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.created_at
```

````

````{py:attribute} attachments
:canonical: panelini.panels.ai.history.store.MessageRecord.attachments
:type: tuple[panelini.panels.ai.history.store.Attachment, ...]
:value: >
   'field(...)'

```{autodoc2-docstring} panelini.panels.ai.history.store.MessageRecord.attachments
```

````

`````

`````{py:class} FolderRecord
:canonical: panelini.panels.ai.history.store.FolderRecord

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord
```

````{py:attribute} id
:canonical: panelini.panels.ai.history.store.FolderRecord.id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.id
```

````

````{py:attribute} user_id
:canonical: panelini.panels.ai.history.store.FolderRecord.user_id
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.user_id
```

````

````{py:attribute} name
:canonical: panelini.panels.ai.history.store.FolderRecord.name
:type: str
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.name
```

````

````{py:attribute} parent_id
:canonical: panelini.panels.ai.history.store.FolderRecord.parent_id
:type: str | None
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.parent_id
```

````

````{py:attribute} created_at
:canonical: panelini.panels.ai.history.store.FolderRecord.created_at
:type: datetime.datetime
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.created_at
```

````

````{py:attribute} updated_at
:canonical: panelini.panels.ai.history.store.FolderRecord.updated_at
:type: datetime.datetime
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.history.store.FolderRecord.updated_at
```

````

`````

`````{py:class} ChatHistoryStore
:canonical: panelini.panels.ai.history.store.ChatHistoryStore

Bases: {py:obj}`abc.ABC`

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore
```

````{py:method} list_conversations(user_id: str, include_archived: bool = False) -> list[panelini.panels.ai.history.store.ConversationRecord]
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.list_conversations
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.list_conversations
```

````

````{py:method} search_conversations(user_id: str, query: str, include_archived: bool = False) -> list[panelini.panels.ai.history.store.ConversationRecord]
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.search_conversations
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.search_conversations
```

````

````{py:method} get_conversation(user_id: str, conversation_id: str) -> panelini.panels.ai.history.store.ConversationRecord | None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.get_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.get_conversation
```

````

````{py:method} create_conversation(user_id: str, title: str = DEFAULT_TITLE, folder_ids: collections.abc.Sequence[str] = ()) -> panelini.panels.ai.history.store.ConversationRecord
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.create_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.create_conversation
```

````

````{py:method} rename_conversation(user_id: str, conversation_id: str, title: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.rename_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.rename_conversation
```

````

````{py:method} delete_conversation(user_id: str, conversation_id: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.delete_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.delete_conversation
```

````

````{py:method} move_conversation(user_id: str, conversation_id: str, folder_id: str | None) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.move_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.move_conversation
```

````

````{py:method} link_conversation(user_id: str, conversation_id: str, folder_id: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.link_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.link_conversation
```

````

````{py:method} unlink_conversation(user_id: str, conversation_id: str, folder_id: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.unlink_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.unlink_conversation
```

````

````{py:method} fork_conversation(user_id: str, conversation_id: str, title: str | None = None) -> panelini.panels.ai.history.store.ConversationRecord
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.fork_conversation
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.fork_conversation
```

````

````{py:method} set_pinned(user_id: str, conversation_id: str, pinned: bool) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.set_pinned
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.set_pinned
```

````

````{py:method} set_archived(user_id: str, conversation_id: str, archived: bool) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.set_archived
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.set_archived
```

````

````{py:method} append_message(user_id: str, conversation_id: str, role: str, content: str, extra: dict[str, typing.Any] | None = None, parent_message_id: str | None = None, attachments: collections.abc.Sequence[panelini.panels.ai.history.store.Attachment] = ()) -> panelini.panels.ai.history.store.MessageRecord
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.append_message
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.append_message
```

````

````{py:method} load_messages(user_id: str, conversation_id: str) -> list[panelini.panels.ai.history.store.MessageRecord]
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.load_messages
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.load_messages
```

````

````{py:method} list_folders(user_id: str) -> list[panelini.panels.ai.history.store.FolderRecord]
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.list_folders
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.list_folders
```

````

````{py:method} create_folder(user_id: str, name: str, parent_id: str | None = None) -> panelini.panels.ai.history.store.FolderRecord
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.create_folder
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.create_folder
```

````

````{py:method} rename_folder(user_id: str, folder_id: str, name: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.rename_folder
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.rename_folder
```

````

````{py:method} move_folder(user_id: str, folder_id: str, parent_id: str | None) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.move_folder
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.move_folder
```

````

````{py:method} delete_folder(user_id: str, folder_id: str) -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.delete_folder
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.delete_folder
```

````

````{py:method} close() -> None
:canonical: panelini.panels.ai.history.store.ChatHistoryStore.close
:abstractmethod:

```{autodoc2-docstring} panelini.panels.ai.history.store.ChatHistoryStore.close
```

````

`````

````{py:function} validate_role(role: str) -> None
:canonical: panelini.panels.ai.history.store.validate_role

```{autodoc2-docstring} panelini.panels.ai.history.store.validate_role
```
````
