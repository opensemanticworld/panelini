"""Backend logic for AI interface management and message processing."""

from collections.abc import AsyncGenerator
from pathlib import Path
from typing import Any

from langchain_core.messages import AIMessage, HumanMessage, ToolMessage

from .utils.ai_interface import AiInterface, create_interface
from .utils.config import ModelConfig, ProviderConfig, load_config


class AiBackend:
    """Backend for AI interface management and message processing.

    This class handles all the business logic for:
    - AI interface creation and management
    - Provider and model configuration
    - Tool execution
    - Message processing with/without tools
    - Conversation history management
    """

    def __init__(
        self,
        system_message: str = "You are a helpful assistant.",
        config_path: Path | None = None,
    ) -> None:
        """Initialize the AI backend.

        Args:
            system_message: System message for the AI assistant.
            config_path: Optional path to a custom config.yml file.
        """
        self._system_message = system_message
        self._config = load_config(config_path)

        # Build provider_models dict: {ProviderConfig: {display_name: ModelConfig}}
        self.provider_models: dict[ProviderConfig, dict[str, ModelConfig]] = {}
        for provider in self._config.providers.values():
            self.provider_models[provider] = {m.name: m for m in provider.models}

        # Current configuration
        self.current_provider = self._config.default_provider
        self.current_model: ModelConfig = self.current_provider.models[0]
        self.current_temperature = 0.7
        self.current_tools: list[Any] = []

        # AI interface
        self.ai_interface: AiInterface | None = None
        self._create_ai_interface()

    def get_available_providers(self) -> dict[str, ProviderConfig]:
        """Get available providers with display names.

        Returns:
            Dictionary mapping display names to provider configs
        """
        return {p.display_name: p for p in self._config.providers.values()}

    def get_available_models(self, provider: ProviderConfig) -> dict[str, ModelConfig]:
        """Get available models for a specific provider.

        Args:
            provider: The provider to get models for

        Returns:
            Dictionary mapping model display names to ModelConfig instances
        """
        return self.provider_models[provider]

    def get_provider_display_name(self, provider: ProviderConfig) -> str:
        """Get display name for a provider.

        Args:
            provider: The provider config

        Returns:
            Human-readable provider name
        """
        return provider.display_name

    def _create_ai_interface(self, preserve_history: bool = True) -> None:
        """Create AI interface based on current configuration.

        Args:
            preserve_history: If True, preserve conversation history from existing interface
        """
        # Save existing conversation history if requested
        existing_history: list[Any] = []
        if preserve_history and self.ai_interface is not None:
            existing_history = self.ai_interface.conversation_history.copy()

        # Create new interface using the unified factory
        self.ai_interface = create_interface(
            provider=self.current_provider,
            model=self.current_model,
            temperature=self.current_temperature,
            system_message=self._system_message,
            tools=self.current_tools,
        )

        # Restore conversation history
        if preserve_history and existing_history:
            self.ai_interface.conversation_history = existing_history

    def update_provider(self, provider: ProviderConfig) -> tuple[str, str]:
        """Update the current provider and reset model.

        Args:
            provider: New provider to use

        Returns:
            Tuple of (provider_display_name, model_value) for UI notification
        """
        self.current_provider = provider

        # Update model to first available for new provider
        self.current_model = provider.models[0]

        # Recreate interface (clear history when changing providers)
        self._create_ai_interface(preserve_history=False)

        return (
            provider.display_name,
            self.current_model.value,
        )

    def update_model(self, model: ModelConfig) -> str:
        """Update the current model.

        Args:
            model: New model to use

        Returns:
            Model value for UI notification
        """
        self.current_model = model
        self._create_ai_interface(preserve_history=True)
        return model.value

    def update_temperature(self, temperature: float) -> None:
        """Update the temperature setting.

        Args:
            temperature: New temperature value
        """
        self.current_temperature = temperature
        self._create_ai_interface(preserve_history=True)

    def update_tools(self, tools: list[Any]) -> int:
        """Update the available tools.

        Args:
            tools: List of tool instances

        Returns:
            Number of tools enabled
        """
        self.current_tools = tools
        self._create_ai_interface(preserve_history=True)
        return len(tools)

    def clear_history(self) -> None:
        """Clear the conversation history."""
        if self.ai_interface:
            self.ai_interface.clear_history()

    def get_conversation_history(self) -> list[Any]:
        """Get the current conversation history.

        Returns:
            List of conversation messages
        """
        if self.ai_interface:
            return self.ai_interface.conversation_history
        return []

    def set_conversation_history(self, history: list[Any]) -> None:
        """Set the conversation history.

        Args:
            history: List of conversation messages
        """
        if self.ai_interface:
            self.ai_interface.conversation_history = history

    async def process_message(self, message: str, use_tools: bool = False) -> dict[str, Any]:
        """Process a user message and return AI response with preview updates.

        Args:
            message: User's message
            use_tools: Whether to enable tool execution

        Returns:
            Dictionary with 'response' (AI text) and 'preview_updates' (list of preview update dicts)
        """
        if not self.ai_interface:
            return {"response": "Error: AI interface not initialized", "preview_updates": []}

        self.preview_updates: list[dict[str, str]] = []  # Reset preview updates

        if not use_tools:
            # No tools enabled, use simple response
            response = await self.ai_interface.get_response(message, stream=False)
            response_text = response if isinstance(response, str) else str(response)
            return {"response": response_text, "preview_updates": []}
        else:
            # Tools are enabled, use tool-aware response with execution loop
            response_text = await self._handle_message_with_tools(message)
            return {"response": response_text, "preview_updates": self.preview_updates}

    async def stream_message(self, message: str) -> AsyncGenerator[str, None]:
        """Yield response token chunks for a non-tool message.

        Args:
            message: The user's message

        Yields:
            String chunks of the AI response
        """
        if not self.ai_interface:
            yield "Error: AI interface not initialized"
            return
        result = await self.ai_interface.get_response(message, stream=True)
        # stream=True always returns an AsyncGenerator; guard for type safety
        if isinstance(result, str):
            yield result
            return
        async for chunk in result:
            yield chunk

    async def _handle_message_with_tools(self, user_message: str) -> str:
        """Handle messages with tool execution support.

        Args:
            user_message: The user's message

        Returns:
            Final AI response after tool execution
        """
        if not self.ai_interface:
            return "Error: AI interface not initialized"

        max_iterations = 10  # Prevent infinite loops
        iteration = 0

        while iteration < max_iterations:
            # Get response with potential tool calls
            if iteration == 0:
                # First iteration: send user message
                response_data = await self.ai_interface.get_response_with_tools(user_message)
            else:
                # Subsequent iterations: invoke model with existing conversation history
                response = await self.ai_interface.model.ainvoke(self.ai_interface.conversation_history)
                response_text = response.content if isinstance(response.content, str) else str(response.content)
                tool_calls = getattr(response, "tool_calls", [])

                # Add AI response to history
                self.ai_interface.conversation_history.append(AIMessage(content=response_text, tool_calls=tool_calls))

                response_data = {"text": response_text, "tool_calls": tool_calls}

            # If no tool calls, return the text response
            if not response_data.get("tool_calls"):
                return str(response_data.get("text", ""))

            # Execute tool calls
            tool_results = await self._execute_tool_calls(response_data["tool_calls"])

            # Add tool results to conversation history
            self.ai_interface.conversation_history.extend(tool_results)

            iteration += 1

        return "Maximum tool execution iterations reached."

    async def _execute_tool_calls(self, tool_calls: list[Any]) -> list[ToolMessage]:
        """Execute a list of tool calls.

        Args:
            tool_calls: List of tool call dictionaries

        Returns:
            List of ToolMessage objects with results
        """
        tool_results = []

        for tool_call in tool_calls:
            tool_name = tool_call.get("name")
            tool_args = tool_call.get("args", {})
            tool_id = tool_call.get("id", "")

            # Find the tool in current tools
            tool = None
            for current_tool in self.current_tools:
                if current_tool.name == tool_name:
                    tool = current_tool
                    break

            if tool:
                try:
                    # Execute the tool
                    result = await tool._arun(**tool_args)
                    result_str = str(result)

                    # Check if this is a preview update
                    if result_str.startswith("PREVIEW_UPDATE::"):
                        parts = result_str.split("::", 2)
                        if len(parts) == 3:
                            _, preview_title, preview_content = parts
                            # Store preview update for frontend
                            self.preview_updates.append({"title": preview_title, "content": preview_content})
                            # Return success message to AI
                            result_str = f"Successfully updated preview window with title '{preview_title}'"

                    tool_results.append(
                        ToolMessage(
                            content=result_str,
                            tool_call_id=tool_id,
                        )
                    )
                except Exception as e:
                    tool_results.append(
                        ToolMessage(
                            content=f"Error executing tool: {e!s}",
                            tool_call_id=tool_id,
                        )
                    )

        return tool_results

    def export_chat_data(self, provider: str, model: str, temperature: float, messages: list[Any]) -> dict[str, Any]:
        """Export chat data for download.

        Args:
            provider: Current provider name
            model: Current model name
            temperature: Current temperature
            messages: List of chat messages

        Returns:
            Dictionary with chat data ready for JSON export
        """
        from datetime import datetime

        chat_data: dict[str, Any] = {
            "timestamp": datetime.now().isoformat(),
            "provider": provider,
            "model": model,
            "temperature": temperature,
            "messages": messages,
        }

        # Include conversation history
        if self.ai_interface:
            chat_data["conversation_history"] = [
                {
                    "type": msg.__class__.__name__,
                    "content": msg.content if hasattr(msg, "content") else str(msg),
                }
                for msg in self.ai_interface.conversation_history
            ]

        return chat_data

    def restore_chat_data(self, chat_data: dict[str, Any]) -> None:
        """Restore conversation history from chat data.

        Args:
            chat_data: Dictionary with chat data from JSON import
        """
        # Clear existing history
        self.clear_history()

        # Restore conversation history if available
        if "conversation_history" in chat_data and self.ai_interface:
            for hist_msg in chat_data["conversation_history"]:
                if hist_msg["type"] == "HumanMessage":
                    self.ai_interface.conversation_history.append(HumanMessage(content=hist_msg["content"]))
                elif hist_msg["type"] == "AIMessage":
                    self.ai_interface.conversation_history.append(AIMessage(content=hist_msg["content"]))
