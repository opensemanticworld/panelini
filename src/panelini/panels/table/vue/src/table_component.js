import { createApp } from "vue";
import TableVueComponent from "@/table.vue";
import customStyles from "@/table_component.css?inline";

export function render({ model, el }) {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = customStyles;
  el.append(styleSheet);

  // Give the Vue app a definite, shrinkable height so that only the table
  // area scrolls (see the scroll wrapper in table.vue)
  Object.assign(el.style, {
    display: "flex", flexDirection: "column",
    flex: "1 1 0", height: "100%", width: "100%", minHeight: "0",
  });

  const container = document.createElement('div');
  container.setAttribute("id", "table-vue-app");
  Object.assign(container.style, {
    display: "flex", flexDirection: "column", flex: "1 1 0", minHeight: "0",
  });
  el.append(container);

  const app = createApp(TableVueComponent, { model });
  app.mount(container);

  return () => {
    app.unmount();
  };
}