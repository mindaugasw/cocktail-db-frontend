<script setup lang="ts">
import Filters from '@/components/Filters/Filters.vue';
import BreakpointIndicator from "@/components/BreakpointIndicator.vue";
</script>

<template>
<div class="container">
    <h1>
        <fa-icon icon="martini-glass-citrus"/>
        Kokteilių receptai
    </h1>

    <Filters/>
</div>

<BreakpointIndicator/>
</template>

<style scoped>
h1 {
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>
