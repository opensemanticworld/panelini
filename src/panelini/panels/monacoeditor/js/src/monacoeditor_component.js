// Imports follow monaco-editor samples/browser-esm-webpack-small (JSON only, so the
// other ~70 language definitions stay out). Worker wiring follows
// samples/browser-esm-vite-react/src/userWorker.ts, with `?worker&inline` instead of
// `?worker` so the workers are embedded and dist stays self-contained.
import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/language/json/monaco.contribution.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker&inline";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker&inline";
import codiconTtf from "monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf?inline";

const SYNC_DEBOUNCE_MS = 300;

// Panel injects _stylesheets into the shadow root, where @font-face is ignored, so the
// suggest and folding icons render as tofu boxes. Register the font on the document once.
let codiconInjected = false;

function injectCodiconFont() {
  if (codiconInjected) return;
  codiconInjected = true;
  const style = document.createElement("style");
  style.textContent = `@font-face{font-family:codicon;font-display:block;src:url(${codiconTtf}) format("truetype")}`;
  document.head.appendChild(style);
}

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") return new JsonWorker();
    return new EditorWorker();
  },
};

// jsonDefaults is a page-wide singleton, so every editor's schema is tracked here and
// scoped to that editor's model URI via fileMatch.
const schemas = new Map();
let modelSeq = 0;

function syncSchemas() {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: false,
    schemas: [...schemas].map(([uri, schema]) => ({
      uri: `${uri}#schema`,
      fileMatch: [uri],
      schema,
    })),
  });
}

function setSchema(uri, schema) {
  if (schema) {
    schemas.set(uri, schema);
  } else {
    schemas.delete(uri);
  }
  syncSchemas();
}

export function render({ model, el }) {
  injectCodiconFont();
  el.style.height = "100%";
  const container = document.createElement("div");
  container.style.cssText = "width:100%;height:100%;min-height:150px";
  el.appendChild(container);

  const uri = monaco.Uri.parse(`inmemory://panelini/editor-${modelSeq++}.json`);
  const textModel = monaco.editor.createModel(model.get("value"), model.get("language"), uri);
  setSchema(uri.toString(), model.get("json_schema"));

  const editor = monaco.editor.create(container, {
    model: textModel,
    theme: model.get("theme"),
    readOnly: model.get("read_only"),
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    ...(model.get("options") || {}),
  });

  // Monaco's global mouse-leave monitor tests viewDomNode.contains(event.target) on a
  // document listener. Inside a shadow root the event retargets to the host, so that is
  // always false and every mouse move is treated as leaving the editor, which cancels the
  // pending hover. Monaco's own handler sits deeper, so it has already run by now.
  container.addEventListener("mousemove", (event) => event.stopPropagation());

  let applying = false;
  let timer = null;

  textModel.onDidChangeContent(() => {
    if (applying) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      model.set("value", textModel.getValue());
      model.save_changes();
    }, SYNC_DEBOUNCE_MS);
  });

  model.on("change:value", () => {
    const next = model.get("value");
    if (next === textModel.getValue()) return;
    applying = true;
    textModel.setValue(next);
    applying = false;
  });
  model.on("change:json_schema", () => setSchema(uri.toString(), model.get("json_schema")));
  model.on("change:language", () => monaco.editor.setModelLanguage(textModel, model.get("language")));
  model.on("change:theme", () => monaco.editor.setTheme(model.get("theme")));
  model.on("change:read_only", () => editor.updateOptions({ readOnly: model.get("read_only") }));

  return () => {
    clearTimeout(timer);
    editor.dispose();
    textModel.dispose();
    setSchema(uri.toString(), null);
  };
}
