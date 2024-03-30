<script setup lang="ts">
import type { State } from '@/Service/FilterManager'

defineProps<{
    categoryName: string,
    ingredients: {
        [name: string]: {
            slug: string,
            count: number,
        },
    },
    isOpen: boolean,
    filtersState: State,
}>();

defineEmits<{
    categoryToggle: [newStateOpen: boolean],
    filtersChange: [],
}>();
</script>

<template>
<details
    :open="isOpen"
    @toggle="$emit('categoryToggle', $event.newState === 'open')"
>
    <summary>
        <span class="fw-bold">{{ categoryName }}</span>
    </summary>

    <div
        class="form-check"
        v-for="({slug, count}, name) in ingredients"
        :key="slug"
    >
        <input
            class="form-check-input"
            type="checkbox"
            :id="`filter-${slug}`"
            :disabled="!filtersState.enabled"
            v-model="filtersState.ingredients[name]"
            @change="$emit('filtersChange')"
        >
        <label class="form-check-label" :for="`filter-${slug}`">
            {{ name }} ({{ count }})
        </label>
    </div>
</details>
</template>
