import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/adapter/drop-target-for-external'
import { monitorForExternal } from '@atlaskit/pragmatic-drag-and-drop/adapter/monitor-for-external'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled'
import { containsFiles } from '@atlaskit/pragmatic-drag-and-drop/utils/contains-files'
import { getFiles } from '@atlaskit/pragmatic-drag-and-drop/utils/get-files'
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
 *
 * The external adapter is bound on `window` rather than `document` and resolves
 * its target through the same walk, so a file dragged in from the desktop has the
 * same problem and takes the same answer: a third registration on the host, given
 * out to the pane under the pointer.
 */
const HOSTS = new Map()

export const DND_TYPE = 'pnl-tst-row'
export const FILE_TYPE = 'pnl-tst-file'

/**
 * The row `getData` named, and the pane holding it.
 *
 * Both adapters resolve one the same way, so this is shared to keep the external
 * adapter from drifting from the element one. A blocked instruction is still a
 * target: it is what the row draws the no-drop affordance from, and refusing it
 * here would mean a drag that shows nothing at all over a row it cannot land on.
 */
function targetFor(entry, data) {
  const instruction = extractInstruction(data)
  if (!data.key || !instruction) return null
  const pane = entry.panes.find((candidate) => candidate.id() === data.paneId)
  return pane ? { pane, key: data.key, instruction } : null
}

/** The same target, once a release has to actually land somewhere. */
function dropTargetFor(entry, data) {
  const target = targetFor(entry, data)
  return target && target.instruction.type !== 'instruction-blocked' ? target : null
}

function showDropOn(entry, data) {
  const target = targetFor(entry, data)
  for (const pane of entry.panes) {
    if (target && pane === target.pane) pane.showDrop(target.key, target.instruction)
    else pane.clearDrop()
  }
}

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
      onDrag: ({ self }) => showDropOn(entry, self.data),
      onDragLeave: () => {
        for (const pane of entry.panes) pane.clearDrop()
      },
      onDrop: ({ self, source, location }) => {
        for (const pane of entry.panes) pane.clearDrop()
        const target = dropTargetFor(entry, self.data)
        target?.pane.drop(source.data, target.key, target.instruction, location.current.input)
      },
    }),
    // Files dragged in from the desktop. A third registration rather than a
    // branch inside the second, because the two adapters carry different payloads
    // and pdnd keeps them apart on purpose: an external drag has no source
    // element, no preview to generate and no drag start inside the window.
    dropTargetForExternal({
      element: host,
      // Text, links and HTML dragged in are somebody else's business. Files are
      // the only external kind this panel has anything to say about, and the same
      // reasoning as above applies: which pane, and whether it takes files at
      // all, is decided in `getData` because that runs on every move.
      canDrop: ({ source }) => containsFiles({ source }),
      getData: ({ input }) => {
        for (const pane of entry.panes) {
          const data = pane.externalDropData(input)
          if (data) return data
        }
        return { type: FILE_TYPE, key: null, paneId: '' }
      },
      onDrag: ({ self }) => showDropOn(entry, self.data),
      onDragLeave: () => {
        for (const pane of entry.panes) pane.clearDrop()
      },
      onDrop: ({ self, source }) => {
        for (const pane of entry.panes) pane.clearDrop()
        const target = dropTargetFor(entry, self.data)
        // Read synchronously: the browser neuters the `DataTransfer` the moment
        // this handler returns, so the `File` handles have to be taken now even
        // though reading their bytes happens later.
        target?.pane.dropFiles(getFiles({ source }), target.key, target.instruction)
      },
    }),
    // A file dropped anywhere the panel does not claim makes the browser navigate
    // to it, which throws the Panel session away without asking. pdnd blocks that
    // for the rest of the drag, and only while a table on the page is one that
    // would have taken the file: a page that opted into nothing keeps whatever
    // behaviour it had.
    monitorForExternal({
      canMonitor: ({ source }) => containsFiles({ source }),
      onDragStart: () => {
        if (entry.panes.some((pane) => pane.acceptsFiles())) preventUnhandled.start()
      },
      onDrop: () => preventUnhandled.stop(),
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
