<script setup lang="ts">
defineProps<{
    categoryName: string,
    ingredients: {
        [name: string]: {
            slug: string,
            count: number,
        },
    },
}>();
</script>

<template>
<details open>
    <summary>
        <span class="fw-bold">{{ categoryName }}</span>
    </summary>

    <div
        class="form-check"
        v-for="({slug, count}, name) in ingredients"
        :key="slug"
    >
        <input class="form-check-input" type="checkbox" value="" :id="`filter-${slug}`">
        <label class="form-check-label" :for="`filter-${slug}`">
            {{ name }} ({{ count }})
        </label>
    </div>
</details>
</template>
