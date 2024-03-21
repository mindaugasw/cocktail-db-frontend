<script setup lang="ts">
import * as Database from '@/services/Database';

const recipes = Database.getRecipes();
</script>

<template>
<details open class="mb-5">
    <summary class="mb-3">
        <h3>Visi receptai ({{ Object.keys(recipes).length }})</h3>
    </summary>

    <div class="row g-3 g-sm-4 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
        <div
            v-for="(recipe, slug) in recipes"
            :key="slug"
            class="col"
        >
            <RouterLink :to="`/recipe/${slug}`" class="card-link">
                <div class="card h-100">
                    <img
                        :src="`/images/recipe/${recipe.image}`"
                        :alt="`Receptas ${recipe.name}`"
                        class="card-image card-img-top"
                    />

                    <div class="card-body">
                        <h5 class="card-title d-none d-sm-block">{{ recipe.name }}</h5>
                        <h6 class="card-title d-sm-none">{{ recipe.name }}</h6>
                        <p class="card-text">{{ recipe.description }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</details>
</template>

<style scoped>
summary > h3 {
    display: inline-block;
}

.card-link {
    text-decoration: none;
    color: inherit;
}

.card {
    transition: 0.3s;
}

.card:hover {
    transform: scale(1.04);
    filter: brightness(90%);
    transition: 0.3s;
}

.card-image {
    height: 250px;
    object-fit: cover;
    object-position: top;
}

.card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
