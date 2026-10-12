<template>
    <div class="json-editor-scroll-area h-100" data-bs-theme="light">
        <div ref="editorHolder"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import * as jsonEditorModule from '@json-editor/json-editor';

const props = defineProps({
    model: Object
});

const editorHolder = ref(null);
let editor = null;
let currentSortCol = null;
let currentSortAsc = true;

const injectCSS = (href, targetNode) => {
    if (targetNode && !targetNode.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        targetNode.appendChild(link);
    }
};

const buildSchema = (data) => {
    if (data.error) {
        return { type: "string", title: "Error", default: data.error };
    }

    const headers = data.headers || [];
    const properties = {};

    headers.forEach(h => {
        properties[h] = { type: "string", title: h };
    });

    return {
        type: "array",
        title: "Results",
        format: "table",
        options: {
            disable_add: true,
            disable_delete: true,
            disable_edit_json: true,
            disable_properties: true,
            disable_collapse: true
        },
        items: { type: "object", properties: properties }
    };
};

const applySortingUI = (headers) => {
    const ths = editorHolder.value.querySelectorAll('table thead th');

    ths.forEach((th, index) => {
        if (headers[index]) {
            th.style.cursor = 'pointer';
            th.style.userSelect = 'none';
            th.style.whiteSpace = 'nowrap';

            // Add visual sort indicators
            if (currentSortCol === headers[index]) {
                th.innerHTML = `${headers[index]} <span style="font-size: 0.8em; margin-left: 5px;">${currentSortAsc ? '▲' : '▼'}</span>`;
            } else {
                th.innerHTML = `${headers[index]} <span style="font-size: 0.8em; margin-left: 5px; color: #ccc;">↕</span>`;
            }

            th.onclick = () => {
                const col = headers[index];
                if (currentSortCol === col) {
                    currentSortAsc = !currentSortAsc;
                } else {
                    currentSortCol = col;
                    currentSortAsc = true;
                }

                let currentData = editor.getValue();
                currentData.sort((a, b) => {
                    let valA = String(a[col] || '');
                    let valB = String(b[col] || '');
                    return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
                });

                editor.setValue(currentData);
                editor.disable(); // Re-enforce read-only state after value change
                applySortingUI(headers); // Update arrows
            };
        }
    });
};

onMounted(async () => {
    await nextTick();
    const shadowRoot = editorHolder.value.getRootNode();

    injectCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', shadowRoot);
    injectCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', document.head);

    const JSONEditor = jsonEditorModule.JSONEditor || jsonEditorModule.default?.JSONEditor || window.JSONEditor;
    const initialData = props.model?.get('value') || { headers: [], data: [] };

    editor = new JSONEditor(editorHolder.value, {
        theme: 'bootstrap5',
        schema: buildSchema(initialData),
        startval: initialData.data || []
    });

    editor.on('ready', () => {
        editor.disable(); // Locks the entire table to strictly read-only natively
        if (initialData.headers && initialData.headers.length > 0) {
            applySortingUI(initialData.headers);
        }
    });

    props.model?.on('change:value', () => {
        const newData = props.model.get('value');
        if (!editor || !newData) return;

        currentSortCol = null; // Reset sort state on new query

        editor.destroy();
        editor = new JSONEditor(editorHolder.value, {
            theme: 'bootstrap5',
            schema: buildSchema(newData),
            startval: newData.data || []
        });

        editor.on('ready', () => {
            editor.disable();
            if (newData.headers && newData.headers.length > 0) {
                applySortingUI(newData.headers);
            }
        });
    });
});

onBeforeUnmount(() => {
    if (editor) editor.destroy();
});
</script>