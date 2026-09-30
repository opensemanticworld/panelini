import { createApp } from "vue";
import FilterVueComponent from "@/filter.vue";
import customStyles from "@/filter_component.css?inline";

export function render({ model, el }) {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = customStyles;
  el.append(styleSheet);

  const container = document.createElement('div');
  container.setAttribute("id", "filter-vue-app");
  el.append(container);

  const app = createApp(FilterVueComponent, { model });
  app.mount(container);

  return () => {
    app.unmount();
  };
}