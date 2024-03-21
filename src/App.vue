<script setup lang="ts">
import Filters from '@/components/Filters/Filters.vue';
import RecipeList from '@/components/RecipeList/RecipeList.vue';
import BreakpointIndicator from "@/components/BreakpointIndicator.vue";

const isDevMode = import.meta.env.DEV;
</script>

<template>
<div class="container">
    <h1>
        <fa-icon icon="martini-glass-citrus"/>
        Kokteilių receptai
    </h1>

    <Filters/>

    <RecipeList/>
</div>

<BreakpointIndicator v-if="isDevMode"/>
</template>

<style scoped>
h1 {
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>
