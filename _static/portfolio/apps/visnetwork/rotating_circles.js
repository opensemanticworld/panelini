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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 6dca1f85dad9fc92\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiUm90YXRpbmcgY2lyY2xlcyBhbmltYXRpb24gd2l0aCBzbGlkZXJzIGZvciB2ZWxvY2l0eSBhbmQgcmFkaXVzLiIiIgoKaW1wb3J0IHRpbWUKCmltcG9ydCBudW1weSBhcyBucAppbXBvcnQgcGFuZWwgYXMgcG4KCmZyb20gcGFuZWxpbmkucGFuZWxzLnZpc25ldHdvcmsgaW1wb3J0IFZpc05ldHdvcmsKCnBuLmV4dGVuc2lvbigpCgojIFRpbWVzdGFtcCBmb3IgbGFzdCB1cGRhdGUgKHVzZWQgdG8gY29tcHV0ZSB0aW1lIGRlbHRhIHBlciBmcmFtZSkKbGFzdF90ID0gdGltZS50aW1lKCkKCiMgQ3VycmVudCBiYXNlIGFuZ2xlIG9mIHRoZSByb3RhdGluZyBjaXJjbGUgKGluIHJhZGlhbnMpCnBoaV8wID0gMAoKIyBCYXNlIHJhZGl1cyBmb3IgdGhlIGNpcmNsZSBvbiB3aGljaCB0aGUgZml4ZWQgbm9kZXMgbGllCnIgPSAxMDAKCiMgUHJlY29tcHV0ZWQgYW5ndWxhciBvZmZzZXRzIGZvciB0aGUgNSBub2RlcyAoZXF1YWxseSBzcGFjZWQgb24gdGhlIGNpcmNsZSkKcGhpXzEgPSAyICogbnAucGkgLyA1CnBoaV8yID0gMiAqIDIgKiBucC5waSAvIDUKcGhpXzMgPSAzICogMiAqIG5wLnBpIC8gNQpwaGlfNCA9IDQgKiAyICogbnAucGkgLyA1CgojIEluaXRpYWwgbm9kZSBsaXN0OgojICAgMS01OiBmaXhlZCBub2RlcyBhcnJhbmdlZCBvbiBhIGNpcmNsZQojICAgNi0xMDogZnJlZSBub2RlcyAobm8gZml4ZWQgeC95OyBsYXlvdXQgaXMgY29tcHV0ZWQgYnkgdmlzLmpzKQpub2RlcyA9IFsKICAgIHsiaWQiOiAxLCAibGFiZWwiOiAiTm9kZSAxIiwgImNvbG9yIjogIiNlMDQxNDEiLCAieCI6IHIgKiBucC5jb3MocGhpXzApLCAieSI6IHIgKiBucC5zaW4ocGhpXzApLCAiZml4ZWQiOiBUcnVlfSwKICAgIHsKICAgICAgICAiaWQiOiAyLAogICAgICAgICJsYWJlbCI6ICJOb2RlIDIiLAogICAgICAgICJjb2xvciI6ICIjZTA5YzQxIiwKICAgICAgICAieCI6IHIgKiBucC5jb3MocGhpXzAgKyBwaGlfMSksCiAgICAgICAgInkiOiByICogbnAuc2luKHBoaV8wICsgcGhpXzEpLAogICAgICAgICJmaXhlZCI6IFRydWUsCiAgICB9LAogICAgewogICAgICAgICJpZCI6IDMsCiAgICAgICAgImxhYmVsIjogIk5vZGUgMyIsCiAgICAgICAgImNvbG9yIjogIiNlMGRmNDEiLAogICAgICAgICJ4IjogciAqIG5wLmNvcyhwaGlfMCArIHBoaV8yKSwKICAgICAgICAieSI6IHIgKiBucC5zaW4ocGhpXzAgKyBwaGlfMiksCiAgICAgICAgImZpeGVkIjogVHJ1ZSwKICAgIH0sCiAgICB7CiAgICAgICAgImlkIjogNCwKICAgICAgICAibGFiZWwiOiAiTm9kZSA0IiwKICAgICAgICAiY29sb3IiOiAiIzdiZTA0MSIsCiAgICAgICAgIngiOiByICogbnAuY29zKHBoaV8wICsgcGhpXzMpLAogICAgICAgICJ5IjogciAqIG5wLnNpbihwaGlfMCArIHBoaV8zKSwKICAgICAgICAiZml4ZWQiOiBUcnVlLAogICAgfSwKICAgIHsKICAgICAgICAiaWQiOiA1LAogICAgICAgICJsYWJlbCI6ICJOb2RlIDUiLAogICAgICAgICJjb2xvciI6ICIjNDFlMGM5IiwKICAgICAgICAieCI6IHIgKiBucC5jb3MocGhpXzAgKyBwaGlfNCksCiAgICAgICAgInkiOiByICogbnAuc2luKHBoaV8wICsgcGhpXzQpLAogICAgICAgICJmaXhlZCI6IFRydWUsCiAgICB9LAogICAgeyJpZCI6IDYsICJsYWJlbCI6ICJOb2RlIDYiLCAiY29sb3IiOiAiI2UwNDE0MSJ9LAogICAgeyJpZCI6IDcsICJsYWJlbCI6ICJOb2RlIDciLCAiY29sb3IiOiAiI2UwOWM0MSJ9LAogICAgeyJpZCI6IDgsICJsYWJlbCI6ICJOb2RlIDgiLCAiY29sb3IiOiAiI2UwZGY0MSJ9LAogICAgeyJpZCI6IDksICJsYWJlbCI6ICJOb2RlIDkiLCAiY29sb3IiOiAiIzdiZTA0MSJ9LAogICAgeyJpZCI6IDEwLCAibGFiZWwiOiAiTm9kZSAxMCIsICJjb2xvciI6ICIjNDFlMGM5In0sCl0KCiMgRWRnZXM6CiMgICAxLTU6IHJpbmcgb2YgNSBub2RlcwojICAgZWFjaCByaW5nIG5vZGUgaXMgY29ubmVjdGVkIHRvIGV4YWN0bHkgb25lIGZyZWUgbm9kZSAoNi0xMCkKZWRnZXMgPSBbCiAgICB7ImZyb20iOiAxLCAidG8iOiAyfSwKICAgIHsiZnJvbSI6IDIsICJ0byI6IDN9LAogICAgeyJmcm9tIjogMywgInRvIjogNH0sCiAgICB7ImZyb20iOiA0LCAidG8iOiA1fSwKICAgIHsiZnJvbSI6IDUsICJ0byI6IDF9LAogICAgeyJmcm9tIjogMSwgInRvIjogNn0sCiAgICB7ImZyb20iOiAyLCAidG8iOiA3fSwKICAgIHsiZnJvbSI6IDMsICJ0byI6IDh9LAogICAgeyJmcm9tIjogNCwgInRvIjogOX0sCiAgICB7ImZyb20iOiA1LCAidG8iOiAxMH0sCl0KCiMgQnVpbGQgdGhlIGFwcCBhdCBtb2R1bGUgbGV2ZWwgc28gaXQgY2FuIGJlIHNlcnZlZCwgdGVzdGVkLCBhbmQgY29udmVydGVkIHRvIGEKIyBzdGFuZGFsb25lIGJyb3dzZXIgYXBwLiBUaGUgcm90YXRpb24gcnVucyBvbiBhIHBlcmlvZGljIGNhbGxiYWNrIHJhdGhlciB0aGFuIGEKIyBibG9ja2luZyBsb29wLCBzbyBpdCBhbmltYXRlcyB1bmRlciBgcGFuZWwgc2VydmVgIGFuZCBpbiB0aGUgYnJvd3NlciAoUHlvZGlkZSkKIyBhbGlrZTsgYSBgd2hpbGUgVHJ1ZWAgbG9vcCB3b3VsZCBmcmVlemUgdGhlIHNpbmdsZS10aHJlYWRlZCBXQVNNIHJ1bnRpbWUuCnZpc25ldHdvcmtfcGFuZWwgPSBWaXNOZXR3b3JrKG5vZGVzPW5vZGVzLCBlZGdlcz1lZGdlcywgc2l6aW5nX21vZGU9InN0cmV0Y2hfYm90aCIpCgp2ZWxfc2xpZGVyID0gcG4ud2lkZ2V0cy5GbG9hdFNsaWRlcihuYW1lPSJWZWxvY2l0eSIsIHN0YXJ0PS0yMCwgZW5kPTIwLCB2YWx1ZT0xKQpyYWRpdXNfc2xpZGVyID0gcG4ud2lkZ2V0cy5GbG9hdFNsaWRlcihuYW1lPSJSYWRpdXMiLCBzdGFydD0wLCBlbmQ9NTAwLCB2YWx1ZT1yKQoKYXBwID0gcG4uQ29sdW1uKHZpc25ldHdvcmtfcGFuZWwsIHZlbF9zbGlkZXIsIHJhZGl1c19zbGlkZXIpCgpfYW5pbSA9IHsicGhpIjogcGhpXzAsICJ0IjogdGltZS50aW1lKCl9Cl9vZmZzZXRzID0gKDAuMCwgcGhpXzEsIHBoaV8yLCBwaGlfMywgcGhpXzQpCgoKZGVmIHJvdGF0ZSgpIC0+IE5vbmU6CiAgICAiIiJBZHZhbmNlIHRoZSByaW5nIGJ5IG9uZSBmcmFtZSBhbmQgcHVzaCB0aGUgbmV3IHBvc2l0aW9ucyB0byB0aGUgZ3JhcGguIiIiCiAgICBub3cgPSB0aW1lLnRpbWUoKQogICAgX2FuaW1bInBoaSJdICs9IHZlbF9zbGlkZXIudmFsdWUgKiAobm93IC0gX2FuaW1bInQiXSkKICAgIF9hbmltWyJ0Il0gPSBub3cKICAgIHJhZGl1cyA9IHJhZGl1c19zbGlkZXIudmFsdWUKICAgIHJpbmcgPSBbCiAgICAgICAgewogICAgICAgICAgICAqKm5vZGUsCiAgICAgICAgICAgICJ4IjogcmFkaXVzICogbnAuY29zKF9hbmltWyJwaGkiXSArIG9mZnNldCksCiAgICAgICAgICAgICJ5IjogcmFkaXVzICogbnAuc2luKF9hbmltWyJwaGkiXSArIG9mZnNldCksCiAgICAgICAgfQogICAgICAgIGZvciBub2RlLCBvZmZzZXQgaW4gemlwKG5vZGVzWzo1XSwgX29mZnNldHMsIHN0cmljdD1UcnVlKQogICAgXQogICAgdmlzbmV0d29ya19wYW5lbC5ub2RlcyA9IHJpbmcgKyBub2Rlc1s1Ol0KCgpkZWYgX3N0YXJ0X3JvdGF0aW9uKCkgLT4gTm9uZToKICAgIHBuLnN0YXRlLmFkZF9wZXJpb2RpY19jYWxsYmFjayhyb3RhdGUsIHBlcmlvZD01MCkKCgpwbi5zdGF0ZS5vbmxvYWQoX3N0YXJ0X3JvdGF0aW9uKQoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIHBuLnNlcnZlKGFwcCkK").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "rotating_circles.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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