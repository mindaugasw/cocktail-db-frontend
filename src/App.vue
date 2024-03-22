<script setup lang="ts">
import BreakpointIndicator from "@/components/BreakpointIndicator.vue";

const isDevMode = import.meta.env.DEV;
</script>

<template>
<div class="container">
    <h1>
        <FAIcon icon="martini-glass-citrus"/>
        Kokteilių receptai
    </h1>

    <RouterView/>
</div>

<BreakpointIndicator v-if="isDevMode"/>
</template>

<style scoped>
h1 {
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>
