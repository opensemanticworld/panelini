# {py:mod}`panelini.panels.ai.frontend`

```{py:module} panelini.panels.ai.frontend
```

```{autodoc2-docstring} panelini.panels.ai.frontend
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`AiChat <panelini.panels.ai.frontend.AiChat>`
  - ```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat
    :summary:
    ```
````

### API

`````{py:class} AiChat(system_message: str = 'You are a helpful assistant.', welcome_message: str | None = None, config_path: pathlib.Path | None = None, tools: list | None = None, show_tools: bool = True, show_preview: bool = False, history_store: panelini.panels.ai.history.store.ChatHistoryStore | str | None = None, history_view: str = 'tree', user_resolver: panelini.user.UserResolver | None = None, user_id: str | None = None, cookie_pane: panel.viewable.Viewable | None = None)
:canonical: panelini.panels.ai.frontend.AiChat

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.__init__
```

````{py:property} chat_interface
:canonical: panelini.panels.ai.frontend.AiChat.chat_interface
:type: panel.chat.ChatInterface

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.chat_interface
```

````

````{py:property} sidebar_objects
:canonical: panelini.panels.ai.frontend.AiChat.sidebar_objects
:type: list[panel.viewable.Viewable]

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.sidebar_objects
```

````

````{py:property} main_objects
:canonical: panelini.panels.ai.frontend.AiChat.main_objects
:type: list[panel.viewable.Viewable]

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.main_objects
```

````

````{py:method} delete_conversation(conversation_id: str, clear_redo: bool = True) -> None
:canonical: panelini.panels.ai.frontend.AiChat.delete_conversation

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.delete_conversation
```

````

````{py:method} batch_update_tools(tool_names_checked: set[str]) -> int
:canonical: panelini.panels.ai.frontend.AiChat.batch_update_tools

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.batch_update_tools
```

````

````{py:method} start_new_chat(materialize: bool = True) -> None
:canonical: panelini.panels.ai.frontend.AiChat.start_new_chat

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.start_new_chat
```

````

````{py:method} open_conversation(conversation_id: str) -> None
:canonical: panelini.panels.ai.frontend.AiChat.open_conversation

```{autodoc2-docstring} panelini.panels.ai.frontend.AiChat.open_conversation
```

````

`````
