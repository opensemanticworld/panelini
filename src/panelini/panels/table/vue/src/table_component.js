import { createApp } from "vue";
import TableVueComponent from "@/table.vue";
import customStyles from "@/table_component.css?inline";

export function render({ model, el }) {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = customStyles;
  el.append(styleSheet);

  const container = document.createElement('div');
  container.setAttribute("id", "table-vue-app");
  el.append(container);

  const app = createApp(TableVueComponent, { model });
  app.mount(container);

  return () => {
    app.unmount();
  };
}