"""Backward-compatibility shim — moved to panelini.panels.eln_connectors.osw.

All symbols are re-exported from the new location. Direct imports from this
module still work but will emit a :class:`DeprecationWarning`.
"""

from __future__ import annotations

import os
import warnings as _warnings
from typing import Any

from osw.express import OswExpress  # type: ignore[import-untyped]

from panelini.panels.eln_connectors.osw.connection import (
    OSW_AUTH_ENV_VARS,
    OSW_ENV_VARS,
    EnvCredentialManager,
    OswConnection,
)

_warnings.warn(
    "panelini.panels.ai.plot.utils.osw_env has moved to panelini.panels.eln_connectors.osw. Update your imports.",
    DeprecationWarning,
    stacklevel=2,
)


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

    This shim re-implements the function locally so that existing tests
    which ``patch("...osw_env.OswExpress")`` on this module still work.
    """
    check_osw_auth_env()
    resolved_domain = domain or os.environ["OSW_DOMAIN"]
    username = os.environ["OSW_USER"]
    password = os.environ["OSW_PASSWORD"]
    mgr = EnvCredentialManager()
    mgr.add_credential(
        __import__("osw.auth", fromlist=["CredentialManager"]).CredentialManager.UserPwdCredential(
            iri=resolved_domain,
            username=username,
            password=password,
        )
    )
    return OswExpress(domain=resolved_domain, cred_mngr=mgr)


__all__ = [
    "OSW_AUTH_ENV_VARS",
    "OSW_ENV_VARS",
    "EnvCredentialManager",
    "build_osw_express",
    "check_osw_auth_env",
    "osw_env_present",
]
