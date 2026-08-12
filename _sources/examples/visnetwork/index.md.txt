# VisNetwork

Interactive network graphs with context menus and drag interactions.

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} VisNetwork graph
:link: visnetwork
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_panelini_min_feature.png
Interactive network graph with `vis-network` + Vue.
:::

:::{grid-item-card} Context menus
:link: visnetwork_context_menu
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_context_menu_feature.webp
Right-click nodes and edges to run per-element actions from Python.
:::

:::{grid-item-card} Ctrl+drag duplicate
:link: visnetwork_ctrl_drag_duplicate
:link-type: doc
:img-top: /_static/media/visnetwork/ctrl_drag_duplicate_feature.webp
Hold Ctrl and drag to clone nodes, with a post-processing callback.
:::

::::

## More examples

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} VisNetwork - standalone
:link: visnetwork_panel_min
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_panel_min_feature.png
The same graph without the Panelini shell.
:::

:::{grid-item-card} JSON data tooltips
:link: visnetwork_json_data_min
:link-type: doc
:img-top: /_static/media/visnetwork/visnetwork_json_data_feature.webp
Attach `json_data` to a node and show it as a YAML tooltip on hover.
:::

:::{grid-item-card} Device hierarchy
:link: device_hierarchy
:link-type: doc
:img-top: /_static/media/visnetwork/device_hierarchy_feature.png
A device ontology in a top-down hierarchical layout with typed edges.
:::

:::{grid-item-card} Family hierarchy
:link: hierarchy
:link-type: doc
:img-top: /_static/media/visnetwork/hierarchy_feature.png
A family tree with fixed node positions and labeled relations.
:::

:::{grid-item-card} Team and project groups
:link: group_filtering
:link-type: doc
:img-top: /_static/media/visnetwork/group_filtering_feature.png
People and projects colored by team group with a physics layout.
:::

:::{grid-item-card} Image nodes
:link: images
:link-type: doc
:img-top: /_static/media/visnetwork/images_feature.png
Render nodes as remote images.
:::

:::{grid-item-card} Rotating circles
:link: rotating_circles
:link-type: doc
:img-top: /_static/media/visnetwork/rotating_circles_feature.png
A ring of fixed nodes plus free nodes (the rotation runs when you run it locally).
:::

:::{grid-item-card} File drop
:link: drop_file
:link-type: doc
:img-top: /_static/media/visnetwork/drop_file_feature.png
Drop image or CSV files onto the canvas to spawn nodes.
:::

:::{grid-item-card} GraphDetailTool with file drop
:link: graph_detail_tool_2
:link-type: doc
:img-top: /_static/media/visnetwork/graph_detail_tool_2_feature.png
The GraphDetailTool workspace seeded with file-drop nodes.
:::

:::{grid-item-card} Incremental graph updates
:link: incremental_graph_demo
:link-type: doc
:img-top: /_static/media/visnetwork/incremental_graph_demo_feature.webp
Build a knowledge graph step by step with an action playbook.
:::

::::

```{toctree}
:hidden:

visnetwork
visnetwork_context_menu
visnetwork_ctrl_drag_duplicate
visnetwork_panel_min
visnetwork_json_data_min
device_hierarchy
hierarchy
group_filtering
images
rotating_circles
drop_file
graph_detail_tool_2
incremental_graph_demo
```
