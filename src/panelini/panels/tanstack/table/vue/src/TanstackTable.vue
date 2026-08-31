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

const props = defineProps({
  // Python-owned state. The component reads it and never writes it back.
  state: { type: Object, required: true },
  // JS to Python channel. Emits intent only, never a mutated tree.
  emitEvent: { type: Function, required: true },
  // Two-way, set-semantics sync of the expanded key list.
  setExpandedKeys: { type: Function, required: true },
  // Two-way, set-semantics sync of the selected key list.
  setSelectedKeys: { type: Function, required: true },
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

function sameKeys(a, b) {
  if (a.length !== b.length) return false
  return a.every((key, index) => key === b[index])
}

// select_mode drives the whole selection behaviour:
//   none      no checkbox column at all
//   single    one row at a time, no cascade
//   multi     independent checkboxes, no cascade
//   hierarchy checking a parent cascades down, unchecking a child prunes ancestors
const selectMode = computed(() => props.state.options.select_mode ?? 'none')
const selectable = computed(() => selectMode.value !== 'none')
const cascades = computed(() => selectMode.value === 'hierarchy')

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
    props.setSelectedKeys(recordToKeys(rowSelection.value))
  },
})

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

const rows = computed(() => table.getRowModel().rows)
const headers = computed(() => table.getHeaderGroups()[0]?.headers ?? [])
const indentPx = computed(() => props.state.options.indent_px ?? 16)
const ariaLabel = computed(() => props.state.options.aria_label ?? 'Tree table')

// The header occupies aria row 1 when columns are shown, so body rows start at 2.
const rowIndexOffset = computed(() => (hasColumns.value ? 2 : 1))
const ariaRowCount = computed(() => rows.value.length + (hasColumns.value ? 1 : 0))

// aria-setsize is the sibling count: the parent's children, or the root count.
function setSize(row) {
  const parent = row.getParentRow()
  return parent ? parent.subRows.length : table.getCoreRowModel().rows.length
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
const rowElements = new Map()

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
  activeKey.value = key
  nextTick(() => rowElements.get(key)?.focus())
}

function focusRowByIndex(index) {
  const list = rows.value
  if (list.length === 0) return
  focusRowByKey(list[Math.max(0, Math.min(index, list.length - 1))].id)
}

function onKeydown(event) {
  const list = rows.value
  if (list.length === 0) return
  const index = Math.max(
    0,
    list.findIndex((row) => row.id === focusKey.value),
  )
  const row = list[index]

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusRowByIndex(index + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusRowByIndex(index - 1)
      break
    case 'ArrowRight':
      // Expand a closed branch, otherwise step into it. Leaves do nothing.
      event.preventDefault()
      if (!row.getCanExpand()) break
      if (row.getIsExpanded()) focusRowByIndex(index + 1)
      else {
        row.toggleExpanded(true)
        focusRowByKey(row.id)
      }
      break
    case 'ArrowLeft':
      // Collapse an open branch, otherwise step out to the parent.
      event.preventDefault()
      if (row.getCanExpand() && row.getIsExpanded()) {
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
      if (!selectable.value) break
      event.preventDefault()
      toggleSelected(row)
      break
    default:
      break
  }
}

function onRowClick(row) {
  activeKey.value = row.id
  props.emitEvent('activate', { key: row.id })
}

function onToggle(row) {
  activeKey.value = row.id
  row.toggleExpanded()
}

// Tri-state: checked when the row itself is selected, mixed when only part of
// its subtree is. `deselectParents` stops a parent staying checked after one of
// its children is unchecked.
function isIndeterminate(row) {
  return !row.getIsSelected() && row.getIsSomeSelected()
}

function toggleSelected(row) {
  activeKey.value = row.id
  row.toggleSelected(undefined, {
    selectChildren: cascades.value,
    deselectParents: cascades.value,
  })
}

function onCheckboxClick(row) {
  toggleSelected(row)
  focusRowByKey(row.id)
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
const draggingKey = ref(null)
// The one row currently under the pointer, plus the instruction it resolved to.
const dropTarget = ref(null)

function rowByKey(key) {
  return rows.value.find((row) => row.id === key) ?? null
}

function isSelfOrDescendant(row, key) {
  let cursor = row
  while (cursor) {
    if (cursor.id === key) return true
    cursor = cursor.getParentRow()
  }
  return false
}

// The hitbox needs to know where a row sits so it can offer `make-child` on an
// open branch and `reparent` on the last row of a group.
function itemMode(row) {
  if (row.getCanExpand() && row.getIsExpanded()) return 'expanded'
  const parent = row.getParentRow()
  const siblings = parent ? parent.subRows : table.getCoreRowModel().rows
  return row.index === siblings.length - 1 ? 'last-in-group' : 'standard'
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
      canDrag: ({ input }) => rowAt(input) !== null,
      getInitialData: ({ input }) => ({ type: DND_TYPE, key: rowAt(input)?.row.id ?? null }),
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
        draggingKey.value = source.data.key
      },
      onDrop: () => {
        draggingKey.value = null
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
        const blocked = isSelfOrDescendant(hit.row, source.data.key)
        return attachInstruction(data, {
          element: hit.element,
          input,
          currentLevel: hit.row.depth,
          indentPerLevel: indentPx.value,
          mode: itemMode(hit.row),
          block: blocked ? ALL_INSTRUCTIONS : [],
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
        if (key === source.data.key) return
        props.emitEvent('move', {
          key: source.data.key,
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
    'pnl-tst-row--dragging': draggingKey.value === row.id,
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
    <div v-if="rows.length === 0" class="pnl-tst-empty">No data</div>

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
          :class="rowDndClass(row)"
          role="row"
          :aria-level="row.depth + 1"
          :aria-posinset="row.index + 1"
          :aria-setsize="setSize(row)"
          :aria-rowindex="rowIndex + rowIndexOffset"
          :aria-expanded="row.getCanExpand() ? row.getIsExpanded() : undefined"
          :aria-selected="selectable ? row.getIsSelected() : undefined"
          :tabindex="row.id === focusKey ? 0 : -1"
          @click="onRowClick(row)"
          @focus="activeKey = row.id"
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
                v-if="row.getCanExpand()"
                class="pnl-tst-twisty"
                :class="{ 'pnl-tst-twisty--open': row.getIsExpanded() }"
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
                v-if="selectable"
                class="pnl-tst-check"
                type="checkbox"
                tabindex="-1"
                :checked="row.getIsSelected()"
                :indeterminate.prop="isIndeterminate(row)"
                :aria-label="`Select ${row.original.title ?? row.id}`"
                @click.stop="onCheckboxClick(row)"
              />
            </template>
            <span class="pnl-tst-value">{{ cell.getValue() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
