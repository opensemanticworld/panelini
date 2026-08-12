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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: b570215f08044a2f\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiVGVhbSBhbmQgcHJvamVjdCBzdHJ1Y3R1cmUgd2l0aCBjb2xvcmVkIGdyb3Vwcy4iIiIKCmltcG9ydCBwYW5lbCBhcyBwbgoKZnJvbSBwYW5lbGluaS5wYW5lbHMudmlzbmV0d29yayBpbXBvcnQgVmlzTmV0d29yawoKcG4uZXh0ZW5zaW9uKCkKCiMgUHJvamVjdCBub2RlcyAoZml4ZWQgcG9zaXRpb25zLCBubyBwaHlzaWNzKQpwcm9qZWN0X25vZGVzID0gWwogICAgewogICAgICAgICJpZCI6ICJQMSIsCiAgICAgICAgImxhYmVsIjogIlByb2plY3QgQXRsYXMiLAogICAgICAgICJncm91cCI6ICJwcm9qZWN0IiwKICAgICAgICAic2hhcGUiOiAiYm94IiwKICAgICAgICAidGl0bGUiOiAiQmFja2VuZC1IZWF2eSBQcm9qZWN0IiwKICAgICAgICAieCI6IC0yMDAsCiAgICAgICAgInkiOiAtNTAsCiAgICAgICAgImZpeGVkIjogVHJ1ZSwKICAgICAgICAicGh5c2ljcyI6IEZhbHNlLAogICAgfSwKICAgIHsKICAgICAgICAiaWQiOiAiUDIiLAogICAgICAgICJsYWJlbCI6ICJQcm9qZWN0IE5vdmEiLAogICAgICAgICJncm91cCI6ICJwcm9qZWN0IiwKICAgICAgICAic2hhcGUiOiAiYm94IiwKICAgICAgICAidGl0bGUiOiAiRnJvbnRlbmQtSGVhdnkgUHJvamVjdCIsCiAgICAgICAgIngiOiAwLAogICAgICAgICJ5IjogLTUwLAogICAgICAgICJmaXhlZCI6IFRydWUsCiAgICAgICAgInBoeXNpY3MiOiBGYWxzZSwKICAgIH0sCiAgICB7CiAgICAgICAgImlkIjogIlAzIiwKICAgICAgICAibGFiZWwiOiAiUHJvamVjdCBPcmlvbiIsCiAgICAgICAgImdyb3VwIjogInByb2plY3QiLAogICAgICAgICJzaGFwZSI6ICJib3giLAogICAgICAgICJ0aXRsZSI6ICJEYXRhICYgQW5hbHl0aWNzIiwKICAgICAgICAieCI6IDIwMCwKICAgICAgICAieSI6IC01MCwKICAgICAgICAiZml4ZWQiOiBUcnVlLAogICAgICAgICJwaHlzaWNzIjogRmFsc2UsCiAgICB9LAogICAgewogICAgICAgICJpZCI6ICJQNCIsCiAgICAgICAgImxhYmVsIjogIlByb2plY3QgVmVnYSIsCiAgICAgICAgImdyb3VwIjogInByb2plY3QiLAogICAgICAgICJzaGFwZSI6ICJib3giLAogICAgICAgICJ0aXRsZSI6ICJNaXhlZCBQcm9qZWN0IiwKICAgICAgICAieCI6IDAsCiAgICAgICAgInkiOiAxNTAsCiAgICAgICAgImZpeGVkIjogVHJ1ZSwKICAgICAgICAicGh5c2ljcyI6IEZhbHNlLAogICAgfSwKXQoKIyBQZW9wbGUgbm9kZXMgKGdyb3VwcyBieSByb2xlL3RlYW0pCnBlb3BsZV9ub2RlcyA9IFsKICAgICMgQmFja2VuZCBUZWFtCiAgICB7ImlkIjogIkIxIiwgImxhYmVsIjogIkFsaWNlIiwgImdyb3VwIjogImJhY2tlbmQiLCAidGl0bGUiOiAiQmFja2VuZCBMZWFkIn0sCiAgICB7ImlkIjogIkIyIiwgImxhYmVsIjogIkJvYiIsICJncm91cCI6ICJiYWNrZW5kIiwgInRpdGxlIjogIkJhY2tlbmQgRGV2In0sCiAgICB7ImlkIjogIkIzIiwgImxhYmVsIjogIkNhcmwiLCAiZ3JvdXAiOiAiYmFja2VuZCIsICJ0aXRsZSI6ICJCYWNrZW5kIERldiJ9LAogICAgIyBGcm9udGVuZCBUZWFtCiAgICB7ImlkIjogIkYxIiwgImxhYmVsIjogIkRpYW5hIiwgImdyb3VwIjogImZyb250ZW5kIiwgInRpdGxlIjogIkZyb250ZW5kIExlYWQifSwKICAgIHsiaWQiOiAiRjIiLCAibGFiZWwiOiAiRXZlIiwgImdyb3VwIjogImZyb250ZW5kIiwgInRpdGxlIjogIkZyb250ZW5kIERldiJ9LAogICAgeyJpZCI6ICJGMyIsICJsYWJlbCI6ICJGcmFuayIsICJncm91cCI6ICJmcm9udGVuZCIsICJ0aXRsZSI6ICJGcm9udGVuZCBEZXYifSwKICAgICMgRGF0YSBUZWFtCiAgICB7ImlkIjogIkQxIiwgImxhYmVsIjogIkdyYWNlIiwgImdyb3VwIjogImRhdGEiLCAidGl0bGUiOiAiRGF0YSBTY2llbnRpc3QifSwKICAgIHsiaWQiOiAiRDIiLCAibGFiZWwiOiAiSGVpZGkiLCAiZ3JvdXAiOiAiZGF0YSIsICJ0aXRsZSI6ICJEYXRhIEVuZ2luZWVyIn0sCiAgICAjIERlc2lnbiBUZWFtCiAgICB7ImlkIjogIkRTMSIsICJsYWJlbCI6ICJJdmFuIiwgImdyb3VwIjogImRlc2lnbiIsICJ0aXRsZSI6ICJVWCBEZXNpZ25lciJ9LAogICAgeyJpZCI6ICJEUzIiLCAibGFiZWwiOiAiSnVkeSIsICJncm91cCI6ICJkZXNpZ24iLCAidGl0bGUiOiAiVUkgRGVzaWduZXIifSwKXQoKbm9kZXMgPSBwcm9qZWN0X25vZGVzICsgcGVvcGxlX25vZGVzCgojIEVkZ2VzOiBQZW9wbGUgLT4gUHJvamVjdHMKZWRnZXMgPSBbCiAgICAjIFByb2plY3QgQXRsYXMgKEJhY2tlbmQtaGVhdnkpCiAgICB7ImZyb20iOiAiQjEiLCAidG8iOiAiUDEiLCAibGFiZWwiOiAiTGVhZCIsICJhcnJvd3MiOiAidG8ifSwKICAgIHsiZnJvbSI6ICJCMiIsICJ0byI6ICJQMSIsICJsYWJlbCI6ICJEZXYiLCAiYXJyb3dzIjogInRvIn0sCiAgICB7ImZyb20iOiAiRjIiLCAidG8iOiAiUDEiLCAibGFiZWwiOiAiU3VwcG9ydCIsICJhcnJvd3MiOiAidG8ifSwKICAgIHsiZnJvbSI6ICJEMSIsICJ0byI6ICJQMSIsICJsYWJlbCI6ICJBbmFseXRpY3MiLCAiYXJyb3dzIjogInRvIn0sCiAgICAjIFByb2plY3QgTm92YSAoRnJvbnRlbmQtaGVhdnkpCiAgICB7ImZyb20iOiAiRjEiLCAidG8iOiAiUDIiLCAibGFiZWwiOiAiTGVhZCIsICJhcnJvd3MiOiAidG8ifSwKICAgIHsiZnJvbSI6ICJGMyIsICJ0byI6ICJQMiIsICJsYWJlbCI6ICJEZXYiLCAiYXJyb3dzIjogInRvIn0sCiAgICB7ImZyb20iOiAiRFMxIiwgInRvIjogIlAyIiwgImxhYmVsIjogIlVYIiwgImFycm93cyI6ICJ0byJ9LAogICAgIyBQcm9qZWN0IE9yaW9uIChEYXRhL0FuYWx5dGljcykKICAgIHsiZnJvbSI6ICJEMiIsICJ0byI6ICJQMyIsICJsYWJlbCI6ICJFbmdpbmVlcmluZyIsICJhcnJvd3MiOiAidG8ifSwKICAgIHsiZnJvbSI6ICJCMyIsICJ0byI6ICJQMyIsICJsYWJlbCI6ICJBUEkiLCAiYXJyb3dzIjogInRvIn0sCiAgICB7ImZyb20iOiAiRFMyIiwgInRvIjogIlAzIiwgImxhYmVsIjogIlVJIiwgImFycm93cyI6ICJ0byJ9LAogICAgIyBQcm9qZWN0IFZlZ2EgKG1peGVkKQogICAgeyJmcm9tIjogIkIyIiwgInRvIjogIlA0IiwgImxhYmVsIjogIkJhY2tlbmQiLCAiYXJyb3dzIjogInRvIn0sCiAgICB7ImZyb20iOiAiRjIiLCAidG8iOiAiUDQiLCAibGFiZWwiOiAiRnJvbnRlbmQiLCAiYXJyb3dzIjogInRvIn0sCiAgICB7ImZyb20iOiAiRDEiLCAidG8iOiAiUDQiLCAibGFiZWwiOiAiRGF0YSIsICJhcnJvd3MiOiAidG8ifSwKICAgIHsiZnJvbSI6ICJEUzEiLCAidG8iOiAiUDQiLCAibGFiZWwiOiAiVVgiLCAiYXJyb3dzIjogInRvIn0sCl0KCiMgdmlzLmpzIG9wdGlvbnMgZm9yIGdyb3VwIGNvbG9ycyBhbmQgcGh5c2ljcwpvcHRpb25zID0gewogICAgImdyb3VwcyI6IHsKICAgICAgICAicHJvamVjdCI6IHsiY29sb3IiOiB7ImJhY2tncm91bmQiOiAiI2NjY2NjYyIsICJib3JkZXIiOiAiIzY2NjY2NiJ9fSwKICAgICAgICAiYmFja2VuZCI6IHsiY29sb3IiOiB7ImJhY2tncm91bmQiOiAiIzFmNzdiNCIsICJib3JkZXIiOiAiIzFmNzdiNCJ9fSwKICAgICAgICAiZnJvbnRlbmQiOiB7ImNvbG9yIjogeyJiYWNrZ3JvdW5kIjogIiMyY2EwMmMiLCAiYm9yZGVyIjogIiMyY2EwMmMifX0sCiAgICAgICAgImRhdGEiOiB7ImNvbG9yIjogeyJiYWNrZ3JvdW5kIjogIiM5NDY3YmQiLCAiYm9yZGVyIjogIiM5NDY3YmQifX0sCiAgICAgICAgImRlc2lnbiI6IHsiY29sb3IiOiB7ImJhY2tncm91bmQiOiAiI2ZmN2YwZSIsICJib3JkZXIiOiAiI2ZmN2YwZSJ9fSwKICAgIH0sCiAgICAicGh5c2ljcyI6IHsKICAgICAgICAiZW5hYmxlZCI6IFRydWUsCiAgICAgICAgInN0YWJpbGl6YXRpb24iOiB7ImVuYWJsZWQiOiBUcnVlLCAiaXRlcmF0aW9ucyI6IDIwMH0sCiAgICB9LAogICAgImludGVyYWN0aW9uIjogeyJob3ZlciI6IFRydWV9LAp9CgoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIHZpc25ldHdvcmtfcGFuZWwgPSBWaXNOZXR3b3JrKAogICAgICAgIG5vZGVzPW5vZGVzLAogICAgICAgIGVkZ2VzPWVkZ2VzLAogICAgICAgIG9wdGlvbnM9b3B0aW9ucywKICAgICkKICAgIHBuLnNlcnZlKHZpc25ldHdvcmtfcGFuZWwsIHRocmVhZGVkPVRydWUpCg==").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "group_filtering.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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