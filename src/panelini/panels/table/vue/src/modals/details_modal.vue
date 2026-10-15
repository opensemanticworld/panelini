<template>
    <div v-if="show" class="modal d-block bg-black bg-opacity-50" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable h-100 my-0 py-4">
            <div class="modal-content shadow-lg mh-100">

                <div class="modal-header bg-light">
                    <h5 class="modal-title fw-bold">
                        <i class="fas fa-list me-2 text-primary" /> Row Details
                    </h5>
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </div>

                <div class="modal-body p-0">
                    <table class="table m-0">
                        <thead class="table-light sticky-top">
                            <tr>
                                <th>Column</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, key) in rowData" :key="key">
                                <td class="fw-bold text-break text-secondary">{{ key }}</td>
                                <td class="text-break font-monospace">
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