"""Main UI and application entry point."""

import re
import yaml
from collections import defaultdict
from pathlib import Path

import panel as pn
from panelini.panels.filter.filter import Filter

# Import your new Table component
from panelini.panels.table.table import Table

from model import TripperQueryModel

pn.extension()

# Space taken by the page around the results area; the results panel is capped
# at the viewport height minus this, so only the table scrolls. Tweak if the
# page itself still scrolls (or leaves a gap at the bottom).
PAGE_CHROME_PX = 40

# Makes the table component's shadow host a flex column that can shrink
TABLE_HOST_CSS = (
    ":host { display: flex; flex-direction: column; min-height: 0; overflow: hidden; }"
)


class GraphiaTool(pn.viewable.Viewer):
    """Main Panel UI View for the Semantic Filter."""

    def __init__(self, model: TripperQueryModel):
        super().__init__()
        self.model = model
        self.session_path = Path(self.model.session_file)

        self.ts_select = pn.widgets.Select(
            options=self._get_ts_names(),
            value=self.model.get_current_triplestore_name(),
            width=150,
            margin=(10, 0, 0, 0),
        )
        self.ts_select.param.watch(self._on_ts_change, "value")

        self.edit_btn = pn.widgets.Button(
            icon="settings", width=40, margin=(10, 0, 0, 10), button_type="light"
        )
        self.edit_btn.on_click(self._open_editor)

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
            # Always visible above the table; very long queries scroll on their own
            styles={
                "padding": "10px",
                "flex": "0 0 auto",
                "max-height": "30vh",
                "overflow": "auto",
            },
            stylesheets=[markdown_css],
        )

        # Added has_run state flag to initial setup
        self.results_table = Table(
            value={"headers": [], "data": [], "has_run": False},
            sizing_mode="stretch_both",
            styles={"flex": "1 1 0", "min-height": "0"},
            stylesheets=[TABLE_HOST_CSS],
        )

        self.results_container = pn.Column(
            self.query_pane,
            self.results_table,
            sizing_mode="stretch_both",
            margin=0,
            styles={
                "flex": "7",
                "max-width": "70%",
                "min-width": "0",
                "min-height": "0",
                "max-height": f"calc(100vh - {PAGE_CHROME_PX}px)",
                "overflow": "hidden",  # the table component scrolls, not this container
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
        return self.model.get_triplestore_names()

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

            self.model.reload_session()
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

        self.filter_widget = Filter(schema=combo_data, sizing_mode="stretch_both")
        self.filter_widget.param.watch(self._on_filter_change, "value")
        self.filter_container[:] = [self.filter_widget]

    def _build_combo_data(self):
        """Build the ontocombo dropdown trees from what is in the triplestore."""

        def simplify(iri):
            return self.model.simplify_iris([iri])[0]

        def split(curie):
            """'emmo:hasInput' -> ('emmo', 'hasInput'); bare IRIs -> ('other', last segment)."""
            if ":" in curie and not curie.startswith("http"):
                prefix, name = curie.split(":", 1)
                return prefix, name
            return "other", re.split(r"[#/]", curie)[-1] or curie

        def select(query):
            try:
                return self.model.select_terms(query)
            except Exception as e:
                print(f"Warning: query failed ({query}): {e}")
                return []

        def tree(groups, id_prefix):
            """{group: {value: label}} -> sorted group nodes with their items."""
            return [
                {
                    "id": f"{id_prefix}_{group}",
                    "label": group,
                    "children": [
                        {
                            "id": f"{id_prefix}_{group}:{value}",
                            "label": label,
                            "value": value,
                        }
                        for value, label in sorted(
                            items.items(), key=lambda kv: kv[1].lower()
                        )
                    ],
                }
                for group, items in sorted(groups.items(), key=lambda kv: kv[0].lower())
            ]

        def top(label, node_id, groups):
            if not groups:
                return []
            return [{"id": node_id, "label": label, "children": tree(groups, node_id)}]

        predicates, classes, instances = (
            defaultdict(dict),
            defaultdict(dict),
            defaultdict(dict),
        )

        for (p,) in select("SELECT DISTINCT ?p WHERE { ?s ?p ?o }"):
            value = simplify(p)
            prefix, name = split(value)
            predicates[prefix][value] = name

        # Classes are grouped by prefix, instances by the (readable) name of their class
        for s, c in select("SELECT DISTINCT ?s ?c WHERE { ?s a ?c }"):
            class_value = simplify(c)
            prefix, class_name = split(class_value)
            classes[prefix][class_value] = class_name

            value = simplify(s)
            instances[class_name][value] = split(value)[1]

        return {
            "entities": top("Classes", "classes", classes)
            + top("Instances", "instances", instances),
            "predicates": tree(predicates, "pred"),
        }

    def _on_filter_change(self, event):
        val = event.new
        old_val = event.old if isinstance(event.old, dict) else {}
        if not val:
            return

        if val.get("_trigger_apply", 0) != old_val.get("_trigger_apply", 0):
            self._run(val)
        elif val.get("_trigger_cancel", 0) != old_val.get("_trigger_cancel", 0):
            self.query_pane.object = "### Executed Query\n\n*(Waiting for input...)*"
            self.results_table.value = {"headers": [], "data": [], "has_run": False}

    def _run(self, val):
        """Run the Basic search or the Advanced/Simple query and show the result."""
        if val.get("active_tab", "Advanced") == "Basic":
            criteria = [
                {
                    "predicate": i.get("predicate", "").strip(),
                    "object": i.get("object", "").strip(),
                }
                for i in val.get("Basic", [])
            ]
            criteria = [c for c in criteria if c["predicate"] and c["object"]]
            lines = "".join(
                f"    '{c['predicate']}': '{c['object']}',\n" for c in criteria
            )
            self.query_pane.object = f"### Executed Search Criteria\n```python\ncriteria = {{\n{lines}}}\n```"
            run = lambda: self.model.search(criteria)
        else:
            query = val.get("Advanced", {}).get("query", "")
            if not query:
                return
            executed = self.model.update_sparql_query(query)
            self.query_pane.object = f"### Executed Query\n```sparql\n{executed}\n```"
            run = lambda: self.model.query(query)

        try:
            result = run()
        except Exception as e:
            self.query_pane.object += f"\n\n> **Error:** {e}"
            result = {"headers": [], "data": []}
        self.results_table.value = {**result, "has_run": True}


if __name__ == "__main__" or str(__name__).startswith("bokeh"):
    model = TripperQueryModel(
        session_file="data/session.yaml",
        settings_file="data/settings.yaml",
    )

    app = GraphiaTool(model)
    app.servable(title="Text-based SPARQL Filter")
