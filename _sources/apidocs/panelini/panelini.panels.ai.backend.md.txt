# {py:mod}`panelini.panels.ai.backend`

```{py:module} panelini.panels.ai.backend
```

```{autodoc2-docstring} panelini.panels.ai.backend
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`AiBackend <panelini.panels.ai.backend.AiBackend>`
  - ```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend
    :summary:
    ```
````

### API

`````{py:class} AiBackend(system_message: str = 'You are a helpful assistant.', config_path: pathlib.Path | None = None, history_store: panelini.panels.ai.history.store.ChatHistoryStore | None = None, user_id: str | None = None)
:canonical: panelini.panels.ai.backend.AiBackend

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.__init__
```

````{py:method} get_available_providers() -> dict[str, panelini.panels.ai.utils.config.ProviderConfig]
:canonical: panelini.panels.ai.backend.AiBackend.get_available_providers

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.get_available_providers
```

````

````{py:method} get_available_models(provider: panelini.panels.ai.utils.config.ProviderConfig) -> dict[str, panelini.panels.ai.utils.config.ModelConfig]
:canonical: panelini.panels.ai.backend.AiBackend.get_available_models

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.get_available_models
```

````

````{py:method} get_provider_display_name(provider: panelini.panels.ai.utils.config.ProviderConfig) -> str
:canonical: panelini.panels.ai.backend.AiBackend.get_provider_display_name

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.get_provider_display_name
```

````

````{py:method} update_provider(provider: panelini.panels.ai.utils.config.ProviderConfig) -> tuple[str, str]
:canonical: panelini.panels.ai.backend.AiBackend.update_provider

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.update_provider
```

````

````{py:method} update_model(model: panelini.panels.ai.utils.config.ModelConfig) -> str
:canonical: panelini.panels.ai.backend.AiBackend.update_model

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.update_model
```

````

````{py:method} update_temperature(temperature: float) -> None
:canonical: panelini.panels.ai.backend.AiBackend.update_temperature

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.update_temperature
```

````

````{py:method} update_tools(tools: list[typing.Any]) -> int
:canonical: panelini.panels.ai.backend.AiBackend.update_tools

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.update_tools
```

````

````{py:method} create_conversation_id() -> str | None
:canonical: panelini.panels.ai.backend.AiBackend.create_conversation_id

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.create_conversation_id
```

````

````{py:method} persist_exchange(user_text: str, ai_text: str, conversation_id: str | None = None) -> None
:canonical: panelini.panels.ai.backend.AiBackend.persist_exchange

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.persist_exchange
```

````

````{py:method} load_conversation(conversation_id: str) -> list[tuple[str, str]]
:canonical: panelini.panels.ai.backend.AiBackend.load_conversation

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.load_conversation
```

````

````{py:method} history_from_pairs(pairs: list[tuple[str, str]]) -> list[typing.Any]
:canonical: panelini.panels.ai.backend.AiBackend.history_from_pairs
:staticmethod:

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.history_from_pairs
```

````

````{py:method} start_new_conversation() -> None
:canonical: panelini.panels.ai.backend.AiBackend.start_new_conversation

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.start_new_conversation
```

````

````{py:method} persist_imported_history(title: str) -> None
:canonical: panelini.panels.ai.backend.AiBackend.persist_imported_history

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.persist_imported_history
```

````

````{py:method} clear_history() -> None
:canonical: panelini.panels.ai.backend.AiBackend.clear_history

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.clear_history
```

````

````{py:method} get_conversation_history() -> list[typing.Any]
:canonical: panelini.panels.ai.backend.AiBackend.get_conversation_history

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.get_conversation_history
```

````

````{py:method} set_conversation_history(history: list[typing.Any]) -> None
:canonical: panelini.panels.ai.backend.AiBackend.set_conversation_history

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.set_conversation_history
```

````

````{py:method} process_message(message: str, use_tools: bool = False, history: list[typing.Any] | None = None) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.backend.AiBackend.process_message
:async:

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.process_message
```

````

````{py:method} stream_message(message: str, history: list[typing.Any] | None = None) -> collections.abc.AsyncGenerator[str, None]
:canonical: panelini.panels.ai.backend.AiBackend.stream_message
:async:

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.stream_message
```

````

````{py:method} export_chat_data(provider: str, model: str, temperature: float) -> dict[str, typing.Any]
:canonical: panelini.panels.ai.backend.AiBackend.export_chat_data

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.export_chat_data
```

````

````{py:method} restore_chat_data(chat_data: dict[str, typing.Any]) -> list[tuple[str, str]]
:canonical: panelini.panels.ai.backend.AiBackend.restore_chat_data

```{autodoc2-docstring} panelini.panels.ai.backend.AiBackend.restore_chat_data
```

````

`````
