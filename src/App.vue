<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Filters from '@/components/Filters.vue';
import * as Database from '@/services/Database'
import BreakpointIndicator from "@/components/BreakpointIndicator.vue";

const count = ref(1);

function increment() {
    count.value += 2;
}

onMounted(async () => {
    console.log('App mounted');
    console.log(Database.getDatabaseLength() + 10);
    Database.getFilters();
});
</script>

<template>
    <div class="container">
        <h1>
            <fa-icon icon="martini-glass-citrus"/>
            Cocktail database {{ count }}
        </h1>

        <button
            class="btn btn-primary"
            type="button"
            @click="increment"
        >
            Clik
        </button>

        <Filters foo="bar"/>
    </div>

    <BreakpointIndicator/>
</template>

<style scoped>
h1 {
    color: red;
}
</style>
