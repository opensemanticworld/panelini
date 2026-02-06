import { createApp } from "vue";
import VisNetworkComponent from "@/visnetwork.vue";
import "@/visnetwork_component.less";

export function render({ model, el }) {
  const container = document.createElement('div');
  container.setAttribute("id", "visnetwork-container");
  el.append(container);

  console.debug("Creating VisNetwork App");

  // Get initial values from model
  const nodes = model.get("nodes") || [];
  const edges = model.get("edges") || [];
  const options = model.get("options") || {};
  const manipulationState = model.get("manipulation_state") || "disableEditMode";

  // Create Vue app with event handlers
  const app = createApp(VisNetworkComponent, {
    nodes: nodes,
    edges: edges,
    options: options,
    manipulationState: manipulationState,

    // Event handlers (Vue uses onEventName convention for emits)
    'onChange:nodes': (newNodes) => {
      console.debug("CHANGE:NODES", newNodes);
      model.set("nodes", newNodes);
      model.save_changes();
    },

    'onChange:edges': (newEdges) => {
      console.debug("CHANGE:EDGES", newEdges);
      model.set("edges", newEdges);
      model.save_changes();
    },

    'onNetwork-event': (eventData) => {
      console.debug("NETWORK-EVENT", eventData);
      // Add timestamp to ensure change is detected
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

    onReady: (value) => {
      console.debug("VisNetwork is ready");
    }
  });

  const root = app.mount(container);

  // Watch for Python -> JavaScript changes
  model.on("change:nodes", () => {
    console.debug("Python->JS: nodes changed");
    root.setNodes(model.get("nodes"));
  });

  model.on("change:edges", () => {
    console.debug("Python->JS: edges changed");
    root.setEdges(model.get("edges"));
  });

  model.on("change:options", () => {
    console.debug("Python->JS: options changed");
    root.setOptions(model.get("options"));
  });

  model.on("change:manipulation_state", () => {
    console.debug("Python->JS: manipulation_state changed");
    root.setManipulationState(model.get("manipulation_state"));
  });
}
