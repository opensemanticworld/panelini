import { createApp, reactive } from "vue";
import TanstackTable from "@/TanstackTable.vue";
import "@/tanstack_table.css";

/**
 * anywidget entry point for the TanstackTable panel.
 *
 * Data flow is strictly unidirectional: Python owns the tree, pushes down what this
 * side should hold, and the component only ever emits intent back through
 * `_event_data`. That removes the need for the `sourceFromJS` guard flag the
 * wunderbaum panel uses to break its JS to Python to JS feedback loop.
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
    // What this side holds, which is the whole tree unless `options.prune` asked
    // Python to send the opened branches only. The tree Python owns is not on the
    // wire at all, so there is nothing here to mistake for it.
    view: model.get("_view") || [],
    columns: model.get("columns") || [],
    options: model.get("options") || {},
    icons: model.get("icons") || {},
    // A node names a type, the registry says what that type's nodes are like.
    // Read wherever a field is read, never merged into `source`, which is what
    // keeps a tree of a thousand files from carrying the same fields a thousand
    // times over the socket.
    types: model.get("types") || {},
    filterText: model.get("filter_text") || "",
    editingKey: model.get("editing_key") || "",
    expandedKeys: model.get("expanded_keys") || [],
    selectedKeys: model.get("selected_keys") || [],
    // A view concern like the filter, and bidirectional for the same reason: an
    // application may set a default sort or read back the one the user chose.
    sorting: model.get("sorting") || [],
    // The same again for the widths a user dragged, keyed by column id and
    // holding only the columns somebody actually sized.
    columnWidths: model.get("column_widths") || {},
    // Python owns the history as it owns the tree. The toolbar asks for a step and
    // reads these to know whether there is one, rather than counting its own.
    canUndo: model.get("can_undo") || false,
    canRedo: model.get("can_redo") || false,
    // Python holds the clipboard for the same reason it holds the tree: the keys
    // in it have to mean something there. The toolbar reads it to enable paste
    // and the grid reads it to fade the rows waiting to be moved.
    clipboard: model.get("clipboard") || {},
    // Minted once in Python and constant for the life of the table, so there is
    // nothing to listen for. A cross-pane drag carries it, which is how the pane a
    // drop lands in can name the pane the rows came from.
    tableId: model.get("_table_id") || "",
  });

  // One gesture can produce two intents: the click that dismisses an open title
  // editor commits a `rename` and then activates the row it landed on. `_event_data`
  // is a single param, and two writes inside one animation frame reach Python as the
  // second one only, so the payload carries a list and a sequence number rather than
  // one event.
  //
  // The list is a bounded tail rather than a queue drained on write, because there is
  // no acknowledgement to drain it against: a write that was overtaken is still in
  // the list the next one carries, and Python skips the sequence numbers it has
  // already handled. Re-sending a handled event is therefore free, while losing one
  // would silently drop a rename.
  const RECENT_EVENTS = 16;
  const recent = [];
  let sequence = 0;

  const emitEvent = (eventName, eventParams) => {
    sequence += 1;
    recent.push({ seq: sequence, event_name: eventName, event_params: eventParams });
    if (recent.length > RECENT_EVENTS) recent.shift();
    model.set("_event_data", { events: [...recent], timestamp: Date.now() });
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

  // `filter_text` is bidirectional for the same reason: a scalar echo is value
  // equal and terminates. The toolbar's search box is the only writer, and a
  // table without one leaves this unused.
  const setFilterText = (value) => {
    if ((model.get("filter_text") || "") === value) return;
    model.set("filter_text", value);
    model.save_changes();
  };

  // `editing_key` is bidirectional for the same reason: Python may open the
  // editor by writing a key, and the browser writes "" back when it closes.
  const setEditingKey = (value) => {
    if ((model.get("editing_key") || "") === value) return;
    model.set("editing_key", value);
    model.save_changes();
  };

  // `sorting` is a list of small flat dicts rather than a key set, so the guard
  // compares them field by field instead of by sorted value. The list holds one
  // entry at most, so this is a comparison of two things at worst.
  const sameSorting = (a, b) =>
    a.length === b.length && a.every((entry, i) => entry.id === b[i].id && !!entry.desc === !!b[i].desc);

  const setSorting = (value) => {
    if (sameSorting(model.get("sorting") || [], value)) return;
    model.set("sorting", value);
    model.save_changes();
  };

  // Widths are a flat map of column id to pixels, so the guard is a key by key
  // compare. The component only calls this when a drag has finished, never on the
  // frames it is made of.
  const sameWidths = (a, b) => {
    const ids = Object.keys(a);
    return ids.length === Object.keys(b).length && ids.every((id) => a[id] === b[id]);
  };

  const setColumnWidths = (value) => {
    if (sameWidths(model.get("column_widths") || {}, value)) return;
    model.set("column_widths", value);
    model.save_changes();
  };

  const app = createApp(TanstackTable, {
    state,
    emitEvent,
    setExpandedKeys,
    setSelectedKeys,
    setFilterText,
    setEditingKey,
    setSorting,
    setColumnWidths,
  });
  app.mount(container);

  model.on("change:_view", () => {
    state.view = model.get("_view") || [];
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
  model.on("change:types", () => {
    state.types = model.get("types") || {};
  });
  model.on("change:filter_text", () => {
    state.filterText = model.get("filter_text") || "";
  });
  model.on("change:editing_key", () => {
    state.editingKey = model.get("editing_key") || "";
  });
  model.on("change:expanded_keys", () => {
    state.expandedKeys = model.get("expanded_keys") || [];
  });
  model.on("change:selected_keys", () => {
    state.selectedKeys = model.get("selected_keys") || [];
  });
  model.on("change:sorting", () => {
    state.sorting = model.get("sorting") || [];
  });
  model.on("change:column_widths", () => {
    state.columnWidths = model.get("column_widths") || {};
  });
  model.on("change:can_undo", () => {
    state.canUndo = model.get("can_undo") || false;
  });
  model.on("change:can_redo", () => {
    state.canRedo = model.get("can_redo") || false;
  });
  model.on("change:clipboard", () => {
    state.clipboard = model.get("clipboard") || {};
  });

  return () => {
    app.unmount();
  };
}
