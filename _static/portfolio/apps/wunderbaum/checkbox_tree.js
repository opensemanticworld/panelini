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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n# portfolio-sig: 493dd0effe70ca63\n# AUTO-GENERATED for the Pyodide portfolio - do not edit.\n# panelini is installed by the converter's env bootstrap (a relative-URL wheel whose\n# unused \`\`watchfiles\`\` dependency was stripped so micropip can resolve it).\nimport base64\nimport os\nimport types\nimport panel as pn\nfrom panelini import Panelini\n\n# Force panelini's terminal mirror to its WASM-safe console view for the *build-time*\n# render too (panel convert snapshots on the host, where xterm.js would otherwise be\n# embedded and then throw in the browser before the worker hydrates).\nos.environ.setdefault("PANELINI_TERMINAL_MODE", "console")\n\n# The AI examples import LangChain and talk to a provider. LangChain cannot be\n# installed under Pyodide (langchain-core needs uuid-utils and zstandard, native\n# extensions with no pure-Python wheel), and provider credentials must never ship in a\n# public page. Registering the stand-ins here - before the example source is executed\n# below - makes the example's own \`\`import langchain...\`\` lines resolve to them, so the\n# example file itself stays untouched and still uses the real stack everywhere else.\n# Replies are canned; the pages say so.\nif False:\n    from panelini.ai_testing import install as __pf_install_ai_stub\n\n    __pf_install_ai_stub()\n\npn.extension("tabulator", "jsoneditor", "plotly")\n\n# In WASM, panel.io exposes only \`\`serve\`\` (from panel.io.pyodide); the tornado-backed\n# \`\`panel.io.server\`\` submodule is never imported. Provide a patchable stand-in so the\n# interceptors below - and any inlined \`\`pn.io.server.serve(...)\`\` example calls -\n# resolve instead of raising \`\`AttributeError\`\`.\nif not hasattr(pn.io, "server"):\n    pn.io.server = types.SimpleNamespace(serve=getattr(pn, "serve", None))\n\n__pf_orig = {\n    "pn_serve": getattr(pn, "serve", None),\n    "io_serve": getattr(pn.io.server, "serve", None),\n    "viewable": pn.viewable.Viewable.servable,\n    "panelini": Panelini.servable,\n}\n__pf_captured = []\n\n\nclass __PfStop(Exception):\n    pass\n\n\ndef __pf_rec_self(self, *a, **k):\n    __pf_captured.append(self)\n    raise __PfStop\n\n\ndef __pf_rec_serve(panels, *a, **k):\n    __pf_captured.append(panels)\n    raise __PfStop\n\n\nPanelini.servable = __pf_rec_self\npn.viewable.Viewable.servable = __pf_rec_self\npn.serve = __pf_rec_serve\npn.io.server.serve = __pf_rec_serve\n\n__pf_src = base64.b64decode("IiIiSGllcmFyY2hpY2FsIGNoZWNrYm94IHRyZWUgd2l0aCB0cmktc3RhdGUgc2VsZWN0aW9uLgoKRGVtb25zdHJhdGVzIGBgc2VsZWN0TW9kZTogImhpZXIiYGAgd2hpY2ggcHJvcGFnYXRlcyBjaGVja2JveCBzdGF0ZToKLSBDaGVja2luZyBhIHBhcmVudCBjaGVja3MgYWxsIGNoaWxkcmVuLgotIFBhcnRpYWwgY2hpbGQgc2VsZWN0aW9uIHNob3dzIGFuIGluZGV0ZXJtaW5hdGUgY2hlY2tib3ggb24gdGhlIHBhcmVudC4KClRoZSAiQ2hlY2tlZCIgZGlzcGxheSB1cGRhdGVzIGxpdmUgYXMgY2hlY2tib3hlcyBhcmUgdG9nZ2xlZC4KIiIiCgppbXBvcnQgcGFuZWwgYXMgcG4KCmZyb20gcGFuZWxpbmkgaW1wb3J0IFBhbmVsaW5pCmZyb20gcGFuZWxpbmkucGFuZWxzLnd1bmRlcmJhdW0gaW1wb3J0IFd1bmRlcmJhdW0KCnNvdXJjZSA9IFsKICAgIHsKICAgICAgICAidGl0bGUiOiAiRnJ1aXRzIiwKICAgICAgICAia2V5IjogImZydWl0cyIsCiAgICAgICAgImV4cGFuZGVkIjogVHJ1ZSwKICAgICAgICAiY2hpbGRyZW4iOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJDaXRydXMiLAogICAgICAgICAgICAgICAgImtleSI6ICJjaXRydXMiLAogICAgICAgICAgICAgICAgImV4cGFuZGVkIjogVHJ1ZSwKICAgICAgICAgICAgICAgICJjaGlsZHJlbiI6IFsKICAgICAgICAgICAgICAgICAgICB7InRpdGxlIjogIk9yYW5nZSIsICJrZXkiOiAib3JhbmdlIn0sCiAgICAgICAgICAgICAgICAgICAgeyJ0aXRsZSI6ICJMZW1vbiIsICJrZXkiOiAibGVtb24ifSwKICAgICAgICAgICAgICAgICAgICB7InRpdGxlIjogIkxpbWUiLCAia2V5IjogImxpbWUifSwKICAgICAgICAgICAgICAgIF0sCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJ0aXRsZSI6ICJCZXJyaWVzIiwKICAgICAgICAgICAgICAgICJrZXkiOiAiYmVycmllcyIsCiAgICAgICAgICAgICAgICAiY2hpbGRyZW4iOiBbCiAgICAgICAgICAgICAgICAgICAgeyJ0aXRsZSI6ICJTdHJhd2JlcnJ5IiwgImtleSI6ICJzdHJhd2JlcnJ5In0sCiAgICAgICAgICAgICAgICAgICAgeyJ0aXRsZSI6ICJCbHVlYmVycnkiLCAia2V5IjogImJsdWViZXJyeSJ9LAogICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgfSwKICAgIHsKICAgICAgICAidGl0bGUiOiAiVmVnZXRhYmxlcyIsCiAgICAgICAgImtleSI6ICJ2ZWdldGFibGVzIiwKICAgICAgICAiZXhwYW5kZWQiOiBUcnVlLAogICAgICAgICJjaGlsZHJlbiI6IFsKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgInRpdGxlIjogIlJvb3QiLAogICAgICAgICAgICAgICAgImtleSI6ICJyb290IiwKICAgICAgICAgICAgICAgICJjaGlsZHJlbiI6IFsKICAgICAgICAgICAgICAgICAgICB7InRpdGxlIjogIkNhcnJvdCIsICJrZXkiOiAiY2Fycm90In0sCiAgICAgICAgICAgICAgICAgICAgeyJ0aXRsZSI6ICJQb3RhdG8iLCAia2V5IjogInBvdGF0byJ9LAogICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgfSwKICAgICAgICAgICAgewogICAgICAgICAgICAgICAgInRpdGxlIjogIkxlYWZ5IiwKICAgICAgICAgICAgICAgICJrZXkiOiAibGVhZnkiLAogICAgICAgICAgICAgICAgImNoaWxkcmVuIjogWwogICAgICAgICAgICAgICAgICAgIHsidGl0bGUiOiAiU3BpbmFjaCIsICJrZXkiOiAic3BpbmFjaCJ9LAogICAgICAgICAgICAgICAgICAgIHsidGl0bGUiOiAiTGV0dHVjZSIsICJrZXkiOiAibGV0dHVjZSJ9LAogICAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgfSwKICAgICAgICBdLAogICAgfSwKXQoKCmRlZiBfZ2V0X2NoZWNrZWRfa2V5cyhzcmM6IGxpc3RbZGljdF0pIC0+IGxpc3Rbc3RyXToKICAgICIiIldhbGsgKnNyYyogYW5kIHJldHVybiBrZXlzIG9mIG5vZGVzIHdpdGggYGBzZWxlY3RlZDogVHJ1ZWBgLiIiIgogICAga2V5czogbGlzdFtzdHJdID0gW10KCiAgICBkZWYgd2Fsayhub2RlczogbGlzdFtkaWN0XSkgLT4gTm9uZToKICAgICAgICBmb3IgbiBpbiBub2RlczoKICAgICAgICAgICAgaWYgbi5nZXQoInNlbGVjdGVkIik6CiAgICAgICAgICAgICAgICBrZXlzLmFwcGVuZChuWyJrZXkiXSkKICAgICAgICAgICAgd2FsayhuLmdldCgiY2hpbGRyZW4iLCBbXSkpCgogICAgd2FsayhzcmMpCiAgICByZXR1cm4ga2V5cwoKCnRyZWUgPSBXdW5kZXJiYXVtKAogICAgc291cmNlPXNvdXJjZSwKICAgIG9wdGlvbnM9eyJjaGVja2JveCI6IFRydWUsICJzZWxlY3RNb2RlIjogImhpZXIifSwKKQoKY2hlY2tlZF9kaXNwbGF5ID0gcG4ucGFuZS5NYXJrZG93bigiKipDaGVja2VkOioqIChub25lKSIpCgoKZGVmIF9vbl9zb3VyY2VfY2hhbmdlKCphcmdzOiBvYmplY3QpIC0+IE5vbmU6CiAgICBrZXlzID0gX2dldF9jaGVja2VkX2tleXModHJlZS5zb3VyY2UpCiAgICBpZiBrZXlzOgogICAgICAgIGNoZWNrZWRfZGlzcGxheS5vYmplY3QgPSBmIioqQ2hlY2tlZDoqKiB7JywgJy5qb2luKGtleXMpfSIKICAgIGVsc2U6CiAgICAgICAgY2hlY2tlZF9kaXNwbGF5Lm9iamVjdCA9ICIqKkNoZWNrZWQ6KiogKG5vbmUpIgoKCnRyZWUucGFyYW0ud2F0Y2goX29uX3NvdXJjZV9jaGFuZ2UsIFsic291cmNlIl0pCgphcHAgPSBQYW5lbGluaSh0aXRsZT0iQ2hlY2tib3ggVHJlZSBEZW1vIiwgc2lkZWJhcl92aXNpYmxlPUZhbHNlKQphcHAubWFpbl9zZXQoCiAgICBvYmplY3RzPVsKICAgICAgICBwbi5DYXJkKAogICAgICAgICAgICB0aXRsZT0iQ2hlY2tib3ggVHJlZSIsCiAgICAgICAgICAgIG9iamVjdHM9W3RyZWVdLAogICAgICAgICAgICBtYXhfaGVpZ2h0PTgwMCwKICAgICAgICAgICAgc2l6aW5nX21vZGU9InN0cmV0Y2hfd2lkdGgiLAogICAgICAgICksCiAgICAgICAgY2hlY2tlZF9kaXNwbGF5LAogICAgXQopCmFwcC5zZXJ2YWJsZSgpCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgcG4uaW8uc2VydmVyLnNlcnZlKGFwcCwgcG9ydD01MDExKQo=").decode("utf-8")\ntry:\n    exec(compile(__pf_src, "checkbox_tree.py", "exec"), globals())\nexcept __PfStop:\n    pass\nexcept Exception:\n    import traceback\n    traceback.print_exc()\n\nPanelini.servable = __pf_orig["panelini"]\npn.viewable.Viewable.servable = __pf_orig["viewable"]\nif __pf_orig["pn_serve"] is not None:\n    pn.serve = __pf_orig["pn_serve"]\nif __pf_orig["io_serve"] is not None:\n    pn.io.server.serve = __pf_orig["io_serve"]\n\n\ndef __pf_flat(items):\n    out = []\n    for it in items:\n        if isinstance(it, dict):\n            out.extend(it.values())\n        elif isinstance(it, (list, tuple)):\n            out.extend(it)\n        else:\n            out.append(it)\n    return out\n\n\ndef __pf_is_view(o):\n    # Anything Panel can render: a Viewable/Viewer, or a duck-typed object exposing\n    # \`\`__panel__\`\` (e.g. a plain class like GraphDetailTool that defines __panel__).\n    return isinstance(o, (Panelini, pn.viewable.Viewable, pn.viewable.Viewer)) or hasattr(o, "__panel__")\n\n\n__pf_view = None\nfor __pf_it in __pf_flat(__pf_captured):\n    if isinstance(__pf_it, Panelini):\n        __pf_view = __pf_it\n        break\nif __pf_view is None:\n    for __pf_it in __pf_flat(__pf_captured):\n        if __pf_is_view(__pf_it):\n            __pf_view = __pf_it\n            break\nif __pf_view is None and __pf_is_view(globals().get("app")):\n    __pf_view = globals().get("app")\n\nif isinstance(__pf_view, Panelini):\n    # Collapse the left sidebar when it is empty so the embedded demo uses the full\n    # iframe width (the toggle button stays, so it can still be opened). Judged on the\n    # left sidebar alone: a demo can fill only the right one and still waste the left.\n    if not __pf_view.sidebar:\n        __pf_view.sidebar_visible = False\n    __pf_orig["panelini"](__pf_view)\nelif __pf_view is not None:\n    # pn.panel() turns Viewables, Viewers, and \`\`__panel__\`\` objects into a servable.\n    pn.panel(__pf_view).servable()\nelse:\n    pn.pane.Markdown("# Could not render this example").servable()\n\n\nawait write_doc()`)
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