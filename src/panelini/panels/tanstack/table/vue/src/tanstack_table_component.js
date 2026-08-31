import { createApp, reactive } from "vue";
import TanstackTable from "@/TanstackTable.vue";
import "@/tanstack_table.css";

/**
 * anywidget entry point for the TanstackTable panel.
 *
 * Data flow is strictly unidirectional: Python owns `source`, pushes it down, and
 * the component only ever emits intent back through `_event_data`. That removes the
 * need for the `sourceFromJS` guard flag the wunderbaum panel uses to break its
 * JS to Python to JS feedback loop.
 */
export function render({ model, el }) {
  // Give the shadow host layout dimensions so percentage sizes resolve. Height is
  // only meaningful once Panel gives the host one, which is what lets a stretched
  // layout hand the table a fixed box to scroll inside.
  el.style.display = "block";
  el.style.width = "100%";
  el.style.height = "100%";

  const container = document.createElement("div");
  container.className = "pnl-tst-root";
  container.style.height = "100%";
  el.append(container);

  // Written only by the model listeners below, never by the component.
  const state = reactive({
    source: model.get("source") || [],
    columns: model.get("columns") || [],
    options: model.get("options") || {},
    icons: model.get("icons") || {},
    filterText: model.get("filter_text") || "",
    expandedKeys: model.get("expanded_keys") || [],
    selectedKeys: model.get("selected_keys") || [],
  });

  const emitEvent = (eventName, eventParams) => {
    model.set("_event_data", {
      event_name: eventName,
      event_params: eventParams,
      timestamp: Date.now(),
    });
    model.save_changes();
  };

  const sameKeys = (a, b) => a.length === b.length && a.every((key, i) => key === b[i]);

  // `expanded_keys` and `selected_keys` are bidirectional but safe: both are
  // sorted key sets, so an echo back from Python is value-equal and stops here
  // instead of looping.
  const setKeys = (name) => (keys) => {
    const current = [...(model.get(name) || [])].sort();
    if (sameKeys(current, keys)) return;
    model.set(name, keys);
    model.save_changes();
  };

  const setExpandedKeys = setKeys("expanded_keys");
  const setSelectedKeys = setKeys("selected_keys");

  const app = createApp(TanstackTable, { state, emitEvent, setExpandedKeys, setSelectedKeys });
  app.mount(container);

  model.on("change:source", () => {
    state.source = model.get("source") || [];
  });
  model.on("change:columns", () => {
    state.columns = model.get("columns") || [];
  });
  model.on("change:options", () => {
    state.options = model.get("options") || {};
  });
  model.on("change:icons", () => {
    state.icons = model.get("icons") || {};
  });
  model.on("change:filter_text", () => {
    state.filterText = model.get("filter_text") || "";
  });
  model.on("change:expanded_keys", () => {
    state.expandedKeys = model.get("expanded_keys") || [];
  });
  model.on("change:selected_keys", () => {
    state.selectedKeys = model.get("selected_keys") || [];
  });

  return () => {
    app.unmount();
  };
}
