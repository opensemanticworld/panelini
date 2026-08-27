"""Right-sidebar plot context panel: model picker + Regenerate button.

The chat still drives the primary plotting flow. This module adds a
*one-shot* override: after the chat has produced a plot, the user can
pick a different model and re-ask the LLM to rewrite the last plot's
code. The rewritten code runs through the same sandbox as before.

Design goals:
- The main chat agent remains a single-LLM-call tool loop (no change).
- The tool signature of ``plot_by_code`` is unchanged.
- Model selection is isolated to the right sidebar; it does not leak
  into ``AiChat`` or ``AiBackend``.
"""

from __future__ import annotations

import asyncio
import re
from pathlib import Path
from typing import Any

import panel as pn
from langchain_core.messages import HumanMessage

from ..utils.ai_interface import create_interface
from ..utils.config import AppConfig, ModelConfig, ProviderConfig, load_config
from .panel import PlotPanel

_DEFAULT_PLOT_MODEL_NAME = "Claude Sonnet 4.6"

_REGEN_SYSTEM_MESSAGE = (
    "You rewrite matplotlib plotting scripts for an llm_sandbox runtime. "
    "Return ONLY the new Python code - no prose, no backticks. "
    "The script MUST save the figure to '/sandbox/output.png'. "
    "Use numpy, pandas, scipy, matplotlib. Do not import libraries "
    "outside this set."
)

_FENCE_RE = re.compile(
    r"^\s*```(?:python|py)?\s*\n?(.*?)\n?```\s*$",
    re.DOTALL | re.IGNORECASE,
)


def pick_default_plot_model(provider: ProviderConfig) -> ModelConfig:
    """Return ``Claude Sonnet 4.6`` if configured, else the first model."""
    for m in provider.models:
        if m.name == _DEFAULT_PLOT_MODEL_NAME:
            return m
    return provider.models[0]


def strip_code_fences(text: str) -> str:
    """Remove a surrounding ```python … ``` block, if present."""
    match = _FENCE_RE.match(text)
    if match:
        return match.group(1).strip()
    return text.strip()


def _invoke_model_sync(interface: Any, prompt: str) -> str:
    """Run ``interface.model.ainvoke`` from sync code.

    Uses ``asyncio.run`` when no loop is running; otherwise delegates to
    a fresh loop in a worker thread so it works from Panel callbacks.
    """

    async def _call() -> str:
        response = await interface.model.ainvoke([HumanMessage(content=prompt)])
        content = response.content
        return content if isinstance(content, str) else str(content)

    try:
        asyncio.get_running_loop()
    except RuntimeError:
        return asyncio.run(_call())

    # Running loop (e.g. Panel/Tornado). Run in a worker thread.
    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        return pool.submit(lambda: asyncio.run(_call())).result()


def _load_config(config_path: Path | None) -> AppConfig:
    return load_config(config_path) if config_path is not None else load_config()


def regenerate_plot(
    panel: PlotPanel,
    user_intent: str,
    *,
    provider: ProviderConfig | None = None,
    model: ModelConfig | None = None,
    config_path: Path | None = None,
) -> str:
    """Rewrite ``panel.current_python_code`` with the selected model and replot.

    Returns the string returned by ``panel.plot_by_code`` so the caller
    can surface it in the UI.
    """
    if not panel.current_python_code:
        return "No code to regenerate - run a plot from chat first."

    config = _load_config(config_path)
    if provider is None:
        provider = config.default_provider
    if model is None:
        model = pick_default_plot_model(provider)

    interface = create_interface(
        provider=provider,
        model=model,
        temperature=0.2,
        max_tokens=2048,
        system_message=_REGEN_SYSTEM_MESSAGE,
    )

    prompt = (
        "Here is the previous plotting script:\n"
        "```python\n"
        f"{panel.current_python_code}\n"
        "```\n\n"
        f"Apply this change, then return the full new script:\n{user_intent}"
    )

    raw = _invoke_model_sync(interface, prompt)
    new_code = strip_code_fences(raw)

    return panel.plot_by_code(code=new_code)


def build_plot_context_sidebar(
    panel: PlotPanel,
    config_path: Path | None = None,
) -> list[pn.viewable.Viewable]:
    """Build the right-sidebar UI: code display, model picker, Regenerate.

    Re-reads ``panel.current_python_code`` on every plot event via
    ``panel.on_plot``.
    """
    config = _load_config(config_path)
    provider = config.default_provider
    default_model = pick_default_plot_model(provider)

    code_md = pn.pane.Markdown(
        "_No plot yet._",
        sizing_mode="stretch_width",
    )

    model_select = pn.widgets.Select(
        name="Plot model",
        options=list(provider.models),
        value=default_model,
        sizing_mode="stretch_width",
    )

    intent_input = pn.widgets.TextAreaInput(
        name="What should change?",
        placeholder="e.g. use log scale on y-axis",
        height=80,
        sizing_mode="stretch_width",
    )

    regen_button = pn.widgets.Button(
        name="Regenerate plot",
        button_type="primary",
        sizing_mode="stretch_width",
    )

    status_md = pn.pane.Markdown("", sizing_mode="stretch_width")

    def _refresh_code() -> None:
        if panel.current_python_code:
            code_md.object = f"```python\n{panel.current_python_code}\n```"
        else:
            code_md.object = "_No plot yet._"

    panel.on_plot(_refresh_code)

    def _on_regen(_event: Any) -> None:
        if not panel.current_python_code:
            status_md.object = "_No plot yet - run one from chat first._"
            return
        intent = (intent_input.value or "").strip()
        if not intent:
            status_md.object = "_Describe what should change first._"
            return
        status_md.object = "_Regenerating…_"
        try:
            result = regenerate_plot(
                panel,
                user_intent=intent,
                provider=provider,
                model=model_select.value,
                config_path=config_path,
            )
        except Exception as e:
            status_md.object = f"_Error: {e}_"
            return
        status_md.object = f"_{result}_"

    regen_button.on_click(_on_regen)

    card = pn.Card(
        pn.pane.Markdown("### Current plot code"),
        code_md,
        pn.pane.Markdown("### Regenerate with"),
        model_select,
        intent_input,
        regen_button,
        status_md,
        title="Plot context",
        collapsed=False,
        sizing_mode="stretch_width",
    )

    return [card]


__all__ = [
    "build_plot_context_sidebar",
    "pick_default_plot_model",
    "regenerate_plot",
    "strip_code_fences",
]
