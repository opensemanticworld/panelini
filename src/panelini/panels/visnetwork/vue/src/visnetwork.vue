<template>
  <div class="visnetwork-wrapper" @click="hideContextMenu">
    <div ref="networkContainer" class="network-canvas"></div>
    <div v-if="ctxVisible"
         ref="ctxMenu"
         class="vn-context-menu"
         :style="{ left: ctxX + 'px', top: ctxY + 'px' }"
         @click.stop>
      <div v-for="item in ctxMenuItems"
           :key="item.id"
           class="vn-context-menu-item"
           @click.stop="onContextMenuItem(item.id)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { Network, DataSet } from "vis-network/standalone";
import yaml from "js-yaml";

export default {
  name: 'visnetwork-component',

  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    edges: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    manipulationState: {
      type: String,
      default: "disableEditMode"
    },
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 600
    }
  },

  emits: ['change:nodes', 'change:edges', 'network-event', 'file-drop', 'ready'],

  data() {
    return {
      // Don't store network in reactive data - it has private fields that break with Proxy
      nodesDataSet: null,
      edgesDataSet: null,
      _options: {},
      _manipulationCallbacks: null,
      // Context menu state
      ctxVisible: false,
      ctxX: 0,
      ctxY: 0,
      ctxElementType: null,
      ctxElementId: null,
      ctxMenuItems: [],
      // Track duplicated nodes during Ctrl+drag
      _duplicatedNodeIds: []
    };
  },

  // Store network as a non-reactive property
  created() {
    this.network = null;
  },

  methods: {
    initNetwork() {
      // Create DataSets
      this.nodesDataSet = new DataSet(this.enrichNodesWithTitles(this.nodes));
      this.edgesDataSet = new DataSet(this.edges);

      // Store manipulation callbacks separately
      this._manipulationCallbacks = {
        addNode: (nodeData, callback) => {
          // Assign default label if not present
          nodeData.label = nodeData.label || `Node ${nodeData.id}`;
          // Callback tells vis-network to add the node
          callback(nodeData);
          // Emit updated nodes after the callback completes
          setTimeout(() => {
            this.$emit('change:nodes', this.nodesDataSet.get());
            // Emit nodeCreated event
            this.$emit('network-event', {
              event_name: 'nodeCreated',
              event_params: {
                node: nodeData
              }
            });
          }, 0);
        },
        addEdge: (edgeData, callback) => {
          // Prevent self-loops if desired
          if (edgeData.from === edgeData.to) {
            callback(null);
            return;
          }
          // Callback tells vis-network to add the edge
          callback(edgeData);
          // Emit updated edges after the callback completes
          setTimeout(() => {
            this.$emit('change:edges', this.edgesDataSet.get());
            // Emit edgeCreated event
            this.$emit('network-event', {
              event_name: 'edgeCreated',
              event_params: {
                edge: edgeData
              }
            });
          }, 0);
        },
        editEdge: (edgeData, callback) => {
          // Prevent self-loops if desired
          if (edgeData.from === edgeData.to) {
            callback(null);
            return;
          }
          // Callback tells vis-network to update the edge
          callback(edgeData);
          // Emit updated edges after the callback completes
          setTimeout(() => {
            this.$emit('change:edges', this.edgesDataSet.get());
          }, 0);
        },
        deleteNode: (nodeData, callback) => {
          // Callback tells vis-network to delete the node
          callback(nodeData);
          // Emit updated nodes after the callback completes
          setTimeout(() => {
            this.$emit('change:nodes', this.nodesDataSet.get());
          }, 0);
        },
        deleteEdge: (edgeData, callback) => {
          // Callback tells vis-network to delete the edge
          callback(edgeData);
          // Emit updated edges after the callback completes
          setTimeout(() => {
            this.$emit('change:edges', this.edgesDataSet.get());
          }, 0);
        },
      };

      // Default options with proper manipulation callbacks
      const defaultOptions = {
        manipulation: {
          enabled: false,
          initiallyActive: false,
          ...this._manipulationCallbacks
        },
        interaction: {
          multiselect: true,
          selectable: true,
          hover: true,
          tooltipDelay: 300,
        },
        nodes: {
          shape: "dot",
          size: 10,
        },
        edges: {
          color: {
            inherit: 'to'
          }
        },
      };

      // Merge options (deep-merge interaction to preserve hover/tooltip defaults)
      this._options = { ...defaultOptions, ...this.options };
      if (this.options.interaction) {
        this._options.interaction = { ...defaultOptions.interaction, ...this.options.interaction };
      }

      // Set container size
      const container = this.$refs.networkContainer;
      container.style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      container.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;

      // Create network
      const data = {
        nodes: this.nodesDataSet,
        edges: this.edgesDataSet
      };

      this.network = new Network(container, data, this._options);

      // Expose network instance on the container for external access (e.g. testing)
      container._visNetwork = this.network;

      // Setup event listeners
      this.setupEventListeners();
      this.setupDragDrop();

      // Emit ready
      this.$emit('ready', true);
    },

    setupEventListeners() {
      const network = this.network;
      const nodesDataSet = this.nodesDataSet;

      // Click event (only fires when nodes are clicked)
      network.on('click', (params) => {
        if (params.nodes.length > 0) {
          this.sendEvent("click", params);
        }
      });

      // Select node event (fires when a node is selected)
      network.on('selectNode', (params) => {
        this.sendEvent("selectNode", params);
      });

      // Deselect node event (fires when clicking away from selected nodes)
      network.on('deselectNode', (params) => {
        this.sendEvent("deselectNode", params);
      });

      // Double click event
      network.on('doubleClick', (params) => {
        if (params.nodes.length === 1) {
          if (network.isCluster(params.nodes[0])) {
            network.openCluster(params.nodes[0]);
            return;
          }
          this.sendEvent("doubleClick", params);

          // Re-enable physics
          const currentOptions = this._options || {};
          const physicsOptions = { ...currentOptions.physics, enabled: true };
          this._options = { ...currentOptions, physics: physicsOptions };
          network.setOptions({ physics: physicsOptions });
        }

        if (params.nodes.length > 0) {
          const node = nodesDataSet.get(params.nodes[0]);
          if (node) {
            node.fixed = false;
            nodesDataSet.update(node);
          }
        }
      });

      // Context menu (right-click)
      network.on('oncontext', (params) => {
        params.event.preventDefault();

        let elementType = null;
        let elementId = null;
        let callbackNameDict = null;

        // Get the node/edge at the pointer position (not just selected ones)
        const nodeId = network.getNodeAt(params.pointer.DOM);
        const edgeId = network.getEdgeAt(params.pointer.DOM);

        // Check if node was right-clicked
        if (nodeId !== undefined) {
          elementType = 'node';
          elementId = nodeId;
          const node = nodesDataSet.get(elementId);
          callbackNameDict = node?.callback_name_dict;
        }
        // Check if edge was right-clicked
        else if (edgeId !== undefined) {
          elementType = 'edge';
          elementId = edgeId;
          const edge = this.edgesDataSet.get(elementId);
          callbackNameDict = edge?.callback_name_dict;
        }

        // Show menu if callback_name_dict exists and has items
        if (callbackNameDict && Object.keys(callbackNameDict).length > 0) {
          this.showContextMenu(params.event, elementType, elementId, callbackNameDict);
        }

        // Still emit oncontext event for compatibility
        this.sendEvent("oncontext", params);
      });

      // Selection events
      network.on('selectNode', (params) => {
        this.sendEvent("selectNode", params);
        this.emitNodesAndEdges();
      });

      network.on('selectEdge', (params) => {
        this.sendEvent("selectEdge", params);
      });

      // Hover events
      network.on('hoverNode', (params) => {
        this.sendEvent("hoverNode", params);
      });

      network.on('hoverEdge', (params) => {
        this.sendEvent("hoverEdge", params);
      });

      // Zoom event
      network.on('zoom', (params) => {
        this.sendEvent("zoom", params);
      });

      // Drag events
      network.on('dragStart', (params) => {
        if (params.nodes.length > 0) {
          const newNodeIds = [];

          params.nodes.forEach((nodeId) => {
            const node = nodesDataSet.get(nodeId);
            if (!node) return;

            const position = network.getPosition(nodeId);
            node.x = position.x;
            node.y = position.y;

            // Duplicate node if Ctrl key is pressed
            if (params.event.srcEvent && params.event.srcEvent.ctrlKey) {
              const newNode = this.duplicateNode(node);
              newNode.fixed = false;
              nodesDataSet.update(newNode);

              // Create edge from original to duplicate
              this.edgesDataSet.update({
                from: node.id,
                to: newNode.id
              });

              newNodeIds.push(newNode.id);
            } else {
              node.fixed = false;
              nodesDataSet.update(node);
            }
          });

          // Store duplicated node IDs for dragEnd event
          this._duplicatedNodeIds = newNodeIds;

          // Select the new duplicated nodes if Ctrl was pressed
          if (newNodeIds.length > 0) {
            network.setSelection({ nodes: newNodeIds });
          }

          this.sendEvent("dragStart", params);
        }
      });

      network.on('dragEnd', (params) => {
        if (params.nodes.length > 0) {
          // Update positions for ALL nodes to capture physics-based movement
          const allNodes = nodesDataSet.get();
          for (const node of allNodes) {
            const pos = network.getPosition(node.id);
            node.x = pos.x;
            node.y = pos.y;

            // Only fix the nodes that were actually dragged
            if (params.nodes.includes(node.id)) {
              node.fixed = true;
            }
            nodesDataSet.update(node);
          }

          // Emit updated nodes
          this.$emit('change:nodes', nodesDataSet.get());
          this.sendEvent("dragEnd", params);

          // Emit nodesDuplicated event if nodes were duplicated
          if (this._duplicatedNodeIds.length > 0) {
            const duplicatedNodes = this._duplicatedNodeIds.map(id => nodesDataSet.get(id));
            this.$emit('network-event', {
              event_name: 'nodesDuplicated',
              event_params: {
                nodes: duplicatedNodes
              }
            });
            // Clear the duplicated nodes tracking
            this._duplicatedNodeIds = [];
          }
        }
      });
    },

    setupDragDrop() {
      const container = this.$refs.networkContainer;

      container.addEventListener('dragenter', (e) => {
        e.preventDefault();
        container.style.border = '2px solid #007bff';
      });

      container.addEventListener('dragleave', (e) => {
        container.style.border = '1px solid #ddd';
      });

      container.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      container.addEventListener('drop', (e) => {
        e.preventDefault();
        container.style.border = '1px solid #ddd';
        this.handleDrop(e);
      });
    },

    handleDrop(dropEvent) {
      const files = dropEvent.dataTransfer.files;
      if (files.length === 0) return;

      const dropPosition = this.network.DOMtoCanvas({
        x: dropEvent.clientX,
        y: dropEvent.clientY
      });

      const dropData = {
        x: dropPosition.x,
        y: dropPosition.y,
        files: []
      };

      let filesProcessed = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
          dropData.files.push({
            name: file.name,
            content: event.target.result
          });

          filesProcessed++;
          if (filesProcessed === files.length) {
            this.$emit('file-drop', dropData);
          }
        };

        reader.readAsDataURL(file);
      }
    },

    sendEvent(eventName, params) {
      // Serialize only safe data (avoid DOM references and circular structures)
      const safeParams = {
        nodes: params.nodes || [],
        edges: params.edges || [],
        pointer: params.pointer ? {
          DOM: params.pointer.DOM,
          canvas: params.pointer.canvas
        } : null,
        event: null // Don't serialize DOM events
      };
      this.$emit('network-event', { event_name: eventName, event_params: safeParams });
    },

    emitNodesAndEdges() {
      // Strip title (DOM element, not JSON-serializable) -- regenerable from json_data
      const nodes = this.nodesDataSet.get().map(({ title, ...rest }) => rest);
      this.$emit('change:nodes', nodes);
      this.$emit('change:edges', this.edgesDataSet.get());
    },

    // Methods called from bridge layer
    setNodes(nodes) {
      if (this.nodesDataSet) {
        // Get current node IDs
        const currentIds = this.nodesDataSet.getIds();
        const newIds = nodes.map(n => n.id);

        // Remove nodes that are no longer in the new list
        const toRemove = currentIds.filter(id => !newIds.includes(id));
        if (toRemove.length > 0) {
          this.nodesDataSet.remove(toRemove);
        }

        // Update existing nodes and add new ones (enrich with tooltips if json_data present)
        this.nodesDataSet.update(this.enrichNodesWithTitles(nodes));
      }
    },

    setEdges(edges) {
      if (this.edgesDataSet) {
        // Get current edge IDs
        const currentIds = this.edgesDataSet.getIds();
        const newIds = edges.map(e => e.id).filter(id => id !== undefined);

        // Remove edges that are no longer in the new list
        const toRemove = currentIds.filter(id => !newIds.includes(id));
        if (toRemove.length > 0) {
          this.edgesDataSet.remove(toRemove);
        }

        // Update existing edges and add new ones
        this.edgesDataSet.update(edges);
      }
    },

    updatePositions(){
      console.log("update_positions requested");
      // Update all node positions from the network
      for (let node of this.nodesDataSet.get()) {
        const pos = this.network.getPosition(node.id);
        node.x = pos.x;
        node.y = pos.y;
        this.nodesDataSet.update(node);
      }
      // Sync back to Python
      this.emitNodesAndEdges()
    },

    setOptions(options) {
      this._options = { ...this._options, ...options };
      if (this.network) {
        this.network.setOptions(this._options);
      }
    },

    setManipulationState(state) {
      if (!this.network) return;

      // Ignore empty state (used for change detection in Python)
      if (!state || state === "") return;

      console.log("Setting manipulation state:", state);

      if (state === "disableEditMode") {
        this.network.setOptions({
          manipulation: {
            enabled: false,
            ...this._manipulationCallbacks
          }
        });
      } else if (state === "addNodeMode") {
        // Enable manipulation
        this.network.setOptions({
          manipulation: {
            enabled: true,
            ...this._manipulationCallbacks
          }
        });
        // Enter add node mode
        this.network.addNodeMode();
      } else if (state === "addEdgeMode") {
        // Enable manipulation
        this.network.setOptions({
          manipulation: {
            enabled: true,
            ...this._manipulationCallbacks
          }
        });
        // Enter add edge mode
        this.network.addEdgeMode();
      }
    },

    // =========================================================================
    // Incremental Graph Update Methods
    // =========================================================================

    handleGraphAction(actionData) {
      if (!actionData || !actionData.action) return;

      const { action, payload } = actionData;

      switch (action) {
        case 'addNode':
          this.addSingleNode(payload);
          break;
        case 'addEdge':
          this.addSingleEdge(payload);
          break;
        case 'updateNode':
          this.updateNode(payload);
          break;
        case 'updateEdge':
          this.updateEdge(payload);
          break;
        case 'removeNode':
          this.removeSingleNode(typeof payload === 'object' ? payload.id : payload);
          break;
        case 'removeEdge':
          this.removeSingleEdge(payload);
          break;
        case 'clear':
          this.clearGraph();
          break;
        case 'batch':
          this.executeBatch(payload);
          break;
        case 'mergeNodes':
          this.mergeNodes(payload.sourceId, payload.targetId, payload.mergeProperties);
          break;
        case 'updateNodes':
          this.updateNodes(payload);
          break;
        case 'updateNodeState':
          this.updateNodeState(payload.nodeIds, payload.state);
          break;
        case 'executeStep':
          this.executeStep(payload);
          break;
      }
    },

    // Execute a step from a playbook sequence (flat JSON format).
    // After executing all actions, emitNodesAndEdges() syncs the DataSet state
    // back to Python via model.set("nodes"/edges") -> param framework.
    // This keeps Python's self.nodes/self.edges in sync with the JS DataSets,
    // avoiding the need for manual state tracking on the Python side.
    executeStep(stepData) {
      if (!stepData || !stepData.actions) return;

      for (const actionData of stepData.actions) {
        this.executeAction(actionData);
      }

      // Sync DataSet changes back to Python (nodes/edges params)
      //this.emitNodesAndEdges();
    },

    // Execute a single action in flat format (properties at root level)
    executeAction(actionData) {
      if (!actionData || !actionData.action) return;

      switch (actionData.action) {
        case 'addNode':
          this.addNodeFromAction(actionData);
          break;
        case 'addEdge':
          this.addEdgeFromAction(actionData);
          break;
        case 'updateNode':
          this.updateNodeFromAction(actionData);
          break;
        case 'updateNodeState':
          this.updateNodeState(actionData.nodeIds, actionData.state);
          break;
        case 'mergeNodes':
          this.mergeNodes(actionData.sourceId, actionData.targetId, true);
          break;
        case 'removeNode':
          this.removeSingleNode(actionData.id);
          break;
        case 'pause':
        case 'complete':
          // These are handled by Python side for timing
          break;
      }
    },

    // Enrich nodes that have json_data with a colored YAML tooltip (title DOM element)
    enrichNodesWithTitles(nodes) {
      return nodes.map(node => {
        if (node.json_data && !node.title) {
          const title = this.buildNodeTitle(node.json_data);
          if (title) return { ...node, title };
        }
        return node;
      });
    },

    // Build a colored YAML tooltip as a DOM element from json_data.
    // vis-network's Popup.setText() uses innerText for strings (no HTML),
    // but supports DOM Elements via appendChild -- so we return a <pre> element.
    buildNodeTitle(jsonData) {
      if (!jsonData || typeof jsonData !== 'object' || Object.keys(jsonData).length === 0) {
        return undefined;
      }
      const yamlStr = yaml.dump(jsonData, { indent: 2, lineWidth: -1 });
      const pre = document.createElement('pre');
      pre.style.cssText = 'margin:0; font-family:Consolas,Monaco,monospace; font-size:12px; white-space:pre;';

      for (const line of yamlStr.split('\n')) {
        if (!line) continue;
        const match = line.match(/^(\s*)(- )?([^:]+?)(:)(.*)$/);
        if (match) {
          const [, indent, dash, key, colon, rest] = match;
          pre.appendChild(document.createTextNode(indent + (dash || '')));
          const keySpan = document.createElement('span');
          keySpan.style.color = '#0550ae';
          keySpan.textContent = key;
          pre.appendChild(keySpan);
          pre.appendChild(document.createTextNode(colon));
          if (rest.trim()) {
            const valSpan = document.createElement('span');
            const trimmed = rest.trim();
            if (/^\d+(\.\d+)?$/.test(trimmed)) {
              valSpan.style.color = '#0a3069';
            } else if (trimmed === 'true' || trimmed === 'false' || trimmed === 'null') {
              valSpan.style.color = '#cf222e';
            } else {
              valSpan.style.color = '#116329';
            }
            valSpan.textContent = rest;
            pre.appendChild(valSpan);
          }
          pre.appendChild(document.createTextNode('\n'));
        } else {
          pre.appendChild(document.createTextNode(line + '\n'));
        }
      }
      return pre;
    },

    // Add node from flat action format with type-based styling
    addNodeFromAction(actionData) {
      const nodeType = actionData.type || 'instance';
      const initialState = actionData.state || (nodeType === 'instance' ? 'new' : 'stored');

      const node = {
        id: actionData.id,
        label: actionData.label,
        nodeType: nodeType,
        nodeState: initialState,
        color: {
          background: this.getNodeColor(nodeType),
          border: this.getStateBorderColor(initialState)
        },
        borderWidth: this.getStateBorderWidth(initialState)
      };

      // Store json_data and generate YAML tooltip if present
      if (actionData.json_data !== undefined) {
        node.json_data = actionData.json_data;
        const title = this.buildNodeTitle(actionData.json_data);
        if (title !== undefined) node.title = title;
      }

      if (this.nodesDataSet) {
        this.nodesDataSet.add(node);
      }
    },

    // Add edge from flat action format
    addEdgeFromAction(actionData) {
      const edge = {
        id: actionData.id || `${actionData.from}-${actionData.to}-${actionData.label || 'link'}`,
        from: actionData.from,
        to: actionData.to,
        label: actionData.label || '',
        dashes: actionData.dashed || false
      };

      if (this.edgesDataSet) {
        this.edgesDataSet.add(edge);
      }
    },

    // Update node from flat action format
    updateNodeFromAction(actionData) {
      if (!this.nodesDataSet) return;

      const updateData = { id: actionData.id };
      if (actionData.label !== undefined) updateData.label = actionData.label;
      if (actionData.state !== undefined) {
        const node = this.nodesDataSet.get(actionData.id);
        updateData.nodeState = actionData.state;
        updateData.color = {
          background: node?.color?.background,
          border: this.getStateBorderColor(actionData.state)
        };
        updateData.borderWidth = this.getStateBorderWidth(actionData.state);
      }

      // Update json_data and regenerate YAML tooltip if present
      if (actionData.json_data !== undefined) {
        updateData.json_data = actionData.json_data;
        const title = this.buildNodeTitle(actionData.json_data);
        updateData.title = title !== undefined ? title : undefined;
      }

      this.nodesDataSet.update(updateData);
    },

    getNodeColor(type) {
      if (type === 'class') return '#ff9999';
      if (type === 'input') return '#999999';
      return '#69b3a2';  // instance
    },

    updateNodes(nodesData) {
      if (this.nodesDataSet && Array.isArray(nodesData)) {
        this.nodesDataSet.update(nodesData);
      }
    },

    updateNodeState(nodeIds, state) {
      if (!this.nodesDataSet || !Array.isArray(nodeIds)) return;

      const borderColor = this.getStateBorderColor(state);
      const borderWidth = this.getStateBorderWidth(state);

      nodeIds.forEach(nodeId => {
        const node = this.nodesDataSet.get(nodeId);
        if (node) {
          this.nodesDataSet.update({
            id: nodeId,
            nodeState: state,
            color: {
              background: node.color?.background,
              border: borderColor
            },
            borderWidth: borderWidth
          });
        }
      });
    },

    getStateBorderColor(state) {
      if (state === 'new') return '#ff0000';
      if (state === 'modified') return '#ffcc00';
      return '#333333';  // stored
    },

    getStateBorderWidth(state) {
      return (state === 'new' || state === 'modified') ? 3 : 2;
    },

    addSingleNode(nodeData) {
      if (this.nodesDataSet && nodeData) {
        this.nodesDataSet.add(nodeData);
      }
    },

    addSingleEdge(edgeData) {
      if (this.edgesDataSet && edgeData) {
        this.edgesDataSet.add(edgeData);
      }
    },

    updateNode(nodeData) {
      if (this.nodesDataSet && nodeData && nodeData.id !== undefined) {
        this.nodesDataSet.update(nodeData);
      }
    },

    updateEdge(edgeData) {
      if (!this.edgesDataSet || !edgeData) return;

      if (edgeData.id !== undefined) {
        this.edgesDataSet.update(edgeData);
      } else if (edgeData.from !== undefined && edgeData.to !== undefined) {
        // Find edge by from/to and update
        const existingEdge = this.edgesDataSet.get().find(
          e => e.from === edgeData.from && e.to === edgeData.to
        );
        if (existingEdge) {
          this.edgesDataSet.update({ ...edgeData, id: existingEdge.id });
        }
      }
    },

    removeSingleNode(nodeId) {
      if (this.nodesDataSet && nodeId !== undefined) {
        this.nodesDataSet.remove(nodeId);
      }
    },

    removeSingleEdge(edgeData) {
      if (!this.edgesDataSet) return;

      if (typeof edgeData === 'object') {
        if (edgeData.id !== undefined) {
          this.edgesDataSet.remove(edgeData.id);
        } else if (edgeData.from !== undefined && edgeData.to !== undefined) {
          const existingEdge = this.edgesDataSet.get().find(
            e => e.from === edgeData.from && e.to === edgeData.to
          );
          if (existingEdge) {
            this.edgesDataSet.remove(existingEdge.id);
          }
        }
      } else {
        this.edgesDataSet.remove(edgeData);
      }
    },

    clearGraph() {
      if (this.nodesDataSet) {
        this.nodesDataSet.clear();
      }
      if (this.edgesDataSet) {
        this.edgesDataSet.clear();
      }
    },

    executeBatch(actions) {
      if (!Array.isArray(actions)) return;

      const nodesToAdd = [];
      const nodesToUpdate = [];
      const nodesToRemove = [];
      const edgesToAdd = [];
      const edgesToUpdate = [];
      const edgesToRemove = [];

      // Collect all operations
      actions.forEach(item => {
        const { action, payload } = item;

        switch (action) {
          case 'addNode':
            nodesToAdd.push(payload);
            break;
          case 'addEdge':
            edgesToAdd.push(payload);
            break;
          case 'updateNode':
            nodesToUpdate.push(payload);
            break;
          case 'updateEdge':
            edgesToUpdate.push(payload);
            break;
          case 'removeNode':
            const nodeId = typeof payload === 'object' ? payload.id : payload;
            nodesToRemove.push(nodeId);
            break;
          case 'removeEdge':
            if (typeof payload === 'object' && payload.id !== undefined) {
              edgesToRemove.push(payload.id);
            } else if (typeof payload === 'object') {
              const edge = this.edgesDataSet.get().find(
                e => e.from === payload.from && e.to === payload.to
              );
              if (edge) edgesToRemove.push(edge.id);
            } else {
              edgesToRemove.push(payload);
            }
            break;
        }
      });

      // Execute in optimal order: remove first, then update, then add
      if (nodesToRemove.length > 0) this.nodesDataSet.remove(nodesToRemove);
      if (edgesToRemove.length > 0) this.edgesDataSet.remove(edgesToRemove);
      if (nodesToUpdate.length > 0) this.nodesDataSet.update(nodesToUpdate);
      if (edgesToUpdate.length > 0) this.edgesDataSet.update(edgesToUpdate);
      if (nodesToAdd.length > 0) this.nodesDataSet.add(nodesToAdd);
      if (edgesToAdd.length > 0) this.edgesDataSet.add(edgesToAdd);
    },

    mergeNodes(sourceId, targetId, mergeProperties = true) {
      if (!this.nodesDataSet || !this.edgesDataSet) return;

      const sourceNode = this.nodesDataSet.get(sourceId);
      const targetNode = this.nodesDataSet.get(targetId);

      if (!sourceNode || !targetNode) return;

      // Optionally merge properties
      if (mergeProperties) {
        const mergedProps = { ...sourceNode };
        delete mergedProps.id;
        this.nodesDataSet.update({ id: targetId, ...mergedProps });
      }

      // Redirect edges
      const allEdges = this.edgesDataSet.get();
      const edgesToUpdate = [];
      const edgesToRemove = [];

      allEdges.forEach(edge => {
        let newFrom = edge.from;
        let newTo = edge.to;

        if (edge.from === sourceId) newFrom = targetId;
        if (edge.to === sourceId) newTo = targetId;

        // Skip self-loops
        if (newFrom === newTo) {
          edgesToRemove.push(edge.id);
        } else if (newFrom !== edge.from || newTo !== edge.to) {
          edgesToUpdate.push({ id: edge.id, from: newFrom, to: newTo });
        }
      });

      // Apply edge updates
      if (edgesToUpdate.length > 0) {
        this.edgesDataSet.update(edgesToUpdate);
      }
      if (edgesToRemove.length > 0) {
        this.edgesDataSet.remove(edgesToRemove);
      }

      // Remove source node
      this.nodesDataSet.remove(sourceId);

      // Emit changes
      this.emitNodesAndEdges();
    },

    // =========================================================================
    // Context Menu Methods
    // =========================================================================

    showContextMenu(event, elementType, elementId, callbackNameDict) {
      // Convert dict to menu items array
      const menuItems = [];
      for (const [actionId, label] of Object.entries(callbackNameDict)) {
        if (typeof label === 'string') {
          menuItems.push({ id: actionId, label: label });
        }
      }

      if (menuItems.length === 0) return;

      // Calculate position relative to wrapper
      const wrapper = this.$el;
      const rect = wrapper.getBoundingClientRect();

      this.ctxElementType = elementType;
      this.ctxElementId = elementId;
      this.ctxMenuItems = menuItems;
      this.ctxX = event.clientX - rect.left;
      this.ctxY = event.clientY - rect.top;
      this.ctxVisible = true;

      // Adjust position on next tick to prevent overflow
      this.$nextTick(() => {
        const menu = this.$refs.ctxMenu;
        if (menu) {
          const menuRect = menu.getBoundingClientRect();
          const wrapperRect = wrapper.getBoundingClientRect();

          // Adjust X if overflowing right edge
          if (this.ctxX + menuRect.width > wrapperRect.width) {
            this.ctxX = wrapperRect.width - menuRect.width - 5;
          }
          // Adjust Y if overflowing bottom edge
          if (this.ctxY + menuRect.height > wrapperRect.height) {
            this.ctxY = wrapperRect.height - menuRect.height - 5;
          }

          // Ensure minimum padding from edges
          this.ctxX = Math.max(5, this.ctxX);
          this.ctxY = Math.max(5, this.ctxY);
        }
      });
    },

    hideContextMenu() {
      this.ctxVisible = false;
      this.ctxMenuItems = [];
      this.ctxElementType = null;
      this.ctxElementId = null;
    },

    onContextMenuItem(actionId) {
      // Capture values before hiding menu
      const elementType = this.ctxElementType;
      const elementId = this.ctxElementId;

      // Hide menu
      this.hideContextMenu();

      // Emit contextmenu event to Python
      this.$emit('network-event', {
        event_name: 'contextmenu',
        event_params: {
          element_type: elementType,
          element_id: elementId,
          action_id: actionId
        }
      });
    },

    // =========================================================================
    // Node Duplication Helpers
    // =========================================================================

    generateId() {
      // Generate a unique ID for duplicated nodes
      // Check existing nodes to determine ID format
      const existingIds = this.nodesDataSet.getIds();

      // If all IDs are numbers, find max and increment
      const allNumeric = existingIds.every(id => typeof id === 'number');
      if (allNumeric && existingIds.length > 0) {
        return Math.max(...existingIds) + 1;
      }

      // Otherwise use string-based UUID
      return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    duplicateNode(node) {
      // Create a deep copy of the node with a new ID
      const newNode = {};

      // Generate new ID
      newNode.id = this.generateId();

      // Copy all properties except id
      for (const key in node) {
        if (key !== 'id' && typeof node[key] !== 'function') {
          // Deep copy objects to avoid reference issues
          if (typeof node[key] === 'object' && node[key] !== null) {
            newNode[key] = JSON.parse(JSON.stringify(node[key]));
          } else {
            newNode[key] = node[key];
          }
        }
      }

      return newNode;
    }
  },

  mounted() {
    this.initNetwork();

    // Add ESC key listener to close context menu
    this._keydownHandler = (e) => {
      if (e.key === 'Escape' && this.ctxVisible) {
        this.hideContextMenu();
      }
    };
    document.addEventListener('keydown', this._keydownHandler);
  },

  beforeUnmount() {
    if (this.network) {
      this.network.destroy();
      this.network = null;
    }

    // Clean up ESC key listener
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
    }
  }
};
</script>
