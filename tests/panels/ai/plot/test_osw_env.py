"""Tests for panelini.panels.ai.plot.utils.osw_env."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from panelini.panels.ai.plot.utils.osw_env import (
    OSW_AUTH_ENV_VARS,
    OSW_ENV_VARS,
    EnvCredentialManager,
    build_osw_express,
    check_osw_auth_env,
    osw_env_present,
)

pytestmark = pytest.mark.ai


class TestOswEnvPresent:
    def test_all_set(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_ENV_VARS:
            monkeypatch.setenv(var, "value")
        assert osw_env_present() is True

    def test_one_missing_returns_false(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_ENV_VARS:
            monkeypatch.setenv(var, "value")
        monkeypatch.delenv(OSW_ENV_VARS[-1], raising=False)
        assert osw_env_present() is False

    def test_all_missing_returns_false(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_ENV_VARS:
            monkeypatch.delenv(var, raising=False)
        assert osw_env_present() is False

    def test_empty_string_treated_as_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_ENV_VARS:
            monkeypatch.setenv(var, "value")
        monkeypatch.setenv(OSW_ENV_VARS[0], "")
        assert osw_env_present() is False


class TestOswEnvVarsConstant:
    def test_auth_vars_exact(self) -> None:
        assert set(OSW_AUTH_ENV_VARS) == {"OSW_DOMAIN", "OSW_USER", "OSW_PASSWORD"}

    def test_full_set_includes_blazegraph_and_auth(self) -> None:
        assert set(OSW_ENV_VARS) == {
            "OSW_DOMAIN",
            "OSW_USER",
            "OSW_PASSWORD",
            "BLAZEGRAPH_ENDPOINT",
            "BLAZEGRAPH_USER",
            "BLAZEGRAPH_PASSWORD",
        }


class TestCheckOswAuthEnv:
    def test_raises_when_user_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("OSW_DOMAIN", "example.org")
        monkeypatch.setenv("OSW_PASSWORD", "p")
        monkeypatch.delenv("OSW_USER", raising=False)
        with pytest.raises(RuntimeError, match="OSW_USER"):
            check_osw_auth_env()

    def test_raises_when_domain_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.delenv("OSW_DOMAIN", raising=False)
        monkeypatch.setenv("OSW_USER", "u")
        monkeypatch.setenv("OSW_PASSWORD", "p")
        with pytest.raises(RuntimeError, match="OSW_DOMAIN"):
            check_osw_auth_env()

    def test_raises_lists_all_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_AUTH_ENV_VARS:
            monkeypatch.delenv(var, raising=False)
        with pytest.raises(RuntimeError) as excinfo:
            check_osw_auth_env()
        msg = str(excinfo.value)
        for var in OSW_AUTH_ENV_VARS:
            assert var in msg

    def test_empty_string_treated_as_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("OSW_DOMAIN", "example.org")
        monkeypatch.setenv("OSW_USER", "")
        monkeypatch.setenv("OSW_PASSWORD", "p")
        with pytest.raises(RuntimeError, match="OSW_USER"):
            check_osw_auth_env()

    def test_passes_when_all_set(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("OSW_DOMAIN", "example.org")
        monkeypatch.setenv("OSW_USER", "u")
        monkeypatch.setenv("OSW_PASSWORD", "p")
        check_osw_auth_env()  # no exception


class TestEnvCredentialManager:
    def test_iri_in_file_true_when_credential_in_memory(self) -> None:
        from osw.auth import CredentialManager

        mgr = EnvCredentialManager()
        mgr.add_credential(
            CredentialManager.UserPwdCredential(iri="example.org", username="u", password="p")  # noqa: S106
        )
        # The critical override: OswExpress checks iri_in_file to decide whether to prompt.
        assert mgr.iri_in_file("example.org") is True

    def test_iri_in_file_false_when_credential_not_in_memory(self) -> None:
        mgr = EnvCredentialManager()
        assert mgr.iri_in_file("example.org") is False

    def test_is_subclass_of_credential_manager(self) -> None:
        from osw.auth import CredentialManager

        assert issubclass(EnvCredentialManager, CredentialManager)


class TestBuildOswExpress:
    def test_raises_when_auth_env_missing(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for var in OSW_AUTH_ENV_VARS:
            monkeypatch.delenv(var, raising=False)
        with pytest.raises(RuntimeError):
            build_osw_express()

    def test_passes_env_credentials_to_oswexpress(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("OSW_DOMAIN", "example.org")
        monkeypatch.setenv("OSW_USER", "alice")
        monkeypatch.setenv("OSW_PASSWORD", "hunter2")

        with patch("panelini.panels.ai.plot.utils.osw_env.OswExpress") as mock_osw_cls:
            mock_osw_cls.return_value = MagicMock()
            build_osw_express()

        assert mock_osw_cls.called
        kwargs = mock_osw_cls.call_args.kwargs
        assert kwargs["domain"] == "example.org"
        mgr = kwargs["cred_mngr"]
        assert isinstance(mgr, EnvCredentialManager)
        # The credential for this domain must be registered so iri_in_file() is True
        assert mgr.iri_in_file("example.org") is True

    def test_explicit_domain_overrides_env(self, monkeypatch: pytest.MonkeyPatch) -> None:
        monkeypatch.setenv("OSW_DOMAIN", "ignored.example")
        monkeypatch.setenv("OSW_USER", "alice")
        monkeypatch.setenv("OSW_PASSWORD", "hunter2")

        with patch("panelini.panels.ai.plot.utils.osw_env.OswExpress") as mock_osw_cls:
            mock_osw_cls.return_value = MagicMock()
            build_osw_express(domain="explicit.example")

        assert mock_osw_cls.call_args.kwargs["domain"] == "explicit.example"


class TestNoCredentialsFileWritten:
    """End-to-end contract: building the client from env vars must NEVER write
    an ``accounts.pwd.yaml`` to disk, and must NEVER invoke
    ``CredentialManager.get_credential`` (which would prompt via stdin)."""

    def test_save_credentials_to_file_is_not_invoked(self, monkeypatch: pytest.MonkeyPatch, tmp_path) -> None:  # type: ignore[no-untyped-def]
        from osw.wtsite import WtSite

        monkeypatch.setenv("OSW_DOMAIN", "example.org")
        monkeypatch.setenv("OSW_USER", "alice")
        monkeypatch.setenv("OSW_PASSWORD", "hunter2")
        monkeypatch.chdir(tmp_path)

        fake_response = MagicMock()
        fake_response.status_code = 200

        with (
            patch("osw.express.requests.get", return_value=fake_response),
            patch("osw.express.WtSite", return_value=MagicMock(spec=WtSite)),
            patch.object(EnvCredentialManager, "save_credentials_to_file") as save_spy,
            patch.object(EnvCredentialManager, "get_credential") as ask_spy,
        ):
            build_osw_express()

        save_spy.assert_not_called()
        ask_spy.assert_not_called()
        cred_file = tmp_path / "osw_files" / "accounts.pwd.yaml"
        assert not cred_file.exists(), f"unexpected credentials file at {cred_file}"
