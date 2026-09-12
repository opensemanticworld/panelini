// Imports follow monaco-editor samples/browser-esm-webpack-small (JSON only, so the
// other ~70 language definitions stay out). Worker wiring follows
// samples/browser-esm-vite-react/src/userWorker.ts, with `?worker&inline` instead of
// `?worker` so the workers are embedded and dist stays self-contained.
import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/language/json/monaco.contribution.js";
// Monarch highlighting only: YAML gets colors but no schema service, which the JSON side
// provides for the same document.
import "monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker&inline";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker&inline";
// A real YAML language service (validation, completion, hover against JSON schemas), not
// just the Monarch tokenizer: YAML has no in-document $schema, so fileMatch is its only
// association and the same schemas registered for JSON apply.
import { configureMonacoYaml } from "monaco-yaml";
import YamlWorker from "monaco-yaml/yaml.worker?worker&inline";
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
    if (label === "yaml") return new YamlWorker();
    return new EditorWorker();
  },
};

// configureMonacoYaml registers global providers, exactly like jsonDefaults; created once
// and fed by the same schema maps.
let monacoYaml = null;

function yamlService() {
  if (!monacoYaml) {
    monacoYaml = configureMonacoYaml(monaco, { enableSchemaRequest: false, schemas: [] });
  }
  return monacoYaml;
}

// Monaco ships no Turtle language, so a small Monarch tokenizer supplies the highlighting:
// IRIs, prefixed names, literals with language tags or datatypes, and the @prefix/@base
// directives cover what serializers emit.
let turtleRegistered = false;

function registerTurtle() {
  if (turtleRegistered) return;
  turtleRegistered = true;
  monaco.languages.register({ id: "turtle", extensions: [".ttl"], aliases: ["Turtle"] });
  monaco.languages.setLanguageConfiguration("turtle", {
    comments: { lineComment: "#" },
    brackets: [["[", "]"], ["(", ")"]],
    autoClosingPairs: [
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "<", close: ">" },
    ],
  });
  monaco.languages.setMonarchTokensProvider("turtle", {
    defaultToken: "",
    tokenizer: {
      root: [
        [/#.*$/, "comment"],
        [/@(prefix|base)\b/, "keyword"],
        [/\b(a|true|false)\b/, "keyword"],
        [/<[^<>"{}|^`\s]*>/, "type.identifier"],
        [/"""/, { token: "string", next: "@longString" }],
        [/"(?:[^"\\]|\\.)*"(?:\^\^|@[a-zA-Z][a-zA-Z0-9-]*)?/, "string"],
        [/[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/, "number"],
        [/[A-Za-z_][\w.-]*:[\w.%-]*/, "identifier"],
        [/:[\w.%-]+/, "identifier"],
        [/[;,.\[\]()]/, "delimiter"],
      ],
      longString: [
        [/"""/, { token: "string", next: "@pop" }],
        [/./, "string"],
      ],
    },
  });
}

// jsonDefaults is a page-wide singleton, so every editor's schema is tracked here and
// scoped to that editor's model URI via fileMatch.
const schemas = new Map();
// Schemas registered by the URI a document's own `$schema` names, because that in-document
// pointer takes precedence over any fileMatch association: without a local copy under that
// URI the buffer gets no schema at all, since nothing is ever fetched. Keyed per editor so
// disposal removes exactly what one editor contributed; a relative pointer resolves against
// the in-memory folder the models live in, mirroring how the JSON service resolves it.
const SCHEMA_STORE_BASE = "inmemory://panelini/";
const schemaStores = new Map();

function storeEntries() {
  const merged = new Map();
  for (const store of schemaStores.values()) {
    for (const [key, schema] of Object.entries(store || {})) {
      const uri = /^[a-z][a-z0-9+.-]*:/i.test(key) ? key : new URL(key, SCHEMA_STORE_BASE).href;
      merged.set(uri, schema);
    }
  }
  return merged;
}
// schemaRequest has no per-editor equivalent either, and unlike schemas it cannot be
// scoped by fileMatch, so it is merged: the most permissive level on the page wins.
const SCHEMA_REQUEST_LEVELS = ["ignore", "warning", "error"];
const schemaRequests = new Map();
// Fetching schemas over the network is opt-in and page-wide (another jsonDefaults
// singleton): one editor asking for it turns it on for all.
const schemaFetch = new Map();
let modelSeq = 0;

function syncSchemas() {
  const levels = [...schemaRequests.values()];
  const fetchEnabled = [...schemaFetch.values()].some(Boolean);
  // The registration URI must be fragment-free: yaml-language-server reads a fragment as a
  // JSON-pointer section into the schema and crashes on one that does not exist, where the
  // JSON service treats the URI as an opaque id.
  const fileMatched = [...schemas].map(([uri, schema]) => ({
    uri: `${uri}.schema`,
    fileMatch: [uri],
    schema,
  }));
  const stored = [...storeEntries()].map(([uri, schema]) => ({ uri, schema }));
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: fetchEnabled,
    schemaRequest: SCHEMA_REQUEST_LEVELS.find((level) => levels.includes(level)) ?? "warning",
    schemas: [...fileMatched, ...stored],
  });
  yamlService().update({
    enableSchemaRequest: fetchEnabled,
    schemas: [...fileMatched, ...stored],
  });
}

function setSchemaRequest(uri, level) {
  if (level) {
    schemaRequests.set(uri, level);
  } else {
    schemaRequests.delete(uri);
  }
  syncSchemas();
}

function setSchema(uri, schema) {
  if (schema) {
    schemas.set(uri, schema);
  } else {
    schemas.delete(uri);
  }
  syncSchemas();
}

function setSchemaFetch(uri, enabled) {
  if (enabled) {
    schemaFetch.set(uri, true);
  } else {
    schemaFetch.delete(uri);
  }
  syncSchemas();
}

function setSchemaStore(uri, store) {
  if (store && Object.keys(store).length) {
    schemaStores.set(uri, store);
  } else {
    schemaStores.delete(uri);
  }
  syncSchemas();
}

export function render({ model, el }) {
  injectCodiconFont();
  registerTurtle();
  el.style.height = "100%";
  const container = document.createElement("div");
  container.style.cssText = "width:100%;height:100%;min-height:150px";
  el.appendChild(container);

  const uri = monaco.Uri.parse(`inmemory://panelini/editor-${modelSeq++}.json`);
  const textModel = monaco.editor.createModel(model.get("value"), model.get("language"), uri);
  setSchema(uri.toString(), model.get("json_schema"));
  setSchemaStore(uri.toString(), model.get("schema_store"));
  setSchemaRequest(uri.toString(), model.get("schema_request"));
  setSchemaFetch(uri.toString(), model.get("enable_schema_request"));

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
  model.on("change:schema_store", () => setSchemaStore(uri.toString(), model.get("schema_store")));
  model.on("change:schema_request", () => setSchemaRequest(uri.toString(), model.get("schema_request")));
  model.on("change:enable_schema_request", () => setSchemaFetch(uri.toString(), model.get("enable_schema_request")));
  model.on("change:language", () => monaco.editor.setModelLanguage(textModel, model.get("language")));
  model.on("change:theme", () => monaco.editor.setTheme(model.get("theme")));
  model.on("change:read_only", () => editor.updateOptions({ readOnly: model.get("read_only") }));

  return () => {
    clearTimeout(timer);
    editor.dispose();
    textModel.dispose();
    setSchema(uri.toString(), null);
    setSchemaStore(uri.toString(), null);
    setSchemaRequest(uri.toString(), null);
    setSchemaFetch(uri.toString(), false);
  };
}
