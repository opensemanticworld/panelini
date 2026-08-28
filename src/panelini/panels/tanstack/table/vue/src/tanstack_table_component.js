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
  // Give the shadow host layout dimensions so percentage widths resolve.
  el.style.display = "block";
  el.style.width = "100%";

  const container = document.createElement("div");
  container.className = "pnl-tst-root";
  el.append(container);

  // Written only by the model listeners below, never by the component.
  const state = reactive({
    source: model.get("source") || [],
    columns: model.get("columns") || [],
    options: model.get("options") || {},
    expandedKeys: model.get("expanded_keys") || [],
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

  // `expanded_keys` is bidirectional but safe: it is a sorted key set, so an echo
  // back from Python is value-equal and stops here instead of looping.
  const setExpandedKeys = (keys) => {
    const current = [...(model.get("expanded_keys") || [])].sort();
    if (sameKeys(current, keys)) return;
    model.set("expanded_keys", keys);
    model.save_changes();
  };

  const app = createApp(TanstackTable, { state, emitEvent, setExpandedKeys });
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
  model.on("change:expanded_keys", () => {
    state.expandedKeys = model.get("expanded_keys") || [];
  });

  return () => {
    app.unmount();
  };
}
