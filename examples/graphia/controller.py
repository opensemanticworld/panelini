"""Controller bridging the Graphia Model and GraphiaTool View."""

import re
from graphia import Graphia
from tripper import Session


class GraphiaController:
    """Intermediary controller managing Model calls and raw data retrieval."""

    def __init__(self, model: Graphia):
        self.model = model

    def get_triplestore_names(self) -> list[str]:
        return self.model.triplestore_names()

    def get_current_triplestore(self) -> str:
        return self.model.triplestore_name

    def switch_triplestore(self, ts_name: str) -> None:
        self.model.load_triplestore(ts_name)

    def reload_session(self) -> None:
        configfile = self.model.confdir / "default_session.yaml"
        self.model.session = Session(configfile)

    def get_session_yaml(self) -> str:
        configfile = self.model.confdir / "default_session.yaml"
        return configfile.read_text(encoding="utf-8") if configfile.exists() else ""

    def save_session_yaml(self, yaml_content: str) -> None:
        configfile = self.model.confdir / "default_session.yaml"
        configfile.write_text(yaml_content, encoding="utf-8")
        self.reload_session()

    def get_ontology_data(self) -> tuple[list[dict], list[dict]]:
        """Extracts raw ontology data for predicates and entities using all_iris."""

        def split(curie):
            if ":" in curie and not curie.startswith("http"):
                return curie.split(":", 1)
            return "other", re.split(r"[#/]", curie)[-1] or curie

        try:
            subj, pred = self.model.all_iris()
        except Exception as e:
            print(f"Warning: all_iris extraction failed: {e}")
            return [], []

        preds = []
        for _, curie in pred.items():
            prefix, name = split(curie)
            preds.append({"group": prefix, "value": curie, "label": name})

        ents = []
        for _, curie in subj.items():
            prefix, name = split(curie)
            ents.append(
                {
                    "group": prefix,
                    "value": curie,
                    "label": name,
                }
            )

        return preds, ents

    def execute_filter(self, filter_value: dict):
        """Runs SPARQL/search and returns (query_md, tabular.Table)."""
        active_tab = filter_value.get("active_tab", "Advanced")

        if active_tab == "Basic":
            criteria_list = filter_value.get("Basic", [])
            criteria_dict = {
                i.get("predicate", "").strip(): i.get("object", "").strip()
                for i in criteria_list
                if i.get("predicate") and i.get("object")
            }

            lines = "".join(f"    '{k}': '{v}',\n" for k, v in criteria_dict.items())
            query_md = f"### Executed Search Criteria\n```python\ncriteria = {{\n{lines}}}\n```"

            try:
                return query_md, self.model.search(criteria=criteria_dict)
            except Exception as e:
                return f"{query_md}\n\n> **Error:** {e}", None

        else:
            raw_query = filter_value.get("Advanced", {}).get("query", "")
            if not raw_query:
                return "### Executed Query\n\n*(Waiting for input...)*", None

            query_md = f"### Executed Query\n```sparql\n{raw_query}\n```"

            try:
                return query_md, self.model.query(raw_query)
            except Exception as e:
                return f"{query_md}\n\n> **Error:** {e}", None
