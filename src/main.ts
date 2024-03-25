import '@/Asset/main.css'
import { createApp } from 'vue';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from '@/Service/FontAwesomeIcon';
import App from './App.vue';
import router from '@/Service/Router';

const app = createApp(App);
app.component('FAIcon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
