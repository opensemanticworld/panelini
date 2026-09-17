"""Browser-persisted chat history: localStorage behind the store interface."""

from __future__ import annotations

from typing import Any

import panel as pn

from panelini.components.local_storage import LocalStoragePane

from .document import InMemoryHistoryStore

DEFAULT_NAMESPACE = "panelini-ai-history"


class LocalStorageHistoryStore(InMemoryHistoryStore):
    """Per-session store mirroring documents into the browser's localStorage.

    The in-memory mirror carries all semantics; :attr:`pane` must be
    rendered in the page for persistence (one localStorage entry per
    document, keyed ``"<kind>:<id>"``). Existing browser entries hydrate
    the mirror on page load, mirror entries winning on conflict, and
    :attr:`on_loaded` fires so the sidebar can refresh. Without a rendered
    pane the store behaves exactly like :class:`InMemoryHistoryStore`.
    History is per browser: no cross-device access, roughly 5MB quota.
    """

    def __init__(self, namespace: str = DEFAULT_NAMESPACE) -> None:
        super().__init__()
        # Called once the browser data arrived (set by the chat UI).
        self.on_loaded: Any = None
        self.pane = LocalStoragePane(namespace=namespace)
        self._hydrated = False
        self.pane.param.watch(self._on_browser_loaded, "loaded")

    # -- persistence ----------------------------------------------------------

    def _push(self) -> None:
        """Mirror every document into the pane (and thus localStorage)."""
        with self._lock:
            entries = {f"{kind}:{doc_id}": doc for kind, docs in self._docs.items() for doc_id, doc in docs.items()}
        self.pane.entries = entries

    def _put(self, user_id: str, kind: str, document: dict[str, Any]) -> None:
        super()._put(user_id, kind, document)
        self._push()

    def _delete(self, user_id: str, kind: str, doc_id: str) -> None:
        super()._delete(user_id, kind, doc_id)
        self._push()

    # -- hydration --------------------------------------------------------------

    def _on_browser_loaded(self, event: Any) -> None:
        if self._hydrated or not event.new:
            return
        self._hydrated = True
        with self._lock:
            for key, document in (self.pane.entries or {}).items():
                kind, _, doc_id = key.partition(":")
                known = self._docs.get(kind)
                if known is not None and doc_id and doc_id not in known and isinstance(document, dict):
                    known[doc_id] = document
        if self.on_loaded is None:
            return
        # The event arrives while the browser is still rendering the page;
        # mutating widgets before the session finished loading corrupts it
        # (the next client message kills the websocket). Defer to onload.
        curdoc = pn.state.curdoc
        if curdoc is not None and curdoc.session_context is not None:
            pn.state.onload(self.on_loaded)
        else:
            self.on_loaded()
