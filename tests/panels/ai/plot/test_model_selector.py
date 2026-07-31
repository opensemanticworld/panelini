"""Tests for panelini.panels.ai.plot.model_selector.

The right-sidebar plot context lets the user pick a model to *regenerate*
the last plot. It is a pure-Python UI builder - all LLM calls are mocked.
"""

from __future__ import annotations

from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from PIL import Image

from panelini.panels.ai.plot.model_selector import (
    _DEFAULT_PLOT_MODEL_NAME,
    build_plot_context_sidebar,
    pick_default_plot_model,
    strip_code_fences,
)
from panelini.panels.ai.plot.panel import PlotPanel
from panelini.panels.ai.utils.config import ModelConfig, ProviderConfig

pytestmark = pytest.mark.ai


def _provider(models: tuple[ModelConfig, ...]) -> ProviderConfig:
    return ProviderConfig(
        key="anthropic",
        display_name="Anthropic",
        client_type="anthropic",
        env_vars={"api_key": "x", "endpoint": "y"},
        models=models,
    )


@pytest.fixture(autouse=True)
def _env_vars(monkeypatch: pytest.MonkeyPatch) -> None:
    """Provide env vars referenced by default_config.yml so load_config works."""
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    monkeypatch.setenv("ANTHROPIC_ENDPOINT", "https://example.invalid")
    monkeypatch.setenv("AZURE_OPENAI_API_KEY", "x")
    monkeypatch.setenv("AZURE_OPENAI_ENDPOINT", "https://azure.invalid")
    monkeypatch.setenv("AZURE_OPENAI_API_VERSION", "2024-01-01")


class TestPickDefaultPlotModel:
    def test_returns_sonnet_4_6_when_present(self) -> None:
        sonnet = ModelConfig(name=_DEFAULT_PLOT_MODEL_NAME, value="anthropic/claude-sonnet-4-5")
        opus = ModelConfig(name="Claude Opus 4.7", value="anthropic/claude-opus-4-7")
        provider = _provider((opus, sonnet))
        assert pick_default_plot_model(provider) == sonnet

    def test_falls_back_to_first_model_when_sonnet_4_6_missing(self) -> None:
        opus = ModelConfig(name="Claude Opus 4.7", value="anthropic/claude-opus-4-7")
        haiku = ModelConfig(name="Claude Haiku 4.5", value="anthropic/claude-haiku-4-5")
        provider = _provider((opus, haiku))
        assert pick_default_plot_model(provider) == opus


class TestStripCodeFences:
    def test_passthrough_plain_code(self) -> None:
        assert strip_code_fences("import numpy as np\nprint(1)") == "import numpy as np\nprint(1)"

    def test_strips_python_fence(self) -> None:
        assert strip_code_fences("```python\nprint(1)\n```") == "print(1)"

    def test_strips_bare_fence(self) -> None:
        assert strip_code_fences("```\nprint(1)\n```") == "print(1)"

    def test_strips_with_surrounding_whitespace(self) -> None:
        assert strip_code_fences("  ```python\nprint(1)\n```  ") == "print(1)"


class TestBuildPlotContextSidebar:
    def test_returns_non_empty_list(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        config_path = Path(__file__).resolve().parents[4] / "src/panelini/panels/ai/default_config.yml"
        objects = build_plot_context_sidebar(panel, config_path=config_path)
        assert len(objects) > 0

    def test_registers_on_plot_callback(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        config_path = Path(__file__).resolve().parents[4] / "src/panelini/panels/ai/default_config.yml"
        build_plot_context_sidebar(panel, config_path=config_path)
        assert len(panel._on_plot_callbacks) >= 1

    def test_regenerate_invokes_selected_model_and_plots(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        """Clicking Regenerate: LLM rewrites code, PlotPanel.plot_by_code runs it."""

        def _write_png(*, src: str, dest: str) -> None:
            Image.new("RGB", (1, 1)).save(dest)

        with (
            patch("panelini.panels.ai.plot.panel.SandboxSession") as mock_cls,
            patch("panelini.panels.ai.plot.model_selector.create_interface") as mock_create,
        ):
            session = mock_cls.return_value.__enter__.return_value
            session.run.return_value = MagicMock(stdout="regen-stdout")
            session.copy_from_runtime.side_effect = _write_png

            fake_interface = MagicMock()
            fake_interface.model = MagicMock()
            fake_interface.model.ainvoke = AsyncMock(return_value=MagicMock(content="```python\nprint('regen')\n```"))
            mock_create.return_value = fake_interface

            panel = PlotPanel(data_path=tmp_path)
            panel.current_python_code = "print('orig')"

            config_path = Path(__file__).resolve().parents[4] / "src/panelini/panels/ai/default_config.yml"
            from panelini.panels.ai.plot.model_selector import regenerate_plot

            result = regenerate_plot(
                panel,
                user_intent="tweak it",
                config_path=config_path,
            )

        assert "Image successfully plotted" in result
        # Selected model was used
        assert mock_create.called
        # New code is what the LLM returned (fences stripped)
        assert panel.current_python_code == "print('regen')"

    def test_regenerate_without_current_code_returns_message(self, tmp_path: Path) -> None:
        panel = PlotPanel(data_path=tmp_path)
        config_path = Path(__file__).resolve().parents[4] / "src/panelini/panels/ai/default_config.yml"
        from panelini.panels.ai.plot.model_selector import regenerate_plot

        result = regenerate_plot(panel, user_intent="anything", config_path=config_path)
        assert "no plot" in result.lower() or "no code" in result.lower()
