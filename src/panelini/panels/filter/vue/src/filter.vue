<template>
    <div v-if="errorMsg" class="alert alert-danger mb-3">
        <strong>Error:</strong> {{ errorMsg }}
    </div>

    <div class="json-editor-scroll-area d-flex flex-column h-100" data-bs-theme="light">
        <div ref="editorHolder" class="flex-grow-1"></div>

        <div class="m-3 d-flex justify-content-end border-top pt-3">
            <button class="btn btn-secondary col-3 me-2" @click="cancelQuery">Cancel</button>
            <button class="btn btn-primary col-3" @click="applyQuery">Apply</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import * as jsonEditorModule from '@json-editor/json-editor';

const props = defineProps({
    model: Object
});

const editorHolder = ref(null);
const errorMsg = ref('');
let editor = null;
let isUpdating = false;

const bsSelect = { "class": "form-select" };
const flatContainer = { "class": "border-0 p-0 m-0 bg-transparent shadow-none" };

const filterSchema = {
    "type": "object",
    "format": "categories",
    "title": " ",
    "properties": {
        "Simple": {
            "type": "array",
            "minItems": 1,
            "options": {
                "category": "Simple",
                "containerAttributes": flatContainer,
                "titleHidden": true
            },
            "items": {
                "type": "object",
                "format": "grid",
                "options": {
                    "containerAttributes": flatContainer,
                    "inputAttributes": flatContainer,
                    "titleHidden": true
                },
                "properties": {
                    "subject": {
                        "type": "string",
                        "title": "Subject",
                        "enum": ["?s", "Person", "Organization", "Location"],
                        "options": { "grid_columns": 4, "inputAttributes": bsSelect }
                    },
                    "predicate": {
                        "type": "string",
                        "title": "Predicate",
                        "enum": ["?p", "hasName", "hasAge", "locatedIn"],
                        "options": { "grid_columns": 4, "inputAttributes": bsSelect }
                    },
                    "object": {
                        "type": "string",
                        "title": "Object",
                        "enum": ["?o", "John", "30", "Norway"],
                        "options": { "grid_columns": 4, "inputAttributes": bsSelect }
                    },
                    "logic": {
                        "type": "string",
                        "title": "Relation Logic",
                        "enum": ["AND", "OR"],
                        "default": "AND",
                        "options": { "grid_columns": 2, "inputAttributes": bsSelect }
                    },
                    "modifier": {
                        "type": "string",
                        "title": "Modifier",
                        "enum": ["", "NOT"],
                        "default": "",
                        "options": { "grid_columns": 2, "inputAttributes": bsSelect }
                    }
                }
            },
            "default": [
                { "subject": "?s", "predicate": "?p", "object": "?o", "logic": "AND", "modifier": "" }
            ]
        },
        "Advanced": {
            "type": "object",
            "options": {
                "category": "Advanced",
                "containerAttributes": flatContainer,
                "titleHidden": true
            },
            "properties": {
                "query": {
                    "type": "string",
                    "title": " ",
                    "format": "textarea",
                    "options": {
                        "inputAttributes": {
                            "class": "form-control",
                            "style": "font-family: monospace; min-height: 200px"
                        },
                        "compact": true
                    }
                }
            }
        }
    }
};

const injectCSS = (href, targetNode) => {
    if (targetNode && !targetNode.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        targetNode.appendChild(link);
    }
};

const cancelQuery = () => {
    if (props.model && editor) {
        let val = editor.getValue();
        val = JSON.parse(JSON.stringify(val || {}));
        val._trigger_cancel = Date.now();
        props.model.set('value', val);
        props.model.save_changes();
    }
};

const applyQuery = () => {
    if (props.model && editor) {
        let val = editor.getValue();
        val = JSON.parse(JSON.stringify(val || {}));
        val._trigger_apply = Date.now();
        props.model.set('value', val);
        props.model.save_changes();
    }
};

