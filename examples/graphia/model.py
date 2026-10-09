"""Data model and query execution logic for Tripper."""

import re
import yaml
from pathlib import Path
from typing import Optional, Sequence

from tripper import RDF, EMMO, DCTERMS, Namespace, Session
from tripper.datadoc import search, acquire, get_context, TableDoc, Context


class TripperQueryModel:
    """Handles SPARQL queries and datadoc searches against a Triplestore."""

    def __init__(self, session_file: str, settings_file: str):
        self.session = Session(session_file)

        with open(settings_file, encoding="utf-8") as f:
            self.settings = yaml.safe_load(f)

        self.ts = None
        self.triplestore_name: Optional[str] = None
        self.prefixes: dict[str, Namespace] = {}
        self.context: Optional[Context] = None

    def load_triplestore(self, name: Optional[str] = None) -> None:
        """Load triplestore, context, and prefixes based on settings."""
        if name is None:
            names = self.session.get_names()
            if not names:
                raise Exception("No configured triplestores.")
            name = names[0]

        self.ts = self.session.get_triplestore(name)
        conf = self.settings.get("triplestores", {}).get(name, {})

        self.context = Context(theme=None)
        for ctx in conf.get("context", ()):
            self.context.add_context(ctx)

        self.prefixes = {}
        for prefix, args in conf.get("translated_namespaces", {}).items():
            self.prefixes[prefix] = Namespace(**args)

        self.triplestore_name = name

    def update_sparql_query(self, query: str) -> str:
        """Translate prefixes that need translations and wrap bare URLs in SPARQL."""

        def translate(m):
            prefix, name = m.groups()
            if prefix in self.prefixes:
                return f"<{self.prefixes[prefix]}{name}>"
            return m.group(0)

        for prefix in self.prefixes:
            query = re.sub(rf"({prefix}):([^\s<>\.]+)", translate, query)

        # Wrap bare HTTP/HTTPS URLs safely (ignoring trailing punctuation like dots)
        query = re.sub(r"(?<!<)(https?://[^\s<>]*[^.,;\s<>])", r"<\1>", query)

        return query

    def simplify_iris(self, iris: Sequence) -> list:
        """Convert all IRIs in the sequence to CURIEs for the UI."""
        retval = []
        for iri in iris:
            if isinstance(iri, str):
                for prefix, ns in self.prefixes.items():
                    if iri.startswith(str(ns)):
                        retval.append(f"{prefix}:{ns(iri)}")
                        break
                else:
                    # Fallback to context-based prefixing or raw IRI
                    if self.context:
                        try:
                            retval.append(self.context.prefixed(iri))
                        except Exception:
                            retval.append(iri)
                    else:
                        retval.append(iri)
            elif isinstance(iri, Sequence):
                retval.append(self.simplify_iris(iri))
            else:
                raise TypeError(
                    f"Elements must be strings or sequences. Got: {type(iri)}"
                )
        return retval

    def execute_query(self, query: str) -> str:
        """Executes a SPARQL query after injecting prefixes and translating namespaces."""
        # Ensure standard prefixes are bound in the triplestore
        std_ns = {
            "rdf": RDF,
            "emmo": EMMO,
            "dcterms": DCTERMS,
            "pers": Namespace("https://www.ntnu.edu/physmet/people/"),
        }
        for prefix, ns in std_ns.items():
            if prefix not in self.ts.namespaces:
                self.ts.bind(prefix, str(ns))

        # 1. Dynamically build SPARQL PREFIX headers from the triplestore
        prefix_lines = [f"PREFIX {p}: <{u}>" for p, u in self.ts.namespaces.items()]
        prefix_header = "\n".join(prefix_lines) + "\n\n"

        # 2. Translate prefixes and wrap bare URLs
        translated_query = self.update_sparql_query(query)

        # 3. Inject the header if the query doesn't already have one
        if "PREFIX " not in translated_query.upper():
            final_query = prefix_header + translated_query
        else:
            final_query = translated_query

        print(f"--- Executing SPARQL ---\n{final_query}")

        try:
            results = self.ts.query(final_query)
            rows = list(results)

            if not rows:
                return "No results found."

            output_lines = [f"Found {len(rows)} results:\n", "-" * 40]
            for i, row in enumerate(rows, 1):
                output_lines.append(f"Result {i}:")
                simplified_row = self.simplify_iris(
                    [str(term) for term in row if term is not None]
                )
                for term in simplified_row:
                    output_lines.append(f"  - {term}")
                output_lines.append("-" * 40)

            return "\n".join(output_lines)

        except Exception as e:
            return f"Error executing query:\n{str(e)}"

    def execute_datadoc_search(self, basic_criteria: list) -> str:
        """Executes tripper.datadoc search utilizing loaded settings contexts."""
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

        try:
            iris = search(self.ts, criteria=criteria)
            results_list = list(iris)
            if not results_list:
                return "No results found."

            dicts = [
                acquire(self.ts, iri, context=self.context) for iri in results_list
            ]
            td = TableDoc.fromdicts(dicts, context=self.context)

            output_lines = [f"Found {len(results_list)} results:\n", "-" * 40]
            output_lines.append(f"Result table headers: {td.headers}")
            output_lines.append("-" * 40)

            for i, row in enumerate(td.data, 1):
                output_lines.append(f"Result {i}:")
                for header, val in zip(td.headers, row):
                    output_lines.append(f"  {header}: {val}")
                output_lines.append("-" * 40)

            return "\n".join(output_lines)

        except Exception as e:
            return f"Error executing datadoc search:\n{str(e)}"
