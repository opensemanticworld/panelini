<template>
    <div class="ontocombo" ref="containerRef">
        <div class="ontocombo-header form-control p-0 d-flex align-items-stretch" @click.stop="openDropdown">
            <input type="text" class="ontocombo-input flex-grow-1 px-2 border-0 bg-transparent" v-model="searchQuery"
                @focus="openDropdown" @click.stop="openDropdown" @input="onInput" :placeholder="placeholder"
                :readonly="isFlatList"
                :style="isFlatList ? 'cursor: pointer; outline: none !important; box-shadow: none !important; min-width: 0;' : 'outline: none !important; box-shadow: none !important; min-width: 0;'" />
            <div class="ontocombo-arrow d-flex align-items-center px-2 flex-shrink-0" @click.stop="toggleDropdown"
                style="cursor: pointer;">
                <i class="fas" :class="isOpen ? 'fa-caret-down' : 'fa-caret-right'"></i>
            </div>
        </div>

        <Teleport to="body">
            <div v-if="isOpen" class="ontocombo-dropdown" :style="dropdownStyle" @click.stop>
                <template v-for="item in visibleItems" :key="item.id">
                    <div v-if="item.isGroup" class="ontocombo-row is-group" :class="getDepthClass(item.level, true)"
                        :style="{ display: 'flex', cursor: 'pointer', 'align-items': 'center', padding: `0 ${item.level * 16 + 8}px` }"
                        @click.stop="toggleGroup(item.id)">
                        <!-- Use a non-breaking space if the label is exactly empty so the row stays clickable -->
                        <span class="row-label flex-grow-1 text-start" :title="item.label">{{ item.label === '' ?
                            '\u00A0' : item.label }}</span>
                        <i class="fas row-toggle" :class="item.expanded ? 'fa-caret-down' : 'fa-caret-right'"></i>
                    </div>
                    <div v-else class="ontocombo-row is-element" :class="getDepthClass(item.level, false)"
                        :style="{ cursor: 'pointer', paddingLeft: `${item.level * 16 + 8}px` }"
                        @click.stop="selectItem(item)">
                        <span class="row-label flex-grow-1 text-start" :title="item.label">{{ item.label === '' ?
                            '\u00A0' : item.label }}</span>
                    </div>
                </template>
                <div v-if="visibleItems.length === 0" class="ontocombo-empty">
                    Using custom value: "{{ searchQuery }}"
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
    modelValue: String,
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const containerRef = ref(null);
const isOpen = ref(false);
const searchQuery = ref('');
const expandedGroups = ref(new Set());
const dropdownStyle = ref({});

// If it's a flat list with <= 2 items (like Logic/Modifier), make it readonly to act as a pure dropdown
const isFlatList = computed(() => {
    if (!props.options || props.options.length === 0) return false;
    return props.options.length <= 2 && !props.options.some(opt => opt.children);
});

const updatePosition = () => {
    if (containerRef.value && isOpen.value) {
        const rect = containerRef.value.getBoundingClientRect();
        dropdownStyle.value = {
            position: 'fixed',
            top: `${rect.bottom + 4}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: 999999,
            backgroundColor: '#ffffff',
            border: '1px solid #ced4da',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            maxHeight: '250px',
            overflowY: 'auto'
        };
    }
};

// Safely handles programmatic updates (like pressing Cancel)
const updateFromExternal = (newVal) => {
    const findLabel = (nodes) => {
        for (const node of nodes) {
            if (!node.children && node.value === newVal) return node.label;
            if (node.children) {
                const found = findLabel(node.children);
                if (found) return found;
            }
        }
        return null;
    };
    searchQuery.value = findLabel(props.options) || newVal || '';
};

// Expose so json_editor_bridge can trigger it
defineExpose({ updateFromExternal });

watch(() => props.modelValue, (newVal) => {
    if (newVal !== searchQuery.value) {
        updateFromExternal(newVal);
    }
}, { immediate: true });

watch(isOpen, (val) => {
    if (val) nextTick(updatePosition);
});

const onInput = () => {
    emit('update:modelValue', searchQuery.value);
};

const visibleItems = computed(() => {
    // If it's a flat non-editable list, ignore the search query so options aren't filtered out
    const query = isFlatList.value ? '' : searchQuery.value.toLowerCase();

    const processNodes = (nodes, level = 0, forceExpand = false) => {
        let result = [];
        for (const node of nodes) {
            const matchesQuery = node.label.toLowerCase().includes(query);
            const childMatches = node.children ? hasMatchingChild(node.children, query) : false;

            if (!query || matchesQuery || childMatches) {
                if (node.children) {
                    const isExpanded = forceExpand || !!query || expandedGroups.value.has(node.id);
                    result.push({ ...node, isGroup: true, level, expanded: isExpanded });
                    if (isExpanded) result.push(...processNodes(node.children, level + 1, forceExpand));
                } else {
                    result.push({ ...node, isGroup: false, level });
                }
            }
        }
        return result;
    };
    return processNodes(props.options);
});

const hasMatchingChild = (nodes, query) => {
    for (const node of nodes) {
        if (node.label.toLowerCase().includes(query)) return true;
        if (node.children && hasMatchingChild(node.children, query)) return true;
    }
    return false;
};

const openDropdown = () => {
    isOpen.value = true;
    nextTick(updatePosition);
};

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) nextTick(updatePosition);
};

const closeDropdown = () => { isOpen.value = false; };

const toggleGroup = (groupId) => {
    if (expandedGroups.value.has(groupId)) {
        expandedGroups.value.delete(groupId);
    } else {
        expandedGroups.value.add(groupId);
    }
    expandedGroups.value = new Set(expandedGroups.value);
};

const selectItem = (item) => {
    searchQuery.value = item.label;
    emit('update:modelValue', item.value);
    closeDropdown();
};

const getDepthClass = (level, isGroup) => {
    const prefix = isGroup ? 'group' : 'element';
    if (level === 0) return prefix;
    if (level === 1) return `sub${prefix}`;
    if (level === 2) return `subsub${prefix}`;
    return `${prefix}-level-${level}`;
};

const handleGlobalEvent = (event) => {
    if (isOpen.value && containerRef.value) {
        const path = event.composedPath();
        const dropdownEl = document.querySelector('.ontocombo-dropdown');
        if (!path.includes(containerRef.value) && (!dropdownEl || !path.includes(dropdownEl))) {
            closeDropdown();
        }
    }
};

onMounted(() => {
    document.addEventListener('click', handleGlobalEvent);
    document.addEventListener('mousedown', handleGlobalEvent);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleGlobalEvent);
    document.removeEventListener('mousedown', handleGlobalEvent);
    window.removeEventListener('scroll', updatePosition, true);
    window.removeEventListener('resize', updatePosition);
});
</script>

<style src="./ontocombo.css"></style>