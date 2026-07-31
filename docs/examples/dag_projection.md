# DAG projection - graph as a tree

**Source:** [`examples/panels/wunderbaum/dag_projection.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/dag_projection.py)
**Test:** [`tests/panels/wunderbaum/examples/test_dag_projection.py`](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_dag_projection.py)

Project a directed acyclic graph (an ontology of `SubClassOf` / `HasPart` relationships) into a Wunderbaum treegrid. Nodes with multiple parents are duplicated under each parent, and edge direction is interpreted per relation type.

## The code

```python
import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

GRAPH_NODES = {
    "Vehicle": {"label": "Vehicle", "description": "A means of transport", "type": "class"},
    "Car": {"label": "Car", "description": "A four-wheeled motor vehicle", "type": "class"},
    "Engine": {"label": "Engine", "description": "...", "type": "part"},
    # ...
}

GRAPH_EDGES = [
    {"from": "Car", "to": "Vehicle", "relation": "SubClassOf"},   # child -> parent
    {"from": "Car", "to": "Engine", "relation": "HasPart"},       # parent -> child
    # ...
]


def dag_to_tree_source(nodes, edges, root_keys=None,
                       edge_types=None, parent_to_child_edges=None):
    """Convert a DAG to a Wunderbaum tree source.

    Edge direction depends on the relation:
    - SubClassOf: from=child, to=parent
    - HasPart:    from=parent, to=child
    Nodes with multiple parents are duplicated in the tree.
    """
    # ... builds a parent -> children map, then recursively emits nodes
    # keyed by path (e.g. "Vehicle/Car/Engine") so duplicates stay unique.


source = dag_to_tree_source(GRAPH_NODES, GRAPH_EDGES)

columns = [
    {"id": "*", "title": "Name", "width": "250px"},
    {"id": "type", "title": "Type", "width": "80px"},
    {"id": "relation", "title": "Relation", "width": "100px"},
    {"id": "description", "title": "Description", "width": "300px"},
]

tree = Wunderbaum(source=source, columns=columns)
```

Key points:

- The projection is pure Python (`dag_to_tree_source`) - Wunderbaum only ever sees a plain nested `source`. Any graph model can be adapted this way.
- Edge semantics are configurable: `parent_to_child_edges` (default `["HasPart"]`) lists relations where `from` is the parent; all others (like `SubClassOf`) are read child→parent.
- Because a shared node (e.g. `Engine`) appears under every parent, keys are path-prefixed (`Car/Engine`, `Truck/Engine`) to stay unique.

## How the test exercises it

The test serves the app and asserts the treegrid rendered: a non-empty `tree.source`, a visible `.wb-header` (columns), and at least one `.wb-row`.

## See also

- For a combined tree + graph view, see [`examples/usecases/wunderbaum_visnetwork.py`](https://github.com/opensemanticworld/panelini/blob/main/examples/usecases/wunderbaum_visnetwork.py)
- {doc}`wunderbaum_table_min` - the treegrid column basics
- {doc}`visnetwork` - the graph side of the story
