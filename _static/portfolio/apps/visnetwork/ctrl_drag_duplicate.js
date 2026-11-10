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
      await micropip.install(['bokeh==3.9.2', 'https://cdn.holoviz.org/panel/1.9.3/dist/wheels/panel-1.9.3-py3-none-any.whl', 'pyodide-http', 'numpy', 'pydantic', '${new URL('../../wheels/panelini-1.3.1-py3-none-any.whl', self.location.href).href}']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 1c5d0e48244dfe9f\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiQ3RybCtEcmFnIER1cGxpY2F0ZSBEZW1vIGZvciBWaXNOZXR3b3JrLgoKVGhpcyBleGFtcGxlIGRlbW9uc3RyYXRlcyB0aGUgQ3RybCtkcmFnIGR1cGxpY2F0ZSBmZWF0dXJlOgotIEhvbGQgQ3RybCBhbmQgZHJhZyBub2RlcyB0byBkdXBsaWNhdGUgdGhlbQotIFdvcmtzIHdpdGggc2luZ2xlIG9yIG11bHRpcGxlIHNlbGVjdGVkIG5vZGVzCi0gQXV0b21hdGljYWxseSBjcmVhdGVzIGVkZ2VzIGZyb20gb3JpZ2luYWxzIHRvIGR1cGxpY2F0ZXMKLSBPcHRpb25hbCBwb3N0LXByb2Nlc3NpbmcgY2FsbGJhY2sgZm9yIGR1cGxpY2F0ZWQgbm9kZXMKIiIiCgppbXBvcnQgcGFuZWwgYXMgcG4KCmZyb20gcGFuZWxpbmkucGFuZWxzLnZpc25ldHdvcmsgaW1wb3J0IFZpc05ldHdvcmsKCnBuLmV4dGVuc2lvbigpCgoKY2xhc3MgQ3RybERyYWdEZW1vOgogICAgIiIiRGVtbyBhcHBsaWNhdGlvbiBmb3IgQ3RybCtkcmFnIGR1cGxpY2F0ZSB3aXRoIHBvc3QtcHJvY2Vzc2luZy4iIiIKCiAgICBkZWYgX19pbml0X18oc2VsZik6CiAgICAgICAgIiIiSW5pdGlhbGl6ZSB0aGUgZGVtby4iIiIKICAgICAgICAjIENyZWF0ZSBzYW1wbGUgZ3JhcGgKICAgICAgICBzZWxmLm5vZGVzID0gWwogICAgICAgICAgICB7ImlkIjogMSwgImxhYmVsIjogIk5vZGUgMSIsICJ4IjogLTEwMCwgInkiOiAwLCAiZml4ZWQiOiBUcnVlLCAiY29sb3IiOiAiI2UzZjJmZCJ9LAogICAgICAgICAgICB7ImlkIjogMiwgImxhYmVsIjogIk5vZGUgMiIsICJ4IjogMTAwLCAieSI6IDAsICJmaXhlZCI6IFRydWUsICJjb2xvciI6ICIjZmZmOWM0In0sCiAgICAgICAgICAgIHsiaWQiOiAzLCAibGFiZWwiOiAiTm9kZSAzIiwgIngiOiAwLCAieSI6IDEwMCwgImZpeGVkIjogVHJ1ZSwgImNvbG9yIjogIiNjOGU2YzkifSwKICAgICAgICBdCgogICAgICAgIHNlbGYuZWRnZXMgPSBbCiAgICAgICAgICAgIHsiZnJvbSI6IDEsICJ0byI6IDN9LAogICAgICAgICAgICB7ImZyb20iOiAyLCAidG8iOiAzfSwKICAgICAgICBdCgogICAgICAgICMgVUkgQ29udHJvbHMKICAgICAgICBzZWxmLmVuYWJsZV9wb3N0cHJvY2VzcyA9IHBuLndpZGdldHMuQ2hlY2tib3gobGFiZWw9IkVuYWJsZSBQb3N0LVByb2Nlc3NpbmciLCB2YWx1ZT1UcnVlKQoKICAgICAgICBzZWxmLmxvZ19vdXRwdXQgPSBwbi5wYW5lLk1hcmtkb3duKAogICAgICAgICAgICAiKipQb3N0LVByb2Nlc3NpbmcgTG9nOioqXG5cbl9ObyBkdXBsaWNhdGlvbnMgeWV0Ll8iLAogICAgICAgICAgICB3aWR0aD0zNTAsCiAgICAgICAgKQoKICAgICAgICAjIENyZWF0ZSBWaXNOZXR3b3JrIHdpdGggcG9zdC1wcm9jZXNzaW5nIGNhbGxiYWNrCiAgICAgICAgc2VsZi52aXMgPSBWaXNOZXR3b3JrKAogICAgICAgICAgICBub2Rlcz1zZWxmLm5vZGVzLAogICAgICAgICAgICBlZGdlcz1zZWxmLmVkZ2VzLAogICAgICAgICAgICBvcHRpb25zPXsKICAgICAgICAgICAgICAgICJwaHlzaWNzIjogeyJlbmFibGVkIjogRmFsc2V9LAogICAgICAgICAgICAgICAgImludGVyYWN0aW9uIjogeyJtdWx0aXNlbGVjdCI6IFRydWV9LAogICAgICAgICAgICB9LAogICAgICAgICAgICBub2Rlc19kdXBsaWNhdGVkX2NhbGxiYWNrPXNlbGYub25fbm9kZXNfZHVwbGljYXRlZCwKICAgICAgICApCgogICAgICAgIHNlbGYuaW5mbyA9IHBuLnBhbmUuTWFya2Rvd24oCiAgICAgICAgICAgICIiIgojIEN0cmwrRHJhZyBEdXBsaWNhdGUgRGVtbwoKIyMgSG93IHRvIHVzZToKCjEuICoqU2luZ2xlIG5vZGUgZHVwbGljYXRlOioqCiAgIC0gSG9sZCAqKkN0cmwqKiBrZXkKICAgLSBDbGljayBhbmQgZHJhZyBhbnkgbm9kZQogICAtIEEgZHVwbGljYXRlIHdpbGwgYmUgY3JlYXRlZCB3aXRoIGFuIGVkZ2UgdG8gdGhlIG9yaWdpbmFsCgoyLiAqKk11bHRpcGxlIG5vZGUgZHVwbGljYXRlOioqCiAgIC0gU2VsZWN0IG11bHRpcGxlIG5vZGVzIChjbGljayArIFNoaWZ0IG9yIGRyYWctc2VsZWN0KQogICAtIEhvbGQgKipDdHJsKioga2V5CiAgIC0gRHJhZyB0aGUgc2VsZWN0aW9uCiAgIC0gQWxsIHNlbGVjdGVkIG5vZGVzIHdpbGwgYmUgZHVwbGljYXRlZAoKMy4gKipQb3N0LVByb2Nlc3Npbmc6KioKICAgLSBFbmFibGUgdGhlIGNoZWNrYm94IGJlbG93IHRvIGFwcGx5IHBvc3QtcHJvY2Vzc2luZwogICAtIER1cGxpY2F0ZWQgbm9kZXMgd2lsbCBiZSBtb2RpZmllZCBhdXRvbWF0aWNhbGx5CiAgIC0gQ2hhbmdlczogIihjb3B5KSIgc3VmZml4IGFkZGVkIHRvIGxhYmVsLCBjb2xvciBjaGFuZ2VkIHRvIG9yYW5nZQoKIyMgVHJ5IGl0IG5vdyEKU2VsZWN0IG5vZGVzIGFuZCBDdHJsK2RyYWcgdGhlbSBhcm91bmQuCiIiIiwKICAgICAgICAgICAgd2lkdGg9MzUwLAogICAgICAgICkKCiAgICBkZWYgb25fbm9kZXNfZHVwbGljYXRlZChzZWxmLCBkdXBsaWNhdGVkX25vZGVzOiBsaXN0W2RpY3RdKToKICAgICAgICAiIiJIYW5kbGUgbm9kZXMgZHVwbGljYXRlZCBldmVudC4KCiAgICAgICAgQXJnczoKICAgICAgICAgICAgZHVwbGljYXRlZF9ub2RlczogTGlzdCBvZiBkdXBsaWNhdGVkIG5vZGUgZGljdGlvbmFyaWVzLgogICAgICAgICIiIgogICAgICAgIHByaW50KGYiTm9kZXMgZHVwbGljYXRlZDoge2xlbihkdXBsaWNhdGVkX25vZGVzKX0gbm9kZXMiKQoKICAgICAgICAjIE9ubHkgcHJvY2VzcyBpZiBjaGVja2JveCBpcyBlbmFibGVkCiAgICAgICAgaWYgbm90IHNlbGYuZW5hYmxlX3Bvc3Rwcm9jZXNzLnZhbHVlOgogICAgICAgICAgICBzZWxmLmxvZ19vdXRwdXQub2JqZWN0ID0gKAogICAgICAgICAgICAgICAgZiIqKlBvc3QtUHJvY2Vzc2luZyBMb2c6Kipcblxu4o+t77iPIFNraXBwZWQgKGRpc2FibGVkKSAtIHtsZW4oZHVwbGljYXRlZF9ub2Rlcyl9IG5vZGUocykgZHVwbGljYXRlZCIKICAgICAgICAgICAgKQogICAgICAgICAgICByZXR1cm4KCiAgICAgICAgIyBQb3N0LXByb2Nlc3MgdGhlIGR1cGxpY2F0ZWQgbm9kZXMKICAgICAgICBtb2RpZmllZF9jb3VudCA9IDAKICAgICAgICBub2Rlc19saXN0ID0gbGlzdChzZWxmLnZpcy5ub2RlcykKCiAgICAgICAgZm9yIGR1cF9ub2RlIGluIGR1cGxpY2F0ZWRfbm9kZXM6CiAgICAgICAgICAgIG5vZGVfaWQgPSBkdXBfbm9kZVsiaWQiXQoKICAgICAgICAgICAgIyBGaW5kIHRoZSBub2RlIGluIHRoZSBjdXJyZW50IG5vZGVzIGxpc3QgYW5kIG1vZGlmeSBpdAogICAgICAgICAgICBmb3IgaSwgbm9kZSBpbiBlbnVtZXJhdGUobm9kZXNfbGlzdCk6CiAgICAgICAgICAgICAgICBpZiBub2RlWyJpZCJdID09IG5vZGVfaWQ6CiAgICAgICAgICAgICAgICAgICAgIyBBZGQgIihjb3B5KSIgc3VmZml4IHRvIGxhYmVsIGlmIG5vdCBhbHJlYWR5IHByZXNlbnQKICAgICAgICAgICAgICAgICAgICBpZiAiKGNvcHkpIiBub3QgaW4gbm9kZS5nZXQoImxhYmVsIiwgIiIpOgogICAgICAgICAgICAgICAgICAgICAgICBub2Rlc19saXN0W2ldID0gewogICAgICAgICAgICAgICAgICAgICAgICAgICAgKipub2RlLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgImxhYmVsIjogZiJ7bm9kZS5nZXQoJ2xhYmVsJywgJ05vZGUnKX0gKGNvcHkpIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICJjb2xvciI6ICIjZmY5ODAwIiwgICMgT3JhbmdlIGNvbG9yIGZvciBjb3BpZXMKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZF9jb3VudCArPSAxCiAgICAgICAgICAgICAgICAgICAgYnJlYWsKCiAgICAgICAgIyBVcGRhdGUgdGhlIG5vZGVzIGlmIGFueSB3ZXJlIG1vZGlmaWVkCiAgICAgICAgaWYgbW9kaWZpZWRfY291bnQgPiAwOgogICAgICAgICAgICBzZWxmLnZpcy5zZXRfbm9kZXMobm9kZXNfbGlzdCkKCiAgICAgICAgIyBVcGRhdGUgbG9nCiAgICAgICAgbG9nX3RleHQgPSAoCiAgICAgICAgICAgICIqKlBvc3QtUHJvY2Vzc2luZyBMb2c6KipcblxuIgogICAgICAgICAgICBmIuKchSBQcm9jZXNzZWQge2xlbihkdXBsaWNhdGVkX25vZGVzKX0gZHVwbGljYXRlZCBub2RlKHMpXG4iCiAgICAgICAgICAgIGYiLSBNb2RpZmllZCB7bW9kaWZpZWRfY291bnR9IG5vZGUocylcbiIKICAgICAgICAgICAgZiItIEFkZGVkICcoY29weSknIHN1ZmZpeCB0byBsYWJlbHNcbiIKICAgICAgICAgICAgZiItIENoYW5nZWQgY29sb3IgdG8gb3JhbmdlICgjZmY5ODAwKVxuXG4iCiAgICAgICAgICAgIGYiTm9kZSBJRHM6IHtbblsnaWQnXSBmb3IgbiBpbiBkdXBsaWNhdGVkX25vZGVzXX0iCiAgICAgICAgKQogICAgICAgIHNlbGYubG9nX291dHB1dC5vYmplY3QgPSBsb2dfdGV4dAoKICAgIGRlZiBidWlsZF9wYW5lbChzZWxmKToKICAgICAgICAiIiJCdWlsZCBhbmQgcmV0dXJuIHRoZSBkZW1vIHBhbmVsLiIiIgogICAgICAgIGNvbnRyb2xzID0gcG4uQ29sdW1uKAogICAgICAgICAgICBzZWxmLmluZm8sCiAgICAgICAgICAgIHBuLmxheW91dC5EaXZpZGVyKCksCiAgICAgICAgICAgICIjIyMgQ29udHJvbHMiLAogICAgICAgICAgICBzZWxmLmVuYWJsZV9wb3N0cHJvY2VzcywKICAgICAgICAgICAgcG4ubGF5b3V0LkRpdmlkZXIoKSwKICAgICAgICAgICAgc2VsZi5sb2dfb3V0cHV0LAogICAgICAgICkKCiAgICAgICAgcmV0dXJuIHBuLlJvdyhzZWxmLnZpcywgY29udHJvbHMpCgoKIyBDcmVhdGUgYW5kIHNlcnZlIHRoZSBkZW1vCmRlbW8gPSBDdHJsRHJhZ0RlbW8oKQpwYW5lbCA9IGRlbW8uYnVpbGRfcGFuZWwoKQoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIHBuLnNlcnZlKHBhbmVsLCB0aHJlYWRlZD1UcnVlKQo=").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "ctrl_drag_duplicate.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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