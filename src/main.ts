import './assets/main.css';
import 'virtual:uno.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import createComponents from '@/components/index';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(createComponents());

app.mount('#app');
