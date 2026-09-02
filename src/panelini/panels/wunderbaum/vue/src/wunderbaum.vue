<template>
  <div class="wunderbaum-wrapper" @click="hideContextMenu">
    <div ref="treeContainer" class="tree-container"></div>
    <div v-if="ctxVisible" ref="ctxMenu" class="wb-context-menu"
         :style="{ left: ctxX + 'px', top: ctxY + 'px' }">
      <div v-for="item in contextMenuItems" :key="item.id"
           class="wb-context-menu-item"
           @click.stop="onContextMenuItem(item.id)">
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { Wunderbaum } from "wunderbaum";

// dataTransfer MIME types for node drags. The key type is already set by
// dragStart today; the tree type is what lets a receiving tree tell which
// tree a cross-tree drag came from.
const WB_KEY_MIME = 'application/x-wunderbaum-key';
const WB_TREE_MIME = 'application/x-wunderbaum-tree';

export default {
  name: 'wunderbaum-component',

  props: {
    source: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    types: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 500
    },
    contextMenuItems: {
      type: Array,
      default: () => []  // [{id, label, icon?}] - empty = no context menu
    },
    treeId: {
      type: String,
      default: ''  // identifies this tree in cross-tree drop payloads
    }
  },

  emits: ['change:source', 'tree-event', 'file-drop', 'lazy-load', 'ready'],

  data() {
    return {
      _options: {},
      ctxVisible: false,
      ctxX: 0,
      ctxY: 0,
      ctxNodeKey: null,
      _pendingLazyResolvers: {},
    };
  },

  // Store tree as non-reactive property (Wunderbaum has internal state that breaks with Proxy)
  created() {
    this.tree = null;
    // Row a shift+click range is measured from, as in a file manager.
    this._anchorKey = null;
  },

  methods: {
    initTree() {
      const container = this.$refs.treeContainer;

      // Track the copy modifier globally - e.event.ctrlKey is unreliable in
      // DnD events. Ctrl is the copy modifier on Windows and Linux. macOS
      // Finder copies with Option and reserves Command for a forced move, so
      // Option is the pendant there. Reading the flag off every key event
      // rather than watching for one key's own keydown resyncs it on each
      // keystroke.
      const isMac = /Mac|iP(hone|ad|od)/.test(navigator.platform || navigator.userAgent || '');
      const copyHeld = (ev) => (isMac ? ev.altKey : ev.ctrlKey);
      this._copyPressed = false;
      this._onKeyDown = (ev) => { this._copyPressed = copyHeld(ev); };
      this._onKeyUp = (ev) => { this._copyPressed = copyHeld(ev); };
      document.addEventListener('keydown', this._onKeyDown, true);
      document.addEventListener('keyup', this._onKeyUp, true);
      // Also clear on window blur (user may release the key outside the window)
      this._onBlur = () => { this._copyPressed = false; };
      window.addEventListener('blur', this._onBlur);
      container.style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      container.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;

      const wbOptions = {
        element: container,
        // Deep-clone: Wunderbaum mutates source objects in-place (removes children),
        // which would corrupt the AnyWidget model's shared reference.
        source: JSON.parse(JSON.stringify(this.source)),
        types: this.types || {},
        ...this.options,

        // Event handlers
        init: (e) => {
          this.$emit('ready', true);
        },

        activate: (e) => {
          this.sendEvent('activate', {
            key: e.node.key,
            title: e.node.title,
            type: e.node.type,
            data: e.node.data || {},
          });
        },

        deactivate: (e) => {
          this.sendEvent('deactivate', {
            key: e.node.key,
          });
        },

        select: (e) => {
          this.sendEvent('select', {
            key: e.node.key,
            flag: e.flag,
          });
          // Sync selected state back to Python source
          this.emitSource();
        },

        click: (e) => {
          if (!e.node) return;
          this.sendEvent('click', {
            key: e.node.key,
            title: e.node.title,
            data: e.node.data || {},
          });
          // The expander is navigation, not selection - leave it to wunderbaum.
          if (e.info?.region === 'expander') return;
          // Everything else is Windows Explorer selection, which wunderbaum does
          // not implement: it has no shift range, a plain click never clears,
          // and a checkbox click does not reach the subtree. Returning false
          // aborts its own click handling so ours is the only one that runs.
          this.applySelectionClick(e.node, e.event, e.info || {});
          return false;
        },

        dblclick: (e) => {
          this.sendEvent('dblclick', {
            key: e.node.key,
            title: e.node.title,
            data: e.node.data || {},
          });
        },

        expand: (e) => {
          this.sendEvent('expand', {
            key: e.node.key,
            flag: e.flag,
          });
          // Sync expanded/collapsed state back to model so it survives Card re-render
          setTimeout(() => this.emitSource(), 0);
        },

        keydown: (e) => {
          // Skip modifier-only keys (Ctrl, Shift, Alt, Meta) to avoid spam
          const k = e.event?.key;
          if (k === 'Control' || k === 'Shift' || k === 'Alt' || k === 'Meta') return;
          this.sendEvent('keydown', {
            key: e.node?.key,
            eventKey: k,
          });
        },

        // Lazy loading: return a Promise that Python will resolve
        lazyLoad: (e) => {
          const nodeKey = e.node.key;
          return new Promise((resolve, reject) => {
            // Store resolver so handleLazyResponse can resolve it later
            this._pendingLazyResolvers[nodeKey] = { resolve, reject };

            // Set a timeout to reject if Python doesn't respond
            const timer = setTimeout(() => {
              if (this._pendingLazyResolvers[nodeKey]) {
                delete this._pendingLazyResolvers[nodeKey];
                reject(new Error(`Lazy load timeout for node: ${nodeKey}`));
              }
            }, 30000);

            this._pendingLazyResolvers[nodeKey].timer = timer;

            this.$emit('lazy-load', {
              key: nodeKey,
              title: e.node.title,
              data: e.node.data || {},
            });
          });
        },

        // Render event for treegrid columns
        render: (e) => {
          // Populate treegrid columns from node.data
          // (non-reserved source properties are auto-moved to node.data)
          for (const col of Object.values(e.renderColInfosById || {})) {
            if (col.id !== '*' && col.elem) {
              const val = e.node.data?.[col.id] ?? '';
              // If cell has an input/select, use setValueToElem; else set text
              const input = col.elem.querySelector('input, select');
              if (input) {
                e.util.setValueToElem(col.elem, val);
              } else {
                col.elem.textContent = val;
              }
            }
          }

          // Auto-generate YAML tooltip from node title + data
          {
            const node = e.node;
            const data = node.data || {};
            const lines = [`title: ${node.title}`];
            const nodeId = data.node_id;
            if (nodeId && nodeId !== node.title) {
              lines.push(`id: ${nodeId}`);
            }
            for (const [k, v] of Object.entries(data)) {
              if (k === 'node_id' || k.startsWith('_')) continue;
              if (v !== '' && v !== undefined && v !== null) {
                lines.push(`${k}: ${v}`);
              }
            }
            const tip = lines.length > 1 ? lines.join('\n') : '';
            node.tooltip = tip;
            // Set directly on DOM - wunderbaum only reads node.tooltip on initial create
            const titleSpan = e.nodeElem?.querySelector('.wb-title');
            if (titleSpan) titleSpan.title = tip;
          }
        },


        // Grid cell change (inline input)
        change: (e) => {
          const colId = e.info?.colId;
          if (colId) {
            const val = e.util.getValueFromElem(e.inputElem, true);
            e.node.data[colId] = val;
            // Re-render to update tooltip with new data
            e.node.update();
            this.sendEvent('change', {
              key: e.node.key,
              colId: colId,
              value: val,
              data: e.node.data || {},
            });
            setTimeout(() => this.emitSource(), 0);
          }
        },
      };

      // Add columns if provided (treegrid mode)
      if (this.columns && this.columns.length > 0) {
        wbOptions.columns = this.columns;
        // Enable column resizing by default in treegrid mode
        if (wbOptions.columnsResizable === undefined) {
          wbOptions.columnsResizable = true;
        }
      }

      // Merge edit callbacks INTO the edit object (wunderbaum uses edit.apply, not 'edit.apply')
      if (wbOptions.edit && typeof wbOptions.edit === 'object') {
        const userEdit = { ...wbOptions.edit };
        wbOptions.edit = {
          ...userEdit,
          beforeEdit: userEdit.beforeEdit || ((e) => {
            this.sendEvent('edit.beforeEdit', {
              key: e.node.key,
              title: e.node.title,
            });
          }),
          apply: userEdit.apply || ((e) => {
            this.sendEvent('edit.apply', {
              key: e.node.key,
              oldValue: e.oldValue,
              newValue: e.newValue,
              data: e.node.data || {},
            });
            setTimeout(() => this.emitSource(), 0);
          }),
        };
      }

      // Add DnD configuration if enabled in options (dnd: true or dnd: {...})
      if (this.options.dnd) {
        wbOptions.dnd = {
          // Off because wunderbaum's version of this check also vetoes
          // dropping a node before or after its own parent's row, and those
          // are real reparents rather than void moves. `isNoOpDrop` rejects
          // the moves that genuinely change nothing instead.
          preventVoidMoves: false,
          dragStart: (e) => {
            // Save original parent - needed to undo auto-move on Ctrl+copy
            this._dragOrigParent = e.node.parent;
            // Mark this tree as the drag origin so its own container-level
            // listeners can tell a same-tree drag from a cross-tree one.
            // dataTransfer is in protected mode during dragover, so the
            // payload cannot be read there and origin must be tracked here.
            this._dragActive = true;
            // A file manager selects a row that is dragged while unselected.
            // Changing the selection here would re-render rows in the middle of
            // `dragstart`, which wedges the browser's drag loop, so `dragend`
            // applies it once the gesture is over.
            this._selectAfterDrag = e.node.isSelected() ? null : e.node.key;
            const keys = this.getDragKeys(e.node);
            // Set dataTransfer so external drop targets can read the keys
            if (e.event?.dataTransfer) {
              // text/plain is only a human-readable fallback for foreign drop
              // targets; WB_KEY_MIME is the actual protocol.
              e.event.dataTransfer.setData('text/plain', keys.join('\n'));
              // Always a JSON array, even for a single node, so receivers do
              // not need a separate code path for single vs. multi-select.
              e.event.dataTransfer.setData(WB_KEY_MIME, JSON.stringify(keys));
              e.event.dataTransfer.setData(WB_TREE_MIME, this.treeId || '');
              e.event.dataTransfer.effectAllowed = 'copyMove';
            }
            this.sendEvent('dragStart', { key: e.node.key, keys: keys });
            return true;
          },
          dragEnter: (e) => {
            // Turning off preventVoidMoves also dropped its veto on dropping a
            // node onto itself, so that one is repeated here to keep the
            // cursor honest. The regions have to stay all three: wunderbaum's
            // `_calcDropRegion` only splits a row 25/50/25 when it is given
            // the full set, and degrades to a 50/50 before/after split for any
            // smaller one.
            if (e.node === e.sourceNode) return false;
            return ['before', 'after', 'over'];
          },
          dragOver: (e) => {
            // Ctrl changes dropEffect to 'copy' on Windows, which wunderbaum
            // rejects. Force 'move' so the drop fires; we track Ctrl separately.
            if (e.event?.dataTransfer) {
              e.event.dataTransfer.dropEffect = 'move';
            }
          },
          drop: (e) => {
            const sourceNode = e.sourceNode;
            const targetNode = e.node;
            const region = this.effectiveRegion(e.suggestedDropMode, targetNode);
            const isCopy = this._copyPressed || !!window.__wbForceCopy;

            if (!sourceNode) return;

            // A same-tree drag acts on the whole selection, the same set the
            // cross-tree externalDrop payload reports.
            const dragNodes = this.getDragNodes(sourceNode, targetNode, region);
            if (!dragNodes.length) return;
            const nodeId = (n) => n.data?.node_id || n.key;

            if (isCopy) {
              // Ctrl+drop: let Python handle the full copy to keep IDs consistent.
              // suggestedDropMode is 'appendChild' (not 'over') for child drops
              const isChild =
                region === 'over' ||
                region === 'appendChild' ||
                region === 'prependChild';
              const dropParent = isChild ? targetNode : targetNode.parent;
              this.sendEvent('drop', {
                sourceKey: sourceNode.key,
                sourceKeys: dragNodes.map((n) => n.key),
                targetKey: targetNode.key,
                region: region,
                copy: true,
                copiedNodeId: nodeId(sourceNode),
                copiedNodeIds: dragNodes.map(nodeId),
                newParentNodeId: dropParent?.data?.node_id || dropParent?.key || null,
              });
              // Undo wunderbaum's auto-move: source must stay in original
              // place. Only e.sourceNode is auto-moved, the rest of the
              // selection was never touched.
              const origParent = this._dragOrigParent;
              if (origParent && sourceNode.parent !== origParent) {
                sourceNode.moveTo(origParent, 'appendChild');
              }
              this.emitSource();
            } else {
              // 'after' and 'prependChild' have to re-anchor on the node just
              // moved, or a multi-node drop lands in reverse order. 'before'
              // and 'appendChild' keep inserting at the same spot, which
              // already preserves selection order.
              let anchor = targetNode;
              let mode = region;
              for (const node of dragNodes) {
                node.moveTo(anchor, mode);
                if (mode === 'after' || mode === 'prependChild') {
                  anchor = node;
                  mode = 'after';
                }
              }
              // After moveTo, get the ACTUAL parent from the tree
              const actualParent = dragNodes[0].parent;
              this.sendEvent('drop', {
                sourceKey: sourceNode.key,
                sourceKeys: dragNodes.map((n) => n.key),
                targetKey: targetNode.key,
                region: region,
                movedNodeId: nodeId(sourceNode),
                movedNodeIds: dragNodes.map(nodeId),
                newParentNodeId: actualParent?.data?.node_id || actualParent?.key || null,
              });
              this.emitSource();
            }
          },
        };
      }

      this.tree = new Wunderbaum(wbOptions);

      // Patch: wunderbaum's _stopEditTitle uses document.activeElement which
      // returns the shadow HOST in shadow DOM, not the actual input.
      // This causes edit.apply to never fire (newValue=null).
      // Fix: temporarily override document.activeElement to return the
      // edit input found in the tree's DOM.
      const editExt = this.tree.extensions?.edit;
      if (editExt) {
        const treeEl = this.tree.element;
        const origStop = editExt._stopEditTitle.bind(editExt);
        editExt._stopEditTitle = function(apply, options) {
          // Find the actual edit input (may not be document.activeElement
          // in shadow DOM, especially on blur)
          const editInput = treeEl.querySelector('input.wb-input-edit');
          if (editInput) {
            Object.defineProperty(document, 'activeElement', {
              get: () => editInput,
              configurable: true,
            });
            try {
              return origStop(apply, options);
            } finally {
              delete document.activeElement;
            }
          }
          return origStop(apply, options);
        };
      }

      // Patch: grid extension's DragObserver uses e.target to find the
      // resizer element, but e.target returns the shadow host for events
      // crossing the shadow boundary. Wrap handleEvent to use
      // composedPath()[0] which gives the real target inside shadow DOM.
      const gridExt = this.tree.extensions?.grid;
      if (gridExt && gridExt.observer) {
        const obs = gridExt.observer;
        const oldHandler = obs._handler;
        const origHandleEvent = obs.handleEvent.bind(obs);
        const newHandler = function(e) {
          if (e.type === 'mousedown' && e.composedPath) {
            const realTarget = e.composedPath()[0];
            if (realTarget !== e.target) {
              const proxy = new Proxy(e, {
                get(target, prop) {
                  if (prop === 'target') return realTarget;
                  const val = target[prop];
                  return typeof val === 'function' ? val.bind(target) : val;
                }
              });
              return origHandleEvent(proxy);
            }
          }
          return origHandleEvent(e);
        };
        obs._handler = newHandler;
        obs.events.forEach((ev) => {
          obs.root.removeEventListener(ev, oldHandler);
          obs.root.addEventListener(ev, newHandler);
        });
      }

      // Expose tree instance on the container for external access (e.g. testing)
      container._wunderbaum = this.tree;

      // Wunderbaum's root div needs explicit pixel width - CSS % resolves to 0
      // in Panel's shadow DOM. Walk up DOM to find actual available width,
      // then keep synced via ResizeObserver.
      this._fixTreeWidth(container);

      // Setup external file drop and context menu
      this.setupDragDrop();
      this.setupContextMenu();
    },

    _fixTreeWidth(container) {
      const wbElem = container.querySelector('div.wunderbaum');
      if (!wbElem) return;

      const applyWidth = () => {
        // Walk up DOM to find the first ancestor with a real width
        let w = 0;
        let el = container;
        while (el && w === 0) {
          w = el.clientWidth || el.offsetWidth;
          el = el.parentElement || el.parentNode?.host;
        }
        if (w > 0) {
          wbElem.style.width = w + 'px';
          // Full re-render after visibility change (e.g. Card expand)
          if (this.tree) {
            this.tree.update('any');
          }
        }
      };

      // Try immediately, then after layout, then poll briefly
      applyWidth();
      requestAnimationFrame(applyWidth);
      setTimeout(applyWidth, 100);
      setTimeout(applyWidth, 500);

      // Keep synced on resize
      this._resizeObserver = new ResizeObserver(applyWidth);
      const host = container.getRootNode()?.host;
      if (host) {
        this._resizeObserver.observe(host);
      }
      this._resizeObserver.observe(container);

      // Wunderbaum destroys child nodes when container is hidden (virtual
      // scrolling). Save source before hide, reload on re-show.
      let savedSource = null;
      this._intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting && this.tree) {
            // Save before wunderbaum destroys children
            savedSource = this.getSerializableSource();
          } else if (entry.isIntersecting && savedSource && this.tree) {
            // Reload saved source
            this.tree.clear();
            this.tree.load(savedSource);
            savedSource = null;
            applyWidth();
          }
        }
      });
      this._intersectionObserver.observe(container);
    },

    setupDragDrop() {
      const container = this.$refs.treeContainer;

      // A node drag that did not start in this tree. The internal wunderbaum
      // dnd callbacks never fire for it (there is no sourceNode), so these
      // container-level listeners are the only place it can be handled.
      const isExternalNodeDrag = (e) =>
        !!e.dataTransfer && e.dataTransfer.types.includes(WB_KEY_MIME) && !this._dragActive;

      const isAcceptable = (e) =>
        !!e.dataTransfer && (e.dataTransfer.types.includes('Files') || isExternalNodeDrag(e));

      container.addEventListener('dragenter', (e) => {
        // Only handle external file drops and cross-tree node drops.
        // A drag started in this tree is wunderbaum's own business.
        if (isAcceptable(e)) {
          e.preventDefault();
          container.style.border = '2px solid #007bff';
        }
      });

      container.addEventListener('dragleave', (e) => {
        container.style.border = '1px solid #ddd';
      });

      container.addEventListener('dragover', (e) => {
        if (isAcceptable(e)) {
          e.preventDefault();
          if (isExternalNodeDrag(e)) {
            // Ctrl changes dropEffect to 'copy' on Windows, which cancels the
            // drop. Force 'move', matching the internal dragOver handler.
            e.dataTransfer.dropEffect = 'move';
          }
        }
      });

      // Fires on the source element after any drag ends, successful or not,
      // and bubbles to this container. Clearing the flag here means a
      // cancelled drag does not leave the tree thinking it is still dragging.
      container.addEventListener('dragend', () => {
        this._dragActive = false;
        container.style.border = '1px solid #ddd';
        const key = this._selectAfterDrag;
        this._selectAfterDrag = null;
        if (!key) return;
        const node = this.tree?.findKey?.(key);
        if (!node) return;
        this.deselectAll();
        this.setSubtreeSelected(node, true);
        this._anchorKey = key;
      });

      container.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          container.style.border = '1px solid #ddd';
          this.handleFileDrop(e);
          return;
        }
        if (isExternalNodeDrag(e)) {
          e.preventDefault();
          e.stopPropagation();
          container.style.border = '1px solid #ddd';
          this.handleExternalDrop(e);
        }
      });
    },

    /**
     * Select or deselect a node together with its whole subtree.
     *
     * Checking a parent checks its children, but checking every child leaves
     * the parent alone. That rules out `selectMode: "hier"`, whose upward
     * propagation is the point of the mode, so the downward half is driven
     * here instead. `setSelected(flag, {propagateDown: true})` is not enough:
     * it skips the node itself (`visit()` defaults to `includeSelf = false`)
     * and returns before emitting that node's own `select` event.
     */
    setSubtreeSelected(node, flag) {
      node.setSelected(flag);
      const selectMode = this.tree?.options?.selectMode || 'multi';
      // 'hier' propagates down by itself, 'single' must not propagate at all.
      if (selectMode === 'multi') {
        node.visit((child) => {
          child.setSelected(flag);
        });
      }
    },

    deselectAll() {
      for (const node of this.tree?.getSelectedNodes?.() || []) {
        node.setSelected(false);
      }
    },

    /**
     * Keys of every row between two rows, endpoints included.
     *
     * Order and membership come from `visitRows`, so this follows what is on
     * screen: children of a collapsed node are not part of a range that spans
     * it. Returns an empty list if either endpoint is not currently a visible
     * row, which lets the caller fall back to a plain click.
     */
    rangeKeys(fromKey, toKey) {
      const keys = [];
      let inside = false;
      let complete = false;
      this.tree?.visitRows?.((node) => {
        const isEnd = node.key === fromKey || node.key === toKey;
        if (!inside) {
          if (!isEnd) return;
          inside = true;
          keys.push(node.key);
          if (fromKey === toKey) {
            complete = true;
            return false;
          }
          return;
        }
        keys.push(node.key);
        if (isEnd) {
          complete = true;
          return false;
        }
      });
      return complete ? keys : [];
    },

    /** Apply Windows Explorer click semantics, then move the active cell. */
    applySelectionClick(node, event, info) {
      const tree = this.tree;
      if (!tree) return;
      const ctrl = !!(event && (event.ctrlKey || event.metaKey));
      const shift = !!(event && event.shiftKey);
      // Read before setActive below, so the slow-second-click check still works.
      const wasActive = node.isActive();

      tree.runWithDeferredUpdate(() => {
        const range =
          shift && this._anchorKey ? this.rangeKeys(this._anchorKey, node.key) : [];
        if (range.length) {
          // Ctrl+shift adds the range, plain shift replaces with it. Either way
          // the anchor stays put so the same range can be resized.
          if (!ctrl) this.deselectAll();
          for (const key of range) {
            const target = tree.findKey(key);
            if (target) this.setSubtreeSelected(target, true);
          }
          return;
        }
        // A checkbox is just another way to add to or remove from the selection.
        if (ctrl || info.region === 'checkbox') {
          this.setSubtreeSelected(node, !node.isSelected());
        } else {
          this.deselectAll();
          this.setSubtreeSelected(node, true);
        }
        this._anchorKey = node.key;
      });

      if (info.colIdx >= 0) {
        node.setActive(true, { colIdx: info.colIdx, event: event });
      } else {
        node.setActive(true, { event: event });
      }

      // Inline rename on a slow second click, which returning false skipped.
      const trigger = tree.getOption('edit.trigger') || [];
      const slowClickDelay = tree.getOption('edit.slowClickDelay');
      if (
        trigger.indexOf('clickActive') >= 0 &&
        info.region === 'title' &&
        wasActive &&
        (!slowClickDelay || Date.now() - (tree.lastClickTime || 0) < slowClickDelay)
      ) {
        node.startEditTitle();
      }
    },

    getDragKeys(node) {
      // An unselected row drags alone. Selecting it is left to `dragend`, see
      // the `_selectAfterDrag` note in dragStart.
      if (!node.isSelected()) return [node.key];
      // stopOnParents: a selected folder stands in for its selected descendants,
      // so a checked folder drags as one node rather than as node plus children.
      const selected = this.tree?.getSelectedNodes?.(true) || [];
      return selected.length ? selected.map((n) => n.key) : [node.key];
    },

    getDragNodes(sourceNode, targetNode, region) {
      const nodes = this.getDragKeys(sourceNode)
        .map((key) => this.tree?.findKey?.(key))
        .filter((n) => !!n);
      // A node whose ancestor is also being dragged travels with that ancestor,
      // so moving it separately would drop it into its own new position. The
      // target itself, and any node the target sits inside, are equally
      // impossible to move.
      return nodes.filter(
        (n) =>
          !nodes.some((other) => other !== n && n.isDescendantOf(other)) &&
          n !== targetNode &&
          !targetNode?.isDescendantOf(n) &&
          !this.isNoOpDrop(n, targetNode, region)
      );
    },

    /**
     * Rewrite a drop region into the slot its marker actually points at.
     *
     * `after` is the bottom quarter of a row, so on an expanded parent the
     * insert arrow is drawn in the gap above the first child - that is the
     * first-child slot, not the parent's own level. wunderbaum's
     * `_calcDropRegion` is pure geometry and never reads `expanded`, so the
     * correction happens here. A collapsed parent has nothing below it to be
     * confused with and keeps `after` meaning 'sibling of the parent'.
     */
    effectiveRegion(region, targetNode) {
      if (region !== 'after') return region;
      const hasVisibleChildren =
        targetNode?.isExpanded?.() && !!targetNode.children?.length;
      return hasVisibleChildren ? 'prependChild' : region;
    },

    /**
     * True if the move would put the node exactly where it already is.
     *
     * This replaces `preventVoidMoves`, which rejected too much: it also
     * vetoed dropping a node before or after its own parent's row, a real
     * reparent to the level above. Only these cases change nothing.
     *
     * Dropping onto a folder means 'into this folder', which for a node
     * already in it is a no-op wherever it sits. `prependChild` names an exact
     * position, so it only counts when the node is that position already.
     */
    isNoOpDrop(node, targetNode, region) {
      if (!targetNode || !region) return false;
      switch (region) {
        case 'over':
        case 'appendChild':
          return node.parent === targetNode;
        case 'prependChild':
          return node.parent === targetNode && targetNode.children?.[0] === node;
        case 'before':
          return targetNode === node.getNextSibling();
        case 'after':
          return targetNode === node.getPrevSibling();
        default:
          return false;
      }
    },

    nodeFromEvent(e) {
      // composedPath() rather than e.target: an event crossing the shadow
      // boundary reports the shadow host as its target.
      const path = e.composedPath ? e.composedPath() : [];
      for (const el of path) {
        if (el && el._wb_node) return el._wb_node;
        if (el === this.$refs.treeContainer) break;
      }
      return Wunderbaum.getNode(e);
    },

    dropRegion(e, node) {
      // Same split wunderbaum uses internally: the outer quarters of a row
      // mean insert before/after, the middle half means drop onto.
      const rect = node._rowElem?.getBoundingClientRect();
      if (!rect || !rect.height) return 'over';
      const rel = (e.clientY - rect.top) / rect.height;
      if (rel < 0.25) return 'before';
      // Remapped like a same-tree drop, so a Python callback that performs the
      // move reads the same slot the user saw the arrow point at.
      if (rel > 0.75) return this.effectiveRegion('after', node);
      return 'over';
    },

    handleExternalDrop(dropEvent) {
      const dt = dropEvent.dataTransfer;
      const raw = dt.getData(WB_KEY_MIME);
      let sourceKeys = [];
      if (raw) {
        // Multi-select sends a JSON array, a single node a bare key.
        try {
          sourceKeys = raw.startsWith('[') ? JSON.parse(raw) : [raw];
        } catch {
          sourceKeys = [raw];
        }
      }
      const node = this.nodeFromEvent(dropEvent);
      this.sendEvent('externalDrop', {
        external: true,
        source_tree_id: dt.getData(WB_TREE_MIME) || null,
        source_keys: sourceKeys,
        target_key: node ? node.key : null,
        region: node ? this.dropRegion(dropEvent, node) : null,
      });
    },

    handleFileDrop(dropEvent) {
      const files = dropEvent.dataTransfer.files;
      if (files.length === 0) return;

      const dropData = {
        files: []
      };

      // Try to find the target node at drop position
      const node = Wunderbaum.getNode(dropEvent);
      if (node) {
        dropData.targetKey = node.key;
      }

      let filesProcessed = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
          dropData.files.push({
            name: file.name,
            content: event.target.result,
            size: file.size,
            type: file.type,
          });

          filesProcessed++;
          if (filesProcessed === files.length) {
            this.$emit('file-drop', dropData);
          }
        };

        reader.readAsDataURL(file);
      }
    },

    setupContextMenu() {
      if (!this.contextMenuItems || this.contextMenuItems.length === 0) return;
      const wrapper = this.$el;
      wrapper.addEventListener('contextmenu', (e) => {
        if (!this.tree) return;
        // Walk up from event target to find wunderbaum node
        let el = e.target;
        let node = null;
        while (el && el !== wrapper) {
          if (el._wb_node) { node = el._wb_node; break; }
          el = el.parentElement;
        }
        if (!node) return;
        e.preventDefault();
        e.stopPropagation();
        node.setActive(true);
        this.ctxNodeKey = node.key;
        // Position relative to wrapper
        const rect = wrapper.getBoundingClientRect();
        this.ctxX = e.clientX - rect.left;
        this.ctxY = e.clientY - rect.top;
        this.ctxVisible = true;
      }, true);
    },

    hideContextMenu() {
      this.ctxVisible = false;
    },

    onContextMenuItem(itemId) {
      this.ctxVisible = false;
      if (!this.ctxNodeKey || !this.tree) return;
      const node = this.findByKey(this.ctxNodeKey);
      this.sendEvent('contextmenu', {
        key: this.ctxNodeKey,
        title: node?.title || '',
        type: node?.type || '',
        data: node?.data || {},
        action: itemId,
      });
    },

    findByKey(key) {
      if (!this.tree || !key) return null;
      // Match by key first, then fall back to node.data.node_id
      return this.tree.findFirst((node) => node.key === key)
        || this.tree.findFirst((node) => node.data?.node_id === key);
    },

    sendEvent(eventName, params) {
      // Strip undefined values to avoid JSON serialization errors
      const clean = JSON.parse(JSON.stringify(params));
      this.$emit('tree-event', { event_name: eventName, event_params: clean });
    },

    emitSource() {
      // Selecting a subtree fires `select` once per descendant, and each one
      // would otherwise serialize and ship the whole source. Coalesce into one
      // sync per tick, built from the state as it stands when it flushes.
      if (this._emitSourcePending) return;
      this._emitSourcePending = true;
      setTimeout(() => {
        this._emitSourcePending = false;
        this.$emit('change:source', this.getSerializableSource());
      }, 0);
    },

    getSerializableSource() {
      if (!this.tree) return [];

      const serialize = (node) => {
        // Flatten node.data to top level (wunderbaum double-nests "data:{}" as node.data.data)
        const obj = {
          ...(node.data || {}),
          title: node.title,
          key: node.key,
        };
        if (node.type) obj.type = node.type;
        if (node.icon) obj.icon = node.icon;
        if (node.expanded) obj.expanded = true;
        if (node.selected) obj.selected = true;
        if (node.lazy && (!node.children || node.children.length === 0)) obj.lazy = true;
        if (node.checkbox != null) obj.checkbox = node.checkbox;
        if (node.classes) obj.classes = node.classes;
        if (node.tooltip) obj.tooltip = node.tooltip;
        if (node.children && node.children.length > 0) {
          obj.children = node.children.map(serialize);
        }
        return obj;
      };

      return this.tree.root.children.map(serialize);
    },

    // =========================================================================
    // Methods called from bridge layer
    // =========================================================================

    setSource(source) {
      if (this.tree) {
        this.tree.clear();
        this.tree.load(JSON.parse(JSON.stringify(source)));
      }
    },

    setColumns(columns) {
      if (this.tree) {
        this.tree.columns = columns;
        this.tree.update('colStructure');
      }
    },

    setOptions(options) {
      if (this.tree) {
        for (const [key, value] of Object.entries(options)) {
          this.tree.setOption(key, value);
        }
      }
    },

    setTypes(types) {
      if (this.tree) {
        this.tree.setOption('types', types);
      }
    },

    filterNodes(filter, options) {
      if (!this.tree) return;
      // Returns the number of matches, which is the only thing Python can
      // learn about the result, so send it straight back as an event.
      const matches = this.tree.filterNodes(filter, options || {});
      this.sendEvent('filter', { filter: filter, matches: matches });
    },

    clearFilter() {
      if (!this.tree) return;
      this.tree.clearFilter();
      this.sendEvent('filter', { filter: null, matches: null });
    },

    handleLazyResponse(responseData) {
      const { key, children } = responseData;
      const resolver = this._pendingLazyResolvers[key];
      if (resolver) {
        if (resolver.timer) clearTimeout(resolver.timer);
        resolver.resolve(children);
        delete this._pendingLazyResolvers[key];
      }
    },

    // =========================================================================
    // Incremental Tree Update Methods
    // =========================================================================

    handleTreeAction(actionData) {
      if (!actionData || !actionData.action) return;

      const { action, payload } = actionData;

      switch (action) {
        case 'addNode':
          this.addNode(payload.parentKey, payload.node);
          break;
        case 'removeNode':
          this.removeNode(typeof payload === 'object' ? payload.key : payload);
          break;
        case 'moveNode':
          this.moveNode(payload.key, payload.targetKey, payload.mode);
          break;
        case 'updateNode':
          this.updateNode(payload.key, payload.data);
          break;
        case 'renameNode':
          this.renameNode(payload.key, payload.title);
          break;
        case 'clear':
          this.clearTree();
          break;
        case 'expandNode':
          this.expandNode(payload.key, payload.expanded);
          break;
        case 'selectNode':
          this.selectNode(payload.key, payload.selected);
          break;
        case 'setActiveNode':
          this.setActiveNode(payload.key);
          break;
        case 'filterNodes':
          this.filterNodes(payload.filter, payload.options);
          break;
        case 'clearFilter':
          this.clearFilter();
          break;
        case 'batch':
          this.executeBatch(payload);
          break;
        case 'executeStep':
          this.executeStep(payload);
          break;
      }
    },

    addNode(parentKey, nodeData) {
      if (!this.tree) return;
      if (parentKey) {
        const parent = this.findByKey(parentKey);
        if (parent) {
          parent.addChildren(nodeData);
        }
      } else {
        // Add to root
        this.tree.root.addChildren(nodeData);
      }
      this.emitSource();
    },

    removeNode(key) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.remove();
        this.emitSource();
      }
    },

    moveNode(key, targetKey, mode) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      const target = this.findByKey(targetKey);
      if (node && target) {
        const wbMode = mode === 'child' ? 'appendChild' : mode;
        node.moveTo(target, wbMode);
        this.emitSource();
      }
    },

    updateNode(key, data) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        if (data.title !== undefined) node.setTitle(data.title);
        if (data.icon !== undefined) node.icon = data.icon;
        if (data.type !== undefined) node.type = data.type;
        if (data.classes !== undefined) node.classes = data.classes;
        if (data.tooltip !== undefined) node.tooltip = data.tooltip;
        if (data.checkbox !== undefined) node.checkbox = data.checkbox;
        if (data.data !== undefined) {
          node.data = { ...(node.data || {}), ...data.data };
        }
        node.update();
        this.emitSource();
      }
    },

    renameNode(key, title) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.setTitle(title);
        node.update();
        this.emitSource();
      }
    },

    clearTree() {
      if (this.tree) {
        this.tree.clear();
        this.emitSource();
      }
    },

    expandNode(key, expanded) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.setExpanded(expanded);
      }
    },

    selectNode(key, selected) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.setSelected(selected);
        this.emitSource();
      }
    },

    setActiveNode(key) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.setActive(true);
      }
    },

    executeBatch(actions) {
      if (!this.tree || !Array.isArray(actions)) return;

      for (const item of actions) {
        this.executeAction(item);
      }
      this.emitSource();
    },

    executeStep(stepData) {
      if (!stepData || !stepData.actions) return;

      for (const actionData of stepData.actions) {
        this.executeAction(actionData);
      }
      this.emitSource();
    },

    executeAction(actionData) {
      if (!actionData || !actionData.action) return;

      switch (actionData.action) {
        case 'addNode':
          this.addNodeFromAction(actionData);
          break;
        case 'removeNode':
          this.removeNodeSilent(actionData.key);
          break;
        case 'moveNode':
          this.moveNodeSilent(actionData.key, actionData.targetKey, actionData.mode);
          break;
        case 'updateNode':
          this.updateNodeSilent(actionData.key, actionData);
          break;
        case 'renameNode':
          this.renameNodeSilent(actionData.key, actionData.title);
          break;
        case 'expandNode':
          this.expandNode(actionData.key, actionData.expanded !== false);
          break;
        case 'selectNode':
          this.selectNodeSilent(actionData.key, actionData.selected !== false);
          break;
        case 'pause':
        case 'complete':
          // Handled by Python side for timing
          break;
      }
    },

    // "Silent" versions that don't emit source (used in batch/step to emit once at the end)
    addNodeFromAction(actionData) {
      if (!this.tree) return;
      // Pass all properties (except action/parentKey) to addChildren so
      // custom fields like node_id, description end up in node.data.
      const { action, parentKey, ...node } = actionData;
      if (parentKey) {
        const parent = this.findByKey(parentKey);
        if (parent) {
          parent.addChildren(node);
        }
      } else {
        this.tree.root.addChildren(node);
      }
    },

    removeNodeSilent(key) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) node.remove();
    },

    moveNodeSilent(key, targetKey, mode) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      const target = this.findByKey(targetKey);
      const wbMode = mode === 'child' ? 'appendChild' : mode;
      if (node && target) node.moveTo(target, wbMode);
    },

    updateNodeSilent(key, data) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        if (data.title !== undefined) node.setTitle(data.title);
        if (data.icon !== undefined) node.icon = data.icon;
        if (data.type !== undefined) node.type = data.type;
        if (data.data !== undefined) {
          node.data = { ...(node.data || {}), ...data.data };
        }
        node.update();
      }
    },

    renameNodeSilent(key, title) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) {
        node.setTitle(title);
        node.update();
      }
    },

    selectNodeSilent(key, selected) {
      if (!this.tree) return;
      const node = this.findByKey(key);
      if (node) node.setSelected(selected);
    },
  },

  mounted() {
    this.initTree();
  },

  beforeUnmount() {
    if (this._onKeyDown) {
      document.removeEventListener('keydown', this._onKeyDown, true);
      document.removeEventListener('keyup', this._onKeyUp, true);
      window.removeEventListener('blur', this._onBlur);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }

    // Clear pending lazy load timers
    for (const resolver of Object.values(this._pendingLazyResolvers)) {
      if (resolver.timer) clearTimeout(resolver.timer);
    }
    this._pendingLazyResolvers = {};

    if (this.tree) {
      this.tree.destroy();
      this.tree = null;
    }
  }
};
</script>
