<script setup lang="ts">
import * as Database from '@/services/Database';

const props = defineProps({
    foo: String,
});

// TODO merge into one
// const filters = Database.getFilters();
const filtersDebug = Database.getFiltersDebug();
</script>

<template>
My filters here ({{ props.foo }})

<!--<ul>
    <li
        v-for="(ingredients, category) in filters"
        :key="category"
    >
        {{ category }}
        <ul>
            <li
                v-for="ingredient in ingredients"
                :key="ingredient"
            >
                {{ ingredient }}
            </li>
        </ul>
    </li>
</ul>-->

<ul>
    <li
        v-for="(ingredients, category) in filtersDebug"
        :key="category"
    >
        {{ category }}
        <ul>
            <li
                v-for="(count, ingredient) in ingredients"
                :key="ingredient"
            >
                {{ ingredient }} ({{ count }})
            </li>
        </ul>
    </li>
</ul>
</template>
