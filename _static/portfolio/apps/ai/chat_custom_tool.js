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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 0ec2318044e09925\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif True:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiRXhhbXBsZTogQUkgY2hhdCB3aXRoIGEgY3VzdG9tIExvY2FsU3RvcmFnZSB0b29sLgoKRGVtb25zdHJhdGVzIGhvdyB0byBjcmVhdGUgYSBjdXN0b20gYGBCYXNlVG9vbGBgIHN1YmNsYXNzIGFuZCBwYXNzIGl0CnRvIGBgQWlDaGF0YGAgdmlhIHRoZSBgYHRvb2xzYGAgcGFyYW1ldGVyLgoKUHJlcmVxdWlzaXRlcwotLS0tLS0tLS0tLS0tCjEuIGBgcGlwIGluc3RhbGwgcGFuZWxpbmlbYWldYGAKMi4gU2V0IHRoZSByZXF1aXJlZCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgZm9yIHlvdXIgY2hvc2VuIHByb3ZpZGVyCiAgIChzZWUgYGBzcmMvcGFuZWxpbmkvcGFuZWxzL2FpL2RlZmF1bHRfY29uZmlnLnltbGBgKS4KMy4gUnVuIHRoaXMgc2NyaXB0OiBgYHB5dGhvbiBleGFtcGxlcy9wYW5lbHMvYWkvY2hhdF9jdXN0b21fdG9vbC5weWBgCgpUaGUgYXBwIGlzIHNlcnZlZCB0aHJvdWdoIGEgZmFjdG9yeSBzbyBldmVyeSBicm93c2VyIHNlc3Npb24gZ2V0cyBpdHMgb3duCmluc3RhbmNlIChtdWx0aS11c2VyIGlzb2xhdGlvbikuIEEgbW9kdWxlLWxldmVsIGBgYXBwYGAgc2hhcmVzIG9uZSBpbnN0YW5jZQphY3Jvc3MgYWxsIGJyb3dzZXJzIGFuZCBpcyBrZXB0IGhlcmUgb25seSBmb3IgUHlvZGlkZS9wb3J0Zm9saW8gYnVpbGRzLgoiIiIKCmZyb20gdHlwaW5nIGltcG9ydCBMaXRlcmFsCgppbXBvcnQgcGFuZWwgYXMgcG4KZnJvbSBkb3RlbnYgaW1wb3J0IGxvYWRfZG90ZW52CmZyb20gbGFuZ2NoYWluX2NvcmUudG9vbHMgaW1wb3J0IEJhc2VUb29sCmZyb20gcHlkYW50aWMgaW1wb3J0IEJhc2VNb2RlbCwgRmllbGQKCmZyb20gcGFuZWxpbmkgaW1wb3J0IFBhbmVsaW5pCmZyb20gcGFuZWxpbmkucGFuZWxzLmFpIGltcG9ydCBBaUNoYXQKCmxvYWRfZG90ZW52KCkgICMgbG9hZCAuZW52IGlmIHByZXNlbnQKCgojIC0tIEN1c3RvbSB0b29sIGRlZmluaXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCgoKY2xhc3MgTG9jYWxTdG9yYWdlSW5wdXQoQmFzZU1vZGVsKToKICAgICIiIklucHV0IHNjaGVtYSBmb3IgdGhlIExvY2FsU3RvcmFnZSB0b29sLiIiIgoKICAgIGFjdGlvbjogTGl0ZXJhbFsiZ2V0IiwgInNldCIsICJ1cGRhdGUiLCAiZGVsZXRlIiwgImxpc3QiXSA9IEZpZWxkKAogICAgICAgIGRlc2NyaXB0aW9uPSJUaGUgb3BlcmF0aW9uIHRvIHBlcmZvcm06IGdldCwgc2V0LCB1cGRhdGUsIGRlbGV0ZSwgb3IgbGlzdC4iCiAgICApCiAgICBrZXk6IHN0ciB8IE5vbmUgPSBGaWVsZCgKICAgICAgICBkZWZhdWx0PU5vbmUsCiAgICAgICAgZGVzY3JpcHRpb249IlRoZSBrZXkgdG8gb3BlcmF0ZSBvbiAocmVxdWlyZWQgZm9yIGdldC9zZXQvdXBkYXRlL2RlbGV0ZSkuIiwKICAgICkKICAgIHZhbHVlOiBzdHIgfCBOb25lID0gRmllbGQoCiAgICAgICAgZGVmYXVsdD1Ob25lLAogICAgICAgIGRlc2NyaXB0aW9uPSJUaGUgdmFsdWUgdG8gc3RvcmUgKHJlcXVpcmVkIGZvciBzZXQvdXBkYXRlKS4iLAogICAgKQoKCmNsYXNzIExvY2FsU3RvcmFnZVRvb2woQmFzZVRvb2wpOgogICAgIiIiSW4tbWVtb3J5IGtleS12YWx1ZSBzdG9yZSBleHBvc2VkIGFzIGEgTGFuZ0NoYWluIHRvb2wuCgogICAgU3VwcG9ydHMgZ2V0LCBzZXQsIHVwZGF0ZSwgZGVsZXRlLCBhbmQgbGlzdCBvcGVyYXRpb25zLgogICAgIiIiCgogICAgbmFtZTogc3RyID0gImxvY2FsX3N0b3JhZ2UiCiAgICBkZXNjcmlwdGlvbjogc3RyID0gKAogICAgICAgICJBIHNpbXBsZSBrZXktdmFsdWUgc3RvcmUuIFVzZSB0aGlzIHRvb2wgdG8gcGVyc2lzdCBhbmQgcmV0cmlldmUgZGF0YSAiCiAgICAgICAgImR1cmluZyB0aGUgY29udmVyc2F0aW9uLiBTdXBwb3J0ZWQgYWN0aW9uczogIgogICAgICAgICJnZXQgKHJldHJpZXZlIGEgdmFsdWUgYnkga2V5KSwgIgogICAgICAgICJzZXQgKHN0b3JlIGEgbmV3IGtleS12YWx1ZSBwYWlyKSwgIgogICAgICAgICJ1cGRhdGUgKHVwZGF0ZSBhbiBleGlzdGluZyBrZXkpLCAiCiAgICAgICAgImRlbGV0ZSAocmVtb3ZlIGEga2V5KSwgIgogICAgICAgICJsaXN0IChsaXN0IGFsbCBzdG9yZWQga2V5cykuIgogICAgKQogICAgYXJnc19zY2hlbWE6IHR5cGVbQmFzZU1vZGVsXSA9IExvY2FsU3RvcmFnZUlucHV0CgogICAgc3RvcmFnZTogZGljdFtzdHIsIHN0cl0gPSBGaWVsZChkZWZhdWx0X2ZhY3Rvcnk9ZGljdCkKCiAgICBkZWYgX2FjdGlvbl9saXN0KHNlbGYpIC0+IHN0cjoKICAgICAgICBpZiBub3Qgc2VsZi5zdG9yYWdlOgogICAgICAgICAgICByZXR1cm4gIlN0b3JhZ2UgaXMgZW1wdHkuIgogICAgICAgIHJldHVybiBmIlN0b3JlZCBrZXlzOiB7JywgJy5qb2luKHNlbGYuc3RvcmFnZS5rZXlzKCkpfSIKCiAgICBkZWYgX2FjdGlvbl9nZXQoc2VsZiwga2V5OiBzdHIgfCBOb25lKSAtPiBzdHI6CiAgICAgICAgaWYga2V5IGlzIE5vbmU6CiAgICAgICAgICAgIHJldHVybiAiRXJyb3I6ICdrZXknIGlzIHJlcXVpcmVkIGZvciBnZXQuIgogICAgICAgIGlmIGtleSBub3QgaW4gc2VsZi5zdG9yYWdlOgogICAgICAgICAgICByZXR1cm4gZiJLZXkgJ3trZXl9JyBub3QgZm91bmQuIgogICAgICAgIHJldHVybiBmIntrZXl9ID0ge3NlbGYuc3RvcmFnZVtrZXldfSIKCiAgICBkZWYgX2FjdGlvbl9zZXQoc2VsZiwga2V5OiBzdHIgfCBOb25lLCB2YWx1ZTogc3RyIHwgTm9uZSkgLT4gc3RyOgogICAgICAgIGlmIGtleSBpcyBOb25lIG9yIHZhbHVlIGlzIE5vbmU6CiAgICAgICAgICAgIHJldHVybiAiRXJyb3I6ICdrZXknIGFuZCAndmFsdWUnIGFyZSByZXF1aXJlZCBmb3Igc2V0LiIKICAgICAgICBpZiBrZXkgaW4gc2VsZi5zdG9yYWdlOgogICAgICAgICAgICByZXR1cm4gZiJLZXkgJ3trZXl9JyBhbHJlYWR5IGV4aXN0cy4gVXNlICd1cGRhdGUnIHRvIG92ZXJ3cml0ZS4iCiAgICAgICAgc2VsZi5zdG9yYWdlW2tleV0gPSB2YWx1ZQogICAgICAgIHJldHVybiBmIlN0b3JlZDoge2tleX0gPSB7dmFsdWV9IgoKICAgIGRlZiBfYWN0aW9uX3VwZGF0ZShzZWxmLCBrZXk6IHN0ciB8IE5vbmUsIHZhbHVlOiBzdHIgfCBOb25lKSAtPiBzdHI6CiAgICAgICAgaWYga2V5IGlzIE5vbmUgb3IgdmFsdWUgaXMgTm9uZToKICAgICAgICAgICAgcmV0dXJuICJFcnJvcjogJ2tleScgYW5kICd2YWx1ZScgYXJlIHJlcXVpcmVkIGZvciB1cGRhdGUuIgogICAgICAgIGlmIGtleSBub3QgaW4gc2VsZi5zdG9yYWdlOgogICAgICAgICAgICByZXR1cm4gZiJLZXkgJ3trZXl9JyBub3QgZm91bmQuIFVzZSAnc2V0JyB0byBjcmVhdGUgaXQuIgogICAgICAgIG9sZCA9IHNlbGYuc3RvcmFnZVtrZXldCiAgICAgICAgc2VsZi5zdG9yYWdlW2tleV0gPSB2YWx1ZQogICAgICAgIHJldHVybiBmIlVwZGF0ZWQ6IHtrZXl9ID0ge3ZhbHVlfSAod2FzOiB7b2xkfSkiCgogICAgZGVmIF9hY3Rpb25fZGVsZXRlKHNlbGYsIGtleTogc3RyIHwgTm9uZSkgLT4gc3RyOgogICAgICAgIGlmIGtleSBpcyBOb25lOgogICAgICAgICAgICByZXR1cm4gIkVycm9yOiAna2V5JyBpcyByZXF1aXJlZCBmb3IgZGVsZXRlLiIKICAgICAgICBpZiBrZXkgbm90IGluIHNlbGYuc3RvcmFnZToKICAgICAgICAgICAgcmV0dXJuIGYiS2V5ICd7a2V5fScgbm90IGZvdW5kLiIKICAgICAgICBkZWwgc2VsZi5zdG9yYWdlW2tleV0KICAgICAgICByZXR1cm4gZiJEZWxldGVkIGtleSAne2tleX0nLiIKCiAgICBkZWYgX3J1bigKICAgICAgICBzZWxmLAogICAgICAgIGFjdGlvbjogc3RyLAogICAgICAgIGtleTogc3RyIHwgTm9uZSA9IE5vbmUsCiAgICAgICAgdmFsdWU6IHN0ciB8IE5vbmUgPSBOb25lLAogICAgKSAtPiBzdHI6CiAgICAgICAgYWN0aW9ucyA9IHsKICAgICAgICAgICAgImxpc3QiOiBsYW1iZGE6IHNlbGYuX2FjdGlvbl9saXN0KCksCiAgICAgICAgICAgICJnZXQiOiBsYW1iZGE6IHNlbGYuX2FjdGlvbl9nZXQoa2V5KSwKICAgICAgICAgICAgInNldCI6IGxhbWJkYTogc2VsZi5fYWN0aW9uX3NldChrZXksIHZhbHVlKSwKICAgICAgICAgICAgInVwZGF0ZSI6IGxhbWJkYTogc2VsZi5fYWN0aW9uX3VwZGF0ZShrZXksIHZhbHVlKSwKICAgICAgICAgICAgImRlbGV0ZSI6IGxhbWJkYTogc2VsZi5fYWN0aW9uX2RlbGV0ZShrZXkpLAogICAgICAgIH0KICAgICAgICBoYW5kbGVyID0gYWN0aW9ucy5nZXQoYWN0aW9uKQogICAgICAgIGlmIGhhbmRsZXIgaXMgTm9uZToKICAgICAgICAgICAgcmV0dXJuIGYiVW5rbm93biBhY3Rpb246IHthY3Rpb259IgogICAgICAgIHJldHVybiBoYW5kbGVyKCkKCiAgICBhc3luYyBkZWYgX2FydW4oCiAgICAgICAgc2VsZiwKICAgICAgICBhY3Rpb246IHN0ciwKICAgICAgICBrZXk6IHN0ciB8IE5vbmUgPSBOb25lLAogICAgICAgIHZhbHVlOiBzdHIgfCBOb25lID0gTm9uZSwKICAgICkgLT4gc3RyOgogICAgICAgIHJldHVybiBzZWxmLl9ydW4oYWN0aW9uPWFjdGlvbiwga2V5PWtleSwgdmFsdWU9dmFsdWUpCgoKIyAtLSBBcHAgc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKCmRlZiBjcmVhdGVfYXBwKCkgLT4gUGFuZWxpbmk6CiAgICAiIiJDcmVhdGUgYSBmcmVzaCBhcHAgaW5zdGFuY2UgKG9uZSBwZXIgYnJvd3NlciBzZXNzaW9uKS4iIiIKICAgIGNoYXQgPSBBaUNoYXQoCiAgICAgICAgc3lzdGVtX21lc3NhZ2U9IllvdSBhcmUgYSBoZWxwZnVsIGFzc2lzdGFudCB3aXRoIGFjY2VzcyB0byBhIGxvY2FsIHN0b3JhZ2UgdG9vbC4iLAogICAgICAgIHRvb2xzPVtMb2NhbFN0b3JhZ2VUb29sKCldLAogICAgICAgIHNob3dfcHJldmlldz1UcnVlLCAgIyBvcHQgaW46IHRoZSBwcmV2aWV3IHBhbmUgaXMgb2ZmIGJ5IGRlZmF1bHQKICAgICkKICAgIGFwcCA9IFBhbmVsaW5pKHRpdGxlPSJBSSBDaGF0IHdpdGggQ3VzdG9tIFRvb2wiLCBzaWRlYmFyX2VuYWJsZWQ9VHJ1ZSkKICAgIGFwcC5tYWluX3NldChvYmplY3RzPVtwbi5Sb3coKmNoYXQubWFpbl9vYmplY3RzKV0pCiAgICBhcHAuc2lkZWJhcl9zZXQob2JqZWN0cz1jaGF0LnNpZGViYXJfb2JqZWN0cykKICAgIHJldHVybiBhcHAKCgphcHAgPSBjcmVhdGVfYXBwKCkgICMgbW9kdWxlLWxldmVsIGluc3RhbmNlIGZvciBQeW9kaWRlL3BvcnRmb2xpbyBidWlsZHMKCmlmIF9fbmFtZV9fID09ICJfX21haW5fXyI6CiAgICBwbi5zZXJ2ZShjcmVhdGVfYXBwLCB0aXRsZT0iQUkgQ2hhdCB3aXRoIEN1c3RvbSBUb29sIiwgcG9ydD01MDA3KQo=").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "chat_custom_tool.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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