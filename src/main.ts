import './assets/main.css'
// import './assets/mainExample.css';

import { createApp } from 'vue';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from '@/components/FontAwesomeIcon';
// import App from './AppExample.vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
