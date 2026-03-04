"""Configuration loader for LLM provider and model definitions."""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from pathlib import Path

import yaml  # type: ignore[import-untyped]

_ENV_VAR_RE = re.compile(r"\$\{([^}]+)}")

# Bundled default configuration that ships with the package
_DEFAULT_CONFIG_PATH = Path(__file__).resolve().parent.parent / "default_config.yml"


@dataclass(frozen=True)
class ModelConfig:
    """A single model available under a provider.

    Frozen so it is hashable and can be used as a Panel Select value.
    """

    name: str
    value: str

    def __str__(self) -> str:
        return self.name


@dataclass(frozen=True, eq=False)
class ProviderConfig:
    """Configuration for a single LLM provider.

    Equality and hashing are based on ``key`` only so instances can be
    used as dictionary keys despite containing a ``dict`` field.
    """

    key: str
    display_name: str
    client_type: str
    env_vars: dict[str, str]
    models: tuple[ModelConfig, ...]

    # Provide a `.value` property so it can be used like the old enum
    @property
    def value(self) -> str:
        return self.key

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, ProviderConfig):
            return NotImplemented
        return self.key == other.key

    def __hash__(self) -> int:
        return hash(self.key)

    def __str__(self) -> str:
        return self.display_name


@dataclass
class AppConfig:
    """Top-level application configuration."""

    providers: dict[str, ProviderConfig] = field(default_factory=dict)

    @property
    def default_provider(self) -> ProviderConfig:
        """Return the first configured provider."""
        return next(iter(self.providers.values()))


def _resolve_env_var(value: str) -> str:
    """Resolve ``${ENV_VAR}`` placeholders in *value* from the environment.

    Every ``${…}`` token is replaced with the corresponding environment
    variable.  If the variable is not set, a :class:`ValueError` is raised.
    Strings without any ``${…}`` pattern are returned unchanged.
    """

    def _replacer(match: re.Match[str]) -> str:
        var_name = match.group(1)
        env_value = os.getenv(var_name)
        if env_value is None:
            msg = f"Environment variable '{var_name}' referenced in config.yml is not set"
            raise ValueError(msg)
        return env_value

    return _ENV_VAR_RE.sub(_replacer, value)


def _find_config_path() -> Path:
    """Locate ``config.yml`` or ``config.yaml`` for the AI component.

    The search order is:
    1. ``PANELINI_AI_CONFIG_PATH`` environment variable (if set).
    2. Walk upward from the directory containing this module until
       ``config.yml`` or ``config.yaml`` is found or the filesystem
       root is reached.
    3. Fall back to the bundled ``default_config.yml``.
    """
    env_path = os.getenv("PANELINI_AI_CONFIG_PATH")
    if env_path:
        p = Path(env_path)
        if p.is_file():
            return p
        msg = f"PANELINI_AI_CONFIG_PATH points to a non-existent file: {env_path}"
        raise FileNotFoundError(msg)

    current = Path(__file__).resolve().parent
    while True:
        for name in ("config.yml", "config.yaml"):
            candidate = current / name
            if candidate.is_file():
                return candidate
        parent = current.parent
        if parent == current:
            break
        current = parent

    # Fall back to bundled default
    return _DEFAULT_CONFIG_PATH


def load_config(path: Path | None = None) -> AppConfig:
    """Load and validate the YAML configuration file.

    Args:
        path: Explicit path to config.yml.  When *None* the file is
              discovered automatically via :func:`_find_config_path`.

    Returns:
        Parsed :class:`AppConfig` instance.

    Raises:
        FileNotFoundError: If the configuration file cannot be located.
        ValueError: If the YAML structure is invalid.
    """
    config_path = path or _find_config_path()

    with open(config_path) as fh:
        raw: dict = yaml.safe_load(fh)

    if not isinstance(raw, dict) or "providers" not in raw:
        msg = f"config.yml must contain a top-level 'providers' mapping (got {type(raw).__name__})"
        raise ValueError(msg)

    providers: dict[str, ProviderConfig] = {}

    for key, prov_data in raw["providers"].items():
        if not isinstance(prov_data, dict):
            msg = f"Provider '{key}' must be a mapping"
            raise TypeError(msg)

        models = tuple(
            ModelConfig(name=m.get("name", m["value"]), value=m["value"]) for m in prov_data.get("models", [])
        )

        if not models:
            msg = f"Provider '{key}' must define at least one model"
            raise ValueError(msg)

        raw_env_vars: dict[str, str] = prov_data.get("env_vars", {})
        resolved_env_vars = {k: _resolve_env_var(v) for k, v in raw_env_vars.items()}

        providers[key] = ProviderConfig(
            key=key,
            display_name=prov_data.get("display_name", key),
            client_type=prov_data.get("client_type", key),
            env_vars=resolved_env_vars,
            models=models,
        )

    if not providers:
        msg = "config.yml must define at least one provider"
        raise ValueError(msg)

    return AppConfig(providers=providers)
