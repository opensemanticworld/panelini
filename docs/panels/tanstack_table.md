# TanstackTable

The `TanstackTable` panel is an accessible tree and treegrid widget built on [TanStack Table](https://tanstack.com/table), wrapped in a Vue.js bridge. It renders a plain list of dicts as a tree, or as a tree plus columns, with a toolbar, drag and drop, inline editing, undo and a full [ARIA](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA) treegrid.

```{image} /_static/media/tanstack/tst_vfsexplorer_extfiledrop_overview.webp
:alt: TanstackTable VFS explorer with two panes, drag and drop, and external file drop
:class: docs-media
```

## The one idea: data flows one way

Python owns `source`. The browser never writes it.

1. The user does something. The browser emits an **intent** (`move`, `add`, `rename`, `edit`, `delete`, `cut`, `copy`, `paste`, `transfer`, `drop_files`, `undo`, `redo`, `lazy_load`) through `_event_data`.
2. Python validates it, asks your callbacks, and rewrites `source`.
3. The new tree is pushed back down.

So every rule about how the tree reshapes lives in Python, is testable without a browser, and cannot be bypassed by a hand-built event.

## Basic usage

Nodes are plain dicts. `key` and `title` are the only required fields; `children` nests them.

```python
from panelini.panels.tanstack.table import TanstackTable

source = [
    {
        "key": "docs",
        "title": "Documents",
        "children": [
            {"key": "report", "title": "report.pdf", "allow_children": False},
            {"key": "notes", "title": "notes.md", "allow_children": False},
        ],
    },
    {"key": "config", "title": "config.yaml", "allow_children": False},
]

table = TanstackTable(source=source, options={"expand_all": True})
```

Add `columns` to switch from tree-only mode to treegrid mode.

### Node fields

| Field | Meaning |
| --- | --- |
| `key` | Unique id. Everything else refers to a node by it. |
| `title` | The label in the tree column. |
| `children` | Child nodes. |
| `icon` | Names an entry of `icons`. An expanded node prefers `<name>-open`. |
| `allow_children` | `False` makes the node a leaf nothing can be dropped into. |
| `class` | A CSS class for the row. |
| `type` | Names an entry of `types`, whose fields the node inherits. |
| `lazy` | `True` for a branch whose children are not loaded yet. |
| anything else | Column data, read by the column's `field` (or its `id`). |

## Parameters

Direction is **P>B** (Python to browser), **B>P** (browser to Python), **both**, or **Python only** for a value the browser never reads.

| Parameter | Type | Direction | What it is |
| --- | --- | --- | --- |
| `source` | list | Python only | The tree. Python's to write; never sent as-is (a derived view crosses instead). |
| `columns` | list | P>B | Column definitions. Empty means tree-only mode. |
| `options` | dict | P>B | Display and behaviour options, see below. |
| `icons` | dict | P>B | Extra `{name: inline SVG}` merged over the bundled set. |
| `types` | dict | P>B | `{type name: {field: value}}` node defaults. |
| `filter_text` | str | both | Search text. Hides rows that neither match nor lead to a match. |
| `editing_key` | str | both | Row the inline editor is open on, `""` for none. |
| `editing_column` | str | both | Column it is open on, `""` for the tree column (a rename). |
| `sorting` | list | both | `[{"id", "desc"}]`, one entry at most. View only. |
| `column_widths` | dict | both | `{column_id: pixels}` a resize has set. |
| `expanded_keys` | list | both | Keys of the expanded nodes. |
| `selected_keys` | list | both | Keys of the selected nodes. |
| `undo_depth` | int | Python only | How many tree states to keep, default 20, `0` for no history. |
| `can_undo` / `can_redo` | bool | P>B | Whether a step is available. Drives the toolbar buttons. |
| `clipboard` | dict | P>B | `{keys, mode}` with mode in `cut` / `copy`, empty for nothing. |

Sorting, resizing and filtering are **view state**: they never touch `source`, so nothing about them is recorded for undo.

## Columns

A column def is a dict.

| Key | Default | What it does |
| --- | --- | --- |
| `id` | required | Column id. Also the node field, unless `field` says otherwise. |
| `header` | `id` | Header label. |
| `field` | `id` | Node field this column reads and writes. |
| `width` | `150` | Starting width in pixels. |
| `min_width` / `max_width` | `20` / none | Bounds a resize drag may not cross. |
| `sortable` | `True` | `False` leaves this one column out of the sort. |
| `resizable` | `True` | `False` fixes this one column's width. |
| `editable` | `False` | `True` opens an inline editor on the cells. |
| `editor` | `"text"` | `text`, `number`, `checkbox` or `select`. |
| `choices` | - | What a `select` column offers. |
| `step`, `min`, `max` | - | For a `number` column. The range is checked in Python too. |

The **first** column is the **tree column**, whatever it declares: it carries the indent, the twisty, the icon and the title, and it is renamed rather than edited.

## Options

| Key | Default | What it does |
| --- | --- | --- |
| `aria_label` | `"Tree table"` | Names the treegrid for assistive technology. |
| `indent_px` | `16` | Indent per tree level, in pixels. |
| `expand_all` | `False` | Keep every branch open, including branches that arrive later. |
| `enable_dnd` | `False` | Turn drag and drop on. |
| `select_mode` | `"none"` | `none`, `single`, `multi` or `hierarchy`. |
| `show_checkboxes` | `True` | `False` hides the checkbox column without giving up selection. |
| `toggle_on_click` | `False` | A click on the only selected row clears the selection. |
| `toolbar` | absent | Ordered list of action ids, or `True` for the default set. Absent means no toolbar. |
| `menu` | absent | The same ids, as a right-click context menu. `True` gives its own shorter default set. |
| `toolbar_label`, `menu_label`, `search_label` | `"Tree actions"`, `"Row actions"`, `"Search"` | Accessible names for those three. |
| `sortable` | `True` | `False` takes the sort off the whole table. |
| `sort_folders_first` | `False` | Branches above leaves at every level, whichever way a column is sorted. |
| `resizable` | `True` | `False` takes the resize handles off the headers. |
| `prune` | off | `"collapsed"` sends only the branches the browser has opened. |
| `transfer_group` | - | Two tables naming the same group accept each other's dragged rows. |
| `new_key_prefix` | `"node"` | Prefix for keys minted for new nodes. |
| `file_icons` | - | Extra `{extension: icon name}` used when a file is added or renamed. |
| `extension_warning` | `True` | `False` drops the confirmation a rename that changes a file type asks for. |
| `drop_files` | `"none"` | `"meta"` or `"content"` to take files dragged in from the desktop. |
| `drop_accept` | `[]` (anything) | Extensions and MIME patterns: `".png"`, `"image/*"`, `"application/pdf"`. |
| `drop_max_bytes` | `5_000_000` | Cap on one dropped file. |
| `drop_node` | - | Template a dropped file's node is minted from. |

`drop_accept` and `drop_max_bytes` are decided in Python. The browser reads them only to skip loading the bytes of a file that was going to be refused.

### Toolbar and menu actions

`toolbar` and `menu` take these ids, plus `"|"` for a separator:

| Action id | Shortcut | What it does |
| --- | --- | --- |
| `new-folder` / `new-file` | `Insert` / `Shift+Insert` | Mint a node beside the active row, or inside it. |
| `rename` | `F2` | Open the editor on the tree cell. |
| `delete` | `Delete` | Remove the selection. |
| `cut` / `copy` / `paste` | `Ctrl+X` / `Ctrl+C` / `Ctrl+V` | The clipboard, which Python holds. |
| `undo` / `redo` | `Ctrl+Z` / `Ctrl+Shift+Z` | Step the history. |
| `move-up` / `move-down` | `Alt+Up` / `Alt+Down` | Swap with the sibling above or below. |
| `outdent` / `indent` | `Alt+Left` / `Alt+Right` | Change the row's depth by one. |
| `select-all` / `clear-selection` | `Ctrl+A` / `Escape` | The selection. |
| `expand-all` / `collapse-all` | none | Every branch at once. |
| `search` | `Ctrl+F` | The search box. Toolbar only; a menu drops it. |

The two lists together are what the table may do, so an **action left out of both cannot be reached by its shortcut either**. An entry may also be a dict `{id, label, icon, node}` that relabels an action and sets the template its new node is minted from. That is what makes `new-folder` mint a folder and `new-file` a file, and it lets one id appear twice under two labels.

## Editing

Set `editable: True` on a column and pick an `editor`.

| `editor` | Control | Commits |
| --- | --- | --- |
| `text` | text box | `Enter`, `Tab`, or clicking away |
| `number` | number input with `step` / `min` / `max` | same, after Python checks the range |
| `checkbox` | checkbox | the moment you tick it |
| `select` | dropdown of `choices` | the moment you choose |

- Double click a cell to edit it. On a focused row, `Enter` opens the first editable cell (and activates the row instead when the table has none), while `F2` is the tree column's rename. `Tab` and `Shift+Tab` walk the row's editable cells; `Escape` leaves without writing.
- A value the column cannot hold, or one `action_callback` refuses, **reopens the editor holding what was typed**, marked `aria-invalid`, so it is corrected rather than retyped.
- The value lands on the node itself, never on the `type` it names.
- The tree column is the exception: it is a `rename` intent, which carries the file-type warning and the icon rule.

## Callbacks and vetoes

All five are constructor arguments.

| Callback | Signature | Sees | Returning `False` |
| --- | --- | --- | --- |
| `move_callback` | `(key, anchor_key, position)` | every drag, `Alt+Arrow` reorder, and a paste of something cut. Called **once per node**. | cancels that node's move |
| `action_callback` | `(action, params)` | `add`, `rename`, `edit`, `delete`, `paste` (of a copy), `drop_files`, `transfer`. Called **once per action**. | leaves `source` untouched |
| `event_callback` | `(event_name, event_params)` | every event, after Python has applied it | nothing; this one only reports |
| `transfer_callback` | `(params)` | a cross-pane drag whose partner is not a `TanstackTable` | falls back to the ordinary path |
| `lazy_callback` | `(key, node)` | the first expand of a node marked `lazy` | not a veto: return the child list, or `None` to answer later with `set_children` |

- `position` is `before`, `after` or `child`.
- `undo` and `redo` are never asked: they replay states already allowed.
- A cross-pane `transfer` asks `action_callback` on the table the nodes **leave**, and `move_callback` on the table they **arrive in**.
- The thirteen intents come back carrying `applied`, so `event_callback` can tell what landed. Any other event is forwarded untouched, `activate` among them, which arrives with `key` alone.

```python
def allow_move(key, anchor_key, position):
    return not (position == "child" and anchor_key == "archive")


def allow_action(action, params):
    return action != "delete"


table = TanstackTable(
    source=source,
    move_callback=allow_move,
    action_callback=allow_action,
    event_callback=lambda name, params: print(name, params.get("applied")),
)
```

## Public API

Forty methods, grouped by what they touch. A method that reshapes the tree rewrites `source` and records an undo step, so an application's change is undoable exactly like a user's. Readers change nothing, selection, expansion, sort and width are view state, `set_children` fills a lazy branch, and `set_source` clears the history outright, so none of those are recorded.

| Group | Methods |
| --- | --- |
| Tree edits | `add_node`, `remove_node`, `move_node`, `move_nodes`, `update_node`, `rename_node`, `set_field`, `clear`, `get_source`, `set_source` |
| Selection | `get_selected`, `select_node`, `clear_selection` |
| Expansion | `get_expanded`, `expand_node`, `expand_all`, `collapse_all` |
| Clipboard | `get_clipboard`, `cut_nodes`, `copy_nodes`, `paste_nodes`, `transfer_nodes`, `clear_clipboard` |
| History | `undo`, `redo`, `clear_history`, `batch` |
| Sort and width | `get_sort`, `sort_by`, `clear_sort`, `get_column_widths`, `set_column_width`, `reset_column_width`, `clear_column_widths` |
| Types | `get_types`, `set_type`, `remove_type`, `resolve_node` |
| Lazy loading | `set_children` |
| Events | `handle_event` |

`batch()` is a context manager: everything inside it becomes **one push and one undo step**. A block of `set_children` calls is one push and no undo step, since a lazy branch arriving is not an edit.

```python
with table.batch():
    for path in paths:
        table.add_node({"key": path, "title": path}, parent_key="docs")
```

Pure tree helpers live beside the panel in `panelini.panels.tanstack.table.tree` and import neither Panel nor param: `iter_nodes`, `find_node`, `find_parent`, `is_descendant`, `subtree_keys`, `new_key` and the rest.

## Accessibility

This is why the panel exists.

- A real ARIA **`treegrid`**: `rowgroup`, `row`, `columnheader`, `gridcell`, plus `toolbar`, `menu` / `menuitem` and `alertdialog` for the rename confirmation.
- **20 `aria-*` attributes**, including `aria-level`, `aria-posinset`, `aria-setsize`, `aria-expanded`, `aria-selected`, `aria-rowindex`, `aria-colindex`, `aria-sort`, `aria-busy` (a lazy branch loading), `aria-invalid` (a refused edit) and `aria-keyshortcuts`.
- **Every structural action has a key**, listed in the action table above. Arrow keys, `Home` and `End` navigate, `Enter` and `Space` activate and select, and the context menu opens on `Shift+F10` or the menu key rather than only on a right click.
- A roving `tabindex`, so `Tab` stays the way out of the grid.
- `Ctrl` combinations are taken only while focus is inside the grid, so `Ctrl+F` does not steal the browser's own find on the rest of the page.

## Large trees

Two separate costs, two separate answers.

| Cost | Answer | Effect |
| --- | --- | --- |
| Render | a windowed rowgroup | only the visible rows plus a small overscan are in the DOM, however far you scroll |
| Wire | `options["prune"] = "collapsed"` | only opened branches cross; a pruned branch arrives as a twisty and is filled on expand |

Pruning takes a ten thousand node tree from about **950 kB on the wire to about 6 kB** when that tree is a hundred folders of a hundred files. The ratio follows the shape: the wider the fan-out, the more a collapsed view leaves behind, and the big tree example's thousand folders of ten measures about ten times rather than a hundred and fifty. It is off by default, because it also means a search reaches unloaded branches through Python rather than through the browser alone.

Two things to know before turning it on. A branch that has crossed **stays** with the browser when it is collapsed again, which is what makes re-opening it instant, so the wire cost of a session only ever grows. And the toolbar's `expand-all` opens the rows the browser holds, so it cannot open a branch that has not crossed: call {py:meth}`~panelini.panels.tanstack.table.table.TanstackTable.expand_all` from Python instead, which reads the tree Python owns and sends what the browser is missing.

Mark a branch `lazy: True` and answer `lazy_callback` to build a tree that never fully exists in memory at all. See {doc}`../examples/tanstack/tst_fsbrowser`.

## Examples

- {doc}`../examples/tanstack/tst_treegrid_columns` - five columns, sorting, resizing, node types, all four cell editors
- {doc}`../examples/tanstack/tst_vfsexplorer_extfiledrop` - two panes, cross-pane drag, toolbar, context menu, files from the desktop
- {doc}`../examples/tanstack/tst_bigtree` - one node to a million, with the wire cost of each read out live
- {doc}`../examples/tanstack/tst_fsbrowser` - a real filesystem loaded one directory at a time

## API Reference

See the full API documentation: {py:class}`panelini.panels.tanstack.table.table.TanstackTable`
