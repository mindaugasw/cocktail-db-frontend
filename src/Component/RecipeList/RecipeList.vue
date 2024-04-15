<script setup lang="ts">
import { computed, ref } from 'vue';
import * as Database from '@/Service/Database';
import { filterState } from '@/Service/FilterManager';
import RecipeListGroup from '@/Component/RecipeList/RecipeListGroup.vue';
import RecipeModal from '@/Component/Recipe/RecipeModal.vue';
import type { Recipe, RecipeList } from '@/Service/Database';

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

    return filterRecipesByFlag(recipes, flagsToFilterBy);
});

function filterRecipesByFlag(recipes: RecipeList, flagsToFilterBy: string[]): RecipeList {
    return Object.keys(recipes)
        .filter(recipeSlug => {
            if (recipes[recipeSlug].flag === null) {
                return flagsToFilterBy.length === 0;
            }

            if (flagsToFilterBy.length === 0) {
                return false;
            }

            for (const flagToFilterBy of flagsToFilterBy) {
                if (recipes[recipeSlug].flag !== flagToFilterBy) {
                    return false;
                }
            }

            return true;
        })
        .reduce((newList: RecipeList, recipeSlug) => {
            newList[recipeSlug] = recipes[recipeSlug];

            return newList;
        }, {}) as RecipeList;
}

const recipeGroups = computed(() => {
    if (!filterActive.value) {
        return false;
    }

    const listHaveAllIngredients: RecipeList = {};
    const listNeedAFewExtra: RecipeList = {};
    const listNeedAllSelected: RecipeList = {};

    for (const [nameSlug, recipe] of Object.entries(recipesFiltered.value)) {
        recipe.missingIngredients = getRecipeMissingIngredients(recipe);

        if (recipe.missingIngredients.length === 0) {
            listHaveAllIngredients[nameSlug] = recipe;
        } else if (
            recipe.missingIngredients.length <= 2
            && recipe.missingIngredients.length !== recipe.filterableIngredientCount
        ) {
            listNeedAFewExtra[nameSlug] = recipe;
        }

        if (doesRecipeNeedAllSelectedIngredients(recipe)) {
            listNeedAllSelected[nameSlug] = recipe;
        }
    }

    return {
        'haveAllIngredients': listHaveAllIngredients,
        'needAFewExtra': listNeedAFewExtra,
        'needAllSelected': listNeedAllSelected,
    };
});

function getRecipeMissingIngredients(recipe: Recipe): string[] {
    const missingIngredients = [];
    const filterableIngredients = Object.keys(recipe.filterableIngredientAliases ?? {});

    for (const primaryAlias of filterableIngredients) {
        if (!(filterState.value.ingredients[primaryAlias] ?? false)) {
            missingIngredients.push(primaryAlias);
        }
    }

    return missingIngredients;
}

function doesRecipeNeedAllSelectedIngredients(recipe: Recipe): boolean {
    for (const [primaryAlias, needed] of Object.entries(filterState.value.ingredients)) {
        if (!needed) {
            continue;
        }

        if (!(primaryAlias in recipe.filterableIngredientAliases)) {
            return false;
        }
    }

    return true;
}

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
    v-if="filterActive && recipeGroups"
    title="Receptai, kuriems turi visus ingridientus"
    :recipes="recipeGroups['haveAllIngredients']"
    :isOpen="true"
    @openModal="onModalOpen"
/>

<RecipeListGroup
    v-if="filterActive && recipeGroups"
    title="Receptai, kuriems trūksta tik kelių ingridientų"
    :recipes="recipeGroups['needAFewExtra']"
    :isOpen="true"
    @openModal="onModalOpen"
/>

<RecipeListGroup
    v-if="filterActive && recipeGroups"
    title="Receptai, kuriems reikia visų pasirinktų ingridientų"
    :recipes="recipeGroups['needAllSelected']"
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
