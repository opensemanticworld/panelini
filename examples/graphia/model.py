"""Data model and query execution logic for Tripper."""

from tripper import RDF, EMMO, DCTERMS, Namespace
from tripper.datadoc import search, acquire, get_context, TableDoc


class TripperQueryModel:
    """Handles SPARQL queries and datadoc searches against a Triplestore."""

    def __init__(self, triplestore):
        self.ts = triplestore

    def execute_query(self, query: str) -> str:
        """Executes a raw SPARQL query and formats the output."""
        print(f"--- Executing SPARQL ---\n{query}")

        try:
            results = self.ts.query(query)
            rows = list(results)

            if not rows:
                return "No results found."

            output_lines = [f"Found {len(rows)} results:\n", "-" * 40]

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

        # Dynamically build mapping from all registered namespaces
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

                # Resolve predicate and object strings to actual Namespace objects
                if ":" in p_str:
                    pref, val = p_str.split(":", 1)
                    if pref.lower() in ns_map:
                        p_obj = getattr(ns_map[pref.lower()], val)

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
            context_url = (
                "https://raw.githubusercontent.com/SINTEF/"
                f"physmet-data-documentation-templates/refs/heads/{branch}/"
                "context/context.json"
            )
            context = get_context(context_url, default_theme=None)

            # Acquire dictionaries and create table doc
            dicts = [acquire(self.ts, iri, context=context) for iri in results_list]
            td = TableDoc.fromdicts(dicts, context=context)

            output_lines = [f"Found {len(results_list)} results:\n", "-" * 40]
            output_lines.append(f"Result table headers: {td.headers}")
            output_lines.append("-" * 40)

            # Format tabular rows
            for i, row in enumerate(td.data, 1):
                output_lines.append(f"Result {i}:")
                for header, val in zip(td.headers, row):
                    output_lines.append(f"  {header}: {val}")
                output_lines.append("-" * 40)

            return "\n".join(output_lines)

        except Exception as e:
            return f"Error executing datadoc search:\n{str(e)}"
