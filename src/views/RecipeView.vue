<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import * as Database from '@/services/Database';
import RecipeContent from '@/components/Recipe/RecipeContent.vue';
import { setTitle } from '@/helpers/DocumentHelper';
import { toTitleCase } from '@/helpers/StringHelper';

const route = useRoute();
const router = useRouter();
const slug = route.params.nameSlug as string;
const recipe = Database.getRecipes()[slug];

if (recipe === undefined) {
    console.warn(`No recipe was found with slug "${slug}"`);

    router.push({name: 'home'});
} else {
    setTitle(toTitleCase(recipe.name));
}
</script>

<template>
<RouterLink :to="{name: 'home'}" class="d-inline-block mb-4">
    <FAIcon icon="fa-caret-left"/> Į pradžią
</RouterLink>

<div v-if="recipe">
    <h2 class="mb-4">{{ recipe.name }}</h2>

    <RecipeContent
        v-if="recipe"
        :recipe="recipe"
        :recipeNameSlug="slug"
        :insideModal="false"
        class="recipe-content"
    />
</div>
</template>

<style scoped>
.recipe-content {
    margin-bottom: 7em;
}
</style>
