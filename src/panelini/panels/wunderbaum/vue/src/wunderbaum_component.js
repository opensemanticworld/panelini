import { createApp } from "vue";
import WunderbaumComponent from "@/wunderbaum.vue";
import "@/wunderbaum_component.less";
// Bootstrap-icons CSS with base64-inlined font (offline capable).
// Vite's ?inline returns processed CSS as a string (font inlined via assetsInlineLimit).
import bootstrapIconsCss from "bootstrap-icons/font/bootstrap-icons.min.css?inline";

function injectBootstrapIcons(target) {
  // Panel AnyWidgetComponent uses shadow DOM, so CSS must be injected
  // INSIDE the component's el (shadow root) for selectors to match.
  // Also add to document.head to register @font-face globally.
  if (!document.getElementById('wb-bootstrap-icons-css')) {
    const style = document.createElement('style');
    style.id = 'wb-bootstrap-icons-css';
    style.textContent = bootstrapIconsCss;
    document.head.appendChild(style);
  }
  // Inject into shadow root / component container
  const style = document.createElement('style');
  style.textContent = bootstrapIconsCss;
  target.prepend(style);
}

export function render({ model, el }) {
  injectBootstrapIcons(el);

  // Ensure the shadow host has layout dimensions so % widths resolve correctly
  el.style.display = 'block';
  el.style.width = '100%';

  const container = document.createElement('div');
  container.setAttribute("id", "wunderbaum-container");
  el.append(container);

  console.debug("Creating Wunderbaum App");

  // Guard flag to prevent feedback loop:
  // JS emitSource -> Python source update -> change:source -> setSource (would reload tree)
  let sourceFromJS = false;

  // Get initial values from model
  const source = model.get("source") || [];
  const columns = model.get("columns") || [];
  const options = model.get("options") || {};
  const types = model.get("types") || {};
  const contextMenuItems = model.get("context_menu_items") || [];
  const treeId = model.get("tree_id") || "";

  // Create Vue app with event handlers
  const app = createApp(WunderbaumComponent, {
    source: source,
    columns: columns,
    options: options,
    types: types,
    contextMenuItems: contextMenuItems,
    treeId: treeId,

    // Event handlers (Vue uses onEventName convention for emits)
    'onChange:source': (newSource) => {
      console.debug("CHANGE:SOURCE (from JS)");
      sourceFromJS = true;
      model.set("source", newSource);
      model.save_changes();
    },

    'onTree-event': (eventData) => {
      console.debug("TREE-EVENT", eventData);
      eventData.timestamp = Date.now();
      model.set("_event_data", eventData);
      model.save_changes();
    },

    'onFile-drop': (dropData) => {
      console.debug("FILE-DROP", dropData);
      const eventData = {
        event_name: "fileDrop",
        event_params: dropData,
        timestamp: Date.now()
      };
      model.set("_event_data", eventData);
      model.save_changes();
    },

    'onLazy-load': (requestData) => {
      console.debug("LAZY-LOAD", requestData);
      requestData.timestamp = Date.now();
      model.set("_lazy_request", requestData);
      model.save_changes();
    },

    onReady: (value) => {
      console.debug("Wunderbaum is ready");
    }
  });

  const root = app.mount(container);

  // Watch for Python -> JavaScript changes
  model.on("change:source", () => {
    if (sourceFromJS) {
      sourceFromJS = false;
      return;  // Skip: this change originated from JS, don't reload
    }
    console.debug("Python->JS: source changed");
    root.setSource(model.get("source"));
  });

  model.on("change:columns", () => {
    console.debug("Python->JS: columns changed");
    root.setColumns(model.get("columns"));
  });

  model.on("change:options", () => {
    console.debug("Python->JS: options changed");
    root.setOptions(model.get("options"));
  });

  model.on("change:types", () => {
    console.debug("Python->JS: types changed");
    root.setTypes(model.get("types"));
  });

  // Listen for tree action commands (incremental updates)
  model.on("change:_tree_action", () => {
    console.debug("Python->JS: tree action received");
    const actionData = model.get("_tree_action");
    if (actionData && actionData.action) {
      root.handleTreeAction(actionData);
    }
  });

  // Listen for lazy load responses from Python
  model.on("change:_lazy_response", () => {
    console.debug("Python->JS: lazy response received");
    const responseData = model.get("_lazy_response");
    if (responseData) {
      root.handleLazyResponse(responseData);
    }
  });
}
