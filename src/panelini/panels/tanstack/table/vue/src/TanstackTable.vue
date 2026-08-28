<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Python-owned state. The component reads it and never writes it back.
  state: { type: Object, required: true },
  // JS to Python channel. Emits intent only, never a mutated tree.
  emitEvent: { type: Function, required: true },
})

// P1 renders a flat projection of the source tree to prove the bridge end to end.
// P2 replaces this with a TanStack row model carrying depth, expansion and cells.
function flatten(nodes, depth, out) {
  for (const node of nodes || []) {
    out.push({ key: node.key, title: node.title, depth })
    flatten(node.children, depth + 1, out)
  }
  return out
}

const rows = computed(() => flatten(props.state.source, 0, []))
const indentPx = computed(() => props.state.options.indent_px ?? 16)
</script>

<template>
  <div class="pnl-tst">
    <div v-if="rows.length === 0" class="pnl-tst-empty">No data</div>
    <div
      v-for="row in rows"
      :key="row.key"
      class="pnl-tst-row"
      :style="{ paddingInlineStart: `${row.depth * indentPx}px` }"
      @click="props.emitEvent('activate', { key: row.key })"
    >
      {{ row.title }}
    </div>
  </div>
</template>
