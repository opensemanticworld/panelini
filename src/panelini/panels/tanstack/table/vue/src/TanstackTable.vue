<script setup>
import { computed, ref, watch } from 'vue'
import {
  createCoreRowModel,
  createExpandedRowModel,
  rowExpandingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'

const props = defineProps({
  // Python-owned state. The component reads it and never writes it back.
  state: { type: Object, required: true },
  // JS to Python channel. Emits intent only, never a mutated tree.
  emitEvent: { type: Function, required: true },
  // Two-way, set-semantics sync of the expanded key list.
  setExpandedKeys: { type: Function, required: true },
})

// Built once, outside the table instance: the adapter injects
// `coreReactivityFeature` itself, so only the opt-in features are listed here.
const features = tableFeatures({
  rowExpandingFeature,
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
  if (record === true) return []
  return Object.keys(record)
    .filter((key) => record[key])
    .sort()
}

function sameKeys(a, b) {
  if (a.length !== b.length) return false
  return a.every((key, index) => key === b[index])
}

const table = useTable({
  features,
  data: computed(() => props.state.source || []),
  columns: columnDefs,
  getRowId: (row) => row.key,
  getSubRows: (row) => row.children,
  state: computed(() => ({ expanded: expanded.value })),
  onExpandedChange: (updater) => {
    expanded.value = typeof updater === 'function' ? updater(expanded.value) : updater
    props.setExpandedKeys(recordToKeys(expanded.value))
  },
})

// Python to JS. Applied only when the incoming set actually differs, so an echo
// of a JS-originated change terminates instead of looping.
watch(
  () => props.state.expandedKeys,
  (keys) => {
    if (sameKeys(recordToKeys(expanded.value), [...(keys || [])].sort())) return
    expanded.value = keysToRecord(keys)
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

function cellStyle(columnDef) {
  const width = columnDef.meta?.width
  return width ? { flex: `0 0 ${width}px` } : { flex: '1 1 0' }
}

function treeCellStyle(row, columnDef) {
  return { ...cellStyle(columnDef), paddingInlineStart: `${row.depth * indentPx.value}px` }
}

function onRowClick(row) {
  props.emitEvent('activate', { key: row.id })
}

function onToggle(row) {
  row.toggleExpanded()
}
</script>

<template>
  <div class="pnl-tst">
    <div v-if="hasColumns" class="pnl-tst-head">
      <div
        v-for="header in headers"
        :key="header.id"
        class="pnl-tst-hcell"
        :style="cellStyle(header.column.columnDef)"
      >
        {{ header.column.columnDef.header }}
      </div>
    </div>

    <div class="pnl-tst-body">
      <div v-if="rows.length === 0" class="pnl-tst-empty">No data</div>
      <div v-for="row in rows" :key="row.id" class="pnl-tst-row" @click="onRowClick(row)">
        <div
          v-for="(cell, index) in row.getAllCells()"
          :key="cell.id"
          class="pnl-tst-cell"
          :class="{ 'pnl-tst-cell--tree': index === 0 }"
          :style="index === 0 ? treeCellStyle(row, cell.column.columnDef) : cellStyle(cell.column.columnDef)"
        >
          <template v-if="index === 0">
            <span
              v-if="row.getCanExpand()"
              class="pnl-tst-twisty"
              :class="{ 'pnl-tst-twisty--open': row.getIsExpanded() }"
              @click.stop="onToggle(row)"
            >
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </span>
            <span v-else class="pnl-tst-twisty pnl-tst-twisty--leaf"></span>
          </template>
          <span class="pnl-tst-value">{{ cell.getValue() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
