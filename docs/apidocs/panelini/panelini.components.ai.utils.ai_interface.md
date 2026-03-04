# {py:mod}`panelini.components.ai.utils.ai_interface`

```{py:module} panelini.components.ai.utils.ai_interface
```

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`AiInterface <panelini.components.ai.utils.ai_interface.AiInterface>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`create_interface <panelini.components.ai.utils.ai_interface.create_interface>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.create_interface
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`PROVIDER_CLASS_REGISTRY <panelini.components.ai.utils.ai_interface.PROVIDER_CLASS_REGISTRY>`
  - ```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.PROVIDER_CLASS_REGISTRY
    :summary:
    ```
````

### API

````{py:data} PROVIDER_CLASS_REGISTRY
:canonical: panelini.components.ai.utils.ai_interface.PROVIDER_CLASS_REGISTRY
:type: dict[str, panelini.components.ai.utils.ai_interface._ClientFactory]
:value: >
   None

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.PROVIDER_CLASS_REGISTRY
```

````

`````{py:class} AiInterface(provider: panelini.components.ai.utils.config.ProviderConfig, model_name: str | panelini.components.ai.utils.config.ModelConfig, temperature: float = 0.7, max_tokens: int = 4096, tools: list[langchain_core.tools.BaseTool] | None = None, system_message: str | None = None)
:canonical: panelini.components.ai.utils.ai_interface.AiInterface

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface.__init__
```

````{py:method} add_tool(tool: langchain_core.tools.BaseTool) -> None
:canonical: panelini.components.ai.utils.ai_interface.AiInterface.add_tool

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface.add_tool
```

````

````{py:method} clear_history() -> None
:canonical: panelini.components.ai.utils.ai_interface.AiInterface.clear_history

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface.clear_history
```

````

````{py:method} get_response(user_message: str, stream: bool = True) -> str | collections.abc.AsyncGenerator[str, None]
:canonical: panelini.components.ai.utils.ai_interface.AiInterface.get_response
:async:

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface.get_response
```

````

````{py:method} get_response_with_tools(user_message: str) -> dict[str, typing.Any]
:canonical: panelini.components.ai.utils.ai_interface.AiInterface.get_response_with_tools
:async:

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.AiInterface.get_response_with_tools
```

````

`````

````{py:function} create_interface(provider: panelini.components.ai.utils.config.ProviderConfig, model: str | panelini.components.ai.utils.config.ModelConfig, temperature: float = 0.7, max_tokens: int = 4096, system_message: str | None = None, tools: list[langchain_core.tools.BaseTool] | None = None) -> panelini.components.ai.utils.ai_interface.AiInterface
:canonical: panelini.components.ai.utils.ai_interface.create_interface

```{autodoc2-docstring} panelini.components.ai.utils.ai_interface.create_interface
```
````
