"""Tests for panelini.components.ai.utils.config."""

from __future__ import annotations

from pathlib import Path

import pytest

from panelini.components.ai.utils.config import (
    AppConfig,
    ModelConfig,
    ProviderConfig,
    _find_config_path,
    _resolve_env_var,
    load_config,
    parse_model_value,
)

pytestmark = pytest.mark.ai


# ── _resolve_env_var ──────────────────────────────────────────────────────


class TestResolveEnvVar:
    def test_no_placeholder(self) -> None:
        assert _resolve_env_var("plain-text") == "plain-text"

    def test_single_placeholder(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("MY_VAR", "hello")
        assert _resolve_env_var("${MY_VAR}") == "hello"

    def test_missing_env_var_raises(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.delenv("NONEXISTENT_VAR", raising=False)
        with pytest.raises(ValueError, match="NONEXISTENT_VAR"):
            _resolve_env_var("${NONEXISTENT_VAR}")


# ── _find_config_path ─────────────────────────────────────────────────────


class TestFindConfigPath:
    def test_env_var_override(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        cfg = tmp_path / "custom.yml"
        cfg.write_text("providers: {}")
        monkeypatch.setenv("PANELINI_AI_CONFIG_PATH", str(cfg))
        assert _find_config_path() == cfg

    def test_env_var_missing_file_raises(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("PANELINI_AI_CONFIG_PATH", "/does/not/exist.yml")
        with pytest.raises(FileNotFoundError, match="PANELINI_AI_CONFIG_PATH"):
            _find_config_path()

    def test_yaml_extension_discovered(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        """A ``config.yaml`` file is discovered when ``config.yml`` is absent."""
        cfg = tmp_path / "config.yaml"
        cfg.write_text("providers: {}")
        monkeypatch.setenv("PANELINI_AI_CONFIG_PATH", str(cfg))
        assert _find_config_path() == cfg

    def test_falls_back_to_bundled_default(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.delenv("PANELINI_AI_CONFIG_PATH", raising=False)
        # _find_config_path walks upward first, so it may find a repo-level
        # config.yml.  Either way it must return a real file.
        result = _find_config_path()
        assert result.is_file()
        assert result.name in ("config.yml", "config.yaml", "default_config.yml")


# ── load_config ───────────────────────────────────────────────────────────


class TestLoadConfig:
    def test_load_explicit_path(self, config_yml_path: Path) -> None:
        cfg = load_config(config_yml_path)
        assert isinstance(cfg, AppConfig)
        assert "test" in cfg.providers
        prov = cfg.providers["test"]
        assert prov.display_name == "Test Provider"
        assert len(prov.models) == 1
        assert prov.models[0].value == "test-model"

    def test_load_bundled_default(self, monkeypatch: pytest.MonkeyPatch) -> None:
        """Bundled default_config.yml can be parsed (env vars stubbed)."""
        monkeypatch.setenv("ANTHROPIC_API_KEY", "fake")
        monkeypatch.setenv("ANTHROPIC_ENDPOINT", "https://localhost")
        monkeypatch.setenv("AZURE_OPENAI_API_KEY", "fake")
        monkeypatch.setenv("AZURE_OPENAI_ENDPOINT", "https://localhost")
        monkeypatch.setenv("AZURE_OPENAI_API_VERSION", "2024-01-01")

        from panelini.components.ai.utils.config import _DEFAULT_CONFIG_PATH

        cfg = load_config(_DEFAULT_CONFIG_PATH)
        assert len(cfg.providers) >= 1

    def test_env_var_resolution(self, env_var_config_yml: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("TEST_API_KEY", "secret")
        monkeypatch.setenv("TEST_ENDPOINT", "https://example.com")
        cfg = load_config(env_var_config_yml)
        prov = cfg.providers["test"]
        assert prov.env_vars["api_key"] == "secret"
        assert prov.env_vars["endpoint"] == "https://example.com"

    def test_invalid_yaml_raises(self, tmp_path: Path) -> None:
        bad = tmp_path / "config.yml"
        bad.write_text("not_providers: {}")
        with pytest.raises(ValueError, match="providers"):
            load_config(bad)

    def test_no_models_raises(self, tmp_path: Path) -> None:
        bad = tmp_path / "config.yml"
        bad.write_text("providers:\n  p:\n    display_name: P\n    client_type: x\n    models: []\n")
        with pytest.raises(ValueError, match="at least one model"):
            load_config(bad)

    def test_default_provider(self, config_yml_path: Path) -> None:
        cfg = load_config(config_yml_path)
        assert cfg.default_provider.key == "test"


# ── dataclass behaviour ──────────────────────────────────────────────────


class TestDataclasses:
    def test_model_config_str(self) -> None:
        m = ModelConfig(name="GPT-4", value="gpt-4")
        assert str(m) == "GPT-4"

    def test_provider_config_equality_by_key(self) -> None:
        a = ProviderConfig(key="x", display_name="X", client_type="c", env_vars={}, models=())
        b = ProviderConfig(key="x", display_name="Y", client_type="d", env_vars={}, models=())
        assert a == b
        assert hash(a) == hash(b)

    def test_provider_config_value_property(self) -> None:
        p = ProviderConfig(key="mykey", display_name="D", client_type="c", env_vars={}, models=())
        assert p.value == "mykey"


# ── parse_model_value ────────────────────────────────────────────────────


class TestParseModelValue:
    def test_prefixed_value(self) -> None:
        assert parse_model_value("anthropic/claude-sonnet-4-5") == ("anthropic", "claude-sonnet-4-5")

    def test_bare_value(self) -> None:
        assert parse_model_value("claude-sonnet-4-5") == ("", "claude-sonnet-4-5")

    def test_azure_prefix(self) -> None:
        assert parse_model_value("azure/gpt-4o-2024-11-20") == ("azure", "gpt-4o-2024-11-20")

    def test_unknown_prefix(self) -> None:
        assert parse_model_value("openai/gpt-4") == ("openai", "gpt-4")


# ── client_type derivation ───────────────────────────────────────────────


class TestClientTypeDerivation:
    def test_explicit_client_type_takes_precedence(self, tmp_path: Path) -> None:
        """When client_type is set explicitly, it wins over model prefix."""
        content = """\
providers:
  test:
    display_name: "Test"
    client_type: "anthropic"
    env_vars:
      api_key: "key"
      endpoint: "https://localhost"
    models:
      - name: "M1"
        value: "azure/some-model"
"""
        p = tmp_path / "config.yml"
        p.write_text(content)
        cfg = load_config(p)
        assert cfg.providers["test"].client_type == "anthropic"

    def test_derived_from_anthropic_prefix(self, tmp_path: Path) -> None:
        """client_type is derived from the anthropic/ model prefix."""
        content = """\
providers:
  test:
    display_name: "Test"
    env_vars:
      api_key: "key"
      endpoint: "https://localhost"
    models:
      - name: "M1"
        value: "anthropic/claude-sonnet-4-5"
"""
        p = tmp_path / "config.yml"
        p.write_text(content)
        cfg = load_config(p)
        assert cfg.providers["test"].client_type == "anthropic"

    def test_derived_from_azure_openai_prefix(self, tmp_path: Path) -> None:
        """client_type is derived from the azure_openai/ model prefix."""
        content = """\
providers:
  test:
    display_name: "Test"
    env_vars:
      api_key: "key"
      endpoint: "https://localhost"
    models:
      - name: "M1"
        value: "azure_openai/gpt-4o"
"""
        p = tmp_path / "config.yml"
        p.write_text(content)
        cfg = load_config(p)
        assert cfg.providers["test"].client_type == "azure_openai"

    def test_bare_model_falls_back_to_key(self, tmp_path: Path) -> None:
        """Bare model value with no client_type falls back to provider key."""
        content = """\
providers:
  my_provider:
    display_name: "Test"
    env_vars:
      api_key: "key"
      endpoint: "https://localhost"
    models:
      - name: "M1"
        value: "some-model"
"""
        p = tmp_path / "config.yml"
        p.write_text(content)
        cfg = load_config(p)
        assert cfg.providers["my_provider"].client_type == "my_provider"
