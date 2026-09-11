# {py:mod}`panelini.ai_testing`

```{py:module} panelini.ai_testing
```

```{autodoc2-docstring} panelini.ai_testing
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`BaseMessage <panelini.ai_testing.BaseMessage>`
  -
* - {py:obj}`AIMessage <panelini.ai_testing.AIMessage>`
  -
* - {py:obj}`HumanMessage <panelini.ai_testing.HumanMessage>`
  -
* - {py:obj}`SystemMessage <panelini.ai_testing.SystemMessage>`
  -
* - {py:obj}`ToolMessage <panelini.ai_testing.ToolMessage>`
  -
* - {py:obj}`StubChatModel <panelini.ai_testing.StubChatModel>`
  - ```{autodoc2-docstring} panelini.ai_testing.StubChatModel
    :summary:
    ```
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`install <panelini.ai_testing.install>`
  - ```{autodoc2-docstring} panelini.ai_testing.install
    :summary:
    ```
````

### Data

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`DEFAULT_REPLY <panelini.ai_testing.DEFAULT_REPLY>`
  - ```{autodoc2-docstring} panelini.ai_testing.DEFAULT_REPLY
    :summary:
    ```
````

### API

````{py:data} DEFAULT_REPLY
:canonical: panelini.ai_testing.DEFAULT_REPLY
:value: >
   'This is a simulated reply: the demo runs without a language model, so the answer is canned. Run the ...'

```{autodoc2-docstring} panelini.ai_testing.DEFAULT_REPLY
```

````

```{py:class} BaseMessage(content: typing.Any = '', **kwargs: typing.Any)
:canonical: panelini.ai_testing.BaseMessage

Bases: {py:obj}`panelini.ai_testing._Message`

```

```{py:class} AIMessage(content: typing.Any = '', **kwargs: typing.Any)
:canonical: panelini.ai_testing.AIMessage

Bases: {py:obj}`panelini.ai_testing._Message`

```

```{py:class} HumanMessage(content: typing.Any = '', **kwargs: typing.Any)
:canonical: panelini.ai_testing.HumanMessage

Bases: {py:obj}`panelini.ai_testing._Message`

```

```{py:class} SystemMessage(content: typing.Any = '', **kwargs: typing.Any)
:canonical: panelini.ai_testing.SystemMessage

Bases: {py:obj}`panelini.ai_testing._Message`

```

```{py:class} ToolMessage(content: typing.Any = '', **kwargs: typing.Any)
:canonical: panelini.ai_testing.ToolMessage

Bases: {py:obj}`panelini.ai_testing._Message`

```

`````{py:class} StubChatModel(reply: str = DEFAULT_REPLY, chunk_size: int = 12, delay: float = 0.04)
:canonical: panelini.ai_testing.StubChatModel

```{autodoc2-docstring} panelini.ai_testing.StubChatModel
```

```{rubric} Initialization
```

```{autodoc2-docstring} panelini.ai_testing.StubChatModel.__init__
```

````{py:method} bind_tools(tools: typing.Any) -> panelini.ai_testing.StubChatModel
:canonical: panelini.ai_testing.StubChatModel.bind_tools

```{autodoc2-docstring} panelini.ai_testing.StubChatModel.bind_tools
```

````

````{py:method} ainvoke(messages: typing.Any = None, **kwargs: typing.Any) -> panelini.ai_testing.AIMessage
:canonical: panelini.ai_testing.StubChatModel.ainvoke
:async:

```{autodoc2-docstring} panelini.ai_testing.StubChatModel.ainvoke
```

````

````{py:method} astream(messages: typing.Any = None, **kwargs: typing.Any) -> typing.Any
:canonical: panelini.ai_testing.StubChatModel.astream
:async:

```{autodoc2-docstring} panelini.ai_testing.StubChatModel.astream
```

````

`````

````{py:function} install(reply: str = DEFAULT_REPLY) -> None
:canonical: panelini.ai_testing.install

```{autodoc2-docstring} panelini.ai_testing.install
```
````
