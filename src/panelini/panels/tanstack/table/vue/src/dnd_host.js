import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { extractInstruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item'

/**
 * One pdnd registration per outermost shadow host, shared by every table under it.
 *
 * Both pdnd adapters resolve their element from `event.target` of listeners bound
 * on `document`: the draggable adapter looks the target up in a WeakMap, the drop
 * target adapter runs `target.closest('[data-drop-target-for-element]')`. Panel
 * renders every component into a nested Bokeh shadow root, and retargeting
 * rewrites that target to the outermost host, so that host is the only element
 * pdnd can ever see. Rows are invisible to it, and so is a panel's own element
 * once a second panel shares the layout.
 *
 * A table therefore cannot own its own registration. Two tables side by side are
 * two calls to `draggable({element: host})` naming the same host, and the second
 * replaces the first: the surviving one resolves rows against its own grid alone,
 * finds none under a pointer held over its neighbour, and cancels the drag before
 * it starts. That is why dragging between two panes did nothing at all rather
 * than doing something wrong.
 *
 * The host registers once here instead, and every callback dispatches to the pane
 * the pointer is actually over. Panel loads this module once per page and calls
 * `render` once per component, so the registry below is shared by every table in
 * an app without going anywhere near `window`.
 */
const HOSTS = new Map()

export const DND_TYPE = 'pnl-tst-row'

function registerHost(host, entry) {
  return combine(
    draggable({
      element: host,
      // Anything outside a row (the header, the empty space below the last row,
      // a row control) is not a drag handle, and returning false cancels the
      // native drag. With several panes that answer has to come from the pane the
      // pointer is over and never from the others, since a neighbour cancelling
      // cancels the drag for everyone.
      canDrag: ({ input }) => entry.panes.some((pane) => pane.canDragFrom(input)),
      getInitialData: ({ input }) => {
        for (const pane of entry.panes) {
          const data = pane.dragData(input)
          if (data) return data
        }
        return { type: DND_TYPE, group: '', sourceId: '', key: null, keys: [] }
      },
      onGenerateDragPreview: ({ location, nativeSetDragImage }) => {
        if (!nativeSetDragImage) return
        const input = location.current.input
        for (const pane of entry.panes) {
          if (pane.preview(input, nativeSetDragImage)) return
        }
      },
      onDragStart: ({ source }) => {
        for (const pane of entry.panes) {
          pane.setDragging(pane.id() === source.data.sourceId ? (source.data.keys ?? []) : [])
        }
      },
      onDrop: () => {
        for (const pane of entry.panes) {
          pane.setDragging([])
          pane.clearDrop()
        }
      },
    }),
    dropTargetForElements({
      element: host,
      // Position is deliberately not consulted here. pdnd settles `canDrop` when
      // the pointer enters the element, and the element is the whole layout, so an
      // answer given from the pointer's first position would stand for the rest of
      // the drag. Which pane the pointer is over, and whether that pane accepts
      // the drag at all, is decided in `getData`, which runs on every move.
      canDrop: ({ source }) => source.data.type === DND_TYPE,
      getData: ({ input, source }) => {
        for (const pane of entry.panes) {
          const data = pane.dropData(input, source.data)
          if (data) return data
        }
        return { type: DND_TYPE, key: null, paneId: '' }
      },
      onDrag: ({ self }) => {
        const key = self.data.key
        const instruction = extractInstruction(self.data)
        for (const pane of entry.panes) {
          if (pane.id() === self.data.paneId && key && instruction) pane.showDrop(key, instruction)
          else pane.clearDrop()
        }
      },
      onDragLeave: () => {
        for (const pane of entry.panes) pane.clearDrop()
      },
      onDrop: ({ self, source, location }) => {
        for (const pane of entry.panes) pane.clearDrop()
        const target = entry.panes.find((pane) => pane.id() === self.data.paneId)
        const key = self.data.key
        const instruction = extractInstruction(self.data)
        if (!target || !key || !instruction || instruction.type === 'instruction-blocked') return
        target.drop(source.data, key, instruction, location.current.input)
      },
    }),
  )
}

/**
 * Add a table to its host's registration, registering the host on first use.
 *
 * Returns the function that takes it out again, which unregisters the host once
 * the last table under it has gone.
 */
export function joinDndHost(host, pane) {
  let entry = HOSTS.get(host)
  if (!entry) {
    entry = { panes: [] }
    entry.cleanup = registerHost(host, entry)
    HOSTS.set(host, entry)
  }
  entry.panes.push(pane)

  return () => {
    entry.panes = entry.panes.filter((candidate) => candidate !== pane)
    if (entry.panes.length > 0) return
    entry.cleanup?.()
    HOSTS.delete(host)
  }
}
