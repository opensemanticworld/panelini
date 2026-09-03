<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  columnResizingFeature,
  columnSizingFeature,
  createCoreRowModel,
  createExpandedRowModel,
  createSortedRowModel,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'
import { attachInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item'
import { DND_TYPE, joinDndHost } from '@/dnd_host.js'
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
import clipboardPasteIcon from 'lucide-static/icons/clipboard-paste.svg?raw'
import copyIcon from 'lucide-static/icons/copy.svg?raw'
import filePlusIcon from 'lucide-static/icons/file-plus.svg?raw'
import folderPlusIcon from 'lucide-static/icons/folder-plus.svg?raw'
import indentDecreaseIcon from 'lucide-static/icons/indent-decrease.svg?raw'
import indentIncreaseIcon from 'lucide-static/icons/indent-increase.svg?raw'
import pencilIcon from 'lucide-static/icons/pencil.svg?raw'
import redoIcon from 'lucide-static/icons/redo-2.svg?raw'
import scissorsIcon from 'lucide-static/icons/scissors.svg?raw'
import searchIcon from 'lucide-static/icons/search.svg?raw'
import squareIcon from 'lucide-static/icons/square.svg?raw'
import squareCheckIcon from 'lucide-static/icons/square-check.svg?raw'
import trashIcon from 'lucide-static/icons/trash-2.svg?raw'
import undoIcon from 'lucide-static/icons/undo-2.svg?raw'

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
  // Two-way sync of the row the inline title editor is open on.
  setEditingKey: { type: Function, required: true },
  // Two-way sync of the sort, as a list of {id, desc}.
  setSorting: { type: Function, required: true },
  // Two-way sync of the resized column widths, as a map of column id to pixels.
  setColumnWidths: { type: Function, required: true },
})

// Built once, outside the table instance: the adapter injects
// `coreReactivityFeature` itself, so only the opt-in features are listed here.
//
// Sort comparators are registered by name rather than spread from the built-in
// registry, so only the two that a treegrid of titles and values actually needs
// reach the bundle. `alphanumeric` is what puts `file2` above `file10`, `text` is
// the case-insensitive compare plain strings fall back to, and anything else
// (numbers, booleans) lands on `sortFn_basic`, which table-core imports itself.
//
// Sizing is two features rather than one: `columnSizingFeature` resolves a
// column's width from the state and the column def, and `columnResizingFeature`
// adds the drag that writes that state. A table can therefore be given widths
// without being given a handle to change them.
const features = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  coreRowModel: createCoreRowModel(),
  expandedRowModel: createExpandedRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

const TREE_COLUMN_ID = 'title'

const hasColumns = computed(() => (props.state.columns || []).length > 0)

// Sorting is a view concern, exactly as the search box is: it reorders the row
// model and never `source`, so Python goes on owning a tree that has one order of
// its own. A table without columns has no header to sort from, so it is off there
// whatever the option says.
const sortingEnabled = computed(() => hasColumns.value && props.state.options.sortable !== false)
const foldersFirst = computed(() => props.state.options.sort_folders_first === true)

// Resizing is on once a table has columns, for the same reason sorting is: a
// header is the handle, and a tree-only table has none.
const resizingEnabled = computed(() => hasColumns.value && props.state.options.resizable !== false)

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
      enableSorting: column.sortable !== false,
      enableResizing: column.resizable !== false,
      // Written only where Python actually declared one, so the rest fall back to
      // TanStack's own defaults (150 wide, no narrower than 20) rather than to a
      // second set of numbers kept here.
      ...numberOption('size', column.width),
      ...numberOption('minSize', column.min_width),
      ...numberOption('maxSize', column.max_width),
      // Only set when asked for, so an ordinary table keeps TanStack's own
      // detection of what a column holds rather than routing through ours.
      ...(foldersFirst.value ? { sortFn: branchesFirst } : {}),
    }
  })
})

function numberOption(name, value) {
  return typeof value === 'number' && Number.isFinite(value) ? { [name]: value } : {}
}

// A node names a type and takes that type's fields for every one it does not set
// itself, which is `tree.resolve_node` in Python. Resolved wherever a field is
// read rather than merged into the node, so `source` carries the type name alone
// and a tree that names no types costs one lookup that finds nothing.
function fieldOf(node, name) {
  const own = node?.[name]
  if (own !== undefined) return own
  const entry = (props.state.types || {})[node?.type]
  return entry && typeof entry === 'object' ? entry[name] : undefined
}

// A branch is a node that has children or one that has not said it cannot take
// them, which is the rule `tree.accepts_children` applies in Python. A tree that
// never declares `allow_children` therefore has no leaves, and asking for folders
// first in one changes nothing rather than inventing a distinction.
function isBranch(row) {
  return row.subRows.length > 0 || fieldOf(row.original, 'allow_children') !== false
}

// Folders above files at every level, whichever way the column itself is sorted.
// TanStack inverts a comparator's whole result for a descending sort, so the
// grouping half is pre-inverted here to survive that; without it, asking for
// descending names would also turn the tree inside out.
function branchesFirst(rowA, rowB, columnId) {
  const branchA = isBranch(rowA)
  if (branchA !== isBranch(rowB)) {
    const descending = sorting.value.some((entry) => entry.id === columnId && entry.desc)
    return (branchA ? -1 : 1) * (descending ? -1 : 1)
  }
  return table.getColumn(columnId).getAutoSortFn()(rowA, rowB, columnId)
}

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
  const name = fieldOf(row.original, 'icon')
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

// Local mirror of TanStack's `sorting`, in the shape Python holds it: a list of
// {id, desc}. One entry at most, for the reason `enableMultiSort: false` gives.
const sorting = ref(cleanSorting(props.state.sorting))

function cleanSorting(value) {
  return (value || [])
    .filter((entry) => entry && entry.id)
    .map((entry) => ({ id: String(entry.id), desc: entry.desc === true }))
}

function sameSorting(a, b) {
  return a.length === b.length && a.every((entry, i) => entry.id === b[i].id && entry.desc === b[i].desc)
}

const sorted = computed(() => sortingEnabled.value && sorting.value.length > 0)

// Local mirror of TanStack's `columnSizing`, which is Python's `column_widths`
// under the name table-core gives it: a map of column id to pixels holding the
// columns somebody has actually sized, and nothing else. A column missing from it
// is not unsized, it is at the width its column def asks for.
const columnSizing = ref(cleanSizing(props.state.columnWidths))

function cleanSizing(value) {
  const sizes = {}
  for (const [id, width] of Object.entries(value || {})) {
    const px = Math.round(Number(width))
    if (Number.isFinite(px) && px > 0) sizes[id] = px
  }
  return sizes
}

function sameSizing(a, b) {
  const ids = Object.keys(a)
  return ids.length === Object.keys(b).length && ids.every((id) => a[id] === b[id])
}

