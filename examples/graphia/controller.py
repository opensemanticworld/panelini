"""Controller bridging the Graphia Model and GraphiaTool View."""

import re
from collections import defaultdict
from tabular.models import Table
from graphia import Graphia
from tripper import Session


class GraphiaController:
    """Intermediary controller managing Model calls and View state formatting."""

    def __init__(self, model: Graphia):
        self.model = model

    def get_triplestore_names(self) -> list[str]:
        return self.model.triplestore_names()

    def get_current_triplestore(self) -> str:
        return self.model.triplestore_name

    def switch_triplestore(self, ts_name: str) -> None:
        self.model.load_triplestore(ts_name)

    def reload_session(self) -> None:
        """Reload the session directly from the model's configuration directory."""
        configfile = self.model.confdir / "default_session.yaml"
        self.model.session = Session(configfile)

    def get_session_yaml(self) -> str:
        """Returns the string content of the active session configuration."""
        configfile = self.model.confdir / "default_session.yaml"
        return configfile.read_text(encoding="utf-8") if configfile.exists() else ""

    def save_session_yaml(self, yaml_content: str) -> None:
        """Saves the YAML string directly to the model's configuration file and reloads."""
        configfile = self.model.confdir / "default_session.yaml"
        configfile.write_text(yaml_content, encoding="utf-8")
        self.reload_session()

    def _table_to_dict(self, table: Table) -> dict:
        """Converts a tabular.Table into the dictionary format for the Vue View."""
        if not table or not table.headers:
            return {"headers": [], "data": []}

        # Deduplicate headers (preserves order) to prevent JSON-Editor schema crashes
        raw_headers = [str(h) for h in table.headers]
        unique_headers = []
        for h in raw_headers:
            if h not in unique_headers:
                unique_headers.append(h)

        # Iterate through table.rows directly to concatenate duplicate columns safely
        data_rows = []
        for row in table.rows:
            record = {}
            for h, val in zip(raw_headers, row):
                str_val = str(val) if val is not None else ""
                if record.get(h):
                    record[h] = f"{record[h]}, {str_val}" if str_val else record[h]
                else:
                    record[h] = str_val
            data_rows.append(record)

        return {"headers": unique_headers, "data": data_rows}

    def build_combo_schema(self) -> dict:
        """Build the schema dictionary needed by the Filter's ontocombo component."""

        def simplify(iri):
            return self.model.simplify_iris([iri])[0]

        def split(curie):
            if ":" in curie and not curie.startswith("http"):
                prefix, name = curie.split(":", 1)
                return prefix, name
            return "other", re.split(r"[#/]", curie)[-1] or curie

        def select(query):
            try:
                updated = self.model.update_sparql_query(query)
                return self.model.ts.query(updated)
            except Exception as e:
                print(f"Warning: combo query failed ({query}): {e}")
                return []

        def tree(groups, id_prefix):
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

        for row in select("SELECT DISTINCT ?p WHERE { ?s ?p ?o }"):
            p = row[0]
            value = simplify(str(p))
            prefix, name = split(value)
            predicates[prefix][value] = name

        for row in select("SELECT DISTINCT ?s ?c WHERE { ?s a ?c }"):
            s, c = row[0], row[1]
            class_value = simplify(str(c))
            prefix, class_name = split(class_value)
            classes[prefix][class_value] = class_name

            value = simplify(str(s))
            instances[class_name][value] = split(value)[1]

        return {
            "entities": top("Classes", "classes", classes)
            + top("Instances", "instances", instances),
            "predicates": tree(predicates, "pred"),
        }

    def execute_filter(self, filter_value: dict) -> tuple[str, dict]:
        """Runs queries or searches via the Model and returns (formatted_query_md, result_table_dict)."""
        active_tab = filter_value.get("active_tab", "Advanced")

        if active_tab == "Basic":
            criteria_list = filter_value.get("Basic", [])
            criteria_dict = {}
            lines = ""

            for item in criteria_list:
                p = item.get("predicate", "").strip()
                o = item.get("object", "").strip()
                if p and o:
                    criteria_dict[p] = o
                    lines += f"    '{p}': '{o}',\n"

            query_md = f"### Executed Search Criteria\n```python\ncriteria = {{\n{lines}}}\n```"

            try:
                table_result: Table = self.model.search(criteria=criteria_dict)
                result_dict = self._table_to_dict(table_result)
            except Exception as e:
                query_md += f"\n\n> **Error:** {e}"
                result_dict = {"headers": [], "data": []}

        else:
            raw_query = filter_value.get("Advanced", {}).get("query", "")
            if not raw_query:
                return "### Executed Query\n\n*(Waiting for input...)*", {
                    "headers": [],
                    "data": [],
                }

            translated = self.model.update_sparql_query(raw_query)
            query_md = f"### Executed Query\n```sparql\n{translated}\n```"

            try:
                table_result: Table = self.model.query(raw_query)
                result_dict = self._table_to_dict(table_result)
            except Exception as e:
                query_md += f"\n\n> **Error:** {e}"
                result_dict = {"headers": [], "data": []}

        return query_md, result_dict
