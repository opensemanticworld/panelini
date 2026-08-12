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
      await micropip.install(['bokeh==3.9.2', 'https://cdn.holoviz.org/panel/1.9.3/dist/wheels/panel-1.9.3-py3-none-any.whl', 'pyodide-http', 'numpy', 'pydantic', '${new URL('../../wheels/panelini-0.11.0-py3-none-any.whl', self.location.href).href}']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 54b2138a0d2b2698\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiQ3RybCtEcmFnIER1cGxpY2F0ZSBEZW1vIGZvciBWaXNOZXR3b3JrLgoKVGhpcyBleGFtcGxlIGRlbW9uc3RyYXRlcyB0aGUgQ3RybCtkcmFnIGR1cGxpY2F0ZSBmZWF0dXJlOgotIEhvbGQgQ3RybCBhbmQgZHJhZyBub2RlcyB0byBkdXBsaWNhdGUgdGhlbQotIFdvcmtzIHdpdGggc2luZ2xlIG9yIG11bHRpcGxlIHNlbGVjdGVkIG5vZGVzCi0gQXV0b21hdGljYWxseSBjcmVhdGVzIGVkZ2VzIGZyb20gb3JpZ2luYWxzIHRvIGR1cGxpY2F0ZXMKLSBPcHRpb25hbCBwb3N0LXByb2Nlc3NpbmcgY2FsbGJhY2sgZm9yIGR1cGxpY2F0ZWQgbm9kZXMKIiIiCgppbXBvcnQgcGFuZWwgYXMgcG4KCmZyb20gcGFuZWxpbmkucGFuZWxzLnZpc25ldHdvcmsgaW1wb3J0IFZpc05ldHdvcmsKCnBuLmV4dGVuc2lvbigpCgoKY2xhc3MgQ3RybERyYWdEZW1vOgogICAgIiIiRGVtbyBhcHBsaWNhdGlvbiBmb3IgQ3RybCtkcmFnIGR1cGxpY2F0ZSB3aXRoIHBvc3QtcHJvY2Vzc2luZy4iIiIKCiAgICBkZWYgX19pbml0X18oc2VsZik6CiAgICAgICAgIiIiSW5pdGlhbGl6ZSB0aGUgZGVtby4iIiIKICAgICAgICAjIENyZWF0ZSBzYW1wbGUgZ3JhcGgKICAgICAgICBzZWxmLm5vZGVzID0gWwogICAgICAgICAgICB7ImlkIjogMSwgImxhYmVsIjogIk5vZGUgMSIsICJ4IjogLTEwMCwgInkiOiAwLCAiZml4ZWQiOiBUcnVlLCAiY29sb3IiOiAiI2UzZjJmZCJ9LAogICAgICAgICAgICB7ImlkIjogMiwgImxhYmVsIjogIk5vZGUgMiIsICJ4IjogMTAwLCAieSI6IDAsICJmaXhlZCI6IFRydWUsICJjb2xvciI6ICIjZmZmOWM0In0sCiAgICAgICAgICAgIHsiaWQiOiAzLCAibGFiZWwiOiAiTm9kZSAzIiwgIngiOiAwLCAieSI6IDEwMCwgImZpeGVkIjogVHJ1ZSwgImNvbG9yIjogIiNjOGU2YzkifSwKICAgICAgICBdCgogICAgICAgIHNlbGYuZWRnZXMgPSBbCiAgICAgICAgICAgIHsiZnJvbSI6IDEsICJ0byI6IDN9LAogICAgICAgICAgICB7ImZyb20iOiAyLCAidG8iOiAzfSwKICAgICAgICBdCgogICAgICAgICMgVUkgQ29udHJvbHMKICAgICAgICBzZWxmLmVuYWJsZV9wb3N0cHJvY2VzcyA9IHBuLndpZGdldHMuQ2hlY2tib3gobmFtZT0iRW5hYmxlIFBvc3QtUHJvY2Vzc2luZyIsIHZhbHVlPVRydWUpCgogICAgICAgIHNlbGYubG9nX291dHB1dCA9IHBuLnBhbmUuTWFya2Rvd24oCiAgICAgICAgICAgICIqKlBvc3QtUHJvY2Vzc2luZyBMb2c6KipcblxuX05vIGR1cGxpY2F0aW9ucyB5ZXQuXyIsCiAgICAgICAgICAgIHdpZHRoPTM1MCwKICAgICAgICApCgogICAgICAgICMgQ3JlYXRlIFZpc05ldHdvcmsgd2l0aCBwb3N0LXByb2Nlc3NpbmcgY2FsbGJhY2sKICAgICAgICBzZWxmLnZpcyA9IFZpc05ldHdvcmsoCiAgICAgICAgICAgIG5vZGVzPXNlbGYubm9kZXMsCiAgICAgICAgICAgIGVkZ2VzPXNlbGYuZWRnZXMsCiAgICAgICAgICAgIG9wdGlvbnM9ewogICAgICAgICAgICAgICAgInBoeXNpY3MiOiB7ImVuYWJsZWQiOiBGYWxzZX0sCiAgICAgICAgICAgICAgICAiaW50ZXJhY3Rpb24iOiB7Im11bHRpc2VsZWN0IjogVHJ1ZX0sCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIG5vZGVzX2R1cGxpY2F0ZWRfY2FsbGJhY2s9c2VsZi5vbl9ub2Rlc19kdXBsaWNhdGVkLAogICAgICAgICkKCiAgICAgICAgc2VsZi5pbmZvID0gcG4ucGFuZS5NYXJrZG93bigKICAgICAgICAgICAgIiIiCiMgQ3RybCtEcmFnIER1cGxpY2F0ZSBEZW1vCgojIyBIb3cgdG8gdXNlOgoKMS4gKipTaW5nbGUgbm9kZSBkdXBsaWNhdGU6KioKICAgLSBIb2xkICoqQ3RybCoqIGtleQogICAtIENsaWNrIGFuZCBkcmFnIGFueSBub2RlCiAgIC0gQSBkdXBsaWNhdGUgd2lsbCBiZSBjcmVhdGVkIHdpdGggYW4gZWRnZSB0byB0aGUgb3JpZ2luYWwKCjIuICoqTXVsdGlwbGUgbm9kZSBkdXBsaWNhdGU6KioKICAgLSBTZWxlY3QgbXVsdGlwbGUgbm9kZXMgKGNsaWNrICsgU2hpZnQgb3IgZHJhZy1zZWxlY3QpCiAgIC0gSG9sZCAqKkN0cmwqKiBrZXkKICAgLSBEcmFnIHRoZSBzZWxlY3Rpb24KICAgLSBBbGwgc2VsZWN0ZWQgbm9kZXMgd2lsbCBiZSBkdXBsaWNhdGVkCgozLiAqKlBvc3QtUHJvY2Vzc2luZzoqKgogICAtIEVuYWJsZSB0aGUgY2hlY2tib3ggYmVsb3cgdG8gYXBwbHkgcG9zdC1wcm9jZXNzaW5nCiAgIC0gRHVwbGljYXRlZCBub2RlcyB3aWxsIGJlIG1vZGlmaWVkIGF1dG9tYXRpY2FsbHkKICAgLSBDaGFuZ2VzOiAiKGNvcHkpIiBzdWZmaXggYWRkZWQgdG8gbGFiZWwsIGNvbG9yIGNoYW5nZWQgdG8gb3JhbmdlCgojIyBUcnkgaXQgbm93IQpTZWxlY3Qgbm9kZXMgYW5kIEN0cmwrZHJhZyB0aGVtIGFyb3VuZC4KIiIiLAogICAgICAgICAgICB3aWR0aD0zNTAsCiAgICAgICAgKQoKICAgIGRlZiBvbl9ub2Rlc19kdXBsaWNhdGVkKHNlbGYsIGR1cGxpY2F0ZWRfbm9kZXM6IGxpc3RbZGljdF0pOgogICAgICAgICIiIkhhbmRsZSBub2RlcyBkdXBsaWNhdGVkIGV2ZW50LgoKICAgICAgICBBcmdzOgogICAgICAgICAgICBkdXBsaWNhdGVkX25vZGVzOiBMaXN0IG9mIGR1cGxpY2F0ZWQgbm9kZSBkaWN0aW9uYXJpZXMuCiAgICAgICAgIiIiCiAgICAgICAgcHJpbnQoZiJOb2RlcyBkdXBsaWNhdGVkOiB7bGVuKGR1cGxpY2F0ZWRfbm9kZXMpfSBub2RlcyIpCgogICAgICAgICMgT25seSBwcm9jZXNzIGlmIGNoZWNrYm94IGlzIGVuYWJsZWQKICAgICAgICBpZiBub3Qgc2VsZi5lbmFibGVfcG9zdHByb2Nlc3MudmFsdWU6CiAgICAgICAgICAgIHNlbGYubG9nX291dHB1dC5vYmplY3QgPSAoCiAgICAgICAgICAgICAgICBmIioqUG9zdC1Qcm9jZXNzaW5nIExvZzoqKlxuXG7ij63vuI8gU2tpcHBlZCAoZGlzYWJsZWQpIC0ge2xlbihkdXBsaWNhdGVkX25vZGVzKX0gbm9kZShzKSBkdXBsaWNhdGVkIgogICAgICAgICAgICApCiAgICAgICAgICAgIHJldHVybgoKICAgICAgICAjIFBvc3QtcHJvY2VzcyB0aGUgZHVwbGljYXRlZCBub2RlcwogICAgICAgIG1vZGlmaWVkX2NvdW50ID0gMAogICAgICAgIG5vZGVzX2xpc3QgPSBsaXN0KHNlbGYudmlzLm5vZGVzKQoKICAgICAgICBmb3IgZHVwX25vZGUgaW4gZHVwbGljYXRlZF9ub2RlczoKICAgICAgICAgICAgbm9kZV9pZCA9IGR1cF9ub2RlWyJpZCJdCgogICAgICAgICAgICAjIEZpbmQgdGhlIG5vZGUgaW4gdGhlIGN1cnJlbnQgbm9kZXMgbGlzdCBhbmQgbW9kaWZ5IGl0CiAgICAgICAgICAgIGZvciBpLCBub2RlIGluIGVudW1lcmF0ZShub2Rlc19saXN0KToKICAgICAgICAgICAgICAgIGlmIG5vZGVbImlkIl0gPT0gbm9kZV9pZDoKICAgICAgICAgICAgICAgICAgICAjIEFkZCAiKGNvcHkpIiBzdWZmaXggdG8gbGFiZWwgaWYgbm90IGFscmVhZHkgcHJlc2VudAogICAgICAgICAgICAgICAgICAgIGlmICIoY29weSkiIG5vdCBpbiBub2RlLmdldCgibGFiZWwiLCAiIik6CiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzX2xpc3RbaV0gPSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKm5vZGUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAibGFiZWwiOiBmIntub2RlLmdldCgnbGFiZWwnLCAnTm9kZScpfSAoY29weSkiLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgImNvbG9yIjogIiNmZjk4MDAiLCAgIyBPcmFuZ2UgY29sb3IgZm9yIGNvcGllcwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkX2NvdW50ICs9IDEKICAgICAgICAgICAgICAgICAgICBicmVhawoKICAgICAgICAjIFVwZGF0ZSB0aGUgbm9kZXMgaWYgYW55IHdlcmUgbW9kaWZpZWQKICAgICAgICBpZiBtb2RpZmllZF9jb3VudCA+IDA6CiAgICAgICAgICAgIHNlbGYudmlzLnNldF9ub2Rlcyhub2Rlc19saXN0KQoKICAgICAgICAjIFVwZGF0ZSBsb2cKICAgICAgICBsb2dfdGV4dCA9ICgKICAgICAgICAgICAgIioqUG9zdC1Qcm9jZXNzaW5nIExvZzoqKlxuXG4iCiAgICAgICAgICAgIGYi4pyFIFByb2Nlc3NlZCB7bGVuKGR1cGxpY2F0ZWRfbm9kZXMpfSBkdXBsaWNhdGVkIG5vZGUocylcbiIKICAgICAgICAgICAgZiItIE1vZGlmaWVkIHttb2RpZmllZF9jb3VudH0gbm9kZShzKVxuIgogICAgICAgICAgICBmIi0gQWRkZWQgJyhjb3B5KScgc3VmZml4IHRvIGxhYmVsc1xuIgogICAgICAgICAgICBmIi0gQ2hhbmdlZCBjb2xvciB0byBvcmFuZ2UgKCNmZjk4MDApXG5cbiIKICAgICAgICAgICAgZiJOb2RlIElEczoge1tuWydpZCddIGZvciBuIGluIGR1cGxpY2F0ZWRfbm9kZXNdfSIKICAgICAgICApCiAgICAgICAgc2VsZi5sb2dfb3V0cHV0Lm9iamVjdCA9IGxvZ190ZXh0CgogICAgZGVmIGJ1aWxkX3BhbmVsKHNlbGYpOgogICAgICAgICIiIkJ1aWxkIGFuZCByZXR1cm4gdGhlIGRlbW8gcGFuZWwuIiIiCiAgICAgICAgY29udHJvbHMgPSBwbi5Db2x1bW4oCiAgICAgICAgICAgIHNlbGYuaW5mbywKICAgICAgICAgICAgcG4ubGF5b3V0LkRpdmlkZXIoKSwKICAgICAgICAgICAgIiMjIyBDb250cm9scyIsCiAgICAgICAgICAgIHNlbGYuZW5hYmxlX3Bvc3Rwcm9jZXNzLAogICAgICAgICAgICBwbi5sYXlvdXQuRGl2aWRlcigpLAogICAgICAgICAgICBzZWxmLmxvZ19vdXRwdXQsCiAgICAgICAgKQoKICAgICAgICByZXR1cm4gcG4uUm93KHNlbGYudmlzLCBjb250cm9scykKCgojIENyZWF0ZSBhbmQgc2VydmUgdGhlIGRlbW8KZGVtbyA9IEN0cmxEcmFnRGVtbygpCnBhbmVsID0gZGVtby5idWlsZF9wYW5lbCgpCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgcG4uc2VydmUocGFuZWwsIHRocmVhZGVkPVRydWUpCg==").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "ctrl_drag_duplicate.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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