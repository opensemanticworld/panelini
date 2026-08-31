# Wunderbaum

```{image} /_static/media/wunderbaum/virtual_filesystem_overview.webp
:alt: Wunderbaum treegrid with drag-and-drop, context menu, and inline edit
:class: docs-media
```

`Wunderbaum` renders large, nested data as a fast virtualised tree or a tree + table, wrapping the [wunderbaum](https://mar10.github.io/wunderbaum/) JavaScript library as a Panel component. It supports columns, checkboxes with tri-state parent propagation, drag-and-drop, right-click context menus, inline editing, and lazy loading of children on demand.

## Quickstart

```{image} /_static/media/wunderbaum/wunderbaum_panel_min_feature.png
:alt: a minimal nested wunderbaum tree
:class: docs-media
```

Nodes are plain dicts. `title` and `key` are reserved, `children` nests, `expanded` opens a branch on load; any other key becomes column data (`node.data`). That is the entire contract for a read-only tree.

```{literalinclude} ../../examples/panels/wunderbaum/wunderbaum_panel_min.py
:language: python
:start-at: source = [
:end-at: tree = Wunderbaum(source=source)
```

`Wunderbaum` is a standalone `AnyWidgetComponent` with no Panelini dependency, so `pn.serve(tree)` is enough. `source` is a `param` list: reassign it and the frontend re-renders. The tree itself lives in a shadow DOM, which is why the Playwright tests reach into it with a `findInShadowRoots` helper.

```{mermaid}
graph LR
    py[Python prop<br/>source] <--> bridge[AnyWidget bridge]
    bridge <--> vue[Vue wrapper]
    vue --> wb[wunderbaum JS]
    wb --> dom[Shadow DOM rows]
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_panel_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_panel_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/wunderbaum_panel_min.html" title="Wunderbaum tree - minimal (standalone)" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/wunderbaum_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Inside a Panelini shell

```{image} /_static/media/wunderbaum/wunderbaum_panelini_min_feature.png
:alt: wunderbaum tree hosted in a panelini card
:class: docs-media
```

The same tree, this time in a Panelini card. Only the wrapper changes: the tree drops into a `pn.Card`, the card drops into `main_set`. The panel class is untouched, which is the point of the panels-are-standalone design.

```{literalinclude} ../../examples/panels/wunderbaum/wunderbaum_panelini_min.py
:language: python
:start-at: app = Panelini(title="Wunderbaum Tree Demo"
:end-at: app.servable()
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_panelini_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_panelini_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/wunderbaum_panelini_min.html" title="Wunderbaum tree inside panelini" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/wunderbaum_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Treegrid: columns

```{image} /_static/media/wunderbaum/wunderbaum_table_min_overview.png
:alt: wunderbaum in tree and table mode with size, modified, and permission columns
:class: docs-media
```

Supplying `columns` switches the panel from tree-only into **tree + table** mode. The first column uses the reserved id `"*"` for the tree itself; the rest map to node properties by `id`.

```{literalinclude} ../../examples/panels/wunderbaum/wunderbaum_table_min.py
:language: python
:start-at: columns = [
:end-at: tree = Wunderbaum(source=source, columns=columns)
```

Column values sit **at the node level**, not inside a nested `data` dict - wunderbaum moves any non-reserved key into `node.data` for you. `icon` takes [Bootstrap Icons](https://icons.getbootstrap.com/) class names (`bi bi-...`). Beware that `type` is reserved by wunderbaum for node typing, so a "type" column needs a different key (see [DAG projection](#dag-projection), which uses `node_type`).

````{dropdown} The full example, including the source data
```{literalinclude} ../../examples/panels/wunderbaum/wunderbaum_table_min.py
:language: python
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/wunderbaum_table_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_wunderbaum_table_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/wunderbaum_table_min.html" title="Wunderbaum treegrid - columns" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/wunderbaum_table_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Checkboxes

```{image} /_static/media/wunderbaum/checkbox_tree_feature.webp
:alt: checkbox tree with tri-state parent propagation
:class: docs-media
```

Two options drive the behaviour: `checkbox: True` renders the boxes and `selectMode: "hier"` propagates state, so checking a parent checks every descendant and a partial child selection leaves the parent indeterminate.

Selection syncs back into `tree.source` as a `selected: True` flag on each node, with no separate event wiring - a `param.watch` on `source` is enough to keep a live display in step.

```{literalinclude} ../../examples/panels/wunderbaum/checkbox_tree.py
:language: python
:pyobject: _get_checked_keys
```

```{literalinclude} ../../examples/panels/wunderbaum/checkbox_tree.py
:language: python
:start-at: tree = Wunderbaum(
:end-at: tree.param.watch(_on_source_change, ["source"])
```

The test for this example is the most thorough in the suite: it clicks individual `.wb-checkbox` elements and checks both the Python side (`_get_checked_keys(tree.source)`) and the client-side wunderbaum state (`node.selected` / `node._partsel`) for leaf selection, whole-subtree selection, indeterminate parents, propagation up to grandparents, and independence between sibling subtrees.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/checkbox_tree.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_checkbox_tree.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/checkbox_tree.html" title="Checkbox tree - hierarchical selection" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/checkbox_tree.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Context menu

```{image} /_static/media/wunderbaum/context_menu_feature.webp
:alt: right-click context menu on a tree node
:class: docs-media
```

`context_menu_items` declares the entries; each `id` arrives at the callback as the `action` string. `tree_event_callback` receives `(event_name, event_params)` for every tree event, so one function dispatches the lot and drives the tree back through the Python API.

```{literalinclude} ../../examples/panels/wunderbaum/context_menu.py
:language: python
:pyobject: on_tree_event
```

```{literalinclude} ../../examples/panels/wunderbaum/context_menu.py
:language: python
:start-at: tree = Wunderbaum(
:end-before: app = pn.Column(
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/context_menu.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_context_menu.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/context_menu.html" title="Context menu - right-click actions" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/context_menu.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

```{note}
Dispatching a real `contextmenu` event through the shadow DOM is unreliable under Playwright, so the menu itself is not asserted in the UI tests (the [virtual filesystem](#virtual-filesystem) test marks that case `xfail`). The actions are covered through their Python-API paths instead.
```

## Lazy loading

```{image} /_static/media/wunderbaum/lazy_loading_feature.webp
:alt: a lazy node loading its children on expand
:class: docs-media
```

A node marked `lazy: True` renders an expander but defers loading. On first expand, `lazy_load_callback(key, request_data)` runs on the Python side and returns that node's children. Returned children can be lazy themselves, which gives arbitrarily deep on-demand trees - capped at three levels here by the `depth` check. Mixing lazy and preloaded roots is fine.

The callback may be a coroutine, and should be whenever it does real I/O: a blocking wait would freeze the server thread, and in the browser it would freeze the whole app.

```{literalinclude} ../../examples/panels/wunderbaum/lazy_loading.py
:language: python
:start-at: source = [
:end-at: return children
```

```{literalinclude} ../../examples/panels/wunderbaum/lazy_loading.py
:language: python
:start-at: tree = Wunderbaum(
:end-before: app = pn.Column(
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/lazy_loading.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_lazy_loading.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/lazy_loading.html" title="Lazy loading - children on demand" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/lazy_loading.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Incremental updates

```{image} /_static/media/wunderbaum/incremental_tree_demo_feature.webp
:alt: a project folder structure built step by step
:class: docs-media
```

Instead of reassigning `source`, a tree can be grown with action playbooks: `tree.execute_step(step)` takes a dict bundling an `actions` list plus a status message and sends the actions straight to the JavaScript side. The notation is the same one the VisNetwork [incremental graph demo](visnetwork.md) uses.

Supported actions include `addNode` (with `parentKey`, `None` for a root), `renameNode`, `moveNode` (with `targetKey` and `mode`), and the terminal `complete`. `tree.clear()` resets everything.

```{literalinclude} ../../examples/panels/wunderbaum/incremental_tree_demo.py
:language: python
:pyobject: create_demo
```

````{dropdown} The full build sequence
```{literalinclude} ../../examples/panels/wunderbaum/incremental_tree_demo.py
:language: python
:start-at: SEQUENCE = [
:end-before: def create_demo():
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/incremental_tree_demo.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_incremental_tree_demo.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/incremental_tree_demo.html" title="Incremental updates - build a tree step by step" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/incremental_tree_demo.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## DAG projection

```{image} /_static/media/wunderbaum/dag_projection_feature.png
:alt: an ontology graph projected into a treegrid
:class: docs-media
```

A directed acyclic graph can be projected into a tree. This example takes an ontology of `SubClassOf` and `HasPart` edges and emits a treegrid where a node with several parents appears under each of them.

```{literalinclude} ../../examples/panels/wunderbaum/dag_projection.py
:language: python
:start-at: GRAPH_EDGES = [
:end-before: def dag_to_tree_source(
```

Edge direction is per relation: `parent_to_child_edges` (default `["HasPart"]`) lists the relations where `from` is the parent, and everything else (`SubClassOf`) is read child to parent. Because a shared node such as `Engine` shows up under every parent, keys are path-prefixed (`Car/Engine`, `Truck/Engine`) to stay unique.

````{dropdown} The projection function
```{literalinclude} ../../examples/panels/wunderbaum/dag_projection.py
:language: python
:pyobject: dag_to_tree_source
```
````

The projection is pure Python: Wunderbaum only ever sees a plain nested `source`, so any graph model can be adapted the same way.

```{literalinclude} ../../examples/panels/wunderbaum/dag_projection.py
:language: python
:start-at: source = dag_to_tree_source(GRAPH_NODES, GRAPH_EDGES)
:end-at: tree = Wunderbaum(source=source, columns=columns)
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/dag_projection.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_dag_projection.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/dag_projection.html" title="DAG projection - graph as a tree" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/dag_projection.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

For the same graph shown as a tree *and* a network side by side, see {doc}`../examples/usecases/usecase_wunderbaum_visnetwork`.

## Virtual filesystem

```{image} /_static/media/wunderbaum/virtual_filesystem_overview.webp
:alt: multi-root filesystem browser with columns, checkboxes, and drag-and-drop
:class: docs-media
```

The kitchen-sink example: a multi-root filesystem browser backed by an in-memory dict, combining nearly every feature at once.

- **Multiple root mounts** (`/home`, `/tmp`) with folder and file icons
- **Columns**: name, size, modified date
- **Context menu**: New Folder, New File, Delete, Delete Checked
- **Checkboxes** plus a "Delete Checked" batch action
- **Drag-and-drop** to move nodes, **F2 or click** to rename inline
- **External file drop** onto the tree via `file_drop_callback`
- **Python API buttons** for add-folder, add-file, and delete by key

```{literalinclude} ../../examples/panels/wunderbaum/virtual_filesystem.py
:language: python
:start-at: tree = Wunderbaum(
:end-before: ====
```

`fs_to_tree_source()` converts the flat `{path: info}` dict into a nested source, which is the canonical "adapt your data model" pattern. `on_tree_event` dispatches on `event_name` (`contextmenu`, `activate`, `drop`, `edit.apply`) and mutates the tree with `add_folder`, `add_file`, `remove_node`, or a `batch_update` for "Delete Checked".

````{dropdown} The filesystem adapter and the event dispatcher
```{literalinclude} ../../examples/panels/wunderbaum/virtual_filesystem.py
:language: python
:pyobject: fs_to_tree_source
```

```{literalinclude} ../../examples/panels/wunderbaum/virtual_filesystem.py
:language: python
:pyobject: on_tree_event
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/wunderbaum/virtual_filesystem.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/wunderbaum/examples/test_virtual_filesystem.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/wunderbaum/virtual_filesystem.html" title="Virtual filesystem - the full demo" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/wunderbaum/virtual_filesystem.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Manipulation API

Every interactive feature above ultimately calls the same imperative methods, which you can use directly:

```python
tree.add_node(parent_key="docs", node={"title": "new.txt", "key": "docs/new"})
tree.update_node("docs/new", {"title": "renamed.txt"})
tree.rename_node("docs/new", "renamed.txt")
tree.remove_node("docs/new")
tree.expand_node("docs", expanded=True)
tree.set_active_node("config")
tree.clear()

# Convenience helpers for file-tree style data
tree.add_folder(parent_key=None, key="src", title="src")
tree.add_file(parent_key="src", key="src/main.py", title="main.py")
```

## Options

Appearance and behaviour are customised through `options` (passed straight to wunderbaum) and node `types`:

```python
tree = Wunderbaum(
    source=source,
    options={"checkbox": True, "minExpandLevel": 1},
    types={"folder": {"icon": "bi bi-folder"}},
)
```

## Drag-and-drop

Dropping a node onto another reparents it, and the Vue bridge reports the moved node's key together with its new parent, so Python can update `source` to match. Dropping a file from the desktop is a separate path: `file_drop_callback` receives the payload and decides what to insert.

The [virtual filesystem](#virtual-filesystem) above wires up both, and {doc}`../examples/usecases/usecase_wunderbaum_visnetwork` keeps a dragged tree in sync with a graph.

## API reference

{py:class}`panelini.panels.wunderbaum.wunderbaum.Wunderbaum`
