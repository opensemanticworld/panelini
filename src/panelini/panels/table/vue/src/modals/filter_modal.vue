<template>
    <div v-if="show" class="modal d-block bg-black bg-opacity-50" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Select Columns</h5>
                    <button type="button" class="btn-close" @click="close"></button>
                </div>
                <div class="modal-body overflow-y-auto" style="max-height: 60vh;">

                    <!-- Select / Deselect All Controls -->
                    <div class="d-flex mb-3 gap-2 border-bottom pb-3">
                        <button class="btn btn-sm btn-outline-primary" @click="selectAll">Select All</button>
                        <button class="btn btn-sm btn-outline-secondary" @click="deselectAll">Deselect All</button>
                    </div>

                    <div v-for="col in allHeaders" :key="col" class="form-check">
                        <input class="form-check-input" type="checkbox" :value="col" v-model="localVisible"
                            :id="'col-' + col">
                        <label class="form-check-label" :for="'col-' + col">{{ col }}</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="apply">Apply</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: Boolean,
    allHeaders: Array,
    visibleColumns: Array
});

const emit = defineEmits(['update:show', 'apply']);

const localVisible = ref([...props.visibleColumns]);

watch(() => props.show, (isShown) => {
    if (isShown) localVisible.value = [...props.visibleColumns];
});

const close = () => emit('update:show', false);

const apply = () => {
    // Strictly sort by the original header index
    const sortedVisible = [...localVisible.value].sort((a, b) => {
        return props.allHeaders.indexOf(a) - props.allHeaders.indexOf(b);
    });

    emit('apply', sortedVisible);
    close();
};

const selectAll = () => { localVisible.value = [...props.allHeaders]; };
const deselectAll = () => { localVisible.value = []; };
</script>