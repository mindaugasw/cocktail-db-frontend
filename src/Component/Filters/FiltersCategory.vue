<script setup lang="ts">
import type { State } from '@/Service/FilterManager'
import type { FilterCategoryList } from '@/Service/Database';

defineProps<{
    categoryName: string,
    ingredients: FilterCategoryList,
    isOpen: boolean,
    filterState: State,
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
        v-for="(ingredient, name) in ingredients"
        :key="ingredient.slug"
    >
        <input
            class="form-check-input"
            type="checkbox"
            :id="`filter-${ingredient.slug}`"
            :disabled="!filterState.enabled"
            v-model="filterState.ingredients[name]"
            @change="$emit('filtersChange')"
        >
        <label class="form-check-label" :for="`filter-${ingredient.slug}`">
            {{ name }} ({{ ingredient.count }})
        </label>
    </div>
</details>
</template>
