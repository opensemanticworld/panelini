import panel as pn
from tripper import Session
from panelini.panels.filter.filter import Filter

pn.extension()


class TripperQueryModel:
    def __init__(self, triplestore):
        self.ts = triplestore

    def execute_query(self, query: str) -> str:
        prefixes_str = ""
        for prefix, uri in self.ts.namespaces.items():
            prefixes_str += f"PREFIX {prefix}: <{uri}>\n"

        full_query = prefixes_str + "\n" + query
        print(f"--- Executing SPARQL ---\n{full_query}")

        try:
            results = self.ts.query(full_query)

            output_lines = []
            rows = list(results)

            if not rows:
                return "No results found."

            output_lines.append(f"Found {len(rows)} results:\n")
            output_lines.append("-" * 40)

            for i, row in enumerate(rows, 1):
                output_lines.append(f"Result {i}:")
                for term in row:
                    if term is not None:
                        output_lines.append(f"  - {str(term)}")
                output_lines.append("-" * 40)

            return "\n".join(output_lines)

        except Exception as e:
            return f"Error executing query:\n{str(e)}"


class BasicFilterTool(pn.viewable.Viewer):
    def __init__(self, model: TripperQueryModel):
        super().__init__()
        self.model = model

        combo_data = self._build_combo_data()

        initial_val = {
            "Advanced": {
                "query": "SELECT ?s WHERE {\n  ?s dcterms:creator pers:ArmelPerrotin .\n}"
            }
        }

        self.filter_widget = Filter(
            schema=combo_data, value=initial_val, sizing_mode="stretch_both"
        )
        self.filter_widget.param.watch(self._on_filter_change, "value")

        wrap_css = """
        .codehilite {
            display: block !important;
        }
        .markdown {
            width: 100% !important;
            max-width: 100% !important;
        }
        pre {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            word-break: break-all !important;
            overflow-wrap: anywhere !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
        }
        code {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            word-break: break-all !important;
            overflow-wrap: anywhere !important;
        }
        """

        self.query_pane = pn.pane.Markdown(
            "### Executed Query\n\n*(Waiting for input...)*",
            sizing_mode="stretch_width",
            margin=(0, 0, 10, 0),
            stylesheets=[wrap_css],
        )

        self.results_pane = pn.pane.Markdown(
            "### Results\n\nClick **Apply** to run the query.",
            sizing_mode="stretch_both",
            margin=(0, 0, 0, 0),
            stylesheets=[wrap_css],
        )

        self.results_container = pn.Column(
            self.query_pane,
            pn.layout.Divider(margin=(0, 0, 10, 0)),
            self.results_pane,
            sizing_mode="stretch_both",
            styles={
                "overflow-y": "auto",
                "overflow-x": "hidden",
                "padding": "10px",
                "background": "#f9f9f9",
                "border": "1px solid #ddd",
                "width": "100%",
                "max-width": "100%",
                "box-sizing": "border-box",
            },
        )

        self._layout = pn.Row(
            pn.Column(
                "### Semantic Filter",
                self.filter_widget,
                sizing_mode="stretch_both",
                styles={"flex": "3", "max-width": "30%", "overflow": "hidden"},
            ),
            pn.Column(
                self.results_container,
                sizing_mode="stretch_both",
                styles={"flex": "7", "max-width": "70%", "overflow": "hidden"},
            ),
            sizing_mode="stretch_both",
            min_height=800,
        )

    def __panel__(self):
        return self._layout

    def _build_combo_data(self):
        return {
            "entities": [
                {
                    "id": "classes",
                    "label": "Classes",
                    "children": [
                        {
                            "id": "emmo:Dataset",
                            "label": "Dataset",
                            "value": "emmo:Dataset",
                        }
                    ],
                }
            ],
            "predicates": [
                {
                    "id": "rdf_core",
                    "label": "RDF Core",
                    "children": [
                        {"id": "rdf:type", "label": "rdf:type", "value": "rdf:type"}
                    ],
                }
            ],
        }

    def _on_filter_change(self, event):
        val = event.new
        old_val = event.old if isinstance(event.old, dict) else {}

        if not val:
            return

        new_apply = val.get("_trigger_apply", 0)
        old_apply = old_val.get("_trigger_apply", 0)
        new_cancel = val.get("_trigger_cancel", 0)
        old_cancel = old_val.get("_trigger_cancel", 0)

        query = ""

        if new_apply != old_apply:
            query = val.get("Advanced", {}).get("query", "")
        elif new_cancel != old_cancel:
            query = "SELECT * WHERE { ?s ?p ?o } LIMIT 50"

        if query:
            self.query_pane.object = f"### Executed Query\n```sparql\n{query}\n```"
            self.results_pane.object = "### Results\n*Executing query...*"

            formatted_results = self.model.execute_query(query)
            self.results_pane.object = f"### Results\n```text\n{formatted_results}\n```"


session = Session("session.yaml")
ts = session.get_triplestore("MemKB")

PERS = ts.bind("pers", "https://www.ntnu.edu/physmet/people/")

model = TripperQueryModel(ts)
app = BasicFilterTool(model)
app.servable(title="Text-based SPARQL Filter")
