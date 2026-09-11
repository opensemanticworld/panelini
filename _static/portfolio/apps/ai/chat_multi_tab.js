importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js");

function sendPatch(patch, buffers, msg_id) {
  self.postMessage({
    type: 'patch',
    patch: patch,
    buffers: buffers
  })
}

async function startApplication() {
  console.log("Loading pyodide...");
  self.postMessage({type: 'status', msg: 'Loading pyodide'})
  self.pyodide = await loadPyodide();
  self.pyodide.globals.set("sendPatch", sendPatch);
  console.log("Loaded pyodide!");
  const data_archives = [];
  for (const archive of data_archives) {
    let zipResponse = await fetch(archive);
    let zipBinary = await zipResponse.arrayBuffer();
    self.postMessage({type: 'status', msg: `Unpacking ${archive}`})
    self.pyodide.unpackArchive(zipBinary, "zip");
  }
  await self.pyodide.loadPackage("micropip");
  self.postMessage({type: 'status', msg: `Installing environment`})
  try {
    await self.pyodide.runPythonAsync(`
      import micropip
      await micropip.install(['bokeh==3.9.2', 'https://cdn.holoviz.org/panel/1.9.3/dist/wheels/panel-1.9.3-py3-none-any.whl', 'pyodide-http', 'numpy', 'pydantic', 'python-dotenv', '${new URL('../../wheels/panelini-1.0.0-py3-none-any.whl', self.location.href).href}']);
    `);
  } catch(e) {
    console.log(e)
    self.postMessage({
      type: 'status',
      msg: `Error while installing packages`
    });
  }
  console.log("Environment loaded!");
  self.postMessage({type: 'status', msg: 'Executing code'})
  try {
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 129081a5ace3a17b\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif True:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiRXhhbXBsZTogVHdvIEFJIGNoYXQgd2luZG93cyBpbiBhIHRhYmJlZCBsYXlvdXQgaW5zaWRlIFBhbmVsaW5pLgoKRGVtb25zdHJhdGVzIGhvdyB0byBjcmVhdGUgbXVsdGlwbGUgaW5kZXBlbmRlbnQgYGBBaUNoYXRgYCBpbnN0YW5jZXMgYW5kCnByZXNlbnQgdGhlbSBpbiBhIGBgcG4uVGFic2BgIGxheW91dCB3aXRoaW4gdGhlIFBhbmVsaW5pIGZyYW1ld29yay4KClByZXJlcXVpc2l0ZXMKLS0tLS0tLS0tLS0tLQoxLiBgYHBpcCBpbnN0YWxsIHBhbmVsaW5pW2FpXWBgCjIuIFNldCB0aGUgcmVxdWlyZWQgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciB5b3VyIGNob3NlbiBwcm92aWRlcgogICAoc2VlIGBgc3JjL3BhbmVsaW5pL3BhbmVscy9haS9kZWZhdWx0X2NvbmZpZy55bWxgYCkuCjMuIFJ1biB0aGlzIHNjcmlwdDogYGBweXRob24gZXhhbXBsZXMvcGFuZWxzL2FpL2NoYXRfbXVsdGlfdGFiLnB5YGAKClRoZSBhcHAgaXMgc2VydmVkIHRocm91Z2ggYSBmYWN0b3J5IHNvIGV2ZXJ5IGJyb3dzZXIgc2Vzc2lvbiBnZXRzIGl0cyBvd24KaW5zdGFuY2UgKG11bHRpLXVzZXIgaXNvbGF0aW9uKS4gQSBtb2R1bGUtbGV2ZWwgYGBhcHBgYCBzaGFyZXMgb25lIGluc3RhbmNlCmFjcm9zcyBhbGwgYnJvd3NlcnMgYW5kIGlzIGtlcHQgaGVyZSBvbmx5IGZvciBQeW9kaWRlL3BvcnRmb2xpbyBidWlsZHMuCiIiIgoKZnJvbSBwYXRobGliIGltcG9ydCBQYXRoCgppbXBvcnQgcGFuZWwgYXMgcG4KZnJvbSBkb3RlbnYgaW1wb3J0IGxvYWRfZG90ZW52Cgpmcm9tIHBhbmVsaW5pIGltcG9ydCBQYW5lbGluaQpmcm9tIHBhbmVsaW5pLnBhbmVscy5haSBpbXBvcnQgQWlDaGF0CmZyb20gcGFuZWxpbmkucGFuZWxzLmFpLmhpc3RvcnkgaW1wb3J0IEluTWVtb3J5SGlzdG9yeVN0b3JlCgpsb2FkX2RvdGVudigpICAjIGxvYWQgLmVudiBpZiBwcmVzZW50CgojIC0tIE9wdGlvbmFsOiBwb2ludCB0byBhIGN1c3RvbSBwcm92aWRlciBjb25maWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiMgU2V0IFBBTkVMSU5JX0FJX0NPTkZJR19QQVRIIG9yIHBhc3MgYSBwYXRoIGRpcmVjdGx5Lgpjb25maWdfcGF0aCA9IFBhdGgoImNvbmZpZy55bWwiKSBpZiBQYXRoKCJjb25maWcueW1sIikuaXNfZmlsZSgpIGVsc2UgTm9uZQoKIyAtLSBDcmVhdGUgY2hhdCBpbnN0YW5jZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCgoKZGVmIGNyZWF0ZV9hcHAoKSAtPiBQYW5lbGluaToKICAgICIiIkNyZWF0ZSBhIGZyZXNoIGFwcCBpbnN0YW5jZSAob25lIHBlciBicm93c2VyIHNlc3Npb24pLiIiIgogICAgIyBBIHN0b3JlIGVhY2g6IGJvdGggYXNzaXN0YW50cyB3b3VsZCBvdGhlcndpc2UgbGlzdCBvbmUgYW5vdGhlcidzCiAgICAjIGNvbnZlcnNhdGlvbnMsIHNpbmNlIHRoZSBkZWZhdWx0IHN0b3JlIGlzIHNoYXJlZCBwZXIgcHJvY2VzcwogICAgaW5nZXN0X2FpID0gQWlDaGF0KAogICAgICAgIHN5c3RlbV9tZXNzYWdlPSJZb3UgYXJlIGFuIGFzc2lzdGFudCBzcGVjaWFsaXplZCBpbiBkYXRhIGluZ2VzdGlvbiB0YXNrcy4iLAogICAgICAgIHdlbGNvbWVfbWVzc2FnZT0iSGkhIEknbSAqKkluZ2VzdCBBSSoqLiBJIGNhbiBoZWxwIHlvdSB3aXRoIGRhdGEgaW5nZXN0aW9uIHRhc2tzLiIsCiAgICAgICAgY29uZmlnX3BhdGg9Y29uZmlnX3BhdGgsCiAgICAgICAgaGlzdG9yeV9zdG9yZT1Jbk1lbW9yeUhpc3RvcnlTdG9yZSgpLAogICAgKQoKICAgIGRpZ2VzdF9haSA9IEFpQ2hhdCgKICAgICAgICBzeXN0ZW1fbWVzc2FnZT0iWW91IGFyZSBhbiBhc3Npc3RhbnQgc3BlY2lhbGl6ZWQgaW4gZGF0YSBhbmFseXNpcyBhbmQgc3VtbWFyaXphdGlvbi4iLAogICAgICAgIHdlbGNvbWVfbWVzc2FnZT0iSGkhIEknbSAqKkRpZ2VzdCBBSSoqLiBJIGNhbiBoZWxwIHlvdSBhbmFseXplIGFuZCBzdW1tYXJpemUgZGF0YS4iLAogICAgICAgIGNvbmZpZ19wYXRoPWNvbmZpZ19wYXRoLAogICAgICAgIGhpc3Rvcnlfc3RvcmU9SW5NZW1vcnlIaXN0b3J5U3RvcmUoKSwKICAgICkKCiAgICAjIC0tIFRhYmJlZCBsYXlvdXQgaW5zaWRlIFBhbmVsaW5pIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KCiAgICBtYWluX3RhYnMgPSBwbi5UYWJzKAogICAgICAgICgiSW5nZXN0IEFJIiwgcG4uUm93KCppbmdlc3RfYWkubWFpbl9vYmplY3RzKSksCiAgICAgICAgKCJEaWdlc3QgQUkiLCBwbi5Sb3coKmRpZ2VzdF9haS5tYWluX29iamVjdHMpKSwKICAgICkKCiAgICBzaWRlYmFyX3RhYnMgPSBwbi5UYWJzKAogICAgICAgICgiSW5nZXN0IEFJIiwgcG4uQ2FyZCgqaW5nZXN0X2FpLnNpZGViYXJfb2JqZWN0cywgdGl0bGU9IkluZ2VzdCBBSSBTZXR0aW5ncyIpKSwKICAgICAgICAoIkRpZ2VzdCBBSSIsIHBuLkNhcmQoKmRpZ2VzdF9haS5zaWRlYmFyX29iamVjdHMsIHRpdGxlPSJEaWdlc3QgQUkgU2V0dGluZ3MiKSksCiAgICApCgogICAgIyAtLSBMaW5rIFRhYnMgaW4gbWFpbiBhbmQgc2lkZWJhciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKICAgIG1haW5fdGFicy5qc2xpbmsoc2lkZWJhcl90YWJzLCBhY3RpdmU9ImFjdGl2ZSIpCiAgICBzaWRlYmFyX3RhYnMuanNsaW5rKG1haW5fdGFicywgYWN0aXZlPSJhY3RpdmUiKQoKICAgICMgLS0gQ3JlYXRlIGFuZCBsaW5rIFBhbmVsaW5pIGluc3RhbmNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KCiAgICBhcHAgPSBQYW5lbGluaSh0aXRsZT0iQUkgQ2hhdCBNdWx0aSBUYWIiLCBzaWRlYmFyX2VuYWJsZWQ9VHJ1ZSkKICAgIGFwcC5tYWluX3NldChvYmplY3RzPVttYWluX3RhYnNdKQogICAgYXBwLnNpZGViYXJfc2V0KG9iamVjdHM9W3NpZGViYXJfdGFic10pCiAgICByZXR1cm4gYXBwCgoKYXBwID0gY3JlYXRlX2FwcCgpICAjIG1vZHVsZS1sZXZlbCBpbnN0YW5jZSBmb3IgUHlvZGlkZS9wb3J0Zm9saW8gYnVpbGRzCgoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgICJSdW4gQUkgQ2hhdCBNdWx0aSBUYWIiCiAgICBwbi5zZXJ2ZShjcmVhdGVfYXBwLCB0aXRsZT0iQUkgQ2hhdCBNdWx0aSBUYWIiLCBwb3J0PTUwMDgpCg==").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "chat_multi_tab.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
    self.postMessage({
      type: 'render',
      docs_json: docs_json,
      render_items: render_items,
      root_ids: root_ids
    })
  } catch(e) {
    const traceback = `${e}`
    const tblines = traceback.split('\n')
    self.postMessage({
      type: 'status',
      msg: tblines[tblines.length-2]
    });
    throw e
  }
}

self.onmessage = async (event) => {
  const msg = event.data
  if (msg.type === 'rendered') {
    self.pyodide.runPythonAsync(`
    from panel.io.state import state
    from panel.io.pyodide import _link_docs_worker

    _link_docs_worker(state.curdoc, sendPatch, setter='js')
    `)
  } else if (msg.type === 'patch') {
    self.pyodide.globals.set('patch', msg.patch)
    self.pyodide.runPythonAsync(`
    from panel.io.pyodide import _convert_json_patch
    state.curdoc.apply_json_patch(_convert_json_patch(patch), setter='js')
    `)
    self.postMessage({type: 'idle'})
  } else if (msg.type === 'location') {
    self.pyodide.globals.set('location', msg.location)
    self.pyodide.runPythonAsync(`
    import json
    from panel.io.state import state
    from panel.util import edit_readonly
    if state.location:
        loc_data = json.loads(location)
        with edit_readonly(state.location):
            state.location.param.update({
                k: v for k, v in loc_data.items() if k in state.location.param
            })
    `)
  }
}

startApplication()