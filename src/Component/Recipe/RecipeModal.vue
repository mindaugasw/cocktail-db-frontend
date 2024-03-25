<script setup lang="ts">
import RecipeContent from '@/Component/Recipe/RecipeContent.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import type { Recipe } from '@/Service/Database';

const props = defineProps<{
    modalId: string,
    recipeNameSlug: string | null,
    recipe: Recipe | null,
}>();

const router = useRouter();
const fullPageUrl = computed(() => router.resolve({name: 'recipe', params: {nameSlug: props.recipeNameSlug ?? '_'}}));

function openRecipeFullPage() {
    const closeButton = document.getElementsByClassName('btn-close')[0] as HTMLButtonElement;
    closeButton.click();
    router.push(fullPageUrl.value);
    window.scrollTo(0, 0);
}
</script>

<template>
<div
    :id="modalId"
    class="modal fade"
>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4
                    v-if="recipe"
                    class="modal-title"
                >
                    {{ recipe.name }}
                </h4>

                <!-- Here <RouterLink> does work properly with custom @click.prevent handler, so we use <a> instead -->
                <a
                    :href="fullPageUrl.fullPath"
                    class="full-page-link d-inline-block text-black-50"
                    @click.prevent="openRecipeFullPage"
                >
                    <FAIcon icon="fa-arrow-up-right-from-square"/>
                </a>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                />
            </div>

            <div class="modal-body">
                <RecipeContent
                    v-if="recipe && recipeNameSlug"
                    :recipe="recipe"
                    :recipeNameSlug="recipeNameSlug"
                    :insideModal="true"
                />
            </div>

            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-outline-dark"
                    data-bs-dismiss="modal"
                >
                    Uždaryti
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.full-page-link {
    margin-left: auto;
}

.btn-close {
    margin-left: 8px;
}
</style>
