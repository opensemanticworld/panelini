"""OSW environment-variable gating helpers and credential wiring.

The OSW connector tools need six environment variables to function:

- ``OSW_DOMAIN``, ``OSW_USER``, ``OSW_PASSWORD``: used by
  :class:`osw.express.OswExpress` to authenticate against the wiki.
- ``BLAZEGRAPH_ENDPOINT``, ``BLAZEGRAPH_USER``, ``BLAZEGRAPH_PASSWORD``:
  used by the SPARQL-backed tools.

When any are missing, :func:`make_osw_tools` skips registration so the
example remains runnable without an OSW instance. When a caller invokes
:func:`build_osw_express` directly without the three auth vars,
:func:`check_osw_auth_env` raises a :class:`RuntimeError` listing the
missing variables; this replaces osw's default
``input()``/``getpass.getpass()`` prompt (unsuitable for a Panel server)
with an explicit startup-time failure.

The :class:`EnvCredentialManager` subclass lies to ``OswExpress`` about
whether credentials are persisted (by reporting in-memory credentials
as if they were on disk via :meth:`iri_in_file`). This skips the entire
``get_credential -> add_credential -> save_credentials_to_file`` branch
in ``OswExpress.__init__``, so credentials stay in RAM and no YAML file
is written.
"""

from __future__ import annotations

import os
from typing import Any

from osw.auth import CredentialManager  # type: ignore[import-untyped]
from osw.express import OswExpress  # type: ignore[import-untyped]

OSW_AUTH_ENV_VARS: tuple[str, ...] = (
    "OSW_DOMAIN",
    "OSW_USER",
    "OSW_PASSWORD",
)
"""Env vars required to authenticate against the OSW wiki without prompting."""

OSW_ENV_VARS: tuple[str, ...] = (
    *OSW_AUTH_ENV_VARS,
    "BLAZEGRAPH_ENDPOINT",
    "BLAZEGRAPH_USER",
    "BLAZEGRAPH_PASSWORD",
)
"""All env vars required for the full OSW tool suite to work."""


def osw_env_present() -> bool:
    """Return ``True`` iff every variable in :data:`OSW_ENV_VARS` is set to a non-empty value."""
    return all(os.environ.get(var) for var in OSW_ENV_VARS)


def check_osw_auth_env() -> None:
    """Validate that all three OSW auth env vars are set.

    Raises:
        RuntimeError: listing the missing variables. The message is crafted
            to be actionable inside a ``.env`` file.
    """
    missing = [var for var in OSW_AUTH_ENV_VARS if not os.environ.get(var)]
    if missing:
        msg = (
            "OSW tools require these environment variables to be set: "
            f"{', '.join(OSW_AUTH_ENV_VARS)}. Missing: {', '.join(missing)}."
        )
        raise RuntimeError(msg)


class EnvCredentialManager(CredentialManager):  # type: ignore[no-any-unimported]
    """CredentialManager that treats in-memory creds as file-persisted.

    ``OswExpress.__init__`` decides whether to prompt for a username and
    password by calling ``cred_mngr.iri_in_file(domain)``. The default
    implementation only checks a YAML file on disk. We override it to
    also accept in-memory credentials, which lets us build a
    ``CredentialManager`` from env vars without ever writing a YAML file.
    """

    def iri_in_file(self, iri: str) -> bool:
        return bool(self.iri_in_credentials(iri) or super().iri_in_file(iri))


def build_osw_express(domain: str | None = None) -> Any:
    """Construct an ``OswExpress`` client using env-var credentials.

    Args:
        domain: Override the ``OSW_DOMAIN`` env var. Mostly useful for
            tests; the default is the env var.

    Returns:
        A ready-to-use ``OswExpress`` that will not prompt and will not
        write a credentials file.

    Raises:
        RuntimeError: If any of ``OSW_DOMAIN``, ``OSW_USER``, or
            ``OSW_PASSWORD`` is missing.
    """
    check_osw_auth_env()

    resolved_domain = domain or os.environ["OSW_DOMAIN"]
    username = os.environ["OSW_USER"]
    password = os.environ["OSW_PASSWORD"]

    mgr = EnvCredentialManager()
    mgr.add_credential(
        CredentialManager.UserPwdCredential(
            iri=resolved_domain,
            username=username,
            password=password,
        )
    )
    return OswExpress(domain=resolved_domain, cred_mngr=mgr)
