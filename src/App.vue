<script setup lang="ts">
import BreakpointIndicator from "@/Component/BreakpointIndicator.vue";
import { isDevMode } from '@/Helper/EnvironmentHelper';
</script>

<template>
<div class="container">
    <h1>
        <RouterLink :to="{name: 'home'}">
            <FAIcon icon="martini-glass-citrus"/>
            Kokteilių receptai
        </RouterLink>
    </h1>

    <RouterView/>
</div>

<BreakpointIndicator v-if="isDevMode()"/>
</template>

<style scoped>
h1 {
    margin-top: 1em;
    margin-bottom: 1em;
    color: initial;
    text-decoration: none;
}

h1 a {
    color: initial;
    text-decoration: none;
}
</style>
