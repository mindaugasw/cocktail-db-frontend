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
<div v-if="recipe">
    <RouterLink :to="{name: 'home'}">
        <FAIcon icon="fa-caret-left"/> Į pradžią
    </RouterLink>

    @ RecipeView.vue
    <br/><br/>

    {{ slug }}
    <br/><br/>

    <RecipeContent :recipe="recipe"/>
    <br/><br/>
</div>
</template>
