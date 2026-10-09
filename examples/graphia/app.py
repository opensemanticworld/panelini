"""Main UI and application entry point."""

import yaml
from pathlib import Path

import panel as pn
from tripper import RDF, EMMO, DCTERMS
from panelini.panels.filter.filter import Filter

from model import TripperQueryModel

pn.extension()


class GraphiaTool(pn.viewable.Viewer):
    """Main Panel UI View for the Semantic Filter."""

    def __init__(self, model: TripperQueryModel, session_path: str):
        super().__init__()
        self.model = model
        self.session_path = Path(session_path)

        # Top Right Controls
        self.ts_select = pn.widgets.Select(
            options=self._get_ts_names(),
            value=self.model.triplestore_name,
            width=150,
            margin=(10, 0, 0, 0),
        )
        self.ts_select.param.watch(self._on_ts_change, "value")

        self.edit_btn = pn.widgets.Button(
            icon="settings", width=40, margin=(10, 0, 0, 10), button_type="light"
        )
        self.edit_btn.on_click(self._open_editor)

        # Modal Overlay Setup
        self.yaml_editor = pn.widgets.TextAreaInput(
            value=self.session_path.read_text() if self.session_path.exists() else "",
            height=250,
            sizing_mode="stretch_width",
        )
        self.editor_error = pn.pane.Alert(alert_type="danger", visible=False)

        self.save_btn = pn.widgets.Button(name="Save", button_type="primary", width=100)
        self.save_btn.on_click(self._save_editor)

        self.cancel_btn = pn.widgets.Button(
            name="Cancel", button_type="default", width=100
        )
        self.cancel_btn.on_click(self._close_editor)
        self.close_btn = pn.widgets.Button(icon="x", width=35, height=35)
        self.close_btn.on_click(self._close_editor)

        modal_header = pn.Row(
            pn.pane.Markdown("### Edit session.yaml", margin=(5, 0, 0, 0)),
            pn.layout.HSpacer(),
            self.close_btn,
            sizing_mode="stretch_width",
            margin=(0, 0, 10, 0),
        )

        self.editor_pane = pn.Column(
            modal_header,
            self.editor_error,
            self.yaml_editor,
            pn.Row(
                pn.layout.HSpacer(),
                self.cancel_btn,
                self.save_btn,
                margin=(10, 0, 0, 0),
            ),
            width=600,
            align="center",
            margin=(50, 0, 0, 0),
            styles={
                "padding": "25px",
                "background": "white",
                "border-radius": "8px",
                "box-shadow": "0 4px 12px rgba(0,0,0,0.3)",
            },
        )

        self.modal_overlay = pn.Column(
            self.editor_pane,
            sizing_mode="stretch_both",
            visible=False,
            styles={
                "position": "fixed",
                "top": "0",
                "left": "0",
                "width": "100vw",
                "height": "100vh",
                "background": "rgba(0, 0, 0, 0.5)",
                "z-index": "1050",
            },
        )

        header_row = pn.Row(
            pn.pane.Markdown(
                "### Semantic Filter", align="center", margin=(10, 0, 10, 10)
            ),
            pn.layout.HSpacer(),
            self.ts_select,
            self.edit_btn,
            sizing_mode="stretch_width",
            align="center",
            margin=(0, 16, 0, 0),
        )

        self.filter_container = pn.Column(sizing_mode="stretch_both")
        self._create_filter_widget()

        markdown_css = ".codehilite { display: block !important; }"
        self.query_pane = pn.pane.Markdown(
            "### Executed Query\n\n*(Waiting for input...)*",
            sizing_mode="stretch_width",
            margin=0,
            styles={"padding": "10px"},
            stylesheets=[markdown_css],
        )
        self.results_pane = pn.pane.Markdown(
            "### Results\n\nClick **Apply** to run the query.",
            sizing_mode="stretch_both",
            margin=0,
            styles={"padding": "10px"},
            stylesheets=[markdown_css],
        )

        self.results_container = pn.Column(
            self.query_pane,
            self.results_pane,
            sizing_mode="stretch_both",
            margin=0,
            styles={
                "flex": "7",
                "max-width": "70%",
                "min-width": "0",
                "overflow-y": "auto",
                "overflow-x": "hidden",
                "border": "1px solid #ddd",
            },
        )

        self._main_layout = pn.Row(
            pn.Column(
                header_row,
                self.filter_container,
                sizing_mode="stretch_both",
                margin=0,
                styles={
                    "flex": "3",
                    "max-width": "30%",
                    "min-width": "0",
                    "overflow": "hidden",
                },
            ),
            self.results_container,
            sizing_mode="stretch_both",
            margin=0,
            min_height=800,
        )

        self._layout = pn.Column(
            self.modal_overlay, self._main_layout, sizing_mode="stretch_both", margin=0
        )

    def __panel__(self):
        return self._layout

    def _get_ts_names(self):
        return self.model.session.get_names()

    def _open_editor(self, event):
        self.yaml_editor.value = (
            self.session_path.read_text() if self.session_path.exists() else ""
        )
        self.editor_error.visible = False
        self.modal_overlay.visible = True

    def _close_editor(self, event):
        self.modal_overlay.visible = False

    def _save_editor(self, event):
        try:
            yaml.safe_load(self.yaml_editor.value)
            self.session_path.write_text(self.yaml_editor.value)

            # Reload session in model
            self.model.session = Session(str(self.session_path))
            new_options = self._get_ts_names()
            self.ts_select.options = new_options

            if self.ts_select.value in new_options:
                self._on_ts_change(
                    type("Event", (object,), {"new": self.ts_select.value})()
                )
            elif new_options:
                self.ts_select.value = new_options[0]

            self.editor_error.visible = False
            self._close_editor(None)
        except Exception as e:
            self.editor_error.object = f"**Invalid YAML:** {str(e)}"
            self.editor_error.visible = True

    def _on_ts_change(self, event):
        try:
            self.model.load_triplestore(event.new)
            self._create_filter_widget()
        except Exception as e:
            print(f"Failed to switch triplestore: {e}")

    def _create_filter_widget(self):
        combo_data = self._build_combo_data()

        if hasattr(self, "filter_widget") and self.filter_widget is not None:
            initial_val = self.filter_widget.value
        else:
            initial_val = {
                "Advanced": {
                    "query": "SELECT ?s WHERE {\n  ?s dcterms:creator pers:ArmelPerrotin .\n}"
                },
                "Basic": [
                    {"predicate": "dcterms:creator", "object": "pers:ArmelPerrotin"}
                ],
            }

        self.filter_widget = Filter(
            schema=combo_data, value=initial_val, sizing_mode="stretch_both"
        )
        self.filter_widget.param.watch(self._on_filter_change, "value")
        self.filter_container[:] = [self.filter_widget]

    def _build_combo_data(self):
        ts = self.model.ts
        entities_tree = {"classes": {}, "instances": {}}
        predicates_tree = {}

        def add_to_tree(tree, iri_val):
            try:
                simplified = self.model.simplify_iris([str(iri_val)])[0]

                if ":" in simplified and not simplified.startswith("http"):
                    prefix, name = simplified.split(":", 1)
                else:
                    prefix = "other"
                    if "#" in simplified:
                        name = simplified.split("#")[-1]
                    elif "/" in simplified:
                        name = simplified.split("/")[-1]
                    else:
                        name = simplified

                if prefix not in tree:
                    tree[prefix] = []

                if not any(x["value"] == simplified for x in tree[prefix]):
                    tree[prefix].append(
                        {"id": simplified, "label": name, "value": simplified}
                    )
            except Exception as e:
                print(f"Warning: Failed to add {iri_val} to tree: {e}")

        # New helper specifically for categorizing instances by their Class
        def add_categorized_instance(tree, instance_iri, class_iri):
            try:
                inst_simplified = self.model.simplify_iris([str(instance_iri)])[0]
                class_simplified = self.model.simplify_iris([str(class_iri)])[0]

                # Use the class name as the category header
                if ":" in class_simplified and not class_simplified.startswith("http"):
                    category = class_simplified.split(":", 1)[1]
                else:
                    category = class_simplified.split("#")[-1].split("/")[-1]

                # Extract the instance short name for the label
                if ":" in inst_simplified and not inst_simplified.startswith("http"):
                    name = inst_simplified.split(":", 1)[1]
                else:
                    name = inst_simplified.split("#")[-1].split("/")[-1]

                if category not in tree:
                    tree[category] = []

                if not any(x["value"] == inst_simplified for x in tree[category]):
                    tree[category].append(
                        {"id": inst_simplified, "label": name, "value": inst_simplified}
                    )
            except Exception as e:
                print(f"Warning: Failed to categorize instance {instance_iri}: {e}")

        def extract_val(row, key, idx):
            if isinstance(row, dict) or hasattr(row, "get"):
                return row.get(key) or row.get(str(key))
            if isinstance(row, (tuple, list)) and len(row) > idx:
                return row[idx]
            return row

        try:
            for row in ts.query("SELECT DISTINCT ?p WHERE { ?s ?p ?o }"):
                add_to_tree(predicates_tree, extract_val(row, "p", 0))
        except Exception as e:
            print(f"Warning: Predicates query failed: {e}")

        try:
            for row in ts.query("SELECT DISTINCT ?c WHERE { ?s a ?c }"):
                add_to_tree(entities_tree["classes"], extract_val(row, "c", 0))
        except Exception as e:
            print(f"Warning: Classes query failed: {e}")

        try:
            # Modified query to fetch both the instance (?s) and its class (?c)
            for row in ts.query("SELECT DISTINCT ?s ?c WHERE { ?s a ?c }"):
                s_val = extract_val(row, "s", 0)
                c_val = extract_val(row, "c", 1)
                add_categorized_instance(entities_tree["instances"], s_val, c_val)
        except Exception as e:
            print(f"Warning: Instances query failed: {e}")

        def dict_to_grouped_list(d, parent_id, parent_label):
            children = []
            for category_name, items in d.items():
                items.sort(key=lambda x: str(x["label"]).lower())
                children.append(
                    {
                        "id": f"{parent_id}_{category_name}",
                        "label": category_name,
                        "children": items,
                    }
                )
            children.sort(key=lambda x: str(x["label"]).lower())
            return (
                [{"id": parent_id, "label": parent_label, "children": children}]
                if children
                else []
            )

        entities_list = dict_to_grouped_list(
            entities_tree["classes"], "classes", "Classes"
        ) + dict_to_grouped_list(entities_tree["instances"], "instances", "Instances")

        predicates_list = []
        for prefix, items in predicates_tree.items():
            items.sort(key=lambda x: str(x["label"]).lower())
            predicates_list.append(
                {"id": f"pred_{prefix}", "label": prefix, "children": items}
            )
        predicates_list.sort(key=lambda x: str(x["label"]).lower())

        return {"entities": entities_list, "predicates": predicates_list}

    def _on_filter_change(self, event):
        val = event.new
        old_val = event.old if isinstance(event.old, dict) else {}

        if not val:
            return

        if val.get("_trigger_apply", 0) != old_val.get("_trigger_apply", 0):
            if val.get("active_tab", "Advanced") == "Basic":
                basic_data = val.get("Basic", [])
                criteria_str = "criteria = {\n"
                for item in basic_data:
                    p = item.get("predicate", "").strip()
                    o = item.get("object", "").strip()
                    if p and o:
                        criteria_str += f"    '{p}': '{o}',\n"
                criteria_str += "}"

                self.query_pane.object = (
                    f"### Executed Search Criteria\n```python\n{criteria_str}\n```"
                )
                self.results_pane.object = f"### Results\n```text\n{self.model.execute_datadoc_search(basic_data)}\n```"
            else:
                query = val.get("Advanced", {}).get("query", "")
                if query:
                    self.query_pane.object = (
                        f"### Executed Query\n```sparql\n{query}\n```"
                    )
                    self.results_pane.object = (
                        f"### Results\n```text\n{self.model.execute_query(query)}\n```"
                    )

        elif val.get("_trigger_cancel", 0) != old_val.get("_trigger_cancel", 0):
            self.query_pane.object = "### Executed Query\n\n*(Waiting for input...)*"
            self.results_pane.object = (
                "### Results\n\nClick **Apply** to run the query."
            )


if __name__ == "__main__" or str(__name__).startswith("bokeh"):
    # Pass data configuration paths into the unified query model
    model = TripperQueryModel(
        session_file="data/session.yaml",
        settings_file="data/settings.yaml",
    )
    model.load_triplestore("MemKB")

    app = GraphiaTool(model, session_path="data/session.yaml")
    app.servable(title="Text-based SPARQL Filter")
