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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: ce88788be3dab914\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiREFHLXRvLXRyZWUgcHJvamVjdGlvbiBleGFtcGxlIHdpdGggV3VuZGVyYmF1bSAodHJlZSt0YWJsZSBtb2RlKS4KCkRlbW9uc3RyYXRlcyBoaWVyYXJjaGljYWwgcHJvamVjdGlvbiBvZiBhIGRpcmVjdGVkIGFjeWNsaWMgZ3JhcGggd2l0aApIYXNQYXJ0IGFuZCBTdWJDbGFzc09mIHJlbGF0aW9uc2hpcHMgaW50byBhIHRyZWUgdmlldy4KClNoYXJlZCBub2RlcyAobm9kZXMgd2l0aCBtdWx0aXBsZSBwYXJlbnRzKSBhcHBlYXIgdW5kZXIgZWFjaCBwYXJlbnQuCgpGb3IgYSBjb21iaW5lZCB0cmVlICsgZ3JhcGggdmlzdWFsaXphdGlvbiwgc2VlOgogICAgZXhhbXBsZXMvdXNlY2FzZXMvd3VuZGVyYmF1bV92aXNuZXR3b3JrLnB5CiIiIgoKaW1wb3J0IHBhbmVsIGFzIHBuCgpmcm9tIHBhbmVsaW5pLnBhbmVscy53dW5kZXJiYXVtIGltcG9ydCBXdW5kZXJiYXVtCgpwbi5leHRlbnNpb24oKQoKIyBFeGFtcGxlIG9udG9sb2d5IGdyYXBoCkdSQVBIX05PREVTID0gewogICAgIlZlaGljbGUiOiB7CiAgICAgICAgImxhYmVsIjogIlZlaGljbGUiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJBIG1lYW5zIG9mIHRyYW5zcG9ydCIsCiAgICAgICAgInR5cGUiOiAiY2xhc3MiLAogICAgfSwKICAgICJDYXIiOiB7CiAgICAgICAgImxhYmVsIjogIkNhciIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIkEgZm91ci13aGVlbGVkIG1vdG9yIHZlaGljbGUiLAogICAgICAgICJ0eXBlIjogImNsYXNzIiwKICAgIH0sCiAgICAiVHJ1Y2siOiB7CiAgICAgICAgImxhYmVsIjogIlRydWNrIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiQSBsYXJnZSBtb3RvciB2ZWhpY2xlIGZvciB0cmFuc3BvcnRpbmcgZ29vZHMiLAogICAgICAgICJ0eXBlIjogImNsYXNzIiwKICAgIH0sCiAgICAiRW5naW5lIjogewogICAgICAgICJsYWJlbCI6ICJFbmdpbmUiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJBIG1hY2hpbmUgdGhhdCBjb252ZXJ0cyBlbmVyZ3kgaW50byBtb3Rpb24iLAogICAgICAgICJ0eXBlIjogInBhcnQiLAogICAgfSwKICAgICJXaGVlbCI6IHsKICAgICAgICAibGFiZWwiOiAiV2hlZWwiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJBIGNpcmN1bGFyIGNvbXBvbmVudCBmb3IgbW92ZW1lbnQiLAogICAgICAgICJ0eXBlIjogInBhcnQiLAogICAgfSwKICAgICJDaGFzc2lzIjogewogICAgICAgICJsYWJlbCI6ICJDaGFzc2lzIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiVGhlIGJhc2UgZnJhbWUgb2YgYSB2ZWhpY2xlIiwKICAgICAgICAidHlwZSI6ICJwYXJ0IiwKICAgIH0sCiAgICAiRWxlY3RyaWNNb3RvciI6IHsKICAgICAgICAibGFiZWwiOiAiRWxlY3RyaWMgTW90b3IiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJBbiBlbGVjdHJpYy1wb3dlcmVkIGVuZ2luZSIsCiAgICAgICAgInR5cGUiOiAicGFydCIsCiAgICB9LAogICAgIkVsZWN0cmljQ2FyIjogewogICAgICAgICJsYWJlbCI6ICJFbGVjdHJpYyBDYXIiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJBIGNhciBwb3dlcmVkIGJ5IGVsZWN0cmljaXR5IiwKICAgICAgICAidHlwZSI6ICJjbGFzcyIsCiAgICB9LAp9CgpHUkFQSF9FREdFUyA9IFsKICAgIHsiZnJvbSI6ICJDYXIiLCAidG8iOiAiVmVoaWNsZSIsICJyZWxhdGlvbiI6ICJTdWJDbGFzc09mIn0sCiAgICB7ImZyb20iOiAiVHJ1Y2siLCAidG8iOiAiVmVoaWNsZSIsICJyZWxhdGlvbiI6ICJTdWJDbGFzc09mIn0sCiAgICB7ImZyb20iOiAiRWxlY3RyaWNDYXIiLCAidG8iOiAiQ2FyIiwgInJlbGF0aW9uIjogIlN1YkNsYXNzT2YifSwKICAgIHsiZnJvbSI6ICJDYXIiLCAidG8iOiAiRW5naW5lIiwgInJlbGF0aW9uIjogIkhhc1BhcnQifSwKICAgIHsiZnJvbSI6ICJDYXIiLCAidG8iOiAiV2hlZWwiLCAicmVsYXRpb24iOiAiSGFzUGFydCJ9LAogICAgeyJmcm9tIjogIkNhciIsICJ0byI6ICJDaGFzc2lzIiwgInJlbGF0aW9uIjogIkhhc1BhcnQifSwKICAgIHsiZnJvbSI6ICJUcnVjayIsICJ0byI6ICJFbmdpbmUiLCAicmVsYXRpb24iOiAiSGFzUGFydCJ9LAogICAgeyJmcm9tIjogIlRydWNrIiwgInRvIjogIldoZWVsIiwgInJlbGF0aW9uIjogIkhhc1BhcnQifSwKICAgIHsiZnJvbSI6ICJUcnVjayIsICJ0byI6ICJDaGFzc2lzIiwgInJlbGF0aW9uIjogIkhhc1BhcnQifSwKICAgIHsiZnJvbSI6ICJFbGVjdHJpY0NhciIsICJ0byI6ICJFbGVjdHJpY01vdG9yIiwgInJlbGF0aW9uIjogIkhhc1BhcnQifSwKXQoKCmRlZiBkYWdfdG9fdHJlZV9zb3VyY2UoCiAgICBub2RlczogZGljdFtzdHIsIGRpY3RdLAogICAgZWRnZXM6IGxpc3RbZGljdF0sCiAgICByb290X2tleXM6IGxpc3Rbc3RyXSB8IE5vbmUgPSBOb25lLAogICAgZWRnZV90eXBlczogbGlzdFtzdHJdIHwgTm9uZSA9IE5vbmUsCiAgICBwYXJlbnRfdG9fY2hpbGRfZWRnZXM6IGxpc3Rbc3RyXSB8IE5vbmUgPSBOb25lLAopIC0+IGxpc3RbZGljdF06CiAgICAiIiJDb252ZXJ0IGEgREFHIGdyYXBoIHRvIGEgV3VuZGVyYmF1bSB0cmVlIHNvdXJjZS4KCiAgICBOb2RlcyB3aXRoIG11bHRpcGxlIHBhcmVudHMgYXJlIGR1cGxpY2F0ZWQgaW4gdGhlIHRyZWUuCgogICAgRWRnZSBkaXJlY3Rpb24gZGVwZW5kcyBvbiB0aGUgcmVsYXRpb24gdHlwZToKICAgIC0gU3ViQ2xhc3NPZjogZnJvbT1jaGlsZCwgdG89cGFyZW50IChDYXIgU3ViQ2xhc3NPZiBWZWhpY2xlIC0+IFZlaGljbGUgaXMgcGFyZW50KQogICAgLSBIYXNQYXJ0OiBmcm9tPXBhcmVudCwgdG89Y2hpbGQgKENhciBIYXNQYXJ0IEVuZ2luZSAtPiBDYXIgaXMgcGFyZW50KQoKICAgIEFyZ3M6CiAgICAgICAgcGFyZW50X3RvX2NoaWxkX2VkZ2VzOiBFZGdlIHR5cGVzIHdoZXJlIGZyb209cGFyZW50LCB0bz1jaGlsZCAoZS5nLiBIYXNQYXJ0KS4KICAgICAgICAgICAgQWxsIG90aGVyIGVkZ2UgdHlwZXMgYXJlIHRyZWF0ZWQgYXMgZnJvbT1jaGlsZCwgdG89cGFyZW50IChlLmcuIFN1YkNsYXNzT2YpLgogICAgIiIiCiAgICBpZiBlZGdlX3R5cGVzIGlzIE5vbmU6CiAgICAgICAgZWRnZV90eXBlcyA9IFsiU3ViQ2xhc3NPZiIsICJIYXNQYXJ0Il0KICAgIGlmIHBhcmVudF90b19jaGlsZF9lZGdlcyBpcyBOb25lOgogICAgICAgIHBhcmVudF90b19jaGlsZF9lZGdlcyA9IFsiSGFzUGFydCJdCgogICAgIyBCdWlsZCBwYXJlbnQtPmNoaWxkcmVuIG1hcHBpbmcKICAgIGNoaWxkcmVuX21hcDogZGljdFtzdHIsIGxpc3RbdHVwbGVbc3RyLCBzdHJdXV0gPSB7fQogICAgaGFzX3BhcmVudDogc2V0W3N0cl0gPSBzZXQoKQogICAgZm9yIGVkZ2UgaW4gZWRnZXM6CiAgICAgICAgcmVsID0gZWRnZVsicmVsYXRpb24iXQogICAgICAgIGlmIHJlbCBub3QgaW4gZWRnZV90eXBlczoKICAgICAgICAgICAgY29udGludWUKICAgICAgICBpZiByZWwgaW4gcGFyZW50X3RvX2NoaWxkX2VkZ2VzOgogICAgICAgICAgICAjIGZyb209cGFyZW50LCB0bz1jaGlsZCAoZS5nLiBDYXIgSGFzUGFydCBFbmdpbmUpCiAgICAgICAgICAgIHBhcmVudF9pZCA9IGVkZ2VbImZyb20iXQogICAgICAgICAgICBjaGlsZF9pZCA9IGVkZ2VbInRvIl0KICAgICAgICBlbHNlOgogICAgICAgICAgICAjIGZyb209Y2hpbGQsIHRvPXBhcmVudCAoZS5nLiBDYXIgU3ViQ2xhc3NPZiBWZWhpY2xlKQogICAgICAgICAgICBwYXJlbnRfaWQgPSBlZGdlWyJ0byJdCiAgICAgICAgICAgIGNoaWxkX2lkID0gZWRnZVsiZnJvbSJdCiAgICAgICAgaWYgcGFyZW50X2lkIG5vdCBpbiBjaGlsZHJlbl9tYXA6CiAgICAgICAgICAgIGNoaWxkcmVuX21hcFtwYXJlbnRfaWRdID0gW10KICAgICAgICBjaGlsZHJlbl9tYXBbcGFyZW50X2lkXS5hcHBlbmQoKGNoaWxkX2lkLCByZWwpKQogICAgICAgIGhhc19wYXJlbnQuYWRkKGNoaWxkX2lkKQoKICAgIGlmIHJvb3Rfa2V5cyBpcyBOb25lOgogICAgICAgIHJvb3Rfa2V5cyA9IFtuaWQgZm9yIG5pZCBpbiBub2RlcyBpZiBuaWQgbm90IGluIGhhc19wYXJlbnRdCgogICAgZGVmIGJ1aWxkX25vZGUobm9kZV9pZDogc3RyLCBwYXRoOiBzdHIsIHJlbGF0aW9uOiBzdHIgPSAiIikgLT4gZGljdDoKICAgICAgICBwcm9wcyA9IG5vZGVzLmdldChub2RlX2lkLCB7fSkKICAgICAgICBub2RlX2tleSA9IGYie3BhdGh9L3tub2RlX2lkfSIgaWYgcGF0aCBlbHNlIG5vZGVfaWQKICAgICAgICBpY29uX21hcCA9IHsiY2xhc3MiOiAiYmkgYmktZGlhZ3JhbS0zIiwgInBhcnQiOiAiYmkgYmktcHV6emxlIn0KCiAgICAgICAgIyBDb2x1bW4gdmFsdWVzIGxpdmUgYXQgdGhlIG5vZGUgbGV2ZWw7IHd1bmRlcmJhdW0gYXV0by1tb3ZlcyBub24tcmVzZXJ2ZWQKICAgICAgICAjIGtleXMgaW50byBub2RlLmRhdGEgZm9yIHRoZSBncmlkLiAidHlwZSIgaXMgYSByZXNlcnZlZCB3dW5kZXJiYXVtIGtleQogICAgICAgICMgKG5vZGUgdHlwaW5nKSwgc28gdGhlIFR5cGUgY29sdW1uIHJlYWRzIGZyb20gIm5vZGVfdHlwZSIgaW5zdGVhZC4KICAgICAgICB0cmVlX25vZGU6IGRpY3QgPSB7CiAgICAgICAgICAgICJ0aXRsZSI6IHByb3BzLmdldCgibGFiZWwiLCBub2RlX2lkKSwKICAgICAgICAgICAgImtleSI6IG5vZGVfa2V5LAogICAgICAgICAgICAiaWNvbiI6IGljb25fbWFwLmdldChwcm9wcy5nZXQoInR5cGUiLCAiIiksICJiaSBiaS1jaXJjbGUiKSwKICAgICAgICAgICAgImV4cGFuZGVkIjogVHJ1ZSwKICAgICAgICAgICAgIm5vZGVfaWQiOiBub2RlX2lkLAogICAgICAgICAgICAibm9kZV90eXBlIjogcHJvcHMuZ2V0KCJ0eXBlIiwgIiIpLAogICAgICAgICAgICAicmVsYXRpb24iOiByZWxhdGlvbiwKICAgICAgICAgICAgImRlc2NyaXB0aW9uIjogcHJvcHMuZ2V0KCJkZXNjcmlwdGlvbiIsICIiKSwKICAgICAgICB9CgogICAgICAgIGNoaWxkX2VkZ2VzID0gY2hpbGRyZW5fbWFwLmdldChub2RlX2lkLCBbXSkKICAgICAgICBpZiBjaGlsZF9lZGdlczoKICAgICAgICAgICAgdHJlZV9ub2RlWyJjaGlsZHJlbiJdID0gW2J1aWxkX25vZGUoY2hpbGRfaWQsIG5vZGVfa2V5LCByZWwpIGZvciBjaGlsZF9pZCwgcmVsIGluIGNoaWxkX2VkZ2VzXQoKICAgICAgICByZXR1cm4gdHJlZV9ub2RlCgogICAgcmV0dXJuIFtidWlsZF9ub2RlKHJvb3RfaWQsICIiLCAiIikgZm9yIHJvb3RfaWQgaW4gcm9vdF9rZXlzXQoKCiMgQnVpbGQgdHJlZSBzb3VyY2UgZnJvbSBncmFwaApzb3VyY2UgPSBkYWdfdG9fdHJlZV9zb3VyY2UoR1JBUEhfTk9ERVMsIEdSQVBIX0VER0VTKQoKY29sdW1ucyA9IFsKICAgIHsiaWQiOiAiKiIsICJ0aXRsZSI6ICJOYW1lIiwgIndpZHRoIjogIjI1MHB4In0sCiAgICB7ImlkIjogIm5vZGVfdHlwZSIsICJ0aXRsZSI6ICJUeXBlIiwgIndpZHRoIjogIjgwcHgifSwKICAgIHsiaWQiOiAicmVsYXRpb24iLCAidGl0bGUiOiAiUmVsYXRpb24iLCAid2lkdGgiOiAiMTAwcHgifSwKICAgIHsiaWQiOiAiZGVzY3JpcHRpb24iLCAidGl0bGUiOiAiRGVzY3JpcHRpb24iLCAid2lkdGgiOiAiMzAwcHgifSwKXQoKdHJlZSA9IFd1bmRlcmJhdW0oc291cmNlPXNvdXJjZSwgY29sdW1ucz1jb2x1bW5zKQoKYXBwID0gcG4uQ29sdW1uKAogICAgIiMgREFHIFByb2plY3Rpb24gRGVtbyIsCiAgICAiSGllcmFyY2hpY2FsIHByb2plY3Rpb24gb2YgYSBkaXJlY3RlZCBhY3ljbGljIGdyYXBoLiIsCiAgICAiRWRnZXM6IGBTdWJDbGFzc09mYCBhbmQgYEhhc1BhcnRgLiBTaGFyZWQgbm9kZXMgYXBwZWFyIHVuZGVyIGVhY2ggcGFyZW50LiIsCiAgICB0cmVlLAopCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgcG4uc2VydmUoYXBwKQo=").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "dag_projection.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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