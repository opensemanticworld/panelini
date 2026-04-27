"""OSW environment-variable gating helpers and credential wiring.

This module re-exports credential utilities from :mod:`..connection` and
provides the legacy ``build_osw_express()`` and ``osw_env_present()``
functions for backward compatibility within the new package location.
"""

from __future__ import annotations

import os
from typing import Any

from ..connection import (
    OSW_AUTH_ENV_VARS,
    OSW_ENV_VARS,
    EnvCredentialManager,
    OswConnection,
)

__all__ = [
    "OSW_AUTH_ENV_VARS",
    "OSW_ENV_VARS",
    "EnvCredentialManager",
    "build_osw_express",
    "check_osw_auth_env",
    "osw_env_present",
]


def osw_env_present() -> bool:
    """Return ``True`` iff every variable in :data:`OSW_ENV_VARS` is set to a non-empty value."""
    return OswConnection.all_env_present()


def check_osw_auth_env() -> None:
    """Validate that all three OSW auth env vars are set.

    Raises:
        RuntimeError: listing the missing variables.
    """
    missing = [var for var in OSW_AUTH_ENV_VARS if not os.environ.get(var)]
    if missing:
        msg = (
            "OSW tools require these environment variables to be set: "
            f"{', '.join(OSW_AUTH_ENV_VARS)}. Missing: {', '.join(missing)}."
        )
        raise RuntimeError(msg)


def build_osw_express(domain: str | None = None) -> Any:
    """Construct an ``OswExpress`` client using env-var credentials.

    Args:
        domain: Override the ``OSW_DOMAIN`` env var.

    Returns:
        A ready-to-use ``OswExpress``.

    Raises:
        RuntimeError: If any auth env var is missing.
    """
    check_osw_auth_env()
    conn = OswConnection(
        domain=domain or os.environ["OSW_DOMAIN"],
        username=os.environ["OSW_USER"],
        password=os.environ["OSW_PASSWORD"],
    )
    return conn.build_osw_express()
