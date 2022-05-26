import { createApp } from 'vue';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';

createApp(App).use(VueLoading).mount('#app');
