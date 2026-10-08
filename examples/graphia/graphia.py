import yaml
from pathlib import Path
import panel as pn
from tripper import Session, RDF, EMMO, DCTERMS, Namespace
from tripper.datadoc import search, acquire, get_context, TableDoc
from panelini.panels.filter.filter import Filter

pn.extension()


class TripperQueryModel:
    def __init__(self, triplestore):
        self.ts = triplestore

    def execute_query(self, query: str) -> str:
        print(f"--- Executing SPARQL ---\n{query}")

        try:
            # Tripper automatically resolves bound namespaces, so we pass the query directly.
            results = self.ts.query(query)

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

    def execute_datadoc_search(self, basic_criteria: list) -> str:
        """Executes tripper.datadoc search -> acquire -> TableDoc."""

        # Ensure pers is bound
        PERS = self.ts.bind("pers", "https://www.ntnu.edu/physmet/people/")

        # Dynamically build mapping from all registered namespaces (including newly discovered ones)
        ns_map = {
            prefix.lower(): Namespace(str(uri))
            for prefix, uri in self.ts.namespaces.items()
        }

        # Explicit fallbacks for standard ontologies
        ns_map["rdf"] = RDF
        ns_map["emmo"] = EMMO
        ns_map["dcterms"] = DCTERMS
        ns_map["pers"] = PERS

        criteria = {}
        for item in basic_criteria:
            p_str = item.get("predicate", "").strip()
            o_str = item.get("object", "").strip()

            if p_str and o_str:
                p_obj = p_str
                o_obj = o_str

                # Resolve predicate string to actual Namespace object securely
                if ":" in p_str:
                    pref, val = p_str.split(":", 1)
                    if pref.lower() in ns_map:
                        p_obj = getattr(ns_map[pref.lower()], val)

                # Resolve object string to actual Namespace object securely
                if ":" in o_str:
                    pref, val = o_str.split(":", 1)
                    if pref.lower() in ns_map:
                        o_obj = getattr(ns_map[pref.lower()], val)

                criteria[p_obj] = o_obj

        print(f"--- Executing Datadoc Search ---\nCriteria: {criteria}")

        try:
            iris = search(self.ts, criteria=criteria)
            results_list = list(iris)

            if not results_list:
                return "No results found."

            # Load JSON-LD context
            branch = "main"
            CONTEXT_URL = (
                "https://raw.githubusercontent.com/SINTEF/"
                f"physmet-data-documentation-templates/refs/heads/{branch}/"
                "context/context.json"
            )
            context = get_context(CONTEXT_URL, default_theme=None)

            # Acquire dictionaries
            dicts = [acquire(self.ts, iri, context=context) for iri in results_list]

            # Create a table doc
            td = TableDoc.fromdicts(dicts, context=context)

            output_lines = [f"Found {len(results_list)} results:\n", "-" * 40]
            output_lines.append(f"Result table headers: {td.headers}")
            output_lines.append("-" * 40)

            # Neatly format tabular rows to text
            for i, row in enumerate(td.data, 1):
                output_lines.append(f"Result {i}:")
                for header, val in zip(td.headers, row):
                    output_lines.append(f"  {header}: {val}")
                output_lines.append("-" * 40)

            return "\n".join(output_lines)

        except Exception as e:
            return f"Error executing datadoc search:\n{str(e)}"


