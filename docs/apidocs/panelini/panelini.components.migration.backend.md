# {py:mod}`panelini.components.migration.backend`

```{py:module} panelini.components.migration.backend
```

```{autodoc2-docstring} panelini.components.migration.backend
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`AiBackend <panelini.components.migration.backend.AiBackend>`
  - ```{autodoc2-docstring} panelini.components.migration.backend.AiBackend
    :summary:
    ```
````

### API

`````{py:class} AiBackend()
:canonical: panelini.components.migration.backend.AiBackend

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.__init__
```

````{py:method} get_available_providers() -> dict[str, llm4eln_digest.utils.config.ProviderConfig]
:canonical: panelini.components.migration.backend.AiBackend.get_available_providers

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.get_available_providers
```

````

````{py:method} get_available_models(provider: llm4eln_digest.utils.config.ProviderConfig) -> dict[str, llm4eln_digest.utils.config.ModelConfig]
:canonical: panelini.components.migration.backend.AiBackend.get_available_models

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.get_available_models
```

````

````{py:method} get_provider_display_name(provider: llm4eln_digest.utils.config.ProviderConfig) -> str
:canonical: panelini.components.migration.backend.AiBackend.get_provider_display_name

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.get_provider_display_name
```

````

````{py:method} update_provider(provider: llm4eln_digest.utils.config.ProviderConfig) -> tuple[str, str]
:canonical: panelini.components.migration.backend.AiBackend.update_provider

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.update_provider
```

````

````{py:method} update_model(model: llm4eln_digest.utils.config.ModelConfig) -> str
:canonical: panelini.components.migration.backend.AiBackend.update_model

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.update_model
```

````

````{py:method} update_temperature(temperature: float) -> None
:canonical: panelini.components.migration.backend.AiBackend.update_temperature

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.update_temperature
```

````

````{py:method} update_tools(tools: list[typing.Any]) -> int
:canonical: panelini.components.migration.backend.AiBackend.update_tools

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.update_tools
```

````

````{py:method} clear_history() -> None
:canonical: panelini.components.migration.backend.AiBackend.clear_history

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.clear_history
```

````

````{py:method} get_conversation_history() -> list[typing.Any]
:canonical: panelini.components.migration.backend.AiBackend.get_conversation_history

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.get_conversation_history
```

````

````{py:method} set_conversation_history(history: list[typing.Any]) -> None
:canonical: panelini.components.migration.backend.AiBackend.set_conversation_history

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.set_conversation_history
```

````

````{py:method} process_message(message: str, use_tools: bool = False) -> dict[str, typing.Any]
:canonical: panelini.components.migration.backend.AiBackend.process_message
:async:

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.process_message
```

````

````{py:method} stream_message(message: str) -> collections.abc.AsyncGenerator[str, None]
:canonical: panelini.components.migration.backend.AiBackend.stream_message
:async:

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.stream_message
```

````

````{py:method} export_chat_data(provider: str, model: str, temperature: float, messages: list[typing.Any]) -> dict[str, typing.Any]
:canonical: panelini.components.migration.backend.AiBackend.export_chat_data

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.export_chat_data
```

````

````{py:method} restore_chat_data(chat_data: dict[str, typing.Any]) -> None
:canonical: panelini.components.migration.backend.AiBackend.restore_chat_data

```{autodoc2-docstring} panelini.components.migration.backend.AiBackend.restore_chat_data
```

````

`````
