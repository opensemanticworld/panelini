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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 7e05e72b761c3b9c\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiSW5jcmVtZW50YWwgdHJlZSB1cGRhdGUgZGVtbyAtIGJ1aWxkcyBhIHByb2plY3QgZm9sZGVyIHN0cnVjdHVyZSBzdGVwIGJ5IHN0ZXAuCgpUaGlzIGV4YW1wbGUgZGVtb25zdHJhdGVzIHRoZSBpbmNyZW1lbnRhbCB0cmVlIHVwZGF0ZSBBUEkgdXNpbmcgdGhlIHNhbWUKcGxheWJvb2sgbm90YXRpb24gYXMgdGhlIHZpc25ldHdvcmsgaW5jcmVtZW50YWxfZ3JhcGhfZGVtby5weS4KCkVhY2ggc3RlcCBjb250YWlucyBhbiAnYWN0aW9ucycgbGlzdCB3aXRoIGFjdGlvbiBvYmplY3RzIHRoYXQgYXJlCnNlbnQgZGlyZWN0bHkgdG8gdGhlIEphdmFTY3JpcHQgc2lkZS4KIiIiCgppbXBvcnQgdGltZQoKaW1wb3J0IHBhbmVsIGFzIHBuCgpmcm9tIHBhbmVsaW5pLnBhbmVscy53dW5kZXJiYXVtIGltcG9ydCBXdW5kZXJiYXVtCgpwbi5leHRlbnNpb24oKQoKIyBCdWlsZCBzZXF1ZW5jZSAtIGNyZWF0ZXMgYSBwcm9qZWN0IHN0cnVjdHVyZSBzdGVwIGJ5IHN0ZXAKU0VRVUVOQ0UgPSBbCiAgICB7CiAgICAgICAgImFjdGlvbnMiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJhY3Rpb24iOiAiYWRkTm9kZSIsCiAgICAgICAgICAgICAgICAicGFyZW50S2V5IjogTm9uZSwKICAgICAgICAgICAgICAgICJrZXkiOiAicHJvamVjdCIsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAibXktcHJvamVjdCIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1mb2xkZXItZmlsbCIsCiAgICAgICAgICAgICAgICAiZXhwYW5kZWQiOiBUcnVlLAogICAgICAgICAgICB9CiAgICAgICAgXSwKICAgICAgICAic3RhdHVzIjogIkNyZWF0aW5nIHByb2plY3Qgcm9vdC4uLiIsCiAgICB9LAogICAgewogICAgICAgICJhY3Rpb25zIjogWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiYWN0aW9uIjogImFkZE5vZGUiLAogICAgICAgICAgICAgICAgInBhcmVudEtleSI6ICJwcm9qZWN0IiwKICAgICAgICAgICAgICAgICJrZXkiOiAic3JjIiwKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJzcmMiLAogICAgICAgICAgICAgICAgImljb24iOiAiYmkgYmktZm9sZGVyLWZpbGwiLAogICAgICAgICAgICAgICAgImV4cGFuZGVkIjogVHJ1ZSwKICAgICAgICAgICAgfSwKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImFjdGlvbiI6ICJhZGROb2RlIiwKICAgICAgICAgICAgICAgICJwYXJlbnRLZXkiOiAicHJvamVjdCIsCiAgICAgICAgICAgICAgICAia2V5IjogInRlc3RzIiwKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJ0ZXN0cyIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1mb2xkZXItZmlsbCIsCiAgICAgICAgICAgIH0sCiAgICAgICAgXSwKICAgICAgICAic3RhdHVzIjogIkFkZGluZyBzcmMvIGFuZCB0ZXN0cy8gZGlyZWN0b3JpZXMuLi4iLAogICAgfSwKICAgIHsKICAgICAgICAiYWN0aW9ucyI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImFjdGlvbiI6ICJhZGROb2RlIiwKICAgICAgICAgICAgICAgICJwYXJlbnRLZXkiOiAic3JjIiwKICAgICAgICAgICAgICAgICJrZXkiOiAibWFpbi5weSIsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAibWFpbi5weSIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1maWxlLWVhcm1hcmstY29kZSIsCiAgICAgICAgICAgICAgICAiZGF0YSI6IHsic2l6ZSI6ICIyLjEgS0IiLCAibGFuZ3VhZ2UiOiAiUHl0aG9uIn0sCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJhY3Rpb24iOiAiYWRkTm9kZSIsCiAgICAgICAgICAgICAgICAicGFyZW50S2V5IjogInNyYyIsCiAgICAgICAgICAgICAgICAia2V5IjogInV0aWxzLnB5IiwKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJ1dGlscy5weSIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1maWxlLWVhcm1hcmstY29kZSIsCiAgICAgICAgICAgICAgICAiZGF0YSI6IHsic2l6ZSI6ICI4NTYgQiIsICJsYW5ndWFnZSI6ICJQeXRob24ifSwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgICAgICJzdGF0dXMiOiAiQWRkaW5nIHNvdXJjZSBmaWxlcy4uLiIsCiAgICB9LAogICAgewogICAgICAgICJhY3Rpb25zIjogWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiYWN0aW9uIjogImFkZE5vZGUiLAogICAgICAgICAgICAgICAgInBhcmVudEtleSI6ICJzcmMiLAogICAgICAgICAgICAgICAgImtleSI6ICJtb2RlbHMiLAogICAgICAgICAgICAgICAgInRpdGxlIjogIm1vZGVscyIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1mb2xkZXItZmlsbCIsCiAgICAgICAgICAgICAgICAiZXhwYW5kZWQiOiBUcnVlLAogICAgICAgICAgICB9CiAgICAgICAgXSwKICAgICAgICAic3RhdHVzIjogIkFkZGluZyBtb2RlbHMvIHN1YmRpcmVjdG9yeS4uLiIsCiAgICB9LAogICAgewogICAgICAgICJhY3Rpb25zIjogWwogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiYWN0aW9uIjogImFkZE5vZGUiLAogICAgICAgICAgICAgICAgInBhcmVudEtleSI6ICJtb2RlbHMiLAogICAgICAgICAgICAgICAgImtleSI6ICJ1c2VyLnB5IiwKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJ1c2VyLnB5IiwKICAgICAgICAgICAgICAgICJpY29uIjogImJpIGJpLWZpbGUtZWFybWFyay1jb2RlIiwKICAgICAgICAgICAgfSwKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImFjdGlvbiI6ICJhZGROb2RlIiwKICAgICAgICAgICAgICAgICJwYXJlbnRLZXkiOiAibW9kZWxzIiwKICAgICAgICAgICAgICAgICJrZXkiOiAiX19pbml0X18ucHkiLAogICAgICAgICAgICAgICAgInRpdGxlIjogIl9faW5pdF9fLnB5IiwKICAgICAgICAgICAgICAgICJpY29uIjogImJpIGJpLWZpbGUtZWFybWFyay1jb2RlIiwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgICAgICJzdGF0dXMiOiAiQWRkaW5nIG1vZGVsIGZpbGVzLi4uIiwKICAgIH0sCiAgICB7CiAgICAgICAgImFjdGlvbnMiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJhY3Rpb24iOiAiYWRkTm9kZSIsCiAgICAgICAgICAgICAgICAicGFyZW50S2V5IjogInRlc3RzIiwKICAgICAgICAgICAgICAgICJrZXkiOiAidGVzdF9tYWluLnB5IiwKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJ0ZXN0X21haW4ucHkiLAogICAgICAgICAgICAgICAgImljb24iOiAiYmkgYmktZmlsZS1lYXJtYXJrLWNvZGUiLAogICAgICAgICAgICB9LAogICAgICAgIF0sCiAgICAgICAgInN0YXR1cyI6ICJBZGRpbmcgdGVzdCBmaWxlLi4uIiwKICAgIH0sCiAgICB7CiAgICAgICAgImFjdGlvbnMiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJhY3Rpb24iOiAiYWRkTm9kZSIsCiAgICAgICAgICAgICAgICAicGFyZW50S2V5IjogInByb2plY3QiLAogICAgICAgICAgICAgICAgImtleSI6ICJSRUFETUUubWQiLAogICAgICAgICAgICAgICAgInRpdGxlIjogIlJFQURNRS5tZCIsCiAgICAgICAgICAgICAgICAiaWNvbiI6ICJiaSBiaS1maWxlLWVhcm1hcmstdGV4dCIsCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJhY3Rpb24iOiAiYWRkTm9kZSIsCiAgICAgICAgICAgICAgICAicGFyZW50S2V5IjogInByb2plY3QiLAogICAgICAgICAgICAgICAgImtleSI6ICJweXByb2plY3QudG9tbCIsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAicHlwcm9qZWN0LnRvbWwiLAogICAgICAgICAgICAgICAgImljb24iOiAiYmkgYmktZmlsZS1lYXJtYXJrLWNvZGUiLAogICAgICAgICAgICB9LAogICAgICAgIF0sCiAgICAgICAgInN0YXR1cyI6ICJBZGRpbmcgcHJvamVjdCBjb25maWcgZmlsZXMuLi4iLAogICAgfSwKICAgIHsKICAgICAgICAiYWN0aW9ucyI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImFjdGlvbiI6ICJyZW5hbWVOb2RlIiwKICAgICAgICAgICAgICAgICJrZXkiOiAibWFpbi5weSIsCiAgICAgICAgICAgICAgICAidGl0bGUiOiAiYXBwLnB5IiwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgICAgICJzdGF0dXMiOiAiUmVuYW1pbmcgbWFpbi5weSB0byBhcHAucHkuLi4iLAogICAgfSwKICAgIHsKICAgICAgICAiYWN0aW9ucyI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImFjdGlvbiI6ICJtb3ZlTm9kZSIsCiAgICAgICAgICAgICAgICAia2V5IjogInV0aWxzLnB5IiwKICAgICAgICAgICAgICAgICJ0YXJnZXRLZXkiOiAibW9kZWxzIiwKICAgICAgICAgICAgICAgICJtb2RlIjogImNoaWxkIiwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgICAgICJzdGF0dXMiOiAiTW92aW5nIHV0aWxzLnB5IGludG8gbW9kZWxzLy4uLiIsCiAgICB9LAogICAgewogICAgICAgICJhY3Rpb25zIjogW3siYWN0aW9uIjogImNvbXBsZXRlIn1dLAogICAgICAgICJzdGF0dXMiOiAiUHJvamVjdCBzdHJ1Y3R1cmUgY29tcGxldGUhIiwKICAgIH0sCl0KCgpkZWYgY3JlYXRlX2RlbW8oKToKICAgICIiIkNyZWF0ZSB0aGUgaW5jcmVtZW50YWwgdHJlZSBkZW1vLiIiIgogICAgdHJlZSA9IFd1bmRlcmJhdW0oc291cmNlPVtdLCBvcHRpb25zPXt9KQoKICAgIHN0YXR1cyA9IHBuLnBhbmUuTWFya2Rvd24oIioqU3RhdHVzOioqIFJlYWR5IHRvIHN0YXJ0IikKICAgIHN0ZXBfaW5kZXggPSB7InZhbHVlIjogMH0KCiAgICBkZWYgZXhlY3V0ZV9zdGVwKCk6CiAgICAgICAgaWYgc3RlcF9pbmRleFsidmFsdWUiXSA+PSBsZW4oU0VRVUVOQ0UpOgogICAgICAgICAgICBzdGF0dXMub2JqZWN0ID0gIioqU3RhdHVzOioqIERlbW8gY29tcGxldGUhIgogICAgICAgICAgICByZXR1cm4KCiAgICAgICAgc3RlcCA9IFNFUVVFTkNFW3N0ZXBfaW5kZXhbInZhbHVlIl1dCiAgICAgICAgc3RhdHVzLm9iamVjdCA9IGYiKipTdGF0dXM6Kioge3N0ZXAuZ2V0KCdzdGF0dXMnLCAnUHJvY2Vzc2luZy4uLicpfSIKICAgICAgICB0cmVlLmV4ZWN1dGVfc3RlcChzdGVwKQogICAgICAgIHN0ZXBfaW5kZXhbInZhbHVlIl0gKz0gMQoKICAgIGRlZiByZXNldF90cmVlKCk6CiAgICAgICAgdHJlZS5jbGVhcigpCiAgICAgICAgc3RlcF9pbmRleFsidmFsdWUiXSA9IDAKICAgICAgICBzdGF0dXMub2JqZWN0ID0gIioqU3RhdHVzOioqIFRyZWUgY2xlYXJlZC4gUmVhZHkgdG8gc3RhcnQuIgoKICAgIGRlZiBydW5fYWxsKCk6CiAgICAgICAgcmVzZXRfdHJlZSgpCiAgICAgICAgdGltZS5zbGVlcCgwLjUpCiAgICAgICAgZm9yIF9pIGluIHJhbmdlKGxlbihTRVFVRU5DRSkpOgogICAgICAgICAgICBleGVjdXRlX3N0ZXAoKQogICAgICAgICAgICB0aW1lLnNsZWVwKDEuMCkKCiAgICBzdGVwX2J0biA9IHBuLndpZGdldHMuQnV0dG9uKG5hbWU9Ik5leHQgU3RlcCIsIGJ1dHRvbl90eXBlPSJwcmltYXJ5IikKICAgIHN0ZXBfYnRuLm9uX2NsaWNrKGxhbWJkYSBlOiBleGVjdXRlX3N0ZXAoKSkKCiAgICByZXNldF9idG4gPSBwbi53aWRnZXRzLkJ1dHRvbihuYW1lPSJSZXNldCIsIGJ1dHRvbl90eXBlPSJkYW5nZXIiKQogICAgcmVzZXRfYnRuLm9uX2NsaWNrKGxhbWJkYSBlOiByZXNldF90cmVlKCkpCgogICAgcnVuX2J0biA9IHBuLndpZGdldHMuQnV0dG9uKG5hbWU9IlJ1biBBbGwgKGJsb2NraW5nKSIsIGJ1dHRvbl90eXBlPSJzdWNjZXNzIikKICAgIHJ1bl9idG4ub25fY2xpY2sobGFtYmRhIGU6IHJ1bl9hbGwoKSkKCiAgICBjb250cm9scyA9IHBuLlJvdyhzdGVwX2J0biwgcmVzZXRfYnRuLCBydW5fYnRuKQoKICAgIHJldHVybiBwbi5Db2x1bW4oCiAgICAgICAgIiMgSW5jcmVtZW50YWwgVHJlZSBVcGRhdGUgRGVtbyIsCiAgICAgICAgIkJ1aWxkcyBhIHByb2plY3QgZm9sZGVyIHN0cnVjdHVyZSBzdGVwIGJ5IHN0ZXAuIiwKICAgICAgICBjb250cm9scywKICAgICAgICBzdGF0dXMsCiAgICAgICAgdHJlZSwKICAgICkKCgphcHAgPSBjcmVhdGVfZGVtbygpCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgcG4uc2VydmUoYXBwKQo=").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "incremental_tree_demo.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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