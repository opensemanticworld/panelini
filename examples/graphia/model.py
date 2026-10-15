"""Data model and query execution logic for Tripper."""

import re
import yaml
from pathlib import Path
from typing import Optional, Sequence

from tripper import RDF, EMMO, DCTERMS, Namespace, Session
from tripper.datadoc import search, acquire, TableDoc, Context


class TripperQueryModel:
    """Handles SPARQL queries and datadoc searches against a Triplestore."""

    def __init__(self, session_file: str, settings_file: str):
        self.session_file = session_file
        self.settings_file = settings_file
        self.session = Session(session_file)

        with open(settings_file, encoding="utf-8") as f:
            self.settings = yaml.safe_load(f)

        self.load_triplestore()

    def reload_session(self) -> None:
        """Reload session configuration from session file."""
        self.session = Session(str(self.session_file))

    def get_triplestore_names(self) -> list[str]:
        """Return names of all configured triplestores in the session."""
        return self.session.get_names()

    def get_current_triplestore_name(self) -> Optional[str]:
        """Return the currently selected triplestore name."""
        return self.triplestore_name

    def query_triplestore(self, query_str: str):
        """Execute query directly against active triplestore for schema discovery."""
        if self.ts is None:
            return []
        return self.ts.query(query_str)

    def load_triplestore(self, name: Optional[str] = None) -> None:
        """Load triplestore, context, and prefixes based on settings."""
        if name is None:
            names = self.get_triplestore_names()
            if not names:
                raise Exception("No configured triplestores.")
            name = names[0]

        self.ts = self.session.get_triplestore(name)

        std_ns = {
            "rdf": RDF,
            "emmo": EMMO,
            "dcterms": DCTERMS,
            "pers": Namespace("https://www.ntnu.edu/physmet/people/"),
            "arp": Namespace("https://www.ntnu.edu/physmet/data/arp/"),
        }
        for prefix, ns in std_ns.items():
            if prefix not in self.ts.namespaces:
                self.ts.bind(prefix, str(ns))

        conf = self.settings.get("triplestores", {}).get(name, {})

        self.context = Context(theme=None)
        for ctx in conf.get("context", ()):
            self.context.add_context(ctx)

        self.prefixes = {}
        for prefix, args in conf.get("translated_namespaces", {}).items():
            self.prefixes[prefix] = Namespace(**args)

        self.triplestore_name = name

    def update_sparql_query(self, query: str) -> str:
        """Update SPARQL query `query` by translating all prefixes that needs
        translations.

        Examples:
            A CURIE `emmo:Atom` in `query` will e.g. be replaced with
                <https://w3id.org/emmo#EMMO_eb77076b_a104_42ac_a065_798b2d2809ad>

        Notes:
            This functions assumes that `query` is well-formatted,
            i.e. all CURIEs that should be translated are terminated with
            a blank.
        """

        def translate(m):
            prefix, name = m.groups()
            return f"<{self.prefixes[prefix][name]}>"

        for prefix in self.prefixes:
            query = re.sub(rf"(?<=\s)({prefix}):(\S+)", translate, query)

        return query

    def simplify_iris(self, iris: Sequence) -> list:
        """Convert all IRIs in the (possible nested) sequence `iris` to CURIEs.

        For prefixes to namespaces that needs translations, IRIs will be
        translated to simple (formally invalid) human readable CURIEs.
        """
        retval = []
        for iri in iris:
            if isinstance(iri, str):
                for prefix, ns in self.prefixes.items():
                    if iri.startswith(str(ns)):
                        suffix = iri[len(str(ns)) :]
                        retval.append(f"{prefix}:{suffix}")
                        break
                else:
                    # Safely attempt to use context.prefixed, fallback to original IRI on exception
                    try:
                        prefixed = self.context.prefixed(iri)
                        retval.append(prefixed if prefixed else iri)
                    except Exception:
                        retval.append(iri)
            elif isinstance(iri, Sequence):
                retval.append(self.simplify_iris(iri))
            else:
                raise TypeError(
                    "Elements in `iris` must be either strings or sequences. "
                    f"Got: {type(iri)}"
                )
        return retval

    def execute_query(self, query: str) -> dict:
        """Executes a SPARQL query and returns structured data for the table component."""
        if self.ts is None:
            return {"error": "No triplestore loaded."}

        # Ensure standard prefixes are bound in the triplestore
        std_ns = {
            "rdf": RDF,
            "emmo": EMMO,
            "dcterms": DCTERMS,
            "pers": Namespace("https://www.ntnu.edu/physmet/people/"),
            "arp": Namespace("https://www.ntnu.edu/physmet/data/arp/"),
        }
        for prefix, ns in std_ns.items():
            if prefix not in self.ts.namespaces:
                self.ts.bind(prefix, str(ns))

        # Dynamically build SPARQL PREFIX headers from the triplestore
        prefix_lines = [f"PREFIX {p}: <{u}>" for p, u in self.ts.namespaces.items()]
        prefix_header = "\n".join(prefix_lines) + "\n\n"

        translated_query = self.update_sparql_query(query)
        if "PREFIX " not in translated_query.upper():
            final_query = prefix_header + translated_query
        else:
            final_query = translated_query

        print(f"--- Executing SPARQL ---\n{final_query}")

        try:
            results = self.ts.query(final_query)
            rows = list(results)

            if not rows:
                return {"headers": [], "data": []}

            # 1. Attempt to get headers natively (works for rdflib)
            if hasattr(results, "vars"):
                headers = [str(v) for v in results.vars]
            else:
                # 2. Fallback: Parse SELECT variables from the query string (works for lists)
                select_clause = re.split(r"WHERE", final_query, flags=re.IGNORECASE)[0]
                headers = [
                    var for var in re.findall(r"\?([a-zA-Z0-9_]+)", select_clause)
                ]

                # 3. Final Fallback: Generate generic columns if SELECT * is used
                if not headers:
                    headers = [f"Column_{i+1}" for i in range(len(rows[0]))]

            # Transform the column headers for the table component
            headers = self.simplify_iris(headers)

            data = []
            for row in rows:
                simplified_row = self.simplify_iris(
                    [str(term) if term is not None else "" for term in row]
                )
                data.append(dict(zip(headers, simplified_row)))

            return {"headers": headers, "data": data}

        except Exception as e:
            return {"error": f"Error executing query: {str(e)}"}

    def execute_datadoc_search(self, basic_criteria: list) -> str:
        """Executes tripper.datadoc search utilizing loaded settings contexts."""
        if self.ts is None:
            return "No triplestore loaded."

        # Build mapping from registered namespaces + prefixes
        ns_map = {
            prefix.lower(): Namespace(str(uri))
            for prefix, uri in self.ts.namespaces.items()
        }
        ns_map.update({"rdf": RDF, "emmo": EMMO, "dcterms": DCTERMS})

        # Add translated namespaces from settings
        for pref, ns in self.prefixes.items():
            ns_map[pref.lower()] = ns

        criteria = {}
        for item in basic_criteria:
            p_str, o_str = (
                item.get("predicate", "").strip(),
                item.get("object", "").strip(),
            )
            if p_str and o_str:
                p_obj, o_obj = p_str, o_str

                if ":" in p_str:
                    pref, val = p_str.split(":", 1)
                    if pref.lower() in ns_map:
                        p_obj = getattr(ns_map[pref.lower()], val)

                if ":" in o_str:
                    pref, val = o_str.split(":", 1)
                    if pref.lower() in ns_map:
                        o_obj = getattr(ns_map[pref.lower()], val)

                criteria[p_obj] = o_obj

        print(f"--- Performing search, criteria: ---\n{criteria}")
        try:
            iris = search(self.ts, criteria=criteria)
            results_list = list(iris)
            if not results_list:
                return {"headers": [], "data": []}

            dicts = [
                acquire(self.ts, iri, context=self.context) for iri in results_list
            ]
            td = TableDoc.fromdicts(dicts, context=self.context)

            clean_headers = self.simplify_iris([str(h) for h in td.headers])
            data = []

            for row in td.data:
                clean_row = self.simplify_iris(
                    [str(val) if val is not None else "" for val in row]
                )
                data.append(dict(zip(clean_headers, clean_row)))

            return {"headers": clean_headers, "data": data}

        except Exception as e:
            return {"error": f"Error executing datadoc search: {str(e)}"}