// Which column is being dragged, or null. Tracked here rather than read back out
// of TanStack's transient resize state, because it is also what says a width is
// still moving and must not be pushed to Python yet.
const resizingId = ref(null)

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
  // The same bargain for the sort: a tree Python rewrote is not a user asking
  // for a different order, and dropping the sort on every move would undo the
  // one thing the header was pressed for.
  autoResetSorting: false,
  enableRowSelection: selectable,
  enableMultiRowSelection: computed(() => selectMode.value !== 'single'),
  enableSubRowSelection: cascades,
  enableSorting: sortingEnabled,
  // One column at a time. ARIA asks that `aria-sort` name a single column, and a
  // treegrid sorted on two keys inside every parent is a thing no file manager
  // does and no screen reader can narrate.
  enableMultiSort: false,
  // Third press clears the sort rather than going back to ascending, so the tree
  // order stays reachable without a separate control.
  enableSortingRemoval: true,
  // Every column starts ascending. TanStack would otherwise start a numeric
  // column descending, which makes the same gesture mean two different things
  // depending on what a column happens to hold.
  sortDescFirst: false,
  enableColumnResizing: resizingEnabled,
  // The columns follow the pointer rather than a guide line that commits on
  // release. It costs a render per frame of the drag, which is what a table with
  // every row in the DOM can afford today and what P15 has to look at again.
  columnResizeMode: 'onChange',
  state: computed(() => ({
    expanded: expanded.value,
    rowSelection: rowSelection.value,
    sorting: sorting.value,
    columnSizing: columnSizing.value,
  })),
  onExpandedChange: (updater) => {
    expanded.value = typeof updater === 'function' ? updater(expanded.value) : updater
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
  onSortingChange: (updater) => {
    sorting.value = cleanSorting(typeof updater === 'function' ? updater(sorting.value) : updater)
  },
  onColumnSizingChange: (updater) => {
    columnSizing.value = cleanSizing(
      typeof updater === 'function' ? updater(columnSizing.value) : updater,
    )
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

// The sort round trips for the same reason the filter does: it is state an
// application may want to set, read back or keep, and a param is where the rest
// of this panel's view state already lives.
watch(() => sorting.value, props.setSorting, { flush: 'post' })

watch(
  () => props.state.sorting,
  (value) => {
    const next = cleanSorting(value)
    if (sameSorting(sorting.value, next)) return
    sorting.value = next
  },
)

// The widths round trip like the sort, but never mid-drag: `onChange` commits a
// width on every frame the pointer moves, and pushing each of those would put a
// hundred param writes on the socket for one gesture. The drag clearing
// `resizingId` is itself a change here, so the width it settled on is pushed once
// as the mouse comes up.
watch(
  () => [columnSizing.value, resizingId.value],
  ([sizes, dragging]) => {
    if (dragging) return
    props.setColumnWidths(sizes)
  },
  { flush: 'post' },
)

watch(
  () => props.state.columnWidths,
  (value) => {
    const next = cleanSizing(value)
    if (sameSizing(columnSizing.value, next)) return
    columnSizing.value = next
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
//
// The sorted model rather than the core one, because the core model sits upstream
// of the sort in TanStack's pipeline and reading it here would quietly unsort the
// table the moment anything was typed into the search box. Its `flatRows` are
// built depth first in sorted order, which is the order the rows render in.
const rows = computed(() => {
  if (!filtering.value) return table.getRowModel().rows
  const flat = table.getSortedRowModel().flatRows
  const keep = new Set()
  for (const row of flat) {
    if (!rowMatches(row)) continue
    keep.add(row.id)
    for (let cursor = row.getParentRow(); cursor; cursor = cursor.getParentRow()) keep.add(cursor.id)
  }
  return flat.filter((row) => keep.has(row.id))
})

const headers = computed(() => table.getHeaderGroups()[0]?.headers ?? [])
const indentPx = computed(() => props.state.options.indent_px ?? 16)
const ariaLabel = computed(() => props.state.options.aria_label ?? 'Tree table')
const emptyMessage = computed(() => (filtering.value ? 'No matches' : 'No data'))

// The header occupies aria row 1 when columns are shown, so body rows start at 2.
const rowIndexOffset = computed(() => (hasColumns.value ? 2 : 1))
const ariaRowCount = computed(() => rows.value.length + (hasColumns.value ? 1 : 0))

// The header is part of the grid rather than a region of its own, so the panel
// still has exactly two tab stops: the toolbar, then the grid. `headerActive`
// says which half of the grid holds the one tabbable element, and ArrowUp off the
// first row is what moves it, which is the first thing a grid user tries.
const headerActive = ref(false)
const headerFocusId = ref(null)
const headerElements = new Map()

function setHeaderElement(id, element) {
  if (element) headerElements.set(id, element)
  else headerElements.delete(id)
}

const headerFocusKey = computed(() => {
  const list = headers.value
  if (list.length === 0) return null
  const current = list.some((header) => header.column.id === headerFocusId.value)
  return current ? headerFocusId.value : list[0].column.id
})

function focusHeaderByIndex(index) {
  const list = headers.value
  if (list.length === 0) return
  const next = list[Math.max(0, Math.min(index, list.length - 1))]
  headerActive.value = true
  headerFocusId.value = next.column.id
  nextTick(() => headerElements.get(next.column.id)?.focus())
}

function focusHeader() {
  const list = headers.value
  focusHeaderByIndex(list.findIndex((header) => header.column.id === headerFocusKey.value))
}

function leaveHeader() {
  headerActive.value = false
  nextTick(() => rowElements.get(focusKey.value)?.focus())
}

function canSort(header) {
  return sortingEnabled.value && header.column.getCanSort()
}

// `none` on the sortable columns that are not sorted, and nothing at all on the
// ones that cannot be: a column with no sort control has no sort state to report,
// and saying `none` there would offer an affordance that is not there.
function ariaSort(header) {
  if (!canSort(header)) return undefined
  const direction = header.column.getIsSorted()
  if (direction === 'asc') return 'ascending'
  return direction === 'desc' ? 'descending' : 'none'
}

// Decorative: the direction is announced from the header's own aria-sort, so the
// arrow is there for the eye and hidden from everything else. Reuses the two
// toolbar arrows rather than adding a glyph, so the indicator costs no bundle.
function sortIcon(header) {
  if (!canSort(header)) return null
  const direction = header.column.getIsSorted()
  if (!direction) return null
  return direction === 'asc' ? arrowUpIcon : arrowDownIcon
}

// Ascending, descending, then back to the tree's own order.
function toggleSort(header) {
  if (!canSort(header)) return
  header.column.toggleSorting()
}

function onHeaderClick(header) {
  focusHeaderByIndex(headers.value.indexOf(header))
  toggleSort(header)
}

// One press of the keyboard is worth this many pixels. Coarse enough to get
// somewhere in a few presses, fine enough to land on a width somebody wanted.
const RESIZE_STEP = 16

function canResize(header) {
  return resizingEnabled.value && header.column.getCanResize()
}

// TanStack binds its own move and up listeners on `document`, and a shadow root
// retargets the event without touching `clientX`, so the drag needs nothing from
// us. The pair added here is only to know when it has finished: the width is
// committed on every frame, and Python is told about it once.
function onResizeStart(header, event) {
  if (!canResize(header)) return
  event.stopPropagation()
  header.getResizeHandler()(event)
  resizingId.value = header.column.id
  const done = () => {
    resizingId.value = null
  }
  for (const name of ['mouseup', 'touchend', 'touchcancel']) {
    document.addEventListener(name, done, { once: true })
  }
}

// Clamped here as well as on the way out, because `getSize()` clamps what it
// reports and the state would otherwise keep drifting past the bound each press.
function nudgeSize(header, delta) {
  if (!canResize(header)) return
  const column = header.column
  const min = column.columnDef.minSize ?? 20
  const max = column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER
  const next = Math.min(Math.max(Math.round(column.getSize() + delta), min), max)
  table.setColumnSizing((old) => ({ ...old, [column.id]: next }))
}

// Back to the width the column def asks for, which is what dropping the column
// out of the sizing state means. The gesture is a double click on the handle, and
// Alt+Home from the keyboard: Home on a header already means the first column, so
// this is the width it started at.
function resetSize(header) {
  if (!canResize(header)) return
  header.column.resetSize()
}

// The header's own keyboard region. Left and right walk the columns, down steps
// into the rows, and Enter and Space sort, which are the meanings each key
// already carries one row lower. Anything else bubbles to the grid, so the
// toolbar shortcuts go on working from up here.
function onHeaderKeydown(header, event) {
  const list = headers.value
  const index = Math.max(
    0,
    list.findIndex((entry) => entry.column.id === headerFocusKey.value),
  )
  // Alt widens and narrows the focused column, which gives resizing a keyboard
  // route that costs no tab stop. Alt+Arrow is already this panel's modifier for
  // "do that to what has focus", and the row actions it drives one row lower have
  // no meaning on a header, so nothing is taken away by claiming it here.
  if (event.altKey) {
    switch (event.key) {
      case 'ArrowLeft':
        nudgeSize(header, -RESIZE_STEP)
        break
      case 'ArrowRight':
        nudgeSize(header, RESIZE_STEP)
        break
      case 'Home':
        resetSize(header)
        break
      default:
        return
    }
    event.preventDefault()
    event.stopPropagation()
    return
  }
  switch (event.key) {
    case 'ArrowLeft':
      focusHeaderByIndex(index - 1)
      break
    case 'ArrowRight':
      focusHeaderByIndex(index + 1)
      break
    case 'Home':
      focusHeaderByIndex(0)
      break
    case 'End':
      focusHeaderByIndex(list.length - 1)
      break
    case 'ArrowDown':
      leaveHeader()
      break
    case 'Enter':
    case ' ':
      toggleSort(header)
      break
    default:
      return
  }
  event.preventDefault()
  event.stopPropagation()
}

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

// Widths reach the DOM as custom properties on the grid rather than as an inline
// width per cell. A drag then writes a handful of values on one element per frame
// instead of one on every cell of every row, and a cell keeps a style that never
// changes. They are named by position, because a column id comes from Python and
// need not be a legal custom property name.
const columnVars = computed(() => {
  if (!hasColumns.value) return {}
  const vars = { '--pnl-tst-total': `${table.getTotalSize()}px` }
  headers.value.forEach((header, index) => {
    vars[`--pnl-tst-w${index}`] = `${header.column.getSize()}px`
  })
  return vars
})

// The tree column takes whatever width the others leave over, so a table wider
// than its columns has no gap at the end and one narrower than them scrolls
// sideways rather than squeezing the names out of the column somebody sized. In
// tree-only mode there is one column and no header, so nothing is sized and it
// simply fills.
function cellStyle(index) {
  if (!hasColumns.value) return { flex: '1 1 0' }
  return index === 0 ? { flex: '1 0 var(--pnl-tst-w0)' } : { flex: `0 0 var(--pnl-tst-w${index})` }
}

function treeCellStyle(row) {
  return { ...cellStyle(0), paddingInlineStart: `${row.depth * indentPx.value}px` }
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
  // The grid's one tabbable element is either a row or a header cell, never
  // both, so touching a row hands it back from the header.
  headerActive.value = false
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
  // Ctrl+Z is the same bargain: the title editor stops its own keydowns, so
  // undoing typing inside it stays the browser's, and so do Ctrl+C, Ctrl+X and
  // Ctrl+V, which mean rows out here and text in there.
  if (event.ctrlKey || event.metaKey) {
    const id = {
      a: 'select-all',
      c: 'copy',
      f: SEARCH_ID,
      v: 'paste',
      x: 'cut',
      z: event.shiftKey ? 'redo' : 'undo',
    }[event.key.toLowerCase()]
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
  // The platform's own keys for a context menu, so it is not a thing only a
  // pointer can reach. Neither key means anything else in a treegrid.
  if (hasMenu.value && (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey))) {
    event.preventDefault()
    openMenuForFocusedRow(row)
    return
  }
  // Insert creates, Shift+Insert creates the other kind, F2 renames, Delete removes
  // and Escape clears. A table that declared only some of these answers to only
  // those keys, and the rest fall through to the navigation switch below.
  const direct = {
    Insert: event.shiftKey ? 'new-file' : 'new-folder',
    F2: 'rename',
    Delete: 'delete',
    Escape: 'clear-selection',
  }[event.key]
  if (direct && allows(direct)) {
    event.preventDefault()
    runById(direct)
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveFocus(index + 1, event)
      break
    case 'ArrowUp':
      // Off the top of the rows and into the header, which is where the sort and
      // the resize live. Extending a selection stops at the first row, because
      // there is nothing above it to take into one.
      event.preventDefault()
      if (index === 0 && hasColumns.value && !event.shiftKey) focusHeader()
      else moveFocus(index - 1, event)
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
  rename: { icon: pencilIcon, label: 'Rename', keys: 'F2' },
  delete: { icon: trashIcon, label: 'Delete', keys: 'Delete' },
  undo: { icon: undoIcon, label: 'Undo', keys: 'Control+Z' },
  redo: { icon: redoIcon, label: 'Redo', keys: 'Control+Shift+Z' },
  cut: { icon: scissorsIcon, label: 'Cut', keys: 'Control+X' },
  copy: { icon: copyIcon, label: 'Copy', keys: 'Control+C' },
  paste: { icon: clipboardPasteIcon, label: 'Paste', keys: 'Control+V' },
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
  'undo',
  'redo',
  SEPARATOR_ID,
  'new-folder',
  'new-file',
  'rename',
  'delete',
  SEPARATOR_ID,
  'cut',
  'copy',
  'paste',
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

// The context menu is a second way to reach the same actions and never a second
// vocabulary: it is declared exactly as the toolbar is, out of the same registry,
// so nothing can be offered there that the toolbar could not offer. Off by
// default, like the toolbar.
const DEFAULT_MENU = [
  'new-folder',
  'new-file',
  SEPARATOR_ID,
  'rename',
  'delete',
  SEPARATOR_ID,
  'cut',
  'copy',
  'paste',
]

// An entry is either an action id or an object overriding that action's label,
// icon and node template. The object form is what lets one table offer "New note"
// and "New task" from the same creation action, so the panel never has to learn a
// single application's node kinds. The label names what the button creates, so it
// is also the new node's default title.
//
// `uid` rather than the id is the identity here, because two entries may legally
// share an id. A shortcut then runs the first of them.
function buildItems(value, fallback) {
  const list = value === true ? fallback : Array.isArray(value) ? value : []
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
}

const toolbarItems = computed(() => buildItems(props.state.options.toolbar, DEFAULT_TOOLBAR))

// The search box is a text field rather than a command, so it belongs in a
// toolbar and not in a popup menu. An entry naming it is dropped instead of
// rendering something unusable.
const menuItems = computed(() =>
  buildItems(props.state.options.menu, DEFAULT_MENU).filter((item) => item.id !== SEARCH_ID),
)

const hasToolbar = computed(() => toolbarItems.value.length > 0)
const toolbarLabel = computed(() => props.state.options.toolbar_label ?? 'Tree actions')
const searchLabel = computed(() => props.state.options.search_label ?? 'Search')

// The single lookup behind both halves: a button is drawn and its shortcut fires
// only when the table declared the action. Either declaration counts, so a table
// offering `delete` in its menu alone still answers to the Delete key: the two
// lists together are what the table may do.
function itemFor(id) {
  return (
    toolbarItems.value.find((item) => item.id === id) ??
    menuItems.value.find((item) => item.id === id) ??
    null
  )
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

const clipboardKeys = computed(() => props.state.clipboard?.keys ?? [])

// Every row inside a cut branch is faded, not only the row that was cut: a folder
// waiting to be moved takes its contents with it, and showing it greyed while its
// files look untouched would say the opposite. A copy fades nothing, because
// nothing about those rows is about to change.
//
// Rows are flat in render order, so a parent is always seen before its children
// and one pass down the list is enough to reach the whole subtree.
const cutRowKeys = computed(() => {
  const marked = new Set(props.state.clipboard?.mode === 'cut' ? clipboardKeys.value : [])
  if (marked.size === 0) return marked
  rows.value.forEach((row) => {
    if (row.parentId && marked.has(row.parentId)) marked.add(row.id)
  })
  return marked
})

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
//   pasted the keys a copy gained, diffed the same way, but landing on all of
//          them and never opening the editor: a paste arrives already named
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
      else if (request.pasted !== undefined) focusPasted(request.pasted)
      else focusAdded(request.added)
    })
  },
)

// Selecting the new node as well as focusing it makes typing a name next land on
// the thing that was just created, and it matches an explorer.
function focusAdded(before) {
  const fresh = table.getCoreRowModel().flatRows.find((row) => !before.has(row.id))
  if (!fresh) return
  focusRowByKey(fresh.id)
  if (selectable.value) {
    rowSelection.value = {}
    rangeAnchorKey.value = fresh.id
    fresh.toggleSelected(true, { selectChildren: false })
  }
  // Naming a new node straight away is what an explorer does. Opening the editor is
  // a view decision, so it is taken here rather than by Python, exactly as opening
  // the new parent is: a table that did not ask for `rename` gets no editor at all
  // and the node simply keeps the button's label as its title.
  if (allows('rename')) nextTick(() => startEdit(fresh.id, true))
}

// A pasted copy arrives named, so the editor stays shut where an add opens it, and
// the whole batch is selected rather than one of it: pasting five files and leaving
// four of them unselected would not be what was asked for.
//
// Only the roots of what arrived are taken. A copied folder brings its contents
// with new keys too, and selecting those as well would mean a second paste
// duplicated the contents twice over.
function focusPasted(before) {
  const fresh = table.getCoreRowModel().flatRows.filter((row) => !before.has(row.id))
  const freshKeys = new Set(fresh.map((row) => row.id))
  const roots = fresh.filter((row) => !freshKeys.has(row.parentId ?? ''))
  if (roots.length === 0) return
  focusRowByKey(roots[0].id)
  if (selectable.value) {
    rowSelection.value = {}
    rangeAnchorKey.value = roots[0].id
    roots.forEach((row) => row.toggleSelected(true, { selectChildren: false }))
  }
}

// The inline title editor. `editing_key` names the row it is open on and is
// bidirectional for the same reason `filter_text` is: an application may open the
// editor by writing a key, and the browser writes "" back when it closes. What is
// typed stays local until it commits, so a rename is one intent and not one per
// keystroke.
const editingKey = ref(null)
const editText = ref('')
const editInput = ref(null)

// The pending answer to the file type warning, `{key, title}` while the dialog is
// up and null otherwise. Python decides the icon and applies the rename; this only
// decides whether the intent is sent at all.
const confirmRename = ref(null)
const confirmYesButton = ref(null)
const confirmNoButton = ref(null)
const extensionWarning = computed(() => props.state.options.extension_warning !== false)

// The part after the last dot, lowercased, so `notes.MD` and `notes.md` are one
// type. A name with no dot has no extension, which is itself a difference from one
// that has: renaming `notes.md` to `notes` takes its type away.
function extensionOf(name) {
  const text = String(name ?? '')
  const dot = text.lastIndexOf('.')
  return dot < 0 ? '' : text.slice(dot + 1).toLowerCase()
}

// Only a file has a type to lose, so a folder renamed to `notes.md` warns about
// nothing. The same test runs again in Python, which reports `extension_changed`
// to the application whether or not this dialog was shown.
function warnsAboutExtension(node, title) {
  return (
    extensionWarning.value &&
    fieldOf(node, 'allow_children') === false &&
    extensionOf(title) !== extensionOf(node.title ?? '')
  )
}

// The key of a node this browser created a moment ago, which is what lets Escape
// remove it again: cancelling the name of a node that only exists because the
// editor opened should leave no "New folder" behind. Cleared whenever the editor
// closes, so a later edit of the same row is an ordinary one.
let freshKey = null

// A key naming no rendered row is ignored rather than opening an editor nobody can
// see. Revealing the row would mean expanding branches or clearing the filter, and
// neither is something a rename should decide on the application's behalf.
function startEdit(key, fresh = false) {
  const row = rowByKey(key)
  if (!row) return
  freshKey = fresh ? key : null
  editText.value = row.original.title ?? ''
  editingKey.value = key
  props.setEditingKey(key)
  nextTick(() => {
    editInput.value?.focus()
    editInput.value?.select()
  })
}

function closeEdit() {
  freshKey = null
  confirmRename.value = null
  editingKey.value = null
  props.setEditingKey('')
}

// Committing is a `rename` intent like any other: Python decides, rewrites `source`
// and pushes it back. A title that did not change is not worth a round trip, and an
// empty one is a cancel rather than a blank rename, which is how Python reads it too
// if it arrives anyway.
//
// Both of these guard on the editor still being open, because closing it unmounts a
// focused input and the blur that follows would otherwise commit a second time.
// The first guard is the dialog's: focusing one of its buttons blurs the input, so
// the blur handler runs again on a rename that is already waiting for an answer.
function commitEdit(row) {
  if (confirmRename.value) return
  if (editingKey.value !== row.id) return
  const title = editText.value.trim()
  const changed = title.length > 0 && title !== (row.original.title ?? '')
  // A node created a moment ago is exempt: naming it for the first time is not a
  // change of type, because it never had one. Warning there would put a dialog in
  // front of the ordinary way a file is made.
  if (changed && freshKey !== row.id && warnsAboutExtension(row.original, title)) {
    // The editor stays open behind the dialog, which is what lets `No` return to
    // exactly what was typed instead of making the user start again.
    confirmRename.value = { key: row.id, title, previous: row.original.title ?? row.id }
    nextTick(() => confirmNoButton.value?.focus())
    return
  }
  closeEdit()
  if (!changed) {
    focusRowByKey(row.id)
    return
  }
  refocus = { key: row.id }
  props.emitEvent('rename', { key: row.id, title })
}

function acceptRename() {
  const { key, title } = confirmRename.value
  confirmRename.value = null
  closeEdit()
  refocus = { key }
  props.emitEvent('rename', { key, title })
}

// Declining leaves `source` untouched and hands the caret back, so a mistyped
// extension is corrected rather than retyped.
function declineRename() {
  confirmRename.value = null
  nextTick(() => {
    editInput.value?.focus()
    editInput.value?.select()
  })
}

// Answerable without ever reaching for the mouse. Escape and `n` decline, `y`
// accepts, Enter and Space take whichever button is focused, and the arrows move
// between them. Tab is trapped rather than let out of a modal; with two buttons a
// trap and an arrow are the same swap.
function onConfirmKeydown(event) {
  const key = event.key
  if (key === 'Escape' || key === 'n' || key === 'N') {
    event.preventDefault()
    declineRename()
    return
  }
  if (key === 'y' || key === 'Y') {
    event.preventDefault()
    acceptRename()
    return
  }
  if (key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') return
  event.preventDefault()
  const other = event.target === confirmYesButton.value ? confirmNoButton : confirmYesButton
  other.value?.focus()
}

// Escape on an existing row just closes the editor. On a row created a moment ago it
// deletes the row as well, so one keypress undoes the whole of what opening the
// editor was part of.
function cancelEdit(row) {
  if (editingKey.value !== row.id) return
  const fresh = freshKey === row.id
  closeEdit()
  if (!fresh) {
    focusRowByKey(row.id)
    return
  }
  refocus = { index: rows.value.findIndex((candidate) => candidate.id === row.id) }
  props.emitEvent('delete', { key: row.id, keys: [row.id] })
}

// Bound on the input rather than left to the grid, and stopped there, so Escape,
// Enter and the arrow keys mean what they mean in a text field while it is open.
function onEditKeydown(row, event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    commitEdit(row)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancelEdit(row)
  }
}

// Python writing the key is an application asking for the editor outright, so it is
// honoured whether or not the toolbar declared `rename`, the same way `set_source`
// is not gated by what the toolbar offers.
watch(
  () => props.state.editingKey,
  (key) => {
    if ((key || '') === (editingKey.value || '')) return
    if (key) startEdit(key)
    else closeEdit()
  },
)

onMounted(() => {
  if (props.state.editingKey) startEdit(props.state.editingKey)
})

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
  const position = row ? (fieldOf(row.original, 'allow_children') === false ? 'after' : 'child') : null
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

// A step back may put rows back, take rows away or move them, and which of those
// it was is Python's to know. Focus therefore follows the position the way it does
// after a delete, which lands on a real row whatever the step turned out to be,
// where following the key would leave the grid pointing at a node an undone add
// has just taken back.
function emitHistory(action) {
  refocus = { index: rows.value.findIndex((row) => row.id === activeRow.value?.id) }
  props.emitEvent(action, {})
}

// The clipboard lives in Python, because the keys in it have to mean something in
// the tree Python owns. Cut and copy change nothing, so there is no focus to
// restore and no new tree to wait for: they hand over a set of keys and read the
// answer back as `clipboard`. Which rows they take is the delete rule rather than
// the drag rule, since ticking a folder plainly means the folder is cut too.
function emitClipboard(action) {
  const keys = selectionBatch()
  if (keys.length === 0) return
  props.emitEvent(action, { key: activeRow.value?.id ?? null, keys })
}

// Paste lands where an add would: inside the active row when it takes children,
// next to it when it does not, and at root level when nothing is active.
//
// Focus afterwards depends on the mode, because only one of the two produces keys
// the browser cannot know. A cut brings existing rows to a new place, so focus
// follows the first of them. A copy mints keys in Python, so the new rows are
// found by diffing the tree, exactly as an add's are.
function emitPaste() {
  const row = activeRow.value
  const position = row ? (fieldOf(row.original, 'allow_children') === false ? 'after' : 'child') : null
  if (row && position === 'child' && !filtering.value) row.toggleExpanded(true)
  const held = clipboardKeys.value
  refocus =
    props.state.clipboard?.mode === 'cut'
      ? { key: held[0] }
      : { pasted: new Set(table.getCoreRowModel().flatRows.map((candidate) => candidate.id)) }
  props.emitEvent('paste', { anchorKey: row?.id ?? null, position })
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
    case 'rename':
      // One row at a time, so it follows the active row rather than the selection.
      return activeRow.value !== null
    case 'delete':
    case 'cut':
    case 'copy':
      return selectionBatch().length > 0
    case 'paste':
      // Whether there is anywhere to put it is never in doubt: a row that refuses
      // children is pasted next to instead of into, and no active row at all means
      // root level. Only an empty clipboard disables this.
      return clipboardKeys.value.length > 0
    case 'undo':
      // Python holds the history, so what is available is something it reports
      // rather than something the browser counts for itself.
      return props.state.canUndo === true
    case 'redo':
      return props.state.canRedo === true
    case 'move-up':
    case 'move-down':
      // A sorted view computes the order inside every parent, so swapping two
      // siblings in the tree changes nothing anyone can see. Reparenting still
      // means what it says, which is why indent and outdent stay available.
      return !sorted.value && reorderAnchor(item.id === 'move-up' ? -1 : 1) !== null
    case 'indent': {
      // Indenting means becoming a child of the row above, so a leaf that refuses
      // children blocks it exactly as it blocks a `make-child` drop.
      const anchor = reorderAnchor(-1)
      return anchor !== null && fieldOf(anchor.original, 'allow_children') !== false
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

// `Control` is what aria-keyshortcuts has to spell, and `Ctrl` is what a keyboard
// says, so the announced name and the printed one differ on purpose.
function shortcutText(item) {
  return item.keys ? item.keys.replace('Control', 'Ctrl') : ''
}

function actionTitle(item) {
  if (!item.keys) return item.label
  return `${item.label} (${shortcutText(item)})`
}

function runAction(item) {
  if (!actionEnabled(item)) return
  switch (item.id) {
    case 'new-folder':
    case 'new-file':
      emitAdd(item)
      break
    case 'rename':
      startEdit(activeRow.value.id)
      break
    case 'delete':
      emitDelete()
      break
    case 'undo':
    case 'redo':
      emitHistory(item.id)
      break
    case 'cut':
    case 'copy':
      emitClipboard(item.id)
      break
    case 'paste':
      emitPaste()
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

// The context menu. Opt in through `options.menu`, and a second route to the
// actions rather than a second set of them, so what it can do is what the toolbar
// could.
//
// It opens on a right click, the gesture a file manager uses, and from the
// keyboard on `ContextMenu` or `Shift+F10`, because a menu only a mouse can open
// is the hole this panel exists to avoid. The left button opens nothing: it
// selects and it drags, and a menu appearing in the middle of either is in the
// way.
const MENU_MARGIN = 4

const menuOpen = ref(false)
const menuKey = ref(null)
const menuAt = ref({ left: 0, top: 0 })
const menuElement = ref(null)
const menuFocusIndex = ref(0)
const menuElements = new Map()

const menuButtons = computed(() => menuItems.value.filter((item) => item.id in ACTIONS))
// A list of nothing but separators is not a menu, so opening one is refused
// rather than putting an empty box under the pointer.
const hasMenu = computed(() => menuButtons.value.length > 0)
const menuLabel = computed(() => props.state.options.menu_label ?? 'Row actions')

function setMenuElement(uid, element) {
  if (element) menuElements.set(uid, element)
  else menuElements.delete(uid)
}

function menuIndexOf(item) {
  return menuButtons.value.findIndex((candidate) => candidate.uid === item.uid)
}

// The row is activated first whatever opened the menu, because every action reads
// the active row and running one against a row nobody pointed at would be worse
// than not opening at all. A row already in the selection keeps it, so a menu
// opened on one of five selected rows still deletes five.
function openContextMenu(row, left, top) {
  if (!hasMenu.value) return
  // Only when it is not already the active row, so a menu opened by the very
  // click that cleared the selection does not paint the row again.
  if (activeKey.value !== row.id) setActive(row.id)
  menuKey.value = row.id
  menuAt.value = { left, top }
  const first = menuButtons.value.findIndex((item) => actionEnabled(item))
  menuFocusIndex.value = Math.max(0, first)
  menuOpen.value = true
  nextTick(placeMenu)
}

// The platform's own gesture. The row is taken alone when it was not selected,
// and a right click inside a selection leaves that selection whole, which is what
// makes a menu opened on one of five selected rows still delete five.
function onRowContextMenu(row, event) {
  if (!hasMenu.value) return
  event.preventDefault()
  if (selectable.value && !row.getIsSelected()) selectOnly(row)
  openContextMenu(row, event.clientX, event.clientY)
}

// From the keyboard there is no pointer to place it at, so it hangs off the row
// itself, which is where a reader's attention already is.
function openMenuForFocusedRow(row) {
  const rect = rowElements.get(row.id)?.getBoundingClientRect()
  openContextMenu(row, rect ? rect.left + indentPx.value : MENU_MARGIN, rect ? rect.bottom : MENU_MARGIN)
}

// Placed against the viewport rather than the panel, and `position: fixed` so the
// grid's own scroll box cannot clip it: a row near the bottom of a small window
// would otherwise open a menu nobody can read. It flips to the other side where
// there is room, clamps to the edge where there is not, and scrolls inside itself
// when it is taller than the window.
function placeMenu() {
  const element = menuElement.value
  if (!element) return
  const rect = element.getBoundingClientRect()
  let { left, top } = menuAt.value
  if (left + rect.width > window.innerWidth - MENU_MARGIN) {
    left = Math.max(MENU_MARGIN, left - rect.width)
  }
  if (top + rect.height > window.innerHeight - MENU_MARGIN) {
    top = Math.max(MENU_MARGIN, top - rect.height)
  }
  menuAt.value = { left, top }
  focusMenu(menuFocusIndex.value)
}

function focusMenu(index) {
  const list = menuButtons.value
  if (list.length === 0) return
  const next = Math.max(0, Math.min(index, list.length - 1))
  menuFocusIndex.value = next
  nextTick(() => menuElements.get(list[next].uid)?.focus())
}

// Focus goes back where it came from, because a menu that leaves focus on the
// document body is a keyboard dead end. `preventScroll` is for the cases where
// the menu is closing precisely because the view moved.
function closeMenu(restore = true, focusOptions = undefined) {
  if (!menuOpen.value) return
  const key = menuKey.value
  menuOpen.value = false
  menuKey.value = null
  // The row's own focus handler makes it active again, so closing does not have to
  // say so itself and a row left quiet by a deselect stays quiet.
  if (restore && key != null) nextTick(() => rowElements.get(key)?.focus(focusOptions))
}

function runMenuItem(item) {
  if (!actionEnabled(item)) return
  const key = menuKey.value
  closeMenu(false)
  // The row is focused before the action runs, so an action that moves focus of
  // its own, the rename editor or the row a delete leaves behind, still has the
  // last word on where it lands.
  focusRowByKey(key)
  runAction(item)
}

function onMenuKeydown(event) {
  const index = menuFocusIndex.value
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusMenu(index + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusMenu(index - 1)
      break
    case 'Home':
      event.preventDefault()
      focusMenu(0)
      break
    case 'End':
      event.preventDefault()
      focusMenu(menuButtons.value.length - 1)
      break
    case 'Escape':
    case 'Tab':
      // Tab closes rather than tabbing through the items: the menu is one stop,
      // and its own arrow keys are how it is walked.
      event.preventDefault()
      closeMenu()
      break
    default:
      break
  }
}

// `composedPath` rather than `contains`: the panel renders inside a shadow root,
// so a plain target check would see the host and close the menu on its own click.
function onDocumentPointerDown(event) {
  if (menuElement.value && event.composedPath().includes(menuElement.value)) return
  closeMenu(false)
}

function onViewportChange() {
  closeMenu(true, { preventScroll: true })
}

watch(menuOpen, (open) => {
  if (open) {
    document.addEventListener('pointerdown', onDocumentPointerDown, true)
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
  } else {
    document.removeEventListener('pointerdown', onDocumentPointerDown, true)
    window.removeEventListener('resize', onViewportChange)
    window.removeEventListener('scroll', onViewportChange, true)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
  window.removeEventListener('resize', onViewportChange)
  window.removeEventListener('scroll', onViewportChange, true)
})

// Drag and drop. A drop never mutates the tree here: it emits a `move` intent
// and Python rewrites `source`. Blocking every instruction type is how an
// invalid target (itself, or one of its own descendants) is expressed, because
// the hitbox turns a blocked type into `instruction-blocked` and that renders as
// a no-drop state instead of silently doing nothing.
//
// pdnd only ever sees the outermost shadow host, for the reasons `dnd_host.js`
// sets out, so a row is not something it can be told about and neither is this
// table once a second one shares the layout. One registration per host lives
// there and dispatches to whichever pane the pointer is over; everything below
// is this pane's half of that, with the row resolved from the pointer position.
const AUTO_EXPAND_MS = 500
const ALL_INSTRUCTIONS = ['reorder-above', 'reorder-below', 'make-child', 'reparent']

const dndEnabled = computed(() => props.state.options.enable_dnd === true)

// Cross-pane drag and drop. Two tables naming the same group accept each other's
// rows; a table naming none accepts nothing from outside itself, which is what
// keeps two unrelated tables on one page unrelated. The drag carries the group,
// the pane it started in and the keys, and never the nodes: Python reads those
// out of the other table, because a browser that could hand Python a node could
// hand it any node.
const transferGroup = computed(() => String(props.state.options.transfer_group || ''))
const tableId = computed(() => String(props.state.tableId || ''))

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
//
// A foreign drag is never dropped into itself, because the keys it carries name
// nodes in another tree. Two panes may well both hold an `a1`, so testing them
// against these rows would block a perfectly good drop.
//
// A sorted view blocks the two reorder instructions for the reason move-up and
// move-down are disabled with it: position inside a parent is computed, so "put
// this after that" has no outcome the user can see and the row would land back
// where the sort puts it. `reparent` survives, because changing the parent is a
// real change whatever the order is.
function blockedInstructions(row, sourceKeys, foreign) {
  if (!foreign && isSelfOrDescendant(row, sourceKeys)) return ALL_INSTRUCTIONS
  const blocked = sorted.value ? ['reorder-above', 'reorder-below'] : []
  if (fieldOf(row.original, 'allow_children') === false) blocked.push('make-child')
  return blocked
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

// The checkbox, the twisty and the open title editor are the controls inside a row.
// `draggable` is registered on the host, so without this a press on any of them
// starts a drag and the click that would have toggled it never lands, which is what
// made checkbox selection and drag and drop mutually exclusive. For the editor it is
// what lets the caret be placed with the mouse.
function onRowControl(hit, input) {
  const selector = '.pnl-tst-check, .pnl-tst-twisty, .pnl-tst-edit'
  for (const control of hit.element.querySelectorAll(selector)) {
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

// This pane's half of the host registration in `dnd_host.js`. Every method
// answers for this table alone, and the ones taking an `input` return null when
// the pointer is somewhere else, which is how the host picks the pane to ask.
const dndPane = {
  id: () => tableId.value,

  // Anything outside a row (the header, the empty space below the last row) is
  // not a drag handle, and neither is a row control.
  canDragFrom(input) {
    const hit = rowAt(input)
    return hit !== null && !onRowControl(hit, input)
  },

  dragData(input) {
    const hit = rowAt(input)
    if (!hit) return null
    return {
      type: DND_TYPE,
      group: transferGroup.value,
      sourceId: tableId.value,
      key: hit.row.id,
      keys: dragKeysFor(hit.row),
    }
  },

  // The registered element is the host, so the default preview would be a
  // snapshot of the whole layout. Point it at the row being dragged, offset so
  // the preview stays under the cursor where it was grabbed.
  preview(input, nativeSetDragImage) {
    const hit = rowAt(input)
    if (!hit) return false
    nativeSetDragImage(hit.element, input.clientX - hit.rect.left, input.clientY - hit.rect.top)
    return true
  },

  setDragging(keys) {
    draggingKeys.value = keys
  },

  // Our own rows always. Another pane's only when both name the same group, so a
  // table that opted into nothing shows no drop state at all rather than
  // accepting a drag Python is bound to reject.
  dropData(input, drag) {
    const hit = rowAt(input)
    if (!hit) return null
    const foreign = drag.sourceId !== tableId.value
    if (foreign && !(transferGroup.value && drag.group === transferGroup.value)) {
      return { type: DND_TYPE, key: null, paneId: tableId.value }
    }
    const data = { type: DND_TYPE, key: hit.row.id, paneId: tableId.value }
    return attachInstruction(data, {
      element: hit.element,
      input,
      currentLevel: hit.row.depth,
      indentPerLevel: indentPx.value,
      mode: itemMode(hit.row),
      block: blockedInstructions(hit.row, drag.keys ?? [], foreign),
    })
  },

  showDrop(key, instruction) {
    dropTarget.value = { key, instruction }
    scheduleAutoExpand(key, instruction)
  },

  clearDrop: clearDropTarget,

  drop(drag, key, instruction, input) {
    const keys = drag.keys ?? []
    if (keys.length === 0) return
    const placement = {
      targetKey: key,
      instruction: instruction.type,
      desiredLevel: instruction.desiredLevel ?? instruction.currentLevel,
    }
    if (drag.sourceId === tableId.value) {
      if (keys.includes(key)) return
      props.emitEvent('move', { key: drag.key, keys, ...placement })
      return
    }
    // The rows are in another pane, so their keys mean nothing here and the
    // arrivals are found by diffing the tree, exactly as a pasted copy's are.
    // Ctrl or Alt held at the drop copies rather than moves, which is the
    // modifier a file manager uses on each platform.
    refocus = { pasted: new Set(table.getCoreRowModel().flatRows.map((row) => row.id)) }
    props.emitEvent('transfer', {
      keys,
      sourceId: drag.sourceId,
      copy: Boolean(input?.ctrlKey || input?.altKey),
      ...placement,
    })
  },
}

let dndCleanup = null

// Joined on mount and rejoined when `enable_dnd` flips, so a disabled table takes
// no part in a drag over the layout it shares.
function registerDnd() {
  dndCleanup?.()
  dndCleanup = null

  const host = dndHost()
  if (!host || !dndEnabled.value) return
  dndCleanup = joinDndHost(host, dndPane)
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

// A class named by the node or by its type, which is how a kind of row is made
// visible without an icon. The panel ships no styling for it: naming a class is
// the application saying it has its own.
function nodeClass(row) {
  const value = fieldOf(row.original, 'class')
  return typeof value === 'string' ? value : null
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
      :class="{ 'pnl-tst-grid--resizing': resizingId !== null }"
      role="treegrid"
      :aria-label="ariaLabel"
      :aria-colcount="headers.length"
      :aria-rowcount="ariaRowCount"
      :style="columnVars"
      @keydown="onKeydown"
    >
      <div v-if="hasColumns" class="pnl-tst-head" role="rowgroup">
        <div class="pnl-tst-hrow" role="row" :aria-rowindex="1">
          <div
            v-for="(header, index) in headers"
            :key="header.id"
            :ref="(element) => setHeaderElement(header.column.id, element)"
            class="pnl-tst-hcell"
            :class="{ 'pnl-tst-hcell--sortable': canSort(header) }"
            role="columnheader"
            :aria-colindex="index + 1"
            :aria-sort="ariaSort(header)"
            :aria-keyshortcuts="canResize(header) ? 'Alt+ArrowLeft Alt+ArrowRight Alt+Home' : undefined"
            :tabindex="headerActive && header.column.id === headerFocusKey ? 0 : -1"
            :style="cellStyle(index)"
            @click="onHeaderClick(header)"
            @focus="headerFocusId = header.column.id"
            @keydown="onHeaderKeydown(header, $event)"
          >
            <span class="pnl-tst-hlabel">{{ header.column.columnDef.header }}</span>
            <!-- Decorative: the direction is already on the header as aria-sort,
                 so announcing it again here would say it twice. -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span
              v-if="sortIcon(header)"
              class="pnl-tst-sortind"
              aria-hidden="true"
              v-html="sortIcon(header)"
            ></span>
            <!-- A mouse target and nothing else: the keyboard resizes from the
                 header itself, which is why this is hidden rather than made a
                 focusable separator that every arrow press would have to walk
                 past. The click is stopped so a resize never also sorts. -->
            <span
              v-if="canResize(header)"
              class="pnl-tst-resize"
              :class="{ 'pnl-tst-resize--active': resizingId === header.column.id }"
              aria-hidden="true"
              @click.stop
              @dblclick.stop="resetSize(header)"
              @mousedown="onResizeStart(header, $event)"
              @touchstart="onResizeStart(header, $event)"
            ></span>
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
            nodeClass(row),
            {
              'pnl-tst-row--active': activeShown && row.id === activeKey,
              'pnl-tst-row--quiet': !activeShown && row.id === activeKey,
              'pnl-tst-row--cut': cutRowKeys.has(row.id),
            },
          ]"
          role="row"
          :aria-level="row.depth + 1"
          :aria-posinset="posInSet(row)"
          :aria-setsize="setSize(row)"
          :aria-rowindex="rowIndex + rowIndexOffset"
          :aria-expanded="canExpand(row) ? isExpanded(row) : undefined"
          :aria-selected="selectable ? row.getIsSelected() : undefined"
          :aria-haspopup="hasMenu ? 'menu' : undefined"
          :tabindex="!headerActive && row.id === focusKey ? 0 : -1"
          @click="onRowClick(row, $event)"
          @contextmenu="onRowContextMenu(row, $event)"
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
            :style="cellIndex === 0 ? treeCellStyle(row) : cellStyle(cellIndex)"
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
            <!-- The editor sits inside the tree gridcell, so the treegrid structure
                 is exactly what it was while a title is being typed. Blur commits,
                 which is what makes clicking away the same answer as Enter. -->
            <input
              v-if="cellIndex === 0 && editingKey === row.id"
              :ref="(element) => (editInput = element)"
              class="pnl-tst-edit"
              type="text"
              :value="editText"
              :aria-label="`Rename ${row.original.title ?? row.id}`"
              @input="editText = $event.target.value"
              @click.stop
              @keydown.stop="onEditKeydown(row, $event)"
              @blur="commitEdit(row)"
            />
            <span v-else class="pnl-tst-value">{{ cell.getValue() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- The file type warning, in the wording a file manager uses. An alertdialog
         rather than a note beside the row, because the answer decides whether the
         rename is sent at all, and it covers the panel rather than the page: a
         table is a component in someone else's app and has no business putting a
         dialog over the rest of it. -->
    <div v-if="confirmRename" class="pnl-tst-modal">
      <div
        class="pnl-tst-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-label="Rename"
        aria-describedby="pnl-tst-confirm-message"
        @keydown="onConfirmKeydown"
      >
        <!-- Both names, because a dialog that only says a file type changed leaves
             the reader to remember what they typed. -->
        <p id="pnl-tst-confirm-message" class="pnl-tst-dialog-message">
          Rename {{ confirmRename.previous }} to {{ confirmRename.title }}? If you change a
          file name extension, the file might become unusable.
        </p>
        <div class="pnl-tst-dialog-actions">
          <button
            ref="confirmYesButton"
            type="button"
            class="pnl-tst-dbtn"
            aria-keyshortcuts="Y"
            @click="acceptRename"
          >
            <!-- The initial is underlined rather than only announced, so the
                 shortcut is visible to everyone who is not using a reader. -->
            <span class="pnl-tst-dkey">Y</span>es
          </button>
          <!-- Focused on open. A warning defaults to the answer that changes
               nothing, so a reflexive Enter keeps the file working. -->
          <button
            ref="confirmNoButton"
            type="button"
            class="pnl-tst-dbtn"
            aria-keyshortcuts="N"
            @click="declineRename"
          >
            <span class="pnl-tst-dkey">N</span>o
          </button>
        </div>
      </div>
    </div>

    <!-- The context menu. A sibling of the grid rather than a child of the row, and
         placed against the viewport, so the grid's own scroll box cannot clip it
         and it may run past the panel's edge when that is what keeps it readable.
         It carries its own single tab stop, walked with the arrow keys. -->
    <div
      v-if="menuOpen"
      ref="menuElement"
      class="pnl-tst-menu"
      role="menu"
      aria-orientation="vertical"
      :aria-label="menuLabel"
      :style="{ left: `${menuAt.left}px`, top: `${menuAt.top}px` }"
      @keydown="onMenuKeydown"
    >
      <template v-for="item in menuItems" :key="item.uid">
        <div v-if="item.id === '|'" class="pnl-tst-msep" role="separator"></div>

        <button
          v-else
          :ref="(element) => setMenuElement(item.uid, element)"
          type="button"
          class="pnl-tst-mitem"
          role="menuitem"
          :aria-keyshortcuts="item.keys"
          :aria-disabled="!actionEnabled(item)"
          :tabindex="menuIndexOf(item) === menuFocusIndex ? 0 : -1"
          @click="runMenuItem(item)"
          @focus="menuFocusIndex = menuIndexOf(item)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="pnl-tst-icon" aria-hidden="true" v-html="item.icon"></span>
          <span class="pnl-tst-mlabel">{{ item.label }}</span>
          <!-- The shortcut is on aria-keyshortcuts already, so this is the
               visible half of the same fact and nothing new to announce. -->
          <span v-if="item.keys" class="pnl-tst-mkeys" aria-hidden="true">
            {{ shortcutText(item) }}
          </span>
        </button>
      </template>
    </div>
  </div>
</template>
