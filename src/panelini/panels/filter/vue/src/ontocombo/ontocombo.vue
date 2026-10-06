<template>
    <div class="ontocombo" ref="containerRef">
        <div class="ontocombo-header" @click.stop="toggleDropdown">
            <input type="text" class="ontocombo-input" v-model="searchQuery" @focus="isOpen = true" @click.stop
                :placeholder="selectedLabel || placeholder" />
            <div class="ontocombo-arrow">
                <i class="fas" :class="isOpen ? 'fa-caret-down' : 'fa-caret-right'"></i>
            </div>
        </div>

        <div v-show="isOpen" class="ontocombo-dropdown" @click.stop>
            <template v-for="item in visibleItems" :key="item.id">
                <div v-if="item.isGroup" class="ontocombo-row is-group" :class="getDepthClass(item.level, true)"
                    :style="{ paddingLeft: `${item.level * 16 + 8}px` }" @click.stop="toggleGroup(item.id)">
                    <span class="row-label" :title="item.label">{{ item.label }}</span>
                    <i class="fas row-toggle" :class="item.expanded ? 'fa-caret-down' : 'fa-caret-right'"></i>
                </div>
                <div v-else class="ontocombo-row is-element" :class="getDepthClass(item.level, false)"
                    :style="{ paddingLeft: `${item.level * 16 + 8}px` }" @click.stop="selectItem(item)">
                    <span class="row-label" :title="item.label">{{ item.label }}</span>
                </div>
            </template>
            <div v-if="visibleItems.length === 0" class="ontocombo-empty">
                No results found
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    modelValue: String,
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Select...' }
});

const emit = defineEmits(['update:modelValue']);

const containerRef = ref(null);
const isOpen = ref(false);
const searchQuery = ref('');
const expandedGroups = ref(new Set());
const selectedLabel = ref('');

watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        selectedLabel.value = '';
        return;
    }
    const findLabel = (nodes) => {
        for (const node of nodes) {
            if (!node.children && node.value === newVal) return node.label;
            if (node.children) {
                const found = findLabel(node.children);
                if (found) return found;
            }
        }
        return newVal;
    };
    selectedLabel.value = findLabel(props.options) || newVal;
}, { immediate: true });

const visibleItems = computed(() => {
    const query = searchQuery.value.toLowerCase();

    const processNodes = (nodes, level = 0, forceExpand = false) => {
        let result = [];
        for (const node of nodes) {
            const matchesQuery = node.label.toLowerCase().includes(query);
            const childMatches = node.children ? hasMatchingChild(node.children, query) : false;

            if (!query || matchesQuery || childMatches) {
                if (node.children) {
                    const isExpanded = forceExpand || !!query || expandedGroups.value.has(node.id);
                    result.push({
                        ...node,
                        isGroup: true,
                        level,
                        expanded: isExpanded
                    });

                    if (isExpanded) {
                        result.push(...processNodes(node.children, level + 1, forceExpand));
                    }
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

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) searchQuery.value = '';
};

const closeDropdown = () => {
    isOpen.value = false;
    searchQuery.value = '';
};

const toggleGroup = (groupId) => {
    if (expandedGroups.value.has(groupId)) {
        expandedGroups.value.delete(groupId);
    } else {
        expandedGroups.value.add(groupId);
    }
    expandedGroups.value = new Set(expandedGroups.value);
};

const selectItem = (item) => {
    emit('update:modelValue', item.value);
    selectedLabel.value = item.label;
    closeDropdown();
};

const getDepthClass = (level, isGroup) => {
    const prefix = isGroup ? 'group' : 'element';
    if (level === 0) return prefix;
    if (level === 1) return `sub${prefix}`;
    if (level === 2) return `subsub${prefix}`;
    return `${prefix}-level-${level}`;
};

const handleClickOutside = (event) => {
    if (isOpen.value && containerRef.value) {
        const path = event.composedPath();
        if (!path.includes(containerRef.value)) {
            closeDropdown();
        }
    }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<!-- Link the separate CSS file here -->
<style src="./ontocombo.css"></style>