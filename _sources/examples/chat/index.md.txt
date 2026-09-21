# Chat

LLM chat panels - drop-in, tool-augmented, and multi-tab.

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} AI chat - minimal
:link: ai_chat_min
:link-type: doc
:img-top: /_static/media/ai/chat_min_overview.webp
Drop an LLM chat into a Panelini dashboard with one flag.
:::

:::{grid-item-card} AI chat - custom tool
:link: ai_chat_custom_tool
:link-type: doc
:img-top: /_static/media/ai/chat_custom_tool_feature.webp
Hook a LangChain `BaseTool` (a local key-value store) into the chat.
:::

:::{grid-item-card} AI chat - multi-tab
:link: ai_chat_multi_tab
:link-type: doc
:img-top: /_static/media/ai/chat_multi_tab_feature.webp
Host two independent chats in synced tabs with `jslink`.
:::

:::{grid-item-card} AI chat - no preview or tools
:link: ai_chat_no_preview_no_tools
:link-type: doc
:img-top: /_static/media/ai/chat_no_preview_no_tools_feature.webp
The chat fills the full width with the preview and tools sidebar disabled.
:::

:::{grid-item-card} DrawAI - drawio beautifier
:link: drawai_beautify
:link-type: doc
:img-top: /_static/media/ai/drawai_beautify_feature.png
Upload a drawio diagram and beautify it with an LLM, with a before and after compare.
:::

::::

```{toctree}
:hidden:

ai_chat_min
ai_chat_custom_tool
ai_chat_multi_tab
ai_chat_no_preview_no_tools
drawai_beautify
```
