"""Invisible pane syncing a dict param with the browser's localStorage."""

from typing import ClassVar

import param
from panel.reactive import ReactiveHTML


class LocalStoragePane(ReactiveHTML):
    """Two-way bridge between a ``data`` dict and ``window.localStorage``.

    Entries are stored as ``"<namespace>:<key>"`` with JSON values. On
    render the browser's existing entries hydrate :attr:`data` and
    :attr:`loaded` flips to *True*; afterwards Python-side assignments to
    :attr:`data` write through (keys removed from the dict are removed
    from localStorage). Data is per browser (~5MB quota); two tabs on the
    same namespace do not sync live, the last write wins.
    """

    namespace = param.String(default="panelini", doc="localStorage key prefix.")

    # not named "data": that collides with ReactiveHTML's own data model
    entries = param.Dict(default={}, doc="Mirrored entries (key to JSON-serializable value).")

    loaded = param.Boolean(default=False, doc="True once the browser hydrated ``entries``.")

    _template = '<div id="local_storage" style="display:none"></div>'

    _scripts: ClassVar[dict[str, str]] = {
        "render": """
            state.hydrating = true
            const prefix = data.namespace + ':'
            const entries = {}
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i)
                if (key.startsWith(prefix)) {
                    try { entries[key.slice(prefix.length)] = JSON.parse(window.localStorage.getItem(key)) }
                    catch (e) { /* skip foreign or corrupt entries */ }
                }
            }
            data.entries = entries
            data.loaded = true
            state.hydrating = false
        """,
        "entries": """
            if (!state.hydrating) {
                const prefix = data.namespace + ':'
                const entries = data.entries || {}
                for (const [key, value] of Object.entries(entries)) {
                    window.localStorage.setItem(prefix + key, JSON.stringify(value))
                }
                for (let i = window.localStorage.length - 1; i >= 0; i--) {
                    const key = window.localStorage.key(i)
                    if (key.startsWith(prefix) && !(key.slice(prefix.length) in entries)) {
                        window.localStorage.removeItem(key)
                    }
                }
            }
        """,
    }
