<template>
  <div class="visnetwork-wrapper">
    <div ref="networkContainer" class="network-canvas"></div>
  </div>
</template>

<script>
import { Network, DataSet } from "vis-network/standalone";

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
      network: null,
      nodesDataSet: null,
      edgesDataSet: null,
      _options: {}
    };
  },

  methods: {
    initNetwork() {
      // Create DataSets
      this.nodesDataSet = new DataSet(this.nodes);
      this.edgesDataSet = new DataSet(this.edges);

      // Default options
      const defaultOptions = {
        manipulation: {
          enabled: true,
          initiallyActive: true,
          addNode: true,
          addEdge: true,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
        },
        interaction: { multiselect: true },
        nodes: {
          shape: "dot",
          size: 10,
        },
      };

      // Merge options
      this._options = { ...defaultOptions, ...this.options };

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

      // Setup event listeners
      this.setupEventListeners();
      this.setupDragDrop();

      // Emit ready
      this.$emit('ready', true);
    },

    setupEventListeners() {
      const network = this.network;
      const nodesDataSet = this.nodesDataSet;

      // Click event
      network.on('click', (params) => {
        if (params.nodes.length > 0) {
          this.sendEvent("click", params);
        }
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
          const node = nodesDataSet.get(params.nodes[0]);
          if (node) {
            const position = network.getPosition(params.nodes[0]);
            node.x = position.x;
            node.y = position.y;
            node.fixed = false;
            nodesDataSet.update(node);
          }
          this.sendEvent("dragStart", params);
        }
      });

      network.on('dragEnd', (params) => {
        if (params.nodes.length > 0) {
          // Update all node positions
          const allNodes = nodesDataSet.get();
          for (const node of allNodes) {
            const pos = network.getPosition(node.id);
            node.x = pos.x;
            node.y = pos.y;

            if (node.id === params.nodes[0]) {
              node.fixed = true;
            }
            nodesDataSet.update(node);
          }

          // Emit updated nodes
          this.$emit('change:nodes', nodesDataSet.get());
          this.sendEvent("dragEnd", params);
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
      this.$emit('change:nodes', this.nodesDataSet.get());
      this.$emit('change:edges', this.edgesDataSet.get());
    },

    // Methods called from bridge layer
    setNodes(nodes) {
      if (this.nodesDataSet) {
        // Clear and update with new nodes
        this.nodesDataSet.clear();
        this.nodesDataSet.add(nodes);
      }
    },

    setEdges(edges) {
      if (this.edgesDataSet) {
        this.edgesDataSet.clear();
        this.edgesDataSet.add(edges);
      }
    },

    setOptions(options) {
      this._options = { ...this._options, ...options };
      if (this.network) {
        this.network.setOptions(this._options);
      }
    },

    setManipulationState(state) {
      if (!this.network) return;

      if (state === "disableEditMode") {
        this.network.disableEditMode();
      } else if (state === "addNodeMode") {
        this.network.addNodeMode();
      } else if (state === "addEdgeMode") {
        this.network.addEdgeMode();
      }
    }
  },

  mounted() {
    this.initNetwork();
  },

  beforeUnmount() {
    if (this.network) {
      this.network.destroy();
      this.network = null;
    }
  }
};
</script>
