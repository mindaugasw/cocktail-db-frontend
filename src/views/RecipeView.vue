<template>
    <div>
        @ RecipeView.vue
        <br/>
        Recipe name slug: {{ $route.params.nameSlug }}
        <br/>
        <RouterLink to="/">Home</RouterLink>
    </div>
</template>
