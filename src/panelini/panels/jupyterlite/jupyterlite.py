"""JupyterLite panel -- embeds a full Jupyter environment in an iframe."""

import json
from typing import Any, ClassVar

import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()


class JupyterLite(AnyWidgetComponent):
    """A JupyterLite panel that embeds a browser-based Jupyter environment.

    JupyterLite runs entirely in the browser via WebAssembly (Pyodide).
    The panel loads a JupyterLite deployment in an iframe.

    **Local deployment (recommended for file transfer):**
    Build JupyterLite locally with ``jupyter-iframe-commands`` and serve
    it from your Panel app so both share the same origin.  Files are
    transferred automatically into JupyterLite's IndexedDB storage and
    the file browser is refreshed via the ``jupyter-iframe-commands``
    bridge -- no user interaction needed.  See ``build_jupyterlite()``
    and the examples.

    **Remote deployment:**
    Point ``base_url`` at a hosted JupyterLite (e.g. the official demo).
    Cross-origin restrictions prevent automatic file transfer; download
    links are shown instead so the user can drag files into the file
    browser manually.  In REPL mode, files can be written via the
    ``?code=`` URL parameter.
    """

    _esm: ClassVar[str] = """
function buildUrl(model) {
  let base = model.get("base_url") || "https://jupyterlite.github.io/demo";
  if (base.endsWith("/")) base = base.slice(0, -1);

  const page = model.get("page") || "lab";
  let url = base + "/" + page + "/index.html";

  const params = new URLSearchParams();
  const notebookPath = model.get("notebook_path");
  if (notebookPath) params.set("path", notebookPath);

  const theme = model.get("theme");
  if (theme === "dark") params.set("theme", "JupyterLab Dark");

  if (page === "repl") {
    params.set("kernel", "python");
    params.set("toolbar", "1");

    const codeChunks = [];
    const files = model.get("files");
    if (files && Object.keys(files).length > 0) {
      codeChunks.push("import pathlib");
      for (const [name, content] of Object.entries(files)) {
        const pyStr = JSON.stringify(content);
        codeChunks.push(
          "pathlib.Path(" + JSON.stringify(name) + ").parent.mkdir(parents=True, exist_ok=True)"
        );
        codeChunks.push(
          "pathlib.Path(" + JSON.stringify(name) + ").write_text(" + pyStr + ")"
        );
      }
    }
    const userCode = model.get("initial_code");
    if (userCode) codeChunks.push(userCode);

    if (codeChunks.length > 0) {
      params.set("code", codeChunks.join("\\n"));
    }
  }

  const qs = params.toString();
  if (qs) url += "?" + qs;
  return url;
}

// ── Same-origin helpers ─────────────────────────────────────────────

function isSameOrigin(iframe) {
  try {
    void iframe.contentWindow.location.href;
    return true;
  } catch { return false; }
}

// ── File transfer via localforage + jupyter-iframe-commands bridge ───

function mimeForName(name) {
  if (name.endsWith(".csv")) return "text/csv";
  if (name.endsWith(".json")) return "application/json";
  if (name.endsWith(".py")) return "text/x-python";
  if (name.endsWith(".md") || name.endsWith(".markdown")) return "text/markdown";
  if (name.endsWith(".ipynb")) return "application/x-ipynb+json";
  if (name.endsWith(".html")) return "text/html";
  if (name.endsWith(".xml")) return "application/xml";
  if (name.endsWith(".yaml") || name.endsWith(".yml")) return "application/x-yaml";
  if (name.endsWith(".toml")) return "application/toml";
  return "text/plain";
}

async function transferFilesSameOrigin(iframe, model, readyPromise) {
  const files = model.get("files");
  if (!files || Object.keys(files).length === 0) return true;

  // Import localforage (handles IndexedDB schema/versioning correctly)
  let lf;
  try {
    lf = await import("https://cdn.jsdelivr.net/npm/localforage@1/+esm");
  } catch (e) {
    console.warn("panelini: localforage import failed", e);
    return false;
  }

  // Use comlink directly to talk to the jupyter-iframe-commands extension.
  // We avoid createBridge({ iframeId }) because it calls
  // document.getElementById() which cannot find iframes inside AnyWidget.
  let wrapped = null;
  try {
    const comlink = await import("https://cdn.jsdelivr.net/npm/comlink@4/+esm");
    wrapped = comlink.wrap(comlink.windowEndpoint(iframe.contentWindow));
    await Promise.race([
      readyPromise,
      wrapped.ready,
      new Promise((_, r) => setTimeout(() => r(new Error("timeout")), 15000)),
    ]);
  } catch (e) {
    console.warn("panelini: bridge not available (" + e.message + "), writing files directly");
    wrapped = null;
  }

  // JupyterLite names its database "JupyterLite Storage - {baseUrl}"
  const iframeUrl = new URL(iframe.src, window.location.origin);
  const basePath = iframeUrl.pathname.replace(
    /\\/(lab|repl|notebooks|tree|edit|consoles)(\\/.*)?$/, "/"
  );
  const dbName = "JupyterLite Storage - " + basePath;

  // Write files via localforage -- same library JupyterLite uses internally,
  // so the database schema (version, object stores, key format) matches.
  try {
    const storage = lf.default.createInstance({
      name: dbName,
      storeName: "files",
    });
    const now = new Date().toISOString();

    for (const [name, content] of Object.entries(files)) {
      const isNb = name.endsWith(".ipynb");
      let parsed = content, format = "text";
      if (isNb) {
        try { parsed = JSON.parse(content); format = "json"; } catch {}
      } else if (name.endsWith(".json")) {
        try { parsed = JSON.parse(content); format = "json"; } catch {}
      }

      await storage.setItem(name, {
        name: name.split("/").pop(),
        path: name,
        type: isNb ? "notebook" : "file",
        format,
        content: parsed,
        created: now,
        last_modified: now,
        mimetype: mimeForName(name),
        size: content.length,
        writable: true,
      });
    }
  } catch (e) {
    console.warn("panelini: file transfer failed", e);
    return false;
  }

  // Refresh the file browser so new files appear immediately
  if (wrapped) {
    try {
      await wrapped.execute("filebrowser:go-to-path", { path: "/" });
    } catch (e) {
      console.debug("panelini: file browser refresh:", e.message || e);
    }
  }

  console.debug("panelini:", Object.keys(files).length, "file(s) transferred via IndexedDB");
  return true;
}

// ── Main render ─────────────────────────────────────────────────────

export function render({ model, el }) {
  el.style.display = "block";
  el.style.width = "100%";
  el.style.height = "100%";

  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:relative;width:100%;height:100%;min-height:200px;" +
    "display:flex;flex-direction:column;";

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;" +
    "background:#f8f9fa;color:#666;font-family:system-ui,sans-serif;font-size:1rem;z-index:1;";
  overlay.textContent = "Loading JupyterLite\\u2026";

  const iframe = document.createElement("iframe");
  iframe.src = buildUrl(model);
  iframe.style.cssText = "width:100%;flex:1;border:none;min-height:0;";
  iframe.setAttribute(
    "sandbox",
    "allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals"
  );
  iframe.setAttribute("allow", "cross-origin-isolated");

  // Listen for the jupyter-iframe-commands readiness signal BEFORE the
  // iframe loads so we never miss it due to a race condition.
  let resolveReady;
  let readyPromise = new Promise((r) => { resolveReady = r; });
  const readyHandler = (e) => {
    if (e.data === "_JUPYTER_IFRAME_COMMANDS_LOADED" &&
        e.source === iframe.contentWindow) {
      window.removeEventListener("message", readyHandler);
      resolveReady();
    }
  };
  window.addEventListener("message", readyHandler);

  iframe.addEventListener("load", () => {
    overlay.style.display = "none";
    model.set("_iframe_loaded", true);
    model.save_changes();

    if (isSameOrigin(iframe)) {
      transferFilesSameOrigin(iframe, model, readyPromise);
    }
  });

  wrapper.appendChild(overlay);
  wrapper.appendChild(iframe);
  el.appendChild(wrapper);

  function reload() {
    overlay.style.display = "flex";
    overlay.textContent = "Loading JupyterLite\\u2026";
    model.set("_iframe_loaded", false);
    model.save_changes();

    // Reset readiness promise for the new page load
    readyPromise = new Promise((r) => { resolveReady = r; });
    window.removeEventListener("message", readyHandler);
    window.addEventListener("message", readyHandler);

    iframe.src = buildUrl(model);
  }

  model.on("change:base_url", reload);
  model.on("change:page", reload);
  model.on("change:notebook_path", reload);
  model.on("change:theme", reload);
  model.on("change:initial_code", reload);
  model.on("change:files", () => {
    if (model.get("_iframe_loaded") && isSameOrigin(iframe)) {
      transferFilesSameOrigin(iframe, model, readyPromise);
    }
  });

  return () => {
    window.removeEventListener("message", readyHandler);
    model.off("change:base_url", reload);
    model.off("change:page", reload);
    model.off("change:notebook_path", reload);
    model.off("change:theme", reload);
    model.off("change:initial_code", reload);
  };
}

export default { render };
"""

    base_url = param.String(
        default="https://jupyterlite.github.io/demo",
        doc="Base URL of the JupyterLite deployment. Use a relative path (e.g. '/jupyterlite') for local deployments.",
    )
    page = param.Selector(
        default="lab",
        objects=["lab", "notebooks", "repl", "tree"],
        doc="JupyterLite interface to show.",
    )
    notebook_path = param.String(
        default="",
        doc="Path to a notebook within the JupyterLite deployment.",
    )
    theme = param.Selector(
        default="light",
        objects=["light", "dark"],
        doc="JupyterLite color theme.",
    )
    initial_code = param.String(
        default="",
        doc="Python code to execute on startup (REPL mode only, via ?code= URL param).",
    )
    files = param.Dict(
        default={},
        doc="Files to transfer into JupyterLite. Dict of {filename: content}. "
        "Same-origin: written to IndexedDB and refreshed via jupyter-iframe-commands. "
        "Cross-origin: shown as draggable download links. "
        "REPL mode: written via startup code.",
    )

    _iframe_loaded = param.Boolean(default=False, doc="True after the iframe fires its load event.")

    def __init__(self, **params: Any) -> None:
        params.setdefault("height", 600)
        if "width" not in params and "sizing_mode" not in params:
            params["sizing_mode"] = "stretch_width"
        super().__init__(**params)

    def upload_file(self, name: str, content: str) -> None:
        """Add a file to be transferred to JupyterLite.

        Args:
            name: Filename (may include path, e.g. "data/input.csv").
            content: File content as a string.
        """
        self.files = {**self.files, name: content}

    def upload_notebook(self, name: str, cells: list[dict[str, Any]]) -> None:
        """Add a notebook to be transferred to JupyterLite.

        Args:
            name: Notebook filename (e.g. "analysis.ipynb").
            cells: List of cell dicts with ``cell_type`` and ``source``.
        """
        nb_cells = []
        for cell in cells:
            nb_cell: dict[str, Any] = {
                "cell_type": cell.get("cell_type", "code"),
                "source": cell.get("source", ""),
                "metadata": cell.get("metadata", {}),
            }
            if nb_cell["cell_type"] == "code":
                nb_cell["outputs"] = cell.get("outputs", [])
                nb_cell["execution_count"] = cell.get("execution_count", None)
            nb_cells.append(nb_cell)

        notebook = {
            "nbformat": 4,
            "nbformat_minor": 5,
            "metadata": {
                "kernelspec": {
                    "display_name": "Python 3",
                    "language": "python",
                    "name": "python3",
                },
            },
            "cells": nb_cells,
        }
        self.upload_file(name, json.dumps(notebook, indent=2))
