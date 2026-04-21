OOLD Graph Tool
## Motivation
* Interact with Data + Metadata ACROSS MULTIPLE ABSTRACTION LEVELS WITHOUT LOSING CONTEXT
  * without the strict necessity to switch between different tools (e.g. graph editor, schema editor, data editor)
    * Graph-Tool as most general visualization of relations (Graph > Hierarchical Tree, Table, Form, etc.)
  * with the possibility to easily include specialized, higly specific visualizaiton tools (detail view)
    * x/y plots for tabular data
    * image, video, audio preview for media data
    * JSON editor for semi-dense views ("Zoom-In-View", single object, many Properties)
    * Table editor for comparison (many objects, few Properties)
    * Data creation helpers (e.g. for device interfaces (remove annoying human data-handling))

* OO-LD as unified model for data and metadata (and thus also for the graph itself)
  * context-definition possible on schema/class level (no enforced re-definition for repeating datasets)
  * json for cross-framework compatibility
  * json schema for standardized syntax and validation

## Design Principles

* Left -> Right: Abstract -> Specific
  * left sidebar (Todo):
    * (idea) Multiple Graph Views (like slides in power-point?)
    * (idea) Query-Builder (to fetch data to memory)
  * center: (typically) Graph-View
  * right sidebar (Detail-View):

* left click: fast, often repeating actions
  * select (to view), drag, pan
  * shortcut-actions: increase productivity for power users
    * ctrl + drag: duplicate selected nodes
    * r+mouse move rubber mode: hide multiple nodes/edges (or rather right-click + hide?)

* right click: to do complex stuff
  * open context menu
    * for nodes:
      * explore (expand edges)
      * edit (values, relations)
      * hide
      * delete (from memory, from backend)
    * for edges:
      * delete

* copying in the graph-tool means a deep copy.
  * Object-like properties are copied as well
  * String-like references still point to the same object.

* storable, re-loadable, shareable state
  * Graph-state should be OO-LD object itself
## Wish List:

* Entity creation and modification
  * Relations between entities (first implementation working)
  * Updating/editing values ✔️
  * adding values (as suggestd by schema) ✔️, (double-check for complex values, e.g. arrays, nested objects)
  * Creating Entites (from Class-nodes ✔️)

* Class / Schema creation and modification
  *  Subclassing within the graph (right click, create subclass)
