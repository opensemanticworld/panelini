<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  createCoreRowModel,
  createExpandedRowModel,
  rowExpandingFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import {
  attachInstruction,
  extractInstruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item'
// Material Icon Theme (MIT), the VS Code file icon set. Imported one file at a
// time and inlined at build time, so the panel stays offline and only the icons
// listed below reach the bundle rather than the set's thousand-odd SVGs.
import audioIcon from 'material-icon-theme/icons/audio.svg?raw'
import consoleIcon from 'material-icon-theme/icons/console.svg?raw'
import cssIcon from 'material-icon-theme/icons/css.svg?raw'
import databaseIcon from 'material-icon-theme/icons/database.svg?raw'
import documentIcon from 'material-icon-theme/icons/document.svg?raw'
import fileIcon from 'material-icon-theme/icons/file.svg?raw'
import folderIcon from 'material-icon-theme/icons/folder.svg?raw'
import folderOpenIcon from 'material-icon-theme/icons/folder-open.svg?raw'
import htmlIcon from 'material-icon-theme/icons/html.svg?raw'
import imageIcon from 'material-icon-theme/icons/image.svg?raw'
import javascriptIcon from 'material-icon-theme/icons/javascript.svg?raw'
import jsonIcon from 'material-icon-theme/icons/json.svg?raw'
import markdownIcon from 'material-icon-theme/icons/markdown.svg?raw'
import pdfIcon from 'material-icon-theme/icons/pdf.svg?raw'
import powerpointIcon from 'material-icon-theme/icons/powerpoint.svg?raw'
import pythonIcon from 'material-icon-theme/icons/python.svg?raw'
import tableIcon from 'material-icon-theme/icons/table.svg?raw'
import typescriptIcon from 'material-icon-theme/icons/typescript.svg?raw'
import videoIcon from 'material-icon-theme/icons/video.svg?raw'
import wordIcon from 'material-icon-theme/icons/word.svg?raw'
import xmlIcon from 'material-icon-theme/icons/xml.svg?raw'
import yamlIcon from 'material-icon-theme/icons/yaml.svg?raw'
import zipIcon from 'material-icon-theme/icons/zip.svg?raw'
// Lucide (ISC), the toolbar icon set. Same treatment as the file icons above:
// named one file at a time so only these reach the bundle, and drawn with
// `stroke="currentColor"`, so a button's own colour carries into the glyph.
import arrowDownIcon from 'lucide-static/icons/arrow-down.svg?raw'
import arrowUpIcon from 'lucide-static/icons/arrow-up.svg?raw'
import chevronsDownIcon from 'lucide-static/icons/chevrons-down.svg?raw'
import chevronsUpIcon from 'lucide-static/icons/chevrons-up.svg?raw'
import filePlusIcon from 'lucide-static/icons/file-plus.svg?raw'
import folderPlusIcon from 'lucide-static/icons/folder-plus.svg?raw'
import indentDecreaseIcon from 'lucide-static/icons/indent-decrease.svg?raw'
import indentIncreaseIcon from 'lucide-static/icons/indent-increase.svg?raw'
import searchIcon from 'lucide-static/icons/search.svg?raw'
import squareIcon from 'lucide-static/icons/square.svg?raw'
import squareCheckIcon from 'lucide-static/icons/square-check.svg?raw'
import trashIcon from 'lucide-static/icons/trash-2.svg?raw'

const props = defineProps({
  // Python-owned state. The component reads it and never writes it back.
  state: { type: Object, required: true },
  // JS to Python channel. Emits intent only, never a mutated tree.
  emitEvent: { type: Function, required: true },
  // Two-way, set-semantics sync of the expanded key list.
  setExpandedKeys: { type: Function, required: true },
  // Two-way, set-semantics sync of the selected key list.
  setSelectedKeys: { type: Function, required: true },
  // Two-way sync of the view filter, written by the toolbar's search box.
  setFilterText: { type: Function, required: true },
})

// Built once, outside the table instance: the adapter injects
// `coreReactivityFeature` itself, so only the opt-in features are listed here.
const features = tableFeatures({
  rowExpandingFeature,
  rowSelectionFeature,
  coreRowModel: createCoreRowModel(),
  expandedRowModel: createExpandedRowModel(),
})

const TREE_COLUMN_ID = 'title'

const hasColumns = computed(() => (props.state.columns || []).length > 0)

// Python column defs are {id, header, field, width}. The first column is the
// tree column: it carries the indent and the expand twisty.
const columnDefs = computed(() => {
  const columns = props.state.columns || []
  if (columns.length === 0) {
    return [{ id: TREE_COLUMN_ID, header: '', accessorFn: (row) => row.title }]
  }
  return columns.map((column) => {
    const field = column.field ?? column.id
    return {
      id: column.id,
      header: column.header ?? column.id,
      accessorFn: (row) => row[field],
      meta: { width: column.width },
    }
  })
})

// Local mirror of TanStack's `expanded` state, kept as a record for the table
// and projected back to a sorted key list for Python.
const expanded = ref(keysToRecord(props.state.expandedKeys))

function keysToRecord(keys) {
  const record = {}
  for (const key of keys || []) record[key] = true
  return record
}

function recordToKeys(record) {
  // `true` is TanStack's "everything is expanded" sentinel, which is what
  // `toggleAllRowsExpanded` sets. Python is only ever given a key list, so the
  // sentinel is materialised here; reporting an empty list would otherwise say
  // the exact opposite of what is on screen.
  if (record === true) {
    return table
      .getCoreRowModel()
      .flatRows.filter((row) => row.subRows.length > 0)
      .map((row) => row.id)
      .sort()
  }
  return Object.keys(record)
    .filter((key) => record[key])
    .sort()
}

// A node opts into an icon by naming one. Nothing is inferred from the node's
// shape, so a tree without `icon` renders exactly as it did before.
// Named by what they show rather than by an extension, because one glyph serves
// many: `table` is every spreadsheet, `document` every plain text file. Mapping
// extensions onto these names is the app's job, so a tree of things that are not
// files can use the same set.
const BUNDLED_ICONS = {
  audio: audioIcon,
  console: consoleIcon,
  css: cssIcon,
  database: databaseIcon,
  document: documentIcon,
  file: fileIcon,
  folder: folderIcon,
  'folder-open': folderOpenIcon,
  html: htmlIcon,
  image: imageIcon,
  javascript: javascriptIcon,
  json: jsonIcon,
  markdown: markdownIcon,
  pdf: pdfIcon,
  powerpoint: powerpointIcon,
  python: pythonIcon,
  table: tableIcon,
  typescript: typescriptIcon,
  video: videoIcon,
  word: wordIcon,
  xml: xmlIcon,
  yaml: yamlIcon,
  zip: zipIcon,
}

// The `icons` param wins, so an app can restyle or replace the bundled set
// without the panel having to grow a second way of naming things. One registry
// serves the rows and the toolbar, so a "New note" button can carry the same
// markdown glyph the notes in the tree do.
function iconByName(name) {
  if (!name) return null
  return { ...BUNDLED_ICONS, ...(props.state.icons || {}) }[name] ?? null
}

// One convention, and only one: an expanded row prefers `<name>-open` when that
// entry exists. That lets a folder open without the panel having to know which
// names mean "folder".
function iconMarkup(row) {
  const name = row.original.icon
  if (!name) return null
  return (isExpanded(row) ? iconByName(`${name}-open`) : null) ?? iconByName(name)
}

function sameKeys(a, b) {
  if (a.length !== b.length) return false
  return a.every((key, index) => key === b[index])
}

// select_mode drives the selection behaviour, and nothing else:
//   none      rows cannot be selected at all
//   single    one row at a time
//   multi     independent rows
//   hierarchy independent rows, plus a checkbox that cascades
//
// Every mode but `none` answers to the file manager gestures: a plain click
// selects one row, Ctrl or Cmd click toggles one, and Shift click takes the range
// from the anchor. `single` gets the plain click only, since the rest would need a
// selection it cannot hold.
//
// Pointer selection never cascades, in any mode. Clicking a folder selects the
// folder and nothing under it, and selecting every file in a folder leaves the
// folder itself out, which is the whole point of being able to drag those files
// somewhere else.
//
// The checkbox is the one control that does cascade, and only in `hierarchy`:
// ticking a folder ticks its whole subtree. It also reads as a summary of that
// subtree, so a folder shows ticked once all of its children are without joining
// the selection itself. Hiding the column with `show_checkboxes` takes away that
// affordance, not the selection: clicking, Shift clicking and the space key go on
// working exactly as they were.
const selectMode = computed(() => props.state.options.select_mode ?? 'none')
const selectable = computed(() => selectMode.value !== 'none')
const cascades = computed(() => selectMode.value === 'hierarchy')
const showCheckboxes = computed(
  () => selectable.value && props.state.options.show_checkboxes !== false,
)

const rowSelection = ref(keysToRecord(props.state.selectedKeys))

const table = useTable({
  features,
  data: computed(() => props.state.source || []),
  columns: columnDefs,
  getRowId: (row) => row.key,
  getSubRows: (row) => row.children,
  // TanStack resets `expanded` whenever `data` changes. Python rewrites the
  // whole tree after every move, so leaving that on would collapse the tree on
  // each drop and push an empty `expanded_keys` back. Expansion is owned here.
  autoResetExpanded: false,
  enableRowSelection: selectable,
  enableMultiRowSelection: computed(() => selectMode.value !== 'single'),
  enableSubRowSelection: cascades,
  state: computed(() => ({ expanded: expanded.value, rowSelection: rowSelection.value })),
  onExpandedChange: (updater) => {
    expanded.value = typeof updater === 'function' ? updater(expanded.value) : updater
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
})

// Tri-state, derived rather than stored. TanStack cascades a parent's tick down
// to its children but never rolls the children's state back up, so ticking the
// last unticked sibling would leave the parent empty above a fully ticked
// subtree. Writing the parent into the selection to fix that is what made
// selecting every file in a folder also select the folder, and a drag of those
// files collapse into a drag of the folder. Summarising the subtree at render
// time instead keeps `selected_keys` exactly the set the user picked.
function checkState(row) {
  if (row.getIsSelected()) return 'all'
  if (!cascades.value || row.subRows.length === 0) return 'none'
  const states = row.subRows.map(checkState)
  if (states.every((state) => state === 'all')) return 'all'
  return states.some((state) => state !== 'none') ? 'some' : 'none'
}

// JS to Python, for the same reason the expanded projection below is watched.
watch(() => recordToKeys(rowSelection.value), props.setSelectedKeys, { flush: 'post' })

// JS to Python. The projection is watched rather than pushed from
// `onExpandedChange`, because under the `true` sentinel the set of keys it stands
// for changes whenever the tree does and TanStack reports no state change for
// that: after a move, a node that just gained children is expanded on screen, and
// pushing only on state change would leave Python claiming otherwise.
watch(() => recordToKeys(expanded.value), props.setExpandedKeys, { flush: 'post' })

// Python to JS. Applied only when the incoming set actually differs, so an echo
// of a JS-originated change terminates instead of looping.
watch(
  () => props.state.expandedKeys,
  (keys) => {
    if (sameKeys(recordToKeys(expanded.value), [...(keys || [])].sort())) return
    expanded.value = keysToRecord(keys)
  },
)

watch(
  () => props.state.selectedKeys,
  (keys) => {
    if (sameKeys(recordToKeys(rowSelection.value), [...(keys || [])].sort())) return
    rowSelection.value = keysToRecord(keys)
  },
)

// `options.expand_all` is a display option, not tree data, so it is applied here
// rather than by Python enumerating every expandable key.
watch(
  () => [props.state.options.expand_all, props.state.source],
  ([expandAll]) => {
    if (expandAll) table.toggleAllRowsExpanded(true)
  },
  { immediate: true },
)

// Search is a view concern, so it never touches `source`: the row model still
// holds the whole tree and this only decides what is rendered. That is what keeps
// a drop valid while a filter is active, and what lets Python go on owning the
// tree without knowing that a search box exists.
const filterText = computed(() => (props.state.filterText ?? '').trim().toLowerCase())
const filtering = computed(() => filterText.value.length > 0)

// What the toolbar's search box shows. The param stays the single source of truth,
// so a filter set from Python still lands in the box, and the box is only a
// mirror because binding it straight to the param would make every keystroke wait
// on a round trip before it appeared.
const searchText = ref(props.state.filterText ?? '')

watch(
  () => props.state.filterText,
  (value) => {
    searchText.value = value ?? ''
  },
)

function onSearchInput(value) {
  searchText.value = value
  props.setFilterText(value)
}

// Any rendered column value counts, which is what makes this a global filter
// rather than a title search. In tree-only mode the one column is the title.
function rowMatches(row) {
  return row
    .getAllCells()
    .some((cell) => String(cell.getValue() ?? '').toLowerCase().includes(filterText.value))
}

// Matches plus their ancestors, so a hit keeps the path that leads to it. The
// filtered view deliberately ignores the expanded state: leaving a match hidden
// inside a collapsed branch would make the search look broken.
const rows = computed(() => {
  if (!filtering.value) return table.getRowModel().rows
  const keep = new Set()
  for (const row of table.getCoreRowModel().flatRows) {
    if (!rowMatches(row)) continue
    keep.add(row.id)
    for (let cursor = row.getParentRow(); cursor; cursor = cursor.getParentRow()) keep.add(cursor.id)
  }
  return table.getCoreRowModel().flatRows.filter((row) => keep.has(row.id))
})

const headers = computed(() => table.getHeaderGroups()[0]?.headers ?? [])
const indentPx = computed(() => props.state.options.indent_px ?? 16)
const ariaLabel = computed(() => props.state.options.aria_label ?? 'Tree table')
const emptyMessage = computed(() => (filtering.value ? 'No matches' : 'No data'))

// The header occupies aria row 1 when columns are shown, so body rows start at 2.
const rowIndexOffset = computed(() => (hasColumns.value ? 2 : 1))
const ariaRowCount = computed(() => rows.value.length + (hasColumns.value ? 1 : 0))

// Siblings as rendered, not as stored. A filter drops unmatched siblings from the
// screen, and aria-posinset and aria-setsize describing a tree the user cannot see
// is exactly the kind of mismatch this panel exists to avoid.
const siblingGroups = computed(() => {
  const groups = new Map()
  for (const row of rows.value) {
    const parent = row.parentId ?? ''
    const group = groups.get(parent) ?? []
    group.push(row.id)
    groups.set(parent, group)
  }
  return groups
})

function siblingsOf(row) {
  return siblingGroups.value.get(row.parentId ?? '') ?? []
}

function posInSet(row) {
  return siblingsOf(row).indexOf(row.id) + 1
}

function setSize(row) {
  return siblingsOf(row).length
}

// While filtering the kept subset is shown in full, so a branch is expandable
// exactly when it still has a visible child, and it is always open.
function canExpand(row) {
  if (!filtering.value) return row.getCanExpand()
  return (siblingGroups.value.get(row.id) ?? []).length > 0
}

function isExpanded(row) {
  return filtering.value ? canExpand(row) : row.getIsExpanded()
}

function cellStyle(columnDef) {
  const width = columnDef.meta?.width
  return width ? { flex: `0 0 ${width}px` } : { flex: '1 1 0' }
}

function treeCellStyle(row, columnDef) {
  return { ...cellStyle(columnDef), paddingInlineStart: `${row.depth * indentPx.value}px` }
}

// Roving tabindex: exactly one row is tabbable, and it is the one that has, or
// would next receive, focus. Falls back to the first row when the active key is
// gone (collapsed away, or removed by a Python source push).
const activeKey = ref(null)

// Whether the active row is painted. It always is, except straight after a
// `toggle_on_click` deselect: that gesture has to leave the row looking exactly
// like an unselected one, or clicking a selection away would swap one tint for
// another rather than clear it. The row stays active underneath, so the keyboard
// and the toolbar carry on from where they were, and the next thing to touch it
// paints it again.
const activeShown = ref(true)
const rowElements = new Map()

function setActive(key) {
  activeKey.value = key
  activeShown.value = true
}

function setRowElement(key, element) {
  if (element) rowElements.set(key, element)
  else rowElements.delete(key)
}

const focusKey = computed(() => {
  const list = rows.value
  if (list.length === 0) return null
  return list.some((row) => row.id === activeKey.value) ? activeKey.value : list[0].id
})

function focusRowByKey(key) {
  if (key == null) return
  setActive(key)
  nextTick(() => rowElements.get(key)?.focus())
}

function focusRowByIndex(index) {
  const list = rows.value
  if (list.length === 0) return
  focusRowByKey(list[Math.max(0, Math.min(index, list.length - 1))].id)
}

// Shift plus arrow is the keyboard half of Shift click. Without it the grid would
// have a selection gesture that only a mouse can reach.
function moveFocus(index, event) {
  const list = rows.value
  if (list.length === 0) return
  const next = list[Math.max(0, Math.min(index, list.length - 1))]
  const extends_ = event?.shiftKey && selectable.value && selectMode.value !== 'single'
  if (extends_ && rangeAnchorKey.value === null) rangeAnchorKey.value = focusKey.value
  focusRowByKey(next.id)
  if (extends_) selectRange(next, false)
}

function onKeydown(event) {
  const list = rows.value
  if (list.length === 0) return
  const index = Math.max(
    0,
    list.findIndex((row) => row.id === focusKey.value),
  )
  const row = list[index]

  // Toolbar shortcuts run ahead of the navigation keys, and only for the actions
  // the table declared, so a panel without a toolbar answers to nothing new.
  // Ctrl combinations are taken only while focus is inside the grid, which is
  // what keeps Ctrl+F from stealing the browser's own find on the rest of a page.
  if (event.ctrlKey || event.metaKey) {
    const id = { a: 'select-all', f: SEARCH_ID }[event.key.toLowerCase()]
    if (id && allows(id)) {
      event.preventDefault()
      runById(id)
      return
    }
  }
  // Alt rather than the text-editor convention of Tab and Shift+Tab, which have to
  // stay the way out of the grid's roving tabindex.
  if (event.altKey) {
    const id = {
      ArrowUp: 'move-up',
      ArrowDown: 'move-down',
      ArrowLeft: 'outdent',
      ArrowRight: 'indent',
    }[event.key]
    if (id && allows(id)) {
      event.preventDefault()
      runById(id)
      return
    }
  }
  // Insert creates, Shift+Insert creates the other kind, and a table that declared
  // only one of them answers to only that one key.
  if (event.key === 'Insert' || event.key === 'Delete' || event.key === 'Escape') {
    const id =
      event.key === 'Insert'
        ? event.shiftKey
          ? 'new-file'
          : 'new-folder'
        : event.key === 'Delete'
          ? 'delete'
          : 'clear-selection'
    if (allows(id)) {
      event.preventDefault()
      runById(id)
      return
    }
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveFocus(index + 1, event)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveFocus(index - 1, event)
      break
    case 'ArrowRight':
      // Expand a closed branch, otherwise step into it. Leaves do nothing.
      event.preventDefault()
      if (!canExpand(row)) break
      if (isExpanded(row)) focusRowByIndex(index + 1)
      else {
        row.toggleExpanded(true)
        focusRowByKey(row.id)
      }
      break
    case 'ArrowLeft':
      // Collapse an open branch, otherwise step out to the parent. A filtered
      // view is always open, so there it is only ever the step out.
      event.preventDefault()
      if (!filtering.value && row.getCanExpand() && row.getIsExpanded()) {
        row.toggleExpanded(false)
        focusRowByKey(row.id)
      } else if (row.parentId) {
        focusRowByKey(row.parentId)
      }
      break
    case 'Home':
      event.preventDefault()
      focusRowByIndex(0)
      break
    case 'End':
      event.preventDefault()
      focusRowByIndex(list.length - 1)
      break
    case 'Enter':
      event.preventDefault()
      props.emitEvent('activate', { key: row.id })
      break
    case ' ':
      // Space is the checkbox's key, so it cascades wherever the checkbox would.
      // That holds with the column hidden too: the box is not drawn, it is still
      // the control being operated.
      if (!selectable.value) break
      event.preventDefault()
      toggleCheck(row)
      break
    default:
      break
  }
}

// Explorer-style pointer selection. The anchor is the last row picked without
// Shift, which is what a range is measured from, exactly as in a file manager.
const rangeAnchorKey = ref(null)

// `selectChildren: false` on every pointer gesture. It is the difference between
// picking a folder and picking everything in it, and only the checkbox is allowed
// to mean the second one.
function selectOnly(row) {
  rangeAnchorKey.value = row.id
  rowSelection.value = {}
  row.toggleSelected(true, { selectChildren: false })
}

function selectRange(row, additive) {
  const list = rows.value
  const from = list.findIndex((candidate) => candidate.id === rangeAnchorKey.value)
  const to = list.findIndex((candidate) => candidate.id === row.id)
  if (to === -1) return
  // Without an anchor there is no range to speak of, so the click behaves as a
  // plain one and becomes the anchor for the next Shift click.
  if (from === -1) {
    selectOnly(row)
    return
  }
  if (!additive) rowSelection.value = {}
  const [start, end] = from <= to ? [from, to] : [to, from]
  for (let index = start; index <= end; index += 1) {
    list[index].toggleSelected(true, { selectChildren: false })
  }
}

// Opt in, and deliberately narrow: only a plain click on a row that is the entire
// selection clears it. Toggling any selected row off would break the explorer rule
// that a plain click collapses a multi row selection down to the row clicked, and
// it would fight press-to-drag on a selected row.
const toggleOnClick = computed(() => props.state.options.toggle_on_click === true)

function isSoleSelection(row) {
  const keys = recordToKeys(rowSelection.value)
  return keys.length === 1 && keys[0] === row.id
}

// Emptying the selection leaves the grid looking untouched, whichever gesture did
// it: the toggle click, the clear button, Escape, a Ctrl click that takes the last
// row out, or a checkbox unticked. Painting the active row instead would swap one
// background for another rather than clear one.
function clearSelection() {
  rowSelection.value = {}
  rangeAnchorKey.value = null
  activeShown.value = false
}

// For the gestures that empty the selection as a side effect rather than on
// purpose, so they read as a clear when that is what they turned out to be.
function muteIfEmpty() {
  if (recordToKeys(rowSelection.value).length === 0) activeShown.value = false
}

// Muting is explicit, unmuting is not: anything that puts rows back in the
// selection paints the active row again, wherever it came from, so the mute stays
// a moment rather than becoming a state the grid can get stuck in.
watch(
  () => recordToKeys(rowSelection.value).length > 0,
  (filled) => {
    if (filled) activeShown.value = true
  },
)

function onRowClick(row, event) {
  setActive(row.id)
  const modified = Boolean(event?.shiftKey || event?.ctrlKey || event?.metaKey)

  if (selectable.value && !modified && toggleOnClick.value && isSoleSelection(row)) {
    clearSelection()
  } else if (selectable.value && selectMode.value !== 'single') {
    if (event?.shiftKey) selectRange(row, event.ctrlKey || event.metaKey)
    else if (event?.ctrlKey || event?.metaKey) {
      rangeAnchorKey.value = row.id
      toggleRow(row)
    } else selectOnly(row)
  } else if (selectable.value) {
    selectOnly(row)
  }

  props.emitEvent('activate', { key: row.id })
}

function onToggle(row) {
  setActive(row.id)
  // A filtered branch is shown open whatever its stored state is, so toggling it
  // would only change what the tree looks like once the search box is cleared.
  if (filtering.value) return
  row.toggleExpanded()
}

function isChecked(row) {
  return checkState(row) === 'all'
}

function isIndeterminate(row) {
  return checkState(row) === 'some'
}

// The pointer half of a Ctrl click: one row in or out, subtree untouched.
function toggleRow(row) {
  setActive(row.id)
  row.toggleSelected(undefined, { selectChildren: false })
  muteIfEmpty()
}

// The checkbox half. The next state comes from what the box shows rather than
// from `getIsSelected()`, so unticking a folder that reads as ticked only because
// its children are actually clears the children. `deselectParents` drops an
// ancestor that was ticked explicitly once part of its subtree goes.
function toggleCheck(row) {
  setActive(row.id)
  row.toggleSelected(!isChecked(row), {
    selectChildren: cascades.value,
    deselectParents: cascades.value,
  })
  muteIfEmpty()
}

function onCheckboxClick(row) {
  toggleCheck(row)
  focusRowByKey(row.id)
}

// The toolbar. It is opt in and off by default, so a table that says nothing about
// it renders exactly as it did before.
//
// `options.toolbar` is an ordered list of action ids, with `true` as shorthand for
// the default order and `|` for a separator. It is the one declaration of what a
// table may do, and it governs the keyboard shortcuts as well as the buttons: an
// action the table did not ask for cannot be reached by pressing a key either.
//
// `Tab` and `Shift+Tab` are never bound. The grid carries a roving tabindex and
// Tab has to stay the way out of it.
//
// `node` is the template a minted node starts from. A folder is simply a node that
// did not refuse children, so the two creation actions differ in that one flag and
// in nothing else, which keeps "folder" and "file" out of the panel's vocabulary.
const ACTIONS = {
  'new-folder': { icon: folderPlusIcon, label: 'New folder', keys: 'Insert', node: {} },
  'new-file': {
    icon: filePlusIcon,
    label: 'New file',
    keys: 'Shift+Insert',
    node: { allow_children: false },
  },
  delete: { icon: trashIcon, label: 'Delete', keys: 'Delete' },
  'move-up': { icon: arrowUpIcon, label: 'Move up', keys: 'Alt+ArrowUp' },
  'move-down': { icon: arrowDownIcon, label: 'Move down', keys: 'Alt+ArrowDown' },
  outdent: { icon: indentDecreaseIcon, label: 'Outdent', keys: 'Alt+ArrowLeft' },
  indent: { icon: indentIncreaseIcon, label: 'Indent', keys: 'Alt+ArrowRight' },
  'expand-all': { icon: chevronsDownIcon, label: 'Expand all' },
  'collapse-all': { icon: chevronsUpIcon, label: 'Collapse all' },
  'select-all': { icon: squareCheckIcon, label: 'Select all', keys: 'Control+A' },
  'clear-selection': { icon: squareIcon, label: 'Clear selection', keys: 'Escape' },
}

// `search` is an action id like the others, but it renders the filter box rather
// than a button, so it is deliberately not in ACTIONS.
const SEARCH_ID = 'search'
const SEPARATOR_ID = '|'
const DEFAULT_TOOLBAR = [
  'new-folder',
  'new-file',
  'delete',
  SEPARATOR_ID,
  'move-up',
  'move-down',
  'outdent',
  'indent',
  SEPARATOR_ID,
  'expand-all',
  'collapse-all',
  SEPARATOR_ID,
  'select-all',
  'clear-selection',
  SEARCH_ID,
]

// An entry is either an action id or an object overriding that action's label,
// icon and node template. The object form is what lets one table offer "New note"
// and "New task" from the same creation action, so the panel never has to learn a
// single application's node kinds. The label names what the button creates, so it
// is also the new node's default title.
//
// `uid` rather than the id is the identity here, because two entries may legally
// share an id. A shortcut then runs the first of them.
const toolbarItems = computed(() => {
  const value = props.state.options.toolbar
  const list = value === true ? DEFAULT_TOOLBAR : Array.isArray(value) ? value : []
  const items = []
  list.forEach((entry, index) => {
    const custom = typeof entry === 'string' ? {} : entry || {}
    const id = typeof entry === 'string' ? entry : custom.id
    const uid = `${id}#${index}`
    if (id === SEPARATOR_ID || id === SEARCH_ID) {
      items.push({ uid, id })
      return
    }
    const action = ACTIONS[id]
    if (!action) return
    const label = custom.label ?? action.label
    items.push({
      uid,
      id,
      label,
      icon: iconByName(custom.icon) ?? action.icon,
      keys: action.keys,
      node: { title: label, ...(action.node ?? {}), ...(custom.node ?? {}) },
    })
  })
  return items
})

const hasToolbar = computed(() => toolbarItems.value.length > 0)
const toolbarLabel = computed(() => props.state.options.toolbar_label ?? 'Tree actions')
const searchLabel = computed(() => props.state.options.search_label ?? 'Search')

// The single lookup behind both halves: a button is drawn and its shortcut fires
// only when the table declared the action.
function itemFor(id) {
  return toolbarItems.value.find((item) => item.id === id) ?? null
}

function allows(id) {
  return itemFor(id) !== null
}

function runById(id) {
  const item = itemFor(id)
  if (item) runAction(item)
}

// Every action works on the row the keyboard is on, which is also the row a click
// leaves marked, so the pointer and the keyboard aim at the same thing.
const activeRow = computed(() => rows.value.find((row) => row.id === focusKey.value) ?? null)

// Rows are laid out flat, so a sibling group is a filter rather than a walk. As
// rendered, not as stored: under a filter the previous sibling is the previous
// visible one, which is the same rule a drop already follows.
function renderedSiblings(row) {
  return rows.value.filter((candidate) => (candidate.parentId ?? '') === (row.parentId ?? ''))
}

// Structural actions reuse the drag rule, so one selection means the same thing to
// the mouse and to the keyboard. Reordering is a move among siblings though, so
// the batch is only taken whole when it is a set of siblings: a selection spanning
// two folders has no shared row to reorder within, and quietly reparenting half of
// it would be a worse answer than moving the one row the keyboard is on.
function actionBatch() {
  const row = activeRow.value
  if (!row) return []
  const keys = dragKeysFor(row)
  const parent = row.parentId ?? ''
  const shared = keys.every((key) => (rowByKey(key)?.parentId ?? '') === parent)
  return shared ? keys : [row.id]
}

// The rows a delete applies to. The drag rule is wrong here: it drops ancestors of
// the grabbed row, which is right for a move (dragging a file out of a ticked
// folder must not carry the folder along) and wrong for a delete, where ticking
// the folder plainly means the folder goes too. Python prunes the redundant keys.
function selectionBatch() {
  const row = activeRow.value
  if (!row) return []
  if (!selectable.value || !row.getIsSelected()) return [row.id]
  const keys = rows.value.filter((candidate) => candidate.getIsSelected()).map((candidate) => candidate.id)
  return keys.length > 0 ? keys : [row.id]
}

// The nearest sibling outside the batch, in the given direction. Skipping the
// batch is what makes moving three of five files up step them over the one above
// rather than shuffle them among themselves.
function reorderAnchor(offset) {
  const row = activeRow.value
  if (!row) return null
  const batch = new Set(actionBatch())
  const siblings = renderedSiblings(row)
  const taken = siblings
    .map((candidate, index) => (batch.has(candidate.id) ? index : -1))
    .filter((index) => index >= 0)
  if (taken.length === 0) return null

  let index = (offset < 0 ? Math.min(...taken) : Math.max(...taken)) + offset
  while (index >= 0 && index < siblings.length && batch.has(siblings[index].id)) index += offset
  return siblings[index] ?? null
}

// Every structural action is applied by Python and comes back as a fresh `source`,
// and Vue moving or dropping the row element takes focus with it. Where focus
// belongs afterwards depends on what was asked for, so the request is recorded
// before the intent is emitted and honoured when the new tree arrives.
//
//   key    the row that was acted on, so a run of Alt+Arrow stays on it
//   index  whatever now sits where a deleted row was, which is the next row down
//   added  the one key the tree gained, found by diffing rather than guessed,
//          because minting keys is Python's job and the browser cannot know them
let refocus = null

watch(
  () => props.state.source,
  () => {
    const request = refocus
    refocus = null
    if (!request) return
    if (request.key !== undefined) {
      focusRowByKey(request.key)
      return
    }
    nextTick(() => {
      if (request.index !== undefined) focusRowByIndex(request.index)
      else focusAdded(request.added)
    })
  },
)

// Selecting the new node as well as focusing it is what makes typing a name next
// (P9d) land on the thing that was just created, and it matches an explorer.
function focusAdded(before) {
  const fresh = table.getCoreRowModel().flatRows.find((row) => !before.has(row.id))
  if (!fresh) return
  focusRowByKey(fresh.id)
  if (!selectable.value) return
  rowSelection.value = {}
  rangeAnchorKey.value = fresh.id
  fresh.toggleSelected(true, { selectChildren: false })
}

// The same `move` event a drop emits, with an explicit position in place of a
// hitbox instruction. Python applies both through `tree.apply_moves`, so a toolbar
// move is vetoed by the same `move_callback` a drag is.
function emitMove(anchor, position) {
  const row = activeRow.value
  if (!row || !anchor) return
  refocus = { key: row.id }
  props.emitEvent('move', {
    key: row.id,
    keys: actionBatch(),
    position,
    anchorKey: anchor.id,
  })
}

// Where a new node goes follows the explorer rule: inside the active row when it
// takes children, next to it when it does not, and at root level when nothing is
// active, which is how an empty tree is filled. Opening the new parent is a view
// decision and stays here, exactly as it does for indent.
function emitAdd(item) {
  const row = activeRow.value
  const position = row ? (row.original.allow_children === false ? 'after' : 'child') : null
  if (row && position === 'child' && !filtering.value) row.toggleExpanded(true)
  refocus = { added: new Set(table.getCoreRowModel().flatRows.map((candidate) => candidate.id)) }
  props.emitEvent('add', { anchorKey: row?.id ?? null, position, node: item.node })
}

function emitDelete() {
  const keys = selectionBatch()
  if (keys.length === 0) return
  refocus = { index: rows.value.findIndex((row) => row.id === activeRow.value?.id) }
  props.emitEvent('delete', { key: activeRow.value?.id ?? null, keys })
}

// Disabled means `aria-disabled` and a handler that does nothing, never the
// `disabled` attribute: a disabled button drops out of the toolbar's roving
// tabindex, which is exactly the state a keyboard user needs to be told about.
function actionEnabled(item) {
  switch (item.id) {
    case 'new-folder':
    case 'new-file':
      // Always available: with no active row the node lands at root level, which
      // is the only way to fill a tree that starts out empty.
      return true
    case 'delete':
      return selectionBatch().length > 0
    case 'move-up':
      return reorderAnchor(-1) !== null
    case 'move-down':
      return reorderAnchor(1) !== null
    case 'indent': {
      // Indenting means becoming a child of the row above, so a leaf that refuses
      // children blocks it exactly as it blocks a `make-child` drop.
      const anchor = reorderAnchor(-1)
      return anchor !== null && anchor.original.allow_children !== false
    }
    case 'outdent':
      return Boolean(activeRow.value?.parentId)
    case 'expand-all':
    case 'collapse-all':
      // A filtered view is shown open whatever the stored state is, so both of
      // these would change nothing the user can see until the box is cleared.
      return rows.value.length > 0 && !filtering.value
    case 'select-all':
      return rows.value.length > 0 && selectable.value && selectMode.value !== 'single'
    case 'clear-selection':
      return selectable.value && recordToKeys(rowSelection.value).length > 0
    default:
      return true
  }
}

function actionTitle(item) {
  if (!item.keys) return item.label
  return `${item.label} (${item.keys.replace('Control', 'Ctrl')})`
}

function runAction(item) {
  if (!actionEnabled(item)) return
  switch (item.id) {
    case 'new-folder':
    case 'new-file':
      emitAdd(item)
      break
    case 'delete':
      emitDelete()
      break
    case 'move-up':
      emitMove(reorderAnchor(-1), 'before')
      break
    case 'move-down':
      emitMove(reorderAnchor(1), 'after')
      break
    case 'indent': {
      const anchor = reorderAnchor(-1)
      // Opening the new parent is a view decision, so it is taken here rather
      // than asking Python to expand a branch on the browser's behalf.
      if (anchor && !filtering.value) anchor.toggleExpanded(true)
      emitMove(anchor, 'child')
      break
    }
    case 'outdent':
      emitMove(rowByKey(activeRow.value?.parentId), 'after')
      break
    case 'expand-all':
      table.toggleAllRowsExpanded(true)
      break
    case 'collapse-all':
      table.toggleAllRowsExpanded(false)
      break
    case 'select-all':
      rowSelection.value = Object.fromEntries(rows.value.map((row) => [row.id, true]))
      rangeAnchorKey.value = rows.value[0]?.id ?? null
      break
    case 'clear-selection':
      clearSelection()
      break
    case SEARCH_ID:
      searchInput.value?.focus()
      searchInput.value?.select()
      break
    default:
      break
  }
}

// The toolbar is its own tab stop with its own roving tabindex, so the panel has
// two: the toolbar, then the grid. The search box keeps the tab stop a text field
// needs, because arrow keys inside it have to move the caret rather than the
// toolbar's focus.
const searchInput = ref(null)
const toolbarButtons = computed(() => toolbarItems.value.filter((item) => item.id in ACTIONS))
const toolbarFocusId = ref(null)
const toolbarElements = new Map()

// Keyed by `uid`, not by id: two entries may share an action, and a Map keyed by
// the id would hand both buttons the same element.
const toolbarFocusKey = computed(() => {
  const list = toolbarButtons.value
  if (list.length === 0) return null
  return list.some((item) => item.uid === toolbarFocusId.value) ? toolbarFocusId.value : list[0].uid
})

function setToolbarElement(uid, element) {
  if (element) toolbarElements.set(uid, element)
  else toolbarElements.delete(uid)
}

function focusToolbar(index) {
  const list = toolbarButtons.value
  if (list.length === 0) return
  const uid = list[Math.max(0, Math.min(index, list.length - 1))].uid
  toolbarFocusId.value = uid
  nextTick(() => toolbarElements.get(uid)?.focus())
}

// Bound on the buttons rather than on the toolbar, so typing in the search box
// keeps Home, End and the arrow keys for the caret.
function onToolbarKeydown(event) {
  const list = toolbarButtons.value
  const index = Math.max(
    0,
    list.findIndex((item) => item.uid === toolbarFocusKey.value),
  )
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      focusToolbar(index + 1)
      break
    case 'ArrowLeft':
      event.preventDefault()
      focusToolbar(index - 1)
      break
    case 'Home':
      event.preventDefault()
      focusToolbar(0)
      break
    case 'End':
      event.preventDefault()
      focusToolbar(list.length - 1)
      break
    default:
      break
  }
}

// Drag and drop. A drop never mutates the tree here: it emits a `move` intent
// and Python rewrites `source`. Blocking every instruction type is how an
// invalid target (itself, or one of its own descendants) is expressed, because
// the hitbox turns a blocked type into `instruction-blocked` and that renders as
// a no-drop state instead of silently doing nothing.
//
// Both pdnd adapters resolve their element from `event.target` of listeners
// bound on `document`: the draggable adapter looks the target up in a WeakMap,
// the drop target adapter runs `target.closest('[data-drop-target-for-element]')`
// and then walks up `parentElement`. Panel renders every component into a Bokeh
// shadow root, and shadow retargeting rewrites that target to the shadow host,
// so a registration on a row is something pdnd can never see. Exactly one
// draggable and one drop target are therefore registered, on the host, and the
// row under the pointer is resolved from the pointer position instead.
const DND_TYPE = 'pnl-tst-row'
const AUTO_EXPAND_MS = 500
const ALL_INSTRUCTIONS = ['reorder-above', 'reorder-below', 'make-child', 'reparent']

const dndEnabled = computed(() => props.state.options.enable_dnd === true)
const draggingKeys = ref([])
// The one row currently under the pointer, plus the instruction it resolved to.
const dropTarget = ref(null)

function rowByKey(key) {
  return rows.value.find((row) => row.id === key) ?? null
}

function isSelfOrDescendant(row, keys) {
  let cursor = row
  while (cursor) {
    if (keys.includes(cursor.id)) return true
    cursor = cursor.getParentRow()
  }
  return false
}

// Dragging a row that is part of the selection drags the whole selection, which
// is what a file manager does. Dragging an unselected row drags just that row and
// leaves the selection alone, rather than silently discarding it.
//
// Ancestors of the grabbed row are dropped from the batch. Ticking a folder's
// checkbox selects the folder and everything under it, and without this, dragging
// one of those files would collapse into "move the folder" instead of "move the
// files out of it". Dragging a child never moves its parent, whichever way the
// parent came to be selected.
function dragKeysFor(row) {
  if (!selectable.value || !row.getIsSelected()) return [row.id]
  const ancestors = new Set()
  for (let cursor = row.getParentRow(); cursor; cursor = cursor.getParentRow()) ancestors.add(cursor.id)
  const selected = rows.value
    .filter((candidate) => candidate.getIsSelected() && !ancestors.has(candidate.id))
    .map((candidate) => candidate.id)
  return selected.length > 1 ? selected : [row.id]
}

// A node may declare that it can never gain children, which is how a file is told
// apart from an empty folder. Blocking only `make-child` keeps reordering next to
// such a node available, and Python enforces the same rule on the drop it is sent,
// so the browser is showing the outcome rather than deciding it.
function blockedInstructions(row, sourceKeys) {
  if (isSelfOrDescendant(row, sourceKeys)) return ALL_INSTRUCTIONS
  return row.original.allow_children === false ? ['make-child'] : []
}

// The hitbox needs to know where a row sits so it can offer `make-child` on an
// open branch and `reparent` on the last row of a group.
function itemMode(row) {
  if (canExpand(row) && isExpanded(row)) return 'expanded'
  const siblings = siblingsOf(row)
  return siblings[siblings.length - 1] === row.id ? 'last-in-group' : 'standard'
}

let autoExpandKey = null
let autoExpandTimer = null

function cancelAutoExpand() {
  if (autoExpandTimer) clearTimeout(autoExpandTimer)
  autoExpandTimer = null
  autoExpandKey = null
}

// Hovering a collapsed branch opens it, so a node can be dropped deep into a
// tree in one gesture. The hitbox re-measures on the next pointer move.
function scheduleAutoExpand(key, instruction) {
  if (autoExpandKey === key) return
  cancelAutoExpand()
  if (!instruction || instruction.type === 'instruction-blocked') return
  const row = rowByKey(key)
  if (!row || !row.getCanExpand() || row.getIsExpanded()) return
  autoExpandKey = key
  autoExpandTimer = setTimeout(() => {
    autoExpandTimer = null
    const fresh = rowByKey(key)
    if (fresh && fresh.getCanExpand() && !fresh.getIsExpanded()) fresh.toggleExpanded(true)
  }, AUTO_EXPAND_MS)
}

function clearDropTarget() {
  dropTarget.value = null
  cancelAutoExpand()
}

const rootElement = ref(null)

// The element pdnd will actually be handed by the browser: the outermost shadow
// host, or the root itself when the component is mounted in the light DOM.
function dndHost() {
  let node = rootElement.value
  if (!node) return null
  let root = node.getRootNode()
  while (root.host) {
    node = root.host
    root = node.getRootNode()
  }
  return node
}

// The row under the pointer, found geometrically because pdnd only ever reports
// the host element. Rows are laid out in a single non-overlapping column, so a
// linear scan of the rendered rows is exact. `elementFromPoint` on the shadow
// root would also work, but it returns null whenever the topmost element at that
// point sits outside the shadow tree, which pdnd's post-drag honey pot does.
function rowAt(input) {
  for (const row of rows.value) {
    const element = rowElements.get(row.id)
    if (!element) continue
    const rect = element.getBoundingClientRect()
    if (
      input.clientX >= rect.left &&
      input.clientX < rect.right &&
      input.clientY >= rect.top &&
      input.clientY < rect.bottom
    ) {
      return { row, element, rect }
    }
  }
  return null
}

// The checkbox and the twisty are the two controls inside a row. `draggable` is
// registered on the host, so without this a press on either one starts a drag and
// the click that would have toggled it never lands, which is what made checkbox
// selection and drag and drop mutually exclusive.
function onRowControl(hit, input) {
  for (const control of hit.element.querySelectorAll('.pnl-tst-check, .pnl-tst-twisty')) {
    const rect = control.getBoundingClientRect()
    if (
      input.clientX >= rect.left &&
      input.clientX < rect.right &&
      input.clientY >= rect.top &&
      input.clientY < rect.bottom
    ) {
      return true
    }
  }
  return false
}

let dndCleanup = null

// Registered on mount and re-registered when `enable_dnd` flips, so a disabled
// table never carries `draggable="true"` on the host at all.
function registerDnd() {
  dndCleanup?.()
  dndCleanup = null

  const host = dndHost()
  if (!host || !dndEnabled.value) return

  dndCleanup = combine(
    draggable({
      element: host,
      // Anything outside a row (the header, the empty space below the last row)
      // is not a drag handle, and returning false cancels the native drag.
      canDrag: ({ input }) => {
        const hit = rowAt(input)
        return hit !== null && !onRowControl(hit, input)
      },
      getInitialData: ({ input }) => {
        const hit = rowAt(input)
        if (!hit) return { type: DND_TYPE, key: null, keys: [] }
        return { type: DND_TYPE, key: hit.row.id, keys: dragKeysFor(hit.row) }
      },
      onGenerateDragPreview: ({ location, nativeSetDragImage }) => {
        // The registered element is the host, so the default preview would be a
        // snapshot of the entire table. Point it at the row being dragged, offset
        // so the preview stays under the cursor where it was grabbed.
        const input = location.current.input
        const hit = rowAt(input)
        if (!hit || !nativeSetDragImage) return
        nativeSetDragImage(hit.element, input.clientX - hit.rect.left, input.clientY - hit.rect.top)
      },
      onDragStart: ({ source }) => {
        draggingKeys.value = source.data.keys ?? []
      },
      onDrop: () => {
        draggingKeys.value = []
        clearDropTarget()
      },
    }),
    dropTargetForElements({
      element: host,
      canDrop: ({ source }) => source.data.type === DND_TYPE,
      getData: ({ input, source }) => {
        const hit = rowAt(input)
        if (!hit) return { type: DND_TYPE, key: null }
        const data = { type: DND_TYPE, key: hit.row.id }
        return attachInstruction(data, {
          element: hit.element,
          input,
          currentLevel: hit.row.depth,
          indentPerLevel: indentPx.value,
          mode: itemMode(hit.row),
          block: blockedInstructions(hit.row, source.data.keys ?? []),
        })
      },
      onDrag: ({ self }) => {
        const key = self.data.key
        const instruction = extractInstruction(self.data)
        dropTarget.value = key && instruction ? { key, instruction } : null
        scheduleAutoExpand(key ?? null, instruction)
      },
      onDragLeave: clearDropTarget,
      onDrop: ({ self, source }) => {
        clearDropTarget()
        const key = self.data.key
        const instruction = extractInstruction(self.data)
        if (!key || !instruction || instruction.type === 'instruction-blocked') return
        const keys = source.data.keys ?? []
        if (keys.includes(key)) return
        props.emitEvent('move', {
          key: source.data.key,
          keys,
          targetKey: key,
          instruction: instruction.type,
          desiredLevel: instruction.desiredLevel ?? instruction.currentLevel,
        })
      },
    }),
  )
}

onMounted(registerDnd)
watch(dndEnabled, registerDnd)

onBeforeUnmount(() => {
  cancelAutoExpand()
  dndCleanup?.()
})

function instructionFor(row) {
  return dropTarget.value?.key === row.id ? dropTarget.value.instruction : null
}

function rowDndClass(row) {
  const instruction = instructionFor(row)
  return {
    'pnl-tst-row--draggable': dndEnabled.value,
    'pnl-tst-row--dragging': draggingKeys.value.includes(row.id),
    'pnl-tst-row--blocked': instruction?.type === 'instruction-blocked',
    'pnl-tst-row--child-target': instruction?.type === 'make-child',
  }
}

// `make-child` is shown as a highlight on the row itself, everything else as a
// line whose indent is the level the node would land on.
function dropLineClass(row) {
  const instruction = instructionFor(row)
  if (!instruction) return null
  if (instruction.type === 'reorder-above') return 'pnl-tst-dropline--above'
  if (instruction.type === 'reorder-below' || instruction.type === 'reparent') {
    return 'pnl-tst-dropline--below'
  }
  return null
}

function dropLineStyle(row) {
  const instruction = instructionFor(row)
  if (!instruction) return null
  const level =
    instruction.type === 'reparent' ? instruction.desiredLevel : instruction.currentLevel
  return { insetInlineStart: `${level * instruction.indentPerLevel}px` }
}
</script>

<template>
  <div ref="rootElement" class="pnl-tst">
    <!-- Above the empty state as well as the grid, so a tree with nothing in it
         can still be searched and, once the structural actions land, filled. -->
    <div
      v-if="hasToolbar"
      class="pnl-tst-toolbar"
      role="toolbar"
      aria-orientation="horizontal"
      :aria-label="toolbarLabel"
    >
      <template v-for="item in toolbarItems" :key="item.uid">
        <span v-if="item.id === '|'" class="pnl-tst-tsep" aria-hidden="true"></span>

        <label v-else-if="item.id === 'search'" class="pnl-tst-search">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="pnl-tst-icon" aria-hidden="true" v-html="searchIcon"></span>
          <input
            :ref="(element) => (searchInput = element)"
            type="search"
            :value="searchText"
            :aria-label="searchLabel"
            :placeholder="searchLabel"
            @input="onSearchInput($event.target.value)"
          />
        </label>

        <button
          v-else
          :ref="(element) => setToolbarElement(item.uid, element)"
          type="button"
          class="pnl-tst-tbtn"
          :aria-label="item.label"
          :aria-keyshortcuts="item.keys"
          :aria-disabled="!actionEnabled(item)"
          :title="actionTitle(item)"
          :tabindex="item.uid === toolbarFocusKey ? 0 : -1"
          @click="runAction(item)"
          @focus="toolbarFocusId = item.uid"
          @keydown="onToolbarKeydown"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="pnl-tst-icon" aria-hidden="true" v-html="item.icon"></span>
        </button>
      </template>
    </div>

    <div v-if="rows.length === 0" class="pnl-tst-empty">{{ emptyMessage }}</div>

    <div
      v-else
      class="pnl-tst-grid"
      role="treegrid"
      :aria-label="ariaLabel"
      :aria-colcount="headers.length"
      :aria-rowcount="ariaRowCount"
      @keydown="onKeydown"
    >
      <div v-if="hasColumns" class="pnl-tst-head" role="rowgroup">
        <div class="pnl-tst-hrow" role="row" :aria-rowindex="1">
          <div
            v-for="(header, index) in headers"
            :key="header.id"
            class="pnl-tst-hcell"
            role="columnheader"
            :aria-colindex="index + 1"
            :style="cellStyle(header.column.columnDef)"
          >
            {{ header.column.columnDef.header }}
          </div>
        </div>
      </div>

      <div class="pnl-tst-body" role="rowgroup">
        <div
          v-for="(row, rowIndex) in rows"
          :key="row.id"
          :ref="(element) => setRowElement(row.id, element)"
          class="pnl-tst-row"
          :class="[
            rowDndClass(row),
            {
              'pnl-tst-row--active': activeShown && row.id === activeKey,
              'pnl-tst-row--quiet': !activeShown && row.id === activeKey,
            },
          ]"
          role="row"
          :aria-level="row.depth + 1"
          :aria-posinset="posInSet(row)"
          :aria-setsize="setSize(row)"
          :aria-rowindex="rowIndex + rowIndexOffset"
          :aria-expanded="canExpand(row) ? isExpanded(row) : undefined"
          :aria-selected="selectable ? row.getIsSelected() : undefined"
          :tabindex="row.id === focusKey ? 0 : -1"
          @click="onRowClick(row, $event)"
          @focus="setActive(row.id)"
        >
          <!-- Decorative drop indicator. aria-hidden keeps the row's children a
               pure gridcell list as far as assistive technology is concerned. -->
          <span
            v-if="dropLineClass(row)"
            class="pnl-tst-dropline"
            :class="dropLineClass(row)"
            :style="dropLineStyle(row)"
            aria-hidden="true"
          ></span>
          <div
            v-for="(cell, cellIndex) in row.getAllCells()"
            :key="cell.id"
            class="pnl-tst-cell"
            :class="{ 'pnl-tst-cell--tree': cellIndex === 0 }"
            role="gridcell"
            :aria-colindex="cellIndex + 1"
            :style="
              cellIndex === 0
                ? treeCellStyle(row, cell.column.columnDef)
                : cellStyle(cell.column.columnDef)
            "
          >
            <template v-if="cellIndex === 0">
              <!-- Decorative: expanded state is announced from the row's
                   aria-expanded, so a second announcement here would duplicate. -->
              <span
                v-if="canExpand(row)"
                class="pnl-tst-twisty"
                :class="{ 'pnl-tst-twisty--open': isExpanded(row) }"
                aria-hidden="true"
                @click.stop="onToggle(row)"
              >
                <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
                  <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.6" />
                </svg>
              </span>
              <span v-else class="pnl-tst-twisty pnl-tst-twisty--leaf" aria-hidden="true"></span>
              <!-- Native checkbox: the browser maps the `indeterminate` DOM
                   property to aria-checked="mixed" on its own. Kept out of the
                   tab order because the row carries the roving tabindex. -->
              <input
                v-if="showCheckboxes"
                class="pnl-tst-check"
                type="checkbox"
                tabindex="-1"
                :checked="isChecked(row)"
                :indeterminate.prop="isIndeterminate(row)"
                :aria-label="`Select ${row.original.title ?? row.id}`"
                @click.stop="onCheckboxClick(row)"
              />
              <!-- Decorative, so aria-hidden: the icon only restates the node's
                   own kind, which is already in the title or in a column. The
                   markup comes from the `icons` param, which the app author
                   controls exactly as they control `source`. -->
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span
                v-if="iconMarkup(row)"
                class="pnl-tst-icon"
                aria-hidden="true"
                v-html="iconMarkup(row)"
              ></span>
            </template>
            <span class="pnl-tst-value">{{ cell.getValue() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
