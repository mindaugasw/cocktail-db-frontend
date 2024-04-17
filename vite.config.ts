import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

const BASE_PATH = '/cocktail-recipes';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true
    },
    define: {
        __BUILD_VERSION__: Date.now().toString(),
        __BASE_PATH__: `'${BASE_PATH}'`,
    },
    base: `${BASE_PATH}/`,
})
