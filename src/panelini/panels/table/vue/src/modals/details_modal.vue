<template>
    <!-- position: fixed and z-index: 9999 guarantee it breaks out of the Panel wrapper and overlays the whole app -->
    <div v-if="show" class="modal d-block" tabindex="-1"
        style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; background: rgba(0,0,0,0.6);">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable h-100 my-0 py-4">
            <div class="modal-content shadow-lg" style="max-height: 100%;">

                <div class="modal-header bg-light">
                    <h5 class="modal-title fw-bold">
                        <i class="fas fa-list me-2 text-primary"></i> Row Details
                    </h5>
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </div>

                <div class="modal-body p-0">
                    <table class="table table-bordered table-hover mb-0">
                        <thead class="table-light sticky-top" style="z-index: 1;">
                            <tr>
                                <th style="width: 35%; background-color: #f8f9fa;">Column</th>
                                <th style="background-color: #f8f9fa;">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Iterate over the row data securely -->
                            <tr v-for="(value, key) in rowData" :key="key">
                                <td class="fw-bold text-break text-secondary">{{ key }}</td>
                                <td class="text-break" style="font-family: monospace;">
                                    {{ value !== '' && value !== null ? value : '-' }}
                                </td>
                            </tr>

                            <!-- Fallback if row is completely empty -->
                            <tr v-if="!rowData || Object.keys(rowData).length === 0">
                                <td colspan="2" class="text-center py-4 text-muted">
                                    No data available for this row.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer bg-light py-2">
                    <button type="button" class="btn btn-secondary" @click="close">Close</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    rowData: Object
});

const emit = defineEmits(['update:show']);

const close = () => {
    emit('update:show', false);
};
</script>