<script setup lang="ts">
import { computed, ref } from 'vue';
import * as Database from '@/Service/Database';
import { filterState } from '@/Service/FilterManager';
import RecipeListGroup from '@/Component/RecipeList/RecipeListGroup.vue';
import RecipeModal from '@/Component/Recipe/RecipeModal.vue';
import type { RecipeList } from '@/Service/Database';

const filters = Database.getFilters();
const recipes = Database.getRecipes();
const recipeModalSlug = ref<string | null>(null);

const filterActive = computed(() => {
    if (!filterState.value.enabled) {
        return false;
    }

    return Object.values(filterState.value.ingredients).includes(true);
});

const recipesFiltered = computed(() => {
    const flagsToFilterBy = [];
    const filtersObjectEntries = Object.entries(filters);

    for (const [name, value] of Object.entries(filterState.value.ingredients)) {
        if (!value) {
            continue;
        }

        for (const [, filterList] of filtersObjectEntries) {
            if (!(name in filterList)) {
                continue;
            }

            if (!filterList[name].isFlagFilter) {
                continue;
            }

            flagsToFilterBy.push(name);

            break;
        }
    }

    return Object.keys(recipes)
        .filter(recipeSlug => {
            if (!('flag' in recipes[recipeSlug])) {
                return flagsToFilterBy.length === 0;
            }

            if ('flag' in recipes[recipeSlug] && flagsToFilterBy.length === 0) {
                return false;
            }

            for (const flagToFilterBy of flagsToFilterBy) {
                if (recipes[recipeSlug].flag !== flagToFilterBy) {
                    return false;
                }
            }

            return true;
        })
        .reduce((newList, recipeSlug) => {
            newList[recipeSlug] = recipes[recipeSlug];

            return newList;
        }, {}) as RecipeList;
});

const recipeGroups = computed(() => {
    if (!filterActive) {
        return false;
    }

    const listHaveAllIngredients: RecipeList = {};
    const listNeedAFewExtra: RecipeList = {};
    // const listNeedAllSelected: RecipeList = {}; // TODO implement list of recipes that need all selected ingredients

    for (const [nameSlug, recipe] of Object.entries(recipesFiltered.value)) {
        recipe.missingIngredients = [];

        for (const ingredient of recipe.ingredients) {
            if (!(filterState.value.ingredients[ingredient.primaryAlias] ?? false)) {
                recipe.missingIngredients.push(ingredient);
            }
        }

        if (recipe.missingIngredients.length === 0) {
            listHaveAllIngredients[nameSlug] = recipe;
        } else if (
            recipe.missingIngredients.length <= 2
            && recipe.missingIngredients.length !== recipe.ingredients.length
        ) {
            listNeedAFewExtra[nameSlug] = recipe;
        }
    }

    return {
        'haveAllIngredients': listHaveAllIngredients,
        'needAFewExtra': listNeedAFewExtra,
    };
});

function onModalOpen(nameSlug: string): void {
    recipeModalSlug.value = nameSlug;
}
</script>

<template>
<RecipeListGroup
    title="Visi receptai"
    :recipes="recipesFiltered"
    :isOpen="!filterActive"
    @openModal="onModalOpen"
/>

<RecipeListGroup
    v-if="filterActive"
    title="Receptai, kuriems turi visus ingridientus"
    :recipes="recipeGroups['haveAllIngredients']"
    :isOpen="true"
    @openModal="onModalOpen"
/>

<RecipeListGroup
    v-if="filterActive"
    title="Receptai, kuriems trūksta tik kelių ingridientų"
    :recipes="recipeGroups['needAFewExtra']"
    :isOpen="true"
    @openModal="onModalOpen"
/>

<div class="mb-5"></div>

<RecipeModal
    modalId="recipeModal"
    :recipeNameSlug="recipeModalSlug"
    :recipe="recipeModalSlug ? recipes[recipeModalSlug] : null"
/>
</template>
