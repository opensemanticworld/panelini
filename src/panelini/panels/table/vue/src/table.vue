<template>
    <div class="d-flex flex-column h-100 w-100" data-bs-theme="light" style="min-height: 0;">

        <!-- Header Row -->
        <div v-if="hasQueried" class="d-flex justify-content-between align-items-center"
            style="flex: 0 0 auto; padding: 10px; border-bottom: 1px solid #dee2e6; color: var(--background-text-color);">
            <div style="font-size: 1.17em; font-weight: 600;">
                Results: {{ totalRows }}
            </div>
            <button class="btn btn-sm btn-outline-primary" @click="showColModal = true">
                <i class="fas fa-filter me-1"></i> Columns
            </button>
        </div>

        <!-- Scrollable Wrapper -->
        <div style="flex: 1 1 auto; overflow: auto; min-height: 0; background-color: white; padding: 10px;">
            <div ref="editorHolder"></div>
        </div>

        <!-- External Modals -->
        <FilterModal v-model:show="showColModal" :all-headers="allHeaders" :visible-columns="visibleColumns"
            @apply="applyColumns" />

        <DetailsModal v-model:show="showRowModal" :row-data="selectedRowData" />

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import * as jsonEditorModule from '@json-editor/json-editor';
import FilterModal from './modals/filter_modal.vue';
import DetailsModal from './modals/details_modal.vue';

const props = defineProps({
    model: Object
});

const editorHolder = ref(null);
let editor = null;

// State
const hasQueried = ref(false);
const allData = ref([]);
const totalRows = computed(() => allData.value.length);

// Sorting & Columns State
const currentSortCol = ref(null);
const currentSortAsc = ref(true);
const allHeaders = ref([]);
const visibleColumns = ref([]);

// Modals State
const showColModal = ref(false);
const showRowModal = ref(false);
const selectedRowData = ref({});

const injectCSS = (href, targetNode) => {
    if (targetNode && !targetNode.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        targetNode.appendChild(link);
    }
};

const registerCustomEditors = (JSONEditor) => {
    if (JSONEditor.defaults.editors.actionBtn) return;

    class ActionBtnEditor extends JSONEditor.AbstractEditor {
        build() {
            this.btn = document.createElement('button');
            this.btn.className = 'btn btn-sm btn-outline-secondary py-0';
            this.btn.innerHTML = '<i class="fas fa-search"></i>';
            this.btn.type = 'button';
            this.container.appendChild(this.btn);

            this.btn.addEventListener('click', (e) => {
                e.preventDefault();
                const event = new CustomEvent('action-click', {
                    bubbles: true,
                    composed: true, // CRITICAL: Allows event to pierce Panel's Shadow DOM
                    detail: this.parent.getValue()
                });
                this.container.dispatchEvent(event);
            });
        }
        setValue() { }
        getValue() { return ""; }
        disable() { if (this.btn) this.btn.disabled = false; }
        enable() { if (this.btn) this.btn.disabled = false; }
        showValidationErrors() { }
        destroy() {
            if (this.btn && this.btn.parentNode) this.btn.parentNode.removeChild(this.btn);
            super.destroy();
        }
    }

    class ReadonlyTextEditor extends JSONEditor.AbstractEditor {
        build() {
            this.textNode = document.createElement('div');
            // Apply truncation class
            this.textNode.className = 'truncate-cell';
            this.container.appendChild(this.textNode);
        }
        setValue(val) {
            this.value = val;
            const strVal = val !== undefined && val !== null ? String(val) : "";
            this.textNode.textContent = strVal;
            // Native HTML tooltip to see full text when hovering over truncated cells
            this.textNode.title = strVal;
        }
        getValue() { return this.value; }
        disable() { }
        enable() { }
        showValidationErrors() { }
        destroy() {
            if (this.textNode && this.textNode.parentNode) this.textNode.parentNode.removeChild(this.textNode);
            super.destroy();
        }
    }

    JSONEditor.defaults.editors.actionBtn = ActionBtnEditor;
    JSONEditor.defaults.editors.readonlyText = ReadonlyTextEditor;

    JSONEditor.defaults.resolvers.unshift((schema) => {
        if (schema.type === 'string' && schema.format === 'action') return 'actionBtn';
        if (schema.type === 'string' && schema.format === 'readonlyText') return 'readonlyText';
    });
};