// Layout manager that specifically targets explicit data-schemapath indices
const updateLayout = () => {
    nextTick(() => {
        const shadowRoot = editorHolder.value?.getRootNode();
        if (!shadowRoot || !editor) return;

        // 1. Get the TRUE length of the active array directly from the editor's data
        const currentData = editor.getValue();
        const actualLength = currentData?.Simple?.length || 0;

        // 2. Loop strictly up to the actual active length, ignoring the hidden ghost nodes
        for (let index = 0; index < actualLength; index++) {
            const isLast = (index === actualLength - 1);

            const logicNode = shadowRoot.querySelector(`[data-schemapath="root.Simple.${index}.logic"]`);
            const modNode = shadowRoot.querySelector(`[data-schemapath="root.Simple.${index}.modifier"]`);

            isLast ? logicNode.classList.add('d-none') : logicNode.classList.remove('d-none');
            isLast ? modNode.classList.add('d-none') : modNode.classList.remove('d-none');

            console.log(isLast, logicNode)
        };
    });
};

onMounted(async () => {
    await nextTick();
    const shadowRoot = editorHolder.value.getRootNode();

    injectCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', shadowRoot);
    injectCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', shadowRoot);
    injectCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', document.head);

    try {
        const JSONEditor = jsonEditorModule.JSONEditor || jsonEditorModule.default?.JSONEditor || window.JSONEditor;

        editor = new JSONEditor(editorHolder.value, {
            theme: 'bootstrap5',
            iconlib: 'fontawesome5',
            schema: filterSchema,
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            show_opt_in: false,
            disable_array_reorder: true,
            disable_array_delete_all_rows: true,
            remove_button_labels: true,
            prompt_before_delete: false
        });

        editor.on('ready', () => {
            const tabs = shadowRoot.querySelectorAll('.nav-tabs .nav-item');
            tabs.forEach(tab => {
                if (tab.textContent.trim() === 'Basic') tab.style.display = 'none';
            });
            const navLinks = shadowRoot.querySelectorAll('.nav-tabs .nav-link');
            navLinks.forEach(link => {
                if (link.textContent.trim() === 'Simple') link.click();
            });

            updateLayout();
        });

        editor.on('change', () => {
            if (isUpdating) return;
            let val = editor.getValue();

            let isSimpleActive = true;
            const navLinks = shadowRoot.querySelectorAll('.nav-tabs .nav-link');
            navLinks.forEach(link => {
                if (link.textContent.trim() === 'Advanced' && link.classList.contains('active')) {
                    isSimpleActive = false;
                }
            });

            if (isSimpleActive && val && val.Simple && Array.isArray(val.Simple)) {
                let queryParts = [];
                val.Simple.forEach((row, i) => {
                    let rowText = `${row.subject || '?s'} ${row.predicate || '?p'} ${row.object || '?o'}`;
                    if (i > 0) {
                        let prevRow = val.Simple[i - 1];
                        if (prevRow.modifier === 'NOT') {
                            rowText = `NOT (${rowText})`;
                        }
                        queryParts.push(`\n${prevRow.logic}\n`);
                    }
                    queryParts.push(rowText);
                });

                const newAdvanced = queryParts.join('');
                if (!val.Advanced) val.Advanced = {};

                if (val.Advanced.query !== newAdvanced) {
                    isUpdating = true;
                    const advEditor = editor.getEditor('root.Advanced.query');
                    if (advEditor) advEditor.setValue(newAdvanced);
                    val.Advanced.query = newAdvanced;
                    isUpdating = false;
                }
            }

            updateLayout();

            if (props.model) {
                val = JSON.parse(JSON.stringify(val || {}));
                props.model.set('value', val);
            }
        });

    } catch (err) {
        console.error("Failed to initialize JSON Editor:", err);
        errorMsg.value = String(err);
    }
});

onBeforeUnmount(() => {
    if (editor) editor.destroy();
});
</script>