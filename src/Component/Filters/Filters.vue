<script setup lang="ts">
import * as Database from '@/Service/Database';
import FiltersCategory from './FiltersCategory.vue';
import { filterState, resetState, persistState } from '@/Service/FilterManager';

const filters = Database.getFilters();
const filtersGrouping = [
    ['Kategorija', 'Alkoholis', 'Kitas alkoholis'],
    ['Sirupas / likeris', 'Kiti sirupai / likeriai'],
    ['Kiti gėrimai'],
    ['Dažniausi ingridientai', 'Kiti ingridientai'],
];

validateAllFiltersAreUsed();

// Since categories are grouped manually by name, we additionally validate that none of them were missed
function validateAllFiltersAreUsed(): void {
    let usedGroups: string[] = [];
    usedGroups = usedGroups.concat(...filtersGrouping);
    const allGroups = Object.keys(filters);
    const notUsedGroups = allGroups.filter(group => !usedGroups.includes(group));

    if (notUsedGroups.length !== 0) {
        console.warn('Some filter groups were not used:', notUsedGroups);
    }
}

function onCategoryToggle(category: string, newStateOpen: boolean): void {
    filterState.value['categoriesOpen'][category] = newStateOpen;
    persistState();
}

function resetFilters() {
    resetState();
    persistState();
}
</script>

<template>
<div id="header-row">
    <h3 class="d-sm-none">Filtrai</h3>

    <div class="hstack gap-3">
        <!--
        Title is printed twice to put it on a separate line and prevent
        hstack from affecting it, but only on a certain breakpoint
        -->
        <h3 class="d-none d-sm-flex">Filtrai</h3>

        <div class="form-check form-switch">
            <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="filters-enabled-toggle"
                v-model="filterState.enabled"
                @change="persistState"
            >
            <label class="form-check-label" for="filters-enabled-toggle">
                Filtrai įjungti
            </label>
        </div>

        <button
            type="button"
            class="btn btn-outline-danger btn-sm ms-auto"
            @click="resetFilters"
        >
            Išvalyti filtrus
        </button>
    </div>
</div>

<div id="filters-container">
    <div class="row">
        <div
            v-for="filtersGroup in filtersGrouping"
            :key="filtersGroup[0]"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
            <div
                v-for="category in filtersGroup"
                :key="category"
                class="filters-category-container"
            >
                <FiltersCategory
                    :categoryName="category"
                    :ingredients="filters[category]"
                    :isOpen="filterState['categoriesOpen'][category] ?? false"
                    :filterState="filterState"
                    @categoryToggle="(newStateOpen) => onCategoryToggle(category, newStateOpen)"
                    @filtersChange="persistState"
                />
            </div>
        </div>
    </div>
</div>
</template>

<style>
:root {
    --filters-border: 2px solid black;
}
</style>

<style scoped>
#header-row {
    border-top: var(--filters-border);
    border-left: var(--filters-border);
    border-right: var(--filters-border);
    border-bottom: 2px solid lightgray;
    border-radius: 25px 25px 0 0;
    padding: 15px 15px 5px 15px;
}

#filters-container {
    overflow-y: scroll;
    padding: 15px;
    border-left: var(--filters-border);
    border-right: var(--filters-border);
    border-bottom: var(--filters-border);
    border-radius: 0 0 5px 25px;
    margin-bottom: 2.5em;
}

@media (max-width: 575px) {
    #filters-container {
        max-height: 400px;
    }
}

@media (min-width: 576px) {
    #filters-container {
        max-height: 450px;
    }
}

.filters-category-container {
    margin-bottom: 1.2em;
}
</style>
