"""Main Panel View for Graphia Tool."""

import yaml
import panel as pn

from panelini.panels.filter.filter import Filter
from panelini.panels.table.table import Table
from controller import GraphiaController

pn.extension()

TABLE_HOST_CSS = (
    ":host { display: flex; flex-direction: column; min-height: 0; overflow: hidden; }"
)


class GraphiaToolView(pn.viewable.Viewer):
    def __init__(self, controller: GraphiaController):
        super().__init__()
        self.controller = controller

        self.ts_select = pn.widgets.Select(
            options=self.controller.get_triplestore_names(),
            value=self.controller.get_current_triplestore(),
            width=150,
            margin=(10, 0, 0, 0),
        )
        self.ts_select.param.watch(self._on_ts_change, "value")

        self.edit_btn = pn.widgets.Button(
            icon="settings", width=40, margin=(10, 0, 0, 10), button_type="light"
        )
        self.edit_btn.on_click(self._open_editor)

        self.yaml_editor = pn.widgets.TextAreaInput(
            value=self.controller.get_session_yaml(),
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
            styles={
                "padding": "10px",
                "flex": "0 0 auto",
                "max-height": "30vh",
                "overflow": "auto",
            },
            stylesheets=[markdown_css],
        )

        self.results_table = Table(
            sizing_mode="stretch_both",
            styles={"flex": "1 1 0", "min-height": "0", "margin": "0"},
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
                "max-height": "100vh",
                "overflow": "hidden",
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
            styles={"height": "100vh", "overflow": "hidden"},
        )

        self._layout = pn.Column(
            self.modal_overlay, self._main_layout, sizing_mode="stretch_both", margin=0
        )

    def __panel__(self):
        return self._layout

    def _open_editor(self, event):
        self.yaml_editor.value = self.controller.get_session_yaml()
        self.editor_error.visible = False
        self.modal_overlay.visible = True

    def _close_editor(self, event):
        self.modal_overlay.visible = False

    def _save_editor(self, event):
        try:
            yaml.safe_load(self.yaml_editor.value)
            self.controller.save_session_yaml(self.yaml_editor.value)

            new_options = self.controller.get_triplestore_names()
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
            self.controller.switch_triplestore(event.new)
            self._create_filter_widget()
        except Exception as e:
            print(f"Failed to switch triplestore: {e}")

    def _create_filter_widget(self):
        self.filter_widget = Filter(sizing_mode="stretch_both")

        # Component natively builds its own schema from raw dict lists
        preds_data, ents_data = self.controller.get_ontology_data()
        self.filter_widget.build_schema_from_data(preds_data, ents_data)

        self.filter_widget.param.watch(self._on_filter_change, "value")
        self.filter_container[:] = [self.filter_widget]

    def _on_filter_change(self, event):
        val = event.new
        old_val = event.old if isinstance(event.old, dict) else {}
        if not val:
            return

        if val.get("_trigger_apply", 0) != old_val.get("_trigger_apply", 0):
            query_md, table_result = self.controller.execute_filter(val)
            self.query_pane.object = query_md

            # Component natively digests the tabular.Table instance
            self.results_table.update_from_table(table_result, has_run=True)

        elif val.get("_trigger_cancel", 0) != old_val.get("_trigger_cancel", 0):
            self.query_pane.object = "### Executed Query\n\n*(Waiting for input...)*"
            self.results_table.update_from_table(None, has_run=False)