class GraphiaTool(pn.viewable.Viewer):
    def __init__(self, model: TripperQueryModel):
        super().__init__()
        self.model = model
        self.session_path = Path("session.yaml")

        # Top Right Controls (Combobox & Editor Button)
        self.ts_select = pn.widgets.Select(
            options=self._get_ts_names(), value="MemKB", width=150, margin=(10, 5, 0, 0)
        )
        self.ts_select.param.watch(self._on_ts_change, "value")

        self.edit_btn = pn.widgets.Button(
            icon="settings", width=40, margin=(10, 10, 0, 0), button_type="light"
        )
        self.edit_btn.on_click(self._open_editor)

        # --- MODAL OVERLAY SETUP ---
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

        self.close_btn = pn.widgets.Button(
            icon="x",
            width=35,
            height=35,
            styles={
                "background": "transparent",
                "border": "none",
                "box-shadow": "none",
            },
        )
        self.close_btn.on_click(self._close_editor)

        modal_header = pn.Row(
            pn.pane.Markdown("### Edit session.yaml", margin=(5, 0, 0, 0)),
            pn.layout.HSpacer(),
            self.close_btn,
            sizing_mode="stretch_width",
            margin=(0, 0, 10, 0),
        )

        # Inner Dialog Box - Positioned like standard Bootstrap modal
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
            align="center",  # Centers horizontally in the overlay column
            margin=(50, 0, 0, 0),  # Pushes it 50px down from the top
            styles={
                "padding": "20px",
                "background": "white",
                "border-radius": "8px",
                "box-shadow": "0 4px 12px rgba(0,0,0,0.2)",
            },
        )

        # Fixed Full-Screen Background Overlay
        self.modal_overlay = pn.Column(
            self.editor_pane,
            sizing_mode="stretch_both",
            visible=False,  # Panel handles display mapping natively now
            styles={
                "position": "fixed",
                "top": "0",
                "left": "0",
                "width": "100vw",
                "height": "100vh",
                "background": "rgba(0,0,0,0.5)",
                "z-index": "1050",
            },
        )
        # ---------------------------

        header_row = pn.Row(
            pn.pane.Markdown(
                "### Semantic Filter", align="center", margin=(10, 0, 10, 10)
            ),
            pn.layout.HSpacer(),
            self.ts_select,
            self.edit_btn,
            sizing_mode="stretch_width",
            align="center",
        )

        # Filter Container Wrapper (Allows replacing the Filter widget on TS change)
        self.filter_container = pn.Column(sizing_mode="stretch_both")
        self._create_filter_widget()

        wrap_css = """
        .codehilite { display: block !important; }
        .markdown { width: 100% !important; max-width: 100% !important; }
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

        # Original Layout
        self._main_layout = pn.Row(
            pn.Column(
                header_row,
                self.filter_container,
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

        # Combine modal overlay with main layout
        self._layout = pn.Column(
            self.modal_overlay, self._main_layout, sizing_mode="stretch_both"
        )

    def __panel__(self):
        return self._layout

    def _get_ts_names(self):
        """Reads available triplestores strictly from session.yaml."""
        try:
            if not self.session_path.exists():
                return ["MemKB"]
            with open(self.session_path, "r") as f:
                data = yaml.safe_load(f)
                return list(data.keys()) if data else []
        except Exception:
            return ["MemKB"]

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
            # Validate YAML formatting before saving to disk
            yaml.safe_load(self.yaml_editor.value)
            self.session_path.write_text(self.yaml_editor.value)

            # Refresh combobox options
            current_val = self.ts_select.value
            new_options = self._get_ts_names()
            self.ts_select.options = new_options

            # Keep selection if it still exists, else fallback to first option
            if current_val in new_options:
                self.ts_select.value = current_val
            elif new_options:
                self.ts_select.value = new_options[0]

            self.editor_error.visible = False
            self._close_editor(None)
            print("session.yaml updated successfully.")
        except Exception as e:
            self.editor_error.object = f"**Invalid YAML:** {str(e)}"
            self.editor_error.visible = True

    def _on_ts_change(self, event):
        """Triggered when the Triplestore combobox selection changes."""
        new_ts_name = event.new
        print(f"Switching triplestore to {new_ts_name}...")
        try:
            # Establish new session connection and update the model
            session = Session(str(self.session_path))
            self.model.ts = session.get_triplestore(new_ts_name)

            # Rebuild the Filter widget to fetch updated schema ontologies
            self._create_filter_widget()
            print("Triplestore switched successfully.")
        except Exception as e:
            print(f"Failed to switch triplestore: {e}")

    def _create_filter_widget(self):
        """Builds or rebuilds the Filter widget into the container."""
        combo_data = self._build_combo_data()

        # Preserve the UI state if recreating, otherwise load defaults
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

        # The Filter component registers itself with Vue via Javascript automatically
        self.filter_widget = Filter(
            schema=combo_data, value=initial_val, sizing_mode="stretch_both"
        )
        self.filter_widget.param.watch(self._on_filter_change, "value")

        # Swaps out the old Filter instance in the Panel Column to trigger a Vue re-mount
        self.filter_container[:] = [self.filter_widget]

    def _build_combo_data(self):
        """Dynamically fetch elements, categorizing them strictly by namespace prefix."""
        ts = self.model.ts

        # Pre-bind standard ontologies to ensure they receive correct prefixes
        ts.bind("rdf", str(RDF))
        ts.bind("emmo", str(EMMO))
        ts.bind("dcterms", str(DCTERMS))
        ts.bind("pers", "https://www.ntnu.edu/physmet/people/")

        entities_tree = {"classes": {}, "instances": {}}
        predicates_tree = {}

        def parse_iri(iri_val):
            """Intelligently splits URIs into prefix, name, and prefix:name strings."""
            iri_str = str(iri_val)
            if not iri_str.startswith("http"):
                return None, None, None

            # 1. Match against known bound namespaces
            for prefix, uri in ts.namespaces.items():
                uri_str = str(uri)
                if iri_str.startswith(uri_str):
                    name = iri_str[len(uri_str) :]
                    return prefix, name, f"{prefix}:{name}"

            # 2. Extract prefix and name for unknown URIs dynamically
            if "#" in iri_str:
                base, name = iri_str.rsplit("#", 1)
                prefix = base.split("/")[-1] if "/" in base else "unknown"
                ns_uri = base + "#"
            elif "/" in iri_str:
                base, name = iri_str.rsplit("/", 1)
                prefix = base.split("/")[-1] if "/" in base else "unknown"
                ns_uri = base + "/"
            else:
                return "other", iri_str, iri_str

            # Clean the extracted prefix of special characters
            prefix = "".join(e for e in prefix if e.isalnum()) or "other"

            # Auto-bind newly discovered namespaces so Tripper can resolve them later
            if prefix != "other" and prefix not in ts.namespaces:
                ts.bind(prefix, ns_uri)

            return prefix, name, f"{prefix}:{name}"

        def add_to_tree(tree, iri_val):
            prefix, name, value = parse_iri(iri_val)
            if not prefix:
                return

            if prefix not in tree:
                tree[prefix] = []

            if not any(x["value"] == value for x in tree[prefix]):
                # Store prefix as group (handled below), show 'name' as label, and 'prefix:name' as the return value
                tree[prefix].append({"id": value, "label": name, "value": value})

        # PREPOPULATE essentials to guarantee they exist even if SPARQL is empty or fails
        add_to_tree(predicates_tree, RDF.type)
        add_to_tree(predicates_tree, DCTERMS.creator)
        add_to_tree(entities_tree["classes"], EMMO.Dataset)
        add_to_tree(
            entities_tree["instances"],
            self.model.ts.namespaces.get("pers") + "ArmelPerrotin",
        )

        # Safe extraction handles both tuple-like and dict-like SPARQL wrappers
        def extract_val(row, key, idx):
            if isinstance(row, dict) or hasattr(row, "get"):
                return row.get(key) or row.get(str(key))
            if isinstance(row, (tuple, list)) and len(row) > idx:
                return row[idx]
            return row

        # Fetch Predicates dynamically
        try:
            for row in ts.query("SELECT DISTINCT ?p WHERE { ?s ?p ?o }"):
                add_to_tree(predicates_tree, extract_val(row, "p", 0))
        except Exception as e:
            print(f"Warning: Predicates query failed: {e}")

        # Fetch Classes dynamically
        try:
            for row in ts.query("SELECT DISTINCT ?c WHERE { ?s a ?c }"):
                add_to_tree(entities_tree["classes"], extract_val(row, "c", 0))
        except Exception as e:
            print(f"Warning: Classes query failed: {e}")

        # Fetch Instances dynamically
        try:
            for row in ts.query("SELECT DISTINCT ?s WHERE { ?s a ?c }"):
                add_to_tree(entities_tree["instances"], extract_val(row, "s", 0))
        except Exception as e:
            print(f"Warning: Instances query failed: {e}")

        # Format prefix groups into Vue's expected nested array
        def dict_to_grouped_list(d, parent_id, parent_label):
            children = []
            for prefix, items in d.items():
                items.sort(key=lambda x: str(x["label"]).lower())
                children.append(
                    {"id": f"{parent_id}_{prefix}", "label": prefix, "children": items}
                )
            children.sort(key=lambda x: str(x["label"]).lower())
            if not children:
                return []
            return [{"id": parent_id, "label": parent_label, "children": children}]

        # Both Classes and Instances are appended into the entities list
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

        new_apply = val.get("_trigger_apply", 0)
        old_apply = old_val.get("_trigger_apply", 0)
        new_cancel = val.get("_trigger_cancel", 0)
        old_cancel = old_val.get("_trigger_cancel", 0)

        active_tab = val.get("active_tab", "Advanced")

        if new_apply != old_apply:
            if active_tab == "Basic":
                basic_data = val.get("Basic", [])

                # Format the UI string to mimic the exact Python dictionary creation
                criteria_str = "criteria = {\n"
                for item in basic_data:
                    p = item.get("predicate", "").strip()
                    o = item.get("object", "").strip()
                    if p and o:
                        # Make UI text visually look like Namespace calls (e.g. RDF.type instead of rdf:type)
                        p_fmt = p.replace(":", ".") if ":" in p else p
                        o_fmt = o.replace(":", ".") if ":" in o else o

                        p_parts = p_fmt.split(".")
                        if len(p_parts) == 2:
                            p_fmt = f"{p_parts[0].upper()}.{p_parts[1]}"

                        o_parts = o_fmt.split(".")
                        if len(o_parts) == 2:
                            o_fmt = f"{o_parts[0].upper()}.{o_parts[1]}"

                        criteria_str += f"    {p_fmt}: {o_fmt},\n"
                criteria_str += "}"

                self.query_pane.object = (
                    f"### Executed Search Criteria\n```python\n{criteria_str}\n```"
                )
                self.results_pane.object = "### Results\n*Executing search...*"

                formatted_results = self.model.execute_datadoc_search(basic_data)
                self.results_pane.object = (
                    f"### Results\n```text\n{formatted_results}\n```"
                )
            else:
                query = val.get("Advanced", {}).get("query", "")
                if query:
                    self.query_pane.object = (
                        f"### Executed Query\n```sparql\n{query}\n```"
                    )
                    self.results_pane.object = "### Results\n*Executing query...*"

                    formatted_results = self.model.execute_query(query)
                    self.results_pane.object = (
                        f"### Results\n```text\n{formatted_results}\n```"
                    )

        elif new_cancel != old_cancel:
            self.query_pane.object = "### Executed Query\n\n*(Waiting for input...)*"
            self.results_pane.object = (
                "### Results\n\nClick **Apply** to run the query."
            )


session = Session("session.yaml")
ts = session.get_triplestore("MemKB")
model = TripperQueryModel(ts)
app = GraphiaTool(model)
app.servable(title="Text-based SPARQL Filter")
