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
      default: () => []  // [{id, label, icon?}] — empty = no context menu
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
  },

  methods: {
    initTree() {
      const container = this.$refs.treeContainer;

      // Track Ctrl key globally - e.event.ctrlKey is unreliable in DnD events
      this._ctrlPressed = false;
      this._onKeyDown = (ev) => { if (ev.key === 'Control') this._ctrlPressed = true; };
      this._onKeyUp = (ev) => { if (ev.key === 'Control') this._ctrlPressed = false; };
      document.addEventListener('keydown', this._onKeyDown, true);
      document.addEventListener('keyup', this._onKeyUp, true);
      // Also clear on window blur (user may release Ctrl outside window)
      this._onBlur = () => { this._ctrlPressed = false; };
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
          this.sendEvent('click', {
            key: e.node.key,
            title: e.node.title,
            data: e.node.data || {},
          });
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
            // Set directly on DOM — wunderbaum only reads node.tooltip on initial create
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
          dragStart: (e) => {
            // Save original parent - needed to undo auto-move on Ctrl+copy
            this._dragOrigParent = e.node.parent;
            // Set dataTransfer so external drop targets can read the key
            if (e.event?.dataTransfer) {
              e.event.dataTransfer.setData('text/plain', e.node.key);
              e.event.dataTransfer.setData('application/x-wunderbaum-key', e.node.key);
              e.event.dataTransfer.effectAllowed = 'copyMove';
            }
            this.sendEvent('dragStart', { key: e.node.key });
            return true;
          },
          dragEnter: (e) => {
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
            const region = e.suggestedDropMode;
            const isCopy = this._ctrlPressed || !!window.__wbForceCopy;

            if (sourceNode) {
              if (isCopy) {
                // Ctrl+drop: let Python handle the full copy to keep IDs consistent.
                // suggestedDropMode is 'appendChild' (not 'over') for child drops
                const isChild = region === 'over' || region === 'appendChild';
                const dropParent = isChild ? targetNode : targetNode.parent;
                this.sendEvent('drop', {
                  sourceKey: sourceNode.key,
                  targetKey: targetNode.key,
                  region: region,
                  copy: true,
                  copiedNodeId: sourceNode.data?.node_id || sourceNode.key,
                  newParentNodeId: dropParent?.data?.node_id || dropParent?.key || null,
                });
                // Undo wunderbaum's auto-move: source must stay in original place
                const origParent = this._dragOrigParent;
                if (origParent && sourceNode.parent !== origParent) {
                  sourceNode.moveTo(origParent, 'appendChild');
                }
                this.emitSource();
              } else {
                sourceNode.moveTo(targetNode, region);
                // After moveTo, get the ACTUAL parent from the tree
                const actualParent = sourceNode.parent;
                this.sendEvent('drop', {
                  sourceKey: sourceNode.key,
                  targetKey: targetNode.key,
                  region: region,
                  movedNodeId: sourceNode.data?.node_id || sourceNode.key,
                  newParentNodeId: actualParent?.data?.node_id || actualParent?.key || null,
                });
                this.emitSource();
              }
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

      // Wunderbaum's root div needs explicit pixel width — CSS % resolves to 0
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

      container.addEventListener('dragenter', (e) => {
        // Only handle external file drops (not internal tree DnD)
        if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
          e.preventDefault();
          container.style.border = '2px solid #007bff';
        }
      });

      container.addEventListener('dragleave', (e) => {
        container.style.border = '1px solid #ddd';
      });

      container.addEventListener('dragover', (e) => {
        if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
          e.preventDefault();
        }
      });

      container.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          container.style.border = '1px solid #ddd';
          this.handleFileDrop(e);
        }
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
      const source = this.getSerializableSource();
      this.$emit('change:source', source);
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
