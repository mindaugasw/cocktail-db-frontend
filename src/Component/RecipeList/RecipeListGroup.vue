<script setup lang="ts">
import type { RecipeList } from '@/Service/Database';
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    recipes: RecipeList,
    isOpen: boolean,
}>();

defineEmits<{
    openModal: [recipeNameSlug: string],
}>();

const recipeCount = computed(() => Object.keys(props.recipes).length);
</script>

<template>
<details
    class="mb-1"
    :open="isOpen ? recipeCount !== 0 : false"
>
    <summary class="mb-3">
        <h3>{{ title }} ({{ recipeCount }})</h3>
    </summary>

    <div class="mb-5 row g-3 g-sm-4 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        <div
            v-for="(recipe, slug) in recipes"
            :key="slug"
            class="col"
        >
            <RouterLink
                :to="{name: 'recipe', params: {nameSlug: slug}}"
                class="card-link"
                @click.prevent="$emit('openModal', slug)"
                data-bs-toggle="modal"
                data-bs-target="#recipeModal"
            >
                <div class="card h-100">
                    <img
                        :src="`/images/recipe/${recipe.image}`"
                        :alt="`Receptas ${recipe.name}`"
                        class="card-image card-img-top"
                    />

                    <div class="card-body">
                        <h5 class="card-title d-none d-sm-block">{{ recipe.name }}</h5>
                        <h6 class="card-title d-sm-none">{{ recipe.name }}</h6>
                        <p class="card-text">{{ recipe.description }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</details>
</template>

<style scoped>
summary > h3 {
    display: inline-block;
}

.card-link {
    text-decoration: none;
    color: inherit;
}

.card {
    transition: 0.3s;
}

.card:hover {
    transform: scale(1.04);
    filter: brightness(90%);
    transition: 0.3s;
}

.card-image {
    height: 250px;
    object-fit: cover;
    object-position: top;
}

.card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

/*
 * Remove details-summary expand/collapse icon and replace with a custom one.
 * Because default one breaks-line in an ugly way on too narrow screen.
 * Source: https://stackoverflow.com/a/56758842/4110469
 */
summary::before {
    content: '► ';
    margin-right: 5px;
}

details[open] summary::before {
    content: '▼ ';
}

summary {
    list-style: none;
    display: inline-flex;
}
</style>
