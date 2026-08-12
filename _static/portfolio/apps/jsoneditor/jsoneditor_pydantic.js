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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 9c707587fab847b5\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("aW1wb3J0IHBhbmVsIGFzIHBuCmZyb20gcHlkYW50aWMgaW1wb3J0IEJhc2VNb2RlbCwgRmllbGQKCmZyb20gcGFuZWxpbmkucGFuZWxzLmpzb25lZGl0b3IgaW1wb3J0IEpzb25FZGl0b3IKCgpkZWYgX2FwcGx5X2Zvcm1hdHMoc2NoZW1hOiBkaWN0LCBhcnJheV90YWJzOiBib29sLCBkaWN0X2NhdGVnb3JpZXM6IGJvb2wpIC0+IGRpY3Q6CiAgICBpZiBub3QgaXNpbnN0YW5jZShzY2hlbWEsIGRpY3QpOgogICAgICAgIHJldHVybiBzY2hlbWEKICAgIHNjaGVtYSA9IGRpY3Qoc2NoZW1hKQogICAgbm9kZV90eXBlID0gc2NoZW1hLmdldCgidHlwZSIpCiAgICBpZiBhcnJheV90YWJzIGFuZCBub2RlX3R5cGUgPT0gImFycmF5IiBhbmQgImZvcm1hdCIgbm90IGluIHNjaGVtYToKICAgICAgICBzY2hlbWFbImZvcm1hdCJdID0gInRhYnMiCiAgICBpZiBkaWN0X2NhdGVnb3JpZXMgYW5kIG5vZGVfdHlwZSA9PSAib2JqZWN0IiBhbmQgImZvcm1hdCIgbm90IGluIHNjaGVtYToKICAgICAgICBzY2hlbWFbImZvcm1hdCJdID0gImNhdGVnb3JpZXMiCiAgICBmb3Iga2V5IGluICgicHJvcGVydGllcyIsICIkZGVmcyIpOgogICAgICAgIGlmIGtleSBpbiBzY2hlbWE6CiAgICAgICAgICAgIHNjaGVtYVtrZXldID0ge2s6IF9hcHBseV9mb3JtYXRzKHYsIGFycmF5X3RhYnMsIGRpY3RfY2F0ZWdvcmllcykgZm9yIGssIHYgaW4gc2NoZW1hW2tleV0uaXRlbXMoKX0KICAgIGZvciBrZXkgaW4gKCJpdGVtcyIsICJhZGRpdGlvbmFsUHJvcGVydGllcyIsICJub3QiKToKICAgICAgICBpZiBrZXkgaW4gc2NoZW1hOgogICAgICAgICAgICBzY2hlbWFba2V5XSA9IF9hcHBseV9mb3JtYXRzKHNjaGVtYVtrZXldLCBhcnJheV90YWJzLCBkaWN0X2NhdGVnb3JpZXMpCiAgICBmb3Iga2V5IGluICgiYW55T2YiLCAiYWxsT2YiLCAib25lT2YiKToKICAgICAgICBpZiBrZXkgaW4gc2NoZW1hOgogICAgICAgICAgICBzY2hlbWFba2V5XSA9IFtfYXBwbHlfZm9ybWF0cyhzLCBhcnJheV90YWJzLCBkaWN0X2NhdGVnb3JpZXMpIGZvciBzIGluIHNjaGVtYVtrZXldXQogICAgcmV0dXJuIHNjaGVtYQoKCmNsYXNzIFB5ZGFudGljRWRpdG9yKEpzb25FZGl0b3IpOgogICAgZGVmIF9faW5pdF9fKAogICAgICAgIHNlbGYsCiAgICAgICAgcHlkYW50aWNfbW9kZWw6IHR5cGVbQmFzZU1vZGVsXSwKICAgICAgICB2YWx1ZT1Ob25lLAogICAgICAgIGZvcm1hdF9hcnJheV90YWJzOiBib29sID0gRmFsc2UsCiAgICAgICAgZm9ybWF0X2RpY3RfY2F0ZWdvcmllczogYm9vbCA9IEZhbHNlLAogICAgICAgICoqcGFyYW1zLAogICAgKToKICAgICAgICBzZWxmLnB5ZGFudGljX21vZGVsID0gcHlkYW50aWNfbW9kZWwKICAgICAgICBzZWxmLnNjaGVtYSA9IHNlbGYucHlkYW50aWNfbW9kZWwubW9kZWxfanNvbl9zY2hlbWEoKQoKICAgICAgICBvcHRpb25zID0gcGFyYW1zLmdldCgib3B0aW9ucyIsIHt9KQoKICAgICAgICBpZiBzZWxmLnB5ZGFudGljX21vZGVsIGlzIG5vdCBOb25lOgogICAgICAgICAgICBqc29uX3NjaGVtYSA9IHNlbGYucHlkYW50aWNfbW9kZWwubW9kZWxfanNvbl9zY2hlbWEoKQogICAgICAgICAgICBpZiBmb3JtYXRfYXJyYXlfdGFicyBvciBmb3JtYXRfZGljdF9jYXRlZ29yaWVzOgogICAgICAgICAgICAgICAganNvbl9zY2hlbWEgPSBfYXBwbHlfZm9ybWF0cyhqc29uX3NjaGVtYSwgZm9ybWF0X2FycmF5X3RhYnMsIGZvcm1hdF9kaWN0X2NhdGVnb3JpZXMpCiAgICAgICAgICAgIG9wdGlvbnNbInNjaGVtYSJdID0ganNvbl9zY2hlbWEKICAgICAgICBlbHNlOgogICAgICAgICAgICBvcHRpb25zWyJzY2hlbWEiXSA9IHt9CgogICAgICAgIHBhcmFtc1sib3B0aW9ucyJdID0gb3B0aW9ucwogICAgICAgIHN1cGVyKCkuX19pbml0X18oKipwYXJhbXMpCiAgICAgICAgaWYgaXNpbnN0YW5jZSh2YWx1ZSwgQmFzZU1vZGVsKToKICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tb2RlbF9kdW1wKCkKICAgICAgICBzZWxmLnZhbHVlID0gdmFsdWUKCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgaW1wb3J0IHRpbWUKICAgIGZyb20gdHlwaW5nIGltcG9ydCBPcHRpb25hbAoKICAgIGNsYXNzIEFTdWIoQmFzZU1vZGVsKToKICAgICAgICBhOiBpbnQgPSBGaWVsZCguLi4sIGRlc2NyaXB0aW9uPSJwcm9wIGEgb2Ygc3ViIHByb3BlcnR5IEFTdWIiKQogICAgICAgIGI6IGludCA9IEZpZWxkKC4uLiwgZGVzY3JpcHRpb249InByb3AgYiBvZiBzdWIgcHJvcGVydHkgQVN1YiIpCgogICAgY2xhc3MgQShCYXNlTW9kZWwpOgogICAgICAgIHg6IGludCA9IEZpZWxkKC4uLiwgZGVzY3JpcHRpb249InggZnVuY3Rpb25fY29uZmlnIikKICAgICAgICB5OiBpbnQgPSBGaWVsZCguLi4sIGRlc2NyaXB0aW9uPSJ5IGZ1bmN0aW9uX2NvbmZpZyIpCiAgICAgICAgejogT3B0aW9uYWxbaW50XSA9IEZpZWxkKE5vbmUsIGRlc2NyaXB0aW9uPSJ6IGZ1bmN0aW9uX2NvbmZpZyIpCiAgICAgICAgc3ViOiBsaXN0W0FTdWJdID0gRmllbGQoW10sIGRlc2NyaXB0aW9uPSJzdWIgcHJvcGVydHkgb2YgQSwgd2hpY2ggaXMgb2YgdHlwZSBBU3ViIikKCiAgICBhID0gQSh4PTEsIHk9Miwgej0zLCBzdWI9W0FTdWIoYT0xLCBiPTIpLCBBU3ViKGE9NCwgYj0zKV0pCgogICAgbXlfZWRpdG9yID0gUHlkYW50aWNFZGl0b3IoCiAgICAgICAgQSwKICAgICAgICB2YWx1ZT1hLAogICAgICAgIGZvcm1hdF9hcnJheV90YWJzPVRydWUsCiAgICAgICAgZm9ybWF0X2RpY3RfY2F0ZWdvcmllcz1GYWxzZSwKICAgICAgICBzaXppbmdfbW9kZT0ic3RyZXRjaF93aWR0aCIsCiAgICApCiAgICB0aW1lLnNsZWVwKDEpCiAgICBwbi5zZXJ2ZShteV9lZGl0b3IsIHRocmVhZGVkPVRydWUpCg==").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "jsoneditor_pydantic.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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