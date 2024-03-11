// import './assets/main.css'

import { createApp } from 'vue';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './AppExample.vue'
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
