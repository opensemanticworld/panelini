"""OSW connection data model.

:class:`OswConnection` holds all credentials and endpoint information needed
to communicate with an OpenSemanticWorld instance. It replaces the global
``build_osw_express()`` pattern that read ``os.environ`` directly — each
connection instance owns its credentials, enabling multi-instance setups.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

from osw.auth import CredentialManager  # type: ignore[import-untyped]
from osw.express import OswExpress  # type: ignore[import-untyped]


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


OSW_AUTH_ENV_VARS: tuple[str, ...] = (
    "OSW_DOMAIN",
    "OSW_USER",
    "OSW_PASSWORD",
)

OSW_ENV_VARS: tuple[str, ...] = (
    *OSW_AUTH_ENV_VARS,
    "BLAZEGRAPH_ENDPOINT",
    "BLAZEGRAPH_USER",
    "BLAZEGRAPH_PASSWORD",
)


@dataclass
class OswConnection:
    """Credentials and endpoint config for a single OSW instance.

    Use :meth:`from_env` to create from environment variables, or construct
    directly with explicit values (e.g. from UI widgets).
    """

    domain: str
    username: str
    password: str
    blazegraph_endpoint: str | None = None
    blazegraph_user: str | None = None
    blazegraph_password: str | None = None

    def has_sparql(self) -> bool:
        """True iff all three Blazegraph fields are set."""
        return all([self.blazegraph_endpoint, self.blazegraph_user, self.blazegraph_password])

    def build_osw_express(self) -> Any:
        """Construct an ``OswExpress`` client from this connection's credentials.

        Returns a ready-to-use ``OswExpress`` that will not prompt for input
        and will not write a credentials file.
        """
        mgr = EnvCredentialManager()
        mgr.add_credential(
            CredentialManager.UserPwdCredential(
                iri=self.domain,
                username=self.username,
                password=self.password,
            )
        )
        return OswExpress(domain=self.domain, cred_mngr=mgr)

    @classmethod
    def from_env(cls) -> OswConnection | None:
        """Build from environment variables; return ``None`` if any required auth var is missing."""
        if not all(os.environ.get(var) for var in OSW_AUTH_ENV_VARS):
            return None
        return cls(
            domain=os.environ["OSW_DOMAIN"],
            username=os.environ["OSW_USER"],
            password=os.environ["OSW_PASSWORD"],
            blazegraph_endpoint=os.environ.get("BLAZEGRAPH_ENDPOINT") or None,
            blazegraph_user=os.environ.get("BLAZEGRAPH_USER") or None,
            blazegraph_password=os.environ.get("BLAZEGRAPH_PASSWORD") or None,
        )

    @classmethod
    def all_env_present(cls) -> bool:
        """Return ``True`` iff every variable in :data:`OSW_ENV_VARS` is set."""
        return all(os.environ.get(var) for var in OSW_ENV_VARS)
