"""Data model for the Semantic Filter: runs SPARQL queries and datadoc searches.

`query()` and `search()` return the same structure, which the table component
consumes directly:

    {"headers": [str, ...], "data": [{header: value, ...}, ...]}

Failures raise exceptions; presenting them is up to the caller.
"""

import re
from typing import Iterable, Optional

import yaml
from tripper import DCTERMS, EMMO, RDF, Namespace, Session
from tripper.datadoc import Context, TableDoc, acquire, search

# Namespaces that are always bound in the active triplestore
STD_NAMESPACES = {
    "rdf": RDF,
    "emmo": EMMO,
    "dcterms": DCTERMS,
    "pers": Namespace("https://www.ntnu.edu/physmet/people/"),
    "arp": Namespace("https://www.ntnu.edu/physmet/data/arp/"),
}

# Labels usable as the local part of a CURIE (so `emmo:hasInput` round-trips)
_LABEL = re.compile(r"[\w\-]+")


def _empty() -> dict:
    return {"headers": [], "data": []}


class TripperQueryModel:
    """Runs SPARQL queries and datadoc searches against a triplestore."""

    def __init__(self, session_file: str, settings_file: str):
        self.session_file = session_file
        self.settings_file = settings_file
        self.session = Session(session_file)
        with open(settings_file, encoding="utf-8") as f:
            self.settings = yaml.safe_load(f)

        self.ts = None
        self.triplestore_name: Optional[str] = None
        self.load_triplestore()

    # ------------------------------------------------------------------
    # Session / triplestore
    # ------------------------------------------------------------------
    def reload_session(self) -> None:
        self.session = Session(str(self.session_file))

    def get_triplestore_names(self) -> list[str]:
        return self.session.get_names()

    def get_current_triplestore_name(self) -> Optional[str]:
        return self.triplestore_name

    def load_triplestore(self, name: Optional[str] = None) -> None:
        """Load a triplestore (the first one by default) with its context and
        translated namespaces from the settings."""
        if name is None:
            names = self.get_triplestore_names()
            if not names:
                raise Exception("No configured triplestores.")
            name = names[0]

        self.ts = self.session.get_triplestore(name)
        for prefix, ns in STD_NAMESPACES.items():
            if prefix not in self.ts.namespaces:
                self.ts.bind(prefix, str(ns))

        conf = self.settings.get("triplestores", {}).get(name, {})

        self.context = Context(theme=None)
        for ctx in conf.get("context", ()):
            self.context.add_context(ctx)

        self.prefixes = {
            prefix: Namespace(**args)
            for prefix, args in conf.get("translated_namespaces", {}).items()
        }

        # Caches for simplify_iris(); they depend on the loaded triplestore
        self._label_maps: dict = {}
        self._simplified: dict = {}
        self._curie_re = (
            re.compile(
                r"(?<![\w/#:\-])("
                + "|".join(map(re.escape, self.prefixes))
                + r"):(\w+)"
            )
            if self.prefixes
            else None
        )

        self.triplestore_name = name

    # ------------------------------------------------------------------
    # Human readable names
    # ------------------------------------------------------------------
    def simplify_iris(self, terms: Iterable) -> list[str]:
        """Return `terms` with IRIs shortened to CURIEs using readable labels.

        Handles both full IRIs and CURIEs whose local part is an opaque id,
        e.g. `https://w3id.org/emmo#EMMO_36e6...` and `emmo:EMMO_36e6...`
        both become `emmo:hasInput`. Anything else is returned unchanged.
        """
        return [self._simplify(str(t)) for t in terms]

    def _simplify(self, term: str) -> str:
        if term not in self._simplified:
            self._simplified[term] = self._simplify_uncached(term)
        return self._simplified[term]

    def _simplify_uncached(self, term: str) -> str:
        if "://" not in term:
            # Not an IRI, but may contain CURIEs (e.g. datadoc table headers)
            if self._curie_re is None:
                return term
            return self._curie_re.sub(self._curie_label, term)

        # 1. Translated namespaces from the settings: use ontology labels
        for prefix, ns in self.prefixes.items():
            base = str(ns)
            if term.startswith(base):
                label = self._labels(prefix).get(term, term[len(base) :])
                return f"{prefix}:{label}"

        # 2. Namespaces bound in the triplestore
        for prefix, uri in self.ts.namespaces.items():
            if uri and term.startswith(str(uri)):
                return f"{prefix}:{term[len(str(uri)) :]}"

        # 3. The datadoc context, or the IRI as is
        try:
            return self.context.prefixed(term)
        except Exception:
            return term

    def _curie_label(self, match: re.Match) -> str:
        prefix, local = match.groups()
        base = str(self.prefixes[prefix])
        return f"{prefix}:{self._labels(prefix).get(base + local, local)}"

    def _labels(self, prefix: str) -> dict:
        """Map IRI -> label for a translated namespace (built once).

        tripper's `Namespace.__call__` prefers `skos:altLabel` over
        `skos:prefLabel` when an IRI has several labels. Here the entries of
        `Namespace._iris` are in order altLabel, rdfs:label, prefLabel, so
        letting later entries win gives prefLabel the highest precedence.
        """
        if prefix not in self._label_maps:
            ns = self.prefixes[prefix]
            base = str(ns)
            try:
                ns(base + "_")  # triggers the lazy load of the ontology
            except Exception:
                pass
            self._label_maps[prefix] = {
                iri: label
                for label, iri in (getattr(ns, "_iris", None) or {}).items()
                if iri != base + label and _LABEL.fullmatch(label)
            }
        return self._label_maps[prefix]

    # ------------------------------------------------------------------
    # Queries
    # ------------------------------------------------------------------
    def update_sparql_query(self, query: str) -> str:
        """Replace CURIEs of translated namespaces with full IRIs.

        E.g. `emmo:hasInput` becomes `<https://w3id.org/emmo#EMMO_36e6...>`.
        Assumes every CURIE to translate is terminated by whitespace.
        """

        def translate(m):
            prefix, name = m.groups()
            return f"<{self.prefixes[prefix][name]}>"

        for prefix in self.prefixes:
            query = re.sub(rf"(?<=\s)({prefix}):(\S+)", translate, query)
        return query

    def query(self, sparql: str) -> dict:
        """Run a SPARQL SELECT and return it in the table format."""
        final = self._with_prefixes(self.update_sparql_query(sparql))
        result = self.ts.query(final)
        rows = list(result)
        if not rows:
            return _empty()

        variables = getattr(result, "vars", None)
        if variables:
            headers = [str(v) for v in variables]
        else:  # backends returning plain lists: read the SELECT clause
            select = re.split("WHERE", final, flags=re.IGNORECASE)[0]
            headers = re.findall(r"\?(\w+)", select) or [
                f"Column_{i + 1}" for i in range(len(rows[0]))
            ]
        return self._table(headers, rows)

    def search(self, criteria: list[dict]) -> dict:
        """Run a datadoc search and return it in the table format.

        `criteria` is a list of `{"predicate": ..., "object": ...}` dicts
        holding CURIEs or IRIs; entries with a blank side are ignored.
        """
        translated = {p.lower(): ns for p, ns in self.prefixes.items()}
        bound = {p.lower(): str(u) for p, u in self.ts.namespaces.items()}

        def expand(term: str) -> str:
            prefix, colon, local = term.partition(":")
            prefix = prefix.lower()
            if colon and prefix in translated:
                return str(translated[prefix][local])
            if colon and prefix in bound:
                return bound[prefix] + local
            return term

        expanded = {}
        for item in criteria:
            p = item.get("predicate", "").strip()
            o = item.get("object", "").strip()
            if p and o:
                expanded[expand(p)] = expand(o)

        iris = list(search(self.ts, criteria=expanded))
        if not iris:
            return _empty()

        table = TableDoc.fromdicts(
            [acquire(self.ts, iri, context=self.context) for iri in iris],
            context=self.context,
        )
        return self._table(table.headers, table.data)

    def select_terms(self, sparql: str) -> list[tuple]:
        """Run a SELECT and return raw rows as tuples of strings (used to
        discover the classes, instances and predicates in the triplestore)."""
        rows = []
        for row in self.ts.query(sparql):
            if isinstance(row, str):
                row = (row,)
            elif isinstance(row, dict):
                row = row.values()
            rows.append(tuple(str(term) for term in row))
        return rows

    # ------------------------------------------------------------------
    def _with_prefixes(self, query: str) -> str:
        if "PREFIX " in query.upper():
            return query
        header = "".join(f"PREFIX {p}: <{u}>\n" for p, u in self.ts.namespaces.items())
        return f"{header}\n{query}"

    def _table(self, headers: Iterable, rows: Iterable) -> dict:
        headers = self.simplify_iris(headers)
        data = []
        for row in rows:
            record: dict = {}
            values = self.simplify_iris("" if v is None else v for v in row)
            for header, value in zip(headers, values):
                # Repeated headers (e.g. several @type) are merged, not overwritten
                if value:
                    record[header] = (
                        f"{record[header]}, {value}" if record.get(header) else value
                    )
                else:
                    record.setdefault(header, "")
            data.append(record)
        return {"headers": list(dict.fromkeys(headers)), "data": data}
