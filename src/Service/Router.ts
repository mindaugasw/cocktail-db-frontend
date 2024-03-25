import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/View/HomeView.vue';
import RecipeView from '@/View/RecipeView.vue';
import { setTitle } from '@/Helper/DocumentHelper';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/recipe/:nameSlug',
            name: 'recipe',
            component: RecipeView,
        },
    ],
});

router.afterEach(() => setTitle());

export default router;