const buildSchema = () => {
    const properties = {};
    properties["_action"] = { type: "string", title: " ", format: "action", default: "" };

    // Hidden index to fetch full row data for the details modal
    properties["_rowIndex"] = { type: "integer", options: { hidden: true } };

    // Build schema using ONLY the columns currently checked
    visibleColumns.value.forEach(h => {
        properties[h] = { type: "string", title: h, format: "readonlyText", default: "" };
    });

    return {
        type: "array",
        title: "",
        format: "table",
        options: {
            titleHidden: true,
            disable_array_add: true,
            disable_array_delete: true,
            disable_array_delete_all_rows: true,
            disable_array_delete_last_row: true,
            disable_array_reorder: true,
            disable_collapse: true,
            disable_properties: true,
            className: "m-0"
        },
        items: {
            type: "object",
            properties: properties,
            additionalProperties: false // CRITICAL: Stops JSON-Editor from rendering hidden columns as huge UI blocks, fixing performance instantly
        }
    };
};

const getEditorData = () => {
    // Inject _rowIndex so we can retrieve the original full row (with hidden data) later
    return allData.value.map((row, index) => {
        return { ...row, _rowIndex: index };
    });
};

const applySortingUI = () => {
    const ths = editorHolder.value.querySelectorAll('table thead th');

    ths.forEach((th, index) => {
        if (index === 0) return; // Skip _action column
        if (index === 1) return; // Skip hidden _rowIndex column

        // Shift by 2 to perfectly match the remaining visible columns
        const colName = visibleColumns.value[index - 2];
        if (colName) {
            th.style.cursor = 'pointer';
            th.style.userSelect = 'none';
            th.style.whiteSpace = 'nowrap';

            if (currentSortCol.value === colName) {
                th.innerHTML = `${colName} <span style="font-size: 0.8em; margin-left: 5px;">${currentSortAsc.value ? '▲' : '▼'}</span>`;
            } else {
                th.innerHTML = `${colName} <span style="font-size: 0.8em; margin-left: 5px; color: #ccc;">↕</span>`;
            }

            th.onclick = () => {
                if (currentSortCol.value === colName) {
                    currentSortAsc.value = !currentSortAsc.value;
                } else {
                    currentSortCol.value = colName;
                    currentSortAsc.value = true;
                }

                allData.value.sort((a, b) => {
                    let valA = String(a[colName] || '');
                    let valB = String(b[colName] || '');
                    return currentSortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA);
                });

                updatePageView();
            };
        }
    });
};

const updatePageView = () => {
    if (editor) {
        editor.setValue(getEditorData());
        editor.disable();
        nextTick(() => { applySortingUI(); });
    }
};

const rebuildEditor = () => {
    if (editor) editor.destroy();

    const JSONEditor = jsonEditorModule.JSONEditor || jsonEditorModule.default?.JSONEditor || window.JSONEditor;

    editor = new JSONEditor(editorHolder.value, {
        theme: 'bootstrap5',
        schema: buildSchema(),
        startval: getEditorData()
    });

    editor.on('ready', () => {
        editor.disable();
        if (visibleColumns.value.length > 0) {
            applySortingUI();
        }
    });
};

const applyColumns = (newVisibleColumns) => {
    visibleColumns.value = newVisibleColumns;
    rebuildEditor();
};

const handleRowAction = (event) => {
    const editorRowData = event.detail;

    // Fetch the full original row (including hidden columns) using the injected index
    const originalRow = allData.value[editorRowData._rowIndex];

    if (originalRow) {
        const displayData = { ...originalRow };
        delete displayData._action;
        delete displayData._rowIndex;

        selectedRowData.value = displayData;
        showRowModal.value = true;
    }
};

onMounted(async () => {
    await nextTick();
    const shadowRoot = editorHolder.value.getRootNode();

    injectCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', shadowRoot);
    injectCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', shadowRoot);
    injectCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', document.head);

    const JSONEditor = jsonEditorModule.JSONEditor || jsonEditorModule.default?.JSONEditor || window.JSONEditor;
    registerCustomEditors(JSONEditor);

    props.model?.on('change:value', () => {
        const newData = props.model.get('value');
        if (!newData) return;

        hasQueried.value = !!newData.has_run;
        allData.value = newData.data || [];

        if (newData.headers && newData.headers.length > 0) {
            // Deduplicate headers to prevent owl:sameAs and others from rendering twice
            const uniqueHeaders = [...new Set(newData.headers)];
            allHeaders.value = uniqueHeaders;
            visibleColumns.value = [...uniqueHeaders];
        }

        currentSortCol.value = null;
        rebuildEditor();
    });
});

onBeforeUnmount(() => {
    if (editor) editor.destroy();
});
</script>