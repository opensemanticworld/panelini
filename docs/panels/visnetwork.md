# VisNetwork

```{image} /_static/media/visnetwork/visnetwork_context_menu_feature.webp
:alt: a vis-network graph with a right-click context menu open on a node
:class: docs-media
```

`VisNetwork` renders interactive, physics-simulated network graphs, wrapping the [vis-network](https://visjs.github.io/vis-network/docs/network/) JavaScript library as a Panel component. Nodes and edges are plain dicts on the Python side; clicks, drags, context menus, and file drops come back as callbacks.

The bundled JS and CSS ship with panelini, so there is no extra install step.

## Quickstart

```{image} /_static/media/visnetwork/visnetwork_panel_min_feature.png
:alt: three nodes and two edges in a standalone visnetwork panel
:class: docs-media
```

The smallest possible graph. It renders immediately, runs a physics layout, and accepts drag interactions out of the box.

```{literalinclude} ../../examples/panels/visnetwork/visnetwork_panel_min.py
:language: python
:start-at: nodes = [
:end-at: vis = VisNetwork(nodes=nodes, edges=edges)
```

`VisNetwork` is a standalone `AnyWidgetComponent` with no Panelini dependency, so `pn.serve(vis)` is enough.

```{mermaid}
graph LR
    py[Python props<br/>nodes, edges, options] <--> bridge[AnyWidget bridge]
    bridge <--> vue[Vue wrapper]
    vue --> visjs[vis-network JS]
    visjs --> canvas[HTML canvas]
    canvas -- events --> vue
```

`nodes`, `edges`, and `options` are `param` properties: reassign them and the frontend re-renders. User interactions flow back through the `_event_data` param, and the Python callbacks run reactively.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/visnetwork_panel_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_panel_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/visnetwork_panel_min.html" title="VisNetwork - minimal (standalone)" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/visnetwork_panel_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Inside a Panelini shell

```{image} /_static/media/visnetwork/visnetwork_panelini_min_feature.png
:alt: the same graph hosted in a panelini card
:class: docs-media
```

The same three nodes, this time in a Panelini card. Only the wrapper changes.

```{literalinclude} ../../examples/panels/visnetwork/visnetwork_panelini_min.py
:language: python
:start-at: app = Panelini(
:end-at: app.servable()
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/visnetwork_panelini_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_panelini_min.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/visnetwork_panelini_min.html" title="VisNetwork inside panelini" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/visnetwork_panelini_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Responsive sizing

```{image} /_static/media/visnetwork/visnetwork_resize_feature.webp
:alt: the graph canvas shrinking as the viewport narrows
:class: docs-media
```

With `sizing_mode="stretch_both"` the canvas follows its container. A `ResizeObserver` on the widget root redraws vis-network whenever the box changes, so the graph tracks a collapsing sidebar or a narrowing window instead of clipping.

```{literalinclude} ../../tests/panels/visnetwork/test_visnetwork_resize.py
:language: python
:start-at: vis = VisNetwork(
:end-at: )
:dedent: 4
```

The clip above is recorded by that regression test, which shrinks the viewport from 1400px to 700px and asserts the canvas shrinks with it.

[Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/test_visnetwork_resize.py)

## Node tooltips from JSON data

```{image} /_static/media/visnetwork/visnetwork_json_data_feature.webp
:alt: a node showing its json_data as a colour-coded YAML tooltip
:class: docs-media
```

Attach a `json_data` dict to any node and hovering it renders the data as a formatted YAML tooltip, colour-coded by value type so numbers, strings, and booleans stay easy to scan.

The node here is pinned with `x`, `y`, and `fixed`, and physics is disabled, so it stays put while you hover.

```{literalinclude} ../../examples/panels/visnetwork/visnetwork_json_data_min.py
:language: python
:start-at: nodes = [
:end-at: )
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/visnetwork_json_data_min.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_json_data.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/visnetwork_json_data_min.html" title="Node tooltips from JSON data" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/visnetwork_json_data_min.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Context menus

```{image} /_static/media/visnetwork/visnetwork_context_menu_feature.webp
:alt: right-click menus on a node and on an edge
:class: docs-media
```

A `callback_name_dict` on a node or edge maps an action id to the label shown in its right-click menu. Elements without one, such as the locked system node below, show no menu at all.

````{dropdown} The three nodes: two with menus, one without
```{literalinclude} ../../examples/panels/visnetwork/context_menu.py
:language: python
:start-at: self.nodes = [
:end-at: ]
:dedent: 8
```
````

`context_menu_callback` is then called with `(element_type, element_id, action_id)` when an item is selected, so one function dispatches both node and edge actions.

```{literalinclude} ../../examples/panels/visnetwork/context_menu.py
:language: python
:start-at: self.vis = VisNetwork(
:end-at: )
:dedent: 8
```

```{literalinclude} ../../examples/panels/visnetwork/context_menu.py
:language: python
:pyobject: ContextMenuDemo.on_context_menu
:dedent: 4
```

The handlers mutate the graph with `remove_node`, `set_nodes`, `add_node` / `add_edge`, and the edge equivalents.

````{dropdown} The node action handler
```{literalinclude} ../../examples/panels/visnetwork/context_menu.py
:language: python
:pyobject: ContextMenuDemo.handle_node_action
:dedent: 4
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/context_menu.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_visnetwork_context_menu.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/context_menu.html" title="VisNetwork context menus" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/context_menu.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Ctrl+drag duplicate

```{image} /_static/media/visnetwork/ctrl_drag_duplicate_feature.webp
:alt: a node cloned by holding ctrl while dragging
:class: docs-media
```

Hold **Ctrl** and drag a node, or a multi-selection, to clone it. Each duplicate is created with an edge back to its original, and the new positions sync to Python.

`nodes_duplicated_callback` receives the list of duplicated node dicts after the drag ends, so copies can be post-processed. Set `interaction.multiselect` to duplicate several nodes at once.

```{literalinclude} ../../examples/panels/visnetwork/ctrl_drag_duplicate.py
:language: python
:start-at: self.vis = VisNetwork(
:end-at: )
:dedent: 8
```

````{dropdown} The post-processing callback: tag copies and recolour them
```{literalinclude} ../../examples/panels/visnetwork/ctrl_drag_duplicate.py
:language: python
:pyobject: CtrlDragDemo.on_nodes_duplicated
:dedent: 4
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/ctrl_drag_duplicate.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_ctrl_drag_duplicate.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/ctrl_drag_duplicate.html" title="VisNetwork Ctrl+drag duplicate" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/ctrl_drag_duplicate.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Fixed positions

```{image} /_static/media/visnetwork/hierarchy_feature.png
:alt: a family tree with pinned generations and labelled relations
:class: docs-media
```

A family tree laid out by hand. Every node carries explicit `x` / `y` coordinates with `fixed: True`, so grandparents, parents, and children stay pinned to their rows instead of drifting under physics.

```{literalinclude} ../../examples/panels/visnetwork/hierarchy.py
:language: python
:start-at: nodes = [
:end-at: },
```

Relationships are labelled edges, which makes the parent links explicit rather than implied by position.

```{literalinclude} ../../examples/panels/visnetwork/hierarchy.py
:language: python
:start-at: edges = [
:end-before: if __name__
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/hierarchy.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_hierarchy.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/hierarchy.html" title="Family tree with fixed positions" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/hierarchy.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Hierarchical layout

```{image} /_static/media/visnetwork/device_hierarchy_feature.png
:alt: a device ontology drawn top-down with typed edges
:class: docs-media
```

A device ontology drawn by vis-network's hierarchical engine instead of by hand. Device classes descend from `Thing` through `Device` to concrete instruments along solid `SubclassOf` edges, while dashed `HasTypicalProcess` edges connect each device to the operations it performs.

Each node carries a `group` for colour and a `level` for its row:

```{literalinclude} ../../examples/panels/visnetwork/device_hierarchy.py
:language: python
:start-at: {"id": "Thing"
:end-at: {"id": "Device"
:dedent: 4
```

Physics is off and the layout is computed once, so the tree stays stable. `groups` maps each domain to a colour, which beats styling all 69 nodes individually.

```{literalinclude} ../../examples/panels/visnetwork/device_hierarchy.py
:language: python
:start-at: options = {
:end-before: if __name__
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/device_hierarchy.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_device_hierarchy.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/device_hierarchy.html" title="Device hierarchy ontology" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/device_hierarchy.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Groups and physics

```{image} /_static/media/visnetwork/group_filtering_feature.png
:alt: people nodes coloured by team, settled around fixed project boxes
:class: docs-media
```

Four projects and ten people as a small org chart. The project boxes sit at fixed coordinates while the people nodes are placed by the physics engine and coloured by the team they belong to.

```{literalinclude} ../../examples/panels/visnetwork/group_filtering.py
:language: python
:start-at: project_nodes = [
:end-at: },
```

Each person node carries a `group` key, and the `groups` block in `options` maps every group name to a background and border colour. Stabilization is enabled, so the free nodes settle around the fixed boxes over the first few seconds.

```{literalinclude} ../../examples/panels/visnetwork/group_filtering.py
:language: python
:start-at: options = {
:end-before: if __name__
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/group_filtering.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_group_filtering.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/group_filtering.html" title="Team and project groups" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/group_filtering.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Image nodes

```{image} /_static/media/visnetwork/images_feature.png
:alt: a graph whose nodes are remote photographs
:class: docs-media
```

Nodes are not limited to circles and boxes. Give a node `shape: "image"` and an `image` URL and vis-network draws the picture in place of a plain marker, with `size` controlling how large it is drawn.

```{literalinclude} ../../examples/panels/visnetwork/images.py
:language: python
:start-after: {"id": 4, "label": "Kaeppele"
:end-at: },
:dedent: 4
```

Here a small knowledge graph about Wuerzburg links `ellipse` label nodes to photographs on Wikimedia Commons through `HasImage` edges, so one layout mixes text and imagery. The pictures are fetched at render time, so they pop in a moment after the graph draws.

````{dropdown} The full graph
```{literalinclude} ../../examples/panels/visnetwork/images.py
:language: python
:start-at: nodes = [
:end-before: if __name__
```
````

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/images.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_images.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/images.html" title="Image nodes" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/images.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Animating positions

```{image} /_static/media/visnetwork/rotating_circles_feature.png
:alt: five nodes pinned on a ring, each with a free satellite
:class: docs-media
```

Five nodes are pinned at equal angles on a circle, each linked to one free node whose position physics works out. A periodic callback recomputes the ring angle from a velocity slider and reassigns `visnetwork_panel.nodes`, so the whole ring spins and drags its satellites along.

```{literalinclude} ../../examples/panels/visnetwork/rotating_circles.py
:language: python
:start-at: visnetwork_panel = VisNetwork(
:end-at: _offsets =
```

```{literalinclude} ../../examples/panels/visnetwork/rotating_circles.py
:language: python
:pyobject: rotate
```

```{important}
Drive animation with `pn.state.add_periodic_callback`, never a blocking `while` loop. A blocking loop freezes the single-threaded WASM runtime in the browser, and blocks the server thread under `panel serve`.
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/rotating_circles.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_rotating_circles.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/rotating_circles.html" title="Rotating circles" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/rotating_circles.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## File drop

```{image} /_static/media/visnetwork/drop_file_feature.png
:alt: a prompt node inviting a file drop onto the canvas
:class: docs-media
```

The canvas doubles as a drop target. This example starts with a single prompt node; dragging an image or a CSV onto the widget spawns a node from the dropped content with no extra wiring.

```{literalinclude} ../../examples/panels/visnetwork/drop_file.py
:language: python
:start-at: nodes = [
:end-before: if __name__
```

`default_file_drop_callback` reads each file as a data URL and appends a node at the drop coordinates: an `image` shape for `data:image/*`, otherwise an ellipse carrying the content under a `data` key. Rendering that payload by MIME type is the [detail panel](graph_detail_tool.md#the-detail-panel)'s job, not the graph's.

To take over, pass your own `file_drop_callback`. It receives the raw event: the drop `x` and `y` plus a `files` list of `{"name": ..., "content": ...}` dicts.

```python
def on_file_drop(event_params: dict):
    for file_info in event_params["files"]:
        print(f"Dropped {file_info['name']} at {event_params['x']}, {event_params['y']}")

vis = VisNetwork(nodes=nodes, edges=edges, file_drop_callback=on_file_drop)
```

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/drop_file.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_drop_file.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/drop_file.html" title="Drop files onto the graph" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/drop_file.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

For the same drop interaction inside a full editing workspace, see {doc}`graph_detail_tool`.

## Incremental updates

```{image} /_static/media/visnetwork/incremental_graph_demo_feature.webp
:alt: a knowledge graph built one step at a time
:class: docs-media
```

Instead of reassigning `nodes` and `edges`, a graph can be grown with action playbooks. Each entry bundles a list of flat actions plus a status line, and `vis.execute_step(step)` forwards them straight to the frontend. The Wunderbaum [incremental tree demo](wunderbaum.md#incremental-updates) uses the same notation.

```{literalinclude} ../../examples/panels/visnetwork/incremental_graph_demo.py
:language: python
:start-at: SEQUENCE = [
:end-at: },
```

```{literalinclude} ../../examples/panels/visnetwork/incremental_graph_demo.py
:language: python
:start-at: def execute_step():
:end-at: step_index["value"] += 1
:dedent: 4
```

The playbook covers the whole incremental API: `addNode` and `addEdge` grow the graph, `updateNode` refines labels, `updateNodeState` recolours stored nodes, `mergeNodes` collapses duplicate entities while rewiring their edges, and `pause` and `complete` mark the boundaries. Nodes carrying `json_data` gain a YAML tooltip on hover.

[Source](https://github.com/opensemanticworld/panelini/blob/main/examples/panels/visnetwork/incremental_graph_demo.py) - [Test](https://github.com/opensemanticworld/panelini/blob/main/tests/panels/visnetwork/examples/test_incremental_graph_demo.py)

```{raw} html
<iframe class="pf-live" src="../_static/portfolio/apps/visnetwork/incremental_graph_demo.html" title="Incremental knowledge graph" loading="lazy"></iframe>
<p><a href="../_static/portfolio/apps/visnetwork/incremental_graph_demo.html" target="_blank" rel="noopener">Open fullscreen</a></p>
```

## Event callbacks

Beyond the specialised callbacks above, `network_event_callback` receives every vis-network event:

```python
def on_event(event_type: str, event_data: dict):
    if event_type == "click":
        print(f"Clicked nodes: {event_data.get('nodes', [])}")
    elif event_type == "dragEnd":
        print("Node dragged to a new position")

vis = VisNetwork(nodes=nodes, edges=edges, network_event_callback=on_event)
```

## Edit modes

```python
vis.disable_edit_mode()    # view only
vis.add_node_mode()        # click to add nodes
vis.add_edge_mode()        # click two nodes to connect them
```

`node_created_callback` and `edge_created_callback` fire with the new element whenever one is drawn this way, so a freshly placed node can be given an id, a label, or a payload before anything else sees it.

## Manipulation API

Every interactive feature above ultimately calls the same imperative methods, which you can use directly:

```python
vis.add_node({"id": 4, "label": "New Node"})
vis.update_node({"id": 1, "color": "#9C27B0", "label": "Updated"})
vis.update_nodes([{"id": 1, "color": "#FF0000"}, {"id": 2, "color": "#00FF00"}])
vis.update_node_state([1, 2], "modified")
vis.remove_node(4)

vis.add_edge({"from": 1, "to": 3, "label": "connects"})
vis.update_edge({"from": 1, "to": 2, "color": {"color": "#FF0000"}})
vis.remove_edge(1, 3)

# Redirect every edge of one node onto another, then drop it
vis.merge_nodes(source_id=2, target_id=1, merge_properties=True)

# Apply several actions in one round trip
vis.batch_update([
    {"action": "addNode", "payload": {"id": 5, "label": "Five"}},
    {"action": "addEdge", "payload": {"from": 5, "to": 1}},
])

vis.set_nodes(new_nodes)
vis.set_edges(new_edges)
vis.clear()
```

## Options

Appearance and behaviour are customised through `options`, passed straight to vis-network:

```python
vis = VisNetwork(
    nodes=nodes,
    edges=edges,
    options={
        "physics": {"enabled": True, "solver": "forceAtlas2Based"},
        "interaction": {"hover": True, "multiselect": True},
        "edges": {"smooth": {"type": "cubicBezier"}},
    },
)
```

See the [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) for the full set.

## API reference

- {py:class}`panelini.panels.visnetwork.visnetwork.VisNetwork` - the panel itself
- {py:class}`panelini.panels.visnetwork.graph_detail_tool.GraphDetailTool` - the composed editing workspace
